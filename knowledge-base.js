// ==========================================
// 📚 Financial Planner - Comprehensive Knowledge Base Module (iPad Optimized Version)
// ไฟล์นี้รวบรวมคู่มือการใช้งาน พจนานุกรมคำอธิบายระบบ และทฤษฎีอ้างอิงทั้งหมด
// ==========================================

window.systemDictionary = {
    // --- ส่วนคู่มือการใช้งาน ---
    "manual-1": {
        icon: "🎯",
        iconClass: "bg-emerald-100 text-emerald-600",
        title: "ส่วนที่ 1: บทนำและวิสัยทัศน์ (Vision & Introduction)",
        content: `
            <div class="text-sm text-gray-700 leading-relaxed space-y-5 pl-0 antialiased touch-manipulation">
                
                <!-- Hero Quote -->
                <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden transform-gpu">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🧭</div>
                    <p class="text-xl md:text-2xl font-bold italic mb-2 relative z-10 leading-tight">"ยกระดับการวางแผนการเงิน จากเส้นตรงบนกระดาษคำนวณ สู่ห้องทดลองชีวิตเสมือนจริง"</p>
                    <p class="text-emerald-200 text-xs md:text-sm relative z-10 font-medium tracking-wide">Empowering Advisors. Transforming Lives. Securing Futures.</p>
                </div>

                <!-- The Problem -->
                <div class="space-y-3 px-2">
                    <p><b>Financial Planner Pro Advisor</b> กำเนิดขึ้นจากความเข้าใจอย่างลึกซึ้งว่า <i>"ชีวิตคนเราไม่ใช่สมการเส้นตรง"</i></p>
                    <p>การวางแผนการเงินแบบดั้งเดิม (Deterministic Approach) มักตั้งสมมติฐานที่สวยหรูเกินจริง เช่น <i>"พอร์ตจะโต 5% เป๊ะๆ ทุกปี"</i> หรือ <i>"ลูกค้าจะออมเงินได้ต่อเนื่องโดยไม่มีสะดุด"</i> ซึ่งเมื่อนำไปใช้จริง แผนเหล่านี้มักจะพังทลายลงเมื่อเจอกับ <b>วิกฤตเศรษฐกิจ ความผันผวนของตลาด และอคติทางอารมณ์ของมนุษย์ (Behavioral Bias)</b></p>
                    <p>เพื่อลบจุดอ่อนเหล่านั้น ระบบนี้จึงถูกพัฒนาขึ้นให้เป็น <b>"Hybrid Co-Advisor" (ผู้ช่วยที่ปรึกษาอัจฉริยะ)</b> ที่ผสาน 3 เสาหลักเข้าด้วยกัน เพื่อสร้างแผนการเงินที่ทนทานต่อความเป็นจริง:</p>
                </div>

                <!-- The 3 Pillars -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-md active:scale-[0.98]">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner select-none">🎓</div>
                        <h4 class="font-bold text-gray-800 mb-2">มาตรฐานวิชาชีพ<br>(CFP Standards)</h4>
                        <p class="text-xs text-gray-600">ยึดหลักการวินิจฉัยงบดุล กระแสเงินสด และอัตราส่วนทางการเงินที่แม่นยำตามมาตรฐานสากล เพื่ออุดรอยรั่วและสร้างรากฐานที่แข็งแกร่ง</p>
                    </div>
                    
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-md active:scale-[0.98]">
                        <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner select-none">🧠</div>
                        <h4 class="font-bold text-gray-800 mb-2">ปัญญาประดิษฐ์<br>(Data Science & AI)</h4>
                        <p class="text-xs text-gray-600">ใช้โมเดล Machine Learning ประเมินโอกาสสำเร็จ จำลองวิกฤต (Stress Test) และจัดกลุ่มพฤติกรรมลูกค้าอัตโนมัติ เพื่อสร้างแผนที่ทำได้จริง</p>
                    </div>

                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-md active:scale-[0.98]">
                        <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner select-none">🔒</div>
                        <h4 class="font-bold text-gray-800 mb-2">ความปลอดภัยสูงสุด<br>(Privacy-First)</h4>
                        <p class="text-xs text-gray-600">การประมวลผลเป็นแบบ <b>100% Local Execution</b> เกิดขึ้นบนอุปกรณ์ของคุณเท่านั้น ปราศจากการส่งข้อมูลขึ้นคลาวด์ ปลอดภัยตามมาตรฐาน PDPA</p>
                    </div>
                </div>

                <!-- The Ultimate Value -->
                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100 mt-6 shadow-sm relative transform-gpu">
                    <div class="absolute right-4 top-4 text-4xl opacity-20 select-none pointer-events-none">💎</div>
                    <h3 class="font-bold text-emerald-900 mb-3 text-lg">คุณค่าสูงสุดที่คุณ (FA) จะส่งมอบให้ลูกค้า</h3>
                    <p class="text-sm text-emerald-800 leading-relaxed">
                        ระบบนี้ไม่ได้สร้างมาเพื่อ "ทดแทน" ตัวแทน แต่สร้างมาเพื่อ <b>"ติดปีก"</b> ให้คุณก้าวข้ามจากการเป็นนักขาย (Salesperson) สู่การเป็น <b>Wealth Architect (สถาปนิกทางการเงิน)</b> อย่างแท้จริง 
                    </p>
                    <p class="text-sm text-emerald-800 leading-relaxed mt-2">
                        ด้วยระบบนี้ ลูกค้าจะมองคุณเป็น <b>"คู่คิดเชิงกลยุทธ์"</b> ที่ใช้หลักฐานเชิงประจักษ์ (Empirical Evidence) ในการชี้แนะ คุณสามารถทำให้เรื่องนามธรรมกลายเป็นภาพที่จับต้องได้ และมอบ <b>"ความอุ่นใจ (Peace of Mind)"</b> ที่ยืนยันได้ด้วยตัวเลขทางวิทยาศาสตร์
                    </p>
                </div>
            </div>
        `
    },
    "manual-2": {
        icon: "🧠",
        iconClass: "bg-blue-100 text-blue-600",
        title: "ส่วนที่ 2: สถาปัตยกรรมสมองกล (AI Pipeline Architecture)",
        content: `
            <div class="antialiased touch-manipulation">
                <p class="text-sm text-gray-600 mb-6">เมื่อคุณกดปุ่ม <b>"ประมวลผล"</b> ระบบจะวิ่งผ่านกระบวนการ 5 ขั้นตอน (5-Stage Engine) ภายในเวลาไม่กี่วินาที ดังนี้:</p>
                <div class="space-y-5">
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                        <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-indigo-100 select-none">1</div>
                        <div>
                            <h4 class="font-bold text-gray-800 text-base mb-2">Diagnostic Engine (การวินิจฉัยสุขภาพการเงิน)</h4>
                            <p class="text-xs text-gray-600 leading-relaxed mb-2">สกัดข้อมูลดิบ (งบดุลและกระแสเงินสด) มาคำนวณเป็นอัตราส่วนทางการเงินสากล เช่น Survival Ratio, Liquidity Ratio, DTI และ Savings Ratio</p>
                            <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                                <b>Output:</b> ประเมิน <span class="text-indigo-600 font-bold">Financial Health Score</span> เต็ม 100 คะแนน เพื่อวิเคราะห์ความเสี่ยงล้มละลาย (Risk of Ruin) ขั้นพื้นฐาน
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                        <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-purple-100 select-none">2</div>
                        <div>
                            <h4 class="font-bold text-gray-800 text-base mb-2">Behavioral K-Means Clustering (AI จัดกลุ่มพฤติกรรม)</h4>
                            <p class="text-xs text-gray-600 leading-relaxed mb-2">ป้อนข้อมูลเข้าสู่โมเดล Machine Learning (8D K-Means) วิเคราะห์พฤติกรรม 8 แกน (อายุ, รายได้, ความมั่งคั่ง, ภาระหนี้, ความเสี่ยง, ความสม่ำเสมอ, วินัย, ภาระอุปการะ) เพื่อหา Persona ที่ซ่อนอยู่</p>
                            <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                                <b>Output:</b> ระบบจะจัดลูกค้าเข้าสู่กลุ่มเฉพาะ (เช่น UHNW, Cash Hoarder, Overleveraged) และปรับโครงสร้าง "สามเหลี่ยมการเงิน" ให้ดิ้นได้ตามความเสี่ยงนั้นๆ
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                        <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-orange-100 select-none">3</div>
                        <div>
                            <h4 class="font-bold text-gray-800 text-base mb-2">Optimization & DP Knapsack (อัลกอริทึมจัดสรรและแก้ปัญหา)</h4>
                            <p class="text-xs text-gray-600 leading-relaxed mb-2">AI จะคำนวณงบประมาณส่วนเกินที่แท้จริง (Elastic Budget) และใช้คณิตศาสตร์ <b class="text-orange-600">Dynamic Programming</b> เลือกแบบประกัน "Base + Rider" ที่ให้ความคุ้มครองสูงสุดโดยไม่เกินงบ (Knapsack Problem) พร้อมคำนวณการโยกเงินเพื่อ <b class="text-blue-600">Tax Alpha</b> (ลดหย่อนภาษี) และ <b class="text-red-600">Debt Snowball</b> (ปลดหนี้)</p>
                            <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                                <b>Output:</b> จัดตะกร้าสินค้า (Product Assembly) ออกมาเป็น 3 ทางเลือก พร้อมแผนกระแสเงินสด Benchmark ใหม่
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                        <div class="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-red-100 select-none">4</div>
                        <div>
                            <h4 class="font-bold text-gray-800 text-base mb-2">Stochastic Simulation (แบบจำลอง Monte Carlo & Stress Test)</h4>
                            <p class="text-xs text-gray-600 leading-relaxed mb-2">ระบบจะรันโลกคู่ขนาน 2,000 รอบ สุ่มสภาวะตลาด (กระทิง/หมี) ผสานทฤษฎี <b class="text-red-600">Merton's Jump Diffusion</b> จำลองวิกฤตเศรษฐกิจเฉียบพลัน และควบคุมการถอนเงินหลังเกษียณด้วย <b class="text-emerald-600">Guyton-Klinger Rules</b> ป้องกันพอร์ตแตก</p>
                            <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                                <b>Output:</b> โอกาสความสำเร็จ (Probability of Success) พร้อมช่วงความเชื่อมั่น 95% และกราฟจำลองการลงทุน 5 ปีล่วงหน้า (CVaR)
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                        <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-emerald-100 select-none">5</div>
                        <div>
                            <h4 class="font-bold text-gray-800 text-base mb-2">Natural Language Generation (NLG Storytelling)</h4>
                            <p class="text-xs text-gray-600 leading-relaxed mb-2">แปลผลลัพธ์ทางคณิตศาสตร์ทั้งหมด ออกมาเป็นภาษาที่มนุษย์เข้าใจได้ โดยใช้หลักจิตวิทยา DISC ปรับโทนข้อความให้เข้ากับความกลัวและความคาดหวังของลูกค้า</p>
                            <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                                <b>Output:</b> บทวิเคราะห์ข้อความบนหน้ารายงาน (Executive Summary) ที่พร้อมสำหรับนำไปใช้นำเสนอลูกค้า
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "manual-3": {
        icon: "💻",
        iconClass: "bg-gray-800 text-white",
        title: "ส่วนที่ 3: คู่มือปฏิบัติการฉบับสมบูรณ์ และสถาปัตยกรรมระบบ (Comprehensive Operations Manual)",
        content: `
            <div class="antialiased touch-manipulation">
            <p class="mb-5 text-sm text-gray-700 leading-relaxed"><b>Financial Planner Pro Advisor</b> ไม่ใช่แค่เครื่องมือคำนวณ แต่คือระบบปฏิบัติการทางการเงิน (Financial Operating System) ที่ครอบคลุมตั้งแต่การจัดการฐานข้อมูลลูกค้า (CRM), การคำนวณขั้นสูง (Pro Calculators), การวิเคราะห์ด้วย AI, และการสร้างรายงานระดับ Enterprise คู่มือฉบับนี้จะเจาะลึกทุกฟังก์ชันแบบ Step-by-Step เพื่อให้คุณดึงศักยภาพของระบบออกมาได้ 100%</p>
            
            <div class="space-y-8">
                
                <!-- MODULE 1: Home Screen -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm animate-fade-in transform-gpu">
                    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 border-b border-blue-500 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">1</div> 
                        <h3 class="font-bold text-white text-lg">ศูนย์บัญชาการหลัก (Home Screen & Navigation)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">เมื่อเข้าสู่ระบบสำเร็จ คุณจะพบกับ <b>หน้าจอ Home Screen</b> ซึ่งออกแบบมาให้เป็นจุดศูนย์กลาง (Hub) ในการเข้าถึงโมดูลต่างๆ ของระบบอย่างรวดเร็ว ประกอบด้วย 3 เมนูหลัก:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-emerald-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">📖</span> คู่มือ / แนะนำระบบ</b>
                                <p class="text-xs text-gray-600 leading-relaxed">เปิดหน้าต่าง Knowledge Base (หน้าต่างนี้) เพื่อศึกษาสถาปัตยกรรม เจาะลึกการทำงานของโมเดล AI และทฤษฎีการวางแผนการเงิน</p>
                            </div>
                            <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-blue-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">📝</span> ระบบประเมินการเงิน</b>
                                <p class="text-xs text-gray-600 leading-relaxed">เข้าสู่ระบบการทำงานหลัก (Main App) เพื่อเริ่มกรอกข้อมูลลูกค้า สร้างเคสประเมินสถานะทางการเงิน และออกรายงานรูปเล่ม (PDF)</p>
                            </div>
                            <div class="bg-purple-50 p-4 rounded-xl border border-purple-200 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-purple-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">⚙️</span> ตั้งค่าระบบ</b>
                                <p class="text-xs text-gray-600 leading-relaxed">เข้าสู่โหมดจัดการข้อมูลผู้จัดทำ และฐานข้อมูลลูกค้า (CRM) <br><span class="text-red-600 font-bold">*ระบบจะบังคับให้ใส่รหัส PIN อีกครั้งก่อนเข้าถึง เพื่อป้องกันข้อมูลลูกค้ารั่วไหล</span></p>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2 flex items-start gap-3 shadow-sm">
                            <span class="text-xl mt-0.5 select-none pointer-events-none">💡</span>
                            <div>
                                <b class="text-gray-800 text-sm block mb-1">การนำทาง (Navigation)</b>
                                <p class="text-xs text-gray-700 leading-relaxed">ขณะที่คุณทำงานอยู่ในหน้า "ระบบประเมินการเงิน" คุณสามารถกดปุ่ม <span class="bg-blue-600 text-white px-2 py-1 rounded font-bold text-[10px]">🏠 หน้าแรก (Home)</span> ที่แถบเมนูด้านบนซ้าย เพื่อย้อนกลับมาพักที่หน้า Home Screen ได้ตลอดเวลา (ข้อมูลที่คุณกรอกค้างไว้ในระบบประเมินจะไม่หายไปไหน)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 2: System Config -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">2</div> 
                        <h3 class="font-bold text-white text-lg">การตั้งค่าระบบและฐานข้อมูล (System & Security Configuration)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">ระบบถูกล็อคด้วยความปลอดภัยระดับสูง (PIN Security) ทุกครั้งที่เข้าใช้งาน (ค่าเริ่มต้น <code class="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono">123456</code>) เมื่อเข้าสู่ระบบได้แล้ว ให้คลิกปุ่ม <b>"⚙️ ตั้งค่าระบบ"</b> ที่มุมขวาบน จะพบกับแท็บเครื่องมือควบคุม 4 ส่วนหลัก:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-blue-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">👤</span> ข้อมูลผู้จัดทำ (Creator Profile)</b>
                                <p class="text-xs text-gray-600 mb-2">จุดเริ่มต้นของการสร้างแบรนดิ้ง (Personal Branding)</p>
                                <ul class="list-disc list-inside text-xs space-y-1.5 text-gray-700 ml-1">
                                    <li><b>Profile Sync:</b> ระบุชื่อ, FA License, และ IC License เพื่อใช้เป็นลายน้ำและข้อมูลบนหน้าปกรายงาน PDF อัตโนมัติ</li>
                                    <li><b>PIN Re-encryption:</b> เมื่อเปลี่ยนรหัสผ่าน ระบบจะทำการถอดรหัสและเข้ารหัสฐานข้อมูล CRM ใหม่ทั้งหมดด้วยกุญแจใหม่ทันทีเพื่อความปลอดภัยสูงสุด</li>
                                    <li><b>Forgot PIN (กู้คืนรหัสผ่าน):</b> หากลืมรหัสผ่าน สามารถกู้คืนได้ที่หน้าล็อคอิน โดยยืนยัน <b>ชื่อ (ไม่ต้องใส่นามสกุล)</b> และ <b>เลขที่ใบอนุญาตตัวแทน</b> ที่เคยบันทึกไว้ในโปรไฟล์ หากข้อมูลตรงกัน ระบบจะรีเซ็ต PIN กลับเป็น <code class="bg-gray-200 px-1 rounded text-blue-600 font-mono">123456</code></li>
                                </ul>
                            </div>
                            
                            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-orange-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">📦</span> จัดการข้อมูล (Library & Core Data)</b>
                                <p class="text-xs text-gray-600 mb-2">เครื่องมือจัดการแกนกลางของระบบ (Core Data Engine)</p>
                                <ul class="list-disc list-inside text-xs space-y-1.5 text-gray-700 ml-1">
                                    <li><b>Auto-Recovery ♻️:</b> ปุ่มกู้คืนข้อมูลฉุกเฉิน หากเผลอปิดเบราว์เซอร์หรือไฟดับ ระบบจะดึงข้อมูลที่พิมพ์ค้างไว้หน้าจอหลักกลับมาได้ทันที</li>
                                    <li><b>Product Library ➕:</b> เพิ่ม "ชื่อแบบประกัน" เข้าไปเก็บไว้ เพื่อให้เรียกใช้ผ่าน Dropdown ได้ทันที เลือกระบุได้ว่าเป็น 'สัญญาหลัก' หรือ 'สัญญาเพิ่มเติม'</li>
                                    <li><b>JSON Config Import 📥:</b> ระบบรองรับการอัปโหลดไฟล์ <code class="text-orange-600">.json</code> เพื่ออัปเดตกฎหมายใหม่ๆ (เช่น ฐานภาษี, เพดานลดหย่อน) เข้าสู่ระบบโดยไม่ต้องรออัปเดตแอป</li>
                                </ul>
                            </div>
                        </div>

                        <div class="bg-red-50 p-3 rounded-lg border border-red-200 flex items-start gap-3 mt-4 shadow-sm">
                            <span class="text-2xl mt-1 select-none pointer-events-none">☢️</span>
                            <div>
                                <b class="text-red-800 text-sm block mb-1">Panic Buttons (ปุ่มฉุกเฉิน / ล้างข้อมูล)</b>
                                <p class="text-xs text-gray-700 leading-relaxed">ในหน้าแท็บ "การจัดการระบบ" มีปุ่ม Reset 3 ระดับ โปรดใช้งานด้วยความระมัดระวังสูงสุด:<br>
                                <span class="font-bold text-gray-800">1. ล้างเฉพาะฉบับร่าง (Draft):</span> ลบข้อมูลที่พิมพ์ค้างอยู่หน้าจอหลักทิ้ง<br>
                                <span class="font-bold text-red-600">2. ลบฐานข้อมูล CRM:</span> ล้างรายชื่อและประวัติลูกค้าทั้งหมด (ต้องพิมพ์คำว่า "ยืนยัน")<br>
                                <span class="font-bold text-red-800">3. Grand Nuclear Reset:</span> ล้างระบบกลับสู่ค่าเริ่มต้นโรงงาน ข้อมูลทุกอย่างรวมถึง Dashboard และรหัสผ่านจะหายไป (ต้องพิมพ์คำว่า "RESET")</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 3: CRM & VN -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-indigo-700 to-indigo-900 p-4 border-b border-indigo-600 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">3</div> 
                        <h3 class="font-bold text-white text-lg">สถาปัตยกรรมจัดการลูกค้า (Advanced CRM & VN History)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">เมื่อคลิกแท็บ <b>"🗂️ ฐานข้อมูลลูกค้า (CRM)"</b> ระบบจะเปิดแท็บ (Window) ใหม่ขึ้นมา นี่คือศูนย์บัญชาการ (Command Center) สำหรับติดตามไปป์ไลน์ลูกค้าทุกคน:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-4">
                                <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                    <b class="text-indigo-800 block mb-2 text-base">📊 Portfolio & AI Diagnostics</b>
                                    <p class="text-xs text-gray-600 mb-2">แสดงสรุป <span class="font-bold text-indigo-700">AUM รวม (ความมั่งคั่งสุทธิลูกค้าทุกคนรวมกัน)</span> พร้อมแถบ <span class="font-bold text-cyan-600">AI Learning Diagnostics</span> ที่แสดงเปอร์เซ็นต์ความแม่นยำของการจัดกลุ่ม K-Means แบบ Real-time</p>
                                </div>
                                <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                    <b class="text-indigo-800 block mb-2 text-base">🔄 มุมมองกระดาน (Kanban) vs ตาราง (Table)</b>
                                    <ul class="list-disc list-inside text-xs text-gray-600 space-y-1">
                                        <li><b>มุมมองกระดาน 📌:</b> คลิกการ์ดลูกค้าแล้วลาก (Drag & Drop) ข้ามสเตจสถานะได้เลย ระบบจะบันทึก Log ประวัติการย้ายสเตจให้อัตโนมัติ</li>
                                        <li><b>มุมมองตาราง 📋:</b> รองรับการกดหัวคอลัมน์เพื่อเรียงลำดับ (Sort) และการเลือก Checkbox หน้าชื่อเพื่อทำ <b>Bulk Action (พิมพ์หลายคน/ลบหลายคน/เปลี่ยนสถานะหมู่)</b></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="bg-white p-4 rounded-xl border border-indigo-200 shadow-lg relative transform-gpu">
                                <div class="absolute -right-3 -top-3 text-5xl opacity-10 select-none pointer-events-none">📝</div>
                                <b class="text-indigo-900 block mb-3 text-base border-b border-indigo-100 pb-2">การจัดการรายบุคคล (Client Modal)</b>
                                <p class="text-xs text-gray-600 mb-2">เมื่ออยู่ในมุมมองตาราง หรือกระดาน คุณสามารถกดปุ่มเครื่องมือเพื่อจัดการลูกค้าได้ดังนี้:</p>
                                <ul class="list-disc list-inside text-xs space-y-2 text-gray-700 ml-1">
                                    <li><span class="bg-blue-100 text-blue-700 px-1 rounded font-bold">🔍 พรีวิว</span> <b>(Quick Review):</b> ดูสรุปข้อมูลสถานะการเงิน, คะแนน AI, กราฟพัฒนาการ (Trend Evolution), พอร์ตประกันและพอร์ตลงทุน แบบรวดเร็วโดยไม่ต้องโหลดเข้าหน้าจอหลัก</li>
                                    <li><span class="bg-yellow-100 text-yellow-700 px-1 rounded font-bold">📝 โน้ต</span> <b>(Activity History):</b> บันทึกการพูดคุย หรือแฮชแท็ก (#) ตามไทม์ไลน์ เรียงจากใหม่ไปเก่า (รองรับ Deep Search ค้นหาคำในโน้ตได้จากหน้าหลัก)</li>
                                    <li><span class="bg-teal-100 text-teal-700 px-1 rounded font-bold">📂 ประวัติ VN</span> <b>(Visit Note Manager):</b> ดู "สแนปช็อตสุขภาพการเงิน" ของลูกค้าในแต่ละครั้งที่เข้ามาปรึกษา สามารถกด <b>"⬇️ โหลด"</b> เพื่อดึงแผนเก่ามาสานต่อ หรือกด <b>"🔒 ปิด VN"</b> เพื่อจบรอบการให้คำปรึกษา</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 4: Calculators -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-purple-700 to-purple-900 p-4 border-b border-purple-600 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">4</div> 
                        <h3 class="font-bold text-white text-lg">เครื่องมือคำนวณอิสระ (Pro Financial Calculators)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">ปุ่ม <b>"🧮 เครื่องคิดเลขการเงิน"</b> เป็นโมดูลที่ทำงานแยกส่วนจากระบบหลัก (Sandbox) คุณสามารถกดเปิดขึ้นมาเพื่อตอบคำถามลูกค้าแบบรวดเร็ว (Ad-hoc Calculation) โดยไม่ต้องเริ่มสร้างเคสใหม่ ประกอบด้วย 4 เครื่องยนต์หลัก:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-purple-50 p-4 rounded-xl border border-purple-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-purple-800 block mb-1 text-base">🏖️ จำลองเป้าหมายเกษียณ (Retirement)</b>
                                <p class="text-xs text-gray-600">ป้อนอายุ, เป้าหมายรายจ่าย, พอร์ตตั้งต้น, และเงินเฟ้อ ระบบจะคำนวณหา "เงินก้อนที่ต้องมี (FV)" และ "เงินที่ต้องออมต่องวด (PMT)" พร้อมแสดงผลตอบแทนแท้จริง (Real Return) ที่หักเงินเฟ้อแล้ว</p>
                            </div>
                            <div class="bg-sky-50 p-4 rounded-xl border border-sky-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-sky-800 block mb-1 text-base">📊 ผลตอบแทนลงทุน (CAGR)</b>
                                <p class="text-xs text-gray-600">อยากรู้ว่าพอร์ตลูกค้าโตเฉลี่ยกี่เปอร์เซ็นต์? แค่ใส่เงินต้น (PV), เงินปลายทาง (FV), และเวลา (N) ระบบจะคำนวณอัตราผลตอบแทนทบต้นต่อปี (CAGR) พร้อม AI Insight แนะนำประเภทสินทรัพย์ที่สอดคล้อง</p>
                            </div>
                            <div class="bg-teal-50 p-4 rounded-xl border border-teal-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-teal-800 block mb-1 text-base">📈 ผลตอบแทนประกัน (IRR)</b>
                                <p class="text-xs text-gray-600">ฟังก์ชันสำหรับปิดการขายประกันออมทรัพย์! ป้อน เบี้ยที่จ่ายรายปี (PMT), เงินคืนระหว่างทาง (CB), และเงินก้อนตอนครบสัญญา ระบบจะถอดสมการหาค่า IRR (%) สุทธิ ออกมาโชว์เทียบกับดอกเบี้ยธนาคารทันที</p>
                            </div>
                            <div class="bg-red-50 p-4 rounded-xl border border-red-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-red-800 block mb-1 text-base">💸 จัดการหนี้สิน (Amortization)</b>
                                <p class="text-xs text-gray-600">เลือกระบบคำนวณได้ทั้ง หนี้บ้าน (ลดต้นลดดอก), หนี้รถ (Flat Rate), และหนี้บัตรเครดิต ระบบจะสร้าง <b>"ตารางจำลองการผ่อนชำระ"</b> แบบละเอียดยิบให้ดูว่าในแต่ละงวดตัดเงินต้นและดอกเบี้ยไปเท่าไหร่</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 5: Quick Actions & Processing -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-teal-600 to-teal-800 p-4 border-b border-teal-500 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">5</div> 
                        <h3 class="font-bold text-white text-lg">แถบคำสั่งด่วน และการประมวลผล (Data Intake & Processing)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">บริเวณด้านขวาบนของฟอร์มกรอกข้อมูล คือ <b>"Quick Action Bar"</b> ที่ควบคุมวงจรชีวิตของการวิเคราะห์แผนการเงิน:</p>
                        
                        <div class="flex flex-col gap-3">
                            <div class="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                <div class="bg-white border border-gray-200 p-2 rounded shadow-sm text-2xl leading-none flex items-center justify-center select-none">📂</div>
                                <div>
                                    <b class="text-gray-800 text-sm">โหลด / บันทึก (Offline JSON Backup)</b>
                                    <p class="text-[11px] text-gray-600 mt-1">นอกเหนือจากระบบ CRM คุณสามารถกด <span class="bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px]">💾 บันทึก</span> เพื่อ Export ข้อมูลหน้าจอเป็นไฟล์ <code class="text-teal-600 bg-teal-50 px-1 rounded">.json</code> ลงในเครื่องคอมพิวเตอร์ของคุณ (เผื่อส่งให้ทีมงาน) และกด <span class="bg-teal-600 text-white px-1.5 py-0.5 rounded text-[10px]">📂 โหลด</span> เพื่อดึงไฟล์นั้นกลับมาแสดงผล</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                <div class="bg-white border border-gray-200 p-2 rounded shadow-sm text-2xl leading-none flex items-center justify-center select-none">🎲</div>
                                <div>
                                    <b class="text-purple-700 text-sm">สร้างกรณีศึกษา (Case Study Generator)</b>
                                    <p class="text-[11px] text-gray-600 mt-1">เครื่องมือสำหรับการ Training ชั้นยอด! กดปุ่ม <span class="bg-purple-600 text-white px-1.5 py-0.5 rounded text-[10px]">🎲 สร้างกรณีศึกษา</span> ระบบจะสุ่มโปรไฟล์ลูกค้าขึ้นมาให้เสร็จสรรพ (เช่น หมอรายได้สูง, แม่ค้าหนี้เยอะ, กลุ่ม DINKs) เพื่อให้คุณและทีมงานฝึกซ้อมวิเคราะห์และวางแผน</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-3 bg-red-50 rounded-xl border border-red-200 shadow-sm">
                                <div class="bg-white border border-red-200 p-2 rounded shadow-sm text-2xl leading-none flex items-center justify-center select-none transform-gpu animate-pulse">⚙️</div>
                                <div>
                                    <b class="text-red-700 text-sm">ประมวลผล (Process Report)</b>
                                    <p class="text-[11px] text-gray-700 mt-1">หลังจากป้อนข้อมูลลูกค้าใน Section 1 ถึง 3 ครบแล้ว ให้กดปุ่ม <span class="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">⚙️ ประมวลผล</span> หน้าจอจะแสดง <b>Loading Overlay ของ AI Predictive Engine</b> เพื่อคำนวณสมการ Monte Carlo กว่า 20,000 รอบ ก่อนจะสลับหน้าจอเข้าสู่ Report View อย่างไร้รอยต่อ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 6: Playground & Simulation -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-emerald-600 to-emerald-800 p-4 border-b border-emerald-500 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">6</div> 
                        <h3 class="font-bold text-white text-lg">ห้องทดลองทางเลือก (Interactive Playground)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4 relative overflow-hidden transform-gpu">
                        <div class="absolute -right-6 -bottom-6 text-8xl opacity-10 select-none pointer-events-none">🎛️</div>
                        <p class="leading-relaxed relative z-10">ใน <b>ส่วนที่ 7: แบบจำลองเกษียณเชิงสมจริง</b> ของหน้ารายงาน คุณจะพบกับอาวุธที่ทรงพลังที่สุดในการตอบข้อโต้แย้งลูกค้า นั่นคือ <b>"ห้องทดลองทางเลือก (Trade-off Playground)"</b>:</p>
                        
                        <ul class="list-disc list-inside text-xs space-y-2 text-gray-700 ml-1 relative z-10">
                            <li>ในกล่อง <b>Real-time Simulation</b> จะมี <b>แถบสไลเดอร์ (Slider)</b> ให้ปรับ 3 ค่าได้แก่: <span class="font-bold text-indigo-600">อายุเกษียณ</span>, <span class="font-bold text-orange-600">เป้าหมายค่าใช้จ่าย</span>, และ <span class="font-bold text-blue-600">ผลตอบแทนคาดหวัง</span></li>
                            <li><b>Interactive Feedback ⚡:</b> ทันทีที่คุณใช้นิ้วหรือเมาส์ลากสไลเดอร์ กราฟเส้นสีม่วง (พอร์ตจัดเอง) บนหน้าจอจะขยับขึ้นลงตอบสนองตามสมการจำลองทันที (Visual Impact)</li>
                            <li><b>Background Recalculation 🧠:</b> ทันทีที่คุณ "ปล่อยเมาส์" ระบบจะแอบสั่งให้ Web Worker รันสมการ Monte Carlo ใหม่ในฉากหลัง และอัปเดต <b>% โอกาสสำเร็จ (AI Success Probability)</b> ในตารางด้านล่างให้ใหม่ทันที</li>
                        </ul>
                        
                        <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200 mt-5 relative z-10 shadow-inner">
                            <b class="text-emerald-800 text-sm block mb-2 flex items-center gap-2">💎 เทคนิคปิดการขาย (Expert Tactic):</b>
                            <p class="text-xs text-gray-700 leading-relaxed border-l-2 border-emerald-400 pl-3">ใช้สไลเดอร์นี้ทำ <i>Trade-off (การได้อย่างเสียอย่าง)</i> เชิงจิตวิทยากับลูกค้า เช่น <br>
                            <span class="text-emerald-700 italic font-medium">"คุณลูกค้าครับ ถ้าไม่อยากเพิ่มเงินออม งั้นผมขอลองลดเป้าหมายค่าใช้จ่ายลงนิดนึง หรือขยับอายุเกษียณออกไปอีก 2 ปีนะครับ... อ๊ะ! เห็นไหมครับว่ากราฟขยับพุ่งขึ้นมาในโซนปลอดภัยแล้ว โอกาสสำเร็จพุ่งขึ้นเป็น 85% ทันทีเลยครับ"</span></p>
                        </div>
                    </div>
                </div>

                <!-- MODULE 7: Export & Delivery -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-red-700 to-gray-900 p-4 border-b border-red-600 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">7</div> 
                        <h3 class="font-bold text-white text-lg">การส่งมอบรายงาน (Enterprise PDF Engine)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">ผลงานการวิเคราะห์ขั้นเทพ จะต้องถูกส่งมอบด้วยความสวยงามระดับ Enterprise เมื่อคุณคลิกปุ่ม <span class="bg-gray-800 text-white px-2 py-1 rounded text-[10px] font-bold">🖨️ พิมพ์ / PDF</span> ที่ท้ายรายงาน หรือที่แถบเมนูด้านบนสุด ระบบจะทำงานร่วมกับ Print Engine ของ Browser ทันที:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="border border-gray-200 rounded-xl p-4 bg-gray-50 text-center flex flex-col items-center hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <span class="text-3xl mb-2 select-none">📑</span>
                                <b class="text-gray-800 text-xs block mb-1">Dynamic Cover Page</b>
                                <span class="text-[10px] text-gray-500">ระบบจะสร้าง "หน้าปกกระดาษ A4" อัตโนมัติ ดึงชื่อลูกค้า, ชื่อของคุณ, เลข License และวันที่จัดทำ มาจัดวางอย่างสวยงาม (หน้าปกนี้จะมองไม่เห็นตอนใช้งานโหมดปกติ)</span>
                            </div>
                            <div class="border border-gray-200 rounded-xl p-4 bg-gray-50 text-center flex flex-col items-center hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <span class="text-3xl mb-2 select-none">✂️</span>
                                <b class="text-gray-800 text-xs block mb-1">UI Stripping Engine</b>
                                <span class="text-[10px] text-gray-500">ระบบจะทำการ "ซ่อน" ปุ่มกด, สไลเดอร์, ไอคอนแจ้งเตือน และแถบเมนูที่ไม่จำเป็นออกทั้งหมด เพื่อเปลี่ยนหน้า Web App ให้กลายเป็น "รายงานรูปเล่ม" ที่เป็นทางการ 100%</span>
                            </div>
                            <div class="border border-gray-200 rounded-xl p-4 bg-gray-50 text-center flex flex-col items-center hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <span class="text-3xl mb-2 select-none">🔒</span>
                                <b class="text-gray-800 text-xs block mb-1">Compliance & Watermark</b>
                                <span class="text-[10px] text-gray-500">ระบบจะประทับลายน้ำ <b>CONFIDENTIAL</b> และแทรกข้อสงวนสิทธิ์การรับประกัน (Disclaimer) ไว้ที่ Footer ของทุกหน้ากระดาษ เพื่อป้องกันปัญหาทางกฎหมาย (Compliance) ให้กับ FA</span>
                            </div>
                        </div>

                        <div class="bg-gray-800 text-white p-4 rounded-xl flex items-center shadow-lg mt-5 border border-gray-700">
                            <div>
                                <b class="text-cyan-400 text-sm block mb-2 flex items-center gap-2"><span class="select-none">💻</span> วิธีตั้งค่าเบราว์เซอร์ให้บันทึก PDF สวยงามที่สุด</b>
                                <p class="text-xs text-gray-300 leading-relaxed pl-6">เมื่อหน้าต่าง Print ของ Chrome/Safari เด้งขึ้นมา ให้ตรวจสอบ 3 จุดนี้เสมอ:<br>
                                1. Destination (ปลายทาง): เลือก <b>Save as PDF</b><br>
                                2. Paper size (ขนาดกระดาษ): เลือก <b>A4</b> และปรับ Margins เป็น <b>Default</b> หรือ <b>None</b><br>
                                3. Options (ตัวเลือกเพิ่มเติม): <b>ต้องติ๊กถูกที่ Background graphics</b> (พิมพ์พื้นหลัง) เสมอ เพื่อให้สีสันของกราฟ แถบสถานะ และตารางทำงานได้อย่างสมบูรณ์</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- MODULE 8: CRM & VN (Deep Dive Step-by-Step) -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 border-b border-blue-500 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">8</div> 
                        <h3 class="font-bold text-white text-lg">เจาะลึกการใช้ CRM และ Visit Note (Step-by-Step)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-5">
                        <p class="leading-relaxed">ฐานข้อมูล CRM นี้ถูกออกแบบมาให้เป็น "สมองที่สอง" ของคุณ เก็บประวัติการเข้าพบ (Visit Notes) อย่างเป็นระบบ ไม่ต้องกลัวข้อมูลหาย หรือจำไม่ได้ว่าคุยอะไรกันไว้</p>
                        
                        <div class="space-y-4">
                            <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <b class="text-blue-800 block mb-2">📌 1. การบันทึกเคสใหม่ลงฐานข้อมูล (Save to DB)</b>
                                <p class="text-xs text-gray-700 mb-2">เมื่อคุณกรอกข้อมูลในหน้าหลักและกดประมวลผล (คำนวณ AI) เรียบร้อยแล้ว ให้เข้าไปที่เมนู <b>"⚙️ ตั้งค่าระบบ > 🗂️ ฐานข้อมูลลูกค้า"</b> แล้วกดปุ่ม <span class="bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold flex-inline items-center gap-1"><span class="select-none">💾</span> ดึงข้อมูลหน้าจอหลักบันทึกลง DB</span></p>
                                <ul class="list-disc list-inside text-xs text-gray-600 ml-2 space-y-1.5">
                                    <li>ระบบจะสร้าง <b>รหัสลูกค้า (XN)</b> และ <b>รหัสเข้าพบ (VN)</b> ให้อัตโนมัติ (เช่น VN_7002-14-A2)</li>
                                    <li>ข้อมูลทุกอย่างที่คุณกรอก (รวมถึงกราฟ, สินทรัพย์, กรมธรรม์, AI Score) จะถูก <b>"แช่แข็ง (Snapshot)"</b> เก็บไว้ตามวันที่บันทึก เพื่อใช้ดูพัฒนาการในอนาคต</li>
                                </ul>
                            </div>
                            
                            <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <b class="text-blue-800 block mb-2">📌 2. ค้นหาขั้นสูงด้วย Deep Search</b>
                                <p class="text-xs text-gray-700 mb-2">ในหน้า CRM จะมีช่องค้นหา (Search Bar) ที่ทรงพลังมาก:</p>
                                <ul class="list-disc list-inside text-xs text-gray-600 ml-2 space-y-1.5">
                                    <li>พิมพ์ค้นหาด้วย <b>ชื่อลูกค้า</b> หรือ <b>รหัสลูกค้า (XN/VN)</b> ได้ทันที</li>
                                    <li>พิมพ์ <b>ป้ายกำกับ (Tags)</b> เช่น พิมพ์ <code class="bg-white px-1 border border-gray-200 rounded text-blue-600 font-bold">#VIP</code> หรือ <code class="bg-white px-1 border border-gray-200 rounded text-blue-600 font-bold">#รอโบนัส</code> ระบบจะดึงเฉพาะลูกค้าระดับนั้นมาแสดง</li>
                                    <li><b>Deep Search (ค้นหาถึงไส้ใน):</b> หากจำชื่อไม่ได้ แต่จำได้ว่าเคยพิมพ์โน้ตไว้ว่า "สนใจทุนการศึกษาลูก" แค่พิมพ์คำว่า <code class="bg-white px-1 border border-gray-200 rounded text-indigo-600 font-bold">สนใจทุน</code> ระบบจะควานลึกเข้าไปค้นใน <b>Activity History</b> ของลูกค้าทุกคน แล้วดึงเคสนั้นขึ้นมาให้!</li>
                                </ul>
                            </div>
                            
                            <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <b class="text-blue-800 block mb-2">📌 3. การสลับมุมมอง (Table vs Kanban) และ Bulk Action</b>
                                <ul class="list-disc list-inside text-xs text-gray-700 ml-2 space-y-2">
                                    <li><b>มุมมองกระดาน (Kanban) <span class="bg-white px-1 rounded shadow-sm text-[10px] select-none">📌</span>:</b> เป็นมุมมองแบบ ไปป์ไลน์งานขาย (Sales Pipeline) <b>คลิกค้างที่การ์ดลูกค้าแล้วลาก (Drag & Drop) ข้ามสเตจสถานะได้เลย</b> ระบบจะเปลี่ยนสถานะและจด Log ประวัติการทำงานให้อัตโนมัติ</li>
                                    <li><b>มุมมองตาราง (Table) <span class="bg-white px-1 rounded shadow-sm text-[10px] select-none">📋</span>:</b> เหมาะสำหรับการจัดการคนจำนวนมาก รองรับการกดหัวคอลัมน์เพื่อเรียงลำดับ (Sort) และการเลือก Checkbox หน้าชื่อ เพื่อใช้งานแถบเครื่องมือด้านบน <b>(พิมพ์รายงานกลุ่ม / ลบหลายคน / เปลี่ยนสถานะพร้อมกันหลายคน)</b></li>
                                </ul>
                            </div>
                            
                            <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <b class="text-blue-800 block mb-2">📌 4. การจัดการแผนเก่า (VN Manager) & Auto-Close</b>
                                <p class="text-xs text-gray-700 mb-2">เมื่อคลิกปุ่ม <span class="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-[10px] font-bold border border-teal-200">📂 ประวัติ VN</span> หลังชื่อลูกค้า ระบบจะกางลิสต์ประวัติการให้คำปรึกษาทั้งหมดที่ผ่านมา:</p>
                                <ul class="list-disc list-inside text-xs text-gray-600 ml-2 space-y-1.5">
                                    <li>สามารถกด <span class="bg-indigo-100 text-indigo-700 px-1.5 rounded text-[10px] font-bold border border-indigo-200">⬇️ โหลด</span> เพื่อดึงข้อมูลแผนเก่า (เช่น ของปีที่แล้ว) <b>ให้เด้งกลับไปแสดงผลบนหน้าจอหลัก</b> เพื่อใช้วางแผนสานต่อได้ทันที</li>
                                    <li><b>Auto-Close Session:</b> หากปล่อยแผนไว้ข้ามวัน (ถึงเวลาเที่ยงคืน) ระบบจะ <span class="bg-gray-100 text-gray-500 px-1.5 rounded text-[10px] border border-gray-200">🔒 ปิด (Closed)</span> แผนเก่านั้นให้อัตโนมัติ เพื่อป้องกันการเผลอบันทึกทับข้อมูลสถิติในอดีต (กลไกนี้ทำให้กราฟพัฒนาการความมั่งคั่งของลูกค้า แม่นยำ 100%)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 9: FA Business Planner -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-amber-500 to-orange-600 p-4 border-b border-orange-500 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">9</div> 
                        <h3 class="font-bold text-white text-lg">การใช้ FA Business Planner (Dashboard ผู้บริหาร)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">นอกจากใช้ดูแลลูกค้าแล้ว ระบบยังมี Dashboard ส่วนตัวสำหรับให้ตัวคุณเอง (FA) ตั้งเป้าหมายและติดตาม Performance การขายตลอดทั้งปี สามารถเปิดได้โดยการคลิกแท็บ <span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 shadow-sm flex-inline items-center gap-1"><span class="select-none">📊</span> FA Business Planner</span></p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div class="bg-orange-50 p-5 rounded-xl border border-orange-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-orange-800 flex items-center gap-2 mb-3"><span class="text-lg select-none">🎯</span> การตั้งเป้าหมาย (Yearly Targets)</b>
                                <p class="text-xs text-gray-700 mb-3">ในกล่องสีดำด้านบนสุด (YEAR PLAN) คุณจะเห็นปุ่ม <span class="bg-slate-700 text-white px-2 py-0.5 rounded text-[10px]">ตั้งเป้า</span> เล็กๆ มุมขวาบนของแต่ละกล่อง ให้กดเพื่อระบุเป้าหมายประจำปีของคุณ:</p>
                                <ul class="list-disc list-inside text-xs space-y-1.5 text-gray-700 ml-2">
                                    <li><b>FYP:</b> เป้าหมายเบี้ยประกันปีแรก</li>
                                    <li><b>FYC:</b> เป้าหมายค่าคอมมิชชันรายปี</li>
                                    <li><b>Total Cases:</b> เป้าหมายจำนวนราย (จำนวนลูกค้า)</li>
                                    <li><b>Recruits:</b> เป้าหมายจำนวนการสร้างทีมงาน</li>
                                </ul>
                                <div class="mt-3 p-2 bg-orange-100/50 rounded border border-orange-200">
                                    <p class="text-[10px] text-orange-800 italic"><b>💡 Magic Engine:</b> ระบบจะนำเป้าหมายรายปีของคุณ ไปหาร 12 เป็นเป้าหมายรายเดือน และหาร 4 เป็นเป้าหมายรายสัปดาห์ (Weekly Target) ให้ในตารางด้านล่างโดยอัตโนมัติ!</p>
                                </div>
                            </div>
                            
                            <div class="bg-orange-50 p-5 rounded-xl border border-orange-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu flex flex-col">
                                <b class="text-orange-800 flex items-center gap-2 mb-3"><span class="text-lg select-none">📝</span> บันทึกผลงาน (Sales Ledger)</b>
                                <p class="text-xs text-gray-700 mb-3">เมื่อปิดการขายได้ ให้เลื่อนหน้าจอลงมาที่ "สมุดบันทึกผลงานจริง":</p>
                                <ul class="list-disc list-inside text-xs space-y-2 text-gray-700 ml-2 flex-grow">
                                    <li><b>เลือกประเภท:</b> เลือกว่าบิลนี้เป็น <code class="bg-white px-1 border rounded text-blue-600">ส่วนตัว (Sale)</code> หรือ <code class="bg-white px-1 border rounded text-amber-600">ชวนคน (Recruit)</code></li>
                                    <li><b>นับ Case ไหม?:</b> เลือกว่า <code class="bg-white px-1 border rounded text-emerald-600">New (นับ)</code> หรือ <code class="bg-white px-1 border rounded text-gray-500">Renewal (ไม่นับ)</code> เพื่อไม่ให้ค่าเฉลี่ย Case Size เพี้ยนเวลาเก็บเบี้ยปีต่อ</li>
                                    <li><b>ระบบยัดไส้ (Add Riders):</b> <b>สามารถคลิก <span class="text-indigo-600 font-bold bg-indigo-50 border border-indigo-200 px-1 rounded text-[10px]">+ เพิ่ม Rider</span></b> ซ้อนเข้าไปในบิลเดียวกันได้หลายๆ ตัว เพื่อให้ระบบดึงค่า FYP/FYC ทุกชิ้นมามัดรวมกันให้เสร็จสรรพในบิลเดียว</li>
                                </ul>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-5 rounded-xl border border-gray-200 mt-5 shadow-inner">
                            <b class="text-gray-800 flex items-center gap-2 mb-3"><span class="text-lg select-none">📈</span> การวิเคราะห์พอร์ตโฟลิโอ (Portfolio Analytics)</b>
                            <p class="text-xs text-gray-700 mb-3">เมื่อคุณใช้งานระบบ CRM (บันทึกข้อมูลลูกค้า) และบันทึกผลการขาย (Sales Ledger) ไประยะหนึ่ง หน้า Dashboard นี้จะสังเคราะห์ผลงานของคุณออกมาเป็นกราฟ 2 ตัว เพื่อประเมิน <b>"คุณภาพของธุรกิจคุณ"</b>:</p>
                            
                            <div class="flex flex-col md:flex-row gap-5 mt-2">
                                <div class="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                    <b class="text-[12px] text-indigo-800 flex items-center gap-1 border-b border-gray-100 pb-1.5 mb-2"><span class="text-base select-none">🧬</span> AI Personas (กลุ่มลูกค้า)</b>
                                    <p class="text-[11px] text-gray-600 leading-relaxed">ระบบจะสรุปว่าฐานลูกค้าทั้งหมดที่คุณมีในมือ <b class="text-indigo-600">"ส่วนใหญ่จัดอยู่ใน Persona ไหน?"</b> (ดึงข้อมูลจาก K-Means) เช่น เป็นกลุ่ม UHNW มากน้อยแค่ไหน หรือเป็นกลุ่ม DINKs กี่เปอร์เซ็นต์ เพื่อให้คุณรู้ว่า <i>"ฐานตลาดที่แท้จริงของคุณคือใคร"</i> และวางแผนปรับทิศทางการหาผู้มุ่งหวังในปีถัดไปได้เฉียบคมขึ้น</p>
                                </div>
                                <div class="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                    <b class="text-[12px] text-blue-800 flex items-center gap-1 border-b border-gray-100 pb-1.5 mb-2"><span class="text-base select-none">🥧</span> Product Mix (สัดส่วนสินค้า)</b>
                                    <p class="text-[11px] text-gray-600 leading-relaxed">ระบบจะวิเคราะห์จาก Sales Ledger ว่าผลิตภัณฑ์ที่คุณขายได้ทั้งหมด <b class="text-blue-600">"สัดส่วนส่วนใหญ่มาจากหมวดหมู่ใด?"</b> (เช่น ประกันสุขภาพ, สะสมทรัพย์, หรือ Unit Linked) กราฟนี้จะสะท้อนความเชี่ยวชาญ (Expertise) ของตัวคุณเอง และบอกได้ว่าคุณควรไปเข้าอบรมเสริมจุดแข็งด้านไหนเพิ่มเติม</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 10: Grand Backup & Diagnostics -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-slate-700 to-slate-900 p-4 border-b border-slate-600 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">10</div> 
                        <h3 class="font-bold text-white text-lg">ระบบสำรองข้อมูลและความปลอดภัย (Grand Backup & Security)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm mb-4">
                            <p class="text-xs text-red-800 font-bold flex items-center gap-2 mb-1"><span class="text-lg select-none">⚠️</span> โปรดอ่านให้เข้าใจก่อนใช้งานระบบ!</p>
                            <p class="text-[11px] text-red-700 leading-relaxed">ระบบนี้เป็นสถาปัตยกรรมแบบ <b>100% Offline App (Zero Data Leakage)</b> หมายความว่า ข้อมูลทุกตัวอักษรจะถูกเข้ารหัสและบันทึกอยู่ <b>"ภายในเบราว์เซอร์ของอุปกรณ์ที่คุณใช้อยู่เท่านั้น"</b> ไม่มีการอัปโหลดขึ้น Cloud ของผู้พัฒนาใดๆ ทั้งสิ้น <br><br><b>ข้อควรระวัง:</b> <span class="font-bold underline">หากคุณทำการล้างประวัติการท่องเว็บ (Clear Cache/Cookies), ถอนการติดตั้งแอปเบราว์เซอร์, หรือ iPad พัง ข้อมูลลูกค้าทั้งหมดจะสูญหายถาวรทันที!</span> ดังนั้น "การสำรองข้อมูลด้วยตนเอง" จึงเป็นหัวใจสำคัญที่สุด</p>
                        </div>
                        
                        <p class="leading-relaxed font-bold text-slate-800">แถบเมนู <b>"🛠️ การจัดการระบบ"</b> (ในหน้าตั้งค่า) มีเครื่องมือทุกอย่างที่คุณต้องใช้เพื่อปกป้องข้อมูล:</p>
                        
                        <div class="space-y-4">
                            <div class="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <div class="text-3xl mt-1 select-none">📊</div>
                                <div>
                                    <b class="text-slate-800 text-sm block mb-1">การคำนวณพื้นที่ (Storage Check)</b>
                                    <p class="text-[11px] text-gray-600 leading-relaxed">คลิกเพื่อเช็คว่าฐานข้อมูล CRM ของคุณกินพื้นที่เครื่องไปเท่าไหร่แล้ว หากหลอดแสดงผลขึ้น <span class="text-red-500 font-bold bg-red-50 px-1 rounded border border-red-100">สีแดง (วิกฤต)</span> แปลว่าพื้นที่จัดเก็บ Local ของ Browser ใกล้เต็ม หากฝืนใช้ต่อระบบอาจแครช (Crash) ควรรีบ Export Backup ออกมาเก็บไว้ และทำการล้างเครื่อง (Factory Reset)</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu relative overflow-hidden">
                                <div class="absolute -right-2 -bottom-2 text-6xl opacity-10 select-none pointer-events-none">📥</div>
                                <div class="text-3xl mt-1 relative z-10 select-none">📥</div>
                                <div class="relative z-10">
                                    <b class="text-emerald-800 text-sm block mb-1">การสำรองและกู้คืน (Grand Backup & Restore)</b>
                                    <p class="text-[11px] text-gray-700 leading-relaxed"><b>ฟังก์ชันที่สำคัญที่สุดในระบบ!</b> การกด Backup เพียงปุ่มเดียว จะเป็นการกวาดข้อมูลทุกอย่าง <b>(รายชื่อลูกค้า CRM + ผลงานขาย Dashboard + การตั้งค่าระบบทั้งหมด)</b> แพ็กเป็นไฟล์ <code class="bg-white px-1.5 py-0.5 border border-gray-300 rounded text-emerald-700 font-mono font-bold">.json</code> ก้อนเดียว คุณสามารถส่งไฟล์นี้เข้า Line ตัวเอง, Google Drive, หรือ Flash Drive ไว้ได้อย่างปลอดภัย<br><br>และเมื่อได้ iPad เครื่องใหม่ คุณแค่นำไฟล์นี้มากด <span class="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold border border-indigo-200">📤 Restore</span> ข้อมูลทุกอย่างก็จะฟื้นคืนชีพกลับมาเหมือนโคลนนิ่ง 100% ทันที</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <div class="text-3xl mt-1 select-none">🩺</div>
                                <div>
                                    <b class="text-blue-800 text-sm block mb-1">System Logs (ดาวน์โหลดประวัติระบบ)</b>
                                    <p class="text-[11px] text-gray-700 leading-relaxed">หากระบบคำนวณค้าง หน้าจอขาว หรือเกิด Error ปริศนา คุณสามารถกดปุ่ม <span class="bg-slate-800 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">📥 ส่งออก Log การประมวลผล</span> ระบบจะเก็บประวัติการกดปุ่ม (Click Tracker) 30 ครั้งล่าสุด และ Error Code ทั้งหมดเป็นไฟล์ JSON เพื่อส่งให้ทีมนักพัฒนาใช้วิเคราะห์หาจุดแก้บั๊ก <br><span class="text-blue-600 font-bold bg-blue-100/50 px-1 py-0.5 rounded inline-block mt-1.5">(รับประกันความปลอดภัย: ไฟล์ Log นี้ไม่มีการเก็บชื่อลูกค้า หรือตัวเลขทางการเงินใดๆ ปะปนมาด้วย 100%)</span></p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-200 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <div class="text-3xl mt-1 select-none">☢️</div>
                                <div>
                                    <b class="text-red-800 text-sm block mb-1">เขตอันตราย (Danger Zone / Factory Reset)</b>
                                    <p class="text-[11px] text-gray-700 leading-relaxed">คุณสามารถเลือกสั่งระเบิดทำลายข้อมูลระบบทิ้งทั้งหมดได้ (ใช้ก่อนขายเครื่อง หรือคืนเครื่องบริษัท) หากคุณกดยืนยันและพิมพ์คำว่า <code class="bg-white px-1.5 py-0.5 border border-red-200 rounded text-red-700 font-mono font-bold">RESET</code> (ตัวพิมพ์ใหญ่) ระบบจะล้างข้อมูลทุกมิติ ทั้งรหัสผ่าน CRM ไปป์ไลน์งานขาย และ Dashboard กลับไปเป็นค่าโรงงานประหนึ่งเพิ่งเปิดเว็บครั้งแรก (ไม่สามารถกู้คืนได้ หากไม่ได้ทำ Grand Backup ไว้)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 11: The Golden Workflow -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-amber-500 to-orange-500 p-4 border-b border-orange-600 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">11</div> 
                        <h3 class="font-bold text-white text-lg">ลำดับการทำงานมาตรฐานหน้างาน (The Golden Workflow)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">สำหรับ FA มือใหม่ นี่คือสเต็ปการกดปุ่มบนระบบตั้งแต่เริ่มเจอหน้าลูกค้า ไปจนถึงการส่งมอบแผนการเงิน (Best Practice):</p>
                        
                        <div class="space-y-3">
                            <div class="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-orange-100 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <span class="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">Step 1</span>
                                <span class="text-xs text-gray-800 leading-relaxed"><b>Fact-Finding:</b> ป้อนข้อมูลส่วนตัว, พฤติกรรม 10 ข้อ, งบการเงิน, พอร์ตลงทุนเดิมของลูกค้าในส่วนที่ 1 ถึง 3 บนหน้าจอหลักให้ครบถ้วน</span>
                            </div>
                            <div class="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-orange-100 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <span class="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">Step 2</span>
                                <span class="text-xs text-gray-800 leading-relaxed"><b>Process:</b> กดปุ่ม <span class="bg-red-600 text-white px-2 py-1 rounded shadow-sm">⚙️ ประมวลผล</span> ด้านบนขวา เพื่อเข้าสู่หน้า Report View ให้ลูกค้าตื่นเต้นกับหน้าจอ Loading ของ AI</span>
                            </div>
                            <div class="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-orange-100 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <span class="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">Step 3</span>
                                <span class="text-xs text-gray-800 leading-relaxed"><b>Trade-off:</b> ใช้แถบเลื่อนสไลเดอร์ <b>(What-If)</b> ในส่วนที่ 7 เพื่อหาจุดสมดุลที่ลูกค้าพอใจ และปิดการขายด้วย AI Recommendation ในส่วนที่ 9</span>
                            </div>
                            <div class="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-orange-100 shadow-sm hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <span class="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">Step 4</span>
                                <span class="text-xs text-gray-800 leading-relaxed"><b>Save & Deliver:</b> เมื่อตกลงแผนได้แล้ว ให้กดปุ่ม <span class="bg-gray-800 text-white px-2 py-1 rounded shadow-sm">🖨️ พิมพ์ / PDF</span> <b>ระบบจะทำการ Auto-Save ล็อกแผนทั้งหมดลง Visit Note ใน CRM ให้อัตโนมัติทันที</b> พร้อมเปิดหน้าต่างพิมพ์รายงานรูปเล่มที่สวยงามเพื่อส่งมอบให้ลูกค้า</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 12: Tagging Strategy -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-fuchsia-600 to-pink-600 p-4 border-b border-fuchsia-700 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">12</div> 
                        <h3 class="font-bold text-white text-lg">เทคนิคการจัดหมวดหมู่ฐานลูกค้าเชิงลึก (Advanced Tagging Strategy)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">ช่อง <b>"ป้ายกำกับ (Tags)"</b> ในหน้าต่างแก้ไขลูกค้าของ CRM ไม่ได้มีไว้แค่ประดับตกแต่ง แต่เป็นเครื่องมือช่วยจำที่ทรงพลังมาก (ใส่หลายแท็กได้โดยใช้ลูกน้ำคั่น เช่น <code class="bg-pink-50 text-pink-700 px-1 rounded border border-pink-200">#VIP, #รอโบนัส, #AIA20PayLife</code>) แนะนำให้ใช้กลยุทธ์ 4 มิติดังนี้:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-pink-50 p-4 rounded-xl border border-pink-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-pink-800 text-sm block mb-1">⏱️ Timing Tags (จับจังหวะการขาย)</b>
                                <p class="text-[11px] text-gray-600 mb-2">ใช้คัดกรองคนที่มีแนวโน้มจะซื้อในระยะเวลาที่ระบุ</p>
                                <ul class="list-disc list-inside text-xs text-gray-700 ml-1">
                                    <li><code class="bg-white px-1 rounded">#รอโบนัส</code> (เอาไว้ค้นหาตอนสิ้นปี)</li>
                                    <li><code class="bg-white px-1 rounded">#ลดหย่อนภาษี</code> (เอาไว้ค้นหาตอนเดือน พ.ย. - ธ.ค.)</li>
                                    <li><code class="bg-white px-1 rounded">#เงินฝากครบกำหนด</code></li>
                                </ul>
                            </div>
                            <div class="bg-purple-50 p-4 rounded-xl border border-purple-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-purple-800 text-sm block mb-1">⭐ Priority Tags (จัดระดับความสำคัญ)</b>
                                <p class="text-[11px] text-gray-600 mb-2">ใช้แบ่ง Tier ลูกค้าเพื่อจัดสรรเวลาให้บริการของคุณ</p>
                                <ul class="list-disc list-inside text-xs text-gray-700 ml-1">
                                    <li><code class="bg-white px-1 rounded">#VIP</code> หรือ <code class="bg-white px-1 rounded">#UHNW</code></li>
                                    <li><code class="bg-white px-1 rounded">#A_List</code> (ลูกค้าที่ส่งต่อคอนเนคชันได้)</li>
                                    <li><code class="bg-white px-1 rounded">#High_Risk</code> (ลูกค้าที่มีความเสี่ยงสูง ต้องดูแลใกล้ชิด)</li>
                                </ul>
                            </div>
                            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-indigo-800 text-sm block mb-1">📦 Product Interest Tags (สินค้าที่สนใจ)</b>
                                <p class="text-[11px] text-gray-600 mb-2">เวลาบริษัทออกโปรโมชัน หรือปรับดอกเบี้ย จะได้ค้นหาถูกคน</p>
                                <ul class="list-disc list-inside text-xs text-gray-700 ml-1">
                                    <li><code class="bg-white px-1 rounded">#สนใจ_UnitLinked</code></li>
                                    <li><code class="bg-white px-1 rounded">#รออัปเกรดเหมาจ่าย</code></li>
                                    <li><code class="bg-white px-1 rounded">#Legacy_Planning</code></li>
                                </ul>
                            </div>
                            <div class="bg-teal-50 p-4 rounded-xl border border-teal-100 hover-scale transition-all duration-300 active:scale-[0.98] transform-gpu">
                                <b class="text-teal-800 text-sm block mb-1">🔗 Network Tags (เครือข่ายครอบครัว/คนรู้จัก)</b>
                                <p class="text-[11px] text-gray-600 mb-2">ใช้จัดกลุ่มครอบครัว หรือบริษัทเดียวกัน เพื่อให้เวลาคุยไม่งง</p>
                                <ul class="list-disc list-inside text-xs text-gray-700 ml-1">
                                    <li><code class="bg-white px-1 rounded">#ครอบครัวหมอสมชาย</code></li>
                                    <li><code class="bg-white px-1 rounded">#พนักงาน_บริษัทXYZ</code></li>
                                    <li><code class="bg-white px-1 rounded">#สมาคมศิษย์เก่า_ABC</code></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 13: Team Collaboration -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu">
                    <div class="bg-gradient-to-r from-sky-600 to-blue-700 p-4 border-b border-sky-700 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">13</div> 
                        <h3 class="font-bold text-white text-lg">การทำงานเป็นทีม และโคลนนิ่งฐานข้อมูล (Team Collaboration & DB Cloning)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">สำหรับ FA มืออาชีพที่มี <b>ผู้ช่วยส่วนตัว (Assistant)</b> หรือทำงานกันเป็นทีม คุณสามารถใช้ประโยชน์จากความสามารถความเป็น Offline Local Database ผนวกกับระบบ <b>Grand Backup</b> ในการส่งต่องานกันได้ครับ:</p>
                        
                        <div class="bg-sky-50 p-4 rounded-xl border border-sky-200 relative shadow-inner">
                            <b class="text-sky-800 text-sm block mb-3 flex items-center gap-2"><span class="select-none">🔄</span> Workflow สำหรับการส่งต่องานระหว่างผู้ช่วยและ FA</b>
                            <div class="space-y-3 relative z-10">
                                <p class="text-xs text-gray-800 leading-relaxed border-l-4 border-sky-400 pl-3 bg-white p-2 rounded shadow-sm"><b>1. ฝั่งผู้ช่วย (Assistant):</b> รับโจทย์จาก FA &rarr; คีย์ข้อมูลลูกค้า (คีย์งบการเงิน, ความเสี่ยง) ลงในระบบบนคอมพิวเตอร์ของผู้ช่วย &rarr; จัดการบันทึกประวัติลง CRM ให้เรียบร้อย</p>
                                <p class="text-xs text-gray-800 leading-relaxed border-l-4 border-sky-400 pl-3 bg-white p-2 rounded shadow-sm"><b>2. ฝั่งผู้ช่วย (Assistant):</b> ไปที่หน้าตั้งค่า &rarr; กดปุ่ม <b>📥 Grand Backup</b> &rarr; ส่งไฟล์ <code class="text-sky-600">.json</code> ผ่าน Line หรือ AirDrop ให้ FA</p>
                                <p class="text-xs text-gray-800 leading-relaxed border-l-4 border-blue-500 pl-3 bg-white p-2 rounded shadow-sm"><b>3. ฝั่ง FA (Lead):</b> นำ iPad ที่จะไปพบลูกค้า &rarr; เปิดหน้าตั้งค่า &rarr; กดปุ่ม <b>📤 Restore</b> แล้วเลือกไฟล์ที่ผู้ช่วยส่งมา &rarr; ข้อมูลทั้งหมด (รวมถึงลูกค้าที่ผู้ช่วยเพิ่งพิมพ์) จะไปโผล่ใน iPad ทันที พร้อมออกไปลุยหน้างาน!</p>
                            </div>
                            <div class="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                                <b class="text-red-700 text-xs block mb-1">⚠️ กฎเหล็กของการโคลนนิ่ง (Single Source of Truth)</b>
                                <p class="text-[11px] text-red-600 leading-relaxed">เนื่องจากระบบ <u>ไม่รองรับการรวมไฟล์ (Merge Data) อัตโนมัติ</u> การกด Restore จะเป็นการ <b>"เขียนทับ (Overwrite) ข้อมูลเดิมในเครื่องทั้งหมด"</b> ดังนั้น หาก FA ไปพบลูกค้าแล้วมีการแก้ไขแผน หรือเปลี่ยนสถานะใน CRM... FA จะต้อง Export ไฟล์ Grand Backup ก้อนใหม่ ส่งกลับคืนให้ผู้ช่วยเอาไป Restore ทับในคอมพิวเตอร์ เพื่อให้ฐานข้อมูลของทั้งสองฝั่ง (คอมฯ ผู้ช่วย และ iPad ของ FA) ตรงกันเสมอครับ</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 14: PDPA -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transform-gpu pb-safe">
                    <div class="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 border-b border-emerald-600 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">14</div> 
                        <h3 class="font-bold text-white text-lg">การสร้างความไว้วางใจเรื่องข้อมูลส่วนบุคคล (PDPA & Privacy Script)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">เนื่องจากแอปนี้ต้องใช้ข้อมูลความมั่งคั่งเชิงลึกของลูกค้า ลูกค้ากลุ่ม HNW มักจะมีความกังวลเรื่องข้อมูลรั่วไหลเป็นพิเศษ คุณสามารถใช้คุณสมบัติสถาปัตยกรรมของแอปนี้ให้เป็น <b>"จุดขาย (Selling Point)"</b> ด้านความปลอดภัยเพื่อยกระดับความเป็นมืออาชีพ (Professionalism) ได้เลยครับ</p>
                        
                        <div class="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm relative overflow-hidden">
                            <div class="absolute -right-2 -top-2 text-6xl opacity-10 select-none pointer-events-none">💬</div>
                            <b class="text-emerald-800 text-sm block mb-2 relative z-10">💬 บทสนทนาสร้างความมั่นใจสำหรับ FA (Privacy Script)</b>
                            <p class="text-[12px] text-gray-700 leading-relaxed border-l-4 border-emerald-500 pl-4 py-2 bg-white rounded shadow-sm italic relative z-10">
                                "คุณลูกค้าสบายใจเรื่องข้อมูลส่วนตัวได้ 100% เลยนะครับ ระบบวิเคราะห์ปัญญาประดิษฐ์ที่ผมนำมาใช้วางแผนให้คุณลูกค้าในวันนี้ เป็นสถาปัตยกรรมแบบ <b>Local Encrypted System</b> หมายความว่า ข้อมูลความมั่งคั่งทุกตัวอักษร จะถูกเข้ารหัสความปลอดภัยขั้นสูง (AES-256) และล็อกกุญแจเก็บไว้ในชิปหน่วยความจำของ iPad เครื่องนี้ของผมเท่านั้นครับ...<br><br>จะไม่มีการอัปโหลดขึ้น Cloud, ไม่มีการส่งข้อมูลผ่านอินเทอร์เน็ต และจะไม่มีแฮกเกอร์ หรือแม้แต่นักพัฒนาแอปคนไหนสามารถดึงข้อมูลของคุณลูกค้าไปได้ ถือเป็นมาตรฐานความปลอดภัยสูงสุดที่เหนือกว่ากฎหมาย PDPA อีกครับ"
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        `
    },

    // --- ส่วนพจนานุกรม ---
    "math-cfp": {
        icon: "📊",
        iconClass: "bg-blue-100 text-blue-700",
        title: "ส่วนที่ 4: มาตรฐานประเมินสุขภาพการเงิน (CFP Financial Ratios)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700 leading-relaxed"><b>กรอบการวิเคราะห์มาตรฐานสากล (CFP Board Standards):</b> กลุ่มสมการนี้ใช้สำหรับวินิจฉัย "จุดอ่อนและจุดแข็ง" เชิงโครงสร้างของงบกระแสเงินสดส่วนบุคคล (Personal Cash Flow) และงบแสดงฐานะการเงิน (Personal Balance Sheet) เพื่อค้นหาความเสี่ยงแฝงที่อาจนำไปสู่ภาวะล้มละลายทางเทคนิค</p>
        
        <div class="space-y-6">

            <!-- อัตราส่วนที่ 1: Survival Ratio -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden transform-gpu">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-blue-900 text-5xl select-none pointer-events-none">1</div>
                <b class="text-blue-800 mb-2 text-sm uppercase tracking-wide">1. อัตราความอยู่รอด (Basic Survival Ratio)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>ทฤษฎี:</b> ดัชนีชี้วัดความสามารถพื้นฐานในการดำรงชีพ เพื่อตรวจสอบว่ากระแสเงินสดรับ (Cash Inflows) เพียงพอต่อการหล่อเลี้ยงรายจ่าย (Cash Outflows) หรือไม่ หากค่าที่ได้ < 1.0 จะเกิดภาวะ <b>"ขาดดุลเชิงโครงสร้าง (Structural Deficit)"</b> ซึ่งจะนำไปสู่การก่อหนี้บริโภคทันที</span>
                
                <div class="bg-blue-50 p-3 rounded-lg font-mono text-[11px] border border-blue-100 text-center text-blue-900 mb-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="font-bold text-sm whitespace-nowrap">Survival Ratio = Total Income / Total Expenses</p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[11px] text-gray-700 space-y-2">
                    <b class="text-slate-800 border-b border-slate-200 pb-1 block">ตัวอย่างการประเมิน (Case Study):</b>
                    <ul class="list-none space-y-1 mt-2">
                        <li><b>โจทย์:</b> ลูกค้ามีรายได้ 50,000 บาท/เดือน มีรายจ่ายรวมผ่อนหนี้ 40,000 บาท/เดือน</li>
                        <li><b>คำนวณ:</b> 50,000 / 40,000 = <b>1.25 เท่า</b></li>
                        <li class="text-blue-700 font-bold mt-1">&rarr; การวินิจฉัย: ปลอดภัย (สอบผ่าน) ลูกค้ามีสภาพคล่องส่วนเกิน 25% สำหรับนำไปออมหรือลงทุน</li>
                    </ul>
                </div>
            </div>

            <!-- อัตราส่วนที่ 2: Liquidity Ratio -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden transform-gpu">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-emerald-900 text-5xl select-none pointer-events-none">2</div>
                <b class="text-emerald-800 mb-2 text-sm uppercase tracking-wide">2. อัตราส่วนสภาพคล่อง (Emergency Liquidity Ratio)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>ทฤษฎี:</b> ดัชนีวัดความทนทานต่อวิกฤตฉับพลัน (Exogenous Shocks) เช่น การตกงานหรือเจ็บป่วย โดยคำนวณว่า "สินทรัพย์สภาพคล่อง (เช่น เงินสด, เงินฝาก, กองทุนรวมตลาดเงิน)" จะสามารถหล่อเลี้ยงรายจ่ายรายเดือนไปได้กี่เดือน (เกณฑ์มาตรฐาน: 3-6 เดือนสำหรับพนักงานประจำ, 6-12 เดือนสำหรับฟรีแลนซ์/เจ้าของกิจการ)</span>
                
                <div class="bg-emerald-50 p-3 rounded-lg font-mono text-[11px] border border-emerald-100 text-center text-emerald-900 mb-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="font-bold text-sm whitespace-nowrap">Liquidity Ratio = Liquid Assets / Total Expenses (Monthly)</p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[11px] text-gray-700 space-y-2">
                    <b class="text-slate-800 border-b border-slate-200 pb-1 block">ตัวอย่างการประเมิน (Case Study):</b>
                    <ul class="list-none space-y-1 mt-2">
                        <li><b>โจทย์:</b> ลูกค้ามีเงินฝากออมทรัพย์ 80,000 บาท มีรายจ่ายเดือนละ 40,000 บาท</li>
                        <li><b>คำนวณ:</b> 80,000 / 40,000 = <b>2.0 เดือน</b></li>
                        <li class="text-emerald-700 font-bold mt-1">&rarr; การวินิจฉัย: อ่อนแอ (สอบตก) <i class="text-emerald-900 font-normal">FA ต้องแนะนำให้ลูกค้าหยุดลงทุนในสินทรัพย์เสี่ยง และเร่งถมเงินสดเข้ากองทุนฉุกเฉินให้ครบ 120,000 บาท (3 เดือน) เป็นอันดับแรก</i></li>
                    </ul>
                </div>
            </div>

            <!-- อัตราส่วนที่ 3: DTI Ratio -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden transform-gpu">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-red-900 text-5xl select-none pointer-events-none">3</div>
                <b class="text-red-800 mb-2 text-sm uppercase tracking-wide">3. อัตราส่วนภาระหนี้สินต่อรายได้ (Debt-to-Income Ratio: DTI)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>ทฤษฎี:</b> มาตรวัดความสามารถในการชำระหนี้ (Debt Service Capacity) ที่ธนาคารและสถาบันการเงินใช้ประเมินความเสี่ยงเครดิต (Credit Risk) หากภาระหนี้ต่อเดือนสูงเกิน <b>36% - 45%</b> จะเข้าสู่ <b>"โซนอันตราย (Red Zone)"</b> ส่งผลให้ลูกค้าสูญเสียอำนาจในการก่อหนี้สินเชื่อบ้าน และเสี่ยงต่อการผิดนัดชำระหนี้ (Default Risk)</span>
                
                <div class="bg-red-50 p-3 rounded-lg font-mono text-[11px] border border-red-100 text-center text-red-900 mb-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="font-bold text-sm whitespace-nowrap">DTI = (Total Debt Repayment / Total Income) &times; 100%</p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[11px] text-gray-700 space-y-2">
                    <b class="text-slate-800 border-b border-slate-200 pb-1 block">ตัวอย่างการประเมิน (Case Study):</b>
                    <ul class="list-none space-y-1 mt-2">
                        <li><b>โจทย์:</b> รายได้ 50,000 บาท/เดือน, ผ่อนรถ 12,000 บาท, ผ่อนบัตร 8,000 บาท, ขั้นต่ำสินเชื่อบุคคล 5,000 บาท</li>
                        <li><b>คำนวณ:</b> [(12,000 + 8,000 + 5,000) / 50,000] &times; 100% = <b>50.0%</b></li>
                        <li class="text-red-700 font-bold mt-1">&rarr; การวินิจฉัย: วิกฤต (สอบตก) <i class="text-red-900 font-normal">FA ต้องเข้ามาทำ Debt Restructuring ด่วน เช่น แนะนำให้ทำ Debt Consolidation รวบหนี้เพื่อลดยอดผ่อนต่อเดือนลงให้อยู่ต่ำกว่าเกณฑ์ 40%</i></li>
                    </ul>
                </div>
            </div>

            <!-- อัตราส่วนที่ 4: Solvency Ratio -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden transform-gpu pb-safe">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-purple-900 text-5xl select-none pointer-events-none">4</div>
                <b class="text-purple-800 mb-2 text-sm uppercase tracking-wide">4. อัตราส่วนความสามารถในการชำระหนี้สินระยะยาว (Solvency Ratio)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>ทฤษฎี:</b> ดัชนีประเมิน <b>"ความมั่งคั่งสุทธิ (Net Worth Ratio)"</b> บนงบดุล (Balance Sheet) เพื่อดูว่าทรัพย์สินที่มีอยู่ ถูกตุนไว้ด้วยส่วนของทุน (Equity) หรือส่วนของหนี้ (Liabilities) มากกว่ากัน เกณฑ์มาตรฐานสากลคือควรมีค่า <b>> 50%</b> (แปลว่ามีทรัพย์สินมากกว่าหนี้สินเกิน 1 เท่าตัว) หากค่าเข้าใกล้ 0% แปลว่ากำลังก้าวเข้าสู่ภาวะล้มละลาย (Technical Insolvency)</span>
                
                <div class="bg-purple-50 p-3 rounded-lg font-mono text-[11px] border border-purple-100 text-center text-purple-900 mb-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="font-bold text-sm whitespace-nowrap">Solvency Ratio = (Net Worth / Total Assets) &times; 100%</p>
                    <p class="text-[10px] text-purple-600 mt-1">*Net Worth = Total Assets - Total Liabilities</p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[11px] text-gray-700 space-y-2">
                    <b class="text-slate-800 border-b border-slate-200 pb-1 block">ตัวอย่างการประเมิน (Case Study):</b>
                    <ul class="list-none space-y-1 mt-2">
                        <li><b>โจทย์:</b> มีบ้านและรถรวมมูลค่า 5 ล้านบาท (Assets), แต่ติดจำนองและไฟแนนซ์รวม 3 ล้านบาท (Liabilities)</li>
                        <li><b>Step 1 (หา Net Worth):</b> 5 ล้าน - 3 ล้าน = 2 ล้านบาท</li>
                        <li><b>Step 2 (คำนวณ):</b> (2 ล้าน / 5 ล้าน) &times; 100% = <b>40.0%</b></li>
                        <li class="text-purple-700 font-bold mt-1">&rarr; การวินิจฉัย: ต่ำกว่าเกณฑ์ (สอบตก) <i class="text-purple-900 font-normal">ลูกค้าอยู่ในสภาวะ Over-leveraged (ใช้เงินกู้มากเกินไป) FA ต้องวางแผนลดสัดส่วนหนี้สินลง หรือแนะนำให้หันไปสะสมสินทรัพย์เพื่อการลงทุนที่ไม่มีภาระหนี้ผูกพัน (Unencumbered Assets)</i></li>
                    </ul>
                </div>
            </div>

        </div>
        </div>`
    },
    "math-tvm": {
        icon: "⏳",
        iconClass: "bg-indigo-100 text-indigo-700",
        title: "ส่วนที่ 5: ทฤษฎีมูลค่าเงินตามเวลาและการจัดการหนี้ (Time Value of Money & Amortization)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700 leading-relaxed"><b>บทเรียนวิชาการ (Academic Theory):</b> ทฤษฎีมูลค่าเงินตามเวลา (TVM) คือรากฐานของวิศวกรรมการเงินทั้งหมด ตั้งอยู่บนสมมติฐานที่ว่า <i>"เงินหนึ่งบาทในวันนี้ มีค่ามากกว่าเงินหนึ่งบาทในอนาคต"</i> ระบบจึงใช้กลุ่มสมการเหล่านี้ในการคิดลด (Discounting) และทบต้น (Compounding) เพื่อสร้างแผนการเงินที่แม่นยำ</p>
        
        <div class="space-y-6">

            <!-- บทที่ 1: Fisher Equation -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden transform-gpu">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-indigo-900 text-5xl select-none pointer-events-none">1</div>
                <b class="text-indigo-800 mb-2 text-sm uppercase tracking-wide">บทที่ 1: ทฤษฎีอำนาจซื้อและผลตอบแทนแท้จริง (Fisher Equation)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">การคำนวณแผนเกษียณที่ใช้ "ผลตอบแทนหน้าตั๋ว (Nominal Return)" หักลบ "เงินเฟ้อ (Inflation)" แบบตรงๆ (เช่น 8% - 3% = 5%) ถือเป็น<b>ข้อผิดพลาดทางคณิตศาสตร์อย่างร้ายแรง</b> ระบบที่ได้มาตรฐานจะต้องใช้สมการของ Irving Fisher เพื่อหา <b>อัตราผลตอบแทนแท้จริง (Real Return)</b> ที่สะท้อนอำนาจซื้อที่แท้จริง</span>
                
                <div class="bg-indigo-50 p-3 rounded-lg font-mono text-[11px] border border-indigo-100 text-center text-indigo-900 mb-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="mb-1 text-indigo-400">// สมการ Fisher Effect</p>
                    <p class="font-bold text-sm whitespace-nowrap">r<sub>real</sub> = [ (1 + r<sub>nominal</sub>) / (1 + r<sub>inflation</sub>) ] - 1</p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[11px] text-gray-700 space-y-2">
                    <b class="text-slate-800 border-b border-slate-200 pb-1 block">ตัวอย่างการคำนวณ (Case Study):</b>
                    <ul class="list-none space-y-1 mt-2 font-mono">
                        <li><b>โจทย์:</b> พอร์ตลงทุนคาดหวังผลตอบแทน 8% ต่อปี (r<sub>nom</sub> = 0.08), เงินเฟ้อคาดการณ์ 3% (r<sub>inf</sub> = 0.03)</li>
                        <li><b>วิธีทำ:</b> r<sub>real</sub> = [ (1 + 0.08) / (1 + 0.03) ] - 1</li>
                        <li><b>คำนวณ:</b> r<sub>real</sub> = [ 1.08 / 1.03 ] - 1 = 1.04854 - 1</li>
                        <li class="text-indigo-700 font-bold mt-1">&rarr; ผลตอบแทนแท้จริง = 4.85% (ไม่ใช่ 5.00% ตามที่คนทั่วไปเข้าใจ)</li>
                    </ul>
                </div>
            </div>

            <!-- บทที่ 2: Annuity Due -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden transform-gpu">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-blue-900 text-5xl select-none pointer-events-none">2</div>
                <b class="text-blue-800 mb-2 text-sm uppercase tracking-wide">บทที่ 2: มูลค่าเป้าหมายกองทุนเกษียณ (PV of Annuity Due)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">ในการวางแผนเกษียณ เราจะใช้สมการ <b>Annuity Due (เงินงวดต้นงวด)</b> เสมอ แทนที่จะใช้ Ordinary Annuity (เงินงวดปลายงวด) เพราะในโลกความเป็นจริง คนเกษียณต้อง <b>"ถอนเงินก้อนแรกออกมาใช้ตั้งแต่วันแรกของปี"</b> เพื่อเป็นค่าครองชีพในปีนั้นๆ สมการจึงต้องคูณด้วย (1 + r) ทบเข้าไปอีกหนึ่งงวด</span>
                
                <div class="bg-blue-50 p-3 rounded-lg font-mono text-[11px] border border-blue-100 text-center text-blue-900 mb-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="mb-1 text-blue-400">// สมการ Present Value of Annuity Due</p>
                    <p class="font-bold text-sm whitespace-nowrap">PV = PMT &times; [ { 1 - (1 + r<sub>real</sub>)<sup>-n</sup> } / r<sub>real</sub> ] &times; (1 + r<sub>real</sub>)</p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[11px] text-gray-700 space-y-2">
                    <b class="text-slate-800 border-b border-slate-200 pb-1 block">ตัวอย่างการคำนวณ (Case Study):</b>
                    <ul class="list-none space-y-1 mt-2 font-mono">
                        <li><b>โจทย์:</b> ต้องการใช้เงินปีละ 600,000 บาท (PMT) เป็นเวลา 20 ปี (n) โดยพอร์ตหลังเกษียณชนะเงินเฟ้อสุทธิที่ 4% (r<sub>real</sub> = 0.04)</li>
                        <li><b>Step 1 (หา PV ปลายงวด):</b> 600,000 &times; [ { 1 - (1.04)<sup>-20</sup> } / 0.04 ]</li>
                        <li><b>Step 2 (คำนวณ Factor):</b> 600,000 &times; 13.5903 = 8,154,180 บาท</li>
                        <li><b>Step 3 (แปลงเป็นต้นงวด):</b> 8,154,180 &times; (1 + 0.04)</li>
                        <li class="text-blue-700 font-bold mt-1">&rarr; เป้าหมายเกษียณ (PV) = 8,480,347 บาท</li>
                    </ul>
                    <p class="text-[10px] text-orange-600 italic mt-2"><b>*Algorithmic Guardrail:</b> หาก r<sub>real</sub> มีค่าเป็น 0.00% สมการจะเกิด Error (Divide by Zero) โปรแกรมจะสลับไปใช้สูตรเชิงเส้น <b>PV = PMT &times; n</b> (เช่น 600k &times; 20 = 12 ล้านบาท) อัตโนมัติ</p>
                </div>
            </div>

            <!-- บทที่ 3: Debt Amortization -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden transform-gpu pb-safe">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-red-900 text-5xl select-none pointer-events-none">3</div>
                <b class="text-red-800 mb-2 text-sm uppercase tracking-wide">บทที่ 3: สมการปลดหนี้และวิกฤตพอกหางหมู (Amortization & NPER)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">สมการคณิตศาสตร์ที่ใช้หา "จำนวนงวดที่ต้องผ่อน (n)" อาศัยหลักการ <b>Exponential Decay (การลดลงแบบเอกซ์โพเนนเชียล)</b> ด้วยลอการิทึมธรรมชาติ (ln) เพื่อจำลองการลดต้นลดดอก โมเดลนี้สำคัญมากในการวางกลยุทธ์ Debt Snowball/Avalanche เพื่อดูว่าถ้าลูกค้า "โปะหนี้เพิ่ม" จะปลดหนี้เร็วขึ้นกี่เดือน</span>
                
                <div class="bg-red-50 p-3 rounded-lg font-mono text-[11px] border border-red-100 text-center text-red-900 mb-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="mb-1 text-red-400">// สมการ NPER (Number of Periods)</p>
                    <p class="font-bold text-sm whitespace-nowrap">n = -ln( 1 - (PV &times; r) / PMT ) / ln(1 + r)</p>
                </div>

                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[11px] text-gray-700 space-y-2">
                    <b class="text-slate-800 border-b border-slate-200 pb-1 block">ตัวอย่างการคำนวณ (Case Study):</b>
                    <ul class="list-none space-y-1 mt-2 font-mono">
                        <li><b>โจทย์:</b> หนี้บัตร 100,000 บาท (PV), ดอกเบี้ย 18% ต่อปี &rarr; 1.5% ต่อเดือน (r = 0.015), ผ่อนเดือนละ 5,000 บาท (PMT)</li>
                        <li><b>Step 1 (ภาระดอกเบี้ยต่อเดือน):</b> PV &times; r = 100,000 &times; 0.015 = 1,500 บาท</li>
                        <li><b>Step 2 (แทนค่าสมการ ln):</b> -ln( 1 - (1,500 / 5,000) ) / ln(1.015)</li>
                        <li><b>Step 3 (คำนวณ):</b> -ln( 1 - 0.3 ) / ln(1.015) = -ln(0.7) / 0.01488</li>
                        <li class="text-red-700 font-bold mt-1">&rarr; จำนวนงวด (n) = 0.3566 / 0.01488 &approx; 24 งวด (2 ปี)</li>
                    </ul>
                </div>

                <div class="mt-3 bg-red-100/50 p-3 rounded border border-red-200 text-[11px] text-red-900 flex flex-col">
                    <b class="flex items-center gap-1 mb-1 select-none pointer-events-none">🚨 กฎการพังทลายของลอการิทึม (Negative Amortization Trap)</b>
                    <span>หากลูกค้าจ่ายขั้นต่ำน้อยกว่าหรือเท่ากับดอกเบี้ย (PMT &le; PV &times; r) ค่าในวงเล็บของ <b>ln() จะมีค่าติดลบหรือเป็นศูนย์</b> ซึ่งทางคณิตศาสตร์ไม่สามารถหาค่าได้ (Undefined) ระบบจะจับค่า Error นี้และแปลงเป็นสถานะ <b>"วิกฤตหนี้ชั่วกัลป์ (Infinity)"</b> เพื่อเตือนว่าลูกค้าจะไม่มีวันผ่อนหนี้ก้อนนี้หมดหากไม่เพิ่มยอดผ่อน (PMT)</span>
                </div>
            </div>

        </div>
        </div>`
    },
    "math-dnn": {
        icon: "🕸️",
        iconClass: "bg-cyan-100 text-cyan-700",
        title: "ส่วนที่ 6: สถาปัตยกรรมโครงข่ายประสาทเทียมเชิงลึก (Deep Neural Network Architecture)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700 leading-relaxed"><b>รายงานการวิเคราะห์ทางเทคนิค (Technical Whitepaper):</b> สถาปัตยกรรม <b>Multi-Layer Perceptron (MLP)</b> นี้ถูกสร้างขึ้นเพื่อทำ Predictive Analytics ประเมินความน่าจะเป็นที่ลูกค้าจะบรรลุเป้าหมายทางการเงิน โดยทำงานแบบ Offline ผ่าน Pre-trained Weights บน Client-side ประกอบด้วยกระบวนการคำนวณทางคณิตศาสตร์ 4 ระยะ (Phases) ดังนี้</p>
        
        <div class="space-y-5">

            <!-- Phase 1: Input Vector Space -->
            <div class="bg-slate-800 text-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden transform-gpu">
                <div class="absolute top-0 right-0 p-3 opacity-10 text-5xl select-none pointer-events-none">1</div>
                <b class="text-cyan-400 mb-2 text-sm uppercase tracking-wide">Phase 1: Input Vector Space & Feature Standardization</b>
                <span class="text-xs text-gray-300 mb-3 leading-relaxed">ระบบรับตัวแปรอิสระ (Independent Variables) จำนวน 15 มิติ (เช่น อายุ, อัตราส่วนเงินออม, DTI) เข้าสู่ Hyperspace $\\mathbb{R}^{15}$ แต่เนื่องจากหน่วยของข้อมูลมีความแปรปรวนสูง (Variance) เช่น เงินเดือนหลักแสน vs จำนวนบุตรหลักหน่วย ระบบจึงต้องทำ <b>Z-Score Normalization</b> เพื่อปรับให้ทุกแกนมีค่าเฉลี่ย (&mu;) เป็น 0 และส่วนเบี่ยงเบนมาตรฐาน (&sigma;) เป็น 1 เท่ากันหมด</span>
                
                <div class="bg-slate-900 p-3 rounded-lg font-mono text-[11px] border border-slate-700 text-cyan-200 mb-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="mb-1 text-slate-400 whitespace-nowrap">// สมการแปลงพิกัด (Standardization Equation)</p>
                    <p class="whitespace-nowrap">Z<sub>i</sub> = (X<sub>i</sub> - &mu;<sub>i</sub>) / &sigma;<sub>i</sub> &nbsp;&nbsp; ; &forall;i &in; {1, 2, ..., 15}</p>
                    <p class="mt-2 mb-1 text-slate-400 whitespace-nowrap">// การตรึงพิกัดเพื่อป้องกันความผิดปกติ (OOD Regularization)</p>
                    <p class="whitespace-nowrap">Z'<sub>i</sub> = max(-5.0, min(5.0, Z<sub>i</sub>))</p>
                </div>
                <p class="text-[10px] text-orange-300 italic border-l-2 border-orange-500 pl-2"><b>*Academic Note:</b> การทำ Clipping ที่ &plusmn;5 &sigma; ครอบคลุมพื้นที่ 99.9999% ของ Normal Distribution เพื่อทำหน้าที่เป็น <b>Out-of-Distribution (OOD) Guardrail</b> ป้องกันโมเดลเกิดภาวะ AI Hallucination เมื่อประมวลผลข้อมูลของกลุ่มมหาเศรษฐี (UHNW) ที่ตัวเลขฉีกกฎสถิติปกติ</p>
            </div>

            <!-- Phase 2: Hidden Layers & Affine Transformation -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden transform-gpu">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-gray-900 text-5xl select-none pointer-events-none">2</div>
                <b class="text-blue-800 mb-2 text-sm uppercase tracking-wide">Phase 2: Affine Transformation & Non-Linearity (Hidden Layers)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">เวกเตอร์ข้อมูลที่ปรับสเกลแล้ว จะเคลื่อนที่ผ่านชั้นซ่อน (Hidden Layers) โดยเกิดกระบวนการคูณเมทริกซ์ (Dot Product) กับ <b>ค่าน้ำหนัก (Weights - W)</b> และบวกด้วย <b>ค่าความลำเอียง (Biases - B)</b> จากนั้นจึงผ่านด่าน <b>ReLU (Rectified Linear Unit)</b> ซึ่งเป็น Non-linear Activation Function ที่จะตัดค่าที่ติดลบทิ้งให้เป็น 0 เพื่อป้องกันปัญหา Vanishing Gradient และช่วยสกัดความสัมพันธ์ซับซ้อน (Feature Crossing) เช่น "รายได้สูง แต่หนี้ก็สูงตาม"</span>
                
                <ul class="font-mono text-[11px] text-blue-900 bg-blue-50 p-4 rounded-lg border border-blue-100 mt-1 space-y-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <li class="flex flex-col">
                        <span class="text-gray-500 font-bold mb-1 whitespace-nowrap">// Layer 1: H1 Space Projection (สกัดมิติขั้นต่ำ)</span>
                        <span class="bg-white p-1.5 rounded border border-blue-200 whitespace-nowrap">H<sup>(1)</sup> = max(0, Z' &middot; W<sup>(0)</sup> + B<sup>(0)</sup>)</span>
                    </li>
                    <li class="flex flex-col pt-1">
                        <span class="text-gray-500 font-bold mb-1 whitespace-nowrap">// Layer 2: H2 Deep Interaction (สกัดความสัมพันธ์เชิงลึก)</span>
                        <span class="bg-white p-1.5 rounded border border-blue-200 whitespace-nowrap">H<sup>(2)</sup> = max(0, H<sup>(1)</sup> &middot; W<sup>(2)</sup> + B<sup>(2)</sup>)</span>
                    </li>
                </ul>
            </div>

            <!-- Phase 3: Output & Probability Mapping -->
            <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-200 shadow-md flex flex-col relative overflow-hidden transform-gpu">
                <div class="absolute top-0 right-0 p-3 opacity-10 text-indigo-900 text-5xl select-none pointer-events-none">3</div>
                <b class="text-indigo-900 mb-2 text-sm uppercase tracking-wide">Phase 3: Logit Transformation & Sigmoid Mapping</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">ในชั้น Output Layer ค่าที่ประมวลผลได้จะอยู่ในรูปของ Log-odds (ช่วงคะแนนตั้งแต่อนันต์ติดลบถึงอนันต์บวก) อัลกอริทึมจึงต้องใช้ <b>Sigmoid Function &sigma;(x)</b> เพื่อบีบอัด (Squeeze) เวกเตอร์ทั้งหมดให้ตกลงมาอยู่ในความน่าจะเป็นทางคณิตศาสตร์ (Probability Range) ระหว่าง 0 ถึง 1 เท่านั้น</span>
                
                <div class="bg-white p-3 rounded-lg font-mono text-[11px] border border-indigo-200 text-center text-indigo-900 mb-2 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="text-gray-500 mb-1 whitespace-nowrap">// Sigmoid Activation Equation</p>
                    <p class="font-bold text-sm whitespace-nowrap">P(Success | X) = 1 / (1 + e<sup>-(H<sup>(2)</sup> &middot; W<sup>(3)</sup> + B<sup>(3)</sup>)</sup>)</p>
                </div>
            </div>

            <!-- Phase 4: Counterfactual Simulation -->
            <div class="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-md flex flex-col relative overflow-hidden transform-gpu pb-safe">
                <div class="absolute top-0 right-0 p-3 opacity-10 text-emerald-900 text-5xl select-none pointer-events-none">4</div>
                <b class="text-emerald-800 mb-2 text-sm uppercase tracking-wide">Phase 4: Counterfactual Simulation (Success Leap Analysis)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">กระบวนการที่ล้ำลึกที่สุดของโมเดลนี้คือ การทำ <b>Counterfactual Inference (การวิเคราะห์เหตุการณ์สมมติ)</b> อัลกอริทึมจะคัดลอกสถานะการเงินปัจจุบัน (X<sub>current</sub>) มาสร้างเป็นแบบจำลองคู่ขนาน (X<sub>proposed</sub>) โดยอัดฉีดค่า "วินัยทางการเงินเชิงอุดมคติ (Ideal Behaviors)" เข้าไป เช่น การบังคับให้ DTI_Ratio = 0.0 และ Savings_Ratio &ge; 0.20 แล้วรันสมการ Neural Network อีกรอบเพื่อหาค่า $\\Delta$ (Delta)</span>
                
                <div class="bg-white/70 p-4 rounded-lg border border-emerald-100 text-[11px] text-gray-700 mb-4 shadow-inner space-y-2">
                    <b class="text-emerald-900 border-b border-emerald-200 pb-1 block">The Marginal Utility of Financial Advice (มูลค่าส่วนเพิ่มของคำแนะนำ):</b>
                    <p class="font-mono text-gray-600 mt-2 whitespace-nowrap overflow-x-auto touch-pan-x">&Delta;P (Leap) = P(Success | X<sub>proposed</sub>) - P(Success | X<sub>current</sub>)</p>
                    <ul class="list-disc list-inside mt-2 space-y-1 text-emerald-800">
                        <li><b>Baseline (X<sub>cur</sub>):</b> ประเมินได้ 45.0% (ความเสี่ยงสูง)</li>
                        <li><b>Optimized (X<sub>prop</sub>):</b> ประเมินได้ 85.5% (ความสำเร็จสูง)</li>
                        <li><b>&Delta;P (Leap) = +40.5%</b></li>
                    </ul>
                </div>
                
                <i class="text-[11px] text-emerald-700 mt-auto pt-2 border-t border-emerald-200 leading-relaxed"><b>FA Application:</b> ตัวเลข <b>&Delta;P (Leap)</b> ไม่ใช่แค่เศษส่วนทางคณิตศาสตร์ แต่คือ <b>"หลักฐานเชิงประจักษ์ (Empirical Evidence)"</b> ที่ FA สามารถใช้พิสูจน์ให้ลูกค้าเห็นว่า หากยอมลดไลฟ์สไตล์และปฏิบัติตามแผนการเงิน โอกาสพลิกชีวิตให้สำเร็จจะเพิ่มขึ้นอย่างเป็นรูปธรรมกี่เปอร์เซ็นต์</i>
            </div>

        </div>
        </div>`
    },
    "math-kmeans": {
        icon: "🧬",
        iconClass: "bg-purple-100 text-purple-700",
        title: "ส่วนที่ 7: ระบบจัดกลุ่มอัตลักษณ์ลูกค้า (8D K-Means Clustering)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700">อัลกอริทึมเรียนรู้แบบไม่มีผู้สอน (Unsupervised Learning) ทำหน้าที่วิเคราะห์ข้อมูลลูกค้าทั้ง 8 มิติ แล้วแปลงเป็นพิกัดใน Hyperspace เพื่อค้นหาว่าลูกค้าคนนี้มี DNA ทางการเงินตรงกับ "กลุ่มเป้าหมาย (Centroids)" กลุ่มใดมากที่สุด</p>
        <div class="space-y-5">

            <!-- กล่องที่ 1: Features -->
            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm transform-gpu">
                <b class="text-indigo-800 mb-2 block select-none">📊 8 มิติพฤติกรรมที่ AI ใช้จับอัตลักษณ์ (8D Features)</b>
                <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-indigo-900 mt-2">
                    <div><b>1. Age:</b> อายุและวงจรชีวิต</div>
                    <div><b>2. Inc:</b> ฐานรายได้ต่อเดือน</div>
                    <div><b>3. NW:</b> ความมั่งคั่งสุทธิ</div>
                    <div><b>4. DTI:</b> ภาระหนี้ต่อรายได้</div>
                    <div><b>5. Risk:</b> ระดับการรับความเสี่ยง</div>
                    <div><b>6. Dep:</b> ภาระผู้อุปการะ</div>
                    <div title="ระยะเวลาห่างจากการลงทุนครั้งล่าสุด"><b>7. Recency:</b> ความใหม่ของพอร์ต</div>
                    <div title="วินัยในการออมและการเข้าพบ FA"><b>8. Discipline:</b> วินัยและความถี่</div>
                </div>
            </div>

            <!-- กล่องที่ 2: Euclidean Distance -->
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-purple-800 mb-2 select-none">📐 สมการหาระยะห่าง (Euclidean Distance in 8D Space)</b>
                <span class="text-xs text-gray-700 mb-3">เมื่อปรับสเกลข้อมูลลูกค้า (0.0 ถึง 1.0) แล้ว ระบบจะใช้สมการเรขาคณิตขั้นสูง เพื่อวัดระยะห่างระหว่างจุดของลูกค้า (P) กับจุดศูนย์กลางของแต่ละกลุ่ม (Centroids - C<sub>k</sub>) กลุ่มไหนได้ค่า Distance <b>"น้อยที่สุด"</b> ลูกค้าจะถูกจับไปอยู่กลุ่มนั้นทันที</span>
                <div class="mb-2 bg-purple-50 p-3 rounded-lg font-mono text-[11px] border border-purple-100 text-center text-purple-900 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <span class="whitespace-nowrap">d(P, C<sub>k</sub>) = &radic;<span class="border-t border-purple-900 ml-1">&Sigma;(P<sub>norm,i</sub> - C<sub>k,i</sub>)<sup>2</sup></span></span>
                </div>
            </div>

            <!-- กล่องที่ 3: Case Study -->
            <div class="bg-white p-4 rounded-xl border shadow-sm transform-gpu">
                <b class="text-blue-800 mb-3 block flex items-center gap-2"><span class="text-lg select-none">🔍</span> Case Study: AI จัดกลุ่มอย่างไร?</b>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="border border-green-200 bg-green-50 p-3 rounded-lg">
                        <p class="text-xs font-bold text-green-800 mb-1">เคส A: คุณวุฒิ (จบใหม่/หนี้ศูนย์)</p>
                        <p class="text-[11px] text-green-900 mb-2">Age: 24 | NW: ต่ำ | DTI: 0 | Disc: สูง</p>
                        <p class="text-xs text-gray-700 leading-relaxed border-t border-green-200 pt-2">
                            <b>AI Analysis:</b> ด้วยพิกัดที่มีหนี้ต่ำและวินัยออมสูงมาก (ออม 50% ของรายได้) แม้รายได้จะน้อย แต่เวกเตอร์ของคุณวุฒิจะดึงดูดเข้าหาจุดศูนย์กลางของกลุ่ม <b>"Young Wealth Builder (วัยทำงานสร้างตัว)"</b> ทำให้ระบบสั่งลุยแผนสะสมความมั่งคั่งได้เต็มที่
                        </p>
                    </div>
                    <div class="border border-red-200 bg-red-50 p-3 rounded-lg">
                        <p class="text-xs font-bold text-red-800 mb-1">เคส B: คุณสุ (UHNW/หนี้ 177 ลบ.)</p>
                        <p class="text-[11px] text-red-900 mb-2">Age: 54 | NW: 100M+ | DTI: สูงปรี๊ด | Disc: ต่ำ</p>
                        <p class="text-xs text-gray-700 leading-relaxed border-t border-red-200 pt-2">
                            <b>AI Analysis:</b> แม้จะมี NW ระดับ UHNW แต่อัตราส่วน DTI ที่สูงลิ่ว และ Cash Flow ที่ติดลบ ทำให้เวกเตอร์ของคุณสุพุ่งไปตกในกลุ่ม <b>"Overleveraged/Struggling (กลุ่มเปราะบาง/หนี้วิกฤต)"</b> ระบบจึงเบรกการลงทุน และบังคับใช้โหมดปกป้องสภาพคล่องแทน
                        </p>
                    </div>
                </div>
            </div>

            <!-- กล่องที่ 4: Anomaly Detection -->
            <div class="bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden transform-gpu pb-safe">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">🚨</div>
                <b class="text-yellow-400 mb-2 block relative z-10 select-none">⚠️ ระบบตรวจจับความผิดปกติ (Anomaly Threshold)</b>
                <span class="text-xs text-slate-300 mb-3 block relative z-10 leading-relaxed">
                    ระบบถูกตั้งค่า Threshold การกระจัดไว้ที่ <b>1.85</b> หากพบว่าระยะห่างที่น้อยที่สุด (Min Distance) ยังคงไกลกว่า 1.85 แปลว่า <b>"ลูกค้ารายนี้มีพฤติกรรมกลายพันธุ์ หรือย้อนแย้งในตัวเองอย่างรุนแรง"</b>
                </span>
                
                <div class="bg-slate-900/80 p-3 rounded border border-slate-600 text-[11px] text-gray-300 space-y-1 relative z-10 shadow-inner">
                    <b class="text-white text-xs">ตัวอย่าง Anomaly:</b><br>
                    <span class="text-slate-400 block mb-1">ลูกค้าอายุ 25 (พึ่งเรียนจบ) รายได้ 20,000 บ/ด. แต่มีสินทรัพย์ 50 ล้านบาทและหนี้ 0 บาท</span>
                    <span class="text-red-400 block mb-1">» เวกเตอร์ไม่ตรงกับวัยสร้างตัว (รวยเกินไป) และไม่ตรงกับ UHNW (รายได้/อายุน้อยเกินไป)</span>
                    <span class="text-yellow-400 font-bold block mt-2">ผลลัพธ์: ระบบจะติดป้าย [Anomaly Detected] เตือนให้ FA ทราบทันที</span>
                </div>

                <div class="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-600 relative z-10 leading-relaxed">
                    <b class="text-white">FA Action (ข้อแนะนำ):</b> โมเดลสูตรสำเร็จ (Rule of thumb) จะใช้กับคนกลุ่ม Anomaly ไม่ได้เลย FA ต้องเข้าไปทำ Fact-Finding เชิงลึก (เช่น ทรัพย์สิน 50 ลบ. เป็นมรดก หรือคริปโต?) แล้วจัดพอร์ตแบบ Tailor-made ชิ้นต่อชิ้นครับ
                </div>
            </div>

        </div>
        </div>`
    },
    "math-consensus": {
        icon: "⚖️",
        iconClass: "bg-slate-100 text-slate-700",
        title: "ส่วนที่ 8: กลไกตัดสินใจร่วม (Hybrid Co-Advisor Consensus Engine)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-3 text-sm text-gray-700">สถาปัตยกรรมปัญญาประดิษฐ์ (AI Pipeline) ที่ทำงานร่วมกันระหว่าง <b>Machine Learning</b> ในการแบ่งกลุ่มลูกค้า และ <b>Expert Heuristics</b> (กฎเกณฑ์ผู้เชี่ยวชาญทางการเงิน) เพื่อป้องกันการแนะนำที่ผิดพลาด (AI Hallucinations) ครบจบใน 5 ขั้นตอน</p>
        <div class="space-y-4">

            <!-- ขั้นตอนที่ 1: K-Means Clustering -->
            <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-blue-800 mb-2 flex items-center gap-2 select-none">Step 1: แบ่งกลุ่มพฤติกรรมภาพรวม (Macro Segmentation ด้วย 8D K-Means)</b>
                <span class="text-xs text-gray-700 mb-2">อัลกอริทึมจะคำนวณระยะห่าง (Euclidean Distance) ใน 8 มิติพฤติกรรม เพื่อจับคู่ลูกค้าเข้ากับ 7 ศูนย์กลางกลุ่ม (Centroids) ได้แก่:</span>
                <ul class="text-[11px] list-none p-3 font-mono bg-white border border-blue-100 rounded-lg text-blue-900 space-y-1.5 mb-1 overflow-x-auto touch-pan-x overscroll-x-contain">
                    <li class="whitespace-nowrap"><b>1. กลุ่มเปราะบาง (Struggling):</b> หนี้สูงปรี๊ด ทรัพย์สินน้อย วินัยการเงินต่ำ</li>
                    <li class="whitespace-nowrap"><b>2. วัยทำงานสร้างตัว (Young Builder):</b> อายุน้อย กล้าเสี่ยงสูง วินัยดี ไร้ภาระ</li>
                    <li class="whitespace-nowrap"><b>3. ครอบครัวมาตรฐาน (Standard Family):</b> วัยกลางคน ภาระปานกลาง ทุกอย่างทรงตัว</li>
                    <li class="whitespace-nowrap"><b>4. คู่รักไร้บุตร (High-Earner DINKs):</b> รายได้สูง วินัยดี กล้าเสี่ยง หนี้ต่ำ</li>
                    <li class="whitespace-nowrap"><b>5. ผู้บริหาร (HNW/Legacy):</b> ทรัพย์สินสูงมาก ปลอดหนี้ วินัยยอดเยี่ยม</li>
                    <li class="whitespace-nowrap"><b>6. เศรษฐีวัยเกษียณ (UHNW Retiree):</b> ทรัพย์สินมหาศาล ไร้หนี้ รับความเสี่ยงต่ำ</li>
                    <li class="whitespace-nowrap"><b>7. เกษียณอายุทั่วไป (Basic Retiree):</b> ทรัพย์สินจำกัด รับความเสี่ยงได้ต่ำสุด</li>
                </ul>
            </div>

            <!-- ขั้นตอนที่ 2: Decision Tree & Anomaly -->
            <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-emerald-800 mb-2 flex items-center gap-2 select-none">Step 2: ซอยย่อยเฉพาะบุคคล (Micro Segmentation ด้วย Decision Tree)</b>
                <span class="text-xs text-gray-700 mb-2">โมเดลจะแตกกิ่งก้าน (Branching) โดยใช้ <b>"ภาระครอบครัว (Dependents)"</b> เป็นแกนหลัก และซอยย่อยตาม อายุ, รายได้, ทรัพย์สิน ฯลฯ พร้อมกลไกตรวจจับความผิดปกติ:</span>
                <ul class="text-[11px] list-disc list-inside p-3 font-mono bg-white border border-emerald-100 rounded-lg text-emerald-900 space-y-1.5 mb-1">
                    <li><b>Hard Rule:</b> หากพบว่าภาระหนี้ (DTI) > 60% ระบบจะปัดตกไปกลุ่ม <i>"หนี้ล้นพ้นตัว"</i> ทันทีโดยไม่สนอายุและรายได้</li>
                    <li><b>Anomaly Detection:</b> หากระยะห่าง (Distance) จากกลุ่ม K-Means > 1.85 ระบบจะตั้ง Flag ว่า <b>[Anomaly Detected]</b> เนื่องจากพฤติกรรมขัดแย้งในตัวเอง (เช่น รายได้ต่ำแต่ทรัพย์สินร้อยล้าน)</li>
                </ul>
            </div>

            <!-- ขั้นตอนที่ 3: Yellow Flags -->
            <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-yellow-800 mb-2 select-none">Step 3: ตรวจจับพฤติกรรมเสี่ยง & หักลดทอนคะแนน (Dynamic Discounting)</b>
                <span class="text-xs text-gray-700 mb-2">แม้ ML จะประเมินโอกาสบรรลุเป้าหมายไว้สูง แต่ถ้าพบ "พฤติกรรมที่ไม่พึงประสงค์" (Warning Flags) ระบบจะบวกสะสมอัตราส่วนลด (Discount Rate: &Sigma;D<sub>rate</sub>) เพื่อดึงคะแนนให้กลับสู่ความเป็นจริง:</span>
                <ul class="text-[11px] list-none p-3 font-mono bg-white border border-yellow-100 rounded-lg text-yellow-900 space-y-1.5 mb-2 overflow-x-auto touch-pan-x overscroll-x-contain">
                    <li class="whitespace-nowrap">if(พบ "พึ่งพาสินเชื่อ") &Sigma;D<sub>rate</sub> += 0.20 <i>(หัก 20%)</i></li>
                    <li class="whitespace-nowrap">if(พบ "หมุนเงินชนเดือน") &Sigma;D<sub>rate</sub> += 0.15 <i>(หัก 15%)</i></li>
                    <li class="whitespace-nowrap">if(พบ "ละเลยความคุ้มครอง") &Sigma;D<sub>rate</sub> += 0.10 <i>(หัก 10%)</i></li>
                    <li class="whitespace-nowrap">if(พบ "กับดักไลฟ์สไตล์") &Sigma;D<sub>rate</sub> += 0.10 <i>(หัก 10%)</i></li>
                    <li class="whitespace-nowrap">if(พบ "กอดเงินสดมากไป") &Sigma;D<sub>rate</sub> += 0.05 <i>(หัก 5%)</i></li>
                </ul>
                <p class="text-[10px] text-yellow-700 italic border-l-2 border-yellow-400 pl-2"><b>*Guardrail Constraint:</b> จำกัดการลดทอนรวมกันสูงสุดไม่เกิน 0.60 (60%) เพื่อป้องกันคะแนนติดลบ</p>
            </div>

            <!-- ขั้นตอนที่ 4: Red Flags -->
            <div class="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-red-800 mb-2 select-none">Step 4: ตรวจจับวิกฤตและล็อกเพดานคะแนน (Critical Hard Caps)</b>
                <span class="text-xs text-gray-700 mb-2">หากพบพฤติกรรมเสี่ยงถึงขั้น "สูญเสียความสามารถในการชำระหนี้" กฎของผู้เชี่ยวชาญจะ <b>เข้าแทรกแซง (Overriding)</b> และล็อกเพดานความสำเร็จสูงสุด (Maximum Limit) ไว้ทันที:</span>
                <ul class="text-[11px] list-none p-3 font-mono bg-white border border-red-100 rounded-lg text-red-900 space-y-1 mb-1 overflow-x-auto touch-pan-x overscroll-x-contain">
                    <li class="whitespace-nowrap">if(พบ "หนี้สินอันตราย/ล้นพ้นตัว") &rarr; Cap<sub>hard</sub> = 45.0% <i>(แผนมีความเสี่ยงพังทลายสูงมาก)</i></li>
                    <li class="whitespace-nowrap">else (ไม่พบความเสี่ยงระดับวิกฤต) &rarr; Cap<sub>hard</sub> = 100.0% <i>(ปล่อยให้เป็นไปตามการลดทอนใน Step 3)</i></li>
                </ul>
            </div>

            <!-- ขั้นตอนที่ 5: End-to-End Execution -->
            <div class="bg-slate-800 p-4 rounded-xl shadow-sm flex flex-col text-white transform-gpu pb-safe">
                <b class="text-cyan-400 mb-2 select-none">Step 5: สมการรวบยอด & ตัวอย่างการประมวลผลจริง (Execution Engine)</b>
                <div class="bg-slate-900 p-3 rounded-lg font-mono text-[11px] border border-slate-700 text-cyan-100 mb-4 space-y-1 overflow-x-auto touch-pan-x overscroll-x-contain shadow-inner">
                    <p class="whitespace-nowrap"><b>1. ตัดส่วนลด:</b> P<sub>discounted</sub> = P<sub>ML</sub> &times; (1 - &Sigma;D<sub>rate</sub>)</p>
                    <p class="whitespace-nowrap"><b>2. บังคับเพดาน:</b> P<sub>final</sub> = max(0.1, min(99.9, min(P<sub>discounted</sub>, Cap<sub>hard</sub>)))</p>
                </div>
                
                <div class="space-y-3">
                    <div class="bg-slate-700/50 p-3 rounded border border-slate-600 text-[11px] text-gray-200 space-y-1">
                        <b class="text-green-400 text-xs">Case A: มนุษย์เงินเดือนใช้เงินตึงตัว (ML ประเมินตั้งต้น 90%)</b><br>
                        <span class="text-slate-300">- <b>ตรวจพบพฤติกรรม:</b> พึ่งพาสินเชื่อ (+0.20) และ กับดักไลฟ์สไตล์ (+0.10)</span><br>
                        <span class="text-yellow-400">- <b>คำนวณส่วนลด:</b> 90% &times; (1 - 0.30) = <b>63.0%</b></span><br>
                        <span class="text-red-400">- <b>ชนเพดาน Cap:</b> ไม่มีหนี้วิกฤต (Cap 100%) &rarr; min(63.0%, 100.0%)</span><br>
                        <span class="text-white font-bold">- <b>คะแนนสุทธิ = <span class="text-emerald-400">63.0%</span></b></span>
                    </div>

                    <div class="bg-slate-700/50 p-3 rounded border border-slate-600 text-[11px] text-gray-200 space-y-1">
                        <b class="text-orange-400 text-xs">Case B: เจ้าของธุรกิจหนี้ท่วม (ML ประเมินตั้งต้น 85%)</b><br>
                        <span class="text-slate-300">- <b>ตรวจพบพฤติกรรม:</b> หนี้สินอันตราย (Cap 45%) และ ละเลยความคุ้มครอง (+0.10)</span><br>
                        <span class="text-yellow-400">- <b>คำนวณส่วนลด:</b> 85% &times; (1 - 0.10) = <b>76.5%</b></span><br>
                        <span class="text-red-400">- <b>ชนเพดาน Cap:</b> พบหนี้วิกฤต &rarr; min(76.5%, 45.0%)</span><br>
                        <span class="text-white font-bold">- <b>คะแนนสุทธิ = <span class="text-red-400">45.0%</span></b> (ระบบเข้าแทรกแซงขั้นสูงสุด)</span>
                    </div>
                </div>
            </div>

        </div>
        </div>`
    },
    "math-market": {
        icon: "📉",
        iconClass: "bg-blue-100 text-blue-600",
        title: "ส่วนที่ 9: สมการผลตอบแทนตลาดและสภาวะวิกฤต (Market Dynamics)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700">วิศวกรรมการเงินที่รองรับเหตุการณ์ไม่คาดฝัน (Black Swan) วัฏจักรตลาด (Market Regimes) และความทนทานต่อความเสี่ยงของพอร์ตเกษียณ</p>
        <div class="space-y-5">

            <!-- กล่องที่ 1: ทฤษฎีวิชาการ -->
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-red-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">📚</span> 1. ทฤษฎี: Merton's Jump Diffusion Model</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>ข้อจำกัดของโมเดลทั่วไป:</b> ทฤษฎีการเงินดั้งเดิม (Geometric Brownian Motion) มักประเมินว่าผลตอบแทนกระจายตัวแบบระฆังคว่ำ (Normal Distribution) ซึ่งอธิบายโลกจริงไม่ได้เพราะมองข้าม <b>Fat Tails</b> (วิกฤตที่เกิดบ่อยและรุนแรงกว่าทฤษฎี) อัลกอริทึมนี้จึงเพิ่ม <b>Poisson Process</b> เข้าไปเพื่อจำลอง "การพังทลายของตลาดอย่างฉับพลัน" (Jump)</span>

                <div class="bg-red-50 p-4 rounded-lg font-mono text-[11px] border border-red-100 text-red-900 mb-2 overflow-x-auto touch-pan-x overscroll-x-contain shadow-inner">
                    <p class="text-center font-bold text-[13px] mb-3 whitespace-nowrap">R<sub>yearly</sub> = exp[ (&mu; - &sigma;<sup>2</sup>/2)&Delta;t + &sigma;&radic;&Delta;t Z + J(&pi;) ] - 1</p>
                    <ul class="list-none pl-2 text-[10px] text-red-800 border-t border-red-200 pt-2 space-y-1.5">
                        <li><b>&mu;, &sigma;:</b> อัตราผลตอบแทนคาดหวัง และความผันผวน (SD) ที่ระบบดึงมาจากสินทรัพย์ที่เลือก</li>
                        <li><b>Z:</b> ตัวแปรสุ่มการแกว่งตัวของตลาดแบบปกติ (Brownian Motion)</li>
                        <li><b>J(&pi;):</b> ขนาดของวิกฤต (Jump Size) <i>*จะถูกคำนวณก็ต่อเมื่ออัลกอริทึมสุ่ม Poisson Process (&pi;) เจอวิกฤตเศรษฐกิจเท่านั้น</i></li>
                    </ul>
                </div>
            </div>

            <!-- กล่องที่ 2: ปัจจัยนำเข้าสู่แบบจำลอง (Inputs) -->
            <div class="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-blue-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">⚙️</span> 2. ปัจจัยนำเข้าแบบจำลอง (Simulation Inputs)</b>
                <span class="text-xs text-gray-700 mb-3">ระบบไม่ได้ใช้ตัวเลขลอยๆ แต่จะดึงค่าจากโปรไฟล์ลูกค้าเข้ามารันใน <b>Monte Carlo Simulation 20,000 รอบ</b> ดังนี้:</span>
                
                <ul class="text-xs text-blue-900 space-y-2 list-disc list-inside bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                    <li><b>เงินตั้งต้น (Initial Wealth):</b> มูลค่าพอร์ตลงทุนปัจจุบันทั้งหมดรวมกัน</li>
                    <li><b>เงินออมรายปี (DCA):</b> กระแสเงินสดสุทธิ (Income - Expenses) ที่พร้อมลงทุนเพิ่ม</li>
                    <li><b>ระยะเวลา (Time Horizon):</b> จำนวนปีตั้งแต่ปัจจุบันจนถึงอายุขัย (Life Expectancy)</li>
                    <li><b>เงินเฟ้อไดนามิก (Stochastic Inflation):</b> การจำลองค่าครองชีพที่แพงขึ้นแบบแกว่งตัว (ไม่คงที่)</li>
                    <li><b>อัตราผลตอบแทนและความผันผวน (&mu;, &sigma;):</b> อ้างอิงจากแบบประเมินความเสี่ยง (Risk Profile) ของลูกค้า</li>
                    <li><b>หนี้สิน (Leverage Effect):</b> ภาระการผ่อนหนี้ที่บั่นทอนเงินออม (รวมถึงวันปลดหนี้)</li>
                </ul>
            </div>

            <!-- กล่องที่ 3: การแปลผลลัพธ์ผ่าน Case Study -->
            <div class="bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden transform-gpu">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💡</div>
                <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">📊</span> 3. การแปลผลลัพธ์ (Output Interpretation)</b>
                
                <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                    ผลลัพธ์จากแบบจำลองจะแสดงผลเป็น <b>"ความน่าจะเป็นที่แผนเกษียณจะสำเร็จ (Success Probability)"</b> ซึ่งหมายถึง "โอกาสที่เงินจะไม่หมดก่อนสิ้นอายุขัย" ลองเปรียบเทียบ 2 กรณีศึกษา:
                </p>

                <div class="grid md:grid-cols-2 gap-4 relative z-10">
                    <div class="bg-slate-900/80 p-4 rounded border border-slate-600 shadow-inner">
                        <b class="text-green-400 text-xs block mb-1">เคส A: คุณวุฒิ (โอกาสสำเร็จ 95%)</b>
                        <span class="text-[10px] text-gray-400 block mb-2 border-b border-slate-700 pb-2">เด็กจบใหม่, พอร์ต 0 บาท, เป้าหมายเล็ก, ออม 50% ของรายได้</span>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>การแปลผล:</b> แม้จะเจอ "ปีวิกฤต (-25%)" ในแบบจำลอง (J(&pi;)) แต่ด้วยกระแสเงินสดออมที่สูงมาก (50%) ผนวกกับ <b>Time Horizon ที่ยาวถึง 31 ปี</b> ทำให้พอร์ตมีเวลาฟื้นฟูตัวเอง (Recovery Time) ได้ทัน โอกาสที่พอร์ตจะล่มสลายจึงแทบเป็นศูนย์
                        </p>
                    </div>

                    <div class="bg-slate-900/80 p-4 rounded border border-slate-600 shadow-inner">
                        <b class="text-orange-400 text-xs block mb-1">เคส B: คุณสุ (โอกาสสำเร็จ 40%)</b>
                        <span class="text-[10px] text-gray-400 block mb-2 border-b border-slate-700 pb-2">มหาเศรษฐี, พอร์ต 100 ล้าน+, หนี้ธุรกิจสูง, เกษียณปีหน้า</span>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>การแปลผล:</b> เมื่อแบบจำลองสุ่มเจอ "วิกฤตเศรษฐกิจ" ในปีแรกๆ หลังเกษียณ (Sequence of Return Risk) พอร์ต 100 ล้านจะหายไปทันที 25 ล้าน ซ้ำร้ายยังต้อง <b>"ถอนเงินต้น"</b> มาจ่ายหนี้มหาศาลและใช้ชีวิตหรูหรา <b>พอร์ตจึงเข้าสู่สภาวะ "Death Spiral" (เงินต้นร่อยหรอจนทบต้นไม่ขึ้น)</b> โอกาสเงินหมดก่อนอายุขัยจึงสูงมาก
                        </p>
                    </div>
                </div>
            </div>

            <!-- กล่องที่ 4: ภาคปฏิบัติ (Practical Applications) -->
            <div class="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col transform-gpu pb-safe">
                <b class="text-emerald-800 mb-3 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> 4. ภาคปฏิบัติ: การประยุกต์ใช้เพื่อวางแผนหน้างาน (Practical FA Action)</b>
                <span class="text-xs text-gray-700 mb-3">ในการนำแผนไปคุยกับลูกค้า ที่ปรึกษาการเงิน (FA) สามารถใช้กลไกเบื้องหลังของระบบเพื่อแก้ปัญหาและตอบข้อโต้แย้งได้ดังนี้:</span>

                <div class="space-y-3">
                    <!-- สถานการณ์ที่ 1 -->
                    <div class="bg-white p-3.5 rounded-lg border border-emerald-100 shadow-sm transition-all duration-300 active:scale-[0.98] transform-gpu hover:shadow-md">
                        <b class="text-[12px] text-emerald-700 block mb-1">🛡️ รับมือความเสี่ยงพอร์ตพังวันเกษียณ (Sequence of Return Risk)</b>
                        <p class="text-[11px] text-gray-600 leading-relaxed">
                            <b>ปัญหา:</b> ลูกค้ากังวลว่า "ถ้าเกษียณปีแรกแล้วเจอวิกฤตต้มยำกุ้งเลย พอร์ตไม่พังเหรอ?"<br>
                            <b>กลไกของระบบ:</b> โมเดลนี้ได้ฝังกลยุทธ์ <b>Cash Buffer (Bucket Strategy)</b> ไว้เรียบร้อยแล้ว หากจำลองแล้วพบว่าผลตอบแทนติดลบรุนแรง (Market Crash) ระบบจะสั่งดึง <i>"เงินสดสำรองปลอดภัย"</i> ออกมาจ่ายเป็นค่าครองชีพแทนการ "บังคับขายหุ้นขาดทุน (Forced Sale)" เพื่อซื้อเวลาให้พอร์ตหุ้นฟื้นตัว<br>
                            <span class="text-emerald-600 font-semibold mt-1 block">💬 บทสนทนา FA: "แผนของผมออกแบบมาเผื่อวิกฤตแล้วครับ เรามีถังเงินสดเตรียมไว้รับแรงกระแทกเรียบร้อย ไม่ต้องขายสินทรัพย์หนีตายในช่วงตลาดแย่แน่นอน"</span>
                        </p>
                    </div>

                    <!-- สถานการณ์ที่ 2 -->
                    <div class="bg-white p-3.5 rounded-lg border border-emerald-100 shadow-sm transition-all duration-300 active:scale-[0.98] transform-gpu hover:shadow-md">
                        <b class="text-[12px] text-emerald-700 block mb-1">📉 กฎการถอนเงินแบบยืดหยุ่น (Dynamic Withdrawal Rule)</b>
                        <p class="text-[11px] text-gray-600 leading-relaxed">
                            <b>ปัญหา:</b> ลูกค้ายึดติดกับการถอนเงินใช้เท่าเดิมในทุกสภาวะเศรษฐกิจ<br>
                            <b>กลไกของระบบ:</b> ระบบใช้ตรรกะแบบ Guyton-Klinger หากสุ่มเจอปีที่วิกฤตหนัก ระบบจะจำลอง <b>"การลดค่าใช้จ่ายลง (ตัดงบฟุ่มเฟือย)"</b> โดยอัตโนมัติ เพื่อสงวนเงินต้นไว้ แต่ถ้ารูปการณ์ยังแย่อยู่ (ความน่าจะเป็น < 50%) ระบบจะประเมินให้อายุเงินหมดไวขึ้น<br>
                            <span class="text-emerald-600 font-semibold mt-1 block">💬 บทสนทนา FA: "ความเสี่ยงนี้แก้ได้ง่ายๆ ครับ ถ้าพอร์ตเราเจอวิกฤตหนักจริงๆ เราอาจต้องตกลงกันว่าในปีนั้นเราจะลดไลฟ์สไตล์ หรือเที่ยวน้อยลงสักนิด เพื่อให้พอร์ตยังมีชีวิตรอดไปจนถึงอายุขัยครับ"</span>
                        </p>
                    </div>

                    <!-- สถานการณ์ที่ 3 -->
                    <div class="bg-white p-3.5 rounded-lg border border-emerald-100 shadow-sm transition-all duration-300 active:scale-[0.98] transform-gpu hover:shadow-md">
                        <b class="text-[12px] text-emerald-700 block mb-1">🎛️ ใช้โหมด "What-If" หาจุดสมดุล (Trade-off Matrix)</b>
                        <p class="text-[11px] text-gray-600 leading-relaxed">
                            <b>ปัญหา:</b> โอกาสสำเร็จต่ำกว่า 50% แต่ลูกค้าไม่อยากซื้อประกันบำนาญเพิ่มและไม่ยอมลดเป้าหมาย<br>
                            <b>กลไกของระบบ:</b> ใช้แถบเลื่อน <b>Trade-off Playground (โหมดจำลอง)</b> เพื่อหาจุดร่วมที่ลูกค้าเจ็บปวดน้อยที่สุด<br>
                            <span class="text-emerald-600 font-semibold mt-1 block">💬 บทสนทนา FA: เลื่อนแถบให้ลูกค้าดูแบบ Real-time เช่น "ถ้าคุณลูกค้าไม่พร้อมออมเพิ่ม งั้นเราลองเลื่อนอายุเกษียณจาก 60 ไปเป็น 62 ปีดูไหมครับ? โอกาสสำเร็จของพอร์ตจะเด้งจาก 40% กลับมาเป็น 85% ทันทีโดยไม่ต้องควักเงินเพิ่มเลย"</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
        </div>`
    },
    "math-accum": {
        icon: "📈",
        iconClass: "bg-blue-100 text-blue-600",
        title: "ส่วนที่ 10: กลไกช่วงสะสมความมั่งคั่ง (Accumulation Phase Dynamics)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700">จำลองการเติบโตของพอร์ตลงทุนแบบความน่าจะเป็น (Stochastic Growth) ก่อนวัยเกษียณ ผ่าน Monte Carlo Simulation เพื่อวางแผนสัดส่วนสินทรัพย์อย่างมีพลวัต</p>
        <div class="space-y-5">
            
            <!-- กล่องที่ 1: Dynamic Glide Path -->
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-blue-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">🛤️</span> 1. โมเดลปรับลดความเสี่ยงอัตโนมัติ (Dynamic Glide Path Model)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>สมมติฐานทางวิชาการ:</b> โปรแกรมจะไม่ใช้ผลตอบแทนคงที่ แต่จะปรับลดค่าคาดหวังผลตอบแทน (&mu;) และความผันผวน (&sigma;) ตามระยะเวลาที่เหลือจนถึงเกษียณ (T) ด้วยสมการ Linear Interpolation เพื่อลด <b>Sequence of Return Risk</b> (ความเสี่ยงจากลำดับผลตอบแทนที่เลวร้ายในช่วงใกล้เกษียณ)</span>
                
                <div class="bg-blue-50 p-4 rounded-lg font-mono text-[11px] border border-blue-100 text-blue-900 space-y-2 mb-3 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="font-bold border-b border-blue-200 pb-1 mb-2 text-[12px] whitespace-nowrap">Linear Interpolation Equation:</p>
                    <p class="text-center text-[13px] font-bold whitespace-nowrap">&sigma;<sub>t</sub> = &sigma;<sub>start</sub> - [ (&sigma;<sub>start</sub> - &sigma;<sub>target</sub>) &times; (t / T) ]</p>
                </div>

                <div class="bg-white p-4 rounded-lg border border-gray-200 text-[11px] text-gray-700 mb-3 space-y-2 shadow-sm">
                    <b class="text-blue-800 text-xs">🔍 Case Study การทำงานของระบบ:</b><br>
                    <span>ลูกค้าอายุ 50 ปี (เหลือ 10 ปีก่อนเกษียณ) มีพอร์ตเติบโตสูง (&mu;=8%, &sigma;=15%) โปรแกรมจะตั้งเป้าหมายพอร์ตวัยเกษียณที่ปลอดภัย (&mu;=4%, &sigma;=5%)</span><br>
                    <span class="text-orange-600 font-semibold block mt-1 p-2 bg-orange-50 rounded border border-orange-100">&rarr; ระบบจะจำลองลดความผันผวน (&sigma;) ลงปีละ 1% อัตโนมัติ: ปีที่ 51(&sigma;=14%), ปีที่ 52(&sigma;=13%)... ไปจนถึงปีที่ 60(&sigma;=5%)</span>
                </div>
            </div>

            <!-- กล่องที่ 2: Stochastic Wealth Equation -->
            <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-indigo-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">🎲</span> 2. สมการทบต้นความมั่งคั่งเชิงสถิติ (Stochastic Wealth Accumulation)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>กลไกการคำนวณ:</b> ตัวแปร R<sub>t</sub> ไม่ใช่ค่าคงที่ (Deterministic) แต่เป็น <b>ตัวแปรสุ่ม (Random Variable)</b> ที่ดึงมาจาก Log-Normal Distribution ทำให้การจำลอง 20,000 ครั้ง จะเกิดเส้นทางความมั่งคั่ง (Wealth Paths) ที่แตกต่างกันออกไปอย่างสิ้นเชิง</span>
                
                <div class="mt-2 mb-3 bg-white p-4 rounded-lg font-mono text-[13px] border border-indigo-100 text-center font-bold text-indigo-900 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <span class="whitespace-nowrap">W<sub>t</sub> = [ W<sub>t-1</sub> &times; (1 + R<sub>t</sub>) ] + Savings<sub>t</sub></span>
                </div>

                <div class="bg-white p-4 rounded-lg border border-indigo-100 text-[11px] text-gray-700 mb-2 space-y-2 shadow-sm">
                    <b class="text-indigo-800 text-xs">🔍 ตัวอย่างจำลอง 2 เส้นทาง (เงินต้น 1M, ออมเพิ่ม 100K/ปี):</b><br>
                    <div class="space-y-1.5 mt-1">
                        <p class="text-green-700 border-l-2 border-green-500 pl-2 bg-green-50/50 py-1">- <b>เส้นทางโชคดี (95th Percentile):</b> ตลาดเป็นขาขึ้นต่อเนื่อง R<sub>t</sub> สุ่มได้ +15%, +10% ฯลฯ ตอนจบพอร์ตอาจโตทะลุ 5 ล้านบาท</p>
                        <p class="text-red-600 border-l-2 border-red-500 pl-2 bg-red-50/50 py-1">- <b>เส้นทางโชคร้าย (5th Percentile):</b> ตลาดผันผวนหนัก R<sub>t</sub> สุ่มเจอ -20%, +5%, -10% พอร์ตอาจจบแค่ 1.5 ล้านบาท</p>
                    </div>
                </div>
            </div>

            <!-- กล่องที่ 3: ภาคปฏิบัติ (Practical FA Application) -->
            <div class="bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden transform-gpu pb-safe">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💬</div>
                <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> 3. ภาคปฏิบัติ: วิธีแปลผลกราฟและตัวเลขเพื่อนำเสนอลูกค้า (FA Action Plan)</b>
                
                <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                    ระบบได้สร้าง <b>ตารางคาดการณ์พอร์ตสินทรัพย์ 5 ปีแรก (5-Year Stress Test)</b> ไว้ด้านล่างกราฟ ซึ่งเป็นเครื่องมือทรงพลังที่สุดในการช่วยให้ลูกค้าเข้าใจถึง "ราคาของความเสี่ยง" และ "พลังของ DCA"
                </p>

                <div class="space-y-3 relative z-10">
                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                        <b class="text-yellow-400 text-xs block mb-1">📉 กรณีเลวร้ายที่สุด 5% (Worst-case Scenario / CVaR)</b>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>ที่มาของตัวเลข:</b> ตัวเลขสีแดงในวงเล็บ (เช่น -25%) มาจากการตัดกราฟเส้นทางจำลอง 20,000 เส้นทิ้งไป 95% แล้วหา <b>"ค่าเฉลี่ยของจุดที่ต่ำที่สุด 5% สุดท้าย"</b> (Conditional Value at Risk)<br>
                            <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ ตารางนี้ไม่ได้ฉายภาพฝันหวาน แต่เราจำลองวิกฤตที่หนักหน่วงที่สุด 5% มาให้ดูเลยครับ ถ้าพอร์ต 10 ล้านของคุณร่วงลงไปเหลือ 7.5 ล้าน (-25%) ในปีแรก คุณลูกค้าคิดว่ายังสามารถถือพอร์ตต่อไปได้โดยไม่ตกใจขายทิ้งไหมครับ? ถ้าไม่ได้... เราต้องลดความเสี่ยงลงมาที่ Plan B ครับ"</span>
                        </p>
                    </div>

                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                        <b class="text-emerald-400 text-xs block mb-1">📈 การเติบโตคาดหวัง (Expected Growth)</b>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>ที่มาของตัวเลข:</b> ตัวเลขสีน้ำเงินคือ <b>"ค่ามัธยฐาน (Median หรือ 50th Percentile)"</b> ของเส้นกราฟทั้งหมด เป็นตัวเลขที่มีโอกาสเกิดขึ้นจริงสูงที่สุด ไม่โลกสวยเกินไปและไม่เลวร้ายเกินไป<br>
                            <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "แม้เราจะเจอวิกฤตระหว่างทาง แต่ตราบใดที่คุณลูกค้ารักษาวินัยการออม (DCA) ตามแผนที่ระบบคำนวณไว้ให้ การซื้อของถูกในช่วงตลาดตก จะช่วยดึงค่าเฉลี่ยกลับมา (Expected) และทำให้พอร์ตเติบโตถึงเป้าหมายได้ในระยะยาวครับ"</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
        </div>`
    },
    "math-decum": {
        icon: "🏛️",
        iconClass: "bg-blue-100 text-blue-600",
        title: "ส่วนที่ 11: กลไกหลังเกษียณและประเมินความเสี่ยงขาลง (Decumulation & Tail Risk)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-3 text-sm text-gray-700">กลยุทธ์ป้องกันเงินหมดก่อนตาย (Longevity Risk) และการบริหารกระแสเงินสดภายใต้ความผันผวน</p>
        <div class="space-y-5">
            
            <!-- กล่องที่ 1: Guyton-Klinger -->
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-purple-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">📉</span> 1. ทฤษฎีถอนเงินแบบไดนามิก (Guyton-Klinger Decision Rules)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">อัลกอริทึมนี้เหนือกว่ากฎ 4% ทั่วไป ด้วยการใช้ <b>Capital Preservation Rule</b> เพื่อเตือนให้ปรับลดยอดถอนเมื่อตลาดทรุด ป้องกันภาวะ Sequence of Return Risk ในช่วงต้นของการเกษียณ</span>
                
                <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 text-[11px] text-purple-900 mb-3 space-y-2 shadow-inner">
                    <p class="font-bold border-b border-purple-200 pb-1 mb-2 text-[12px]">ตัวอย่างการทำงานของอัลกอริทึมในโปรแกรม:</p>
                    <ul class="list-disc list-inside text-gray-700 space-y-1.5">
                        <li><b>ตั้งต้น:</b> พอร์ต 10 ล้านบาท ถอนปีแรก 400,000 บาท (อัตราถอนเริ่มต้น IWR = 4%)</li>
                        <li><b>วิกฤต:</b> ปีถัดมาหุ้นตก พอร์ตหดเหลือ 8 ล้าน (หากถอน 400,000 เท่าเดิม อัตราถอนปัจจุบัน CWR จะกลายเป็น 5%)</li>
                        <li><b>Trigger:</b> อัลกอริทึมตรวจพบว่า CWR (5%) สูงกว่า IWR (4%) <b>เกิน 20%</b> ระบบจะสั่ง Trigger กฎลดการถอนทันที</li>
                        <li><b>Action:</b> ระบบปรับลดยอดถอนลง 10% (เหลือ 360,000 บาท/ปี) เพื่อยืดอายุพอร์ตไม่ให้พังทลาย</li>
                    </ul>
                </div>
            </div>

            <!-- กล่องที่ 2: CVaR -->
            <div class="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-red-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">🌪️</span> 2. การประเมินความเสี่ยงด้านหาง (Tail Risk: Expected Shortfall / CVaR)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">Value at Risk (VaR) บอกแค่ว่า "โอกาสขาดทุนสูงสุดอยู่ที่เท่าไหร่" แต่ CVaR (Conditional VaR) เจาะลึกระดับสถาบันการเงินเพื่อตอบคำถามว่า <b>"ถ้าทะลุจุด VaR ไปแล้ว โดยเฉลี่ยพอร์ตจะพังแค่ไหน"</b></span>
                
                <div class="mt-2 mb-3 font-mono text-[13px] bg-white p-4 border border-red-200 rounded-lg text-center font-bold text-red-900 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <span class="whitespace-nowrap">CVaR<sub>95%</sub>(X) = E[ X | X &le; VaR<sub>95%</sub>(X) ]</span>
                </div>

                <div class="bg-white p-4 rounded border border-red-100 text-[11px] text-gray-700 mb-2 space-y-2 shadow-sm">
                    <b class="text-red-800 text-xs">🔍 Case Study การแปลผลให้ลูกค้า (พอร์ต 10 ล้านบาท):</b><br>
                    <div class="space-y-1.5 mt-1">
                        <p class="text-orange-600 border-l-2 border-orange-500 pl-2 bg-orange-50/50 py-1">- <b>VaR (95%) = -15%:</b> มั่นใจ 95% ว่าพอร์ตจะไม่ขาดทุนเกิน 1.5 ล้านบาท</p>
                        <p class="text-red-700 border-l-2 border-red-500 pl-2 bg-red-50/50 py-1">- <b>CVaR (95%) = -22%:</b> <b>แต่ถ้าเกิดแจ็คพอตวิกฤตเศรษฐกิจ (Worst 5%)</b> ค่าเฉลี่ยความเสียหายคือการติดลบถึง 2.2 ล้านบาท (รุนแรงกว่า VaR มาก)</p>
                    </div>
                </div>
            </div>

            <!-- กล่องที่ 3: ภาคปฏิบัติ (Practical FA Application) -->
            <div class="bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden transform-gpu pb-safe">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💬</div>
                <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> 3. ภาคปฏิบัติ: วิธีแปลผลและนำเสนอลูกค้า (FA Action Plan)</b>
                
                <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                    การนำเสนอเรื่อง "การลดยอดถอนเงิน" หรือ "วิกฤตเศรษฐกิจ" อาจทำให้ลูกค้ากังวล FA จึงต้องใช้ศิลปะในการแปลผลตัวเลขคณิตศาสตร์เหล่านี้ให้กลายเป็น <b>"ทางออกที่จับต้องได้"</b>
                </p>

                <div class="space-y-3 relative z-10">
                    <!-- Situation 1 -->
                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                        <b class="text-purple-400 text-xs block mb-1">📉 การแปลผลกฎลดยอดถอน (Guyton-Klinger)</b>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>ที่มา:</b> เมื่อโปรแกรมแจ้งเตือนว่าต้องลดยอดใช้จ่ายลง 10% (จาก 400,000 เหลือ 360,000 บาท) ลูกค้าอาจรู้สึกว่าแผนล้มเหลว<br>
                            <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ ตัวเลขที่ระบบแนะนำให้ลดการใช้จ่ายลง 10% ในปีนี้ ไม่ได้แปลว่าเงินเราจะหมดนะครับ แต่ระบบกำลังทำหน้าที่เป็น 'เบรกฉุกเฉิน' เหมือนเราขับรถเจอพายุ เราแค่ชะลอความเร็วลงนิดหน่อย พอพายุผ่านไปตลาดหุ้นฟื้นตัว เราก็สามารถกลับมาถอนเงินได้เท่าเดิมครับ การยอมลดไลฟ์สไตล์ลงเดือนละนิด แลกกับการมีพอร์ตที่ยั่งยืนไปตลอดชีวิต คุ้มค่าและปลอดภัยกว่าการฝืนถอนกินเงินต้นครับ"</span>
                        </p>
                    </div>

                    <!-- Situation 2 -->
                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                        <b class="text-red-400 text-xs block mb-1">🌪️ การขายประกันบำนาญด้วยความเสี่ยงด้านหาง (Tail Risk / CVaR)</b>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>ที่มา:</b> ตารางจำลอง 5 ปีโชว์ให้เห็นค่า CVaR ที่ติดลบรุนแรง (-22% หรือหายไป 2.2 ล้านบาท) ซึ่งทำให้ลูกค้าตระหนักถึงความเสี่ยง<br>
                            <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ ตัวเลขสีแดง -22% ตรงนี้คือเหตุการณ์เลวร้ายที่สุด 5% (Worst-case Scenario) ที่ระบบวิเคราะห์ไว้ครับ ถ้าโชคร้ายเกิดวิกฤตในปีแรกที่เราเกษียณ เงิน 10 ล้านจะหายวับไป 2.2 ล้าน... ถ้ารู้สึกกังวลกับตัวเลขนี้ ผมขอเสนอ 'โครงสร้างปกป้องเงินทุน' โดยเราจะแบ่งเงินสัก 3-5 ล้าน มาจัดสรรใน <b>ประกันบำนาญ (AIA Annuity)</b> ครับ เครื่องมือนี้จะสร้าง 'พื้นพยุง (Floor)' ที่ให้กระแสเงินสดคงที่ทุกปี ไม่มีวันติดลบแม้ตลาดหุ้นจะพังทลาย ทำให้คุณลูกค้ามีเงินใช้ชีวิตพื้นฐานได้อย่างสบายใจ 100% ครับ"</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
        </div>`
    },
    "math-knapsack": {
        icon: "🎒",
        iconClass: "bg-emerald-100 text-emerald-700",
        title: "ส่วนที่ 12: อัลกอริทึมจัดกระเป๋าผลิตภัณฑ์ (DP Knapsack & Optimization)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700">การจัดสรรงบประมาณที่มีจำกัด เพื่อซื้อผลิตภัณฑ์การเงินให้ได้ "อรรถประโยชน์รวมสูงสุด" (Maximum Total Utility) โดยไม่ทำให้กระแสเงินสดพังทลาย</p>
        <div class="space-y-5">
            
            <!-- กล่องที่ 1: ทฤษฎีวิชาการ -->
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-emerald-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">📚</span> 1. ทฤษฎี: Dynamic Programming & Multi-Objective Optimization</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">ประยุกต์ใช้ <b>0/1 Knapsack Problem</b> ในการตัดสินใจเลือกผลิตภัณฑ์ (เลือก = 1, ไม่เลือก = 0) โดยมีเงื่อนไขผูกพันคือ งบประมาณ (Capacity constraints) ร่วมกับการหา <b>Pareto Frontier</b> เพื่อรักษาสมดุลระหว่างเป้าหมายที่ขัดแย้งกัน (เช่น อยากได้ทุนชีวิตสูงๆ แต่ก็อยากได้ค่ารักษาระดับพรีเมียม ในงบที่จำกัด)</span>
                
                <div class="bg-emerald-50 p-4 rounded-lg font-mono text-[11px] border border-emerald-100 text-emerald-900 space-y-2 mb-2 overflow-x-auto touch-pan-x overscroll-x-contain shadow-inner">
                    <p class="font-bold border-b border-emerald-200 pb-1 mb-2 text-[12px] whitespace-nowrap">State Transition Equation:</p>
                    <p class="text-center text-[13px] font-bold whitespace-nowrap">DP[i][w] = max( DP[i-1][w], DP[i-1][w - P<sub>i</sub>] + U<sub>i</sub> )</p>
                    <ul class="list-none pl-2 text-[10px] text-emerald-800 mt-2 border-t border-emerald-200 pt-2 space-y-1">
                        <li class="whitespace-nowrap"><b>i:</b> ผลิตภัณฑ์ชิ้นที่ i, <b>w:</b> งบประมาณปัจจุบัน</li>
                        <li class="whitespace-nowrap"><b>P<sub>i</sub>:</b> เบี้ยประกัน (Cost), <b>U<sub>i</sub>:</b> อรรถประโยชน์ (Utility Score)</li>
                    </ul>
                </div>
            </div>

            <!-- กล่องที่ 2: ตัวอย่าง Case Study -->
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col transform-gpu">
                <b class="text-emerald-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">🧮</span> 2. กลไกการประเมินเพื่อหาจุดที่ดีที่สุด (Optimization Mechanics)</b>
                <span class="text-xs text-gray-700 mb-3"><b>โจทย์:</b> ลูกค้ามีงบประมาณสูงสุด (Budget<sub>max</sub>) = <b>20,000 บาท/ปี</b></span>
                
                <div class="overflow-x-auto touch-pan-x overscroll-x-contain mb-4">
                    <table class="w-full text-[11px] text-left border-collapse border border-gray-200">
                        <thead>
                            <tr class="bg-gray-100 border-b border-gray-300">
                                <th class="p-2 font-semibold text-gray-700 whitespace-nowrap">ผลิตภัณฑ์ (Items)</th>
                                <th class="border-l border-gray-200 p-2 font-semibold text-gray-700 text-right whitespace-nowrap">เบี้ย (P)</th>
                                <th class="border-l border-gray-200 p-2 font-semibold text-gray-700 text-center whitespace-nowrap">คะแนน (U)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr><td class="p-2 whitespace-nowrap">1. สุขภาพเหมาจ่าย (Major Med)</td><td class="border-l border-gray-100 p-2 text-right text-red-600">15,000</td><td class="border-l border-gray-100 p-2 text-center text-emerald-600 font-bold">80</td></tr>
                            <tr><td class="p-2 whitespace-nowrap">2. ประกันชีวิต (ทุนชีวิต)</td><td class="border-l border-gray-100 p-2 text-right text-red-600">4,000</td><td class="border-l border-gray-100 p-2 text-center text-emerald-600 font-bold">40</td></tr>
                            <tr><td class="p-2 whitespace-nowrap">3. ชดเชยรายวัน (HB)</td><td class="border-l border-gray-100 p-2 text-right text-red-600">3,000</td><td class="border-l border-gray-100 p-2 text-center text-emerald-600 font-bold">15</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 text-[11px] text-gray-700 space-y-2 shadow-inner">
                    <b class="text-gray-800 text-xs">AI จำลองจัดกระเป๋า (Knapsack Evaluation):</b><br>
                    <p class="text-gray-500 border-l-2 border-gray-400 pl-2">- <b>Option A (1+3):</b> จ่าย 18,000 บาท | ได้ Utility 95</p>
                    <p class="text-emerald-700 font-bold border-l-2 border-emerald-500 pl-2 bg-emerald-50 py-1">- <b>Option B (1+2): จ่าย 19,000 บาท | ได้ Utility 120 (Winner 🏆)</b></p>
                    <p class="text-red-500 border-l-2 border-red-400 pl-2">- <b>Option C (1+2+3):</b> จ่าย 22,000 บาท | <i>(ตัดทิ้ง! ละเมิด Budget Constraint)</i></p>
                </div>
            </div>

            <!-- กล่องที่ 3: ภาคปฏิบัติ (Practical FA Application) -->
            <div class="bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden transform-gpu pb-safe">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💬</div>
                <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> 3. ภาคปฏิบัติ: การใช้ AI ช่วยตอบข้อโต้แย้ง (FA Action Plan)</b>
                
                <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                    หลายครั้งที่ลูกค้าอยากได้ความคุ้มครองครบทุกด้าน (ทุนชีวิต + ค่ารักษา + ชดเชยรายได้) แต่มีงบประมาณจำกัด อัลกอริทึมนี้จะช่วยให้ FA อธิบายเหตุผลที่ต้อง <b>"เลือกทิ้งบางอย่าง (Trade-off)"</b> ได้อย่างมีตรรกะและดูเป็นมืออาชีพ
                </p>

                <div class="space-y-3 relative z-10">
                    <!-- Situation 1 -->
                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                        <b class="text-emerald-400 text-xs block mb-1">⚖️ กรณีลูกค้าอยากได้ชดเชยรายวัน (HB) แต่ระบบแนะนำให้ตัดทิ้ง</b>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>ที่มา:</b> จากตารางด้านบน AI เลือก Option B (ค่ารักษา + ทุนชีวิต) ทิ้งชดเชยรายวัน เพราะให้ Utility Score (คะแนนคุ้มค่า) น้อยที่สุดเมื่อเทียบกับเบี้ยที่ต้องจ่าย<br>
                            <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ ผมเข้าใจว่าชดเชยรายวันดูน่าสนใจ แต่ด้วยกรอบงบประมาณ 20,000 บาท/ปี AI คำนวณแล้วว่าการจัดพอร์ตแบบ Option B จะปกป้องความมั่งคั่งให้คุณลูกค้าได้คุ้มค่าเงินทุกบาทที่สุดครับ เพราะการปิดรอยรั่วค่ารักษา (15,000) และทุนชีวิต (4,000) ช่วยป้องกันวิกฤตระดับหายนะได้ดีกว่าเอาเงินไปซื้อชดเชยรายวันครับ"</span>
                        </p>
                    </div>

                    <!-- Situation 2 -->
                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                        <b class="text-orange-400 text-xs block mb-1">🎯 กรณีลูกค้าต้องการซื้อเกินงบ (Over-Budgeting)</b>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>ที่มา:</b> ลูกค้าอยากได้ Option C (เอาทุกอย่าง) ซึ่งเกินงบไป 2,000 บาท AI จึงปัดตกทันที (Hard Constraint)<br>
                            <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "ถ้าเราจัดเต็ม Option C (22,000 บาท) มันจะไปเบียดเบียนกระแสเงินสดและเงินออมของคุณลูกค้า ซึ่งระบบ AI ของเรามีกฎเหล็ก (Constraint) ว่า 'ห้ามทำให้ลูกค้าเสี่ยงต่อการขาดสภาพคล่อง' ดังนั้นแผนที่ AI เลือกให้ (19,000 บาท) คือจุด Optimal ที่ปลอดภัยและคุ้มค่าที่สุดในวันนี้ครับ"</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
        </div>`
    },
    "math-taxalpha": {
        icon: "⚖️",
        iconClass: "bg-orange-100 text-orange-600",
        title: "ส่วนที่ 13: อัลกอริทึมประเมินภาษีเชิงรุก (Tax Alpha Engine)",
        content: `
        <div class="antialiased touch-manipulation pb-safe">
        <p class="mb-3 text-sm text-gray-700">ระบบคำนวณประหยัดภาษี (Tax Optimization) อิงตามกฎหมาย ภ.ง.ด. 90/91 (เกณฑ์ล่าสุด)</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col transform-gpu">
                <b class="text-orange-800 mb-1">Greedy Tax Alpha Optimization</b>
                <span class="text-xs text-gray-700 mb-2">อัลกอริทึมจะสแกนช่องว่างลดหย่อนและเลือกลงทุนในช่องทางที่คุ้มค่าที่สุดก่อน <b>โดย AI มีกฎเหล็กคือ จะแนะนำลงทุนพื่อลดหย่อนก็ต่อเมื่อฐานภาษีส่วนเพิ่ม (Marginal Tax Rate) > 10% ขึ้นไปเท่านั้น</b> (เพราะหากฐานภาษีต่ำกว่านี้ การเสียสภาพคล่องไปกับการล็อคเงินลงทุนระยะยาวจะไม่คุ้มค่า)</span>
                <div class="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-3">
                    <ul class="text-[11px] list-decimal list-inside space-y-2 text-orange-900">
                        <li><b>Priority 1: กองทุน Thai ESG</b> (สภาพคล่องดีกว่า เงื่อนไขล็อคแค่ 5 ปี นับจากวันที่ซื้อ)</li>
                        <li><b>Priority 2: RMF / SSF / ประกันบำนาญ</b> (เหมาะสำหรับวางแผนลดหย่อนบวกเกษียณระยะยาว)</li>
                    </ul>
                </div>
                <i class="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> แนะนำให้ลูกค้านำ "เงินคืนภาษี" (Tax Refund) ที่ได้กลับมา Re-invest เสมอ เพื่อสร้างพลังดอกเบี้ยทบต้น (Compound Effect) แบบก้าวกระโดด</i>
            </div>
        </div>
        </div>`
    },
    "term-invest": {
        icon: "📈",
        iconClass: "bg-blue-100 text-blue-600",
        title: "ส่วนที่ 14: การวิเคราะห์และกลยุทธ์การลงทุน (Investment & Strategy)",
        content: `
        <div class="antialiased touch-manipulation">
        <ul class="list-disc list-inside mt-2 space-y-3 text-sm text-gray-700">
            <li><b>Asset Allocation (การจัดสรรสินทรัพย์):</b> หัวใจสำคัญของการลงทุนที่ส่งผลต่อผลตอบแทนระยะยาวถึง 90% เน้นกระจายเงินไปในหลายสินทรัพย์ (หุ้น, ตราสารหนี้, อสังหาฯ) <i>เพื่อลดความผันผวน และควรทำ Portfolio Rebalancing (การปรับสมดุลพอร์ต) อย่างน้อยปีละครั้งเพื่อรักษาระดับความเสี่ยง</i></li>
            <li><b>Expected Shortfall (CVaR 95%):</b> ตัวเลขประเมินความเสี่ยงที่บอกว่า <i>"ในสถานการณ์ตลาดพังพินาศที่สุด 5% พอร์ตเราจะติดลบเฉลี่ยเท่าไหร่"</i> เป็นข้อมูลสำคัญที่ FA ต้องแจ้งเพื่อให้ลูกค้าประเมินความสามารถในการรับความเสี่ยงใน Worst-case scenario ได้</li>
            <li><b>Tax Alpha (ผลตอบแทนส่วนเพิ่มจากภาษี):</b> การสร้าง "กำไรที่ไร้ความเสี่ยงตลาด" ผ่านการวางแผนภาษี (เช่น RMF, SSF, ThaiESG หรือ ประกันชีวิต) <i>หากลูกค้านำเงินคืนภาษีที่ได้ไป Re-invest ต่อเนื่อง จะเกิดพลังของดอกเบี้ยทบต้น (Compound Effect) มหาศาล</i></li>
            <li><b>DCA vs Lump Sum:</b> <b>DCA</b> (ทยอยลงทุนเท่าๆ กัน) ช่วยรักษาวินัย ตัดอารมณ์ตลาด และถัวเฉลี่ยต้นทุน เหมาะกับมนุษย์เงินเดือน | <b>Lump Sum</b> (ลงทุนก้อนเดียว) มักให้ผลตอบแทนโดยรวมดีกว่าในตลาดขาขึ้น แต่ต้องใช้ความชำนาญในการจับจังหวะ (Market Timing)</li>
        </ul>
        
        <div class="mt-5 p-4 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm transform-gpu">
            <h5 class="font-bold text-emerald-900 mb-3 flex items-center gap-2 select-none"><span class="text-lg">🎯</span> กลยุทธ์การจัดพอร์ตแบบ Core & Satellite Strategy</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div class="bg-white p-3 rounded-lg border shadow-sm flex flex-col">
                    <b class="text-emerald-700 text-sm mb-1">Core Portfolio (พอร์ตหลัก 70-80%)</b>
                    <span class="text-gray-800 mb-1"><b>เป้าหมาย:</b> สร้างการเติบโตระยะยาวอย่างมั่นคง ชนะเงินเฟ้อ เพื่อเป้าหมายหลัก (เช่น เกษียณ)</span>
                    <ul class="text-gray-500 mt-auto pt-2 border-t border-gray-100 space-y-1 list-disc list-inside">
                        <li>เน้นลงทุนในสินทรัพย์ที่มีความผันผวนต่ำถึงปานกลาง</li>
                        <li>ใช้กองทุนดัชนี (Passive Fund) ที่ค่าธรรมเนียมต่ำ</li>
                        <li>กระจายความเสี่ยงทั่วโลก (Global Asset Allocation)</li>
                        <li>ปรับพอร์ตไม่บ่อย เน้นถือยาว (Buy & Hold)</li>
                    </ul>
                </div>
                <div class="bg-white p-3 rounded-lg border shadow-sm flex flex-col">
                    <b class="text-orange-600 text-sm mb-1">Satellite Portfolio (พอร์ตรอง 20-30%)</b>
                    <span class="text-gray-800 mb-1"><b>เป้าหมาย:</b> เพิ่มโอกาสรับผลตอบแทนส่วนเพิ่ม (Alpha) และสร้างสีสันให้พอร์ตระยะสั้น-กลาง</span>
                    <ul class="text-gray-500 mt-auto pt-2 border-t border-gray-100 space-y-1 list-disc list-inside">
                        <li>ลงทุนตามธีมเมกะเทรนด์โลก (Thematic) หรือรายประเทศ</li>
                        <li>ใช้กองทุนบริหารเชิงรุก (Active Fund) หรือ หุ้นรายตัว</li>
                        <li>อาจรวมถึงสินทรัพย์ทางเลือก เช่น ทองคำ, Crypto</li>
                        <li>ปรับกลยุทธ์ฉับไวตามสภาวะตลาด (Tactical Move)</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- ภาคปฏิบัติ (Practical FA Application) -->
        <div class="mt-5 bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden transform-gpu pb-safe">
            <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💬</div>
            <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> ภาคปฏิบัติ: การนำไปใช้พูดคุยกับลูกค้า (FA Action Plan)</b>
            
            <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                การอธิบายเรื่องการลงทุนให้ลูกค้าเข้าใจและคล้อยตาม ต้องเปลี่ยนจาก "ภาษาการเงินทางทฤษฎี" เป็น "ผลลัพธ์ที่กระทบกับชีวิต" (Impact & Feelings)
            </p>

            <div class="space-y-3 relative z-10">
                <!-- Situation 1 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                    <b class="text-yellow-400 text-xs block mb-1">📉 ใช้ CVaR ประเมิน "จุดวัดใจ" ของลูกค้า (Risk Tolerance Check)</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ลูกค้าอยากได้ผลตอบแทนสูง (เช่น ขอลงทุนหุ้น 100%) และทำแบบประเมินความเสี่ยงออกมาว่ารับความเสี่ยงได้สูง<br>
                        <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ พอร์ตที่คาดหวังกำไร 10% ต่อปี ระบบจำลองจุดเลวร้ายที่สุด 5% (CVaR) ไว้ว่าพอร์ตอาจติดลบถึง -25% แปลว่าถ้าเราลงทุน 10 ล้าน ในปีวิกฤตเงินอาจวูบหายเหลือ 7.5 ล้านบาทชั่วคราว คุณลูกค้ารับความผันผวนระดับนี้ไหวไหมครับ? ถ้ารู้สึกกังวล เรามาปรับ Asset Allocation เพิ่มตราสารหนี้ให้ปลอดภัยขึ้นดีกว่าครับ"</span>
                    </p>
                </div>

                <!-- Situation 2 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                    <b class="text-emerald-400 text-xs block mb-1">💰 ขาย Tax Alpha เป็น "กำไรไร้ความเสี่ยง" (Risk-Free Return)</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ลูกค้าไม่อยากซื้อกองทุนประหยัดภาษี (RMF/SSF/ThaiESG) หรือประกันแบบสะสมทรัพย์/บำนาญ เพราะรู้สึกว่าถูกล็อกเงินนาน<br>
                        <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "ฐานภาษีของคุณลูกค้าอยู่ที่ 20% การย้ายเงินก้อนนี้มาลงทุนในกองทุนลดหย่อนภาษี หรือ Unit Linked เท่ากับคุณลูกค้าได้ 'กำไรการันตี 20% ทันทีตั้งแต่วันแรก' เลยนะครับ ไม่มีสินทรัพย์ไหนในโลกให้ผลตอบแทนการันตีสูงและปลอดภัยขนาดนี้ ยิ่งถ้านำเงินคืนภาษีนั้นมาออมทบต้นต่อ (Re-invest) พอร์ตเกษียณเราจะถึงเป้าหมายเร็วขึ้นมหาศาลเลยครับ"</span>
                    </p>
                </div>

                <!-- Situation 3 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                    <b class="text-orange-400 text-xs block mb-1">🎯 คุมความโลภด้วย Core & Satellite Strategy</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ลูกค้าอยากเอาเงินทั้งหมดไปทุ่มกับกองทุนหุ้นกลุ่มเทคโนโลยี (AI/Tech) หรือ สินทรัพย์ทางเลือก เพราะเห็นว่ากำลังเป็นกระแส<br>
                        <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "เทรนด์ AI น่าสนใจมากครับ แต่เพื่อปกป้องเงินก้อนสำคัญของคุณลูกค้า ผมแนะนำให้เราจัดพอร์ตแบบ Core & Satellite ครับ เราจะเอาเงิน 80% (Core) วางในกองทุนดัชนีหุ้นโลกเพื่อความมั่นคงระยะยาว ส่วนอีก 20% (Satellite) เราแบ่งมาลุยหุ้น Tech หรือสินทรัพย์ทางเลือกตามที่คุณลูกค้าสนใจ วิธีนี้พอร์ตเกษียณหลักของเราก็ปลอดภัย และเรายังไม่ตกรถกระแสโลกด้วยครับ"</span>
                    </p>
                </div>
            </div>
        </div>
        </div>`
    },
    "term-behavior": {
        icon: "🎭",
        iconClass: "bg-gray-100 text-gray-600",
        title: "ส่วนที่ 15: จิตวิทยาและพฤติกรรมทางการเงิน (Behavioral Finance & DISC)",
        content: `
        <div class="antialiased touch-manipulation">
        <ul class="list-disc list-inside mt-2 space-y-3 text-sm text-gray-700">
            <li><b>Loss Aversion (อคติเกลียดกลัวการขาดทุน):</b> มนุษย์จะรู้สึกเจ็บปวดกับการเสียเงิน มากกว่าความสุขที่ได้เงินจำนวนเท่ากันถึง 2 เท่า <i>ส่งผลให้มัก "ถือหุ้นติดดอย" เพราะไม่อยากรับรู้การขาดทุน และรีบ "ขายหมู" เพราะกลัวกำไรหาย</i></li>
            <li><b>Mental Accounting (การแบ่งบัญชีในใจ):</b> อคติที่คนเราให้มูลค่าของเงินไม่เท่ากันตาม "ที่มา" เช่น ได้โบนัสมามักจะนำไปซื้อของฟุ่มเฟือยได้ง่ายกว่าเงินเดือน ทั้งที่มูลค่าเงินเท่ากัน</li>
            <li><b>Lifestyle Creep (กับดักไลฟ์สไตล์):</b> ภาวะที่ค่าใช้จ่ายรายเดือนขยับเพิ่มขึ้นเงียบๆ ตามรายได้ที่สูงขึ้น (Parkinson's Law) ทำให้หาเงินได้มากแค่ไหนก็ไม่มีเงินเก็บ <i>วิธีแก้คือต้องทำระบบหักเงินออมอัตโนมัติ (Automated Savings)</i></li>
            <li><b>Debt Clearance Strategy (กลยุทธ์ปลดหนี้):</b> <br>
                <b>Snowball:</b> โปะยอดน้อยสุดก่อนเพื่อสร้างกำลังใจ (เน้นผลทางจิตวิทยา) | <br>
                <b>Avalanche:</b> โปะหนี้ดอกเบี้ยแพงสุดก่อนเพื่อลดภาระโดยรวม (เน้นผลทางคณิตศาสตร์)
            </li>
        </ul>
        <div class="mt-5 p-4 bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm transform-gpu">
            <h5 class="font-bold text-indigo-900 mb-3 flex items-center gap-2 select-none"><span class="text-lg">🗣️</span> ทฤษฎีพฤติกรรมลูกค้า (DISC Personality Model)</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div class="bg-white p-3 rounded-lg border shadow-sm flex flex-col">
                    <b class="text-red-600 text-sm mb-1">D - Dominance (สไตล์ผู้นำ กล้าเสี่ยง)</b>
                    <span class="text-gray-800 mb-1"><b>ลักษณะ:</b> ตัดสินใจเร็ว เน้นผลลัพธ์ (Bottom Line) ไม่ชอบรายละเอียดจุกจิก</span>
                    <i class="text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> นำเสนอแบบกระชับ สรุปตัวเลขผลตอบแทนสุทธิ (ROI) ชัดเจน และให้ทางเลือก 2-3 ทางเพื่อให้เขาเป็นผู้ควบคุมการตัดสินใจเอง</i>
                </div>
                <div class="bg-white p-3 rounded-lg border shadow-sm flex flex-col">
                    <b class="text-yellow-600 text-sm mb-1">I - Influence (สไตล์เข้าสังคม ซื้อไอเดีย)</b>
                    <span class="text-gray-800 mb-1"><b>ลักษณะ:</b> มองโลกแง่ดี อาจใช้จ่ายตามอารมณ์ สนใจภาพใหญ่มากกว่าตัวเลข</span>
                    <i class="text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> ใช้ Storytelling ขายภาพความสำเร็จและเป้าหมายชีวิต เลี่ยงตารางที่ซับซ้อน และควรช่วยลูกค้าตั้งระบบออมอัตโนมัติเพราะมักลืมวินัย</i>
                </div>
                <div class="bg-white p-3 rounded-lg border shadow-sm flex flex-col">
                    <b class="text-green-600 text-sm mb-1">S - Steadiness (สไตล์มั่นคง ระมัดระวัง)</b>
                    <span class="text-gray-800 mb-1"><b>ลักษณะ:</b> ให้ความสำคัญกับความปลอดภัย ไม่ชอบความเสี่ยงหรือการเปลี่ยนแปลงกะทันหัน</span>
                    <i class="text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> นำเสนอแผนที่เน้นปกป้องเงินต้น (Capital Protection) สร้างความไว้วางใจ อธิบายอย่างใจเย็น และให้เวลาเขาไปปรึกษาครอบครัว</i>
                </div>
                <div class="bg-white p-3 rounded-lg border shadow-sm flex flex-col">
                    <b class="text-blue-600 text-sm mb-1">C - Conscientious (สไตล์นักวิเคราะห์)</b>
                    <span class="text-gray-800 mb-1"><b>ลักษณะ:</b> เจ้าระเบียบ ต้องการความสมบูรณ์แบบ ขี้สงสัย และขับเคลื่อนด้วยเหตุผล</span>
                    <i class="text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> เตรียมหลักฐานเชิงประจักษ์ Factsheet สถิติย้อนหลัง กราฟเปรียบเทียบข้อดีข้อเสีย และพร้อมตอบคำถามลงลึกด้วยตรรกะ</i>
                </div>
            </div>
        </div>

        <!-- ภาคปฏิบัติ (Practical FA Application) -->
        <div class="mt-5 bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden transform-gpu pb-safe">
            <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💬</div>
            <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> ภาคปฏิบัติ: จิตวิทยาการพูดคุยเพื่อเปลี่ยนพฤติกรรม (FA Action Plan)</b>
            
            <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                การเข้าใจตัวเลขคณิตศาสตร์เพียงอย่างเดียวไม่อาจเปลี่ยนพฤติกรรมลูกค้าได้ FA ที่เก่งต้องใช้ "อคติ (Bias)" ของมนุษย์ให้เป็นประโยชน์ในการโน้มน้าวใจ
            </p>

            <div class="space-y-3 relative z-10">
                <!-- Situation 1 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                    <b class="text-emerald-400 text-xs block mb-1">🧠 โจมตีด้วย Loss Aversion (เมื่อลูกค้ากลัวการลงทุน)</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ลูกค้าไม่ยอมย้ายเงินจากบัญชีออมทรัพย์มาลงทุน (Lifestyle Creep หรือ Cash Hoarder) เพราะกลัวขาดทุน (Loss Aversion)<br>
                        <b>ทริคจิตวิทยา:</b> ย้าย "ความเจ็บปวด" จากการกลัวหุ้นตก ไปเป็น "ความเจ็บปวด" จากการโดนเงินเฟ้อกัดกินแทน<br>
                        <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ ผมเข้าใจเลยว่าการลงทุนมีความเสี่ยงที่เงินจะลดลง แต่วันนี้การฝากเงินสดทิ้งไว้เฉยๆ ไม่ใช่ 'ความเสี่ยง' นะครับ แต่คือ 'การการันตีขาดทุน 100%' จากเงินเฟ้อที่ 3% ทุกปี... แปลว่าอีก 10 ปี เงิน 1 ล้านจะซื้อของได้เท่ากับ 7 แสนบาท เรามาย้ายเงินบางส่วนมาตั้งรับการขาดทุนตรงนี้ด้วยพอร์ตความเสี่ยงต่ำกันดีไหมครับ?"</span>
                    </p>
                </div>

                <!-- Situation 2 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                    <b class="text-yellow-400 text-xs block mb-1">🏷️ Hack พฤติกรรมด้วย Mental Accounting (การตั้งชื่อบัญชี)</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ลูกค้าเงินเดือนสูง แต่ไม่มีเงินเก็บ พอมีเงินในบัญชีเยอะก็เผลอใช้จ่ายหมด (Lifestyle Creep)<br>
                        <b>ทริคจิตวิทยา:</b> มนุษย์มักจะนำเงิน "โบนัส" ไปกินเที่ยว เพราะให้ค่ามันน้อยกว่า "เงินเดือน" ทั้งที่มูลค่าเท่ากัน เราจึงต้องสร้างบัญชีใหม่แล้วตั้งชื่อให้ดูศักดิ์สิทธิ์ ลูกค้าจะไม่กล้าถอนมาใช้ฟุ่มเฟือย<br>
                        <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "เพื่อให้กระแสเงินสดของคุณลูกค้าดีขึ้น เรามาเปิดบัญชี AIA Unit Linked แบบตัดผ่านบัตรเครดิตอัตโนมัติกันครับ เราจะตั้งชื่อพอร์ตนี้ว่า 'กองทุนการศึกษาน้อง A' หรือ 'พอร์ตเกษียณหรูหรา' พอสิ้นเดือนเงินถูกกันมาใส่กองนี้ คุณลูกค้าจะสบายใจในการใช้เงินก้อนที่เหลือได้เต็มที่โดยไม่รู้สึกผิดเลยครับ"</span>
                    </p>
                </div>

                <!-- Situation 3 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner hover:bg-slate-900 transition-colors">
                    <b class="text-purple-400 text-xs block mb-1">🎯 การขายสินค้า 1 ตัว ให้เข้ากับคน 4 สไตล์ (DISC Application)</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ต้องการนำเสนอ <b>AIA 20 Pay Life + สุขภาพเหมาจ่าย</b> ให้กับลูกค้าแต่ละสไตล์<br>
                        <ul class="list-disc list-inside mt-1.5 space-y-1">
                            <li><span class="text-cyan-300 font-semibold">ขายคนกลุ่ม D:</span> "แผนนี้การันตีทุน 1 ล้าน จ่ายเบี้ยตายตัว 20 ปีจบ ไม่มียืดเยื้อ คุณพี่จะได้เพดานรักษา 5 ล้านทันที ตรงไปตรงมาครับ เซ็นชื่อตรงนี้ได้เลย"</li>
                            <li><span class="text-cyan-300 font-semibold">ขายคนกลุ่ม I:</span> "ลองจินตนาการดูนะครับว่า ถ้าเราอายุ 60 แล้วป่วย เราจะได้นอนห้องเดี่ยวระดับวีไอพี มีพยาบาลดูแลอย่างดี โดยที่เงินเก็บไปเที่ยวรอบโลกของเราไม่กระเทือนเลย แผนนี้ตอบโจทย์ไลฟ์สไตล์แบบนั้นเลยครับ"</li>
                            <li><span class="text-cyan-300 font-semibold">ขายคนกลุ่ม S:</span> "แผนนี้เป็นแบบดั้งเดิมที่บริษัท AIA ขายมานานและมั่นคงที่สุดครับ เบี้ยประกันคงที่ตลอด 20 ปี คุณพี่สามารถค่อยๆ ปรึกษากับครอบครัวก่อนตัดสินใจได้ครับ"</li>
                            <li><span class="text-cyan-300 font-semibold">ขายคนกลุ่ม C:</span> "นี่คือตาราง IRR ครับคุณพี่ จะเห็นว่าแผนนี้มีจุดคุ้มทุน (Break-even) ในปีที่ 18 และค่าเบี้ยสุขภาพที่แนบเข้าไปเมื่อเทียบกับอัตราเงินเฟ้อแพทย์ที่ 8% ถือเป็นการ Transfer Risk ที่คุ้มค่าทางสถิติมากครับ"</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
        </div>`
    },
    "term-success-prob": {
        icon: "🧠",
        iconClass: "bg-indigo-100 text-indigo-600",
        title: "ส่วนที่ 16: เจาะลึกสมองกล AI (Understanding Success Probability)",
        content: `
        <div class="space-y-5 text-sm text-gray-700 leading-relaxed antialiased touch-manipulation pb-safe">
            <p class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                ระบบ <b>AI Success Probability</b> (คะแนนโอกาสความสำเร็จ) ไม่ได้ใช้ประเมินว่า "ใครรวยกว่ากัน" หรือ "ใครมีพอร์ตใหญ่กว่ากัน" แต่เป็นโมเดลคณิตศาสตร์จำลองสถานการณ์ (Monte Carlo Simulation) ที่วิเคราะห์ความยืดหยุ่น (Resilience) ว่า <b>"ใครมีโอกาสเดินไปถึงเป้าหมายของตัวเองโดยที่เงินไม่หมดกลางทางมากกว่ากัน"</b> แม้จะต้องเผชิญกับวิกฤตเศรษฐกิจ ตลาดหุ้นตก หรือเงินเฟ้อก็ตาม
            </p>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg shadow-sm transform-gpu">
                <h4 class="font-bold text-blue-900 text-base mb-3 select-none">🎯 4 ปัจจัยหลักที่ AI ให้น้ำหนักสูงสุด พร้อมตัวอย่าง</h4>
                <ul class="list-none space-y-4">
                    <li>
                        <b>⏳ 1. พลังของเวลา (Time Horizon):</b> เวลาคือกันชนที่ดีที่สุด ยิ่งอายุน้อย หรือมีระยะเวลาลงทุนนาน AI จะบวกคะแนนให้สูงมาก เพราะมีเวลาให้ "ดอกเบี้ยทบต้น" ทำงาน และมีเวลาแก้ตัวหากพอร์ตติดลบ
                        <div class="text-xs text-blue-700 mt-1 bg-blue-100/50 p-2 rounded">
                            <i>ตัวอย่าง: นาย ก. เริ่มลงทุนเดือนละ 5,000 บาท ตอนอายุ 25 ปี จะมีโอกาสสำเร็จสูงกว่า นาย ข. ที่ลงทุนเดือนละ 15,000 บาท แต่เพิ่งมาเริ่มตอนอายุ 45 ปี เนื่องจากระยะเวลาทบต้นต่างกันถึง 20 ปี</i>
                        </div>
                    </li>
                    <li>
                        <b>💵 2. กระแสเงินสดสุทธิ (Net Cash Flow):</b> ต่อให้มีสินทรัพย์ร้อยล้าน แต่ถ้ารายจ่ายสูงกว่ารายรับ (Cash flow ติดลบ) ระบบจะมองว่าเป็น "ระเบิดเวลา" ทันที
                        <div class="text-xs text-blue-700 mt-1 bg-blue-100/50 p-2 rounded">
                            <i>ตัวอย่าง: คนที่มีเงินเก็บ 10 ล้าน แต่เงินช็อตจนต้องถอนเงินเก็บมากินใช้ทุกเดือน AI จะประเมินว่าพังเร็วกว่า คนที่มีเงินเก็บ 1 แสน แต่มียอดเงินเหลือออม (Surplus) เข้าพอร์ตทุกเดือน เพราะคนหลังสามารถช้อนซื้อของถูกตอนวิกฤตได้ แต่คนแรกจะถูก "บังคับขายขาดทุน (Forced Sale)"</i>
                        </div>
                    </li>
                    <li>
                        <b>⚓ 3. ภาระหนี้สิน (Leverage & Debt Trap):</b> อัตราส่วนหนี้สิน (DTI) ที่สูงคือตัวบั่นทอนความมั่งคั่ง หากหนี้เกิน 40% ของรายได้ ระบบจะลงดาบกดเพดานคะแนน (Hard Cap) ทันที
                        <div class="text-xs text-blue-700 mt-1 bg-blue-100/50 p-2 rounded">
                            <i>ตัวอย่าง: หากลูกค้ามีหนี้บัตรเครดิตดอกเบี้ย 16% ต่อปี แต่พยายามเอาเงินไปลงทุนในหุ้นที่คาดหวังผลตอบแทน 8% ต่อปี AI จะกดคะแนนให้ตกทันที เพราะคณิตศาสตร์ชี้ชัดว่า "ดอกเบี้ยจ่าย" กำลังกัดกิน "ดอกเบี้ยรับ" จนหมดสิ้น</i>
                        </div>
                    </li>
                    <li>
                        <b>🏔️ 4. ขนาดของเป้าหมาย (Goal vs Resources):</b> สมการนี้จะนำ "ทรัพยากรที่มี" ไปเทียบกับ "เป้าหมายที่ต้องการ" เสมอ (Lifestyle Inflation)
                        <div class="text-xs text-blue-700 mt-1 bg-blue-100/50 p-2 rounded">
                            <i>ตัวอย่าง: ลูกค้า 2 คนมีเงินตั้งต้น 5 ล้านเท่ากัน คนแรกตั้งเป้าใช้ชีวิตเรียบง่ายหลังเกษียณเดือนละ 20,000 บาท (คะแนนจะสูงลิ่ว) แต่อีกคนตั้งเป้าเกษียณหรูเดือนละ 150,000 บาท (คะแนนจะตกฮวบ เพราะทรัพยากรไม่แมตช์กับเป้าหมาย)</i>
                        </div>
                    </li>
                </ul>
            </div>

            <h4 class="font-bold text-gray-800 text-base mt-6 mb-3 flex items-center gap-2 select-none"><span class="text-xl">🔍</span> กรณีศึกษา (Case Study): ความยืดหยุ่นที่ต่างกัน</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <!-- Case A -->
                <div class="bg-white p-5 rounded-xl border border-green-200 shadow-sm relative overflow-hidden flex flex-col h-full transform-gpu">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🌱</div>
                    <b class="text-green-700 text-base mb-1 block">เคส A: น้องวุฒิ (เด็กจบใหม่วัยสร้างตัว)</b>
                    <div class="text-xs text-gray-600 mb-3 border-b border-green-100 pb-3">
                        • รายได้: 12,000 บ./เดือน<br>
                        • ออมเงิน: 6,000 บ. (ออม 50%)<br>
                        • เป้าเกษียณ: 4,000 บ./เดือน | อายุ 24 ปี
                    </div>
                    <p class="text-gray-800 font-bold mb-1">✅ โอกาสสำเร็จ 99.9% ซึ่งสูงกว่าคุณสุ (มหาเศรษฐี UHNW)</p>
                    <p class="text-xs text-gray-600 mb-4 flex-grow"> 
                        <b>ทำไม AI ให้คะแนนสูง?:</b> แม้พอร์ตจะเล็ก แต่โครงสร้างสมบูรณ์แบบ (หนี้ 0%) มีเวลาหนุนหลังถึง 31 ปี และเป้าหมายเล็กมาก คณิตศาสตร์ประเมินว่าต่อให้เจอตลาดหุ้นตกหนัก น้องวุฒิก็ยังมีเวลาและกระแสเงินสดให้ฟื้นตัวได้สบายๆ
                    </p>
                    <div class="bg-green-50 p-3 rounded-lg border border-green-100 mt-auto">
                        <span class="text-[10px] font-bold text-green-700 uppercase block mb-1">🛠️ FA Action Plan (สิ่งที่คุณควรคุย):</span>
                        <span class="text-xs text-green-900 leading-tight block">"คะแนนคุณดีมากครับ แต่จุดอ่อนเดียวคือ 'ถ้าคุณป่วย' เงินออมก้อนแรกจะหายวับทันที FA ควรแนะนำให้ปิดความเสี่ยงด้วยประกันสุขภาพ (Health) และกระตุ้นให้ตั้งเป้าหมายที่ท้าทายขึ้น เช่น การลงทุนเพื่ออิสรภาพทางการเงิน (FIRE)"</span>
                    </div>
                </div>

                <!-- Case B -->
                <div class="bg-white p-5 rounded-xl border border-red-200 shadow-sm relative overflow-hidden flex flex-col h-full transform-gpu">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🏛️</div>
                    <b class="text-red-700 text-base mb-1 block">เคส B: คุณสุ (มหาเศรษฐี UHNW)</b>
                    <div class="text-xs text-gray-600 mb-3 border-b border-red-100 pb-3">
                        • รายรับ: 5.5 ลบ./เดือน | อายุ 54 ปี<br>
                        • ภาระหนี้ธุรกิจ (OD): 177 ล้านบาท<br>
                        • เป้าเกษียณ: 2.7 ลบ./เดือน (เหลือเวลา 1 ปี)
                    </div>
                    <p class="text-gray-800 font-bold mb-1">⚠️ โอกาสสำเร็จ 77.2% ซึ่งต่ำกว่าน้องวุฒิ(เด็กจบใหม่วัยสร้างตัว)</p>
                    <p class="text-xs text-gray-600 mb-4 flex-grow">
                        <b>ทำไม AI ให้คะแนนต่ำ?:</b> รวยสินทรัพย์ แต่กระแสเงินสดสุทธิ "ติดลบ" (ดอกเบี้ย OD กินหมด) แถมเวลาแก้ตัวก่อนเกษียณเหลือแค่ 1 ปี โครงสร้างนี้เปราะบางมาก หากแบงก์ปรับดอกเบี้ยขึ้น หรือธุรกิจสะดุด ความมั่งคั่งจะถูกบังคับขายทอดตลาด (Liquidity Crisis) ทันที
                    </p>
                    <div class="bg-red-50 p-3 rounded-lg border border-red-100 mt-auto">
                        <span class="text-[10px] font-bold text-red-700 uppercase block mb-1">🛠️ FA Action Plan (สิ่งที่คุณควรคุย):</span>
                        <span class="text-xs text-red-900 leading-tight block">"ความเสี่ยงของคุณสุไม่ได้อยู่ที่ความรวย แต่อยู่ที่ 'สภาพคล่อง' FA ควรเปลี่ยนบทสนทนาจากการลงทุนทั่วไป เป็นการทำ Debt Restructuring และเสนอประกันชีวิต (Whole Life / Legacy) เพื่อสร้างเงินสดฉุกเฉินปลอดภาษีไว้ปกป้องทรัพย์สินกงสีครับ"</span>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800 text-white p-5 rounded-xl mt-6 text-sm shadow-xl transform-gpu">
                <p class="font-bold text-yellow-400 mb-2 flex items-center gap-2 select-none"><span class="text-xl">💎</span> FA Takeaway (บทสรุปสำหรับที่ปรึกษา)</p>
                <p class="text-gray-300 leading-relaxed">
                    จงจำไว้เสมอว่า <b>"ความมั่งคั่ง (Wealth) ไม่เท่ากับ ความมั่นคง (Financial Security)"</b><br>
                    หน้าที่ของเราในฐานะ FA ไม่ใช่แค่การขายสินทรัพย์ที่ได้ผลตอบแทนสูงสุด แต่คือการใช้คะแนน AI ตัวนี้เพื่อ <b>"สะท้อนกระจก"</b> ชี้ให้ลูกค้าเห็นจุดบอดที่ซ่อนอยู่ (เช่น รอยรั่วของรายจ่าย หรือ ระเบิดเวลาจากหนี้สิน) เพื่อปรับเปลี่ยนพฤติกรรม และนำไปสู่การอุดรอยรั่วด้วยโปรดักส์ที่ถูกต้องอย่างแท้จริงครับ
                </p>
            </div>
        </div>`
    }
};

// Export (หากใช้งานผ่าน Webpack/Node)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { systemDictionary };
}