// ==========================================
// 📚 Financial Planner - Comprehensive Knowledge Base Module
// ไฟล์นี้รวบรวมคู่มือการใช้งาน พจนานุกรมคำอธิบายระบบ และทฤษฎีอ้างอิงทั้งหมด
// ==========================================

window.systemDictionary = {
    // --- ส่วนคู่มือการใช้งาน (ย้ายมาจาก HTML) ---
    "manual-1": {
        icon: "🎯",
        iconClass: "bg-emerald-100 text-emerald-600",
        title: "ส่วนที่ 1: บทนำและวิสัยทัศน์ (Vision & Introduction)",
        content: `
            <div class="text-sm text-gray-700 leading-relaxed space-y-5 pl-0">
                
                <!-- Hero Quote -->
                <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10">🧭</div>
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
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition hover:-translate-y-1">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner">🎓</div>
                        <h4 class="font-bold text-gray-800 mb-2">มาตรฐานวิชาชีพ<br>(CFP Standards)</h4>
                        <p class="text-xs text-gray-600">ยึดหลักการวินิจฉัยงบดุล กระแสเงินสด และอัตราส่วนทางการเงินที่แม่นยำตามมาตรฐานสากล เพื่ออุดรอยรั่วและสร้างรากฐานที่แข็งแกร่ง</p>
                    </div>
                    
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition hover:-translate-y-1">
                        <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner">🧠</div>
                        <h4 class="font-bold text-gray-800 mb-2">ปัญญาประดิษฐ์<br>(Data Science & AI)</h4>
                        <p class="text-xs text-gray-600">ใช้โมเดล Machine Learning ประเมินโอกาสสำเร็จ จำลองวิกฤต (Stress Test) และจัดกลุ่มพฤติกรรมลูกค้าอัตโนมัติ เพื่อสร้างแผนที่ทำได้จริง</p>
                    </div>

                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition hover:-translate-y-1">
                        <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner">🔒</div>
                        <h4 class="font-bold text-gray-800 mb-2">ความปลอดภัยสูงสุด<br>(Privacy-First)</h4>
                        <p class="text-xs text-gray-600">การประมวลผลเป็นแบบ <b>100% Local Execution</b> เกิดขึ้นบนอุปกรณ์ของคุณเท่านั้น ปราศจากการส่งข้อมูลขึ้นคลาวด์ ปลอดภัยตามมาตรฐาน PDPA</p>
                    </div>
                </div>

                <!-- The Ultimate Value -->
                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100 mt-6 shadow-sm relative">
                    <div class="absolute right-4 top-4 text-4xl opacity-20">💎</div>
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
            <p class="text-sm text-gray-600 mb-6">เมื่อคุณกดปุ่ม <b>"ประมวลผล"</b> ระบบจะวิ่งผ่านกระบวนการ 5 ขั้นตอน (5-Stage Engine) ภายในเวลาไม่กี่วินาที ดังนี้:</p>
            <div class="space-y-5">
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition">
                    <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-indigo-100">1</div>
                    <div>
                        <h4 class="font-bold text-gray-800 text-base mb-2">Diagnostic Engine (การวินิจฉัยสุขภาพการเงิน)</h4>
                        <p class="text-xs text-gray-600 leading-relaxed mb-2">สกัดข้อมูลดิบ (งบดุลและกระแสเงินสด) มาคำนวณเป็นอัตราส่วนทางการเงินสากล เช่น Survival Ratio, Liquidity Ratio, DTI และ Savings Ratio</p>
                        <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                            <b>Output:</b> ประเมิน <span class="text-indigo-600 font-bold">Financial Health Score</span> เต็ม 100 คะแนน เพื่อวิเคราะห์ความเสี่ยงล้มละลาย (Risk of Ruin) ขั้นพื้นฐาน
                        </div>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition">
                    <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-purple-100">2</div>
                    <div>
                        <h4 class="font-bold text-gray-800 text-base mb-2">Behavioral K-Means Clustering (AI จัดกลุ่มพฤติกรรม)</h4>
                        <p class="text-xs text-gray-600 leading-relaxed mb-2">ป้อนข้อมูลเข้าสู่โมเดล Machine Learning (8D K-Means) วิเคราะห์พฤติกรรม 8 แกน (อายุ, รายได้, ความมั่งคั่ง, ภาระหนี้, ความเสี่ยง, ความสม่ำเสมอ, วินัย, ภาระอุปการะ) เพื่อหา Persona ที่ซ่อนอยู่</p>
                        <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                            <b>Output:</b> ระบบจะจัดลูกค้าเข้าสู่กลุ่มเฉพาะ (เช่น UHNW, Cash Hoarder, Overleveraged) และปรับโครงสร้าง "สามเหลี่ยมการเงิน" ให้ดิ้นได้ตามความเสี่ยงนั้นๆ
                        </div>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition">
                    <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-orange-100">3</div>
                    <div>
                        <h4 class="font-bold text-gray-800 text-base mb-2">Optimization & DP Knapsack (อัลกอริทึมจัดสรรและแก้ปัญหา)</h4>
                        <p class="text-xs text-gray-600 leading-relaxed mb-2">AI จะคำนวณงบประมาณส่วนเกินที่แท้จริง (Elastic Budget) และใช้คณิตศาสตร์ <b class="text-orange-600">Dynamic Programming</b> เลือกแบบประกัน "Base + Rider" ที่ให้ความคุ้มครองสูงสุดโดยไม่เกินงบ (Knapsack Problem) พร้อมคำนวณการโยกเงินเพื่อ <b class="text-blue-600">Tax Alpha</b> (ลดหย่อนภาษี) และ <b class="text-red-600">Debt Snowball</b> (ปลดหนี้)</p>
                        <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                            <b>Output:</b> จัดตะกร้าสินค้า (Product Assembly) ออกมาเป็น 3 ทางเลือก พร้อมแผนกระแสเงินสด Benchmark ใหม่
                        </div>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition">
                    <div class="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-red-100">4</div>
                    <div>
                        <h4 class="font-bold text-gray-800 text-base mb-2">Stochastic Simulation (แบบจำลอง Monte Carlo & Stress Test)</h4>
                        <p class="text-xs text-gray-600 leading-relaxed mb-2">ระบบจะรันโลกคู่ขนาน 2,000 รอบ สุ่มสภาวะตลาด (กระทิง/หมี) ผสานทฤษฎี <b class="text-red-600">Merton's Jump Diffusion</b> จำลองวิกฤตเศรษฐกิจเฉียบพลัน และควบคุมการถอนเงินหลังเกษียณด้วย <b class="text-emerald-600">Guyton-Klinger Rules</b> ป้องกันพอร์ตแตก</p>
                        <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                            <b>Output:</b> โอกาสความสำเร็จ (Probability of Success) พร้อมช่วงความเชื่อมั่น 95% และกราฟจำลองการลงทุน 5 ปีล่วงหน้า (CVaR)
                        </div>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover-scale transition">
                    <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-emerald-100">5</div>
                    <div>
                        <h4 class="font-bold text-gray-800 text-base mb-2">Natural Language Generation (NLG Storytelling)</h4>
                        <p class="text-xs text-gray-600 leading-relaxed mb-2">แปลผลลัพธ์ทางคณิตศาสตร์ทั้งหมด ออกมาเป็นภาษาที่มนุษย์เข้าใจได้ โดยใช้หลักจิตวิทยา DISC ปรับโทนข้อความให้เข้ากับความกลัวและความคาดหวังของลูกค้า</p>
                        <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                            <b>Output:</b> บทวิเคราะห์ข้อความบนหน้ารายงาน (Executive Summary) ที่พร้อมสำหรับนำไปใช้นำเสนอลูกค้า
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
            <p class="mb-5 text-sm text-gray-700 leading-relaxed"><b>Financial Planner Pro Advisor</b> ไม่ใช่แค่เครื่องมือคำนวณ แต่คือระบบปฏิบัติการทางการเงิน (Financial Operating System) ที่ครอบคลุมตั้งแต่การจัดการฐานข้อมูลลูกค้า (CRM), การคำนวณขั้นสูง (Pro Calculators), การวิเคราะห์ด้วย AI, และการสร้างรายงานระดับ Enterprise คู่มือฉบับนี้จะเจาะลึกทุกฟังก์ชันแบบ Step-by-Step เพื่อให้คุณดึงศักยภาพของระบบออกมาได้ 100%</p>
            
            <div class="space-y-8">
                
                <!-- MODULE 1: System Config -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div class="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner">1</div> 
                        <h3 class="font-bold text-white text-lg">การตั้งค่าระบบและฐานข้อมูล (System & Security Configuration)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">ระบบถูกล็อคด้วยความปลอดภัยระดับสูง (PIN Security) ทุกครั้งที่เข้าใช้งาน (ค่าเริ่มต้น <code class="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono">123456</code>) เมื่อเข้าสู่ระบบได้แล้ว ให้คลิกปุ่ม <b>"⚙️ ตั้งค่าระบบ"</b> ที่มุมขวาบน จะพบกับแท็บเครื่องมือควบคุม 4 ส่วน:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition">
                                <b class="text-blue-800 flex items-center gap-2 mb-2"><span class="text-lg">👤</span> ข้อมูลผู้จัดทำ (Creator Profile)</b>
                                <p class="text-xs text-gray-600 mb-2">จุดเริ่มต้นของการสร้างแบรนดิ้ง (Personal Branding)</p>
                                <ul class="list-disc list-inside text-xs space-y-1.5 text-gray-700 ml-1">
                                    <li>ระบุชื่อ-สกุล, เลขที่ใบอนุญาตตัวแทน (FA License), และ IC License</li>
                                    <li>ข้อมูลส่วนนี้จะถูก <b>สลักลงบนหน้าปกรายงาน PDF</b> อัตโนมัติทุกครั้งที่สั่งพิมพ์</li>
                                    <li>มีระบบเปลี่ยนรหัสผ่าน (PIN) เพื่อป้องกันบุคคลอื่นเข้าถึงฐานข้อมูลลูกค้าของคุณ</li>
                                </ul>
                            </div>
                            
                            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition">
                                <b class="text-orange-800 flex items-center gap-2 mb-2"><span class="text-lg">📦</span> จัดการข้อมูล (Library & Core Data)</b>
                                <p class="text-xs text-gray-600 mb-2">เครื่องมือจัดการแกนกลางของระบบ (Core Data Engine)</p>
                                <ul class="list-disc list-inside text-xs space-y-1.5 text-gray-700 ml-1">
                                    <li><b>Auto-Recovery:</b> ปุ่มกู้คืนข้อมูลฉุกเฉิน หากเผลอปิดเบราว์เซอร์หรือไฟดับ ระบบจะดึงข้อมูลที่พิมพ์ค้างไว้กลับมาได้ทันที</li>
                                    <li><b>Product Library:</b> เพิ่ม "ชื่อแบบประกัน" ทั้งสัญญาหลักและอนุสัญญา เข้าไปเก็บไว้ เพื่อให้เรียกใช้ผ่าน Dropdown ได้ทันที ไม่ต้องพิมพ์ใหม่ซ้ำๆ</li>
                                    <li><b>JSON Config Import:</b> อัปโหลดไฟล์อัปเดตกฎหมาย (เช่น ฐานภาษีใหม่ปี 2568, ค่าลดหย่อนพิเศษ) เข้าสู่ระบบโดยตรง</li>
                                </ul>
                            </div>
                        </div>

                        <div class="bg-red-50 p-3 rounded-lg border border-red-200 flex items-start gap-3 mt-4">
                            <span class="text-xl">☢️</span>
                            <div>
                                <b class="text-red-800 text-xs block mb-1">Panic Buttons (ปุ่มฉุกเฉิน)</b>
                                <p class="text-[11px] text-gray-600">ในหน้าตั้งค่ามีปุ่ม Reset 3 ระดับ: <span class="font-bold text-gray-800">Reset Pass</span> (คืนค่ารหัสผ่านเป็น 123456), <span class="font-bold text-red-600">Reset DB</span> (ล้างฐานข้อมูล CRM ลูกค้าทั้งหมด), และ <span class="font-bold text-red-800">Reset All</span> (ล้างระบบกลับสู่ค่าเริ่มต้นโรงงาน) โปรดใช้งานด้วยความระมัดระวัง</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 2: CRM & VN -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div class="bg-gradient-to-r from-indigo-700 to-indigo-900 p-4 border-b border-indigo-600 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner">2</div> 
                        <h3 class="font-bold text-white text-lg">สถาปัตยกรรมจัดการลูกค้า (Advanced CRM & VN History)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">เมื่อคลิกแท็บ <b>"🗂️ ฐานข้อมูลลูกค้า (CRM)"</b> คุณจะเข้าสู่ศูนย์บัญชาการ (Command Center) สำหรับติดตามความคืบหน้าของลูกค้าทุกคนในมือคุณ:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-4">
                                <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                    <b class="text-indigo-800 block mb-2">📊 Portfolio & AI Diagnostics</b>
                                    <p class="text-xs text-gray-600 mb-2">ระบบจะคำนวณ <span class="font-bold text-indigo-700">AUM รวม (Asset Under Management)</span> และจำนวนลูกค้าทั้งหมดอัตโนมัติ พร้อมแสดงแผง <span class="font-bold text-cyan-600">AI Learning Diagnostics</span> เพื่อบอกความแม่นยำของการจัดกลุ่ม K-Means แบบ Real-time</p>
                                </div>
                                <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                    <b class="text-indigo-800 block mb-2">🔄 มุมมองกระดาน (Kanban) vs ตาราง (Table)</b>
                                    <p class="text-xs text-gray-600">สลับมุมมองได้ด้วยปุ่ม 📌/📋 รองรับการ Filter ค้นหาด้วยชื่อ, แฮชแท็ก (#VIP), ช่วงวันที่ และเรียงลำดับตามสถานะ (Prospect, Pitching, Closed, Post-Sale)</p>
                                </div>
                            </div>

                            <div class="bg-white p-4 rounded-xl border border-gray-300 shadow-lg relative">
                                <div class="absolute -right-3 -top-3 text-4xl opacity-20">📝</div>
                                <b class="text-gray-800 block mb-2 text-base">การจัดการรายบุคคล (Client Modal)</b>
                                <ul class="list-disc list-inside text-xs space-y-2 text-gray-700 ml-1">
                                    <li><b>Quick Review (พรีวิวข้อมูล):</b> คลิกไอคอนแว่นขยายเพื่อดูสรุปสั้นๆ ก่อนเข้าพบลูกค้า</li>
                                    <li><b>Status Tracking:</b> เปลี่ยนสถานะการขาย และลงวันที่นัดหมายครั้งต่อไป</li>
                                    <li><b>Activity History:</b> จดบันทึกการพูดคุย (Note) ตามไทม์ไลน์ เรียงจากใหม่ไปเก่า เพื่อให้ไม่ลืมบริบทการคุยครั้งก่อน</li>
                                    <li><b>VN Manager (Visit Note):</b> ฐานข้อมูลย่อยที่บันทึก "สแนปช็อตสุขภาพการเงิน" ทุกครั้งที่คุณกดประมวลผล ทำให้เห็นพัฒนาการ (Wealth Growth) ของลูกค้าจากอดีตถึงปัจจุบัน</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 3: Calculators -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div class="bg-gradient-to-r from-purple-700 to-purple-900 p-4 border-b border-purple-600 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner">3</div> 
                        <h3 class="font-bold text-white text-lg">เครื่องมือคำนวณอิสระ (Pro Financial Calculators)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">ปุ่ม <b>"🧮 เครื่องคิดเลขการเงิน"</b> เป็นโมดูลที่ทำงานแยกส่วนจากระบบหลัก (Sandbox) คุณสามารถกดเปิดขึ้นมาเพื่อตอบคำถามลูกค้าแบบรวดเร็ว (Ad-hoc Calculation) โดยไม่ต้องสร้างเคสใหม่ ประกอบด้วย 4 เครื่องยนต์:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                <b class="text-purple-800 block mb-1">🏖️ จำลองเป้าหมายเกษียณ (Retirement)</b>
                                <p class="text-xs text-gray-600">ป้อนอายุ, เป้าหมายรายจ่าย, พอร์ตตั้งต้น, และเงินเฟ้อ ระบบจะคำนวณหา "เงินก้อนที่ต้องมี (FV)" และ "เงินที่ต้องออมต่องวด (PMT)" พร้อมแสดงผลตอบแทนแท้จริง (Real Return)</p>
                            </div>
                            <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <b class="text-blue-800 block mb-1">📊 ผลตอบแทนลงทุน (CAGR)</b>
                                <p class="text-xs text-gray-600">คำนวณอัตราผลตอบแทนทบต้นต่อปี (Compound Annual Growth Rate) เมื่อรู้เงินต้นและเงินปลายทาง พร้อม AI Insight แนะนำประเภทสินทรัพย์ที่สอดคล้องกับผลตอบแทนนั้น</p>
                            </div>
                            <div class="bg-teal-50 p-4 rounded-xl border border-teal-100">
                                <b class="text-teal-800 block mb-1">📈 ผลตอบแทนประกัน (IRR)</b>
                                <p class="text-xs text-gray-600">ฟังก์ชันปิดการขายประกันสะสมทรัพย์! แค่ป้อน เบี้ยที่จ่าย, เงินคืนระหว่างทาง, และเงินก้อนตอนครบสัญญา ระบบจะถอดสมการหาค่า IRR (%) ออกมาเทียบกับดอกเบี้ยแบงก์ให้ลูกค้าเห็นทันที</p>
                            </div>
                            <div class="bg-red-50 p-4 rounded-xl border border-red-100">
                                <b class="text-red-800 block mb-1">💸 จัดการหนี้สิน (Amortization)</b>
                                <p class="text-xs text-gray-600">มีครบทั้งหนี้บ้าน (ลดต้นลดดอก), หนี้รถ (Flat Rate), และหนี้บัตรเครดิต พร้อมสร้าง <b>"ตารางจำลองการผ่อนชำระ"</b> แบบละเอียดยิบว่าแต่ละงวดตัดต้นเท่าไหร่ ตัดดอกเท่าไหร่</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 4: Quick Actions & Processing -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div class="bg-gradient-to-r from-teal-600 to-teal-800 p-4 border-b border-teal-500 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner">4</div> 
                        <h3 class="font-bold text-white text-lg">แถบคำสั่งด่วน และการนำเข้าข้อมูล (Data Intake & Actions)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">บริเวณเหนือฟอร์มกรอกข้อมูล คือ <b>"Quick Action Bar"</b> ที่ควบคุมวงจรชีวิตของเอกสาร (Document Lifecycle):</p>
                        
                        <div class="flex flex-col gap-3">
                            <div class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border">
                                <div class="bg-white border p-2 rounded shadow-sm text-xl leading-none">📂/💾</div>
                                <div>
                                    <b class="text-gray-800 text-sm">โหลด / บันทึก (Offline JSON)</b>
                                    <p class="text-[11px] text-gray-600 mt-1">กด "บันทึก" เพื่อโหลดไฟล์นามสกุล <code class="text-teal-600">.json</code> ลงในเครื่องคอมพิวเตอร์/แท็บเล็ตของคุณ (Zero Data Leakage ปลอดภัยจากแฮกเกอร์) และกด "โหลด" เพื่อดึงไฟล์เดิมกลับมาทำต่อ</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border">
                                <div class="bg-white border p-2 rounded shadow-sm text-xl leading-none">🎲</div>
                                <div>
                                    <b class="text-purple-700 text-sm">สร้างกรณีศึกษา (Case Study Generator)</b>
                                    <p class="text-[11px] text-gray-600 mt-1">เครื่องมือ Training ชั้นยอด! กดปุ่มนี้เพื่อสุ่มโปรไฟล์ลูกค้า (เช่น หมอรายได้สูง, แม่ค้าหนี้เยอะ, มนุษย์เงินเดือน DINKs) เพื่อให้คุณฝึกซ้อมการวิเคราะห์และนำเสนอแผน</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                                <div class="bg-white border p-2 rounded shadow-sm text-xl leading-none animate-pulse-soft">⚙️</div>
                                <div>
                                    <b class="text-red-700 text-sm">ประมวลผล (Process Report)</b>
                                    <p class="text-[11px] text-gray-600 mt-1">เมื่อป้อนข้อมูลเสร็จ ให้กดปุ่มนี้ หน้าจอจะแสดง <b>Overlay โหลด AI Predictive Engine (หมุนๆ 2-3 วินาที)</b> ก่อนจะสลับหน้าจอ (Transition) เข้าสู่ Report View ที่สวยงามแบบไร้รอยต่อ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE 5: Playground & Simulation -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div class="bg-gradient-to-r from-emerald-600 to-emerald-800 p-4 border-b border-emerald-500 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner">5</div> 
                        <h3 class="font-bold text-white text-lg">ห้องทดลองทางเลือกและการจำลองสด (Interactive Playground)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4 relative overflow-hidden">
                        <div class="absolute -right-6 -bottom-6 text-8xl opacity-10">🎛️</div>
                        <p class="leading-relaxed relative z-10">ใน <b>ส่วนที่ 7: แบบจำลองเกษียณ</b> ของหน้ารายงาน คุณจะพบกับอาวุธที่ทรงพลังที่สุดในการปิดการขาย นั่นคือ <b>"ห้องทดลองทางเลือก (Trade-off Playground)"</b>:</p>
                        
                        <ul class="list-disc list-inside text-xs space-y-2 text-gray-700 ml-1 relative z-10">
                            <li>ในกล่อง <b>Real-time Simulation</b> จะมี <b>แถบสไลเดอร์ (Slider)</b> ให้ปรับ 3 ค่า: อายุเกษียณ, เป้าหมายใช้จ่าย, และ ผลตอบแทน</li>
                            <li><b>Interactive Feedback:</b> ทันทีที่คุณใช้เมาส์ลากสไลเดอร์ ตัวเลขเป้าหมายจะวิ่งตามสดๆ และกราฟเส้นสีม่วง (พอร์ตจัดเอง) จะขยับขึ้นลงตามความจริง</li>
                            <li><b>Background Recalculation:</b> ทันทีที่คุณ "ปล่อยเมาส์" ระบบจะแอบสั่งให้ AI รันสมการ Monte Carlo ใหม่ในฉากหลัง และอัปเดต <b>% โอกาสสำเร็จ (AI Success Probability)</b> ในตารางให้ทันที</li>
                        </ul>
                        
                        <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-200 mt-4 relative z-10">
                            <b class="text-emerald-800 text-xs block mb-1">💎 เทคนิคปิดการขายสำหรับ FA (Expert Tactic):</b>
                            <p class="text-[11px] text-gray-700">ใช้สไลเดอร์นี้ทำ <i>Trade-off (การได้อย่างเสียอย่าง)</i> กับลูกค้า เช่น <br><i>"คุณลูกค้าครับ ถ้าไม่อยากเพิ่มเงินออม งั้นผมขอลองลดเป้าหมายค่าใช้จ่ายลงนิดนึง หรือขยับอายุเกษียณออกไปอีก 2 ปีนะครับ... อ๊ะ! เห็นไหมครับว่ากราฟขยับขึ้นมาในโซนปลอดภัยแล้ว โอกาสสำเร็จพุ่งขึ้นเป็น 85% เลยครับ"</i></p>
                        </div>
                    </div>
                </div>

                <!-- MODULE 6: Export & Delivery -->
                <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div class="bg-gradient-to-r from-red-700 to-gray-900 p-4 border-b border-red-600 flex items-center gap-3">
                        <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner">6</div> 
                        <h3 class="font-bold text-white text-lg">การแปลงไฟล์และส่งมอบ (Enterprise PDF Engine)</h3>
                    </div>
                    <div class="p-5 text-sm text-gray-700 space-y-4">
                        <p class="leading-relaxed">ผลงานการวิเคราะห์ขั้นเทพ จะต้องถูกส่งมอบด้วยความสวยงามระดับ Enterprise เมื่อคุณคลิกปุ่ม <b>"🖨️ พิมพ์ / PDF"</b> ที่ท้ายรายงาน ระบบจะทำงานร่วมกับ Web Browser เพื่อแปลงข้อมูลเป็นหนังสือรูปเล่ม:</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="border border-gray-200 rounded-lg p-3 bg-gray-50 text-center flex flex-col items-center">
                                <span class="text-2xl mb-2">📑</span>
                                <b class="text-gray-800 text-[11px] block mb-1">Dynamic Cover Page</b>
                                <span class="text-[10px] text-gray-500">ระบบจะสร้าง "หน้าปก" อัตโนมัติ ดึงชื่อลูกค้า, ชื่อคุณ, เลข License และวันที่ปัจจุบัน มาจัดวางอย่างสวยงาม (หน้าปกนี้จะมองไม่เห็นในโหมดปกติ)</span>
                            </div>
                            <div class="border border-gray-200 rounded-lg p-3 bg-gray-50 text-center flex flex-col items-center">
                                <span class="text-2xl mb-2">✂️</span>
                                <b class="text-gray-800 text-[11px] block mb-1">UI Stripping</b>
                                <span class="text-[10px] text-gray-500">ระบบ CSS <code class="bg-gray-200 px-1 rounded">@media print</code> จะทำหน้าที่ "ซ่อน" ปุ่มกด, สไลเดอร์, กล่องแจ้งเตือน และแถบเมนูออกทั้งหมด เพื่อให้รายงานดูเป็นทางการ 100%</span>
                            </div>
                            <div class="border border-gray-200 rounded-lg p-3 bg-gray-50 text-center flex flex-col items-center">
                                <span class="text-2xl mb-2">🔒</span>
                                <b class="text-gray-800 text-[11px] block mb-1">Compliance & Watermark</b>
                                <span class="text-[10px] text-gray-500">ประทับลายน้ำ <b>CONFIDENTIAL</b> และแทรกข้อสงวนสิทธิ์ (Disclaimer) ไว้ที่ Footer ของทุกหน้ากระดาษ เพื่อป้องกันปัญหาทางกฎหมาย (Compliance)</span>
                            </div>
                        </div>

                        <div class="bg-gray-800 text-white p-3 rounded-xl flex items-center justify-between shadow-lg mt-4">
                            <div>
                                <b class="text-cyan-400 text-xs block mb-1">💻 วิธีบันทึกเป็น PDF ให้สมบูรณ์แบบ</b>
                                <p class="text-[10px] text-gray-300">เมื่อหน้าต่าง Print ของ Chrome/Safari เด้งขึ้นมา ให้ตั้งค่าดังนี้: <br>1. Destination: <b>Save as PDF</b> <br>2. Paper size: <b>A4</b> <br>3. Options: ติ๊กถูกที่ <b>Background graphics</b> (สำคัญมาก เพื่อให้กราฟและสีพื้นหลังแสดงผล)</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        `
    },

    // --- ส่วนพจนานุกรม (ข้อมูลเดิม) ---
    "math-cfp": {
        icon: "📊",
        iconClass: "bg-blue-100 text-blue-700",
        title: "ส่วนที่ 4: มาตรฐานประเมินสุขภาพการเงิน (CFP Financial Ratios)",
        content: `
        <p class="mb-4 text-sm text-gray-700 leading-relaxed"><b>กรอบการวิเคราะห์มาตรฐานสากล (CFP Board Standards):</b> กลุ่มสมการนี้ใช้สำหรับวินิจฉัย "จุดอ่อนและจุดแข็ง" เชิงโครงสร้างของงบกระแสเงินสดส่วนบุคคล (Personal Cash Flow) และงบแสดงฐานะการเงิน (Personal Balance Sheet) เพื่อค้นหาความเสี่ยงแฝงที่อาจนำไปสู่ภาวะล้มละลายทางเทคนิค</p>
        
        <div class="space-y-6">

            <!-- อัตราส่วนที่ 1: Survival Ratio -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-blue-900 text-5xl">1</div>
                <b class="text-blue-800 mb-2 text-sm uppercase tracking-wide">1. อัตราความอยู่รอด (Basic Survival Ratio)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>ทฤษฎี:</b> ดัชนีชี้วัดความสามารถพื้นฐานในการดำรงชีพ เพื่อตรวจสอบว่ากระแสเงินสดรับ (Cash Inflows) เพียงพอต่อการหล่อเลี้ยงรายจ่าย (Cash Outflows) หรือไม่ หากค่าที่ได้ < 1.0 จะเกิดภาวะ <b>"ขาดดุลเชิงโครงสร้าง (Structural Deficit)"</b> ซึ่งจะนำไปสู่การก่อหนี้บริโภคทันที</span>
                
                <div class="bg-blue-50 p-3 rounded-lg font-mono text-[11px] border border-blue-100 text-center text-blue-900 mb-3 shadow-inner">
                    <p class="font-bold text-sm">Survival Ratio = Total Income / Total Expenses</p>
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-emerald-900 text-5xl">2</div>
                <b class="text-emerald-800 mb-2 text-sm uppercase tracking-wide">2. อัตราส่วนสภาพคล่อง (Emergency Liquidity Ratio)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>ทฤษฎี:</b> ดัชนีวัดความทนทานต่อวิกฤตฉับพลัน (Exogenous Shocks) เช่น การตกงานหรือเจ็บป่วย โดยคำนวณว่า "สินทรัพย์สภาพคล่อง (เช่น เงินสด, เงินฝาก, กองทุนรวมตลาดเงิน)" จะสามารถหล่อเลี้ยงรายจ่ายรายเดือนไปได้กี่เดือน (เกณฑ์มาตรฐาน: 3-6 เดือนสำหรับพนักงานประจำ, 6-12 เดือนสำหรับฟรีแลนซ์/เจ้าของกิจการ)</span>
                
                <div class="bg-emerald-50 p-3 rounded-lg font-mono text-[11px] border border-emerald-100 text-center text-emerald-900 mb-3 shadow-inner">
                    <p class="font-bold text-sm">Liquidity Ratio = Liquid Assets / Total Expenses (Monthly)</p>
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-red-900 text-5xl">3</div>
                <b class="text-red-800 mb-2 text-sm uppercase tracking-wide">3. อัตราส่วนภาระหนี้สินต่อรายได้ (Debt-to-Income Ratio: DTI)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>ทฤษฎี:</b> มาตรวัดความสามารถในการชำระหนี้ (Debt Service Capacity) ที่ธนาคารและสถาบันการเงินใช้ประเมินความเสี่ยงเครดิต (Credit Risk) หากภาระหนี้ต่อเดือนสูงเกิน <b>36% - 45%</b> จะเข้าสู่ <b>"โซนอันตราย (Red Zone)"</b> ส่งผลให้ลูกค้าสูญเสียอำนาจในการก่อหนี้สินเชื่อบ้าน และเสี่ยงต่อการผิดนัดชำระหนี้ (Default Risk)</span>
                
                <div class="bg-red-50 p-3 rounded-lg font-mono text-[11px] border border-red-100 text-center text-red-900 mb-3 shadow-inner">
                    <p class="font-bold text-sm">DTI = (Total Debt Repayment / Total Income) &times; 100%</p>
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-purple-900 text-5xl">4</div>
                <b class="text-purple-800 mb-2 text-sm uppercase tracking-wide">4. อัตราส่วนความสามารถในการชำระหนี้สินระยะยาว (Solvency Ratio)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed"><b>ทฤษฎี:</b> ดัชนีประเมิน <b>"ความมั่งคั่งสุทธิ (Net Worth Ratio)"</b> บนงบดุล (Balance Sheet) เพื่อดูว่าทรัพย์สินที่มีอยู่ ถูกตุนไว้ด้วยส่วนของทุน (Equity) หรือส่วนของหนี้ (Liabilities) มากกว่ากัน เกณฑ์มาตรฐานสากลคือควรมีค่า <b>> 50%</b> (แปลว่ามีทรัพย์สินมากกว่าหนี้สินเกิน 1 เท่าตัว) หากค่าเข้าใกล้ 0% แปลว่ากำลังก้าวเข้าสู่ภาวะล้มละลาย (Technical Insolvency)</span>
                
                <div class="bg-purple-50 p-3 rounded-lg font-mono text-[11px] border border-purple-100 text-center text-purple-900 mb-3 shadow-inner">
                    <p class="font-bold text-sm">Solvency Ratio = (Net Worth / Total Assets) &times; 100%</p>
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

        </div>`
    },
    "math-tvm": {
        icon: "⏳",
        iconClass: "bg-indigo-100 text-indigo-700",
        title: "ส่วนที่ 5: ทฤษฎีมูลค่าเงินตามเวลาและการจัดการหนี้ (Time Value of Money & Amortization)",
        content: `
        <p class="mb-4 text-sm text-gray-700 leading-relaxed"><b>บทเรียนวิชาการ (Academic Theory):</b> ทฤษฎีมูลค่าเงินตามเวลา (TVM) คือรากฐานของวิศวกรรมการเงินทั้งหมด ตั้งอยู่บนสมมติฐานที่ว่า <i>"เงินหนึ่งบาทในวันนี้ มีค่ามากกว่าเงินหนึ่งบาทในอนาคต"</i> ระบบจึงใช้กลุ่มสมการเหล่านี้ในการคิดลด (Discounting) และทบต้น (Compounding) เพื่อสร้างแผนการเงินที่แม่นยำ</p>
        
        <div class="space-y-6">

            <!-- บทที่ 1: Fisher Equation -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-indigo-900 text-5xl">1</div>
                <b class="text-indigo-800 mb-2 text-sm uppercase tracking-wide">บทที่ 1: ทฤษฎีอำนาจซื้อและผลตอบแทนแท้จริง (Fisher Equation)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">การคำนวณแผนเกษียณที่ใช้ "ผลตอบแทนหน้าตั๋ว (Nominal Return)" หักลบ "เงินเฟ้อ (Inflation)" แบบตรงๆ (เช่น 8% - 3% = 5%) ถือเป็น<b>ข้อผิดพลาดทางคณิตศาสตร์อย่างร้ายแรง</b> ระบบที่ได้มาตรฐานจะต้องใช้สมการของ Irving Fisher เพื่อหา <b>อัตราผลตอบแทนแท้จริง (Real Return)</b> ที่สะท้อนอำนาจซื้อที่แท้จริง</span>
                
                <div class="bg-indigo-50 p-3 rounded-lg font-mono text-[11px] border border-indigo-100 text-center text-indigo-900 mb-3 shadow-inner">
                    <p class="mb-1 text-indigo-400">// สมการ Fisher Effect</p>
                    <p class="font-bold text-sm">r<sub>real</sub> = [ (1 + r<sub>nominal</sub>) / (1 + r<sub>inflation</sub>) ] - 1</p>
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-blue-900 text-5xl">2</div>
                <b class="text-blue-800 mb-2 text-sm uppercase tracking-wide">บทที่ 2: มูลค่าเป้าหมายกองทุนเกษียณ (PV of Annuity Due)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">ในการวางแผนเกษียณ เราจะใช้สมการ <b>Annuity Due (เงินงวดต้นงวด)</b> เสมอ แทนที่จะใช้ Ordinary Annuity (เงินงวดปลายงวด) เพราะในโลกความเป็นจริง คนเกษียณต้อง <b>"ถอนเงินก้อนแรกออกมาใช้ตั้งแต่วันแรกของปี"</b> เพื่อเป็นค่าครองชีพในปีนั้นๆ สมการจึงต้องคูณด้วย (1 + r) ทบเข้าไปอีกหนึ่งงวด</span>
                
                <div class="bg-blue-50 p-3 rounded-lg font-mono text-[11px] border border-blue-100 text-center text-blue-900 mb-3 shadow-inner overflow-x-auto">
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-red-900 text-5xl">3</div>
                <b class="text-red-800 mb-2 text-sm uppercase tracking-wide">บทที่ 3: สมการปลดหนี้และวิกฤตพอกหางหมู (Amortization & NPER)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">สมการคณิตศาสตร์ที่ใช้หา "จำนวนงวดที่ต้องผ่อน (n)" อาศัยหลักการ <b>Exponential Decay (การลดลงแบบเอกซ์โพเนนเชียล)</b> ด้วยลอการิทึมธรรมชาติ (ln) เพื่อจำลองการลดต้นลดดอก โมเดลนี้สำคัญมากในการวางกลยุทธ์ Debt Snowball/Avalanche เพื่อดูว่าถ้าลูกค้า "โปะหนี้เพิ่ม" จะปลดหนี้เร็วขึ้นกี่เดือน</span>
                
                <div class="bg-red-50 p-3 rounded-lg font-mono text-[11px] border border-red-100 text-center text-red-900 mb-3 shadow-inner">
                    <p class="mb-1 text-red-400">// สมการ NPER (Number of Periods)</p>
                    <p class="font-bold text-sm">n = -ln( 1 - (PV &times; r) / PMT ) / ln(1 + r)</p>
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
                    <b class="flex items-center gap-1 mb-1">🚨 กฎการพังทลายของลอการิทึม (Negative Amortization Trap)</b>
                    <span>หากลูกค้าจ่ายขั้นต่ำน้อยกว่าหรือเท่ากับดอกเบี้ย (PMT &le; PV &times; r) ค่าในวงเล็บของ <b>ln() จะมีค่าติดลบหรือเป็นศูนย์</b> ซึ่งทางคณิตศาสตร์ไม่สามารถหาค่าได้ (Undefined) ระบบจะจับค่า Error นี้และแปลงเป็นสถานะ <b>"วิกฤตหนี้ชั่วกัลป์ (Infinity)"</b> เพื่อเตือนว่าลูกค้าจะไม่มีวันผ่อนหนี้ก้อนนี้หมดหากไม่เพิ่มยอดผ่อน (PMT)</span>
                </div>
            </div>

        </div>`
    },
    "math-dnn": {
        icon: "🕸️",
        iconClass: "bg-cyan-100 text-cyan-700",
        title: "ส่วนที่ 6: สถาปัตยกรรมโครงข่ายประสาทเทียมเชิงลึก (Deep Neural Network Architecture)",
        content: `
        <p class="mb-4 text-sm text-gray-700 leading-relaxed"><b>รายงานการวิเคราะห์ทางเทคนิค (Technical Whitepaper):</b> สถาปัตยกรรม <b>Multi-Layer Perceptron (MLP)</b> นี้ถูกสร้างขึ้นเพื่อทำ Predictive Analytics ประเมินความน่าจะเป็นที่ลูกค้าจะบรรลุเป้าหมายทางการเงิน โดยทำงานแบบ Offline ผ่าน Pre-trained Weights บน Client-side ประกอบด้วยกระบวนการคำนวณทางคณิตศาสตร์ 4 ระยะ (Phases) ดังนี้</p>
        
        <div class="space-y-5">

            <!-- Phase 1: Input Vector Space -->
            <div class="bg-slate-800 text-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-10 text-5xl">1</div>
                <b class="text-cyan-400 mb-2 text-sm uppercase tracking-wide">Phase 1: Input Vector Space & Feature Standardization</b>
                <span class="text-xs text-gray-300 mb-3 leading-relaxed">ระบบรับตัวแปรอิสระ (Independent Variables) จำนวน 15 มิติ (เช่น อายุ, อัตราส่วนเงินออม, DTI) เข้าสู่ Hyperspace $\\mathbb{R}^{15}$ แต่เนื่องจากหน่วยของข้อมูลมีความแปรปรวนสูง (Variance) เช่น เงินเดือนหลักแสน vs จำนวนบุตรหลักหน่วย ระบบจึงต้องทำ <b>Z-Score Normalization</b> เพื่อปรับให้ทุกแกนมีค่าเฉลี่ย (&mu;) เป็น 0 และส่วนเบี่ยงเบนมาตรฐาน (&sigma;) เป็น 1 เท่ากันหมด</span>
                
                <div class="bg-slate-900 p-3 rounded-lg font-mono text-[11px] border border-slate-700 text-cyan-200 mb-3 shadow-inner">
                    <p class="mb-1 text-slate-400">// สมการแปลงพิกัด (Standardization Equation)</p>
                    <p>Z<sub>i</sub> = (X<sub>i</sub> - &mu;<sub>i</sub>) / &sigma;<sub>i</sub> &nbsp;&nbsp; ; &forall;i &in; {1, 2, ..., 15}</p>
                    <p class="mt-2 mb-1 text-slate-400">// การตรึงพิกัดเพื่อป้องกันความผิดปกติ (OOD Regularization)</p>
                    <p>Z'<sub>i</sub> = max(-5.0, min(5.0, Z<sub>i</sub>))</p>
                </div>
                <p class="text-[10px] text-orange-300 italic border-l-2 border-orange-500 pl-2"><b>*Academic Note:</b> การทำ Clipping ที่ &plusmn;5 &sigma; ครอบคลุมพื้นที่ 99.9999% ของ Normal Distribution เพื่อทำหน้าที่เป็น <b>Out-of-Distribution (OOD) Guardrail</b> ป้องกันโมเดลเกิดภาวะ AI Hallucination เมื่อประมวลผลข้อมูลของกลุ่มมหาเศรษฐี (UHNW) ที่ตัวเลขฉีกกฎสถิติปกติ</p>
            </div>

            <!-- Phase 2: Hidden Layers & Affine Transformation -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-5 text-gray-900 text-5xl">2</div>
                <b class="text-blue-800 mb-2 text-sm uppercase tracking-wide">Phase 2: Affine Transformation & Non-Linearity (Hidden Layers)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">เวกเตอร์ข้อมูลที่ปรับสเกลแล้ว จะเคลื่อนที่ผ่านชั้นซ่อน (Hidden Layers) โดยเกิดกระบวนการคูณเมทริกซ์ (Dot Product) กับ <b>ค่าน้ำหนัก (Weights - W)</b> และบวกด้วย <b>ค่าความลำเอียง (Biases - B)</b> จากนั้นจึงผ่านด่าน <b>ReLU (Rectified Linear Unit)</b> ซึ่งเป็น Non-linear Activation Function ที่จะตัดค่าที่ติดลบทิ้งให้เป็น 0 เพื่อป้องกันปัญหา Vanishing Gradient และช่วยสกัดความสัมพันธ์ซับซ้อน (Feature Crossing) เช่น "รายได้สูง แต่หนี้ก็สูงตาม"</span>
                
                <ul class="font-mono text-[11px] text-blue-900 bg-blue-50 p-4 rounded-lg border border-blue-100 mt-1 space-y-3 shadow-inner">
                    <li class="flex flex-col">
                        <span class="text-gray-500 font-bold mb-1">// Layer 1: H1 Space Projection (สกัดมิติขั้นต่ำ)</span>
                        <span class="bg-white p-1.5 rounded border border-blue-200">H<sup>(1)</sup> = max(0, Z' &middot; W<sup>(0)</sup> + B<sup>(0)</sup>)</span>
                    </li>
                    <li class="flex flex-col pt-1">
                        <span class="text-gray-500 font-bold mb-1">// Layer 2: H2 Deep Interaction (สกัดความสัมพันธ์เชิงลึก)</span>
                        <span class="bg-white p-1.5 rounded border border-blue-200">H<sup>(2)</sup> = max(0, H<sup>(1)</sup> &middot; W<sup>(2)</sup> + B<sup>(2)</sup>)</span>
                    </li>
                </ul>
            </div>

            <!-- Phase 3: Output & Probability Mapping -->
            <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-200 shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-10 text-indigo-900 text-5xl">3</div>
                <b class="text-indigo-900 mb-2 text-sm uppercase tracking-wide">Phase 3: Logit Transformation & Sigmoid Mapping</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">ในชั้น Output Layer ค่าที่ประมวลผลได้จะอยู่ในรูปของ Log-odds (ช่วงคะแนนตั้งแต่อนันต์ติดลบถึงอนันต์บวก) อัลกอริทึมจึงต้องใช้ <b>Sigmoid Function &sigma;(x)</b> เพื่อบีบอัด (Squeeze) เวกเตอร์ทั้งหมดให้ตกลงมาอยู่ในความน่าจะเป็นทางคณิตศาสตร์ (Probability Range) ระหว่าง 0 ถึง 1 เท่านั้น</span>
                
                <div class="bg-white p-3 rounded-lg font-mono text-[11px] border border-indigo-200 text-center text-indigo-900 mb-2 shadow-inner">
                    <p class="text-gray-500 mb-1">// Sigmoid Activation Equation</p>
                    <p class="font-bold text-sm">P(Success | X) = 1 / (1 + e<sup>-(H<sup>(2)</sup> &middot; W<sup>(3)</sup> + B<sup>(3)</sup>)</sup>)</p>
                </div>
            </div>

            <!-- Phase 4: Counterfactual Simulation -->
            <div class="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-10 text-emerald-900 text-5xl">4</div>
                <b class="text-emerald-800 mb-2 text-sm uppercase tracking-wide">Phase 4: Counterfactual Simulation (Success Leap Analysis)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">กระบวนการที่ล้ำลึกที่สุดของโมเดลนี้คือ การทำ <b>Counterfactual Inference (การวิเคราะห์เหตุการณ์สมมติ)</b> อัลกอริทึมจะคัดลอกสถานะการเงินปัจจุบัน (X<sub>current</sub>) มาสร้างเป็นแบบจำลองคู่ขนาน (X<sub>proposed</sub>) โดยอัดฉีดค่า "วินัยทางการเงินเชิงอุดมคติ (Ideal Behaviors)" เข้าไป เช่น การบังคับให้ DTI_Ratio = 0.0 และ Savings_Ratio &ge; 0.20 แล้วรันสมการ Neural Network อีกรอบเพื่อหาค่า $\\Delta$ (Delta)</span>
                
                <div class="bg-white/70 p-4 rounded-lg border border-emerald-100 text-[11px] text-gray-700 mb-4 shadow-inner space-y-2">
                    <b class="text-emerald-900 border-b border-emerald-200 pb-1 block">The Marginal Utility of Financial Advice (มูลค่าส่วนเพิ่มของคำแนะนำ):</b>
                    <p class="font-mono text-gray-600 mt-2">&Delta;P (Leap) = P(Success | X<sub>proposed</sub>) - P(Success | X<sub>current</sub>)</p>
                    <ul class="list-disc list-inside mt-2 space-y-1 text-emerald-800">
                        <li><b>Baseline (X<sub>cur</sub>):</b> ประเมินได้ 45.0% (ความเสี่ยงสูง)</li>
                        <li><b>Optimized (X<sub>prop</sub>):</b> ประเมินได้ 85.5% (ความสำเร็จสูง)</li>
                        <li><b>&Delta;P (Leap) = +40.5%</b></li>
                    </ul>
                </div>
                
                <i class="text-[11px] text-emerald-700 mt-auto pt-2 border-t border-emerald-200 leading-relaxed"><b>FA Application:</b> ตัวเลข <b>&Delta;P (Leap)</b> ไม่ใช่แค่เศษส่วนทางคณิตศาสตร์ แต่คือ <b>"หลักฐานเชิงประจักษ์ (Empirical Evidence)"</b> ที่ FA สามารถใช้พิสูจน์ให้ลูกค้าเห็นว่า หากยอมลดไลฟ์สไตล์และปฏิบัติตามแผนการเงิน โอกาสพลิกชีวิตให้สำเร็จจะเพิ่มขึ้นอย่างเป็นรูปธรรมกี่เปอร์เซ็นต์</i>
            </div>

        </div>`
    },
    "math-kmeans": {
        icon: "🧬",
        iconClass: "bg-purple-100 text-purple-700",
        title: "ส่วนที่ 7: ระบบจัดกลุ่มอัตลักษณ์ลูกค้า (8D K-Means Clustering)",
        content: `
        <p class="mb-3 text-sm text-gray-700">อัลกอริทึมจัดกลุ่มลูกค้า (Persona Profiling) โดยแปลงข้อมูลพฤติกรรมการเงิน 8 มิติให้เป็นพิกัดใน Hyperspace เพื่อค้นหาว่าลูกค้ามีพฤติกรรมคล้ายคลึงกับกลุ่มใดมากที่สุด</p>
        <div class="space-y-4">

            <!-- กล่องที่ 1: Normalization -->
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-purple-800 mb-2">1. การปรับสเกลข้อมูล (Min-Max Normalization)</b>
                <span class="text-xs text-gray-700 mb-2"><b>เหตุผลทางวิชาการ:</b> ข้อมูลลูกค้ามีหน่วยต่างกันมหาศาล (เช่น รายได้เป็นหลักแสน แต่อายุเป็นหลักสิบ) หากไม่ปรับสเกล ตัวแปรที่มีค่าสูงจะกลืนตัวแปรอื่น อัลกอริทึมจึงต้องบีบข้อมูลทุกแกน (Dimensions) ให้อยู่ในสเกล <b>0.0 ถึง 1.0</b> เท่ากันหมดก่อนประมวลผล</span>
                <div class="bg-purple-50 p-3 rounded-lg font-mono text-[11px] border border-purple-100 text-center text-purple-900 mb-2 shadow-inner">
                    X<sub>norm</sub> = (X - X<sub>min</sub>) / (X<sub>max</sub> - X<sub>min</sub>)
                </div>
            </div>

            <!-- กล่องที่ 2: Euclidean Distance -->
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-purple-800 mb-2">2. หาระยะห่างทางเรขาคณิต (Euclidean Distance in 8D Space)</b>
                <span class="text-xs text-gray-700 mb-2">ระบบจะวัดความคล้ายคลึงของเวกเตอร์ลูกค้า (P) กับจุดศูนย์กลางของแต่ละกลุ่ม (C<sub>k</sub>) ทั้ง 7 กลุ่ม โดยกลุ่มที่คำนวณแล้วได้ระยะห่าง (Distance) <b>"สั้นที่สุด"</b> จะถือเป็นกลุ่มที่ลูกค้าสังกัดอยู่</span>
                <div class="mt-2 mb-2 bg-gray-50 p-3 rounded-lg font-mono text-xs border border-gray-200 text-center text-purple-900 shadow-inner">
                    d(P, C<sub>k</sub>) = &radic;<span class="border-t border-purple-900 ml-1">&Sigma;(P<sub>norm,i</sub> - C<sub>k,i</sub>)<sup>2</sup></span>
                </div>
            </div>

            <!-- กล่องที่ 3: Case Study & Anomaly -->
            <div class="bg-slate-800 p-4 rounded-xl shadow-sm flex flex-col text-white">
                <b class="text-fuchsia-400 mb-2">3. ตัวอย่างการทำงาน & การตรวจจับข้อมูลผิดปกติ (Anomaly Detection)</b>
                <span class="text-xs text-slate-300 mb-2">ระบบไม่ได้แค่จัดกลุ่ม แต่ถูกตั้งค่า <b>Anomaly Threshold ไว้ที่ 1.85</b> เพื่อตรวจจับข้อมูลที่อยู่นอกกรอบ (Outliers)</span>
                
                <div class="bg-slate-700/50 p-3 rounded border border-slate-600 text-[11px] text-gray-200 space-y-1 mb-3">
                    <b class="text-white">Case Study (ลูกค้ามีรายได้ 20,000 บาท/เดือน แต่มีทรัพย์สิน 50 ล้านบาท):</b><br>
                    <span class="text-slate-300">- คำนวณระยะห่างกับกลุ่ม "วัยทำงานสร้างตัว" = 2.45</span><br>
                    <span class="text-slate-300">- คำนวณระยะห่างกับกลุ่ม "เศรษฐีวัยเกษียณ" = 1.95</span><br>
                    <span class="text-orange-400 font-bold">- สรุป: ระยะห่างที่สั้นที่สุด (Min Distance) คือ 1.95 ซึ่งยังคง > 1.85 (Threshold)</span><br>
                    <span class="text-red-400">- <b>ผลลัพธ์:</b> ระบบจะแสดงป้าย <span class="bg-red-500/20 text-red-300 px-1 rounded">[Anomaly Detected]</span> ต่อท้ายชื่อกลุ่มทันที เพราะพฤติกรรมมีความขัดแย้งในตัวเองอย่างรุนแรง (รายได้น้อยมากแต่ทรัพย์สินสูง อาจเกิดจากการได้รับมรดก หรือกรอกข้อมูลผิดพลาด)</span>
                </div>

                <i class="text-xs text-slate-400 mt-auto pt-2 border-t border-slate-600"><b>FA ควรทำ:</b> เมื่อระบบแจ้งเตือน Anomaly FA ต้องรีบซักถามข้อเท็จจริง (Fact-Finding) ลูกค้าเพิ่มเติม เพราะโมเดลการวางแผนการเงินแบบมาตรฐานอาจนำมาใช้กับลูกค้ารายนี้ไม่ได้ ต้องจัดพอร์ตแบบ Tailor-made เป็นพิเศษ</i>
            </div>

        </div>`
    },
    "math-consensus": {
        icon: "⚖️",
        iconClass: "bg-slate-100 text-slate-700",
        title: "ส่วนที่ 8: กลไกตัดสินใจร่วม (Hybrid Co-Advisor Consensus Engine)",
        content: `
        <p class="mb-3 text-sm text-gray-700">สถาปัตยกรรมปัญญาประดิษฐ์ (AI Pipeline) ที่ทำงานร่วมกันระหว่าง <b>Machine Learning</b> ในการแบ่งกลุ่มลูกค้า และ <b>Expert Heuristics</b> (กฎเกณฑ์ผู้เชี่ยวชาญ) เพื่อป้องกัน AI Hallucinations ครบจบใน 5 ขั้นตอน</p>
        <div class="space-y-4">

            <!-- ขั้นตอนที่ 1: K-Means Clustering -->
            <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm flex flex-col">
                <b class="text-blue-800 mb-2 flex items-center gap-2">Step 1: แบ่งกลุ่มพฤติกรรมภาพรวม (Macro Segmentation ด้วย K-Means)</b>
                <span class="text-xs text-gray-700 mb-2">อัลกอริทึมจะคำนวณระยะห่าง (Euclidean Distance) เพื่อจับคู่ลูกค้าเข้ากับ 7 ศูนย์กลางพฤติกรรม (Centroids) ได้แก่:</span>
                <ul class="text-[11px] list-none p-3 font-mono bg-white border border-blue-100 rounded-lg text-blue-900 space-y-1.5 mb-1 overflow-x-auto">
                    <li><b>1. กลุ่มเปราะบาง (Struggling):</b> หนี้สูงปรี๊ด ทรัพย์สินน้อย วินัยการเงินต่ำ</li>
                    <li><b>2. วัยทำงานสร้างตัว (Young Builder):</b> อายุน้อย กล้าเสี่ยงสูง วินัยดี ไร้ภาระ</li>
                    <li><b>3. ครอบครัวมาตรฐาน (Standard Family):</b> วัยกลางคน ภาระปานกลาง ทุกอย่างทรงตัว</li>
                    <li><b>4. คู่รักไร้บุตร (High-Earner DINKs):</b> รายได้สูง วินัยดี กล้าเสี่ยง หนี้ต่ำ</li>
                    <li><b>5. ผู้บริหาร (HNW/Legacy):</b> ทรัพย์สินสูงมาก ปลอดหนี้ วินัยยอดเยี่ยม</li>
                    <li><b>6. เศรษฐีวัยเกษียณ (UHNW Retiree):</b> ทรัพย์สินมหาศาล ไร้หนี้ รับความเสี่ยงต่ำ</li>
                    <li><b>7. เกษียณอายุทั่วไป (Basic Retiree):</b> ทรัพย์สินจำกัด รับความเสี่ยงได้ต่ำสุด</li>
                </ul>
            </div>

            <!-- ขั้นตอนที่ 2: Decision Tree & Anomaly -->
            <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm flex flex-col">
                <b class="text-emerald-800 mb-2 flex items-center gap-2">Step 2: ซอยย่อยเฉพาะบุคคล (Micro Segmentation ด้วย Decision Tree)</b>
                <span class="text-xs text-gray-700 mb-2">โมเดลจะแตกกิ่งก้าน (Branching) โดยใช้ <b>"ภาระครอบครัว (Dependents)"</b> เป็นแกนหลัก และซอยย่อยตาม อายุ, รายได้, ทรัพย์สิน ฯลฯ พร้อมกลไกตรวจจับความผิดปกติ:</span>
                <ul class="text-[11px] list-disc list-inside p-3 font-mono bg-white border border-emerald-100 rounded-lg text-emerald-900 space-y-1.5 mb-1">
                    <li><b>Hard Rule:</b> หากพบว่าภาระหนี้ (DTI) > 60% ระบบจะปัดตกไปกลุ่ม <i>"หนี้ล้นพ้นตัว"</i> ทันทีโดยไม่สนอายุและรายได้</li>
                    <li><b>Anomaly Detection:</b> หากระยะห่าง (Distance) จากกลุ่ม K-Means > 1.85 ระบบจะตั้ง Flag ว่า <b>[Anomaly Detected]</b> เนื่องจากลูกค้ามีพฤติกรรมขัดแย้งในตัวเอง (เช่น รายได้ต่ำแต่ทรัพย์สินร้อยล้าน)</li>
                </ul>
            </div>

            <!-- ขั้นตอนที่ 3: Yellow Flags -->
            <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm flex flex-col">
                <b class="text-yellow-800 mb-2">Step 3: ตรวจจับพฤติกรรมเสี่ยง & หักลดทอนคะแนน (Probability Discounting)</b>
                <span class="text-xs text-gray-700 mb-2">แม้ ML จะประเมินโอกาสบรรลุเป้าหมายไว้สูง แต่ถ้าพบ "พฤติกรรมที่ไม่พึงประสงค์" (Warning Flags) ระบบจะบวกสะสมอัตราส่วนลด (Discount Rate: &Sigma;D<sub>rate</sub>) เพื่อดรอปคะแนนลง:</span>
                <ul class="text-[11px] list-none p-3 font-mono bg-white border border-yellow-100 rounded-lg text-yellow-900 space-y-1 mb-2">
                    <li>if(พบ "ละเลยความคุ้มครอง") &Sigma;D<sub>rate</sub> += 0.15 <i>(หัก 15%)</i></li>
                    <li>if(พบ "กับดักไลฟ์สไตล์") &Sigma;D<sub>rate</sub> += 0.10 <i>(หัก 10%)</i></li>
                    <li>if(พบ "กอดเงินสดมากไป") &Sigma;D<sub>rate</sub> += 0.05 <i>(หัก 5%)</i></li>
                </ul>
                <p class="text-[10px] text-yellow-700 italic border-l-2 border-yellow-400 pl-2"><b>*Guardrail Constraint:</b> จำกัดให้ &Sigma;D<sub>rate</sub> หักสูงสุดไม่เกิน 0.50 (50%)</p>
            </div>

            <!-- ขั้นตอนที่ 4: Red Flags -->
            <div class="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm flex flex-col">
                <b class="text-red-800 mb-2">Step 4: ตรวจจับวิกฤตและล็อกเพดานคะแนน (Critical Flags / Hard Caps)</b>
                <span class="text-xs text-gray-700 mb-2">หากพบพฤติกรรมเสี่ยงต่อ "การล้มละลาย" กฎของมนุษย์ (Expert Heuristics) จะ <b>เข้าแทรกแซง (Overriding)</b> และล็อกเพดานสูงสุด (Maximum Limit) ทันที ไม่ว่า ML จะคำนวณมาสูงแค่ไหน:</span>
                <ul class="text-[11px] list-none p-3 font-mono bg-white border border-red-100 rounded-lg text-red-900 space-y-1 mb-1">
                    <li>if(พบ "หนี้สินอันตราย/หนี้นอกระบบ") &rarr; Cap<sub>hard</sub> = 30.0%</li>
                    <li>if(พบ "หมุนเงินชนเดือน/พึ่งพาสินเชื่อ") &rarr; Cap<sub>hard</sub> = 50.0%</li>
                    <li>else (ไม่พบความเสี่ยงร้ายแรง) &rarr; Cap<sub>hard</sub> = 100.0% (No Cap)</li>
                </ul>
            </div>

            <!-- ขั้นตอนที่ 5: End-to-End Execution -->
            <div class="bg-slate-800 p-4 rounded-xl shadow-sm flex flex-col text-white">
                <b class="text-cyan-400 mb-2">Step 5: สมการรวบยอด & ตัวอย่างการทำงาน (End-to-End Execution)</b>
                <div class="bg-slate-900 p-3 rounded-lg font-mono text-[11px] border border-slate-700 text-cyan-100 mb-3 space-y-1 overflow-x-auto shadow-inner">
                    <p><b>1. ตัด Discount:</b> P<sub>discounted</sub> = P<sub>ML</sub> &times; (1 - &Sigma;D<sub>rate</sub>)</p>
                    <p><b>2. บังคับ Cap:</b> P<sub>final</sub> = max(0.1, min(99.9, min(P<sub>discounted</sub>, Cap<sub>hard</sub>)))</p>
                </div>
                
                <div class="bg-slate-700/50 p-3 rounded border border-slate-600 text-[11px] text-gray-200 space-y-1">
                    <b class="text-white">Case Study (ลูกค้าคะแนน ML ประเมินตั้งต้นมาที่ 80%):</b><br>
                    <span class="text-slate-300">- พบละเลยความคุ้มครอง(+0.15) และหมุนเงินชนเดือน(Cap=50%)</span><br>
                    <span class="text-yellow-400">- <b>คำนวณ Discount:</b> 80% &times; (1 - 0.15) = <b>68.0%</b></span><br>
                    <span class="text-red-400">- <b>ชนเพดาน Cap:</b> min(68.0%, 50.0%) = <b>50.0%</b></span><br>
                    <span class="text-emerald-400 font-bold">- <b>คะแนนสุทธิ (P<sub>final</sub>) = 50.0%</b> (ระบบแจ้งเตือนความเสี่ยงให้ลูกค้าและ FA ทราบ)</span>
                </div>
            </div>

        </div>`
    },
    "math-market": {
        icon: "📉",
        iconClass: "bg-blue-100 text-blue-600",
        title: "ส่วนที่ 9: สมการผลตอบแทนตลาดและสภาวะวิกฤต (Market Dynamics)",
        content: `
        <p class="mb-3 text-sm text-gray-700">วิศวกรรมการเงินที่รองรับเหตุการณ์ไม่คาดฝัน (Black Swan) และวัฏจักรตลาด (Market Regimes)</p>
        <div class="space-y-4">

            <!-- กล่องที่ 1: ทฤษฎีวิชาการ -->
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-red-800 mb-2 flex items-center gap-2">1. ทฤษฎี: Merton's Jump Diffusion Model</b>
                <span class="text-xs text-gray-700 mb-2"><b>ข้อจำกัดของโมเดลทั่วไป:</b> ทฤษฎีการเงินดั้งเดิม (Geometric Brownian Motion) มักประเมินว่าผลตอบแทนกระจายตัวแบบระฆังคว่ำ (Normal Distribution) ซึ่งอธิบายโลกจริงไม่ได้เพราะมองข้าม <b>Fat Tails</b> (วิกฤตที่เกิดบ่อยและรุนแรงกว่าทฤษฎี) อัลกอริทึมนี้จึงเพิ่ม <b>Poisson Process</b> เข้าไปเพื่อจำลอง "การพังทลายของตลาดอย่างฉับพลัน" (Jump)</span>

                <div class="bg-red-50 p-3 rounded-lg font-mono text-[11px] border border-red-100 text-red-900 mb-3 overflow-x-auto space-y-2">
                    <p class="text-center font-bold">R<sub>yearly</sub> = exp[ (&mu; - &sigma;<sup>2</sup>/2)&Delta;t + &sigma;&radic;&Delta;t Z + J(&pi;) ] - 1</p>
                    <ul class="list-none pl-2 text-[10px] text-red-800 mt-1 border-t border-red-200 pt-1 space-y-1">
                        <li><b>&mu;, &sigma;:</b> อัตราผลตอบแทนและความผันผวนในสภาวะตลาดปกติ</li>
                        <li><b>Z:</b> ตัวแปรสุ่มการแกว่งตัวรายวัน (Brownian Motion)</li>
                        <li><b>J(&pi;):</b> ขนาดของวิกฤต (Jump Size) <i>*จะถูกคำนวณก็ต่อเมื่ออัลกอริทึมสุ่ม Poisson Process (&pi;) เจอวิกฤตเท่านั้น</i></li>
                    </ul>
                </div>
            </div>

            <!-- กล่องที่ 2: ตัวอย่าง Case Study & Action Plan -->
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-red-800 mb-2">2. การจำลองสภาวะตลาดของระบบ (Market Simulation Case Study)</b>
                <span class="text-xs text-gray-700 mb-2"><b>สมมติฐานระบบ:</b> กำหนดให้ตลาดหุ้นมีความถี่เกิดวิกฤตใหญ่เฉลี่ย 1 ครั้งในทุก 10 ปี (Jump Frequency = 10%) และเมื่อเกิดวิกฤต ตลาดจะร่วงเฉลี่ย -25% (Jump Size)</span>

                <div class="bg-gray-50 p-3 rounded border text-[11px] text-gray-700 mb-3 space-y-1 shadow-inner">
                    <b class="text-gray-800">การคำนวณของอัลกอริทึม (Monte Carlo Run):</b><br>
                    <span class="text-green-700">- <b>สุ่มเจอปีปกติ (Poisson = 0):</b> เทอมวิกฤตไม่ทำงาน พอร์ตเติบโตตามค่า &mu; ปกติ อาจจบปีที่ +10% หรือ -5%</span><br>
                    <span class="text-red-600 font-bold">- <b>สุ่มเจอปีวิกฤต (Poisson = 1):</b> แจ็คพอตแตก! เทอม J(&pi;) จะดึงพอร์ตลงทันที -25% ผนวกกับความผันผวนเดิม (Z) ทำให้ปีนั้นพอร์ตอาจติดลบพังทลายถึง -35% (Black Swan Event)</span>
                </div>

                <i class="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> ใช้ฟังก์ชัน <b>Stress Test</b> ให้ลูกค้าเห็นภาพว่า "ถ้าพอร์ต 10 ล้าน เจอวิกฤตแบบโควิดจนเงินหายไป 3.5 ล้านในเดือนเดียว ลูกค้าจะนอนหลับหรือไม่?" หากคำตอบคือไม่ FA ต้องเสนอสินทรัพย์ทางเลือก หรือผลิตภัณฑ์กลุ่ม Guarantee Return ทันที</i>
            </div>

        </div>`
    },
    "math-accum": {
        icon: "📈",
        iconClass: "bg-blue-100 text-blue-600",
        title: "ส่วนที่ 10: กลไกช่วงสะสมความมั่งคั่ง (Accumulation Phase Dynamics)",
        content: `
        <p class="mb-3 text-sm text-gray-700">จำลองการเติบโตของพอร์ตแบบความน่าจะเป็น (Stochastic Growth) ก่อนวัยเกษียณผ่าน Monte Carlo Simulation</p>
        <div class="space-y-4">
            
            <!-- กล่องที่ 1: Dynamic Glide Path -->
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-blue-800 mb-2">1. โมเดลปรับลดความเสี่ยงอัตโนมัติ (Dynamic Glide Path Model)</b>
                <span class="text-xs text-gray-700 mb-2"><b>สมมติฐานทางวิชาการ:</b> โปรแกรมจะไม่ใช้ผลตอบแทนคงที่ แต่จะปรับลดค่าคาดหวังผลตอบแทน (&mu;) และความผันผวน (&sigma;) ตามระยะเวลาที่เหลือจนถึงเกษียณ (T) ด้วยสมการ Linear Interpolation เพื่อลด <b>Sequence of Return Risk</b> (ความเสี่ยงจากลำดับผลตอบแทนที่เลวร้ายในช่วงใกล้เกษียณ)</span>
                
                <div class="bg-blue-50 p-3 rounded-lg font-mono text-[11px] border border-blue-100 text-blue-900 space-y-2 mb-3">
                    <p><b>Linear Interpolation Equation:</b></p>
                    <p>&sigma;<sub>t</sub> = &sigma;<sub>start</sub> - [ (&sigma;<sub>start</sub> - &sigma;<sub>target</sub>) &times; (t / T) ]</p>
                </div>

                <div class="bg-white/70 p-3 rounded border border-blue-100 text-[11px] text-gray-700 mb-3 space-y-1">
                    <b class="text-blue-800">Case Study การทำงานของระบบ:</b><br>
                    <span>ลูกค้าอายุ 50 ปี (เหลือ 10 ปีก่อนเกษียณ) มีพอร์ตเติบโตสูง (&mu;=8%, &sigma;=15%) โปรแกรมจะตั้งเป้าหมายพอร์ตวัยเกษียณที่ปลอดภัย (&mu;=4%, &sigma;=5%)</span><br>
                    <span class="text-orange-600 font-semibold">&rarr; ระบบจะจำลองลดความผันผวน (&sigma;) ลงปีละ 1% อัตโนมัติ: ปีที่ 51(&sigma;=14%), ปีที่ 52(&sigma;=13%)... ไปจนถึงปีที่ 60(&sigma;=5%)</span>
                </div>

                <i class="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> อธิบายลูกค้าว่าโปรแกรมนี้จำลองโลกแห่งความเป็นจริง หากไม่ลดสัดส่วนหุ้นลงตาม Glide Path นี้ แล้วเกิดวิกฤตเศรษฐกิจตอนอายุ 59 ปี เงินต้นอาจหายไปถึง 30-40% โดยไม่มีเวลาให้แก้ตัว</i>
            </div>

            <!-- กล่องที่ 2: Stochastic Wealth Equation -->
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-blue-800 mb-2">2. สมการทบต้นความมั่งคั่งเชิงสถิติ (Stochastic Wealth Accumulation)</b>
                <span class="text-xs text-gray-700 mb-2"><b>กลไกการคำนวณ:</b> ตัวแปร R<sub>t</sub> ไม่ใช่ค่าคงที่ (Deterministic) แต่เป็น <b>ตัวแปรสุ่ม (Random Variable)</b> ที่ดึงมาจาก Log-Normal Distribution ทำให้การจำลอง 10,000 ครั้ง จะเกิดเส้นทางความมั่งคั่ง (Wealth Paths) ที่แตกต่างกันออกไป</span>
                
                <div class="mt-2 mb-3 bg-gray-50 p-3 rounded-lg font-mono text-xs border border-gray-200 text-center text-blue-900 shadow-inner">
                    W<sub>t</sub> = [ W<sub>t-1</sub> &times; (1 + R<sub>t</sub>) ] + Savings<sub>t</sub>
                </div>

                <div class="bg-white/70 p-3 rounded border border-gray-200 text-[11px] text-gray-700 mb-3 space-y-1">
                    <b class="text-gray-800">ตัวอย่างจำลอง 2 เส้นทาง (เงินต้น 1M, ออมเพิ่ม 100K/ปี):</b><br>
                    <span class="text-green-700">- <b>เส้นทางโชคดี (95th Percentile):</b> ตลาดเป็นขาขึ้นต่อเนื่อง R<sub>t</sub> สุ่มได้ +15%, +10% ฯลฯ ตอนจบพอร์ตอาจโตทะลุ 5 ล้านบาท</span><br>
                    <span class="text-red-600">- <b>เส้นทางโชคร้าย (5th Percentile):</b> ตลาดผันผวนหนัก R<sub>t</sub> สุ่มเจอ -20%, +5%, -10% พอร์ตอาจจบแค่ 1.5 ล้านบาท</span>
                </div>

                <i class="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> ให้ลูกค้าโฟกัสที่เส้น <b>5th Percentile (แย่ที่สุด)</b> เป็นหลัก หากในสถานการณ์ที่โชคร้ายที่สุด เป้าหมายการเงินยังคงสำเร็จได้ นั่นแปลว่าแผนที่ FA จัดให้มีความ Robust (ทนทานต่อแรงกระแทก) สูงมาก</i>
            </div>

        </div>`
    },
    "math-decum": {
        icon: "🏛️",
        iconClass: "bg-blue-100 text-blue-600",
        title: "ส่วนที่ 11: กลไกหลังเกษียณและประเมินความเสี่ยงขาลง (Decumulation & Tail Risk)",
        content: `
        <p class="mb-3 text-sm text-gray-700">กลยุทธ์ป้องกันเงินหมดก่อนตาย (Longevity Risk) และการบริหารกระแสเงินสดภายใต้ความผันผวน</p>
        <div class="space-y-4">
            
            <!-- กล่องที่ 1: Guyton-Klinger -->
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-purple-800 mb-2">1. ทฤษฎีถอนเงินแบบไดนามิก (Guyton-Klinger Decision Rules)</b>
                <span class="text-xs text-gray-700 mb-2">อัลกอริทึมนี้เหนือกว่ากฎ 4% ทั่วไป ด้วยการใช้ <b>Capital Preservation Rule</b> เพื่อเตือนให้ปรับลดยอดถอนเมื่อตลาดทรุด ป้องกันภาวะ Sequence of Return Risk ในช่วงต้นของการเกษียณ</span>
                
                <div class="bg-purple-50 p-3 rounded-lg border border-purple-100 text-[11px] text-purple-900 mb-3 space-y-2">
                    <p><b>ตัวอย่างการทำงานของอัลกอริทึมในโปรแกรม:</b></p>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                        <li><b>ตั้งต้น:</b> พอร์ต 10 ล้านบาท ถอนปีแรก 400,000 บาท (อัตราถอนเริ่มต้น IWR = 4%)</li>
                        <li><b>วิกฤต:</b> ปีถัดมาหุ้นตก พอร์ตหดเหลือ 8 ล้าน (หากถอน 400,000 เท่าเดิม อัตราถอนปัจจุบัน CWR จะกลายเป็น 5%)</li>
                        <li><b>Trigger:</b> อัลกอริทึมตรวจพบว่า CWR (5%) สูงกว่า IWR (4%) <b>เกิน 20%</b> ระบบจะสั่ง Trigger กฎลดการถอนทันที</li>
                        <li><b>Action:</b> ระบบปรับลดยอดถอนลง 10% (เหลือ 360,000 บาท/ปี) เพื่อยืดอายุพอร์ตไม่ให้พังทลาย</li>
                    </ul>
                </div>
                <i class="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> ใช้โปรแกรมจำลองเปรียบเทียบให้ลูกค้าเห็นว่า หากดึงดันถอนเงินเท่าเดิมในวิกฤต เงินจะหมดก่อนอายุ 80 ปี แต่ถ้ายอมลดไลฟ์สไตล์ลงตามที่ระบบแจ้งเตือน จะมีเงินใช้จนถึงอายุ 90 ปี</i>
            </div>

            <!-- กล่องที่ 2: CVaR -->
            <div class="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm flex flex-col">
                <b class="text-red-800 mb-2">2. การประเมินความเสี่ยงด้านหาง (Tail Risk: Expected Shortfall / CVaR)</b>
                <span class="text-xs text-gray-700 mb-2">Value at Risk (VaR) บอกแค่ว่า "โอกาสขาดทุนสูงสุดอยู่ที่เท่าไหร่" แต่ CVaR (Conditional VaR) เจาะลึกระดับสถาบันการเงินเพื่อตอบคำถามว่า <b>"ถ้าทะลุจุด VaR ไปแล้ว โดยเฉลี่ยพอร์ตจะพังแค่ไหน"</b></span>
                
                <div class="mt-2 mb-2 font-mono text-[11px] bg-white p-3 border border-red-200 rounded-lg text-center text-red-900 shadow-inner">
                    CVaR<sub>95%</sub>(X) = E[ X | X &le; VaR<sub>95%</sub>(X) ]
                </div>

                <div class="bg-white/70 p-3 rounded border border-red-100 text-[11px] text-gray-700 mb-3 space-y-1">
                    <b class="text-red-800">Case Study การแปลผลให้ลูกค้า (พอร์ต 10 ล้านบาท):</b><br>
                    <span class="text-orange-600 font-semibold">- VaR (95%) = -15%:</span> มั่นใจ 95% ว่าพอร์ตจะไม่ขาดทุนเกิน 1.5 ล้านบาท<br>
                    <span class="text-red-600 font-bold">- CVaR (95%) = -22%:</span> <b>แต่ถ้าเกิดแจ็คพอตวิกฤตเศรษฐกิจ (Worst 5%)</b> ค่าเฉลี่ยความเสียหายคือการติดลบถึง 2.2 ล้านบาท (รุนแรงกว่า VaR มาก)
                </div>

                <i class="text-xs text-red-700 mt-auto pt-2 border-t border-red-100"><b>FA ควรทำ:</b> หากโปรแกรมประเมินค่า CVaR ออกมาลึกเกินกว่าที่ลูกค้าจะรับไหว FA ต้องพิจารณาโยกเงินบางส่วนไปซื้อ <b>ประกันบำนาญ (Annuity)</b> เพื่อสร้าง Floor การันตีกระแสเงินสดขั้นต่ำ ป้องกันหายนะ</i>
            </div>

        </div>`
    },
    "math-knapsack": {
        icon: "🎒",
        iconClass: "bg-emerald-100 text-emerald-700",
        title: "ส่วนที่ 12: อัลกอริทึมจัดกระเป๋าผลิตภัณฑ์ (DP Knapsack & Optimization)",
        content: `
        <p class="mb-3 text-sm text-gray-700">การจัดสรรงบประมาณเพื่อซื้อผลิตภัณฑ์การเงินให้ได้ "อรรถประโยชน์รวมสูงสุด" (Maximum Total Utility)</p>
        <div class="space-y-4">
            
            <!-- กล่องที่ 1: ทฤษฎีวิชาการ -->
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-emerald-800 mb-2">ทฤษฎี: Dynamic Programming & Multi-Objective Optimization</b>
                <span class="text-xs text-gray-700 mb-2">ประยุกต์ใช้ <b>0/1 Knapsack Problem</b> ในการตัดสินใจเลือกผลิตภัณฑ์ (เลือก = 1, ไม่เลือก = 0) โดยมีเงื่อนไขผูกพันคือ งบประมาณ (Capacity constraints) ร่วมกับการหา <b>Pareto Frontier</b> เพื่อรักษาสมดุลระหว่างเป้าหมายที่ขัดแย้งกัน (เช่น ทุนชีวิต vs ค่ารักษา)</span>
                <div class="bg-emerald-50 p-3 rounded-lg font-mono text-[11px] border border-emerald-100 text-emerald-900 space-y-2 mb-2 overflow-x-auto">
                    <p><b>State Transition Equation:</b></p>
                    <p class="font-bold">DP[i][w] = max( DP[i-1][w], DP[i-1][w - P<sub>i</sub>] + U<sub>i</sub> )</p>
                    <ul class="list-none pl-2 text-[10px] text-emerald-800 mt-1 border-t border-emerald-200 pt-1">
                        <li>i = ผลิตภัณฑ์ชิ้นที่ i, w = งบประมาณปัจจุบัน</li>
                        <li>P<sub>i</sub> = เบี้ยประกัน (Cost), U<sub>i</sub> = อรรถประโยชน์ (Utility Score)</li>
                    </ul>
                </div>
            </div>

            <!-- กล่องที่ 2: ตัวอย่าง Case Study & Action Plan -->
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-emerald-800 mb-2">ตัวอย่างการทำงานของอัลกอริทึม (Case Study)</b>
                <span class="text-xs text-gray-700 mb-2"><b>โจทย์:</b> ลูกค้ามีงบประมาณสูงสุด (Budget<sub>max</sub>) = <b>20,000 บาท/ปี</b></span>
                
                <table class="w-full text-[11px] text-left border-collapse mb-3">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border p-1.5 font-semibold text-gray-700">ผลิตภัณฑ์ (Items)</th>
                            <th class="border p-1.5 font-semibold text-gray-700 text-center">เบี้ย (P)</th>
                            <th class="border p-1.5 font-semibold text-gray-700 text-center">คะแนน (U)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="border p-1.5">1. สุขภาพเหมาจ่าย (Major Med)</td><td class="border p-1.5 text-center text-red-600">15,000</td><td class="border p-1.5 text-center text-green-600 font-bold">80</td></tr>
                        <tr><td class="border p-1.5">2. ประกันชีวิต (ทุนชีวิต)</td><td class="border p-1.5 text-center text-red-600">4,000</td><td class="border p-1.5 text-center text-green-600 font-bold">40</td></tr>
                        <tr><td class="border p-1.5">3. ชดเชยรายวัน (HB)</td><td class="border p-1.5 text-center text-red-600">3,000</td><td class="border p-1.5 text-center text-green-600 font-bold">15</td></tr>
                    </tbody>
                </table>

                <div class="bg-gray-50 p-3 rounded border text-[11px] text-gray-700 mb-3 space-y-1">
                    <b class="text-gray-800">การประเมินเพื่อหาจุด Optimal:</b><br>
                    <span class="text-gray-500">- Option A (1+3):</span> จ่าย 18,000 บาท | ได้ Utility 95<br>
                    <span class="text-green-700 font-bold">- Option B (1+2): จ่าย 19,000 บาท | ได้ Utility 120 (Winner 🏆)</span><br>
                    <span class="text-red-500">- Option C (1+2+3):</span> จ่าย 22,000 บาท | <i>(อัลกอริทึมตัดทิ้ง เพราะละเมิดกฎ Budget constraints)</i>
                </div>

                <i class="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> ใช้ตรรกะนี้อธิบายให้ลูกค้าเห็นภาพว่า ทำไมการจัดพอร์ตแบบ Option B จึง "คุ้มค่าเงินทุกบาท" มากกว่าการพยายามซื้อประกันให้ครบทุกแบบ แต่สุดท้ายได้ความคุ้มครองที่น้อยกว่าและไม่แก้ปัญหาหลัก (Sub-optimal Choice)</i>
            </div>

        </div>`
    },
    "math-taxalpha": {
        icon: "⚖️",
        iconClass: "bg-orange-100 text-orange-600",
        title: "ส่วนที่ 13: อัลกอริทึมประเมินภาษีเชิงรุก (Tax Alpha Engine)",
        content: `
        <p class="mb-3 text-sm text-gray-700">ระบบคำนวณประหยัดภาษี (Tax Optimization) อิงตามกฎหมาย ภ.ง.ด. 90/91 (เกณฑ์ล่าสุด)</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <b class="text-orange-800 mb-1">Greedy Tax Alpha Optimization</b>
                <span class="text-xs text-gray-700 mb-2">อัลกอริทึมจะสแกนช่องว่างลดหย่อนและเลือกลงทุนในช่องทางที่คุ้มค่าที่สุดก่อน <b>โดย AI มีกฎเหล็กคือ จะแนะนำลงทุนพื่อลดหย่อนก็ต่อเมื่อฐานภาษีส่วนเพิ่ม (Marginal Tax Rate) > 10% ขึ้นไปเท่านั้น</b> (เพราะหากฐานภาษีต่ำกว่านี้ การเสียสภาพคล่องไปกับการล็อคเงินลงทุนระยะยาวจะไม่คุ้มค่า)</span>
                <div class="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-3">
                    <ul class="text-[11px] list-decimal list-inside space-y-2 text-orange-900">
                        <li><b>Priority 1: กองทุน Thai ESG</b> (สภาพคล่องดีกว่า เงื่อนไขล็อคแค่ 5 ปี นับจากวันที่ซื้อ)</li>
                        <li><b>Priority 2: กลุ่มเกษียณ RMF / SSF / ประกันบำนาญ</b> (เหมาะสำหรับวางแผนลดหย่อนบวกเกษียณระยะยาว)</li>
                    </ul>
                </div>
                <i class="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100"><b>FA ควรทำ:</b> แนะนำให้ลูกค้านำ "เงินคืนภาษี" (Tax Refund) ที่ได้กลับมา Re-invest เสมอ เพื่อสร้างพลังดอกเบี้ยทบต้น (Compound Effect) แบบก้าวกระโดด</i>
            </div>
        </div>`
    },
    "term-invest": {
        icon: "📈",
        iconClass: "bg-gray-100 text-gray-600",
        title: "ส่วนที่ 14: การวิเคราะห์และกลยุทธ์การลงทุน (Investment & Strategy)",
        content: `
        <ul class="list-disc list-inside mt-2 space-y-3 text-sm text-gray-700">
            <li><b>Asset Allocation (การจัดสรรสินทรัพย์):</b> หัวใจสำคัญของการลงทุนที่ส่งผลต่อผลตอบแทนระยะยาวถึง 90% เน้นกระจายเงินไปในหลายสินทรัพย์ (หุ้น, ตราสารหนี้, อสังหาฯ) <i>เพื่อลดความผันผวน และควรทำ Portfolio Rebalancing (การปรับสมดุลพอร์ต) อย่างน้อยปีละครั้งเพื่อรักษาระดับความเสี่ยง</i></li>
            <li><b>Expected Shortfall (CVaR 95%):</b> ตัวเลขประเมินความเสี่ยงที่บอกว่า <i>"ในสถานการณ์ตลาดพังพินาศที่สุด 5% พอร์ตเราจะติดลบเฉลี่ยเท่าไหร่"</i> เป็นข้อมูลสำคัญที่ FA ต้องแจ้งเพื่อให้ลูกค้าประเมินความสามารถในการรับความเสี่ยงใน Worst-case scenario ได้</li>
            <li><b>Tax Alpha (ผลตอบแทนส่วนเพิ่มจากภาษี):</b> การสร้าง "กำไรที่ไร้ความเสี่ยงตลาด" ผ่านการวางแผนภาษี (เช่น RMF, SSF, ThaiESG หรือ ประกันชีวิต) <i>หากลูกค้านำเงินคืนภาษีที่ได้ไป Re-invest ต่อเนื่อง จะเกิดพลังของดอกเบี้ยทบต้น (Compound Effect) มหาศาล</i></li>
            <li><b>DCA vs Lump Sum:</b> <b>DCA</b> (ทยอยลงทุนเท่าๆ กัน) ช่วยรักษาวินัย ตัดอารมณ์ตลาด และถัวเฉลี่ยต้นทุน เหมาะกับมนุษย์เงินเดือน | <b>Lump Sum</b> (ลงทุนก้อนเดียว) มักให้ผลตอบแทนโดยรวมดีกว่าในตลาดขาขึ้น แต่ต้องใช้ความชำนาญในการจับจังหวะ (Market Timing)</li>
        </ul>
        <div class="mt-5 p-4 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
            <h5 class="font-bold text-emerald-900 mb-3 flex items-center gap-2"><span class="text-lg">🎯</span> กลยุทธ์การจัดพอร์ตแบบ Core & Satellite Strategy</h5>
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
        </div>`
    },
    "term-behavior": {
        icon: "🎭",
        iconClass: "bg-gray-100 text-gray-600",
        title: "ส่วนที่ 15: จิตวิทยาและพฤติกรรมทางการเงิน (Behavioral Finance & DISC)",
        content: `
        <ul class="list-disc list-inside mt-2 space-y-3 text-sm text-gray-700">
            <li><b>Loss Aversion (อคติเกลียดกลัวการขาดทุน):</b> มนุษย์จะรู้สึกเจ็บปวดกับการเสียเงิน มากกว่าความสุขที่ได้เงินจำนวนเท่ากันถึง 2 เท่า <i>ส่งผลให้มัก "ถือหุ้นติดดอย" เพราะไม่อยากรับรู้การขาดทุน และรีบ "ขายหมู" เพราะกลัวกำไรหาย</i></li>
            <li><b>Mental Accounting (การแบ่งบัญชีในใจ):</b> อคติที่คนเราให้มูลค่าของเงินไม่เท่ากันตาม "ที่มา" เช่น ได้โบนัสมามักจะนำไปซื้อของฟุ่มเฟือยได้ง่ายกว่าเงินเดือน ทั้งที่มูลค่าเงินเท่ากัน</li>
            <li><b>Lifestyle Creep (กับดักไลฟ์สไตล์):</b> ภาวะที่ค่าใช้จ่ายรายเดือนขยับเพิ่มขึ้นเงียบๆ ตามรายได้ที่สูงขึ้น (Parkinson's Law) ทำให้หาเงินได้มากแค่ไหนก็ไม่มีเงินเก็บ <i>วิธีแก้คือต้องทำระบบหักเงินออมอัตโนมัติ (Automated Savings)</i></li>
            <li><b>Debt Clearance Strategy (กลยุทธ์ปลดหนี้):</b> 
                <b>Snowball:</b> โปะยอดน้อยสุดก่อนเพื่อสร้างกำลังใจ (เน้นผลทางจิตวิทยา) | 
                <b>Avalanche:</b> โปะหนี้ดอกเบี้ยแพงสุดก่อนเพื่อลดภาระโดยรวม (เน้นผลทางคณิตศาสตร์)
            </li>
        </ul>
        <div class="mt-5 p-4 bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm">
            <h5 class="font-bold text-indigo-900 mb-3 flex items-center gap-2"><span class="text-lg">🗣️</span> ทฤษฎีพฤติกรรมลูกค้า (DISC Personality Model)</h5>
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
        </div>`
    }
};

// Export (หากใช้งานผ่าน Webpack/Node)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { systemDictionary };
}