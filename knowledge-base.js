// ==========================================
// 📚 Financial Planner - Comprehensive Knowledge Base Module (4 Pillars UI Version)
// ไฟล์นี้รวบรวมคู่มือการใช้งาน พจนานุกรมคำอธิบายระบบ และทฤษฎีอ้างอิงทั้งหมด
// ปรับโครงสร้างเป็น 4 หมวดหมู่หลัก เพื่อประสบการณ์ใช้งานระดับ Enterprise
// ==========================================

window.systemDictionary = {
    
    // ==========================================
    // 🔵 ส่วนที่ 1: บทนำและวิสัยทัศน์ (Vision & Introduction) -> category: "c1"
    // ==========================================
    "c1_vision": {
        category: "c1",
        icon: "🎯",
        iconClass: "bg-emerald-100 text-emerald-600",
        title: "บทนำและวิสัยทัศน์ (Vision & Introduction)",
        content: `
            <div class="text-sm text-gray-700 leading-relaxed space-y-5 pl-0 antialiased touch-manipulation">
                <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🧭</div>
                    <p class="text-xl md:text-2xl font-bold italic mb-2 relative z-10 leading-tight">"ยกระดับการวางแผนการเงิน จากเส้นตรงบนกระดาษคำนวณ สู่ห้องทดลองชีวิตเสมือนจริง"</p>
                    <p class="text-emerald-200 text-xs md:text-sm relative z-10 font-medium tracking-wide">Empowering Advisors. Transforming Lives. Securing Futures.</p>
                </div>
                <div class="space-y-3 px-2">
                    <p><b>Financial Planner Pro Advisor</b> กำเนิดขึ้นจากความเข้าใจอย่างลึกซึ้งว่า <i>"ชีวิตคนเราไม่ใช่สมการเส้นตรง"</i></p>
                    <p>การวางแผนการเงินแบบดั้งเดิม (Deterministic Approach) มักตั้งสมมติฐานที่สวยหรูเกินจริง เช่น <i>"พอร์ตจะโต 5% เป๊ะๆ ทุกปี"</i> หรือ <i>"ลูกค้าจะออมเงินได้ต่อเนื่องโดยไม่มีสะดุด"</i> ซึ่งเมื่อนำไปใช้จริง แผนเหล่านี้มักจะพังทลายลงเมื่อเจอกับ <b>วิกฤตเศรษฐกิจ ความผันผวนของตลาด และอคติทางอารมณ์ของมนุษย์ (Behavioral Bias)</b></p>
                    <p>เพื่อลบจุดอ่อนเหล่านั้น ระบบนี้จึงถูกพัฒนาขึ้นให้เป็น <b>"Hybrid Co-Advisor" (ผู้ช่วยที่ปรึกษาอัจฉริยะ)</b> ที่ผสาน 3 เสาหลักเข้าด้วยกัน เพื่อสร้างแผนการเงินที่ทนทานต่อความเป็นจริง:</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner select-none">🎓</div>
                        <h4 class="font-bold text-gray-800 mb-2">มาตรฐานวิชาชีพ<br>(CFP Standards)</h4>
                        <p class="text-xs text-gray-600">ยึดหลักการวินิจฉัยงบดุล กระแสเงินสด และอัตราส่วนทางการเงินที่แม่นยำตามมาตรฐานสากล เพื่ออุดรอยรั่วและสร้างรากฐานที่แข็งแกร่ง</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner select-none">🧠</div>
                        <h4 class="font-bold text-gray-800 mb-2">ปัญญาประดิษฐ์<br>(Data Science & AI)</h4>
                        <p class="text-xs text-gray-600">ใช้โมเดล Machine Learning ประเมินโอกาสสำเร็จ จำลองวิกฤต (Stress Test) และจัดกลุ่มพฤติกรรมลูกค้าอัตโนมัติ เพื่อสร้างแผนที่ทำได้จริง</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner select-none">🔒</div>
                        <h4 class="font-bold text-gray-800 mb-2">ความปลอดภัยสูงสุด<br>(Privacy-First)</h4>
                        <p class="text-xs text-gray-600">การประมวลผลเป็นแบบ <b>100% Local Execution</b> เกิดขึ้นบนอุปกรณ์ของคุณเท่านั้น ปราศจากการส่งข้อมูลขึ้นคลาวด์ ปลอดภัยตามมาตรฐาน PDPA</p>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100 mt-6 shadow-sm relative">
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
    "c1_pdpa": {
        category: "c1",
        icon: "🔒",
        iconClass: "bg-teal-100 text-teal-700",
        title: "การสร้างความไว้วางใจเรื่องข้อมูลส่วนบุคคล (PDPA & Privacy Script)",
        content: `
            <div class="antialiased touch-manipulation pb-safe">
                <div class="p-5 text-sm text-gray-700 space-y-4">
                    <p class="leading-relaxed">เนื่องจากแอปนี้ต้องใช้ข้อมูลความมั่งคั่งเชิงลึกของลูกค้า ลูกค้ากลุ่ม HNW มักจะมีความกังวลเรื่องข้อมูลรั่วไหลเป็นพิเศษ คุณสามารถใช้คุณสมบัติสถาปัตยกรรมของแอปนี้ให้เป็น <b>"จุดขาย (Selling Point)"</b> ด้านความปลอดภัยเพื่อยกระดับความเป็นมืออาชีพ (Professionalism) ได้เลยครับ</p>
                    <div class="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm relative overflow-hidden">
                        <div class="absolute -right-2 -top-2 text-6xl opacity-10 select-none pointer-events-none">💬</div>
                        <b class="text-emerald-800 text-sm block mb-2 relative z-10">💬 บทสนทนาสร้างความมั่นใจสำหรับ FA (Privacy Script)</b>
                        <p class="text-[12px] text-gray-700 leading-relaxed border-l-4 border-emerald-500 pl-4 py-2 bg-white rounded shadow-sm italic relative z-10">
                            "คุณลูกค้าสบายใจเรื่องข้อมูลส่วนตัวได้ 100% เลยนะครับ ระบบวิเคราะห์ปัญญาประดิษฐ์ที่ผมนำมาใช้วางแผนให้คุณลูกค้าในวันนี้ เป็นสถาปัตยกรรมแบบ <b>Local Encrypted System</b> หมายความว่า ข้อมูลความมั่งคั่งทุกตัวอักษร จะถูกเข้ารหัสความปลอดภัยขั้นสูง (AES-256) และล็อกกุญแจเก็บไว้ในชิปหน่วยความจำของ iPad เครื่องนี้ของผมเท่านั้นครับ...<br><br>จะไม่มีการอัปโหลดขึ้น Cloud, ไม่มีการส่งข้อมูลผ่านอินเทอร์เน็ต และจะไม่มีแฮกเกอร์ หรือแม้แต่นักพัฒนาแอปคนไหนสามารถดึงข้อมูลของคุณลูกค้าไปได้ ถือเป็นมาตรฐานความปลอดภัยสูงสุดที่ตามกฎหมาย PDPA ครับ"
                        </p>
                    </div>
                </div>
            </div>
        `
    },

    // ==========================================
    // 🟢 ส่วนที่ 2: คู่มือปฏิบัติการฉบับสมบูรณ์ (User Manual) -> category: "c2"
    // ==========================================
    "c2_input": {
        category: "c2",
        icon: "📋",
        iconClass: "bg-blue-100 text-blue-600",
        title: "การกรอกข้อมูลลูกค้าหน้า UI และเทคนิค Fact-Finding",
        content: `
            <div class="antialiased touch-manipulation">
                <p class="text-sm text-gray-600 mb-6 leading-relaxed">หัวใจสำคัญที่ทำให้ AI ประมวลผลได้อย่างแม่นยำ คือ <b>"คุณภาพของข้อมูลนำเข้า (Garbage In, Garbage Out)"</b> ส่วนนี้จะอธิบายขั้นตอนการเก็บข้อมูลผ่านหน้า UI แบบ Step-by-Step พร้อมเทคนิคการตั้งคำถาม (Fact-Finding)</p>
                <div class="space-y-5 mb-8">
                    <!-- STEP 1 -->
                    <div class="bg-white p-5 rounded-xl border border-red-200 shadow-sm relative overflow-hidden">
                        <div class="absolute -right-3 -top-3 text-6xl opacity-5 select-none pointer-events-none">1</div>
                        <h5 class="font-bold text-red-800 text-sm flex items-center gap-2 mb-3 border-b border-red-100 pb-2">
                            <span class="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">Step 1</span> ข้อมูลทั่วไป (General Profile)
                        </h5>
                        <p class="text-xs text-gray-700 leading-relaxed mb-3">ส่วนนี้คือการสร้าง Baseline ให้กับ AI ประกอบด้วย ชื่อ, อายุ, อาชีพ, สวัสดิการ, ประวัติสุขภาพ และความสนใจ Unit Linked</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div class="bg-red-50/50 p-3 rounded border border-red-100">
                                <b class="text-[11px] text-red-700 block mb-1">▶ อาชีพ & สวัสดิการ (Occupation & Welfare)</b>
                                <p class="text-[10px] text-gray-600"><b>ทำไม AI ต้องใช้?:</b> AI จะใช้อาชีพประเมิน "ความผันผวนของรายได้" และใช้สวัสดิการมาคำนวณหักลบ Gap ความคุ้มครองค่ารักษา</p>
                            </div>
                            <div class="bg-red-50/50 p-3 rounded border border-red-100">
                                <b class="text-[11px] text-red-700 block mb-1">▶ ประวัติสุขภาพ (Health Status)</b>
                                <p class="text-[10px] text-gray-600"><b>ทำไม AI ต้องใช้?:</b> หากเลือกว่า "มีโรคประจำตัว" AI จะปรับค่า "เงินเฟ้อทางการแพทย์" ให้สูงขึ้นอัตโนมัติ</p>
                            </div>
                        </div>
                        <div class="bg-slate-50 p-3 rounded-lg border border-slate-200 shadow-inner">
                            <b class="text-slate-700 text-[11px] block mb-1">💡 FA Fact-Finding Script (วิธีตั้งคำถาม):</b>
                            <p class="text-[11px] text-gray-700 italic border-l-2 border-slate-400 pl-2">"สวัสดิการค่ารักษาที่บริษัทให้ ครอบคลุมถึงโรคร้ายแรงไหมครับ? และถ้าเราเกษียณ สวัสดิการนี้จะยังตามดูแลเราอยู่ไหมครับ?"</p>
                        </div>
                    </div>
                    <!-- STEP 2 -->
                    <div class="bg-white p-5 rounded-xl border border-blue-200 shadow-sm relative overflow-hidden">
                        <div class="absolute -right-3 -top-3 text-6xl opacity-5 select-none pointer-events-none">2</div>
                        <h5 class="font-bold text-blue-800 text-sm flex items-center gap-2 mb-3 border-b border-blue-100 pb-2">
                            <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Step 2</span> แบบประเมินพฤติกรรมและการลงทุน 10 ข้อ (Behavioral Profiling)
                        </h5>
                        <p class="text-xs text-gray-700 leading-relaxed mb-3">นี่คือ <b>"สารตั้งต้น"</b> ที่จะส่งให้โมเดล 8D K-Means AI จัดกลุ่มอัตลักษณ์ (Persona) ของลูกค้า แบ่งเป็น 3 หมวด:</p>
                        <ul class="list-none space-y-2 text-xs text-gray-600 mb-4">
                            <li class="flex items-start gap-2"><span class="text-blue-500">🔹</span> <b>ข้อ 1-5 (วินัย & ทัศนคติหนี้):</b> AI ใช้ตรวจจับความเสี่ยงพฤติกรรม เช่น "Lifestyle Creep" หรือ "Overleveraged"</li>
                            <li class="flex items-start gap-2"><span class="text-orange-500">🔸</span> <b>ข้อ 6-8 (ความเสี่ยงลงทุน):</b> AI ใช้คำนวณ Risk Score (5-20 คะแนน) เพื่อแปลงเป็น Asset Allocation และ % ผลตอบแทนคาดหวัง</li>
                            <li class="flex items-start gap-2"><span class="text-purple-500">🟣</span> <b>ข้อ 9-10 (สไตล์คำแนะนำ):</b> AI ใช้ดูความถี่ในการรีวิวพอร์ต เพื่อประเมินความเสี่ยงจากการทิ้งพอร์ต (Recency Risk)</li>
                        </ul>
                        <div class="bg-blue-50 p-3 rounded-lg border border-blue-200 shadow-inner">
                            <b class="text-blue-800 text-[11px] block mb-1">💡 FA Fact-Finding Script (วิธีดำเนินการ):</b>
                            <p class="text-[11px] text-gray-700"><b>ห้ามชี้นำลูกค้าเด็ดขาด!</b> ให้อ่านคำถามแล้วให้ลูกค้าเลือกข้อที่ "ตรงกับตัวเองที่สุด ณ ปัจจุบัน" ไม่ใช่ข้อที่ "ดูดีที่สุด" เพราะถ้าข้อมูลหลอก AI จะจัดพอร์ตผิดความเสี่ยงทันที</p>
                        </div>
                    </div>
                    <!-- STEP 3 -->
                    <div class="bg-white p-5 rounded-xl border border-green-200 shadow-sm relative overflow-hidden">
                        <div class="absolute -right-3 -top-3 text-6xl opacity-5 select-none pointer-events-none">3</div>
                        <h5 class="font-bold text-green-800 text-sm flex items-center gap-2 mb-3 border-b border-green-100 pb-2">
                            <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">Step 3</span> งบดุลและกระแสเงินสด (Balance Sheet & Cash Flow)
                        </h5>
                        <p class="text-xs text-gray-700 leading-relaxed mb-4">หน้าจอ UI จะแบ่งการกรอกข้อมูลความมั่งคั่งออกเป็น 4 ส่วนหลัก (เพื่อนำไปประเมินอัตราส่วนทางการเงิน) ดังนี้:</p>
                        <div class="space-y-4">
                            <!-- 3.1 สินทรัพย์ -->
                            <div class="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                                <b class="text-[12px] text-green-700 block mb-2 border-b pb-1">💰 3.1 สินทรัพย์ (Assets)</b>
                                <p class="text-[11px] text-gray-600 mb-2">ของมีค่าที่สามารถตีมูลค่าเป็นเงินได้ แบ่งเป็น 6 ประเภท:</p>
                                <ul class="list-disc list-inside text-[11px] text-gray-700 space-y-1.5 ml-1">
                                    <li><b>สินทรัพย์สภาพคล่อง:</b> แปลงเป็นเงินสดได้ทันที (เช่น เงินฝากออมทรัพย์, สลากออมสิน)</li>
                                    <li><b>สินทรัพย์ลงทุน:</b> ตั้งใจถือยาวเพื่อการเติบโต (เช่น กองทุนรวม SSF/RMF, หุ้นสามัญ)</li>
                                    <li><b>สินทรัพย์ส่วนตัว:</b> ใช้เพื่อไลฟ์สไตล์ ไม่เน้นงอกเงย (เช่น บ้านที่อยู่อาศัย, รถยนต์, มูลค่าเวนคืนกรมธรรม์ <i>*ระบบดึงเวนคืนให้ Auto</i>)</li>
                                    <li><b>อสังหาริมทรัพย์และที่ดิน:</b> อสังหาฯเพื่อการลงทุน (เช่น บ้านปล่อยเช่า, ที่ดินเปล่า)</li>
                                    <li><b>ธุรกิจและสินทรัพย์ทางเลือก:</b> (เช่น หุ้นส่วนบริษัท Private Equity, ทองคำแท่ง, นาฬิกาหรู)</li>
                                    <li><b>สินทรัพย์ต่างประเทศ:</b> (เช่น พอร์ตหุ้น Offshore, หุ้นกู้ต่างประเทศ)</li>
                                </ul>
                            </div>
                            <!-- 3.2 หนี้สิน -->
                            <div class="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                                <b class="text-[12px] text-red-700 block mb-2 border-b pb-1">💳 3.2 หนี้สิน (Liabilities)</b>
                                <p class="text-[11px] text-gray-600 mb-2">ภาระผูกพันที่ต้องจ่ายคืน แบ่งเป็น 3 ประเภท:</p>
                                <ul class="list-disc list-inside text-[11px] text-gray-700 space-y-1.5 ml-1">
                                    <li><b>หนี้สินระยะสั้น (< 1 ปี):</b> หนี้บริโภคดอกเบี้ยสูง <i>*ส่งผลเสียรุนแรงต่อ AI Score</i> (เช่น ยอดคงค้างบัตรเครดิต, สินเชื่อส่วนบุคคล, หนี้นอกระบบ)</li>
                                    <li><b>หนี้สินระยะยาว (> 1 ปี):</b> หนี้ที่มีหลักทรัพย์ค้ำประกัน (เช่น ยอดหนี้คงเหลือบ้าน, รถยนต์)</li>
                                    <li><b>หนี้สินเพื่อบริหารความมั่งคั่ง:</b> หนี้ของคนรวยที่เอาเงินกู้ไปลงทุนต่อ (เช่น Lombard Loan, OD ธุรกิจ, Margin)</li>
                                </ul>
                            </div>
                            <!-- 3.3 รายรับ -->
                            <div class="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                                <b class="text-[12px] text-blue-700 block mb-2 border-b pb-1">📥 3.3 รายรับ (Income) - *กรอกเป็นยอดต่อเดือน</b>
                                <ul class="list-disc list-inside text-[11px] text-gray-700 space-y-1.5 ml-1">
                                    <li><b>รายได้จากการทำงาน (Active):</b> ต้องลงแรงถึงได้เงิน (เช่น เงินเดือนประจำ, โบนัสหาร 12, ค่าคอมมิชชันเฉลี่ย)</li>
                                    <li><b>รายได้จากสินทรัพย์ (Passive):</b> เงินทำงานแทนเรา (เช่น ค่าเช่ารับ, ดอกเบี้ย, เงินปันผล)</li>
                                    <li><b>รายได้จากธุรกิจ/เงินปันผลขนาดใหญ่:</b> รายได้รูปกงสีหรือกำไรกิจการ</li>
                                    <li><b>รายได้อื่นๆ:</b> รายได้จากแหล่งอื่น (เช่น เงินอุดหนุนจากบุตร, บำนาญรัฐ)</li>
                                </ul>
                            </div>
                            <!-- 3.4 รายจ่าย -->
                            <div class="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                                <b class="text-[12px] text-orange-700 block mb-2 border-b pb-1">📤 3.4 รายจ่าย (Expenses) - *กรอกเป็นยอดต่อเดือน</b>
                                <p class="text-[11px] text-red-600 font-bold mb-2">⚠️ สำคัญมาก! ต้องแยกประเภทให้ถูกต้อง เพราะ AI จะใช้วิเคราะห์ Cashflow เชิงลึก</p>
                                <ul class="list-disc list-inside text-[11px] text-gray-700 space-y-1.5 ml-1">
                                    <li><b class="text-green-600">รายจ่ายเพื่อออม/ลงทุน:</b> เงินที่จ่ายไปแล้วงอกเงย (เช่น ซื้อ RMF/SSF ทุกเดือน, DCA หุ้น)</li>
                                    <li><b class="text-red-600">เงินชำระคืนหนี้สิน:</b> ค่างวดที่ต้องส่งแบงก์ (เช่น ค่าผ่อนบ้าน, ค่าผ่อนรถ, จ่ายขั้นต่ำบัตร)</li>
                                    <li><b class="text-orange-600">รายจ่ายประจำ/ใช้ชีวิต:</b> เงินที่ใช้หมดไปกับการบริโภค (เช่น ค่าอาหาร, น้ำไฟเน็ต, ช้อปปิ้ง, ค่าเทอมลูก)</li>
                                    <li><b class="text-purple-600">ภาษีหัก ณ ที่จ่าย:</b> ภาษีที่โดนหักจากเงินเดือนทุกเดือน</li>
                                    <li><b class="text-gray-600">รายจ่ายอื่น:</b> เช่น เงินให้พ่อแม่, เงินทำบุญ</li>
                                </ul>
                            </div>
                        </div>
                        <div class="bg-green-50 p-3 rounded-lg border border-green-200 shadow-inner mt-4">
                            <b class="text-green-800 text-[11px] block mb-1">💡 FA Fact-Finding Script (เทคนิคขุดความจริง):</b>
                            <p class="text-[11px] text-gray-700 italic border-l-2 border-green-400 pl-2">"คนส่วนใหญ่มักลืมรายจ่ายแฝงครับคุณพี่... ไม่ทราบว่าปกติมีค่าผ่อนบัตรเครดิต 0% เดือนละเท่าไหร่ครับ? แล้วพวกค่า Subscription รายเดือนอย่าง Netflix, ฟิตเนส หรือค่าส่วนกลางคอนโด พอจะกะคร่าวๆ ได้ไหมครับ?"</p>
                        </div>
                    </div>
                    <!-- STEP 4 -->
                    <div class="bg-white p-5 rounded-xl border border-purple-200 shadow-sm relative overflow-hidden">
                        <div class="absolute -right-3 -top-3 text-6xl opacity-5 select-none pointer-events-none">4</div>
                        <h5 class="font-bold text-purple-800 text-sm flex items-center gap-2 mb-3 border-b border-purple-100 pb-2">
                            <span class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Step 4</span> เป้าหมาย, พอร์ตเดิม และภาษี (Goals, Existing Portfolio & Tax)
                        </h5>
                        <ul class="list-disc list-inside space-y-2 text-xs text-gray-700 mb-4">
                            <li><b>4.1 เป้าหมาย (SMART Goals):</b> กรอกเป้าหมายย่อย (เช่น ซื้อรถ, ทุนเรียนลูก) ยิ่งให้ Priority 1 ระบบจะรีดเงินออมไปจัดสรรให้เป้าหมายนี้ก่อน</li>
                            <li><b>4.2 กรมธรรม์เดิม:</b> กด "+ เพิ่มกรมธรรม์ (สัญญาหลัก)" แล้วค่อยกด "+ เพิ่มสัญญาเพิ่มเติม" ไว้ข้างใต้ <b>(กดปุ่ม <span class="bg-teal-100 text-teal-800 px-1 rounded border border-teal-300">🔄 ซิงค์เข้าสู่งบการเงิน</span> เพื่อโยนค่าเบี้ยและมูลค่าเวนคืนไปใส่ใน Step 3 อัตโนมัติ!)</b></li>
                            <li><b>4.3 การลงทุนเดิม:</b> ระบุชื่อ, มูลค่า, <i>ผลตอบแทนคาดหวัง</i>, และ <i>เป้าหมายหลัก</i> ของกองทุนนั้นๆ</li>
                            <li><b>4.4 ภาษี:</b> กดปุ่ม <span class="bg-orange-100 text-orange-800 px-1 rounded border border-orange-300">🔄 ดึงข้อมูลจากระบบ</span> AI จะวิ่งไปกวาด "เบี้ยประกัน, ดอกเบี้ยบ้าน, ประกันสังคม, RMF/SSF" จากข้อมูลที่คุณเพิ่งกรอกมาสรุปเป็นลดหย่อนให้อัตโนมัติ</li>
                        </ul>
                        <div class="bg-purple-50 p-3 rounded-lg border border-purple-200 shadow-inner">
                            <b class="text-purple-800 text-[11px] block mb-1">💡 FA Fact-Finding Script (วิธีขอกรมธรรม์ลูกค้า):</b>
                            <p class="text-[11px] text-gray-700 italic border-l-2 border-purple-400 pl-2">"การนำเล่มเก่ามาวิเคราะห์ ไม่ได้แปลว่าผมจะให้ยกเลิกนะครับ แต่เราจะนำเข้า AI เพื่อทำ Gap Analysis ดูว่ากรมธรรม์เดิมมีรอยรั่วตรงไหน (เช่น ขาดค่ารักษา CI) เราจะได้เติมเต็มเฉพาะส่วนที่ขาดจริงๆ เพื่อประหยัดงบพี่ให้ได้มากที่สุดครับ ขออนุญาตดูเล่มกรมธรรม์นิดนึงนะครับ"</p>
                        </div>
                    </div>
                    <!-- STEP 5 -->
                    <div class="bg-white p-5 rounded-xl border border-indigo-200 shadow-sm relative overflow-hidden">
                        <div class="absolute -right-3 -top-3 text-6xl opacity-5 select-none pointer-events-none">5</div>
                        <h5 class="font-bold text-indigo-800 text-sm flex items-center gap-2 mb-3 border-b border-indigo-100 pb-2">
                            <span class="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs">Step 5</span> เป้าหมายเกษียณ และตัวแปรเศรษฐกิจ (Retirement & Macro)
                        </h5>
                        <p class="text-[11px] text-gray-600 mb-2"><b>ต้องกรอกอะไรบ้าง?:</b></p>
                        <ul class="list-disc list-inside text-[11px] text-gray-700 space-y-1 ml-1 mb-4">
                            <li><b>อายุเกษียณ (ปี):</b> อายุที่ต้องการหยุดทำงาน (เช่น 60)</li>
                            <li><b>อายุขัย (ปี):</b> คาดการณ์อายุยืนยาว (แนะนำที่ 85-90 ปี)</li>
                            <li><b>เป้าหมายค่าใช้จ่าย (บาท/เดือน):</b> <span class="text-red-600 font-bold">ระบุ ณ มูลค่าเงินปัจจุบัน (เงินของวันนี้)</span> ไม่ต้องเผื่อเงินเฟ้อ เพราะเดี๋ยว AI จะนำไปคูณเงินเฟ้อทบต้นตอนจำลองระบบให้เอง (เช่น กรอก 50,000 บาท/เดือน)</li>
                        </ul>
                        <div class="bg-gray-50 p-3 rounded border border-gray-200 mb-3">
                            <b class="text-indigo-600 text-[11px] block mb-1 cursor-pointer">▼ Advanced Economics (ตัวแปรเศรษฐศาสตร์)</b>
                            <p class="text-[10px] text-gray-500">สามารถคลิกเปิดแถบเมนูนี้ เพื่อปรับ "เงินเฟ้อทั่วไป", "เงินเฟ้อแพทย์", และ "ผลตอบแทนคาดหวังรวม" ด้วยตนเองได้</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "c2_operations": {
        category: "c2",
        icon: "🖥️",
        iconClass: "bg-slate-100 text-slate-700",
        title: "คู่มือฟังก์ชันการใช้งานระบบ (System Operations)",
        content: `
            <div class="antialiased touch-manipulation">
                <p class="leading-relaxed text-sm text-gray-700 mb-6">Financial Planner Pro Advisor ไม่ใช่แค่เครื่องมือคำนวณ แต่คือระบบปฏิบัติการทางการเงิน (Financial Operating System) คู่มือฉบับนี้จะเจาะลึกทุกฟังก์ชันแบบ Step-by-Step</p>
                <div class="space-y-6">
                    <!-- MODULE 1: Home Screen -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 border-b border-blue-500 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">1</div> 
                            <h3 class="font-bold text-white text-lg">ศูนย์บัญชาการหลัก (Home Screen & Navigation)</h3>
                        </div>
                        <div class="p-5 text-sm text-gray-700 space-y-4">
                            <p class="leading-relaxed">เมื่อเข้าสู่ระบบสำเร็จ คุณจะพบกับ <b>หน้าจอ Home Screen</b> ซึ่งออกแบบมาให้เป็นจุดศูนย์กลาง (Hub) ในการเข้าถึงโมดูลต่างๆ ของระบบอย่างรวดเร็ว ประกอบด้วย 3 เมนูหลัก:</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
                                    <b class="text-emerald-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">📖</span> คู่มือ / แนะนำระบบ</b>
                                    <p class="text-xs text-gray-600 leading-relaxed">เปิดหน้าต่าง Knowledge Base (หน้าต่างนี้) เพื่อศึกษาสถาปัตยกรรม เจาะลึกการทำงานของโมเดล AI และทฤษฎีการวางแผนการเงิน</p>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm">
                                    <b class="text-blue-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">📝</span> ระบบประเมินการเงิน</b>
                                    <p class="text-xs text-gray-600 leading-relaxed">เข้าสู่ระบบการทำงานหลัก (Main App) เพื่อเริ่มกรอกข้อมูลลูกค้า สร้างเคสประเมินสถานะทางการเงิน และออกรายงานรูปเล่ม (PDF)</p>
                                </div>
                                <div class="bg-purple-50 p-4 rounded-xl border border-purple-200 shadow-sm">
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

                    <!-- MODULE 4: Calculators -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-purple-700 to-purple-900 p-4 border-b border-purple-600 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">2</div> 
                            <h3 class="font-bold text-white text-lg">เครื่องมือคำนวณอิสระ (Pro Financial Calculators)</h3>
                        </div>
                        <div class="p-5 text-sm text-gray-700 space-y-4">
                            <p class="leading-relaxed">ปุ่ม <b>"🧮 เครื่องคิดเลขการเงิน"</b> เป็นโมดูลที่ทำงานแยกส่วนจากระบบหลัก (Sandbox) คุณสามารถกดเปิดขึ้นมาเพื่อตอบคำถามลูกค้าแบบรวดเร็ว (Ad-hoc Calculation) โดยไม่ต้องเริ่มสร้างเคสใหม่ ประกอบด้วย 4 เครื่องยนต์หลัก:</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                    <b class="text-purple-800 block mb-1 text-base">🏖️ จำลองเป้าหมายเกษียณ (Retirement)</b>
                                    <p class="text-xs text-gray-600">ป้อนอายุ, เป้าหมายรายจ่าย, พอร์ตตั้งต้น, และเงินเฟ้อ ระบบจะคำนวณหา "เงินก้อนที่ต้องมี (FV)" และ "เงินที่ต้องออมต่องวด (PMT)" พร้อมแสดงผลตอบแทนแท้จริง (Real Return) ที่หักเงินเฟ้อแล้ว</p>
                                </div>
                                <div class="bg-sky-50 p-4 rounded-xl border border-sky-100">
                                    <b class="text-sky-800 block mb-1 text-base">📊 ผลตอบแทนลงทุน (CAGR)</b>
                                    <p class="text-xs text-gray-600">อยากรู้ว่าพอร์ตลูกค้าโตเฉลี่ยกี่เปอร์เซ็นต์? แค่ใส่เงินต้น (PV), เงินปลายทาง (FV), และเวลา (N) ระบบจะคำนวณอัตราผลตอบแทนทบต้นต่อปี (CAGR) พร้อม AI Insight แนะนำประเภทสินทรัพย์ที่สอดคล้อง</p>
                                </div>
                                <div class="bg-teal-50 p-4 rounded-xl border border-teal-100">
                                    <b class="text-teal-800 block mb-1 text-base">📈 ผลตอบแทนประกัน (IRR)</b>
                                    <p class="text-xs text-gray-600">ฟังก์ชันสำหรับปิดการขายประกันออมทรัพย์! ป้อน เบี้ยที่จ่ายรายปี (PMT), เงินคืนระหว่างทาง (CB), และเงินก้อนตอนครบสัญญา ระบบจะถอดสมการหาค่า IRR (%) สุทธิ ออกมาโชว์เทียบกับดอกเบี้ยธนาคารทันที</p>
                                </div>
                                <div class="bg-red-50 p-4 rounded-xl border border-red-100">
                                    <b class="text-red-800 block mb-1 text-base">💸 จัดการหนี้สิน (Amortization)</b>
                                    <p class="text-xs text-gray-600">เลือกระบบคำนวณได้ทั้ง หนี้บ้าน (ลดต้นลดดอก), หนี้รถ (Flat Rate), และหนี้บัตรเครดิต ระบบจะสร้าง <b>"ตารางจำลองการผ่อนชำระ"</b> แบบละเอียดยิบให้ดูว่าในแต่ละงวดตัดเงินต้นและดอกเบี้ยไปเท่าไหร่</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- MODULE 5: Quick Actions -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-teal-600 to-teal-800 p-4 border-b border-teal-500 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">3</div> 
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
                                    <div class="bg-white border border-red-200 p-2 rounded shadow-sm text-2xl leading-none flex items-center justify-center select-none">⚙️</div>
                                    <div>
                                        <b class="text-red-700 text-sm">ประมวลผล (Process Report)</b>
                                        <p class="text-[11px] text-gray-700 mt-1">หลังจากป้อนข้อมูลลูกค้าใน Section 1 ถึง 3 ครบแล้ว ให้กดปุ่ม <span class="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">⚙️ ประมวลผล</span> หน้าจอจะแสดง <b>Loading Overlay ของ AI Predictive Engine</b> เพื่อคำนวณสมการ Monte Carlo กว่า 20,000 รอบ ก่อนจะสลับหน้าจอเข้าสู่ Report View อย่างไร้รอยต่อ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- MODULE 6: Playground & Simulation -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-emerald-600 to-emerald-800 p-4 border-b border-emerald-500 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">4</div> 
                            <h3 class="font-bold text-white text-lg">ห้องทดลองทางเลือก (Interactive Playground)</h3>
                        </div>
                        <div class="p-5 text-sm text-gray-700 space-y-4 relative overflow-hidden">
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

                    <!-- MODULE 8: Export & Delivery -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-red-700 to-gray-900 p-4 border-b border-red-600 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">5</div> 
                            <h3 class="font-bold text-white text-lg">การส่งมอบรายงาน (Enterprise PDF Engine)</h3>
                        </div>
                        <div class="p-5 text-sm text-gray-700 space-y-4">
                            <p class="leading-relaxed">ผลงานการวิเคราะห์ขั้นเทพ จะต้องถูกส่งมอบด้วยความสวยงามระดับ Enterprise เมื่อคุณคลิกปุ่ม <span class="bg-gray-800 text-white px-2 py-1 rounded text-[10px] font-bold">🖨️ พิมพ์ / PDF</span> ที่ท้ายรายงาน หรือที่แถบเมนูด้านบนสุด ระบบจะทำงานร่วมกับ Print Engine ของ Browser ทันที:</p>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="border border-gray-200 rounded-xl p-4 bg-gray-50 text-center flex flex-col items-center">
                                    <span class="text-3xl mb-2 select-none">📑</span>
                                    <b class="text-gray-800 text-xs block mb-1">Dynamic Cover Page</b>
                                    <span class="text-[10px] text-gray-500">ระบบจะสร้าง "หน้าปกกระดาษ A4" อัตโนมัติ ดึงชื่อลูกค้า, ชื่อของคุณ, เลข License และวันที่จัดทำ มาจัดวางอย่างสวยงาม (หน้าปกนี้จะมองไม่เห็นตอนใช้งานโหมดปกติ)</span>
                                </div>
                                <div class="border border-gray-200 rounded-xl p-4 bg-gray-50 text-center flex flex-col items-center">
                                    <span class="text-3xl mb-2 select-none">✂️</span>
                                    <b class="text-gray-800 text-xs block mb-1">UI Stripping Engine</b>
                                    <span class="text-[10px] text-gray-500">ระบบจะทำการ "ซ่อน" ปุ่มกด, สไลเดอร์, ไอคอนแจ้งเตือน และแถบเมนูที่ไม่จำเป็นออกทั้งหมด เพื่อเปลี่ยนหน้า Web App ให้กลายเป็น "รายงานรูปเล่ม" ที่เป็นทางการ 100%</span>
                                </div>
                                <div class="border border-gray-200 rounded-xl p-4 bg-gray-50 text-center flex flex-col items-center">
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
                </div>
            </div>
        `
    },

    "c2_crm_dash": {
        category: "c2",
        icon: "🗂️",
        iconClass: "bg-indigo-100 text-indigo-600",
        title: "การจัดการฐานลูกค้าและเป้าหมาย (CRM & FA Planner)",
        content: `
            <div class="antialiased touch-manipulation">
                <p class="text-sm text-gray-600 mb-6 leading-relaxed">ระบบไม่ได้จบแค่ตอนเสนอแผน แต่มีเครื่องมือดูแลหลังการขาย (After-Sales) และหน้าปัดผู้บริหาร (Dashboard) สำหรับตัวคุณเองด้วย</p>
                
                <div class="space-y-6">
                    <!-- CRM Core -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 p-4 border-b border-indigo-500 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">1</div> 
                            <h3 class="font-bold text-white text-lg">สถาปัตยกรรมจัดการลูกค้า (Advanced CRM & VN)</h3>
                        </div>
                        <div class="p-5 text-sm text-gray-700 space-y-4">
                            
                            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <b class="text-indigo-800 block mb-2">📌 การบันทึกเคสใหม่ลงฐานข้อมูล (Save to DB)</b>
                                <p class="text-xs text-gray-700 mb-2">เมื่อคุณกรอกข้อมูลในหน้าหลักและกดประมวลผลเรียบร้อยแล้ว ให้เข้าไปที่ <b>"⚙️ ตั้งค่าระบบ > 🗂️ ฐานข้อมูลลูกค้า"</b> แล้วกดปุ่มดึงข้อมูลหน้าจอหลักบันทึกลง DB</p>
                                <ul class="list-disc list-inside text-xs text-gray-600 ml-2 space-y-1.5">
                                    <li>ระบบจะสร้าง <b>รหัสลูกค้า (XN)</b> และ <b>รหัสเข้าพบ (VN)</b> ให้อัตโนมัติ (เช่น VN_7002-14-A2)</li>
                                    <li>ข้อมูลทุกอย่างที่คุณกรอก (รวมถึงกราฟ, สินทรัพย์, กรมธรรม์, AI Score) จะถูก <b>"แช่แข็ง (Snapshot)"</b> เก็บไว้ตามวันที่บันทึก เพื่อใช้ดูพัฒนาการในอนาคต</li>
                                </ul>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                    <b class="text-indigo-800 block mb-2 text-base">🔄 มุมมองกระดาน (Kanban) vs ตาราง (Table)</b>
                                    <ul class="list-disc list-inside text-xs text-gray-600 space-y-1">
                                        <li><b>มุมมองกระดาน 📌:</b> คลิกการ์ดลูกค้าแล้วลาก (Drag & Drop) ข้ามสเตจสถานะได้เลย ระบบจะบันทึก Log ให้อัตโนมัติ</li>
                                        <li><b>มุมมองตาราง 📋:</b> รองรับการเรียงลำดับ (Sort) และทำ Bulk Action (ลบหลายคน/เปลี่ยนสถานะหมู่)</li>
                                    </ul>
                                </div>
                                <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                    <b class="text-indigo-800 block mb-2 text-base">📌 การจัดการแผนเก่า (VN Manager) & Auto-Close</b>
                                    <ul class="list-disc list-inside text-xs text-gray-600 space-y-1">
                                        <li>กด <span class="bg-indigo-100 text-indigo-700 px-1.5 rounded text-[10px] font-bold border border-indigo-200">⬇️ โหลด</span> ดึงข้อมูลแผนเก่า <b>ให้เด้งกลับไปแสดงผลบนหน้าจอหลัก</b> เพื่อใช้วางแผนสานต่อได้ทันที</li>
                                        <li><b>Auto-Close Session:</b> หากปล่อยแผนไว้ข้ามวัน ระบบจะ <span class="bg-gray-100 text-gray-500 px-1.5 rounded text-[10px] border border-gray-200">🔒 ปิด (Closed)</span> แผนเก่านั้นให้อัตโนมัติ ป้องกันการเผลอบันทึกทับอดีต</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="bg-white p-4 rounded-xl border border-indigo-200 shadow-lg relative">
                                <div class="absolute -right-3 -top-3 text-5xl opacity-10 select-none pointer-events-none">📝</div>
                                <b class="text-indigo-900 block mb-3 text-base border-b border-indigo-100 pb-2">การจัดการรายบุคคล (Client Modal)</b>
                                <p class="text-xs text-gray-600 mb-2">เมื่ออยู่ในมุมมองตาราง หรือกระดาน คุณสามารถกดปุ่มเครื่องมือเพื่อจัดการลูกค้าได้ดังนี้:</p>
                                <ul class="list-disc list-inside text-xs space-y-2 text-gray-700 ml-1">
                                    <li><span class="bg-blue-100 text-blue-700 px-1 rounded font-bold">🔍 พรีวิว</span> <b>(Quick Review):</b> ดูสรุปข้อมูลสถานะการเงิน, คะแนน AI แบบรวดเร็วโดยไม่ต้องโหลดเข้าหน้าจอหลัก</li>
                                    <li><span class="bg-yellow-100 text-yellow-700 px-1 rounded font-bold">📝 โน้ต</span> <b>(Activity History):</b> บันทึกการพูดคุย หรือแฮชแท็ก (#) ตามไทม์ไลน์ (รองรับ Deep Search ค้นหาคำในโน้ตได้จากหน้าหลัก)</li>
                                </ul>
                            </div>

                            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2">
                                <b class="text-slate-800 block mb-2 text-base">🔍 ค้นหาขั้นสูงด้วย Deep Search</b>
                                <p class="text-xs text-gray-600 leading-relaxed">หากจำชื่อไม่ได้ แต่จำได้ว่าเคยพิมพ์โน้ตไว้ว่า "สนใจทุนการศึกษาลูก" แค่พิมพ์คำว่า <code class="bg-white px-1 border border-gray-200 rounded text-indigo-600 font-bold shadow-sm">สนใจทุน</code> ลงในช่องค้นหา ระบบจะควานลึกเข้าไปค้นใน <b>Activity History</b> ของลูกค้าทุกคน แล้วดึงเคสนั้นขึ้นมาให้!</p>
                            </div>
                        </div>
                    </div>

                    <!-- FA Dashboard -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-teal-600 to-emerald-700 p-4 border-b border-teal-500 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">2</div> 
                            <h3 class="font-bold text-white text-lg">FA Business Planner (Dashboard ผู้บริหาร)</h3>
                        </div>
                        <div class="p-5 text-sm text-gray-700 space-y-4">
                            <p class="leading-relaxed">หน้าปัดสำหรับให้ตัวคุณเอง (FA) ตั้งเป้าหมายและติดตาม Performance ตลอดทั้งปี:</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-teal-50 p-4 rounded-xl border border-teal-100">
                                    <b class="text-teal-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">🎯</span> การตั้งเป้าหมาย (Yearly Targets)</b>
                                    <p class="text-xs text-gray-700 mb-2">ระบุเป้าหมายเบี้ยประกัน (FYP), ค่าคอมมิชชัน (FYC), จำนวนราย (Cases), และสร้างทีม (Recruits)</p>
                                    <div class="p-2 bg-white rounded border border-teal-200 shadow-sm">
                                        <p class="text-[10px] text-teal-800 italic"><b>💡 Magic Engine:</b> ระบบจะนำเป้าหมายรายปีของคุณ ไปหาร 12 เป็นเป้าเดือน และหาร 4 เป็นเป้าสัปดาห์ (Weekly Target) ให้อัตโนมัติ!</p>
                                    </div>
                                </div>
                                <div class="bg-teal-50 p-4 rounded-xl border border-teal-100 flex flex-col">
                                    <b class="text-teal-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">📝</span> บันทึกผลงาน (Sales Ledger)</b>
                                    <ul class="list-disc list-inside text-xs space-y-1.5 text-gray-700 flex-grow">
                                        <li><b>นับ Case ไหม?:</b> เลือกว่า <code class="bg-white px-1 border rounded text-emerald-600">New (นับ)</code> หรือ <code class="bg-white px-1 border rounded text-gray-500">Renewal (ไม่นับ)</code></li>
                                        <li><b>แนบสัญญาเพิ่มเติม:</b> คลิก <span class="text-indigo-600 font-bold bg-indigo-50 border border-indigo-200 px-1 rounded text-[10px]">+ เพิ่ม Rider</span> ซ้อนเข้าไปในบิลเดียวกันได้หลายๆ ตัว เพื่อให้ระบบดึงค่ารวมในบิลเดียว</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="bg-gray-50 p-5 rounded-xl border border-gray-200 mt-5 shadow-inner">
                                <b class="text-gray-800 flex items-center gap-2 mb-3"><span class="text-lg select-none">📈</span> การวิเคราะห์พอร์ตโฟลิโอ (Portfolio Analytics)</b>
                                <p class="text-xs text-gray-700 mb-3">ระบบจะสังเคราะห์ผลงานของคุณออกมาเป็นกราฟ 2 ตัว เพื่อประเมิน <b>"คุณภาพของธุรกิจคุณ"</b>:</p>
                                <div class="flex flex-col md:flex-row gap-5 mt-2">
                                    <div class="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                        <b class="text-[12px] text-indigo-800 flex items-center gap-1 border-b border-gray-100 pb-1.5 mb-2"><span class="text-base select-none">🧬</span> AI Personas (กลุ่มลูกค้า)</b>
                                        <p class="text-[11px] text-gray-600 leading-relaxed">สรุปว่าฐานลูกค้าส่วนใหญ่จัดอยู่ใน Persona ไหน (เช่น UHNW, DINKs) เพื่อให้คุณรู้ว่า <i>"ฐานตลาดที่แท้จริงของคุณคือใคร"</i></p>
                                    </div>
                                    <div class="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                        <b class="text-[12px] text-blue-800 flex items-center gap-1 border-b border-gray-100 pb-1.5 mb-2"><span class="text-base select-none">🥧</span> Product Mix (สัดส่วนสินค้า)</b>
                                        <p class="text-[11px] text-gray-600 leading-relaxed">วิเคราะห์จาก Sales Ledger ว่าสัดส่วนส่วนใหญ่มาจากหมวดหมู่ใด (เช่น ประกันสุขภาพ, Unit Linked) กราฟนี้จะสะท้อนความเชี่ยวชาญของคุณ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    "c2_system_team": {
        category: "c2",
        icon: "🔒",
        iconClass: "bg-slate-800 text-white",
        title: "ระบบความปลอดภัย และการทำงานเป็นทีม (Security & Team Collab)",
        content: `
            <div class="antialiased touch-manipulation">
                <p class="text-sm text-gray-600 mb-6 leading-relaxed">สถาปัตยกรรมแบบ <b>100% Offline App (Zero Data Leakage)</b> ช่วยปกป้องข้อมูลลูกค้า แต่ในขณะเดียวกันก็สามารถทำงานร่วมกับผู้ช่วย (Assistant) ได้อย่างมีประสิทธิภาพ</p>
                
                <div class="space-y-6">
                    <!-- System Config -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">1</div> 
                            <h3 class="font-bold text-white text-lg">การตั้งค่าระบบพื้นฐาน (System Configuration)</h3>
                        </div>
                        <div class="p-5 text-sm text-gray-700 space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <b class="text-blue-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">👤</span> ข้อมูลผู้จัดทำ (Creator Profile)</b>
                                    <ul class="list-disc list-inside text-xs space-y-1.5 text-gray-700 ml-1">
                                        <li><b>Profile Sync:</b> ระบุชื่อ, FA License, และ IC License เพื่อใช้เป็นลายน้ำบน PDF อัตโนมัติ</li>
                                        <li><b>PIN Re-encryption:</b> เมื่อเปลี่ยนรหัสผ่าน ระบบจะถอดรหัสและเข้ารหัสฐานข้อมูล CRM ใหม่ทั้งหมด</li>
                                    </ul>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <b class="text-orange-800 flex items-center gap-2 mb-2"><span class="text-lg select-none">📦</span> จัดการข้อมูล (Library & Core Data)</b>
                                    <ul class="list-disc list-inside text-xs space-y-1.5 text-gray-700 ml-1">
                                        <li><b>Auto-Recovery ♻️:</b> ปุ่มกู้คืนข้อมูลฉุกเฉิน หากเผลอปิดเบราว์เซอร์</li>
                                        <li><b>Product Library ➕:</b> เพิ่ม "ชื่อแบบประกัน" เข้าไปเก็บไว้ เพื่อให้เรียกใช้ผ่าน Dropdown ได้</li>
                                        <li><b>JSON Config Import 📥:</b> รองรับการอัปโหลดไฟล์ <code class="text-orange-600">.json</code> เพื่ออัปเดตกฎหมายใหม่ๆ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Team Collab -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-sky-600 to-blue-700 p-4 border-b border-sky-500 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">2</div> 
                            <h3 class="font-bold text-white text-lg">การโคลนนิ่งฐานข้อมูล (Team Collaboration)</h3>
                        </div>
                        <div class="p-5 text-sm text-gray-700">
                            <div class="bg-sky-50 p-4 rounded-xl border border-sky-200 shadow-inner">
                                <b class="text-sky-800 text-sm block mb-3 flex items-center gap-2"><span class="select-none">🔄</span> Workflow สำหรับการส่งต่องานระหว่างผู้ช่วยและ FA</b>
                                <div class="space-y-3">
                                    <p class="text-xs text-gray-800 leading-relaxed border-l-4 border-sky-400 pl-3 bg-white p-2 rounded shadow-sm"><b>1. ฝั่งผู้ช่วย (Assistant):</b> รับโจทย์จาก FA &rarr; คีย์ข้อมูลลูกค้า (งบการเงิน, ความเสี่ยง) ลงในระบบบนคอมพิวเตอร์ &rarr; บันทึกประวัติลง CRM</p>
                                    <p class="text-xs text-gray-800 leading-relaxed border-l-4 border-sky-400 pl-3 bg-white p-2 rounded shadow-sm"><b>2. ฝั่งผู้ช่วย (Assistant):</b> ไปที่หน้าตั้งค่า &rarr; กดปุ่ม <b>📥 Grand Backup</b> &rarr; ส่งไฟล์ <code class="text-sky-600">.json</code> ผ่าน Line หรือ AirDrop ให้ FA</p>
                                    <p class="text-xs text-gray-800 leading-relaxed border-l-4 border-blue-600 pl-3 bg-white p-2 rounded shadow-sm"><b>3. ฝั่ง FA (Lead):</b> นำ iPad &rarr; เปิดหน้าตั้งค่า &rarr; กดปุ่ม <b>📤 Restore</b> แล้วเลือกไฟล์ที่ส่งมา &rarr; ข้อมูลทั้งหมดจะไปโผล่ใน iPad ทันที พร้อมลุยหน้างาน!</p>
                                </div>
                                <div class="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                                    <b class="text-red-700 text-xs block mb-1">⚠️ กฎเหล็ก (Single Source of Truth)</b>
                                    <p class="text-[11px] text-red-600 leading-relaxed">การกด Restore จะเป็นการ <b>"เขียนทับ (Overwrite) ข้อมูลเดิมในเครื่องทั้งหมด"</b> หาก FA ไปพบลูกค้าแล้วแก้ไขแผน FA จะต้อง Export ไฟล์ Grand Backup ส่งกลับคืนให้ผู้ช่วยเอาไป Restore ทับในคอมพิวเตอร์ด้วย เพื่อให้ฐานข้อมูลตรงกันเสมอ</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Grand Backup & Panic -->
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="bg-gradient-to-r from-red-600 to-red-800 p-4 border-b border-red-700 flex items-center gap-3">
                            <div class="bg-white/20 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-inner select-none">3</div> 
                            <h3 class="font-bold text-white text-lg">การป้องกันข้อมูลสูญหาย และปุ่มฉุกเฉิน (Backup & Danger Zone)</h3>
                        </div>
                        <div class="p-5 text-sm text-gray-700 space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div class="text-3xl mt-1 select-none">📊</div>
                                    <div>
                                        <b class="text-slate-800 text-sm block mb-1">การคำนวณพื้นที่ (Storage Check)</b>
                                        <p class="text-[11px] text-gray-600 leading-relaxed">เช็คว่าฐานข้อมูล CRM กินพื้นที่เครื่องไปเท่าไหร่ หากหลอดแสดงผลขึ้นสีแดง แปลว่าใกล้เต็ม ระบบอาจแครช (Crash) ควรรีบ Export Backup และล้างเครื่อง</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-200 shadow-sm">
                                    <div class="text-3xl mt-1 select-none">☢️</div>
                                    <div>
                                        <b class="text-red-800 text-sm block mb-1">เขตอันตราย (Factory Reset)</b>
                                        <p class="text-[11px] text-gray-700 leading-relaxed">ปุ่มสำหรับสั่งระเบิดทำลายข้อมูลระบบทิ้งทั้งหมด (ใช้ก่อนขายเครื่อง หรือคืนเครื่องบริษัท) โดยต้องพิมพ์คำว่า <code class="bg-white px-1.5 py-0.5 border border-red-200 rounded text-red-700 font-mono font-bold">RESET</code> เพื่อล้างค่ากลับเป็นโรงงาน</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // ==========================================
    // 🟣 ส่วนที่ 3: สถาปัตยกรรมสมองกล (AI Architecture) -> category: "c3"
    // ==========================================
    "c3_pipeline": {
        category: "c3",
        icon: "⚡",
        iconClass: "bg-indigo-100 text-indigo-600",
        title: "ภาพรวม 5-Stage AI Pipeline Architecture",
        content: `
            <div class="antialiased touch-manipulation">
                <p class="text-sm text-gray-600 mb-6 leading-relaxed">เมื่อข้อมูลดิบจากหน้า UI ถูกส่งเข้าระบบ จะวิ่งผ่านกระบวนการ 5 ขั้นตอน (5-Stage Engine) ภายในเวลาไม่กี่วินาที ดังนี้:</p>
                <div class="space-y-5">
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover:shadow-md transition">
                        <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-indigo-100 select-none">1</div>
                        <div>
                            <h4 class="font-bold text-gray-800 text-base mb-2">Diagnostic Engine (การวินิจฉัยสุขภาพการเงิน)</h4>
                            <p class="text-xs text-gray-600 leading-relaxed mb-2">สกัดข้อมูลดิบ (งบดุลและกระแสเงินสด) มาคำนวณเป็นอัตราส่วนทางการเงินสากล เช่น Survival Ratio, Liquidity Ratio, DTI และ Savings Ratio</p>
                            <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                                <b>Output:</b> ประเมิน <span class="text-indigo-600 font-bold">Financial Health Score</span> เต็ม 100 คะแนน เพื่อวิเคราะห์ความเสี่ยงล้มละลาย (Risk of Ruin) ขั้นพื้นฐาน
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover:shadow-md transition">
                        <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-purple-100 select-none">2</div>
                        <div>
                            <h4 class="font-bold text-gray-800 text-base mb-2">Behavioral K-Means Clustering (AI จัดกลุ่มพฤติกรรม)</h4>
                            <p class="text-xs text-gray-600 leading-relaxed mb-2">ป้อนข้อมูลเข้าสู่โมเดล Machine Learning (8D K-Means) วิเคราะห์พฤติกรรม 8 แกน (อายุ, รายได้, ความมั่งคั่ง, ภาระหนี้, ความเสี่ยง, ความสม่ำเสมอ, วินัย, ภาระอุปการะ) เพื่อหา Persona ที่ซ่อนอยู่</p>
                            <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                                <b>Output:</b> ระบบจะจัดลูกค้าเข้าสู่กลุ่มเฉพาะ (เช่น UHNW, Cash Hoarder, Overleveraged) และปรับโครงสร้าง "สามเหลี่ยมการเงิน" ให้ดิ้นได้ตามความเสี่ยงนั้นๆ
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover:shadow-md transition">
                        <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-orange-100 select-none">3</div>
                        <div>
                            <h4 class="font-bold text-gray-800 text-base mb-2">Optimization & DP Knapsack (อัลกอริทึมจัดสรรและแก้ปัญหา)</h4>
                            <p class="text-xs text-gray-600 leading-relaxed mb-2">AI จะคำนวณงบประมาณส่วนเกินที่แท้จริง (Elastic Budget) และใช้คณิตศาสตร์ <b class="text-orange-600">Dynamic Programming</b> เลือกแบบประกัน "Base + Rider" ที่ให้ความคุ้มครองสูงสุดโดยไม่เกินงบ (Knapsack Problem) พร้อมคำนวณการโยกเงินเพื่อ <b class="text-blue-600">Tax Alpha</b> (ลดหย่อนภาษี) และ <b class="text-red-600">Debt Snowball</b> (ปลดหนี้)</p>
                            <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                                <b>Output:</b> จัดตะกร้าสินค้า (Product Assembly) ออกมาเป็น 3 ทางเลือก พร้อมแผนกระแสเงินสด Benchmark ใหม่
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover:shadow-md transition">
                        <div class="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-red-100 select-none">4</div>
                        <div>
                            <h4 class="font-bold text-gray-800 text-base mb-2">Stochastic Simulation (แบบจำลอง Monte Carlo & Stress Test)</h4>
                            <p class="text-xs text-gray-600 leading-relaxed mb-2">ระบบจะรันโลกคู่ขนาน 2,000 รูปแบบ สุ่มสภาวะตลาด (กระทิง/หมี) ผสานทฤษฎี <b class="text-red-600">Merton's Jump Diffusion</b> จำลองวิกฤตเศรษฐกิจเฉียบพลัน และควบคุมการถอนเงินหลังเกษียณด้วย <b class="text-emerald-600">Guyton-Klinger Rules</b> ป้องกันพอร์ตแตก</p>
                            <div class="bg-gray-50 p-2 rounded text-[11px] text-gray-500 border border-gray-100">
                                <b>Output:</b> โอกาสความสำเร็จ (Probability of Success) พร้อมช่วงความเชื่อมั่น 95% และกราฟจำลองการลงทุน 5 ปีล่วงหน้า (CVaR)
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-5 hover:shadow-md transition">
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
    "c3_dnn": {
        category: "c3",
        icon: "🕸️",
        iconClass: "bg-cyan-100 text-cyan-700",
        title: "สถาปัตยกรรมโครงข่ายประสาทเทียมเชิงลึก (Deep Neural Network)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700 leading-relaxed"><b>รายงานการวิเคราะห์ทางเทคนิค (Technical Whitepaper):</b> สถาปัตยกรรม <b>Multi-Layer Perceptron (MLP)</b> นี้ถูกสร้างขึ้นเพื่อทำ Predictive Analytics ประเมินความน่าจะเป็นที่ลูกค้าจะบรรลุเป้าหมายทางการเงิน โดยทำงานแบบ Offline ผ่าน Pre-trained Weights บน Client-side ประกอบด้วยกระบวนการคำนวณทางคณิตศาสตร์ 4 ระยะ (Phases) ดังนี้</p>
        
        <div class="space-y-5">
            <!-- Phase 1: Input Vector Space -->
            <div class="bg-slate-800 text-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
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
            <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-200 shadow-md flex flex-col relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-10 text-indigo-900 text-5xl select-none pointer-events-none">3</div>
                <b class="text-indigo-900 mb-2 text-sm uppercase tracking-wide">Phase 3: Logit Transformation & Sigmoid Mapping</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">ในชั้น Output Layer ค่าที่ประมวลผลได้จะอยู่ในรูปของ Log-odds (ช่วงคะแนนตั้งแต่อนันต์ติดลบถึงอนันต์บวก) อัลกอริทึมจึงต้องใช้ <b>Sigmoid Function &sigma;(x)</b> เพื่อบีบอัด (Squeeze) เวกเตอร์ทั้งหมดให้ตกลงมาอยู่ในความน่าจะเป็นทางคณิตศาสตร์ (Probability Range) ระหว่าง 0 ถึง 1 เท่านั้น</span>
                
                <div class="bg-white p-3 rounded-lg font-mono text-[11px] border border-indigo-200 text-center text-indigo-900 mb-2 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <p class="text-gray-500 mb-1 whitespace-nowrap">// Sigmoid Activation Equation</p>
                    <p class="font-bold text-sm whitespace-nowrap">P(Success | X) = 1 / (1 + e<sup>-(H<sup>(2)</sup> &middot; W<sup>(3)</sup> + B<sup>(3)</sup>)</sup>)</p>
                </div>
            </div>

            <!-- Phase 4: Counterfactual Simulation -->
            <div class="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-md flex flex-col relative overflow-hidden pb-safe">
                <div class="absolute top-0 right-0 p-3 opacity-10 text-emerald-900 text-5xl select-none pointer-events-none">4</div>
                <b class="text-emerald-800 mb-2 text-sm uppercase tracking-wide">Phase 4: Counterfactual Simulation (Success Leap Analysis)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">กระบวนการที่ล้ำลึกที่สุดของโมเดลนี้คือ การทำ <b>Counterfactual Inference (การวิเคราะห์เหตุการณ์สมมติ)</b> อัลกอริทึมจะคัดลอกสถานะการเงินปัจจุบัน (X<sub>current</sub>) มาสร้างเป็นแบบจำลองคู่ขนาน (X<sub>proposed</sub>) โดยสร้างค่า "วินัยทางการเงินเชิงอุดมคติ (Ideal Behaviors)" เข้าไป เช่น การบังคับให้ DTI_Ratio = 0.0 และ Savings_Ratio &ge; 0.20 แล้วรันสมการ Neural Network อีกรอบเพื่อหาค่า $\\Delta$ (Delta)</span>
                
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
    "c3_kmeans": {
        category: "c3",
        icon: "🧬",
        iconClass: "bg-purple-100 text-purple-700",
        title: "ระบบจัดกลุ่มอัตลักษณ์ลูกค้า (8D K-Means Clustering)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700">อัลกอริทึมเรียนรู้แบบไม่มีผู้สอน (Unsupervised Learning) ทำหน้าที่วิเคราะห์ข้อมูลลูกค้าทั้ง 8 มิติ แล้วแปลงเป็นพิกัดใน Hyperspace เพื่อค้นหาว่าลูกค้าคนนี้มี DNA ทางการเงินตรงกับ "กลุ่มเป้าหมาย (Centroids)" กลุ่มใดมากที่สุด</p>
        <div class="space-y-5">

            <!-- กล่องที่ 1: Features -->
            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
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
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <b class="text-purple-800 mb-2 select-none">📐 สมการหาระยะห่าง (Euclidean Distance in 8D Space)</b>
                <span class="text-xs text-gray-700 mb-3">เมื่อปรับสเกลข้อมูลลูกค้า (0.0 ถึง 1.0) แล้ว ระบบจะใช้สมการเรขาคณิตขั้นสูง เพื่อวัดระยะห่างระหว่างจุดของลูกค้า (P) กับจุดศูนย์กลางของแต่ละกลุ่ม (Centroids - C<sub>k</sub>) กลุ่มไหนได้ค่า Distance <b>"น้อยที่สุด"</b> ลูกค้าจะถูกจับไปอยู่กลุ่มนั้นทันที</span>
                <div class="mb-2 bg-purple-50 p-3 rounded-lg font-mono text-[11px] border border-purple-100 text-center text-purple-900 shadow-inner overflow-x-auto touch-pan-x overscroll-x-contain">
                    <span class="whitespace-nowrap">d(P, C<sub>k</sub>) = &radic;<span class="border-t border-purple-900 ml-1">&Sigma;(P<sub>norm,i</sub> - C<sub>k,i</sub>)<sup>2</sup></span></span>
                </div>
            </div>

            <!-- กล่องที่ 3: Case Study -->
            <div class="bg-white p-4 rounded-xl border shadow-sm">
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
                        <p class="text-xs font-bold text-red-800 mb-1">เคส B: คุณสุ (UHNW/หนี้ 177 ล้านบาท.)</p>
                        <p class="text-[11px] text-red-900 mb-2">Age: 54 | NW: 100M+ | DTI: สูงปรี๊ด | Disc: ต่ำ</p>
                        <p class="text-xs text-gray-700 leading-relaxed border-t border-red-200 pt-2">
                            <b>AI Analysis:</b> แม้จะมี NW ระดับ UHNW แต่อัตราส่วน DTI ที่สูงลิ่ว และ Cash Flow ที่ติดลบ ทำให้เวกเตอร์ของคุณสุพุ่งไปตกในกลุ่ม <b>"Overleveraged/Struggling (กลุ่มเปราะบาง/หนี้วิกฤต)"</b> ระบบจึงเบรกการลงทุน และบังคับใช้โหมดปกป้องสภาพคล่องแทน
                        </p>
                    </div>
                </div>
            </div>

            <!-- กล่องที่ 4: Anomaly Detection -->
            <div class="bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden pb-safe">
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
    "c3_consensus": {
        category: "c3",
        icon: "⚖️",
        iconClass: "bg-slate-100 text-slate-700",
        title: "กลไกตัดสินใจร่วม (Hybrid Co-Advisor Consensus Engine)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-3 text-sm text-gray-700">สถาปัตยกรรมปัญญาประดิษฐ์ (AI Pipeline) ที่ทำงานร่วมกันระหว่าง <b>Machine Learning</b> ในการแบ่งกลุ่มลูกค้า และ <b>Expert Heuristics</b> (กฎเกณฑ์ผู้เชี่ยวชาญทางการเงิน) เพื่อป้องกันการแนะนำที่ผิดพลาด (AI Hallucinations) ครบจบใน 5 ขั้นตอน</p>
        <div class="space-y-4">

            <!-- ขั้นตอนที่ 1: K-Means Clustering -->
            <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm flex flex-col">
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
            <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm flex flex-col">
                <b class="text-emerald-800 mb-2 flex items-center gap-2 select-none">Step 2: ซอยย่อยเฉพาะบุคคล (Micro Segmentation ด้วย Decision Tree)</b>
                <span class="text-xs text-gray-700 mb-2">โมเดลจะแตกกิ่งก้าน (Branching) โดยใช้ <b>"ภาระครอบครัว (Dependents)"</b> เป็นแกนหลัก และซอยย่อยตาม อายุ, รายได้, ทรัพย์สิน ฯลฯ พร้อมกลไกตรวจจับความผิดปกติ:</span>
                <ul class="text-[11px] list-disc list-inside p-3 font-mono bg-white border border-emerald-100 rounded-lg text-emerald-900 space-y-1.5 mb-1">
                    <li><b>Hard Rule:</b> หากพบว่าภาระหนี้ (DTI) > 60% ระบบจะปัดตกไปกลุ่ม <i>"หนี้ล้นพ้นตัว"</i> ทันทีโดยไม่สนอายุและรายได้</li>
                    <li><b>Anomaly Detection:</b> หากระยะห่าง (Distance) จากกลุ่ม K-Means > 1.85 ระบบจะตั้ง Flag ว่า <b>[Anomaly Detected]</b> เนื่องจากพฤติกรรมขัดแย้งในตัวเอง (เช่น รายได้ต่ำแต่ทรัพย์สินร้อยล้าน)</li>
                </ul>
            </div>

            <!-- ขั้นตอนที่ 3: Yellow Flags -->
            <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm flex flex-col">
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
            <div class="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm flex flex-col">
                <b class="text-red-800 mb-2 select-none">Step 4: ตรวจจับวิกฤตและล็อกเพดานคะแนน (Critical Hard Caps)</b>
                <span class="text-xs text-gray-700 mb-2">หากพบพฤติกรรมเสี่ยงถึงขั้น "สูญเสียความสามารถในการชำระหนี้" กฎของผู้เชี่ยวชาญจะ <b>เข้าแทรกแซง (Overriding)</b> และล็อกเพดานความสำเร็จสูงสุด (Maximum Limit) ไว้ทันที:</span>
                <ul class="text-[11px] list-none p-3 font-mono bg-white border border-red-100 rounded-lg text-red-900 space-y-1 mb-1 overflow-x-auto touch-pan-x overscroll-x-contain">
                    <li class="whitespace-nowrap">if(พบ "หนี้สินอันตราย/ล้นพ้นตัว") &rarr; Cap<sub>hard</sub> = 45.0% <i>(แผนมีความเสี่ยงพังทลายสูงมาก)</i></li>
                    <li class="whitespace-nowrap">else (ไม่พบความเสี่ยงระดับวิกฤต) &rarr; Cap<sub>hard</sub> = 100.0% <i>(ปล่อยให้เป็นไปตามการลดทอนใน Step 3)</i></li>
                </ul>
            </div>

            <!-- ขั้นตอนที่ 5: End-to-End Execution -->
            <div class="bg-slate-800 p-4 rounded-xl shadow-sm flex flex-col text-white pb-safe">
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
    "c3_xai": {
        category: "c3",
        icon: "🤖",
        iconClass: "bg-purple-100 text-purple-600",
        title: "ระบบ Explainable AI (XAI) ถอดรหัสความคิดสมองกล",
        content: `
        <div class="space-y-5 text-sm text-gray-700 leading-relaxed antialiased touch-manipulation pb-safe">
            <p class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                ระบบ <b>Explainable AI (XAI)</b> คือเทคโนโลยีที่เข้ามาเปิด "กล่องดำ (Black Box)" ของปัญญาประดิษฐ์ ระบบจะไม่เพียงแค่คายตัวเลขโอกาสสำเร็จออกมา แต่จะทำหน้าที่ <b>"ถอดรหัสความคิด"</b> ว่าทำไม AI ถึงตัดสินใจแบบนั้น โดยวิเคราะห์หาพฤติกรรมทางการเงินที่มีอิทธิพลสูงสุด (Key Drivers) พร้อมแปลงผลลัพธ์เป็นภาษามนุษย์ที่มีความเห็นอกเห็นใจ (Empathy) และมีเหตุผลรองรับ
            </p>
            
            <div class="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-lg shadow-sm">
                <h4 class="font-bold text-purple-900 text-base mb-3 select-none">⚙️ 3 กลไกการทำงานเบื้องหลังระบบ XAI</h4>
                <ul class="list-none space-y-4">
                    <li>
                        <b>🧪 1. การจำลองความอ่อนไหว (Perturbation Analysis):</b> 
                        ระบบไม่ได้จำตัวเลขตายตัว แต่ใช้วิธีจำลอง "ขยับตัวเลขขึ้นและลง 10%" ของตัวแปรทุกตัว (เช่น ถ้าลองเพิ่มหนี้ 10% หรือ ลดรายจ่าย 10%) เพื่อดูว่า <i>คะแนนความสำเร็จจะแกว่งไปทิศทางไหน และตัวแปรใดส่งผลกระทบแรงที่สุด</i>
                    </li>
                    <li>
                        <b>🛡️ 2. ระบบกรองสัญญาณรบกวน (The Noise Filter):</b> 
                        เพื่อไม่ให้ AI จุกจิกเกินไป ระบบจะบังคับใช้กฎ <b>"Threshold 2.0%"</b> นั่นคือพฤติกรรมนั้นต้องมีพลังพอที่จะทำให้คะแนนเปลี่ยนตั้งแต่ 2.0% ขึ้นไปเท่านั้น จึงจะถูกคัดเลือกมาแสดงผล และคัดกรองมาแค่ "Top 3 ตัวแปรหลัก" เพื่อให้ลูกค้าโฟกัสได้ถูกจุด
                    </li>
                    <li>
                        <b>💬 3. การสร้างภาษามนุษย์ (Natural Language Generation - NLG):</b> 
                        ระบบจะวิเคราะห์ความรุนแรงของผลกระทบ (Impact) เพื่อ "เลือกระดับอารมณ์ของคำพูด" (เช่น กระทบ > 15% ใช้คำว่า <i>'อย่างมหาศาล'</i>) และดึงประโยคจาก Context Matrix มาสร้างคำอธิบายที่สมูทที่สุด
                    </li>
                </ul>
            </div>

            <h4 class="font-bold text-gray-800 text-base mt-8 mb-3 flex items-center gap-2 select-none"><span class="text-xl">💬</span> การแปลความหมาย (Context & Sentiment Matrix)</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <!-- Positive Driver -->
                <div class="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm flex flex-col h-full relative overflow-hidden">
                    <div class="absolute -right-4 -top-2 text-6xl opacity-10 select-none pointer-events-none">🟢</div>
                    <b class="text-emerald-700 text-[13px] mb-2 block">1. ปัจจัยหนุน (Positive Driver)</b>
                    <p class="text-xs text-gray-600 mb-3 flex-grow">
                        เมื่อค่าพฤติกรรมนี้ "เพิ่มขึ้น" แล้วทำให้ "คะแนนพุ่งขึ้น" ตามไปด้วย (ชี้ให้เห็นจุดแข็งของลูกค้า)
                    </p>
                    <div class="bg-emerald-50 p-2 rounded border border-emerald-100 mb-2">
                        <span class="text-[10px] text-emerald-800 leading-tight block"><i>"✅ ฐานรายได้ของคุณแข็งแกร่ง เป็นฟันเฟืองหลักที่ขับเคลื่อนแผนนี้อย่างชัดเจน (+8.5%)"</i></span>
                    </div>
                    <div class="mt-auto pt-2 border-t border-emerald-100">
                        <span class="text-[10px] font-bold text-emerald-700 block">💡 FA Action (สิ่งที่ควรทำ):</span>
                        <span class="text-[10px] text-emerald-900 leading-tight block">กล่าวชื่นชมเพื่อสร้างกำลังใจ (Validation) ทำให้ลูกค้ารู้สึกว่ามาถูกทางแล้ว</span>
                    </div>
                </div>

                <!-- Negative Constraint -->
                <div class="bg-white p-4 rounded-xl border border-rose-200 shadow-sm flex flex-col h-full relative overflow-hidden">
                    <div class="absolute -right-4 -top-2 text-6xl opacity-10 select-none pointer-events-none">🔴</div>
                    <b class="text-rose-700 text-[13px] mb-2 block">2. ปัจจัยฉุดรั้ง (Negative Constraint)</b>
                    <p class="text-xs text-gray-600 mb-3 flex-grow">
                        เมื่อค่าพฤติกรรมนี้ "เพิ่มขึ้น" แต่กลับทำให้ "คะแนนลดฮวบ" (ชี้ให้เห็นรอยรั่วทางการเงิน)
                    </p>
                    <div class="bg-rose-50 p-2 rounded border border-rose-100 mb-2">
                        <span class="text-[10px] text-rose-800 leading-tight block"><i>"🛍️ รายจ่ายที่ตึงตัวเกินไปกำลังลดทอนความมั่งคั่ง ฉุดรั้งแผนของคุณอย่างมหาศาล (-16.2%)"</i></span>
                    </div>
                    <div class="mt-auto pt-2 border-t border-rose-100">
                        <span class="text-[10px] font-bold text-rose-700 block">💡 FA Action (สิ่งที่ควรทำ):</span>
                        <span class="text-[10px] text-rose-900 leading-tight block">สะท้อนให้เห็นผลกระทบด้วยตัวเลข เพื่อสร้างความตระหนักรู้ (Awareness) โดยไม่ต้องตำหนิโดยตรง</span>
                    </div>
                </div>

                <!-- Optimization Opportunity -->
                <div class="bg-white p-4 rounded-xl border border-amber-200 shadow-sm flex flex-col h-full relative overflow-hidden">
                    <div class="absolute -right-4 -top-2 text-6xl opacity-10 select-none pointer-events-none">💡</div>
                    <b class="text-amber-700 text-[13px] mb-2 block">3. จุดปลดล็อก (Opportunity)</b>
                    <p class="text-xs text-gray-600 mb-3 flex-grow">
                        คำแนะนำเชิงบวก ชี้ให้เห็นว่าถ้า "ลด" พฤติกรรมนี้ได้ คะแนนความสำเร็จจะพุ่งขึ้นทันที
                    </p>
                    <div class="bg-amber-50 p-2 rounded border border-amber-100 mb-2">
                        <span class="text-[10px] text-amber-800 leading-tight block"><i>"💳 หากเร่งโปะหนี้เพื่อลดภาระดอกเบี้ย จะปลดล็อกกระแสเงินสดและหนุนพอร์ตให้โตขึ้น (+12.0%)"</i></span>
                    </div>
                    <div class="mt-auto pt-2 border-t border-amber-100">
                        <span class="text-[10px] font-bold text-amber-700 block">💡 FA Action (สิ่งที่ควรทำ):</span>
                        <span class="text-[10px] text-amber-900 leading-tight block">เสนอทางออก (Call to Action) ขายไอเดียปรับโครงสร้าง หรือเสนอแผนการออมเพิ่ม</span>
                    </div>
                </div>

            </div>

            <h4 class="font-bold text-gray-800 text-base mt-8 mb-3 flex items-center gap-2 select-none"><span class="text-xl">🎬</span> ตัวอย่างการนำไปใช้จริง (Roleplay Scenario)</h4>
            <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
                <p class="font-bold text-slate-800 mb-2">เคสตัวอย่าง: ลูกค้ารายได้สูง แต่ติดกับดักรูดบัตรเครดิต</p>
                <p class="text-xs text-slate-600 mb-4">หน้าจอ XAI แสดงผลว่า: <i>"🛍️ รายจ่ายที่ตึงตัวเกินไปกำลังลดทอนความมั่งคั่ง ฉุดรั้งแผนของคุณอย่างมหาศาล (-16.2%)"</i></p>
                
                <div class="space-y-3">
                    <div class="bg-red-50 p-4 rounded-lg border border-red-100 relative">
                        <span class="text-xs font-bold text-red-700 block mb-1">❌ วิธีคุยแบบเดิม (อาจสร้างแรงต้าน):</span>
                        <span class="text-xs text-red-900 block italic leading-relaxed">"พี่ครับ พี่ใช้เงินเปลืองมาก หนี้บัตรก็เยอะ ถ้าพี่ยังเป็นแบบนี้ แผนเกษียณพี่พังแน่นอนครับ ต้องลดรายจ่ายด่วนเลยนะครับไม่งั้นเงินไม่พอแน่"</span>
                        <p class="text-[10px] text-red-600 mt-2"><b>ผลลัพธ์:</b> ลูกค้ารู้สึกถูกตำหนิ อับอาย และอาจปิดใจไม่รับฟังคำแนะนำ</p>
                    </div>
                    
                    <div class="bg-green-50 p-4 rounded-lg border border-green-100 relative">
                        <span class="text-xs font-bold text-green-700 block mb-1">✅ วิธีคุยด้วย XAI (สร้างความร่วมมือ):</span>
                        <span class="text-xs text-green-900 block italic leading-relaxed">"พี่ครับ AI วิเคราะห์มาว่า 'ฐานรายได้' ของพี่เป็นจุดแข็งที่ยอดเยี่ยมมากครับ แต่มีจุดที่น่าเสียดายจุดนึงคือ 'สัดส่วนรายจ่าย' มันเข้ามาดึงคะแนนความสำเร็จของพี่ลงไปถึง 16.2%... ถ้าเราลองมาทำ Cash Flow Management เพื่ออุดรอยรั่วตรงนี้ โอกาสที่พี่จะเกษียณแบบพอร์ตโตๆ จะพุ่งกลับขึ้นมาทันทีเลยครับ พี่สนใจดูมั้ยครับว่าเราจะปรับโครงสร้างหนี้ตรงไหนได้บ้าง?"</span>
                        <p class="text-[10px] text-green-700 mt-2"><b>ผลลัพธ์:</b> ลูกค้ารู้สึกว่า FA เข้าใจปัญหา AI เป็นผู้ช่วยชี้เป้า และ FA คือที่ปรึกษาที่มาช่วยหาทางออกให้ (Partner in Crime)</p>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800 text-white p-5 rounded-xl mt-6 text-sm shadow-xl">
                <p class="font-bold text-fuchsia-400 mb-2 flex items-center gap-2 select-none"><span class="text-xl">💎</span> FA Takeaway (บทสรุปสำหรับที่ปรึกษา)</p>
                <p class="text-gray-300 leading-relaxed">
                    XAI คือเครื่องมือที่ช่วย <b>"เปลี่ยนบทสนทนา"</b> ที่น่าอึดอัดใจให้กลายเป็นแรงบันดาลใจ<br>
                    หน้าที่ของเราคือการนำข้อความเชิงลบ (Negative Constraint) มาบวกกับโอกาส (Opportunity) แล้วสื่อสารออกไปเพื่อสะท้อนให้ลูกค้าเห็นว่า <b>"การตัดสินใจในวันนี้ ส่งผลมหาศาลต่อเป้าหมายในวันข้างหน้า"</b> สิ่งนี้แหละครับที่จะสร้าง Trust และปิดการขายด้วยความประทับใจได้อย่างยั่งยืน
                </p>
            </div>
        </div>`
    },

    // ==========================================
    // 🟠 ส่วนที่ 4: แบบจำลอง ทฤษฎี การคำนวณ (Models & Theories) -> category: "c4"
    // ==========================================
    "c4_cfp": {
        category: "c4",
        icon: "📊",
        iconClass: "bg-blue-100 text-blue-700",
        title: "มาตรฐานประเมินสุขภาพการเงิน (CFP Financial Ratios)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700 leading-relaxed"><b>กรอบการวิเคราะห์มาตรฐานสากล (CFP Board Standards):</b> กลุ่มสมการนี้ใช้สำหรับวินิจฉัย "จุดอ่อนและจุดแข็ง" เชิงโครงสร้างของงบกระแสเงินสดส่วนบุคคล (Personal Cash Flow) และงบแสดงฐานะการเงิน (Personal Balance Sheet) เพื่อค้นหาความเสี่ยงแฝงที่อาจนำไปสู่ภาวะล้มละลายทางเทคนิค</p>
        
        <div class="space-y-6">

            <!-- อัตราส่วนที่ 1: Survival Ratio -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden pb-safe">
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
    "c4_tvm": {
        category: "c4",
        icon: "⏳",
        iconClass: "bg-indigo-100 text-indigo-700",
        title: "ทฤษฎีมูลค่าเงินตามเวลาและการจัดการหนี้ (Time Value of Money)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700 leading-relaxed"><b>บทเรียนวิชาการ (Academic Theory):</b> ทฤษฎีมูลค่าเงินตามเวลา (TVM) คือรากฐานของวิศวกรรมการเงินทั้งหมด ตั้งอยู่บนสมมติฐานที่ว่า <i>"เงินหนึ่งบาทในวันนี้ มีค่ามากกว่าเงินหนึ่งบาทในอนาคต"</i> ระบบจึงใช้กลุ่มสมการเหล่านี้ในการคิดลด (Discounting) และทบต้น (Compounding) เพื่อสร้างแผนการเงินที่แม่นยำ</p>
        
        <div class="space-y-6">

            <!-- บทที่ 1: Fisher Equation -->
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden">
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
            <div class="bg-white p-5 rounded-xl border shadow-md flex flex-col relative overflow-hidden pb-safe">
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
    "c4_market": {
        category: "c4",
        icon: "📉",
        iconClass: "bg-blue-100 text-blue-600",
        title: "สมการผลตอบแทนตลาดและสภาวะวิกฤต (Market Dynamics)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700">วิศวกรรมการเงินที่รองรับเหตุการณ์ไม่คาดฝัน (Black Swan) วัฏจักรตลาด (Market Regimes) และความทนทานต่อความเสี่ยงของพอร์ตเกษียณ</p>
        <div class="space-y-5">

            <!-- กล่องที่ 1: ทฤษฎีวิชาการ -->
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
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
            <div class="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm flex flex-col">
                <b class="text-blue-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">⚙️</span> 2. ปัจจัยนำเข้าแบบจำลอง (Simulation Inputs)</b>
                <span class="text-xs text-gray-700 mb-3">ระบบไม่ได้ใช้ตัวเลขลอยๆ แต่จะดึงค่าจากโปรไฟล์ลูกค้าเข้ามารันใน <b>Monte Carlo Simulation 2,000 รอบ</b> ดังนี้:</span>
                
                <ul class="text-xs text-blue-900 space-y-2 list-disc list-inside bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                    <li><b>เงินตั้งต้น (Initial Wealth):</b> มูลค่าพอร์ตลงทุนปัจจุบันทั้งหมดรวมกัน</li>
                    <li><b>เงินออมรายปี (DCA):</b> กระแสเงินสดสุทธิ (Income - Expenses) ที่พร้อมลงทุนเพิ่ม</li>
                    <li><b>ระยะเวลา (Time Horizon):</b> จำนวนปีตั้งแต่ปัจจุบันจนถึงอายุขัย (Life Expectancy)</li>
                    <li><b>เงินเฟ้อไดนามิก (Stochastic Inflation):</b> การจำลองค่าครองชีพที่แพงขึ้นแบบแกว่งตัว (ไม่คงที่)</li>
                    <li><b>อัตราผลตอบแทนและความผันผวน (&mu;, &sigma;):</b> อ้างอิงจากแบบประเมินความเสี่ยง (Risk Profile) ของลูกค้า</li>
                    <li><b>หนี้สิน (Leverage Effect):</b> ภาระการผ่อนหนี้ที่บั่นทอนเงินออม (รวมถึงวันปลดหนี้)</li>
                </ul>
            </div>

            <!-- กล่องที่ 2.5: การแบ่งสมองคำนวณ -->
            <div class="bg-purple-50 p-5 rounded-xl border border-purple-200 shadow-sm flex flex-col">
                <b class="text-purple-800 mb-2 flex items-center gap-2 select-none"><span class="text-lg">🔀</span> 3. การจำลองโลกคู่ขนาน (Current vs Proposed Plan)</b>
                <span class="text-xs text-gray-700 mb-3 leading-relaxed">ก่อนส่งเข้าเตาเผา Monte Carlo ระบบจะแยกสมองประมวลผลออกเป็น 2 เส้นทาง เพื่อเปรียบเทียบ Before/After ให้เห็นภาพชัดเจน:</span>
                <ul class="text-xs text-purple-900 space-y-2 list-none bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                    <li><b class="text-gray-500">🔴 พอร์ตปัจจุบัน (Current):</b> ใช้อัตราออมจริงของลูกค้า + ผลตอบแทนพอร์ตเดิม (เช่น ฝากแบงก์ 1%) + ไม่ตั้งเงินสำรองฉุกเฉิน</li>
                    <li><b class="text-blue-600">🔵 พอร์ตแนะนำ (Proposed):</b> บังคับใช้ยอดออมใหม่ที่ AI แนะนำ + ผลตอบแทนพอร์ตใหม่ (เช่น 8%) + บังคับหักเงินเตรียม Cash Buffer ล่วงหน้า 2 ปี</li>
                    <li class="border-t border-purple-100 pt-2 mt-2"><b class="text-red-600">🚨 Parameter Injection (การลงโทษจากพฤติกรรม):</b> แม้พอร์ตแนะนำจะตั้งเป้าไว้สวยงาม แต่ถ้าลูกค้ามีหนี้ (DTI) > 40% ระบบจะแอบ <b>"หักยอดออมในฝันลง 20%"</b> ก่อนรันจำลอง เพื่อสะท้อนความจริงว่าลูกค้าจะออมไม่ไหวและหยุดกลางทาง</li>
                </ul>
            </div>

            <!-- กล่องที่ 3: การแปลผลลัพธ์ผ่าน Case Study -->
            <div class="bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💡</div>
                <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">📊</span> 4. การแปลผลลัพธ์ (Output Interpretation)</b>
                
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

            <!-- กล่องที่ 4: ภาคปฏิบัติ (Practical FA Application) -->
            <div class="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col pb-safe">
                <b class="text-emerald-800 mb-3 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> 5. ภาคปฏิบัติ: การประยุกต์ใช้เพื่อวางแผนหน้างาน (Practical FA Action)</b>
                <span class="text-xs text-gray-700 mb-3">ในการนำแผนไปคุยกับลูกค้า ที่ปรึกษาการเงิน (FA) สามารถใช้กลไกเบื้องหลังของระบบเพื่อแก้ปัญหาและตอบข้อโต้แย้งได้ดังนี้:</span>

                <div class="space-y-3">
                    <!-- สถานการณ์ที่ 1 -->
                    <div class="bg-white p-3.5 rounded-lg border border-emerald-100 shadow-sm">
                        <b class="text-[12px] text-emerald-700 block mb-1">🛡️ รับมือความเสี่ยงพอร์ตพังวันเกษียณ (Sequence of Return Risk)</b>
                        <p class="text-[11px] text-gray-600 leading-relaxed">
                            <b>ปัญหา:</b> ลูกค้ากังวลว่า "ถ้าเกษียณปีแรกแล้วเจอวิกฤตต้มยำกุ้งเลย พอร์ตจะไม่ได้รับผลกระทบหนักหรือ?"<br>
                            <b>กลไกของระบบ:</b> โมเดลนี้ได้ฝังกลยุทธ์ <b>Cash Buffer (Bucket Strategy)</b> ไว้เรียบร้อยแล้ว หากจำลองแล้วพบว่าผลตอบแทนติดลบรุนแรง (Market Crash) ระบบจะสั่งดึง <i>"เงินสดสำรองปลอดภัย"</i> ออกมาจ่ายเป็นค่าครองชีพแทนการ "บังคับขายหุ้นขาดทุน (Forced Sale)" เพื่อซื้อเวลาให้พอร์ตหุ้นฟื้นตัว<br>
                            <span class="text-emerald-600 font-semibold mt-1 block">💬 บทสนทนา FA: "แผนของผมออกแบบมาเผื่อวิกฤตแล้วครับ เรามีถังเงินสดเตรียมไว้รับแรงกระแทกเรียบร้อย ไม่ต้องขายสินทรัพย์หนีตายในช่วงตลาดแย่แน่นอน"</span>
                        </p>
                    </div>

                    <!-- สถานการณ์ที่ 2 -->
                    <div class="bg-white p-3.5 rounded-lg border border-emerald-100 shadow-sm">
                        <b class="text-[12px] text-emerald-700 block mb-1">📉 กฎการถอนเงินแบบยืดหยุ่น (Dynamic Withdrawal Rule)</b>
                        <p class="text-[11px] text-gray-600 leading-relaxed">
                            <b>ปัญหา:</b> ลูกค้ายึดติดกับการถอนเงินใช้เท่าเดิมในทุกสภาวะเศรษฐกิจ<br>
                            <b>กลไกของระบบ:</b> ระบบใช้ตรรกะแบบ Guyton-Klinger หากสุ่มเจอปีที่วิกฤตหนัก ระบบจะจำลอง <b>"การลดค่าใช้จ่ายลง (ตัดงบฟุ่มเฟือย)"</b> โดยอัตโนมัติ เพื่อสงวนเงินต้นไว้ แต่ถ้ารูปการณ์ยังแย่อยู่ (ความน่าจะเป็น < 50%) ระบบจะประเมินให้อายุเงินหมดไวขึ้น<br>
                            <span class="text-emerald-600 font-semibold mt-1 block">💬 บทสนทนา FA: "ความเสี่ยงนี้แก้ได้ง่ายๆ ครับ ถ้าพอร์ตเราเจอวิกฤตหนักจริงๆ เราอาจต้องตกลงกันว่าในปีนั้นเราจะลดไลฟ์สไตล์ หรือเที่ยวน้อยลงสักนิด เพื่อให้พอร์ตยังมีชีวิตรอดไปจนถึงอายุขัยครับ"</span>
                        </p>
                    </div>

                    <!-- สถานการณ์ที่ 3 -->
                    <div class="bg-white p-3.5 rounded-lg border border-emerald-100 shadow-sm">
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
    "c4_decum": {
        category: "c4",
        icon: "🏛️",
        iconClass: "bg-blue-100 text-blue-600",
        title: "กลไกหลังเกษียณและประเมินความเสี่ยงขาลง (Decumulation & Tail Risk)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-3 text-sm text-gray-700">กลยุทธ์ป้องกันเงินหมดก่อนตาย (Longevity Risk) และการบริหารกระแสเงินสดภายใต้ความผันผวน</p>
        <div class="space-y-5">
            
            <!-- กล่องที่ 1: Guyton-Klinger -->
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
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
            <div class="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm flex flex-col">
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
            <div class="bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden pb-safe">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💬</div>
                <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> 3. ภาคปฏิบัติ: วิธีแปลผลและนำเสนอลูกค้า (FA Action Plan)</b>
                
                <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                    การนำเสนอเรื่อง "การลดยอดถอนเงิน" หรือ "วิกฤตเศรษฐกิจ" อาจทำให้ลูกค้ากังวล FA จึงต้องใช้ศิลปะในการแปลผลตัวเลขคณิตศาสตร์เหล่านี้ให้กลายเป็น <b>"ทางออกที่จับต้องได้"</b>
                </p>

                <div class="space-y-3 relative z-10">
                    <!-- Situation 1 -->
                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
                        <b class="text-purple-400 text-xs block mb-1">📉 การแปลผลกฎลดยอดถอน (Guyton-Klinger)</b>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>ที่มา:</b> เมื่อโปรแกรมแจ้งเตือนว่าต้องลดยอดใช้จ่ายลง 10% (จาก 400,000 เหลือ 360,000 บาท) ลูกค้าอาจรู้สึกว่าแผนล้มเหลว<br>
                            <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ ตัวเลขที่ระบบแนะนำให้ลดการใช้จ่ายลง 10% ในปีนี้ ไม่ได้แปลว่าเงินเราจะหมดนะครับ แต่ระบบกำลังทำหน้าที่เป็น 'เบรกฉุกเฉิน' เหมือนเราขับรถเจอพายุ เราแค่ชะลอความเร็วลงนิดหน่อย พอพายุผ่านไปตลาดหุ้นฟื้นตัว เราก็สามารถกลับมาถอนเงินได้เท่าเดิมครับ การยอมลดไลฟ์สไตล์ลงเดือนละนิด แลกกับการมีพอร์ตที่ยั่งยืนไปตลอดชีวิต คุ้มค่าและปลอดภัยกว่าการฝืนถอนกินเงินต้นครับ"</span>
                        </p>
                    </div>

                    <!-- Situation 2 -->
                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
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
    "c4_knapsack": {
        category: "c4",
        icon: "🎒",
        iconClass: "bg-emerald-100 text-emerald-700",
        title: "อัลกอริทึมจัดกระเป๋าผลิตภัณฑ์ (DP Knapsack & Optimization)",
        content: `
        <div class="antialiased touch-manipulation">
        <p class="mb-4 text-sm text-gray-700">การจัดสรรงบประมาณที่มีจำกัด เพื่อซื้อผลิตภัณฑ์การเงินให้ได้ "อรรถประโยชน์รวมสูงสุด" (Maximum Total Utility) โดยไม่ทำให้กระแสเงินสดพังทลาย</p>
        <div class="space-y-5">
            
            <!-- กล่องที่ 1: ทฤษฎีวิชาการ -->
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
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
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
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
            <div class="bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden pb-safe">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💬</div>
                <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> 3. ภาคปฏิบัติ: การใช้ AI ช่วยตอบข้อโต้แย้ง (FA Action Plan)</b>
                
                <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                    หลายครั้งที่ลูกค้าอยากได้ความคุ้มครองครบทุกด้าน (ทุนชีวิต + ค่ารักษา + ชดเชยรายได้) แต่มีงบประมาณจำกัด อัลกอริทึมนี้จะช่วยให้ FA อธิบายเหตุผลที่ต้อง <b>"เลือกทิ้งบางอย่าง (Trade-off)"</b> ได้อย่างมีตรรกะและดูเป็นมืออาชีพ
                </p>

                <div class="space-y-3 relative z-10">
                    <!-- Situation 1 -->
                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
                        <b class="text-emerald-400 text-xs block mb-1">⚖️ กรณีลูกค้าอยากได้ชดเชยรายวัน (HB) แต่ระบบแนะนำให้ตัดทิ้ง</b>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            <b>ที่มา:</b> จากตารางด้านบน AI เลือก Option B (ค่ารักษา + ทุนชีวิต) ทิ้งชดเชยรายวัน เพราะให้ Utility Score (คะแนนคุ้มค่า) น้อยที่สุดเมื่อเทียบกับเบี้ยที่ต้องจ่าย<br>
                            <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ ผมเข้าใจว่าชดเชยรายวันดูน่าสนใจ แต่ด้วยกรอบงบประมาณ 20,000 บาท/ปี AI คำนวณแล้วว่าการจัดพอร์ตแบบ Option B จะปกป้องความมั่งคั่งให้คุณลูกค้าได้คุ้มค่าเงินทุกบาทที่สุดครับ เพราะการปิดรอยรั่วค่ารักษา (15,000) และทุนชีวิต (4,000) ช่วยป้องกันวิกฤตระดับหายนะได้ดีกว่าเอาเงินไปซื้อชดเชยรายวันครับ"</span>
                        </p>
                    </div>

                    <!-- Situation 2 -->
                    <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
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
    "c4_taxalpha": {
        category: "c4",
        icon: "⚖️",
        iconClass: "bg-orange-100 text-orange-600",
        title: "อัลกอริทึมประเมินภาษีเชิงรุก (Tax Alpha Engine)",
        content: `
        <div class="antialiased touch-manipulation pb-safe">
        <p class="mb-3 text-sm text-gray-700">ระบบคำนวณประหยัดภาษี (Tax Optimization) อิงตามกฎหมาย ภ.ง.ด. 90/91 (เกณฑ์ล่าสุด)</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
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
    "c4_invest": {
        category: "c4",
        icon: "📈",
        iconClass: "bg-blue-100 text-blue-600",
        title: "การวิเคราะห์และกลยุทธ์การลงทุน (Investment & Strategy)",
        content: `
        <div class="antialiased touch-manipulation">
        <ul class="list-disc list-inside mt-2 space-y-3 text-sm text-gray-700">
            <li><b>Asset Allocation (การจัดสรรสินทรัพย์):</b> หัวใจสำคัญของการลงทุนที่ส่งผลต่อผลตอบแทนระยะยาวถึง 90% เน้นกระจายเงินไปในหลายสินทรัพย์ (หุ้น, ตราสารหนี้, อสังหาฯ) <i>เพื่อลดความผันผวน และควรทำ Portfolio Rebalancing (การปรับสมดุลพอร์ต) อย่างน้อยปีละครั้งเพื่อรักษาระดับความเสี่ยง</i></li>
            <li><b>Expected Shortfall (CVaR 95%):</b> ตัวเลขประเมินความเสี่ยงที่บอกว่า <i>"ในสถานการณ์ตลาดพังพินาศที่สุด 5% พอร์ตเราจะติดลบเฉลี่ยเท่าไหร่"</i> เป็นข้อมูลสำคัญที่ FA ต้องแจ้งเพื่อให้ลูกค้าประเมินความสามารถในการรับความเสี่ยงใน Worst-case scenario ได้</li>
            <li><b>Tax Alpha (ผลตอบแทนส่วนเพิ่มจากภาษี):</b> การสร้าง "กำไรที่ไร้ความเสี่ยงตลาด" ผ่านการวางแผนภาษี (เช่น RMF, SSF, ThaiESG หรือ ประกันชีวิต) <i>หากลูกค้านำเงินคืนภาษีที่ได้ไป Re-invest ต่อเนื่อง จะเกิดพลังของดอกเบี้ยทบต้น (Compound Effect) มหาศาล</i></li>
            <li><b>DCA vs Lump Sum:</b> <b>DCA</b> (ทยอยลงทุนเท่าๆ กัน) ช่วยรักษาวินัย ตัดอารมณ์ตลาด และถัวเฉลี่ยต้นทุน เหมาะกับมนุษย์เงินเดือน | <b>Lump Sum</b> (ลงทุนก้อนเดียว) มักให้ผลตอบแทนโดยรวมดีกว่าในตลาดขาขึ้น แต่ต้องใช้ความชำนาญในการจับจังหวะ (Market Timing)</li>
        </ul>
        
        <div class="mt-5 p-4 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
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
        <div class="mt-5 bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden pb-safe">
            <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💬</div>
            <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> ภาคปฏิบัติ: การนำไปใช้พูดคุยกับลูกค้า (FA Action Plan)</b>
            
            <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                การอธิบายเรื่องการลงทุนให้ลูกค้าเข้าใจและคล้อยตาม ต้องเปลี่ยนจาก "ภาษาการเงินทางทฤษฎี" เป็น "ผลลัพธ์ที่กระทบกับชีวิต" (Impact & Feelings)
            </p>

            <div class="space-y-3 relative z-10">
                <!-- Situation 1 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
                    <b class="text-yellow-400 text-xs block mb-1">📉 ใช้ CVaR ประเมิน "จุดวัดใจ" ของลูกค้า (Risk Tolerance Check)</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ลูกค้าอยากได้ผลตอบแทนสูง (เช่น ขอลงทุนหุ้น 100%) และทำแบบประเมินความเสี่ยงออกมาว่ารับความเสี่ยงได้สูง<br>
                        <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ พอร์ตที่คาดหวังกำไร 10% ต่อปี ระบบจำลองจุดเลวร้ายที่สุด 5% (CVaR) ไว้ว่าพอร์ตอาจติดลบถึง -25% แปลว่าถ้าเราลงทุน 10 ล้าน ในปีวิกฤตเงินอาจวูบหายเหลือ 7.5 ล้านบาทชั่วคราว คุณลูกค้ารับความผันผวนระดับนี้ไหวไหมครับ? ถ้ารู้สึกกังวล เรามาปรับ Asset Allocation เพิ่มตราสารหนี้ให้ปลอดภัยขึ้นดีกว่าครับ"</span>
                    </p>
                </div>

                <!-- Situation 2 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
                    <b class="text-emerald-400 text-xs block mb-1">💰 ขาย Tax Alpha เป็น "กำไรไร้ความเสี่ยง" (Risk-Free Return)</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ลูกค้าไม่อยากซื้อกองทุนประหยัดภาษี (RMF/SSF/ThaiESG) หรือประกันแบบสะสมทรัพย์/บำนาญ เพราะรู้สึกว่าถูกล็อกเงินนาน<br>
                        <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "ฐานภาษีของคุณลูกค้าอยู่ที่ 20% การย้ายเงินก้อนนี้มาลงทุนในกองทุนลดหย่อนภาษี หรือ Unit Linked เท่ากับคุณลูกค้าได้ 'กำไรการันตี 20% ทันทีตั้งแต่วันแรก' เลยนะครับ ไม่มีสินทรัพย์ไหนในโลกให้ผลตอบแทนการันตีสูงและปลอดภัยขนาดนี้ ยิ่งถ้านำเงินคืนภาษีนั้นมาออมทบต้นต่อ (Re-invest) พอร์ตเกษียณเราจะถึงเป้าหมายเร็วขึ้นมหาศาลเลยครับ"</span>
                    </p>
                </div>

                <!-- Situation 3 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
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
    "c4_behavior": {
        category: "c4",
        icon: "🎭",
        iconClass: "bg-gray-100 text-gray-600",
        title: "จิตวิทยาและพฤติกรรมทางการเงิน (Behavioral Finance & DISC)",
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
        <div class="mt-5 p-4 bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm">
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
        <div class="mt-5 bg-slate-800 p-5 rounded-xl shadow-md text-white border border-slate-700 relative overflow-hidden pb-safe">
            <div class="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">💬</div>
            <b class="text-cyan-400 mb-3 block relative z-10 flex items-center gap-2 select-none"><span class="text-lg">🛠️</span> ภาคปฏิบัติ: จิตวิทยาการพูดคุยเพื่อเปลี่ยนพฤติกรรม (FA Action Plan)</b>
            
            <p class="text-xs text-slate-300 mb-4 relative z-10 leading-relaxed">
                การเข้าใจตัวเลขคณิตศาสตร์เพียงอย่างเดียวไม่อาจเปลี่ยนพฤติกรรมลูกค้าได้ FA ที่เก่งต้องใช้ "อคติ (Bias)" ของมนุษย์ให้เป็นประโยชน์ในการโน้มน้าวใจ
            </p>

            <div class="space-y-3 relative z-10">
                <!-- Situation 1 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
                    <b class="text-emerald-400 text-xs block mb-1">🧠 โจมตีด้วย Loss Aversion (เมื่อลูกค้ากลัวการลงทุน)</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ลูกค้าไม่ยอมย้ายเงินจากบัญชีออมทรัพย์มาลงทุน (Lifestyle Creep หรือ Cash Hoarder) เพราะกลัวขาดทุน (Loss Aversion)<br>
                        <b>ทริคจิตวิทยา:</b> ย้าย "ความเจ็บปวด" จากการกลัวหุ้นตก ไปเป็น "ความเจ็บปวด" จากการโดนเงินเฟ้อกัดกินแทน<br>
                        <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "คุณลูกค้าครับ ผมเข้าใจเลยว่าการลงทุนมีความเสี่ยงที่เงินจะลดลง แต่วันนี้การฝากเงินสดทิ้งไว้เฉยๆ ไม่ใช่ 'ความเสี่ยง' นะครับ แต่คือ 'การการันตีขาดทุน 100%' จากเงินเฟ้อที่ 3% ทุกปี... แปลว่าอีก 10 ปี เงิน 1 ล้านจะซื้อของได้เท่ากับ 7 แสนบาท เรามาย้ายเงินบางส่วนมาตั้งรับการขาดทุนตรงนี้ด้วยพอร์ตความเสี่ยงต่ำกันดีไหมครับ?"</span>
                    </p>
                </div>

                <!-- Situation 2 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
                    <b class="text-yellow-400 text-xs block mb-1">🏷️ Hack พฤติกรรมด้วย Mental Accounting (การตั้งชื่อบัญชี)</b>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        <b>สถานการณ์:</b> ลูกค้าเงินเดือนสูง แต่ไม่มีเงินเก็บ พอมีเงินในบัญชีเยอะก็เผลอใช้จ่ายหมด (Lifestyle Creep)<br>
                        <b>ทริคจิตวิทยา:</b> มนุษย์มักจะนำเงิน "โบนัส" ไปกินเที่ยว เพราะให้ค่ามันน้อยกว่า "เงินเดือน" ทั้งที่มูลค่าเท่ากัน เราจึงต้องสร้างบัญชีใหม่แล้วตั้งชื่อให้ดูศักดิ์สิทธิ์ ลูกค้าจะไม่กล้าถอนมาใช้ฟุ่มเฟือย<br>
                        <span class="text-cyan-300 font-semibold mt-1.5 block">💬 บทสนทนา FA: "เพื่อให้กระแสเงินสดของคุณลูกค้าดีขึ้น เรามาเปิดบัญชี AIA Unit Linked แบบตัดผ่านบัตรเครดิตอัตโนมัติกันครับ เราจะตั้งชื่อพอร์ตนี้ว่า 'กองทุนการศึกษาน้อง A' หรือ 'พอร์ตเกษียณหรูหรา' พอสิ้นเดือนเงินถูกกันมาใส่กองนี้ คุณลูกค้าจะสบายใจในการใช้เงินก้อนที่เหลือได้เต็มที่โดยไม่รู้สึกผิดเลยครับ"</span>
                    </p>
                </div>

                <!-- Situation 3 -->
                <div class="bg-slate-900/80 p-3.5 rounded border border-slate-600 shadow-inner">
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
    "c4_success": {
        category: "c4",
        icon: "🧠",
        iconClass: "bg-indigo-100 text-indigo-600",
        title: "เจาะลึกสมองกล AI (Understanding Success Probability)",
        content: `
        <div class="space-y-5 text-sm text-gray-700 leading-relaxed antialiased touch-manipulation pb-safe">
            <p class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                ระบบ <b>AI Success Probability</b> (คะแนนโอกาสความสำเร็จ) เวอร์ชันล่าสุด ไม่ได้ประเมินแค่จาก "ตัวเลขในบัญชี" (Hard Data) อย่างเดียว แต่เป็น <b>Hybrid Co-Advisor Engine</b> ที่นำสถิติความมั่งคั่งมาหักลบกับ <b>"พฤติกรรมและวินัย (Soft Facts)"</b> ของลูกค้า เพื่อสะท้อนความจริงว่า <b>"ใครมีโอกาสเดินไปถึงเป้าหมายโดยที่เงินไม่หมดกลางทาง รวมถึงมีวินัยมากพอที่จะไม่ทำแผนพังเสียเอง"</b>
            </p>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg shadow-sm">
                <h4 class="font-bold text-blue-900 text-base mb-3 select-none">🎯 4 ปัจจัยหลักที่ AI ให้น้ำหนักสูงสุด (ในการให้และหักคะแนน)</h4>
                <ul class="list-none space-y-4">
                    <li>
                        <b>⏳ 1. พลังของเวลา (Time Horizon):</b> เวลาคือกันชนที่ดีที่สุด ยิ่งอายุน้อย หรือมีระยะเวลาลงทุนนาน AI จะบวกคะแนนฐานให้สูงมาก เพราะมีเวลาให้ "ดอกเบี้ยทบต้น" ทำงาน และมีเวลาแก้ตัวหากพอร์ตติดลบ
                        <div class="text-xs text-blue-700 mt-1 bg-blue-100/50 p-2 rounded">
                            <i>ตัวอย่าง: นาย ก. เริ่มลงทุนเดือนละ 5,000 บาท ตอนอายุ 25 ปี จะมีโอกาสสำเร็จสูงกว่า นาย ข. ที่ลงทุนเดือนละ 15,000 บาท แต่เพิ่งมาเริ่มตอนอายุ 45 ปี เนื่องจากระยะเวลาทบต้นต่างกันถึง 20 ปี</i>
                        </div>
                    </li>
                    <li>
                        <b>💵 2. กระแสเงินสดสุทธิ (Net Cash Flow):</b> ต่อให้มีสินทรัพย์ร้อยล้าน แต่ถ้ารายจ่ายสูงกว่ารายรับ (Cash flow ติดลบ) ระบบจะมองว่าเป็น "ระเบิดเวลา" ทันที
                        <div class="text-xs text-blue-700 mt-1 bg-blue-100/50 p-2 rounded">
                            <i>ตัวอย่าง: คนที่มีเงินเก็บ 10 ล้าน แต่เงินช็อตจนต้องถอนเงินเก็บมากินใช้ทุกเดือน AI จะประเมินว่าพังเร็วกว่า คนที่มีเงินเก็บ 1 แสน แต่มียอดเงินเหลือออม (Surplus) เข้าพอร์ตทุกเดือน</i>
                        </div>
                    </li>
                    <li>
                        <b>⚓ 3. ภาระหนี้สินอันตราย (Hard Cap Limit):</b> อัตราส่วนหนี้สิน (DTI) ที่สูงคือตัวบั่นทอนความมั่งคั่งที่รุนแรงที่สุด หากระบบตรวจพบ "หนี้สินอันตราย" หรือการกู้ยืมจนล้นพ้นตัว AI จะลงดาบ <b>กดเพดานคะแนนความสำเร็จไม่ให้เกิน 45% ทันที (Hard Cap)</b> ไม่ว่าสินทรัพย์รวมจะเยอะแค่ไหนก็ตาม
                        <div class="text-xs text-blue-700 mt-1 bg-blue-100/50 p-2 rounded">
                            <i>ตัวอย่าง: ลูกค้าพยายามเอาเงินไปลงทุนในหุ้นคาดหวังผลตอบแทน 8% แต่มีหนี้บัตรเครดิตที่เสียดอกเบี้ย 16% หมุนอยู่ AI จะกดคะแนนให้ตกทันที เพราะ "ดอกเบี้ยจ่าย" กำลังกัดกิน "ดอกเบี้ยรับ"</i>
                        </div>
                    </li>
                    <li>
                        <b>📉 4. พฤติกรรมและการตั้งเป้าหมาย (Behavioral Discounts):</b> คะแนนจะถูกหักลบ (Discount) ตามพฤติกรรมเสี่ยง เช่น ละเลยการวางแผนเกษียณ (-20%), ขาดสภาพคล่อง (-15%), หรือไม่มีประกันคุ้มครองความเสี่ยง (-10%)
                        <div class="text-xs text-blue-700 mt-1 bg-blue-100/50 p-2 rounded">
                            <i>ตัวอย่าง: ลูกค้ามีเงินเก็บเยอะ แต่บอกว่า "ยังไม่อยากวางแผนเกษียณ" AI จะหักคะแนนภาพรวมทิ้ง 20% ทันที เพราะถือว่ากำลังใช้ชีวิตบนความเสี่ยงในบั้นปลาย</i>
                        </div>
                    </li>
                </ul>
            </div>

            <h4 class="font-bold text-gray-800 text-base mt-6 mb-3 flex items-center gap-2 select-none"><span class="text-xl">🔍</span> กรณีศึกษา (Case Study): ความยืดหยุ่นที่ต่างกัน</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <!-- Case A -->
                <div class="bg-white p-5 rounded-xl border border-green-200 shadow-sm relative overflow-hidden flex flex-col h-full">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🌱</div>
                    <b class="text-green-700 text-base mb-1 block">เคส A: น้องวุฒิ (เด็กจบใหม่วัยสร้างตัว)</b>
                    <div class="text-xs text-gray-600 mb-3 border-b border-green-100 pb-3">
                        • รายได้: 12,000 บ./เดือน<br>
                        • ออมเงิน: 6,000 บ. (ออม 50%)<br>
                        • เป้าเกษียณ: 4,000 บ./เดือน | อายุ 24 ปี
                    </div>
                    <p class="text-gray-800 font-bold mb-1">✅ โอกาสสำเร็จ 99.9% (สูงกว่ามหาเศรษฐี)</p>
                    <p class="text-xs text-gray-600 mb-4 flex-grow"> 
                        <b>ทำไม AI ให้คะแนนสูง?:</b> แม้พอร์ตจะเล็ก แต่โครงสร้างสมบูรณ์แบบ (หนี้ 0%) มีเวลาหนุนหลังถึง 31 ปี เป้าหมายไม่เวอร์เกินตัว และไม่โดนหักคะแนนพฤติกรรมเสี่ยงเลย คณิตศาสตร์ประเมินว่าพอร์ตนี้ทนทานต่อวิกฤตได้สบายๆ
                    </p>
                    <div class="bg-green-50 p-3 rounded-lg border border-green-100 mt-auto">
                        <span class="text-[10px] font-bold text-green-700 uppercase block mb-1">🛠️ FA Action Plan (สิ่งที่คุณควรคุย):</span>
                        <span class="text-xs text-green-900 leading-tight block">"คะแนนคุณดีมากครับ แต่จุดอ่อนเดียวคือ 'ถ้าคุณป่วย' เงินออมจะหายวับทันที FA ควรแนะนำให้ปิดความเสี่ยงด้วยประกันสุขภาพ (Health) และกระตุ้นให้ตั้งเป้าหมายที่ท้าทายขึ้น เช่น (FIRE)"</span>
                    </div>
                </div>

                <!-- Case B -->
                <div class="bg-white p-5 rounded-xl border border-red-200 shadow-sm relative overflow-hidden flex flex-col h-full">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🏛️</div>
                    <b class="text-red-700 text-base mb-1 block">เคส B: คุณสุ (มหาเศรษฐี UHNW)</b>
                    <div class="text-xs text-gray-600 mb-3 border-b border-red-100 pb-3">
                        • รายรับ: 5.5 ลบ./เดือน | อายุ 54 ปี<br>
                        • ภาระหนี้ธุรกิจ (OD): 177 ล้านบาท<br>
                        • เป้าเกษียณ: 2.7 ลบ./เดือน (เหลือเวลา 1 ปี)
                    </div>
                    <p class="text-gray-800 font-bold mb-1">⚠️ โอกาสสำเร็จ 45.0% (โดน Hard Cap)</p>
                    <p class="text-xs text-gray-600 mb-4 flex-grow">
                        <b>ทำไม AI ให้คะแนนต่ำ?:</b> รวยสินทรัพย์ แต่กระแสเงินสดติดลบ และโดน AI กดเพดานความสำเร็จ (Hard Cap) ไว้ที่ 45% จาก "พฤติกรรมหนี้สินล้นพ้นตัว" โครงสร้างนี้เปราะบางมาก หากแบงก์ปรับดอกเบี้ยขึ้น ความมั่งคั่งจะถูกบังคับขายทันที
                    </p>
                    <div class="bg-red-50 p-3 rounded-lg border border-red-100 mt-auto">
                        <span class="text-[10px] font-bold text-red-700 uppercase block mb-1">🛠️ FA Action Plan (สิ่งที่คุณควรคุย):</span>
                        <span class="text-xs text-red-900 leading-tight block">"ความเสี่ยงของคุณสุไม่ได้อยู่ที่ความรวย แต่อยู่ที่ 'สภาพคล่อง' FA ควรเปลี่ยนบทสนทนาจากการลงทุน เป็น Debt Restructuring และเสนอ Whole Life เพื่อสร้างเงินสดปลอดภาษีไว้ปกป้องกงสี"</span>
                    </div>
                </div>
            </div>

            <h4 class="font-bold text-gray-800 text-base mt-8 mb-3 flex items-center gap-2 select-none"><span class="text-xl">🚀</span> ทำไมหลังปรับแผน (Proposed) คะแนนถึงพุ่งขึ้นสูงมาก?</h4>
            <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-200 shadow-sm mb-6">
                <p class="text-gray-800 text-sm mb-4 leading-relaxed">
                    ตัวเลขแผนใหม่ (เช่น 99.50%) ไม่ได้มาจากการเสกเงินในอุดมคติ แต่มาจากการทำงานของ <b>Hybrid Engine</b> ที่ยืนอยู่บน <b>"พื้นฐานความจริง"</b> ของลูกค้า โดยพิจารณา 2 ส่วนคือ:
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div class="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                        <b class="text-indigo-800 block mb-2 flex items-center gap-1"><span class="text-lg">📦</span> 1. การรีดประสิทธิภาพ (Hard Data)</b>
                        <span class="text-xs text-gray-600 leading-relaxed block">นำเงินต้นและกระแสเงินสดที่ลูกค้ามีอยู่จริง มาเคลียร์หนี้ทิ้ง ดันยอดออมให้ถึงเกณฑ์ (20%) และปรับพอร์ตลงทุนใหม่เพื่อเอาชนะเงินเฟ้อ</span>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                        <b class="text-indigo-800 block mb-2 flex items-center gap-1"><span class="text-lg">🧠</span> 2. ปลดล็อกพฤติกรรม (Soft Facts)</b>
                        <span class="text-xs text-gray-600 leading-relaxed block">คะแนนฝั่ง Proposed ตั้งสมมติฐานว่าลูกค้าได้แก้ไขนิสัยที่ถูก AI ทำโทษแล้ว (เช่น ซื้อประกันปิดความเสี่ยงแล้ว, เลิกใช้เงินเดือนชนเดือนแล้ว) คะแนนจึงเด้งกลับสู่ศักยภาพที่แท้จริง</span>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                    <b class="text-indigo-900 block mb-2 flex items-center gap-2">🗺️ เปรียบเทียบ AI กับ "Google Maps"</b>
                    <p class="text-xs text-gray-700 leading-relaxed">
                        การที่ระบบแสดงโอกาสสำเร็จสูงขึ้น สามารถอธิบายให้ลูกค้าฟังง่ายๆ ว่า:<br>
                        <i>"AI ประเมินแล้วว่า ถ้าพี่เปลี่ยนเส้นทางมาขึ้นทางด่วน (ปรับพอร์ต) เหยียบคันเร่งตามกำลังที่พี่มี (DCA) และเช็คลมยางปิดความเสี่ยงแล้ว (ปรับพฤติกรรม) รถคันนี้จะวิ่งถึงเป้าหมายเกษียณได้อย่างแน่นอนครับ"</i>
                    </p>
                </div>
            </div>

            <h4 class="font-bold text-gray-800 text-base mt-8 mb-3 flex items-center gap-2 select-none"><span class="text-xl">☠️</span> ทำไมบางเคสคะแนนถึงดิ่งลงอย่างหนัก (หรือต่ำติดดิน)?</h4>
            <div class="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm mb-6">
                <p class="text-gray-800 text-sm mb-4 leading-relaxed">
                    การที่คะแนนสุทธิ (Final Score) ออกมาต่ำมาก เป็นการสะท้อนความจริงทางคณิตศาสตร์และพฤติกรรมว่า <b>"หากใช้ชีวิตแบบเดิม ล้มละลายในบั้นปลายแน่นอน"</b> ซึ่งมักเกิดจาก:
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div class="bg-white p-4 rounded-lg border border-red-100 shadow-sm hover:shadow-md transition">
                        <b class="text-red-800 block mb-2 flex items-center gap-1 text-xs"><span class="text-base">💸</span> 1. เงินสดติดลบ</b>
                        <span class="text-[11px] text-gray-600 leading-relaxed block">รายจ่ายเกินรายรับ ระบบประเมินว่าต้อง "แคะกระปุก" เอาเงินเก็บมากินใช้ทุกเดือนจนล้มละลาย</span>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-red-100 shadow-sm hover:shadow-md transition">
                        <b class="text-red-800 block mb-2 flex items-center gap-1 text-xs"><span class="text-base">🏔️</span> 2. ฝันใหญ่เกินกระเป๋า</b>
                        <span class="text-[11px] text-gray-600 leading-relaxed block">เงินต้นน้อย แต่อยากใช้หลังเกษียณเยอะ พอเจอเงินเฟ้อทบเข้าไป เงินหมดภายในไม่กี่ปี</span>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-red-100 shadow-sm hover:shadow-md transition">
                        <b class="text-red-800 block mb-2 flex items-center gap-1 text-xs"><span class="text-base">⚓</span> 3. โดน Penalty ดึงรั้ง</b>
                        <span class="text-[11px] text-gray-600 leading-relaxed block">มีเงินเยอะแต่ไม่มีเป้าหมาย หรือขาดความคุ้มครอง AI จะหักคะแนนพฤติกรรม (Discount) รวดเดียว 10-40%</span>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <b class="text-red-900 block mb-2 flex items-center gap-2 text-sm">💡 วิธีแก้เกมสำหรับ FA</b>
                    <p class="text-xs text-gray-700 leading-relaxed">
                        คะแนนดิ่งทะลุเหว คือโอกาสทองในการชี้ <b>Pain Point</b>! ให้ชี้ให้ลูกค้าเห็นว่า <i>"พฤติกรรมใดที่ฉุดรั้งคะแนนอยู่"</i> จากนั้นใช้แถบสไลเดอร์ <b>What-If</b> ลองลดยอดใช้จ่าย เลื่อนอายุเกษียณ หรือลดหนี้ให้ลูกค้าดู ตัวเลขจะพลิกฟื้นขึ้นมาทันที!
                    </p>
                </div>
            </div>
        </div>`
    },
    // ==========================================
    // 🧠 ส่วนที่ X: คู่มือเจาะลึก AiDAPC V5.6 Ultimate -> category: "c_aidapc"
    // ==========================================
    "c_aidapc_manual": {
        category: "c_aidapc",
        icon: "🧠",
        iconClass: "bg-indigo-100 text-indigo-600",
        title: "คู่มือเจาะลึก AiDAPC V5.6 (AI Diagnostics & Sandbox)",
        content: `
            <div class="text-sm text-gray-700 leading-relaxed space-y-6 pl-0 antialiased">
                
                <div class="bg-gradient-to-r from-slate-900 to-indigo-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">⚙️</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10 text-indigo-300">AiDAPC: Executive AI Diagnostics V5.6</h3>
                    <p class="text-gray-300 relative z-10">
                        <b>จุดประสงค์:</b> เปลี่ยนระบบ AI จากที่เป็นเพียง "กล่องดำ (Black-box)" ให้กลายเป็น "ผู้ช่วยคิดเชิงกลยุทธ์แบบโปร่งใส (White-box Co-Pilot)" 
                        เวอร์ชันล่าสุดนี้ทำงานบนฐานข้อมูลที่มีโครงสร้างชัดเจน (Structured Data) ทำให้ประเมินพฤติกรรมแบบ 9 มิติ (9D) ได้แม่นยำ พร้อมเพิ่มระบบ <b>FA Interactive Sandbox</b> ที่ให้ FA จำลองพอร์ตโฟลิโอและวิเคราะห์ความคุ้มค่า (Cost/Benefit) ได้แบบเรียลไทม์
                    </p>
                </div>

                <div>
                    <h4 class="font-bold text-lg text-indigo-800 border-b-2 border-indigo-100 pb-2 mb-4 flex items-center gap-2">
                        <span class="text-2xl">🔄</span> กระบวนการทำงาน (12 Enterprise Modules)
                    </h4>
                    <div class="space-y-4">
                        
                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">1</div>
                            <h5 class="font-bold text-blue-700 mb-1">Full Data Ingestion (แปลงและดึงข้อมูล 100%)</h5>
                            <p class="text-xs text-gray-600">ระบบจะสกัดข้อมูลจาก <b>หมวดหมู่ (Dropdown)</b> ที่ FA จัดกลุ่มไว้แล้วโดยตรง ทำให้จำแนก "สินทรัพย์สภาพคล่อง" และ "หนี้เสีย" ได้แม่นยำ 100% พร้อมแปลงชื่อตัวแปร AI เป็นคำนิยามภาษาไทยให้ FA อ่านเข้าใจทันที</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-xs">2</div>
                            <h5 class="font-bold text-pink-700 mb-1">NLP Sentiment Analysis (ถอดรหัสความกังวลอัจฉริยะ)</h5>
                            <p class="text-xs text-gray-600">วิเคราะห์ข้อความบันทึกย่อ (FA Notes) ด้วยระบบ <b>Negation Handling (เข้าใจบริบทการปฏิเสธ เช่น "ไม่กังวล")</b> เพื่อประเมินคะแนน Financial Anxiety ที่แท้จริง ไม่ตื่นตูมไปกับคีย์เวิร์ดหลอก</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold text-xs">3</div>
                            <h5 class="font-bold text-teal-700 mb-1">Outlier & Confidence (เช็คความสมเหตุสมผล)</h5>
                            <p class="text-xs text-gray-600">ตรวจสอบความขัดแย้งของข้อมูลแบบเรียลไทม์ (เช่น รายได้สูงแต่ทรัพย์สินต่ำ ชี้เป้าหนี้แฝง หรือ สภาพคล่องติดลบ) เพื่อป้องกันไม่ให้ FA นำผลลัพธ์ที่ผิดพลาดไปนำเสนอลูกค้า</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">4</div>
                            <h5 class="font-bold text-purple-700 mb-1">Deep Learning Core (วิเคราะห์ศักยภาพแบบไดนามิก)</h5>
                            <p class="text-xs text-gray-600">คำนวณคะแนนดิบผ่านฟังก์ชัน Sigmoid โดยประเมิน <b>ความมั่งคั่งสุทธิ (Net Worth)</b> แบบแยกทิศทาง หากมีค่าเป็นบวก (มีทรัพย์สิน) จะหนุนคะแนนขึ้น แต่หาก <b>ติดลบ (หนี้ท่วม)</b> จะถูกจับเป็นปัจจัยฉุดรั้ง (Negative Factor) ทันที</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center font-bold text-xs">5</div>
                            <h5 class="font-bold text-cyan-700 mb-1">XAI Feature Drivers (แกะกล่องดำ AI)</h5>
                            <p class="text-xs text-gray-600">ระบบจะแกว่งค่าตัวแปร (Perturbation Rate 10%) เพื่อหาว่าปัจจัยใดเป็น <b>"จุดแข็ง"</b> และ <b>"จุดอ่อน"</b> พร้อมอธิบายเป็นภาษาไทยตามหลักการเงิน เพื่อชี้เป้าให้ FA นำไปคุยต่อได้ทันที</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold text-xs">6</div>
                            <h5 class="font-bold text-amber-700 mb-1">Counterfactual Path (จำลองทางเลือก 3 มิติ)</h5>
                            <p class="text-xs text-gray-600">AI จำลองทางเลือกให้ลูกค้าเห็นภาพ: <b>ทางรุก (Positive)</b> เช่น การรวบหนี้/DCA, <b>ทางสายกลาง (Neutral)</b> เช่น เลื่อนเวลาเป้าหมายออกไป และ <b>ทางเสี่ยง (Negative)</b> หากก่อหนี้เพิ่ม</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">7</div>
                            <h5 class="font-bold text-orange-700 mb-1">3D Risk Gap & Product Mapping (จัดพอร์ตสินค้าอัตโนมัติ)</h5>
                            <p class="text-xs text-gray-600">คำนวณส่วนขาด 3 มิติ (ใช้ Asset สภาพคล่องของจริง) และจับคู่ <b>AIA Product Matrix</b> เชิงกลยุทธ์ พร้อมคำนวณเป้าหมายเบี้ยประกันเบื้องต้น และอธิบาย <b>Trade-off Analysis</b> สำหรับแผนนั้นๆ</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs">8</div>
                            <h5 class="font-bold text-emerald-700 mb-1">9D Persona Clustering (จัดอัตลักษณ์ลูกค้า 9 มิติ)</h5>
                            <p class="text-xs text-gray-600">ผสานมิติพฤติกรรม (Risk, Recency, Frequency, Discipline) เข้ากับมิติการเงิน รวม 9 แกน ผ่าน <b>Spider Chart</b> (เส้นสีเขียว = ลูกค้า, เส้นประสีเทา = ค่าเฉลี่ยกลุ่ม) เพื่อให้ FA รู้ลึกถึงพฤติกรรมทางการเงิน</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xs">9</div>
                            <h5 class="font-bold text-red-700 mb-1">Predictive Lapse Risk (วิเคราะห์อัตราความคงอยู่)</h5>
                            <p class="text-xs text-gray-600">ประเมินความเสี่ยงทิ้งกรมธรรม์ (Churn Rate) เจาะลึกคุณภาพหนี้สิน (Good Debt vs Toxic Debt) เพื่อเตือน FA ให้ระวังการจัดเบี้ยประกันที่หนักเกินไปจนลูกค้าส่งไม่ไหว</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">10</div>
                            <h5 class="font-bold text-indigo-700 mb-1">Hybrid Consensus (ปรับจูนคะแนนโลกความจริง)</h5>
                            <p class="text-xs text-gray-600">นำคะแนน ML มาหักลบด้วยกฎผู้เชี่ยวชาญ (เช่น หนี้สินวิกฤต หรือกระแสเงินสดติดลบ) ออกมาเป็น <b>Final Adjusted Score</b> เพื่อเป็นเครื่องเตือนสติ (Reality Check) ให้สะท้อนโลกความเป็นจริงมากที่สุด</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pl-12">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-fuchsia-100 text-fuchsia-600 rounded-full flex items-center justify-center font-bold text-xs">11</div>
                            <h5 class="font-bold text-fuchsia-700 mb-1">Executive AI Synthesis (บทสรุปกลยุทธ์ FA)</h5>
                            <p class="text-xs text-gray-600">รวบรวมข้อมูลทั้งหมดมาเขียนสรุปด้วยโทนภาษาแบบ Consultative Selling ชี้เป้าว่า "เคสนี้ควรเข้าพบด้วยกลยุทธ์ไหน และควรระวังความเสี่ยงใดเป็นพิเศษ"</p>
                        </div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-cyan-300 relative pl-12 bg-cyan-50">
                            <div class="absolute left-4 top-4 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xs">12</div>
                            <h5 class="font-bold text-cyan-700 mb-1">FA Interactive Sandbox (จำลองผลกระทบแบบ What-If) <span class="bg-cyan-200 text-cyan-800 text-[10px] px-2 py-0.5 rounded ml-2">NEW</span></h5>
                            <p class="text-xs text-gray-700">ฟีเจอร์ระดับสูงให้ FA เป็นคน <b>เลือกสัญญาหลัก + สัญญาเพิ่มเติม และระบุเบี้ยประกันเอง</b> เพื่อดูผลกระทบแบบเรียลไทม์ AI จะวิเคราะห์สัดส่วน <b>Premium to Income Ratio (PIR)</b>, การปิด Risk Gap และจัดทำ <b>Cost/Benefit & Trade-off Analysis Report</b> พร้อมสคริปต์พูดคุยเพื่อปิดการขาย</p>
                        </div>

                    </div>
                </div>

                <div class="bg-emerald-50 border border-emerald-200 p-5 rounded-xl mt-6">
                    <h4 class="font-bold text-emerald-800 mb-2 flex items-center gap-2"><span class="text-xl">📊</span> ผลลัพธ์ที่ได้จาก AiDAPC V5.6</h4>
                    <ul class="list-disc pl-5 text-sm text-emerald-700 space-y-2">
                        <li><b>100% Absolute Accuracy:</b> จำแนกข้อมูลเชิงโครงสร้างแม่นยำ และแยกการประเมินเบี้ยประกันออกจาก DTI (เพราะประกันไม่ใช่หนี้สิน)</li>
                        <li><b>Interactive FA Control:</b> FA ควบคุมการจัดพอร์ตเองได้ 100% (Sandbox) ระบบเพียงทำหน้าที่เป็น "กระจกสะท้อน" (Mirror) ความเสี่ยงและความคุ้มค่า</li>
                        <li><b>Executive Readiness & Objection Handling:</b> มีบทวิเคราะห์ <i>Trade-off</i> พร้อม <i>FA Talking Points</i> ช่วยให้ FA รับมือข้อโต้แย้งเรื่องเบี้ยประกันได้อย่างเฉียบขาด</li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-bold text-lg text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 mt-8 flex items-center gap-2">
                        <span class="text-2xl">🗣️</span> ไกด์การสื่อสารจากโมดูล Sandbox (How to Talk)
                    </h4>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h5 class="font-bold text-emerald-600 text-sm mb-2">เมื่อแผนมีความคุ้มค่าสูง (Optimal Cost/Benefit)</h5>
                            <p class="text-xs text-gray-600 mb-3"><b>เป้าหมาย:</b> ชี้ให้เห็นถึงความได้เปรียบของการโอนความเสี่ยง</p>
                            <div class="bg-white p-3 rounded border border-gray-100 text-xs italic text-gray-700">
                                "แผนที่เราจัดสรรนี้ ใช้เงินเพียงส่วนน้อยจากรายได้ต่อปี เพื่อโอนย้ายความเสี่ยงก้อนใหญ่ไปให้บริษัทประกันรับผิดชอบแทนครับ มูลค่าความคุ้มครองที่ได้ สามารถปกป้องความมั่งคั่งที่คุณลูกค้าสร้างมาทั้งชีวิต ไม่ให้ถูกบังคับขายเพื่อนำมาจ่ายค่ารักษาพยาบาลครับ"
                            </div>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h5 class="font-bold text-cyan-600 text-sm mb-2">เมื่อแนะนำแผนเพื่อการลงทุน (Wealth Building)</h5>
                            <p class="text-xs text-gray-600 mb-3"><b>เป้าหมาย:</b> เน้นวินัยและโอกาสในอนาคต</p>
                            <div class="bg-white p-3 rounded border border-gray-100 text-xs italic text-gray-700">
                                "การเจียดสภาพคล่องปัจจุบันเพื่อแลกกับโอกาสรับผลตอบแทนในอนาคต คือเส้นทางสู่ความมั่งคั่งครับ ถ้าระบบของเราเช็คแล้วว่า Cashflow ปลอดภัย เรามาเริ่มต้นสร้างกองทุนเกษียณอายุนี้ด้วยการ DCA ไปด้วยกันเลยนะครับ"
                            </div>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h5 class="font-bold text-orange-600 text-sm mb-2">เมื่อตอบข้อโต้แย้ง "เบี้ยแพงไป" (Objection)</h5>
                            <p class="text-xs text-gray-600 mb-3"><b>เป้าหมาย:</b> เปลี่ยนมุมมองจาก "รายจ่าย" เป็น "การซื้อเวลา"</p>
                            <div class="bg-white p-3 rounded border border-gray-100 text-xs italic text-gray-700">
                                "ผมเข้าใจครับว่าเบี้ยก้อนนี้อาจดูเหมือนรายจ่ายที่เพิ่มขึ้น แต่ในมุมมองการเงิน แท้จริงแล้วมันคือการ <b>'ซื้อเวลาและอิสรภาพ'</b> ให้กับครอบครัวครับ การเสียเบี้ยคงที่หลักหมื่นในวันนี้ ดีกว่าปล่อยให้ความเสี่ยงหลักล้านกัดกินเงินเก็บทั้งหมดในอนาคตครับ"
                            </div>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h5 class="font-bold text-red-600 text-sm mb-2">เมื่อแผนเสี่ยงเกินไป (High Premium Burden)</h5>
                            <p class="text-xs text-gray-600 mb-3"><b>เป้าหมาย:</b> แสดงความจริงใจ และปรับสัดส่วนเพื่อรักษาลูกค้า</p>
                            <div class="bg-white p-3 rounded border border-gray-100 text-xs italic text-gray-700">
                                "ระบบวิเคราะห์พบว่าเบี้ยประกันรวมเริ่มสูงเกินเกณฑ์มาตรฐาน ซึ่งอาจกดดันสภาพคล่องของคุณลูกค้าในระยะยาวได้ เพื่อไม่ให้เป็นภาระ ผมขออนุญาตปรับลดความคุ้มครองบางส่วนลง เพื่อให้อยู่ในโซนปลอดภัยที่คุณลูกค้าส่งไหวแน่นอนดีกว่าครับ"
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        `
    },
    // ==========================================
    // 👑 กรณีศึกษาเชิงกลยุทธ์: คุณนนท์ (UHNW Legacy & Preservation) -> category: "c5"
    // ==========================================
    "c5_case_non_uhnw": {
        category: "c5",
        icon: "🏰",
        iconClass: "bg-amber-100 text-amber-700",
        title: "บทเรียนการนำเสนอ: คุณนนท์ (VVIP Wealth Architect)",
        content: `
        <div class="antialiased touch-manipulation pb-safe space-y-8 text-sm text-gray-700 leading-relaxed">
            
            <section>
                <div class="bg-gradient-to-r from-amber-700 to-yellow-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden mb-6">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🏰</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10 text-amber-200">การวิเคราะห์กลุ่ม VVIP: ปกป้องความมั่งคั่ง (Wealth Preservation)</h3>
                    <p class="text-gray-200 text-sm relative z-10 leading-relaxed">
                        <b>วิเคราะห์โปรไฟล์:</b> คุณนนท์ อายุ 68 ปี อาชีพเศรษฐีที่ดิน สถานะเกษียณตอนต้น (Active Retiree) กลุ่ม UHNW_Elite ไม่มีผู้อุปการะ <b>ไร้หนี้สิน (Debt-Free)</b> มีสวัสดิการระดับผู้บริหาร และมีพฤติกรรมวางแผนเก็บเงินจนครบเป้าหมายแล้วใช้ชีวิต<br>
                        <b>โจทย์ของ FA:</b> ลูกค้ากลุ่มนี้ "ไม่กลัวไม่มีกิน" มีทรัพย์สินกว่า 1 พันล้านบาท แต่ลึกๆ แล้วมีความเสี่ยงซ่อนอยู่จาก "ค่ารักษาพยาบาลที่โตเร็วกว่าพอร์ต" และ "กับดักไลฟ์สไตล์" การพูดคุยจึงต้องเน้นเรื่อง <b>การอุดรอยรั่ว</b> และ <b>การส่งต่อมรดกอย่างสมบูรณ์</b> ไม่ใช่การขายเพื่อหวังผลตอบแทนสูง
                    </p>
                </div>

                <h4 class="font-bold text-lg text-amber-800 border-b-2 border-amber-100 pb-2 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📝</span> 1. การสรุปข้อมูลภาพรวม (Client Profile Recap)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-amber-700 block mb-2 underline">ข้อมูลเชิงปริมาณ (Quantitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>งบดุล (Balance Sheet):</b> ทรัพย์สินรวม 1,023,850,000.00 บาท (ที่ดิน 800M, บ้าน 120M) | หนี้สิน 0.00 บาท <br><span class="text-emerald-600 font-bold">(ความมั่งคั่งสุทธิ: 1,023,850,000.00 บาท)</span></li>
                            <li>• <b>งบกระแสเงินสด (Cash Flow):</b> รายรับจากสินทรัพย์ 3,366,000.00 บ./เดือน | รายจ่ายรวม 1,402,000.00 บ./เดือน <br><span class="text-emerald-600 font-bold">(กระแสเงินสดคงเหลือ: +1,964,000.00 บ./เดือน)</span></li>
                            <li>• <b>พอร์ตการลงทุนปัจจุบัน (100 ลบ.):</b> เงินฝาก/ตลาดเงิน 15M, ตราสารหนี้ 25M, กองทุนผสม 15M, หุ้นไทย 10M, หุ้นโลก 20M, คริปโต 15M</li>
                            <li>• <b>พอร์ตกรมธรรม์ปัจจุบัน:</b> ไม่มีข้อมูล (Underinsured)</li>
                            <li>• <b>เป้าหมายการเงิน (SMART Goals):</b> <br>
                                - ส่งมอบมรดก 100,000,000 บ. (อีก 17 ปี)<br>
                                - ใช้ชีวิตหลังเกษียณ 1,386,000 บ./เดือน
                            </li>
                            <li>• <b>อัตราส่วนสำคัญ:</b> ภาระหนี้ 0.0% | สภาพคล่อง 71.3 เดือน</li>
                            <li>• <b>คะแนนความสำเร็จ AI:</b> ปัจจุบัน 77.5% ➡️ Proposed 86.8% <span class="text-emerald-500 font-bold">(เพิ่มขึ้น +9.3%)</span></li>
                        </ul>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-amber-700 block mb-2 underline">ข้อมูลเชิงคุณภาพ (Qualitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>สถานะ:</b> วัยเกษียณสำราญ (Active Retiree) อายุ 68 ปี</li>
                            <li>• <b>อาชีพ:</b> เศรษฐีที่ดิน (UHNW_Elite) ไม่มีภาระผู้อุปการะ</li>
                            <li>• <b>สวัสดิการ:</b> มีสวัสดิการระดับผู้บริหาร</li>
                            <li>• <b>พฤติกรรม:</b> วางแผนเป้าหมายสำเร็จแล้วใช้ชีวิต ไม่มีหนี้สินเลย แต่ใช้จ่ายระดับ VVIP (Lifestyle Creep)</li>
                            <li>• <b>ระดับความเสี่ยง:</b> ยอมรับความเสี่ยงได้ปานกลางค่อนข้างต่ำ (Moderate Conservative) คาดหวังผลตอบแทนพอร์ตที่ 7.65%</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">🔍</span> 2. การวิเคราะห์จุดแข็งและจุดเปราะบาง (Fact Finding & Pain Point)
                </h4>
                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div class="flex gap-4">
                        <div class="shrink-0 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">✓</div>
                        <div>
                            <b class="text-emerald-800">จุดแข็ง (AI Reality Check):</b> 
                            <p class="mt-1">สภาพคล่องมหาศาล (เงินฝากกว่า 100 ล้านบาท) และไร้หนี้สิน (Debt-Free) อัตราความอยู่รอดและความมั่งคั่งสูงกว่าเกณฑ์มาตรฐานมาก ทำให้มีอำนาจในการเลือก Solution ที่ดีที่สุดในตลาดได้ทันทีโดยไม่ต้องกังวลเรื่องงบประมาณ</p>
                        </div>
                    </div>
                    <div class="flex gap-4 border-t border-slate-200 pt-4">
                        <div class="shrink-0 w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">!</div>
                        <div>
                            <b class="text-rose-800">Pain Point (จุดเปราะบางแบบซ่อนเร้น):</b> 
                            <p class="mt-1">1. <b>Lifestyle Creep:</b> รายจ่ายไลฟ์สไตล์ต่อเดือนสูงเกือบ 1.4 ล้านบาท (หรือปีละ 16.6 ล้านบาท) หากพอร์ตลงทุนเจอมรสุมตลาดขาลง จะเกิดภาวะเงินต้นยุบตัวเร็วเกินคาด</p>
                            <p class="mt-1">2. <b>Medical Inflation Trap (เงินเฟ้อค่ารักษา):</b> อัตราเงินเฟ้อทางการแพทย์สูงถึง 8.85% ในขณะที่ผลตอบแทนพอร์ตที่ลูกค้าคาดหวังคือ 7.65% แปลว่าพอร์ตกำลัง "แพ้ค่ารักษาพยาบาล" และระบบตรวจพบ Health Gap สูงถึง 18.97 ล้านบาท</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-indigo-800 border-b-2 border-indigo-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">💡</span> 3. การนำเสนอทางออก (Strategic Solution)
                </h4>
                <div class="space-y-4">
                    <p class="italic text-gray-600">"การขายลูกค้าระดับพันล้าน ไม่ใช่การขายเพื่อความมั่งคั่ง แต่คือการขาย **System** เพื่อปกป้องกงสี"</p>
                    <div class="bg-indigo-900 text-indigo-50 p-5 rounded-2xl shadow-xl">
                        <b class="text-amber-400 block mb-3">💬 สคริปต์การนำเสนอเชิงกลยุทธ์:</b>
                        <p class="text-sm leading-relaxed">
                            "พี่นนท์ครับ จากคะแนน AI 77.49% ระบบตรวจพบว่าพอร์ตพันล้านของพี่แข็งแกร่งมาก มีกระแสเงินสดบวกถึงเกือบ 2 ล้านต่อเดือน... แต่มีรอยรั่วเดียวที่ AI เตือนไว้คือ <b>'เงินเฟ้อค่ารักษาพยาบาล (8.85%)'</b> ที่โตเร็วกว่ากำไรของพอร์ต (7.65%) ครับ<br><br>
                            ผมไม่ได้มาเสนอให้พี่จ่ายเบี้ยประกันเพิ่มเพื่อความคุ้มครองทั่วไป แต่ผมขอเสนอ <b>'Wealth Transfer System'</b> ครับ เราจะโยกกระแสเงินสดส่วนเกินเพียงเสี้ยวเดียวของพอร์ต มาจัดสรรเข้าแผน <b>AIA Infinite Care (วงเงิน 60 ล้านบาท)</b> หรือ <b>AIA Health Happy (25 ล้านบาท)</b> ซึ่งเบี้ยเฉลี่ยเพียงแสนปลายๆ ต่อปีเท่านั้น...<br><br>
                            วิธีนี้คือการสร้าง 'กำแพง' กั้นพอร์ตหลักไว้ครับ ไม่ว่าในอนาคตค่าหมอจะพุ่งไปเท่าไหร่ พี่จะไม่ต้องแตะเงินต้น 100 ล้านในพอร์ตเลยแม้แต่บาทเดียว เงินก้อนนี้จะยังสามารถทำงานเพื่อส่งมอบเป็นมรดก 100 ล้านให้ลูกหลานได้ครบถ้วน 100% ตามเป้าหมายครับ"
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-emerald-800 border-b-2 border-emerald-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">⚖️</span> 4. การประเมินความคุ้มค่า (Trade-off vs Risk)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                        <b class="text-emerald-800 block mb-2">➕ ผลกระทบเชิงบวก (The Leap)</b>
                        <p class="text-xs">โอกาสสำเร็จพุ่งขึ้น <b>+9.3%</b> (สู่ระดับ 86.8%) ทันทีที่ทำสัญญา เพราะความเสี่ยงก้อนใหญ่ที่สุด (Health Risk กว่า 18.9 ล้านบาท) ถูกโอนย้าย (Transfer) ไปยังบริษัทประกันเรียบร้อยแล้ว พอร์ตเกษียณจะกลับมามีเสถียรภาพสูงสุด</p>
                    </div>
                    <div class="bg-rose-50 p-5 rounded-2xl border border-rose-200">
                        <b class="text-rose-800 block mb-2">➖ ผลกระทบเชิงลบ & ความเสี่ยง (The Cost)</b>
                        <p class="text-xs"><b>Opportunity Cost:</b> เงินค่าเบี้ยประกันจะสูญเสียโอกาสในการนำไปลงทุนสร้างผลตอบแทนในตลาดหุ้น (แต่สำหรับกลุ่ม UHNW ต้นทุนนี้แทบไม่มีผลกระทบต่อ Cash Flow)<br>
                        <b>Risk Scenario:</b> หากพี่นนท์เลือก 'เสี่ยงเอง' (Self-Insured) โดยไม่ทำแผนนี้ ความเสี่ยงคือหากป่วยด้วยโรคร้ายแรง อาจจะต้องบังคับขาย (Forced Sale) สินทรัพย์หรือที่ดินในจังหวะ 'ตลาดขาลง' ซึ่งจะทำให้มูลค่าพอร์ตเสียหายรุนแรงกว่าค่าเบี้ยหลายสิบเท่า</p>
                    </div>
                </div>
            </section>

            <div class="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden mt-6">
                <div class="absolute right-0 bottom-0 opacity-10 text-9xl">🎯</div>
                <h5 class="text-amber-400 font-bold mb-2">5. Final Conclusion for FA:</h5>
                <p class="text-xs text-slate-300 leading-relaxed">
                    เป้าหมายของเคสลูกค้าระดับพันล้าน (UHNW) คือ <b>"Certainty (ความแน่นอน)"</b> ไม่ใช่ "High Return"<br>
                    ด้วยตัวเลขความเสี่ยงทิ้งกรมธรรม์ (Lapse Risk) ที่ต่ำเพียง 1.1% ลูกค้ามีกำลังจ่ายสบายๆ จงเน้นย้ำให้ลูกค้าเห็นภาพว่า <b>"การจ่ายเบี้ยประกัน คือการซื้อความสงบทางใจและปกป้องกงสี"</b> เพื่อให้เขาสามารถใช้ชีวิตแบบ Active Retiree (เดือนละ 1.38 ล้าน) ได้อย่างสง่างาม โดยไม่ต้องกังวลว่าค่ารักษาพยาบาลจะมากัดกินความมั่งคั่งที่จะส่งต่อให้ทายาทครับ
                </p>
            </div>
        </div>
        `
    },
    // ==========================================
    // 💍 กรณีศึกษาเชิงกลยุทธ์: คุณภัทร (Young Gen & Goal Protection) -> category: "c5"
    // ==========================================
    "c5_case_pat_civil": {
        category: "c5",
        icon: "🏠",
        iconClass: "bg-blue-100 text-blue-700",
        title: "Case Study: คุณภัทร (วัย 29 ปี) - ข้าราชการ/เพิ่งแต่งงาน (Wealth Optimization & Protection)",
        content: `
        <div class="antialiased touch-manipulation pb-safe space-y-8 text-sm text-gray-700 leading-relaxed">
            
            <section>
                <div class="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden mb-6">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">💍</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10 text-blue-200">การวิเคราะห์กลุ่ม Young Gen (Civil Servant): ต่อยอดและปกป้องเป้าหมาย (Wealth Optimization)</h3>
                    <p class="text-gray-200 text-sm relative z-10 leading-relaxed">
                        <b>วิเคราะห์โปรไฟล์:</b> คุณภัทร อายุ 29 ปี อาชีพข้าราชการ มีสวัสดิการรัฐครอบคลุมค่ารักษาพยาบาล <b>ไม่มีภาระหนี้สิน (Debt-Free)</b> มีวินัยการเงินดีเยี่ยม (รูดบัตรจ่ายเต็มจำนวนและหักออมสม่ำเสมอ)<br>
                        <b>โจทย์ของ FA:</b> ลูกค้าได้คะแนน AI สูงถึง 87.83% และมีสวัสดิการรักษาพยาบาลฟรี รวมถึงมีประกันโรคร้ายแรงเดิมอยู่แล้ว การขายด้วย "ความกลัว (Fear)" จะไม่ทำงาน FA ต้องเปลี่ยนมาใช้ "ความรักและความก้าวหน้า (Love & Growth)" โดยโฟกัสไปที่ <b>การเตรียมความพร้อมซื้อบ้าน</b> และ <b>การปิดความเสี่ยงมรดกหนี้</b>
                    </p>
                </div>

                <h4 class="font-bold text-lg text-blue-800 border-b-2 border-blue-100 pb-2 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📝</span> 1. การสรุปข้อมูลภาพรวม (Client Profile Recap)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-blue-700 block mb-2 underline">ข้อมูลเชิงปริมาณ (Quantitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>งบดุล (Balance Sheet):</b> ทรัพย์สินรวม 521,000.00 บาท | หนี้สินรวม 0.00 บาท <br><span class="text-emerald-600 font-bold">(ความมั่งคั่งสุทธิ: 521,000.00 บาท)</span></li>
                            <li>• <b>งบกระแสเงินสด (Cash Flow):</b> รายรับ 28,000.00 บ./เดือน | รายจ่ายรวม 22,812.50 บ./เดือน <br><span class="text-emerald-600 font-bold">(กระแสเงินสดคงเหลือ: +5,187.50 บ./เดือน)</span></li>
                            <li>• <b>พอร์ตการลงทุนปัจจุบัน:</b> กบข./กองทุนสำรองเลี้ยงชีพ 200,000 บาท | เงินฝากออมทรัพย์ 321,000 บาท</li>
                            <li>• <b>พอร์ตกรมธรรม์ปัจจุบัน:</b> AIA 20 Pay Life (ทุน 300,000 บ.) | AIA CI Plus (ทุน 1,000,000 บ.)</li>
                            <li>• <b>เป้าหมายการเงิน (SMART Goals):</b> <br>
                                - ดาวน์บ้าน / ซื้อที่อยู่อาศัย 500,000 บ. (อีก 2 ปี)<br>
                                - ทุนเกษียณอายุ 60 ปี ต้องการใช้เงิน 20,000 บ./เดือน
                            </li>
                            <li>• <b>อัตราส่วนสำคัญ:</b> ภาระหนี้ 0.0% | อัตราการออม 27.90% | สภาพคล่อง 14.1 เดือน</li>
                            <li>• <b>คะแนนความสำเร็จ AI:</b> ปัจจุบัน 87.83% ➡️ Proposed 87.95%</li>
                        </ul>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-blue-700 block mb-2 underline">ข้อมูลเชิงคุณภาพ (Qualitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>สถานะ:</b> เพิ่งแต่งงาน / เตรียมซื้อบ้าน</li>
                            <li>• <b>อาชีพ:</b> ข้าราชการ/พนักงานราชการ ระดับต้น (รายได้มั่นคงสูง) วัย 29 ปี</li>
                            <li>• <b>สวัสดิการ:</b> สิทธิข้าราชการ/รัฐวิสาหกิจ (ครอบคลุมค่ารักษาพยาบาล)</li>
                            <li>• <b>พฤติกรรมหนี้:</b> พฤติกรรมมาตรฐาน ใช้บัตรเครดิตแล้วจ่ายคืนเต็มจำนวนได้ทุกครั้ง (ไม่มีหนี้เสีย) มีวินัยออมเงินปานกลาง-สูง</li>
                            <li>• <b>ระดับความเสี่ยง:</b> เสี่ยงปานกลางค่อนข้างต่ำ (Moderate Conservative) คาดหวังผลตอบแทน 4.88%</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">🔍</span> 2. การวิเคราะห์จุดแข็งและจุดเปราะบาง (Fact Finding & Pain Point)
                </h4>
                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div class="flex gap-4">
                        <div class="shrink-0 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">✓</div>
                        <div>
                            <b class="text-emerald-800">จุดแข็ง (AI Reality Check):</b> 
                            <p class="mt-1">ฐานะการเงินและพฤติกรรมแข็งแกร่งมาก มีเวลา (Time Horizon อีก 31 ปี) เป็นอาวุธหลัก ไม่มีหนี้สินเลย มีสภาพคล่องสำรองล้นเหลือถึง 14.1 เดือน และมีสิทธิข้าราชการดูแลค่ารักษา ทำให้คะแนน AI พุ่งสูงเกือบ 90%</p>
                        </div>
                    </div>
                    <div class="flex gap-4 border-t border-slate-200 pt-4">
                        <div class="shrink-0 w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">!</div>
                        <div>
                            <b class="text-rose-800">Pain Point (จุดเปราะบางแบบซ่อนเร้น):</b> 
                            <p class="mt-1">1. <b>New Debt Creation (หนี้ก้อนใหม่ที่กำลังจะเกิด):</b> การเตรียมตัวซื้อบ้านแปลว่ากำลังจะสร้าง <b>"หนี้ระยะยาวก้อนใหญ่ที่สุดในชีวิต"</b> ในขณะที่ลูกค้าขาดความคุ้มครองด้านชีวิต (Life Gap 1.76 ล้านบาท) หากคนผ่อนเป็นอะไรไป บ้านจะถูกธนาคารยึดและกลายเป็นภาระของคู่ชีวิตทันที</p>
                            <p class="mt-1">2. <b>Asset Allocation Inefficiency:</b> เงินเก็บส่วนใหญ่ไปกระจุกตัวอยู่ในสินทรัพย์สภาพคล่อง (เงินฝาก 321,000 บาท) มากเกินไป ทำให้ผลตอบแทนรวมอาจเติบโตช้าและแพ้เงินเฟ้อในระยะยาว</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-indigo-800 border-b-2 border-indigo-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">💡</span> 3. การนำเสนอทางออก (Strategic Solution)
                </h4>
                <div class="space-y-4">
                    <p class="italic text-gray-600">"เมื่อลูกค้ามีคะแนน 87% แล้ว FA ห้ามขายความกลัวเรื่องเกษียณ หรือยัดเยียดประกันสุขภาพซ้ำซ้อน แต่ต้องขาย <b>การปกป้องความฝันและจัดพอร์ตลงทุน</b>"</p>
                    <div class="bg-indigo-900 text-indigo-50 p-5 rounded-2xl shadow-xl">
                        <b class="text-blue-300 block mb-3">💬 สคริปต์การนำเสนอ (Mortgage Protection & Asset Allocation):</b>
                        <p class="text-sm leading-relaxed">
                            "คุณภัทรครับ จากรายงาน AI เราพบว่าคะแนนความสำเร็จของคุณภัทรสูงถึง <b>87.83%</b> ซึ่งยอดเยี่ยมมากครับ สภาพคล่องเยี่ยม หนี้สินเป็นศูนย์ แผนเกษียณเราเดินมาถูกทางแล้ว... <br><br>
                            แต่ใน <b>Optimization Insight</b> AI แนะนำให้ปรับแผนเพื่อบวกคะแนนเพิ่มอีก 0.12% ซึ่งมันไม่ได้มาจากเรื่องเกษียณครับ แต่มันคือการ <b>'อุดรอยรั่วจากการซื้อบ้านใหม่'</b><br><br>
                            สวัสดิการข้าราชการดูแลค่าหมอให้เราได้เต็มที่ และคุณภัทรมีประกันโรคร้ายแรง CI Plus 1 ล้านเตรียมไว้แล้วถือว่าสมบูรณ์มากครับ... แต่สำหรับการกู้ซื้อบ้าน ผมอยากเสนอให้จัดสรรเงินที่เหลืออยู่สักเดือนละ 2-3 พันบาท แบ่งมาทำ <b>ประกันชีวิตคุ้มครองหนี้สิน (AIA 20 Pay Life หรือ AIA Issara Plus)</b> ทุนประกันสัก 1-2 ล้านบาท เพื่อให้มั่นใจว่า ไม่ว่าจะเกิดอะไรขึ้น 'บ้านหลังนี้' จะตกเป็นของคู่ชีวิต 100% โดยไม่ต้องรับภาระผ่อนต่อครับ และเงินส่วนที่เหลือเราจะนำมาจัดพอร์ตลงทุนให้เงินฝากที่นอนนิ่งอยู่เติบโตชนะเงินเฟ้อครับ"
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-emerald-800 border-b-2 border-emerald-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">⚖️</span> 4. การประเมินความคุ้มค่า (Trade-off vs Risk)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                        <b class="text-emerald-800 block mb-2">➕ ผลกระทบเชิงบวก (The Leap)</b>
                        <p class="text-xs">คะแนนขยับขึ้น <b>+0.12%</b> (เป็น 87.95%) แม้ตัวเลขจะดูน้อย แต่ในเชิงจิตวิทยา ลูกค้าจะปลดล็อกความกังวลเรื่องการเป็นภาระของคู่ชีวิต (Peace of mind) ทำให้กล้าตัดสินใจซื้อบ้าน สร้างครอบครัวอย่างมั่นใจ และเงินลงทุนที่ถูกจัดสรรใหม่จะทำงานได้อย่างมีประสิทธิภาพมากขึ้น</p>
                    </div>
                    <div class="bg-rose-50 p-5 rounded-2xl border border-rose-200">
                        <b class="text-rose-800 block mb-2">➖ ผลกระทบเชิงลบ & ความเสี่ยง (The Cost)</b>
                        <p class="text-xs"><b>Cashflow Reduction:</b> การซื้อประกันชีวิตเพิ่มและการทำ DCA จะดึงกระแสเงินสดอิสระที่เหลืออยู่ 5,187 บาท/เดือน ไปใช้งานจนหมด ทำให้ขาดสภาพคล่องในการใช้จ่ายฟุ่มเฟือย<br>
                        <b>Risk Scenario:</b> หากคุณภัทรเลือกที่จะปฏิเสธแผนนี้ เท่ากับกำลังเอา "ความเสี่ยงของก้อนหนี้บ้านในอนาคต" ไปแขวนไว้บนความเปราะบาง หากเกิดเหตุไม่คาดฝัน คู่ชีวิตอาจต้องสูญเสียทั้งเสาหลักและบ้านพักอาศัยไปพร้อมๆ กัน</p>
                    </div>
                </div>
            </section>

            <div class="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden mt-6">
                <div class="absolute right-0 bottom-0 opacity-10 text-9xl">🎯</div>
                <h5 class="text-blue-400 font-bold mb-2">5. Final Conclusion for FA:</h5>
                <p class="text-xs text-slate-300 leading-relaxed">
                    เป้าหมายของเคสข้าราชการ/คนคะแนนสูงและมีสวัสดิการครบ คือ <b>"Wealth Optimization & Liability Protection"</b> <br>
                    จงอย่าฝืนนำเสนอสินค้าที่เขาไม่ต้องการ (ห้ามขายประกันสุขภาพเหมาจ่ายเพราะซ้ำซ้อนสิทธิข้าราชการ) แต่ให้สแกนหา <b>เป้าหมายชีวิตในระยะสั้น-กลาง</b> (เช่น การแต่งงาน, ซื้อบ้าน, มีลูก) แล้วใช้ประกันชีวิตตลอดชีพ (Whole Life) หรือ Unit-Linked เข้าไปเป็น <b>เกราะป้องกันความฝันเหล่านั้นและจัดพอร์ตเพิ่มผลตอบแทน</b> แทนครับ
                </p>
            </div>
        </div>
        `
    },
    // ==========================================
    // 🏪 กรณีศึกษาเชิงกลยุทธ์: คุณตั้ม (Crisis Management & Debt Restructuring) -> category: "c5"
    // ==========================================
    "c5_case_tum_informal": {
        category: "c5",
        icon: "🏪",
        iconClass: "bg-red-100 text-red-700",
        title: "บทเรียนการนำเสนอ: คุณตั้ม (Crisis Management & Debt Restructuring)",
        content: `
        <div class="antialiased touch-manipulation pb-safe space-y-8 text-sm text-gray-700 leading-relaxed">
            
            <section>
                <div class="bg-gradient-to-r from-red-700 to-rose-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden mb-6">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🆘</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10 text-red-200">การวิเคราะห์กลุ่มเปราะบาง: หยุดเลือดและกอบกู้วิกฤต (Crisis Management)</h3>
                    <p class="text-gray-200 text-sm relative z-10 leading-relaxed">
                        <b>วิเคราะห์โปรไฟล์:</b> คุณตั้ม อายุ 47 ปี อาชีพร้านอาหารริมทาง (ธุรกิจส่วนตัว/ค้าขาย) ดูแลพ่อแม่วัยชรา 1 ท่าน <b>ไม่มีสวัสดิการรัฐ/เอกชน</b> พฤติกรรมคือหมุนเงินชนเดือน (Paycheck to Paycheck) และพึ่งพาสินเชื่อระยะสั้นจนเกิดวงจรหนี้<br>
                        <b>โจทย์ของ FA:</b> ลูกค้าอยู่ในโหมด "เอาชีวิตรอด" กระแสเงินสดติดลบทุกเดือน การพูดถึงเรื่องลงทุนเกษียณรวยเป็นล้านๆ จะดูเพ้อฝันและกดดันลูกค้าทันที FA ต้องสวมบทบาทเป็น <b>"หมอรักษาหนี้"</b> โฟกัสที่การทำ Debt Consolidation (รวบหนี้) และปกป้องความเสี่ยงขั้นพื้นฐานที่สุดเพื่อไม่ให้พ่อแม่เดือดร้อนหากลูกค้าล้มป่วย
                    </p>
                </div>

                <h4 class="font-bold text-lg text-red-800 border-b-2 border-red-100 pb-2 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📝</span> 1. การสรุปข้อมูลภาพรวม (Client Profile Recap)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-red-700 block mb-2 underline">ข้อมูลเชิงปริมาณ (Quantitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>งบดุล (Balance Sheet):</b> ทรัพย์สินรวม 125,000.00 บาท | หนี้สินรวม 838,500.00 บาท (บัตรเครดิตและสินเชื่อบุคคล) <br><span class="text-rose-500 font-bold">(ความมั่งคั่งสุทธิติดลบ: -713,500.00 บาท)</span></li>
                            <li>• <b>งบกระแสเงินสด (Cash Flow):</b> รายรับ 65,000.00 บ./เดือน | รายจ่ายรวม 65,500.00 บ./เดือน (รวมจ่ายหนี้ 26,000 บ.) <br><span class="text-rose-500 font-bold">(กระแสเงินสดติดลบ: -500.00 บ./เดือน)</span></li>
                            <li>• <b>พอร์ตการลงทุนปัจจุบัน:</b> เงินสดในมือ 25,000 บาท | เงินฝากออมทรัพย์ 100,000 บาท (ไม่มีพอร์ตลงทุน)</li>
                            <li>• <b>พอร์ตกรมธรรม์ปัจจุบัน:</b> ไม่มีข้อมูลกรมธรรม์ปัจจุบัน (Underinsured 100%)</li>
                            <li>• <b>เป้าหมายการเงิน (SMART Goals):</b> <br>
                                - สำรองฉุกเฉิน 6 เดือน (393,000.00 บ.)<br>
                                - ทุนเกษียณอายุ 60 ปี ต้องการใช้เงิน 15,000 บ./เดือน
                            </li>
                            <li>• <b>อัตราส่วนสำคัญ:</b> ภาระผ่อนชำระหนี้ 40.0% | สภาพคล่อง 1.91 เดือน</li>
                            <li>• <b>คะแนนความสำเร็จ AI:</b> ปัจจุบัน 40.85% ➡️ Proposed 45.1% <span class="text-rose-500 font-bold">(ติด Hard Cap 45% จากหนี้วิกฤต)</span></li>
                        </ul>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-red-700 block mb-2 underline">ข้อมูลเชิงคุณภาพ (Qualitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>สถานะ:</b> โสดอิสระ / มีผู้ในอุปการะ 1 ท่าน (พ่อแม่วัยชรา)</li>
                            <li>• <b>อาชีพ:</b> ร้านอาหารริมทาง (Street Food) วัย 47 ปี</li>
                            <li>• <b>สวัสดิการ:</b> ไม่มีสวัสดิการ (พึ่งพาบัตรทอง/จ่ายเอง)</li>
                            <li>• <b>พฤติกรรมหนี้:</b> รูดบัตรเครดิตไปก่อนแล้วผ่อนชำระขั้นต่ำ หมุนเงินชนเดือน (Paycheck to Paycheck) ขาดการปกป้องความเสี่ยง</li>
                            <li>• <b>ระดับความเสี่ยง:</b> เสี่ยงปานกลางค่อนข้างต่ำ (Moderate Conservative) คาดหวังผลตอบแทน 4.41%</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">🔍</span> 2. การวิเคราะห์จุดแข็งและจุดเปราะบาง (Fact Finding & Pain Point)
                </h4>
                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div class="flex gap-4">
                        <div class="shrink-0 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">✓</div>
                        <div>
                            <b class="text-emerald-800">จุดแข็ง (AI Reality Check):</b> 
                            <p class="mt-1">ลูกค้ามีความรับผิดชอบสูง (ดูแลพ่อแม่) และยังมีสินทรัพย์สภาพคล่อง (เงินสดและเงินฝาก 125,000 บาท) ที่สามารถนำมาใช้เป็น 'Cash Buffer' หรือเครื่องมือฉุกเฉินในการต่อรองเพื่อจัดระเบียบโครงสร้างหนี้ใหม่ได้</p>
                        </div>
                    </div>
                    <div class="flex gap-4 border-t border-slate-200 pt-4">
                        <div class="shrink-0 w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">!</div>
                        <div>
                            <b class="text-rose-800">Pain Point (จุดเปราะบางแบบซ่อนเร้น):</b> 
                            <p class="mt-1">1. <b>Death Spiral (วงจรหนี้พอกหางหมู):</b> หนี้สะสม 8.38 แสนบาท กับการจ่ายชำระ 26,000 บ./เดือน ทำให้กระแสเงินสดติดลบทุกเดือน และเป็นดอกเบี้ยทิ้งเปล่า ความมั่งคั่งสุทธิที่ติดลบอยู่แล้วจะยิ่งจมลึกขึ้นเรื่อยๆ</p>
                            <p class="mt-1">2. <b>Single Point of Failure (เสาหลักต้นเดียวที่ไร้เกราะ):</b> ขาดความคุ้มครองทุกมิติ โดยมี Life Gap ถึง 8.4 ล้านบาท และ Health Gap อีก 6.8 ล้านบาท อาชีพค้าขาย "หยุดทำ = รายได้ศูนย์" หากคุณตั้มล้มป่วยเพียง 1-2 สัปดาห์ กระแสเงินสดจะพังทลายทันที และพ่อแม่จะได้รับผลกระทบโดยตรง</p>
                            <p class="mt-1">3. <b>ความเสี่ยงทิ้งกรมธรรม์ (Lapse Risk):</b> ตรวจพบระดับวิกฤตสูงถึง 96.15% หมายความว่าหาก FA เสนอแผนประกันที่เบี้ยสูงเกินไป ลูกค้ามีโอกาสเกือบ 100% ที่จะทิ้งกรมธรรม์ในปีถัดไปเพราะจ่ายไม่ไหว</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-red-800 border-b-2 border-red-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">💡</span> 3. การนำเสนอทางออก (Strategic Solution)
                </h4>
                <div class="space-y-4">
                    <div class="bg-red-900 text-red-50 p-5 rounded-2xl shadow-xl">
                        <b class="text-amber-300 block mb-3">💬 สคริปต์การนำเสนอเชิงกลยุทธ์:</b>
                        <p class="text-sm leading-relaxed">
                            "พี่ตั้มครับ จากระบบ AI ประเมินออกมา สิ่งแรกที่ผมต้องชื่นชมเลยคือพี่เป็นเสาหลักที่เข้มแข็งมากครับ การดูแลร้านพร้อมกับดูแลคุณพ่อคุณแม่ไปด้วย ไม่ใช่เรื่องง่ายเลย... <br><br>
                            แต่ AI ประเมินคะแนนความมั่นคงออกมาที่ <b>40.85%</b> ซึ่งมันฟ้องว่าตอนนี้ <b>'พี่แบกภาระหนักเกินไปตัวคนเดียว'</b> ดอกเบี้ยบัตรเครดิตและสินเชื่อกำลังดึงเงินที่พี่หามาได้ไปจนหมด ทำให้เงินพี่ติดลบ 500 บาททุกเดือน... ทางแก้แรกตามที่ AI แนะนำ (Benchmark) คือเราต้องรัดเข็มขัด ลดงบใช้ชีวิตจาก 39,500 บาท ให้เหลือสัก 33,600 บาท เพื่อดึงกระแสเงินสดกลับมาเป็นบวกให้ได้ครับ <br><br>
                            สิ่งสำคัญที่สุดระหว่างที่พี่กำลังสู้เคลียร์หนี้ก้อนนี้ ผมอยากให้พี่ <b>'เช่าร่มกันฝนคันเล็กๆ'</b> ไว้คันนึงครับ ด้วยแผน <b>AIA Life Protector 70 พ่วง AIA CI ProCare หรือ Health Saver</b> เบี้ยไม่แพง แลกกับความสบายใจว่า... ถ้าพี่ล้มป่วย ร้านต้องปิด จะมีสวัสดิการมาจ่ายค่าหมอให้ หรือถ้าเกิดเหตุไม่คาดฝัน คุณพ่อคุณแม่จะมีเงินก้อนไว้ตั้งตัว เงิน 1 แสนที่พี่เก็บไว้จะได้ไม่ต้องละลายไปกับโรงพยาบาลครับ"
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-emerald-800 border-b-2 border-emerald-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">⚖️</span> 4. การประเมินความคุ้มค่า (Trade-off vs Risk)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                        <b class="text-emerald-800 block mb-2">➕ ผลกระทบเชิงบวก (The Leap)</b>
                        <p class="text-xs">คะแนนขยับขึ้นเล็กน้อยเป็น <b>45.1%</b> (ติด Hard Cap ของ AI เพื่อเตือนว่าลูกค้ายังมี DTI สูงถึง 40%) แต่ในโลกความเป็นจริง การลดรายจ่ายเพื่อเปลี่ยนกระแสเงินสดให้กลับมา "เป็นบวก" (มีเงินออม 5,400 บ./เดือน) และซื้อ Micro-Protection จะช่วยหยุดเลือดทางการเงิน (Stop Bleeding) และต่อลมหายใจในยามวิกฤตได้สำเร็จ</p>
                    </div>
                    <div class="bg-rose-50 p-5 rounded-2xl border border-rose-200">
                        <b class="text-rose-800 block mb-2">➖ ผลกระทบเชิงลบ & ความเสี่ยง (The Cost)</b>
                        <p class="text-xs"><b>Trade-off:</b> ลูกค้าต้องยอมตัดใจลดไลฟ์สไตล์การใช้ชีวิตลงเพื่อดึงสภาพคล่องกลับมา และจัดสรรเงินมาจ่ายเบี้ยประกันพื้นฐานแทน<br>
                        <b>Risk Scenario:</b> หากพี่ตั้มปฏิเสธการทำประกัน (Self-Insured) หากล้มป่วยเพียง 1 ครั้ง หนี้สินจะพอกหางหมูรุนแรงขึ้น เงินเก็บ 125,000 บาทจะหมดเกลี้ยง และอาจนำไปสู่การฟ้องร้องล้มละลายหรือไม่มีคนดูแลพ่อแม่ในบั้นปลาย</p>
                    </div>
                </div>
            </section>

            <div class="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden mt-6">
                <div class="absolute right-0 bottom-0 opacity-10 text-9xl">🎯</div>
                <h5 class="text-red-400 font-bold mb-2">5. Final Conclusion for FA:</h5>
                <p class="text-xs text-slate-300 leading-relaxed">
                    หัวใจของการดูแลลูกค้ากลุ่มเปราะบาง (Negative Net Worth) คือ <b>"Empathy (ความเข้าอกเข้าใจ) และ Crisis Management"</b> <br>
                    <b>"ห้ามเสนอสินค้า Unit-Linked หรือสะสมทรัพย์เบี้ยสูงเด็ดขาด"</b> (เพราะ Lapse Risk สูง 96.15%) จงทำตัวเป็น Partner ที่มาช่วยแบ่งเบาภาระ เน้นให้คำปรึกษาเรื่องการรัดเข็มขัดและเคลียร์หนี้ พร้อมปิดความเสี่ยงขั้นต่ำสุดด้วย Term Life หรือประกันสุขภาพแผนเริ่มต้น เมื่อคุณช่วยเขาลดหนี้และปกป้องพ่อแม่เขาได้ในยามวิกฤต เขาจะกลายเป็นลูกค้าที่จงรักภักดีกับคุณไปตลอดชีวิตครับ
                </p>
            </div>
        </div>
        `
    },
    // ==========================================
    // 🛍️ กรณีศึกษาที่ 4: อาชีพอิสระคนรุ่นใหม่ / หนี้บริโภคสูง -> category: "c5"
    // ==========================================
    "c5_case_pop_informal": {
        category: "c5",
        icon: "🛍️",
        iconClass: "bg-purple-100 text-purple-700",
        title: "Case Study: คุณป๊อป (วัย 28 ปี) - พ่อค้าแม่ค้า/เพิ่งแต่งงาน (High Growth & Risk Management)",
        content: `
        <div class="antialiased touch-manipulation pb-safe space-y-8 text-sm text-gray-700 leading-relaxed">
            
            <section>
                <div class="bg-gradient-to-r from-purple-700 to-fuchsia-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden mb-6">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🛍️</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10 text-purple-200">การวิเคราะห์กลุ่ม Young Freelance: เร่งการเติบโต & ปิดความเสี่ยง (High Growth)</h3>
                    <p class="text-gray-200 text-sm relative z-10 leading-relaxed">
                        <b>วิเคราะห์โปรไฟล์:</b> คุณป๊อป อายุ 28 ปี อาชีพพ่อค้าแม่ค้าตามตลาด ไม่มีผู้อุปการะ <b>ไม่มีสวัสดิการ</b> มีพฤติกรรมพึ่งพาสินเชื่อค่อนข้างสูง (รูดบัตรผ่อน 0%) แต่มีวินัยหักเงินออมทันทีที่ได้เงิน<br>
                        <b>โจทย์ของ FA:</b> ลูกค้ามีวินัยการออมดี มีความมั่งคั่งสุทธิเป็นบวก แต่สภาพคล่องรายเดือนตึงตัวมาก (เหลือ 1,425 บาท/เดือน) และมีวิกฤตสภาพคล่องซ้อนทับ FA ต้องทำหน้าที่ปรับโครงสร้างกระแสเงินสด และอุดรอยรั่วสวัสดิการค่ารักษาพยาบาลหลักล้านที่ยังขาดอยู่
                    </p>
                </div>

                <h4 class="font-bold text-lg text-purple-800 border-b-2 border-purple-100 pb-2 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📝</span> 1. การสรุปข้อมูลภาพรวม (Client Profile Recap)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-purple-700 block mb-2 underline">ข้อมูลเชิงปริมาณ (Quantitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>งบดุล (Balance Sheet):</b> ทรัพย์สินรวม 1,590,000.00 บาท | หนี้สินรวม 1,100,000.00 บาท (บ้าน 900K, รถ 200K) <br><span class="text-emerald-600 font-bold">(ความมั่งคั่งสุทธิ: 490,000.00 บาท)</span></li>
                            <li>• <b>งบกระแสเงินสด (Cash Flow):</b> รายรับ 29,000.00 บ./เดือน | รายจ่ายรวม 27,575.00 บ./เดือน <br><span class="text-orange-500 font-bold">(กระแสเงินสดคงเหลือ: 1,425.00 บ./เดือน)</span></li>
                            <li>• <b>พอร์ตการลงทุนปัจจุบัน:</b> ไม่มีข้อมูลการลงทุนปัจจุบัน (มีเพียงเงินฝาก 138,000 บ. และมูลค่าเวนคืน 165,000 บ.)</li>
                            <li>• <b>พอร์ตกรมธรรม์ปัจจุบัน:</b> มีบำนาญ (AIA Annuity Fix) และกลุ่มโรคร้ายแรง (CI ProCare, CI Plus, Care for Cancer) แต่ <b>ไม่มีประกันสุขภาพ</b></li>
                            <li>• <b>เป้าหมายการเงิน (SMART Goals):</b> <br>
                                - ไม่ได้ระบุเป้าหมายระยะสั้นที่ชัดเจน<br>
                                - เป้าหมายเกษียณอายุ 55 ปี ยอดใช้จ่าย 31,812 บ./เดือน
                            </li>
                            <li>• <b>อัตราส่วนสำคัญ:</b> ภาระหนี้ 41.38% | สภาพคล่อง 1.1 เดือน | อัตราการออม 18.53%</li>
                            <li>• <b>คะแนนความสำเร็จ AI:</b> ปัจจุบัน 67.8% ➡️ Proposed 88.0% <span class="text-emerald-500 font-bold">(ก้าวกระโดด +20.2%)</span></li>
                        </ul>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-purple-700 block mb-2 underline">ข้อมูลเชิงคุณภาพ (Qualitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>สถานะ:</b> เพิ่งแต่งงาน/เตรียมซื้อบ้าน (วัยทำงานสร้างตัว)</li>
                            <li>• <b>อาชีพ:</b> พ่อค้าแม่ค้าตามตลาด (ไม่มีสวัสดิการรักษาพยาบาล)</li>
                            <li>• <b>พฤติกรรมหนี้:</b> พึ่งพาสินเชื่อค่อนข้างสูง ชอบรูดบัตรเครดิตไปก่อนแล้วผ่อน 0%</li>
                            <li>• <b>วินัยการออม:</b> สูงมาก (หักออมทันทีที่ได้เงิน)</li>
                            <li>• <b>ระดับความเสี่ยง:</b> เสี่ยงปานกลางค่อนข้างสูง (Moderate Aggressive) คาดหวังผลตอบแทน 5.48%</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">🔍</span> 2. การวิเคราะห์จุดแข็งและจุดเปราะบาง (Fact Finding & Pain Point)
                </h4>
                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div class="flex gap-4">
                        <div class="shrink-0 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">✓</div>
                        <div>
                            <b class="text-emerald-800">จุดแข็ง (AI Reality Check):</b> 
                            <p class="mt-1">ลูกค้าอายุเพียง 28 ปี มีความมั่งคั่งสุทธิเป็นบวก (4.9 แสนบาท) และมีวินัยการออมที่ดีเยี่ยม (18.53%) หากปรับลดภาระกระแสเงินสดได้ พลังของดอกเบี้ยทบต้นและระยะเวลาที่เหลืออีก 27 ปีก่อนเกษียณ จะช่วยให้บรรลุเป้าหมายได้สบายๆ</p>
                        </div>
                    </div>
                    <div class="flex gap-4 border-t border-slate-200 pt-4">
                        <div class="shrink-0 w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">!</div>
                        <div>
                            <b class="text-rose-800">Pain Point (จุดเปราะบางแบบซ่อนเร้น):</b> 
                            <p class="mt-1">1. <b>วิกฤตสภาพคล่องซ้อนทับ:</b> ภาระหนี้สินสูงถึง 41.4% (ผ่อนบ้านและรถรวม 12,000 บ./เดือน) ในขณะที่เงินสำรองฉุกเฉินมีเพียง 1.1 เดือน กระแสเงินสดเหลือแค่ 1,425 บ./ด. หากรายได้สะดุดจะพังทันที</p>
                            <p class="mt-1">2. <b>รอยรั่วความเสี่ยงสุขภาพ (Risk Gap):</b> แม้จะมีประกันโรคร้ายแรงและบำนาญอยู่แล้ว แต่ขาดสวัสดิการค่ารักษาพยาบาล (Health Gap) สูงถึง 5.57 ล้านบาท หากป่วยหนักจะต้องดึงความมั่งคั่งหลัก 4.9 แสนออกมาใช้จนหมด</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-purple-800 border-b-2 border-purple-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">💡</span> 3. การนำเสนอทางออก (Strategic Solution)
                </h4>
                <div class="space-y-4">
                    <div class="bg-purple-900 text-purple-50 p-5 rounded-2xl shadow-xl">
                        <b class="text-fuchsia-300 block mb-3">💬 สคริปต์การนำเสนอเชิงกลยุทธ์:</b>
                        <p class="text-sm leading-relaxed">
                            "คุณป๊อปครับ จากรายงาน AI ผมต้องขอชื่นชมวินัยการออมที่ยอดเยี่ยมมากครับ อายุแค่ 28 ปี แต่มีความมั่งคั่งสุทธิเกือบครึ่งล้าน และมีประกันโรคร้ายแรงเตรียมไว้แล้ว ถือว่าพื้นฐานแน่นมากครับ<br><br>
                            แต่ AI ตรวจพบ <b>'วิกฤตสภาพคล่องซ้อนทับ'</b> ครับ คือเรามีภาระผ่อนบ้านผ่อนรถรวม 41.4% และเงินสำรองฉุกเฉินเรามีอยู่แค่ 1.1 เดือน (ควรมี 6 เดือน) ซึ่ง AI แนะนำให้เราชะลอการลงทุนในสินทรัพย์เสี่ยงไปก่อน และโฟกัสที่การจัดการรวบยอดหนี้เพื่อเพิ่มระยะเวลาเอาตัวรอด (Survival Ratio) ครับ<br><br>
                            และจุดที่อันตรายที่สุดคือ คุณป๊อปไม่มีสวัสดิการค่ารักษาพยาบาลเลย เกิดรอยรั่วอยู่ 5.57 ล้านบาท ผมขอเสนอแผน <b>AIA Health Saver (แผน 3 แสน) พ่วง AIA 20 Pay Life</b> เบี้ยประหยัดแค่หมื่นกว่าบาทต่อปี เพื่อล็อกความเสี่ยงนี้ไว้ ไม่ให้ค่าหมอมาทำลายเงินเก็บและบ้านของคุณป๊อปครับ"
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-emerald-800 border-b-2 border-emerald-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">⚖️</span> 4. การประเมินความคุ้มค่า (Trade-off vs Risk)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                        <b class="text-emerald-800 block mb-2">➕ ผลกระทบเชิงบวก (The Leap)</b>
                        <p class="text-xs">คะแนนพุ่งทะยานจาก 67.8% เป็น <b>88.0%</b>! ทันทีที่อุดรอยรั่วค่ารักษา 5.57 ล้านบาทสำเร็จ และดันอัตราการออมขึ้นเป็น 20% พลังทบต้นจากอายุ 28 ปี จะทำให้เป้าหมายเกษียณ 31,812 บ./เดือน เป็นจริงได้อย่างแน่นอน</p>
                    </div>
                    <div class="bg-rose-50 p-5 rounded-2xl border border-rose-200">
                        <b class="text-rose-800 block mb-2">➖ ผลกระทบเชิงลบ & ความเสี่ยง (The Cost)</b>
                        <p class="text-xs"><b>Trade-off:</b> สภาพคล่องรายเดือนเหลือเพียง 1,425 บาท การซื้อประกันสุขภาพเพิ่มจะต้องแลกมาด้วยการเกลี่ยเงินที่กันไว้ออม (5,375 บ.) มาลงในส่วนป้องกันความเสี่ยง (Benchmark AI แนะนำให้ออมเหลือ 2,900 บ. และโปะหนี้เพิ่ม)<br>
                        <b>Risk Scenario:</b> หากไม่ปิดรอยรั่วสุขภาพ (Self-Insured) เงินสด 1 แสนกว่าบาทในมือจะหมดไปกับการเจ็บป่วยเพียงครั้งเดียว และบ้าน/รถอาจถูกยึดเพราะขาดสภาพคล่อง</p>
                    </div>
                </div>
            </section>

            <div class="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden mt-6">
                <div class="absolute right-0 bottom-0 opacity-10 text-9xl">🎯</div>
                <h5 class="text-fuchsia-400 font-bold mb-2">5. Final Conclusion for FA:</h5>
                <p class="text-xs text-slate-300 leading-relaxed">
                    เป้าหมายหลักในเคสคุณป๊อปคือ <b>"Stop Bleeding & Health Protection"</b> <br>
                    ลูกค้ากลุ่มนี้มีหนี้สิน (บ้าน/รถ) ตึงตัวอยู่แล้ว การเสนอขายประกันเบี้ยแพงจะทำให้เกิดวิกฤต Lapse Risk ทันที ให้ FA โฟกัสไปที่ <b>"การจัดระเบียบกระแสเงินสด"</b> และขายสินค้าประกันสุขภาพเบี้ยประหยัด (Health Saver) เพื่อโอนความเสี่ยงค่ารักษาพยาบาลออกไปก่อน เมื่อหนี้สินลดลง ค่อยกลับมา Upsell เพื่อต่อยอดความมั่งคั่งครับ
                </p>
            </div>
        </div>
        `
    },
    // ==========================================
    // 💼 กรณีศึกษาที่ 5: วัยเริ่มสร้างตัว (First Jobber) / พนักงานบริษัทเอกชน -> category: "c5"
    // ==========================================
    "c5_case_chon_firstjobber": {
        category: "c5",
        icon: "💼",
        iconClass: "bg-cyan-100 text-cyan-700",
        title: "Case Study: คุณชล (วัย 25 ปี) - First Jobber (Foundation & Growth)",
        content: `
        <div class="antialiased touch-manipulation pb-safe space-y-8 text-sm text-gray-700 leading-relaxed">
            
            <section>
                <div class="bg-gradient-to-r from-cyan-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden mb-6">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🌱</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10 text-cyan-200">การวิเคราะห์กลุ่ม First Jobber: สร้างรากฐานและวินัยการเงิน (Foundation & Growth)</h3>
                    <p class="text-gray-200 text-sm relative z-10 leading-relaxed">
                        <b>วิเคราะห์โปรไฟล์:</b> คุณชล อายุ 25 ปี อาชีพพนักงานบริษัทเอกชน มีสวัสดิการประกันกลุ่มองค์กร พฤติกรรมเป็นแบบมาตรฐาน แต่มีพฤติกรรมหมุนเงินชนเดือน และพึ่งพาสินเชื่อระยะสั้นค่อนข้างสูง<br>
                        <b>โจทย์ของ FA:</b> ลูกค้าได้คะแนน AI ที่ 85.92% เพราะอายุที่ยังน้อยมาก (มีเวลาลงทุน 35 ปีก่อนเกษียณ) แต่อุปสรรคใหญ่คือ "ไม่มีกระแสเงินสดเหลือ" FA จึงต้องสวมบทบาทเป็น Mentor ช่วยจัดระเบียบหนี้ และขายไอเดีย <b>"การซื้อเวลาตอนเบี้ยถูกที่สุด"</b> ควบคู่กับ <b>"การอุดรอยรั่วสวัสดิการ"</b>
                    </p>
                </div>

                <h4 class="font-bold text-lg text-cyan-800 border-b-2 border-cyan-100 pb-2 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📝</span> 1. การสรุปข้อมูลภาพรวม (Client Profile Recap)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-cyan-700 block mb-2 underline">ข้อมูลเชิงปริมาณ (Quantitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>งบดุล (Balance Sheet):</b> ทรัพย์สินรวม 109,000.00 บาท | หนี้สินรวม 89,000.00 บาท <br><span class="text-emerald-600 font-bold">(ความมั่งคั่งสุทธิ: 20,000.00 บาท)</span></li>
                            <li>• <b>งบกระแสเงินสด (Cash Flow):</b> รายรับ 35,000.00 บ./เดือน | รายจ่ายรวม 35,000.00 บ./เดือน <br><span class="text-orange-500 font-bold">(กระแสเงินสดคงเหลือ: 0.00 บ./เดือน)</span></li>
                            <li>• <b>พอร์ตการลงทุนปัจจุบัน:</b> กองทุนสำรองเลี้ยงชีพ (PVD) 25,000 บาท</li>
                            <li>• <b>พอร์ตกรมธรรม์ปัจจุบัน:</b> ไม่มีข้อมูลกรมธรรม์ปัจจุบัน</li>
                            <li>• <b>เป้าหมายการเงิน (SMART Goals):</b> <br>
                                - ซื้อรถยนต์ 500,000 บ. (อีก 5 ปี)<br>
                                - ทุนเกษียณอายุ 60 ปี ต้องการใช้เงิน 15,000 บ./เดือน
                            </li>
                            <li>• <b>อัตราส่วนสำคัญ:</b> ภาระหนี้ 25.4% | สภาพคล่อง 2.4 เดือน</li>
                            <li>• <b>คะแนนความสำเร็จ AI:</b> ปัจจุบัน 85.92% ➡️ Proposed 85.96%</li>
                        </ul>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-cyan-700 block mb-2 underline">ข้อมูลเชิงคุณภาพ (Qualitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>สถานะ:</b> วัยเริ่มสร้างตัว (EntryCorp) / โสด ไร้ภาระผู้อุปการะ</li>
                            <li>• <b>อาชีพ:</b> พนักงานบริษัทเอกชน วัย 25 ปี</li>
                            <li>• <b>สวัสดิการ:</b> ประกันกลุ่มองค์กร (OPD/IPD ขั้นพื้นฐาน)</li>
                            <li>• <b>พฤติกรรมหนี้:</b> หมุนเงินชนเดือน (Paycheck to Paycheck) ใช้แหล่งกู้เงินระยะสั้น(บัตรเครดิต)แล้วจ่ายคืนเต็มจำนวนได้ทุกครั้ง</li>
                            <li>• <b>ระดับความเสี่ยง:</b> เสี่ยงปานกลางค่อนข้างสูง (Moderate Aggressive)</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">🔍</span> 2. การวิเคราะห์จุดแข็งและจุดเปราะบาง (Fact Finding & Pain Point)
                </h4>
                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div class="flex gap-4">
                        <div class="shrink-0 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">✓</div>
                        <div>
                            <b class="text-emerald-800">จุดแข็ง (AI Reality Check):</b> 
                            <p class="mt-1">อายุ 25 ปี คือแต้มต่อที่ทรงพลังที่สุด (Time Horizon) ผนวกกับสิทธิประโยชน์จาก PVD และความกล้าเสี่ยงในระดับ Moderate Aggressive ทำให้แผนเกษียณมีโอกาสสำเร็จสูงมากโดยแทบไม่ต้องออกแรงเพิ่ม</p>
                        </div>
                    </div>
                    <div class="flex gap-4 border-t border-slate-200 pt-4">
                        <div class="shrink-0 w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">!</div>
                        <div>
                            <b class="text-rose-800">Pain Point (จุดเปราะบางแบบซ่อนเร้น):</b> 
                            <p class="mt-1">1. <b>Zero Cashflow Trap:</b> กระแสเงินสดเหลือ 0 บาท/เดือน แม้จะไม่มีหนี้เสีย แต่สภาพคล่องตึงตัวระดับนี้ทำให้ไม่สามารถจัดสรรงบไปสู่เป้าหมายซื้อรถยนต์ในอีก 5 ปีได้ (โอกาสสำเร็จเป้าหมายระยะสั้น = 0%)</p>
                            <p class="mt-1">2. <b>Rented Welfare (สวัสดิการยืมเขามา):</b> ขาดความคุ้มครองสุขภาพ/โรคร้ายแรงส่วนตัว (Risk Gap: 6.94 ล้านบาท) หากเปลี่ยนงานหรือถูกเลิกจ้าง สวัสดิการนี้จะหายไปทันที</p>
                            <p class="mt-1">3. <b>Lifestyle Creep Risk:</b> รายจ่ายค่าใช้ชีวิตสูงถึง 71% ของรายได้ หากปล่อยให้เติบโตตามเงินเดือน จะกลายเป็นกับดักหนี้บริโภคในอนาคต</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-cyan-800 border-b-2 border-cyan-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">💡</span> 3. การนำเสนอทางออก (Strategic Solution)
                </h4>
                <div class="space-y-4">
                    <div class="bg-cyan-900 text-cyan-50 p-5 rounded-2xl shadow-xl">
                        <b class="text-blue-300 block mb-3">💬 สคริปต์การนำเสนอเชิงกลยุทธ์:</b>
                        <p class="text-sm leading-relaxed">
                            "คุณชลครับ จากรายงานของ AI คะแนนความสำเร็จของคุณชลสูงถึง 85.92% ซึ่งยอดเยี่ยมมากสำหรับคนวัย 25 ปี! พลังของเวลาและ PVD ทำให้เราแทบไม่ต้องกังวลเรื่องเกษียณเลยครับ... <br><br>
                            แต่ AI เสนอ <b>Optimization Insight</b> เพื่อให้แผนสมบูรณ์ขึ้นครับ ปัญหาตอนนี้คือ <b>'กระแสเงินสดที่ตึงตัว 100%'</b> ทำให้เป้าหมายซื้อรถยนต์สะดุด ทางออกแรกคือเราต้องลดรายจ่ายไลฟ์สไตล์ลงนิดนึง ดึงงบกลับมาให้ได้สัก 5,800 บ./เดือน เพื่อแบ่งมาทำระบบออมอัตโนมัติ (DCA) เข้าพอร์ตความเสี่ยงปานกลางครับ<br><br>
                            และอีกเรื่องสำคัญคือ ประกันกลุ่มที่บริษัทให้มาถือว่าดีมากครับ แต่มันเป็น 'สวัสดิการติดโต๊ะทำงาน' วันนี้คุณชลอายุแค่ 25 <b>'เบี้ยประกันสุขภาพและโรคร้ายแรงจะถูกที่สุดในชีวิต'</b> ผมแนะนำให้เจียดเงินที่เซฟได้ส่วนหนึ่ง มาล็อกเบี้ยราคาถูกด้วย <b>AIA 20 Pay Life + Health Saver หรือ CI Plus</b> ติดตัวไว้เป็นสวัสดิการส่วนตัว ที่จะติดตัวเราไปทุกที่ ไม่ว่าเราจะย้ายงานไปไหนก็ตามครับ"
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-emerald-800 border-b-2 border-emerald-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">⚖️</span> 4. การประเมินความคุ้มค่า (Trade-off vs Risk)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                        <b class="text-emerald-800 block mb-2">➕ ผลกระทบเชิงบวก (The Leap)</b>
                        <p class="text-xs">คะแนนขยับเพียง <b>+0.04%</b> (เพราะฐานเดิมดีอยู่แล้ว) แต่ผลลัพธ์ในโลกจริงคือ <b>"ความต่อเนื่อง (Continuity)"</b> การปรับโครงสร้างให้มีกระแสเงินสดเป็นบวก จะทำให้เป้าหมายซื้อรถ 500,000 บาท มีโอกาสเป็นจริงขึ้นมา และการทำประกันตอนนี้คือการ <b>"ซื้อออปชั่นสุขภาพในราคาดิสเคาท์"</b></p>
                    </div>
                    <div class="bg-rose-50 p-5 rounded-2xl border border-rose-200">
                        <b class="text-rose-800 block mb-2">➖ ผลกระทบเชิงลบ & ความเสี่ยง (The Cost)</b>
                        <p class="text-xs"><b>Trade-off:</b> คุณชลจะต้องแลกมาด้วยการ "ปรับลดค่าใช้จ่ายไลฟ์สไตล์ลง 16%" เพื่อปลดล็อกกระแสเงินสด<br>
                        <b>Risk Scenario:</b> หากคุณชลไม่ทำประกันสุขภาพส่วนตัว และโชคร้ายเจอโรคร้ายแรง ประกันกลุ่มบริษัทอาจช่วยได้แค่หลักหมื่น ส่วนต่างหลักแสน/ล้าน จะมาพังเงินเก็บและ PVD ก้อนแรกของชีวิตคุณชลจนหมดสิ้น</p>
                    </div>
                </div>
            </section>

            <div class="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden mt-6">
                <div class="absolute right-0 bottom-0 opacity-10 text-9xl">🎯</div>
                <h5 class="text-cyan-400 font-bold mb-2">5. Final Conclusion for FA:</h5>
                <p class="text-xs text-slate-300 leading-relaxed">
                    เป้าหมายหลักในเคสคุณชลคือ <b>"Cash Flow Management & Health Lock"</b> <br>
                    ในการดูแลลูกค้ากลุ่ม First Jobber อย่าเพิ่งยัดเยียดเบี้ยประกันหลักแสนให้เขาตึงเครียด เพราะตอนนี้กระแสเงินสดเขาตึงตัว 100% จงรับบทเป็น <b>"รุ่นพี่ที่ปรึกษา (Financial Mentor)"</b> แนะนำสินค้าราคาเข้าถึงง่าย (Entry-level) เช่น AIA Health Saver หรือ Term Life พ่วง CI เพื่อล็อคเบี้ยราคาถูกตามวัย เมื่อเงินเดือนเขาเติบโตขึ้น เขาจะกลับมาเป็นลูกค้าระยะยาว (LTV) ของคุณแน่นอนครับ
                </p>
            </div>
        </div>
        `
    },
    // ==========================================
    // 👩‍👧‍👦 กรณีศึกษาที่ 6: พ่อแม่เลี้ยงเดี่ยว / ภาระสูง / เกษตรกร -> category: "c5"
    // ==========================================
    "c5_case_joy_singlemom": {
        category: "c5",
        icon: "👩‍👧‍👦",
        iconClass: "bg-pink-100 text-pink-700",
        title: "Case Study: คุณจอย (วัย 33 ปี) - พ่อแม่เลี้ยงเดี่ยว (Family Protection & Debt Trap)",
        content: `
        <div class="antialiased touch-manipulation pb-safe space-y-8 text-sm text-gray-700 leading-relaxed">
            
            <section>
                <div class="bg-gradient-to-r from-pink-600 to-rose-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden mb-6">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🛡️</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10 text-pink-200">การวิเคราะห์กลุ่ม Single Parent: ทลายกำแพงหนี้และปกป้องดวงใจ (Debt Escape & Protection)</h3>
                    <p class="text-gray-200 text-sm relative z-10 leading-relaxed">
                        <b>วิเคราะห์โปรไฟล์:</b> คุณจอย อายุ 33 ปี อาชีพเกษตรกร เป็นเสาหลักที่ต้องดูแลครอบครัวรวม 2 ชีวิต <b>ไม่มีสวัสดิการรองรับ</b> มีพฤติกรรมทางการเงินแบบพึ่งพาสินเชื่อและจ่ายขั้นต่ำจนติดกับดักหนี้<br>
                        <b>โจทย์ของ FA:</b> ลูกค้ามีความมั่งคั่งสุทธิเป็นบวกแต่กระแสเงินสดติดลบ ภารกิจหลักคือการ "หยุดเลือด" จากดอกเบี้ยจ่ายและสร้างสวัสดิการพื้นฐานเพื่อไม่ให้ครอบครัวพังทลายหากเสาหลักล้ม
                    </p>
                </div>

                <h4 class="font-bold text-lg text-pink-800 border-b-2 border-pink-100 pb-2 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📝</span> 1. การสรุปข้อมูลภาพรวม (Client Profile Recap)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-pink-700 block mb-2 underline">ข้อมูลเชิงปริมาณ (Quantitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>งบดุล (Balance Sheet):</b> ทรัพย์สินรวม 583,500.00 บาท | หนี้สินรวม 282,500.00 บาท <br><span class="text-emerald-600 font-bold">(ความมั่งคั่งสุทธิ: 301,000.00 บาท)</span></li>
                            <li>• <b>งบกระแสเงินสด (Cash Flow):</b> รายรับ 55,000.00 บ./เดือน | รายจ่ายรวม 60,000.00 บ./เดือน <br><span class="text-rose-500 font-bold">(กระแสเงินสดติดลบ: -5,000.00 บ./เดือน)</span></li>
                            <li>• <b>พอร์ตการลงทุนปัจจุบัน:</b> เงินฝากออมทรัพย์ 110,000 บาท | กองทุนรวมแบบผสม 15,000 บาท</li>
                            <li>• <b>พอร์ตกรมธรรม์ปัจจุบัน:</b> ไม่มีข้อมูลกรมธรรม์ปัจจุบัน</li>
                            <li>• <b>เป้าหมายการเงิน (SMART Goals):</b> <br>
                                - ทุนการศึกษาบุตร 1,000,000 บ. (อีก 10 ปี)<br>
                                - ดาวน์บ้าน / ซื้อที่อยู่อาศัย 500,000 บ. (อีก 3 ปี)
                            </li>
                            <li>• <b>อัตราส่วนสำคัญ:</b> ภาระผ่อนชำระหนี้ 18.2% | สภาพคล่อง 1.8 เดือน (ต่ำกว่าเกณฑ์)</li>
                            <li>• <b>คะแนนความสำเร็จ AI:</b> ปัจจุบัน 65.9% ➡️ Proposed 85.9%</li>
                        </ul>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-pink-700 block mb-2 underline">ข้อมูลเชิงคุณภาพ (Qualitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>สถานะ:</b> วัยสร้างตัว เป็นแม่เลี้ยงเดี่ยวดูแลคนในอุปการะ 2 คน</li>
                            <li>• <b>อาชีพ:</b> เกษตรกร (รายได้มีความผันผวนตามฤดูกาล/ไม่มีสวัสดิการ)</li>
                            <li>• <b>พฤติกรรมหนี้:</b> พึ่งพาสินเชื่อและใช้บัตรเครดิตแล้วจ่ายคืนขั้นต่ำ (Minimum Payer) ทำให้ภาระหนี้ไม่ลดลง</li>
                            <li>• <b>ระดับความเสี่ยง:</b> เสี่ยงได้ค่อนข้างสูง (Moderate Aggressive) เพื่อเร่งสร้างฐานะ</li>
                            <li>• <b>ลักษณะทางจิตวิทยา:</b> มีความตั้งใจสูงแต่ขาดเครื่องมือปกป้องรายได้ (Underinsured)</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">🔍</span> 2. การวิเคราะห์จุดแข็งและจุดเปราะบาง (Fact Finding & Pain Point)
                </h4>
                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div class="flex gap-4">
                        <div class="shrink-0 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">✓</div>
                        <div>
                            <b class="text-emerald-800">จุดแข็ง (AI Reality Check):</b> 
                            <p class="mt-1">อายุเพียง 33 ปี มีระยะเวลาลงทุนอีก 27 ปีก่อนเกษียณ และยังมีสินทรัพย์สภาพคล่อง (เงินฝาก) ที่มากพอจะนำมาเป็นต้นทุนในการปิดความเสี่ยงหรือชำระหนี้ดอกเบี้ยสูงเพื่อหยุดรอยรั่วได้ทันที</p>
                        </div>
                    </div>
                    <div class="flex gap-4 border-t border-slate-200 pt-4">
                        <div class="shrink-0 w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">!</div>
                        <div>
                            <b class="text-rose-800">Pain Point (จุดเปราะบางแบบซ่อนเร้น):</b> 
                            <p class="mt-1">1. <b>กับดักหนี้ขั้นต่ำ (Minimum Payment Trap):</b> แม้หนี้จะไม่สูงมาก (2.8 แสน) แต่กระแสเงินสดที่ติดลบเดือนละ 5,000 บาท เกิดจากการจ่ายดอกเบี้ยบัตรเครดิตที่ไร้จุดจบ หากไม่ปรับพฤติกรรม แผนซื้อบ้านใน 3 ปีจะเป็นไปไม่ได้</p>
                            <p class="mt-1">2. <b>ความเสี่ยงเสาหลักเดียว (Single Point of Failure):</b> ขาดความคุ้มครองทุกมิติ (Health Gap 6.8 ล้าน, Life Gap 9.2 ล้าน) หากคุณจอยทำงานไม่ได้เนื่องจากป่วยหรืออุบัติเหตุ รายได้ของครอบครัวจะกลายเป็นศูนย์ทันที</p>
                            <p class="mt-1">3. <b>วิกฤตความต่อเนื่อง (Lapse Risk):</b> ระบบเตือนความเสี่ยงทิ้งกรมธรรม์สูงถึง 81.33% หากเสนอแผนที่เบี้ยสูงเกินไป จะทำให้ลูกค้าส่งไม่ไหวในอนาคต</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-pink-800 border-b-2 border-pink-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">💡</span> 3. การนำเสนอทางออก (Strategic Solution)
                </h4>
                <div class="space-y-4">
                    <div class="bg-pink-900 text-pink-50 p-5 rounded-2xl shadow-xl">
                        <b class="text-rose-300 block mb-3">💬 สคริปต์การนำเสนอเชิงกลยุทธ์:</b>
                        <p class="text-sm leading-relaxed">
                            "คุณจอยครับ จากข้อมูลที่คุณจอยสู้เพื่อลูกทั้ง 2 คนมาตลอด ผมมองว่าจุดแข็งคือคุณจอยยังมีเงินเก็บก้อนหนึ่งที่เตรียมไว้เพื่ออนาคต... <br><br>
                            แต่ AI พบรอยรั่วที่น่าเป็นห่วงคือ <b>'กระแสเงินสดที่ติดลบเดือนละ 5,000 บาท'</b> จากการจ่ายหนี้ขั้นต่ำครับ ซึ่งมันกำลังไปดึงเงินจากเป้าหมายซื้อบ้านและทุนการศึกษาลูกออกมาใช้ ทางออกแรกคือเราต้องนำเงินออมบางส่วนมาปิดหนี้บัตรเครดิต เพื่อให้กระแสเงินสดกลับมาเป็นบวกครับ<br><br>
                            และในฐานะคุณแม่ที่เป็นเสาหลักเดียว ผมขอเสนอให้ทำ <b>'สวัสดิการคุ้มครองรายได้'</b> ผ่านแผน <b>AIA Pay Life Plus</b> เบี้ยเริ่มต้นเพียง 24,798 บ./ปี (ประมาณ 2,000/เดือน) เพื่ออุดช่องว่างความเสี่ยง 9.2 ล้านบาทให้ครอบครัว... วิธีนี้จะช่วยเปลี่ยนความกังวลให้เป็นความชัวร์ว่า ลูกทั้ง 2 คนจะมีทุนการศึกษา และคุณจอยจะมีเงินรักษาตัวเองโดยไม่ต้องกู้หนี้เพิ่มครับ"
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-emerald-800 border-b-2 border-emerald-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">⚖️</span> 4. การประเมินความคุ้มค่า (Trade-off vs Risk)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                        <b class="text-emerald-800 block mb-2">➕ ผลกระทบเชิงบวก (The Leap)</b>
                        <p class="text-xs">คะแนนความสำเร็จจะก้าวกระโดดขึ้น <b>+20.0%</b> (สู่ 85.9%) ทันทีที่ปรับโครงสร้างหนี้และสร้างวินัยการออม 20% ตามที่ AI แนะนำ พอร์ตลงทุนจะกลับมาเติบโตและรองรับเป้าหมายทุนการศึกษาบุตรได้ตามแผน 1 ล้านบาทในอีก 10 ปีข้างหน้า</p>
                    </div>
                    <div class="bg-rose-50 p-5 rounded-2xl border border-rose-200">
                        <b class="text-rose-800 block mb-2">➖ ผลกระทบเชิงลบ & ความเสี่ยง (The Cost)</b>
                        <p class="text-xs"><b>Trade-off:</b> คุณจอยจะต้องแลกด้วยการ <b>"ชะลอเป้าหมายดาวน์บ้าน"</b> ออกไป เพื่อนำสภาพคล่องที่มีไปจัดการหนี้สินและอุดรอยรั่วความเสี่ยงก่อน<br>
                        <b>Risk Scenario:</b> หากเลือกที่จะออมเพื่อซื้อบ้านเพียงอย่างเดียวโดยไม่ทำประกัน หากล้มป่วยเพียงครั้งเดียว เงินดาวน์บ้านทั้งหมดจะมลายหายไปกับค่าหมอ และภาระหนี้เดิมจะกลายเป็นวิกฤตของลูกทันที</p>
                    </div>
                </div>
            </section>

            <div class="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden mt-6">
                <div class="absolute right-0 bottom-0 opacity-10 text-9xl">👩‍👧‍👦</div>
                <h5 class="text-pink-400 font-bold mb-2">5. Final Conclusion for FA:</h5>
                <p class="text-xs text-slate-300 leading-relaxed">
                    เป้าหมายหลักในเคสคุณจอยคือ <b>"หยุดเลือด และสร้างเกราะ"</b> <br>
                    เกษตรกรและแม่เลี้ยงเดี่ยวต้องการความอุ่นใจ (Security) มากกว่ากำไรหวือหวา <b>"ห้ามขายสินค้าการลงทุนแบบ Aggressive"</b> จนกว่าหนี้จะหมด สิ่งที่ FA ต้องทำคือ 1. แนะนำให้ปิดหนี้บัตรด้วยเงินออมที่มีเพื่อแก้ Cash Flow 2. เสนอประกันสุขภาพและชีวิตในงบที่ลูกค้ายอมรับได้ (Low Premium, High Cover) เพื่อให้คุณจอยเดินหน้าสร้างฝันให้ลูกได้อย่างสบายใจที่สุดครับ
                </p>
            </div>
        </div>
        `
    },
    // ==========================================
    // 🏋️ กรณีศึกษาที่ 7: เดอะแบก (Sandwich Generation) / ฟรีแลนซ์หนี้สูง -> category: "c5"
    // ==========================================
    "c5_case_jin_sandwich": {
        category: "c5",
        icon: "🏋️",
        iconClass: "bg-orange-100 text-orange-700",
        title: "Case Study: คุณจิณณ์ (วัย 40 ปี) - เดอะแบก/ฟรีแลนซ์ (Sandwich Generation)",
        content: `
        <div class="antialiased touch-manipulation pb-safe space-y-8 text-sm text-gray-700 leading-relaxed">
            
            <section>
                <div class="bg-gradient-to-r from-orange-600 to-stone-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden mb-6">
                    <div class="absolute -right-4 -top-4 text-7xl opacity-10 select-none pointer-events-none">🛡️</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10 text-orange-200">การวิเคราะห์กลุ่ม Sandwich Gen: ปกป้องเสาหลักและจัดระเบียบหนี้ (Breadwinner Protection)</h3>
                    <p class="text-gray-200 text-sm relative z-10 leading-relaxed">
                        <b>วิเคราะห์โปรไฟล์:</b> คุณจิณณ์ อายุ 40 ปี อาชีพช่างภาพ/กราฟิกดีไซน์ เป็น "เดอะแบก" ที่ต้องดูแลครอบครัวถึง 3 ท่าน <b>ไม่มีสวัสดิการ</b> มีพฤติกรรมหมุนเงินชนเดือน และพึ่งพาสินเชื่อค่อนข้างสูง<br>
                        <b>โจทย์ของ FA:</b> ลูกค้าแบกภาระหนี้ก้อนโตรวมกว่า 3.56 ล้านบาท กระแสเงินสดติดลบทุกเดือน หากเสาหลักล้มเพียงคนเดียวจะเกิดสภาวะล้มละลายทั้งครอบครัว FA ต้องใช้ <b>"กฎหน้ากากออกซิเจน"</b> คือต้องเร่งอุดรอยรั่วและป้องกันชีวิตคนหารายได้ก่อนการลงทุนเสี่ยง
                    </p>
                </div>

                <h4 class="font-bold text-lg text-orange-800 border-b-2 border-orange-100 pb-2 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📝</span> 1. การสรุปข้อมูลภาพรวม (Client Profile Recap)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-orange-700 block mb-2 underline">ข้อมูลเชิงปริมาณ (Quantitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>งบดุล (Balance Sheet):</b> ทรัพย์สินรวม 8,870,000.00 บาท | หนี้สินรวม 3,568,500.00 บาท <br><span class="text-emerald-600 font-bold">(ความมั่งคั่งสุทธิ: 5,301,500.00 บาท)</span></li>
                            <li>• <b>งบกระแสเงินสด (Cash Flow):</b> รายรับ 94,000.00 บ./เดือน | รายจ่ายรวม 106,600.00 บ./เดือน <br><span class="text-rose-500 font-bold">(กระแสเงินสดติดลบ: -12,600.00 บ./เดือน)</span></li>
                            <li>• <b>พอร์ตการลงทุนปัจจุบัน (4.25 ลบ.):</b> PVD 850K, RMF 490K, Thai ESG 325K, SSF 165K, กองทุนผสม 1.36M, ตราสารหนี้ 910K</li>
                            <li>• <b>พอร์ตกรมธรรม์ปัจจุบัน:</b> ไม่มีข้อมูลกรมธรรม์ปัจจุบัน</li>
                            <li>• <b>เป้าหมายการเงิน (SMART Goals):</b> <br>
                                - ทุนการศึกษาบุตร 3,000,000 บ. (อีก 13 ปี)<br>
                                - ซื้อที่อยู่อาศัย 2,400,000 บ. (อีก 6 ปี)
                            </li>
                            <li>• <b>อัตราส่วนสำคัญ:</b> ภาระหนี้ 53.7% | สภาพคล่อง 0.9 ด.</li>
                            <li>• <b>คะแนนความสำเร็จ AI:</b> ปัจจุบัน 40.7% ➡️ Proposed 85.9%</li>
                        </ul>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <b class="text-orange-700 block mb-2 underline">ข้อมูลเชิงคุณภาพ (Qualitative)</b>
                        <ul class="space-y-2 text-xs mt-2">
                            <li>• <b>สถานะ:</b> วัยทำงานสร้างตัว เป็น Sandwich Gen รับอุปการะ 3 ชีวิต</li>
                            <li>• <b>อาชีพ:</b> ฟรีแลนซ์ (ช่างภาพ/กราฟิกดีไซน์) วัย 40 ปี</li>
                            <li>• <b>สวัสดิการ:</b> ไม่มีสวัสดิการ (จ่ายเอง/บัตรทอง)</li>
                            <li>• <b>พฤติกรรมหนี้:</b> แม้จะมีการกู้เงินระยะสั้นและรูดบัตรเครดิต แต่มีวินัยจ่ายคืนเต็มจำนวนได้ทุกครั้ง ทว่ายังคงหมุนเงินชนเดือน (Paycheck to Paycheck) และละเลยความคุ้มครอง</li>
                            <li>• <b>ระดับความเสี่ยง:</b> เสี่ยงปานกลางค่อนข้างต่ำ (Moderate Conservative)</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">🔍</span> 2. การวิเคราะห์จุดแข็งและจุดเปราะบาง (Fact Finding & Pain Point)
                </h4>
                <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div class="flex gap-4">
                        <div class="shrink-0 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">✓</div>
                        <div>
                            <b class="text-emerald-800">จุดแข็ง (AI Reality Check):</b> 
                            <p class="mt-1">ลูกค้ามีวินัยการออมสูงมาก (หักออมทันทีที่ได้เงิน) รวมถึงความมั่งคั่งสุทธิยังเป็นบวกกว่า 5.3 ล้านบาท หากจัดพอร์ตและโอนย้ายหนี้ได้ จะฟื้นตัวเร็วมาก</p>
                        </div>
                    </div>
                    <div class="flex gap-4 border-t border-slate-200 pt-4">
                        <div class="shrink-0 w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">!</div>
                        <div>
                            <b class="text-rose-800">Pain Point (จุดเปราะบางแบบซ่อนเร้น):</b> 
                            <p class="mt-1">1. <b>วิกฤตสภาพคล่องซ้อนทับ:</b> กระแสเงินสดติดลบ -12,600 บ./เดือน มีเงินสำรองฉุกเฉินเพียง 0.9 เดือน ต่ำกว่าเกณฑ์ที่ควรมี</p>
                            <p class="mt-1">2. <b>รอยรั่วความเสี่ยง (Risk Gap):</b> ขาดความคุ้มครองกว่า 20.38 ล้านบาท โดยแยกเป็นค่ารักษาพยาบาลที่ต้องเตรียมเอง 7.1 ล้านบาท และทุนประกันครอบครัว 13.14 ล้านบาท</p>
                            <p class="mt-1">3. <b>ความเสี่ยงทิ้งกรมธรรม์ (Lapse Risk):</b> ด้วยภาระหนี้เดิม 54% หากยัดเยียดให้ซื้อกรมธรรม์เบี้ยแพง ลูกค้ามีความเสี่ยงหยุดชำระเบี้ยถึง 81.46%</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-orange-800 border-b-2 border-orange-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">💡</span> 3. การนำเสนอทางออก (Strategic Solution)
                </h4>
                <div class="space-y-4">
                    <div class="bg-orange-900 text-orange-50 p-5 rounded-2xl shadow-xl">
                        <b class="text-amber-300 block mb-3">💬 สคริปต์การนำเสนอเชิงกลยุทธ์:</b>
                        <p class="text-sm leading-relaxed">
                            "คุณจิณณ์ครับ จากการประมวลผลงบดุลและกระแสเงินสดของคุณ ผมขอชื่นชมวินัยการเงินที่ทำให้คุณมีความมั่งคั่งสุทธิสะสมกว่า 5.3 ล้านบาท <br><br>
                            แต่ AI ส่งสัญญาณเตือนถึง <b>'วิกฤตสภาพคล่องซ้อนทับ'</b> ครับ ภาระหนี้สินของคุณกินพื้นที่ไป 53.7% ทำให้เงินในแต่ละเดือนติดลบอยู่ -12,600 บาท ทางแก้ขั้นแรกสุด คือเราต้องรัดเข็มขัด ลดงบใช้จ่ายรายเดือนลง 300 บาท แล้วดึงเงินไปจัดระเบียบใหม่ (Debt Snowball) ให้หนี้เหลือไม่เกิน 40%<br><br>
                            นอกจากนี้ ในฝั่งความมั่นคง คุณจิณณ์ยังขาดสวัสดิการสุขภาพ หากล้มป่วย พอร์ตลงทุน 4.1 ล้าน จะละลายหายไปกับค่ารักษาแน่ๆ ผมจึงขอเสนอแผนอุดรอยรั่วนี้ด้วย <b>AIA Pay Life Plus</b> เบี้ยเบาๆ เริ่มต้นเพียง 24,798 บ./ปี หรือ <b>AIA Smart Select</b> เพื่อโอนความเสี่ยงสุขภาพและปกป้องครอบครัวทั้ง 3 ท่านครับ"
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h4 class="font-bold text-lg text-emerald-800 border-b-2 border-emerald-100 pb-2 mb-4 flex items-center gap-2 mt-6">
                    <span class="text-2xl">⚖️</span> 4. การประเมินความคุ้มค่า (Trade-off vs Risk)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                        <b class="text-emerald-800 block mb-2">➕ ผลกระทบเชิงบวก (The Leap)</b>
                        <p class="text-xs">โอกาสสำเร็จในการไปถึงเป้าหมายทางการเงิน ทะยานขึ้นจาก 40.7% สู่ <b>85.9%</b> อย่างชัดเจน นอกจากนี้ พอร์ตการลงทุนของคุณจะทำหน้าที่เป็น Shock Absorber รองรับวิกฤตเศรษฐกิจ ช่วยลดการขาดทุนหนักๆ ได้</p>
                    </div>
                    <div class="bg-rose-50 p-5 rounded-2xl border border-rose-200">
                        <b class="text-rose-800 block mb-2">➖ ผลกระทบเชิงลบ & ความเสี่ยง (The Cost)</b>
                        <p class="text-xs"><b>Trade-off:</b> เนื่องจากทรัพยากรกระแสเงินสดติดลบ คุณจะต้องแลกมาด้วยการ <b>"ยืดระยะเวลาเป้าหมายทุนการศึกษาและดาวน์บ้าน"</b> ออกไปอีกอย่างน้อย 1-3 ปี หรือต้องปรับลดสเปกลง<br>
                        <b>Risk Scenario:</b> หากเลือกลงทุนอย่างก้าวร้าว (Aggressive FIRE) ในจังหวะที่โชคร้าย (CVaR Worst 5%) พอร์ตจะติดลบดิ่งลงถึง -58.8% ในปีที่ 5 ซึ่งเป็นอันตรายอย่างยิ่งสำหรับคนเป็นเสาหลัก</p>
                    </div>
                </div>
            </section>

            <div class="bg-slate-800 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden mt-6">
                <div class="absolute right-0 bottom-0 opacity-10 text-9xl">🎯</div>
                <h5 class="text-orange-400 font-bold mb-2">5. Final Conclusion for FA:</h5>
                <p class="text-xs text-slate-300 leading-relaxed">
                    เป้าหมายหลักในเคสคุณจิณณ์คือ <b>S-Style (Focus on Security)</b> และ <b>C-Style (ยุทธการปลดหนี้)</b> <br>
                    <b>"ห้ามโฟกัสพอร์ตสินทรัพย์เสี่ยง (Tax & Investment)"</b> เพราะฐานภาษีแค่ 5% ไม่คุ้มค่าที่จะเสียสภาพคล่องไปลง RMF/SSF สิ่งที่ FA ต้องทำคือ 1. ชะลอการลงทุนในสินทรัพย์เสี่ยง 2. เน้นจัดการหนี้เพื่อหยุดเลือด 3. สร้างเบาะรองรับฉุกเฉิน (Oxygen Buffer) เพื่อการันตีความปลอดภัยของ 3 ชีวิตข้างหลังเป็นอันดับแรกครับ
                </p>
            </div>
        </div>
        `
    }
};
// ==========================================
// 🚀 ระบบ Render คู่มือแบบ 4 Pillars UI (Premium Accent Style)
// ==========================================

const kbCategories = [
    { 
        id: "c1", title: "ส่วนที่ 1: บทนำและวิสัยทัศน์", subtitle: "Vision & Introduction", desc: "เป้าหมาย วิสัยทัศน์ และการปกป้องข้อมูลส่วนบุคคล (PDPA)", icon: "🎯", 
        gradient: "from-emerald-400 to-teal-500",
        colorClass: { text: "text-emerald-600", textHover: "group-hover:text-emerald-600", textHoverDark: "group-hover:text-emerald-700", bg: "bg-emerald-50", bgHover: "group-hover:bg-emerald-50", borderTop: "border-t-emerald-500", borderHover: "group-hover:border-emerald-200" }
    },
    { 
        id: "c2", title: "ส่วนที่ 2: คู่มือปฏิบัติการฉบับสมบูรณ์", subtitle: "User Manual", desc: "เทคนิคการกรอกข้อมูล CRM การตั้งค่า และฟังก์ชันหน้าจอต่างๆ", icon: "💻", 
        gradient: "from-blue-500 to-indigo-500",
        colorClass: { text: "text-blue-600", textHover: "group-hover:text-blue-600", textHoverDark: "group-hover:text-blue-700", bg: "bg-blue-50", bgHover: "group-hover:bg-blue-50", borderTop: "border-t-blue-500", borderHover: "group-hover:border-blue-200" }
    },
    { 
        id: "c3", title: "ส่วนที่ 3: สถาปัตยกรรมสมองกล", subtitle: "AI Architecture", desc: "เจาะลึกโครงสร้าง Machine Learning (DNN, K-Means, XAI)", icon: "🧠", 
        gradient: "from-purple-500 to-fuchsia-500",
        colorClass: { text: "text-purple-600", textHover: "group-hover:text-purple-600", textHoverDark: "group-hover:text-purple-700", bg: "bg-purple-50", bgHover: "group-hover:bg-purple-50", borderTop: "border-t-purple-500", borderHover: "group-hover:border-purple-200" }
    },
    { 
        id: "c4", title: "ส่วนที่ 4: แบบจำลอง & ทฤษฎี", subtitle: "Models & Theories", desc: "คณิตศาสตร์การเงิน CFP Ratios และเศรษฐศาสตร์พฤติกรรม", icon: "🧮", 
        gradient: "from-orange-400 to-rose-400",
        colorClass: { text: "text-orange-600", textHover: "group-hover:text-orange-600", textHoverDark: "group-hover:text-orange-700", bg: "bg-orange-50", bgHover: "group-hover:bg-orange-50", borderTop: "border-t-orange-500", borderHover: "group-hover:border-orange-200" }
    },
    { 
        id: "c_aidapc", title: "ส่วนที่ 5: คู่มือ AiDAPC V5.0", subtitle: "Executive Diagnostics", desc: "เจาะลึกกระบวนการวิเคราะห์ 3D Risk Gap และ Product Matrix", icon: "💡", 
        gradient: "from-fuchsia-500 to-pink-500",
        colorClass: { text: "text-fuchsia-600", textHover: "group-hover:text-fuchsia-600", textHoverDark: "group-hover:text-fuchsia-700", bg: "bg-fuchsia-50", bgHover: "group-hover:bg-fuchsia-50", borderTop: "border-t-fuchsia-500", borderHover: "group-hover:border-fuchsia-200" }
    },
    { 
        id: "c5", title: "ส่วนที่ 6: กรณีศึกษาจากรายงาน AI", subtitle: "Real-World Case Studies", desc: "เทคนิคเจรจาปิดการขายลูกค้าด้วยรายงาน AI", icon: "👑", 
        gradient: "from-amber-500 to-yellow-600",
        colorClass: { text: "text-amber-600", textHover: "group-hover:text-amber-600", textHoverDark: "group-hover:text-amber-700", bg: "bg-amber-50", bgHover: "group-hover:bg-amber-50", borderTop: "border-t-amber-500", borderHover: "group-hover:border-amber-200" }
    }
];

window.currentKBCategory = null;

window.renderManualKnowledgeBase = function() {
    const container = document.getElementById('manual_knowledge_base');
    if (!container) return;
    const dictData = window.systemDictionary;
    
    if (!dictData) {
        container.innerHTML = `
            <div class="p-10 text-center flex flex-col items-center justify-center mt-10">
                <span class="text-6xl mb-4 opacity-50">⚠️</span>
                <h3 class="text-2xl font-bold text-red-500 mb-2">ไม่สามารถดึงข้อมูลคู่มือได้</h3>
                <p class="text-gray-500 text-sm leading-relaxed">ระบบไม่พบตัวแปร <b>systemDictionary</b></p>
            </div>`;
        return;
    }

    if (window.currentKBCategory === null) {
        // 📌 แสดงหน้า 4 การ์ดหลัก (Accent Border & Elevated Shadow)
        let html = `
            <div class="p-6 md:p-12 min-h-full flex flex-col items-center bg-slate-100/50">
                
                <!-- Header -->
                <div class="text-center mb-10 max-w-2xl mx-auto animate-fade-in">
                    <div class="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest mb-3 border border-indigo-200 shadow-sm uppercase">Knowledge Base</div>
                    <h2 class="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">ศูนย์รวมองค์ความรู้ <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">FA</span></h2>
                    <p class="text-xs md:text-sm text-slate-500 font-medium">โปรดเลือกหมวดหมู่เพื่อศึกษาคู่มือและสถาปัตยกรรมระบบ</p>
                </div>

                <!-- 4 Pillars Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto w-full animate-fade-in">
        `;
        
        kbCategories.forEach(cat => {
            html += `
                <div onclick="openKBCategory('${cat.id}')" class="group relative bg-white p-6 rounded-[1.5rem] cursor-pointer transition-all duration-300 border border-slate-200 border-t-4 ${cat.colorClass.borderTop} shadow-md hover:shadow-xl hover:-translate-y-1.5 overflow-hidden flex flex-col h-full">
                    
                    <div class="absolute -right-16 -top-16 w-40 h-40 bg-gradient-to-br ${cat.gradient} opacity-[0.05] group-hover:opacity-[0.12] rounded-full blur-3xl transition-all duration-500 pointer-events-none"></div>
                    <div class="absolute -bottom-6 -right-6 text-8xl opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-500 transform rotate-12 pointer-events-none">${cat.icon}</div>

                    <div class="relative z-10 flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center text-3xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 border border-white/20">
                            ${cat.icon}
                        </div>
                        <div>
                            <p class="text-[10px] ${cat.colorClass.text} font-extrabold uppercase tracking-widest leading-none mb-1.5 opacity-90">${cat.subtitle}</p>
                            <h3 class="text-base md:text-lg font-bold text-slate-800 leading-tight ${cat.colorClass.textHoverDark} transition-colors">${cat.title}</h3>
                        </div>
                    </div>
                    
                    <div class="relative z-10 flex-grow mb-4">
                        <p class="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">${cat.desc}</p>
                    </div>

                    <div class="relative z-10 flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                        <span class="text-xs font-bold text-slate-400 ${cat.colorClass.textHover} transition-colors tracking-wide flex items-center gap-1">เปิดอ่านรายละเอียด</span>
                        <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center ${cat.colorClass.bgHover} text-slate-400 ${cat.colorClass.textHover} transition-all duration-300 border border-slate-100 ${cat.colorClass.borderHover} group-hover:translate-x-1 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
        container.innerHTML = html;
        
    } else {
        // 📌 แสดงเนื้อหาภายในหมวดหมู่ที่เลือก (List View)
        const catInfo = kbCategories.find(c => c.id === window.currentKBCategory);
        
        // Sticky Header แบบ Glassmorphism กระทัดรัด
        let html = `
            <div class="sticky top-0 z-20 bg-white/85 backdrop-blur-lg border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm animate-fade-in">
                <button onclick="window.currentKBCategory = null; renderManualKnowledgeBase();" 
                    class="text-slate-600 hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm border border-slate-200/50 flex-shrink-0" 
                    title="ย้อนกลับ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span class="text-xs font-bold">ย้อนกลับ</span>
                </button>
                <div class="flex flex-col">
                    <span class="text-[9px] font-bold text-${catInfo.color}-600 uppercase tracking-wider leading-none mb-0.5">${catInfo.subtitle}</span>
                    <h3 class="text-sm font-bold text-slate-800 flex items-center gap-1.5 leading-none"><span class="drop-shadow-sm text-base">${catInfo.icon}</span> <span class="tracking-tight truncate">${catInfo.title}</span></h3>
                </div>
            </div>
            <div class="bg-slate-50/50 pb-10 animate-fade-in">
        `;
        
        // วนลูปดึงเฉพาะเนื้อหาที่ตรงกับ Category
        let contentCount = 0;
        for (const [key, data] of Object.entries(dictData)) {
            if (data.category !== window.currentKBCategory) continue;
            contentCount++;
            
            let iconTheme = data.iconClass || 'bg-indigo-50 text-indigo-600';
            
            html += `
            <section class="p-5 md:p-8 border-b border-slate-200 bg-white">
                <div class="flex items-center gap-3 mb-5 border-b border-slate-50 pb-4">
                    <div class="w-10 h-10 bg-gradient-to-br ${catInfo.gradient} text-white rounded-xl flex items-center justify-center text-xl shadow-md border border-white/20 flex-shrink-0">${data.icon}</div>
                    <h3 class="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight leading-tight">${data.title}</h3>
                </div>
                <div class="text-sm text-slate-700 leading-relaxed custom-manual-styling">
                    ${data.content}
                </div>
            </section>
            `;
        }

        if (contentCount === 0) {
            html += `<div class="p-10 text-center text-slate-500 font-medium">กำลังปรับปรุงเนื้อหาในส่วนนี้...</div>`;
        }
        
        html += `</div>`;
        container.innerHTML = html;
    }
};

window.openKBCategory = function(catId) {
    window.currentKBCategory = catId;
    window.renderManualKnowledgeBase();
    
    // ดันหน้าจอ Scroll กลับไปบนสุดของ Modal เสมออย่างนุ่มนวล
    const scrollContainer = document.getElementById('manualModal').querySelector('.overflow-y-auto');
    if (scrollContainer) {
        scrollContainer.scrollTo({top: 0, behavior: 'smooth'});
    }
};

// Export (หากใช้งานผ่าน Webpack/Node)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { systemDictionary };
}
