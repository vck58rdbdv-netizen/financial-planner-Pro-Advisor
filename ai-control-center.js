// =====================================================================
// 🧠 AiDAPC MODULE (AI Deep Analysis & Prediction Center)
// สถาปัตยกรรม: AI/ML Core Diagnostics Engine (White-box Dashboard) v5.6 Ultimate
// อัปเดต: FA Interactive Sandbox + Deep Contextual Reasoning & Cost/Benefit Explanation
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
            <title>AiDAPC - Executive FA Diagnostics V5.6</title>
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
                            AiDAPC <span class="text-slate-400 text-sm normal-case">| Executive AI Diagnostics V5.6</span> <span class="status-dot ml-2" id="db_status_dot"></span>
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

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col h-[320px]">
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
                            <div class="bg-slate-900 p-3 rounded border border-slate-700 text-[11px] leading-relaxed" id="log_outlier_warning">
                                <p class="text-slate-500 italic text-center mt-4">รอตรวจสอบความผิดปกติของข้อมูลและให้คำอธิบาย...</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col min-h-[360px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-purple-400 uppercase tracking-wider">🧠 4. Deep Learning Core</h2>
                            <span class="text-[9px] bg-purple-900/30 px-2 py-0.5 rounded text-purple-300 border border-purple-500/30">Survival Prob.</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center bg-slate-800/50 rounded-lg p-4 border border-slate-700 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent"></div>
                            <div class="text-center z-10 w-full flex-1 flex flex-col justify-center">
                                <p class="text-5xl font-black text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" id="log_nn_score">--%</p>
                                <p class="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Base Success Probability</p>
                            </div>
                            <div class="mt-auto w-full bg-slate-900/80 p-3 rounded border border-purple-500/30 text-[10.5px] text-purple-200 shadow-inner text-left leading-relaxed z-10">
                                <span id="log_nn_desc" class="text-slate-400 italic">รอวิเคราะห์...</span>
                            </div>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col min-h-[360px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-cyan-400 uppercase tracking-wider">🔍 5. XAI Feature Drivers</h2>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 text-xs text-slate-300 overflow-y-auto custom-scrollbar border border-slate-800 space-y-2" id="log_xai_drivers">
                            <p class="text-slate-500 italic code-font text-center mt-10">รอสกัดปัจจัยความสำเร็จและคำอธิบายเชิงลึก...</p>
                        </div>
                    </div>

                    <div class="glass-panel rounded-xl p-5 lg:col-span-1 flex flex-col min-h-[360px]">
                        <div class="card-header flex justify-between items-center">
                            <h2 class="text-sm font-bold text-amber-400 uppercase tracking-wider">🎯 6. Counterfactual Path</h2>
                            <span class="text-[9px] bg-amber-900/30 px-2 py-0.5 rounded text-amber-300 border border-amber-500/30">"What-If" AI</span>
                        </div>
                        <div class="flex-1 bg-slate-900 rounded-lg p-3 border border-slate-800 flex flex-col gap-2">
                            <p class="text-[10px] text-slate-400 font-bold">จำลองเส้นทางทางเลือก (Pos/Neg/Neutral Impacts):</p>
                            <div id="log_counterfactual" class="space-y-2 mt-1 overflow-y-auto custom-scrollbar flex-1">
                                <p class="text-slate-500 italic text-xs text-center mt-10">รอจำลองเส้นทางทางเลือกเพื่อหาจุดคุ้มทุน...</p>
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
                                <p class="text-[10px] text-slate-400 mb-2 font-bold">AIA Recommended Portfolio & Premium Allocation:</p>
                                <div id="log_recommender" class="space-y-3">
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
                                <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-wider">📊 8. 9D Persona Clustering</h2>
                            </div>
                            <div class="flex flex-col md:flex-row gap-4 flex-1">
                                <div class="w-full md:w-1/3 flex flex-col justify-center">
                                    <div class="bg-emerald-900/10 rounded-lg p-3 border border-emerald-500/30 text-center">
                                        <p class="text-[10px] text-emerald-500 font-bold uppercase">Persona Cluster</p>
                                        <p class="text-sm font-bold text-emerald-400 leading-tight mt-1" id="log_persona">--</p>
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
                                <h2 class="text-sm font-bold text-red-400 uppercase tracking-wider">⚠️ 9. Predictive Lapse Risk</h2>
                            </div>
                            <div class="flex-1 flex flex-col md:flex-row items-center gap-4 bg-slate-900 rounded-lg p-3 border border-slate-800">
                                <div class="shrink-0 text-center w-full md:w-24 border-b md:border-b-0 md:border-r border-slate-700 pb-3 md:pb-0 md:pr-3 flex flex-col justify-center h-full">
                                    <p class="text-4xl font-black text-red-400" id="log_lapse_score">--%</p>
                                    <p class="text-[9px] text-slate-400 uppercase mt-1">Churn Rate</p>
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
                            <h2 class="text-sm font-bold text-indigo-400 uppercase tracking-wider">⚖️ 10. Hybrid Consensus (System Calibrator)</h2>
                            <span class="text-[9px] bg-indigo-900/30 px-2 py-0.5 rounded text-indigo-300 border border-indigo-500/30">Final Output</span>
                        </div>
                        <div class="flex flex-col lg:flex-row gap-6 flex-1">
                            <div class="flex-shrink-0 flex flex-col justify-center items-center bg-indigo-900/40 rounded-xl p-5 border border-indigo-500/50 shadow-inner lg:w-1/3">
                                <p class="text-xs text-indigo-300 font-bold uppercase tracking-widest mb-1 text-center">Final Adjusted Score<br>(AiDAPC Audited)</p>
                                <p class="text-6xl font-black text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" id="log_final_score">--%</p>
                                
                                <div class="text-[10px] text-indigo-300/70 mt-4 code-font flex flex-col gap-1 w-full bg-slate-900/80 p-2.5 rounded border border-indigo-500/30 shadow-sm">
                                    <div class="flex justify-between border-b border-indigo-500/30 pb-1 mb-1"><span>CRM Original:</span> <span id="log_crm_original" class="text-white font-bold">--%</span></div>
                                    <div class="flex justify-between text-slate-400"><span>AiDAPC Base:</span> <span id="log_base_audit">--%</span></div>
                                    <div class="flex justify-between text-rose-400"><span>Rule Penalty:</span> <span id="log_discount_audit">--%</span></div>
                                </div>
                            </div>
                            <div class="flex-1 flex flex-col">
                                <div class="mb-3 bg-slate-800 p-3.5 rounded-lg border border-slate-600 text-[10.5px] text-slate-300 leading-relaxed text-left shadow-md">
                                    <b class="text-indigo-400 text-xs block mb-1">📖 Definition (นิยามและการใช้งานสำหรับ FA):</b>
                                    <span class="text-white font-bold">"Final Adjusted Score (คะแนนความสำเร็จสุทธิ)"</span> คือตัวชี้วัดศักยภาพทางการเงินที่สะท้อน <b>"โลกความเป็นจริง"</b> มากที่สุด โดยระบบจะนำคะแนนศักยภาพตั้งต้น (Base Score) มาหักลบด้วย <b>"อคติและพฤติกรรมเสี่ยง (Behavioral Constraints)"</b> เช่น การก่อหนี้บริโภค หรือการใช้เงินเกินตัว<br><br>
                                    <b class="text-emerald-400">💡 FA Action Plan & Trade-off:</b> ใช้คะแนนนี้เพื่อทำ <b>Reality Check</b> กับลูกค้า หากคะแนนนี้ต่ำกว่า Base Score มากๆ (โดน Penalty สูง) FA ต้องเปิดใจลูกค้าให้เห็นว่า <i>"พฤติกรรมใดกำลังทำลายแผน"</i> และให้ลูกค้าพิจารณา <b>Trade-off</b> ระหว่าง "ความสุขระยะสั้น (ใช้เงินเกินตัว)" กับ "ความมั่นคงระยะยาว" พร้อมเสนอ <b>"การปรับโครงสร้างหนี้/ลดรายจ่าย"</b> ควบคู่ไปกับการเสนอโปรดักส์ เพื่อสร้างความน่าเชื่อถือระดับที่ปรึกษามืออาชีพ
                                </div>
                                <p class="text-[10px] text-slate-400 mb-1 font-bold">Rule Execution Log (Detailed Traceability):</p>
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
                        <h2 class="text-sm font-bold text-fuchsia-400 uppercase tracking-wider flex items-center gap-2">✨ 11. Executive AI Synthesis (สรุปกลยุทธ์จาก AI)</h2>
                        <span class="text-[9px] bg-fuchsia-900/30 px-2 py-0.5 rounded text-fuchsia-300 border border-fuchsia-500/30">Auto-Generated by Local NLG</span>
                    </div>
                    <div id="log_executive_summary" class="text-[13px] text-slate-300 leading-relaxed space-y-4 relative z-10">
                        <p class="text-center text-slate-500 italic mt-4">รอการประมวลผลข้อมูลจากทุกโมดูลเพื่อสังเคราะห์กลยุทธ์เตรียมเข้าพบลูกค้า...</p>
                    </div>
                </div>

                <!-- 🌟🌟🌟 MODULE 12: FA INTERACTIVE SANDBOX SIMULATOR 🌟🌟🌟 -->
                <div class="glass-panel rounded-xl p-5 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] mt-6 flex flex-col min-h-[300px]">
                    <div class="card-header flex justify-between items-center border-cyan-500/30">
                        <h2 class="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">🎛️ 12. FA Interactive Sandbox (What-If Simulator)</h2>
                        <span class="text-[9px] bg-cyan-900/30 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">Custom Portfolio & FA Pitching Guide</span>
                    </div>
                    <div class="flex flex-col lg:flex-row gap-6 mt-2">
                        <!-- Left: Inputs -->
                        <div class="lg:w-1/2 space-y-4">
                            <div class="bg-slate-900 p-3 rounded border border-slate-700">
                                <label class="text-[10px] text-slate-400 font-bold mb-1 block">📌 สัญญาหลัก (Base Plan)</label>
                                <div class="flex gap-2">
                                    <select id="sandbox_base_plan" onchange="window.handleBasePlanChange()" class="flex-1 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500"></select>
                                    <input type="number" id="sandbox_base_sa" placeholder="ทุน/SA" class="w-24 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500">
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
                            <button onclick="window.runSandboxSimulation()" class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition shadow-[0_0_10px_rgba(6,182,212,0.4)] flex justify-center items-center gap-2">
                                🔄 จำลองผลกระทบ & วิเคราะห์ Trade-off
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
                <!-- 🌟🌟🌟 END MODULE 12 🌟🌟🌟 -->

                <div class="glass-panel rounded-xl p-4 flex flex-col mt-6">
                    <div class="flex justify-between items-center mb-2">
                        <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><span class="status-dot"></span> System Terminal</h2>
                        <button onclick="document.getElementById('terminal_log').innerHTML=''" class="text-[9px] text-slate-600 hover:text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Clear</button>
                    </div>
                    <div class="flex-1 bg-[#0f172a] rounded border border-slate-800 p-3 text-[10px] code-font text-slate-400 overflow-y-auto custom-scrollbar space-y-1.5 h-32" id="terminal_log">
                        <div class="text-emerald-400">> AiDAPC V5.6 Ultimate Ready. Full Payload Container Started.</div>
                    </div>
                </div>
                
            </main>

            <script>
                // ==========================================
                // ⚙️ ตัวแปร Global, Product Matrix & Utils
                // ==========================================
                
                // 🛡️ Global Security & Configuration
                const SYS_CONFIG = {
                    HIGH_INCOME_THRESHOLD: 200000,
                    CRITICAL_DTI: 0.8,
                    WARNING_DTI: 0.6,
                    SAFE_DTI: 0.4,
                    EMERGENCY_MONTHS: 6
                };

                let spiderChartInstance = null;
                let rawDatabaseCache = {};

                const formatB = (num) => '฿' + Math.round(num || 0).toLocaleString('th-TH');

                // XSS Protection Sanitizer
                const escapeHTML = (str) => {
                    return String(str).replace(/[&<>'"]/g, 
                        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
                    );
                };

                // Handle Before Unload Window Management
                window.addEventListener('beforeunload', () => {
                    if(window.opener && window.opener.AIControlCenter) window.opener.AIControlCenter.windowRef = null;
                });

                const termLog = (msg, type='info') => {
                    const el = document.getElementById('terminal_log');
                    const colors = {info: 'text-slate-400', success: 'text-emerald-400', warn: 'text-orange-400', err: 'text-rose-400', highlight: 'text-cyan-400'};
                    const time = new Date().toLocaleTimeString('th-TH', { hour12: false });
                    el.innerHTML += '<div class="' + colors[type] + '">[' + time + '] > ' + msg + '</div>';
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
                // 🧮 3. Calculator Functions (Used for Auto-Recommender Only)
                // -----------------------------------------------------
                const rateMatrix = {
                    "AIA Endowment 15/25": { "M": { 30: 82, 35: 82, 36: 82, 45: 83, 50: 83, 55: 88, 60: 90, 70: 96 }, "F": { 30: 82, 35: 82, 36: 82, 45: 83, 50: 83, 55: 88, 60: 90, 70: 96 } },
                    "AIA 20 Pay Life": { "M": { 1: 12.76, 36: 24.94, 50: 37.81, 60: 55.77, 70: 78.11 }, "F": { 1: 11.47, 36: 20.93, 50: 31.62, 60: 46.43, 70: 67.07 } },
                    "AIA Life Protector 70": { "M": { 20: 10.94, 30: 12.75, 45: 17.78, 55: 24.23 }, "F": { 20: 8.00, 30: 9.02, 45: 11.91, 55: 15.88 } },
                    "AIA Smart Select Prestige": { "M": { 1: 15, 30: 20, 40: 25, 50: 35, 60: 50, 70: 75 }, "F": { 1: 15, 30: 18, 40: 22, 50: 30, 60: 45, 70: 65 } },
                    "AIA Annuity Fix": { "M": { 20: 16.20, 30: 25.70, 45: 65.60, 55: 236.50 }, "F": { 20: 16.50, 30: 25.80, 45: 65.20, 55: 234.80 } }
                };

                const riderRateMatrix_Fallback = {
                    "AIA Health Happy": { type: "fixed_plan",
                        "5000000": { "M": { 21: 16900, 31: 18900, 41: 23800, 51: 35000, 61: 50600, 71: 104000 },"F": { 21: 21500, 31: 22700, 41: 27800, 51: 35200, 61: 50800, 71: 107500 }}
                    },
                    "AIA CI Plus": { type: "per_thousand", "M": { 20: 1.85, 30: 2.65, 40: 5.45, 50: 12.80 }, "F": { 20: 1.95, 30: 2.90, 40: 6.10, 50: 11.50 } }
                };

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
                            if (age > ageKeys[i] && age < ageKeys[i + 1]) { age1 = ageKeys[i]; age2 = ageKeys[i + 1]; break; }
                        }
                        rate = matrix[age1] + ((matrix[age2] - matrix[age1]) * (age - age1) / (age2 - age1));
                    }
                    return rate;
                }

                function calculateRiderPremium(riderName, gender, age, planOrSA) {
                    if (!riderRateMatrix_Fallback[riderName]) return 0;
                    let genderKey = (gender === "หญิง" || gender === "F") ? "F" : "M";
                    let productType = riderRateMatrix_Fallback[riderName].type;
                    let matrix;

                    if (productType === "fixed_plan") {
                        let planKey = planOrSA.toString();
                        if (!riderRateMatrix_Fallback[riderName][planKey]) {
                            let availablePlans = Object.keys(riderRateMatrix_Fallback[riderName]).filter(k => k !== "type" && k !== "category").map(Number).sort((a,b) => a-b);
                            if (availablePlans.length === 0) return 0;
                            planKey = availablePlans[0].toString();
                        }
                        matrix = riderRateMatrix_Fallback[riderName][planKey][genderKey];
                    } else {
                        matrix = riderRateMatrix_Fallback[riderName][genderKey];
                    }
                    if (!matrix) return 0;
                    let rate = findClosestRate({[genderKey]: matrix}, genderKey, age);
                    if (productType === "flat" || productType === "fixed_plan") return rate; 
                    if (productType === "per_thousand") return (planOrSA / 1000) * rate;
                    return 0;
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
                            return { success: true, premium: Math.max(product.minPremiumRPP, sumAssured * 0.05) };
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
                                let cat = String(item.type || item[0] || "").trim(); 
                                let v = Number(item.val || item[2] || item[1]) || 0; 
                                tAst += v;
                                if (cat === "สินทรัพย์สภาพคล่อง") liquidAssets += v;
                            });
                            if (liquidAssets === 0 && tAst > 0) liquidAssets = tAst * 0.3;

                            let tExp = 0; let totalDebtPmt = 0;
                            (dyn.c_exp || []).forEach(item => {
                                let cat = String(item.type || item[0] || "").trim();
                                let v = Number(item.val || item[2] || item[1]) || 0;
                                tExp += v;
                                if (cat === "เงินชำระคืนหนี้สิน") totalDebtPmt += v;
                            });

                            let tLiab = 0; let badDebt = 0;
                            (dyn.c_liab || []).forEach(item => {
                                let cat = String(item.type || item[0] || "").trim();
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
                            if (totalDebtPmt === 0 && tLiab > 0) totalDebtPmt = tLiab * 0.03; 
                            
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
                        if(dot) dot.style.backgroundColor = '#10b981';
                        termLog('Successfully synced ' + validCount + ' Full-Payload records.', "success");

                    } catch (error) {
                        selector.innerHTML = '<option value="">❌ การเชื่อมต่อล้มเหลว</option>';
                        if(dot) dot.style.backgroundColor = '#ef4444';
                        termLog('Sync Error: ' + error.message, "err");
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

                        let occ = String(data.occ || "").toLowerCase();
                        let occRiskScore = 0;
                        let occType = "ทั่วไป (ปานกลาง)";
                        if(occ.includes('ข้าราชการ') || occ.includes('รัฐวิสาหกิจ') || occ.includes('ประจำ') || occ.includes('แพทย์') || occ.includes('ครู')) {
                            occRiskScore = 5; 
                            occType = "มั่นคงสูง (Low Volatility)";
                        } else if(occ.includes('อิสระ') || occ.includes('ค้าขาย') || occ.includes('freelance') || occ.includes('ร้าน') || occ.includes('ธุรกิจ')) {
                            occRiskScore = -5; 
                            occType = "ผันผวนสูง (High Volatility)";
                        } else {
                            occRiskScore = 0;
                            occType = "ปานกลาง (Medium Volatility)";
                        }
                        data.occType = occType;

                        let base = 50;
                        let incScore = (inc / 100000) * 10;
                        let nwScore = (nw / 1000000) * 5;
                        let debtPenalty = (liab / 500000) * 2;
                        let dtiPenalty = (dti * 100) * 0.6; 
                        let depPenalty = dep * 2;

                        let scoreRaw = base + incScore + nwScore - debtPenalty - dtiPenalty - depPenalty + occRiskScore;
                        let finalScore = 100 / (1 + Math.exp(-0.05 * (scoreRaw - 50)));
                        
                        return Math.max(1.0, Math.min(99.9, finalScore));
                    },

                    detectOutliers: function(data) {
                        let confidence = 95;
                        let warnings = [];
                        
                        const textVariations = {
                            highIncLowNw: [
                                "⚠️ <b class='text-orange-400'>ตรวจพบความขัดแย้ง:</b> รายได้ของลูกค้าจัดอยู่ในกลุ่มสูงมาก แต่มูลค่าทรัพย์สินสุทธิกลับต่ำผิดปกติ ชี้ให้เห็นถึงความน่าจะเป็นของ 'หนี้แฝง' หรือ 'รายจ่ายที่ควบคุมไม่ได้' นอกระบบ",
                                "⚠️ <b class='text-orange-400'>สัญญาณอันตราย:</b> Cashflow รับเข้ามาสูง แต่ไม่มีการสะสมสินทรัพย์ (Low Wealth Accumulation) โมเดลเตือนว่าลูกค้าอาจขาดวินัยการออมอย่างรุนแรง"
                            ],
                            highDti: [
                                "🚨 <b class='text-rose-400'>วิกฤตสภาพคล่อง:</b> อัตราส่วนภาระผ่อนชำระหนี้ (DTI) พุ่งทะลุ 80% ซึ่งเป็น Red Zone ลูกค้าอยู่ในสภาวะเตรียมล้มละลายหากเกิดเหตุฉุกเฉิน",
                                "🚨 <b class='text-rose-400'>Overleveraged:</b> ภาระหนี้สินหนักเกินกว่าที่กระแสเงินสดจะรับไหว การเสนอแผนลงทุนใดๆ ในเวลานี้แทบเป็นไปไม่ได้"
                            ],
                            negCf: [
                                "🔥 <b class='text-red-500'>เงินติดลบ:</b> รายจ่ายต่อเดือนแซงหน้ารายได้ไปแล้ว ลูกค้ากำลังใช้เงินในอนาคต หรือต้องกู้หนี้ยืมสินมาจุนเจือชีวิตประจำวัน",
                                "🔥 <b class='text-red-500'>Deficit Cashflow:</b> สัญญาณการพังทลายของฐานะการเงิน การประเมินผลตอบแทนใดๆ จะบิดเบือนเพราะลูกค้าไม่มีเงินเหลือเก็บ"
                            ],
                            normal: [
                                "✅ <b class='text-emerald-400'>Normal Distribution:</b> โครงสร้างรายได้และสินทรัพย์มีความสมดุลสอดคล้องกัน AI สามารถวิเคราะห์แผนนี้ได้อย่างแม่นยำสูง",
                                "✅ <b class='text-emerald-400'>Data Consistency:</b> ไม่พบความผิดปกติหรือความขัดแย้งในตัวเลขทางการเงิน โมเดลให้ความเชื่อมั่นในระดับที่ดีเยี่ยม"
                            ]
                        };

                        if (data.inc > SYS_CONFIG.HIGH_INCOME_THRESHOLD && data.nw < 100000) {
                            confidence -= 18; warnings.push(pickNLG(textVariations.highIncLowNw));
                        }
                        if (data.dti > SYS_CONFIG.CRITICAL_DTI) {
                            confidence -= 15; warnings.push(pickNLG(textVariations.highDti));
                        }
                        if (data.exp > data.inc && data.inc > 0) {
                            confidence -= 20; warnings.push(pickNLG(textVariations.negCf));
                        }

                        if (warnings.length === 0) warnings.push(pickNLG(textVariations.normal));
                        return { conf: Math.max(0, confidence), text: warnings };
                    },

                    analyzeSentiment: function(text) {
                        let safeText = escapeHTML(String(text || ""));
                        let textLower = safeText.toLowerCase();
                        
                        let anxietyWords = ['กังวล', 'เครียด', 'ไม่พอ', 'บ่น', 'หนี้', 'จ่ายขั้นต่ำ', 'ค่าใช้จ่าย', 'ไม่มีเงิน', 'ลดลง', 'ป่วย', 'กู้', 'หนักใจ'];
                        let positiveWords = ['สนใจ', 'ลดหย่อน', 'ลงทุน', 'มรดก', 'ออม', 'เกษียณ', 'วางแผน', 'เป้าหมาย', 'มั่นคง', 'พร้อม'];
                        
                        let anxietyScore = 30; 
                        let highlights = safeText || "ไม่มีบันทึกประวัติการสนทนาในระบบ (No NLP Data)";

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
                        const features = ['inc', 'nw', 'liabilities', 'dti', 'exp', 'dependents']; 
                        let explanations = [];
                        const PERTURBATION_RATE = 0.1; 

                        features.forEach((feat) => {
                            let originalValue = parseFloat(data[feat]);
                            if (isNaN(originalValue) || originalValue === 0) return;
                            
                            let delta = Math.abs(originalValue * PERTURBATION_RATE);
                            if (feat === 'dependents') delta = Math.ceil(delta);
                            
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
                                        pos: [
                                            "เสมือน 'เครื่องยนต์หลัก' ในการสร้างความมั่งคั่ง ยิ่งกระแสเงินสดแข็งแกร่ง ยิ่งเพิ่มความยืดหยุ่นในการจัดพอร์ตให้ทนทานต่อความผันผวน", 
                                            "กระแสเงินสดรับที่สม่ำเสมอ เปิดโอกาสให้ FA สามารถวางแผน Asset Allocation ได้หลากหลายและรับความเสี่ยงได้มากขึ้น"
                                        ],
                                        neg: [
                                            "กระแสเงินสดเข้ามีจำกัดเมื่อเทียบกับความคาดหวัง ทำให้พอร์ตเติบโตช้าลงและต้องอาศัยวินัยที่สูงมาก", 
                                            "รายได้ค่อนข้างตึงตัว FA ควรระมัดระวังในการเสนอผลิตภัณฑ์ที่ต้องชำระเบี้ยระยะยาวสูงๆ เพื่อหลีกเลี่ยงภาระระยะยาว"
                                        ]
                                    },
                                    nw: {
                                        pos: [
                                            "ทำหน้าที่เป็น 'เบาะลมกันกระแทก' ชั้นยอด ช่วยปกป้องความมั่งคั่งจากวิกฤตเศรษฐกิจ หรือเหตุฉุกเฉินได้สบาย", 
                                            "ฐานทุนตั้งต้นมีขนาดใหญ่พอที่จะต่อยอดด้วยการลงทุน (Wealth Accumulation) โดยไม่ต้องกังวลปัญหาสภาพคล่อง"
                                        ],
                                        neg: [
                                            "ฐานทุนสะสมยังน้อยเกินไปเมื่อเทียบกับอายุหรือภาระ อาจต้องพึ่งพาดอกเบี้ยทบต้นอีกยาวนานกว่าจะถึงเป้า", 
                                            "ขาดกันชนทางการเงิน หากเกิดเหตุไม่คาดฝัน แผนทั้งหมดที่วางไว้อาจพังทลายลงทันที แนะนำให้รีบโอนความเสี่ยง"
                                        ]
                                    },
                                    liabilities: {
                                        neg: [
                                            "เปรียบเสมือน 'รอยรั่ว' ภาระดอกเบี้ยจ่ายกำลังบั่นทอนผลตอบแทนทบต้น FA ควรแนะนำกลยุทธ์รวมหนี้ (Debt Consolidation) เพื่อเพิ่มสภาพคล่อง", 
                                            "ก้อนหนี้ขนาดใหญ่นี้คือตัวฉุดรั้งสภาพคล่อง FA ควรโฟกัสที่การทำ Debt Restructuring ควบคู่กับการปกป้องสินทรัพย์"
                                        ]
                                    },
                                    dti: {
                                        pos: [
                                            "สภาพคล่องเหลือเฟือ! ลูกค้าปลอดหนี้หรือมีหนี้ต่ำมาก ทำให้มี Free Cash Flow นำไปลงทุนต่อยอดได้อย่างเต็มประสิทธิภาพ", 
                                            "อัตราส่วนชำระหนี้ปลอดภัย ไร้แรงกดดันทางการเงิน ลูกค้าพร้อมรับฟังแผนการออมระยะยาว"
                                        ],
                                        neg: [
                                            "รายจ่ายชำระหนี้ต่อเดือนเบียดเบียนพื้นที่เงินออม ทำให้แผนเดินหน้ายาก และเสี่ยงต่อการสะดุดล้มกลางทาง", 
                                            "หนี้รัดตัวจนสภาพคล่องติดขัด เป็นความเสี่ยงหลักที่ทำให้คะแนนความสำเร็จของแผนลดฮวบ ต้องระวังการสร้างภาระเพิ่ม"
                                        ]
                                    },
                                    exp: {
                                        neg: [
                                            "รอยรั่วทางการเงินที่กว้างเกินไป ทำให้เกิดค่าเสียโอกาส (Opportunity Cost) มหาศาลในการนำเงินไปทำให้งอกเงย", 
                                            "ไลฟ์สไตล์ที่สูงเกินสมดุลรายได้ กำลังทำลายพลังของดอกเบี้ยทบต้น ควรแนะนำการตั้งงบประมาณ (Budgeting)"
                                        ]
                                    },
                                    dependents: {
                                        neg: [
                                            "ภาระดูแลผู้อื่นบังคับให้ต้องกระจายความเสี่ยง (Diversify) และเตรียมเงินก้อนฉุกเฉินมากขึ้น ทำให้พอร์ตโตช้าลง", 
                                            "ยิ่งมีคนข้างหลังเยอะ ยิ่งมีค่าใช้จ่ายแฝงมาก FA ควรเน้นปิดความเสี่ยง (Protection) ให้คนเหล่านี้ก่อนการลงทุน"
                                        ]
                                    }
                                };

                                if (xaiNLG[feat]) {
                                    let sentiment = isPositive ? 'pos' : 'neg';
                                    if(xaiNLG[feat][sentiment]) {
                                        reason = pickNLG(xaiNLG[feat][sentiment]);
                                    } else {
                                        reason = pickNLG(xaiNLG[feat]['neg']); 
                                    }
                                } else {
                                    reason = "ปัจจัยนี้ส่งผลกระทบต่อคะแนนความสำเร็จของแผนการเงินในระดับที่มีนัยสำคัญตามหลักคณิตศาสตร์ประกันภัย";
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

                    generateCounterfactuals: function(data, currentScore) {
                        let plans = [];
                        if (data.dti > 0.4) {
                            let reduceDebt = (data.dti - 0.35) * data.inc;
                            if (reduceDebt > 0) {
                                plans.push('<div class="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-emerald-400 font-bold block mb-1">🔼 ทางเลือกเชิงรุก (Positive Action):</span> หากสามารถทำ <b>Debt Consolidation (รวบหนี้)</b> ลดภาระส่งหนี้ต่อเดือนลงได้ ' + formatB(reduceDebt) + ' บาท จะเป็นการปลดล็อกสภาพคล่อง ดันคะแนนความสำเร็จให้พุ่งขึ้นทันทีและเพิ่มกระแสเงินสดส่วนเกิน (Free Cashflow) สำหรับต่อยอดการลงทุน</div>');
                            }
                        } else {
                            plans.push('<div class="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-emerald-400 font-bold block mb-1">🔼 ทางเลือกเชิงรุก (Positive Action):</span> เพียงแค่ตั้งระบบตัดเงินอัตโนมัติ โยกเงิน ' + formatB(data.inc * 0.1) + '/เดือน มาลงทุนแบบประจำ (Dollar Cost Averaging) พลังของดอกเบี้ยทบต้นจะช่วยร่นระยะเวลาบรรลุเป้าหมายทางการเงินให้เร็วขึ้นอย่างชัดเจน</div>');
                        }
                        plans.push('<div class="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg text-xs mb-3 shadow-sm"><span class="text-blue-400 font-bold block mb-1">⏩ ทางเลือกสายกลาง (Neutral Alternative):</span> การ <b>"ยืดระยะเวลาเป้าหมายออกไป"</b> หรือลดสัดส่วนการลงทุนในสินทรัพย์เสี่ยงสูง จะช่วยรักษาสภาพคล่องในปัจจุบันไว้ได้ โดยที่คะแนนความสำเร็จรวมจะไม่ตกลง เหมาะสำหรับปรับใช้ในช่วงที่เศรษฐกิจมีความผันผวนสูง</div>');
                        return plans;
                    },

                    recommendProductsXAI: function(data) {
                        let gender = data.gender || 'M';
                        let age = data.age || 35;

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
                            products.push({ name: "Emergency Fund Allocation", match: 92, basePlan: "AIA Smart Select (Unit Linked)", rider: "ไม่มี", gapImpact: "ปิดรอยรั่ว Emergency Gap", reason: "ทำหน้าที่เป็นถังพักเงินฉุกเฉิน สภาพคล่องสูง ถอนได้ไม่เจ็บตัว พร้อมโอกาสรับผลตอบแทนที่เอาชนะเงินฝากธนาคารได้ <br><b class='text-emerald-400'>[Trade-off Analysis]:</b> ต้นทุนเสียโอกาส (Opportunity Cost) ต่ำ แลกกับสภาพคล่องและผลตอบแทนที่ยืดหยุ่น เหมาะสำหรับพักเงินเพื่อรอจังหวะลงทุน (Investment Route) เพื่อปกป้องสภาพคล่องหลักจากการถูกดึงไปใช้ผิดประเภท", premium: prem });
                            totalPremiumRec += (prem / 12);
                        }
                        if (gapLife > 0) {
                            let sa = Math.max(100000, gapLife);
                            let prem = data.inc * 0.05 * 12;
                            products.push({ name: "Life & Debt Protection", match: 95, basePlan: "AIA 20 Pay Life", rider: "ไม่มี", gapImpact: "คุ้มครอง Life/Family Gap " + formatB(sa) + " บาท", reason: "สร้างกำแพงปกป้องความเสี่ยงหนี้สินด้วยทุนชีวิต หากเกิดเหตุไม่คาดฝัน ครอบครัวจะปลอดภัยและไม่รับภาระหนี้ตกทอด <br><b class='text-blue-400'>[Trade-off Analysis]:</b> ยอมจ่ายเบี้ยหลักหมื่น (Fixed Cost) เพื่อปกป้องความมั่งคั่งหลักล้าน (High Leverage Benefit) เป็นการสร้างหลักประกันเพื่อป้องกันการถูกบังคับขายสินทรัพย์ (Forced Liquidation) ในภาวะฉุกเฉิน ซึ่งเป็นหายนะของการลงทุน", premium: prem });
                            totalPremiumRec += (prem / 12);
                        }
                        if (gapHealth) {
                            let totalHealthPrem = 25000; 
                            products.push({ name: "Health & CI Protection", match: 88, basePlan: "AIA 20 Pay Life (ทุนขั้นต่ำ)", rider: "AIA Health Happy + CI Plus", gapImpact: "อุดช่องโหว่ค่ารักษาพยาบาลและโรคร้ายแรง", reason: "ปิดหลุมดำค่าใช้จ่ายรักษาโรคร้าย (เฉลี่ย 1-3 ล้านบาท) การโอนความเสี่ยงก้อนนี้ให้บริษัทประกัน คือกุญแจสำคัญที่ช่วยปกป้องความมั่งคั่งไม่ให้ล้มละลาย <br><b class='text-pink-400'>[Trade-off Analysis]:</b> จ่ายเบี้ยคงที่ แลกกับการล็อกเพดานความเสียหายทางการแพทย์แบบ 100% (Unlimited Risk to Fixed Cost) ถือเป็นการลงทุนซื้อ 'เวลาและทางเลือก' ในการรักษา โดยไม่ต้องเบียดเบียนพอร์ตเกษียณอายุ (Retirement Portfolio)", premium: totalHealthPrem });
                            totalPremiumRec += (totalHealthPrem / 12);
                        }
                        
                        if (gapLife <= 0 && !gapHealth) {
                            let prem = data.inc * 0.10 * 12;
                            products.push({ name: "Wealth Accumulation", match: 98, basePlan: "AIA Issara Plus (Unit Linked)", rider: "ไม่มี", gapImpact: "เร่งการเติบโตของสินทรัพย์ (Wealth Optimization)", reason: "ลูกค้ามีความพร้อมด้านสภาพคล่องระดับสูง เหมาะสมอย่างยิ่งกับการหาผลตอบแทนชนะเงินเฟ้อด้วยพอร์ตลงทุนที่ปรับสัดส่วนได้อย่างอิสระ <br><b class='text-cyan-400'>[Trade-off Analysis]:</b> ล็อกเงินสดไว้ระยะยาว (Liquidity Lock) แลกกับโอกาสเติบโตของเงินทุน (Capital Gain) ชนะอัตราเงินเฟ้อ ถือเป็นการ Shift จาก Risk Protection สู่ Wealth Generation อย่างเต็มตัว", premium: prem });
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
                        
                        if(data.dti > SYS_CONFIG.WARNING_DTI) { score += 40; drivers.push("🚨 <b>ระดับ DTI วิกฤต:</b> ภาระผ่อนชำระหนี้รัดตัวทำให้ความทนทานในการส่งเบี้ยประกันต่ำมาก หากเศรษฐกิจสะดุดเล็กน้อย ลูกค้ามีโอกาสทิ้งกรมธรรม์สูง"); }
                        else if(data.dti > SYS_CONFIG.SAFE_DTI) { score += 15; drivers.push("⚠️ <b>หนี้เริ่มตึงตัว:</b> ต้องระวังการเสนอเบี้ยประกันที่หนักหรือตึงมือเกินไป อาจกระทบเป้าหมายการเงินอื่นๆ ของลูกค้า"); }

                        if(data.inc < 30000) { score += 20; drivers.push("⚠️ <b>สภาพคล่องเปราะบาง:</b> รายได้ยังไม่สูงพอ โอกาสที่กรมธรรม์จะสะดุดจากรายจ่ายฉุกเฉินมีค่อนข้างสูง"); }
                        if(data.exp > data.inc && data.inc > 0) { score += 30; drivers.push("🔥 <b>กระแสเงินสดตึงตัว:</b> หากเพิ่มภาระเบี้ยประกันในเวลานี้ มีความเสี่ยงสูงที่ลูกค้าจะทิ้งกรมธรรม์กลางทาง ควรเน้นแก้ปัญหาสภาพคล่องก่อน"); }

                        if(data.badDebtRatio > 0.5 && data.liabilities > 0) {
                            score += 25; drivers.push("🧨 <b>หนี้พิษ (Toxic Debt):</b> โครงสร้างหนี้ส่วนใหญ่เป็น 'หนี้บริโภคดอกเบี้ยสูง' (Bad Debt) โอกาสผิดนัดชำระเบี้ยประกันสูงมาก ควรโฟกัส Debt Management ก่อน");
                        } else if (data.liabilities > 0 && data.badDebtRatio <= 0.2) {
                            score -= 10; drivers.push("✅ <b>หนี้มีคุณภาพ:</b> โครงสร้างหนี้ส่วนใหญ่เป็น 'หนี้ดี' (สินเชื่อบ้าน/ธุรกิจเพื่อการเติบโต) สะท้อนถึงวินัยทางการเงินที่ดีเยี่ยม");
                        }

                        if(score <= 15) drivers.push("🌟 <b>พฤติกรรมมั่นคง:</b> โครงสร้าง Cashflow หนาแน่น การรักษาอัตราความคงอยู่ของกรมธรรม์ (Persistency) มีความแน่นอนสูง เหมาะสมกับการวางแผน Wealth ทุกรูปแบบ");

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

                        if (features.exp > features.inc && features.inc > 0) {
                            cap = 30; auditTrail.push('<div class="flex justify-between text-rose-500 border-b border-slate-800 pb-2 mb-2"><span><b>[CRITICAL CAP]</b> กระแสเงินสดติดลบ (รายจ่ายสูงกว่ารายได้) ซึ่งตามหลักการเงินถือเป็นภาวะล้มละลายทางสภาพคล่อง</span><span class="font-bold whitespace-nowrap ml-2">Max 30%</span></div>');
                        }
                        else if (features.dti >= SYS_CONFIG.WARNING_DTI) {
                            cap = 45; auditTrail.push('<div class="flex justify-between text-rose-400 border-b border-slate-800 pb-2 mb-2"><span><b>[HARD CAP]</b> หนี้สินวิกฤต (DTI > 60%) โครงสร้างการเงินเปราะบาง เสี่ยงต่อการล้มละลายหากเกิดเหตุฉุกเฉิน</span><span class="font-bold whitespace-nowrap ml-2">Max 45%</span></div>');
                        } else if (features.dti >= SYS_CONFIG.SAFE_DTI) {
                            discount += 15; auditTrail.push('<div class="flex justify-between text-orange-400 border-b border-slate-800 pb-2 mb-2"><span><b>[PENALTY]</b> ภาระหนี้สินอยู่ในระดับเตือนภัย ระบบได้หักลบคะแนนเผื่อความผันผวนของดอกเบี้ยและรายจ่ายแล้ว</span><span class="font-bold whitespace-nowrap ml-2">-15%</span></div>');
                        } else {
                            auditTrail.push('<div class="flex justify-between text-emerald-400 border-b border-slate-800 pb-2 mb-2"><span><b>[PASS]</b> เกณฑ์หนี้สินสุขภาพดี (DTI Safe) โครงสร้าง Cashflow แข็งแกร่ง</span><span class="font-bold whitespace-nowrap ml-2">0%</span></div>');
                        }

                        if (features.dependents > 2) {
                            discount += 5; auditTrail.push('<div class="flex justify-between text-orange-400 border-b border-slate-800 pb-2 mb-2"><span><b>[PENALTY]</b> มีภาระดูแลครอบครัวใหญ่ ทำให้สภาพคล่องส่วนเกินลดลงและแผนการเงินมีโอกาสสะดุดง่ายขึ้น</span><span class="font-bold whitespace-nowrap ml-2">-5%</span></div>');
                        }

                        let finalScore = mlScore - discount;
                        finalScore = Math.max(1.0, Math.min(finalScore, cap));

                        auditTrail.push('<div class="mt-3 text-indigo-300 text-center italic text-xs leading-relaxed bg-indigo-900/20 p-2 rounded">"การปรับจูนเสร็จสิ้น! ระบบได้หักลบจุดบอดของแบบจำลอง Neural Network ด้วย Financial Expert Rules เพื่อสะท้อนหลักเศรษฐศาสตร์พฤติกรรม (Behavioral Economics) ทำให้การวิเคราะห์มีความแม่นยำและอิงตามโลกความเป็นจริงได้สมบูรณ์แบบที่สุด"</div>');

                        return { finalScore: finalScore, discount: discount, auditTrail: auditTrail };
                    },
                    
                    generateExecutiveSummary: function(data, results) {
                        let p = results.persona;
                        let finalScore = results.con.finalScore;
                        let tone = finalScore > 80 ? "positive" : (finalScore < 50 ? "critical" : "warning");

                        let p1 = '<div class="border-b border-fuchsia-500/30 pb-2 mb-2">' +
                                 '<b class="text-fuchsia-300 text-sm">📊 1. บทสรุปสถานะลูกค้า (Client Status):</b><br>' +
                                 '<span class="text-slate-300">จัดอยู่ในกลุ่ม <b>"' + p + '"</b> มีโอกาสสำเร็จภาพรวมที่ <b>' + finalScore.toFixed(1) + '%</b></span><br>';
                                 
                        if (tone === "critical") p1 += '<span class="text-rose-400 font-bold mt-1 block">🚨 โอกาสในการเข้าพบ (Strategic Approach): ลูกค้ามีโครงสร้างสภาพคล่องที่เปราะบางและท้าทาย แนะนำให้เข้าพบในฐานะที่ปรึกษาเพื่อ "ผ่าตัดโครงสร้างหนี้ (Debt Restructuring)" หรือวางแผนรัดเข็มขัด (Budgeting) ควรชะลอการเสนอพอร์ตการลงทุนที่มีความเสี่ยงสูงออกไปก่อนจนกว่ากระแสเงินสดจะนิ่ง</span>';
                        else if (tone === "positive") p1 += '<span class="text-emerald-400 font-bold mt-1 block">🌟 โอกาสในการเข้าพบ (Strategic Approach): ฐานะการเงินแข็งแกร่งมาก พร้อมสำหรับการพูดคุยเรื่องการจัดพอร์ตเพื่อปกป้องและต่อยอดความมั่งคั่ง (Wealth Accumulation & Legacy Planning) รวมถึงการส่งต่อมรดกให้เต็มศักยภาพสูงสุด</span>';
                        else p1 += '<span class="text-orange-400 font-bold mt-1 block">⚠️ โอกาสในการเข้าพบ (Strategic Approach): สถานะโดยรวมอยู่ในเกณฑ์ดี แต่อาจมีรอยรั่วที่ต้องช่วยลูกค้าอุดเพื่อป้องกันแผนสะดุดในระยะยาว (Risk Mitigation) แนะนำให้เจาะประเด็นเรื่องค่าใช้จ่ายแฝงหรือประกันที่ยังไม่ครอบคลุม</span>';
                        
                        p1 += '<span class="text-indigo-300 mt-2 pt-2 border-t border-indigo-500/30 block text-[11px] leading-relaxed"><b>🔍 วิเคราะห์ภาพรวมการเงิน (Financial Health Overview):</b> ระบบประเมินจากกระแสเงินสด (Cashflow), สินทรัพย์สภาพคล่อง (Liquidity), และสัดส่วนภาระหนี้สิน (Leverage) พบว่าลูกค้ามีมูลค่าความมั่งคั่งสุทธิ ' + formatB(data.nw) + ' บาท โครงสร้างรายรับเทียบรายจ่ายแสดงให้เห็นถึงเสถียรภาพในระดับ ' + tone.toUpperCase() + ' คะแนน ' + finalScore.toFixed(1) + '% นี้สะท้อนความน่าจะเป็นที่ลูกค้าจะบรรลุเป้าหมายการเงินระยะยาวโดยไม่เกิดภาวะล้มละลาย (Insolvency) กลางทาง แนะนำให้ FA เข้าพบเพื่อชี้แจงสถานะปัจจุบัน และเสนอโซลูชันแบบ Tailor-made ที่เหมาะสมกับระดับความเสี่ยงที่วิเคราะห์ได้จาก 9D Persona ครับ</span>';
                        p1 += '</div>';

                        let p3 = '<div><b class="text-fuchsia-300 text-sm">💼 2. แผนที่ควรเสนอเป็นแนวทาง (Suggested Focus):</b><br><ul class="list-disc pl-5 mt-1 text-slate-300 space-y-1">';
                        results.rec.products.forEach(prod => {
                            p3 += '<li><b>' + prod.name + ':</b> ' + prod.reason + '</li>';
                        });
                        p3 += '</ul></div>';

                        return '<div class="space-y-3 text-[12px] bg-slate-900/50 p-4 rounded-lg border border-slate-700">' + p1 + '<br>' + p3 + '</div>';
                    }
                };

                // ==========================================
                // 🧪 12. FA Sandbox Simulator Functions
                // ==========================================
                window.initSandboxDropdowns = function() {
                    const baseSelect = document.getElementById('sandbox_base_plan');
                    if(baseSelect) {
                        let options = '<option value="">-- เลือกสัญญาหลัก --</option>';
                        Object.keys(aiaBaseProductMatrix).forEach(p => {
                            let typeInfo = aiaBaseProductMatrix[p].type;
                            options += '<option value="' + p + '">[' + typeInfo + '] ' + p + '</option>';
                        });
                        baseSelect.innerHTML = options;
                    }
                    window.handleBasePlanChange(); 
                };

                window.handleBasePlanChange = function() {
                    const baseSelect = document.getElementById('sandbox_base_plan');
                    const btnAddRider = document.getElementById('btn_add_rider');
                    if(baseSelect && btnAddRider) {
                        if(baseSelect.value !== "") {
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
                    let optionsHtml = '<option value="">-- เลือกสัญญาเพิ่มเติม --</option>';
                    Object.keys(aiaRiderMatrix).forEach(r => {
                        let cat = aiaRiderMatrix[r].category;
                        optionsHtml += '<option value="' + r + '">[' + cat + '] ' + r + '</option>';
                    });

                    const rowId = 'rider_row_' + Date.now();
                    const rowHtml = '<div id="' + rowId + '" class="flex gap-2 rider-item pb-1">' +
                        '<select class="sandbox-rider-select flex-1 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500">' +
                            optionsHtml +
                        '</select>' +
                        '<input type="number" class="sandbox-rider-sa w-24 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500" placeholder="แผน/ทุน">' +
                        '<input type="number" class="sandbox-rider-prem w-28 text-xs bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-cyan-500" placeholder="เบี้ย (บาท/ปี)">' +
                        '<button onclick="document.getElementById(\\'' + rowId + '\\').remove()" class="text-rose-400 hover:text-rose-300 px-2 font-bold transition">✕</button>' +
                    '</div>';
                    
                    container.insertAdjacentHTML('beforeend', rowHtml);
                };

                window.runSandboxSimulation = function() {
                    const cId = document.getElementById('sb_crm_selector').value;
                    if (!cId || !rawDatabaseCache[cId]) { alert("กรุณาเปิดการเชื่อมต่อและ Run Diagnostics ของลูกค้าก่อนทำการจำลองแผนครับ"); return; }
                    
                    let data = rawDatabaseCache[cId];
                    let baseName = document.getElementById('sandbox_base_plan').value;
                    let baseSA = parseFloat(document.getElementById('sandbox_base_sa').value) || 0;
                    let basePrem = parseFloat(document.getElementById('sandbox_base_prem').value) || 0;

                    if (!baseName || basePrem <= 0) {
                        document.getElementById('sandbox_results').innerHTML = '<p class="text-rose-400 text-center italic mt-10">⚠️ กรุณาระบุสัญญาหลักและเบี้ยประกัน (ที่ดึงมาจากระบบ BI) ให้ครบถ้วนเพื่อจำลองแผนอย่างแม่นยำ</p>';
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

                    // 3. Financial Impact Math: Premium to Income Ratio (PIR)
                    let annualIncome = data.inc * 12;
                    let premiumRatio = annualIncome > 0 ? (totalPremium / annualIncome) * 100 : 100;
                    let monthlyPremium = totalPremium / 12;
                    
                    // Recalculate original gap for comparison and calculate coverage percentage
                    let reqLife = data.liabilities + (data.exp * 12 * 5);
                    if(data.dependents > 0) reqLife += (data.dependents * 1000000);
                    let initialLifeGap = Math.max(0, reqLife - data.nw);
                    let initialHealthGapStr = window.AIEngineCore.recommendProductsXAI(data).gaps.health;
                    
                    let coverageLifePercent = initialLifeGap > 0 ? Math.min(100, (gapLifeClosed / initialLifeGap) * 100) : (gapLifeClosed > 0 ? 100 : 0);

                    // 4. Generate AI Verdict (Cost/Benefit) 
                    let verdictHtml = '';
                    let tradeOffHtml = '';
                    
                    if (premiumRatio > 20) {
                        verdictHtml = '<span class="text-rose-400 block mb-1">🚨 <b>สภาพคล่องตึงเครียด (High Premium Burden):</b></span> อัตราส่วนชำระเบี้ยประกันต่อรายได้ (Premium to Income Ratio: PIR) พุ่งไปถึง ' + premiumRatio.toFixed(1) + '% ซึ่งเกินเกณฑ์มาตรฐานปลอดภัยที่ 10-15% อาจส่งผลกระทบต่อค่าใช้จ่ายในชีวิตประจำวันและเกิดปัญหาสภาพคล่องช็อต (Liquidity Crunch) แนะนำให้ปรับโครงสร้างพอร์ตด่วน';
                        tradeOffHtml = '<br><br><span class="text-rose-300">⚖️ <b>Trade-off Analysis & Action:</b> <span class="text-slate-300">ต้นทุน (Cost) สูงเกินไปจนบีบคั้นสภาพคล่องปัจจุบัน (Negative Cost/Benefit) ซึ่งขัดหลักการบริหารความเสี่ยง FA ต้อง Take Action เชิงรุกโดยการลดทุนประกัน (SA) หรือถอด Rider ที่ทับซ้อนออก เพื่อดึงพอร์ตกลับมาสู่โซนปลอดภัย ป้องกันการบังคับเวนคืนกรมธรรม์ในอนาคต</span></span>';
                    } else if (premiumRatio > 15) {
                        verdictHtml = '<span class="text-orange-400 block mb-1">⚠️ <b>ข้อควรระวัง (Cashflow Warning):</b></span> อัตราส่วนชำระเบี้ยประกันต่อรายได้ (PIR) อยู่ที่ ' + premiumRatio.toFixed(1) + '% เริ่มค่อนข้างตึงมือตามสัดส่วนการเงินส่วนบุคคล FA ควรวิเคราะห์กระแสเงินสดสำรอง (Emergency Fund) เชิงลึกให้แน่ใจก่อนการประทับตรานำเสนอ';
                        tradeOffHtml = '<br><br><span class="text-orange-300">⚖️ <b>Trade-off Analysis & Action:</b> <span class="text-slate-300">แม้จะได้ผลประโยชน์ (Benefit) สูงในการอุดรอยรั่วที่กว้างขึ้น แต่ต้องแลกมากับต้นทุนคงที่ (Fixed Cost) ที่ค่อนข้างหนัก FA ควรถามเพื่อดึง Commitment จากลูกค้า และให้ฉุกคิดว่า หากขาดรายได้ 3-6 เดือน จะยังรักษาความคุ้มครองนี้ไว้ได้หรือไม่? หากยังไม่พร้อม ควรพิจารณาปรับลดแผนลงก่อน</span></span>';
                    } else if (gapLifeClosed > 0 || gapHealthClosed) {
                        verdictHtml = '<span class="text-emerald-400 block mb-1">✅ <b>ความคุ้มค่าระดับสูง (Optimal Cost/Benefit):</b></span> อัตราส่วนชำระเบี้ยประกันต่อรายได้ (PIR) อยู่ที่ ' + premiumRatio.toFixed(1) + '% ซึ่งเป็นสัดส่วนที่ชาญฉลาด สามารถถ่ายโอนความเสี่ยงก้อนใหญ่ (Risk Transfer) ให้บริษัทประกันได้สำเร็จ ถือเป็นการจัดสรรเงิน (Good Expense) ที่มีประสิทธิภาพยอดเยี่ยมตามมาตรฐานสากล';
                        tradeOffHtml = '<br><br><span class="text-emerald-300">⚖️ <b>Trade-off Analysis & Action:</b> <span class="text-slate-300">การจัดสรรกระแสเงินสดปัจจุบันในระดับที่เหมาะสม (Low Cost) แลกกับการอุดรอยรั่วทางการเงินระดับล้านบาท และปกป้องเงินเก็บทั้งชีวิต (High Benefit) ถือเป็นจุดสมดุล (Sweet Spot) ที่คุ้มค่าที่สุด FA สามารถมั่นใจในการนำเสนอแผนนี้ให้ลูกค้าพิจารณาตัดสินใจ (Execute) ได้ทันที</span></span>';
                    } else {
                        verdictHtml = '<span class="text-blue-400 block mb-1">ℹ️ <b>แผนสะสมความมั่งคั่ง (Wealth Building):</b></span> สัดส่วนเบี้ย ' + premiumRatio.toFixed(1) + '% ของรายได้ อยู่ในเกณฑ์ที่ยอดเยี่ยม ลูกค้าสามารถจ่ายได้สบายและมีเสถียรภาพ เหมาะสำหรับการต่อยอด Asset Allocation หรือสร้างกองทุนเกษียณอายุระยะยาว';
                        tradeOffHtml = '<br><br><span class="text-blue-300">⚖️ <b>Trade-off Analysis & Action:</b> <span class="text-slate-300">การเจียดสภาพคล่องปัจจุบัน (Cost) เพื่อแลกกับโอกาสรับผลตอบแทนและเป้าหมายในอนาคต (Future Benefit) เป็นการเดินเกมสู่ความมั่งคั่ง FA ควรชี้ชวนให้เห็นถึงพลังของดอกเบี้ยทบต้น (Compound Interest) และตรวจสอบให้แน่ใจอีกครั้งว่าฐานรากปิระมิดการเงินด้านความคุ้มครองของลูกค้านั้นแข็งแกร่งเพียงพอแล้วก่อนขยับมาโฟกัสที่ Wealth Portfolio</span></span>';
                    }
                    
                    verdictHtml += tradeOffHtml;

                    let gapStatusHtml = '';
                    if (gapLifeClosed > 0) {
                        gapStatusHtml += '<div class="text-[11px] text-blue-300 mt-1.5 flex items-start gap-1"><span>🛡️</span><span><b>Life Gap:</b> ปิดความเสี่ยงได้ <b>' + coverageLifePercent.toFixed(1) + '%</b> ของความเสี่ยงทั้งหมด สร้างหลักประกันมรดกและปิดตายความเสี่ยงหนี้ตกทอดได้ทันที <b>' + formatB(gapLifeClosed) + '</b> บาท</span></div>';
                    }
                    if (gapHealthClosed) {
                        gapStatusHtml += '<div class="text-[11px] text-pink-300 mt-1 flex items-start gap-1"><span>🏥</span><span><b>Health Gap:</b> ความเสี่ยงด้านค่ารักษาพยาบาล/โรคร้ายแรง ถูกโอนย้ายไปยังบริษัทประกัน <b>100%</b> (Safe Zone) ตัดปัญหาล้มละลายจากค่ารักษาพยาบาล</span></div>';
                    }

                    // 5. Compile Master Report (Add Deep FA Talking Points)
                    let faTalkingPoints = '<div class="mt-4 bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/50 shadow-sm">' +
                        '<span class="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block mb-1.5">💬 4. FA Talking Points & Objection Handling (บทสนทนา & การตอบข้อโต้แย้ง)</span>' +
                        '<ul class="list-disc pl-4 text-[11px] text-slate-300 space-y-2 leading-relaxed">' +
                            '<li><b>ภาพรวมการเงิน (Financial Overview):</b> "ตอนนี้โครงสร้างกระแสเงินสดและหนี้สินของคุณลูกค้าอยู่ในเกณฑ์ที่บริหารจัดการได้ดีครับ แต่จากข้อมูลเชิงลึก ระบบพบว่าเรายังมีช่องโหว่ (Risk Gap) ในส่วนของ..."</li>' +
                            '<li><b>การปิดความเสี่ยง (Risk Gap Action):</b> "หากเกิดเหตุไม่คาดฝัน ครอบครัวจะต้องรับภาระความเสี่ยงถึง ' + formatB(initialLifeGap) + ' บาท แต่แผนที่เราจัดสรรนี้ ใช้เงินเพียง ' + formatB(totalPremium) + '/ปี เพื่อโอนย้ายความเสี่ยงทั้งหมดไปให้บริษัทประกันรับผิดชอบแทนครับ มูลค่าความคุ้มครองที่ ' + formatB(gapLifeClosed) + ' บาท สามารถครอบคลุมความเสี่ยงได้ถึง ' + coverageLifePercent.toFixed(1) + '% ของความเสี่ยงทั้งหมดเลยครับ"</li>' +
                            '<li><b>การลงทุน & ความคุ้มค่า (Cost vs Benefit):</b> "เงินก้อนนี้คิดเป็นเพียง ' + premiumRatio.toFixed(1) + '% ของรายได้ต่อปี ซึ่งตามทฤษฎีการจัดสรรเงินออม (Rule of Thumb) จะไม่ทำให้เกิดปัญหาสภาพคล่องช็อต ถือเป็นการลงทุน (Allocation) ที่คุ้มค่ามาก (Low Cost / High Benefit) เพราะมันคือโล่กำบังที่ช่วยปกป้องความมั่งคั่ง (Net Worth) และพอร์ตการลงทุน ' + formatB(data.assets) + ' ที่คุณลูกค้าสร้างมาทั้งชีวิต ไม่ให้ถูกบังคับขาย (Forced Liquidation) เพื่อนำมาจ่ายค่ารักษาพยาบาลครับ"</li>' +
                            '<li><b>การตอบข้อโต้แย้ง (Handling Objection):</b> หากลูกค้าบอกว่าเบี้ยประกันแพงไป หรือรู้สึกเสียดายเงิน: <br><span class="text-indigo-200">"ผมเข้าใจครับว่าเบี้ยก้อนนี้อาจดูเหมือนรายจ่ายที่เพิ่มขึ้น แต่ในมุมมองการวางแผนการเงิน แท้จริงแล้วมันคือการ <b>&quot;ซื้อเวลาและอิสรภาพทางการเงิน&quot;</b> ให้กับครอบครัวครับ การเสียเบี้ยคงที่หลักหมื่นในวันนี้ เพื่อล็อกความเสี่ยงแบบ 100% ดีกว่าปล่อยให้ความเสี่ยงหลักล้านที่มองไม่เห็นมากัดกินเงินเก็บทั้งหมดในอนาคตครับ"</span></li>' +
                            '<li><b>Commitment Check:</b> "เบี้ยก้อนนี้จะไม่กระทบแผนการเงินอื่น หรือเงินสำรองฉุกเฉินที่คุณลูกค้าเตรียมไว้ใช่ไหมครับ? ถ้าระบบของเราเช็คแล้วว่า Cashflow ปลอดภัย เราสามารถเริ่มต้นสร้างเกราะป้องกันนี้ได้เลยอย่างสบายใจครับ"</li>' +
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
                        '<span class="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-2">📦 2. การจัดสรรพอร์ตประกัน (Proposed Portfolio)</span>' +
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
                        '<span class="text-[10px] text-orange-400 font-bold uppercase tracking-wider block mb-1.5">🧠 3. AI Verdict (วิเคราะห์ความเหมาะสม & Risk Gap)</span>' +
                        '<p class="text-[11px] text-slate-300 leading-relaxed">' + verdictHtml + '</p>' +
                        '<div class="mt-2 pt-2 border-t border-slate-700">' +
                            (gapStatusHtml || '<p class="text-[10px] text-slate-500 italic">- ไม่ได้จัดสรรแผนเพื่อปิดช่องโหว่ด้าน Life / Health โดยตรง -</p>') +
                        '</div>' +
                    '</div>' + faTalkingPoints;

                    document.getElementById('sandbox_results').innerHTML = reportHtml;
                    termLog("🎛️ FA Custom Portfolio Simulated Successfully.", "success");
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
                    
                    let posFactors = '- ➕ ปัจจัยบวก: รายได้ (' + formatB(data.inc) + ')' + (data.nw >= 0 ? ' และ ความมั่งคั่งสุทธิ (' + formatB(data.nw) + ')' : '') + '<br>';
                    let negFactors = '- ➖ ปัจจัยลบ: หนี้สะสม (' + formatB(data.liabilities) + ')' + (data.nw < 0 ? ', ความมั่งคั่งสุทธิติดลบ (' + formatB(data.nw) + ')' : '') + ', ภาระผ่อน (DTI ' + (data.dti*100).toFixed(0) + '%), ภาระดูแล (' + data.dependents + ' คน)';
                    
                    let nnDescHtml = '<div class="space-y-1.5">' +
                        '<b class="text-purple-300 text-[11px]">⚙️ ตรรกะการคำนวณ (Cause & Effect):</b><br>' +
                        '<span class="text-emerald-400 block mt-1 leading-snug"><b>จุดเริ่มต้น (Inputs):</b> <br>' + posFactors + negFactors + '</span>' +
                        '<span class="text-sky-300 block mt-1 leading-snug"><b>📊 การวิเคราะห์ความเสี่ยงรายได้ (Income Stability):</b> <br>- อาชีพ: ' + escapeHTML(data.occ) + ' ➡️ ความสม่ำเสมอ: ' + escapeHTML(data.occType || "ปานกลาง") + '</span>' +
                        '<span class="text-purple-300 block mt-2 pt-2 border-t border-purple-500/30"><b>ผลลัพธ์ (Result):</b> <br>➡️ AI ให้น้ำหนักปัจจัยบวก/ลบ และความเสี่ยงของแหล่งรายได้ สรุปคะแนนศักยภาพตั้งต้นที่ <b>' + nnScore.toFixed(1) + '%</b> ซึ่งคะแนนนี้สะท้อนความน่าจะเป็นที่ลูกค้าจะบรรลุเป้าหมายการเงินระยะยาวโดยไม่เกิดภาวะล้มละลาย (Insolvency) กลางทาง</span>' +
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
                    document.getElementById('log_persona').innerText = cluster.persona;
                    
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
                        '<span class="text-red-300 font-bold text-[10px] block mb-1">⚙️ กลไกคำนวณ (Cause & Effect):</span>' +
                        '<span class="text-[10.5px] text-slate-400">ประเมินความเสี่ยงทิ้งกรมธรรม์จาก <b>คุณภาพหนี้สิน (หนี้เสีย vs หนี้ดี)</b> และ <b>กระแสเงินสดสุทธิ</b> การรักษาอัตราความคงอยู่ของกรมธรรม์ (Persistency) คือหัวใจสำคัญของการรับผลประโยชน์สูงสุด</span>' +
                        '</div>';
                    lapseHtml += lapse.drivers.map(d => '<p class="bg-slate-800 p-2.5 rounded-lg border border-slate-700 shadow-sm leading-relaxed mb-1.5">' + d + '</p>').join('');
                    document.getElementById('log_lapse_drivers').innerHTML = lapseHtml;

                    let con = window.AIEngineCore.runConsensus(data, nnScore, cluster.persona);
                    document.getElementById('log_crm_original').innerText = data.originalScore.toFixed(1) + "%"; 
                    document.getElementById('log_base_audit').innerText = nnScore.toFixed(1) + "%";
                    document.getElementById('log_discount_audit').innerText = "-" + con.discount.toFixed(1) + "%";
                    document.getElementById('log_final_score').innerText = con.finalScore.toFixed(1) + "%";
                    
                    let consensusHtml = '<div class="mb-3 bg-slate-800 p-3.5 rounded-lg border border-slate-600 text-[10.5px] text-slate-300 leading-relaxed text-left shadow-md">' +
                        '<b class="text-indigo-400 text-xs block mb-1">📖 Definition (นิยามและการใช้งานสำหรับ FA):</b>' +
                        '<span class="text-white font-bold">"Final Adjusted Score (คะแนนความสำเร็จสุทธิ)"</span> คือตัวชี้วัดศักยภาพทางการเงินที่สะท้อน <b>"โลกความเป็นจริง"</b> มากที่สุด โดยระบบจะนำคะแนนศักยภาพตั้งต้น (Base Score) มาหักลบด้วย <b>"อคติและพฤติกรรมเสี่ยง (Behavioral Constraints)"</b> เช่น การก่อหนี้บริโภค หรือการใช้เงินเกินตัว<br><br>' +
                        '<b class="text-emerald-400">💡 FA Action Plan & Trade-off:</b> ใช้คะแนนนี้เพื่อทำ <b>Reality Check</b> กับลูกค้า หากคะแนนนี้ต่ำกว่า Base Score มากๆ (โดน Penalty สูง) FA ต้องเปิดใจลูกค้าให้เห็นว่า <i>"พฤติกรรมใดกำลังทำลายแผน"</i> และให้ลูกค้าพิจารณา <b>Trade-off</b> ระหว่าง "ความสุขระยะสั้น (ใช้เงินเกินตัว)" กับ "ความมั่นคงระยะยาว" พร้อมเสนอ <b>"การปรับโครงสร้างหนี้/ลดรายจ่าย"</b> ควบคู่ไปกับการเสนอโปรดักส์ เพื่อสร้างความน่าเชื่อถือระดับที่ปรึกษามืออาชีพ' +
                    '</div>';
                    consensusHtml += con.auditTrail.join('');
                    document.getElementById('log_consensus_exp').innerHTML = consensusHtml;

                    let synthesisResults = { persona: cluster.persona, con: con, rec: rec, lapse: lapse, xai: xai };
                    let executiveHtml = window.AIEngineCore.generateExecutiveSummary(data, synthesisResults);
                    let execEl = document.getElementById('log_executive_summary');
                    if (execEl) execEl.innerHTML = executiveHtml;

                    termLog("✅ All 12 Enterprise Modules Executed Successfully.", "success");

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

                window.onload = () => {
                    window.initCRMSelector();
                    setTimeout(() => { if(window.initSandboxDropdowns) window.initSandboxDropdowns(); }, 500);
                };
            </script>
        </body>
        </html>`;

        this.windowRef.document.open();
        this.windowRef.document.write(htmlContent);
        this.windowRef.document.close();
    }
};