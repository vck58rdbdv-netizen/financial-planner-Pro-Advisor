// =====================================================================
// 🗂️ CLIENT DATABASE MANAGER (HIS Architecture: XN / VN System)
// =====================================================================
const CRM_DB_NAME = "FinancialAdvisorCRM";
const CRM_DB_VERSION = 4; // 🌟 อัปเกรดเป็น 4 เพื่อรองรับตารางนับลำดับ (Counters)
let crmDB;
let crmClientsList = []; 
let currentCRMView = 'table'; 
let currentSort = { col: 'timestamp', dir: 'desc' }; 
let tempNotesHistory = []; 

// --- [NEW] Helpers สำหรับสร้าง Running Number ---
const pad4 = (num) => String(num).padStart(4, '0');
const pad2 = (num) => String(num).padStart(2, '0');

// แปลงวันที่ปัจจุบันเป็นรูปแบบ ปี(ไทย)เดือน -> 6904
function getThaiYYMM() {
    const d = new Date();
    const yy = (d.getFullYear() + 543).toString().slice(-2);
    const mm = pad2(d.getMonth() + 1);
    return `${yy}${mm}`;
}

// แปลงวันที่ปัจจุบันเป็นรูปแบบ ปี(ไทย)เดือนวัน -> 690425
function getThaiYYMMDD() {
    const d = new Date();
    const yy = (d.getFullYear() + 543).toString().slice(-2);
    const mm = pad2(d.getMonth() + 1);
    const dd = pad2(d.getDate());
    return `${yy}${mm}${dd}`;
}

// 🟢 ฟังก์ชันสร้าง XN (รันตามเดือน)
async function generateNextXN() {
    return new Promise((resolve) => {
        let transaction = crmDB.transaction(["counters"], "readwrite");
        let store = transaction.objectStore("counters");
        let prefix = getThaiYYMM(); // เช่น "6904"
        let counterId = `XN_${prefix}`;

        let request = store.get(counterId);
        request.onsuccess = function(e) {
            let record = e.target.result;
            let nextNum = 1;
            if (record) {
                nextNum = record.seq + 1;
                record.seq = nextNum;
                store.put(record);
            } else {
                store.put({ id: counterId, seq: 1 });
            }
            resolve(`${prefix}${pad4(nextNum)}`); // ผลลัพธ์: 69040001
        };
    });
}

// 🟢 ฟังก์ชันสร้าง VN (รันตามวัน)
async function generateNextVN() {
    return new Promise((resolve) => {
        let transaction = crmDB.transaction(["counters"], "readwrite");
        let store = transaction.objectStore("counters");
        let prefix = getThaiYYMMDD(); // เช่น "690425"
        let counterId = `VN_${prefix}`;

        let request = store.get(counterId);
        request.onsuccess = function(e) {
            let record = e.target.result;
            let nextNum = 1;
            if (record) {
                nextNum = record.seq + 1;
                record.seq = nextNum;
                store.put(record);
            } else {
                store.put({ id: counterId, seq: 1 });
            }
            resolve(`${prefix}-${pad2(nextNum)}`); // ผลลัพธ์: 690425-01
        };
    });
}

// 1. เริ่มต้นเชื่อมต่อฐานข้อมูล
function initCRMDatabase() {
    const request = indexedDB.open(CRM_DB_NAME, CRM_DB_VERSION);

    request.onupgradeneeded = function(event) {
        let db = event.target.result;
        
        // สร้างตารางลูกค้า
        if (!db.objectStoreNames.contains("clients")) {
            let store = db.createObjectStore("clients", { keyPath: "XN" });
            store.createIndex("timestamp", "timestamp", { unique: false });
            store.createIndex("name", "name", { unique: false });
        }
        
        // 🌟 สร้าง Table เก็บ Counters สำหรับรันลำดับ
        if (!db.objectStoreNames.contains("counters")) {
            db.createObjectStore("counters", { keyPath: "id" });
        }
    };

    request.onsuccess = function(event) {
        crmDB = event.target.result;
        refreshCRMTable(); 
    };

    request.onerror = function(event) {
        console.error("IndexedDB Error:", event.target.error);
    };
}

window.addEventListener('DOMContentLoaded', function() {
    if (typeof initCRMDatabase === 'function') initCRMDatabase();
});

// --- [NEW] ฟังก์ชันจัดการ VN ข้ามวัน (Lazy Evaluation) ---
function autoCloseStaleVNs() {
    if (!crmDB || !window.SESSION_KEY) return;

    let transaction = crmDB.transaction(["clients"], "readwrite");
    let store = transaction.objectStore("clients");
    let req = store.getAll();

    req.onsuccess = function(e) {
        let rawClients = e.target.result;
        let closedCount = 0;
        const todayStr = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });

        rawClients.forEach(raw => {
            if (!raw.securePayload) return;
            
            let clientData = SecurityCore.decrypt(raw.securePayload);
            if (!clientData || !clientData.visits || clientData.visits.length === 0) return;

            let needsUpdate = false;
            // ดึง VN ล่าสุดมาเช็ค
            let latestVisit = clientData.visits[0]; 

            if (latestVisit.status === 'Active' && latestVisit.dateString !== todayStr) {
                latestVisit.status = 'Closed'; 
                
                // แทรกล็อกบันทึกการทำงานของระบบลงใน VN นั้น
                latestVisit.activities.push({
                    date: todayStr,
                    text: `🔒 ระบบทำการปิด ${latestVisit.VN} อัตโนมัติ (สิ้นสุดวันทำการ)`,
                    timestamp: new Date().getTime(),
                    isSystemLog: true
                });
                
                needsUpdate = true;
                closedCount++;
            }

            if (needsUpdate) {
                raw.securePayload = SecurityCore.encrypt(clientData);
                store.put(raw);
            }
        });

        if (closedCount > 0) {
            setTimeout(() => {
                alert(`ℹ️ System Alert:\nระบบได้ทำการปิดประวัติการเข้าพบ (VN) ที่ค้างอยู่จากวันก่อนหน้าจำนวน ${closedCount} รายการเรียบร้อยแล้วครับ ข้อมูล UI ถูกล็อกเป็น Read-Only แล้ว`);
                refreshCRMTable(); 
            }, 1000);
        }
    };
}

// 2. ฟังก์ชันบันทึกข้อมูลหน้าจอปัจจุบันลงฐานข้อมูล (เข้ารหัส AES-256 แบบ XN/VN + Running Number)
async function saveCurrentToCRM(isSilent = false) {
    if (!crmDB) return (!isSilent && alert("❌ เชื่อมต่อฐานข้อมูลไม่สำเร็จ"));
    if (!window.SESSION_KEY) return (!isSilent && alert("🔒 เซสชันหมดอายุ กรุณารีเฟรชเพื่อเข้าสู่ระบบใหม่"));

    let clientName = document.getElementById('p_name') ? document.getElementById('p_name').value.trim() : "";
    if (!clientName) return (!isSilent && alert("⚠️ กรุณาระบุ 'ชื่อ-สกุล' ของลูกค้าก่อนบันทึกครับ"));

    let netWorth = typeof parseNum === 'function' ? parseNum(document.getElementById('val_networth')?.innerText || 0) : 0;
    let aiScore = document.getElementById('ml_prob_proposed') ? document.getElementById('ml_prob_proposed').innerText : "-";
    let clusterBox = document.getElementById('profile_cluster');
    let aiCluster = clusterBox ? clusterBox.innerText.split('\n')[0].trim() : "-";
    
    const getSafeVal = (id) => document.getElementById(id) ? document.getElementById(id).value : "0";
    
    // ดึง Snapshot จากหน้าจอ
    let currentUI_Snapshot = {
        profile: { p_name: getSafeVal('p_name'), p_age: getSafeVal('p_age'), p_occ: getSafeVal('p_occ'), p_province: getSafeVal('p_province'), p_welfare: getSafeVal('p_welfare'), p_health: getSafeVal('p_health'), p_dep: getSafeVal('p_dep'), p_contact: getSafeVal('p_contact'), p_unitlinked: getSafeVal('p_unitlinked'), bq_1: getSafeVal('bq_1'), bq_2: getSafeVal('bq_2'), bq_3: getSafeVal('bq_3'), bq_4: getSafeVal('bq_4'), bq_5: getSafeVal('bq_5'), bq_6: getSafeVal('bq_6'), bq_7: getSafeVal('bq_7'), bq_8: getSafeVal('bq_8'), bq_9: getSafeVal('bq_9'), bq_10: getSafeVal('bq_10') },
        retirement: { r_retAge: getSafeVal('r_retAge'), r_lifeExp: getSafeVal('r_lifeExp'), r_reqInc: document.getElementById('r_reqInc') ? parseNum(document.getElementById('r_reqInc').value) : 0, r_preRet: getSafeVal('r_preRet'), r_inf: getSafeVal('r_inf'), r_med_inf: getSafeVal('r_med_inf') },
        dynamic: { c_assets: typeof getStandardRows === 'function' ? getStandardRows('c_assets') : [], c_liab: typeof getStandardRows === 'function' ? getStandardRows('c_liab') : [], c_inc: typeof getStandardRows === 'function' ? getStandardRows('c_inc') : [], c_exp: typeof getStandardRows === 'function' ? getStandardRows('c_exp') : [], c_ins: typeof getCustomRows === 'function' ? getCustomRows('c_ins') : [], c_goals: typeof getCustomRows === 'function' ? getCustomRows('c_goals') : [], c_invest_current: typeof getCustomRows === 'function' ? getCustomRows('c_invest_current') : [], c_tax_current: typeof getCustomRows === 'function' ? getCustomRows('c_tax_current') : [] }
    };

    let visitAnalytics = {
        aiStats: window.latestCoAdvisorStats || null,
        financialVitals: window.latestFinancialVitals || null,
        simulationStats: window.latestSimulationStats || null,
        presentationFunnel: window.latestPresentationFunnel || null,
        engagementMetrics: {
            whatIfAdjustmentsCount: window.whatIfAdjustmentsCount || 0,
            originalRetireAge: getSafeVal('r_retAge'),
            compromisedRetireAge: window.compromisedRetireAge || getSafeVal('r_retAge')
        }
    };

    let transaction = crmDB.transaction(["clients"], "readonly");
    let store = transaction.objectStore("clients");
    let req = store.getAll();
    
    req.onsuccess = async function(e) {
        let existingClients = e.target.result;
        
        let existingRecord = existingClients.find(c => {
             if(c.securePayload) {
                 let dec = SecurityCore.decrypt(c.securePayload);
                 return dec && dec.name === clientName;
             }
             return false; 
        });

        const nowMs = new Date().getTime();
        const todayStr = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });

        let clientObject;
        let isNewVN = false;
        let isNewClient = false;

        if (existingRecord) {
            clientObject = SecurityCore.decrypt(existingRecord.securePayload);
            
            // เช็คว่ามี VN ของวันนี้เปิดอยู่ไหม
            if (clientObject.visits.length > 0 && clientObject.visits[0].dateString === todayStr && clientObject.visits[0].status === 'Active') {
                // อัปเดตทับ VN ปัจจุบัน
                clientObject.visits[0].dataSnapshot = currentUI_Snapshot;
                clientObject.visits[0].analytics = visitAnalytics;
                clientObject.visits[0].netWorth = netWorth;
                clientObject.visits[0].aiScore = aiScore;
                clientObject.visits[0].aiCluster = aiCluster;
                clientObject.visits[0].timestamp = nowMs;
                // 🌟 อัปเดตสถานะการขายล่าสุด ลงไปใน VN ด้วย
                clientObject.visits[0].clientStatus = clientObject.status || "ผู้มุ่งหวัง";
            } else {
                // 🟢 เปิด VN ใหม่ของวันนี้
                isNewVN = true;
                let newVN_Code = await generateNextVN(); 
                
                clientObject.visits.unshift({
                    VN: newVN_Code,
                    dateString: todayStr,
                    timestamp: nowMs,
                    status: 'Active',         // 🌟 สถานะระบบ
                    clientStatus: clientObject.status || "ผู้มุ่งหวัง", // 🌟 สถานะการขาย (CRM Status)
                    netWorth: netWorth,
                    aiScore: aiScore,
                    aiCluster: aiCluster,
                    dataSnapshot: currentUI_Snapshot,
                    analytics: visitAnalytics,
                    activities: [{ date: todayStr, text: `🟢 เปิดประวัติการเข้าพบใหม่ (${newVN_Code})`, timestamp: nowMs }]
                });
            }
            clientObject.name = clientName; 

        } else {
            // 🟢 สร้างลูกค้าใหม่ XN ใหม่
            isNewClient = true;
            isNewVN = true;
            
            let newXN_Code = await generateNextXN();
            let newVN_Code = await generateNextVN();

            clientObject = {
                XN: newXN_Code,
                name: clientName,
                status: "ผู้มุ่งหวัง", // 🌟 สถานะแม่ (XN)
                nextAppointment: "",
                tags: [],
                visits: [{
                    VN: newVN_Code,
                    dateString: todayStr,
                    timestamp: nowMs,
                    status: 'Active',         // 🌟 สถานะระบบ
                    clientStatus: 'ผู้มุ่งหวัง',  // 🌟 สถานะการขาย (CRM Status)
                    netWorth: netWorth,
                    aiScore: aiScore,
                    aiCluster: aiCluster,
                    dataSnapshot: currentUI_Snapshot,
                    analytics: visitAnalytics,
                    activities: [{ date: todayStr, text: `🟢 สร้างประวัติลูกค้าใหม่เข้าระบบ (${newVN_Code})`, timestamp: nowMs }]
                }]
            };
        }

        // 🧹 กฎเก็บข้อมูลย้อนหลัง 3 ปี นับจาก VN ล่าสุด
        const THREE_YEARS_MS = 3 * 365 * 24 * 60 * 60 * 1000;
        const latestVisitTime = clientObject.visits[0].timestamp;
        clientObject.visits = clientObject.visits.filter(v => {
            return (latestVisitTime - v.timestamp) <= THREE_YEARS_MS;
        });

        // 🔒 ห่อหุ้มและเข้ารหัส
        let finalRecord = {
            XN: clientObject.XN,
            name: clientObject.name, 
            timestamp: nowMs,
            securePayload: SecurityCore.encrypt(clientObject)
        };

        let putTransaction = crmDB.transaction(["clients"], "readwrite");
        let putStore = putTransaction.objectStore("clients");
        putStore.put(finalRecord).onsuccess = function() {
            let msg = isNewClient ? `✅ บันทึกข้อมูลลูกค้ารายใหม่ (รหัส ${finalRecord.XN}) สำเร็จ!` : `✅ อัปเดตข้อมูลของ ${clientName} สำเร็จ!`;
            if (!isSilent) alert(msg);
            refreshCRMTable(); 
            // อัปเดต Dashboard ให้ Realtime ด้วยถ้าสร้างฟังก์ชันไว้
            if(typeof renderAnalyticsDashboard === 'function') renderAnalyticsDashboard();
        };
    };
}

// 3. ดึงข้อมูลและอัปเดตหน้าจอ (ถอดรหัส AES-256)
function refreshCRMTable() {
    if (!crmDB || !window.SESSION_KEY) return;
    
    let transaction = crmDB.transaction(["clients"], "readonly");
    let store = transaction.objectStore("clients");
    let request = store.getAll();

    request.onsuccess = function(event) {
        let rawClients = event.target.result;
        crmClientsList = [];

        rawClients.forEach(raw => {
            if (raw.securePayload) {
                let decryptedClient = SecurityCore.decrypt(raw.securePayload);
                if (decryptedClient && decryptedClient.visits && decryptedClient.visits.length > 0) {
                    let latestVisit = decryptedClient.visits[0]; // ดึงข้อมูล VN ล่าสุดมาโชว์หน้าแรก
                    
                    crmClientsList.push({
                        id: decryptedClient.XN, // ใช้ XN แทน ID
                        name: decryptedClient.name,
                        status: decryptedClient.status,
                        nextAppointment: decryptedClient.nextAppointment,
                        tags: decryptedClient.tags || [],
                        netWorth: latestVisit.netWorth,
                        aiScore: latestVisit.aiScore,
                        aiCluster: latestVisit.aiCluster,
                        dateString: latestVisit.dateString, // วันที่อัปเดตล่าสุด
                        timestamp: latestVisit.timestamp,
                        fullData: decryptedClient // แนบก้อนใหญ่ไปเผื่อกดโหลด
                    });
                }
            }
        });

        applySorting();
        filterCRMTable(); 
        updateCRMStats(crmClientsList);
    };
}

function updateCRMStats(clients) {
    let totalAUM = 0;
    clients.forEach(c => totalAUM += (c.netWorth || 0));
    
    if(document.getElementById('crm_total_clients')) document.getElementById('crm_total_clients').innerHTML = `${clients.length} <span class="text-sm font-normal text-gray-500">ราย</span>`;
    if(document.getElementById('crm_total_aum')) document.getElementById('crm_total_aum').innerHTML = `${(totalAUM / 1000000).toFixed(2)} <span class="text-xs font-normal text-gray-500">ล้านบาท</span>`;
    if(document.getElementById('crm_ai_cases')) document.getElementById('crm_ai_cases').innerText = (1250 + clients.length).toLocaleString();
    
    let selectAllChk = document.getElementById('crm_select_all');
    if(selectAllChk) selectAllChk.checked = false;
    updateBulkActionBar();
}

function getStatusBadge(status) {
    let color = 'bg-gray-100 text-gray-700 border-gray-200';
    if (status === 'ปิดการขาย') color = 'bg-green-100 text-green-700 border-green-200';
    else if (status === 'เข้าเยี่ยมหลังการขาย') color = 'bg-teal-100 text-teal-800 border-teal-300';
    else if (status === 'นำเสนอแผน') color = 'bg-blue-100 text-blue-700 border-blue-200';
    else if (status === 'กำลังติดตาม') color = 'bg-purple-100 text-purple-700 border-purple-200';
    else if (status === 'รอดำเนินการ') color = 'bg-yellow-100 text-yellow-700 border-yellow-200';
    else if (status === 'ปฏิเสธ') color = 'bg-red-100 text-red-700 border-red-200';
    else color = 'bg-slate-100 text-slate-700 border-slate-200'; 
    return `<span class="text-[10px] ${color} px-2 py-0.5 rounded-full border font-bold shadow-sm whitespace-nowrap">${status}</span>`;
}

// 4. ระบบค้นหาและกรอง 
function filterCRMTable() {
    let keyword = document.getElementById('crm_search_input').value.toLowerCase();
    let statusFilter = document.getElementById('crm_filter_status').value;
    let startDate = document.getElementById('crm_filter_start')?.value;
    let endDate = document.getElementById('crm_filter_end')?.value;

    window.currentFilteredClients = crmClientsList.filter(c => {
        let tagString = (c.tags || []).join(' ').toLowerCase();
        let matchKeyword = c.name.toLowerCase().includes(keyword) || c.id.toLowerCase().includes(keyword) || tagString.includes(keyword);
        let matchStatus = (statusFilter === 'all') || ((c.status || 'ผู้มุ่งหวัง') === statusFilter);
        
        let matchDate = true;
        if (startDate || endDate) {
            let cDate = new Date(c.timestamp);
            cDate.setHours(0,0,0,0);
            if (startDate) {
                let sDate = new Date(startDate);
                sDate.setHours(0,0,0,0);
                if (cDate < sDate) matchDate = false;
            }
            if (endDate) {
                let eDate = new Date(endDate);
                eDate.setHours(0,0,0,0);
                if (cDate > eDate) matchDate = false;
            }
        }
        return matchKeyword && matchStatus && matchDate;
    });

    if (currentCRMView === 'table') renderCRMTable(window.currentFilteredClients);
    else renderKanbanBoard(window.currentFilteredClients);
}

// 5. ระบบจัดเรียงตาราง
function sortCRMTable(col) {
    if (currentSort.col === col) {
        currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.col = col;
        currentSort.dir = 'desc'; 
    }
    applySorting();
    filterCRMTable();
}

function applySorting() {
    crmClientsList.sort((a, b) => {
        let valA, valB;
        if (currentSort.col === 'name') { valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); }
        else if (currentSort.col === 'status') { valA = a.status || ''; valB = b.status || ''; }
        else if (currentSort.col === 'aum') { valA = a.netWorth || 0; valB = b.netWorth || 0; }
        else if (currentSort.col === 'appt') { valA = a.nextAppointment || ''; valB = b.nextAppointment || ''; }
        else { valA = a.timestamp; valB = b.timestamp; } 

        if (valA < valB) return currentSort.dir === 'asc' ? -1 : 1;
        if (valA > valB) return currentSort.dir === 'asc' ? 1 : -1;
        return 0;
    });
}

// 6. เรนเดอร์มุมมองตาราง (Table View) 
function renderCRMTable(clients) {
    let tbody = document.getElementById('crm_table_body');
    if (!tbody) return;
    
    let html = '';
    if (clients.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-400 italic">ไม่พบข้อมูลลูกค้าที่ตรงกับเงื่อนไข</td></tr>`;
        return;
    } 

    const todayStr = new Date().toISOString().slice(0, 10);

    clients.forEach(c => {
        let nwText = c.netWorth >= 1000000 ? (c.netWorth / 1000000).toFixed(2) + ' M' : (c.netWorth / 10000).toFixed(1) + ' หมื่น';
        let statusDisplay = getStatusBadge(c.status || 'ผู้มุ่งหวัง');
        
        let apptHtml = "-";
        if (c.nextAppointment) {
            let apptDate = new Date(c.nextAppointment);
            let displayDate = apptDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
            if (c.nextAppointment < todayStr) apptHtml = `<span class="bg-red-100 text-red-700 px-2 py-1 rounded font-bold text-[10px] animate-pulse shadow-sm">🚨 เลยกำหนด (${displayDate})</span>`;
            else if (c.nextAppointment === todayStr) apptHtml = `<span class="bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold text-[10px] shadow-sm">🔔 วันนี้!</span>`;
            else apptHtml = `<span class="text-xs font-semibold text-indigo-600 border border-indigo-100 px-2 py-1 rounded bg-indigo-50">${displayDate}</span>`;
        }

        let tagsHtml = c.tags && c.tags.length > 0 ? `<div class="mt-1 flex flex-wrap gap-1">` + c.tags.map(t => `<span class="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-sm border border-gray-200">#${SecurityCore.escapeHTML(t)}</span>`).join('') + `</div>` : '';
        
        let isClosedWon = (c.status === 'ปิดการขาย' || c.status === 'เข้าเยี่ยมหลังการขาย');
        let safeName = SecurityCore.escapeHTML(c.name); 
        let nameDisplay = isClosedWon ? `<span class="text-green-700 font-bold">🏆 ${safeName}</span>` : safeName;
        let rowHighlight = isClosedWon ? 'bg-green-50/30 border-green-100' : 'hover:bg-blue-50 border-gray-50';

        html += `
        <tr class="transition border-b group ${rowHighlight}">
            <td class="p-3 text-center">
                <input type="checkbox" value="${c.id}" class="crm-row-checkbox w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" onchange="updateBulkActionBar()">
            </td>
            <td class="p-3">
                <div class="font-bold text-gray-800">${nameDisplay} <span class="text-xs text-indigo-500 font-normal">(${c.id})</span></div>
                <div class="text-[10px] text-gray-400">อัปเดตล่าสุด: ${c.dateString}</div>
                ${tagsHtml}
            </td>
            <td class="p-3 text-center">${statusDisplay}</td>
            <td class="p-3 font-semibold text-emerald-600">${nwText}</td>
            <td class="p-3 text-center">${apptHtml}</td>
            <td class="p-3 text-center">
                <div class="flex justify-center gap-1 transition-opacity">
                    <button onclick="openClientReviewModal('${c.id}')" class="bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white p-1.5 rounded text-xs font-bold transition shadow-sm" title="พรีวิวสรุปข้อมูล">🔍</button>
                    <button onclick="openVNManagerModal('${c.id}')" class="bg-teal-100 text-teal-700 hover:bg-teal-600 hover:text-white p-1.5 rounded text-xs font-bold transition shadow-sm" title="ประวัติการเข้าพบ (VN)">📂</button>
                    <button onclick="deleteClientFromCRM('${c.id}', '${safeName}')" class="bg-red-100 text-red-700 hover:bg-red-600 hover:text-white p-1.5 rounded text-xs font-bold transition shadow-sm" title="ลบข้อมูล">🗑️</button>
                </div>
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

// ==========================================
// 📌 7. ระบบ Kanban Board (Drag & Drop)
// ==========================================
const KANBAN_STAGES = [
    { id: 'ผู้มุ่งหวัง', title: '🎯 ผู้มุ่งหวัง', color: 'gray' },
    { id: 'กำลังติดตาม', title: '⏳ กำลังติดตาม', color: 'purple' },
    { id: 'นำเสนอแผน', title: '📑 นำเสนอแผน', color: 'blue' },
    { id: 'รอดำเนินการ', title: '⏱️ รอดำเนินการ', color: 'yellow' },
    { id: 'ปิดการขาย', title: '✅ ปิดการขาย', color: 'green' },
    { id: 'เข้าเยี่ยมหลังการขาย', title: '🤝 บริการหลังขาย', color: 'teal' },
    { id: 'ปฏิเสธ', title: '❌ ปฏิเสธ', color: 'red' }
];

function toggleCRMView(viewType) {
    currentCRMView = viewType;
    const tableDiv = document.getElementById('crm_view_table');
    const kanbanDiv = document.getElementById('crm_view_kanban');
    const btnTable = document.getElementById('btn_view_table');
    const btnKanban = document.getElementById('btn_view_kanban');

    if (viewType === 'table') {
        tableDiv.classList.replace('hidden', 'block');
        kanbanDiv.classList.replace('block', 'hidden');
        btnTable.className = "px-2 py-1 rounded bg-white shadow-sm text-blue-600 text-xs font-bold";
        btnKanban.className = "px-2 py-1 rounded text-gray-500 hover:bg-gray-200 text-xs font-medium";
    } else {
        tableDiv.classList.replace('block', 'hidden');
        kanbanDiv.classList.replace('hidden', 'block');
        btnKanban.className = "px-2 py-1 rounded bg-white shadow-sm text-blue-600 text-xs font-bold";
        btnTable.className = "px-2 py-1 rounded text-gray-500 hover:bg-gray-200 text-xs font-medium";
    }
    filterCRMTable(); 
}

function renderKanbanBoard(clients) {
    const container = document.getElementById('crm_kanban_container');
    if (!container) return;
    
    let html = '';
    const todayStr = new Date().toISOString().slice(0, 10);

    KANBAN_STAGES.forEach(stage => {
        let stageClients = clients.filter(c => (c.status || 'ผู้มุ่งหวัง') === stage.id);
        
        let cardsHtml = stageClients.map(c => {
            let nwText = c.netWorth >= 1000000 ? (c.netWorth / 1000000).toFixed(1) + 'M' : (c.netWorth / 10000).toFixed(1) + 'k';
            let isClosedWon = (c.status === 'ปิดการขาย' || c.status === 'เข้าเยี่ยมหลังการขาย');
            let safeName = SecurityCore.escapeHTML(c.name); 
            let nameDisplay = isClosedWon ? `🏆 <span class="text-green-700">${safeName}</span>` : safeName;

            let alertBadge = '';
            if (c.nextAppointment && c.nextAppointment <= todayStr) {
                let isOverdue = c.nextAppointment < todayStr;
                alertBadge = `<div class="${isOverdue ? 'bg-red-500 animate-pulse' : 'bg-orange-500'} w-2 h-2 rounded-full absolute top-2 right-2" title="${isOverdue ? 'เลยนัดหมาย' : 'นัดหมายวันนี้'}"></div>`;
            }

            return `
            <div class="bg-white p-3 rounded-lg shadow-sm border ${isClosedWon ? 'border-green-200 bg-green-50/20' : 'border-gray-200'} mb-3 cursor-grab hover:shadow-md hover:border-blue-300 transition relative group" 
                 draggable="true" ondragstart="dragKanbanCard(event, '${c.id}')">
                ${alertBadge}
                <p class="font-bold text-sm text-gray-800 truncate pr-4" title="${safeName}">${nameDisplay}</p>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-xs font-semibold text-emerald-600">${nwText}</span>
                    <span class="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">${c.aiScore !== '-' ? c.aiScore+'%' : 'N/A'}</span>
                </div>
                <div class="mt-2 pt-2 border-t border-gray-100 flex justify-between gap-1 transition-opacity">
                    <button onclick="openClientReviewModal('${c.id}')" class="flex-1 bg-gray-50 hover:bg-blue-100 text-gray-600 hover:text-blue-700 py-1 rounded text-[10px] font-bold border border-gray-200">🔍 พรีวิว</button>
                    <button onclick="openVNManagerModal('${c.id}')" class="flex-1 bg-gray-50 hover:bg-teal-100 text-gray-600 hover:text-teal-700 py-1 rounded text-[10px] font-bold border border-gray-200">📂 ประวัติ VN</button>
                </div>  
            </div>`;
        }).join('');

        html += `
        <div class="bg-gray-100/50 rounded-xl border border-gray-200 w-64 flex-shrink-0 flex flex-col max-h-full"
             ondragover="allowDropKanban(event)" ondrop="dropKanbanCard(event, '${stage.id}')">
            <div class="p-3 border-b border-gray-200 flex justify-between items-center bg-${stage.color}-50/50 rounded-t-xl">
                <h4 class="font-bold text-${stage.color}-800 text-sm">${stage.title}</h4>
                <span class="bg-white text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-sm">${stageClients.length}</span>
            </div>
            <div class="p-2 flex-grow overflow-y-auto custom-scrollbar">
                ${cardsHtml}
                <div class="h-10 border-2 border-dashed border-transparent rounded-lg drop-zone-indicator transition-colors"></div>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

let draggedClientId = null;
function dragKanbanCard(ev, id) { draggedClientId = id; ev.dataTransfer.effectAllowed = 'move'; }
function allowDropKanban(ev) { ev.preventDefault(); ev.dataTransfer.dropEffect = 'move'; }
function dropKanbanCard(ev, newStatus) {
    ev.preventDefault();
    if (!draggedClientId) return;

    let transaction = crmDB.transaction(["clients"], "readwrite");
    let store = transaction.objectStore("clients");
    let req = store.get(draggedClientId);
    
    req.onsuccess = function(e) {
        let rawClient = e.target.result;
        if (rawClient) {
            // ถอดรหัสก่อนแก้ไข
            let clientData = rawClient.securePayload ? SecurityCore.decrypt(rawClient.securePayload) : rawClient;
            if (clientData && clientData.status !== newStatus) {
                clientData.status = newStatus;
                if (!clientData.notesHistory) clientData.notesHistory = [];
                clientData.notesHistory.push({
                    date: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }),
                    text: `🔄 ย้ายสถานะเป็น: ${newStatus}`,
                    timestamp: new Date().getTime()
                });
                
                // 🔒 เข้ารหัสกลับ
                if (rawClient.securePayload) {
                    rawClient.securePayload = SecurityCore.encrypt(clientData);
                } else {
                    rawClient = clientData; // Backward compatibility
                }
                
                store.put(rawClient).onsuccess = function() { refreshCRMTable(); };
            }
        }
    };
    draggedClientId = null;
}

// ==========================================
// 📝 8. อัปเกรดระบบ Modal จัดการลูกค้า (จัดการแบบระบุ XN / VN)
// ==========================================
function openCRMClientModal(xn_id, vn_id) {
    let client = crmClientsList.find(c => c.id === xn_id); // ค้นหาลูกค้าด้วย XN
    if (!client || !client.fullData) return;

    // 📌 ค้นหา VN ที่ถูกคลิกเลือก
    let targetVisitIndex = client.fullData.visits.findIndex(v => v.VN === vn_id);
    if (targetVisitIndex === -1) return alert("ไม่พบข้อมูล VN นี้");
    let targetVisit = client.fullData.visits[targetVisitIndex];

    document.getElementById('crm_modal_id').value = client.id;
    window.currentEditingVN = vn_id; 

    document.getElementById('crm_modal_name').innerHTML = `${client.name} <br><span class="text-sm font-normal text-indigo-600">(รหัสลูกค้า: ${client.id} | แผน: ${vn_id})</span>`;
    
    document.getElementById('crm_modal_date').value = client.nextAppointment || "";
    document.getElementById('crm_modal_tags').value = (client.tags || []).join(', ');
    
    const inputNote = document.getElementById('crm_modal_new_note');
    const inputDate = document.getElementById('crm_modal_note_date');
    if(inputNote) inputNote.value = "";
    if(inputDate) inputDate.value = new Date().toISOString().slice(0, 10);
    
    const btnSaveNote = document.getElementById('btn_save_note');
    if(btnSaveNote) {
        btnSaveNote.innerText = "เพิ่มบันทึกใน VN นี้";
        btnSaveNote.classList.replace('bg-blue-600', 'bg-indigo-600');
    }

    let statusSelect = document.getElementById('crm_modal_status');
    let optPostSale = document.getElementById('opt_post_sale');
    let hintText = document.getElementById('crm_status_hint');
    
    if (client.status === 'ปิดการขาย' || client.status === 'เข้าเยี่ยมหลังการขาย') {
        if(optPostSale) optPostSale.disabled = false;
        if(hintText) {
            hintText.innerText = "✅ ลูกค้าปิดการขายแล้ว สามารถเลือก 'เข้าเยี่ยมหลังการขาย' ได้";
            hintText.className = "text-[10px] text-green-600 mt-1 font-semibold";
        }
    } else {
        if(optPostSale) optPostSale.disabled = true;
        if(hintText) {
            hintText.innerText = "🔒 สถานะ 'เข้าเยี่ยมหลังการขาย' จะเปิดเมื่อปิดการขายสำเร็จเท่านั้น";
            hintText.className = "text-[10px] text-red-500 mt-1 font-medium";
        }
    }
    statusSelect.value = targetVisit.status || client.status || "ผู้มุ่งหวัง";

    tempNotesHistory = targetVisit.activities ? [...targetVisit.activities] : [];
    
    renderVNActivities();

    document.getElementById('vnManagerModal').classList.add('hidden');
    document.getElementById('crmClientModal').classList.remove('hidden');
}

// 📌 ฟังก์ชัน Render รายการ Activities สำหรับ VN เดียว
function renderVNActivities() {
    const container = document.getElementById('crm_modal_history_container');
    
    if (!tempNotesHistory || tempNotesHistory.length === 0) {
        container.innerHTML = `<p class="text-sm text-gray-400 italic text-center py-6 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">📝 ยังไม่มีบันทึกการทำงาน (Activities) ในแผนนี้ครับ</p>`;
        return;
    }

    let activitiesHtml = tempNotesHistory.map((act, aIdx) => `
        <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm relative mb-2 group/act">
            <div class="text-[10px] text-gray-500 font-bold mb-1">${act.date.replace(/\s\d{2}:\d{2}.*/, '')}</div>
            <div class="text-sm text-gray-700 whitespace-pre-wrap pl-2 border-l-2 border-indigo-300">${SecurityCore.escapeHTML(act.text)}</div>
            <button type="button" onclick="deleteActivity(${aIdx})" class="absolute right-2 top-2 text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded opacity-0 group-hover/act:opacity-100 transition-opacity border border-red-100 hover:bg-red-100">ลบ</button>
        </div>
    `).join('');

    container.innerHTML = activitiesHtml;
}

window.addNoteToModalHistory = function() {
    const input = document.getElementById('crm_modal_new_note');
    const dateInput = document.getElementById('crm_modal_note_date').value;
    const text = input.value.trim();
    if (!text) return;

    let dateObj = dateInput ? new Date(dateInput) : new Date();
    let displayDate = dateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    let timestampToSave = dateObj.getTime();

    tempNotesHistory.push({
        date: displayDate,
        text: text,
        timestamp: timestampToSave
    });
    
    input.value = ""; 
    renderVNActivities(); 
};

window.deleteActivity = function(aIdx) {
    if(confirm('ลบบันทึกการทำงานนี้ใช่หรือไม่?')) {
        tempNotesHistory.splice(aIdx, 1);
        renderVNActivities();
    }
};

function saveCRMClientModal() {
    let id = document.getElementById('crm_modal_id').value; // คือ XN
    let vn_id = window.currentEditingVN; 
    
    let newStatus = document.getElementById('crm_modal_status').value;
    let newDate = document.getElementById('crm_modal_date').value;
    let newTags = document.getElementById('crm_modal_tags').value.split(',').map(t => t.trim().replace(/^#/, '')).filter(t => t !== "");

    let transaction = crmDB.transaction(["clients"], "readwrite");
    let store = transaction.objectStore("clients");
    
    let request = store.get(id);
    request.onsuccess = function(e) {
        let rawClient = e.target.result;
        if (rawClient) {
            let clientData = rawClient.securePayload ? SecurityCore.decrypt(rawClient.securePayload) : rawClient;
            if (clientData) {
                // 1. อัปเดตข้อมูลระดับ XN (ตัวแม่)
                clientData.status = newStatus;
                clientData.nextAppointment = newDate;
                clientData.tags = newTags;
                
                // 2. อัปเดตข้อมูลระดับ VN (ตัวลูก)
                let targetVisit = clientData.visits.find(v => v.VN === vn_id);
                if (targetVisit) {
                    targetVisit.clientStatus = newStatus; 
                    targetVisit.activities = tempNotesHistory; 
                }
                
                rawClient.timestamp = new Date().getTime(); 
                
                // 🔒 เข้ารหัสกลับ
                if (rawClient.securePayload) {
                    rawClient.securePayload = SecurityCore.encrypt(clientData);
                } else {
                    rawClient = clientData; 
                }

                store.put(rawClient).onsuccess = function() {
                    closeCRMClientModal(); 
                    refreshCRMTable();     
                    openVNManagerModal(id); 
                };
            }
        }
    };
}

function closeCRMClientModal() { document.getElementById('crmClientModal').classList.add('hidden'); }

// ==========================================
// 🛠️ 9. ระบบจัดการกลุ่ม (Bulk Operations) & พิมพ์ที่เลือก
// ==========================================
function toggleSelectAllCRM(source) {
    let checkboxes = document.querySelectorAll('.crm-row-checkbox');
    checkboxes.forEach(chk => chk.checked = source.checked);
    updateBulkActionBar();
}

function updateBulkActionBar() {
    let checkboxes = document.querySelectorAll('.crm-row-checkbox:checked');
    let actionBar = document.getElementById('crm_bulk_action_bar');
    let countText = document.getElementById('crm_selected_count');
    
    if (checkboxes.length > 0) {
        actionBar.classList.remove('hidden');
        countText.innerText = `เลือก ${checkboxes.length} รายการ`;
    } else {
        actionBar.classList.add('hidden');
        document.getElementById('crm_bulk_status_update').value = ""; 
    }
}

function printSelectedCRM() {
    let checkboxes = document.querySelectorAll('.crm-row-checkbox:checked');
    if (checkboxes.length === 0) return alert("กรุณาเลือกรายการที่ต้องการพิมพ์ครับ");
    
    let selectedIds = Array.from(checkboxes).map(chk => chk.value);
    let selectedClients = crmClientsList.filter(c => selectedIds.includes(c.id));
    
    printCRMReport(selectedClients, true); 
}

function deleteSelectedCRM() {
    let checkboxes = document.querySelectorAll('.crm-row-checkbox:checked');
    if (checkboxes.length === 0) return;

    if(confirm(`⚠️ คำเตือน: ลบข้อมูลลูกค้าทั้ง ${checkboxes.length} รายการ อย่างถาวร?`)) {
        let transaction = crmDB.transaction(["clients"], "readwrite");
        let store = transaction.objectStore("clients");
        let deletedCount = 0;
        
        checkboxes.forEach(chk => { store.delete(chk.value); deletedCount++; });

        transaction.oncomplete = function() {
            // 🌟 [แก้ไข 100%] ล้างตัวแปรในหน่วยความจำทิ้งทันที เพื่อบังคับให้ระบบไปอ่านจาก DB ใหม่
            crmClientsList = []; 
            window.currentFilteredClients = [];
            
            alert(`🗑️ ลบสำเร็จ ${deletedCount} รายการ`);
            
            // สั่งดึงข้อมูลจาก DB มาแสดงบนตาราง CRM ใหม่
            refreshCRMTable();
            
            // สั่งให้หน้า Dashboard อัปเดตตัวเองใหม่ (โดยจะไปอ่านจาก DB ที่ว่างเปล่า)
            if (typeof renderAnalyticsDashboard === 'function') {
                renderAnalyticsDashboard(); 
            }
        };
    }
}

function bulkUpdateStatus(selectEl) {
    let newStatus = selectEl.value;
    if (!newStatus) return;

    let checkboxes = document.querySelectorAll('.crm-row-checkbox:checked');
    if (checkboxes.length === 0) return;

    if(confirm(`คุณต้องการเปลี่ยนสถานะลูกค้า ${checkboxes.length} รายการ ให้เป็น "${newStatus}" ใช่หรือไม่?`)) {
        let transaction = crmDB.transaction(["clients"], "readwrite");
        let store = transaction.objectStore("clients");
        
        checkboxes.forEach(chk => {
            let req = store.get(chk.value);
            req.onsuccess = function(e) {
                let rawClient = e.target.result;
                if (rawClient) {
                    let clientData = rawClient.securePayload ? SecurityCore.decrypt(rawClient.securePayload) : rawClient;
                    if (clientData) {
                        clientData.status = newStatus;
                        // 🔒 เข้ารหัสกลับ
                        if (rawClient.securePayload) {
                            rawClient.securePayload = SecurityCore.encrypt(clientData);
                        } else {
                            rawClient = clientData; 
                        }
                        store.put(rawClient);
                    }
                }
            };
        });

        transaction.oncomplete = function() {
            alert(`✅ เปลี่ยนสถานะสำเร็จ!`);
            refreshCRMTable();
            selectEl.value = ""; 
        };
    } else {
        selectEl.value = ""; 
    }
}

// ==========================================
// 📊 10. ระบบ Export / Import (JSON & CSV)
// ==========================================
function exportCRMToExcel() {
    let listToExport = window.currentFilteredClients || crmClientsList;
    if (listToExport.length === 0) return alert("⚠️ ไม่มีข้อมูลให้ส่งออกครับ");
    
    let csvContent = "\uFEFF"; 
    csvContent += "รหัสอ้างอิง,ชื่อลูกค้า,สถานะ,ความมั่งคั่ง (AUM),นัดหมายถัดไป,AI Score,AI Cluster,Tags,บันทึกล่าสุด,อัปเดตเมื่อ\n";

    listToExport.forEach(c => {
        let id = c.id;
        let name = `"${c.name || ''}"`; 
        let status = c.status || '';
        let aum = c.netWorth || 0;
        let appt = c.nextAppointment || '';
        let score = c.aiScore || '';
        let cluster = `"${c.aiCluster || ''}"`;
        let tags = `"${(c.tags || []).join(', ')}"`;
        
        let lastNote = "";
        if (c.notesHistory && c.notesHistory.length > 0) {
            let sorted = [...c.notesHistory].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            lastNote = `"${sorted[0].text.replace(/"/g, '""')}"`;
        }
        let dateStr = c.dateString || '';

        csvContent += `${id},${name},${status},${aum},${appt},${score},${cluster},${tags},${lastNote},${dateStr}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    let dateStamp = new Date().toISOString().slice(0,10).replace(/-/g, "");
    link.setAttribute("download", `FA_Pipeline_Report_${dateStamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportCRMData() {
    if (!crmDB) return;
    let transaction = crmDB.transaction(["clients"], "readonly");
    let store = transaction.objectStore("clients");
    let req = store.getAll();
    req.onsuccess = function(e) {
        let dbClients = e.target.result;
        if (dbClients.length === 0) return alert("ไม่มีข้อมูลลูกค้าให้สำรองครับ");
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dbClients, null, 2));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        let dateStr = new Date().toISOString().slice(0,10).replace(/-/g, "");
        dlAnchorElem.setAttribute("download", `FA_CRM_Backup_${dateStr}.json`);
        dlAnchorElem.click();
    };
}

function importCRMData(event) {
    const file = event.target.files[0];
    if (!file) return;

    if(!confirm("⚠️ นำเข้าข้อมูลจะเขียนทับฐานข้อมูล (หากชื่อซ้ำจะอัปเดตข้อมูล) ดำเนินการต่อหรือไม่?")) {
        event.target.value = ''; return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (!Array.isArray(importedData)) throw new Error("รูปแบบไฟล์ Backup ไม่ถูกต้อง (ต้องเป็น Array)");
            
            let transaction = crmDB.transaction(["clients"], "readwrite");
            let store = transaction.objectStore("clients");
            let importCount = 0;

            importedData.forEach(client => {
                if (client.id && (client.dataPayload || client.securePayload)) {
                    if(!client.status && !client.securePayload) client.status = "ผู้มุ่งหวัง";
                    store.put(client); 
                    importCount++;
                }
            });

            transaction.oncomplete = function() {
                alert(`✅ นำเข้าข้อมูลสำเร็จ ${importCount} รายการ!`);
                refreshCRMTable(); 
            };
        } catch (err) {
            console.error(err);
            alert('❌ เกิดข้อผิดพลาด: ไฟล์ Backup ไม่ถูกต้องหรือไม่สามารถอ่านข้อมูลได้');
        }
        event.target.value = ''; 
    };
    reader.readAsText(file);
}

// ⬇️ 11. โหลดข้อมูลรายบุคคล & ลบรายบุคคล (รองรับโครงสร้าง XN / VN)
function loadClientFromCRM(id) {
    if (!crmDB || !window.SESSION_KEY) return;
    let clientToLoad = crmClientsList.find(c => c.id === id); 

    if (clientToLoad && clientToLoad.fullData && clientToLoad.fullData.visits && clientToLoad.fullData.visits.length > 0) {
        
        let latestVisit = clientToLoad.fullData.visits[0];

        if(confirm(`คุณต้องการโหลดข้อมูลของ "${SecurityCore.escapeHTML(clientToLoad.name)}" ใช่หรือไม่?\n(ข้อมูลบนหน้าจอปัจจุบันจะถูกล้างและเขียนทับใหม่)`)) {
            if (typeof closeSettings === 'function') closeSettings();
            if (typeof toggleMode === 'function') toggleMode('edit');
            if(typeof clearDataForLoad === 'function') clearDataForLoad();
            if(document.getElementById('mainForm')) document.getElementById('mainForm').reset();

            let data = latestVisit.dataSnapshot; 

            if(data.profile) { for (let key in data.profile) { if(document.getElementById(key)) document.getElementById(key).value = data.profile[key]; } }
            if(data.retirement) {
                for (let key in data.retirement) {
                    let el = document.getElementById(key);
                    if(el) {
                        if (key === 'r_reqInc' && typeof parseNum === 'function') el.value = parseNum(data.retirement[key]).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                        else el.value = data.retirement[key];
                    }
                }
            }
            if(data.dynamic) {
                if(typeof loadStandardRows === 'function') {
                    loadStandardRows('c_assets', data.dynamic.c_assets, ['ชื่อรายการ', 'มูลค่า (บาท)'], 'ast_list');
                    loadStandardRows('c_liab', data.dynamic.c_liab, ['ชื่อรายการ', 'ยอดคงเหลือ (บาท)'], 'liab_list');
                    loadStandardRows('c_inc', data.dynamic.c_inc, ['ชื่อรายการ', 'จำนวน (บาท/เดือน)'], 'inc_list');
                    loadStandardRows('c_exp', data.dynamic.c_exp, ['ชื่อรายการ', 'จำนวน (บาท/เดือน)'], 'exp_list');
                }
                if(data.dynamic.c_ins && typeof addInsRow === 'function') {
                    data.dynamic.c_ins.forEach(vals => {
                        if (vals[0] === 'สัญญาหลัก') addInsRow(vals[1], vals[2], vals[3], vals[7], vals[0], vals[5], vals[6], vals[4]);
                        else if (vals[0] === 'สัญญาเพิ่มเติม') addInsRow(vals[2], vals[3], vals[4], vals[5], vals[0]);
                        else {
                            if(vals.length >= 8) addInsRow(vals[0], vals[2], vals[3], vals[7], vals[1], vals[4], vals[5], vals[6]);
                            else addInsRow(vals[0], vals[1], vals[2], vals[3]);
                        }
                    });
                }
                if(data.dynamic.c_goals && typeof addCustomRow === 'function') {
                    data.dynamic.c_goals.forEach(vals => addCustomRow('c_goals', ['ชื่อเป้าหมาย (Specific)', 'จำนวนเงินที่ต้องการ (Measurable)', 'ระยะเวลา/ปี (Time-bound)', 'ระดับความสำคัญ (1=สูงสุด)'], vals, ['goal_list', '', '', '']));
                }
                if(data.dynamic.c_invest_current && typeof addInvestRow === 'function') {
                    data.dynamic.c_invest_current.forEach(vals => addInvestRow(vals[0], vals[1], vals[2], vals[3]));
                }
                if(data.dynamic.c_tax_current && typeof addCustomRow === 'function') {
                    data.dynamic.c_tax_current.forEach(vals => addCustomRow('c_tax_current', ['รายการลดหย่อน (อ้างอิง ภ.ง.ด.90/91)', 'จำนวนเงิน (บาท)'], vals, ['tax_list', '']));
                }
            }
            if(typeof syncAgeToRisk === 'function') syncAgeToRisk();
            setTimeout(() => {
                if(confirm(`✅ โหลดข้อมูลของคุณ "${SecurityCore.escapeHTML(clientToLoad.name)}" ลงหน้าจอสำเร็จ!\n\nต้องการให้ AI ประมวลผลและสร้างรายงาน (Report) ใหม่ทันทีหรือไม่?`)) {
                    if (typeof processReportInit === 'function') processReportInit(); 
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 500); 
        }
    } else {
        alert("⚠️ ไม่พบประวัติการเข้าพบ (VN) ของลูกค้ารายนี้ หรือข้อมูลอยู่ในรูปแบบเก่าที่ไม่รองรับครับ");
    }
}

function deleteClientFromCRM(id, name) {
    if(confirm(`⚠️ คำเตือน: คุณแน่ใจหรือไม่ที่จะลบข้อมูลของ "${name}" อย่างถาวร?\n(ประวัติการเข้าพบ VN ทั้งหมดจะถูกลบไปด้วย)`)) {
        let transaction = crmDB.transaction(["clients"], "readwrite");
        let store = transaction.objectStore("clients");
        let request = store.delete(id);
        request.onsuccess = function() { refreshCRMTable(); };
    }
}

// ==========================================
// 🖨️ 12. ฟังก์ชันพิมพ์รายงานสรุป CRM 
// ==========================================
function printCRMReport(clientsToPrint = null, isSelectedMode = false) {
    let listToPrint = clientsToPrint || window.currentFilteredClients || crmClientsList;

    if (!listToPrint || listToPrint.length === 0) {
        alert("⚠️ ไม่มีข้อมูลลูกค้าในระบบสำหรับพิมพ์รายงานครับ");
        return;
    }

    let totalAUM = listToPrint.reduce((sum, c) => sum + (c.netWorth || 0), 0);
    let totalClients = listToPrint.length;
    let printDate = new Date().toLocaleString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    let reportSubtitle = isSelectedMode ? "รายงานแสดงเฉพาะรายชื่อลูกค้าที่กำหนด" : "รายงานจากตัวกรองการค้นหาปัจจุบัน";

    let tableRows = listToPrint.map(c => {
        let aiScoreDisplay = c.aiScore && c.aiScore !== "-" ? `${c.aiScore}` : "-";
        let aiClusterDisplay = c.aiCluster && c.aiCluster !== "-" ? c.aiCluster : "-";
        let nextApptDisplay = c.nextAppointment ? new Date(c.nextAppointment).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' }) : "-";
        let isClosedWon = (c.status === 'ปิดการขาย' || c.status === 'เข้าเยี่ยมหลังการขาย');
        let safeName = SecurityCore.escapeHTML(c.name); 
        let nameDisplay = isClosedWon ? `🏆 ${safeName}` : safeName;
        
        let allNotesHtml = "-";
        let allActivities = [];

        if (c.fullData && c.fullData.visits) {
            c.fullData.visits.forEach(visit => {
                if (visit.activities && visit.activities.length > 0) {
                    visit.activities.forEach(act => {
                        allActivities.push({
                            date: act.date,
                            text: `[${visit.VN}] ${act.text}`, 
                            timestamp: act.timestamp
                        });
                    });
                }
            });
        }

        if (allActivities.length > 0) {
            let sorted = allActivities.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            allNotesHtml = sorted.map(n => {
                let cleanDate = n.date.replace(/\s\d{2}:\d{2}.*/, ''); 
                return `<div style="margin-bottom:4px;">• <b>${SecurityCore.escapeHTML(cleanDate)}:</b> ${SecurityCore.escapeHTML(n.text)}</div>`;
            }).join('');
        }
        
        let tagsDisplay = (c.tags && c.tags.length > 0) ? `<br><span style="color:#6b7280; font-size:10px;">#${SecurityCore.escapeHTML(c.tags.join(' #'))}</span>` : "";
        
        return `
            <tr>
                <td class="${isClosedWon ? 'font-bold text-green-800' : 'font-semibold text-gray-800'}">${nameDisplay}${tagsDisplay}</td>
                <td class="text-center">${c.status || '-'}</td>
                <td class="text-right text-blue-700">${(c.netWorth || 0).toLocaleString('th-TH')}</td>
                <td class="text-center font-bold text-indigo-700">${aiScoreDisplay}</td>
                <td class="cluster-col">${aiClusterDisplay}</td> 
                <td class="text-center">${nextApptDisplay}</td>
                <td class="notes-col">${allNotesHtml}</td>
            </tr>
        `;
    }).join('');

    let printWindow = window.open('', '_blank');
    
    let html = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <title>รายงานสถานะลูกค้า (CRM Report)</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');
            body { 
                font-family: 'Prompt', sans-serif; 
                color: #1f2937; 
                padding: 20px;
                font-size: 11px;
                background-color: #f9fafb;
            }
            .container {
                max-width: 100%;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .action-bar {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e5e7eb;
            }
            .btn {
                font-family: 'Prompt', sans-serif;
                font-weight: 600;
                font-size: 13px;
                padding: 8px 16px;
                border-radius: 6px;
                border: none;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .btn-close { background-color: #fef2f2; color: #b91c1c; border: 1px solid #f87171; }
            .btn-close:hover { background-color: #fee2e2; transform: translateY(-1px); }
            .btn-print { background-color: #2563eb; color: white; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2); }
            .btn-print:hover { background-color: #1d4ed8; transform: translateY(-1px); }
            
            .header { text-align: center; margin-bottom: 20px; }
            .header h2 { margin: 0 0 5px 0; color: #1e3a8a; font-size: 20px; }
            .header p { margin: 0; color: #6b7280; font-size: 12px; }
            .summary-box { 
                display: flex; justify-content: space-between; 
                background-color: #f3f4f6; padding: 12px 20px; 
                border-radius: 8px; margin-bottom: 20px; 
                font-weight: 600; font-size: 14px; border: 1px solid #e5e7eb;
            }
            table { width: 100%; border-collapse: collapse; table-layout: auto; }
            th, td { padding: 6px 8px; text-align: left; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
            th { 
                background-color: #e0e7ff; color: #3730a3; 
                font-weight: 600; border-top: 2px solid #4f46e5; white-space: nowrap;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: 700; }
            .text-blue-700 { color: #1d4ed8; }
            .text-indigo-700 { color: #4338ca; }
            .text-green-800 { color: #166534; }
            
            .notes-col { width: 35%; color: #4b5563; font-size: 10px; line-height: 1.5; }
            .cluster-col { width: 12%; color: #047857; font-size: 10px; font-weight: 500; }
            
            @media print {
                @page { margin: 10mm 15mm; size: A4 landscape; }
                body { padding: 0; background-color: white; }
                .container { box-shadow: none; padding: 0; }
                .no-print { display: none !important; }
                .summary-box { border: 1px solid #d1d5db; background-color: transparent !important; -webkit-print-color-adjust: exact; }
                th { background-color: #f3f4f6 !important; -webkit-print-color-adjust: exact; }
                tr { page-break-inside: avoid; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            
            <div class="action-bar no-print">
                <button class="btn btn-close" onclick="window.close()">❌ ปิดหน้าต่าง (กลับสู่ CRM)</button>
                <button class="btn btn-print" onclick="window.print()">🖨️ บันทึกเป็น PDF / พิมพ์</button>
            </div>

            <div class="header">
                <h2>รายงานสรุปสถานะลูกค้า (CRM Executive Report)</h2>
                <p>ข้อมูล ณ วันที่: ${printDate} | ${reportSubtitle}</p>
            </div>

            <div class="summary-box">
                <span>👥 จำนวนลูกค้าในรายงาน: ${totalClients.toLocaleString()} ราย</span>
                <span>💰 มูลค่าพอร์ตรวม (AUM): ${totalAUM.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ชื่อลูกค้า</th>
                        <th class="text-center">สถานะปัจจุบัน</th>
                        <th class="text-right">ความมั่งคั่งสุทธิ (บาท)</th>
                        <th class="text-center">AI Score</th>
                        <th>กลุ่มพฤติกรรม (AI Cluster)</th> 
                        <th class="text-center">นัดหมายถัดไป</th>
                        <th class="notes-col">ประวัติการทำงานทั้งหมด (All Notes History)</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    </body>
    </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
}

// =====================================================================
// 📈 กราฟแสดงพัฒนาการทางการเงินของลูกค้า (Financial Evolution Chart)
// =====================================================================
let progressChartInstance = null;

function renderClientProgressChart(clientData) {
    // ต้องมี object clientData และ properties visits
    if (!clientData || !clientData.visits || clientData.visits.length === 0) return;

    // 1. เรียงประวัติ VN จากเก่าสุดไปใหม่สุด (ซ้ายไปขวา)
    let sortedVisits = [...clientData.visits].sort((a, b) => a.timestamp - b.timestamp);
    
    let labels = [];
    let netWorthData = [];
    let debtData = [];
    let scoreData = [];

    // 2. กวาดข้อมูลจากแต่ละ VN
    sortedVisits.forEach((v, index) => {
        // สร้างป้ายชื่อแกน X เป็น วันที่ (เช่น 15/08/67) หรือใช้คำว่า "เริ่มต้น" สำหรับ VN แรก
        let dateObj = new Date(v.timestamp);
        let shortDate = `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear().toString().substr(-2)}`;
        labels.push(index === 0 ? `เริ่มต้น (${shortDate})` : `อัปเดต ${shortDate}`);

        // ดึงความมั่งคั่งสุทธิ
        netWorthData.push(v.netWorth || 0);

        // ดึงภาระหนี้สิน (รวมยอดหนี้ทุกประเภท)
        let totalDebt = 0;
        if (v.dataSnapshot && v.dataSnapshot.dynamic && v.dataSnapshot.dynamic.c_liab) {
            // เช็คและแปลงค่า val ให้เป็นตัวเลข ป้องกันบั๊ก string ที่มีลูกน้ำ
            totalDebt = v.dataSnapshot.dynamic.c_liab.reduce((sum, item) => {
                let val = typeof item.val === 'string' ? Number(item.val.replace(/,/g, '')) : (item.val || 0);
                return sum + val;
            }, 0);
        }
        debtData.push(totalDebt);

        // ดึงโอกาสสำเร็จ หรือ AI Score
        let score = v.aiScore || 0;
        if (v.analytics && v.analytics.simulationStats) {
            score = v.analytics.simulationStats.probabilityProposed || score;
        }
        scoreData.push(score);
    });

    const ctx = document.getElementById('clientProgressChart');
    if (!ctx) return; // ดักไว้เผื่อหา ID กราฟไม่เจอ

    if (progressChartInstance) progressChartInstance.destroy();

    // 3. วาดกราฟ 3 มิติ (มั่งคั่ง, หนี้สิน, โอกาสสำเร็จ)
    progressChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    type: 'line',
                    label: 'โอกาสสำเร็จ (%)',
                    data: scoreData,
                    borderColor: '#10b981', // Emerald
                    backgroundColor: '#10b981',
                    borderWidth: 3,
                    yAxisID: 'y1',
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    type: 'line',
                    label: 'สินทรัพย์สุทธิ (บาท)',
                    data: netWorthData,
                    borderColor: '#3b82f6', // Blue
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    yAxisID: 'y',
                    tension: 0.3,
                    pointRadius: 4
                },
                {
                    type: 'bar',
                    label: 'หนี้สินรวม (บาท)',
                    data: debtData,
                    backgroundColor: 'rgba(239, 68, 68, 0.6)', // Red
                    borderRadius: 4,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear', display: true, position: 'left',
                    title: { display: true, text: 'มูลค่าการเงิน (บาท)' },
                    ticks: { callback: (value) => value > 0 ? (value / 1000000).toFixed(1) + 'M' : '0' }
                },
                y1: {
                    type: 'linear', display: true, position: 'right',
                    title: { display: true, text: 'โอกาสสำเร็จ (%)' },
                    min: 0, max: 100,
                    grid: { drawOnChartArea: false } // ป้องกันเส้น Grid ตีกัน
                },
                x: {
                    ticks: { font: { family: 'Prompt', size: 10 } }
                }
            },
            plugins: {
                legend: { position: 'bottom', labels: { font: { family: 'Prompt', size: 11 }, usePointStyle: true, boxWidth: 8 } },
                datalabels: { display: false } // ปิดตัวเลขบนกราฟจะได้ไม่รก
            }
        }
    });
}

// ==========================================
// 🔍 ฟังก์ชันระบบ Quick Review (พรีวิวข้อมูลลูกค้าจาก VN ล่าสุด)
// ==========================================
function openClientReviewModal(id) {
    if (!crmDB || !window.SESSION_KEY) return;
    
    let client = crmClientsList.find(c => c.id === id);
    
    if (!client || !client.fullData || !client.fullData.visits || client.fullData.visits.length === 0) {
        return alert("⚠️ ไม่พบข้อมูลรายละเอียดของลูกค้ารายนี้ (อาจเป็นโครงสร้างข้อมูลเก่า กรุณาลบและสร้างใหม่ครับ)");
    }

    let latestVisit = client.fullData.visits[0];

    document.getElementById('review_client_name').innerText = `คุณ ${client.name} | รหัส: ${client.id} | (อัปเดตล่าสุด: ${latestVisit.VN})`;
    
    let p = latestVisit.dataSnapshot.profile || {};
    let d = latestVisit.dataSnapshot.dynamic || {};
    let r = latestVisit.dataSnapshot.retirement || {};
    
    const fmtRev = (num) => Number(num || 0).toLocaleString('th-TH', {minimumFractionDigits: 0, maximumFractionDigits: 0});

    let totalAst = (d.c_assets || []).reduce((sum, item) => sum + (item.val || 0), 0);
    let totalLiab = (d.c_liab || []).reduce((sum, item) => sum + (item.val || 0), 0);
    let totalInc = (d.c_inc || []).reduce((sum, item) => sum + (item.val || 0), 0);
    let totalExp = (d.c_exp || []).reduce((sum, item) => sum + (item.val || 0), 0);
    let netWorth = totalAst - totalLiab;
    let netCashflow = totalInc - totalExp;

    let insHtml = '';
    if (d.c_ins && d.c_ins.length > 0) {
        insHtml = d.c_ins.map(ins => {
            let isBase = ins[0] === 'สัญญาหลัก';
            let name = isBase ? ins[1] : ins[2]; 
            let type = isBase ? ins[2] : ins[3]; 
            let val = isBase ? ins[3] : ins[4];  
            let prem = isBase ? ins[7] : ins[5]; 
            return `
            <div class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 pl-2">
                <div>
                    <span class="text-[10px] ${isBase ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'} px-1.5 py-0.5 rounded mr-1">${isBase ? 'หลัก' : 'เพิ่มเติม'}</span>
                    <span class="text-sm font-medium text-gray-800">${name || 'ไม่ระบุ'}</span>
                    <p class="text-[10px] text-gray-500 mt-0.5">${type || '-'}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-800 font-bold">ทุน: ${fmtRev(val)}</p>
                    <p class="text-[10px] text-gray-500">เบี้ย: ${fmtRev(prem)}/ปี</p>
                </div>
            </div>`;
        }).join('');
    } else {
        insHtml = '<p class="text-center text-sm text-gray-400 py-4">ไม่มีข้อมูลกรมธรรม์</p>';
    }

    let invHtml = '';
    if (d.c_invest_current && d.c_invest_current.length > 0) {
        invHtml = d.c_invest_current.map(inv => `
            <div class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 pl-2">
                <div>
                    <p class="text-sm font-medium text-gray-800">${inv[0] || 'ไม่ระบุ'}</p>
                    <p class="text-[10px] text-gray-500 mt-0.5">เป้าหมาย: ${inv[3] || '-'}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-blue-700 font-bold">${fmtRev(inv[1])}</p>
                    <p class="text-[10px] text-green-600 font-semibold">คาดหวัง ${inv[2] || 0}%</p>
                </div>
            </div>
        `).join('');
    } else {
        invHtml = '<p class="text-center text-sm text-gray-400 py-4">ไม่มีข้อมูลการลงทุน</p>';
    }

    let goalsHtml = '';
    if (d.c_goals && d.c_goals.length > 0) {
        goalsHtml = d.c_goals.map(g => `
            <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-sm text-gray-800 truncate pr-2">🎯 ${g[0] || 'ไม่ระบุ'}</span>
                    <span class="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">ความสำคัญ: ${g[3] || 1}</span>
                </div>
                <div class="flex justify-between text-xs mt-2 text-gray-600">
                    <span>ยอดที่ต้องการ: <b class="text-gray-800">${fmtRev(g[1])} ฿</b></span>
                    <span>ระยะเวลา: <b class="text-gray-800">${g[2] || 0} ปี</b></span>
                </div>
            </div>
        `).join('');
    } else {
        goalsHtml = '<p class="text-center text-sm text-gray-400 py-4 col-span-full border border-dashed rounded-lg bg-gray-50/50">ไม่มีข้อมูลเป้าหมายเฉพาะเจาะจง</p>';
    }

    // 🌟 สร้าง HTML สำหรับกราฟพัฒนาการ
    let progressHtml = `
        <div class="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm col-span-1 md:col-span-2 mt-4 flex flex-col h-full">
            <h4 class="font-bold text-indigo-800 mb-3 flex items-center gap-2 border-b border-indigo-100 pb-2">
                <span class="text-xl">📈</span> พัฒนาการทางการเงิน (Financial Evolution)
            </h4>
            
            ${(!client.fullData.visits || client.fullData.visits.length < 2) 
                ? `<div class="bg-gray-50 text-gray-500 text-sm text-center py-8 rounded-lg border border-dashed flex-grow flex items-center justify-center">
                      มีประวัติการเข้าพบเพียง 1 ครั้ง ระบบจะเริ่มแสดงกราฟเมื่อมีการอัปเดตข้อมูล (VN ถัดไป)
                   </div>`
                : `<div class="relative w-full flex-grow min-h-[250px] md:min-h-[300px]">
                      <canvas id="clientProgressChart"></canvas>
                   </div>
                   <p class="text-[10px] text-gray-400 mt-2 text-center">* เปรียบเทียบข้อมูลจากการเข้าพบ (VN) ทั้งหมด เพื่อแสดงแนวโน้มการลดหนี้และเพิ่มความมั่งคั่ง</p>`
            }
        </div>
    `;

    let modalContent = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">👤 ข้อมูลพื้นฐาน</p>
                <p class="text-sm text-gray-800"><b>อายุ:</b> ${p.p_age || '-'} ปี</p>
                <p class="text-sm text-gray-800 mt-1"><b>อาชีพ:</b> ${p.p_occ || '-'}</p>
                <p class="text-sm text-gray-800 mt-1"><b>สวัสดิการ:</b> <span class="truncate block">${p.p_welfare || '-'}</span></p>
                <p class="text-sm text-gray-800 mt-1"><b>ภาระอุปการะ:</b> ${p.p_dep || '0'} คน</p>
            </div>
            <div class="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col justify-center items-center text-center">
                <p class="text-xs text-indigo-500 font-bold uppercase tracking-wider mb-2">🧠 AI Score (คะแนนความสำเร็จ)</p>
                <h4 class="text-3xl font-black text-indigo-700">${latestVisit.aiScore || '-'}</h4>
            </div>
            <div class="bg-gradient-to-br from-teal-50 to-green-50 p-4 rounded-xl border border-teal-100 shadow-sm flex flex-col justify-center items-center text-center">
                <p class="text-xs text-teal-600 font-bold uppercase tracking-wider mb-2">📊 AI Cluster (กลุ่มพฤติกรรม)</p>
                <h4 class="text-sm font-bold text-teal-800 leading-tight">${latestVisit.aiCluster || '-'}</h4>
            </div>
        </div>

        <div>
            <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2"><span class="text-lg">💰</span> สรุปสถานะการเงิน ณ ${latestVisit.dateString}</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center">
                    <p class="text-[10px] text-gray-500 mb-1">สินทรัพย์รวม</p>
                    <p class="text-sm md:text-base font-bold text-green-600">${fmtRev(totalAst)}</p>
                </div>
                <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center">
                    <p class="text-[10px] text-gray-500 mb-1">หนี้สินรวม</p>
                    <p class="text-sm md:text-base font-bold text-red-500">${fmtRev(totalLiab)}</p>
                </div>
                <div class="bg-white p-3 rounded-lg border border-blue-200 shadow-sm text-center bg-blue-50/30">
                    <p class="text-[10px] text-blue-600 mb-1 font-bold">ความมั่งคั่งสุทธิ</p>
                    <p class="text-base md:text-lg font-black text-blue-700">${fmtRev(netWorth)}</p>
                </div>
                <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center">
                    <p class="text-[10px] text-gray-500 mb-1">กระแสเงินสดคงเหลือ/เดือน</p>
                    <p class="text-sm md:text-base font-bold ${netCashflow >= 0 ? 'text-green-600' : 'text-red-500'}">${fmtRev(netCashflow)}</p>
                </div>
            </div>
        </div>

        <div>
            <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2"><span class="text-lg">🎯</span> เป้าหมายทางการเงิน (SMART Goals)</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200 shadow-sm">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-sm text-purple-900 truncate pr-2">🏆 ทุนเกษียณอายุ</span>
                        <span class="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-bold">เป้าหมายหลัก</span>
                    </div>
                    <div class="flex justify-between text-xs mt-2 text-gray-600">
                        <span>ใช้จ่าย: <b class="text-gray-800">${fmtRev(r.r_reqInc)} ฿/ด.</b></span>
                        <span>เกษียณอายุ: <b class="text-gray-800">${r.r_retAge || 60} ปี</b></span>
                    </div>
                </div>
                ${goalsHtml}
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
                <div class="bg-purple-50 p-3 border-b border-purple-100 rounded-t-xl">
                    <h4 class="font-bold text-purple-800 flex items-center gap-2 text-sm">🛡️ พอร์ตกรมธรรม์ประกันชีวิต</h4>
                </div>
                <div class="p-3 overflow-y-auto max-h-[250px] custom-scrollbar flex-grow bg-white rounded-b-xl">
                    ${insHtml}
                </div>
            </div>
            
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
                <div class="bg-blue-50 p-3 border-b border-blue-100 rounded-t-xl">
                    <h4 class="font-bold text-blue-800 flex items-center gap-2 text-sm">📈 พอร์ตการลงทุนปัจจุบัน</h4>
                </div>
                <div class="p-3 overflow-y-auto max-h-[250px] custom-scrollbar flex-grow bg-white rounded-b-xl">
                    ${invHtml}
                </div>
            </div>

            ${progressHtml}
        </div>
    `;

    document.getElementById('review_content_body').innerHTML = modalContent;
    
    // 🌟 สั่งวาดกราฟหลังจาก DOM สร้างเสร็จ
    if (client.fullData.visits && client.fullData.visits.length >= 2) {
        setTimeout(() => {
            renderClientProgressChart(client.fullData);
        }, 50);
    }

    const modal = document.getElementById('clientReviewModal');
    const box = document.getElementById('review_modal_box');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
    }, 10);
}

function closeClientReviewModal() {
    const modal = document.getElementById('clientReviewModal');
    const box = document.getElementById('review_modal_box');
    
    modal.classList.add('opacity-0');
    box.classList.remove('scale-100');
    box.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    let reviewModal = document.getElementById('clientReviewModal');
    if (reviewModal) {
        reviewModal.addEventListener('click', function(e) {
            if (e.target === this) closeClientReviewModal();
        });
    }
});

function openVNManagerModal(xn_id) {
    if (!crmDB || !window.SESSION_KEY) return;
    
    let client = crmClientsList.find(c => c.id === xn_id);
    if (!client || !client.fullData || !client.fullData.visits) return alert("ไม่พบข้อมูลประวัติครับ");

    document.getElementById('vn_manager_client_name').innerText = `ลูกค้า: ${client.name} (รหัส: ${client.id})`;
    
    let tbody = document.getElementById('vn_manager_table_body');
    let html = '';

    client.fullData.visits.forEach((v, index) => {
        let isClosed = v.status === 'Closed';
        
        let systemBadge = isClosed 
            ? '<span class="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-2 border border-gray-200">🔒 ปิดแล้ว</span>' 
            : '<span class="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded ml-2 border border-green-300 font-bold animate-pulse">🟢 Active</span>';
            
        let clientStatus = v.clientStatus || client.status || "ผู้มุ่งหวัง";
        let statusBadge = getStatusBadge(clientStatus); 

        let nwText = v.netWorth >= 1000000 ? (v.netWorth / 1000000).toFixed(2) + ' M' : (v.netWorth / 10000).toFixed(1) + ' หมื่น';
        
        html += `
        <tr class="hover:bg-teal-50 transition border-b border-gray-100">
            <td class="p-3 font-bold text-teal-800 flex items-center">
                ${v.VN} ${systemBadge}
            </td>
            <td class="p-3 text-center text-gray-600">${v.dateString}</td>
            <td class="p-3 text-right font-semibold text-blue-700">${nwText}</td>
            <td class="p-3 text-center font-bold text-indigo-600">${v.aiScore || '-'}</td>
            
            <td class="p-3 text-center">${statusBadge}</td>
            
            <td class="p-3 text-center">
                <div class="flex justify-center gap-1">
                    <button onclick="openCRMClientModal('${xn_id}', '${v.VN}')" class="bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white px-2 py-1 rounded text-xs font-bold transition shadow-sm">📝 จัดการ & โน้ต</button>
                    <button onclick="loadSpecificVN('${xn_id}', '${v.VN}')" class="bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white px-2 py-1 rounded text-xs font-bold transition shadow-sm">⬇️ โหลด</button>
                    ${client.fullData.visits.length > 1 ? `<button onclick="deleteSpecificVN('${xn_id}', '${v.VN}')" class="bg-red-100 text-red-700 hover:bg-red-600 hover:text-white px-2 py-1 rounded text-xs font-bold transition shadow-sm">🗑️ ลบ</button>` : `<span class="text-[10px] text-gray-400 italic">ลบไม่ได้</span>`}
                </div>
            </td>
        </tr>
        `;
    });

    tbody.innerHTML = html;

    const modal = document.getElementById('vnManagerModal');
    const box = document.getElementById('vn_modal_box');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
    }, 10);
}

function closeVNManagerModal() {
    const modal = document.getElementById('vnManagerModal');
    const box = document.getElementById('vn_modal_box');
    modal.classList.add('opacity-0');
    box.classList.remove('scale-100');
    box.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// 🟢 โหลดข้อมูลจาก VN เฉพาะเจาะจง
function loadSpecificVN(xn_id, vn_id) {
    let client = crmClientsList.find(c => c.id === xn_id);
    if (!client) return;

    let targetVisit = client.fullData.visits.find(v => v.VN === vn_id);
    if (!targetVisit) return alert("ไม่พบข้อมูล VN นี้ครับ");

    if(confirm(`ยืนยันการโหลดข้อมูลเวอร์ชัน ${vn_id} ลงหน้าจอใช่หรือไม่?\n(ข้อมูลบนจอจะถูกทับทั้งหมด)`)) {
        let data = targetVisit.dataSnapshot;
        closeVNManagerModal();
        if (typeof closeSettings === 'function') closeSettings();
        if (typeof toggleMode === 'function') toggleMode('edit');
        if (typeof clearDataForLoad === 'function') clearDataForLoad();
        
        if(document.getElementById('mainForm')) document.getElementById('mainForm').reset();
        
        if(data.profile) { for (let key in data.profile) { if(document.getElementById(key)) document.getElementById(key).value = data.profile[key]; } }
        if(data.retirement) {
            for (let key in data.retirement) {
                let el = document.getElementById(key);
                if(el) {
                    if (key === 'r_reqInc' && typeof parseNum === 'function') el.value = parseNum(data.retirement[key]).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                    else el.value = data.retirement[key];
                }
            }
        }
        if(data.dynamic) {
            if(typeof loadStandardRows === 'function') {
                loadStandardRows('c_assets', data.dynamic.c_assets, ['ชื่อรายการ', 'มูลค่า (บาท)'], 'ast_list');
                loadStandardRows('c_liab', data.dynamic.c_liab, ['ชื่อรายการ', 'ยอดคงเหลือ (บาท)'], 'liab_list');
                loadStandardRows('c_inc', data.dynamic.c_inc, ['ชื่อรายการ', 'จำนวน (บาท/เดือน)'], 'inc_list');
                loadStandardRows('c_exp', data.dynamic.c_exp, ['ชื่อรายการ', 'จำนวน (บาท/เดือน)'], 'exp_list');
            }
            if(data.dynamic.c_ins && typeof addInsRow === 'function') {
                data.dynamic.c_ins.forEach(vals => {
                    if (vals[0] === 'สัญญาหลัก') addInsRow(vals[1], vals[2], vals[3], vals[7], vals[0], vals[5], vals[6], vals[4]);
                    else if (vals[0] === 'สัญญาเพิ่มเติม') addInsRow(vals[2], vals[3], vals[4], vals[5], vals[0]);
                    else {
                        if(vals.length >= 8) addInsRow(vals[0], vals[2], vals[3], vals[7], vals[1], vals[4], vals[5], vals[6]);
                        else addInsRow(vals[0], vals[1], vals[2], vals[3]);
                    }
                });
            }
            if(data.dynamic.c_goals && typeof addCustomRow === 'function') {
                data.dynamic.c_goals.forEach(vals => addCustomRow('c_goals', ['ชื่อเป้าหมาย (Specific)', 'จำนวนเงินที่ต้องการ (Measurable)', 'ระยะเวลา/ปี (Time-bound)', 'ระดับความสำคัญ (1=สูงสุด)'], vals, ['goal_list', '', '', '']));
            }
            if(data.dynamic.c_invest_current && typeof addInvestRow === 'function') {
                data.dynamic.c_invest_current.forEach(vals => addInvestRow(vals[0], vals[1], vals[2], vals[3]));
            }
            if(data.dynamic.c_tax_current && typeof addCustomRow === 'function') {
                data.dynamic.c_tax_current.forEach(vals => addCustomRow('c_tax_current', ['รายการลดหย่อน (อ้างอิง ภ.ง.ด.90/91)', 'จำนวนเงิน (บาท)'], vals, ['tax_list', '']));
            }
        }
        if(typeof syncAgeToRisk === 'function') syncAgeToRisk();
        setTimeout(() => {
            if(confirm(`✅ โหลดข้อมูลของคุณ "${SecurityCore.escapeHTML(client.name)}" ลงหน้าจอสำเร็จ!\n\nต้องการให้ AI ประมวลผลและสร้างรายงาน (Report) ใหม่ทันทีหรือไม่?`)) {
                if (typeof processReportInit === 'function') processReportInit(); 
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 500); 
    }
}

// 🔴 ลบ VN เฉพาะเจาะจง
function deleteSpecificVN(xn_id, vn_id) {
    if(!confirm(`⚠️ คำเตือน: ต้องการลบประวัติเวอร์ชัน ${vn_id} อย่างถาวรใช่หรือไม่?`)) return;

    let transaction = crmDB.transaction(["clients"], "readwrite");
    let store = transaction.objectStore("clients");
    
    store.get(xn_id).onsuccess = function(e) {
        let rawClient = e.target.result;
        if (rawClient) {
            let clientData = rawClient.securePayload ? SecurityCore.decrypt(rawClient.securePayload) : rawClient;
            
            clientData.visits = clientData.visits.filter(v => v.VN !== vn_id);
            
            if (rawClient.securePayload) rawClient.securePayload = SecurityCore.encrypt(clientData);
            else rawClient = clientData;
            
            store.put(rawClient).onsuccess = function() {
                refreshCRMTable();
                openVNManagerModal(xn_id); 
            };
        }
    };
}
// ==========================================
// 🖨️ ฟังก์ชันบันทึกข้อมูลและสั่งพิมพ์ (Global Scope)
// ==========================================
window.saveAndPrintReport = function() {
    // 1. สั่งบันทึกข้อมูลลง CRM แบบเงียบๆ (isSilent = true) 
    if (typeof saveCurrentToCRM === 'function') {
        saveCurrentToCRM(true); 
    }
    
    // 2. หน่วงเวลา 0.3 วินาที เพื่อให้เบราว์เซอร์จัดหน้าเว็บและเซฟให้เสร็จก่อน แล้วค่อยเด้งหน้าต่าง Print
    setTimeout(() => { 
        window.print(); 
    }, 300);
};
// =====================================================================
// ☢️ FACTORY RESET & SYSTEM ADMIN TOOLS
// =====================================================================

window.factoryReset = function(type) {
    if (type === 'password') {
        if(confirm("⚠️ ยืนยันการรีเซ็ตรหัสผ่าน?\n\nรหัสผ่านจะถูกตั้งค่ากลับเป็น '123456' และกุญแจเข้ารหัสเดิมจะถูกล้าง คุณจะต้องล็อกอินใหม่ด้วย 123456 เพื่อเข้าใช้งานระบบ")) {
            // ล้าง Hash เก่าและตั้งเป็น 123456 ใหม่
            localStorage.removeItem('FA_System_PIN');
            localStorage.setItem('FA_System_PIN_HASH', CryptoJS.SHA256('123456').toString());
            
            alert("✅ รีเซ็ตรหัสผ่านเป็น 123456 สำเร็จแล้ว! ระบบจะรีเฟรชหน้าจอ");
            location.reload(); // บังคับรีโหลดเพื่อเตะออกจากระบบให้ล็อกอินใหม่
        }
    } 
    else if (type === 'database') {
        let code = prompt("⚠️ อันตราย: ข้อมูลลูกค้าและการเข้าพบทั้งหมดในฐานข้อมูล (CRM) จะถูกลบทิ้งอย่างถาวร!\n\nหากต้องการดำเนินการต่อ กรุณาพิมพ์คำว่า 'ยืนยัน' ในช่องด้านล่าง:");
        
        if (code === "ยืนยัน") {
            let transaction = crmDB.transaction(["clients", "counters"], "readwrite");
            
            // ล้างตารางฐานข้อมูลลูกค้า และ ตัวนับ Running Number
            transaction.objectStore("clients").clear();
            transaction.objectStore("counters").clear();
            
            transaction.oncomplete = function() {
                // ล้างหน่วยความจำใน RAM
                crmClientsList = [];
                window.currentFilteredClients = [];
                
                // สั่งรีเฟรชตารางให้ว่างเปล่า
                if(typeof renderCRMTable === 'function') renderCRMTable([]);
                
                // สั่งรีเฟรช Dashboard ให้เป็น 0
                if(typeof clearDashboardUI === 'function') clearDashboardUI();
                
                alert("🗑️ ล้างฐานข้อมูล CRM สำเร็จแล้ว! ฐานข้อมูลว่างเปล่าพร้อมใช้งาน");
            };
            transaction.onerror = function() {
                alert("❌ เกิดข้อผิดพลาดในการล้างฐานข้อมูล");
            };
        } else if (code !== null) {
            alert("❌ พิมพ์คำยืนยันไม่ถูกต้อง ยกเลิกการลบข้อมูล");
        }
    } 
    else if (type === 'all') {
        let code = prompt("☢️ NUCLEAR RESET: ล้างข้อมูลทุกอย่างกลับไปเป็นค่าเริ่มต้นจากโรงงาน!\n\n(รหัสผ่าน, ฐานข้อมูล, กฎ AI, ข้อมูลแบบประกันที่เพิ่มเอง และการตั้งค่าต่างๆ จะถูกลบทิ้งทั้งหมด)\n\nหากคุณแน่ใจ 100% กรุณาพิมพ์คำว่า 'RESET' (ตัวพิมพ์ใหญ่) ในช่องด้านล่าง:");
        
        if (code === "RESET") {
            // 1. ล้าง Database (IndexedDB)
            let transaction = crmDB.transaction(["clients", "counters"], "readwrite");
            transaction.objectStore("clients").clear();
            transaction.objectStore("counters").clear();
            
            transaction.oncomplete = function() {
                // 2. ล้าง Local Storage แบบเจาะจงเฉพาะของระบบ FA (ไม่กวนข้อมูลเว็บอื่นๆ)
                const keysToRemove = [
                    'FA_System_PIN',
                    'FA_System_Config',
                    'fa_macro_config',
                    'fa_settings_v2',
                    'fa_product_library_v2',
                    'FA_System_Draft_Secure',
                    'update_doc_weights',
                    'update_doc_scaler'
                ];
                
                keysToRemove.forEach(key => localStorage.removeItem(key));
                
                // รีเซ็ตรหัสกลับเป็น 123456 เผื่อไว้
                localStorage.setItem('FA_System_PIN_HASH', CryptoJS.SHA256('123456').toString());
                
                alert("🔄 รีเซ็ตระบบกลับเป็นค่าเริ่มต้นจากโรงงาน (Factory Reset) สำเร็จ!\nระบบจะเริ่มทำงานใหม่ทั้งหมด");
                location.reload();
            };
        } else if (code !== null) {
            alert("❌ พิมพ์รหัสยืนยันไม่ถูกต้อง ยกเลิกการรีเซ็ตระบบ");
        }
    }
};