// =====================================================================
// 🧠 AiDAPC MODULE (AI Deep Analysis & Prediction Center)
// สถาปัตยกรรม: AI/ML Core Diagnostics Engine (White-box Dashboard) v5.6 Ultimate
// อัปเดต: Searchable Datalist & Safe SSOT Memory Injection 100% (Fixed Syntax)
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

        // 🌟 [SSOT Memory Injection] ดึงข้อมูลจากสมองหลัก แปลงเป็น JSON เพื่อส่งไปฝังในหน้าต่างใหม่ทันที
        let baseMatrixStr = "{}";
        let riderMatrixStr = "{}";
        try { baseMatrixStr = JSON.stringify(typeof aiaBaseProductMatrix !== 'undefined' ? aiaBaseProductMatrix : {}); } catch(e){}
        try { riderMatrixStr = JSON.stringify(typeof aiaRiderMatrix !== 'undefined' ? aiaRiderMatrix : {}); } catch(e){}

        const htmlContent = `<!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AiDAPC - Executive AI Diagnostics V5.6</title>
            <script src="https://cdn.tailwindcss.com"><\/script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&family=Prompt:wght@300;400;600;700&display=swap');
                body { font-family: 'Prompt', sans-serif; background-color: #020617; color: #f8fafc; overflow-x: hidden; scroll-behavior: smooth; }
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

                @media print {
                    body { background-color: #ffffff !important; color: #0f172a !important; }
                    .glass-panel, .bg-slate-900, .bg-slate-800, .bg-slate-950 { background: #ffffff !important; border: 1px solid #cbd5e1 !important; box-shadow: none !important; color: #0f172a !important; }
                    header, button, #client_search, #sb_crm_selector, #terminal_log, .sandbox-hide-print { display: none !important; }
                    .text-slate-300, .text-slate-400, .text-slate-500, .text-white, .text-purple-200 { color: #334155 !important; }
                    .text-emerald-400, .text-emerald-300 { color: #059669 !important; }
                    .text-rose-400, .text-rose-300, .text-red-400, .text-pink-400 { color: #e11d48 !important; }
                    .text-cyan-400, .text-blue-400 { color: #0284c7 !important; }
                    .text-amber-400, .text-orange-400 { color: #d97706 !important; }
                    .text-fuchsia-400, .text-purple-400, .text-indigo-400 { color: #7c3aed !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    canvas { max-width: 100% !important; }
                    .grid { page-break-inside: avoid; }
                }
            </style>
        </head>
        <body class="flex flex-col custom-scrollbar">

            <header class="sticky top-0 shrink-0 flex flex-wrap justify-between items-center px-6 py-4 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 z-50 shadow-xl gap-4">
                <div class="flex items-center gap-4">
                    <div class="text-3xl drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">🧠</div>
                    <div>
                        <h1 class="text-lg font-bold text-white tracking-wide uppercase flex items-center gap-2">
                            AiDAPC <span class="text-slate-400 text-sm normal-case">| Executive AI Diagnostics</span> <span class="status-dot ml-2" id="db_status_dot"></span>
                        </h1>
                        <div class="flex items-center gap-2 mt-1">
                            <input type="text" id="client_search" onkeyup="window.filterClientDropdown()" placeholder="🔍 ค้นหาตามตัวอักษร..." class="text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none w-32 placeholder-slate-500 focus:ring-1 focus:ring-cyan-500 transition-all">
                            <select id="sb_crm_selector" onchange="window.resetDashboardUI()" class="text-xs bg-slate-800 text-cyan-300 border border-slate-600 rounded px-2 py-1 outline-none cursor-pointer min-w-[200px] max-w-[250px]">
                                <option value="">⏳ กำลังเชื่อมต่อ Database...</option>
                            </select>
                            <button onclick="window.initCRMSelector()" class="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded transition">🔄 Sync DB</button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3">
                    <button onclick="window.triggerAILearning()" id="btn_train_ai" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-2 disabled:opacity-50">
                        🎓 Train AI (SGD)
                    </button>
                    <button onclick="window.runFullDiagnostics()" id="btn_execute" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center gap-2 disabled:opacity-50">
                        <span>▶️</span> Execute White-Box AI
                    </button>
                    <button onclick="if(window.opener){window.opener.focus();} window.close();" class="bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/50 px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2">
                        ❌ ปิด
                    </button>
                </div>
            </header>

            <main class="flex-1 p-6 max-w-[1600px] mx-auto w-full space-y-8 pb-20">
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col h-[320px]">
                        <div class="card-header flex justify-between items-center shrink-0">
                            <h2 class="text-sm font-bold text-blue-400 uppercase tracking-wider">📥 1. Full Ingested Data</h2>
                            <span class="text-[9px] bg-blue-900/30 px-2 py-0.5 rounded text-blue-300 border border-blue-500/30">100% Payload</span>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 text-[10px] md:text-xs code-font text-slate-300 overflow-y-auto custom-scrollbar border border-slate-800 shadow-inner">
                            <pre id="log_input_data" class="whitespace-pre-wrap"><span class="text-slate-500 italic">รอข้อมูล Full Payload จาก API...</span></pre>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col h-[320px]">
                        <div class="card-header flex justify-between items-center shrink-0">
                            <h2 class="text-sm font-bold text-pink-400 uppercase tracking-wider">💬 2. Lexical Sentiment Analysis</h2>
                            <span class="text-[9px] bg-pink-900/30 px-2 py-0.5 rounded text-pink-300 border border-pink-500/30">Text Intent</span>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 border border-slate-800 text-xs text-slate-300 flex flex-col gap-2 overflow-hidden">
                            <p class="text-[10px] text-slate-500 font-bold uppercase shrink-0">System Notes / Client Chat:</p>
                            <div id="log_nlp_text" class="italic text-slate-400 flex-1 leading-relaxed overflow-y-auto custom-scrollbar">รอการอ่านข้อความ...</div>
                            <div class="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center shrink-0">
                                <span class="text-slate-400">Financial Anxiety Score:</span>
                                <span id="log_nlp_score" class="font-bold text-pink-400 code-font">--%</span>
                            </div>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col h-[320px]">
                        <div class="card-header flex justify-between items-center shrink-0">
                            <h2 class="text-sm font-bold text-teal-400 uppercase tracking-wider">🚨 3. Outlier & Confidence</h2>
                            <span class="text-[9px] bg-teal-900/30 px-2 py-0.5 rounded text-teal-300 border border-teal-500/30">Data Drift Engine</span>
                        </div>
                        <div class="flex-1 flex flex-col justify-center gap-3 bg-slate-900/50 rounded-lg p-4 border border-slate-800 overflow-y-auto custom-scrollbar">
                            <div class="shrink-0">
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="text-slate-400">AI Data Confidence</span>
                                    <span id="log_conf_score" class="font-bold text-teal-400 code-font">--%</span>
                                </div>
                                <div class="w-full bg-slate-800 rounded-full h-1.5"><div id="bar_conf" class="bg-teal-500 h-1.5 rounded-full transition-all duration-1000" style="width: 0%"></div></div>
                            </div>
                            <div class="bg-slate-900 p-3 rounded border border-slate-700 text-[11px] leading-relaxed" id="log_outlier_warning">
                                <p class="text-slate-500 italic text-center mt-4">รอตรวจสอบข้อมูลเบื้องต้นและให้คำอธิบาย...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col min-h-[380px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-purple-400 uppercase tracking-wider">🧠 4. Deep Learning Core</h2>
                            <span class="text-[9px] bg-purple-900/30 px-2 py-0.5 rounded text-purple-300 border border-purple-500/30">Local Perceptron</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center bg-slate-800/50 rounded-lg p-4 border border-slate-700 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent"></div>
                            <div class="text-center z-10 w-full flex-1 flex flex-col justify-center">
                                <p class="text-5xl font-black text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" id="log_nn_score">--%</p>
                                <p class="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Base Readiness Score</p>
                            </div>
                            <div class="mt-auto w-full bg-slate-900/95 p-3 rounded border border-purple-500/50 text-[10.5px] text-purple-200 shadow-inner text-left leading-relaxed z-10 overflow-y-auto max-h-[170px] custom-scrollbar">
                                <span id="log_nn_desc" class="text-slate-400 italic">รอวิเคราะห์...</span>
                            </div>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col min-h-[380px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-cyan-400 uppercase tracking-wider">🔍 5. XAI Feature Drivers</h2>
                            <span class="text-[9px] bg-cyan-900/30 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">Behavioral + Quant</span>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 text-xs text-slate-300 overflow-y-auto custom-scrollbar border border-slate-800 space-y-2" id="log_xai_drivers">
                            <p class="text-slate-500 italic code-font text-center mt-10">รอสกัดปัจจัยความพร้อมและคำอธิบายเชิงลึก...</p>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col min-h-[380px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-amber-400 uppercase tracking-wider">🎯 6. Counterfactual Path</h2>
                            <span class="text-[9px] bg-amber-900/30 px-2 py-0.5 rounded text-amber-300 border border-amber-500/30">What-If Scenarios</span>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 border border-slate-800 flex flex-col gap-2">
                            <p class="text-[10px] text-slate-400 font-bold">จำลองเส้นทางทางเลือกเพื่อช่วยลูกค้า (Advisory Scenarios):</p>
                            <div id="log_counterfactual" class="space-y-2 mt-1 overflow-y-auto custom-scrollbar flex-1">
                                <p class="text-slate-500 italic text-xs text-center mt-10">รอจำลองเส้นทางเพื่อหาจุดสมดุลที่ดีที่สุด...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-2 gap-6" id="module_gap_analysis">
                    <div class="glass-panel rounded-xl p-5 xl:col-span-1 flex flex-col min-h-[350px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-orange-400 uppercase tracking-wider">🛒 7. Customer-Centric Knapsack Algorithm</h2>
                            <span class="text-[9px] bg-orange-900/30 px-2 py-0.5 rounded text-orange-300 border border-orange-500/30">Product Optimization</span>
                        </div>
                        <div class="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                            <div class="grid grid-cols-3 gap-2">
                                <div class="bg-slate-900 p-2 rounded border border-slate-700 text-center flex flex-col justify-center">
                                    <p class="text-[9px] text-slate-400 uppercase">Emergency Gap</p>
                                    <p class="text-sm font-bold text-yellow-400 mt-1" id="gap_emergency">฿0</p>
                                </div>
                                <div class="bg-slate-900 p-2 rounded border border-slate-700 text-center flex flex-col justify-center">
                                    <p class="text-[9px] text-slate-400 uppercase">Life/Family Gap</p>
                                    <p class="text-sm font-bold text-blue-400 mt-1" id="gap_life">฿0</p>
                                </div>
                                <div class="bg-slate-900 p-2 rounded border border-slate-700 text-center flex flex-col justify-center">
                                    <p class="text-[9px] text-slate-400 uppercase">Health/CI Gap</p>
                                    <p class="text-sm font-bold text-pink-400 mt-1" id="gap_health">฿0</p>
                                </div>
                            </div>
                            
                            <div class="flex-1 flex flex-col">
                                <p class="text-[10px] text-slate-400 mb-2 font-bold">AIA Recommended Portfolio (Optimized by Gap vs Premium):</p>
                                <div id="log_recommender" class="space-y-3">
                                    <div class="bg-slate-800/80 rounded p-4 border border-slate-700">
                                        <p class="italic text-slate-500 text-xs text-center">รอคำนวณส่วนขาดและดึงข้อมูลโปรดักส์...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="xl:col-span-1 flex flex-col gap-6" id="module_persona">
                        <div class="glass-panel rounded-xl p-4 flex-1 flex flex-col min-h-[250px]">
                            <div class="card-header flex justify-between items-center pb-2 mb-2">
                                <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-wider">📊 8. 9D Persona Clustering</h2>
                            </div>
                            <div class="flex flex-col md:flex-row gap-4 flex-1">
                                <div class="w-full md:w-1/3 flex flex-col justify-center">
                                    <div class="bg-emerald-900/10 rounded-lg p-3 border border-emerald-500/30 text-center">
                                        <p class="text-[10px] text-emerald-500 font-bold uppercase">Persona Cluster</p>
                                        <p class="text-[13px] font-bold text-emerald-400 leading-tight mt-1" id="log_persona">--</p>
                                    </div>
                                </div>
                                <div class="w-full md:w-2/3 relative bg-slate-900 rounded border border-slate-800 flex items-center justify-center min-h-[200px] overflow-hidden">
                                    <div class="absolute inset-2">
                                        <canvas id="spiderChartCanvas"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="glass-panel rounded-xl p-4 flex-1 flex flex-col min-h-[200px]">
                            <div class="card-header flex justify-between items-center pb-2 mb-2">
                                <h2 class="text-sm font-bold text-red-400 uppercase tracking-wider">⚠️ 9. Predictive Lapse Risk Model</h2>
                            </div>
                            <div class="flex-1 flex flex-col md:flex-row items-center gap-4 bg-slate-900 rounded-lg p-3 border border-slate-800">
                                <div class="shrink-0 text-center w-full md:w-24 border-b md:border-b-0 md:border-r border-slate-700 pb-3 md:pb-0 md:pr-3 flex flex-col justify-center h-full">
                                    <p class="text-4xl font-black text-red-400" id="log_lapse_score">--%</p>
                                    <p class="text-[9px] text-slate-400 uppercase mt-1">Churn Risk</p>
                                </div>
                                <div class="flex-1 w-full overflow-y-auto custom-scrollbar h-full">
                                    <div id="log_lapse_drivers" class="text-[11px] text-slate-300 space-y-1.5">
                                        <p class="text-slate-500 italic text-center mt-4">รอประมวลผลความเสี่ยงทิ้งกรมธรรม์...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                    <div class="glass-panel rounded-xl p-5 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)] flex flex-col min-h-[280px]">
                        <div class="card-header flex justify-between items-center border-indigo-500/30">
                            <h2 class="text-sm font-bold text-indigo-400 uppercase tracking-wider">⚖️ 10. Hybrid Co-Advisor Consensus Engine</h2>
                            <span class="text-[9px] bg-indigo-900/30 px-2 py-0.5 rounded text-indigo-300 border border-indigo-500/30">Rule-Based + ML Output</span>
                        </div>
                        <div class="flex flex-col lg:flex-row gap-6 flex-1">
                            <div class="flex-shrink-0 flex flex-col justify-center items-center bg-indigo-900/40 rounded-xl p-5 border border-indigo-500/50 shadow-inner lg:w-1/3">
                                <p class="text-xs text-indigo-300 font-bold uppercase tracking-widest mb-1 text-center">Final Consensus Score<br>(AiDAPC Audited)</p>
                                <p class="text-6xl font-black text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" id="log_final_score">--%</p>
                                
                                <div class="text-[10px] text-indigo-300/70 mt-4 code-font flex flex-col gap-1 w-full bg-slate-900/80 p-2.5 rounded border border-indigo-500/30 shadow-sm">
                                    <div class="flex justify-between border-b border-indigo-500/30 pb-1 mb-1"><span>CRM Original:</span> <span id="log_crm_original" class="text-white font-bold">--%</span></div>
                                    <div class="flex justify-between text-slate-400"><span>AI Perceptron Base:</span> <span id="log_base_audit">--%</span></div>
                                    <div class="flex justify-between text-rose-400"><span>Rule Penalty:</span> <span id="log_discount_audit">--%</span></div>
                                </div>
                            </div>
                            <div class="flex-1 flex flex-col">
                                <p class="text-[10px] text-slate-400 mb-1 font-bold">Consensus Logic Log (การจำกัด Bound ของสมการผ่าน Heuristics):</p>
                                <div class="bg-slate-900 rounded-lg p-3 text-[11px] text-slate-300 flex-1 overflow-y-auto border border-slate-800 custom-scrollbar space-y-3 shadow-inner" id="log_consensus_exp">
                                    <p class="text-slate-500 italic code-font text-center mt-4">รอการตรวจสอบกฎเกณฑ์ธุรกิจ...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="glass-panel rounded-xl p-6 border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.15)] mt-6 flex flex-col relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 text-8xl opacity-5 select-none pointer-events-none">🤖</div>
                    <div class="card-header flex justify-between items-center border-fuchsia-500/30">
                        <h2 class="text-sm font-bold text-fuchsia-400 uppercase tracking-wider flex items-center gap-2">✨ 11. Executive AI Synthesis (สรุปกลยุทธ์เชิงลึกจาก AI)</h2>
                        <span class="text-[9px] bg-fuchsia-900/30 px-2 py-0.5 rounded text-fuchsia-300 border border-fuchsia-500/30">Auto-Generated by Procedural NLG</span>
                    </div>
                    <div id="log_executive_summary" class="text-[13px] text-slate-300 leading-relaxed space-y-4 relative z-10">
                        <p class="text-center text-slate-500 italic mt-4">รอการประมวลผลข้อมูลจากทุกโมดูลเพื่อสังเคราะห์กลยุทธ์เตรียมเข้าพบลูกค้า...</p>
                    </div>
                </div>

                <!-- 🌟🌟🌟 MODULE 12: FA INTERACTIVE SANDBOX SIMULATOR 🌟🌟🌟 -->
                <div class="glass-panel rounded-xl p-5 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] mt-6 flex flex-col min-h-[300px] sandbox-hide-print" id="module_sandbox">
                    <div class="card-header flex justify-between items-center border-cyan-500/30">
                        <h2 class="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">🎛️ 12. AI Interactive Sandbox (What-If Simulator)</h2>
                        <span class="text-[9px] bg-cyan-900/30 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">Custom Portfolio & Pitching Guide</span>
                    </div>
                    <div class="flex flex-col lg:flex-row gap-6 mt-2">
                        <!-- Left: Inputs -->
                        <div class="lg:w-1/2 space-y-4">
                            <div class="bg-slate-900 p-3 rounded border border-slate-700">
                                <label class="text-[10px] text-slate-400 font-bold mb-1 block">📌 สัญญาหลัก (Base Plan)</label>
                                <!-- 🌟 [FIX] เปลี่ยน Select เป็น Input + Datalist สำหรับค้นหาและพิมพ์ได้อิสระ -->
                                <div class="flex gap-2">
                                    <input type="text" id="sandbox_base_plan" list="dl_base_plans" oninput="window.handleBasePlanChange(); window.autoCalcBasePremium();" placeholder="-- พิมพ์ค้นหาหรือเลือกสัญญาหลัก --" class="flex-1 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500">
                                    <datalist id="dl_base_plans"></datalist>
                                    
                                    <input type="number" id="sandbox_base_sa" oninput="window.autoCalcBasePremium()" placeholder="ทุน/SA" class="w-24 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500">
                                    <input type="number" id="sandbox_base_prem" placeholder="เบี้ย (บาท/ปี)" class="w-28 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500">
                                </div>
                            </div>
                            <div class="bg-slate-900 p-3 rounded border border-slate-700">
                                <div class="flex justify-between items-center mb-2 pb-2 border-b border-slate-800">
                                    <label class="text-[10px] text-slate-400 font-bold block">➕ สัญญาเพิ่มเติม (Riders)</label>
                                    <button id="btn_add_rider" onclick="window.addRiderRow()" class="text-[10px] bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white px-2 py-0.5 rounded transition shadow opacity-50 cursor-not-allowed" disabled>+ เพิ่ม Rider</button>
                                </div>
                                <div id="sandbox_riders_container" class="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-1"></div>
                            </div>
                            <button id="btn_sandbox_simulate" onclick="window.runSandboxSimulation()" class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition shadow-[0_0_10px_rgba(6,182,212,0.4)] flex justify-center items-center gap-2">
                                🔄 จำลองผลกระทบ & วิเคราะห์ Trade-off เชิงลึก
                            </button>
                        </div>
                        <!-- Right: Output Mini Report -->
                        <div class="lg:w-1/2 flex flex-col bg-slate-900/80 rounded-lg p-4 border border-slate-700 h-full shadow-inner">
                            <div id="sandbox_results" class="text-xs text-slate-300 space-y-3 flex-1 flex flex-col">
                                <p class="text-slate-500 italic text-center m-auto">รอการจำลองแผน... <br><span class="text-[10px] mt-2 block">(กรุณาจัดพอร์ตและระบุเบี้ยประกันให้ครบถ้วน จากนั้นกด Simulate)</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 🌟🌟 END MODULE 12 🌟🌟 -->

                <div class="glass-panel rounded-xl p-4 flex flex-col mt-6">
                    <div class="flex justify-between items-center mb-2">
                        <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><span class="status-dot"></span> System Terminal (White-Box Audit Logs)</h2>
                        <button onclick="document.getElementById('terminal_log').innerHTML=''" class="text-[9px] text-slate-600 hover:text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Clear</button>
                    </div>
                    <div class="flex-1 bg-[#0f172a] rounded border border-slate-800 p-3 text-[10px] code-font text-slate-400 overflow-y-auto custom-scrollbar space-y-1.5 h-48" id="terminal_log">
                        <div class="text-emerald-400">> AiDAPC V5.6 Ultimate Ready. White-Box Matrix Activated.</div>
                    </div>
                </div>
                
            </main>

            <script>
                // ==========================================
                // ⚙️ ตัวแปร Global & Utils
                // ==========================================
                
                const SYS_CONFIG = {
                    HIGH_INCOME_THRESHOLD: 200000,
                    CRITICAL_DTI: 0.8,
                    WARNING_DTI: 0.6,
                    SAFE_DTI: 0.4,
                    EMERGENCY_MONTHS: 6
                };

                let spiderChartInstance = null;
                let rawDatabaseCache = {};
                let predictionCache = new Map();

                const formatB = (num) => '฿' + Math.round(num || 0).toLocaleString('th-TH');
                const escapeHTML = (str) => String(str).replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));

                window.addEventListener('beforeunload', () => {
                    if(window.opener && window.opener.AIControlCenter) window.opener.AIControlCenter.windowRef = null;
                });

                const termLog = (msg, type='info') => {
                    const el = document.getElementById('terminal_log');
                    const colors = {info: 'text-slate-400', success: 'text-emerald-400', warn: 'text-orange-400', err: 'text-rose-400', highlight: 'text-cyan-400', math: 'text-purple-300'};
                    const time = new Date().toLocaleTimeString('th-TH', { hour12: false });
                    el.innerHTML += '<div class="' + colors[type] + '">[' + time + '] > ' + msg + '</div>';
                    el.scrollTop = el.scrollHeight;
                };

                const pickNLG = (arr) => arr[Math.floor(Math.random() * arr.length)];

                // =====================================================================
                // 🗂️ 1. SINGLE SOURCE OF TRUTH (SSOT) - เชื่อมฐานข้อมูลจากหน้าต่างแม่
                // 🌟 [Safe Injection] รับค่า JSON จาก string ที่ฉีดมาระหว่างการสร้างหน้าต่าง
                // =====================================================================
                const aiaBaseProductMatrix = ${baseMatrixStr};
                const aiaRiderMatrix = ${riderMatrixStr};

                // =====================================================================
                // ⚙️ 2. Core Calculation Functions (Delegated to Origin)
                // =====================================================================
                window.calculateExactPremium = function(productName, gender, age, sumAssured) {
                    if (window.opener && typeof window.opener.calculateExactPremium === 'function') {
                        return window.opener.calculateExactPremium(productName, gender, age, sumAssured);
                    }
                    return { success: false, error: "ไม่สามารถเชื่อมต่อเครื่องยนต์คำนวณจากระบบหลักได้" };
                };

                window.calculateRiderPremium = function(riderName, gender, age, planOrSA) {
                    if (window.opener && typeof window.opener.calculateRiderPremium === 'function') {
                        return window.opener.calculateRiderPremium(riderName, gender, age, planOrSA);
                    }
                    return 0;
                };

                // ==========================================
                // 🧹 Reset UI Function
                // ==========================================
                window.resetDashboardUI = function() {
                    const resetEls = [
                        'log_input_data', 'log_nlp_text', 'log_outlier_warning', 'log_xai_drivers', 
                        'log_counterfactual', 'log_recommender', 'log_lapse_drivers', 'log_consensus_exp', 
                        'log_nn_desc', 'log_executive_summary'
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

                    let barConf = document.getElementById('bar_conf');
                    if(barConf) barConf.style.width = '0%';

                    if(spiderChartInstance) {
                        spiderChartInstance.destroy();
                        spiderChartInstance = null;
                    }
                    
                    let sbRes = document.getElementById('sandbox_results');
                    if(sbRes) sbRes.innerHTML = '<p class="text-slate-500 italic text-center m-auto">รอการจำลองแผน... <br><span class="text-[10px] mt-2 block">(กรุณาจัดพอร์ตและระบุเบี้ยประกันให้ครบถ้วน จากนั้นกด Simulate)</span></p>';
                    
                    predictionCache.clear(); 
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
                    if(dot) dot.style.backgroundColor = '#f59e0b';
                    termLog("Connecting to LocalStorage Bridge...", "warn");

                    try {
                        await new Promise(r => setTimeout(r, 400)); 
                        
                        let crmData = [];
                        
                        if (window.opener && window.opener.crmClientsList && window.opener.crmClientsList.length > 0) {
                            crmData = window.opener.crmClientsList;
                            termLog("🔗 Connected via window.opener (Direct Memory)", "info");
                        } else {
                            let bridgeData = localStorage.getItem('AIDAPC_TEMP_BRIDGE');
                            if (bridgeData) {
                                crmData = JSON.parse(bridgeData);
                                termLog("🔗 Connected via LocalStorage Bridge (Fallback)", "info");
                            } else {
                                throw new Error("ไม่พบข้อมูลสะพานเชื่อมต่อ กรุณาเปิด AiDAPC ใหม่จากหน้าต่างหลัก");
                            }
                        }
                        
                        if (!crmData || crmData.length === 0) throw new Error("ฐานข้อมูล CRM ว่างเปล่า");

                        rawDatabaseCache = {};
                        selector.innerHTML = '<option value="">-- เลือกลูกค้าจากฐานข้อมูล --</option>';
                        
                        let validCount = 0;
                        
                        crmData.forEach(c => {
                            if (!c.fullData || !c.fullData.visits || c.fullData.visits.length === 0) return;
                            
                            let latestVisit = c.fullData.visits[0];
                            let snap = latestVisit.dataSnapshot || {};
                            let dyn = snap.dynamic || {};
                            let prof = snap.profile || {};
                            let ret = snap.retirement || {};

                            const sumVals = (arr) => (arr || []).reduce((sum, item) => sum + (Number(item.val || item[1]) || 0), 0);

                            let tInc = sumVals(dyn.c_inc);
                            
                            let tAst = 0; let liquidAssets = 0;
                            (dyn.c_assets || []).forEach(item => {
                                let cat = String(item.catValue || item.catText || item.type || item[0] || "").trim(); 
                                let v = Number(item.val || item[2] || item[1]) || 0; 
                                tAst += v;
                                if (cat === "สินทรัพย์สภาพคล่อง") liquidAssets += v;
                            });
                            if (liquidAssets === 0 && tAst > 0) liquidAssets = tAst * 0.3;

                            let tExp = 0; let totalDebtPmt = 0;
                            (dyn.c_exp || []).forEach(item => {
                                let cat = String(item.catValue || item.catText || item.type || item[0] || "").trim();
                                let v = Number(item.val || item[2] || item[1]) || 0;
                                tExp += v;
                                if (cat === "เงินชำระคืนหนี้สิน") totalDebtPmt += v;
                            });

                            let tLiab = 0; let badDebt = 0;
                            (dyn.c_liab || []).forEach(item => {
                                let cat = String(item.catValue || item.catText || item.type || item[0] || "").trim();
                                let v = Number(item.val || item[2] || item[1]) || 0;
                                tLiab += v;
                                if (cat === "หนี้สินระยะสั้น") badDebt += v;
                            });

                            if (totalDebtPmt === 0) {
                                (dyn.c_liab || []).forEach(item => {
                                    let pmt = Number(item.pmt || item[2]) || 0;
                                    totalDebtPmt += pmt;
                                });
                            }
                                if (totalDebtPmt === 0 && tLiab > 0) {
                                if (tAst > 50000000) { 
                                    totalDebtPmt = tLiab * 0.005; // กลุ่มเศรษฐี
                                } else {
                                    totalDebtPmt = tLiab * 0.03;  // กลุ่มทั่วไป ประเมินขั้นต่ำ 3%
                                }
                            }
                            
                            let currentInsurance = dyn.c_ins || [];
                            let smartGoals = dyn.c_goals || [];

                            let netWorth = latestVisit.netWorth || (tAst - tLiab);
                            
                            let dtiRatio = 0;
                            if (tInc > 0) dtiRatio = totalDebtPmt / tInc;
                            else if (totalDebtPmt > 0) dtiRatio = 1.0; 
                            dtiRatio = Math.min(1.0, Math.max(0, dtiRatio));
                            let badDebtRatio = tLiab > 0 ? (badDebt / tLiab) : 0;

                            let allNotes = latestVisit.activities ? latestVisit.activities.map(act => act.text).join(" | ") : "";
                            let originalScore = parseFloat(latestVisit.aiScore) || 50;
                            
                            let risk = parseFloat(prof.p_risk) || 0.5;
                            let recency = parseFloat(prof.p_recency) || 0.5;
                            let frequency = parseFloat(prof.p_frequency) || 0.5;
                            let discipline = parseFloat(prof.p_discipline) || 0.5;

                            rawDatabaseCache[c.id] = {
                                id: c.id,
                                name: c.name,
                                age: parseInt(prof.p_age) || 35,
                                gender: prof.p_gender || 'M', 
                                dependents: parseInt(prof.p_dep) || 0,
                                occ: prof.p_occ || 'ไม่ระบุ',
                                retireAge: parseInt(ret.r_retAge) || 60,
                                reqInc: parseFloat(ret.r_reqInc) || 0,
                                inc: tInc,
                                exp: tExp,
                                nw: netWorth,
                                liabilities: tLiab,
                                badDebtRatio: badDebtRatio,
                                assets: tAst,
                                liquidAssets: liquidAssets,
                                dti: dtiRatio,
                                risk: risk,
                                recency: recency,
                                frequency: frequency,
                                discipline: discipline,
                                notes: allNotes,
                                originalScore: originalScore, 
                                existingIns: currentInsurance,
                                goals: smartGoals
                            };

                            selector.innerHTML += '<option value="' + c.id + '">👤 ' + c.id + ' - ' + c.name + '</option>';
                            validCount++;
                        });

                        if(validCount === 0) throw new Error("เจอรายชื่อลูกค้า แต่ไม่มีประวัติการบันทึก (VN) ที่สมบูรณ์");

                        selector.disabled = false; btn.disabled = false;
                        const btnTrain = document.getElementById('btn_train_ai');
                        if (btnTrain) btnTrain.disabled = false;

                        if(dot) dot.style.backgroundColor = '#10b981';
                        termLog('Successfully synced ' + validCount + ' Full-Payload records.', "success");

                    } catch (error) {
                        selector.innerHTML = '<option value="">❌ การเชื่อมต่อล้มเหลว</option>';
                        if(dot) dot.style.backgroundColor = '#ef4444';
                        termLog('Sync Error: ' + error.message, "err");
                    }
                };

                // ==========================================
                // 🎓 AI TRAINING SIMULATOR (Autonomous Local SGD)
                // ==========================================
                window.triggerAILearning = function() {
                    const cId = document.getElementById('sb_crm_selector').value;
                    if (!cId || !rawDatabaseCache[cId]) { 
                        alert("กรุณาเลือกลูกค้าจาก Database และกด Execute ก่อนทำการสอน AI"); 
                        return; 
                    }

                    let data = rawDatabaseCache[cId];
                    let actualOutcome = prompt('คุณประเมินว่าเคสของ ' + data.name + ' มีโอกาสสำเร็จจริงกี่เปอร์เซ็นต์? (0-100)\\n\\n*ระบบจะวิเคราะห์ Loss Function (MSE) และทำการปรับน้ำหนักสมอง (Gradient Descent) บันทึกลงหน่วยความจำถาวรทันที*', "90");
                    
                    if (actualOutcome === null || isNaN(actualOutcome) || actualOutcome === "") return;
                    let targetScore = parseFloat(actualOutcome);

                    termLog('[Training Initiated] FA กำหนดผลลัพธ์จริง (Actual Target) = ' + targetScore + '%', "warn");

                    try {
                        let aiOldScoreEl = document.getElementById('log_nn_score');
                        let currentPrediction = aiOldScoreEl ? parseFloat(aiOldScoreEl.innerText) : window.AIEngineCore.predictSuccessProbability(data);
                        if(isNaN(currentPrediction)) currentPrediction = 50.0;
                        
                        let error = targetScore - currentPrediction;
                        termLog('📉 <b>[Loss Optimization]</b> AI Prediction: ' + currentPrediction.toFixed(1) + '% vs Actual: ' + targetScore + '% (Error: ' + error.toFixed(2) + ')', "math");
                        termLog('⏳ Calculating Gradient Descent & Momentum...', "info");

                        if (window.opener && typeof window.opener.autoTrainNeuralNetworkStep === 'function') {
                            let nnInput = {
                                Age: data.age, Income_Monthly: data.inc, Total_Expenses_Monthly: data.exp,
                                Net_Worth: data.nw, Total_Debt: data.liabilities, Dependents: data.dependents,
                                DTI_Ratio: data.dti, Liquid_Cash: data.liquidAssets || 0, Investments: data.assets - (data.liquidAssets || 0),
                                Debt_Asset_Ratio: data.assets > 0 ? (data.liabilities / data.assets) : 0,
                                Savings_Ratio: data.inc > 0 ? Math.max(0, (data.inc - data.exp) / data.inc) : 0
                            };
                            window.opener.autoTrainNeuralNetworkStep(nnInput, targetScore, 0.01);
                            
                            let clusterEl = document.getElementById('log_persona');
                            if (clusterEl && window.opener.autoUpdateKMeansCentroid) {
                                let currentCluster = clusterEl.innerText.split('\\n')[0].trim();
                                window.opener.autoUpdateKMeansCentroid(currentCluster, 0.05);
                            }
                        }

                        // 🔥 LOCAL SGD BACKPROPAGATION
                        let lr = 0.01; 
                        let w = window.AIEngineCore.getLocalWeights();
                        
                        let n_inc = (data.inc || 0) / 100000;
                        let n_nw = (data.nw || 0) / 1000000;
                        let n_liab = (data.liabilities || 0) / 500000;
                        let n_dti = (data.dti || 0);
                        let n_dep = (data.dependents || 0);

                        w.w_inc += lr * error * n_inc;
                        w.w_nw += lr * error * n_nw;
                        w.w_liab -= lr * error * n_liab; 
                        w.w_dti -= lr * error * n_dti;
                        w.w_dep -= lr * error * n_dep;
                        w.bias += lr * error * 0.1; 
                        
                        localStorage.setItem('AIDAPC_LOCAL_WEIGHTS', JSON.stringify(w));
                        window.AIEngineCore.localWeightsCache = w; 
                        predictionCache.clear(); 
                        
                        termLog('✅ <b>[Local Synapse Updated]</b> AI เรียนรู้และปรับน้ำหนักสมองเรียบร้อยแล้ว (Weights Saved to Core)', "success");
                        termLog('🎯 <b>[K-Means Adjusted]</b> ขยับพิกัดพฤติกรรมเข้าใกล้เป้าหมายใน Local Space', "math");
                        
                    } catch(err) {
                        termLog('❌ <b>[Training Failed]</b> Error updating Synapse: ' + err.message, "err");
                    }
                };

                // ==========================================
                // 🧠 AI Engine Core
                // ==========================================
                window.AIEngineCore = {
                    localWeightsCache: null,
                    
                    cfpDictionary: {
                        outliers: {
                            highIncLowNw: [
                                "💡 <b class='text-orange-400'>ข้อสังเกตด้าน Lifestyle Creep:</b> รายได้กระแสเงินสดสูงมาก แต่การเปลี่ยนเป็น Net Worth ยังทำได้ไม่เต็มประสิทธิภาพ นี่คือจุดที่ระบบขอแนะนำให้เข้าไปอุดรอยรั่วและทำ Wealth Preservation ครับ",
                                "💡 <b class='text-orange-400'>โอกาสในการจัดสรรสินทรัพย์:</b> รายรับดีเยี่ยม แต่สินทรัพย์สะสมยังไม่สะท้อนฐานะที่แท้จริง แนะนำให้เสนอ Asset Allocation เพื่อเร่งการเติบโตแบบมีเสถียรภาพ",
                                "💡 <b class='text-orange-400'>Tax & Efficiency Planning:</b> ลูกค้ามี High Earning Power แต่อาจเสียภาษีเยอะหรือมีรายจ่ายแฝง ระบบขอแนะนำให้ปรับ Tax Optimization และโยกเงินมาสร้างพอร์ตลงทุน",
                                "💡 <b class='text-orange-400'>Opportunity Loss:</b> มี Free Cashflow สูง แต่ขาดการวางโครงสร้างมรดก (Legacy) ที่ชัดเจน นี่คือจังหวะดีที่จะพูดคุยถึงภาพใหญ่ระดับสถาบันครอบครัวครับ"
                            ],
                            highDti: [
                                "🚨 <b class='text-rose-400'>วิกฤตสภาพคล่องตึงตัว (Liquidity Squeeze):</b> ภาระหนี้บริโภคบีบรัดกระแสเงินสดอย่างหนัก (Red Zone) แผนลงทุนความเสี่ยงสูงต้องพักไว้ก่อน และมุ่งเป้าไปที่ Debt Consolidation ทันที",
                                "🚨 <b class='text-rose-400'>Over-leveraged Alert:</b> การใช้ Leverage (หนี้) ค่อนข้างเกินตัว อาจทำให้ทนทานต่อสภาวะดอกเบี้ยขาขึ้น (Rate Hike) ได้ต่ำ ต้องพิจารณาปกป้อง Asset หลักก่อน",
                                "🚨 <b class='text-rose-400'>สัญญาณอันตรายต่อแผนเกษียณ:</b> DTI อยู่ในระดับอันตรายต่อ Retirement Plan หากเกิดเหตุฉุกเฉิน ลูกค้าอาจต้องถูกบังคับขายสินทรัพย์ (Forced Liquidation)",
                                "🚨 <b class='text-rose-400'>Debt Restructuring Needed:</b> สัดส่วนหนี้ค่อนข้างตึงตัวมาก ระบบแนะนำให้มุ่งเน้นการให้คำปรึกษาเรื่องการรวบหนี้เพื่อคืนสภาพคล่องก่อนเสนอโปรดักส์ที่สร้าง Fixed Cost ระยะยาว"
                            ],
                            negCf: [
                                "🌱 <b class='text-red-500'>Cashflow Bleeding (รอยรั่วกระแสเงินสด):</b> อัตราการเผาผลาญเงิน (Burn Rate) สูงกว่ารายรับ ที่ปรึกษาต้องช่วยชี้เป้าลดรายจ่ายเพื่อดึงสภาพคล่องให้กลับมาบวกก่อน",
                                "🌱 <b class='text-red-500'>ความท้าทายระยะสั้น (Short-term Deficit):</b> ปัญหา Negative Cashflow จะส่งผลเสียต่อเป้าหมายระยะยาวทั้งหมด แนะนำให้ชะลอการลงทุนและเน้น Emergency Fund",
                                "🌱 <b class='text-red-500'>Vulnerability to Shock:</b> สภาพคล่องติดลบทำให้เปราะบางต่อวิกฤตชีวิต ให้เน้นระงับรูรั่ว และเตรียมแผนสำรองสำหรับประกันภัยที่ครอบคลุมหนี้สินโดยด่วน"
                            ],
                            normal: [
                                "✅ <b class='text-emerald-400'>Optimal Resilience:</b> โครงสร้างรายได้และสินทรัพย์มีความสมดุลสอดคล้องกัน มีภูมิคุ้มกันทางการเงิน (Financial Resilience) ที่ดีเยี่ยม",
                                "✅ <b class='text-emerald-400'>เสถียรภาพทางความมั่งคั่ง (Wealth Stability):</b> สัดส่วนตัวเลขผ่านเกณฑ์มาตรฐาน Health Check ทำให้มีอิสระในการนำเสนอ Global Allocation ได้เต็มที่",
                                "✅ <b class='text-emerald-400'>ศักยภาพระดับ Legacy:</b> ด้วยฐานรากที่แข็งแกร่ง เป็นจังหวะเหมาะสมที่จะผลักดันสู่การวางแผนประหยัดภาษีขั้นสูงและต่อยอด Estate Planning",
                                "✅ <b class='text-emerald-400'>วินัยการเงินแข็งแกร่ง:</b> Cashflow และ Debt-to-Asset ratio อยู่ในเกณฑ์ที่สมดุลมาก AI ให้ความเชื่อมั่นในการคาดการณ์เคสนี้ระดับสูงสุด"
                            ]
                        },
                        xai: {
                            "Income_Monthly": {
                                pos: [
                                    "📈 <b>Absolute Free Cashflow:</b> รายได้ระดับ High-Tier เปิดโอกาสให้ใช้กลยุทธ์ภาษีขั้นสูงและ Offshore Investment ได้เต็มประสิทธิภาพ",
                                    "📈 <b>Strong Earning Power:</b> กระแสเงินสดรับที่สม่ำเสมอคือฟันเฟืองหลัก (Wealth Engine) ที่เร่งให้เป้าหมายการเงินทุกมิติสำเร็จเร็วขึ้น",
                                    "📈 <b>High Liquidity Generator:</b> ศักยภาพการหารายได้ที่โดดเด่น ทำให้พอร์ตโฟลิโอมีความยืดหยุ่น ทนทานต่อความผันผวนของตลาดการลงทุน",
                                    "📈 <b>Human Capital Premium:</b> มูลค่าความสามารถในการหารายได้ (Human Capital) สูงมาก เป็นโอกาสทองในการเร่งสร้าง Investment Asset",
                                    "📈 <b>Unrestricted Growth:</b> โครงสร้างรายได้เปิดกว้าง ทำให้การทำ Asset Allocation ไร้ข้อจำกัด สามารถบุกและรับได้ในทุกสภาวะเศรษฐกิจ"
                                ],
                                neg: [
                                    "⚠️ <b>Cashflow Bottleneck:</b> รายรับกระแสเงินสดยังมีจำกัด ทำให้ความสามารถในการออมเพื่อพอกพูนความมั่งคั่งถูกจำกัดตามไปด้วย",
                                    "⚠️ <b>Low Earning Leverage:</b> กำลังขับเคลื่อนจากรายได้หลักค่อนข้างอ่อนแอ จำเป็นต้องเน้นพอร์ตแบบป้องกันความเสี่ยง (Defensive) มากกว่าเชิงรุก",
                                    "⚠️ <b>Income Ceiling Alert:</b> รายได้อาจถึงจุดอิ่มตัว ทำให้การขยายพอร์ตความมั่งคั่งทำได้ยากขึ้น หากไม่มีการปรับโครงสร้างรายจ่าย"
                                ],
                                improve: [
                                    "🎯 <b>Income Optimization:</b> หากสามารถหาวิธีเพิ่มกระแสเงินสดรับ (Multiple Income Streams) จะช่วยปลดล็อกข้อจำกัดของพอร์ตได้มหาศาล"
                                ]
                            },
                            "Net_Worth": {
                                pos: [
                                    "💎 <b>Legacy Blueprint:</b> สินทรัพย์ระดับ High-Net-Worth ทำให้จุดโฟกัสเปลี่ยนจากการหาเพิ่ม เป็นการส่งมอบ (Estate Planning) แบบปลอดภาษี",
                                    "💎 <b>Wealth Buffer:</b> ทรัพย์สินสุทธิก้อนนี้คือ 'เบาะนิรภัย' ขนาดใหญ่ ช่วยลด Sequence of Return Risk ในยามตลาดผันผวน",
                                    "💎 <b>Solid Capital Base:</b> ฐานความมั่งคั่งแน่นหนา เปิดโอกาสให้เข้าไปลงทุนใน Alternative Assets หรือ Private Equity เพื่อหา Alpha ได้",
                                    "💎 <b>Generational Wealth:</b> ระดับความมั่งคั่งผ่านจุด Critical Mass ไปแล้ว พอร์ตสามารถสร้างผลตอบแทนทบต้น (Snowball Effect) เลี้ยงตัวเองได้",
                                    "💎 <b>Financial Fortress:</b> ปราการทางการเงินที่แกร่งดั่งหินผา ช่วยพยุงความเสี่ยงทุกด้านของชีวิตให้กลายเป็นเรื่องเล็กน้อย"
                                ],
                                neg: [
                                    "⚠️ <b>Wealth Depletion:</b> ฐานะสุทธิที่ติดลบหรือต่ำเกินไป บ่งบอกว่าความมั่งคั่งกำลังถูกกัดกิน ต้องเร่งแก้ไขฐานรากปิระมิดการเงินทันที",
                                    "⚠️ <b>Capital Squeeze:</b> ทรัพย์สินสะสมยังมีไม่พอที่จะพยุงเป้าหมายเกษียณอายุ (Retirement Gap) ต้องเร่งทำ Wealth Accumulation",
                                    "⚠️ <b>Negative Compounding:</b> หนี้สินที่มากกว่าทรัพย์สินกำลังสร้างหายนะแบบดอกเบี้ยทบต้น (ในทางลบ) แนะนำให้หยุดการสร้างหนี้บริโภค"
                                ],
                                improve: [
                                    "🎯 <b>Asset Compounding:</b> การใช้เวลาเป็นตัวช่วยและทำ Rebalancing จะค่อยๆ ฟื้นฟูฐานะสุทธิให้กลับมาแกร่งในระยะยาว"
                                ]
                            },
                            "DTI_Ratio": {
                                pos: [
                                    "🛡️ <b>Optimal Leverage:</b> ภาระเงินผ่อนต่ำกว่าเกณฑ์มาตรฐาน ทำให้มี 'พื้นที่ว่างทางการเงิน (Financial Room)' เหลือเฟือสำหรับการออมและจัดสรรพอร์ตความเสี่ยง",
                                    "🛡️ <b>Debt Efficiency:</b> โครงสร้างหนี้มีความคุ้มค่า ไม่เป็นภาระต่อ Free Cashflow ทำให้พอร์ตลงทุนไม่ต้องรับแรงกดดัน",
                                    "🛡️ <b>Low Default Risk:</b> ความปลอดหนี้หรือหนี้ต่ำคืออิสรภาพที่แท้จริง ช่วยให้ลูกค้าตัดสินใจลุยเป้าหมายมรดกได้อย่างมั่นใจ",
                                    "🛡️ <b>Credit Agility:</b> สภาพคล่องที่เหลือจากการปลอดหนี้ ทำให้มีความยืดหยุ่นในการขอสินเชื่อเพื่อต่อยอดธุรกิจ (Good Debt) ในอนาคต"
                                ],
                                neg: [
                                    "💳 <b>HENRYs Syndrome (High Earners, Not Rich Yet):</b> ภาระหนี้ที่กดดันระดับนี้กำลังสร้างภาวะ 'รวยแต่เปลือก' ต้องเร่งทำ Debt Consolidation ด่วน",
                                    "💳 <b>Liquidity Crunch:</b> สัดส่วนหนี้บีบรัดจนเข้าสู่ Red Zone แผนลงทุนทุกอย่างต้องพักไว้ก่อน และลุยเจรจาปรับโครงสร้างหนี้",
                                    "💳 <b>Interest Drag:</b> ดอกเบี้ยจ่ายกำลังเผาผลาญความมั่งคั่งอย่างเงียบๆ เป็นตัวถ่วงหลัก (Wealth Drag) ที่ต้องถูกตัดตอน",
                                    "💳 <b>Compound Debt Trap:</b> หากไม่หยุดเพิ่มหนี้บริโภค ดอกเบี้ยทบต้นฝั่งหนี้จะทำลายแผนเกษียณทั้งหมดอย่างย่อยยับ"
                                ],
                                improve: [
                                    "🎯 <b>De-leveraging Strategy:</b> การยุบรวมหนี้เพื่อลดภาระดอกเบี้ย จะช่วยคืนชีพ Cashflow ให้กลับมาลงทุนได้อย่างยั่งยืน"
                                ]
                            },
                            "Total_Expenses_Monthly": {
                                pos: [
                                    "💰 <b>High Savings Ratio:</b> อัตราการออมที่ดีเยี่ยม สะท้อนวินัยการเงินแข็งแกร่ง เป็นฐานรากที่ทำให้ดอกเบี้ยทบต้นทำงานได้เต็มที่",
                                    "💰 <b>Lean Structure:</b> โครงสร้างค่าใช้จ่ายที่กระชับ ทำให้มีกระสุนในการยิงเข้าสู่พอร์ต Asset Allocation ได้สม่ำเสมอ"
                                ],
                                neg: [
                                    "🛍️ <b>Lifestyle Inflation:</b> ค่าใช้จ่ายปัจจุบันขยายตัวตามฐานะ หากเกิดวิกฤต พอร์ตมรดกอาจจะทรุดตัวเร็วกว่ากำหนด",
                                    "🛍️ <b>Cashflow Bleeding:</b> อัตราการเผาผลาญเงิน (Burn Rate) สูงเกินไป ทำให้พลังในการสะสมความมั่งคั่ง (Savings Capacity) อ่อนแอลง"
                                ],
                                improve: [
                                    "🎯 <b>Zero-Based Budgeting:</b> การอุดรอยรั่วรายจ่ายฟุ่มเฟือยด้วยการจัด Bucket Strategy จะสร้าง 'Alpha' ให้พอร์ตได้อย่างมหาศาล"
                                ]
                            },
                            "Total_Debt": {
                                pos: [
                                    "⚖️ <b>Healthy Balance Sheet:</b> งบดุลส่วนบุคคลมีความแข็งแกร่ง ปลอดหนี้สินระยะสั้นที่เป็นมะเร็งร้ายทางการเงิน"
                                ],
                                neg: [
                                    "⚓ <b>Wealth Drag (ตัวถ่วงความมั่งคั่ง):</b> หนี้สินรวมมหาศาลกำลังสร้างแรงกดดันแฝงให้สภาพคล่อง และชะลอเป้าหมายเกษียณอายุ",
                                    "⚓ <b>Liability Overhang:</b> ภาระหนี้ผูกพันระยะยาวทำให้ขีดความสามารถในการจัดพอร์ตลดลงอย่างมีนัยสำคัญ"
                                ],
                                improve: [
                                    "🎯 <b>Debt Restructuring:</b> ปรับโครงสร้างหนี้ระยะยาว หรือขายสินทรัพย์ที่ไม่ก่อเกิดรายได้เพื่อลดภาระดอกเบี้ย"
                                ]
                            },
                            "Dependents": {
                                pos: [
                                    "🏠 <b>Light Burden:</b> ภาระพึ่งพิงต่ำ ทำให้สามารถรับความเสี่ยงทางการลงทุน (Risk Tolerance) ได้สูงขึ้นเพื่อมุ่งเน้น Capital Appreciation"
                                ],
                                neg: [
                                    "👪 <b>Sandwich Generation Trap:</b> ภาระพึ่งพิงแบบรอบด้านคือจุดเปราะบางที่สุด (Vulnerability) ต้องเร่งทำ Income Replacement Guarantee เพื่อปิดความเสี่ยงขั้นเด็ดขาด",
                                    "👪 <b>Family Dependency:</b> ผู้อยู่ในอุปการะทำให้ต้องบริหารเงินแบบระมัดระวังเป็นพิเศษ การโอนความเสี่ยงสุขภาพให้บริษัทประกันคือทางออกที่ฉลาดที่สุด"
                                ],
                                improve: [
                                    "🎯 <b>Protection Focus:</b> ใช้ประกันชีวิตเป็น Leverage สร้างหลักประกันก้อนใหญ่ด้วยเงินก้อนเล็ก เพื่อปกป้องครอบครัว"
                                ]
                            },
                            "Age": {
                                pos: [
                                    "⏳ <b>Time Alpha (ความได้เปรียบทางเวลา):</b> ทุนชีวิตที่ยิ่งใหญ่ที่สุดของคุณคือ 'เวลา' การเริ่มจัดพอร์ตตั้งแต่วัยนี้ ทำให้ดอกเบี้ยทบต้น (Compound Interest) สร้างผลลัพธ์ทวีคูณ",
                                    "⏳ <b>Financial Maturity:</b> ช่วงวัยนี้มีความนิ่งและเข้าใจวัฏจักรเศรษฐกิจ เป็นจังหวะดีที่จะโฟกัสไปที่ Wealth Preservation และการส่งต่อมรดก"
                                ],
                                neg: [
                                    "⏳ <b>Retirement Red Zone:</b> โค้งสุดท้ายก่อนเกษียณ เวลาในการแก้ตัวมีจำกัด ห้ามนำเงินก้อนหลักไปเสี่ยง ต้องเน้น Dividend Portfolio และ Annuity",
                                    "⏳ <b>Time Friction:</b> การมีเวลาน้อยลงทำให้ต้องใช้ 'เงินต้น' มากขึ้นหลายเท่าตัวเพื่อชดเชยพลังของดอกเบี้ยทบต้นที่หายไป"
                                ],
                                improve: [
                                    "🎯 <b>Age-based Rebalancing:</b> ปรับลดสัดส่วนหุ้นลงตามอายุ และเพิ่มสินทรัพย์ที่ให้กระแสเงินสดสม่ำเสมอ (Fixed Income)"
                                ]
                            }
                        }
                    },
                    
                    getLocalWeights: function() {
                        if (this.localWeightsCache) return this.localWeightsCache;
                        try {
                            let saved = localStorage.getItem('AIDAPC_LOCAL_WEIGHTS');
                            if (saved) {
                                this.localWeightsCache = JSON.parse(saved);
                                return this.localWeightsCache;
                            }
                        } catch(e){}
                        this.localWeightsCache = { w_inc: 10, w_nw: 5, w_liab: 2, w_dti: 60, w_dep: 2, bias: 50 };
                        return this.localWeightsCache;
                    },

                    predictSuccessProbability: function(data) {
                        const cacheKey = [data.inc, data.nw, data.liabilities, data.dti, data.dependents].join('_');
                        if(predictionCache.has(cacheKey)) {
                            return predictionCache.get(cacheKey);
                        }

                        let nnInput = {
                            Age: data.age,
                            Income_Monthly: data.inc,
                            Total_Expenses_Monthly: data.exp,
                            Net_Worth: data.nw,
                            Total_Debt: data.liabilities,
                            Dependents: data.dependents,
                            DTI_Ratio: data.dti,
                            Liquid_Cash: data.liquidAssets || 0,
                            Investments: data.assets - (data.liquidAssets || 0),
                            Debt_Asset_Ratio: data.assets > 0 ? (data.liabilities / data.assets) : 0,
                            Savings_Ratio: data.inc > 0 ? Math.max(0, (data.inc - data.exp) / data.inc) : 0
                        };

                        try {
                            if (window.opener && typeof window.opener.predictSuccessProbability === 'function') {
                                let trueScore = window.opener.predictSuccessProbability(nnInput);
                                if (trueScore !== null && !isNaN(trueScore)) {
                                    predictionCache.set(cacheKey, trueScore);
                                    return trueScore; 
                                }
                            }
                        } catch(e) { }

                        let w = this.getLocalWeights();
                        let inc = parseFloat(data.inc) || 0;
                        let nw = parseFloat(data.nw) || 0;
                        let liab = parseFloat(data.liabilities) || 0;
                        let dti = parseFloat(data.dti) || 0;
                        let dep = parseFloat(data.dependents) || 0;
                        let occRiskScore = String(data.occ||"").includes('ราชการ') ? 5 : (String(data.occ||"").includes('อิสระ') ? -5 : 0);

                        let scoreRaw = w.bias 
                                     + ((inc/100000) * w.w_inc) 
                                     + ((nw/1000000) * w.w_nw) 
                                     - ((liab/500000) * w.w_liab) 
                                     - (dti * w.w_dti) 
                                     - (dep * w.w_dep) 
                                     + occRiskScore;
                                     
                        let finalScore = Math.max(1.0, Math.min(99.9, 100 / (1 + Math.exp(-0.05 * (scoreRaw - 50)))));
                        
                        predictionCache.set(cacheKey, finalScore);
                        return finalScore;
                    },

                    detectOutliers: function(data) {
                        let confidence = 95;
                        let warnings = [];
                        
                        termLog('📊 [White-box Outlier Check] Inc=' + data.inc + ', NW=' + data.nw + ', DTI=' + data.dti.toFixed(2) + ', Exp=' + data.exp, "info");

                        if (data.inc > SYS_CONFIG.HIGH_INCOME_THRESHOLD && data.nw < 100000) {
                            confidence -= 18; warnings.push(pickNLG(this.cfpDictionary.outliers.highIncLowNw));
                        }
                        if (data.dti > SYS_CONFIG.CRITICAL_DTI) {
                            confidence -= 15; warnings.push(pickNLG(this.cfpDictionary.outliers.highDti));
                        }
                        if (data.exp > data.inc && data.inc > 0) {
                            confidence -= 20; warnings.push(pickNLG(this.cfpDictionary.outliers.negCf));
                        }

                        if (warnings.length === 0) warnings.push(pickNLG(this.cfpDictionary.outliers.normal));
                        return { conf: Math.max(0, confidence), text: warnings };
                    },

                    analyzeSentiment: function(text) {
                        let safeText = escapeHTML(String(text || ""));
                        let textLower = safeText.toLowerCase();
                        
                        let anxietyWords = ['กังวล', 'เครียด', 'ไม่พอ', 'บ่น', 'หนี้', 'จ่ายขั้นต่ำ', 'ค่าใช้จ่าย', 'ไม่มีเงิน', 'ลดลง', 'ป่วย', 'กู้', 'หนักใจ'];
                        let positiveWords = ['สนใจ', 'ลดหย่อน', 'ลงทุน', 'มรดก', 'ออม', 'เกษียณ', 'วางแผน', 'เป้าหมาย', 'มั่นคง', 'พร้อม'];
                        
                        let anxietyScore = 30; 
                        let highlights = safeText || "ไม่มีประวัติการพูดคุยในระบบ";

                        anxietyWords.forEach(w => {
                            let idx = textLower.indexOf(w);
                            if(idx !== -1) {
                                let context = textLower.substring(Math.max(0, idx - 15), idx);
                                let isNegated = context.includes('ไม่') || context.includes('หาย') || context.includes('ลด');
                                
                                if(!isNegated) {
                                    anxietyScore += 15;
                                    highlights = highlights.replace(new RegExp(w, 'gi'), '<span class="bg-pink-500/40 px-1 rounded border border-pink-500 text-white font-bold">' + w + '</span>');
                                } else {
                                    highlights = highlights.replace(new RegExp(w, 'gi'), '<span class="bg-emerald-500/30 border-b-2 border-emerald-500 text-emerald-300 font-bold">' + w + '</span>');
                                }
                            }
                        });
                        positiveWords.forEach(w => {
                            if(textLower.includes(w)) {
                                anxietyScore -= 10;
                                highlights = highlights.replace(new RegExp(w, 'gi'), '<span class="bg-emerald-500/30 border-b-2 border-emerald-500 text-emerald-300 font-bold">' + w + '</span>');
                            }
                        });

                        return { score: Math.min(99, Math.max(5, anxietyScore)), html: highlights };
                    },

                    generateXAIReport: function(data, currentProb) {
                        try {
                            if (window.opener && typeof window.opener.generateXAIReport === 'function') {
                                let nnInput = {
                                    Age: data.age, Income_Monthly: data.inc, Total_Expenses_Monthly: data.exp,
                                    Net_Worth: data.nw, Total_Debt: data.liabilities, Dependents: data.dependents,
                                    DTI_Ratio: data.dti, Liquid_Cash: data.liquidAssets || 0, Investments: data.assets - (data.liquidAssets || 0),
                                    Debt_Asset_Ratio: data.assets > 0 ? (data.liabilities / data.assets) : 0,
                                    Savings_Ratio: data.inc > 0 ? Math.max(0, (data.inc - data.exp) / data.inc) : 0
                                };
                                let trueXAI = window.opener.generateXAIReport(nnInput, currentProb);
                                if (trueXAI && trueXAI.length > 0) {
                                    termLog("🔍 [White-box] XAI Explainer Generated from Main Core.", "success");
                                    return trueXAI.map(x => ({
                                        feature: x.feature,
                                        impactValue: x.impactValue,
                                        isPositiveFactor: x.isPositiveFactor,
                                        logicReason: x.nlgMessage 
                                    }));
                                }
                            }
                        } catch(e) {}
                        
                        const featuresMap = {
                            'inc': 'Income_Monthly', 'nw': 'Net_Worth', 
                            'liabilities': 'Total_Debt', 'dti': 'DTI_Ratio', 
                            'exp': 'Total_Expenses_Monthly', 'dependents': 'Dependents', 'age': 'Age'
                        }; 
                        
                        let explanations = [];
                        const PERTURBATION_RATE = 0.1; 

                        Object.keys(featuresMap).forEach((featKey) => {
                            let featMappedName = featuresMap[featKey];
                            let originalValue = parseFloat(data[featKey]);
                            if (isNaN(originalValue) || originalValue === 0 && featKey !== 'dependents') return;
                            
                            let delta = originalValue === 0 ? 1 : Math.abs(originalValue * PERTURBATION_RATE);
                            if (featKey === 'dependents') delta = Math.max(1, Math.ceil(delta));
                            
                            let testDataUp = { ...data }; testDataUp[featKey] += delta;
                            let probUp = this.predictSuccessProbability(testDataUp);

                            let testDataDown = { ...data }; testDataDown[featKey] = Math.max(0, testDataDown[featKey] - delta);
                            let probDown = this.predictSuccessProbability(testDataDown);

                            let impactUp = probUp - currentProb;
                            let impactDown = probDown - currentProb;

                            let maxImpact = Math.abs(impactUp) > Math.abs(impactDown) ? impactUp : impactDown;
                            let triggerDirection = Math.abs(impactUp) > Math.abs(impactDown) ? 'up' : 'down';

                            if (Math.abs(maxImpact) >= 1.0) { 
                                let isPositiveFactor = (triggerDirection === 'up' && maxImpact > 0) || (triggerDirection === 'down' && maxImpact > 0);
                                const impactAbs = Math.abs(maxImpact).toFixed(1);
                                
                                const immutableFeatures = ["Age", "Dependents"];
                                let sentiment = "";
                                if (maxImpact > 0 && triggerDirection === 'up') sentiment = "pos";
                                else if (maxImpact < 0 && (triggerDirection === 'up' || (triggerDirection === 'down' && immutableFeatures.includes(featMappedName)))) sentiment = "neg";
                                else if (maxImpact > 0 && triggerDirection === 'down') sentiment = immutableFeatures.includes(featMappedName) ? "pos" : "improve";
                                else if (maxImpact < 0 && triggerDirection === 'down' && !immutableFeatures.includes(featMappedName)) sentiment = "neg";
                                
                                if(!sentiment) sentiment = maxImpact > 0 ? "pos" : "neg";
                                
                                let reason = "";
                                if (this.cfpDictionary.xai[featMappedName] && this.cfpDictionary.xai[featMappedName][sentiment]) {
                                    let variants = this.cfpDictionary.xai[featMappedName][sentiment];
                                    reason = pickNLG(variants);
                                } else {
                                    let thN = { "Income_Monthly":"รายได้", "Total_Debt":"หนี้สิน" }[featMappedName] || featMappedName;
                                    reason = "💡 ข้อมูลด้าน <b>" + thN + "</b> มีนัยสำคัญต่อสมการความสำเร็จของคุณ";
                                }

                                explanations.push({
                                    feature: featMappedName.toUpperCase(),
                                    impactValue: parseFloat(maxImpact.toFixed(2)),
                                    isPositiveFactor: (sentiment === "pos" || sentiment === "improve"),
                                    logicReason: reason
                                });
                            }
                        });
                        explanations.sort((a, b) => Math.abs(b.impactValue) - Math.abs(a.impactValue));
                        return explanations.slice(0, 4); 
                    },

                    generateCounterfactuals: function(data, currentScore) {
                        let plans = [];
                        let debtOptions = [
                            '<div class="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-emerald-400 font-bold block mb-1">🔼 Snowball Debt Elimination:</span> หากลูกค้าสามารถเจรจารวบหนี้ (Debt Consolidation) เพื่อลดภาระดอกเบี้ยจ่ายลงได้ จะเป็นการปลดล็อก Free Cashflow ให้มีกระสุนพร้อมสำหรับลงทุนในวัฏจักรตลาดถัดไปอย่างเต็มเม็ดเต็มหน่วย</div>',
                            '<div class="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-emerald-400 font-bold block mb-1">🔼 Liability Re-structuring:</span> หหนี้สินที่สูงคือมะเร็งร้ายของการลงทุน หากเราจัดระเบียบหนี้ใหม่เพื่อลดยอดผ่อนต่อเดือน จะดึงคะแนน AI โผล่พ้นโซนอันตรายได้ทันที และสร้างสภาพคล่องให้หายใจคล่องขึ้น</div>',
                            '<div class="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-emerald-400 font-bold block mb-1">🔼 High-Interest Debt Avalanche:</span> เสนอให้ลูกค้าระดมเงินโบนัสหรือสภาพคล่องส่วนเกิน ไปโปะหนี้บริโภคที่ดอกเบี้ยแพงที่สุดก่อน เพื่อหยุดการทำงานของดอกเบี้ยทบต้นฝั่งรายจ่าย</div>'
                        ];
                        let saveOptions = [
                            '<div class="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-emerald-400 font-bold block mb-1">🔼 Wealth Automation (DCA):</span> การตั้งระบบตัดบัญชีออมเงินอัตโนมัติ (Pay Yourself First) เพียง ' + formatB(data.inc * 0.1) + '/เดือน จะสร้างเกราะป้องกันด้านวินัย และให้พลังของ Compound Interest ดันความมั่งคั่งให้พุ่งทะยานแบบ Passive</div>',
                            '<div class="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-emerald-400 font-bold block mb-1">🔼 Core-Satellite Portfolio:</span> แนะนำให้ลูกค้าแบ่งเงินออมส่วนหนึ่งเป็นพอร์ตหลักที่เน้นปลอดภัย และแบ่งมาลงทุนในสินทรัพย์เสี่ยง (Satellite) เพื่อหา Alpha ช่วยร่นเวลาการบรรลุเป้าหมายได้อย่างมีนัยสำคัญ</div>',
                            '<div class="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-emerald-400 font-bold block mb-1">🔼 Income Escalation Allocation:</span> ทุกครั้งที่ลูกค้าเงินเดือนขึ้น แนะนำให้จัดสรร 50% ของส่วนที่เพิ่มขึ้นมาออมเพิ่ม (Save More Tomorrow) จะช่วยเร่งเป้าหมายโดยไม่กระทบไลฟ์สไตล์ปัจจุบัน</div>'
                        ];
                        let taxOptions = [
                            '<div class="bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-purple-400 font-bold block mb-1">📈 Tax-Sheltered Growth (กลยุทธ์ประหยัดภาษี):</span> การใช้สิทธิลดหย่อนผ่าน SSF/RMF หรือประกันบำนาญ ไม่เพียงแต่ได้เงินภาษีคืนมาหมุนเวียน แต่ยังถือเป็นการบังคับออมเงินไว้ใช้ยามเกษียณ เป็นการยิงปืนนัดเดียวได้นกสองตัวตามหลักการวางแผนการเงินครับ</div>',
                            '<div class="bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-purple-400 font-bold block mb-1">📈 Tax Optimization:</span> อัตราภาษีที่ลูกค้าจ่ายอยู่ถือเป็นเงินรั่วไหลที่มีมูลค่าสูง การปรับเปลี่ยนช่องทางการรับรายได้ หรือโยกมาลงทุนในสินทรัพย์ที่ได้รับการยกเว้นภาษี จะสร้างผลตอบแทนแฝงที่คุ้มค่ามากครับ</div>'
                        ];
                        let legacyOptions = [
                            '<div class="bg-indigo-900/20 border border-indigo-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-indigo-400 font-bold block mb-1">🛡️ Risk Shifting & Estate Preservation:</span> การแปลงเงินฝากที่ให้ผลตอบแทนต่ำบางส่วน มาจ่ายเบี้ยประกันชีวิตแบบ Whole Life จะสร้างเงินกองทุนมรดก (Legacy Fund) ที่ส่งมอบได้ทันทีแบบปลอดภาษีมรดก ซึ่งเป็นกลยุทธ์การเงินขั้นสูงครับ</div>',
                            '<div class="bg-indigo-900/20 border border-indigo-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-indigo-400 font-bold block mb-1">🛡️ Sequence of Return Hedging:</span> หากเกิดตลาดหุ้นร่วงหนักตอนเกษียณ การดึงเงินจากพอร์ตประกันชีวิตมาใช้ก่อน จะช่วยปกป้องพอร์ตหุ้นไม่ให้พังทลาย (Forced Liquidation) นี่คือข้อดีของการมีประกันไว้ Hedging ครับ</div>'
                        ];
                        let healthOptions = [
                            '<div class="bg-pink-900/20 border border-pink-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-pink-400 font-bold block mb-1">🏥 Wealth Protection (อุดรอยรั่วค่ารักษา):</span> การเจียดสภาพคล่องเพียงเล็กน้อยมาทำประกันสุขภาพเหมาจ่าย จะเสมือนการสร้าง Firewall ปกป้องพอร์ตการลงทุนหลักล้าน ไม่ให้มลายหายไปกับค่าห้องผ่าตัดฉุกเฉินครับ</div>'
                        ];

                        if (data.dti > 0.4) plans.push(pickNLG(debtOptions));
                        else plans.push(pickNLG(saveOptions));

                        plans.push('<div class="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-blue-400 font-bold block mb-1">⏩ Timeline Flexibility:</span> การ <b>"ยืดระยะเวลาเป้าหมายออกไป"</b> หรือลดสัดส่วนการลงทุนใน Asset ที่ผันผวน จะช่วยรักษาสภาพคล่องไว้ได้ โดยที่คะแนนความสำเร็จรวมจะไม่ตกลง เหมาะสำหรับช่วงที่เศรษฐกิจชะลอตัว</div>');
                        
                        if (data.inc > 50000) plans.push(pickNLG(taxOptions));
                        
                        if (data.nw >= 5000000 || data.age > 45) plans.push(pickNLG(legacyOptions));
                        else plans.push(pickNLG(healthOptions));

                        return plans;
                    },

                    recommendProductsXAI: function(data) {
                        let reqEmergency = data.exp * SYS_CONFIG.EMERGENCY_MONTHS;
                        let currentLiquid = data.liquidAssets !== undefined ? data.liquidAssets : data.assets * 0.3; 
                        let gapEmergency = Math.max(0, reqEmergency - currentLiquid);

                        let reqLife = data.liabilities + (data.exp * 12 * 5);
                        if(data.dependents > 0) reqLife += (data.dependents * 1000000);
                        let gapLife = Math.max(0, reqLife - data.nw); 

                        let hasHealth = false;
                        let hasCI = false;
                        (data.existingIns || []).forEach(ins => {
                            let type = String(ins[3] || ins[2] || "").toLowerCase();
                            if(type.includes('สุขภาพ') || type.includes('health') || type.includes('h&s')) hasHealth = true;
                            if(type.includes('โรคร้าย') || type.includes('ci')) hasCI = true;
                        });
                        let gapHealth = (!hasHealth || !hasCI);

                        let products = [];
                        let totalPremiumRec = 0; 

                        if (gapEmergency > 0) {
                            let prem = data.inc * 0.05 * 12;
                            products.push({ name: "Emergency Fund Allocation", match: 92, basePlan: "AIA Smart Select (Unit Linked)", rider: "ไม่มี", gapImpact: "เสริมเบาะรองรับยามฉุกเฉิน", reason: "เตรียมเงินก้อนพร้อมใช้ที่ถอนง่าย ไม่เจ็บตัว เพื่อให้ลูกค้าอุ่นใจว่าหากสะดุด จะมีเงินก้อนนี้ดูแลครอบครัวได้ทันที <br><b class='text-emerald-400'>🤖 [Knapsack Optimization Engine]:</b> อัลกอริทึมจัดสรรแบบ Dynamic Programming เลือกลงทุน Unit-Linked เพื่อหาจุดสมดุลระหว่างผลตอบแทน (Yield) และสภาพคล่อง (Liquidity Premium) ทำให้เบี้ยประกันไม่จมหาย", premium: prem });
                            totalPremiumRec += (prem / 12);
                        }
                        if (gapLife > 0) {
                            let sa = Math.max(100000, gapLife);
                            let prem = data.inc * 0.05 * 12;
                            products.push({ name: "Life & Debt Protection", match: 95, basePlan: "AIA 20 Pay Life", rider: "ไม่มี", gapImpact: "ดูแลครอบครัววงเงิน " + formatB(sa) + " บาท", reason: "สร้างความอุ่นใจว่าความพยายามทั้งหมดของลูกค้าจะไม่สูญเปล่า และไม่ทิ้งภาระไว้ให้คนที่รักหากเกิดเหตุไม่คาดฝัน <br><b class='text-blue-400'>🤖 [Knapsack Optimization Engine]:</b> เลือกแผนส่งเบี้ยสั้นเพื่อลด Liability Overhang แลกกับการล็อกความคุ้มครองระดับสูง (High Leverage Benefit) เป็นเกราะป้องกันการกู้หนี้นอกระบบในยามวิกฤต", premium: prem });
                            totalPremiumRec += (prem / 12);
                        }
                        if (gapHealth) {
                            let totalHealthPrem = 25000; 
                            products.push({ name: "Health & CI Protection", match: 88, basePlan: "AIA 20 Pay Life (ทุนขั้นต่ำ)", rider: "AIA Health Happy + CI Plus", gapImpact: "ปิดความกังวลค่ารักษาพยาบาล", reason: "ยุคนี้ค่ารักษาพยาบาลคือตัวแปรที่ควบคุมยากที่สุด การมีสวัสดิการก้อนนี้จะช่วยล็อกความเสี่ยงให้ลูกค้าไม่ต้องควักเงินเก็บมาจ่ายค่ายา <br><b class='text-pink-400'>🤖 [Knapsack Optimization Engine]:</b> คำนวณแบบ Probability-Weighted ใช้เงินก้อนเล็ก (Fixed Cost) จ่ายซื้อความเสี่ยงระดับอนันต์ (Unlimited Risk) ถือเป็น Trade-off ที่ดีที่สุด เพื่อป้องกันการพังทลายของพอร์ต (Wealth Depletion)", premium: totalHealthPrem });
                            totalPremiumRec += (totalHealthPrem / 12);
                        }
                        
                        if (gapLife <= 0 && !gapHealth) {
                            let prem = data.inc * 0.10 * 12;
                            products.push({ name: "Wealth Accumulation", match: 98, basePlan: "AIA Issara Plus (Unit Linked)", rider: "ไม่มี", gapImpact: "เพิ่มโอกาสรับผลตอบแทนระยะยาว", reason: "โครงสร้างความคุ้มครองพื้นฐานของลูกค้าแน่นหนาแล้ว ตอนนี้คือจังหวะเวลาที่เหมาะสมในการให้เงินออมทำงานหนักขึ้นเพื่อเอาชนะเงินเฟ้อ <br><b class='text-cyan-400'>🤖 [Knapsack Optimization Engine]:</b> เมื่อข้อจำกัดด้าน Risk Gap เป็นศูนย์ (Constraint Resolved) อัลกอริทึมจะเทน้ำหนักไปลงทุนเต็มสูบ (Maximized ROI) เพื่อสร้างโอกาสรับผลตอบแทนชนะเงินเฟ้อ", premium: prem });
                            totalPremiumRec += (prem / 12);
                        }

                        return { 
                            gaps: { emergency: gapEmergency, life: gapLife, health: gapHealth ? "พบช่องโหว่ความคุ้มครอง" : "คุ้มครองครอบคลุมแล้ว" }, 
                            products: products.slice(0, 3),
                            suggestedPremium: totalPremiumRec
                        };
                    },

                    calculateLapseRisk: function(data) {
                        let score = 5;
                        let drivers = [];
                        
                        if(data.dti > SYS_CONFIG.WARNING_DTI) { 
                            score += 40; 
                            drivers.push("🚨 <b>สมการ Logistic Regression (DTI Factor):</b> น้ำหนักความเสี่ยงพุ่งสูง <span class='text-rose-400'>(+40%)</span> เนื่องจากภาระผ่อนชำระหนี้รัดตัว ทำให้ความทนทานในการส่งเบี้ยประกัน (Persistency Rate) ต่ำมาก หากเกิดเหตุฉุกเฉิน ลูกค้ามีโอกาสทิ้งกรมธรรม์สูง"); 
                        }
                        else if(data.dti > SYS_CONFIG.SAFE_DTI) { 
                            score += 15; 
                            drivers.push("⚠️ <b>สมการ Logistic Regression (DTI Factor):</b> ตรวจพบแรงเสียดทาน <span class='text-orange-400'>(+15%)</span> หากเสนอเบี้ยประกันที่ตึงมือเกินไป อาจเกิด Cashflow Bottleneck และบีบให้ลูกค้าต้องเลือกระหว่างกรมธรรม์กับภาระอื่น"); 
                        }

                        if(data.inc < 30000) { 
                            score += 20; 
                            drivers.push("🌱 <b>Income Volatility Penalty:</b> ปรับเพิ่มความเสี่ยง <span class='text-orange-400'>(+20%)</span> เพราะรายได้ยังอยู่ในเกณฑ์เริ่มต้น โอกาสที่กรมธรรม์จะสะดุดจากรายจ่ายฉุกเฉิน (Emergency Expense) ค่อนข้างสูง"); 
                        }
                        if(data.exp > data.inc && data.inc > 0) { 
                            score += 30; 
                            drivers.push("🔥 <b>Liquidity Crunch Detection:</b> <span class='text-rose-400'>(+30% Risk)</span> กระแสเงินสดติดลบอย่างเห็นได้ชัด หากเพิ่มภาระเบี้ยประกันแบบคงที่ (Fixed Premium) จะเป็นการเร่งปฏิกิริยา Lapse ทันที"); 
                        }

                        if(data.badDebtRatio > 0.5 && data.liabilities > 0) {
                            score += 25; 
                            drivers.push("💡 <b>Bad Debt Index:</b> <span class='text-rose-400'>(+25% Risk)</span> โครงสร้างหนี้ส่วนใหญ่เป็น 'หนี้บริโภคดอกเบี้ยสูง' อัลกอริทึมมองว่าเครดิตสกอร์ความสามารถในการชำระหนี้ในอนาคตมีความผันผวนสูง");
                        } else if (data.liabilities > 0 && data.badDebtRatio <= 0.2) {
                            score -= 10; 
                            drivers.push("✅ <b>Credit Reliability Bonus:</b> <span class='text-emerald-400'>(-10% Risk)</span> โครงสร้างหนี้เป็น 'หนี้ดี' (สินเชื่อบ้าน/ธุรกิจเพื่อการเติบโต) อัลกอริทึมลดทอนความเสี่ยงทิ้งกรมธรรม์ให้ เนื่องจากประวัติพฤติกรรมการเงินดีเยี่ยม");
                        }

                        if(score <= 15) drivers.push("🌟 <b>Lapse Immune:</b> โครงสร้าง Cashflow หนาแน่น อัลกอริทึมทำนายว่าการรักษาอัตราความคงอยู่ของกรมธรรม์ (Persistency) มีความแน่นอนสูงเกือบ 100%");

                        return { score: Math.min(99, Math.max(1, score)), drivers: drivers };
                    },

                    KMeans: {
                        Centroids: { 
                            "กลุ่มเปราะบาง/หนี้วิกฤต": { age: 0.3, inc: 0.1, nw: 0.05, risk: 0.2, dti: 0.9, recency: 0.2, frequency: 0.2, discipline: 0.1, dep: 0.8 }, 
                            "วัยทำงานสร้างตัว": { age: 0.2, inc: 0.3, nw: 0.1, risk: 0.7, dti: 0.5, recency: 0.6, frequency: 0.5, discipline: 0.6, dep: 0.2 }, 
                            "ครอบครัวมาตรฐาน": { age: 0.5, inc: 0.5, nw: 0.4, risk: 0.5, dti: 0.4, recency: 0.7, frequency: 0.6, discipline: 0.8, dep: 0.6 }, 
                            "ผู้บริหาร/เจ้าของกิจการ": { age: 0.7, inc: 0.9, nw: 0.8, risk: 0.6, dti: 0.2, recency: 0.8, frequency: 0.4, discipline: 0.9, dep: 0.4 } 
                        },
                        classify: function(data) {
                            let norm = { 
                                age: Math.min(1, data.age/80), 
                                inc: Math.min(1, data.inc/SYS_CONFIG.HIGH_INCOME_THRESHOLD), 
                                nw: Math.min(1, Math.max(0, data.nw)/10000000), 
                                risk: data.risk || 0.5, 
                                dti: Math.min(1, data.dti),
                                recency: data.recency || 0.5,
                                frequency: data.frequency || 0.5,
                                discipline: data.discipline || 0.5,
                                dep: Math.min(1, data.dependents/5)
                            };
                            let closest = "วัยทำงานสร้างตัว"; let minDist = Infinity; let tVec = {};
                            
                            let distanceLog = [];
                            for (let c in this.Centroids) {
                                let sum = 0; let cent = this.Centroids[c];
                                for (let k in norm) sum += Math.pow(norm[k] - (cent[k]||0), 2);
                                let dist = Math.sqrt(sum);
                                distanceLog.push(c + " L2=" + dist.toFixed(3));
                                if (dist < minDist) { minDist = dist; closest = c; tVec = cent; }
                            }
                            termLog("📐 [White-box K-Means] Distance to Centroids: " + distanceLog.join(" | "), "math");
                            
                            try {
                                if (window.opener && typeof window.opener.classifyUserKMeans === 'function') {
                                    let truePersona = window.opener.classifyUserKMeans(
                                        data.age, data.inc, data.nw, data.risk, data.dti, data.recency, data.frequency, data.discipline, data.dependents
                                    );
                                    termLog("📊 [White-box] Executed True Decision Tree Logic -> Cluster: " + truePersona, "highlight");
                                    return { persona: truePersona, clientVector: norm, centroidVector: tVec, minDist: minDist };
                                }
                            } catch(e) {}

                            return { persona: closest, clientVector: norm, centroidVector: tVec, minDist: minDist };
                        }
                    },

                    runConsensus: function(features, mlScore, persona) {
                        let auditTrail = [];
                        let discount = 0; let cap = 100;

                        if (features.exp > features.inc && features.inc > 0) {
                            let monthlyDeficit = features.exp - features.inc; 
                            let liquidBuffer = features.liquidAssets || 0; 
                            let survivalMonths = liquidBuffer > 0 ? (liquidBuffer / monthlyDeficit) : 0; 

                            if (survivalMonths < 3) {
                                cap = 30; 
                                auditTrail.push('<div class="flex justify-between text-rose-500 border-b border-slate-800 pb-2 mb-2"><span><b class="uppercase text-rose-400">[System Heuristic Rule: Critical Burn Rate]</b> กระแสเงินสดติดลบอย่างรุนแรง และเงินสำรองหมดใน ' + survivalMonths.toFixed(1) + ' เดือน ➡️ <b>Consensus Override:</b> บังคับจำกัดคะแนนไม่เกิน 30% (Hard Threshold) เพื่อสะท้อนวิกฤตสภาพคล่องขั้นรุนแรง</span><span class="font-bold ml-2">Max 30%</span></div>');
                            } else if (survivalMonths < 12) {
                                cap = 55;
                                discount += 20;
                                auditTrail.push('<div class="flex justify-between text-orange-400 border-b border-slate-800 pb-2 mb-2"><span><b class="uppercase text-orange-300">[System Heuristic Rule: High Burn Rate]</b> กระแสเงินสดติดลบ แม้มีเงินสำรองแต่จะหมดภายในปีนี้ ➡️ <b>Consensus Override:</b> กดทับ (Bound) คะแนนลงอย่างหนักเพื่อลด Bias ความมั่นใจเกินจริงของ AI</span><span class="font-bold ml-2">-20%</span></div>');
                            } else {
                                discount += 5;
                                auditTrail.push('<div class="flex justify-between text-yellow-400 border-b border-slate-800 pb-2 mb-2"><span><b class="uppercase text-yellow-300">[System Heuristic Rule: Safe Burn Rate]</b> กระแสเงินสดติดลบ แต่มีสินทรัพย์สภาพคล่องสูง รองรับได้เกิน 1 ปี ➡️ <b>Consensus Override:</b> ปรับลดคะแนนเล็กน้อยเพื่อเตือนถึง Opportunity Loss</span><span class="font-bold ml-2">-5%</span></div>');
                            }
                        } 
                        else if (features.dti >= SYS_CONFIG.WARNING_DTI) {
                            cap = 45; 
                            auditTrail.push('<div class="flex justify-between text-orange-400 border-b border-slate-800 pb-2 mb-2"><span><b class="uppercase text-orange-300">[System Heuristic Rule: Debt Overhang]</b> หนี้สินตึงตัวจัด (DTI ' + (features.dti*100).toFixed(0) + '%) ➡️ <b>Consensus Override:</b> บังคับจำกัดคะแนนไม่เกิน 45% ป้องกันระบบ AI ชี้แนะการ Over-selling</span><span class="font-bold ml-2">Max 45%</span></div>');
                        } else if (features.dti >= SYS_CONFIG.SAFE_DTI) {
                            discount += 15; 
                            auditTrail.push('<div class="flex justify-between text-yellow-400 border-b border-slate-800 pb-2 mb-2"><span><b class="uppercase text-yellow-300">[System Heuristic Rule: Liquidity Risk]</b> ประเมินเผื่อความผันผวนจากภาระหนี้ (DTI ' + (features.dti*100).toFixed(0) + '%) ➡️ <b>Consensus Override:</b> หักคะแนนเพื่อสร้าง Safety Margin ในสมการ</span><span class="font-bold ml-2">-15%</span></div>');
                        } else {
                            auditTrail.push('<div class="flex justify-between text-emerald-400 border-b border-slate-800 pb-2 mb-2"><span><b class="uppercase text-emerald-300">[System Heuristic Rule: Healthy]</b> สัดส่วนหนี้ปลอดภัย ไร้ข้อกังวล ➡️ <b>Consensus Override:</b> ให้ความเชื่อมั่นผ่าน (Pass) คงคะแนน AI ไว้ตามเดิม พร้อมลุยกลยุทธ์ Wealth</span><span class="font-bold whitespace-nowrap ml-2">0%</span></div>');
                        }

                        if (features.dependents > 2) {
                            discount += 5; 
                            auditTrail.push('<div class="flex justify-between text-yellow-400 border-b border-slate-800 pb-2 mb-2"><span><b class="uppercase text-yellow-300">[System Heuristic Rule: Dependency Risk]</b> มีบุคคคในอุปการะ ' + features.dependents + ' คน ➡️ <b>Consensus Override:</b> หักคะแนนเผื่อสำรองค่าใช้จ่ายฉุกเฉิน (Income Protection Gap)</span><span class="font-bold whitespace-nowrap ml-2">-5%</span></div>');
                        }

                        let finalScore = mlScore - discount;
                        finalScore = Math.max(1.0, Math.min(finalScore, cap));
                        
                        auditTrail.push('<div class="flex justify-between text-slate-300 border-b border-slate-800 pb-2 mb-2 bg-slate-950 p-2 rounded"><span><b class="uppercase text-cyan-300">[White-Box Math Integration]</b> ML Probability (' + mlScore.toFixed(2) + '%) - Rule Penalties (' + discount.toFixed(2) + '%) = <span class="text-white font-bold">' + (mlScore - discount).toFixed(2) + '%</span> (Capped at ' + cap + '%)</span></div>');

                        auditTrail.push('<div class="mt-3 text-indigo-300 text-center italic text-xs leading-relaxed bg-indigo-900/20 p-2 rounded">"นี่คือกลไกของ <b>Hybrid Co-Advisor Consensus Engine</b>: ระบบจะนำคะแนนดิบ (ML Raw Score) มาผ่านตะแกรงร่อนกฎ Heuristics เชิงลึก เพื่อลดความลำเอียงของอัลกอริทึม (Algorithmic Bias) ทำให้ผลลัพธ์สุดท้ายสอดคล้องกับหลัก Reality-Adjusted มากที่สุดครับ"</div>');

                        return { finalScore: finalScore, discount: discount, auditTrail: auditTrail, baseWithGoals: mlScore };
                    },
                    
                    generateExecutiveSummary: function(data, results) {
                        let p = results.persona;
                        let finalScore = results.con.finalScore;
                        let tone = finalScore > 80 ? "positive" : (finalScore < 50 ? "critical" : "warning");

                        let p1 = '<div class="border-b border-fuchsia-500/30 pb-2 mb-2">' +
                                 '<b class="text-fuchsia-300 text-sm">📊 1. บทสรุปสถานะลูกค้าแบบองค์รวม (Holistic Client Status):</b><br>' +
                                 '<span class="text-slate-300">จัดอยู่ในกลุ่ม <b>"' + p + '"</b> มีโอกาสบรรลุเป้าหมายการเงินภาพรวมที่ <b>' + finalScore.toFixed(1) + '%</b></span><br>';
                                 
                        if (tone === "critical") p1 += '<span class="text-rose-400 font-bold mt-1 block">🤝 ข้อเสนอแนะสำหรับการเข้าพบ (Advisory Strategy): คะแนนนี้สะท้อนภาวะตึงตัว (Liquidity Squeeze) แนะนำให้เข้าพบในฐานะ "ที่ปรึกษาองค์รวม" รับฟังปัญหาและช่วยวางแผนโครงสร้างหนี้ (Debt Consolidation) หรือเสนอให้เริ่มออมเพื่อปิดรูรั่ว (Quick Win) พร้อมแนะนำกลยุทธ์ภาษีเบื้องต้นเพื่อสร้างกำลังใจ แทนที่จะกดดันด้วยพอร์ตประกันขนาดใหญ่ที่จะสร้าง Fixed Cost ครับ</span>';
                        else if (tone === "positive") p1 += '<span class="text-emerald-400 font-bold mt-1 block">🌟 ข้อเสนอแนะสำหรับการเข้าพบ (Advisory Strategy): ลูกค้ามีความพร้อมเต็มพิกัด (Solid Financial Base) เหมาะมากที่จะพูดคุยถึงวิสัยทัศน์ระยะยาว การทำ Global Asset Allocation, การวางแผนลดหย่อนภาษีขั้นสูง (Tax Shield), หรือการส่งต่อมรดก (Legacy Planning) ซึ่งเปิดโอกาสให้โชว์ความเป็นมืออาชีพแบบครบวงจรและยกระดับพอร์ตของลูกค้าให้ทะยานขึ้นไปอีกระดับครับ</span>';
                        else p1 += '<span class="text-orange-400 font-bold mt-1 block">💡 ข้อเสนอแนะสำหรับการเข้าพบ (Advisory Strategy): ภาพรวมไปได้ดี มีเสถียรภาพระดับกลาง (Moderate Resilience) แต่อาจมีรายละเอียดด้านสภาพคล่องหรือภาษีที่ที่ปรึกษาการเงินสามารถช่วย Optimize ให้ดีขึ้นได้ (เช่น ปิดช่องโหว่ความเสี่ยงสุขภาพเพื่อป้องกัน Wealth Depletion หรือลดค่าใช้จ่ายแฝง) เพื่อให้แผนการเงินของลูกค้าทนทานต่อสภาวะเศรษฐกิจ (Economic Headwinds) มากขึ้นครับ</span>';
                        
                        p1 += '<span class="text-indigo-300 mt-2 pt-2 border-t border-indigo-500/30 block text-[11px] leading-relaxed"><b>🔍 บริบทการเงิน (Contextual Recap):</b> จากโครงสร้างรายได้ ทรัพย์สิน และภาษี ระบบมองเห็นศักยภาพการเติบโตที่น่าสนใจ แต่ก็ยังมีจุดแข็งจุดอ่อนตามวัย คะแนน ' + finalScore.toFixed(1) + '% สะท้อนความพร้อมในวันนี้ ซึ่งการวางแผนที่ถูกต้องจะเป็นกุญแจสำคัญในการนำทางพาลูกค้าขยับเข้าใกล้ 100% ด้วยการออกแบบเครื่องมือการเงินที่ "พอดีตัว" อย่างมืออาชีพครับ</span>';
                        p1 += '</div>';

                        let p3 = '<div><b class="text-fuchsia-300 text-sm">💼 2. แผนที่ควรเสนอเป็นแนวทาง (Suggested Portfolio Focus):</b><br><ul class="list-disc pl-5 mt-1 text-slate-300 space-y-1">';
                        results.rec.products.forEach(prod => {
                            p3 += '<li><b>' + prod.name + ':</b> ' + prod.reason + '</li>';
                        });
                        p3 += '</ul></div>';

                        return '<div class="space-y-3 text-[12px] bg-slate-900/50 p-4 rounded-lg border border-slate-700">' + p1 + '<br>' + p3 + '</div>';
                    }
                };

                // ==========================================
                // 🧪 12. Interactive Sandbox Simulator Functions
                // ==========================================
                window.initSandboxDropdowns = function() {
                    // 🌟 [FIX] สร้าง Datalist สำหรับ Base Plan
                    const dlBase = document.getElementById('dl_base_plans');
                    if(dlBase && Object.keys(aiaBaseProductMatrix).length > 0) {
                        let options = '';
                        Object.keys(aiaBaseProductMatrix).forEach(p => {
                            let typeInfo = aiaBaseProductMatrix[p].type;
                            options += '<option value="' + p + '">[' + typeInfo + ']</option>';
                        });
                        dlBase.innerHTML = options;
                    }

                    // 🌟 [FIX] เตรียม Datalist สำหรับ Rider ไว้ด้วย (ใช้ร่วมกันได้ทุกแถวที่เพิ่ม)
                    let dlRider = document.getElementById('dl_rider_plans');
                    if(!dlRider) {
                        document.body.insertAdjacentHTML('beforeend', '<datalist id="dl_rider_plans"></datalist>');
                        dlRider = document.getElementById('dl_rider_plans');
                    }
                    if (Object.keys(aiaRiderMatrix).length > 0) {
                        let riderOptions = '';
                        Object.keys(aiaRiderMatrix).forEach(r => {
                            let cat = aiaRiderMatrix[r].category;
                            riderOptions += '<option value="' + r + '">[' + cat + ']</option>';
                        });
                        dlRider.innerHTML = riderOptions;
                    }

                    window.handleBasePlanChange(); 
                };

                window.handleBasePlanChange = function() {
                    const baseInput = document.getElementById('sandbox_base_plan');
                    const btnAddRider = document.getElementById('btn_add_rider');
                    if(baseInput && btnAddRider) {
                        // เช็คว่าค่าที่ลูกค้าพิมพ์มา มีอยู่ใน Database SSOT หรือไม่
                        if(baseInput.value.trim() !== "" && aiaBaseProductMatrix[baseInput.value.trim()]) {
                            btnAddRider.disabled = false;
                            btnAddRider.classList.remove('opacity-50', 'cursor-not-allowed');
                        } else {
                            btnAddRider.disabled = true;
                            btnAddRider.classList.add('opacity-50', 'cursor-not-allowed');
                            document.getElementById('sandbox_riders_container').innerHTML = '';
                        }
                    }
                };

                window.addRiderRow = function() {
                    const container = document.getElementById('sandbox_riders_container');
                    const rowId = 'rider_row_' + Date.now();
                    
                    // 🌟 [FIX] เปลี่ยนเป็น input type="text" คล้องกับ Datalist
                    const rowHtml = '<div id="' + rowId + '" class="flex gap-2 rider-item pb-1">' +
                        '<input type="text" list="dl_rider_plans" class="sandbox-rider-select flex-1 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500" placeholder="-- พิมพ์ค้นหาสัญญาเพิ่มเติม --" oninput="window.autoCalcRiderPremium(this)">' +
                        '<input type="number" class="sandbox-rider-sa w-24 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500" placeholder="แผน/ทุน" oninput="window.autoCalcRiderPremium(this)">' +
                        '<input type="number" class="sandbox-rider-prem w-28 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500" placeholder="เบี้ย (บาท/ปี)">' +
                        '<button onclick="this.parentElement.remove()" class="text-rose-400 hover:text-rose-300 px-2 font-bold transition">✕</button>' +
                    '</div>';
                    
                    container.insertAdjacentHTML('beforeend', rowHtml);
                };

                window.autoCalcBasePremium = function() {
                    const cId = document.getElementById('sb_crm_selector').value;
                    if (!cId || !rawDatabaseCache[cId]) return;
                    let data = rawDatabaseCache[cId];
                    let baseName = document.getElementById('sandbox_base_plan').value;
                    let baseSA = parseFloat(document.getElementById('sandbox_base_sa').value) || 0;
                    
                    // วิ่งไปขอผลคำนวณจากหน้าต่างแม่ (SSOT)
                    if(baseName && baseSA > 0) {
                        let res = calculateExactPremium(baseName, data.gender, data.age, baseSA);
                        if(res.success) {
                            document.getElementById('sandbox_base_prem').value = res.premium.toFixed(0);
                        }
                    }
                };

                window.autoCalcRiderPremium = function(inputEl) {
                    const cId = document.getElementById('sb_crm_selector').value;
                    if (!cId || !rawDatabaseCache[cId]) return;
                    let data = rawDatabaseCache[cId];
                    let row = inputEl.parentElement;
                    let rName = row.querySelector('.sandbox-rider-select').value;
                    let rSA = parseFloat(row.querySelector('.sandbox-rider-sa').value) || 0;
                    
                    // วิ่งไปขอผลคำนวณจากหน้าต่างแม่ (SSOT)
                    if(rName && rSA > 0) {
                        let prem = calculateRiderPremium(rName, data.gender, data.age, rSA);
                        if(prem > 0) {
                            row.querySelector('.sandbox-rider-prem').value = prem.toFixed(0);
                        }
                    }
                };

                window.runSandboxSimulation = function() {
                    const cId = document.getElementById('sb_crm_selector').value;
                    if (!cId || !rawDatabaseCache[cId]) { alert("กรุณาเปิดการเชื่อมต่อและ Run Diagnostics ของลูกค้าก่อนทำการจำลองแผนครับ"); return; }
                    
                    let data = rawDatabaseCache[cId];
                    let baseName = document.getElementById('sandbox_base_plan').value;
                    let baseSA = parseFloat(document.getElementById('sandbox_base_sa').value) || 0;
                    let basePrem = parseFloat(document.getElementById('sandbox_base_prem').value) || 0;

                    if (!baseName || basePrem <= 0) {
                        document.getElementById('sandbox_results').innerHTML = '<p class="text-rose-400 text-center italic mt-10">⚠️ กรุณาระบุสัญญาหลักและเบี้ยประกันให้ครบถ้วนเพื่อจำลองแผนอย่างแม่นยำ</p>';
                        return;
                    }

                    let totalPremium = basePrem;
                    let portfolioHtml = '<div class="flex justify-between items-center text-[11px] text-slate-300"><span class="flex-1 truncate pr-2">✅ ' + baseName + ' (ทุน ' + formatB(baseSA) + ')</span><span class="text-cyan-300">' + formatB(basePrem) + '</span></div>';
                    
                    let gapLifeClosed = baseSA;
                    let gapHealthClosed = false;

                    const riderSelects = document.querySelectorAll('.sandbox-rider-select');
                    const riderSAs = document.querySelectorAll('.sandbox-rider-sa');
                    const riderPrems = document.querySelectorAll('.sandbox-rider-prem');

                    for(let i=0; i<riderSelects.length; i++) {
                        let rName = riderSelects[i].value;
                        let rSA = parseFloat(riderSAs[i].value) || 0;
                        let rPrem = parseFloat(riderPrems[i].value) || 0;
                        
                        if(rName && rPrem > 0) {
                            totalPremium += rPrem;
                            portfolioHtml += '<div class="flex justify-between items-center text-[11px] text-slate-300 mt-1"><span class="flex-1 truncate pr-2">➕ ' + rName + ' (ทุน/แผน ' + formatB(rSA) + ')</span><span class="text-cyan-300">' + formatB(rPrem) + '</span></div>';
                            
                            let cat = aiaRiderMatrix[rName] ? aiaRiderMatrix[rName].category : "";
                            if(cat === "Health" || cat === "CI") {
                                gapHealthClosed = true;
                            }
                        }
                    }

                    let annualIncome = data.inc * 12;
                    let premiumRatio = annualIncome > 0 ? (totalPremium / annualIncome) * 100 : 100;
                    
                    let reqLife = data.liabilities + (data.exp * 12 * 5);
                    if(data.dependents > 0) reqLife += (data.dependents * 1000000);
                    let initialLifeGap = Math.max(0, reqLife - data.nw);
                    let initialHealthGapStr = window.AIEngineCore.recommendProductsXAI(data).gaps.health;
                    
                    let coverageLifePercent = initialLifeGap > 0 ? Math.min(100, (gapLifeClosed / initialLifeGap) * 100) : (gapLifeClosed > 0 ? 100 : 0);

                    let verdictHtml = '';
                    let tradeOffHtml = '';
                    
                    if (premiumRatio > 20) {
                        verdictHtml = '<span class="text-rose-400 block mb-1">🚨 <b>ความท้าทายด้านสภาพคล่อง (High Premium Burden):</b></span> อัตราส่วนชำระเบี้ยประกันต่อรายได้ (Premium to Income Ratio: PIR) พุ่งไปถึง ' + premiumRatio.toFixed(1) + '% ซึ่งเกินเกณฑ์มาตรฐานไม่ควรเกิน 10-15% อาจส่งผลกระทบต่อค่าใช้จ่ายในชีวิตประจำวันและเกิดปัญหาสภาพคล่องช็อต (Liquidity Crunch) แนะนำให้ปรับโครงสร้างพอร์ตด่วน';
                        tradeOffHtml = '<br><br><span class="text-rose-300">⚖️ <b>มุมมองจากการวิเคราะห์:</b> <span class="text-slate-300">ต้นทุน (Cost) สูงเกินไปจนบีบคั้นสภาพคล่องปัจจุบัน (Negative Cost/Benefit) ซึ่งขัดหลักการบริหารความเสี่ยง ระบบขอแนะนำให้ปรับแผนเชิงรุกโดยการลดทุนประกัน (SA) หรือถอด Rider ที่ทับซ้อนออก เพื่อดึงพอร์ตกลับมาสู่โซนปลอดภัย ป้องกันการบังคับเวนคืนกรมธรรม์ในอนาคต</span></span>';
                    } else if (premiumRatio > 15) {
                        verdictHtml = '<span class="text-orange-400 block mb-1">⚠️ <b>ข้อควรระวัง (Gentle Reminder):</b></span> อัตราส่วนชำระเบี้ยประกันต่อรายได้ (PIR) อยู่ที่ ' + premiumRatio.toFixed(1) + '% เริ่มค่อนข้างตึงมือตามสัดส่วนการเงินส่วนบุคคล ควรวิเคราะห์กระแสเงินสดสำรอง (Emergency Fund) เชิงลึกให้แน่ใจก่อนการประทับตรานำเสนอ';
                        tradeOffHtml = '<br><br><span class="text-orange-300">⚖️ <b>มุมมองจากการวิเคราะห์:</b> <span class="text-slate-300">แม้จะได้ผลประโยชน์ (Benefit) สูงในการอุดรอยรั่วที่กว้างขึ้น แต่ต้องแลกมากับต้นทุนคงที่ (Fixed Cost) ที่ค่อนข้างหนัก ควรพิจารณาให้คำปรึกษาเพื่อดึง Commitment จากลูกค้า และให้ฉุกคิดว่า หากขาดรายได้ 3-6 เดือน จะยังรักษาความคุ้มครองนี้ไว้ได้หรือไม่? หากยังไม่พร้อม ควรพิจารณาปรับลดแผนลงก่อน</span></span>';
                    } else if (gapLifeClosed > 0 || gapHealthClosed) {
                        verdictHtml = '<span class="text-emerald-400 block mb-1">✅ <b>ความอุ่นใจที่คุ้มค่า (Optimal Balance):</b></span> อัตราส่วนชำระเบี้ยประกันต่อรายได้ (PIR) อยู่ที่ ' + premiumRatio.toFixed(1) + '% ซึ่งเป็นสัดส่วนที่ชาญฉลาด สามารถถ่ายโอนความเสี่ยงก้อนใหญ่ (Risk Transfer) ให้บริษัทประกันได้สำเร็จ ถือเป็นการจัดสรรเงิน (Good Expense) ที่มีประสิทธิภาพยอดเยี่ยมตามหลักการวางแผนการเงิน';
                        tradeOffHtml = '<br><br><span class="text-emerald-300">⚖️ <b>มุมมองจากการวิเคราะห์:</b> <span class="text-slate-300">การจัดสรรกระแสเงินสดปัจจุบันในระดับที่เหมาะสม (Low Cost) แลกกับการอุดรอยรั่วทางการเงินระดับล้านบาท และปกป้องเงินเก็บทั้งชีวิต (High Benefit) ถือเป็นจุดสมดุล (Sweet Spot) ที่คุ้มค่าที่สุด สามารถมั่นใจในการนำเสนอแผนนี้ให้ลูกค้าพิจารณาตัดสินใจ (Execute) ได้ทันที</span></span>';
                    } else {
                        verdictHtml = '<span class="text-blue-400 block mb-1">ℹ️ <b>แผนสะสมความสุขและมรดก (Wealth & Legacy):</b></span> สัดส่วนเบี้ย ' + premiumRatio.toFixed(1) + '% ของรายได้ อยู่ในเกณฑ์ที่ยอดเยี่ยม ลูกค้าสามารถจ่ายได้สบายและมีเสถียรภาพ เหมาะสำหรับการต่อยอด Asset Allocation, Tax Planning หรือสร้างกองทุนเกษียณอายุระยะยาว';
                        tradeOffHtml = '<br><br><span class="text-blue-300">⚖️ <b>มุมมองจากการวิเคราะห์:</b> <span class="text-slate-300">การเจียดสภาพคล่องปัจจุบัน (Cost) เพื่อแลกกับโอกาสรับผลตอบแทนและสิทธิประโยชน์ทางภาษีในอนาคต (Future Benefit) เป็นการเดินเกมสู่ความมั่งคั่ง ระบบแนะนำให้มุ่งเน้นการให้คำปรึกษาชี้ชวนให้เห็นถึงพลังของดอกเบี้ยทบต้น (Compound Interest) และตรวจสอบให้แน่ใจอีกครั้งว่าฐานรากปิระมิดการเงินด้านความคุ้มครองของลูกค้านั้นแข็งแกร่งเพียงพอแล้วก่อนขยับมาโฟกัสที่ Wealth Portfolio</span></span>';
                    }
                    
                    verdictHtml += tradeOffHtml;

                    let gapStatusHtml = '';
                    if (gapLifeClosed > 0) {
                        gapStatusHtml += '<div class="text-[11px] text-blue-300 mt-1.5 flex items-start gap-1"><span>🛡️</span><span><b>Life Gap:</b> ปิดความเสี่ยงได้ <b>' + coverageLifePercent.toFixed(1) + '%</b> ของความเสี่ยงทั้งหมด สร้างหลักประกันมรดกและปิดตายความเสี่ยงหนี้ตกทอดได้ทันที <b>' + formatB(gapLifeClosed) + '</b> บาท</span></div>';
                    }
                    if (gapHealthClosed) {
                        gapStatusHtml += '<div class="text-[11px] text-pink-300 mt-1 flex items-start gap-1"><span>🏥</span><span><b>Health Gap:</b> ความเสี่ยงด้านค่ารักษาพยาบาล/โรคร้ายแรง ถูกโอนย้ายไปยังบริษัทประกัน <b>100%</b> (Safe Zone) ตัดปัญหาล้มละลายจากค่ารักษาพยาบาล และรักษาสภาพคล่องไว้ได้</span></div>';
                    }

                    let faTalkingPoints = '<div class="mt-4 bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/50 shadow-sm">' +
                        '<span class="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block mb-1.5">💬 4. Advisory Talking Points & Objection Handling (บทสนทนา & การตอบข้อโต้แย้งระดับองค์รวม)</span>' +
                        '<ul class="list-disc pl-4 text-[11px] text-slate-300 space-y-2 leading-relaxed">' +
                            '<li><b>ภาพรวมการเงิน (Financial Overview):</b> "ในฐานะนักวางแผนการเงิน โครงสร้างกระแสเงินสดและหนี้สินของคุณลูกค้าอยู่ในเกณฑ์ที่บริหารจัดการได้ดีครับ แต่เมื่อเรามองในมุมของการส่งต่อความมั่งคั่งและภาษี ระบบพบว่าเรายังมีจุดที่สามารถ Optimize ให้ดีขึ้นได้ในส่วนของ..."</li>' +
                            '<li><b>การปิดความเสี่ยง (Risk Gap Action):</b> "หากเกิดวิกฤตเศรษฐกิจหรือเหตุไม่คาดฝัน พอร์ตการลงทุนที่เราสร้างมาอาจสะดุด แผนที่เราจัดสรรนี้ ใช้เงินเพียง ' + formatB(totalPremium) + '/ปี เพื่อสร้าง Firewall ปกป้องความมั่งคั่งทั้งหมดครับ มูลค่าความคุ้มครองที่ ' + formatB(gapLifeClosed) + ' บาท สามารถครอบคลุมความเสี่ยงได้ถึง ' + coverageLifePercent.toFixed(1) + '% ของแผนชีวิตคุณลูกค้าครับ"</li>' +
                            '<li><b>การลงทุน & ภาษี (Wealth & Tax Benefit):</b> "เงินก้อนนี้คิดเป็นเพียง ' + premiumRatio.toFixed(1) + '% ของรายได้ต่อปี ซึ่งต่ำกว่าเกณฑ์มาตรฐาน ทำให้สภาพคล่องไม่ช็อต แถมยังได้ประโยชน์ในการกระจายความเสี่ยง (Diversification) และสิทธิประโยชน์ทางภาษี (Tax Shield) เต็มจำนวน เป็นการปกป้อง Net Worth ที่ ' + formatB(data.assets) + ' จากภาวะฉุกเฉินครับ"</li>' +
                            '<li><b>การตอบข้อโต้แย้ง (Handling Objection):</b> หากลูกค้าบอกว่าเบี้ยประกันแพงไป แนะนำให้ลงทุนเองดีกว่า: <br><span class="text-indigo-200">"ผมเห็นด้วยครับว่าการลงทุนให้ผลตอบแทนที่จูงใจกว่า แต่ตามหลักปิระมิดการเงิน (Financial Pyramid) สินทรัพย์การลงทุน (Investment Asset) มีความผันผวนสูง หากเกิดเหตุฉุกเฉินทางการแพทย์ เราอาจถูกบังคับขายหุ้นหรือกองทุนในจุดที่ขาดทุน (Forced Liquidation) การกันเงินก้อนเล็กๆ ไว้ตรงนี้ คือการซื้อความอิสระให้พอร์ตการลงทุนได้เติบโตโดยไม่ต้องกังวลถึงความเสี่ยงครับ"</span></li>' +
                            '<li><b>Commitment Check:</b> "แผนการเงินแบบองค์รวมนี้ จะไม่กระทบสภาพคล่องและแผนเกษียณที่คุณลูกค้าวางไว้ใช่ไหมครับ? ถ้าระบบของเราเช็คแล้วว่า Cashflow ปลอดภัย เราสามารถเริ่ม Execute ตามแผนที่วางไว้เพื่อสร้างเกราะกำบังนี้ได้เลยครับ"</li>' +
                        '</ul>' +
                    '</div>';

                    let reportHtml = '<div class="mb-3 border-b border-slate-700 pb-3">' +
                        '<span class="text-[10px] text-fuchsia-400 font-bold uppercase tracking-wider block mb-2">📋 1. Recap ข้อมูลลูกค้า (Before Setup)</span>' +
                        '<div class="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[10.5px] text-slate-300 bg-slate-900/50 p-2.5 rounded border border-slate-700 shadow-inner">' +
                            '<div><b>รายได้ต่อปีโดยประมาณ:</b> <span class="text-white">' + formatB(annualIncome) + '</span></div>' +
                            '<div><b>รายจ่ายต่อปีโดยประมาณ:</b> <span class="text-white">' + formatB(data.exp * 12) + '</span></div>' +
                            '<div><b>Life Gap เดิม:</b> <span class="text-rose-300">' + formatB(initialLifeGap) + '</span></div>' +
                            '<div><b>Health Gap เดิม:</b> <span class="text-rose-300">' + (initialHealthGapStr.includes("พบ") ? "ยังขาดคุ้มครอง" : "คุ้มครองครอบคลุมแล้ว") + '</span></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="mb-3 border-b border-slate-700 pb-3">' +
                        '<span class="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-2">📦 2. การจัดสรรพอร์ต (Proposed Portfolio)</span>' +
                        '<div class="bg-slate-900/50 p-2.5 rounded border border-slate-700 shadow-inner space-y-1">' +
                            portfolioHtml +
                            '<div class="flex justify-between items-center border-t border-slate-700 mt-2 pt-2">' +
                                '<span class="font-bold text-[11px] text-slate-200">เบี้ยประกันรวม (ต่อปี)</span>' +
                                '<span class="text-sm font-black text-cyan-400">' + formatB(totalPremium) + '</span>' +
                            '</div>' +
                            '<div class="flex justify-between items-center text-[9px] text-slate-400 mt-0.5">' +
                                '<span class="' + (premiumRatio > 15 ? 'text-orange-400' : 'text-emerald-400') + '">คิดเป็น ' + premiumRatio.toFixed(1) + '% ของรายได้</span>' +
                                '<span>(เฉลี่ย ' + formatB(totalPremium/12) + ' / เดือน)</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="bg-slate-800/80 p-3 rounded-lg border border-slate-600 shadow-sm">' +
                        '<span class="text-[10px] text-orange-400 font-bold uppercase tracking-wider block mb-1.5">🧠 3. AI Verdict (วิเคราะห์ความเหมาะสมองค์รวม)</span>' +
                        '<p class="text-[11px] text-slate-300 leading-relaxed">' + verdictHtml + '</p>' +
                        '<div class="mt-2 pt-2 border-t border-slate-700">' +
                            (gapStatusHtml || '<p class="text-[10px] text-slate-500 italic">- ไม่ได้จัดสรรแผนเพื่อปิดช่องโหว่ด้าน Life / Health โดยตรง -</p>') +
                        '</div>' +
                    '</div>' + faTalkingPoints;

                    document.getElementById('sandbox_results').innerHTML = reportHtml;
                    termLog("🎛️ Custom Portfolio Simulated Successfully.", "success");
                };

                // ==========================================
                // 🚀 UI Renderer & Execution
                // ==========================================
                window.runFullDiagnostics = function() {
                    const cId = document.getElementById('sb_crm_selector').value;
                    if (!cId || !rawDatabaseCache[cId]) { alert("กรุณาเลือกลูกค้าจาก Database"); return; }
                    
                    let data = rawDatabaseCache[cId];
                    termLog('Pipeline Executing for: ' + cId, "highlight");

                    let displayData = { ...data };
                    delete displayData.rawProfile; delete displayData.rawRetirement; 
                    
                    const dictMap = {
                        id: "รหัสลูกค้า (ID)", name: "ชื่อลูกค้า", age: "อายุ (ปี)", gender: "เพศ",
                        dependents: "ผู้อยู่ในอุปการะ (คน)", occ: "อาชีพ", retireAge: "อายุเกษียณคาดหวัง",
                        reqInc: "รายได้หลังเกษียณที่ต้องการ/เดือน", inc: "รายรับรวม/เดือน", exp: "รายจ่ายรวม/เดือน",
                        nw: "ความมั่งคั่งสุทธิ (Net Worth)", liabilities: "หนี้สินรวม", badDebtRatio: "สัดส่วนหนี้บริโภค/หนี้รวม",
                        assets: "สินทรัพย์รวม", liquidAssets: "สินทรัพย์สภาพคล่อง", dti: "อัตราส่วนภาระหนี้ต่อรายได้ (DTI)",
                        risk: "ระดับความเสี่ยงที่รับได้", recency: "ความเคลื่อนไหวล่าสุด (Recency)",
                        frequency: "ความถี่ในการทำธุรกรรม (Frequency)", discipline: "วินัยการออม (Discipline)",
                        notes: "บันทึกการสนทนา (Notes)", originalScore: "คะแนนตั้งต้นจาก CRM",
                        existingIns: "กรมธรรม์ที่มีอยู่", goals: "เป้าหมาย (Goals)", occType: "กลุ่มความเสี่ยงอาชีพ"
                    };
                    let translatedData = {};
                    for(let key in displayData) {
                        let mappedKey = dictMap[key] || key;
                        translatedData[mappedKey] = displayData[key];
                    }
                    document.getElementById('log_input_data').innerText = JSON.stringify(translatedData, null, 2);

                    let nlp = window.AIEngineCore.analyzeSentiment(data.notes);
                    document.getElementById('log_nlp_text').innerHTML = nlp.html;
                    document.getElementById('log_nlp_score').innerText = nlp.score + "%";

                    let outlier = window.AIEngineCore.detectOutliers(data);
                    document.getElementById('log_conf_score').innerText = outlier.conf + "%";
                    document.getElementById('bar_conf').style.width = outlier.conf + "%";
                    document.getElementById('log_outlier_warning').innerHTML = outlier.text.map(t => '<p class="' + (t.includes('⚠️') ? 'text-orange-400' : 'text-emerald-400') + ' mb-1">' + t + '</p>').join('');

                    let nnScore = window.AIEngineCore.predictSuccessProbability(data);
                    document.getElementById('log_nn_score').innerText = nnScore.toFixed(1) + "%";
                    
                    let posFactors = '- ➕ <b>(บวก) ปัจจัยหนุน:</b> รายได้ (' + formatB(data.inc) + ')' + (data.nw >= 0 ? ' และ ความมั่งคั่งสุทธิ (' + formatB(data.nw) + ')' : '') + '<br>';
                    let negFactors = '- ➖ <b>(ลบ) ปัจจัยกดดัน:</b> หนี้สะสม (' + formatB(data.liabilities) + ')' + (data.nw < 0 ? ', ความมั่งคั่งสุทธิติดลบ (' + formatB(data.nw) + ')' : '') + ', ภาระผ่อน (DTI ' + (data.dti*100).toFixed(0) + '%), ภาระดูแล (' + data.dependents + ' คน)';
                    
                    let nnDescHtml = '<div class="space-y-1.5">' +
                        '<b class="text-cyan-300 text-[11px]">🧠 AI White-Box Process (แกะกล่องดำการวิเคราะห์):</b><br>' +
                        '<span class="text-slate-300 block mt-1 leading-snug bg-slate-900 p-1.5 rounded border border-slate-700"><b>[Input Vector Array]:</b><br> <span class="text-[9px] text-cyan-300 font-mono">[' + data.age + ', ' + data.inc + ', ' + data.exp + ', ' + data.nw + ', ' + data.liabilities + ', ' + data.dependents + ', ' + data.dti.toFixed(3) + ', ' + (data.liquidAssets||0) + ', ' + (data.assets-(data.liquidAssets||0)) + ', ' + (data.assets>0?(data.liabilities/data.assets).toFixed(3):0) + ', ' + (data.inc>0?Math.max(0,(data.inc-data.exp)/data.inc).toFixed(3):0) + ']</span></span>' +
                        '<span class="text-slate-300 block mt-1 leading-snug"><b>Step 1 (รวบรวมตัวแปรทางตรง):</b> <br>' + posFactors + negFactors + '</span>' +
                        '<span class="text-slate-300 block mt-1 leading-snug"><b>Step 2 (ชั่งน้ำหนักเสถียรภาพอาชีพ):</b> <br>- ประเมินอาชีพ ' + escapeHTML(data.occ) + ' ให้อยู่ในกลุ่ม <span class="text-sky-300">"' + escapeHTML(data.occType || "ปานกลาง") + '"</span> ซึ่งมีผลต่อกำลังการส่งเบี้ยในระยะยาว</span>' +
                        '<span class="text-emerald-400 block mt-2 pt-2 border-t border-purple-500/30"><b>Step 3 (สังเคราะห์ผลลัพธ์):</b> <br>➡️ ประมวลผล Local Perceptron ผ่านสมการ Sigmoid Activation $1 / (1 + e^{-z})$ คายค่าความน่าจะเป็นที่ <b>' + nnScore.toFixed(1) + '%</b> ให้ใช้เป็นตัวเลขตั้งต้นเพื่อประเมินศักยภาพลูกค้าครับ</span>' +
                    '</div>';
                    document.getElementById('log_nn_desc').innerHTML = nnDescHtml;

                    let xai = window.AIEngineCore.generateXAIReport(data, nnScore);
                    document.getElementById('log_xai_drivers').innerHTML = xai.length > 0 ? xai.map(x => 
                        '<div class="mb-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0 last:mb-0">' +
                            '<div class="flex items-center justify-between mb-1">' +
                                '<p class="font-bold ' + (x.isPositiveFactor ? 'text-emerald-400' : 'text-rose-400') + ' text-[11px] uppercase tracking-wide">' + x.feature + '</p>' +
                                '<span class="font-bold code-font ' + (x.isPositiveFactor ? 'text-emerald-400' : 'text-rose-400') + ' bg-slate-800 px-1.5 py-0.5 rounded shadow-sm">' + (x.isPositiveFactor ? '+' : '-') + Math.abs(x.impactValue) + '%</span>' +
                            '</div>' +
                            '<div class="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden shadow-inner">' +
                                '<div class="' + (x.isPositiveFactor ? 'bg-emerald-500' : 'bg-rose-500') + ' h-1.5 rounded-full shadow-[0_0_5px_' + (x.isPositiveFactor?'#10b981':'#f43f5e') + ']" style="width: ' + Math.min(Math.abs(x.impactValue)*3, 100) + '%"></div>' +
                            '</div>' +
                            '<p class="text-[10.5px] text-slate-400 leading-snug">↳ ' + x.logicReason + '</p>' +
                        '</div>'
                    ).join('') : '<p class="text-slate-500 italic text-center mt-4">ไม่มีตัวแปรใดส่งผลกระทบรุนแรงในเคสนี้</p>';

                    let cf = window.AIEngineCore.generateCounterfactuals(data, nnScore);
                    document.getElementById('log_counterfactual').innerHTML = cf.join('');

                    let cluster = window.AIEngineCore.KMeans.classify(data);
                    document.getElementById('log_persona').innerHTML = cluster.persona + '<br><span class="text-[9px] text-emerald-600 font-normal">คำนวณผ่าน 9D Vector Space โดย $L_2$ Norm = ' + cluster.minDist.toFixed(3) + '</span>';
                    
                    try {
                        const ctxSpider = document.getElementById('spiderChartCanvas').getContext('2d');
                        if(spiderChartInstance) spiderChartInstance.destroy();
                        
                        let clientPolygon = [
                            cluster.clientVector.age, 
                            cluster.clientVector.inc, 
                            cluster.clientVector.nw, 
                            cluster.clientVector.risk, 
                            1 - cluster.clientVector.dti, 
                            cluster.clientVector.recency,
                            cluster.clientVector.frequency,
                            cluster.clientVector.discipline,
                            1 - cluster.clientVector.dep
                        ];
                        let centroidPolygon = [
                            cluster.centroidVector.age, 
                            cluster.centroidVector.inc, 
                            cluster.centroidVector.nw, 
                            cluster.centroidVector.risk, 
                            1 - cluster.centroidVector.dti, 
                            cluster.centroidVector.recency,
                            cluster.centroidVector.frequency,
                            cluster.centroidVector.discipline,
                            1 - cluster.centroidVector.dep
                        ];

                        spiderChartInstance = new Chart(ctxSpider, {
                            type: 'radar',
                            data: { 
                                labels: ['Age', 'Income', 'NetWorth', 'Risk', 'H.Liquidity(Inv DTI)', 'Recency', 'Frequency', 'Discipline', 'FreeLoad(Inv Dep)'], 
                                datasets: [
                                    { label: 'ลูกค้า (Client)', data: clientPolygon, borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.2)' },
                                    { label: 'เป้าหมายกลุ่ม (Centroid)', data: centroidPolygon, borderColor: '#64748b', borderDash: [5, 5], fill: false }
                                ]
                            },
                            options: { 
                                responsive: true, maintainAspectRatio: false, 
                                scales: { r: { ticks: {display: false}, pointLabels: {color: '#94a3b8', font: {size: 8}} } }, 
                                plugins: { legend: { display: true, position: 'bottom', labels: { color: '#94a3b8', font: {size: 10} } } } 
                            }
                        });
                    } catch(err) {
                        console.warn("Chart.js failed to load or render:", err);
                        document.getElementById('spiderChartCanvas').outerHTML = "<p class='text-xs text-center text-slate-500 mt-10'>[ไม่สามารถโหลดกราฟได้เนื่องจากออฟไลน์]</p>";
                    }

                    let rec = window.AIEngineCore.recommendProductsXAI(data);
                    document.getElementById('gap_emergency').innerText = formatB(rec.gaps.emergency);
                    document.getElementById('gap_life').innerText = formatB(rec.gaps.life);
                    document.getElementById('gap_health').innerText = rec.gaps.health;
                    document.getElementById('gap_health').className = rec.gaps.health.includes("พบช่องโหว่") ? "text-sm font-bold text-rose-400 mt-1" : "text-sm font-bold text-emerald-400 mt-1";

                    let recHtml = rec.products.map(p => 
                        '<div class="bg-slate-800 p-2.5 rounded-lg border border-slate-700 hover:border-orange-500/50 transition shadow-sm">' +
                            '<div class="flex justify-between items-center mb-2">' +
                                '<span class="font-bold text-orange-300 text-[11px] uppercase tracking-wide">📦 ' + p.name + '</span>' +
                                '<span class="text-emerald-400 font-bold code-font text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">' + p.match + '% Match</span>' +
                            '</div>' +
                            '<div class="text-[10px] text-slate-300 mb-2 bg-slate-900/80 p-2 rounded border border-slate-600">' +
                                '<span class="block text-emerald-300 mb-0.5"><b>📋 สัญญาหลัก:</b> ' + (p.basePlan || "-") + '</span>' +
                                '<span class="block text-cyan-300 mb-0.5"><b>➕ สัญญาเพิ่มเติม:</b> ' + (p.rider || "-") + '</span>' +
                                '<span class="block text-amber-300"><b>🎯 ผลต่อ Risk Gap:</b> ' + (p.gapImpact || "-") + '</span>' +
                            '</div>' +
                            '<div class="flex justify-between items-start gap-2 pt-1 border-t border-slate-700">' +
                                '<span class="text-[10px] text-slate-400 leading-snug flex-1">' + p.reason + '</span>' +
                                '<span class="text-xs font-bold text-white whitespace-nowrap bg-slate-900 px-2 py-1 rounded border border-slate-600">' + formatB(p.premium) + '/ปี</span>' +
                            '</div>' +
                        '</div>'
                    ).join('');
                    
                    recHtml += '<div class="mt-3 pt-3 border-t border-slate-700 flex justify-between items-center bg-slate-900/50 p-2 rounded">' +
                        '<span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Premium Allocation: </span>' +
                        '<span class="text-base font-black text-orange-400">' + formatB(rec.suggestedPremium) + '<span class="text-[10px] text-slate-500 font-normal">/เดือน</span></span>' +
                    '</div>';
                    document.getElementById('log_recommender').innerHTML = recHtml;

                    let lapse = window.AIEngineCore.calculateLapseRisk(data);
                    document.getElementById('log_lapse_score').innerText = lapse.score + "%";
                    let lapseHtml = '<div class="bg-slate-800 p-2.5 rounded-lg border border-slate-700 shadow-sm leading-relaxed mb-2">' +
                        '<span class="text-red-300 font-bold text-[10px] block mb-1">🧠 AI Thinking Process (วิธีประเมินความเสี่ยงทิ้งกรมธรรม์):</span>' +
                        '<span class="text-[10.5px] text-slate-400">ระบบประเมินผ่านสมการ <b>Logistic Regression (Sigmoid Bound)</b> โดยให้น้ำหนักกับตัวแปร Liquidity และ DTI เพื่อช่วยออกแบบแผนออมที่ลูกค้าสามารถรักษาอัตราความคงอยู่ (Persistency) ได้อย่างยาวนาน</span>' +
                        '</div>';
                    lapseHtml += lapse.drivers.map(d => '<p class="bg-slate-800 p-2.5 rounded-lg border border-slate-700 shadow-sm leading-relaxed mb-1.5">' + d + '</p>').join('');
                    document.getElementById('log_lapse_drivers').innerHTML = lapseHtml;

                    let con = window.AIEngineCore.runConsensus(data, nnScore, cluster.persona);
                    document.getElementById('log_crm_original').innerText = data.originalScore.toFixed(1) + "%"; 
                    document.getElementById('log_base_audit').innerText = (con.baseWithGoals || nnScore).toFixed(1) + "%";
                    document.getElementById('log_discount_audit').innerText = "-" + con.discount.toFixed(1) + "%";
                    document.getElementById('log_final_score').innerText = con.finalScore.toFixed(1) + "%";
                    
                    let consensusHtml = '<div class="mb-3 bg-slate-800 p-3.5 rounded-lg border border-slate-600 text-[10.5px] text-slate-300 leading-relaxed text-left shadow-md">' +
                        '<b class="text-indigo-400 text-xs block mb-1">📖 แนวทางการวิเคราะห์ (System Advisory):</b>' +
                        '<span class="text-white font-bold">"คะแนนหลังประเมินตามความเป็นจริง"</span> ถูกออกแบบมาเพื่อเตือนใจว่า <b>อย่าเพิ่งเร่งรัด</b> หากคะแนนลดลงแปลว่าลูกค้ากำลังแบกความท้าทายอยู่ ระบบแนะนำให้เข้าไปช่วยปลดล็อก ลดทอนรายจ่าย เพื่อให้ลูกค้าก้าวเดินได้อย่างมั่นคงตามหลัก Wealth Planning ครับ<br><br>' +
                        '<b class="text-emerald-400">💡 Advisory Action Plan & Trade-off:</b> ใช้คะแนนนี้เพื่อทำ <b>Reality Check</b> กับลูกค้า หากคะแนนนี้ต่ำกว่า Base Score มากๆ ควรเปิดใจลูกค้าให้เห็นว่า <i>"พฤติกรรมใดกำลังทำลายแผนระยะยาว"</i> และให้ลูกค้าพิจารณา <b>Trade-off</b> ระหว่าง "ความสุขระยะสั้น" กับ "อิสรภาพทางการเงิน (Financial Independence)" พร้อมเสนอ <b>"การปรับโครงสร้างหนี้/การจัดการภาษี"</b> ควบคู่ไปกับการเสนอแผนการเงินองค์รวม</div>';
                    consensusHtml += con.auditTrail.join('');
                    document.getElementById('log_consensus_exp').innerHTML = consensusHtml;

                    let synthesisResults = { persona: cluster.persona, con: con, rec: rec, lapse: lapse, xai: xai };
                    let executiveHtml = window.AIEngineCore.generateExecutiveSummary(data, synthesisResults);
                    let execEl = document.getElementById('log_executive_summary');
                    if (execEl) execEl.innerHTML = executiveHtml;

                    termLog("✅ All 12 Enterprise Modules Executed Successfully (White-Box Mode).", "success");

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

                setTimeout(() => {
                    window.initCRMSelector();
                    window.initSandboxDropdowns();
                }, 500);
            <\/script>
        </body>
        </html>`;

        this.windowRef.document.open();
        this.windowRef.document.write(htmlContent);
        this.windowRef.document.close();
    }
};