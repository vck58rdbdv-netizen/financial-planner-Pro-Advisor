// =====================================================================
// 📈 FA ULTIMATE PLANNER & DASHBOARD ENGINE (V7.3 - Popup Blocker Bypass)
// =====================================================================

async function fetchAllCRMDataForDashboard() {
    return new Promise((resolve, reject) => {
        if (!crmDB) return reject("CRM Database not initialized");
        let transaction = crmDB.transaction(["clients"], "readonly");
        let store = transaction.objectStore("clients");
        let request = store.getAll();

        request.onsuccess = function(e) {
            let rawClients = e.target.result;
            let parsedClients = [];
            rawClients.forEach(raw => {
                if (raw.securePayload) {
                    let dec = SecurityCore.decrypt(raw.securePayload);
                    if (dec) parsedClients.push(dec);
                }
            });
            resolve(parsedClients);
        };
        request.onerror = () => reject("Error fetching data");
    });
}

async function openExecutiveDashboard() {
    // 🌟 1. [HOTFIX] เปิดหน้าต่างใหม่ทันทีที่กดปุ่ม (จองคิวเบราว์เซอร์ไม่ให้โดนบล็อก Pop-up)
    let dashWin = window.open('', '_blank');
    
    // 🌟 ดักจับกรณีผู้ใช้ตั้งค่าปิดกั้น Pop-up ไว้แบบ 100%
    if (!dashWin) {
        alert("⚠️ เบราว์เซอร์ของคุณบล็อกการเปิดหน้าต่างใหม่ (Pop-up blocker)\nกรุณาอนุญาต (Allow Pop-ups) ให้เว็บไซต์นี้ก่อนครับ");
        return;
    }

    // 🌟 เขียนหน้าต่างโหลดข้อมูลรอไว้ก่อน
    dashWin.document.write(`
        <div style="display:flex; justify-content:center; items-align:center; height:100vh; font-family:sans-serif; color:#475569;">
            <h2 style="margin-top:20%;">⏳ กำลังประมวลผลข้อมูล Executive Dashboard...</h2>
        </div>
    `);

    try {
        const clients = await fetchAllCRMDataForDashboard();
        
        let crmStats = {
            totalClients: clients.length,
            personas: {},
            productMix: { 'สุขภาพ/โรคร้าย': 0, 'ตลอดชีพ/มรดก': 0, 'สะสมทรัพย์/บำนาญ': 0, 'ควบการลงทุน (UL)': 0, 'อื่นๆ': 0 }, 
            funnel: { "ผู้มุ่งหวัง": 0, "นำเสนอแผน": 0, "กำลังติดตาม": 0, "รอดำเนินการ": 0, "ปิดการขาย": 0, "เข้าเยี่ยมหลังการขาย": 0, "ปฏิเสธ": 0 }
        };

        clients.forEach(client => {
            let status = client.status || "ผู้มุ่งหวัง";
            if (crmStats.funnel[status] !== undefined) crmStats.funnel[status]++;

            if (client.visits && client.visits.length > 0) {
                let latestVisit = client.visits[0];
                let pRaw = latestVisit.aiCluster || "Unclassified";
                let pClean = pRaw.split('[')[0].trim(); 
                if (pClean !== "-" && pClean !== "") crmStats.personas[pClean] = (crmStats.personas[pClean] || 0) + 1;

                if (latestVisit.dataSnapshot && latestVisit.dataSnapshot.dynamic && latestVisit.dataSnapshot.dynamic.c_ins) {
                    latestVisit.dataSnapshot.dynamic.c_ins.forEach(ins => {
                        let isBase = ins[0] === 'สัญญาหลัก';
                        let type = (isBase ? ins[2] : ins[3]) || "";
                        if (type.includes('สุขภาพ') || type.includes('โรคร้าย') || type.includes('ชดเชย')) crmStats.productMix['สุขภาพ/โรคร้าย']++;
                        else if (type.includes('ตลอดชีพ')) crmStats.productMix['ตลอดชีพ/มรดก']++;
                        else if (type.includes('สะสมทรัพย์') || type.includes('บำนาญ')) crmStats.productMix['สะสมทรัพย์/บำนาญ']++;
                        else if (type.includes('Unit Linked') || type.includes('ควบการลงทุน')) crmStats.productMix['ควบการลงทุน (UL)']++;
                        else crmStats.productMix['อื่นๆ']++;
                    });
                }
            }
        });

        // แพ็กข้อมูลฝากไว้ใน LocalStorage เพื่อความปลอดภัยตอนข้ามหน้าจอ (แก้บั๊ก Safari XSS)
        localStorage.setItem('FA_Temp_Dashboard_Data', JSON.stringify(crmStats));
        
        let html = `
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FA Business Planner</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');
                body { font-family: 'Prompt', sans-serif; background-color: #f1f5f9; color: #1e293b; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .task-cb:checked + label { text-decoration: line-through; color: #9ca3af; }
                .task-cb { width: 1.25rem; height: 1.25rem; cursor: pointer; accent-color: #3b82f6; }
                input[type="text"], input[type="number"], input[type="date"], select { background: #f8fafc; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 10px; border-radius: 6px; font-size: 12px; width: 100%; }
                input:focus, select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); }
            </style>
        </head>
        <body class="p-4 md:p-6 lg:p-8">
            <div class="max-w-7xl mx-auto space-y-6">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-300 pb-4 gap-4">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
                            <span class="text-3xl md:text-4xl">👑</span> FA Business Planner
                        </h1>
                        <p class="text-slate-500 mt-1 text-sm font-medium">จัดการเป้าหมาย Sale Builder และวิเคราะห์พอร์ตโฟลิโอ</p>
                    </div>
                    <div class="flex flex-wrap gap-2 no-print">
                        <button onclick="importBackup()" class="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded font-bold text-xs transition">📥 นำเข้า JSON</button>
                        <button onclick="exportBackup()" class="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded font-bold text-xs transition">📤 ส่งออกสำรองข้อมูล</button>
                        <button onclick="printFormalReport()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-bold text-xs transition shadow-sm">🖨️ พิมพ์รายงานผลงาน</button>
                        <button onclick="window.close()" class="bg-white border border-slate-300 text-slate-700 hover:bg-red-50 hover:text-red-600 px-3 py-1.5 rounded font-bold text-xs transition shadow-sm">ปิดหน้าต่าง</button>
                        <input type="file" id="fileImport" style="display:none" accept=".json">
                    </div>
                </div>

                <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 text-6xl">📅</div>
                    <h2 class="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-700 pb-2 relative z-10">
                        <span>🎯</span> YEAR PLAN: เป้าหมายและผลงานประจำปี <span id="ui_current_year" class="text-emerald-400 ml-2"></span>
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-600 relative">
                            <button onclick="editTarget('fyp')" class="absolute top-3 right-3 text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded no-print">ตั้งเป้า</button>
                            <p class="text-xs text-slate-400 font-bold uppercase mb-1">FYP (เบี้ยปีแรก)</p>
                            <p class="text-2xl font-black text-emerald-400" id="ui_act_fyp">0</p>
                            <div class="w-full bg-slate-900 rounded-full h-2 mt-3 mb-1"><div id="bar_fyp" class="bg-emerald-500 h-full rounded-full transition-all" style="width: 0%"></div></div>
                            <div class="flex justify-between text-[10px] text-slate-300"><span>เป้า: <span id="ui_tgt_fyp">0</span></span><span id="pct_fyp" class="font-bold text-emerald-400">0%</span></div>
                        </div>

                        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-600 relative">
                            <button onclick="editTarget('fyc')" class="absolute top-3 right-3 text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded no-print">ตั้งเป้า</button>
                            <p class="text-xs text-slate-400 font-bold uppercase mb-1">FYC (คอมมิชชัน)</p>
                            <p class="text-2xl font-black text-blue-400" id="ui_act_fyc">0</p>
                            <div class="w-full bg-slate-900 rounded-full h-2 mt-3 mb-1"><div id="bar_fyc" class="bg-blue-500 h-full rounded-full transition-all" style="width: 0%"></div></div>
                            <div class="flex justify-between text-[10px] text-slate-300"><span>เป้า: <span id="ui_tgt_fyc">0</span></span><span id="pct_fyc" class="font-bold text-blue-400">0%</span></div>
                        </div>

                        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-600 relative">
                            <button onclick="editTarget('cases')" class="absolute top-3 right-3 text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded no-print">ตั้งเป้า</button>
                            <p class="text-xs text-slate-400 font-bold uppercase mb-1">Total Cases (ราย)</p>
                            <p class="text-2xl font-black text-purple-400" id="ui_act_cases">0</p>
                            <div class="w-full bg-slate-900 rounded-full h-2 mt-3 mb-1"><div id="bar_cases" class="bg-purple-500 h-full rounded-full transition-all" style="width: 0%"></div></div>
                            <div class="flex justify-between text-[10px] text-slate-300"><span>เป้า: <span id="ui_tgt_cases">0</span></span><span id="pct_cases" class="font-bold text-purple-400">0%</span></div>
                        </div>

                        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-600 relative">
                            <button onclick="editTarget('recruit')" class="absolute top-3 right-3 text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded no-print">ตั้งเป้า</button>
                            <p class="text-xs text-slate-400 font-bold uppercase mb-1">Recruits (ทีมงาน)</p>
                            <p class="text-2xl font-black text-amber-400" id="ui_act_recruit">0</p>
                            <div class="w-full bg-slate-900 rounded-full h-2 mt-3 mb-1"><div id="bar_recruit" class="bg-amber-500 h-full rounded-full transition-all" style="width: 0%"></div></div>
                            <div class="flex justify-between text-[10px] text-slate-300"><span>เป้า: <span id="ui_tgt_recruit">0</span></span><span id="pct_recruit" class="font-bold text-amber-400">0%</span></div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-indigo-100 flex flex-col overflow-hidden">
                        <div class="bg-indigo-50 border-b border-indigo-100 p-4 flex justify-between items-center no-print">
                            <h2 class="font-bold text-indigo-900 flex items-center gap-2"><span>🗓️</span> Sale Builder (แผนและผลงานรายเดือน)</h2>
                            <div class="flex items-center gap-3 bg-white rounded-lg border border-indigo-200 px-2 py-1 shadow-sm">
                                <button onclick="changeMonth(-1)" class="text-indigo-600 hover:bg-indigo-100 p-1 rounded font-bold">&lt;</button>
                                <span id="ui_view_month" class="text-sm font-bold w-24 text-center text-indigo-900"></span>
                                <button onclick="changeMonth(1)" class="text-indigo-600 hover:bg-indigo-100 p-1 rounded font-bold">&gt;</button>
                            </div>
                        </div>

                        <div class="p-4 border-b border-slate-100 space-y-3 bg-white">
                            <div>
                                <div class="flex justify-between text-xs mb-1"><span class="text-slate-500 font-bold">เป้า FYP เดือนนี้: <span id="ui_m_tgt_fyp"></span></span> <span id="ui_m_act_fyp" class="font-bold text-emerald-600"></span></div>
                                <div class="w-full bg-slate-100 rounded-full h-1.5"><div id="bar_m_fyp" class="bg-emerald-500 h-1.5 rounded-full transition-all"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1"><span class="text-slate-500 font-bold">เป้า FYC เดือนนี้: <span id="ui_m_tgt_fyc"></span></span> <span id="ui_m_act_fyc" class="font-bold text-blue-600"></span></div>
                                <div class="w-full bg-slate-100 rounded-full h-1.5"><div id="bar_m_fyc" class="bg-blue-500 h-1.5 rounded-full transition-all"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1"><span class="text-slate-500 font-bold">เป้า Case เดือนนี้: <span id="ui_m_tgt_cases"></span></span> <span id="ui_m_act_cases" class="font-bold text-purple-600"></span></div>
                                <div class="w-full bg-slate-100 rounded-full h-1.5"><div id="bar_m_cases" class="bg-purple-500 h-1.5 rounded-full transition-all"></div></div>
                            </div>
                        </div>

                        <div class="p-0 flex-grow overflow-x-auto">
                            <table class="w-full text-sm text-center">
                                <thead class="bg-indigo-900 text-white text-xs whitespace-nowrap">
                                    <tr>
                                        <th class="py-3 px-2 border-r border-indigo-700 w-16">สัปดาห์</th>
                                        <th class="py-3 px-2 border-r border-indigo-700 bg-indigo-800">เป้า FYP</th>
                                        <th class="py-3 px-2 border-r border-indigo-700 text-emerald-300">ทำได้ FYP</th>
                                        <th class="py-3 px-2 border-r border-indigo-700 bg-indigo-800">เป้า FYC</th>
                                        <th class="py-3 px-2 border-r border-indigo-700 text-blue-300">ทำได้ FYC</th>
                                        <th class="py-3 px-2 border-r border-indigo-700 bg-indigo-800">เป้า Case</th>
                                        <th class="py-3 px-2 text-purple-300">ทำได้ Case</th>
                                    </tr>
                                </thead>
                                <tbody id="ui_weekly_table" class="divide-y divide-slate-100"></tbody>
                                <tfoot class="bg-slate-50 font-bold border-t-2 border-slate-200 text-xs">
                                    <tr>
                                        <td class="py-3 px-2 border-r text-slate-700">รวม</td>
                                        <td class="py-3 px-2 border-r text-slate-500" id="ui_m_t_fyp">0</td>
                                        <td class="py-3 px-2 border-r text-emerald-600" id="ui_m_a_fyp">0</td>
                                        <td class="py-3 px-2 border-r text-slate-500" id="ui_m_t_fyc">0</td>
                                        <td class="py-3 px-2 border-r text-blue-600" id="ui_m_a_fyc">0</td>
                                        <td class="py-3 px-2 border-r text-slate-500" id="ui_m_t_cases">0</td>
                                        <td class="py-3 px-2 text-purple-600" id="ui_m_a_cases">0</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 mb-6 relative">
                            <p class="text-[10px] text-amber-600 font-bold uppercase mb-1">🔥 เป้าหมายปลุกพลัง (Action Plan)</p>
                            <textarea id="ui_cta" class="w-full bg-transparent border-none text-slate-800 font-bold text-sm focus:outline-none resize-none h-16 custom-scrollbar" placeholder="พิมพ์คติประจำใจ หรือเป้าหมายสัปดาห์นี้..."></textarea>
                        </div>
                        
                        <h3 class="font-bold text-sm text-slate-800 mb-3 flex justify-between items-center border-b pb-2">
                            <span>☑️ To-Do / Follow up</span>
                            <button onclick="addChecklist()" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded no-print">+ เพิ่มงาน</button>
                        </h3>
                        <div id="ui_checklists" class="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-grow"></div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h2 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                        <span>📝</span> SALES LEDGER: สมุดบันทึกผลงานจริง
                    </h2>
                    
                    <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 flex flex-wrap gap-3 items-end no-print">
                        <div class="w-28"><label class="text-[10px] font-bold text-slate-600 mb-1 block">ประเภท</label>
                            <select id="s_type" onchange="toggleFormType()">
                                <option value="sale">ส่วนตัว (Sale)</option>
                                <option value="recruit">ทีมงาน (Recruit)</option>
                            </select>
                        </div>
                        <div class="w-32"><label class="text-[10px] font-bold text-slate-600 mb-1 block">วันที่</label><input type="date" id="s_date"></div>
                        <div class="flex-1 min-w-[120px]"><label class="text-[10px] font-bold text-slate-600 mb-1 block">ชื่อลูกค้า/ทีมงาน</label><input type="text" id="s_name" placeholder="ชื่อ-สกุล"></div>
                        
                        <div class="w-28 s-sale-only"><label class="text-[10px] font-bold text-slate-600 mb-1 block">นับ Case?</label>
                            <select id="s_is_new_case">
                                <option value="true">New (นับ)</option>
                                <option value="false">Renewal (ไม่นับ)</option>
                            </select>
                        </div>

                        <div class="flex-1 min-w-[100px] s-sale-only"><label class="text-[10px] font-bold text-slate-600 mb-1 block">สินค้า/แผน</label><input type="text" id="s_prod" placeholder="-"></div>
                        <div class="w-24 s-sale-only"><label class="text-[10px] font-bold text-slate-600 mb-1 block">ทุนประกัน</label><input type="number" id="s_sa" placeholder="0"></div>
                        <div class="w-24"><label class="text-[10px] font-bold text-emerald-600 mb-1 block">FYP</label><input type="number" id="s_fyp" placeholder="0" class="border-emerald-300"></div>
                        <div class="w-24"><label class="text-[10px] font-bold text-blue-600 mb-1 block">FYC</label><input type="number" id="s_fyc" placeholder="0" class="border-blue-300"></div>
                        <div><button onclick="addSaleRecord()" class="bg-slate-800 hover:bg-slate-900 text-white font-bold py-1.5 px-4 rounded-lg text-sm transition h-[32px]">บันทึก</button></div>
                    </div>

                    <div class="overflow-x-auto border rounded-lg">
                        <table class="w-full text-sm text-left whitespace-nowrap">
                            <thead class="text-xs text-slate-500 bg-slate-100 uppercase border-b">
                                <tr>
                                    <th class="px-4 py-3">วันที่</th><th class="px-4 py-3 text-center">ประเภท</th><th class="px-4 py-3">ชื่อรายละเอียด</th>
                                    <th class="px-4 py-3">สินค้า</th><th class="px-4 py-3 text-right">ทุนประกัน</th>
                                    <th class="px-4 py-3 text-right text-emerald-600">FYP</th><th class="px-4 py-3 text-right text-blue-600">FYC</th>
                                    <th class="px-4 py-3 text-center no-print">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody id="ui_sales_table" class="divide-y divide-slate-100"></tbody>
                        </table>
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 break-inside-avoid">
                    <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
                        <span>🗂️</span> CRM OVERVIEW: ภาพรวมฐานข้อมูลลูกค้าทั้งหมด
                    </h2>

                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
                        <div class="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center"><p class="text-[10px] font-bold text-slate-500 mb-1">ผู้มุ่งหวัง</p><p class="text-xl font-black text-slate-700"><span id="crm_funnel_0"></span></p></div>
                        <div class="bg-blue-50 p-3 rounded-lg border border-blue-100 text-center"><p class="text-[10px] font-bold text-blue-500 mb-1">นำเสนอแผน</p><p class="text-xl font-black text-blue-700"><span id="crm_funnel_1"></span></p></div>
                        <div class="bg-purple-50 p-3 rounded-lg border border-purple-100 text-center"><p class="text-[10px] font-bold text-purple-500 mb-1">กำลังติดตาม</p><p class="text-xl font-black text-purple-700"><span id="crm_funnel_2"></span></p></div>
                        <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-center"><p class="text-[10px] font-bold text-yellow-600 mb-1">รอดำเนินการ</p><p class="text-xl font-black text-yellow-700"><span id="crm_funnel_3"></span></p></div>
                        <div class="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center shadow-sm"><p class="text-[10px] font-bold text-emerald-600 mb-1">ปิดการขาย</p><p class="text-xl font-black text-emerald-700"><span id="crm_funnel_4"></span></p></div>
                        <div class="bg-teal-50 p-3 rounded-lg border border-teal-100 text-center"><p class="text-[10px] font-bold text-teal-600 mb-1">บริการหลังขาย</p><p class="text-xl font-black text-teal-700"><span id="crm_funnel_5"></span></p></div>
                        <div class="bg-red-50 p-3 rounded-lg border border-red-100 text-center"><p class="text-[10px] font-bold text-red-500 mb-1">ปฏิเสธ</p><p class="text-xl font-black text-red-700"><span id="crm_funnel_6"></span></p></div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-white p-5 rounded-xl border border-slate-200 flex flex-col h-[250px]">
                            <h3 class="font-bold text-slate-800 text-sm mb-4 border-b pb-2">🧬 กลุ่มลูกค้าที่เข้าพบ (AI Personas)</h3>
                            <div class="relative flex-grow"><canvas id="chartPersona"></canvas></div>
                        </div>
                        <div class="bg-white p-5 rounded-xl border border-slate-200 flex flex-col h-[250px]">
                            <h3 class="font-bold text-slate-800 text-sm mb-4 border-b pb-2">🥧 สัดส่วนสินค้าพอร์ตลูกค้า (Product Mix)</h3>
                            <div class="relative flex-grow"><canvas id="chartProductMix"></canvas></div>
                        </div>
                    </div>
                </div>

            </div>

            <script>
                const savedCrmData = localStorage.getItem('FA_Temp_Dashboard_Data');
                let crmData = { personas: {}, productMix: {}, funnel: {} };
                try { if (savedCrmData) { crmData = JSON.parse(savedCrmData); localStorage.removeItem('FA_Temp_Dashboard_Data'); } } catch (e) { }

                document.getElementById('crm_funnel_0').innerText = crmData.funnel['ผู้มุ่งหวัง'] || 0;
                document.getElementById('crm_funnel_1').innerText = crmData.funnel['นำเสนอแผน'] || 0;
                document.getElementById('crm_funnel_2').innerText = crmData.funnel['กำลังติดตาม'] || 0;
                document.getElementById('crm_funnel_3').innerText = crmData.funnel['รอดำเนินการ'] || 0;
                document.getElementById('crm_funnel_4').innerText = crmData.funnel['ปิดการขาย'] || 0;
                document.getElementById('crm_funnel_5').innerText = crmData.funnel['เข้าเยี่ยมหลังการขาย'] || 0;
                document.getElementById('crm_funnel_6').innerText = crmData.funnel['ปฏิเสธ'] || 0;

                const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#f43f5e', '#14b8a6', '#6366f1'];
                const productColors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#9ca3af'];

                const DB_KEY = 'FA_Ultimate_Planner_V5';
                let plannerData = JSON.parse(localStorage.getItem(DB_KEY)) || {
                    targets: { fyp: 1000000, fyc: 300000, cases: 50, recruit: 5 },
                    salesLedger: [], 
                    checklists: [ { id: Date.now(), text: "ตั้งเป้าหมายประจำปีให้เรียบร้อย", deadline: "2026-12-31", done: false } ],
                    cta: "ฉันคือนักขายระดับท็อป!"
                };

                plannerData.salesLedger.forEach(s => { if(s.isNewCase === undefined) s.isNewCase = true; });

                let viewDate = new Date();
                const monthNames = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

                document.getElementById('s_date').value = viewDate.toISOString().slice(0, 10);

                function saveData() { localStorage.setItem(DB_KEY, JSON.stringify(plannerData)); }

                function toggleFormType() {
                    let isSale = document.getElementById('s_type').value === 'sale';
                    let els = document.querySelectorAll('.s-sale-only');
                    els.forEach(el => el.style.display = isSale ? 'block' : 'none');
                    if(!isSale) { 
                        document.getElementById('s_prod').value = ''; 
                        document.getElementById('s_sa').value = ''; 
                        document.getElementById('s_is_new_case').value = 'true';
                    }
                }

                window.changeMonth = function(offset) {
                    viewDate.setMonth(viewDate.getMonth() + offset);
                    initUI();
                };

                window.currentStats = {};

                function initUI() {
                    let vYear = viewDate.getFullYear();
                    let vMonth = viewDate.getMonth();
                    
                    document.getElementById('ui_current_year').innerText = vYear;
                    document.getElementById('ui_view_month').innerText = monthNames[vMonth] + " " + vYear;

                    let tFYP = 0, tFYC = 0, tCases = 0, tRecruit = 0;
                    let mFYP = 0, mFYC = 0, mCases = 0;
                    let wData = [ {fyp:0, fyc:0, case:0}, {fyp:0, fyc:0, case:0}, {fyp:0, fyc:0, case:0}, {fyp:0, fyc:0, case:0} ];

                    plannerData.salesLedger.forEach(s => {
                        let sd = new Date(s.date);
                        let isThisYear = sd.getFullYear() === vYear;
                        let isThisMonth = isThisYear && sd.getMonth() === vMonth;

                        if (isThisYear) {
                            tFYP += s.fyp; tFYC += s.fyc;
                            if (s.type === 'sale' && s.isNewCase !== false && s.isNewCase !== 'false') tCases++;
                            if (s.type === 'recruit') tRecruit++;
                        }

                        if (isThisMonth) {
                            mFYP += s.fyp; mFYC += s.fyc;
                            if (s.type === 'sale' && s.isNewCase !== false && s.isNewCase !== 'false') mCases++;

                            let d = sd.getDate();
                            let wIdx = d <= 7 ? 0 : d <= 14 ? 1 : d <= 21 ? 2 : 3;
                            wData[wIdx].fyp += s.fyp;
                            wData[wIdx].fyc += s.fyc;
                            if (s.type === 'sale' && s.isNewCase !== false && s.isNewCase !== 'false') wData[wIdx].case += 1;
                        }
                    });

                    window.currentStats = { year: vYear, monthStr: monthNames[vMonth], tFYP, tFYC, tCases, tRecruit, mFYP, mFYC, mCases };

                    updateKPI('fyp', tFYP, plannerData.targets.fyp);
                    updateKPI('fyc', tFYC, plannerData.targets.fyc);
                    updateKPI('cases', tCases, plannerData.targets.cases);
                    updateKPI('recruit', tRecruit, plannerData.targets.recruit);

                    let tgtMFYP = plannerData.targets.fyp / 12;
                    let tgtMFYC = plannerData.targets.fyc / 12;
                    let tgtMCase = plannerData.targets.cases / 12;
                    
                    document.getElementById('ui_m_tgt_fyp').innerText = tgtMFYP.toLocaleString('th-TH',{maximumFractionDigits:0}) + ' ฿';
                    document.getElementById('ui_m_act_fyp').innerText = mFYP.toLocaleString('th-TH') + ' ฿';
                    document.getElementById('bar_m_fyp').style.width = Math.min((tgtMFYP>0 ? (mFYP/tgtMFYP)*100 : 0), 100) + '%';

                    document.getElementById('ui_m_tgt_fyc').innerText = tgtMFYC.toLocaleString('th-TH',{maximumFractionDigits:0}) + ' ฿';
                    document.getElementById('ui_m_act_fyc').innerText = mFYC.toLocaleString('th-TH') + ' ฿';
                    document.getElementById('bar_m_fyc').style.width = Math.min((tgtMFYC>0 ? (mFYC/tgtMFYC)*100 : 0), 100) + '%';

                    document.getElementById('ui_m_tgt_cases').innerText = tgtMCase.toFixed(1) + ' ราย';
                    document.getElementById('ui_m_act_cases').innerText = mCases + ' ราย';
                    document.getElementById('bar_m_cases').style.width = Math.min((tgtMCase>0 ? (mCases/tgtMCase)*100 : 0), 100) + '%';

                    let wHtml = '';
                    let tgtWFYP = tgtMFYP / 4;
                    let tgtWFYC = tgtMFYC / 4;
                    let tgtWCase = tgtMCase / 4;

                    for(let i=0; i<4; i++) {
                        let isOkFYP = wData[i].fyp >= tgtWFYP;
                        let isOkFYC = wData[i].fyc >= tgtWFYC;
                        let isOkCase = wData[i].case >= tgtWCase;
                        wHtml += \`
                            <tr class="hover:bg-slate-50 border-b border-slate-100">
                                <td class="py-2 px-1 border-r text-slate-600 font-bold">W\${i+1}</td>
                                <td class="py-2 px-1 border-r text-slate-500">\${tgtWFYP.toLocaleString('th-TH',{maximumFractionDigits:0})}</td>
                                <td class="py-2 px-1 border-r font-bold \${isOkFYP ? 'text-emerald-600':'text-amber-500'}">\${wData[i].fyp.toLocaleString('th-TH')}</td>
                                <td class="py-2 px-1 border-r text-slate-500">\${tgtWFYC.toLocaleString('th-TH',{maximumFractionDigits:0})}</td>
                                <td class="py-2 px-1 border-r font-bold \${isOkFYC ? 'text-blue-600':'text-amber-500'}">\${wData[i].fyc.toLocaleString('th-TH')}</td>
                                <td class="py-2 px-1 border-r text-slate-500">\${tgtWCase.toFixed(1)}</td>
                                <td class="py-2 px-1 font-bold \${isOkCase ? 'text-purple-600':'text-amber-500'}">\${wData[i].case}</td>
                            </tr>
                        \`;
                    }
                    document.getElementById('ui_weekly_table').innerHTML = wHtml;

                    document.getElementById('ui_m_t_fyp').innerText = tgtMFYP.toLocaleString('th-TH',{maximumFractionDigits:0});
                    document.getElementById('ui_m_a_fyp').innerText = mFYP.toLocaleString('th-TH');
                    document.getElementById('ui_m_t_fyc').innerText = tgtMFYC.toLocaleString('th-TH',{maximumFractionDigits:0});
                    document.getElementById('ui_m_a_fyc').innerText = mFYC.toLocaleString('th-TH');
                    document.getElementById('ui_m_t_cases').innerText = tgtMCase.toFixed(1);
                    document.getElementById('ui_m_a_cases').innerText = mCases;

                    document.getElementById('ui_cta').value = plannerData.cta || "";
                    renderChecklists();
                    renderSalesTable();
                }

                function updateKPI(key, actual, target) {
                    let pct = target > 0 ? (actual / target) * 100 : 0;
                    document.getElementById('ui_act_' + key).innerText = (key === 'fyp' || key === 'fyc') ? actual.toLocaleString('th-TH') + ' ฿' : actual.toLocaleString('th-TH');
                    document.getElementById('ui_tgt_' + key).innerText = target.toLocaleString('th-TH');
                    document.getElementById('bar_' + key).style.width = Math.min(pct, 100) + '%';
                    document.getElementById('pct_' + key).innerText = pct.toFixed(1) + '%';
                }

                window.editTarget = function(key) {
                    let tgtVal = prompt(\`ตั้งเป้าหมายประจำปีใหม่ (Target \${key.toUpperCase()}):\`, plannerData.targets[key]);
                    if(tgtVal !== null) {
                        let num = parseInt(tgtVal.replace(/,/g, '')) || 0;
                        if(num > 0) { plannerData.targets[key] = num; saveData(); initUI(); }
                    }
                };

                document.getElementById('ui_cta').addEventListener('input', (e) => { plannerData.cta = e.target.value; saveData(); });

                window.addSaleRecord = function() {
                    let type = document.getElementById('s_type').value;
                    let date = document.getElementById('s_date').value;
                    let name = document.getElementById('s_name').value.trim();
                    let prod = type === 'sale' ? document.getElementById('s_prod').value.trim() : '-';
                    let sa = type === 'sale' ? (parseFloat(document.getElementById('s_sa').value) || 0) : 0;
                    let isNewCase = type === 'sale' ? (document.getElementById('s_is_new_case').value === 'true') : false;
                    let fyp = parseFloat(document.getElementById('s_fyp').value) || 0;
                    let fyc = parseFloat(document.getElementById('s_fyc').value) || 0;

                    if(!date || !name) return alert("กรุณากรอกวันที่และชื่อ ให้ครบถ้วนครับ");

                    plannerData.salesLedger.push({ id: Date.now().toString(), date, type, name, prod, sa, fyp, fyc, isNewCase });
                    saveData(); initUI();
                    
                    document.getElementById('s_name').value = ''; document.getElementById('s_prod').value = '';
                    document.getElementById('s_sa').value = ''; document.getElementById('s_fyp').value = ''; document.getElementById('s_fyc').value = '';
                };

                window.deleteSaleRecord = function(id) {
                    if(confirm("ต้องการลบประวัติรายการนี้ใช่หรือไม่? (ยอดสะสมจะลดลงตาม)")) {
                        plannerData.salesLedger = plannerData.salesLedger.filter(s => s.id !== id);
                        saveData(); initUI();
                    }
                };

                function renderSalesTable() {
                    let sorted = [...plannerData.salesLedger].sort((a,b) => new Date(b.date) - new Date(a.date));
                    let tbody = document.getElementById('ui_sales_table');
                    if(sorted.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="8" class="px-4 py-6 text-center text-slate-400 text-xs">ยังไม่มีบันทึกผลงาน</td></tr>'; return;
                    }
                    tbody.innerHTML = sorted.map(s => {
                        let isSale = s.type === 'sale';
                        let typeBadge = isSale ? '<span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">Sale</span>' : '<span class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">Recruit</span>';
                        let isNew = (s.isNewCase !== false && s.isNewCase !== 'false');
                        let caseBadge = (!isSale || !isNew) ? '<br><span class="text-[9px] text-slate-400">(Renewal/ไม่นับเคส)</span>' : '';
                        
                        return \`
                            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                                <td class="px-4 py-2 text-slate-600">\${new Date(s.date).toLocaleDateString('th-TH',{day:'numeric',month:'short',year:'2-digit'})}</td>
                                <td class="px-4 py-2 text-center">\${typeBadge}\${caseBadge}</td>
                                <td class="px-4 py-2 font-bold text-slate-800">\${s.name}</td>
                                <td class="px-4 py-2 text-slate-600">\${s.prod || '-'}</td>
                                <td class="px-4 py-2 text-right text-slate-600">\${s.sa ? s.sa.toLocaleString('th-TH') : '-'}</td>
                                <td class="px-4 py-2 text-right font-bold text-emerald-600">\${s.fyp.toLocaleString('th-TH')}</td>
                                <td class="px-4 py-2 text-right font-bold text-blue-600">\${s.fyc.toLocaleString('th-TH')}</td>
                                <td class="px-4 py-2 text-center no-print"><button onclick="deleteSaleRecord('\${s.id}')" class="text-red-400 hover:text-red-600 text-xs bg-red-50 hover:bg-red-100 px-2 py-1 rounded">ลบ</button></td>
                            </tr>
                        \`;
                    }).join('');
                }

                function renderChecklists() {
                    const c = document.getElementById('ui_checklists');
                    if(plannerData.checklists.length === 0) { c.innerHTML = '<p class="text-xs text-slate-500 italic text-center mt-4">ยังไม่มีเป้าหมาย</p>'; return; }
                    let sorted = [...plannerData.checklists].sort((a,b) => { if(a.done !== b.done) return a.done ? 1 : -1; return new Date(a.deadline) - new Date(b.deadline); });
                    c.innerHTML = sorted.map(t => \`
                        <div class="p-2 border-b border-slate-100 flex justify-between items-center group">
                            <div class="flex items-center gap-2 overflow-hidden">
                                <input type="checkbox" id="chk_\${t.id}" class="task-cb rounded border-slate-300 flex-shrink-0 no-print" \${t.done ? 'checked' : ''} onchange="toggleCheck('\${t.id}', this.checked)">
                                <div class="truncate">
                                    <label for="chk_\${t.id}" class="text-sm cursor-pointer select-none \${t.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}">\${t.text}</label>
                                    <p class="text-[9px] \${t.done ? 'text-slate-400' : 'text-red-500'}">⏳ \${t.deadline || 'ไม่ระบุ'}</p>
                                </div>
                            </div>
                            <button onclick="deleteCheck('\${t.id}')" class="text-[10px] text-red-400 opacity-0 group-hover:opacity-100 transition px-2 no-print">ลบ</button>
                        </div>
                    \`).join('');
                }

                window.addChecklist = function() {
                    let text = prompt("ชื่องาน/เป้าหมายที่ต้องทำ:"); if(!text) return;
                    let date = prompt("ระบุ Deadline (เช่น 31/12/2026):", "31/12/2026");
                    plannerData.checklists.push({ id: Date.now().toString(), text: text, deadline: date, done: false });
                    saveData(); renderChecklists();
                };
                window.toggleCheck = function(id, isChecked) { let item = plannerData.checklists.find(x => x.id === id); if(item) { item.done = isChecked; saveData(); renderChecklists(); } };
                window.deleteCheck = function(id) { if(confirm("ลบรายการนี้ใช่หรือไม่?")) { plannerData.checklists = plannerData.checklists.filter(x => x.id !== id); saveData(); renderChecklists(); } };

                // --- 🌟 FORMAL PRINT REPORT GENERATOR (A4 Landscape, Editable) ---
                window.printFormalReport = function() {
                    let printWin = window.open('', '_blank');
                    let ds = window.currentStats; 
                    let printDate = new Date().toLocaleDateString('th-TH', {year:'numeric', month:'long', day:'numeric'});
                    
                    let ledgerRows = plannerData.salesLedger.filter(s => new Date(s.date).getFullYear() === ds.year).sort((a,b) => new Date(a.date) - new Date(b.date));
                    let tableHtml = ledgerRows.map(s => {
                        let isNew = (s.isNewCase !== false && s.isNewCase !== 'false');
                        let typeStr = s.type === 'sale' ? (isNew ? 'New Case' : 'Renewal') : 'Recruit';
                        return \`<tr>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:center;">\${new Date(s.date).toLocaleDateString('th-TH',{day:'2-digit',month:'short'})}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:center; font-weight:bold; color: #475569;">\${typeStr}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; font-weight:bold;">\${s.name}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd;">\${s.prod || '-'}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:right;">\${s.sa ? s.sa.toLocaleString('th-TH') : '-'}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:right; font-weight:bold; color:#059669;">\${s.fyp.toLocaleString('th-TH')}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:right; font-weight:bold; color:#2563eb;">\${s.fyc.toLocaleString('th-TH')}</td>
                        </tr>\`;
                    }).join('');

                    if(tableHtml === '') tableHtml = '<tr><td colspan="7" style="text-align:center; padding:20px; color:#999; font-style:italic;">ยังไม่มีบันทึกผลงานในปีนี้</td></tr>';

                    let html = \`
                    <!DOCTYPE html>
                    <html lang="th">
                    <head>
                        <meta charset="UTF-8">
                        <title>FA Business Report - \${ds.year}</title>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');
                            body { font-family: 'Sarabun', sans-serif; font-size: 14px; color: #1e293b; padding: 20px; background: #f8fafc; }
                            .page-container { background: white; padding: 30px 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; max-width: 1100px; margin: 0 auto; }
                            
                            .action-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #e2e8f0; }
                            .btn { padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-family: 'Sarabun', sans-serif; font-size: 14px; font-weight: bold; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
                            .btn-back { background-color: #f1f5f9; color: #475569; }
                            .btn-back:hover { background-color: #e2e8f0; }
                            .btn-print { background-color: #2563eb; color: white; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2); }
                            .btn-print:hover { background-color: #1d4ed8; }

                            h1 { color: #0f172a; text-align: center; margin: 0 0 5px 0; font-size: 26px; text-transform: uppercase; letter-spacing: 1px; }
                            .subtitle { text-align: center; color: #64748b; margin-bottom: 30px; font-size: 13px; }
                            
                            .box-container { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 30px; }
                            .kpi-box { flex: 1; border: 1px solid #e2e8f0; border-radius: 10px; padding: 15px 20px; text-align: center; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
                            .kpi-title { font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 5px; margin-bottom: 10px; }
                            .kpi-actual { font-size: 24px; font-weight: bold; margin: 5px 0; }
                            .kpi-target { font-size: 12px; color: #94a3b8; }
                            
                            h2 { font-size: 16px; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px; margin-top: 10px; display: flex; justify-content: space-between; }
                            
                            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
                            th { background-color: #f8fafc; padding: 10px 8px; text-align: left; border-bottom: 2px solid #cbd5e1; color: #334155; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
                            
                            .cta-box { background: #f0fdf4; border: 1px dashed #bbf7d0; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; color: #166534; margin-top: 30px; font-size: 16px; }
                            
                            @media print { 
                                @page { size: A4 landscape; margin: 10mm; } 
                                body { background: none; padding: 0; }
                                .page-container { box-shadow: none; max-width: none; padding: 0; }
                                .no-print { display: none !important; } 
                                .kpi-box { background: #f8fafc !important; -webkit-print-color-adjust: exact; }
                                th { background-color: #f1f5f9 !important; -webkit-print-color-adjust: exact; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="page-container">
                            <div class="no-print action-bar">
                                <div><button class="btn btn-back" onclick="window.close()">⬅️ กลับ</button></div>
                                <div>
                                    <span style="font-size:12px; color:#64748b; margin-right:10px;">* หากกดพิมพ์แล้วหน้ากระดาษเป็นแนวตั้ง ให้เปลี่ยน Layout เป็น Landscape ในหน้าต่างตั้งค่าพิมพ์</span>
                                    <button class="btn btn-print" onclick="window.print()">🖨️ สั่งพิมพ์ (A4 แนวนอน)</button>
                                </div>
                            </div>

                            <h1>FA Business Executive Report</h1>
                            <div class="subtitle">รายงานสรุปผลการดำเนินงานประจำปี \${ds.year} | พิมพ์เมื่อ: \${printDate}</div>
                            
                            <div class="box-container">
                                <div class="kpi-box">
                                    <div class="kpi-title">FYP (เบี้ยปีแรก)</div>
                                    <div class="kpi-actual" style="color: #059669;">\${ds.tFYP.toLocaleString('th-TH')} ฿</div>
                                    <div class="kpi-target">เป้าหมาย: \${plannerData.targets.fyp.toLocaleString('th-TH')}</div>
                                </div>
                                <div class="kpi-box">
                                    <div class="kpi-title">FYC (คอมมิชชัน)</div>
                                    <div class="kpi-actual" style="color: #2563eb;">\${ds.tFYC.toLocaleString('th-TH')} ฿</div>
                                    <div class="kpi-target">เป้าหมาย: \${plannerData.targets.fyc.toLocaleString('th-TH')}</div>
                                </div>
                                <div class="kpi-box">
                                    <div class="kpi-title">Total Cases</div>
                                    <div class="kpi-actual" style="color: #9333ea;">\${ds.tCases} ราย</div>
                                    <div class="kpi-target">เป้าหมาย: \${plannerData.targets.cases}</div>
                                </div>
                                <div class="kpi-box">
                                    <div class="kpi-title">Recruits</div>
                                    <div class="kpi-actual" style="color: #d97706;">\${ds.tRecruit} คน</div>
                                    <div class="kpi-target">เป้าหมาย: \${plannerData.targets.recruit}</div>
                                </div>
                            </div>

                            <h2><span>📝 บันทึกผลงานการขาย (Sales Ledger)</span> <span style="font-size:12px; font-weight:normal; color:#64748b;">เฉพาะปี \${ds.year}</span></h2>
                            <table>
                                <thead><tr>
                                    <th style="text-align:center; width:80px;">วันที่</th>
                                    <th style="text-align:center; width:80px;">สถานะ</th>
                                    <th>ชื่อลูกค้า / ทีมงาน</th>
                                    <th>สินค้า / แผน</th>
                                    <th style="text-align:right;">ทุนประกัน</th>
                                    <th style="text-align:right;">FYP</th>
                                    <th style="text-align:right;">FYC</th>
                                </tr></thead>
                                <tbody>\${tableHtml}</tbody>
                            </table>

                            <div class="cta-box">
                                " \${plannerData.cta || 'FA Professional Business Report'} "
                            </div>
                        </div>
                    </body>
                    </html>
                    \`;

                    printWin.document.open();
                    printWin.document.write(html);
                    printWin.document.close();
                };

                // --- Backup Data (Import/Export Planner) ---
                window.exportBackup = function() {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plannerData, null, 2));
                    const dl = document.createElement('a');
                    dl.setAttribute("href", dataStr);
                    dl.setAttribute("download", "FA_Planner_Backup.json");
                    document.body.appendChild(dl);
                    dl.click();
                    document.body.removeChild(dl);
                };

                window.importBackup = function() { document.getElementById('fileImport').click(); };
                document.getElementById('fileImport').addEventListener('change', function(e) {
                    const file = e.target.files[0]; if(!file) return;
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        try {
                            const imported = JSON.parse(evt.target.result);
                            if(imported.targets && imported.salesLedger) {
                                if(confirm("ต้องการเขียนทับข้อมูล Planner ด้วยไฟล์ Backup นี้ใช่หรือไม่?")) {
                                    plannerData = imported; saveData(); initUI(); alert("✅ นำเข้าข้อมูลสำเร็จ!");
                                }
                            } else { alert("❌ รูปแบบไฟล์ไม่ถูกต้อง"); }
                        } catch(err) { alert("❌ ไม่สามารถอ่านไฟล์ JSON ได้"); }
                    };
                    reader.readAsText(file); e.target.value = '';
                });

                // --- 📊 วาดกราฟ CRM ---
                window.onload = function() {
                    toggleFormType(); 
                    initUI();
                    
                    if(typeof ChartDataLabels !== 'undefined') Chart.register(ChartDataLabels);

                    let pLabels = Object.keys(crmData.personas); let pData = Object.values(crmData.personas);
                    if(pLabels.length > 0) {
                        new Chart(document.getElementById('chartPersona').getContext('2d'), {
                            type: 'doughnut', data: { labels: pLabels, datasets: [{ data: pData, backgroundColor: chartColors, borderWidth: 2, borderColor: '#fff' }] },
                            options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'right', labels: { font: { family: 'Prompt', size: 10 }, boxWidth: 10 } }, datalabels: { color: '#fff', font: { weight: 'bold', family: 'Prompt', size: 12 }, formatter: (val, ctx) => { let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0); return Math.round((val / sum) * 100) + '%'; } } } }
                        });
                    }

                    let pmData = Object.values(crmData.productMix); let pmSum = pmData.reduce((a, b) => a + b, 0);
                    if(pmSum > 0) {
                        new Chart(document.getElementById('chartProductMix').getContext('2d'), {
                            type: 'pie', data: { labels: Object.keys(crmData.productMix), datasets: [{ data: pmData, backgroundColor: productColors, borderColor: '#ffffff', borderWidth: 2 }] },
                            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { family: 'Prompt', size: 10 }, boxWidth: 10 } }, datalabels: { color: '#fff', font: { weight: 'bold', family: 'Prompt', size: 12 }, formatter: (val) => val > 0 ? val : '' } } }
                        });
                    }
                };
            </script>
        </body>
        </html>
        `;

        dashWin.document.open();
        dashWin.document.write(html);
        dashWin.document.close();

    } catch (error) {
        console.error(error);
        alert("❌ เกิดข้อผิดพลาดในการโหลดข้อมูล Dashboard");
    }
}