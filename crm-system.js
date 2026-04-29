// =====================================================================
// 🗂️ CLIENT DATABASE MANAGER (HIS Architecture: XN / VN System)
// 🚀 DYNAMIC HTML INJECTION MODULE (V8 - Multi-Window Support)
// =====================================================================

// --- 🌟 Window Management Helpers 🌟 ---
window.crmWindow = null;

function getCRMDoc() {
    return (window.crmWindow && !window.crmWindow.closed) ? window.crmWindow.document : document;
}

function crmAlert(msg) {
    if (window.crmWindow && !window.crmWindow.closed) window.crmWindow.alert(msg);
    else alert(msg);
}

function crmConfirm(msg) {
    if (window.crmWindow && !window.crmWindow.closed) return window.crmWindow.confirm(msg);
    return confirm(msg);
}

const CRM_DB_NAME = "FinancialAdvisorCRM";
const CRM_DB_VERSION = 4;
let crmDB;
let crmClientsList = []; 
let currentCRMView = 'table'; 
let currentSort = { col: 'timestamp', dir: 'desc' }; 
let tempNotesHistory = []; 

const pad4 = (num) => String(num).padStart(4, '0');
const pad2 = (num) => String(num).padStart(2, '0');

function getThaiYYMM() {
    const d = new Date();
    const yy = (d.getFullYear() + 543).toString().slice(-2);
    const mm = pad2(d.getMonth() + 1);
    return `${yy}${mm}`;
}

function getThaiYYMMDD() {
    const d = new Date();
    const yy = (d.getFullYear() + 543).toString().slice(-2);
    const mm = pad2(d.getMonth() + 1);
    const dd = pad2(d.getDate());
    return `${yy}${mm}${dd}`;
}

async function generateNextXN() {
    return new Promise((resolve) => {
        let transaction = crmDB.transaction(["counters"], "readwrite");
        let store = transaction.objectStore("counters");
        let prefix = getThaiYYMM();
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
            resolve(`${prefix}${pad4(nextNum)}`);
        };
    });
}

async function generateNextVN() {
    return new Promise((resolve) => {
        let transaction = crmDB.transaction(["counters"], "readwrite");
        let store = transaction.objectStore("counters");
        let prefix = getThaiYYMMDD();
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
            resolve(`${prefix}-${pad2(nextNum)}`);
        };
    });
}

function initCRMDatabase() {
    const request = indexedDB.open(CRM_DB_NAME, CRM_DB_VERSION);
    request.onupgradeneeded = function(event) {
        let db = event.target.result;
        if (!db.objectStoreNames.contains("clients")) {
            let store = db.createObjectStore("clients", { keyPath: "XN" });
            store.createIndex("timestamp", "timestamp", { unique: false });
            store.createIndex("name", "name", { unique: false });
        }
        if (!db.objectStoreNames.contains("counters")) {
            db.createObjectStore("counters", { keyPath: "id" });
        }
    };
    request.onsuccess = function(event) {
        crmDB = event.target.result;
        refreshCRMTable(); 
    };
    request.onerror = function(event) { console.error("IndexedDB Error:", event.target.error); };
}

window.addEventListener('DOMContentLoaded', function() {
    if (typeof initCRMDatabase === 'function') initCRMDatabase();
});

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
            let latestVisit = clientData.visits[0]; 

            if (latestVisit.status === 'Active' && latestVisit.dateString !== todayStr) {
                latestVisit.status = 'Closed'; 
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
                crmAlert(`ℹ️ System Alert:\nระบบได้ทำการปิดประวัติการเข้าพบ (VN) ที่ค้างอยู่จากวันก่อนหน้าจำนวน ${closedCount} รายการเรียบร้อยแล้วครับ ข้อมูล UI ถูกล็อกเป็น Read-Only แล้ว`);
                refreshCRMTable(); 
            }, 1000);
        }
    };
}

async function saveCurrentToCRM(isSilent = false) {
    if (!crmDB) return (!isSilent && alert("❌ เชื่อมต่อฐานข้อมูลไม่สำเร็จ"));
    if (!window.SESSION_KEY) return (!isSilent && alert("🔒 เซสชันหมดอายุ กรุณารีเฟรชเพื่อเข้าสู่ระบบใหม่"));

    // โฟกัส: ดึงข้อมูลจากหน้าต่างแม่ (หน้าหลัก) เสมอ
    let clientName = document.getElementById('p_name') ? document.getElementById('p_name').value.trim() : "";
    if (!clientName) return (!isSilent && crmAlert("⚠️ กรุณาระบุ 'ชื่อ-สกุล' ของลูกค้าก่อนบันทึกครับ"));

    let netWorth = typeof parseNum === 'function' ? parseNum(document.getElementById('val_networth')?.innerText || 0) : 0;
    let aiScore = document.getElementById('ml_prob_proposed') ? document.getElementById('ml_prob_proposed').innerText : "-";
    let clusterBox = document.getElementById('profile_cluster');
    let aiCluster = clusterBox ? clusterBox.innerText.split('\n')[0].trim() : "-";
    
    const getSafeVal = (id) => document.getElementById(id) ? document.getElementById(id).value : "0";
    
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
        let isNewClient = false;

        if (existingRecord) {
            clientObject = SecurityCore.decrypt(existingRecord.securePayload);
            if (clientObject.visits.length > 0 && clientObject.visits[0].dateString === todayStr && clientObject.visits[0].status === 'Active') {
                clientObject.visits[0].dataSnapshot = currentUI_Snapshot;
                clientObject.visits[0].analytics = visitAnalytics;
                clientObject.visits[0].netWorth = netWorth;
                clientObject.visits[0].aiScore = aiScore;
                clientObject.visits[0].aiCluster = aiCluster;
                clientObject.visits[0].timestamp = nowMs;
                clientObject.visits[0].clientStatus = clientObject.status || "ผู้มุ่งหวัง";
            } else {
                let newVN_Code = await generateNextVN(); 
                clientObject.visits.unshift({
                    VN: newVN_Code, dateString: todayStr, timestamp: nowMs, status: 'Active',
                    clientStatus: clientObject.status || "ผู้มุ่งหวัง", netWorth: netWorth, aiScore: aiScore, aiCluster: aiCluster,
                    dataSnapshot: currentUI_Snapshot, analytics: visitAnalytics,
                    activities: [{ date: todayStr, text: `🟢 เปิดประวัติการเข้าพบใหม่ (${newVN_Code})`, timestamp: nowMs }]
                });
            }
            clientObject.name = clientName; 
        } else {
            isNewClient = true;
            let newXN_Code = await generateNextXN();
            let newVN_Code = await generateNextVN();
            clientObject = {
                XN: newXN_Code, name: clientName, status: "ผู้มุ่งหวัง", nextAppointment: "", tags: [],
                visits: [{
                    VN: newVN_Code, dateString: todayStr, timestamp: nowMs, status: 'Active', clientStatus: 'ผู้มุ่งหวัง', 
                    netWorth: netWorth, aiScore: aiScore, aiCluster: aiCluster, dataSnapshot: currentUI_Snapshot, analytics: visitAnalytics,
                    activities: [{ date: todayStr, text: `🟢 สร้างประวัติลูกค้าใหม่เข้าระบบ (${newVN_Code})`, timestamp: nowMs }]
                }]
            };
        }

        const THREE_YEARS_MS = 3 * 365 * 24 * 60 * 60 * 1000;
        const latestVisitTime = clientObject.visits[0].timestamp;
        clientObject.visits = clientObject.visits.filter(v => (latestVisitTime - v.timestamp) <= THREE_YEARS_MS);

        let finalRecord = { XN: clientObject.XN, name: clientObject.name, timestamp: nowMs, securePayload: SecurityCore.encrypt(clientObject) };

        let putTransaction = crmDB.transaction(["clients"], "readwrite");
        let putStore = putTransaction.objectStore("clients");
        putStore.put(finalRecord).onsuccess = function() {
            let msg = isNewClient ? `✅ บันทึกข้อมูลลูกค้ารายใหม่ (รหัส ${finalRecord.XN}) สำเร็จ!` : `✅ อัปเดตข้อมูลของ ${clientName} สำเร็จ!`;
            if (!isSilent) crmAlert(msg);
            refreshCRMTable(); 
            if(typeof renderAnalyticsDashboard === 'function') renderAnalyticsDashboard();
        };
    };
}

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
                    let latestVisit = decryptedClient.visits[0]; 
                    crmClientsList.push({
                        id: decryptedClient.XN, name: decryptedClient.name, status: decryptedClient.status, nextAppointment: decryptedClient.nextAppointment, tags: decryptedClient.tags || [], netWorth: latestVisit.netWorth, aiScore: latestVisit.aiScore, aiCluster: latestVisit.aiCluster, dateString: latestVisit.dateString, timestamp: latestVisit.timestamp, fullData: decryptedClient
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
    
    let doc = getCRMDoc();
    if(doc.getElementById('crm_total_clients')) doc.getElementById('crm_total_clients').innerHTML = `${clients.length} <span class="text-sm font-normal text-gray-500">ราย</span>`;
    if(doc.getElementById('crm_total_aum')) doc.getElementById('crm_total_aum').innerHTML = `${(totalAUM / 1000000).toFixed(2)} <span class="text-xs font-normal text-gray-500">ล้านบาท</span>`;
    if(doc.getElementById('crm_ai_cases')) doc.getElementById('crm_ai_cases').innerText = (1250 + clients.length).toLocaleString();
    
    let selectAllChk = doc.getElementById('crm_select_all');
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

function filterCRMTable() {
    let doc = getCRMDoc();
    let keyword = doc.getElementById('crm_search_input') ? doc.getElementById('crm_search_input').value.toLowerCase() : '';
    let statusFilter = doc.getElementById('crm_filter_status') ? doc.getElementById('crm_filter_status').value : 'all';
    let startDate = doc.getElementById('crm_filter_start')?.value;
    let endDate = doc.getElementById('crm_filter_end')?.value;

    window.currentFilteredClients = crmClientsList.filter(c => {
        let tagString = (c.tags || []).join(' ').toLowerCase();
        let matchKeyword = c.name.toLowerCase().includes(keyword) || c.id.toLowerCase().includes(keyword) || tagString.includes(keyword);
        let matchStatus = (statusFilter === 'all') || ((c.status || 'ผู้มุ่งหวัง') === statusFilter);
        
        let matchDate = true;
        if (startDate || endDate) {
            let cDate = new Date(c.timestamp); cDate.setHours(0,0,0,0);
            if (startDate) { let sDate = new Date(startDate); sDate.setHours(0,0,0,0); if (cDate < sDate) matchDate = false; }
            if (endDate) { let eDate = new Date(endDate); eDate.setHours(0,0,0,0); if (cDate > eDate) matchDate = false; }
        }
        return matchKeyword && matchStatus && matchDate;
    });

    if (currentCRMView === 'table') renderCRMTable(window.currentFilteredClients);
    else renderKanbanBoard(window.currentFilteredClients);
}

function sortCRMTable(col) {
    if (currentSort.col === col) currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
    else { currentSort.col = col; currentSort.dir = 'desc'; }
    applySorting(); filterCRMTable();
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

function renderCRMTable(clients) {
    let tbody = getCRMDoc().getElementById('crm_table_body');
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
            <td class="p-3 text-center"><input type="checkbox" value="${c.id}" class="crm-row-checkbox w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" onchange="toggleBulkAction()"></td>
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
    let doc = getCRMDoc();
    const tableDiv = doc.getElementById('crm_view_table');
    const kanbanDiv = doc.getElementById('crm_view_kanban');
    const btnTable = doc.getElementById('btn_view_table');
    const btnKanban = doc.getElementById('btn_view_kanban');

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
    const container = getCRMDoc().getElementById('crm_kanban_container');
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
            let clientData = rawClient.securePayload ? SecurityCore.decrypt(rawClient.securePayload) : rawClient;
            if (clientData && clientData.status !== newStatus) {
                clientData.status = newStatus;
                if (!clientData.notesHistory) clientData.notesHistory = [];
                clientData.notesHistory.push({
                    date: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }),
                    text: `🔄 ย้ายสถานะเป็น: ${newStatus}`,
                    timestamp: new Date().getTime()
                });
                if (rawClient.securePayload) { rawClient.securePayload = SecurityCore.encrypt(clientData); } 
                else { rawClient = clientData; }
                store.put(rawClient).onsuccess = function() { refreshCRMTable(); };
            }
        }
    };
    draggedClientId = null;
}

function openCRMClientModal(xn_id, vn_id) {
    let client = crmClientsList.find(c => c.id === xn_id); 
    if (!client || !client.fullData) return;

    let targetVisitIndex = client.fullData.visits.findIndex(v => v.VN === vn_id);
    if (targetVisitIndex === -1) return crmAlert("ไม่พบข้อมูล VN นี้");
    let targetVisit = client.fullData.visits[targetVisitIndex];

    let doc = getCRMDoc();
    doc.getElementById('crm_modal_id').value = client.id;
    window.currentEditingVN = vn_id; 

    doc.getElementById('crm_modal_name').innerHTML = `${client.name} <br><span class="text-sm font-normal text-indigo-600">(รหัสลูกค้า: ${client.id} | แผน: ${vn_id})</span>`;
    doc.getElementById('crm_modal_date').value = client.nextAppointment || "";
    doc.getElementById('crm_modal_tags').value = (client.tags || []).join(', ');
    
    const inputNote = doc.getElementById('crm_modal_new_note');
    const inputDate = doc.getElementById('crm_modal_note_date');
    if(inputNote) inputNote.value = "";
    if(inputDate) inputDate.value = new Date().toISOString().slice(0, 10);
    
    const btnSaveNote = doc.getElementById('btn_save_note');
    if(btnSaveNote) {
        btnSaveNote.innerText = "เพิ่มบันทึกใน VN นี้";
        btnSaveNote.classList.replace('bg-blue-600', 'bg-indigo-600');
    }

    let statusSelect = doc.getElementById('crm_modal_status');
    let optPostSale = doc.getElementById('opt_post_sale');
    let hintText = doc.getElementById('crm_status_hint');
    
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

    doc.getElementById('vnManagerModal').classList.add('hidden');
    doc.getElementById('crmClientModal').classList.remove('hidden');
}

function renderVNActivities() {
    const container = getCRMDoc().getElementById('crm_modal_history_container');
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
    let doc = getCRMDoc();
    const input = doc.getElementById('crm_modal_new_note');
    const dateInput = doc.getElementById('crm_modal_note_date').value;
    const text = input.value.trim();
    if (!text) return;

    let dateObj = dateInput ? new Date(dateInput) : new Date();
    let displayDate = dateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    let timestampToSave = dateObj.getTime();

    tempNotesHistory.push({ date: displayDate, text: text, timestamp: timestampToSave });
    input.value = ""; 
    renderVNActivities(); 
};

window.deleteActivity = function(aIdx) {
    if(crmConfirm('ลบบันทึกการทำงานนี้ใช่หรือไม่?')) {
        tempNotesHistory.splice(aIdx, 1);
        renderVNActivities();
    }
};

function saveCRMClientModal() {
    let doc = getCRMDoc();
    let id = doc.getElementById('crm_modal_id').value; 
    let vn_id = window.currentEditingVN; 
    
    let newStatus = doc.getElementById('crm_modal_status').value;
    let newDate = doc.getElementById('crm_modal_date').value;
    let newTags = doc.getElementById('crm_modal_tags').value.split(',').map(t => t.trim().replace(/^#/, '')).filter(t => t !== "");

    let transaction = crmDB.transaction(["clients"], "readwrite");
    let store = transaction.objectStore("clients");
    
    let request = store.get(id);
    request.onsuccess = function(e) {
        let rawClient = e.target.result;
        if (rawClient) {
            let clientData = rawClient.securePayload ? SecurityCore.decrypt(rawClient.securePayload) : rawClient;
            if (clientData) {
                clientData.status = newStatus;
                clientData.nextAppointment = newDate;
                clientData.tags = newTags;
                
                let targetVisit = clientData.visits.find(v => v.VN === vn_id);
                if (targetVisit) {
                    targetVisit.clientStatus = newStatus; 
                    targetVisit.activities = tempNotesHistory; 
                }
                
                rawClient.timestamp = new Date().getTime(); 
                
                if (rawClient.securePayload) rawClient.securePayload = SecurityCore.encrypt(clientData);
                else rawClient = clientData; 

                store.put(rawClient).onsuccess = function() {
                    closeCRMClientModal(); 
                    refreshCRMTable();     
                    openVNManagerModal(id); 
                };
            }
        }
    };
}

function closeCRMClientModal() { getCRMDoc().getElementById('crmClientModal').classList.add('hidden'); }

// วนลูป checkbox ใช้ในหน้าต่างลูก
window.toggleBulkAction = function() { updateBulkActionBar(); }

function toggleSelectAllCRM(source) {
    let checkboxes = getCRMDoc().querySelectorAll('.crm-row-checkbox');
    checkboxes.forEach(chk => chk.checked = source.checked);
    updateBulkActionBar();
}

function updateBulkActionBar() {
    let doc = getCRMDoc();
    let checkboxes = doc.querySelectorAll('.crm-row-checkbox:checked');
    let actionBar = doc.getElementById('crm_bulk_action_bar');
    let countText = doc.getElementById('crm_selected_count');
    
    if (checkboxes.length > 0) {
        actionBar.classList.remove('hidden');
        countText.innerText = `เลือก ${checkboxes.length} รายการ`;
    } else {
        actionBar.classList.add('hidden');
        if(doc.getElementById('crm_bulk_status_update')) doc.getElementById('crm_bulk_status_update').value = ""; 
    }
}

function printSelectedCRM() {
    let checkboxes = getCRMDoc().querySelectorAll('.crm-row-checkbox:checked');
    if (checkboxes.length === 0) return crmAlert("กรุณาเลือกรายการที่ต้องการพิมพ์ครับ");
    
    let selectedIds = Array.from(checkboxes).map(chk => chk.value);
    let selectedClients = crmClientsList.filter(c => selectedIds.includes(c.id));
    printCRMReport(selectedClients, true); 
}

function deleteSelectedCRM() {
    let checkboxes = getCRMDoc().querySelectorAll('.crm-row-checkbox:checked');
    if (checkboxes.length === 0) return;

    if(crmConfirm(`⚠️ คำเตือน: ลบข้อมูลลูกค้าทั้ง ${checkboxes.length} รายการ อย่างถาวร?`)) {
        let transaction = crmDB.transaction(["clients"], "readwrite");
        let store = transaction.objectStore("clients");
        let deletedCount = 0;
        
        checkboxes.forEach(chk => { store.delete(chk.value); deletedCount++; });

        transaction.oncomplete = function() {
            crmClientsList = []; 
            window.currentFilteredClients = [];
            crmAlert(`🗑️ ลบสำเร็จ ${deletedCount} รายการ`);
            refreshCRMTable();
            if (typeof renderAnalyticsDashboard === 'function') renderAnalyticsDashboard(); 
        };
    }
}

function bulkUpdateStatus(selectEl) {
    let newStatus = selectEl.value;
    if (!newStatus) return;

    let checkboxes = getCRMDoc().querySelectorAll('.crm-row-checkbox:checked');
    if (checkboxes.length === 0) return;

    if(crmConfirm(`คุณต้องการเปลี่ยนสถานะลูกค้า ${checkboxes.length} รายการ ให้เป็น "${newStatus}" ใช่หรือไม่?`)) {
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
                        if (rawClient.securePayload) rawClient.securePayload = SecurityCore.encrypt(clientData);
                        else rawClient = clientData; 
                        store.put(rawClient);
                    }
                }
            };
        });

        transaction.oncomplete = function() {
            crmAlert(`✅ เปลี่ยนสถานะสำเร็จ!`);
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
    if (listToExport.length === 0) return crmAlert("⚠️ ไม่มีข้อมูลให้ส่งออกครับ");
    
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
    
    // 🛠️ แก้ไข: อ้างอิง document ของหน้าต่าง CRM เพื่อให้ iPad ยอมให้ดาวน์โหลด
    let doc = getCRMDoc();
    const link = doc.createElement("a");
    link.setAttribute("href", url);
    let dateStamp = new Date().toISOString().slice(0,10).replace(/-/g, "");
    link.setAttribute("download", `FA_Pipeline_Report_${dateStamp}.csv`);
    
    doc.body.appendChild(link);
    link.click();
    doc.body.removeChild(link);
    URL.revokeObjectURL(url); // คืน Memory
}

function exportCRMData() {
    if (!crmDB) return;
    let transaction = crmDB.transaction(["clients"], "readonly");
    let store = transaction.objectStore("clients");
    let req = store.getAll();
    req.onsuccess = function(e) {
        let dbClients = e.target.result;
        if (dbClients.length === 0) return crmAlert("ไม่มีข้อมูลลูกค้าให้สำรองครับ");
        
        // 🛠️ แก้ไข: ใช้ Blob แบบเดียวกับ Excel แทน Data URI
        const blob = new Blob([JSON.stringify(dbClients, null, 2)], { type: 'application/json;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        let doc = getCRMDoc();
        const link = doc.createElement('a');
        link.setAttribute("href", url);
        let dateStr = new Date().toISOString().slice(0,10).replace(/-/g, "");
        link.setAttribute("download", `FA_CRM_Backup_${dateStr}.json`);
        
        doc.body.appendChild(link);
        link.click();
        doc.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
}

// เปลี่ยนมารับเป็น jsonString แทนการรับออบเจ็กต์ File โดยตรง
window.processImportCRMData = function(jsonString) {
    if(!crmConfirm("⚠️ นำเข้าข้อมูลจะเขียนทับฐานข้อมูล (หากชื่อซ้ำจะอัปเดตข้อมูล) ดำเนินการต่อหรือไม่?")) return;

    try {
        const importedData = JSON.parse(jsonString);
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
            crmAlert(`✅ นำเข้าข้อมูลสำเร็จ ${importCount} รายการ!`);
            refreshCRMTable(); 
        };
    } catch (err) {
        console.error(err);
        crmAlert('❌ เกิดข้อผิดพลาด: ไฟล์ Backup ไม่ถูกต้อง หรือข้อมูลเสียหาย');
    }
}

// ⬇️ 11. โหลดข้อมูลรายบุคคล & ลบรายบุคคล
function loadClientFromCRM(id) {
    if (!crmDB || !window.SESSION_KEY) return;
    let clientToLoad = crmClientsList.find(c => c.id === id); 

    if (clientToLoad && clientToLoad.fullData && clientToLoad.fullData.visits && clientToLoad.fullData.visits.length > 0) {
        let latestVisit = clientToLoad.fullData.visits[0];

        if(crmConfirm(`คุณต้องการโหลดข้อมูลของ "${SecurityCore.escapeHTML(clientToLoad.name)}" ใช่หรือไม่?\n(ข้อมูลบนหน้าจอปัจจุบันจะถูกล้างและเขียนทับใหม่)`)) {
            // ควบคุมหน้าหลัก!
            if (typeof closeSettings === 'function') closeSettings();
            if (typeof toggleMode === 'function') toggleMode('edit');
            if (typeof clearDataForLoad === 'function') clearDataForLoad();
            
            // ต้องใช้ document ของหน้าต่างหลัก
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
                if(crmConfirm(`✅ โหลดข้อมูลของคุณ "${SecurityCore.escapeHTML(clientToLoad.name)}" ลงหน้าจอหลักสำเร็จ!\n\nต้องการให้ AI ประมวลผลและสร้างรายงาน (Report) ใหม่ทันทีหรือไม่?`)) {
                    if (typeof processReportInit === 'function') processReportInit(); 
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 500); 
        }
    } else {
        crmAlert("⚠️ ไม่พบประวัติการเข้าพบ (VN) ของลูกค้ารายนี้ หรือข้อมูลอยู่ในรูปแบบเก่าที่ไม่รองรับครับ");
    }
}

function deleteClientFromCRM(id, name) {
    if(crmConfirm(`⚠️ คำเตือน: คุณแน่ใจหรือไม่ที่จะลบข้อมูลของ "${name}" อย่างถาวร?\n(ประวัติการเข้าพบ VN ทั้งหมดจะถูกลบไปด้วย)`)) {
        let transaction = crmDB.transaction(["clients"], "readwrite");
        let store = transaction.objectStore("clients");
        let request = store.delete(id);
        request.onsuccess = function() { refreshCRMTable(); };
    }
}

// 🖨️ พิมพ์รายงาน CRM 
function printCRMReport(clientsToPrint = null, isSelectedMode = false) {
    let listToPrint = clientsToPrint || window.currentFilteredClients || crmClientsList;
    if (!listToPrint || listToPrint.length === 0) {
        crmAlert("⚠️ ไม่มีข้อมูลลูกค้าในระบบสำหรับพิมพ์รายงานครับ");
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
                        allActivities.push({ date: act.date, text: `[${visit.VN}] ${act.text}`, timestamp: act.timestamp });
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
            </tr>`;
    }).join('');

    // 🛠️ แก้ไข: ใช้ defaultView ของ CRM Window เพื่อป้องกัน iPad บล็อกการเปิดแท็บใหม่ข้ามหน้าต่าง
    let crmWin = getCRMDoc().defaultView;
    let printWindow = crmWin.open('', '_blank');
    
    // ดักจับกรณีผู้ใช้เปิดตั้งค่า Block Pop-ups ใน Safari เอาไว้
    if (!printWindow) {
        return crmAlert("⚠️ Safari บล็อกการเปิดหน้าต่างพิมพ์รายงาน!\nกรุณาไปที่ การตั้งค่า iPad > Safari > ปิดการใช้งาน 'ปิดกั้นหน้าต่างที่ผุดขึ้น' (Block Pop-ups)");
    }

    let html = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <title>รายงานสถานะลูกค้า (CRM Report)</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');
            body { font-family: 'Prompt', sans-serif; color: #1f2937; padding: 20px; font-size: 11px; background-color: #f9fafb; }
            .container { max-width: 100%; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .action-bar { display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
            .btn { font-family: 'Prompt', sans-serif; font-weight: 600; font-size: 13px; padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
            .btn-close { background-color: #fef2f2; color: #b91c1c; border: 1px solid #f87171; }
            .btn-close:hover { background-color: #fee2e2; transform: translateY(-1px); }
            .btn-print { background-color: #2563eb; color: white; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2); }
            .btn-print:hover { background-color: #1d4ed8; transform: translateY(-1px); }
            .header { text-align: center; margin-bottom: 20px; }
            .header h2 { margin: 0 0 5px 0; color: #1e3a8a; font-size: 20px; }
            .header p { margin: 0; color: #6b7280; font-size: 12px; }
            .summary-box { display: flex; justify-content: space-between; background-color: #f3f4f6; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; font-size: 14px; border: 1px solid #e5e7eb; }
            table { width: 100%; border-collapse: collapse; table-layout: auto; }
            th, td { padding: 6px 8px; text-align: left; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
            th { background-color: #e0e7ff; color: #3730a3; font-weight: 600; border-top: 2px solid #4f46e5; white-space: nowrap; }
            .text-center { text-align: center; } .text-right { text-align: right; }
            .font-semibold { font-weight: 600; } .font-bold { font-weight: 700; }
            .text-blue-700 { color: #1d4ed8; } .text-indigo-700 { color: #4338ca; } .text-green-800 { color: #166534; }
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
                        <th>ชื่อลูกค้า</th><th class="text-center">สถานะปัจจุบัน</th><th class="text-right">ความมั่งคั่งสุทธิ (บาท)</th>
                        <th class="text-center">AI Score</th><th>กลุ่มพฤติกรรม (AI Cluster)</th> 
                        <th class="text-center">นัดหมายถัดไป</th><th class="notes-col">ประวัติการทำงานทั้งหมด (All Notes History)</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
        </div>
    </body>
    </html>`;

    printWindow.document.open(); 
    printWindow.document.write(html); 
    printWindow.document.close();
}

function openClientReviewModal(id) {
    if (!crmDB || !window.SESSION_KEY) return;
    let client = crmClientsList.find(c => c.id === id);
    if (!client || !client.fullData || !client.fullData.visits || client.fullData.visits.length === 0) return crmAlert("⚠️ ไม่พบข้อมูลรายละเอียดของลูกค้ารายนี้");

    let latestVisit = client.fullData.visits[0];
    let doc = getCRMDoc();
    
    doc.getElementById('review_client_name').innerText = `คุณ ${client.name} | รหัส: ${client.id} | (อัปเดตล่าสุด: ${latestVisit.VN})`;
    
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
    } else { insHtml = '<p class="text-center text-sm text-gray-400 py-4">ไม่มีข้อมูลกรมธรรม์</p>'; }

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
            </div>`).join('');
    } else { invHtml = '<p class="text-center text-sm text-gray-400 py-4">ไม่มีข้อมูลการลงทุน</p>'; }

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
            </div>`).join('');
    } else { goalsHtml = '<p class="text-center text-sm text-gray-400 py-4 col-span-full border border-dashed rounded-lg bg-gray-50/50">ไม่มีข้อมูลเป้าหมายเฉพาะเจาะจง</p>'; }

    let progressHtml = `
        <div class="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm col-span-1 md:col-span-2 mt-4 flex flex-col h-full">
            <h4 class="font-bold text-indigo-800 mb-3 flex items-center gap-2 border-b border-indigo-100 pb-2"><span class="text-xl">📈</span> พัฒนาการทางการเงิน (Financial Evolution)</h4>
            ${(!client.fullData.visits || client.fullData.visits.length < 2) 
                ? `<div class="bg-gray-50 text-gray-500 text-sm text-center py-8 rounded-lg border border-dashed flex-grow flex items-center justify-center">มีประวัติการเข้าพบเพียง 1 ครั้ง ระบบจะเริ่มแสดงกราฟเมื่อมีการอัปเดตข้อมูล (VN ถัดไป)</div>`
                : `<div class="relative w-full flex-grow min-h-[250px] md:min-h-[300px]"><canvas id="clientProgressChart"></canvas></div><p class="text-[10px] text-gray-400 mt-2 text-center">* เปรียบเทียบข้อมูลจากการเข้าพบ (VN) ทั้งหมด เพื่อแสดงแนวโน้มการลดหนี้และเพิ่มความมั่งคั่ง</p>`}
        </div>`;

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
                <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center"><p class="text-[10px] text-gray-500 mb-1">สินทรัพย์รวม</p><p class="text-sm md:text-base font-bold text-green-600">${fmtRev(totalAst)}</p></div>
                <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center"><p class="text-[10px] text-gray-500 mb-1">หนี้สินรวม</p><p class="text-sm md:text-base font-bold text-red-500">${fmtRev(totalLiab)}</p></div>
                <div class="bg-white p-3 rounded-lg border border-blue-200 shadow-sm text-center bg-blue-50/30"><p class="text-[10px] text-blue-600 mb-1 font-bold">ความมั่งคั่งสุทธิ</p><p class="text-base md:text-lg font-black text-blue-700">${fmtRev(netWorth)}</p></div>
                <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center"><p class="text-[10px] text-gray-500 mb-1">กระแสเงินสดคงเหลือ/เดือน</p><p class="text-sm md:text-base font-bold ${netCashflow >= 0 ? 'text-green-600' : 'text-red-500'}">${fmtRev(netCashflow)}</p></div>
            </div>
        </div>
        <div>
            <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2"><span class="text-lg">🎯</span> เป้าหมายทางการเงิน (SMART Goals)</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200 shadow-sm">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-sm text-purple-900 truncate pr-2">🏆 ทุนเกษียณอายุ</span><span class="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-bold">เป้าหมายหลัก</span>
                    </div>
                    <div class="flex justify-between text-xs mt-2 text-gray-600">
                        <span>ใช้จ่าย: <b class="text-gray-800">${fmtRev(r.r_reqInc)} ฿/ด.</b></span><span>เกษียณอายุ: <b class="text-gray-800">${r.r_retAge || 60} ปี</b></span>
                    </div>
                </div>
                ${goalsHtml}
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
                <div class="bg-purple-50 p-3 border-b border-purple-100 rounded-t-xl"><h4 class="font-bold text-purple-800 flex items-center gap-2 text-sm">🛡️ พอร์ตกรมธรรม์ประกันชีวิต</h4></div>
                <div class="p-3 overflow-y-auto max-h-[250px] custom-scrollbar flex-grow bg-white rounded-b-xl">${insHtml}</div>
            </div>
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
                <div class="bg-blue-50 p-3 border-b border-blue-100 rounded-t-xl"><h4 class="font-bold text-blue-800 flex items-center gap-2 text-sm">📈 พอร์ตการลงทุนปัจจุบัน</h4></div>
                <div class="p-3 overflow-y-auto max-h-[250px] custom-scrollbar flex-grow bg-white rounded-b-xl">${invHtml}</div>
            </div>
            ${progressHtml}
        </div>`;

    doc.getElementById('review_content_body').innerHTML = modalContent;
    
    if (client.fullData.visits && client.fullData.visits.length >= 2) {
        setTimeout(() => { renderClientProgressChart(client.fullData); }, 50);
    }

    const modal = doc.getElementById('clientReviewModal');
    const box = doc.getElementById('review_modal_box');
    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('opacity-0'); box.classList.remove('scale-95'); box.classList.add('scale-100'); }, 10);
}

function closeClientReviewModal() {
    let doc = getCRMDoc();
    const modal = doc.getElementById('clientReviewModal');
    const box = doc.getElementById('review_modal_box');
    modal.classList.add('opacity-0'); box.classList.remove('scale-100'); box.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function openVNManagerModal(xn_id) {
    if (!crmDB || !window.SESSION_KEY) return;
    let client = crmClientsList.find(c => c.id === xn_id);
    if (!client || !client.fullData || !client.fullData.visits) return crmAlert("ไม่พบข้อมูลประวัติครับ");

    let doc = getCRMDoc();
    doc.getElementById('vn_manager_client_name').innerText = `ลูกค้า: ${client.name} (รหัส: ${client.id})`;
    
    let tbody = doc.getElementById('vn_manager_table_body');
    let html = '';

    client.fullData.visits.forEach((v, index) => {
        let isClosed = v.status === 'Closed';
        let systemBadge = isClosed ? '<span class="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-2 border border-gray-200">🔒 ปิดแล้ว</span>' : '<span class="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded ml-2 border border-green-300 font-bold animate-pulse">🟢 Active</span>';
        let clientStatus = v.clientStatus || client.status || "ผู้มุ่งหวัง";
        let statusBadge = getStatusBadge(clientStatus); 
        let nwText = v.netWorth >= 1000000 ? (v.netWorth / 1000000).toFixed(2) + ' M' : (v.netWorth / 10000).toFixed(1) + ' หมื่น';
        
        html += `
        <tr class="hover:bg-teal-50 transition border-b border-gray-100">
            <td class="p-3 font-bold text-teal-800 flex items-center">${v.VN} ${systemBadge}</td>
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
        </tr>`;
    });

    tbody.innerHTML = html;
    const modal = doc.getElementById('vnManagerModal');
    const box = doc.getElementById('vn_modal_box');
    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('opacity-0'); box.classList.remove('scale-95'); box.classList.add('scale-100'); }, 10);
}

function closeVNManagerModal() {
    let doc = getCRMDoc();
    const modal = doc.getElementById('vnManagerModal');
    const box = doc.getElementById('vn_modal_box');
    modal.classList.add('opacity-0'); box.classList.remove('scale-100'); box.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function loadSpecificVN(xn_id, vn_id) {
    let client = crmClientsList.find(c => c.id === xn_id);
    if (!client) return;

    let targetVisit = client.fullData.visits.find(v => v.VN === vn_id);
    if (!targetVisit) return crmAlert("ไม่พบข้อมูล VN นี้ครับ");

    if(crmConfirm(`ยืนยันการโหลดข้อมูลเวอร์ชัน ${vn_id} ลงหน้าจอหลักใช่หรือไม่?\n(ข้อมูลบนจอหลักจะถูกทับทั้งหมด)`)) {
        let data = targetVisit.dataSnapshot;
        closeVNManagerModal();
        
        // เข้าถึงหน้าจอหลัก (Main Window)
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

function deleteSpecificVN(xn_id, vn_id) {
    if(!crmConfirm(`⚠️ คำเตือน: ต้องการลบประวัติเวอร์ชัน ${vn_id} อย่างถาวรใช่หรือไม่?`)) return;

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

// =====================================================================
// 🚀 DYNAMIC HTML INJECTION ENGINE (เปิดหน้า CRM แยกแท็บ)
// =====================================================================
window.openCRMDashboard = function() {
    if (!window.SESSION_KEY) {
        alert("🔒 กรุณาเข้าสู่ระบบ (ปลดล็อก PIN) ก่อนเข้าใช้งานฐานข้อมูลลูกค้าครับ");
        if (typeof requireAuthForSettings === 'function') requireAuthForSettings();
        return;
    }

    window.crmWindow = window.open('', '_blank');
    if (!window.crmWindow) {
        alert("⚠️ เบราว์เซอร์บล็อกหน้าต่างใหม่ (Pop-up) กรุณาอนุญาตให้เว็บไซต์นี้เปิดหน้าต่างใหม่ก่อนครับ");
        return;
    }

    let html = `<!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FA Business CRM</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');
            body { font-family: 'Prompt', sans-serif; background-color: #f8fafc; color: #1e293b; }
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
            .hover-scale { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s; }
            .hover-scale:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        </style>
    </head>
    <body class="p-4 md:p-8">
        <div class="max-w-7xl mx-auto space-y-6 animate-fade-in">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-300 pb-4 gap-4">
                <div>
                    <h1 class="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
                        <span class="text-3xl md:text-4xl">🗂️</span> ฐานข้อมูลลูกค้า (CRM)
                    </h1>
                    <p class="text-slate-500 mt-1 text-sm font-medium">จัดการสถานะและวิเคราะห์พอร์ตโฟลิโอลูกค้า</p>
                </div>
                <div class="flex flex-wrap gap-2 no-print">
                    <button onclick="window.close()" class="bg-white border border-slate-300 text-slate-700 hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-lg font-bold text-sm transition shadow-sm">❌ ปิดหน้าต่าง</button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                    <div class="absolute -right-6 -top-6 text-6xl opacity-10">👥</div>
                    <h3 class="font-bold text-indigo-900 mb-3 flex items-center gap-2"><span class="text-xl">📊</span> Portfolio Statistics</h3>
                    <div class="grid grid-cols-2 gap-3 text-center relative z-10">
                        <div class="bg-white p-3 rounded-lg border border-indigo-100/50 shadow-sm hover-scale">
                            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">จำนวนลูกค้า</p>
                            <p class="text-2xl font-black text-indigo-700" id="crm_total_clients">0 <span class="text-sm font-normal">ราย</span></p>
                        </div>
                        <div class="bg-white p-3 rounded-lg border border-indigo-100/50 shadow-sm hover-scale">
                            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">AUM รวมในพอร์ต</p>
                            <p class="text-lg font-black text-emerald-600" id="crm_total_aum">0.00 <span class="text-xs font-normal">ลบ.</span></p>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-sm text-white relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 text-7xl opacity-5">🧠</div>
                    <h3 class="font-bold text-cyan-300 mb-3 flex items-center gap-2"><span class="text-xl">⚙️</span> AI Learning Diagnostics</h3>
                    <div class="space-y-3 relative z-10">
                        <div>
                            <div class="flex justify-between text-xs mb-1 text-slate-300">
                                <span>ความแม่นยำในการจัดกลุ่ม (K-Means)</span>
                                <span class="font-bold text-emerald-400">94.2%</span>
                            </div>
                            <div class="w-full bg-slate-700 rounded-full h-1.5"><div class="bg-emerald-400 h-1.5 rounded-full" style="width: 94.2%"></div></div>
                        </div>
                        <div class="flex justify-between items-end border-t border-slate-700 pt-2 mt-2">
                            <div>
                                <p class="text-[10px] text-slate-400 uppercase tracking-widest">Training Cases</p>
                                <p class="text-lg font-bold text-white" id="crm_ai_cases">1,250</p>
                            </div>
                            <span class="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">Stable & Learning</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-wrap justify-between items-center gap-3">
                <div class="flex items-center gap-2 w-full xl:w-auto flex-wrap">
                    <span class="text-gray-500 text-sm font-bold ml-2">🔍</span>
                    <input type="text" id="crm_search_input" oninput="filterCRMTable()" placeholder="ค้นหาชื่อ, แฮชแท็ก (#VIP)..." class="p-2 border border-gray-200 rounded-lg text-sm w-full md:w-48 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none">
                    <select id="crm_filter_status" onchange="filterCRMTable()" class="p-2 border border-gray-200 rounded-lg text-sm w-full md:w-36 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none">
                        <option value="all">ทุกสถานะ</option>
                        <option value="ผู้มุ่งหวัง">🎯 ผู้มุ่งหวัง</option>
                        <option value="กำลังติดตาม">⏳ กำลังติดตาม</option>
                        <option value="นำเสนอแผน">📑 นำเสนอแผน</option>
                        <option value="รอดำเนินการ">⏱️ รอดำเนินการ</option>
                        <option value="ปิดการขาย">✅ ปิดการขาย</option>
                        <option value="เข้าเยี่ยมหลังการขาย">🤝 เข้าเยี่ยมหลังการขาย</option>
                        <option value="ปฏิเสธ">❌ ปฏิเสธ</option>
                    </select>
                    <div class="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                        <span class="text-xs text-gray-500">ตั้งแต่</span>
                        <input type="date" id="crm_filter_start" onchange="filterCRMTable()" class="bg-transparent border-none text-xs p-1 outline-none text-gray-600">
                        <span class="text-xs text-gray-500">-</span>
                        <input type="date" id="crm_filter_end" onchange="filterCRMTable()" class="bg-transparent border-none text-xs p-1 outline-none text-gray-600">
                    </div>
                    <div class="border-l border-gray-200 pl-2 flex gap-1 bg-gray-100 p-1 rounded-lg">
                        <button onclick="toggleCRMView('table')" id="btn_view_table" class="px-2 py-1 rounded bg-white shadow-sm text-blue-600 text-xs font-bold" title="มุมมองตาราง">📋</button>
                        <button onclick="toggleCRMView('kanban')" id="btn_view_kanban" class="px-2 py-1 rounded text-gray-500 hover:bg-gray-200 text-xs font-medium" title="มุมมองกระดาน">📌</button>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 w-full xl:w-auto">
                    <button onclick="saveCurrentToCRM()" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm transition flex items-center gap-1 justify-center"><span>💾</span> ดึงข้อมูลหน้าจอหลักบันทึกลง DB</button>
                    <button onclick="exportCRMToExcel()" class="bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm border border-green-200">📊 Excel</button>
                    <button onclick="printCRMReport()" class="bg-gray-100 hover:bg-blue-50 text-blue-700 text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm border border-gray-200">📋 Report</button>
                    <button onclick="exportCRMData()" class="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm border border-gray-200">📥 Export DB</button>
                    <label class="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-lg transition shadow-sm border border-gray-200 cursor-pointer inline-flex items-center gap-1">📤 Import DB
                    <input type="file" id="crm_import_file" class="sr-only" accept=".json" onchange="handleFileSelect(event)"></label>
                </div>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[600px] relative">
                
                <div id="crm_bulk_action_bar" class="hidden absolute top-0 left-0 right-0 bg-indigo-50 border-b border-indigo-100 p-3 flex justify-between items-center px-4 shadow-sm z-20">
                    <span class="text-sm font-bold text-indigo-800" id="crm_selected_count">เลือก 0 รายการ</span>
                    <div class="flex gap-2">
                        <button onclick="printSelectedCRM()" class="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm transition flex items-center gap-1">🖨️ พิมพ์</button>
                        <select id="crm_bulk_status_update" onchange="bulkUpdateStatus(this)" class="text-xs border border-indigo-200 rounded p-1.5 bg-white text-indigo-700 cursor-pointer outline-none">
                            <option value="" disabled selected>-- เปลี่ยนสถานะกลุ่ม --</option>
                            <option value="ผู้มุ่งหวัง">🎯 ผู้มุ่งหวัง</option>
                            <option value="กำลังติดตาม">⏳ กำลังติดตาม</option>
                            <option value="นำเสนอแผน">📑 นำเสนอแผน</option>
                            <option value="รอดำเนินการ">⏱️ รอดำเนินการ</option>
                            <option value="ปิดการขาย">✅ ปิดการขาย</option>
                            <option value="เข้าเยี่ยมหลังการขาย">🤝 เข้าเยี่ยมหลังการขาย</option>
                            <option value="ปฏิเสธ">❌ ปฏิเสธ</option>
                        </select>
                        <button onclick="deleteSelectedCRM()" class="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm transition flex items-center gap-1">🗑️ ลบ</button>
                    </div>
                </div>

                <div id="crm_view_table" class="overflow-y-auto flex-grow relative custom-scrollbar block h-full">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-gray-100 text-gray-600 sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th class="p-3 w-10 text-center"><input type="checkbox" id="crm_select_all" onchange="toggleSelectAllCRM(this)" class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"></th>
                                <th class="p-3 font-semibold cursor-pointer hover:text-blue-600 hover:bg-gray-200" onclick="sortCRMTable('name')">ชื่อลูกค้า ↕️</th>
                                <th class="p-3 font-semibold text-center cursor-pointer hover:text-blue-600 hover:bg-gray-200" onclick="sortCRMTable('status')">สถานะ ↕️</th>
                                <th class="p-3 font-semibold cursor-pointer hover:text-blue-600 hover:bg-gray-200" onclick="sortCRMTable('aum')">ความมั่งคั่งสุทธิ ↕️</th>
                                <th class="p-3 font-semibold text-center cursor-pointer hover:text-blue-600 hover:bg-gray-200" onclick="sortCRMTable('appt')">นัดหมายถัดไป ↕️</th>
                                <th class="p-3 font-semibold text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody id="crm_table_body" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>

                <div id="crm_view_kanban" class="overflow-x-auto overflow-y-hidden flex-grow relative custom-scrollbar hidden bg-gray-50/50 p-4 h-full">
                    <div class="flex gap-4 h-full min-w-max pb-2" id="crm_kanban_container"></div>
                </div>
            </div>
        </div>

        <div id="crmClientModal" class="hidden fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300">
            <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div class="bg-indigo-600 text-white p-4 flex justify-between items-center flex-shrink-0">
                    <h3 class="font-bold text-lg flex items-center gap-2">📝 จัดการข้อมูลลูกค้า (CRM Detail)</h3>
                    <button onclick="closeCRMClientModal()" class="text-indigo-200 hover:text-white text-2xl leading-none">&times;</button>
                </div>
                <div class="p-5 flex-grow overflow-y-auto custom-scrollbar space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 border-b border-gray-100 pb-5">
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">ชื่อลูกค้า</label>
                            <p class="text-xl font-bold text-gray-800" id="crm_modal_name">-</p>
                            <input type="hidden" id="crm_modal_id">
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mt-3 mb-1">ป้ายกำกับ (Tags)</label>
                            <input type="text" id="crm_modal_tags" class="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white" placeholder="เช่น #VIP, #รอเงินออก">
                        </div>
                        <div class="space-y-3">
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">สถานะปัจจุบัน</label>
                                <select id="crm_modal_status" class="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-indigo-500 font-bold">
                                    <option value="ผู้มุ่งหวัง">🎯 ผู้มุ่งหวัง</option>
                                    <option value="กำลังติดตาม">⏳ กำลังติดตาม</option>
                                    <option value="นำเสนอแผน">📑 นำเสนอแผน</option>
                                    <option value="รอดำเนินการ">⏱️ รอดำเนินการ</option>
                                    <option value="ปิดการขาย">✅ ปิดการขาย</option>
                                    <option value="เข้าเยี่ยมหลังการขาย" id="opt_post_sale">🤝 เข้าเยี่ยมหลังการขาย</option>
                                    <option value="ปฏิเสธ">❌ ปฏิเสธ</option>
                                </select>
                                <p class="text-[10px] text-gray-400 mt-1" id="crm_status_hint"></p>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">นัดหมายครั้งต่อไป</label>
                                <input type="date" id="crm_modal_date" class="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white">
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between items-center">
                            <span>บันทึกการทำงาน (Activity History)</span>
                            <span class="text-[10px] text-indigo-500 normal-case">* เรียงจากใหม่ไปเก่า</span>
                        </label>
                        <div class="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 mb-4 shadow-inner">
                            <div class="flex flex-wrap md:flex-nowrap gap-2 items-center">
                                <input type="date" id="crm_modal_note_date" class="border border-gray-300 rounded px-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 bg-white">
                                <input type="text" id="crm_modal_new_note" class="flex-grow border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 w-full bg-white" placeholder="พิมพ์บันทึกใหม่ที่นี่...">
                                <button type="button" onclick="addNoteToModalHistory()" id="btn_save_note" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded text-sm transition shadow-sm whitespace-nowrap">เพิ่มบันทึก</button>
                            </div>
                        </div>
                        <div id="crm_modal_history_container" class="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2"></div>
                    </div>
                </div>
                <div class="bg-gray-50 p-4 border-t flex justify-end gap-2 flex-shrink-0">
                    <button onclick="closeCRMClientModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm font-bold hover:bg-gray-300 transition">ยกเลิก</button>
                    <button onclick="saveCRMClientModal()" class="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-bold hover:bg-indigo-700 transition shadow-sm flex items-center gap-2"><span>💾</span> บันทึกข้อมูล</button>
                </div>
            </div>
        </div>

        <div id="clientReviewModal" class="hidden fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 opacity-0">
            <div class="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh] transform transition-transform scale-95" id="review_modal_box">
                <div class="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4 md:p-5 flex justify-between items-center shadow-md z-10 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl shadow-inner">🔍</div>
                        <div>
                            <h3 class="font-bold text-lg md:text-xl leading-tight">พรีวิวข้อมูลลูกค้า (Quick Review)</h3>
                            <p class="text-blue-200 text-xs mt-0.5" id="review_client_name">กำลังโหลดข้อมูล...</p>
                        </div>
                    </div>
                    <button onclick="closeClientReviewModal()" class="text-white hover:text-red-400 bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-xl font-bold">&times;</button>
                </div>
                <div class="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-grow space-y-6" id="review_content_body"></div>
                <div class="bg-white p-4 border-t border-gray-200 flex justify-end gap-2 flex-shrink-0">
                    <button onclick="closeClientReviewModal()" class="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition shadow-sm">ปิดหน้าต่าง</button>
                </div>
            </div>
        </div>

        <div id="vnManagerModal" class="hidden fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 opacity-0">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] transform transition-transform scale-95" id="vn_modal_box">
                <div class="bg-gradient-to-r from-teal-700 to-teal-900 text-white p-4 flex justify-between items-center shadow-md flex-shrink-0">
                    <div>
                        <h3 class="font-bold text-lg flex items-center gap-2">📂 จัดการประวัติการเข้าพบ (VN History)</h3>
                        <p class="text-teal-200 text-xs mt-0.5" id="vn_manager_client_name">-</p>
                    </div>
                    <button onclick="closeVNManagerModal()" class="text-white hover:text-red-400 text-2xl font-bold leading-none bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition">&times;</button>
                </div>
                <div class="p-0 overflow-y-auto custom-scrollbar flex-grow bg-gray-50">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-gray-200 text-gray-700 sticky top-0 shadow-sm z-10">
                            <tr>
                                <th class="p-3 font-semibold">รหัส VN</th>
                                <th class="p-3 font-semibold text-center">วันที่บันทึก</th>
                                <th class="p-3 font-semibold text-right">ความมั่งคั่งสุทธิ</th>
                                <th class="p-3 font-semibold text-center">AI Score</th>
                                <th class="p-3 font-semibold text-center">สถานะ</th>
                                <th class="p-3 font-semibold text-center">จัดการ VN</th>
                            </tr>
                        </thead>
                        <tbody id="vn_manager_table_body" class="divide-y divide-gray-200 bg-white"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <script>
            // Proxy Script: สั่งให้ทุกปุ่มที่กดบนหน้าลูก วิ่งกลับไปทำงานด้วยฟังก์ชันที่อยู่บนหน้าแม่
            const methods = [
                'filterCRMTable', 'toggleCRMView', 'sortCRMTable', 'openClientReviewModal', 
                'openVNManagerModal', 'deleteClientFromCRM', 'dragKanbanCard', 'allowDropKanban', 
                'dropKanbanCard', 'closeCRMClientModal', 'addNoteToModalHistory', 'deleteActivity', 
                'saveCRMClientModal', 'toggleSelectAllCRM', 'printSelectedCRM', 'deleteSelectedCRM', 
                'bulkUpdateStatus', 'exportCRMToExcel', 'exportCRMData', 'loadSpecificVN', 
                'deleteSpecificVN', 'closeClientReviewModal', 'closeVNManagerModal',
                'saveCurrentToCRM', 'printCRMReport', 'toggleBulkAction', 'openCRMClientModal'
            ];
            methods.forEach(m => {
                window[m] = function(...args) {
                    if (window.opener && window.opener[m]) {
                        window.opener[m](...args);
                    }
                };
            });
            
            // 🛠️ แก้ไขสำหรับ iPad: อ่านไฟล์แบบ String จากหน้าต่างลูก แล้วค่อยส่งข้ามไปให้หน้าต่างแม่
            window.handleFileSelect = function(event) {
                const file = event.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = function(e) {
                    const jsonText = e.target.result;
                    if (window.opener && window.opener.processImportCRMData) {
                        window.opener.processImportCRMData(jsonText);
                    } else {
                        alert("❌ ไม่สามารถเชื่อมต่อกับหน้าต่างหลักได้");
                    }
                };
                reader.readAsText(file);
                event.target.value = ''; // เคลียร์ค่าให้อัปโหลดไฟล์เดิมได้อีกครั้ง
            };
        <\/script>
    </body>
    </html>`;

    window.crmWindow.document.open();
    window.crmWindow.document.write(html);
    window.crmWindow.document.close();

    setTimeout(() => refreshCRMTable(), 500); 
};
// ==========================================
// 🖨️ ฟังก์ชันบันทึกข้อมูลและสั่งพิมพ์ (Global Scope สำหรับหน้า index.html)
// ==========================================
window.saveAndPrintReport = function() {
    // 1. สั่งบันทึกข้อมูลลง CRM แบบเงียบๆ (isSilent = true) 
    if (typeof saveCurrentToCRM === 'function') {
        // ใช้ .catch เพื่อป้องกัน Error ในกรณีที่ผู้ใช้ยังไม่ได้ Login CRM ก็ให้ข้ามไปพิมพ์ได้เลย
        saveCurrentToCRM(true).catch(err => console.log("ข้ามการบันทึก CRM:", err)); 
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
                
                // สั่งรีเฟรช Dashboard ให้เป็น 0 (ถ้ามี)
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
                    'update_doc_scaler',
                    'FA_Temp_Dashboard_Data'
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