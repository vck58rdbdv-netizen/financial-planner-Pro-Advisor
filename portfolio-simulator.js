/**
 * Module: Enterprise Portfolio Simulator & FA Co-Pilot
 * Concept: SSOT from Real HTML DOM + AI Co-Advisory NLG
 * Update: โฟกัสเฉพาะ "ภาพรวมพอร์ต" และ "โหมดจำลอง What-If"
 */

const PortfolioSimulator = {
    charts: { allocByGoal: null, sandbox: null },
    
    state: {
        payload: null,
        sandboxState: {}
    },

    // ==========================================
    // 🧠 1. ENGINES (Sandbox & Math)
    // ==========================================
    Engine: {
        calcHypotheticalSD: function(wHigh, wLow, sdHigh = 18, sdLow = 3, corr = -0.1) {
            return Math.sqrt((wHigh*wHigh * sdHigh*sdHigh) + (wLow*wLow * sdLow*sdLow) + (2 * wHigh * wLow * sdHigh * sdLow * corr));
        },
        getGaussianRandom: function() {
            let u1 = Math.random(), u2 = Math.random();
            if(u1 === 0) u1 = 0.00001; 
            return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        },
        runSimulation: function(initW, pmt, roi, sd, years) {
            const iterations = 1000; 
            let resultsByYear = Array.from({length: years + 1}, () => []);
            let r = (roi || 0) / 100;
            let s = (sd || 0) / 100;
            for (let sim = 0; sim < iterations; sim++) {
                let w = initW;
                resultsByYear[0].push(w);
                for (let y = 1; y <= years; y++) {
                    let z = this.getGaussianRandom();
                    let randomReturn = (r - (s * s) / 2) + (s * z);
                    w = Math.max(0, (w * (1 + randomReturn)) + pmt);
                    resultsByYear[y].push(w);
                }
            }
            let dataExp = [], dataBest = [], dataWorst = [];
            for (let y = 0; y <= years; y++) {
                let sorted = resultsByYear[y].sort((a, b) => a - b);
                dataExp.push(sorted[Math.floor(iterations * 0.50)] || 0);
                dataBest.push(sorted[Math.floor(iterations * 0.90)] || 0);
                dataWorst.push(sorted[Math.floor(iterations * 0.10)] || 0);
            }
            return { exp: dataExp, best: dataBest, worst: dataWorst };
        }
    },

    // ==========================================
    // 🖥️ 2. UI & MODAL MANAGEMENT
    // ==========================================
    init: function() {
        if (!document.getElementById('portfolioSimModal')) this.injectModalHTML();
    },

    injectModalHTML: function() {
        const modalHTML = `
            <div id="portfolioSimModal" class="hidden fixed inset-0 z-[10005] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-2 md:p-4 transition-opacity duration-300 opacity-0">
                <div class="bg-slate-50 rounded-xl shadow-2xl w-full max-w-7xl h-[98vh] md:h-[95vh] flex flex-col overflow-hidden transform transition-transform scale-95 border-t-8 border-indigo-700" id="ps_modal_box">
                    
                    <div class="bg-white px-5 py-4 flex justify-between items-center flex-shrink-0 shadow-sm z-20 border-b border-slate-200">
                        <div>
                            <h2 class="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-3">
                                <span class="bg-indigo-100 text-indigo-600 p-2 rounded-lg text-lg">🤖</span> 
                                AI Co-Advisor Dashboard
                            </h2>
                            <p class="text-xs text-slate-500 mt-1 font-medium">วิเคราะห์เจาะลึกผลลัพธ์ด้วย Text-Based Regex Extraction (SSOT 100%)</p>
                        </div>
                        <button onclick="PortfolioSimulator.close()" class="bg-slate-100 hover:bg-slate-200 text-slate-600 w-9 h-9 rounded-full flex items-center justify-center transition text-xl font-bold shadow-sm">&times;</button>
                    </div>

                    <div class="flex bg-white px-4 pt-2 gap-1 z-10 flex-shrink-0 overflow-x-auto custom-scrollbar border-b border-slate-200">
                        <button onclick="PortfolioSimulator.switchTab('overview')" id="ps_tabbtn_overview" class="ps-tab-btn active px-4 py-3 text-xs md:text-sm font-bold rounded-t-lg transition-colors text-indigo-700 border-b-2 border-indigo-600 whitespace-nowrap">📊 ภาพรวม & แผนปรับพอร์ต</button>
                        <button onclick="PortfolioSimulator.switchTab('sandbox')" id="ps_tabbtn_sandbox" class="ps-tab-btn px-4 py-3 text-xs md:text-sm font-bold text-slate-500 hover:text-indigo-600 rounded-t-lg transition-colors border-b-2 border-transparent whitespace-nowrap">🎛️ โหมดจำลอง (What-If)</button>
                    </div>

                    <div class="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-grow bg-slate-50 relative">
                        <div id="ps_tab_overview" class="ps-tab-content block animate-fade-in relative z-10"></div>
                        <div id="ps_tab_sandbox" class="ps-tab-content hidden animate-fade-in relative z-10"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    // ==========================================
    // 🔄 3. DATA EXTRACTION (TEXT REGEX 100%)
    // ==========================================
    open: function() {
        this.init(); 
        try {
            this.extractData();
        } catch (error) {
            console.error("Data Extraction Error:", error);
            alert("⚠️ พบข้อผิดพลาดในการดึงข้อมูลบางส่วน แต่ระบบจะพยายามเปิดหน้าต่างให้ครับ\n\n(ลองกด 'ประมวลผล' ที่หน้าหลักอีกครั้ง)");
        }

        if(!this.state.payload || this.state.payload.portfolio.totalWealth === 0) {
            alert("❌ ไม่พบข้อมูลการประมวลผล กรุณากรอกข้อมูลการลงทุนและกด 'ประมวลผล' ในหน้าหลักก่อนใช้งานครับ");
            return;
        }

        const modal = document.getElementById('portfolioSimModal');
        const box = document.getElementById('ps_modal_box');
        modal.classList.remove('hidden');
        setTimeout(() => { modal.classList.remove('opacity-0'); box.classList.remove('scale-95'); this.switchTab('overview'); }, 50);
    },

    close: function() {
        document.getElementById('portfolioSimModal').classList.add('opacity-0');
        document.getElementById('ps_modal_box').classList.add('scale-95');
        setTimeout(() => document.getElementById('portfolioSimModal').classList.add('hidden'), 300);
    },

    switchTab: function(tabName) {
        document.querySelectorAll('.ps-tab-btn').forEach(btn => {
            btn.classList.remove('active', 'text-indigo-700', 'border-indigo-600');
            btn.classList.add('text-slate-500', 'border-transparent');
        });
        document.querySelectorAll('.ps-tab-content').forEach(c => c.classList.add('hidden'));
        document.getElementById(`ps_tabbtn_${tabName}`).classList.add('active', 'text-indigo-700', 'border-indigo-600');
        document.getElementById(`ps_tabbtn_${tabName}`).classList.remove('text-slate-500', 'border-transparent');
        document.getElementById(`ps_tab_${tabName}`).classList.remove('hidden');

        if (tabName === 'overview') this.renderOverview();
        if (tabName === 'sandbox') this.renderSandboxInit();
    },

    // 🛡️ ฟังก์ชันเซฟตี้สำหรับดึงตัวเลข
    extractNumber: function(text, regex, fallback = 0) {
        if (!text) return fallback;
        let match = text.match(regex);
        return match ? Number(match[1].replace(/,/g, '')) : fallback;
    },
    
    // 🛡️ ฟังก์ชันเซฟตี้สำหรับดึงค่าจาก ID
    safeGetNumById: function(id, fallback = 0) {
        let el = document.getElementById(id);
        if (!el) return fallback;
        let valText = el.value || el.innerText || "0";
        return Number(valText.replace(/[^0-9.-]+/g, "")) || fallback;
    },

    extractData: function() {
        // --- 1. สรุปพอร์ตแยกตามเป้าหมายหลัก ---
        let goalGroups = {};
        let totalW = 0; let wRoi = 0;
        
        // 1.1 พยายามดึงจากตารางสรุปก่อน
        let investSummaryContainer = document.getElementById('invest_summary_container');
        let expectedReturn = 0, sd = 0;

        if (investSummaryContainer && investSummaryContainer.innerText.includes('ผลตอบแทน')) {
            let htmlText = investSummaryContainer.innerText || "";
            totalW = this.extractNumber(htmlText, /รวมมูลค่าพอร์ตการลงทุน\s*([\d,.]+)/) || 0;
            expectedReturn = this.extractNumber(htmlText, /ผลตอบแทนพอร์ตเฉลี่ย\s*\(ROI\):\s*([\d.]+)/) || 0;
            sd = this.extractNumber(htmlText, /ความผันผวนโดยประมาณ\s*\(SD\):\s*([\d.]+)/) || Math.max(4.5, expectedReturn * 1.6);
            
            investSummaryContainer.querySelectorAll('tbody tr').forEach(tr => {
                let tds = tr.querySelectorAll('td');
                if (tds.length >= 4) {
                    let val = Number(tds[1].innerText.replace(/[^0-9.-]+/g, "")) || 0;
                    let obj = tds[3].innerText.trim() || 'ความมั่งคั่งทั่วไป';
                    if (val > 0) goalGroups[obj] = (goalGroups[obj] || 0) + val;
                }
            });
        }
        
        // 1.2 ถ้าดึงจากตารางไม่ได้ ให้ดึงจาก Input (Fallback)
        if (Object.keys(goalGroups).length === 0) {
            document.querySelectorAll('#c_invest_current .custom-row').forEach(row => {
                let obj = row.querySelector('.col-inv-obj')?.value || 'ความมั่งคั่งทั่วไป';
                let val = Number((row.querySelector('.col-inv-val')?.value || "0").replace(/,/g, '')) || 0;
                let roi = Number(row.querySelector('.col-inv-roi')?.value) || 0;
                if (val > 0) {
                    totalW += val; wRoi += (val * roi);
                    goalGroups[obj] = (goalGroups[obj] || 0) + val;
                }
            });
            if(totalW > 0 && expectedReturn === 0) {
                expectedReturn = (wRoi / totalW);
                sd = Math.max(4.5, expectedReturn * 1.6);
            }
        }
        
        let allocByGoal = Object.keys(goalGroups).map(k => ({ name: k, val: goalGroups[k] }));
        let sharpe = sd > 0 ? ((expectedReturn - 2) / sd) : 0;

        // --- 2. ดึงเงินออมรายเดือน (กวาดจากตารางรายจ่าย เพื่อนำไปใช้เป็นค่าเริ่มต้นใน Sandbox) ---
        let monthlyDCA = 0;
        document.querySelectorAll('#c_exp .data-row').forEach(row => {
            let cat = row.dataset.cat || "";
            let name = row.querySelector('.col-name')?.value || "";
            if(cat === 'รายจ่ายเพื่อออม/ลงทุน' || name.includes('ออม')) {
                monthlyDCA += Number((row.querySelector('.col-val')?.value || "0").replace(/,/g, '')) || 0;
            }
        });

        this.state.payload = {
            client: { 
                age: this.safeGetNumById('p_age', 35), 
                lifeExp: this.safeGetNumById('r_lifeExp', 85), 
                retAge: this.safeGetNumById('r_retAge', 60),
                dca: monthlyDCA || 10000 
            },
            portfolio: { 
                totalWealth: totalW || this.safeGetNumById('sum_assets_total'), 
                roi: expectedReturn || 5.0, 
                sd: sd || 8.0, 
                sharpe: sharpe || 0, 
                allocByGoal 
            }
        };
    },

    // ==========================================
    // 🗣️ 4. TAB RENDERERS
    // ==========================================
    
    renderOverview: function() {
        const p = this.state.payload.portfolio;
        let html = `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 space-y-4">
                    <div class="bg-indigo-900 p-5 rounded-xl text-white shadow-lg">
                        <div class="text-xs text-indigo-200 font-bold mb-1 uppercase">รวมมูลค่าพอร์ตการลงทุนปัจจุบัน</div>
                        <div class="text-3xl font-black mb-4">${p.totalWealth.toLocaleString('th-TH')} ฿</div>
                        <div class="grid grid-cols-2 gap-2 text-sm border-t border-indigo-700 pt-3">
                            <div><span class="text-indigo-300 block text-xs">คาดหวัง E(Rp)</span><b class="text-emerald-400">${p.roi.toFixed(2)}%</b></div>
                            <div><span class="text-indigo-300 block text-xs">ความเสี่ยง (SD)</span><b class="text-orange-400">${p.sd.toFixed(2)}%</b></div>
                        </div>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h4 class="text-indigo-800 font-bold mb-2 flex items-center gap-2"><span class="text-xl">💬</span> FA Executive Summary</h4>
                        <p class="text-sm text-slate-700 leading-relaxed mb-3">พอร์ตนี้ถูกจัดสรรแยกตามเป้าหมายหลักเพื่อความชัดเจนในการติดตามผล อัตราส่วน Sharpe Ratio อยู่ที่ <b>${p.sharpe.toFixed(2)}</b> บ่งบอกถึงประสิทธิภาพในการบริหารความเสี่ยงเทียบกับผลตอบแทนที่ได้รับ</p>
                        <div class="text-xs text-indigo-600 bg-indigo-50 p-3 rounded italic">"ระบบแนะนำให้ลูกค้าจัดพอร์ตแบบ Goal-Based ต่อไป เพื่อป้องกันการนำเงินไปใช้ผิดวัตถุประสงค์ (Mental Accounting)"</div>
                    </div>
                </div>
                <div class="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">🎯 สัดส่วนพอร์ตแยกตาม "เป้าหมายหลัก" (100%)</h3>
                    <div class="flex-grow flex flex-col md:flex-row items-center gap-8">
                        <div class="w-full md:w-1/2 h-56 relative"><canvas id="ps_chart_allocByGoal"></canvas></div>
                        <div class="w-full md:w-1/2">
                            <ul class="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                ${p.allocByGoal.length > 0 ? p.allocByGoal.map((g, i) => {
                                    let pct = p.totalWealth > 0 ? ((g.val / p.totalWealth) * 100).toFixed(1) : 0;
                                    let colors = ['text-indigo-600', 'text-emerald-600', 'text-amber-500', 'text-blue-500', 'text-pink-500'];
                                    return `
                                    <li class="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-100">
                                        <span class="text-sm font-bold text-slate-700 truncate pr-2" title="${g.name}">${g.name}</span>
                                        <span class="${colors[i % colors.length]} font-black bg-white px-2 py-0.5 rounded shadow-sm">${pct}%</span>
                                    </li>`;
                                }).join('') : '<li class="text-gray-400 text-center text-sm py-4">ไม่พบการระบุเป้าหมายในพอร์ตการลงทุน</li>'}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('ps_tab_overview').innerHTML = html;
        
        let ctx = document.getElementById('ps_chart_allocByGoal');
        if(ctx && p.allocByGoal.length > 0) {
            new Chart(ctx.getContext('2d'), {
                type: 'doughnut',
                data: { labels: p.allocByGoal.map(g => g.name), datasets: [{ data: p.allocByGoal.map(g => g.val), backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'] }] },
                options: { 
                    maintainAspectRatio: false, 
                    plugins: { 
                        legend: { display: false },
                        tooltip: { callbacks: { label: c => ` ${c.label}: ${Number(c.raw).toLocaleString('th-TH')} ฿` } }
                    } 
                }
            });
        }
    },

    renderSandboxInit: function() {
        const p = this.state.payload.portfolio;
        const info = this.state.payload.client;
        const maxYears = Math.max(1, info.lifeExp - info.age);

        let html = `
            <div class="bg-slate-100 p-4 rounded-xl border border-slate-200 mb-6 flex items-start gap-3">
                <span class="text-2xl">🎛️</span>
                <div>
                    <h3 class="font-bold text-slate-800">โหมดจำลองสถานการณ์สมมติ (Interactive What-If Sandbox)</h3>
                    <p class="text-xs text-slate-500">จำลองการปรับเปลี่ยนปัจจัยต่างๆ โดยดึงมูลค่าพอร์ตจริง <b>${p.totalWealth.toLocaleString('th-TH')} ฿</b> มาเป็นฐาน (การปรับค่าในหน้านี้ไม่มีผลต่อรายงานหลัก)</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div class="lg:col-span-4 space-y-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div>
                        <div class="flex justify-between items-end mb-1">
                            <label class="text-xs font-bold text-slate-700">ระดับความเสี่ยงพอร์ตจำลอง</label>
                            <span class="text-[10px] font-medium text-slate-500">เสี่ยงต่ำ <b id="ps_sb_val_lowRisk" class="text-emerald-600 text-sm">50</b>% : <b id="ps_sb_val_highRisk" class="text-rose-600 text-sm">50</b>% เสี่ยงสูง</span>
                        </div>
                        <input type="range" id="ps_sb_risk" min="0" max="100" step="5" value="50" class="w-full accent-indigo-600" oninput="PortfolioSimulator.updateSandboxCalc()">
                    </div>

                    <div>
                        <div class="flex justify-between items-end mb-1">
                            <label class="text-xs font-bold text-slate-700">ออมเพิ่ม/ถอนออก (DCA Cashflow)</label>
                            <span class="text-xs font-bold text-blue-600"><span id="ps_sb_val_dca">${info.dca.toLocaleString('th-TH')}</span> ฿</span>
                        </div>
                        <div class="flex justify-between text-[9px] text-slate-400 px-1"><span>ถอนใช้ (-)</span><span>ลงทุนเพิ่ม (+)</span></div>
                        <input type="range" id="ps_sb_dca" min="-1000000" max="1000000" step="1000" value="${info.dca}" class="w-full accent-blue-500" oninput="PortfolioSimulator.updateSandboxCalc()">
                    </div>

                    <div>
                        <div class="flex justify-between items-end mb-1">
                            <label class="text-xs font-bold text-slate-700">ระยะเวลาจำลอง (Years)</label>
                            <span class="text-xs font-bold text-orange-600"><span id="ps_sb_val_yr">10</span> ปี</span>
                        </div>
                        <div class="flex justify-between text-[9px] text-slate-400 px-1"><span>ปัจจุบัน (0)</span><span>อายุขัย (${info.lifeExp})</span></div>
                        <input type="range" id="ps_sb_yr" min="1" max="${maxYears}" step="1" value="10" class="w-full accent-orange-500" oninput="PortfolioSimulator.updateSandboxCalc()">
                    </div>

                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
                        <div class="text-[10px] text-slate-500 font-bold mb-2 uppercase border-b pb-1">ผลลัพธ์จำลอง (MPT Math)</div>
                        <div class="flex justify-between text-sm mb-1"><span>คาดหวัง E(R<sub>p</sub>)</span> <b id="ps_sb_res_roi" class="text-emerald-600">0%</b></div>
                        <div class="flex justify-between text-sm"><span>ความผันผวน SD</span> <b id="ps_sb_res_sd" class="text-rose-500">0%</b></div>
                    </div>
                </div>

                <div class="lg:col-span-8 space-y-4 flex flex-col">
                    <div id="ps_sb_nlg_box" class="bg-indigo-50 border border-indigo-100 p-5 rounded-xl text-sm text-indigo-900 leading-relaxed shadow-sm min-h-[160px]"></div>
                    
                    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-grow">
                        <div class="h-[200px] p-3 border-b border-slate-100 w-full relative"><canvas id="ps_chart_sandbox"></canvas></div>
                        
                        <div class="bg-slate-100 px-4 py-2 font-bold text-slate-800 text-sm">ตารางรายละเอียดรายปี (Monte Carlo Simulation 1,000 Iterations)</div>
                        <div class="max-h-[180px] overflow-y-auto custom-scrollbar">
                            <table class="w-full text-right text-xs md:text-sm">
                                <thead class="bg-white sticky top-0 shadow-sm z-10">
                                    <tr class="text-slate-500">
                                        <th class="p-2 text-center border-b">ปีที่</th>
                                        <th class="p-2 border-b">กรณีเลวร้าย (Bottom 10%)</th>
                                        <th class="p-2 border-b">คาดหวัง (Expected)</th>
                                        <th class="p-2 border-b">กรณีดีเยี่ยม (Top 10%)</th>
                                    </tr>
                                </thead>
                                <tbody id="ps_sb_table_body" class="divide-y divide-slate-100"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('ps_tab_sandbox').innerHTML = html;
        setTimeout(() => this.updateSandboxCalc(), 100); 
    },

    updateSandboxCalc: function() {
        let pRisk = Number(document.getElementById('ps_sb_risk').value); 
        let pLow = 100 - pRisk; 
        let dca = Number(document.getElementById('ps_sb_dca').value);
        let yrs = Number(document.getElementById('ps_sb_yr').value);

        document.getElementById('ps_sb_val_highRisk').innerText = pRisk;
        document.getElementById('ps_sb_val_lowRisk').innerText = pLow;
        document.getElementById('ps_sb_val_dca').innerText = dca.toLocaleString('th-TH');
        document.getElementById('ps_sb_val_yr').innerText = yrs;

        let simRoi = ((pRisk/100) * 10) + ((pLow/100) * 3); 
        let simSd = this.Engine.calcHypotheticalSD(pRisk/100, pLow/100, 18, 3, -0.1);

        document.getElementById('ps_sb_res_roi').innerText = simRoi.toFixed(2) + '%';
        document.getElementById('ps_sb_res_sd').innerText = simSd.toFixed(2) + '%';

        let initW = this.state.payload.portfolio.totalWealth;
        let sim = this.Engine.runSimulation(initW, dca * 12, simRoi, simSd, yrs);
        
        // --- Render Chart ---
        if(this.charts.sandbox) this.charts.sandbox.destroy();
        let labels = Array.from({length: yrs+1}, (_, i) => `ปี ${i}`);
        this.charts.sandbox = new Chart(document.getElementById('ps_chart_sandbox').getContext('2d'), {
            type: 'line',
            data: { labels: labels, datasets: [
                { label: 'พอร์ตดีเยี่ยม', data: sim.best, borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderWidth: 1, borderDash: [5,5], fill: '+1', pointRadius: 0 },
                { label: 'พอร์ตคาดหวัง', data: sim.exp, borderColor: '#6366f1', borderWidth: 2, fill: false, pointRadius: 0 }, 
                { label: 'พอร์ตเลวร้าย', data: sim.worst, borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.1)', borderWidth: 1, borderDash: [5,5], fill: '-1', pointRadius: 0 }
            ]},
            options: { 
                animation: false, responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, datalabels: { display: false }, tooltip: { mode: 'index', intersect: false, callbacks: { label: c => c.dataset.label + ': ' + Number(c.raw).toLocaleString('th-TH', {maximumFractionDigits: 0}) + ' ฿' } } },
                scales: { y: { beginAtZero: true, ticks: { font:{size:10}, callback: v => (v/1000000).toFixed(1) + 'M' } }, x: { ticks: { font:{size:10} } } },
                interaction: { mode: 'nearest', axis: 'x', intersect: false }
            }
        });

        // --- Render Table ---
        let tableHtml = '';
        for(let i = 1; i <= yrs; i++) {
            let rowClass = i === yrs ? "bg-indigo-50 font-bold" : "hover:bg-slate-50";
            tableHtml += `
                <tr class="${rowClass} transition-colors">
                    <td class="p-1 md:p-2 text-center text-slate-700">${i}</td>
                    <td class="p-1 md:p-2 text-rose-500">${sim.worst[i].toLocaleString('th-TH', {maximumFractionDigits:0})}</td>
                    <td class="p-1 md:p-2 text-blue-600">${sim.exp[i].toLocaleString('th-TH', {maximumFractionDigits:0})}</td>
                    <td class="p-1 md:p-2 text-emerald-500">${sim.best[i].toLocaleString('th-TH', {maximumFractionDigits:0})}</td>
                </tr>
            `;
        }
        document.getElementById('ps_sb_table_body').innerHTML = tableHtml;

        // --- Expanded NLG Logic ---
        let nlgContent = `
            <div class="font-bold text-indigo-800 mb-2 border-b border-indigo-200 pb-1 flex items-center gap-2">
                <span class="text-lg">🤖</span> บทวิเคราะห์จำลองเชิงลึกแบบ What-If
            </div>
            <p class="mb-2">หากจำลองเงินลงทุนตั้งต้นที่ <b>${initW.toLocaleString()} บาท</b> และจัดพอร์ตโดยอิงระดับความเสี่ยงสูงที่ <b>${pRisk}%</b> (สร้างความผันผวนโดยเฉลี่ย ${simSd.toFixed(1)}%) </p>
        `;
        
        if (dca > 0) {
            nlgContent += `<p class="mb-2">ผสานกับการเติมสภาพคล่องเพื่อลงทุนอย่างมีวินัยเดือนละ <b>${dca.toLocaleString()} บาท</b> ตลอดระยะเวลา <b>${yrs} ปี</b> พลังของดอกเบี้ยทบต้น (Compound Interest) จะช่วยผลักดันให้มูลค่าพอร์ตเติบโตไปแตะระดับ <b>${sim.exp[yrs].toLocaleString('th-TH', {maximumFractionDigits:0})} บาท</b> (ตามคาดการณ์ฐาน)</p>`;
        } else if (dca < 0) {
            nlgContent += `<p class="mb-2 text-rose-700 font-medium">ในกรณีที่คุณจำลองแผนแบบถอนเงินใช้ (Decumulation) เดือนละ <b>${Math.abs(dca).toLocaleString()} บาท</b> ตลอด <b>${yrs} ปี</b> ระบบพบว่ามูลค่าทรัพย์สินจะถูกรอนลงเหลือประมาณ <b>${sim.exp[yrs].toLocaleString('th-TH', {maximumFractionDigits:0})} บาท</b></p>`;
        } else {
            nlgContent += `<p class="mb-2">โดยปล่อยให้เงินทำงานไปตามวัฏจักรเศรษฐกิจ (ไม่มีการออมเพิ่ม) ในอีก <b>${yrs} ปี</b> ข้างหน้า คาดว่าเงินก้อนนี้จะเติบโตเป็น <b>${sim.exp[yrs].toLocaleString('th-TH', {maximumFractionDigits:0})} บาท</b></p>`;
        }

        if (pRisk > 70) {
            nlgContent += `<div class="mt-3 bg-white p-3 rounded border-l-4 border-rose-400 text-rose-800 shadow-sm text-xs">
                <b>⚠️ ข้อควรระวังจาก AI:</b> สัดส่วนความเสี่ยงเกิน 70% จะทำให้ส่วนต่างระหว่างช่วงตลาดกระทิงและหมี (Spread) กว้างมาก แนะนำให้ตรวจสอบว่าคุณสามารถทนเห็นพอร์ตติดลบหนักๆ ในบางปีได้หรือไม่ (Drawdown Tolerance)
            </div>`;
        } else if (dca < 0 && sim.worst[yrs] <= 0) {
            nlgContent += `<div class="mt-3 bg-white p-3 rounded border-l-4 border-red-500 text-red-700 shadow-sm text-xs">
                <b>🚨 อันตรายระดับวิกฤต:</b> อัตราการดึงกระแสเงินสดออก (Withdrawal Rate) สูงกว่าผลตอบแทนที่ทำได้มาก หากโชคร้ายเจอตลาดขาลง <b>เงินทุนจะหมดเกลี้ยงก่อนสิ้นปีที่ ${yrs}</b> แนะนำให้ลดเป้าการใช้จ่ายทันที
            </div>`;
        } else if (pRisk < 30 && yrs > 15) {
             nlgContent += `<div class="mt-3 bg-white p-3 rounded border-l-4 border-amber-400 text-amber-800 shadow-sm text-xs">
                <b>💡 ข้อควรระวังเรื่องเงินเฟ้อ:</b> สำหรับแผนการเงินระยะยาวกว่า 15 ปี การกอดสินทรัพย์เสี่ยงต่ำมากเกินไป (ปัจจุบัน ${pLow}%) อาจนำพอร์ตไปสู่กับดักเงินเฟ้อ แนะนำให้ขยับสัดส่วนหุ้นขึ้นเล็กน้อยครับ
            </div>`;
        } else {
            nlgContent += `<div class="mt-3 bg-white p-3 rounded border-l-4 border-emerald-400 text-emerald-800 shadow-sm text-xs">
                <b>✅ แนวโน้มสมดุล:</b> แผนจำลองนี้แสดงให้เห็นความสอดคล้องระหว่างการเติบโตและการควบคุมความเสี่ยง ถือเป็นกลยุทธ์ทางคณิตศาสตร์ที่นำไปปฏิบัติได้จริงครับ
            </div>`;
        }

        document.getElementById('ps_sb_nlg_box').innerHTML = nlgContent;
    }
};

window.PortfolioSimulator = PortfolioSimulator;