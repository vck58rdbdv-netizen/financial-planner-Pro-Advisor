// =====================================================================
// 🧠 AI CONTROL CENTER MODULE (ai-control-center.js)
// สถาปัตยกรรมแยกส่วน (Decoupled Module) สำหรับตรวจสอบการทำงานของสมองกล
// =====================================================================

window.AIControlCenter = {
    windowRef: null,

    open: function() {
        // เช็คว่าถ้าเปิดอยู่แล้ว ให้ดึงหน้าต่างนั้นขึ้นมาเลย ไม่ต้องเปิดซ้ำ
        if (this.windowRef && !this.windowRef.closed) {
            this.windowRef.focus();
            return;
        }

        this.windowRef = window.open('', '_blank');
        if (!this.windowRef) {
            alert("⚠️ เบราว์เซอร์บล็อกหน้าต่างใหม่ (Pop-up) กรุณาอนุญาตเบราว์เซอร์ให้เปิด Pop-up ก่อนครับ");
            return;
        }

        const htmlContent = `<!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AI Control Center (Diagnostics)</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;600;700&display=swap');
                body { font-family: 'Prompt', sans-serif; background-color: #0f172a; color: #f8fafc; }
                .neon-border { box-shadow: 0 0 10px rgba(56, 189, 248, 0.2), inset 0 0 10px rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.3); }
                .neon-border-purple { box-shadow: 0 0 10px rgba(168, 85, 247, 0.2), inset 0 0 10px rgba(168, 85, 247, 0.05); border: 1px solid rgba(168, 85, 247, 0.3); }
                .data-value { font-family: 'Courier New', Courier, monospace; color: #38bdf8; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
            </style>
        </head>
        <body class="p-4 md:p-6">
            <div class="max-w-7xl mx-auto space-y-6">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-700 pb-4 gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-600 shadow-lg relative">
                            <span class="text-3xl">🤖</span>
                            <span class="absolute -top-1 -right-1 flex h-3 w-3">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                              <span class="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                            </span>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white tracking-wider">AI DIAGNOSTICS CENTER</h1>
                            <p class="text-xs text-slate-400 font-mono flex items-center gap-2">
                                <span>STATUS: <span class="text-emerald-400 font-bold">ONLINE</span></span> | 
                                <span>POLLING: 2.0s</span>
                            </p>
                        </div>
                    </div>
                    <div class="flex gap-2 w-full md:w-auto">
                        <button onclick="fetchLatestData()" class="flex-1 md:flex-none bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded text-xs font-bold transition flex items-center justify-center gap-1"><span>🔄</span> Sync Data</button>
                        <button onclick="window.close()" class="flex-1 md:flex-none bg-slate-700 hover:bg-red-600 text-white px-4 py-2 rounded text-xs font-bold transition">❌ Close</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div class="bg-slate-800 rounded-xl p-5 neon-border flex flex-col h-[400px]">
                        <h3 class="font-bold text-slate-300 mb-3 text-sm border-b border-slate-700 pb-2 flex items-center gap-2"><span>🌐</span> CORE NEURAL NETWORK</h3>
                        <div class="overflow-y-auto custom-scrollbar flex-grow pr-2" id="nn_status_content">
                            <div class="flex flex-col items-center justify-center h-full text-slate-500">
                                <span class="text-3xl animate-spin mb-2">⚙️</span> รอรับข้อมูลจากหน้าต่างหลัก...
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-800 rounded-xl p-5 neon-border col-span-1 lg:col-span-2 h-[400px] flex flex-col">
                        <h3 class="font-bold text-slate-300 mb-3 text-sm border-b border-slate-700 pb-2 flex justify-between items-center">
                            <span class="flex items-center gap-2"><span>🎯</span> 8D K-MEANS CLUSTERING</span>
                            <span class="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-cyan-300" id="current_cluster_badge">N/A</span>
                        </h3>
                        <div class="flex flex-col md:flex-row gap-4 flex-grow min-h-0">
                            <div class="w-full md:w-1/2 relative h-full min-h-[200px]">
                                <canvas id="knnRadarChart"></canvas>
                            </div>
                            <div class="w-full md:w-1/2 text-xs text-slate-300 overflow-y-auto custom-scrollbar bg-slate-900/50 rounded-lg border border-slate-700 p-2">
                                <div id="knn_distance_list"></div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-800 rounded-xl p-5 neon-border-purple col-span-1 lg:col-span-3">
                        <h3 class="font-bold text-slate-300 mb-3 text-sm border-b border-slate-700 pb-2 flex justify-between items-center">
                            <span class="flex items-center gap-2"><span>🎲</span> STOCHASTIC ENGINE (MONTE CARLO)</span>
                            <span class="text-[10px] text-purple-300" id="mc_status_badge">Idle</span>
                        </h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4" id="mc_stats_container">
                            </div>
                    </div>

                </div>
                <div class="bg-slate-800 rounded-xl p-5 neon-border col-span-1 lg:col-span-3 h-[180px] flex flex-col">
                        <h3 class="font-bold text-slate-300 mb-3 text-sm border-b border-slate-700 pb-2 flex justify-between items-center">
                            <span class="flex items-center gap-2"><span>🔍</span> EXPLAINABLE AI (Feature Sensitivity Impact)</span>
                        </h3>
                        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 flex-grow" id="xai_metrics_container">
                            <div class="col-span-5 text-center text-slate-500 py-4 flex flex-col items-center justify-center">
                                <span class="text-2xl animate-spin mb-2">⚙️</span> รอรันการประมวลผลบนหน้าจอหลัก...
                            </div>
                        </div>
                    </div>
            </div>

            <script>
                let radarChart = null;

                // ฟังก์ชันสำหรับหน้าต่าง AI ใช้ดึงข้อมูลจากหน้าต่างหลัก (window.opener)
                window.fetchLatestData = function() {
                    if (!window.opener || window.opener.closed) {
                        document.getElementById('nn_status_content').innerHTML = '<div class="text-red-500 text-center font-bold mt-10">❌ ขาดการเชื่อมต่อกับหน้าต่างหลัก</div>';
                        return;
                    }

                    try {
                        // 1. ดึงตัวแปร Global จากหน้าหลัก
                        const mlFeatures = window.opener.latestMLFeatures || null;
                        const coAdvisorStats = window.opener.latestCoAdvisorStats || null;
                        const simStats = window.opener.latestSimulationStats || null;
                        const centroids = window.opener.K_MEANS_CENTROIDS || null;
                        
                        // ==========================================
                        // 🟢 UPDATE BOX 1: Neural Network
                        // ==========================================
                        let nnHtml = '<ul class="space-y-2">';
                        if (mlFeatures) {
                            nnHtml += '<li class="flex justify-between"><span class="text-slate-500">Active Model:</span><span class="text-emerald-400 font-mono bg-emerald-900/30 px-1 rounded">Loaded (15x32x32x1)</span></li>';
                            nnHtml += '<li class="flex justify-between"><span class="text-slate-500">Raw ML Score:</span><span class="text-white font-mono">' + (coAdvisorStats ? coAdvisorStats.rawMLScore.toFixed(2) + '%' : 'N/A') + '</span></li>';
                            nnHtml += '<li class="flex justify-between"><span class="text-slate-500">Final Adjusted:</span><span class="text-cyan-400 font-bold font-mono">' + (coAdvisorStats ? coAdvisorStats.finalScore.toFixed(2) + '%' : 'N/A') + '</span></li>';
                            
                            nnHtml += '<li class="pt-3 pb-1 border-b border-slate-700"><span class="text-cyan-500 font-bold text-[10px] uppercase tracking-widest">Live Sensed Features (Inputs):</span></li>';
                            
                            for (let key in mlFeatures) {
                                let val = mlFeatures[key];
                                let formattedVal = typeof val === 'number' ? val.toLocaleString('en-US', {maximumFractionDigits:2}) : val;
                                nnHtml += '<li class="flex justify-between text-[11px]"><span class="text-slate-400">' + key + '</span> <span class="data-value">' + formattedVal + '</span></li>';
                            }
                        } else {
                            nnHtml += '<li class="text-amber-400 text-center mt-10">รอกดปุ่ม "ประมวลผล" บนหน้าหลัก...</li>';
                        }
                        nnHtml += '</ul>';
                        document.getElementById('nn_status_content').innerHTML = nnHtml;

                        // ==========================================
                        // 🟢 UPDATE BOX 2: K-Means Radar
                        // ==========================================
                        if (centroids && mlFeatures && typeof window.opener.normalizeFeatures === 'function') {
                            
                            // ดึงชื่อกลุ่มปัจจุบันไปแสดงบน Badge
                            if (coAdvisorStats && coAdvisorStats.hybridPersona) {
                                document.getElementById('current_cluster_badge').innerText = coAdvisorStats.hybridPersona.split('[')[0];
                            }

                            let radarLabels = [];
                            let radarDataUser = [];
                            let distanceHtml = '<table class="w-full text-left"><thead><tr class="text-cyan-500 border-b border-slate-600"><th class="pb-2 font-bold uppercase tracking-wider text-[10px]">Cluster Centroid</th><th class="pb-2 text-right font-bold uppercase tracking-wider text-[10px]">Distance</th></tr></thead><tbody class="divide-y divide-slate-700/50">';

                            let tempNorm = window.opener.normalizeFeatures(mlFeatures);
                            for(let key in tempNorm) {
                                radarLabels.push(key.toUpperCase());
                                radarDataUser.push(tempNorm[key]);
                            }

                            // แปลง Centroids Object เป็น Array เพื่อเอาไปเรียงลำดับ (Sort)
                            let distanceArray = [];
                            for(let cluster in centroids) {
                                let dist = window.opener.calculateEuclideanDistance(tempNorm, centroids[cluster]);
                                distanceArray.push({ name: cluster, distance: dist });
                            }
                            
                            // เรียงจากใกล้สุด (ตัวเลขน้อยสุด) ไปมากสุด
                            distanceArray.sort((a, b) => a.distance - b.distance);

                            distanceArray.forEach((item, index) => {
                                let isMatch = index === 0; // ตัวที่ใกล้ที่สุดคือตัวที่ Match
                                let colorClass = isMatch ? "text-cyan-300 font-bold bg-cyan-900/20" : "text-slate-400";
                                let icon = isMatch ? "🎯 " : "";
                                distanceHtml += '<tr class="' + colorClass + ' transition-colors hover:bg-slate-800"><td class="py-2 px-2">' + icon + item.name + '</td><td class="py-2 px-2 text-right font-mono">' + item.distance.toFixed(4) + '</td></tr>';
                            });

                            distanceHtml += '</tbody></table>';
                            document.getElementById('knn_distance_list').innerHTML = distanceHtml;

                            if (radarChart) radarChart.destroy();
                            const ctx = document.getElementById('knnRadarChart').getContext('2d');
                            radarChart = new Chart(ctx, {
                                type: 'radar',
                                data: {
                                    labels: radarLabels,
                                    datasets: [{
                                        label: 'Client Vector',
                                        data: radarDataUser,
                                        backgroundColor: 'rgba(56, 189, 248, 0.2)',
                                        borderColor: 'rgba(56, 189, 248, 1)',
                                        pointBackgroundColor: '#0ea5e9',
                                        pointBorderColor: '#fff',
                                        borderWidth: 2
                                    }]
                                },
                                options: {
                                    responsive: true, maintainAspectRatio: false,
                                    scales: {
                                        r: { 
                                            angleLines: { color: 'rgba(255,255,255,0.1)' }, 
                                            grid: { color: 'rgba(255,255,255,0.1)' }, 
                                            pointLabels: { color: '#94a3b8', font: {size: 9, family: 'Prompt'} }, 
                                            ticks: { display: false, min: 0, max: 1 } 
                                        }
                                    },
                                    plugins: { legend: { display: false }, tooltip: { enabled: false } }
                                }
                            });
                        }

                        // ==========================================
                        // 🟢 UPDATE BOX 3: Monte Carlo Engine
                        // ==========================================
                        let mcContainer = document.getElementById('mc_stats_container');
                        let mcBadge = document.getElementById('mc_status_badge');

                        if (simStats) {
                            mcBadge.innerText = 'Last Run: ' + new Date().toLocaleTimeString();
                            mcBadge.className = 'text-[10px] bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30';

                            mcContainer.innerHTML = \`
                                <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                                    <p class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Iterations</p>
                                    <p class="text-xl font-bold text-white font-mono">\${simStats.iterationsRun.toLocaleString()}</p>
                                </div>
                                <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                                    <p class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Base Inflation</p>
                                    <p class="text-xl font-bold text-orange-400 font-mono">\${(simStats.macroContext.inflationAssumption).toFixed(2)}%</p>
                                </div>
                                <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                                    <p class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Expected ROI</p>
                                    <p class="text-xl font-bold text-emerald-400 font-mono">\${(simStats.macroContext.marketReturnAssumption).toFixed(2)}%</p>
                                </div>
                                <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                                    <p class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Worst Case CVaR (Yr 5)</p>
                                    <p class="text-xl font-bold text-red-400 font-mono">\${Math.round(simStats.worstCase5YrCVaR).toLocaleString()}</p>
                                </div>
                            \`;
                        } else {
                            mcContainer.innerHTML = '<div class="col-span-4 text-center text-slate-500 py-4">รอสถิติการจำลอง Monte Carlo...</div>';
                        }

                        // ==========================================
                        // 🟢 UPDATE BOX 4: XAI (Explainable AI)
                        // ==========================================
                        let xaiContainer = document.getElementById('xai_metrics_container');
                        
                        // เช็คว่ามีฟังก์ชัน XAI ในหน้าหลักหรือไม่
                        if (window.opener.generateXAIReport && mlFeatures) {
                            // ดึงคะแนนปัจจุบัน
                            let currentProb = coAdvisorStats ? coAdvisorStats.finalScore : 50;
                            // สั่งให้ XAI ทำการขยับตัวแปรเพื่อหาผลกระทบ
                            let xaiResults = window.opener.generateXAIReport(mlFeatures, currentProb);
                            
                            if (xaiResults && xaiResults.length > 0) {
                                let xaiHtml = '';
                                xaiResults.forEach(item => {
                                    let isPositive = item.impactValue > 0;
                                    let color = isPositive ? 'emerald' : 'rose';
                                    let icon = isPositive ? '▲' : '▼';
                                    
                                    // ⚠️ ใช้ \${} เพื่อไม่ให้ชนกับ String แบบ Backtick หลักของ HTML 
                                    xaiHtml += \`
                                    <div class="bg-slate-900 border border-\${color}-500/30 p-3 rounded-lg shadow-inner flex flex-col justify-between">
                                        <span class="text-[10px] text-slate-400 uppercase truncate" title="\${item.feature}">\${item.feature}</span>
                                        <div class="flex items-end justify-between mt-2">
                                            <span class="text-xl \${isPositive ? 'text-emerald-400' : 'text-rose-400'}">\${icon}</span>
                                            <span class="text-lg font-bold text-\${color}-400 font-mono">\${Math.abs(item.impactValue).toFixed(1)}%</span>
                                        </div>
                                    </div>\`;
                                });
                                xaiContainer.innerHTML = xaiHtml;
                            } else {
                                xaiContainer.innerHTML = '<div class="col-span-5 text-slate-500 text-center py-4 text-xs flex items-center justify-center">ไม่พบตัวแปรที่มีอิทธิพลรุนแรง (Stable)</div>';
                            }
                        } else {
                            xaiContainer.innerHTML = '<div class="col-span-5 text-slate-500 text-center py-4 text-xs flex items-center justify-center">ระบบ XAI รอรันผล...</div>';
                        }
                            
                    } catch (e) {
                        console.error("AI Dashboard Sync Error:", e);
                    }
                };

                // Polling Mechanism (ดึงข้อมูลทุก 2 วินาที)
                setInterval(fetchLatestData, 2000);
                
                // Trigger ครั้งแรกทันทีที่หน้าจอโหลดเสร็จ
                window.onload = () => {
                    setTimeout(fetchLatestData, 500); // ดีเลย์นิดนึงเผื่อหน้าต่างแม่ยังเตรียม Object ไม่เสร็จ
                };
            <\/script>
        </body>
        </html>`;

        this.windowRef.document.open();
        this.windowRef.document.write(htmlContent);
        this.windowRef.document.close();
    }
};