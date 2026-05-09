// =====================================================================
// 🧠 AiDAPC MODULE (AI Deep Analysis & Prediction Center)
// สถาปัตยกรรม: AI/ML Core Diagnostics Engine (White-box Dashboard) v5.1 Ultimate (Bug Fixed)
// อัปเดต: Full Payload, 3D Risk Gap, Real AIA Product Matrix & Premium Calculator
// =====================================================================

window.AIControlCenter = {
    windowRef: null,

    syncToMainSystem: function(diagnosticsData) {
        try {
            localStorage.setItem('AIDAPC_RESULT_BRIDGE', JSON.stringify(diagnosticsData));
            if (this.windowRef && this.windowRef.opener) {
                this.windowRef.opener.postMessage({ type: 'AIDAPC_DIAGNOSTICS_RESULT', payload: diagnosticsData }, '*');
            }
            console.log("🟢 [AiDAPC] ส่งผลลัพธ์การวิเคราะห์กลับสำเร็จ");
        } catch (e) {
            console.error("ส่งข้อมูลกลับล้มเหลว", e);
        }
    },

    open: function() {
        if (typeof crmClientsList !== 'undefined' && crmClientsList.length > 0) {
            try {
                localStorage.setItem('AIDAPC_TEMP_BRIDGE', JSON.stringify(crmClientsList));
                console.log("✅ สะพานข้อมูล CRM พร้อมใช้งาน!");
            } catch (err) {
                alert("🚨 ข้อมูลลูกค้ามีขนาดใหญ่เกินไป ไม่สามารถส่งไปวิเคราะห์ได้");
                return;
            }
        } else {
            alert("⚠️ กรุณาเพิ่มข้อมูลลูกค้า หรือรอให้ระบบ CRM โหลดข้อมูลเสร็จสิ้นก่อนเปิด AiDAPC ครับ");
            return;
        }

        if (this.windowRef && !this.windowRef.closed) {
            this.windowRef.focus();
            return;
        }

        this.windowRef = window.open('', '_blank');
        if (!this.windowRef) {
            alert("⚠️ เบราว์เซอร์บล็อกหน้าต่างใหม่ กรุณาอนุญาต Pop-up ครับ");
            return;
        }

        const htmlContent = `<!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AiDAPC - Executive FA Diagnostics V5.0</title>
            <script src="https://cdn.tailwindcss.com"><\/script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&family=Prompt:wght@300;400;600;700&display=swap');
                body { font-family: 'Prompt', sans-serif; background-color: #020617; color: #f8fafc; overflow-x: hidden; }
                .code-font { font-family: 'JetBrains Mono', monospace; }
                .glass-panel { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(51, 65, 85, 0.8); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5); }
                
                .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
                
                .card-header { border-bottom: 1px solid rgba(51, 65, 85, 0.8); padding-bottom: 0.5rem; margin-bottom: 0.75rem; }
                @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                .status-dot { height: 8px; width: 8px; background-color: #10b981; border-radius: 50%; display: inline-block; animation: pulse-slow 2s infinite; }
                .text-xxs { font-size: 0.65rem; line-height: 1rem; }
                
                html, body { height: auto; min-height: 100vh; }
            </style>
        </head>
        <body class="flex flex-col custom-scrollbar">

            <header class="sticky top-0 shrink-0 flex justify-between items-center px-6 py-4 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 z-50 shadow-xl">
                <div class="flex items-center gap-4">
                    <div class="text-3xl drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">🧠</div>
                    <div>
                        <h1 class="text-lg font-bold text-white tracking-wide uppercase flex items-center gap-2">
                            AiDAPC <span class="text-slate-400 text-sm normal-case">| Executive AI Diagnostics V5.0</span> <span class="status-dot ml-2" id="db_status_dot"></span>
                        </h1>
                        <div class="flex items-center gap-2 mt-1">
                            <input type="text" id="client_search" onkeyup="window.filterClientDropdown()" placeholder="🔍 ค้นหาชื่อ..." class="text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none w-28 placeholder-slate-500">
                            <select id="sb_crm_selector" onchange="window.resetDashboardUI()" class="text-xs bg-slate-800 text-cyan-300 border border-slate-600 rounded px-2 py-1 outline-none cursor-pointer min-w-[200px] max-w-[250px]">
                                <option value="">⏳ กำลังเชื่อมต่อ Database...</option>
                            </select>
                            <button onclick="window.initCRMSelector()" class="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded transition">🔄 Sync DB</button>
                        </div>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button onclick="window.runFullDiagnostics()" id="btn_execute" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center gap-2 disabled:opacity-50">
                        <span>▶️</span> Execute All AI Engines
                    </button>
                    <button onclick="if(window.opener){window.opener.focus();} window.close();" class="bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/50 px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2">
                        ❌ ปิดหน้าต่าง
                    </button>
                </div>
            </header>

            <main class="flex-1 p-6 max-w-[1600px] mx-auto w-full space-y-8 pb-20">
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col h-64">
                        <div class="card-header flex justify-between items-center shrink-0">
                            <h2 class="text-sm font-bold text-blue-400 uppercase tracking-wider">📥 1. Full Ingested Data</h2>
                            <span class="text-[9px] bg-blue-900/30 px-2 py-0.5 rounded text-blue-300 border border-blue-500/30">100% Payload</span>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 text-[10px] md:text-xs code-font text-slate-300 overflow-y-auto custom-scrollbar border border-slate-800 shadow-inner">
                            <pre id="log_input_data" class="whitespace-pre-wrap"><span class="text-slate-500 italic">รอข้อมูล Full Payload (Smart Goals, Assets, Ins) จาก API...</span></pre>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col h-64">
                        <div class="card-header flex justify-between items-center shrink-0">
                            <h2 class="text-sm font-bold text-pink-400 uppercase tracking-wider">💬 2. NLP Sentiment Analysis</h2>
                            <span class="text-[9px] bg-pink-900/30 px-2 py-0.5 rounded text-pink-300 border border-pink-500/30">Text Intent</span>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 border border-slate-800 text-xs text-slate-300 flex flex-col gap-2 overflow-hidden">
                            <p class="text-[10px] text-slate-500 font-bold uppercase shrink-0">FA Notes / Client Chat:</p>
                            <div id="log_nlp_text" class="italic text-slate-400 flex-1 leading-relaxed overflow-y-auto custom-scrollbar">รอการอ่านข้อความ...</div>
                            <div class="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center shrink-0">
                                <span class="text-slate-400">Financial Anxiety:</span>
                                <span id="log_nlp_score" class="font-bold text-pink-400 code-font">--%</span>
                            </div>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col h-64">
                        <div class="card-header flex justify-between items-center shrink-0">
                            <h2 class="text-sm font-bold text-teal-400 uppercase tracking-wider">🚨 3. Outlier & Confidence</h2>
                            <span class="text-[9px] bg-teal-900/30 px-2 py-0.5 rounded text-teal-300 border border-teal-500/30">Data Drift</span>
                        </div>
                        <div class="flex-1 flex flex-col justify-center gap-3 bg-slate-900/50 rounded-lg p-4 border border-slate-800 overflow-y-auto custom-scrollbar">
                            <div class="shrink-0">
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="text-slate-400">AI Model Confidence</span>
                                    <span id="log_conf_score" class="font-bold text-teal-400 code-font">--%</span>
                                </div>
                                <div class="w-full bg-slate-800 rounded-full h-1.5"><div id="bar_conf" class="bg-teal-500 h-1.5 rounded-full transition-all duration-1000" style="width: 0%"></div></div>
                            </div>
                            <div class="bg-slate-900 p-2 rounded border border-slate-700 text-[11px] leading-relaxed" id="log_outlier_warning">
                                <p class="text-slate-500 italic text-center mt-4">รอตรวจสอบความผิดปกติของข้อมูลและให้คำอธิบาย...</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col min-h-[300px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-purple-400 uppercase tracking-wider">🧠 4. Deep Learning Core</h2>
                            <span class="text-[9px] bg-purple-900/30 px-2 py-0.5 rounded text-purple-300 border border-purple-500/30">Survival Prob.</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center bg-slate-800/50 rounded-lg p-4 border border-slate-700 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent"></div>
                            <div class="text-center z-10 w-full">
                                <p class="text-5xl font-black text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" id="log_nn_score">--%</p>
                                <p class="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Base Success Probability</p>
                                <div class="mt-4 bg-slate-900 p-2 rounded border border-slate-700 text-[11px] text-purple-200" id="log_nn_desc">
                                    <span class="text-slate-500 italic">รอวิเคราะห์โครงสร้างความสำเร็จพื้นฐาน...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col min-h-[300px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-cyan-400 uppercase tracking-wider">🔍 5. XAI Feature Drivers</h2>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 text-xs text-slate-300 overflow-y-auto custom-scrollbar border border-slate-800 space-y-2" id="log_xai_drivers">
                            <p class="text-slate-500 italic code-font text-center mt-10">รอสกัด XAI Perturbation และคำอธิบายเชิงลึก...</p>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col min-h-[300px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-amber-400 uppercase tracking-wider">🎯 6. Counterfactual Path</h2>
                            <span class="text-[9px] bg-amber-900/30 px-2 py-0.5 rounded text-amber-300 border border-amber-500/30">"What-If" AI</span>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 border border-slate-800 flex flex-col gap-2">
                            <p class="text-[10px] text-slate-400 font-bold">จำลองเส้นทางทางเลือก (Positive/Negative Impacts):</p>
                            <div id="log_counterfactual" class="space-y-2 mt-1 overflow-y-auto custom-scrollbar flex-1">
                                <p class="text-slate-500 italic text-xs text-center mt-10">รอจำลองเส้นทางทางเลือก...</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    
                    <div class="glass-panel rounded-xl p-5 xl:col-span-1 flex flex-col min-h-[350px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-orange-400 uppercase tracking-wider">🛒 7. 3D Risk Gap & AIA Product Matrix</h2>
                            <span class="text-[9px] bg-orange-900/30 px-2 py-0.5 rounded text-orange-300 border border-orange-500/30">Smart Allocation</span>
                        </div>
                        <div class="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                            
                            <div class="grid grid-cols-3 gap-2">
                                <div class="bg-slate-900 p-2 rounded border border-slate-700 text-center">
                                    <p class="text-[9px] text-slate-400 uppercase">Emergency Gap</p>
                                    <p class="text-sm font-bold text-yellow-400" id="gap_emergency">฿0</p>
                                </div>
                                <div class="bg-slate-900 p-2 rounded border border-slate-700 text-center">
                                    <p class="text-[9px] text-slate-400 uppercase">Life/Family Gap</p>
                                    <p class="text-sm font-bold text-blue-400" id="gap_life">฿0</p>
                                </div>
                                <div class="bg-slate-900 p-2 rounded border border-slate-700 text-center">
                                    <p class="text-[9px] text-slate-400 uppercase">Health/CI Gap</p>
                                    <p class="text-sm font-bold text-pink-400" id="gap_health">฿0</p>
                                </div>
                            </div>
                            
                            <div class="flex-1 flex flex-col">
                                <p class="text-[10px] text-slate-400 mb-2 font-bold">AIA Recommended Portfolio & Premium Allocation:</p>
                                <div id="log_recommender" class="space-y-2">
                                    <div class="bg-slate-800/80 rounded p-4 border border-slate-700">
                                        <p class="italic text-slate-500 text-xs text-center">รอคำนวณส่วนขาดและดึงข้อมูลโปรดักส์...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="xl:col-span-1 flex flex-col gap-6">
                        
                        <div class="glass-panel rounded-xl p-4 flex-1 flex flex-col min-h-[250px]">
                            <div class="card-header flex justify-between items-center pb-2 mb-2">
                                <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-wider">📊 8. 8D Clustering</h2>
                            </div>
                            <div class="flex gap-4 flex-1">
                                <div class="w-1/3 flex flex-col justify-center">
                                    <div class="bg-emerald-900/10 rounded-lg p-2 border border-emerald-500/30 text-center">
                                        <p class="text-[9px] text-emerald-500 font-bold uppercase">Persona Cluster</p>
                                        <p class="text-xs font-bold text-emerald-400 leading-tight mt-1" id="log_persona">--</p>
                                    </div>
                                </div>
                                <div class="w-2/3 relative bg-slate-900 rounded border border-slate-800 p-1">
                                    <canvas id="spiderChartCanvas"></canvas>
                                </div>
                            </div>
                        </div>

                        <div class="glass-panel rounded-xl p-4 flex-1 flex flex-col min-h-[200px]">
                            <div class="card-header flex justify-between items-center pb-2 mb-2">
                                <h2 class="text-sm font-bold text-red-400 uppercase tracking-wider">⚠️ 9. Predictive Lapse Risk</h2>
                            </div>
                            <div class="flex-1 flex items-center gap-4 bg-slate-900 rounded-lg p-3 border border-slate-800">
                                <div class="shrink-0 text-center w-24">
                                    <p class="text-3xl font-black text-red-400" id="log_lapse_score">--%</p>
                                    <p class="text-[9px] text-slate-400 uppercase mt-1">Churn Rate</p>
                                </div>
                                <div class="flex-1 overflow-y-auto custom-scrollbar h-full">
                                    <div id="log_lapse_drivers" class="text-[11px] text-slate-300 space-y-1.5">
                                        <p class="text-slate-500 italic">รอประมวลผลความเสี่ยงทิ้งกรมธรรม์...</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div class="glass-panel rounded-xl p-5 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)] lg:col-span-2 flex flex-col min-h-[250px]">
                        <div class="card-header flex justify-between items-center border-indigo-500/30">
                            <h2 class="text-sm font-bold text-indigo-400 uppercase tracking-wider">⚖️ 10. Hybrid Consensus (System Calibrator)</h2>
                            <span class="text-[9px] bg-indigo-900/30 px-2 py-0.5 rounded text-indigo-300 border border-indigo-500/30">Final Output</span>
                        </div>
                        <div class="flex flex-col lg:flex-row gap-6 flex-1">
                            <div class="flex-shrink-0 flex flex-col justify-center items-center bg-indigo-900/40 rounded-xl p-6 border border-indigo-500/50 shadow-inner lg:w-1/3">
                                <p class="text-xs text-indigo-300 font-bold uppercase tracking-widest mb-2 text-center">Final Adjusted Score<br>(AiDAPC Audited)</p>
                                <p class="text-5xl font-black text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" id="log_final_score">--%</p>
                                
                                <div class="text-[10px] text-indigo-300/70 mt-4 code-font flex flex-col gap-1 w-full bg-slate-900/50 p-2 rounded border border-indigo-500/30">
                                    <div class="flex justify-between border-b border-indigo-500/30 pb-1 mb-1"><span>CRM Original:</span> <span id="log_crm_original" class="text-white font-bold">--%</span></div>
                                    <div class="flex justify-between text-slate-400"><span>AiDAPC Base:</span> <span id="log_base_audit">--%</span></div>
                                    <div class="flex justify-between text-rose-400"><span>Rule Penalty:</span> <span id="log_discount_audit">--%</span></div>
                                </div>
                            </div>
                            <div class="flex-1 flex flex-col">
                                <p class="text-[10px] text-slate-400 mb-1 font-bold">Rule Execution Log (Detailed Traceability):</p>
                                <div class="bg-slate-900 rounded-lg p-3 text-[11px] text-slate-300 flex-1 overflow-y-auto border border-slate-800 custom-scrollbar space-y-3" id="log_consensus_exp">
                                    <p class="text-slate-500 italic code-font text-center mt-4">รอการตรวจสอบกฎเกณฑ์ธุรกิจ...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-4 lg:col-span-1 flex flex-col">
                        <div class="flex justify-between items-center mb-2">
                            <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><span class="status-dot"></span> System Terminal</h2>
                            <button onclick="document.getElementById('terminal_log').innerHTML=''" class="text-[9px] text-slate-600 hover:text-slate-400">Clear</button>
                        </div>
                        <div class="flex-1 bg-[#0f172a] rounded border border-slate-800 p-3 text-[10px] code-font text-slate-400 overflow-y-auto custom-scrollbar space-y-1 min-h-[200px]" id="terminal_log">
                            <div class="text-emerald-400">> AiDAPC V5.0 Ultimate Ready. Full Payload Container Started.</div>
                        </div>
                    </div>

                </div>

            </main>

            <script>
                // ==========================================
                // ⚙️ ตัวแปร Global, Product Matrix & Utils
                // ==========================================
                let spiderChartInstance = null;
                let rawDatabaseCache = {};

                const formatB = (num) => '฿' + Math.round(num || 0).toLocaleString('th-TH');

                const termLog = (msg, type='info') => {
                    const el = document.getElementById('terminal_log');
                    const colors = {info: 'text-slate-400', success: 'text-emerald-400', warn: 'text-orange-400', err: 'text-rose-400', highlight: 'text-cyan-400'};
                    const time = new Date().toLocaleTimeString('th-TH', { hour12: false });
                    el.innerHTML += \`<div class="\${colors[type]}">[\${time}] > \${msg}</div>\`;
                    el.scrollTop = el.scrollHeight;
                };

                const pickNLG = (arr) => arr[Math.floor(Math.random() * arr.length)];

                // -----------------------------------------------------
                // 🗂️ 1. UNIFIED AIA PRODUCT MATRIX 
                // -----------------------------------------------------
                const aiaBaseProductMatrix = {
                    "AIA 20 Pay Life": { type: "WholeLife", minSA: 100000, maxSA: 9999999, builtInRiders: ["WP"], minPremiumRPP: 0 },
                    "AIA Pay Life Plus (20 Pay)": { type: "WholeLife", minSA: 150000, maxSA: 9999999, builtInRiders: ["WPCI", "TI"], minPremiumRPP: 0 },
                    "AIA Life Protector 70": { type: "Term", minSA: 350000, maxSA: 5000000, builtInRiders: [], minPremiumRPP: 0 },
                    "AIA Endowment 15/25": { type: "Saving", minSA: 100000, maxSA: Infinity, builtInRiders: [], minPremiumRPP: 0 },
                    "AIA Excellent 20/20": { type: "Saving", minSA: 100000, maxSA: Infinity, builtInRiders: [], minPremiumRPP: 0 },
                    "AIA Annuity Sure": { type: "Annuity", minSA: 100000, maxSA: Infinity, builtInRiders: [], minPremiumRPP: 0 },
                    "AIA Annuity Fix": { type: "Annuity", minSA: 200000, maxSA: Infinity, builtInRiders: [], minPremiumRPP: 0 },
                    "AIA Senior Happy": { type: "WholeLife_Senior", minSA: 50000, maxSA: 200000, builtInRiders: [], minPremiumRPP: 0 },
                    "AIA CI ProCare": { type: "CIBase", minSA: 200000, maxSA: 8000000, builtInRiders: ["WPCI"], minPremiumRPP: 0 },
                    "AIA CI SuperCare": { type: "CIBase", minSA: 200000, maxSA: 4999999, builtInRiders: [], minPremiumRPP: 0 },
                    "AIA CI SuperCare Prestige": { type: "CIBase_HNW", minSA: 5000000, maxSA: Infinity, builtInRiders: [], minPremiumRPP: 0 },
                    "AIA Issara Plus": { type: "UnitLinked", minSA: 120000, maxSA: Infinity, minPremiumRPP: 12000, builtInRiders: [] },
                    "AIA Smart Select": { type: "UnitLinked", minSA: 500000, maxSA: Infinity, minPremiumRPP: 30000, builtInRiders: [] },
                    "AIA Smart Select Prestige": { type: "UnitLinked_HNW", minSA: 10000000, maxSA: Infinity, minPremiumRPP: 30000, builtInRiders: [] },
                    "AIA Legacy Prestige": { type: "WholeLife_HNW", minSA: 10000000, maxSA: Infinity, builtInRiders: [], minPremiumRPP: 0 },
                    "AIA Legacy Prestige Plus": { type: "WholeLife_HNW", minSA: 10000000, maxSA: Infinity, builtInRiders: ["WPCI", "TI"], minPremiumRPP: 0 },
                    "AIA Infinite Wealth Prestige": { type: "UnitLinked_HNW", minSA: 15000000, maxSA: Infinity, minPremiumRPP: 0, builtInRiders: [] },
                    "AIA Elite Income Prestige": { type: "UnitLinked_HNW", minSA: 550000, maxSA: Infinity, minPremiumRPP: 500000, builtInRiders: [] }
                };

                const aiaRiderMatrix = {
                    "AIA Infinite Care": { category: "Health", type: "flat" },
                    "AIA Health Starter": { category: "Health", type: "fixed_plan" },
                    "AIA Health Happy": { category: "Health", type: "fixed_plan" },
                    "AIA Health Saver": { category: "Health", type: "fixed_plan" },
                    "AIA Multi-Pay CI Plus": { category: "CI", type: "per_thousand" },
                    "AIA CI Plus": { category: "CI", type: "per_thousand" },
                    "AIA Care for Cancer": { category: "CI", type: "per_thousand" },
                    "AIA Health Cancer": { category: "CI", type: "flat" },
                    "AIA HB": { category: "Compensation", type: "per_thousand" },
                    "AIA HB Extra": { category: "Compensation", type: "per_thousand" }
                };

                // -----------------------------------------------------
                // 🗂️ 2. Premium Rate Matrix
                // -----------------------------------------------------
                const rateMatrix = {
                    "AIA Endowment 15/25": { "M": { 30: 82, 35: 82, 36: 82, 45: 83, 50: 83, 55: 88, 60: 90, 70: 96 }, "F": { 30: 82, 35: 82, 36: 82, 45: 83, 50: 83, 55: 88, 60: 90, 70: 96 } },
                    "AIA Excellent 20/20": { "M": { 1: 152.90, 36: 153.90, 50: 156.90, 60: 161.20, 70: 170.00 }, "F": { 1: 152.90, 36: 153.90, 50: 156.90, 60: 161.20, 70: 170.00 } },
                    "AIA Annuity Sure": { "M": { 20: 44, 30: 70, 45: 178, 55: 649 }, "F": { 20: 47, 30: 73, 45: 186, 55: 676 } },
                    "AIA Annuity Fix": { "M": { 20: 16.20, 30: 25.70, 45: 65.60, 55: 236.50 }, "F": { 20: 16.50, 30: 25.80, 45: 65.20, 55: 234.80 } },
                    "AIA Senior Happy": { "M": { 50: 59.80, 55: 68.42, 65: 102.35, 70: 127.65 }, "F": { 50: 50.02, 55: 58.07, 65: 84.52, 70: 106.95 } },
                    "AIA 20 Pay Life": { "M": { 1: 12.76, 36: 24.94, 50: 37.81, 60: 55.77, 70: 78.11 }, "F": { 1: 11.47, 36: 20.93, 50: 31.62, 60: 46.43, 70: 67.07 } },
                    "AIA Pay Life Plus (20 Pay)": { "M": { 1: 14.80, 36: 28.93, 50: 43.40, 60: 60.64, 70: 97.53 }, "F": { 1: 13.31, 36: 24.28, 50: 36.68, 60: 51.57, 70: 82.43 } },
                    "AIA CI SuperCare": { "M": { 1: 22.20, 36: 42.28, 50: 62.92, 60: 100.65 }, "F": { 1: 20.42, 36: 38.62, 50: 56.71, 60: 79.47 } },
                    "AIA CI ProCare": { "M": { 1: 35.52, 36: 100.42, 50: 169.88, 60: 310.00 }, "F": { 1: 30.63, 36: 79.56, 50: 127.60, 60: 210.60 } },
                    "AIA Life Protector 70": { "M": { 20: 10.94, 30: 12.75, 45: 17.78, 55: 24.23 }, "F": { 20: 8.00, 30: 9.02, 45: 11.91, 55: 15.88 } },
                    "AIA Legacy Prestige Plus": { "M": { 20: 25.50, 30: 32.40, 40: 45.80, 50: 68.20 }, "F": { 20: 22.10, 30: 28.50, 40: 41.20, 50: 62.10 } },
                    "AIA Legacy Prestige": { "M": { 20: 28.50, 30: 36.40, 40: 50.80, 50: 75.20 }, "F": { 20: 25.10, 30: 32.50, 40: 45.20, 50: 68.10 } },
                    "AIA Smart Select Prestige": { "M": { 1: 15, 30: 20, 40: 25, 50: 35, 60: 50, 70: 75 }, "F": { 1: 15, 30: 18, 40: 22, 50: 30, 60: 45, 70: 65 } },
                    "AIA Infinite Wealth Prestige": { "M": { 1: 15, 30: 20, 40: 25, 50: 35, 60: 50, 70: 75 }, "F": { 1: 15, 30: 18, 40: 22, 50: 30, 60: 45, 70: 65 } },
                    "AIA Elite Income Prestige": { "M": { 1: 909.09, 30: 909.09, 40: 909.09, 50: 909.09, 60: 909.09, 70: 909.09 }, "F": { 1: 909.09, 30: 909.09, 40: 909.09, 50: 909.09, 60: 909.09, 70: 909.09 } },
                    "AIA CI SuperCare Prestige": { "M": { 20: 30.16, 30: 36.85, 40: 45.68, 50: 62.92 }, "F": { 20: 27.92, 30: 33.91, 40: 42.45, 50: 56.71 } }
                };

                const riderRateMatrix = {
                    "AIA Infinite Care": { type: "flat","M": { 20: 78480, 30: 88860, 40: 102420, 50: 138300, 60: 222000 },"F": { 20: 87180, 30: 94680, 40: 109560, 50: 139560, 60: 224040 } },
                    "AIA Health Starter": { type: "fixed_plan",
                        "1500": {"M": { 21: 3800, 31: 4300, 41: 4900, 51: 7100, 61: 13700, 71: 29700 },"F": { 21: 4200, 31: 4800, 41: 5500, 51: 7700, 61: 15000, 71: 32400 }},
                        "2000": {"M": { 21: 6400, 31: 7300, 41: 8200, 51: 11900, 61: 20900, 71: 41100 },"F": { 21: 7700, 31: 8300, 41: 9200, 51: 13000, 61: 22500, 71: 44600 }},
                        "2500": {"M": { 21: 7800, 31: 9000, 41: 10100, 51: 14500, 61: 25600, 71: 50200 },"F": { 21: 9000, 31: 10100, 41: 11400, 51: 16000, 61: 27700, 71: 54700 }},
                        "3500": {"M": { 21: 9900, 31: 11700, 41: 13000, 51: 18700, 61: 33000, 71: 65200 },"F": { 21: 11900, 31: 13400, 41: 15000, 51: 20700, 61: 36200, 71: 72200 }},
                        "4500": {"M": { 21: 11700, 31: 13700, 41: 15300, 51: 22000, 61: 39000, 71: 77300 },"F": { 21: 14500, 31: 15700, 41: 17600, 51: 24500, 61: 42900, 71: 85700 }}},
                    "AIA Health Cancer": { type: "flat","M": { 20: 3500, 30: 5500, 40: 9500, 50: 18500 },"F": { 20: 4200, 30: 6800, 40: 12000, 50: 22000 } },
                    "AIA CI Plus": { type: "per_thousand", "M": { 20: 1.85, 30: 2.65, 40: 5.45, 50: 12.80 }, "F": { 20: 1.95, 30: 2.90, 40: 6.10, 50: 11.50 } },
                    "AIA Multi-Pay CI Plus": { type: "per_thousand", "M": { 20: 3.50, 30: 5.20, 40: 10.80, 50: 25.40 }, "F": { 20: 3.80, 30: 5.80, 40: 12.20, 50: 23.50 } },
                    "AIA Care for Cancer": { type: "per_thousand", "M": { 20: 1.10, 30: 1.60, 40: 3.50, 50: 8.20 }, "F": { 20: 1.25, 30: 2.10, 40: 4.80, 50: 9.50 } },
                    "AIA Health Saver": { type: "fixed_plan",
                        "200000": {"M": { 21: 6900, 31: 7500, 41: 10000, 51: 15400, 61: 27300, 71: 53700 },"F": { 21: 8600, 31: 9200, 41: 12100, 51: 15500, 61: 27600, 71: 54200 }},
                        "300000": {"M": { 21: 8400, 31: 9300, 41: 11400, 51: 17200, 61: 31000, 71: 67400 },"F": { 21: 10600, 31: 11700, 41: 13800, 51: 17200, 61: 31300, 71: 68100 }},
                        "400000": {"M": { 21: 10400, 31: 14700, 41: 17100, 51: 24300, 61: 47000, 71: 94400 },"F": { 21: 14400, 31: 18000, 41: 21700, 51: 25600, 61: 47500, 71: 95300 }},
                        "500000": {"M": { 21: 13400, 31: 18900, 41: 21600, 51: 30900, 61: 56600, 71: 115800 },"F": { 21: 18100, 31: 22700, 41: 26500, 51: 34100, 61: 57200, 71: 117000 }}},
                    "AIA Health Happy": { type: "fixed_plan",
                        "1000000": { "M": { 21: 13700, 31: 15100, 41: 19200, 51: 28300, 61: 40900, 71: 85400 },"F": { 21: 17200, 31: 18400, 41: 22300, 51: 28500, 61: 41500, 71: 88200 }},
                        "5000000": { "M": { 21: 16900, 31: 18900, 41: 23800, 51: 35000, 61: 50600, 71: 104000 },"F": { 21: 21500, 31: 22700, 41: 27800, 51: 35200, 61: 50800, 71: 107500 }},
                        "15000000": {"M": { 21: 21600, 31: 29400, 41: 36000, 51: 50100, 61: 72300, 71: 152100 },"F": { 21: 27000, 31: 34200, 41: 42900, 51: 50700, 61: 73500, 71: 155700 }},
                        "25000000": {"M": { 21: 28000, 31: 37800, 41: 47300, 51: 65300, 61: 94100, 71: 197800 },"F": { 21: 35300, 31: 42300, 41: 53600, 51: 65500, 61: 95700, 71: 202000 }}},
                    "AIA HB Extra": { type: "per_thousand", "M": { 20: 1350, 30: 1450, 40: 1850, 50: 2650 }, "F": { 20: 1400, 30: 1650, 40: 2150, 50: 2950 } },
                    "AIA HB": { type: "per_thousand", "M": { 20: 1150, 30: 1250, 40: 1550, 50: 2150 }, "F": { 20: 1200, 30: 1450, 40: 1850, 50: 2450 } }
                };

                // -----------------------------------------------------
                // 🧮 3. Calculator Functions
                // -----------------------------------------------------
                function findClosestRate(productMatrix, gender, age) {
                    if(!productMatrix || !productMatrix[gender]) return null;
                    let matrix = productMatrix[gender];
                    let ageKeys = Object.keys(matrix).map(Number).sort((a, b) => a - b);
                    let rate = 0;

                    if (matrix[age] !== undefined) rate = matrix[age];
                    else if (age <= ageKeys[0]) rate = matrix[ageKeys[0]];
                    else if (age >= ageKeys[ageKeys.length - 1]) rate = matrix[ageKeys[ageKeys.length - 1]];
                    else {
                        let age1 = ageKeys[0]; let age2 = ageKeys[ageKeys.length - 1];
                        for (let i = 0; i < ageKeys.length - 1; i++) {
                            if (age > ageKeys[i] && age < ageKeys[i + 1]) {
                                age1 = ageKeys[i]; age2 = ageKeys[i + 1]; break;
                            }
                        }
                        let rate1 = matrix[age1]; let rate2 = matrix[age2];
                        rate = rate1 + ((rate2 - rate1) * (age - age1) / (age2 - age1));
                    }
                    return rate;
                }

                function calculateRiderPremium(riderName, gender, age, planOrSA) {
                    if (!riderRateMatrix[riderName]) return 0;
                    let genderKey = (gender === "หญิง" || gender === "F") ? "F" : "M";
                    let productType = riderRateMatrix[riderName].type;
                    let matrix;

                    if (productType === "fixed_plan") {
                        let planKey = planOrSA.toString();
                        if (!riderRateMatrix[riderName][planKey]) {
                            let availablePlans = Object.keys(riderRateMatrix[riderName]).filter(k => k !== "type" && k !== "category").map(Number).sort((a,b) => a-b);
                            if (availablePlans.length === 0) return 0;
                            let closestPlan = availablePlans.reduce((prev, curr) => Math.abs(curr - planOrSA) < Math.abs(prev - planOrSA) ? curr : prev);
                            planKey = closestPlan.toString();
                        }
                        matrix = riderRateMatrix[riderName][planKey][genderKey];
                    } else {
                        matrix = riderRateMatrix[riderName][genderKey];
                    }

                    if (!matrix) return 0;

                    let ageKeys = Object.keys(matrix).map(Number).sort((a, b) => a - b);
                    let rate = 0;
                    if (matrix[age] !== undefined) rate = matrix[age];
                    else if (age <= ageKeys[0]) rate = matrix[ageKeys[0]];
                    else if (age >= ageKeys[ageKeys.length - 1]) rate = matrix[ageKeys[ageKeys.length - 1]];
                    else {
                        let age1 = ageKeys[0]; let age2 = ageKeys[ageKeys.length - 1];
                        for (let i = 0; i < ageKeys.length - 1; i++) {
                            if (age > ageKeys[i] && age < ageKeys[i + 1]) { age1 = ageKeys[i]; age2 = ageKeys[i + 1]; break; }
                        }
                        rate = matrix[age1] + ((matrix[age2] - matrix[age1]) * (age - age1) / (age2 - age1));
                    }

                    if (productType === "flat" || productType === "fixed_plan") return rate; 
                    if (productType === "per_thousand") return (planOrSA / 1000) * rate;
                    return 0;
                }

                function getCOIRate(age, gender) {
                    let baseRate = gender === 'F' ? 0.6 : 1.0;
                    let agingFactor = Math.pow(1.095, Math.max(0, age - 25));
                    if (age > 70) agingFactor *= Math.pow(1.05, age - 70); 
                    return Math.min(baseRate * agingFactor, 300) / 1000; 
                }

                function simulateUnitLinkedCV(age, premium, sumAssured, expectedRoi, gender, payYears = 99, designType = 'A') {
                    let cv = 0; let lapseAge = 99; 
                    const fmcMonthly = 0.012 / 12;
                    const policyFeeMonthly = 1200 / 12; 
                    let netMonthlyRoi = (Math.pow(1 + expectedRoi, 1/12) - 1) - fmcMonthly;

                    for (let y = 1; y <= (99 - age); y++) {
                        let currentAge = age + y - 1;
                        let premiumChargePct = 0;
                        if (y <= payYears) {
                            if (y === 1) premiumChargePct = 0.50;
                            else if (y === 2) premiumChargePct = 0.30;
                            else if (y === 3) premiumChargePct = 0.10;
                        }
                        
                        cv += (y <= payYears) ? premium * (1 - premiumChargePct) : 0;
                        let monthlyCOIRate = getCOIRate(currentAge, gender) / 12;
                        
                        for (let m = 1; m <= 12; m++) {
                            cv -= policyFeeMonthly;
                            let nar = designType === 'A' ? Math.max(0, sumAssured - cv) : sumAssured;
                            cv -= (nar * monthlyCOIRate);
                            if (cv <= 0) { cv = 0; break; }
                            cv = cv * (1 + netMonthlyRoi);
                        }
                        if (cv <= 0 && y > 1) { lapseAge = currentAge; break; }
                    }
                    return { lapseAge: lapseAge, finalCV: Math.max(0, cv) };
                }

                function optimizeUnitLinkedPremium(age, sumAssured, expectedRoi, gender, minPremium) {
                    let targetLapseAge = Math.max(85, age + 20); 
                    let low = minPremium;
                    let high = sumAssured * 0.15; 
                    let optimalPremium = high;
                    
                    for (let i = 0; i < 20; i++) { 
                        let mid = (low + high) / 2;
                        let simResult = simulateUnitLinkedCV(age, mid, sumAssured, expectedRoi, gender, 20, 'A');
                        if (simResult.lapseAge >= targetLapseAge) {
                            optimalPremium = mid; high = mid;
                        } else {
                            low = mid; 
                        }
                    }
                    return Math.max(minPremium, Math.ceil(optimalPremium / 1000) * 1000);
                }

                function calculateExactPremium(productName, gender, age, sumAssured) {
                    try {
                        let product = aiaBaseProductMatrix[productName]; 
                        let genderKey = (gender === "หญิง" || gender === "F") ? "F" : "M";

                        if (typeof rateMatrix !== 'undefined' && rateMatrix[productName]) {
                            let ratePerThousand = rateMatrix[productName][genderKey][age] || findClosestRate(rateMatrix[productName], genderKey, age);
                            if (ratePerThousand) {
                                let exactPremium = (sumAssured / 1000) * ratePerThousand;
                                if (product && product.minPremiumRPP && exactPremium < product.minPremiumRPP) exactPremium = product.minPremiumRPP;
                                return { success: true, premium: exactPremium };
                            }
                        }
                        
                        if (product && product.minPremiumRPP) {
                            let expectedRoi = 0.05; 
                            let calculatedPremium = optimizeUnitLinkedPremium(age, sumAssured, expectedRoi, genderKey, product.minPremiumRPP);
                            let maxRealisticPremium = sumAssured * 0.10;
                            if (calculatedPremium > maxRealisticPremium) calculatedPremium = Math.ceil(maxRealisticPremium / 1000) * 1000;
                            return { success: true, premium: Math.max(product.minPremiumRPP, calculatedPremium) };
                        }

                        return { success: false, error: "ไม่มีข้อมูลอัตราเบี้ย" };
                    } catch (e) {
                        return { success: false, error: "Calculation Error" };
                    }
                }

                // ==========================================
                // 🧹 Reset UI Function
                // ==========================================
                window.resetDashboardUI = function() {
                    const resetEls = [
                        'log_input_data', 'log_nlp_text', 'log_outlier_warning', 'log_xai_drivers', 
                        'log_counterfactual', 'log_recommender', 'log_lapse_drivers', 'log_consensus_exp'
                    ];
                    resetEls.forEach(id => {
                        let el = document.getElementById(id);
                        if(el) el.innerHTML = '<p class="text-slate-500 italic text-center mt-4">รอการวิเคราะห์ข้อมูลใหม่...</p>';
                    });

                    const resetScores = [
                        'log_nlp_score', 'log_conf_score', 'log_nn_score', 'log_persona',
                        'gap_emergency', 'gap_life', 'gap_health', 'log_lapse_score',
                        'log_final_score', 'log_crm_original', 'log_base_audit', 'log_discount_audit'
                    ];
                    resetScores.forEach(id => {
                        let el = document.getElementById(id);
                        if(el) el.innerText = '--';
                    });

                    document.getElementById('bar_conf').style.width = '0%';
                    document.getElementById('log_nn_desc').innerHTML = '<span class="text-slate-500 italic">รอวิเคราะห์...</span>';

                    if(spiderChartInstance) {
                        spiderChartInstance.destroy();
                        spiderChartInstance = null;
                    }
                    termLog("UI Cleared for new case.", "info");
                };

                // ==========================================
                // 🔍 Searchable Dropdown
                // ==========================================
                window.filterClientDropdown = function() {
                    const searchBox = document.getElementById('client_search');
                    const filter = searchBox.value.toLowerCase();
                    const selector = document.getElementById('sb_crm_selector');
                    const options = selector.options;

                    for (let i = 1; i < options.length; i++) {
                        let txt = options[i].text.toLowerCase();
                        options[i].style.display = txt.includes(filter) ? "" : "none";
                    }
                };

                // ==========================================
                // 📡 API FETCHING & 100% DATA EXTRACTION
                // ==========================================
                window.initCRMSelector = async function() {
                    const selector = document.getElementById('sb_crm_selector');
                    const dot = document.getElementById('db_status_dot');
                    const btn = document.getElementById('btn_execute');
                    
                    selector.innerHTML = '<option value="">⏳ Fetching Full Payload...</option>';
                    selector.disabled = true; btn.disabled = true;
                    dot.style.backgroundColor = '#f59e0b';
                    termLog("Connecting to LocalStorage Bridge...", "warn");

                    try {
                        await new Promise(r => setTimeout(r, 400)); 
                        
                        let crmData = [];
                        let bridgeData = localStorage.getItem('AIDAPC_TEMP_BRIDGE');
                        if (bridgeData) {
                            crmData = JSON.parse(bridgeData);
                            termLog("🔗 Bridge Connected (Data Received Successfully)", "info");
                        } else {
                            throw new Error("ไม่พบข้อมูลสะพานเชื่อมต่อ (Bridge Empty) กรุณาเปิด AiDAPC ใหม่");
                        }
                        
                        if (!crmData || crmData.length === 0) throw new Error("ฐานข้อมูล CRM ว่างเปล่า");

                        rawDatabaseCache = {};
                        selector.innerHTML = '<option value="">-- เลือกลูกค้าจากฐานข้อมูล --</option>';
                        
                        let validCount = 0;
                        
                        // 🌟 ดึงข้อมูล 100% (Full Data Transformation) 🌟
                        crmData.forEach(c => {
                            if (!c.fullData || !c.fullData.visits || c.fullData.visits.length === 0) return;
                            
                            let latestVisit = c.fullData.visits[0];
                            let snap = latestVisit.dataSnapshot || {};
                            let dyn = snap.dynamic || {};
                            let prof = snap.profile || {};
                            let ret = snap.retirement || {};

                            const sumVals = (arr) => (arr || []).reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);

                            let tInc = sumVals(dyn.c_inc);
                            let tExp = sumVals(dyn.c_exp);
                            let tLiab = sumVals(dyn.c_liab);
                            let tAst = sumVals(dyn.c_assets);
                            
                            // สกัดข้อมูลประกันเดิม (c_ins) เพื่อวิเคราะห์ Health Gap
                            let currentInsurance = dyn.c_ins || [];
                            
                            // สกัดเป้าหมาย (c_goals)
                            let smartGoals = dyn.c_goals || [];

                            let netWorth = latestVisit.netWorth || (tAst - tLiab);
                            let dtiRatio = tInc > 0 ? (tExp / tInc) : 0;
                            dtiRatio = Math.min(1.0, Math.max(0, dtiRatio));

                            let allNotes = latestVisit.activities ? latestVisit.activities.map(act => act.text).join(" | ") : "";
                            let originalScore = parseFloat(latestVisit.aiScore) || 50;

                            // แพ็กข้อมูลทั้งหมดลง Cache
                            rawDatabaseCache[c.id] = {
                                id: c.id,
                                name: c.name,
                                age: parseInt(prof.p_age) || 35,
                                gender: prof.p_gender || 'M', // สำหรับการคำนวณเบี้ย
                                dependents: parseInt(prof.p_dep) || 0,
                                occ: prof.p_occ || 'ไม่ระบุ',
                                retireAge: parseInt(ret.r_retAge) || 60,
                                reqInc: parseFloat(ret.r_reqInc) || 0,
                                inc: tInc,
                                exp: tExp,
                                nw: netWorth,
                                liabilities: tLiab,
                                assets: tAst,
                                dti: dtiRatio,
                                notes: allNotes,
                                originalScore: originalScore, 
                                existingIns: currentInsurance,
                                goals: smartGoals
                            };

                            selector.innerHTML += \`<option value="\${c.id}">👤 \${c.id} - \${c.name}</option>\`;
                            validCount++;
                        });

                        if(validCount === 0) throw new Error("เจอรายชื่อลูกค้า แต่ไม่มีประวัติการบันทึก (VN) ที่สมบูรณ์");

                        selector.disabled = false; btn.disabled = false;
                        dot.style.backgroundColor = '#10b981';
                        termLog(\`Successfully synced \${validCount} Full-Payload records.\`, "success");

                    } catch (error) {
                        selector.innerHTML = '<option value="">❌ การเชื่อมต่อล้มเหลว</option>';
                        dot.style.backgroundColor = '#ef4444';
                        termLog(\`Sync Error: \${error.message}\`, "err");
                    }
                };

                // ==========================================
                // 🧠 AI Engine Core
                // ==========================================
                window.AIEngineCore = {
                    
                    predictSuccessProbability: function(data) {
                        let age = parseFloat(data.age) || 30;
                        let inc = parseFloat(data.inc) || 0;
                        let nw = parseFloat(data.nw) || 0;
                        let liab = parseFloat(data.liabilities) || 0;
                        let dti = parseFloat(data.dti) || 0;
                        let dep = parseFloat(data.dependents) || 0;

                        let base = 50;
                        let incScore = (inc / 100000) * 10;
                        let nwScore = (nw / 1000000) * 5;
                        let debtPenalty = (liab / 500000) * 2;
                        let dtiPenalty = (dti * 100) * 0.6; // เพิ่มความอ่อนไหว DTI
                        let depPenalty = dep * 2;

                        let score = base + incScore + nwScore - debtPenalty - dtiPenalty - depPenalty;
                        return Math.max(1.0, Math.min(99.9, score));
                    },

                    detectOutliers: function(data) {
                        let confidence = 95;
                        let warnings = [];
                        
                        const textVariations = {
                            highIncLowNw: [
                                "⚠️ ความผิดปกติของข้อมูล: รายได้จัดอยู่ในเกณฑ์สูง แต่ความมั่งคั่งสุทธิต่ำผิดปกติ อาจมีหนี้แฝงหรือรายจ่ายนอกระบบ",
                                "⚠️ Data Anomaly: Cashflow สูงแต่ไร้สินทรัพย์สะสม โมเดลอาจประเมินความมั่นคงคลาดเคลื่อน"
                            ],
                            highDti: [
                                "⚠️ สัญญาณอันตราย: อัตราส่วนหนี้ (DTI) พุ่งสูงทะลุ 80% เป็นโซนวิกฤตที่อาจทำให้พังทลายทางการเงิน",
                                "⚠️ Outlier Detected: ภาระหนี้สินอยู่ในระดับที่อันตรายมาก กระแสเงินสดแทบไม่เหลือ"
                            ],
                            negCf: [
                                "⚠️ Negative Cashflow: รายจ่ายกินพื้นที่รายได้ทั้งหมดจนติดลบ การคำนวณผลตอบแทนการลงทุนจะไม่มีความหมาย",
                                "⚠️ Warning: ระดับการใช้จ่ายเกินตัว ข้อมูลพื้นฐานขัดแย้งกับหลักการสร้างความมั่งคั่ง"
                            ],
                            normal: [
                                "✅ ข้อมูลพื้นฐานมีความสมเหตุสมผล จัดอยู่ใน Distribution มาตรฐานที่ AI มั่นใจในการประเมิน",
                                "✅ โครงสร้างการเงินสอดคล้องกับพฤติกรรมกลุ่มตัวอย่าง Model มีระดับความเชื่อมั่นสูง"
                            ]
                        };

                        if (data.inc > 200000 && data.nw < 100000) {
                            confidence -= 18; warnings.push(pickNLG(textVariations.highIncLowNw));
                        }
                        if (data.dti > 0.8) {
                            confidence -= 15; warnings.push(pickNLG(textVariations.highDti));
                        }
                        if (data.exp > data.inc && data.inc > 0) {
                            confidence -= 20; warnings.push(pickNLG(textVariations.negCf));
                        }

                        if (warnings.length === 0) warnings.push(pickNLG(textVariations.normal));
                        return { conf: Math.max(0, confidence), text: warnings };
                    },

                    analyzeSentiment: function(text) {
                        let textLower = String(text || "").toLowerCase();
                        let anxietyWords = ['กังวล', 'เครียด', 'ไม่พอ', 'บ่น', 'หนี้', 'จ่ายขั้นต่ำ', 'ค่าใช้จ่าย', 'ไม่มีเงิน', 'ลดลง', 'ป่วย', 'กู้'];
                        let positiveWords = ['สนใจ', 'ลดหย่อน', 'ลงทุน', 'มรดก', 'ออม', 'เกษียณ', 'วางแผน', 'เป้าหมาย', 'มั่นคง'];
                        
                        let anxietyScore = 30; 
                        let highlights = text || "ไม่มีบันทึกประวัติการสนทนาในระบบ (No NLP Data)";

                        anxietyWords.forEach(w => {
                            if(textLower.includes(w)) {
                                anxietyScore += 15;
                                highlights = highlights.replace(new RegExp(w, 'gi'), \`<span class="bg-pink-500/40 px-1 rounded border border-pink-500">\${w}</span>\`);
                            }
                        });
                        positiveWords.forEach(w => {
                            if(textLower.includes(w)) {
                                anxietyScore -= 10;
                                highlights = highlights.replace(new RegExp(w, 'gi'), \`<span class="text-emerald-400 border-b border-emerald-500">\${w}</span>\`);
                            }
                        });

                        return { score: Math.min(99, Math.max(5, anxietyScore)), html: highlights };
                    },

                    // 🌟 อัปเกรดคำอธิบาย XAI เชิงลึก (Enhanced Interpretability) 🌟
                    generateXAIReport: function(data, currentProb) {
                        const features = ['inc', 'nw', 'liabilities', 'dti', 'exp', 'dependents']; 
                        let explanations = [];
                        const PERTURBATION_RATE = 0.1; 

                        features.forEach((feat) => {
                            let originalValue = parseFloat(data[feat]);
                            if (isNaN(originalValue) || originalValue === 0) return;
                            let delta = Math.abs(originalValue * PERTURBATION_RATE);
                            
                            let testDataUp = { ...data }; testDataUp[feat] += delta;
                            let probUp = this.predictSuccessProbability(testDataUp);

                            let testDataDown = { ...data }; testDataDown[feat] = Math.max(0, testDataDown[feat] - delta);
                            let probDown = this.predictSuccessProbability(testDataDown);

                            let maxImpact = Math.abs(probUp - currentProb) > Math.abs(probDown - currentProb) ? (probUp - currentProb) : (probDown - currentProb);
                            let isPositive = maxImpact > 0;

                            if (Math.abs(maxImpact) >= 0.5) {
                                let reason = "";
                                
                                const xaiNLG = {
                                    inc: {
                                        pos: ["เป็นขุมพลังกระแสเงินสดที่แข็งแกร่ง ช่วยเร่งความเร็วในการสร้างสินทรัพย์", "ฐานรายได้สูง เปิดกว้างในการทำ Asset Allocation"],
                                        neg: ["รายได้ค่อนข้างจำกัด ทำให้แผนเผชิญกับความหนืดในการเติบโต", "Cashflow Inflow มีความเปราะบางหากเปรียบเทียบกับเป้าหมาย"]
                                    },
                                    nw: {
                                        pos: ["กองกำลังตั้งต้น (Base Wealth) มีความหนาแน่น ช่วยต้านทานความผันผวนได้ดี", "สินทรัพย์สุทธิปัจจุบัน เป็นเบาะรองรับวิกฤตที่ยอดเยี่ยม"],
                                        neg: ["ฐานทุนยังน้อยไปเมื่อเทียบกับภาระผูกพัน อาจต้องพึ่งพาพลังทบต้นอีกยาว", "ขาดสินทรัพย์สำรอง แผนเปราะบางต่อ Economic Shock"]
                                    },
                                    liabilities: {
                                        neg: ["ก้อนหนี้ขนาดใหญ่กำลังทำหน้าที่เป็น 'ตัวถ่วงความมั่งคั่ง' ดึงประสิทธิภาพลง", "ภาระดอกเบี้ยจ่ายกำลังกัดกินกระแสเงินสดที่ควรนำไปลงทุน"]
                                    },
                                    dti: {
                                        pos: ["อัตราส่วนชำระหนี้อยู่ระดับต่ำมาก สภาพคล่องเหลือเฟือสำหรับออมเงิน", "ปลอดหนี้หรือหนี้น้อยมาก ไร้แรงกดดันทางการเงิน"],
                                        neg: ["สัดส่วนหนี้ต่อรายได้เบียดเบียนพื้นที่เงินออม ทำให้แผนเดินหน้ายาก", "DTI ตึงตัว ทำให้ความยืดหยุ่นทางการเงินติดลบ"]
                                    },
                                    exp: {
                                        neg: ["ค่าใช้จ่ายรายเดือนสูงเกินไป เกิดค่าเสียโอกาส (Opportunity Cost) มหาศาล", "รอยรั่วทางการเงินกว้าง บั่นทอนพลังของดอกเบี้ยทบต้น"]
                                    },
                                    dependents: {
                                        neg: ["ภาระดูแลผู้อื่นทำให้ต้องกระจายความเสี่ยง (Diversify) มากขึ้น เติบโตช้าลง", "ค่าใช้จ่ายแฝงจากครอบครัวกดดันกระแสเงินสดอิสระ"]
                                    }
                                };

                                if (xaiNLG[feat]) {
                                    let sentiment = isPositive ? 'pos' : 'neg';
                                    if(xaiNLG[feat][sentiment]) {
                                        reason = pickNLG(xaiNLG[feat][sentiment]);
                                    } else {
                                        reason = pickNLG(xaiNLG[feat]['neg']); // Fallback 
                                    }
                                } else {
                                    reason = "ตัวแปรส่งผลกระทบต่อแกนคำนวณแบบ Non-linear";
                                }

                                explanations.push({
                                    feature: feat.toUpperCase(),
                                    impactValue: parseFloat(maxImpact.toFixed(2)),
                                    isPositiveFactor: isPositive,
                                    logicReason: reason
                                });
                            }
                        });
                        explanations.sort((a, b) => Math.abs(b.impactValue) - Math.abs(a.impactValue));
                        return explanations; 
                    },

                    // 🌟 อัปเกรด Counterfactual Path (จำลองปัจจัยบวก/ลบ) 🌟
                    generateCounterfactuals: function(data, currentScore) {
                        let plans = [];
                        
                        // ปัจจัยบวก (Positive Action)
                        if (data.dti > 0.4) {
                            let reduceDebt = (data.dti - 0.35) * data.inc;
                            if (reduceDebt > 0) {
                                plans.push(\`<div class="bg-emerald-900/20 border border-emerald-500/30 p-2 rounded text-[11px] mb-2">
                                    <span class="text-emerald-400 font-bold block mb-1">🔼 ทางเลือกเชิงรุก (Positive Action):</span> 
                                    หากทำ <b>Debt Consolidation</b> เพื่อลดภาระส่งหนี้ลง \${formatB(reduceDebt)}/เดือน จะปลดล็อกสภาพคล่อง ดันคะแนนพุ่งทันที +12%
                                </div>\`);
                            }
                        } else {
                            plans.push(\`<div class="bg-emerald-900/20 border border-emerald-500/30 p-2 rounded text-[11px] mb-2">
                                <span class="text-emerald-400 font-bold block mb-1">🔼 ทางเลือกเชิงรุก (Positive Action):</span> 
                                ตัดรายจ่ายฟุ่มเฟือยและโยกเงิน \${formatB(data.inc * 0.1)}/เดือน เข้าพอร์ตเติบโตสูง จะเร่งทวีคูณคะแนนความสำเร็จ
                            </div>\`);
                        }

                        // ปัจจัยลบ (Negative Impact)
                        let negImpact = data.inc * 0.2;
                        plans.push(\`<div class="bg-rose-900/20 border border-rose-500/30 p-2 rounded text-[11px]">
                            <span class="text-rose-400 font-bold block mb-1">🔽 ปัจจัยฉุดรั้ง (Negative Risk):</span> 
                            หากเกิดเหตุฉุกเฉินและต้องเพิ่มการก่อหนี้อีก \${formatB(negImpact)}/เดือน จะทำให้โครงสร้างการเงินเปราะบาง และคะแนนรูดลง -15%
                        </div>\`);

                        return plans;
                    },

                    // 🌟 อัปเกรด 3D Risk Gap & AIA Product Matrix 🌟
                    recommendProductsXAI: function(data) {
                        let gender = data.gender || 'M';
                        let age = data.age || 35;

                        // คำนวณ 3D Gaps
                        // 1. Emergency Gap (เงินสำรอง 6 เท่าของรายจ่าย)
                        let reqEmergency = data.exp * 6;
                        let currentLiquid = data.assets * 0.3; 
                        let gapEmergency = Math.max(0, reqEmergency - currentLiquid);

                        // 2. Life/Family Gap (หนี้สิน + ค่าใช้จ่ายครอบครัว 5 ปี)
                        let reqLife = data.liabilities + (data.exp * 12 * 5);
                        if(data.dependents > 0) reqLife += (data.dependents * 1000000);
                        let gapLife = Math.max(0, reqLife - data.nw); 

                        // 3. Health/CI Gap (ตรวจสอบจากกรมธรรม์เดิม)
                        let hasHealth = false;
                        let hasCI = false;
                        (data.existingIns || []).forEach(ins => {
                            let type = String(ins[3] || ins[2] || "").toLowerCase();
                            if(type.includes('สุขภาพ') || type.includes('health') || type.includes('h&s')) hasHealth = true;
                            if(type.includes('โรคร้าย') || type.includes('ci')) hasCI = true;
                        });
                        let gapHealth = (!hasHealth || !hasCI);

                        let products = [];
                        let totalPremiumRec = 0; // รายเดือน

                        // AIA PRODUCT MATRIX ROUTING & EXACT PREMIUM CALCULATION
                        if (gapEmergency > 0) {
                            let premCalc = calculateExactPremium("AIA Smart Select", gender, age, 500000); // Min SA
                            let prem = premCalc.success ? premCalc.premium : (data.inc * 0.05 * 12);
                            products.push({ 
                                name: "AIA Smart Select / กองทุนรวม", 
                                match: 92, 
                                reason: "พักเงินฉุกเฉิน สภาพคล่องสูง ถอนได้ไม่เจ็บตัว โอกาสผลตอบแทนชนะเงินฝาก",
                                premium: prem
                            });
                            totalPremiumRec += (prem / 12);
                        }

                        if (gapLife > 0) {
                            let prodName = (gapLife > 5000000 && data.inc < 100000) ? "AIA Life Protector 70" : "AIA 20 Pay Life";
                            let sa = Math.max(100000, gapLife);
                            let premCalc = calculateExactPremium(prodName, gender, age, sa);
                            let prem = premCalc.success ? premCalc.premium : (data.inc * 0.05 * 12);
                            
                            products.push({ 
                                name: prodName, 
                                match: 95, 
                                reason: \`ปิดความเสี่ยงหนี้ ทุนคุ้มครอง \${formatB(sa)} บาท หากเกิดเหตุไม่คาดฝันครอบครัวจะไม่รับภาระ\`,
                                premium: prem
                            });
                            totalPremiumRec += (prem / 12);
                        }

                        if (gapHealth) {
                            let healthSA = 5000000;
                            let healthPrem = calculateRiderPremium("AIA Health Happy", gender, age, healthSA);
                            let ciSA = 1000000;
                            let ciPrem = calculateRiderPremium("AIA CI Plus", gender, age, ciSA);
                            let totalHealthPrem = healthPrem + ciPrem;
                            if (totalHealthPrem <= 0) totalHealthPrem = 25000; // fallback

                            products.push({ 
                                name: "AIA Health Happy (5M) + CI Plus", 
                                match: 88, 
                                reason: "ค่าใช้จ่ายรักษาโรคร้ายเฉลี่ย 1-3 ล้านบาท การโอนความเสี่ยงด้วยประกันช่วยปกป้องความมั่งคั่งไม่ให้ล้มละลาย",
                                premium: totalHealthPrem
                            });
                            totalPremiumRec += (totalHealthPrem / 12);
                        }

                        if (gapLife <= 0 && !gapHealth) {
                            let ulSA = Math.max(500000, data.inc * 12);
                            let premCalc = calculateExactPremium("AIA Issara Plus", gender, age, ulSA);
                            let prem = premCalc.success ? premCalc.premium : (data.inc * 0.10 * 12);
                            
                            products.push({ 
                                name: "AIA Issara Plus (Unit Linked)", 
                                match: 98, 
                                reason: "มีความพร้อมด้านสภาพคล่อง เหมาะกับการหาผลตอบแทนชนะเงินเฟ้อด้วยพอร์ตลงทุนแบบยืดหยุ่น",
                                premium: prem
                            });
                            totalPremiumRec += (prem / 12);
                        }

                        if (data.reqInc > 0 && data.age < 55) {
                            let annSA = data.reqInc * 12 * 10;
                            let premCalc = calculateExactPremium("AIA Annuity Fix", gender, age, annSA);
                            let prem = premCalc.success ? premCalc.premium : (data.reqInc * 2 * 12);
                            
                            products.push({ 
                                name: "AIA Annuity Fix (บำนาญ)", 
                                match: 85, 
                                reason: \`ล็อกกระแสเงินสดหลังเกษียณ \${formatB(data.reqInc)}/เดือน ลดความเสี่ยงกรณีอายุยืนยาว (Longevity Risk)\`,
                                premium: prem
                            });
                            totalPremiumRec += (prem / 12);
                        }

                        products = products.slice(0, 3); // Top 3

                        return { 
                            gaps: { 
                                emergency: gapEmergency, 
                                life: gapLife, 
                                health: gapHealth ? "พบช่องโหว่ความคุ้มครอง" : "คุ้มครองครอบคลุมแล้ว" 
                            }, 
                            products: products,
                            suggestedPremium: totalPremiumRec
                        };
                    },

                    calculateLapseRisk: function(data) {
                        let score = 5;
                        let drivers = [];
                        
                        const lapseNLG = {
                            highDti: ["🚨 ระดับ DTI วิกฤต: หนี้รัดตัวทำให้ความอดทนในการจ่ายเบี้ยต่ำ หากเศรษฐกิจฝืดเคืดอาจเทกรมธรรม์", "🚨 ภาระหนี้ล้นพ้น: ลูกค้ามีโอกาสเลือก 'จ่ายหนี้แบงก์' ก่อน 'จ่ายค่าประกัน' สูงมาก"],
                            lowInc: ["⚠️ สภาพคล่องเปราะบาง: รายได้ยังน้อย โอกาสที่กรมธรรม์จะสะดุดจากรายจ่ายฉุกเฉินมีสูง", "⚠️ Income Shock Risk: ปราการเงินสดบางตากรอบ การเก็บเบี้ยระยะยาวท้าทาย"],
                            negCf: ["🔥 กระแสเงินสดติดลบ: รายจ่ายแซงรายได้ไปแล้ว เป็นสัญญาณเตือนภัยแดงเรื่องการชำระเบี้ย", "🔥 Deficit Alert: เงินไม่พอใช้ในแต่ละเดือน หากยัดเยียดเบี้ยประกันจะเกิด Lapse ภายในปีแรก"],
                            good: ["✅ พฤติกรรมมั่นคง: โครงสร้าง Cashflow หนาแน่น ถือกรมธรรม์ได้ยาวนาน", "✅ Low Churn Probability: ทุนหนา หนี้ต่ำ ลูกค้าชั้นดีที่รักษาอัตราความคงอยู่ (Persistency) ได้เยี่ยม"]
                        };

                        if(data.dti > 0.6) { score += 40; drivers.push(pickNLG(lapseNLG.highDti)); }
                        else if(data.dti > 0.4) { score += 15; drivers.push("⚠️ หนี้เริ่มตึงตัว ต้องระวังการวางเบี้ยประกันที่หนักเกินไป"); }

                        if(data.inc < 30000) { score += 20; drivers.push(pickNLG(lapseNLG.lowInc)); }
                        
                        if(data.exp > data.inc && data.inc > 0) { score += 30; drivers.push(pickNLG(lapseNLG.negCf)); }

                        if(score <= 15) drivers.push(pickNLG(lapseNLG.good));

                        return { score: Math.min(99, score), drivers: drivers };
                    },

                    KMeans: {
                        Centroids: { "กลุ่มเปราะบาง/หนี้วิกฤต": { age: 0.3, inc: 0.05, nw: 0.0, risk: 0.2, dti: 0.8 }, "วัยทำงานสร้างตัว": { age: 0.15, inc: 0.15, nw: 0.05, risk: 0.8, dti: 0.3 }, "ครอบครัวมาตรฐาน": { age: 0.4, inc: 0.2, nw: 0.1, risk: 0.5, dti: 0.4 }, "ผู้บริหาร/เจ้าของกิจการ": { age: 0.6, inc: 0.8, nw: 0.8, risk: 0.6, dti: 0.1 } },
                        classify: function(data) {
                            let norm = { age: Math.min(1, data.age/80), inc: Math.min(1, data.inc/200000), nw: Math.min(1, data.nw/10000000), risk: 0.6, dti: data.dti };
                            let closest = "วัยทำงานสร้างตัว"; let minDist = Infinity; let tVec = {};
                            for (let c in this.Centroids) {
                                let sum = 0; let cent = this.Centroids[c];
                                for (let k in norm) sum += Math.pow(norm[k] - (cent[k]||0), 2);
                                let dist = Math.sqrt(sum);
                                if (dist < minDist) { minDist = dist; closest = c; tVec = cent; }
                            }
                            return { persona: closest, clientVector: norm, centroidVector: tVec };
                        }
                    },

                    runConsensus: function(features, mlScore, persona) {
                        let auditTrail = [];
                        let discount = 0; let cap = 100;

                        const auditNLG = {
                            cap: ["ล็อกเพดานความสำเร็จไว้ที่ 45% เนื่องจากติดเพดานหนี้", "ระบบสั่งเบรค (Hard Cap) เพราะ DTI ทำลายโครงสร้างสภาพคล่อง"],
                            pen_dti: ["หักคะแนนชดเชยความเสี่ยงจากหนี้สินที่สูง", "Penalty: ลดคะแนนเพราะภาระรายจ่ายกดดัน"],
                            pen_neg: ["ทำโทษรุนแรงจากกระแสเงินสดติดลบ", "Critical Penalty: รายจ่ายสูงกว่ารายได้ ขัดหลักเกณฑ์การออม"],
                            pass: ["สอบผ่านเกณฑ์หนี้สิน (DTI Safe Zone)", "Clear: โครงสร้าง Cashflow อยู่ในโซนสุขภาพดี"]
                        };

                        if (features.exp > features.inc && features.inc > 0) {
                            cap = 30;
                            auditTrail.push(\`<div class="flex justify-between text-rose-500 border-b border-slate-800 pb-1 mb-1"><span>[CRITICAL CAP] \${pickNLG(auditNLG.pen_neg)}</span><span class="font-bold">Max 30%</span></div>\`);
                        }
                        else if (features.dti >= 0.6) {
                            cap = 45;
                            auditTrail.push(\`<div class="flex justify-between text-rose-400 border-b border-slate-800 pb-1 mb-1"><span>[HARD CAP] \${pickNLG(auditNLG.cap)}</span><span class="font-bold">Max 45%</span></div>\`);
                        } else if (features.dti >= 0.4) {
                            discount += 15;
                            auditTrail.push(\`<div class="flex justify-between text-orange-400 border-b border-slate-800 pb-1 mb-1"><span>[PENALTY] \${pickNLG(auditNLG.pen_dti)}</span><span class="font-bold">-15%</span></div>\`);
                        } else {
                            auditTrail.push(\`<div class="flex justify-between text-emerald-400 border-b border-slate-800 pb-1 mb-1"><span>[PASS] \${pickNLG(auditNLG.pass)}</span><span class="font-bold">0%</span></div>\`);
                        }

                        if (features.dependents > 2) {
                            discount += 5;
                            auditTrail.push(\`<div class="flex justify-between text-orange-400 border-b border-slate-800 pb-1 mb-1"><span>[PENALTY] ภาระดูแลครอบครัวใหญ่</span><span class="font-bold">-5%</span></div>\`);
                        }

                        let finalScore = mlScore - discount;
                        finalScore = Math.max(1.0, Math.min(finalScore, cap));

                        auditTrail.push(\`<div class="mt-2 text-indigo-300 text-center italic text-[10px]">"การปรับจูนเสร็จสิ้น ระบบได้หักลบจุดบอดของแบบจำลอง Neural Network ด้วย Financial Rules แล้ว"</div>\`);

                        return { finalScore: finalScore, discount: discount, auditTrail: auditTrail };
                    }
                };

                // ==========================================
                // 🚀 UI Renderer & Execution
                // ==========================================
                window.runFullDiagnostics = function() {
                    const cId = document.getElementById('sb_crm_selector').value;
                    if (!cId || !rawDatabaseCache[cId]) { alert("กรุณาเลือกลูกค้าจาก Database"); return; }
                    
                    let data = rawDatabaseCache[cId];
                    termLog(\`Pipeline Executing for: \${cId}\`, "highlight");

                    // 1. Ingest Data
                    let displayData = { ...data };
                    delete displayData.rawProfile; delete displayData.rawRetirement; 
                    document.getElementById('log_input_data').innerText = JSON.stringify(displayData, null, 2);

                    // 2. NLP Sentiment
                    let nlp = window.AIEngineCore.analyzeSentiment(data.notes);
                    document.getElementById('log_nlp_text').innerHTML = nlp.html;
                    document.getElementById('log_nlp_score').innerText = nlp.score + "%";

                    // 3. Outlier Detector
                    let outlier = window.AIEngineCore.detectOutliers(data);
                    document.getElementById('log_conf_score').innerText = outlier.conf + "%";
                    document.getElementById('bar_conf').style.width = outlier.conf + "%";
                    document.getElementById('log_outlier_warning').innerHTML = outlier.text.map(t => \`<p class="\${t.includes('⚠️') ? 'text-orange-400' : 'text-emerald-400'} mb-1">\${t}</p>\`).join('');

                    // 4. Base ML
                    let nnScore = window.AIEngineCore.predictSuccessProbability(data);
                    document.getElementById('log_nn_score').innerText = nnScore.toFixed(1) + "%";
                    const nnNLG = [
                        "โมเดลประเมินเบื้องต้นจากความสัมพันธ์ของรายได้และสินทรัพย์",
                        "การคำนวณตั้งต้นก่อนนำไปหักล้างด้วยความเสี่ยงทางพฤติกรรม",
                        "คะแนนดิบ (Raw Score) จาก Deep Learning Layer 1"
                    ];
                    document.getElementById('log_nn_desc').innerHTML = \`<span class="italic text-purple-300">\${pickNLG(nnNLG)}</span>\`;

                    // 5. XAI 
                    let xai = window.AIEngineCore.generateXAIReport(data, nnScore);
                    document.getElementById('log_xai_drivers').innerHTML = xai.length > 0 ? xai.map(x => 
                        \`<div class="mb-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0 last:mb-0">
                            <div class="flex items-center justify-between mb-1">
                                <p class="font-bold \${x.isPositiveFactor ? 'text-emerald-400' : 'text-rose-400'} text-[11px] uppercase tracking-wide">\${x.feature}</p>
                                <span class="font-bold code-font \${x.isPositiveFactor ? 'text-emerald-400' : 'text-rose-400'} bg-slate-800 px-1.5 py-0.5 rounded">\${x.isPositiveFactor ? '+' : '-'}\${Math.abs(x.impactValue)}%</span>
                            </div>
                            <div class="w-full bg-slate-800 rounded-full h-1 mb-1.5">
                                <div class="\${x.isPositiveFactor ? 'bg-emerald-500' : 'bg-rose-500'} h-1 rounded-full shadow-[0_0_5px_\${x.isPositiveFactor?'#10b981':'#f43f5e'}]" style="width: \${Math.min(Math.abs(x.impactValue)*3, 100)}%"></div>
                            </div>
                            <p class="text-[10px] text-slate-400 leading-snug">↳ \${x.logicReason}</p>
                        </div>\`
                    ).join('') : '<p class="text-slate-500 italic text-center mt-4">ไม่มีตัวแปรใดส่งผลกระทบรุนแรงในเคสนี้</p>';

                    // 6. Counterfactual
                    let cf = window.AIEngineCore.generateCounterfactuals(data, nnScore);
                    document.getElementById('log_counterfactual').innerHTML = cf.join('');

                    // 7. Clustering
                    let cluster = window.AIEngineCore.KMeans.classify(data);
                    document.getElementById('log_persona').innerText = cluster.persona;
                    
                    try {
                        const ctxSpider = document.getElementById('spiderChartCanvas').getContext('2d');
                        if(spiderChartInstance) spiderChartInstance.destroy();
                        spiderChartInstance = new Chart(ctxSpider, {
                            type: 'radar',
                            data: { labels: ['Age', 'Income', 'NetWorth', 'Risk', 'DTI'], datasets: [
                                { label: 'Client', data: [cluster.clientVector.age, cluster.clientVector.inc, cluster.clientVector.nw, cluster.clientVector.risk, cluster.clientVector.dti], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.2)' },
                                { label: 'Centroid', data: [cluster.centroidVector.age, cluster.centroidVector.inc, cluster.centroidVector.nw, cluster.centroidVector.risk, cluster.centroidVector.dti], borderColor: '#64748b', borderDash: [5, 5], fill: false }
                            ]},
                            options: { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: {display: false}, pointLabels: {color: '#94a3b8'} } }, plugins: { legend: { display: false } } }
                        });
                    } catch(err) {
                        console.warn("Chart.js failed to load or render:", err);
                        document.getElementById('spiderChartCanvas').outerHTML = "<p class='text-xs text-center text-slate-500 mt-10'>[ไม่สามารถโหลดกราฟได้เนื่องจากออฟไลน์]</p>";
                    }

                    // 8. Recommender XAI & 3D Gaps
                    let rec = window.AIEngineCore.recommendProductsXAI(data);
                    document.getElementById('gap_emergency').innerText = formatB(rec.gaps.emergency);
                    document.getElementById('gap_life').innerText = formatB(rec.gaps.life);
                    document.getElementById('gap_health').innerText = rec.gaps.health;
                    document.getElementById('gap_health').className = rec.gaps.health.includes("พบช่องโหว่") ? "text-sm font-bold text-rose-400" : "text-sm font-bold text-emerald-400";

                    let recHtml = rec.products.map(p => 
                        \`<div class="bg-slate-800 p-2.5 rounded border border-slate-700 hover:border-orange-500/50 transition">
                            <div class="flex justify-between items-center mb-1">
                                <span class="font-bold text-orange-300 text-xs">AIA \${p.name}</span>
                                <span class="text-emerald-400 code-font text-[10px] bg-emerald-500/10 px-1 rounded">\${p.match}% Match</span>
                            </div>
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-[10px] text-slate-400 leading-snug pr-2">\${p.reason}</span>
                                <span class="text-xs font-bold text-indigo-300 whitespace-nowrap">\${formatB(p.premium)}/ปี</span>
                            </div>
                        </div>\`
                    ).join('');
                    
                    recHtml += \`<div class="mt-2 pt-2 border-t border-slate-700 text-right">
                        <span class="text-[10px] text-slate-400">Target Premium Allocation: </span>
                        <span class="text-sm font-bold text-white">\${formatB(rec.suggestedPremium)}/เดือน</span>
                    </div>\`;
                    document.getElementById('log_recommender').innerHTML = recHtml;

                    // 9. Lapse Risk
                    let lapse = window.AIEngineCore.calculateLapseRisk(data);
                    document.getElementById('log_lapse_score').innerText = lapse.score + "%";
                    document.getElementById('log_lapse_drivers').innerHTML = lapse.drivers.map(d => \`<p class="bg-slate-800 p-2 rounded border border-slate-700">\${d}</p>\`).join('');

                    // 10. Consensus & Compare Score
                    let con = window.AIEngineCore.runConsensus(data, nnScore, cluster.persona);
                    document.getElementById('log_crm_original').innerText = data.originalScore.toFixed(1) + "%"; 
                    document.getElementById('log_base_audit').innerText = nnScore.toFixed(1) + "%";
                    document.getElementById('log_discount_audit').innerText = \`-\${con.discount.toFixed(1)}%\`;
                    document.getElementById('log_final_score').innerText = con.finalScore.toFixed(1) + "%";
                    document.getElementById('log_consensus_exp').innerHTML = con.auditTrail.join('');

                    termLog("✅ All Enterprise Modules Executed Successfully.", "success");

                    // ส่งข้อมูลกลับ
                    let resultPayload = {
                        clientId: cId,
                        finalScore: con.finalScore,
                        lapseRisk: lapse.score,
                        persona: cluster.persona,
                        recommendedProducts: rec.products.map(p => p.name)
                    };
                    
                    try {
                        localStorage.setItem('AIDAPC_RESULT_BRIDGE', JSON.stringify(resultPayload));
                        if(window.opener) {
                            window.opener.postMessage({ type: 'AIDAPC_DIAGNOSTICS_RESULT', payload: resultPayload }, '*');
                        }
                    } catch(e) {}
                    
                    termLog("📡 Result payload synced to Bridge.", "highlight");
                };

                window.onload = () => window.initCRMSelector();
            <\/script>
        </body>
        </html>`;

        this.windowRef.document.open();
        this.windowRef.document.write(htmlContent);
        this.windowRef.document.close();
    }
};
