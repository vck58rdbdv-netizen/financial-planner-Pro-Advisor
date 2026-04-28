/**
 * Module: Enterprise Portfolio Simulator (CFP/CFA Standard)
 * Features: MPT Engine, Goal-Based, Retirement Decumulation, Interactive Sandbox, AI Rebalancing, Formal Print
 */

const PortfolioSimulator = {
    charts: { alloc: null, growth: null, retire: null, sandbox: null },
    state: {
        assets: [], totalWealth: 0, currentRoi: 0, currentSd: 0,
        age: 35, retAge: 60, lifeExp: 85,
        monthlySaving: 0, retExpense: 0, inflation: 3.0,
        goals: []
    },

    // ==========================================
    // 🧠 1. CORE ENGINES (MPT, Monte Carlo & AI Advisor)
    // ==========================================
    MPT_Engine: {
        correlations: {
            'Cash_Cash': 1.0, 'Cash_Bond': 0.1, 'Cash_EquityTH': 0.0, 'Cash_EquityGlobal': 0.0, 'Cash_Alt': 0.0,
            'Bond_Bond': 1.0, 'Bond_EquityTH': -0.1, 'Bond_EquityGlobal': -0.2, 'Bond_Alt': 0.1,
            'EquityTH_EquityTH': 1.0, 'EquityTH_EquityGlobal': 0.6, 'EquityTH_Alt': 0.3,
            'EquityGlobal_EquityGlobal': 1.0, 'EquityGlobal_Alt': 0.4,
            'Alt_Alt': 1.0
        },
        mapAssetClass: function(assetName) {
            const n = (assetName || '').toLowerCase();
            if (n.includes('ฝาก') || n.includes('สภาพคล่อง') || n.includes('เงินสด') || n.includes('ออมทรัพย์')) return 'Cash';
            if (n.includes('หนี้') || n.includes('พันธบัตร') || n.includes('หุ้นกู้')) return 'Bond';
            if (n.includes('ต่างประเทศ') || n.includes('โลก') || n.includes('global') || n.includes('เทค') || n.includes('s&p')) return 'EquityGlobal';
            if (n.includes('หุ้น') || n.includes('ตราสารทุน') || n.includes('กองทุนรวม')) return 'EquityTH';
            return 'Alt';
        },
        getCorr: function(cA, cB) {
            if (cA === cB) return 1.0;
            let key1 = `${cA}_${cB}`;
            let key2 = `${cB}_${cA}`;
            if (this.correlations[key1] !== undefined) return this.correlations[key1];
            if (this.correlations[key2] !== undefined) return this.correlations[key2];
            return 0.5;
        },
        calcPortfolioSD: function(assets, totalWealth) {
            if (!totalWealth || totalWealth <= 0) return 0;
            let variance = 0;
            for (let i = 0; i < assets.length; i++) {
                for (let j = 0; j < assets.length; j++) {
                    let w_i = (assets[i].val || 0) / totalWealth;
                    let w_j = (assets[j].val || 0) / totalWealth;
                    let sd_i = Math.max((assets[i].roi || 0) * 1.5, 0.5); 
                    let sd_j = Math.max((assets[j].roi || 0) * 1.5, 0.5);
                    let c_i = this.mapAssetClass(assets[i].name);
                    let c_j = this.mapAssetClass(assets[j].name);
                    variance += (w_i * w_j * sd_i * sd_j * this.getCorr(c_i, c_j));
                }
            }
            return Math.sqrt(Math.max(0, variance));
        },
        calcHypotheticalSD: function(wEquity, wBond, sdEquity = 15, sdBond = 3, corr = -0.2) {
            return Math.sqrt((wEquity*wEquity * sdEquity*sdEquity) + (wBond*wBond * sdBond*sdBond) + (2 * wEquity * wBond * sdEquity * sdBond * corr));
        }
    },

    AI_Advisor: {
        instruments: {
            'Cash': ['AIA Money Market Fund', 'กองทุนรวมตลาดเงิน (Money Market)', 'บัญชีเงินฝากดิจิทัลดอกเบี้ยสูง'],
            'Bond': ['AIA Fixed Income Fund', 'กองทุนรวมตราสารหนี้ระยะกลาง', 'พันธบัตรรัฐบาล / หุ้นกู้เรตติ้ง A- ขึ้นไป'],
            'EquityTH': ['AIA Thai Equity Fund', 'กองทุนดัชนี SET50', 'กองทุนหุ้นไทยเน้นเงินปันผล'],
            'EquityGlobal': ['AIA Global Equity Fund', 'กองทุนดัชนี S&P500 / หุ้นโลก', 'AIA Global Technology Fund'],
            'Alt': ['กองทุนรวมทองคำ (Gold Fund)', 'กองทุนอสังหาริมทรัพย์ (REITs)', 'สินทรัพย์ทางเลือกอื่นๆ']
        },
        getModelPortfolio: function(yearsToRetire) {
            if (yearsToRetire > 15) return { Cash: 5, Bond: 15, EquityTH: 20, EquityGlobal: 50, Alt: 10 }; // Aggressive
            if (yearsToRetire > 7) return { Cash: 10, Bond: 30, EquityTH: 20, EquityGlobal: 30, Alt: 10 }; // Moderate
            return { Cash: 20, Bond: 50, EquityTH: 10, EquityGlobal: 15, Alt: 5 }; // Conservative
        }
    },

    MonteCarlo_Engine: {
        getGaussianRandom: function() {
            let u1 = Math.random(), u2 = Math.random();
            if(u1 === 0) u1 = 0.00001; 
            return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        },
        runSimulation: function(initW, pmt, roi, sd, years, isDecumulation = false, infRate = 0.03) {
            const iterations = 3000; 
            let resultsByYear = Array.from({length: years + 1}, () => []);
            let r = (roi || 0) / 100;
            let s = (sd || 0) / 100;

            for (let sim = 0; sim < iterations; sim++) {
                let w = initW;
                resultsByYear[0].push(w);
                
                for (let y = 1; y <= years; y++) {
                    let z = this.getGaussianRandom();
                    let randomReturn = (r - (s * s) / 2) + (s * z);
                    
                    if (!isDecumulation) {
                        w = (w * (1 + randomReturn)) + pmt;
                    } else {
                        let inflatedWithdrawal = pmt * Math.pow(1 + infRate, y);
                        w = Math.max(0, (w - inflatedWithdrawal) * (1 + randomReturn));
                    }
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
        this.injectModalHTML();
    },

    injectModalHTML: function() {
        if (document.getElementById('portfolioSimModal')) return;

        const modalHTML = `
            <div id="portfolioSimModal" class="hidden fixed inset-0 z-[10005] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-2 md:p-4 transition-opacity duration-300 opacity-0">
                <div class="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[98vh] md:h-[95vh] flex flex-col overflow-hidden transform transition-transform scale-95 border-t-8 border-indigo-600" id="ps_modal_box">
                    
                    <div class="bg-gradient-to-r from-slate-900 to-indigo-900 text-white p-4 flex justify-between items-center flex-shrink-0 shadow-md z-20">
                        <div>
                            <h2 class="text-xl md:text-2xl font-bold flex items-center gap-3"><span class="text-2xl md:text-3xl">🏛️</span> Wealth Simulator</h2>
                            <p class="text-xs text-indigo-200 mt-1">วิเคราะห์และจำลองพอร์ตการลงทุน (CFP Standard)</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="PortfolioSimulator.printFormalReport()" class="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg font-bold transition flex items-center gap-2 text-xs md:text-sm border border-white/20">
                                🖨️ พิมพ์รายงาน
                            </button>
                            <button onclick="PortfolioSimulator.close()" class="bg-rose-500 hover:bg-rose-600 text-white w-9 h-9 rounded-full flex items-center justify-center transition text-xl font-bold shadow-lg">
                                &times;
                            </button>
                        </div>
                    </div>

                    <div class="flex bg-slate-100 border-b border-slate-200 px-4 pt-3 gap-1 z-10 flex-shrink-0 overflow-x-auto custom-scrollbar">
                        <button onclick="PortfolioSimulator.switchTab('overview')" id="ps_tabbtn_overview" class="ps-tab-btn active px-4 py-2.5 text-xs md:text-sm font-bold rounded-t-lg transition-colors bg-white text-indigo-700 border-t border-x border-slate-200 shadow-[0_4px_0_0_white] whitespace-nowrap">📊 ภาพรวมและปรับพอร์ต</button>
                        <button onclick="PortfolioSimulator.switchTab('goals')" id="ps_tabbtn_goals" class="ps-tab-btn px-4 py-2.5 text-xs md:text-sm font-bold text-slate-500 hover:text-indigo-600 rounded-t-lg transition-colors whitespace-nowrap">🎯 วิเคราะห์เป้าหมาย</button>
                        <button onclick="PortfolioSimulator.switchTab('retire')" id="ps_tabbtn_retire" class="ps-tab-btn px-4 py-2.5 text-xs md:text-sm font-bold text-slate-500 hover:text-indigo-600 rounded-t-lg transition-colors whitespace-nowrap">🏖️ จำลองช่วงเกษียณ</button>
                        <button onclick="PortfolioSimulator.switchTab('sandbox')" id="ps_tabbtn_sandbox" class="ps-tab-btn px-4 py-2.5 text-xs md:text-sm font-bold text-slate-500 hover:text-indigo-600 rounded-t-lg transition-colors whitespace-nowrap">🎛️ จำลองปรับสัดส่วน</button>
                    </div>

                    <div class="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-grow bg-slate-50 relative">
                        
                        <div id="ps_tab_overview" class="ps-tab-content block animate-fade-in relative z-10">
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6" id="ps_summary_cards"></div>
                            
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
                                <div class="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 class="font-bold text-slate-800 mb-3 text-center border-b pb-2 text-sm md:text-base">สัดส่วนพอร์ตปัจจุบัน (Asset Allocation)</h3>
                                    <div class="h-56 md:h-64 relative w-full"><canvas id="ps_chart_allocation"></canvas></div>
                                </div>
                                <div class="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 class="font-bold text-slate-800 mb-3 text-center border-b pb-2 text-sm md:text-base">คาดการณ์เติบโต 10 ปี (Current Status Quo)</h3>
                                    <div class="h-56 md:h-64 relative w-full"><canvas id="ps_chart_growth"></canvas></div>
                                </div>
                            </div>
                            
                            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                                <div class="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex justify-between items-center">
                                    <h3 class="font-bold text-indigo-900 flex items-center gap-2 text-sm md:text-base">🤖 คำแนะนำการปรับพอร์ต (Strategic Rebalancing)</h3>
                                </div>
                                <div class="p-4 md:p-5 text-sm text-slate-700" id="ps_rebalance_guide"></div>
                            </div>

                            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                                <div class="bg-slate-100 px-4 py-3 border-b border-slate-200">
                                    <h3 class="font-bold text-slate-800 text-sm md:text-base">ตารางจำลองการเติบโต 10 ปี (Projection Data)</h3>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="w-full text-xs md:text-sm text-right">
                                        <thead class="bg-slate-50 text-slate-600 border-b">
                                            <tr>
                                                <th class="p-2 md:p-3 text-center">สิ้นปีที่</th>
                                                <th class="p-2 md:p-3 text-emerald-600 font-bold">กรณีดีเยี่ยม (Top 10%)</th>
                                                <th class="p-2 md:p-3 text-blue-600 font-bold">ผลตอบแทนคาดหวัง</th>
                                                <th class="p-2 md:p-3 text-rose-600 font-bold">กรณีเลวร้าย (Bottom 10%)</th>
                                            </tr>
                                        </thead>
                                        <tbody id="ps_projection_table_body" class="divide-y divide-gray-100"></tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
                                <div class="bg-slate-100 px-4 py-3 border-b border-slate-200">
                                    <h3 class="font-bold text-slate-800 text-sm md:text-base">รายละเอียดสินทรัพย์ (Assets Breakdown)</h3>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="w-full text-xs md:text-sm text-left">
                                        <thead class="bg-slate-50 text-slate-600 border-b">
                                            <tr>
                                                <th class="p-2 md:p-3">สินทรัพย์ / กองทุน</th>
                                                <th class="p-2 md:p-3 text-center">ประเภท (Asset Class)</th>
                                                <th class="p-2 md:p-3 text-right">มูลค่า (บาท)</th>
                                                <th class="p-2 md:p-3 text-right">สัดส่วน (%)</th>
                                                <th class="p-2 md:p-3 text-center">E(Rp)</th>
                                            </tr>
                                        </thead>
                                        <tbody id="ps_asset_table_body" class="divide-y divide-gray-100"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div id="ps_tab_goals" class="ps-tab-content hidden animate-fade-in relative z-10">
                            <div class="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                                <h3 class="text-lg md:text-xl font-bold text-slate-800 mb-2">🎯 วิเคราะห์เป้าหมาย (Goal-Based Asset Matching)</h3>
                                <p class="text-xs md:text-sm text-slate-600 mb-6">ประเมินความเป็นไปได้ของเป้าหมายทางการเงินเทียบกับศักยภาพของพอร์ตในปัจจุบัน</p>
                                <div id="ps_goals_container" class="space-y-4"></div>
                            </div>
                        </div>

                        <div id="ps_tab_retire" class="ps-tab-content hidden animate-fade-in relative z-10">
                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                                <div class="lg:col-span-1 space-y-4">
                                    <div class="bg-indigo-900 text-white p-4 md:p-5 rounded-xl shadow-md border border-indigo-800">
                                        <h4 class="font-bold text-indigo-200 mb-1 text-[10px] md:text-xs">Sequence of Returns Risk (SORR)</h4>
                                        <h2 class="text-lg md:text-xl font-bold mb-3 border-b border-indigo-700 pb-2">จำลองช่วงถอนเงินเกษียณ</h2>
                                        <div class="space-y-2 text-xs md:text-sm">
                                            <div class="flex justify-between"><span>ทุนเริ่มเกษียณ:</span> <b id="ps_ret_init" class="text-emerald-400"></b></div>
                                            <div class="flex justify-between"><span>ถอนปีแรก:</span> <b id="ps_ret_draw" class="text-rose-400"></b></div>
                                            <div class="flex justify-between border-b border-indigo-700 pb-2"><span>เงินเฟ้อ:</span> <b id="ps_ret_inf" class="text-amber-400"></b></div>
                                            <div class="flex justify-between pt-1 items-center">
                                                <span>อายุที่เงินหมด<br><span class="text-[9px] text-indigo-300">(กรณีวิกฤต 10%)</span></span> 
                                                <b id="ps_ret_deplete" class="text-lg md:text-2xl text-rose-400"></b>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs md:text-sm" id="ps_ret_insight"></div>
                                </div>
                                <div class="lg:col-span-2 bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                                    <h3 class="font-bold text-slate-800 mb-3 text-center border-b pb-2 text-sm md:text-base">กราฟจำลองความมั่งคั่งช่วงถอนเงิน (Decumulation Phase)</h3>
                                    <div class="flex-grow min-h-[250px] md:min-h-[300px] relative"><canvas id="ps_chart_retire"></canvas></div>
                                </div>
                            </div>
                        </div>

                        <div id="ps_tab_sandbox" class="ps-tab-content hidden animate-fade-in relative z-10">
                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                                <div class="lg:col-span-1 bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
                                    <div>
                                        <h4 class="font-bold text-slate-800 mb-3 border-b pb-2 text-sm md:text-base">🎛️ ปรับแต่งพอร์ตจำลอง</h4>
                                        <label class="flex justify-between text-xs font-bold text-slate-600 mb-2">
                                            <span>สัดส่วนหุ้น: <span id="ps_sb_eq_val" class="text-indigo-600 text-sm">50</span>%</span>
                                            <span>ตราสารหนี้: <span id="ps_sb_bd_val" class="text-emerald-600 text-sm">50</span>%</span>
                                        </label>
                                        <input type="range" id="ps_sb_alloc" min="0" max="100" value="50" class="w-full accent-indigo-600 cursor-pointer mb-4" oninput="PortfolioSimulator.updateSandbox()">
                                        
                                        <label class="flex justify-between text-xs font-bold text-slate-600 mb-2">
                                            <span>เงินออม (DCA)</span>
                                            <span id="ps_sb_dca_val" class="text-blue-600 text-sm">10,000</span>
                                        </label>
                                        <input type="range" id="ps_sb_dca" min="0" max="200000" step="1000" value="10000" class="w-full accent-blue-600 cursor-pointer mb-4" oninput="PortfolioSimulator.updateSandbox()">
                                        
                                        <label class="flex justify-between text-xs font-bold text-slate-600 mb-2">
                                            <span>ระยะเวลา (ปี)</span>
                                            <span id="ps_sb_yr_val" class="text-orange-600 text-sm">10</span>
                                        </label>
                                        <input type="range" id="ps_sb_yr" min="1" max="40" step="1" value="10" class="w-full accent-orange-600 cursor-pointer" oninput="PortfolioSimulator.updateSandbox()">
                                    </div>
                                    <div class="bg-slate-50 p-3 md:p-4 rounded-lg border border-slate-200">
                                        <h5 class="text-[10px] md:text-xs font-bold text-slate-500 uppercase mb-2">ผลลัพธ์พอร์ตจำลอง (MPT)</h5>
                                        <div class="flex justify-between items-center mb-1"><span class="text-xs md:text-sm text-slate-700">E(Rp):</span> <b id="ps_sb_res_roi" class="text-base md:text-lg text-emerald-600">0.0%</b></div>
                                        <div class="flex justify-between items-center"><span class="text-xs md:text-sm text-slate-700">Risk (SD):</span> <b id="ps_sb_res_sd" class="text-base md:text-lg text-rose-500">0.0%</b></div>
                                    </div>
                                </div>
                                <div class="lg:col-span-2 bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                                    <h3 class="font-bold text-slate-800 mb-3 text-center border-b pb-2 text-sm md:text-base">Dynamic What-If Projection</h3>
                                    <div class="flex-grow min-h-[250px] md:min-h-[300px] relative"><canvas id="ps_chart_sandbox"></canvas></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <style>
                .ps-tab-btn { position: relative; top: 1px; }
            </style>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    bindEvents: function() {
        document.getElementById('portfolioSimModal').addEventListener('click', (e) => {
            if (e.target.id === 'portfolioSimModal') this.close();
        });
    },

    // ==========================================
    // 🔄 3. STATE MANAGEMENT & EXTRACT
    // ==========================================
    open: function() {
        this.init(); 
        this.extractStateFromApp();

        if(this.state.assets.length === 0) {
            alert("❌ ไม่พบข้อมูลสินทรัพย์ลงทุน กรุณากรอกข้อมูลการลงทุนปัจจุบัน (ส่วนที่ 3.3) และกดประมวลผลก่อนใช้งานฟีเจอร์นี้ครับ");
            return;
        }

        const modal = document.getElementById('portfolioSimModal');
        const box = document.getElementById('ps_modal_box');
        
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            box.classList.remove('scale-95');
            this.switchTab('overview');
        }, 50);
    },

    close: function() {
        const modal = document.getElementById('portfolioSimModal');
        const box = document.getElementById('ps_modal_box');
        modal.classList.add('opacity-0');
        box.classList.add('scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
    },

    switchTab: function(tabName) {
        document.querySelectorAll('.ps-tab-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-white', 'text-indigo-700', 'border-t', 'border-x', 'border-slate-200', 'shadow-[0_4px_0_0_white]');
            btn.classList.add('text-slate-500');
        });
        document.querySelectorAll('.ps-tab-content').forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('block');
        });

        const activeBtn = document.getElementById(`ps_tabbtn_${tabName}`);
        const activeContent = document.getElementById(`ps_tab_${tabName}`);
        
        if(activeBtn) {
            activeBtn.classList.remove('text-slate-500');
            activeBtn.classList.add('active', 'bg-white', 'text-indigo-700', 'border-t', 'border-x', 'border-slate-200', 'shadow-[0_4px_0_0_white]');
        }
        if(activeContent) {
            activeContent.classList.remove('hidden');
            activeContent.classList.add('block');
        }

        if (tabName === 'overview') this.renderOverview();
        if (tabName === 'goals') this.renderGoals();
        if (tabName === 'retire') this.renderRetirement();
        if (tabName === 'sandbox') {
            const dcaSlider = document.getElementById('ps_sb_dca');
            if(dcaSlider) dcaSlider.value = this.state.monthlySaving || 10000;
            this.updateSandbox(); 
        }
    },

    extractStateFromApp: function() {
        let rawAssets = [];
        let totalW = 0; let wRoi = 0;

        document.querySelectorAll('#c_invest_current .custom-row').forEach(row => {
            let nameInput = row.querySelector('.col-inv-name');
            let valInput = row.querySelector('.col-inv-val');
            let roiInput = row.querySelector('.col-inv-roi');

            let name = nameInput ? nameInput.value || 'ไม่ระบุ' : 'ไม่ระบุ';
            let val = valInput ? Number(valInput.value.replace(/,/g, '')) || 0 : 0;
            let roi = roiInput ? Number(roiInput.value) || 0 : 0;

            if (val > 0) {
                rawAssets.push({ name, val, roi });
                totalW += val;
                wRoi += (val * roi);
            }
        });

        this.state.assets = rawAssets;
        this.state.totalWealth = totalW;
        this.state.currentRoi = totalW > 0 ? (wRoi / totalW) : 0;
        this.state.currentSd = this.MPT_Engine.calcPortfolioSD(rawAssets, totalW);

        this.state.age = Number(document.getElementById('p_age')?.value) || 35;
        this.state.retAge = Number(document.getElementById('r_retAge')?.value) || 60;
        this.state.lifeExp = Number(document.getElementById('r_lifeExp')?.value) || 85;
        this.state.retExpense = Number(document.getElementById('r_reqInc')?.value.replace(/,/g, '')) || 50000;
        this.state.inflation = Number(document.getElementById('r_inf')?.value) || 3.0;

        let totalSave = 0;
        document.querySelectorAll('#c_exp .data-row').forEach(row => {
            if(row.dataset.cat === 'รายจ่ายเพื่อออม/ลงทุน') {
                totalSave += Number(row.querySelector('.col-val')?.value.replace(/,/g, '')) || 0;
            }
        });
        this.state.monthlySaving = totalSave;

        let goals = [];
        document.querySelectorAll('#c_goals .custom-row').forEach(row => {
            let inputs = row.querySelectorAll('input');
            if(inputs.length >= 3) {
                goals.push({
                    name: inputs[0].value || 'ไม่ระบุ',
                    amount: Number(inputs[1].value.replace(/,/g, '')) || 0,
                    years: Number(inputs[2].value) || 1
                });
            }
        });
        this.state.goals = goals;
    },

    // ==========================================
    // 🖨️ 4. FORMAL REPORT PRINT GENERATOR
    // ==========================================
    printFormalReport: function() {
        const aum = this.state.totalWealth.toLocaleString('th-TH');
        const roi = this.state.currentRoi.toFixed(2);
        const sd = this.state.currentSd.toFixed(2);
        const sharpe = this.state.currentSd > 0 ? ((this.state.currentRoi - 2) / this.state.currentSd).toFixed(2) : "0.00";
        
        let sharpeEval = "อยู่ในเกณฑ์ดีเยี่ยม สะท้อนการบริหารความเสี่ยงที่มีประสิทธิภาพ";
        if (sharpe < 0.5) sharpeEval = "ค่อนข้างต่ำ ควรพิจารณาปรับโครงสร้างเพื่อเพิ่ม Risk-Adjusted Return";
        else if (sharpe < 1.0) sharpeEval = "อยู่ในระดับปานกลาง สามารถพิจารณาปรับพอร์ตเพื่อเพิ่มประสิทธิภาพได้";

        let riskEval = "ความผันผวนต่ำ เน้นการปกป้องเงินต้นเป็นหลัก";
        if (this.state.currentSd > 15) riskEval = "ความผันผวนสูงมาก เน้นการเติบโตเชิงรุก (Aggressive Growth)";
        else if (this.state.currentSd > 8) riskEval = "ความผันผวนปานกลาง เน้นการเติบโตอย่างสมดุล (Moderate Growth)";

        // ดึงภาพกราฟ (รับประกันความคมชัดและไม่แตก)
        const allocCanvas = document.getElementById('ps_chart_allocation');
        const growthCanvas = document.getElementById('ps_chart_growth');
        const allocChartImg = allocCanvas ? allocCanvas.toDataURL('image/png', 1.0) : '';
        const growthChartImg = growthCanvas ? growthCanvas.toDataURL('image/png', 1.0) : '';

        let assetTableRows = '';
        this.state.assets.forEach(item => {
            let pct = ((item.val / this.state.totalWealth) * 100).toFixed(1);
            let aClass = this.MPT_Engine.mapAssetClass(item.name);
            const classNamesTh = { 'Cash': 'สภาพคล่อง', 'Bond': 'ตราสารหนี้', 'EquityTH': 'หุ้นไทย', 'EquityGlobal': 'หุ้นต่างประเทศ', 'Alt': 'ทางเลือก' };
            assetTableRows += `
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${item.name}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #475569;">${classNamesTh[aClass]}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold; color: #2563eb;">${item.val.toLocaleString('th-TH')}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #1e293b;">${pct}%</td>
                </tr>
            `;
        });

        const rebalanceGuideHtml = document.getElementById('ps_rebalance_guide') ? document.getElementById('ps_rebalance_guide').innerHTML : '';
        const projectionTableHtml = document.getElementById('ps_projection_table_body') ? document.getElementById('ps_projection_table_body').innerHTML : '';

        const printContainer = document.createElement('div');
        printContainer.id = 'formal_print_document';
        
        printContainer.innerHTML = `
            <style>
                @media print {
                    body > *:not(#formal_print_document) { display: none !important; }
                    @page { size: A4 landscape; margin: 12mm; }
                    body { background: white; margin: 0; padding: 0; font-family: 'Prompt', sans-serif; color: #0f172a; }
                    #formal_print_document { display: block !important; position: absolute; top: 0; left: 0; width: 100%; }
                    .page-break { page-break-before: always; break-before: page; }
                    .avoid-break { page-break-inside: avoid; break-inside: avoid; }
                    .report-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin-bottom: 15px; background-color: #f8fafc !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .chart-img { max-width: 100%; height: 240px; object-fit: contain; margin: 0 auto; display: block; }
                    table { width: 100%; border-collapse: collapse; font-size: 10pt; }
                    th { background-color: #f1f5f9 !important; -webkit-print-color-adjust: exact; padding: 8px; border-bottom: 2px solid #cbd5e1; text-align: left; color: #475569; }
                    td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; }
                    h2, h3 { color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #bfdbfe; padding-bottom: 5px; font-size: 12pt; }
                    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; align-items: start; }
                }
            </style>

            <div style="text-align: center; margin-bottom: 15px;">
                <h1 style="font-size: 18pt; color: #1e3a8a; margin-bottom: 5px;">รายงานวิเคราะห์พอร์ตการลงทุนเชิงลึก (Comprehensive Portfolio Analysis)</h1>
                <p style="color: #64748b; font-size: 10pt; margin: 0;">วิเคราะห์ตามมาตรฐาน Modern Portfolio Theory (MPT) | พิมพ์เมื่อ: ${new Date().toLocaleString('th-TH')}</p>
            </div>

            <div class="grid-2">
                <div class="report-box avoid-break">
                    <h3>📊 บทสรุปผู้บริหาร (Executive Summary)</h3>
                    <div style="background: #eff6ff !important; padding: 15px; border-radius: 6px; margin-bottom: 12px; text-align: center; border: 1px solid #bfdbfe;">
                        <span style="font-size: 10pt; color: #475569;">มูลค่าพอร์ตการลงทุนรวม (AUM)</span><br>
                        <span style="font-size: 26pt; font-weight: 900; color: #1d4ed8;">${aum} ฿</span>
                    </div>
                    <p style="font-size: 10pt; line-height: 1.6; margin-bottom: 5px;">
                        พอร์ตการลงทุนปัจจุบันมีผลตอบแทนคาดหวังเฉลี่ย <b>${roi}% ต่อปี</b> ภายใต้ระดับความเสี่ยง (SD) ที่ <b>${sd}%</b> ถือเป็นพอร์ตที่มี${riskEval}
                    </p>
                    <p style="font-size: 10pt; line-height: 1.6; margin-top: 5px;">
                        อัตราส่วน Sharpe Ratio อยู่ที่ <b>${sharpe}</b> ซึ่ง${sharpeEval}
                    </p>
                </div>
                
                <div class="report-box avoid-break">
                    <h3 style="text-align: center;">สัดส่วนพอร์ตปัจจุบัน (Asset Allocation)</h3>
                    <img src="${allocChartImg}" class="chart-img" />
                </div>
            </div>

            <div class="report-box avoid-break">
                <h3>🤖 คำแนะนำการปรับพอร์ต (AI Strategic Rebalancing)</h3>
                <div style="font-size: 10pt; color: #334155;">${rebalanceGuideHtml}</div>
            </div>

            <div class="page-break"></div>

            <div class="grid-2">
                <div class="report-box avoid-break">
                    <h3 style="text-align: center;">📈 กราฟจำลองการเติบโต 10 ปี (Monte Carlo)</h3>
                    <img src="${growthChartImg}" class="chart-img" style="max-height: 250px;" />
                </div>
                
                <div class="report-box avoid-break">
                    <h3>ตารางจำลองการเติบโต 10 ปี</h3>
                    <table>
                        <thead>
                            <tr>
                                <th style="text-align: center;">สิ้นปีที่</th>
                                <th style="text-align: right; color: #059669;">ดีเยี่ยม (Top 10%)</th>
                                <th style="text-align: right; color: #2563eb;">คาดหวัง (Expected)</th>
                                <th style="text-align: right; color: #e11d48;">เลวร้าย (Bottom 10%)</th>
                            </tr>
                        </thead>
                        <tbody>${projectionTableHtml}</tbody>
                    </table>
                </div>
            </div>

            <div class="report-box avoid-break">
                <h3>📝 รายละเอียดสินทรัพย์ในพอร์ต (Assets Breakdown)</h3>
                <table>
                    <thead>
                        <tr>
                            <th>สินทรัพย์ / กองทุน</th>
                            <th style="text-align: center;">Asset Class</th>
                            <th style="text-align: right;">มูลค่า (บาท)</th>
                            <th style="text-align: right;">สัดส่วน (%)</th>
                        </tr>
                    </thead>
                    <tbody>${assetTableRows}</tbody>
                </table>
            </div>
            
            <div style="text-align: center; font-size: 8pt; color: #94a3b8; margin-top: 15px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                เอกสารฉบับนี้สร้างโดยระบบ Enterprise Wealth Simulator เพื่อใช้เป็นแนวทางประกอบการพิจารณาเท่านั้น ไม่สามารถรับประกันผลตอบแทนในอนาคตได้ 100%
            </div>
        `;

        document.body.appendChild(printContainer);
        
        // ให้เวลาเบราว์เซอร์รับ Canvas Base64 แป๊บนึง
        setTimeout(() => {
            window.print();
            printContainer.remove();
        }, 500);
    },

    // ==========================================
    // 🎨 5. RENDERERS FOR TABS (OVERVIEW, GOALS, RETIRE)
    // ==========================================
    
    renderOverview: function() {
        const sharpe = this.state.currentSd > 0 ? ((this.state.currentRoi - 2) / this.state.currentSd).toFixed(2) : "0.00";
        let sharpeText = "ดีเยี่ยม"; let sharpeColor = "text-emerald-600";
        if(Number(sharpe) < 0.5) { sharpeText = "ควรปรับปรุง"; sharpeColor = "text-rose-500"; }
        else if(Number(sharpe) < 1.0) { sharpeText = "ปานกลาง"; sharpeColor = "text-amber-500"; }

        document.getElementById('ps_summary_cards').innerHTML = `
            <div class="bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
                <div class="text-[10px] md:text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider">AUM ปัจจุบัน</div>
                <div class="text-lg md:text-xl font-black text-blue-700">${this.state.totalWealth.toLocaleString('th-TH')} ฿</div>
            </div>
            <div class="bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                <div class="text-[10px] md:text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider">คาดหวัง E(Rp)</div>
                <div class="text-lg md:text-xl font-black text-emerald-600">${this.state.currentRoi.toFixed(2)}%</div>
            </div>
            <div class="bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-orange-500 relative">
                <div class="text-[10px] md:text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider">Risk (SD)</div>
                <div class="text-lg md:text-xl font-black text-orange-600">${this.state.currentSd.toFixed(2)}%</div>
                <div class="absolute top-2 right-2 text-[9px] bg-orange-100 text-orange-700 px-1 rounded border border-orange-200 hidden md:block">MPT</div>
            </div>
            <div class="bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-purple-500">
                <div class="text-[10px] md:text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider flex justify-between">
                    Sharpe Ratio <span class="${sharpeColor} ml-1">${sharpeText}</span>
                </div>
                <div class="text-lg md:text-xl font-black text-purple-600">${sharpe}</div>
            </div>
        `;

        if(this.charts.alloc) this.charts.alloc.destroy();
        let cTotals = { 'Cash': 0, 'Bond': 0, 'EquityTH': 0, 'EquityGlobal': 0, 'Alt': 0 };
        let cLabels = { 'Cash': 'สภาพคล่อง', 'Bond': 'ตราสารหนี้', 'EquityTH': 'หุ้นไทย', 'EquityGlobal': 'หุ้นตปท.', 'Alt': 'ทางเลือก' };
        let cColors = { 'Cash': '#60a5fa', 'Bond': '#34d399', 'EquityTH': '#fbbf24', 'EquityGlobal': '#818cf8', 'Alt': '#f43f5e' };
        
        this.state.assets.forEach(a => cTotals[this.MPT_Engine.mapAssetClass(a.name)] += a.val);
        
        let pLabels = [], pData = [], pColors = [];
        for(let c in cTotals) if(cTotals[c] > 0) { pLabels.push(cLabels[c]); pData.push(cTotals[c]); pColors.push(cColors[c]); }

        this.charts.alloc = new Chart(document.getElementById('ps_chart_allocation').getContext('2d'), {
            type: 'doughnut',
            data: { labels: pLabels, datasets: [{ data: pData, backgroundColor: pColors, borderWidth: 2, borderColor: '#fff' }] },
            options: { animation: false, responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'right', labels: {font:{family:'Prompt', size: 10}} }, datalabels: { display:false } } }
        });

        if(this.charts.growth) this.charts.growth.destroy();
        let sim = this.MonteCarlo_Engine.runSimulation(this.state.totalWealth, this.state.monthlySaving * 12, this.state.currentRoi, this.state.currentSd, 10);
        let labels = Array.from({length: 11}, (_, i) => `ปี ${i}`);
        
        let projTableHtml = '';
        for(let i = 0; i <= 10; i++) {
            projTableHtml += `
                <tr class="hover:bg-slate-50 transition-colors">
                    <td class="p-2 md:p-3 text-center font-medium text-slate-800">${i === 0 ? 'ปัจจุบัน' : i}</td>
                    <td class="p-2 md:p-3 text-emerald-600 font-medium">${(sim.best[i] || 0).toLocaleString('th-TH', {maximumFractionDigits: 0})} ฿</td>
                    <td class="p-2 md:p-3 text-blue-600 font-bold">${(sim.exp[i] || 0).toLocaleString('th-TH', {maximumFractionDigits: 0})} ฿</td>
                    <td class="p-2 md:p-3 text-rose-600 font-medium">${(sim.worst[i] || 0).toLocaleString('th-TH', {maximumFractionDigits: 0})} ฿</td>
                </tr>
            `;
        }
        document.getElementById('ps_projection_table_body').innerHTML = projTableHtml;

        this.charts.growth = new Chart(document.getElementById('ps_chart_growth').getContext('2d'), {
            type: 'line',
            data: { labels: labels, datasets: [
                { label: 'กรณีดีเยี่ยม (Top 10%)', data: sim.best, borderColor: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderWidth: 1, borderDash: [5,5], fill: '+1', pointRadius: 0, pointHitRadius: 10 },
                { label: 'ผลตอบแทนคาดหวัง', data: sim.exp, borderColor: '#3b82f6', borderWidth: 2, fill: false, pointRadius: 2, pointBackgroundColor: '#fff', pointHitRadius: 10 },
                { label: 'กรณีเลวร้าย (Bottom 10%)', data: sim.worst, borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.1)', borderWidth: 1, borderDash: [5,5], fill: '-1', pointRadius: 0, pointHitRadius: 10 }
            ]},
            options: { 
                animation: false, responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, font: { family: 'Prompt', size: 10 } } }, datalabels: { display: false }, tooltip: { callbacks: { label: function(c) { return c.dataset.label + ': ' + Number(c.raw).toLocaleString('th-TH', {maximumFractionDigits: 0}) + ' ฿'; } } } },
                scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Prompt', size: 10 }, callback: function(value) { return (value/1000000).toFixed(1) + 'M'; } } }, x: { grid: { display: false }, ticks: { font: { family: 'Prompt', size: 10 } } } }
            }
        });

        // --- AI Rebalancing ---
        let yearsToRetire = Math.max(1, this.state.retAge - this.state.age);
        let modelPort = this.AI_Advisor.getModelPortfolio(yearsToRetire);
        let rebalanceHtml = `<div class="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 mb-4">`;
        let actionRequired = false;

        Object.keys(cTotals).forEach(key => {
            let currentPct = this.state.totalWealth > 0 ? (cTotals[key] / this.state.totalWealth) * 100 : 0;
            let targetPct = modelPort[key];
            let diff = currentPct - targetPct;
            
            let status = "สมดุลแล้ว"; let color = "text-slate-500"; let actionText = "-";
            
            if (diff > 5) { status = "มากเกินไป"; color = "text-rose-500"; actionText = `ลดลง ${(diff).toFixed(0)}%`; actionRequired = true; }
            else if (diff < -5) { status = "น้อยเกินไป"; color = "text-amber-500"; actionText = `เพิ่มอีก ${Math.abs(diff).toFixed(0)}%`; actionRequired = true; }

            let recommendedFunds = this.AI_Advisor.instruments[key];
            let fundSuggestion = recommendedFunds[Math.floor(Math.random() * recommendedFunds.length)];

            rebalanceHtml += `
                <div class="bg-white p-2 md:p-3 rounded-lg border border-slate-200 text-center flex flex-col justify-between">
                    <div class="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase mb-1 truncate" title="${cLabels[key]}">${cLabels[key]}</div>
                    <div class="text-sm md:text-lg font-black text-slate-800">${currentPct.toFixed(0)}% <span class="text-[10px] md:text-xs font-normal text-slate-400">-> ${targetPct}%</span></div>
                    <div class="text-[9px] md:text-[10px] font-bold mt-1 ${color}">${status}</div>
                    <div class="mt-2 pt-2 border-t border-slate-100 text-[9px] md:text-[10px] text-indigo-600 leading-tight">
                        <b>Action:</b> ${actionText}<br>
                        <span class="text-slate-500 mt-1 block italic">${diff < -5 ? `แนะนำ: ${fundSuggestion}` : ''}</span>
                    </div>
                </div>
            `;
        });
        rebalanceHtml += `</div>`;

        if(actionRequired) {
            rebalanceHtml += `
                <div class="bg-amber-50 border-l-4 border-amber-500 p-3 rounded text-xs md:text-sm text-amber-800 shadow-sm">
                    <b>💡 AI Recommendation:</b> พอร์ตของคุณยังไม่สอดคล้องกับระยะเวลาลงทุนที่เหลือ (${yearsToRetire} ปี) แนะนำให้ทำการ <b>Rebalance</b> เพื่อปรับสมดุลตามกรอบด้านบน โดยอาจใช้วิธีนำเงินออมใหม่ (DCA) ไปซื้อเพิ่มในหมวดที่ "น้อยเกินไป" แทนการสับเปลี่ยนเพื่อหลีกเลี่ยงค่าธรรมเนียมครับ
                </div>
            `;
        } else {
            rebalanceHtml += `
                <div class="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded text-xs md:text-sm text-emerald-800 shadow-sm">
                    <b>✅ AI Verification:</b> ยอดเยี่ยมมากครับ! สัดส่วนพอร์ตของคุณอยู่ในเกณฑ์สมดุล สอดคล้องกับเป้าหมายเกษียณ (Strategic Asset Allocation) แนะนำให้รักษาวินัยการลงทุนตามเดิมต่อไปครับ
                </div>
            `;
        }
        document.getElementById('ps_rebalance_guide').innerHTML = rebalanceHtml;

        let aTableHtml = '';
        this.state.assets.forEach(item => {
            let pct = ((item.val / this.state.totalWealth) * 100).toFixed(1);
            let aClass = this.MPT_Engine.mapAssetClass(item.name);
            aTableHtml += `
                <tr class="hover:bg-slate-50 transition-colors">
                    <td class="p-2 md:p-3 font-medium text-slate-800 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full flex-shrink-0 ${aClass === 'Cash' ? 'bg-blue-400' : (aClass === 'Bond' ? 'bg-emerald-400' : (aClass.includes('Equity') ? 'bg-indigo-500' : 'bg-rose-500'))}"></span>
                        <span class="truncate max-w-[120px] md:max-w-none" title="${item.name}">${item.name}</span>
                    </td>
                    <td class="p-2 md:p-3 text-center text-[10px] md:text-xs text-gray-500 bg-gray-50">${cLabels[aClass]}</td>
                    <td class="p-2 md:p-3 text-right text-blue-600 font-bold">${item.val.toLocaleString('th-TH')}</td>
                    <td class="p-2 md:p-3 text-right font-medium">${pct}%</td>
                    <td class="p-2 md:p-3 text-center text-green-600 font-semibold">${(item.roi || 0).toFixed(2)}%</td>
                </tr>
            `;
        });
        document.getElementById('ps_asset_table_body').innerHTML = aTableHtml;
    },

    renderGoals: function() {
        let container = document.getElementById('ps_goals_container');
        if (this.state.goals.length === 0) {
            container.innerHTML = `<div class="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">ไม่มีข้อมูลเป้าหมายทางการเงินจากหน้าหลัก</div>`;
            return;
        }

        let html = '';
        this.state.goals.forEach(g => {
            let futureValCurrent = this.state.totalWealth * Math.pow(1 + this.state.currentRoi/100, g.years);
            let neededFromDCA = g.amount - futureValCurrent;
            let isSuccess = neededFromDCA <= 0; 
            
            let requiredDCA = 0;
            if (!isSuccess) {
                let rateMonthly = (this.state.currentRoi/100) / 12;
                let nMonths = g.years * 12;
                if (rateMonthly > 0) requiredDCA = (neededFromDCA * rateMonthly) / (Math.pow(1 + rateMonthly, nMonths) - 1);
                else requiredDCA = neededFromDCA / nMonths;
            }

            let status = isSuccess ? '✅ พอร์ตปัจจุบันเพียงพอ' : '⚠️ ต้องออมเพิ่มหรือปรับสัดส่วน';
            let color = isSuccess ? 'emerald' : 'orange';
            let advice = g.years < 3 ? "เน้นสภาพคล่อง (Cash/Bond 80%)" : (g.years < 7 ? "พอร์ตสมดุล (Equity 40-60%)" : "พอร์ตเติบโต (Equity > 70%)");

            html += `
                <div class="border border-${color}-200 bg-${color}-50/30 p-4 md:p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition">
                    <div class="w-full md:w-1/2">
                        <h4 class="font-bold text-slate-800 text-base md:text-lg flex items-center gap-2">🎯 ${g.name}</h4>
                        <div class="text-xs md:text-sm text-slate-600 mt-2">
                            เป้าหมาย: <b class="text-slate-800">${g.amount.toLocaleString('th-TH')} ฿</b><br>
                            ระยะเวลา: <b class="text-slate-800">${g.years} ปี</b>
                        </div>
                        <div class="text-[10px] md:text-xs text-${color}-700 font-bold mt-3 bg-white px-3 py-1.5 inline-block rounded shadow-sm border border-${color}-100">
                            ${status}
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 text-right bg-white p-4 rounded-xl border shadow-sm flex flex-col justify-center">
                        ${isSuccess 
                            ? `<div class="text-emerald-600 font-bold text-xs md:text-sm">เงินทุนตั้งต้นก้อนนี้สามารถเติบโตถึงเป้าหมายได้โดยไม่ต้องออมเพิ่ม</div>` 
                            : `<div class="text-[10px] md:text-xs text-slate-500 mb-1">เงินที่ต้องออมเพิ่ม (DCA) เพื่อถึงเป้าหมาย</div>
                               <div class="text-xl md:text-2xl font-black text-rose-500 mb-1">${requiredDCA.toLocaleString('th-TH', {maximumFractionDigits:0})} ฿<span class="text-xs md:text-sm font-normal text-slate-400">/เดือน</span></div>`
                        }
                        <div class="pt-3 border-t border-slate-100 mt-2">
                            <div class="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">AI Asset Allocation Guide</div>
                            <div class="text-xs md:text-sm font-bold text-indigo-600">${advice}</div>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    },

    renderRetirement: function() {
        let yearsToRetire = Math.max(0, this.state.retAge - this.state.age);
        let yearsInRetire = Math.max(1, this.state.lifeExp - this.state.retAge);
        
        let accumSim = this.MonteCarlo_Engine.runSimulation(this.state.totalWealth, this.state.monthlySaving * 12, this.state.currentRoi, this.state.currentSd, yearsToRetire, false);
        let wealthAtRetire = accumSim.exp[accumSim.exp.length - 1]; 
        
        let postRetRoi = Math.max(2, this.state.currentRoi * 0.8);
        let postRetSd = Math.max(3, this.state.currentSd * 0.7); 
        let retSim = this.MonteCarlo_Engine.runSimulation(wealthAtRetire, this.state.retExpense * 12, postRetRoi, postRetSd, yearsInRetire, true, this.state.inflation/100);

        let depleteYear = yearsInRetire;
        for(let i=0; i<retSim.worst.length; i++) {
            if (retSim.worst[i] <= 0) { depleteYear = i; break; }
        }
        let depleteAge = this.state.retAge + depleteYear;

        document.getElementById('ps_ret_init').innerText = `${wealthAtRetire.toLocaleString('th-TH', {maximumFractionDigits:0})} ฿`;
        document.getElementById('ps_ret_draw').innerText = `${(this.state.retExpense*12).toLocaleString('th-TH')} ฿/ปี`;
        document.getElementById('ps_ret_inf').innerText = `${this.state.inflation}% / ปี`;
        
        const depleteEl = document.getElementById('ps_ret_deplete');
        if (depleteAge >= this.state.lifeExp) {
            depleteEl.innerText = 'รอดตาย (ถึงอายุขัย)';
            depleteEl.className = 'text-lg md:text-xl font-black text-emerald-400';
            document.getElementById('ps_ret_insight').innerHTML = `<span class="text-emerald-600 font-bold text-xs md:text-sm">✅ ปลอดภัย: พอร์ตนี้ทนทานต่อวิกฤตเศรษฐกิจ (Sequence of Returns Risk) ได้ดีเยี่ยม เงินจะพอใช้ไปตลอดชีวิตขัย</span>`;
        } else {
            depleteEl.innerText = `${depleteAge} ปี`;
            depleteEl.className = 'text-lg md:text-xl font-black text-rose-400';
            document.getElementById('ps_ret_insight').innerHTML = `<span class="text-rose-600 font-bold text-xs md:text-sm">🚨 อันตราย: หากเจอตลาดหมีช่วงต้นเกษียณ เงินจะหมดตอนอายุ ${depleteAge} ปี ควรพิจารณาลดรายจ่าย หรือออมเพิ่มตั้งแต่ตอนนี้</span>`;
        }

        if(this.charts.retire) this.charts.retire.destroy();
        let labels = Array.from({length: yearsInRetire+1}, (_, i) => `อายุ ${this.state.retAge + i}`);
        
        this.charts.retire = new Chart(document.getElementById('ps_chart_retire').getContext('2d'), {
            type: 'line',
            data: { labels: labels, datasets: [
                { label: 'กรณีดีเยี่ยม (Top 10%)', data: retSim.best, borderColor: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderWidth: 1, borderDash: [5,5], fill: '+1', pointRadius: 0, pointHitRadius: 10 },
                { label: 'คาดการณ์ปกติ (Expected)', data: retSim.exp, borderColor: '#3b82f6', borderWidth: 2, fill: false, pointRadius: 2, pointBackgroundColor: '#fff', pointHitRadius: 10 },
                { label: 'โชคร้ายเจอวิกฤต (Bottom 10%)', data: retSim.worst, borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.1)', borderWidth: 1, borderDash: [5,5], fill: '-1', pointRadius: 0, pointHitRadius: 10 }
            ]},
            options: { 
                animation: false, responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, font: { family: 'Prompt', size: 10 } } }, datalabels: { display: false }, tooltip: { callbacks: { label: function(c) { return c.dataset.label + ': ' + Number(c.raw).toLocaleString('th-TH', {maximumFractionDigits: 0}) + ' ฿'; } } } },
                scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Prompt', size: 10 }, callback: function(value) { return (value/1000000).toFixed(1) + 'M'; } } }, x: { grid: { display: false }, ticks: { font: { family: 'Prompt', size: 10 } } } }
            }
        });
    },

    updateSandbox: function() {
        let wEq = Number(document.getElementById('ps_sb_alloc').value);
        let wBd = 100 - wEq;
        let dca = Number(document.getElementById('ps_sb_dca').value);
        let yrs = Number(document.getElementById('ps_sb_yr').value);

        document.getElementById('ps_sb_eq_val').innerText = wEq;
        document.getElementById('ps_sb_bd_val').innerText = wBd;
        document.getElementById('ps_sb_dca_val').innerText = dca.toLocaleString('th-TH');
        document.getElementById('ps_sb_yr_val').innerText = yrs;

        let simRoi = ((wEq/100) * 10) + ((wBd/100) * 3);
        let simSd = this.MPT_Engine.calcHypotheticalSD(wEq/100, wBd/100, 15, 2, -0.2);

        document.getElementById('ps_sb_res_roi').innerText = simRoi.toFixed(2) + '%';
        document.getElementById('ps_sb_res_sd').innerText = simSd.toFixed(2) + '%';

        let sim = this.MonteCarlo_Engine.runSimulation(this.state.totalWealth, dca * 12, simRoi, simSd, yrs);
        
        if(this.charts.sandbox) this.charts.sandbox.destroy();
        let labels = Array.from({length: yrs+1}, (_, i) => `ปี ${i}`);
        
        this.charts.sandbox = new Chart(document.getElementById('ps_chart_sandbox').getContext('2d'), {
            type: 'line',
            data: { labels: labels, datasets: [
                { label: 'พอร์ตดีเยี่ยม (Top 10%)', data: sim.best, borderColor: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderWidth: 1, borderDash: [5,5], fill: '+1', pointRadius: 0, pointHitRadius: 10 },
                { label: 'พอร์ตคาดหวัง (Expected)', data: sim.exp, borderColor: '#8b5cf6', borderWidth: 2, fill: false, pointRadius: 2, pointBackgroundColor: '#fff', pointHitRadius: 10 },
                { label: 'พอร์ตเลวร้าย (Bottom 10%)', data: sim.worst, borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.1)', borderWidth: 1, borderDash: [5,5], fill: '-1', pointRadius: 0, pointHitRadius: 10 }
            ]},
            options: { 
                animation: false, responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, font: { family: 'Prompt', size: 10 } } }, datalabels: { display: false }, tooltip: { callbacks: { label: function(c) { return c.dataset.label + ': ' + Number(c.raw).toLocaleString('th-TH', {maximumFractionDigits: 0}) + ' ฿'; } } } },
                scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Prompt', size: 10 }, callback: function(value) { return (value/1000000).toFixed(1) + 'M'; } } }, x: { grid: { display: false }, ticks: { font: { family: 'Prompt', size: 10 } } } }
            }
        });
    }
};

window.PortfolioSimulator = PortfolioSimulator;