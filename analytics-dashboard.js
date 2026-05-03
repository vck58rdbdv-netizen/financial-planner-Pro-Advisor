// =====================================================================
// 📈 FA ULTIMATE PLANNER & DASHBOARD ENGINE (V8.3 - Full Edition + CRM Quick View)
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
        <div style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; color:#475569; background-color:#f8fafc;">
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

        localStorage.setItem('FA_Temp_Dashboard_Data', JSON.stringify(crmStats));
        
        // 🌟 V8.3 ส่งข้อมูลลูกค้าทั้งหมดไปยังหน้าต่างใหม่ เพื่อทำ CRM Quick View อย่างปลอดภัย
        const safeClientData = JSON.stringify(clients).replace(/<\/script>/g, '<\\/script>');
        
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
                /* ปรับพื้นหลังให้เป็นสี slate-50 (อ่อนๆ สบายตา ไม่จ้าเท่าสีขาว) */
                body { font-family: 'Prompt', sans-serif; background-color: #f8fafc; color: #334155; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .task-cb:checked + label { text-decoration: line-through; color: #9ca3af; }
                .task-cb { width: 1.25rem; height: 1.25rem; cursor: pointer; accent-color: #3b82f6; }
                input[type="text"], input[type="number"], input[type="date"], select { background: #f8fafc; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 10px; border-radius: 6px; font-size: 12px; width: 100%; }
                input:focus, select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); }
            </style>
        </head>
        <body class="p-4 md:p-6 lg:p-8 relative">
            <div class="max-w-7xl mx-auto space-y-6">
                <!-- ================== ส่วน Header ================== -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-300 pb-4 gap-4">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
                            <span class="text-3xl md:text-4xl">👑</span> FA Business Planner
                        </h1>
                        <p class="text-slate-500 mt-1 text-sm font-medium">จัดการเป้าหมาย Sale Builder และวิเคราะห์พอร์ตโฟลิโอ</p>
                    </div>
                    <div class="flex flex-wrap gap-2 no-print">
                        <!-- นำปุ่ม Import/Export ออก แล้วเหลือแค่ พิมพ์ และ ปิดหน้าต่าง -->
                        <button onclick="printFormalReport()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm flex items-center gap-2">
                            <span>🖨️</span> พิมพ์รายงานผลงาน
                        </button>
                        <button onclick="window.close()" class="bg-white border border-slate-300 text-slate-700 hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-lg font-bold text-xs transition shadow-sm">❌ ปิดหน้าต่าง</button>
                    </div>
                </div>

                <!-- ================== ส่วน KPI กล่องสรุปผล ================== -->
                <!-- ปรับสีกรอบและพื้นหลังเล็กน้อยให้ดูละมุนขึ้น -->
                <div class="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 text-6xl">📅</div>
                    <h2 class="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-600 pb-2 relative z-10">
                        <span>🎯</span> YEAR PLAN: เป้าหมายและผลงานประจำปี <span id="ui_current_year" class="text-emerald-400 ml-2"></span>
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        <div class="bg-slate-800 p-4 rounded-xl border border-slate-600 relative shadow-inner">
                            <button onclick="editTarget('fyp')" class="absolute top-3 right-3 text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded no-print">ตั้งเป้า</button>
                            <p class="text-xs text-slate-400 font-bold uppercase mb-1">FYP (เบี้ยปีแรก)</p>
                            <p class="text-2xl font-black text-emerald-400" id="ui_act_fyp">0</p>
                            <div class="w-full bg-slate-900 rounded-full h-2 mt-3 mb-1"><div id="bar_fyp" class="bg-emerald-500 h-full rounded-full transition-all" style="width: 0%"></div></div>
                            <div class="flex justify-between text-[10px] text-slate-300"><span>เป้า: <span id="ui_tgt_fyp">0</span></span><span id="pct_fyp" class="font-bold text-emerald-400">0%</span></div>
                        </div>

                        <div class="bg-slate-800 p-4 rounded-xl border border-slate-600 relative shadow-inner">
                            <button onclick="editTarget('fyc')" class="absolute top-3 right-3 text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded no-print">ตั้งเป้า</button>
                            <p class="text-xs text-slate-400 font-bold uppercase mb-1">FYC (คอมมิชชัน)</p>
                            <p class="text-2xl font-black text-blue-400" id="ui_act_fyc">0</p>
                            <div class="w-full bg-slate-900 rounded-full h-2 mt-3 mb-1"><div id="bar_fyc" class="bg-blue-500 h-full rounded-full transition-all" style="width: 0%"></div></div>
                            <div class="flex justify-between text-[10px] text-slate-300"><span>เป้า: <span id="ui_tgt_fyc">0</span></span><span id="pct_fyc" class="font-bold text-blue-400">0%</span></div>
                        </div>

                        <div class="bg-slate-800 p-4 rounded-xl border border-slate-600 relative shadow-inner">
                            <button onclick="editTarget('cases')" class="absolute top-3 right-3 text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded no-print">ตั้งเป้า</button>
                            <p class="text-xs text-slate-400 font-bold uppercase mb-1">Total Cases (ราย)</p>
                            <p class="text-2xl font-black text-purple-400" id="ui_act_cases">0</p>
                            <div class="w-full bg-slate-900 rounded-full h-2 mt-3 mb-1"><div id="bar_cases" class="bg-purple-500 h-full rounded-full transition-all" style="width: 0%"></div></div>
                            <div class="flex justify-between text-[10px] text-slate-300"><span>เป้า: <span id="ui_tgt_cases">0</span></span><span id="pct_cases" class="font-bold text-purple-400">0%</span></div>
                        </div>

                        <div class="bg-slate-800 p-4 rounded-xl border border-slate-600 relative shadow-inner">
                            <button onclick="editTarget('recruit')" class="absolute top-3 right-3 text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded no-print">ตั้งเป้า</button>
                            <p class="text-xs text-slate-400 font-bold uppercase mb-1">Recruits (ทีมงาน)</p>
                            <p class="text-2xl font-black text-amber-400" id="ui_act_recruit">0</p>
                            <div class="w-full bg-slate-900 rounded-full h-2 mt-3 mb-1"><div id="bar_recruit" class="bg-amber-500 h-full rounded-full transition-all" style="width: 0%"></div></div>
                            <div class="flex justify-between text-[10px] text-slate-300"><span>เป้า: <span id="ui_tgt_recruit">0</span></span><span id="pct_recruit" class="font-bold text-amber-400">0%</span></div>
                        </div>
                    </div>
                </div>

                <!-- ================== ส่วนอื่นๆ ของ Planner ================== -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-200 flex flex-col overflow-hidden">
                        <div class="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center no-print">
                            <h2 class="font-bold text-slate-800 flex items-center gap-2"><span>🗓️</span> Sale Builder (แผนและผลงานรายเดือน)</h2>
                            <div class="flex items-center gap-3 bg-white rounded-lg border border-slate-200 px-2 py-1 shadow-sm">
                                <button onclick="changeMonth(-1)" class="text-slate-600 hover:bg-slate-100 p-1 rounded font-bold">&lt;</button>
                                <span id="ui_view_month" class="text-sm font-bold w-24 text-center text-slate-800"></span>
                                <button onclick="changeMonth(1)" class="text-slate-600 hover:bg-slate-100 p-1 rounded font-bold">&gt;</button>
                            </div>
                        </div>

                        <div class="bg-white px-4 pt-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-emerald-50 rounded-lg p-3 border border-emerald-100 text-center">
                                    <p class="text-[10px] font-bold text-emerald-600 uppercase">Avg. Case Size (เบี้ยเฉลี่ย)</p>
                                    <p class="text-lg font-black text-emerald-700" id="ui_stat_case_size">0 ฿</p>
                                </div>
                                <div class="bg-blue-50 rounded-lg p-3 border border-blue-100 text-center">
                                    <p class="text-[10px] font-bold text-blue-600 uppercase">%FYC Average (คอมมิชชันเฉลี่ย)</p>
                                    <p class="text-lg font-black text-blue-700" id="ui_stat_fyc_pct">0%</p>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 border-b border-slate-100 space-y-3 bg-white">
                            <div>
                                <div class="flex justify-between text-xs mb-1"><span class="text-slate-500 font-bold">เป้า FYP เดือนนี้: <span id="ui_m_tgt_fyp"></span></span> <span id="ui_m_act_fyp" class="font-bold text-emerald-600"></span></div>
                                <div class="w-full bg-slate-100 rounded-full h-1.5"><div id="bar_m_fyp" class="bg-emerald-500 h-full rounded-full transition-all"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1"><span class="text-slate-500 font-bold">เป้า FYC เดือนนี้: <span id="ui_m_tgt_fyc"></span></span> <span id="ui_m_act_fyc" class="font-bold text-blue-600"></span></div>
                                <div class="w-full bg-slate-100 rounded-full h-1.5"><div id="bar_m_fyc" class="bg-blue-500 h-full rounded-full transition-all"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1"><span class="text-slate-500 font-bold">เป้า Case เดือนนี้: <span id="ui_m_tgt_cases"></span></span> <span id="ui_m_act_cases" class="font-bold text-purple-600"></span></div>
                                <div class="w-full bg-slate-100 rounded-full h-1.5"><div id="bar_m_cases" class="bg-purple-500 h-full rounded-full transition-all"></div></div>
                            </div>
                        </div>

                        <div class="p-0 flex-grow overflow-x-auto">
                            <table class="w-full text-sm text-center">
                                <thead class="bg-slate-800 text-white text-xs whitespace-nowrap border-b-2 border-slate-900">
                                    <tr>
                                        <th class="py-3 px-2 border-r border-slate-700 w-16">สัปดาห์</th>
                                        <th class="py-3 px-2 border-r border-slate-700 bg-slate-700">เป้า FYP</th>
                                        <th class="py-3 px-2 border-r border-slate-700 text-emerald-300">ทำได้ FYP</th>
                                        <th class="py-3 px-2 border-r border-slate-700 bg-slate-700">เป้า FYC</th>
                                        <th class="py-3 px-2 border-r border-slate-700 text-blue-300">ทำได้ FYC</th>
                                        <th class="py-3 px-2 border-r border-slate-700 bg-slate-700">เป้า Case</th>
                                        <th class="py-3 px-2 text-purple-300">ทำได้ Case</th>
                                    </tr>
                                </thead>
                                <tbody id="ui_weekly_table" class="divide-y divide-slate-100"></tbody>
                                <tfoot class="bg-slate-100 font-bold border-t-2 border-slate-300 text-xs">
                                    <tr>
                                        <td class="py-3 px-2 border-r border-slate-200 text-slate-700">รวม</td>
                                        <td class="py-3 px-2 border-r border-slate-200 text-slate-500" id="ui_m_t_fyp">0</td>
                                        <td class="py-3 px-2 border-r border-slate-200 text-emerald-600" id="ui_m_a_fyp">0</td>
                                        <td class="py-3 px-2 border-r border-slate-200 text-slate-500" id="ui_m_t_fyc">0</td>
                                        <td class="py-3 px-2 border-r border-slate-200 text-blue-600" id="ui_m_a_fyc">0</td>
                                        <td class="py-3 px-2 border-r border-slate-200 text-slate-500" id="ui_m_t_cases">0</td>
                                        <td class="py-3 px-2 text-purple-600" id="ui_m_a_cases">0</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl shadow-md border border-slate-200 p-5 flex flex-col">
                        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 mb-6 relative">
                            <p class="text-[10px] text-amber-600 font-bold uppercase mb-1">🔥 เป้าหมายปลุกพลัง (Action Plan)</p>
                            <textarea id="ui_cta" class="w-full bg-transparent border-none text-slate-800 font-bold text-sm focus:outline-none resize-none h-16 custom-scrollbar" placeholder="พิมพ์คติประจำใจ หรือเป้าหมายสัปดาห์นี้..."></textarea>
                        </div>
                        
                        <h3 class="font-bold text-sm text-slate-800 mb-3 flex justify-between items-center border-b pb-2">
                            <span>☑️ To-Do / Follow up</span>
                            <button onclick="addChecklist()" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded shadow-sm no-print">+ เพิ่มงาน</button>
                        </h3>
                        <div id="ui_checklists" class="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-grow"></div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                    <h2 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                        <span>📝</span> SALES LEDGER: สมุดบันทึกผลงานจริง
                    </h2>
                    
                    <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 flex flex-col gap-3 no-print shadow-inner">
                        <div class="flex flex-wrap gap-3 items-end">
                            <div class="w-28"><label class="text-[10px] font-bold text-slate-600 mb-1 block">ประเภท</label>
                                <select id="s_type" onchange="toggleFormType()">
                                    <option value="sale">ส่วนตัว (Sale)</option>
                                    <option value="recruit">ทีมงาน (Recruit)</option>
                                </select>
                            </div>
                            <div class="w-32"><label class="text-[10px] font-bold text-slate-600 mb-1 block">วันที่</label><input type="date" id="s_date"></div>
                            <div class="w-40"><label class="text-[10px] font-bold text-slate-600 mb-1 block">ชื่อลูกค้า/ทีมงาน</label><input type="text" id="s_name" placeholder="ชื่อ-สกุล"></div>
                            
                            <div class="w-28 s-sale-only"><label class="text-[10px] font-bold text-slate-600 mb-1 block">นับ Case?</label>
                                <select id="s_is_new_case">
                                    <option value="true">New (นับ)</option>
                                    <option value="false">Renewal (ไม่นับ)</option>
                                </select>
                            </div>

                            <div class="w-32 s-sale-only">
                                <label class="text-[10px] font-bold text-slate-600 mb-1 block">หมวดหมู่สัญญาหลัก</label>
                                <input type="text" id="s_prod" list="product-list" placeholder="เลือก/พิมพ์">
                                <datalist id="product-list">
                                    <option value="สัญญาหลัก-ตลอดชีพ">
                                    <option value="สัญญาหลัก-สะสมทรัพย์">
                                    <option value="สัญญาหลัก-บำนาญ">
                                    <option value="สัญญาหลัก-Unit Linked">
                                    <option value="สัญญาเพิ่มเติม-สุขภาพ">
                                    <option value="สัญญาเพิ่มเติม-โรคร้ายแรง">
                                    <option value="สัญญาเพิ่มเติม-ชดเชยรายวัน">
                                    <option value="สัญญาเพิ่มเติม-อุบัติเหตุ">
                                </datalist>
                            </div>
                            <div class="flex-1 min-w-[120px] s-sale-only">
                                <label class="text-[10px] font-bold text-slate-600 mb-1 block">ชื่อแผนสัญญาหลัก</label>
                                <input type="text" id="s_plan_name" placeholder="เช่น 99/20, Wealthy Link">
                            </div>

                            <div class="w-24 s-sale-only"><label class="text-[10px] font-bold text-slate-600 mb-1 block">ทุนประกัน</label><input type="number" id="s_sa" placeholder="0"></div>
                            <div class="w-24"><label class="text-[10px] font-bold text-emerald-600 mb-1 block">FYP</label><input type="number" id="s_fyp" placeholder="0" class="border-emerald-300"></div>
                            <div class="w-24"><label class="text-[10px] font-bold text-blue-600 mb-1 block">FYC</label><input type="number" id="s_fyc" placeholder="0" class="border-blue-300"></div>
                            <div><button id="btn_save_sale" onclick="addSaleRecord()" class="bg-slate-800 hover:bg-slate-900 text-white font-bold py-1.5 px-4 rounded-lg text-sm transition h-[32px] shadow-sm">บันทึก</button></div>
                        </div>

                        <div class="w-full pt-3 border-t border-slate-200 s-sale-only">
                            <div class="flex justify-between items-center mb-1">
                                <label class="text-[10px] font-bold text-indigo-700 block">➕ สัญญาเพิ่มเติม (Riders)</label>
                                <button type="button" onclick="addRiderInput()" class="text-[9px] bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 px-2 py-1 rounded font-bold transition shadow-sm no-print">+ เพิ่ม Rider</button>
                            </div>
                            <div id="riders_list" class="w-full flex flex-col gap-2"></div>
                        </div>
                    </div>

                    <div class="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
                        <table class="w-full text-sm text-left whitespace-nowrap">
                            <thead class="text-xs text-slate-600 bg-slate-100 uppercase border-b border-slate-200">
                                <tr>
                                    <th class="px-4 py-3">วันที่</th><th class="px-4 py-3 text-center">ประเภท</th><th class="px-4 py-3">ชื่อรายละเอียด</th>
                                    <th class="px-4 py-3">สินค้า / แผน</th><th class="px-4 py-3 text-right">ทุนประกัน</th>
                                    <th class="px-4 py-3 text-right text-emerald-600">FYP</th><th class="px-4 py-3 text-right text-blue-600">FYC</th>
                                    <th class="px-4 py-3 text-center no-print">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody id="ui_sales_table" class="divide-y divide-slate-100 bg-white"></tbody>
                        </table>
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-6 shadow-md border border-slate-200 break-inside-avoid">
                    <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
                        <span>🗂️</span> CRM OVERVIEW: ภาพรวมฐานข้อมูลลูกค้าทั้งหมด <span class="text-xs text-slate-400 font-normal ml-2 no-print">(คลิกที่กล่องเพื่อดูรายชื่อ)</span>
                    </h2>

                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
                        <div onclick="openDrillModal('ผู้มุ่งหวัง')" class="cursor-pointer hover:shadow-md hover:-translate-y-1 transition transform bg-slate-50 p-3 rounded-lg border border-slate-200 text-center"><p class="text-[10px] font-bold text-slate-500 mb-1">ผู้มุ่งหวัง</p><p class="text-xl font-black text-slate-700"><span id="crm_funnel_0"></span></p></div>
                        <div onclick="openDrillModal('นำเสนอแผน')" class="cursor-pointer hover:shadow-md hover:-translate-y-1 transition transform bg-blue-50 p-3 rounded-lg border border-blue-200 text-center"><p class="text-[10px] font-bold text-blue-600 mb-1">นำเสนอแผน</p><p class="text-xl font-black text-blue-800"><span id="crm_funnel_1"></span></p></div>
                        <div onclick="openDrillModal('กำลังติดตาม')" class="cursor-pointer hover:shadow-md hover:-translate-y-1 transition transform bg-purple-50 p-3 rounded-lg border border-purple-200 text-center"><p class="text-[10px] font-bold text-purple-600 mb-1">กำลังติดตาม</p><p class="text-xl font-black text-purple-800"><span id="crm_funnel_2"></span></p></div>
                        <div onclick="openDrillModal('รอดำเนินการ')" class="cursor-pointer hover:shadow-md hover:-translate-y-1 transition transform bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-center"><p class="text-[10px] font-bold text-yellow-600 mb-1">รอดำเนินการ</p><p class="text-xl font-black text-yellow-700"><span id="crm_funnel_3"></span></p></div>
                        <div onclick="openDrillModal('ปิดการขาย')" class="cursor-pointer hover:shadow-md hover:-translate-y-1 transition transform bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center shadow-sm"><p class="text-[10px] font-bold text-emerald-600 mb-1">ปิดการขาย</p><p class="text-xl font-black text-emerald-800"><span id="crm_funnel_4"></span></p></div>
                        <div onclick="openDrillModal('เข้าเยี่ยมหลังการขาย')" class="cursor-pointer hover:shadow-md hover:-translate-y-1 transition transform bg-teal-50 p-3 rounded-lg border border-teal-200 text-center"><p class="text-[10px] font-bold text-teal-600 mb-1">บริการหลังขาย</p><p class="text-xl font-black text-teal-800"><span id="crm_funnel_5"></span></p></div>
                        <div onclick="openDrillModal('ปฏิเสธ')" class="cursor-pointer hover:shadow-md hover:-translate-y-1 transition transform bg-red-50 p-3 rounded-lg border border-red-200 text-center"><p class="text-[10px] font-bold text-red-600 mb-1">ปฏิเสธ</p><p class="text-xl font-black text-red-800"><span id="crm_funnel_6"></span></p></div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[250px]">
                            <h3 class="font-bold text-slate-800 text-sm mb-4 border-b border-slate-100 pb-2">🧬 กลุ่มลูกค้าที่เข้าพบ (AI Personas)</h3>
                            <div class="relative flex-grow"><canvas id="chartPersona"></canvas></div>
                        </div>
                        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[250px]">
                            <h3 class="font-bold text-slate-800 text-sm mb-4 border-b border-slate-100 pb-2">🥧 สัดส่วนสินค้าพอร์ตลูกค้า (Internal Product Mix)</h3>
                            <div class="relative flex-grow"><canvas id="chartProductMix"></canvas></div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- 🌟 MODAL: Data Drill-down & CRM Quick View 🌟 -->
            <div id="drillModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden transform transition-transform scale-100">
                    <div class="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
                        <h3 id="modalTitle" class="font-bold text-slate-800 text-lg flex items-center gap-2"></h3>
                        <button onclick="closeModal()" class="text-slate-400 hover:text-red-500 font-bold text-2xl leading-none">&times;</button>
                    </div>
                    <div id="modalBody" class="p-0 overflow-y-auto flex-grow custom-scrollbar bg-slate-50 relative"></div>
                </div>
            </div>

            <script>
                const DB_KEY = 'FA_Ultimate_Planner_V8_Secured';
                
                // รับข้อมูลมาจาก Node พ่อ
                window.FA_CLIENTS = ${safeClientData}; 

                let plannerData = { targets: { fyp: 1000000, fyc: 300000, cases: 50, recruit: 5 }, salesLedger: [], checklists: [], cta: "ฉันคือนักขายระดับท็อป!" };
                window.currentRiders = []; 
                window.crmChartInstance = null;

                function loadPlannerData() {
                    let saved = localStorage.getItem(DB_KEY);
                    if (saved) {
                        try {
                            if (window.opener && window.opener.SecurityCore) {
                                let dec = window.opener.SecurityCore.decrypt(saved);
                                plannerData = JSON.parse(dec || saved);
                            } else {
                                plannerData = JSON.parse(saved);
                            }
                        } catch(e) {
                            console.warn("Load data fallback to default", e);
                        }
                    }
                    plannerData.salesLedger.forEach(s => { 
                        if(s.isNewCase === undefined) s.isNewCase = true; 
                        if(!s.riders) s.riders = [];
                    });
                }

                function saveData() {
                    let str = JSON.stringify(plannerData);
                    try {
                        if (window.opener && window.opener.SecurityCore) {
                            localStorage.setItem(DB_KEY, window.opener.SecurityCore.encrypt(str));
                        } else {
                            localStorage.setItem(DB_KEY, str);
                        }
                    } catch(e) {
                        localStorage.setItem(DB_KEY, str);
                    }
                }

                loadPlannerData();

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

                let viewDate = new Date();
                const monthNames = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

                document.getElementById('s_date').value = viewDate.toISOString().slice(0, 10);

                window.openDrillModal = function(status) {
                    let list = window.FA_CLIENTS.filter(c => (c.status || "ผู้มุ่งหวัง") === status);
                    document.getElementById('modalTitle').innerHTML = '📋 รายชื่อลูกค้ากลุ่ม: <span class="text-indigo-600 font-black">' + status + '</span> (' + list.length + ' ราย)';
                    
                    let h = '';
                    if(list.length === 0) {
                        h = '<p class="text-center text-slate-400 py-10 italic">ไม่มีรายชื่อลูกค้าในสถานะนี้</p>';
                    } else {
                        h = '<div class="space-y-3 p-6">';
                        list.forEach((c) => {
                            let name = c.name || 'ไม่ระบุชื่อ';
                            let cid = c.id || Math.random().toString();
                            c._tempId = cid; 
                            let persona = (c.visits && c.visits.length > 0) ? (c.visits[0].aiCluster || '').split('[')[0] : '-';
                            h += \`
                            <div class="bg-white p-4 border border-slate-200 rounded-xl flex justify-between items-center hover:border-indigo-300 transition shadow-sm group">
                                <div>
                                    <div class="font-bold text-slate-800 text-base">\${name}</div>
                                    <div class="text-[11px] text-slate-500 font-medium mt-1">🎯 Persona: <span class="text-indigo-500">\${persona||'Unclassified'}</span></div>
                                </div>
                                <button onclick="viewQuickReview('\${cid}', '\${status}')" class="bg-slate-100 text-slate-600 border border-slate-300 px-4 py-2 rounded-lg text-xs font-bold group-hover:bg-slate-800 group-hover:text-white transition shadow-sm">
                                    พรีวิวข้อมูล
                                </button>
                            </div>\`;
                        });
                        h += '</div>';
                    }
                    document.getElementById('modalBody').innerHTML = h;
                    document.getElementById('drillModal').classList.remove('hidden');
                };

                window.viewQuickReview = function(clientId, backStatus) {
                    let client = window.FA_CLIENTS.find(x => (x.XN === clientId) || (x.id === clientId) || (x._tempId === clientId));
                    if(!client || !client.visits || client.visits.length === 0) return alert("⚠️ ไม่พบข้อมูลรายละเอียดของลูกค้ารายนี้");

                    let latestVisit = client.visits[0];
                    let p = latestVisit.dataSnapshot ? (latestVisit.dataSnapshot.profile || {}) : {};
                    let d = latestVisit.dataSnapshot ? (latestVisit.dataSnapshot.dynamic || {}) : {};

                    const fmtRev = (num) => Number(num || 0).toLocaleString('th-TH', {minimumFractionDigits: 0, maximumFractionDigits: 0});

                    let totalAst = (d.c_assets || []).reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);
                    let totalLiab = (d.c_liab || []).reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);
                    let totalInc = (d.c_inc || []).reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);
                    let totalExp = (d.c_exp || []).reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);
                    let netWorth = latestVisit.netWorth || (totalAst - totalLiab);
                    let netCashflow = totalInc - totalExp;

                    let insHtml = '';
                    if (d.c_ins && d.c_ins.length > 0) {
                        insHtml = d.c_ins.map(ins => {
                            let isBase = ins[0] === 'สัญญาหลัก';
                            let name = isBase ? ins[1] : ins[2]; 
                            let type = isBase ? ins[2] : ins[3]; 
                            let val = isBase ? ins[3] : ins[4];  
                            let prem = isBase ? ins[7] : ins[5]; 
                            return \`
                            <div class="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 pl-2">
                                <div>
                                    <span class="text-[10px] \${isBase ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'} px-1.5 py-0.5 rounded mr-1">\${isBase ? 'หลัก' : 'เพิ่มเติม'}</span>
                                    <span class="text-sm font-medium text-slate-800">\${name || 'ไม่ระบุ'}</span><p class="text-[10px] text-slate-500 mt-0.5">\${type || '-'}</p>
                                </div>
                                <div class="text-right"><p class="text-xs text-slate-800 font-bold">ทุน: \${fmtRev(val)}</p><p class="text-[10px] text-slate-500">เบี้ย: \${fmtRev(prem)}/ปี</p></div>
                            </div>\`;
                        }).join('');
                    } else { insHtml = '<p class="text-center text-sm text-slate-400 py-4">ไม่มีข้อมูลกรมธรรม์</p>'; }

                    let invHtml = '';
                    if (d.c_invest_current && d.c_invest_current.length > 0) {
                        invHtml = d.c_invest_current.map(inv => \`
                            <div class="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 pl-2">
                                <div><p class="text-sm font-medium text-slate-800">\${inv[0] || 'ไม่ระบุ'}</p><p class="text-[10px] text-slate-500 mt-0.5">เป้าหมาย: \${inv[3] || '-'}</p></div>
                                <div class="text-right"><p class="text-sm text-blue-700 font-bold">\${fmtRev(inv[1])}</p><p class="text-[10px] text-emerald-600 font-semibold">คาดหวัง \${inv[2] || 0}%</p></div>
                            </div>\`).join('');
                    } else { invHtml = '<p class="text-center text-sm text-slate-400 py-4">ไม่มีข้อมูลการลงทุน</p>'; }

                    let progressHtml = \`
                        <div class="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm w-full flex flex-col mt-6">
                            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 border-b border-indigo-100 pb-2 gap-2">
                                <div>
                                    <h4 class="font-bold text-indigo-800 flex items-center gap-2"><span class="text-xl">📈</span> พัฒนาการทางการเงิน (Trend Evolution)</h4>
                                    <p class="text-[10px] text-slate-500 mt-1">แสดงแนวโน้มเปรียบเทียบการเติบโต (จุดเริ่มต้น = 0)</p>
                                </div>
                            </div>
                            \${(!client.visits || client.visits.length < 2) 
                                ? '<div class="bg-slate-50 text-slate-500 text-sm text-center py-8 rounded-lg border border-dashed flex-grow flex items-center justify-center">มีประวัติเพียง 1 ครั้ง จะเริ่มแสดงกราฟเทรนด์เมื่อมีการอัปเดต (VN ถัดไป)</div>'
                                : '<div class="relative w-full flex-grow min-h-[250px] md:min-h-[300px]"><canvas id="clientProgressChart"></canvas></div><div id="chartDataTableContainer" class="mt-4 overflow-x-auto custom-scrollbar"></div>'}
                        </div>\`;

                    document.getElementById('modalTitle').innerHTML = \`<button onclick="openDrillModal('\${backStatus}')" class="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-lg mr-3 transition font-bold border border-slate-300">&larr; กลับ</button> <span class="text-slate-500">🔍 พรีวิวข้อมูลลูกค้า: <span class="text-slate-800">\${client.name || 'ไม่ระบุชื่อ'}</span> (\${latestVisit.VN || '-'})</span>\`;

                    let modalContent = \`
                        <div class="p-6 bg-slate-50 min-h-full">
                            <div class="flex flex-col md:flex-row gap-4 w-full mb-6">
                                <div class="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                                    <p class="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">👤 ข้อมูลพื้นฐาน</p>
                                    <p class="text-sm text-slate-800"><b>อายุ:</b> \${p.p_age || '-'} ปี</p>
                                    <p class="text-sm text-slate-800 mt-1"><b>อาชีพ:</b> \${p.p_occ || '-'}</p>
                                </div>
                                <div class="flex-1 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-200 shadow-sm flex flex-col justify-center items-center text-center">
                                    <p class="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-2">🧠 AI Score (ความสำเร็จ)</p>
                                    <h4 class="text-3xl font-black text-indigo-700">\${latestVisit.aiScore || '-'}</h4>
                                </div>
                                <div class="flex-1 bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-xl border border-teal-200 shadow-sm flex flex-col justify-center items-center text-center">
                                    <p class="text-xs text-teal-600 font-bold uppercase tracking-wider mb-2">📊 AI Cluster (กลุ่มพฤติกรรม)</p>
                                    <h4 class="text-sm font-bold text-teal-800 leading-tight">\${latestVisit.aiCluster || '-'}</h4>
                                </div>
                            </div>

                            <div class="mb-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <h4 class="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><span class="text-lg">💰</span> สรุปสถานะการเงิน ณ \${latestVisit.dateString || '-'}</h4>
                                <div class="flex flex-col md:flex-row gap-3 w-full">
                                    <div class="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200 text-center"><p class="text-[10px] text-slate-500 mb-1">สินทรัพย์รวม</p><p class="text-sm md:text-base font-bold text-emerald-600">\${fmtRev(totalAst)}</p></div>
                                    <div class="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200 text-center"><p class="text-[10px] text-slate-500 mb-1">หนี้สินรวม</p><p class="text-sm md:text-base font-bold text-red-500">\${fmtRev(totalLiab)}</p></div>
                                    <div class="flex-1 p-3 rounded-lg border border-blue-200 text-center bg-blue-50"><p class="text-[10px] text-blue-600 mb-1 font-bold">ความมั่งคั่งสุทธิ</p><p class="text-base md:text-lg font-black text-blue-700">\${fmtRev(netWorth)}</p></div>
                                    <div class="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200 text-center"><p class="text-[10px] text-slate-500 mb-1">กระแสเงินสดคงเหลือ/เดือน</p><p class="text-sm md:text-base font-bold \${netCashflow >= 0 ? 'text-emerald-600' : 'text-red-500'}">\${fmtRev(netCashflow)}</p></div>
                                </div>
                            </div>

                            <div class="flex flex-col md:flex-row gap-4 w-full">
                                <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-64">
                                    <div class="bg-purple-50 p-3 border-b border-purple-100 rounded-t-xl"><h4 class="font-bold text-purple-800 flex items-center gap-2 text-sm">🛡️ พอร์ตกรมธรรม์ประกันชีวิต</h4></div>
                                    <div class="p-3 overflow-y-auto custom-scrollbar flex-grow bg-white rounded-b-xl">\${insHtml}</div>
                                </div>
                                <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-64">
                                    <div class="bg-blue-50 p-3 border-b border-blue-100 rounded-t-xl"><h4 class="font-bold text-blue-800 flex items-center gap-2 text-sm">📈 พอร์ตการลงทุนปัจจุบัน</h4></div>
                                    <div class="p-3 overflow-y-auto custom-scrollbar flex-grow bg-white rounded-b-xl">\${invHtml}</div>
                                </div>
                            </div>
                            \${progressHtml}
                        </div>
                    \`;

                    document.getElementById('modalBody').innerHTML = modalContent;

                    // สั่งวาดกราฟหลังจากแสดง Modal
                    if (client.visits && client.visits.length >= 2) {
                        setTimeout(() => { window.updateClientChart(client.id || client._tempId || client.XN); }, 50);
                    }
                };

                window.updateClientChart = function(clientId) {
                    let client = window.FA_CLIENTS.find(x => (x.XN === clientId) || (x.id === clientId) || (x._tempId === clientId));
                    if (!client || !client.visits) return;
                    
                    try {
                        let ctx = document.getElementById('clientProgressChart');
                        let tableContainer = document.getElementById('chartDataTableContainer');
                        if (!ctx) return;

                        let visits = [...client.visits].reverse();
                        let labels = visits.map(v => v.VN || '-');
                        
                        let rawData = { nw: [], ast: [], liab: [], cf: [], score: [] };

                        visits.forEach(v => {
                            let dyn = (v.dataSnapshot && v.dataSnapshot.dynamic) ? v.dataSnapshot.dynamic : {};
                            let c_assets = Array.isArray(dyn.c_assets) ? dyn.c_assets : [];
                            let c_liab = Array.isArray(dyn.c_liab) ? dyn.c_liab : [];
                            let c_inc = Array.isArray(dyn.c_inc) ? dyn.c_inc : [];
                            let c_exp = Array.isArray(dyn.c_exp) ? dyn.c_exp : [];

                            let tAst = c_assets.reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);
                            let tLiab = c_liab.reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);
                            let tInc = c_inc.reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);
                            let tExp = c_exp.reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);
                            
                            rawData.ast.push(tAst);
                            rawData.liab.push(tLiab);
                            rawData.nw.push(v.netWorth || (tAst - tLiab));
                            rawData.cf.push(tInc - tExp);
                            rawData.score.push(parseInt(v.aiScore) || 0);
                        });

                        const calculateTrend = (dataArray) => {
                            if (dataArray.length === 0) return [];
                            let baseValue = dataArray[0] === 0 ? 1 : Math.abs(dataArray[0]);
                            return dataArray.map(val => ((val - dataArray[0]) / baseValue) * 100);
                        };

                        let trendData = {
                            nw: calculateTrend(rawData.nw), ast: calculateTrend(rawData.ast),
                            liab: calculateTrend(rawData.liab), cf: calculateTrend(rawData.cf),
                            score: calculateTrend(rawData.score)
                        };

                        if (window.crmChartInstance) {
                            window.crmChartInstance.destroy();
                            window.crmChartInstance = null;
                        }

                        let datasets = [
                            { label: 'ความมั่งคั่งสุทธิ', data: trendData.nw, borderColor: '#4338ca', backgroundColor: 'transparent', borderWidth: 3, tension: 0.4 },
                            { label: 'สินทรัพย์รวม', data: trendData.ast, borderColor: '#10b981', backgroundColor: 'transparent', borderWidth: 2, borderDash: [5, 5], tension: 0.4 },
                            { label: 'หนี้สินรวม', data: trendData.liab, borderColor: '#ef4444', backgroundColor: 'transparent', borderWidth: 2, borderDash: [5, 5], tension: 0.4 },
                            { label: 'กระแสเงินสด', data: trendData.cf, borderColor: '#f59e0b', backgroundColor: 'transparent', borderWidth: 2, borderDash: [5, 5], tension: 0.4 },
                            { label: 'AI Score', data: trendData.score, borderColor: '#8b5cf6', backgroundColor: 'transparent', borderWidth: 3, tension: 0.4 }
                        ];

                        window.crmChartInstance = new Chart(ctx, {
                            type: 'line',
                            data: { labels: labels, datasets: datasets },
                            options: {
                                responsive: true, maintainAspectRatio: false,
                                interaction: { mode: 'index', intersect: false },
                                plugins: { 
                                    legend: { position: 'top', labels: { font: { family: 'Prompt', size: 10 }, usePointStyle: true } },
                                    datalabels: { display: false } 
                                },
                                elements: { point: { radius: 3, hoverRadius: 5 } }, 
                                scales: {
                                    x: { grid: { display: false }, ticks: { font: { family: 'Prompt', size: 9 } } },
                                    y: { display: false } 
                                }
                            }
                        });

                        if (tableContainer) {
                            let tableHtml = \`<table class="w-full text-[10px] md:text-xs text-right border-collapse mt-2">\`;
                            tableHtml += \`<thead class="bg-indigo-50/50 text-indigo-800 font-bold border-y border-indigo-200"><tr>\`;
                            tableHtml += \`<th class="p-2.5 text-center whitespace-nowrap w-24">รหัสแผน (VN)</th>\`;
                            
                            let displayLabels = ['ความมั่งคั่งสุทธิ', 'สินทรัพย์รวม', 'หนี้สินรวม', 'กระแสเงินสด', 'AI Score'];
                            displayLabels.forEach(lbl => { tableHtml += \`<th class="p-2.5 whitespace-nowrap">\${lbl}</th>\`; });
                            tableHtml += \`</tr></thead><tbody class="bg-white border-b border-indigo-100">\`;

                            const fmtTableNum = (num) => Number(num || 0).toLocaleString('th-TH', {minimumFractionDigits: 0, maximumFractionDigits: 0});

                            for (let i = labels.length - 1; i >= 0; i--) {
                                let isLatest = (i === labels.length - 1);
                                tableHtml += \`<tr class="hover:bg-slate-50 border-b border-slate-100 transition-colors">\`;
                                tableHtml += \`<td class="p-2.5 text-center font-bold \${isLatest ? 'text-indigo-600 bg-indigo-50/20' : 'text-slate-600'} whitespace-nowrap">\${labels[i]} \${isLatest ? '<br><span class="text-[8px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full inline-block mt-0.5 border border-indigo-200">ล่าสุด</span>' : ''}</td>\`;
                                
                                let keys = ['nw', 'ast', 'liab', 'cf', 'score'];
                                keys.forEach((k, idx) => {
                                    let currVal = rawData[k][i];
                                    let displayVal = idx === 4 ? currVal + '%' : fmtTableNum(currVal);
                                    let textClass = (currVal < 0 && idx !== 4) ? 'text-red-500 font-bold' : 'text-slate-800 font-bold';
                                    
                                    let changeHtml = '';
                                    if (i > 0) { 
                                        let prevVal = rawData[k][i-1];
                                        let pct = 0;
                                        let diff = currVal - prevVal;
                                        
                                        if (prevVal === 0) pct = currVal > 0 ? 100 : (currVal < 0 ? -100 : 0);
                                        else pct = (diff / Math.abs(prevVal)) * 100;

                                        if (pct > 0) changeHtml = \`<br><span class="text-emerald-600 text-[9px] font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full inline-flex items-center mt-1 border border-emerald-200">▲ +\${pct.toFixed(1)}%</span>\`;
                                        else if (pct < 0) changeHtml = \`<br><span class="text-red-500 text-[9px] font-bold bg-red-50 px-1.5 py-0.5 rounded-full inline-flex items-center mt-1 border border-red-200">▼ \${pct.toFixed(1)}%</span>\`;
                                        else changeHtml = \`<br><span class="text-slate-400 text-[9px] inline-flex items-center mt-1">- 0.0%</span>\`;
                                    } else {
                                        changeHtml = \`<br><span class="text-slate-300 text-[9px] inline-flex items-center mt-1">ฐาน (Base)</span>\`;
                                    }

                                    tableHtml += \`<td class="p-2.5 align-middle leading-tight border-l border-slate-50"><span class="\${textClass}">\${displayVal}</span>\${changeHtml}</td>\`;
                                });
                                tableHtml += \`</tr>\`;
                            }
                            tableHtml += \`</tbody></table>\`;
                            tableContainer.innerHTML = tableHtml;
                        }

                    } catch (err) {
                        console.error("เกิดข้อผิดพลาดในการวาดกราฟ Dashboard:", err);
                    }
                };

                window.closeModal = function() { 
                    document.getElementById('drillModal').classList.add('hidden'); 
                    if (window.crmChartInstance) {
                        window.crmChartInstance.destroy();
                        window.crmChartInstance = null;
                    }
                };
                // ==========================================

                function toggleFormType() {
                    let isSale = document.getElementById('s_type').value === 'sale';
                    let els = document.querySelectorAll('.s-sale-only');
                    els.forEach(el => el.style.display = isSale ? 'block' : 'none');
                    if(!isSale) { 
                        document.getElementById('s_prod').value = ''; 
                        document.getElementById('s_plan_name').value = ''; 
                        document.getElementById('s_sa').value = ''; 
                        document.getElementById('s_is_new_case').value = 'true';
                        window.currentRiders = [];
                        window.renderRiderInputs();
                    }
                }

                window.renderRiderInputs = function() {
                    let h = '';
                    window.currentRiders.forEach(function(r, idx) {
                        h += '<div class="flex flex-wrap gap-2 items-end bg-white p-2 rounded border border-indigo-100 relative shadow-sm">';
                        h += '<button type="button" onclick="removeRiderInput('+idx+')" class="absolute -top-2 -right-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm no-print border border-red-200">×</button>';
                        h += '<div class="w-32"><label class="text-[9px] font-bold text-slate-500 mb-1 block">หมวดหมู่ Rider</label>';
                        h += '<select onchange="updateRider('+idx+', \\'prod\\', this.value)" class="text-[11px] p-1.5 border border-slate-200 rounded w-full bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none">';
                        h += '<option value="">เลือก...</option>';
                        h += '<option value="สัญญาเพิ่มเติม-สุขภาพ" ' + (r.prod==='สัญญาเพิ่มเติม-สุขภาพ'?'selected':'') + '>สุขภาพ</option>';
                        h += '<option value="สัญญาเพิ่มเติม-โรคร้ายแรง" ' + (r.prod==='สัญญาเพิ่มเติม-โรคร้ายแรง'?'selected':'') + '>โรคร้ายแรง</option>';
                        h += '<option value="สัญญาเพิ่มเติม-ชดเชยรายวัน" ' + (r.prod==='สัญญาเพิ่มเติม-ชดเชยรายวัน'?'selected':'') + '>ชดเชยรายวัน</option>';
                        h += '<option value="สัญญาเพิ่มเติม-อุบัติเหตุ" ' + (r.prod==='สัญญาเพิ่มเติม-อุบัติเหตุ'?'selected':'') + '>อุบัติเหตุ</option>';
                        h += '<option value="อื่นๆ" ' + (r.prod==='อื่นๆ'?'selected':'') + '>อื่นๆ</option>';
                        h += '</select></div>';
                        h += '<div class="flex-1 min-w-[100px]"><label class="text-[9px] font-bold text-slate-500 mb-1 block">ชื่อแผน Rider</label><input type="text" onchange="updateRider('+idx+', \\'planName\\', this.value)" value="'+(r.planName||'')+'" class="text-[11px] p-1.5 border border-slate-200 rounded w-full bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="เช่น Health Fit"></div>';
                        h += '<div class="w-20"><label class="text-[9px] font-bold text-slate-500 mb-1 block">ทุน (Rider)</label><input type="number" onchange="updateRider('+idx+', \\'sa\\', this.value)" value="'+(r.sa||'')+'" class="text-[11px] p-1.5 border border-slate-200 rounded w-full bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none"></div>';
                        h += '<div class="w-20"><label class="text-[9px] font-bold text-emerald-600 mb-1 block">FYP</label><input type="number" onchange="updateRider('+idx+', \\'fyp\\', this.value)" value="'+(r.fyp||'')+'" class="text-[11px] p-1.5 border border-emerald-200 rounded w-full bg-emerald-50 focus:ring-1 focus:ring-emerald-500 outline-none"></div>';
                        h += '<div class="w-20"><label class="text-[9px] font-bold text-blue-600 mb-1 block">FYC</label><input type="number" onchange="updateRider('+idx+', \\'fyc\\', this.value)" value="'+(r.fyc||'')+'" class="text-[11px] p-1.5 border border-blue-200 rounded w-full bg-blue-50 focus:ring-1 focus:ring-blue-500 outline-none"></div>';
                        h += '</div>';
                    });
                    document.getElementById('riders_list').innerHTML = h;
                };
                window.addRiderInput = function() { window.currentRiders.push({ prod: '', planName: '', sa: '', fyp: '', fyc: '' }); window.renderRiderInputs(); };
                window.removeRiderInput = function(idx) { window.currentRiders.splice(idx, 1); window.renderRiderInputs(); };
                window.updateRider = function(idx, field, val) { window.currentRiders[idx][field] = val; };

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
                    
                    let internalProductMix = { 'สุขภาพ/โรคร้าย': 0, 'ตลอดชีพ/มรดก': 0, 'สะสมทรัพย์/บำนาญ': 0, 'ควบการลงทุน (UL)': 0, 'อื่นๆ': 0 };

                    plannerData.salesLedger.forEach(s => {
                        let sd = new Date(s.date);
                        let isThisYear = sd.getFullYear() === vYear;
                        let isThisMonth = isThisYear && sd.getMonth() === vMonth;

                        let rowFyp = s.fyp || 0;
                        let rowFyc = s.fyc || 0;
                        if(s.riders && s.riders.length > 0) {
                            s.riders.forEach(r => { rowFyp += (r.fyp||0); rowFyc += (r.fyc||0); });
                        }

                        if (isThisYear) {
                            tFYP += rowFyp; tFYC += rowFyc;
                            if (s.type === 'sale' && s.isNewCase !== false && s.isNewCase !== 'false') tCases++;
                            if (s.type === 'recruit') tRecruit++;

                            if (s.type === 'sale') {
                                let p = s.prod || '';
                                if(p.includes('สุขภาพ') || p.includes('โรคร้าย') || p.includes('ชดเชย')) internalProductMix['สุขภาพ/โรคร้าย']++;
                                else if(p.includes('ตลอดชีพ')) internalProductMix['ตลอดชีพ/มรดก']++;
                                else if(p.includes('สะสมทรัพย์') || p.includes('บำนาญ')) internalProductMix['สะสมทรัพย์/บำนาญ']++;
                                else if(p.includes('Unit Linked') || p.includes('ลงทุน')) internalProductMix['ควบการลงทุน (UL)']++;
                                else if(p !== '' && p !== '-') internalProductMix['อื่นๆ']++;

                                if(s.riders && s.riders.length > 0) {
                                    s.riders.forEach(r => {
                                        let rp = r.prod || '';
                                        if(rp.includes('สุขภาพ') || rp.includes('โรคร้าย') || rp.includes('ชดเชย')) internalProductMix['สุขภาพ/โรคร้าย']++;
                                        else if(rp.includes('ตลอดชีพ')) internalProductMix['ตลอดชีพ/มรดก']++;
                                        else if(rp.includes('สะสมทรัพย์') || rp.includes('บำนาญ')) internalProductMix['สะสมทรัพย์/บำนาญ']++;
                                        else if(rp.includes('Unit Linked') || rp.includes('ลงทุน')) internalProductMix['ควบการลงทุน (UL)']++;
                                        else if(rp !== '' && rp !== '-') internalProductMix['อื่นๆ']++;
                                    });
                                }
                            }
                        }

                        if (isThisMonth) {
                            mFYP += rowFyp; mFYC += rowFyc;
                            if (s.type === 'sale' && s.isNewCase !== false && s.isNewCase !== 'false') mCases++;

                            let d = sd.getDate();
                            let wIdx = d <= 7 ? 0 : d <= 14 ? 1 : d <= 21 ? 2 : 3;
                            wData[wIdx].fyp += rowFyp;
                            wData[wIdx].fyc += rowFyc;
                            if (s.type === 'sale' && s.isNewCase !== false && s.isNewCase !== 'false') wData[wIdx].case += 1;
                        }
                    });

                    let avgCaseSize = tCases > 0 ? (tFYP / tCases) : 0;
                    let avgFycPct = tFYP > 0 ? (tFYC / tFYP) * 100 : 0;
                    document.getElementById('ui_stat_case_size').innerText = avgCaseSize.toLocaleString('th-TH', {maximumFractionDigits:0}) + ' ฿';
                    document.getElementById('ui_stat_fyc_pct').innerText = avgFycPct.toFixed(1) + '%';

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
                            <tr class="hover:bg-slate-50 border-b border-slate-100 transition">
                                <td class="py-2.5 px-1 border-r border-slate-100 text-slate-600 font-bold">W\${i+1}</td>
                                <td class="py-2.5 px-1 border-r border-slate-100 text-slate-500">\${tgtWFYP.toLocaleString('th-TH',{maximumFractionDigits:0})}</td>
                                <td class="py-2.5 px-1 border-r border-slate-100 font-bold \${isOkFYP ? 'text-emerald-600':'text-amber-500'}">\${wData[i].fyp.toLocaleString('th-TH')}</td>
                                <td class="py-2.5 px-1 border-r border-slate-100 text-slate-500">\${tgtWFYC.toLocaleString('th-TH',{maximumFractionDigits:0})}</td>
                                <td class="py-2.5 px-1 border-r border-slate-100 font-bold \${isOkFYC ? 'text-blue-600':'text-amber-500'}">\${wData[i].fyc.toLocaleString('th-TH')}</td>
                                <td class="py-2.5 px-1 border-r border-slate-100 text-slate-500">\${tgtWCase.toFixed(1)}</td>
                                <td class="py-2.5 px-1 font-bold \${isOkCase ? 'text-purple-600':'text-amber-500'}">\${wData[i].case}</td>
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
                    
                    renderSalesTable(vYear, vMonth);
                    drawCharts(internalProductMix);
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

                window.editingSaleId = null; 

                window.editSaleRecord = function(id) {
                    let record = plannerData.salesLedger.find(s => s.id === id);
                    if (!record) return;

                    document.getElementById('s_type').value = record.type || 'sale';
                    toggleFormType(); 
                    
                    document.getElementById('s_date').value = record.date;
                    document.getElementById('s_name').value = record.name;
                    
                    if (record.type === 'sale') {
                        document.getElementById('s_is_new_case').value = (record.isNewCase !== false && record.isNewCase !== 'false') ? 'true' : 'false';
                        document.getElementById('s_prod').value = record.prod || '';
                        document.getElementById('s_plan_name').value = record.planName || ''; 
                        document.getElementById('s_sa').value = record.sa || '';
                    }
                    
                    document.getElementById('s_fyp').value = record.fyp || '';
                    document.getElementById('s_fyc').value = record.fyc || '';

                    window.currentRiders = record.riders ? JSON.parse(JSON.stringify(record.riders)) : [];
                    window.renderRiderInputs();

                    window.editingSaleId = id; 
                    
                    let saveBtn = document.getElementById('btn_save_sale');
                    if (saveBtn) {
                        saveBtn.innerText = "อัปเดต";
                        saveBtn.classList.remove('bg-slate-800', 'hover:bg-slate-900');
                        saveBtn.classList.add('bg-amber-500', 'hover:bg-amber-600');
                    }
                    
                    document.getElementById('btn_save_sale').scrollIntoView({ behavior: 'smooth', block: 'center' });
                };

                window.addSaleRecord = function() {
                    let type = document.getElementById('s_type').value;
                    let date = document.getElementById('s_date').value;
                    let name = document.getElementById('s_name').value.trim();
                    let prod = type === 'sale' ? document.getElementById('s_prod').value.trim() : '-';
                    let planName = type === 'sale' ? document.getElementById('s_plan_name').value.trim() : ''; 
                    let sa = type === 'sale' ? (parseFloat(document.getElementById('s_sa').value) || 0) : 0;
                    let isNewCase = type === 'sale' ? (document.getElementById('s_is_new_case').value === 'true') : false;
                    let fyp = parseFloat(document.getElementById('s_fyp').value) || 0;
                    let fyc = parseFloat(document.getElementById('s_fyc').value) || 0;

                    if(!date || !name) return alert("กรุณากรอกวันที่และชื่อ ให้ครบถ้วนครับ");

                    let ridersToSave = [];
                    if(type === 'sale') {
                        ridersToSave = window.currentRiders.map(r => ({
                            prod: r.prod || '',
                            planName: r.planName || '',
                            sa: parseFloat(r.sa) || 0,
                            fyp: parseFloat(r.fyp) || 0,
                            fyc: parseFloat(r.fyc) || 0
                        })).filter(r => r.prod || r.planName || r.fyp > 0);
                    }

                    if (window.editingSaleId) {
                        let index = plannerData.salesLedger.findIndex(s => s.id === window.editingSaleId);
                        if (index !== -1) {
                            plannerData.salesLedger[index] = { 
                                id: window.editingSaleId, date, type, name, prod, planName, sa, fyp, fyc, isNewCase, riders: ridersToSave 
                            };
                        }
                        window.editingSaleId = null; 
                        let saveBtn = document.getElementById('btn_save_sale');
                        if (saveBtn) {
                            saveBtn.innerText = "บันทึก";
                            saveBtn.classList.remove('bg-amber-500', 'hover:bg-amber-600');
                            saveBtn.classList.add('bg-slate-800', 'hover:bg-slate-900');
                        }
                    } else {
                        plannerData.salesLedger.push({ id: Date.now().toString(), date, type, name, prod, planName, sa, fyp, fyc, isNewCase, riders: ridersToSave });
                    }

                    saveData(); 
                    initUI();
                    
                    document.getElementById('s_name').value = ''; 
                    document.getElementById('s_prod').value = '';
                    document.getElementById('s_plan_name').value = ''; 
                    document.getElementById('s_sa').value = ''; 
                    document.getElementById('s_fyp').value = ''; 
                    document.getElementById('s_fyc').value = '';
                    
                    window.currentRiders = [];
                    window.renderRiderInputs();
                };

                window.deleteSaleRecord = function(id) {
                    if(confirm("ต้องการลบประวัติรายการนี้ใช่หรือไม่? (ยอดสะสมจะลดลงตาม)")) {
                        plannerData.salesLedger = plannerData.salesLedger.filter(s => s.id !== id);
                        saveData(); initUI();
                    }
                };

                function renderSalesTable(viewYear, viewMonth) {
                    let sorted = plannerData.salesLedger.filter(s => {
                        let d = new Date(s.date);
                        return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
                    }).sort((a,b) => new Date(b.date) - new Date(a.date));

                    let tbody = document.getElementById('ui_sales_table');
                    if(sorted.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="8" class="px-4 py-6 text-center text-slate-400 text-xs italic">ไม่มีบันทึกผลงานของเดือนที่เลือก</td></tr>'; return;
                    }
                    
                    let htmlString = '';
                    sorted.forEach(s => {
                        let isSale = s.type === 'sale';
                        let typeBadge = isSale ? '<span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200 shadow-sm">Sale</span>' : '<span class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-200 shadow-sm">Recruit</span>';
                        let isNew = (s.isNewCase !== false && s.isNewCase !== 'false');
                        let caseBadge = (!isSale || !isNew) ? '<br><span class="text-[9px] text-slate-400 font-medium">(Renewal/ไม่นับเคส)</span>' : '';
                        
                        let prodHtml = '<div class="font-bold text-[11px] text-slate-800">' + (s.prod || '-') + '</div><div class="text-[10px] text-slate-500">' + (s.planName ? '('+s.planName+')' : '') + '</div>';
                        let saHtml = '<div class="text-slate-600 font-medium">' + (s.sa ? s.sa.toLocaleString('th-TH') : '-') + '</div>';
                        let fypHtml = '<div class="font-bold text-emerald-600">' + (s.fyp ? s.fyp.toLocaleString('th-TH') : '0') + '</div>';
                        let fycHtml = '<div class="font-bold text-blue-600">' + (s.fyc ? s.fyc.toLocaleString('th-TH') : '0') + '</div>';

                        if (s.riders && s.riders.length > 0) {
                            s.riders.forEach(r => {
                                prodHtml += '<div class="mt-1 text-[10px] text-indigo-500 font-bold border-t border-slate-100 pt-1">+ ' + (r.prod || 'Rider') + '</div><div class="text-[9px] text-slate-400">' + (r.planName ? '('+r.planName+')' : '') + '</div>';
                                saHtml += '<div class="mt-1 text-[10px] text-slate-400 border-t border-slate-100 pt-1 font-medium">' + (r.sa ? r.sa.toLocaleString('th-TH') : '-') + '</div>';
                                fypHtml += '<div class="mt-1 text-[10px] text-emerald-500 border-t border-slate-100 pt-1 font-bold">' + (r.fyp ? r.fyp.toLocaleString('th-TH') : '0') + '</div>';
                                fycHtml += '<div class="mt-1 text-[10px] text-blue-500 border-t border-slate-100 pt-1 font-bold">' + (r.fyc ? r.fyc.toLocaleString('th-TH') : '0') + '</div>';
                            });
                        }

                        htmlString += \`
                            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                                <td class="px-4 py-3 align-top text-slate-600 font-medium">\${new Date(s.date).toLocaleDateString('th-TH',{day:'numeric',month:'short',year:'2-digit'})}</td>
                                <td class="px-4 py-3 align-top text-center">\${typeBadge}\${caseBadge}</td>
                                <td class="px-4 py-3 align-top font-bold text-slate-800">\${s.name}</td>
                                <td class="px-4 py-3 align-top">\${prodHtml}</td>
                                <td class="px-4 py-3 align-top text-right">\${saHtml}</td>
                                <td class="px-4 py-3 align-top text-right">\${fypHtml}</td>
                                <td class="px-4 py-3 align-top text-right">\${fycHtml}</td>
                                <td class="px-4 py-3 align-top text-center no-print space-x-1">
                                    <button onclick="editSaleRecord('\${s.id}')" class="text-amber-600 hover:text-amber-700 text-xs bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 rounded transition shadow-sm font-medium">แก้ไข</button>
                                    <button onclick="deleteSaleRecord('\${s.id}')" class="text-red-500 hover:text-red-700 text-xs bg-red-50 hover:bg-red-100 border border-red-200 px-2 py-1 rounded transition shadow-sm font-medium">ลบ</button>
                                </td>
                            </tr>
                        \`;
                    });
                    tbody.innerHTML = htmlString;
                }

                function renderChecklists() {
                    const c = document.getElementById('ui_checklists');
                    if(plannerData.checklists.length === 0) { c.innerHTML = '<p class="text-xs text-slate-500 italic text-center mt-4">ยังไม่มีเป้าหมาย</p>'; return; }
                    let sorted = [...plannerData.checklists].sort((a,b) => { if(a.done !== b.done) return a.done ? 1 : -1; return new Date(a.deadline) - new Date(b.deadline); });
                    c.innerHTML = sorted.map(t => \`
                        <div class="p-2.5 border border-slate-100 rounded-lg mb-2 flex justify-between items-center group bg-white shadow-sm transition hover:shadow-md">
                            <div class="flex items-center gap-3 overflow-hidden">
                                <input type="checkbox" id="chk_\${t.id}" class="task-cb rounded border-slate-300 flex-shrink-0 no-print" \${t.done ? 'checked' : ''} onchange="toggleCheck('\${t.id}', this.checked)">
                                <div class="truncate">
                                    <label for="chk_\${t.id}" class="text-sm cursor-pointer select-none \${t.done ? 'text-slate-400 line-through' : 'text-slate-700 font-bold'} transition-colors">\${t.text}</label>
                                    <p class="text-[9px] \${t.done ? 'text-slate-400' : 'text-red-500 font-bold'} mt-0.5">⏳ \${t.deadline || 'ไม่ระบุ'}</p>
                                </div>
                            </div>
                            <button onclick="deleteCheck('\${t.id}')" class="text-[10px] text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition shadow-sm font-medium no-print">ลบ</button>
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

                window.printFormalReport = function() {
                    let printWin = window.open('', '_blank');
                    let ds = window.currentStats; 
                    let printDate = new Date().toLocaleDateString('th-TH', {year:'numeric', month:'long', day:'numeric'});
                    
                    let ledgerRows = plannerData.salesLedger.filter(s => new Date(s.date).getFullYear() === ds.year).sort((a,b) => new Date(a.date) - new Date(b.date));
                    let tableHtml = '';
                    ledgerRows.forEach(s => {
                        let isNew = (s.isNewCase !== false && s.isNewCase !== 'false');
                        let typeStr = s.type === 'sale' ? (isNew ? 'New Case' : 'Renewal') : 'Recruit';
                        
                        let prodHtml = (s.prod || '-') + (s.planName ? '<br><span style="font-size:11px; color:#64748b;">(' + s.planName + ')</span>' : '');
                        let saHtml = (s.sa ? s.sa.toLocaleString('th-TH') : '-');
                        let fypHtml = (s.fyp ? s.fyp.toLocaleString('th-TH') : '0');
                        let fycHtml = (s.fyc ? s.fyc.toLocaleString('th-TH') : '0');

                        if (s.riders && s.riders.length > 0) {
                            s.riders.forEach(r => {
                                prodHtml += '<div style="margin-top:4px; padding-top:4px; border-top:1px dashed #e2e8f0; font-size:11px; color:#4f46e5;">+ ' + (r.prod || 'Rider') + '</div>' + (r.planName ? '<div style="font-size:10px; color:#64748b;">(' + r.planName + ')</div>' : '');
                                saHtml += '<div style="margin-top:4px; padding-top:4px; border-top:1px dashed #e2e8f0; font-size:11px; color:#64748b;">' + (r.sa ? r.sa.toLocaleString('th-TH') : '-') + '</div>';
                                fypHtml += '<div style="margin-top:4px; padding-top:4px; border-top:1px dashed #e2e8f0; font-size:11px; color:#059669;">' + (r.fyp ? r.fyp.toLocaleString('th-TH') : '0') + '</div>';
                                fycHtml += '<div style="margin-top:4px; padding-top:4px; border-top:1px dashed #e2e8f0; font-size:11px; color:#2563eb;">' + (r.fyc ? r.fyc.toLocaleString('th-TH') : '0') + '</div>';
                            });
                        }

                        tableHtml += \`<tr>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:center; vertical-align:top;">\${new Date(s.date).toLocaleDateString('th-TH',{day:'2-digit',month:'short'})}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:center; font-weight:bold; color: #475569; vertical-align:top;">\${typeStr}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; font-weight:bold; vertical-align:top;">\${s.name}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; vertical-align:top;">\${prodHtml}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:right; vertical-align:top;">\${saHtml}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:right; font-weight:bold; color:#059669; vertical-align:top;">\${fypHtml}</td>
                            <td style="padding:8px; border-bottom:1px solid #ddd; text-align:right; font-weight:bold; color:#2563eb; vertical-align:top;">\${fycHtml}</td>
                        </tr>\`;
                    });

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
                            .btn-print { background-color: #2563eb; color: white; }
                            h1 { color: #0f172a; text-align: center; margin: 0 0 5px 0; font-size: 26px; text-transform: uppercase; letter-spacing: 1px; }
                            .subtitle { text-align: center; color: #64748b; margin-bottom: 30px; font-size: 13px; }
                            .box-container { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 30px; }
                            .kpi-box { flex: 1; border: 1px solid #e2e8f0; border-radius: 10px; padding: 15px 20px; text-align: center; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
                            .kpi-title { font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px dashed #e2e8f0; padding-bottom: 5px; margin-bottom: 10px; }
                            .kpi-actual { font-size: 24px; font-weight: bold; margin: 5px 0; }
                            .kpi-target { font-size: 12px; color: #94a3b8; }
                            h2 { font-size: 16px; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px; margin-top: 10px; display: flex; justify-content: space-between; }
                            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
                            th { background-color: #f8fafc; padding: 10px 8px; text-align: left; border-bottom: 2px solid #cbd5e1; color: #334155; font-weight: bold; text-transform: uppercase; font-size: 11px; }
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
                                    <span style="font-size:12px; color:#64748b; margin-right:10px;">* หากกดพิมพ์แล้วหน้ากระดาษเป็นแนวตั้ง ให้เปลี่ยน Layout เป็น Landscape</span>
                                    <button class="btn btn-print" onclick="window.print()">🖨️ สั่งพิมพ์ (A4 แนวนอน)</button>
                                </div>
                            </div>
                            <h1>FA Business Executive Report</h1>
                            <div class="subtitle">รายงานสรุปผลการดำเนินงานประจำปี \${ds.year} | พิมพ์เมื่อ: \${printDate}</div>
                            <div class="box-container">
                                <div class="kpi-box"><div class="kpi-title">FYP (เบี้ยปีแรก)</div><div class="kpi-actual" style="color: #059669;">\${ds.tFYP.toLocaleString('th-TH')} ฿</div><div class="kpi-target">เป้าหมาย: \${plannerData.targets.fyp.toLocaleString('th-TH')}</div></div>
                                <div class="kpi-box"><div class="kpi-title">FYC (คอมมิชชัน)</div><div class="kpi-actual" style="color: #2563eb;">\${ds.tFYC.toLocaleString('th-TH')} ฿</div><div class="kpi-target">เป้าหมาย: \${plannerData.targets.fyc.toLocaleString('th-TH')}</div></div>
                                <div class="kpi-box"><div class="kpi-title">Total Cases</div><div class="kpi-actual" style="color: #9333ea;">\${ds.tCases} ราย</div><div class="kpi-target">เป้าหมาย: \${plannerData.targets.cases}</div></div>
                                <div class="kpi-box"><div class="kpi-title">Recruits</div><div class="kpi-actual" style="color: #d97706;">\${ds.tRecruit} คน</div><div class="kpi-target">เป้าหมาย: \${plannerData.targets.recruit}</div></div>
                            </div>
                            <h2><span>📝 บันทึกผลงานการขาย (Sales Ledger)</span> <span style="font-size:12px; font-weight:normal; color:#64748b;">เฉพาะปี \${ds.year}</span></h2>
                            <table>
                                <thead><tr><th style="text-align:center; width:80px;">วันที่</th><th style="text-align:center; width:80px;">สถานะ</th><th>ชื่อลูกค้า / ทีมงาน</th><th>สินค้า / แผน</th><th style="text-align:right;">ทุนประกัน</th><th style="text-align:right;">FYP</th><th style="text-align:right;">FYC</th></tr></thead>
                                <tbody>\${tableHtml}</tbody>
                            </table>
                            <div class="cta-box">" \${plannerData.cta || 'FA Professional Business Report'} "</div>
                        </div>
                    </body>
                    </html>
                    \`;

                    printWin.document.open();
                    printWin.document.write(html);
                    printWin.document.close();
                };

                let chart1, chart2;

                function drawCharts(internalMixObj) {
                    if(typeof ChartDataLabels !== 'undefined') Chart.register(ChartDataLabels);

                    if(chart1) chart1.destroy();
                    let pLabels = Object.keys(crmData.personas); let pData = Object.values(crmData.personas);
                    if(pLabels.length > 0) {
                        chart1 = new Chart(document.getElementById('chartPersona').getContext('2d'), {
                            type: 'doughnut', data: { labels: pLabels, datasets: [{ data: pData, backgroundColor: chartColors, borderWidth: 2, borderColor: '#fff' }] },
                            options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'right', labels: { font: { family: 'Prompt', size: 10 }, boxWidth: 10 } }, datalabels: { color: '#fff', font: { weight: 'bold', family: 'Prompt', size: 12 }, formatter: (val, ctx) => { let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0); return Math.round((val / sum) * 100) + '%'; } } } }
                        });
                    }

                    if(chart2) chart2.destroy();
                    let pmLabels = Object.keys(internalMixObj).filter(k => internalMixObj[k] > 0); 
                    let pmData = pmLabels.map(k => internalMixObj[k]);
                    
                    if(pmData.length > 0) {
                        chart2 = new Chart(document.getElementById('chartProductMix').getContext('2d'), {
                            type: 'pie', data: { labels: pmLabels, datasets: [{ data: pmData, backgroundColor: productColors, borderColor: '#ffffff', borderWidth: 2 }] },
                            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { family: 'Prompt', size: 10 }, boxWidth: 10 } }, datalabels: { color: '#fff', font: { weight: 'bold', family: 'Prompt', size: 12 }, formatter: (val) => val > 0 ? val : '' } } }
                        });
                    } else {
                        let ctx = document.getElementById('chartProductMix').getContext('2d');
                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    }
                }

                window.onload = function() {
                    toggleFormType(); 
                    initUI(); 
                };
            </script>
        </body>
        </html>
        `;

        dashWin.document.open();
        dashWin.document.write(html);
        dashWin.document.close();

    } catch (error) {
        console.error("Dashboard Error:", error);
        alert("❌ เกิดข้อผิดพลาด: " + (error.message || error));
        
        if (dashWin && !dashWin.closed) {
            dashWin.document.body.innerHTML = `
                <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; text-align:center;">
                    <h2 style="color: #ef4444; margin-bottom: 10px;">❌ ไม่สามารถประมวลผลได้</h2>
                    <p style="color: #64748b; background: #f1f5f9; padding: 10px; border-radius: 8px;">\${error.message || error}</p>
                    <button onclick="window.close()" style="margin-top: 20px; padding: 8px 16px; cursor: pointer;">ปิดหน้าต่างนี้</button>
                </div>
            `;
        }
    }
};
