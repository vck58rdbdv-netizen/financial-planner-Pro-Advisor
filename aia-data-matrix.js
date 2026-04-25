// ==========================================
// 🧠 1. UNIFIED AIA PRODUCT MATRIX (Hyper-Realistic Upgraded + Tax & Age DNA)
// ฐานข้อมูลสัญญาหลัก (Base Plan)
// ==========================================
const aiaBaseProductMatrix = {
    "AIA 20 Pay Life": { 
        type: "WholeLife", minSA: 100000, maxSA: 9999999, builtInRiders: ["WP"], coverageYears: 99, payYears: 20, minAge: 0, maxAge: 70, 
        fallback: "AIA Life Protector 70",
        highlight: "ชำระเบี้ยคงที่ 20 ปี คุ้มครองยาวนานตลอดชีพ สร้างหลักประกันก้อนใหญ่ให้ครอบครัวแบบพื้นฐาน",
        indications: ["วัยทำงานสร้างครอบครัว", "คุ้มครองรายได้ระยะยาว", "ต้องการความแน่นอนไม่ผันผวน"],
        features: { flex: 2, growth: 0, guar: 10, lev: 6 },
        taxDeductible: "Full"
    },
    "AIA Pay Life Plus (20 Pay)": { 
        type: "WholeLife", minSA: 150000, maxSA: 9999999, builtInRiders: ["WPCI", "TI"], coverageYears: 99, payYears: 20, minAge: 0, maxAge: 75, 
        fallback: "AIA 20 Pay Life",
        highlight: "จ่ายสั้น 20 ปี คุ้มครองถึงอายุ 99 ปี พร้อมสวัสดิการ WPCI ยกเว้นชำระเบี้ยหากตรวจพบโรคร้ายแรง",
        indications: ["สร้างมรดกเงินสดที่มูลค่าไม่ลดลง", "หัวหน้าครอบครัวที่ต้องการความอุ่นใจระยะยาว", "วางรากฐานเพื่อพ่วงประกันสุขภาพยาวถึงวัยเกษียณ"],
        features: { flex: 2, growth: 0, guar: 10, lev: 7 },
        taxDeductible: "Full"
    },
    "AIA Life Protector 70": { 
        type: "Term", minSA: 350000, maxSA: 5000000, builtInRiders: [], coverageYears: 70, payYears: 70, minAge: 20, maxAge: 59, 
        fallback: "AIA 20 Pay Life",
        highlight: "เน้นความคุ้มครองชีวิตสูงลิ่วในราคาประหยัด จ่ายเบี้ยคงที่ เพื่อปิดความเสี่ยงก้อนใหญ่ในช่วงสร้างตัว",
        indications: ["เสาหลักของครอบครัว (The Breadwinner)", "ต้องการความคุ้มครองเพื่อปิดภาระหนี้สินบ้าน/รถ", "ใช้เป็นสัญญาหลักคุมงบเพื่อพ่วงประกันสุขภาพ"],
        features: { flex: 0, growth: 0, guar: 10, lev: 10 },
        taxDeductible: "Full" 
    },
    "AIA Endowment 15/25": { 
        type: "Saving", minSA: 100000, maxSA: Infinity, builtInRiders: [], coverageYears: 25, payYears: 15, minAge: 0, maxAge: 70, 
        fallback: "AIA 20 Pay Life",
        highlight: "ออมเงินอย่างมีระเบียบ การันตีเงินก้อนคืนเมื่อครบสัญญา ควบคู่ไปกับการยกระดับความคุ้มครองชีวิต",
        indications: ["เตรียมทุนการศึกษาบุตรระยะยาว", "สร้างเงินก้อนกึ่งเกษียณ (Pre-Retirement Fund)", "บังคับออมเงินสำหรับคนเก็บเงินไม่อยู่"],
        features: { flex: 1, growth: 2, guar: 10, lev: 1 },
        taxDeductible: "Full"
    },
    "AIA Excellent 20/20": { 
        type: "Saving", minSA: 100000, maxSA: Infinity, builtInRiders: [], coverageYears: 20, payYears: 20, minAge: 0, maxAge: 75, 
        fallback: "AIA 20 Pay Life",
        highlight: "มีเงินคืนทุกปีช่วยบริหารสภาพคล่อง พร้อมโอกาสรับเงินปันผล และสิทธิประโยชน์ลดหย่อนภาษีต่อเนื่อง 20 ปี",
        indications: ["ต้องการเงินคืนระหว่างทางเพื่อบริหารสภาพคล่อง", "การวางแผนภาษีแบบยาวต่อเนื่องทำครั้งเดียวจบ", "ต้องการความคุ้มครองชีวิตที่สูงกว่าแบบออมระยะสั้น"],
        features: { flex: 1, growth: 3, guar: 10, lev: 2 },
        taxDeductible: "Full"
    },
    "AIA Annuity Sure": { 
        type: "Annuity", minSA: 100000, maxSA: Infinity, builtInRiders: [], coverageYears: 90, payYears: 60, minAge: 20, maxAge: 55, 
        fallback: "AIA 20 Pay Life",
        highlight: "บำนาญการันตีเงินคืน 15% ทุกปีหลังเกษียณ ปิดความเสี่ยงเรื่องการอายุยืน (Longevity Risk)",
        indications: ["ปิดความเสี่ยงเงินหมดก่อนตาย", "ต้องการฐานรายได้ที่แน่นอน (Guaranteed Floor Income)", "ใช้สิทธิลดหย่อนภาษีส่วนที่สอง (2 แสนหลัง)"],
        features: { flex: 1, growth: 4, guar: 10, lev: 2 },
        taxDeductible: "Annuity"
    },
    "AIA Annuity Fix": { 
        type: "Annuity", minSA: 200000, maxSA: Infinity, builtInRiders: [], coverageYears: 85, payYears: 60, minAge: 20, maxAge: 55, 
        fallback: "AIA 20 Pay Life",
        highlight: "เปลี่ยนเงินก้อนเป็นรายได้ประจำ ยอดเงินบำนาญคงที่ 100% ชัดเจนตั้งแต่วันแรก ไร้ความผันผวน",
        indications: ["มีเงินก้อนแต่ต้องการเปลี่ยนเป็นรายได้ประจำ", "การวางแผนภาษีโค้งสุดท้ายสำหรับผู้มีรายได้สูง", "ต้องการความชัวร์ 100% ไม่ชอบความเสี่ยงตลาดหุ้น"],
        features: { flex: 1, growth: 3, guar: 10, lev: 2 },
        taxDeductible: "Annuity"
    },
    "AIA Senior Happy": { 
        type: "WholeLife_Senior", minSA: 50000, maxSA: 200000, builtInRiders: [], coverageYears: 90, payYears: 90, minAge: 50, maxAge: 70, 
        fallback: "AIA 20 Pay Life",
        highlight: "ประกันเพื่อผู้สูงวัย สมัครง่าย ไม่ต้องตรวจและไม่ต้องตอบคำถามสุขภาพ (Guaranteed Acceptance)",
        indications: ["ผู้สูงอายุที่มีปัญหาสุขภาพหรือโรคประจำตัว", "การวางแผนค่าใช้จ่ายสุดท้ายของชีวิต (Final Expense)", "ต้องการความสะดวกรวดเร็วในการสมัครให้พ่อแม่"],
        features: { flex: 2, growth: 0, guar: 10, lev: 3 },
        taxDeductible: "Full"
    },
    "AIA CI ProCare": { 
        type: "CIBase", minSA: 200000, maxSA: 8000000, builtInRiders: ["WPCI"], coverageYears: 99, payYears: 20, minAge: 0, maxAge: 60, 
        fallback: "AIA 20 Pay Life",
        highlight: "รับเงินก้อนไว้ชดเชยรายได้เมื่อป่วยหนัก เคลมโรคร้ายได้หลายครั้ง (Multi-Pay) ครอบคลุมตั้งแต่ระยะเริ่มต้น",
        indications: ["กังวลเรื่องรายได้ขาดมือเมื่อต้องหยุดงานรักษาตัว", "กลัวการกลับมาเป็นซ้ำของโรคร้าย (Recurrence)", "อุดช่องว่างของสวัสดิการพนักงานที่มีแค่ค่ารักษา"],
        features: { flex: 1, growth: 0, guar: 10, lev: 7 },
        taxDeductible: "Full"
    },
    "AIA CI SuperCare": { 
        type: "CIBase", minSA: 200000, maxSA: 4999999, builtInRiders: [], coverageYears: 99, payYears: 20, minAge: 0, maxAge: 65, 
        fallback: "AIA CI ProCare",
        highlight: "ประกันโรคร้ายแรงที่เป็นสัญญาหลัก เบี้ยคงที่ตลอดชีพ ไม่จ่ายทิ้ง มีมูลค่าเงินเวนคืนหากไม่เจ็บป่วย",
        indications: ["ต้องการจ่ายเบี้ยจบในวัยทำงานแต่คุ้มครองถึงวัยเกษียณ", "คนรักความคุ้มค่า ไม่ชอบจ่ายเบี้ยทิ้ง (Cash Value)", "การวางรากฐานคุ้มครองให้ลูกหลานตั้งแต่วัยเด็ก"],
        features: { flex: 1, growth: 0, guar: 10, lev: 8 },
        taxDeductible: "Full"
    },
    "AIA CI SuperCare Prestige": { 
        type: "CIBase_HNW", minSA: 5000000, maxSA: Infinity, builtInRiders: [], coverageYears: 99, payYears: 20, minAge: 0, maxAge: 65, 
        fallback: "AIA CI SuperCare",
        highlight: "คุ้มครองโรคร้ายแรงระดับ Top-Tier ทุนประกันระดับสูง พร้อมสิทธิพิเศษรับบริการดูแลแพทย์ระดับโลก (Medix)",
        indications: ["การปกป้องความมั่งคั่ง (Wealth Protection) ระดับสูง", "ต้องการบริการสวัสดิการรักษาพยาบาลเหนือระดับ", "เจ้าของธุรกิจที่ต้องการคุ้มครองบุคคลสำคัญ (Key Person)"],
        features: { flex: 1, growth: 0, guar: 10, lev: 8 },
        taxDeductible: "Full"
    },
    "AIA Issara Plus": { 
        type: "UnitLinked", minSA: 120000, maxSA: Infinity, minPremiumRPP: 12000, builtInRiders: [], coverageYears: 99, payYears: 99, minAge: 0, maxAge: 70, 
        fallback: "AIA 20 Pay Life",
        highlight: "ยืดหยุ่นสูงสุด ปรับจูนทุนชีวิตได้ตามรอบชีวิต (Life Stage) พ่วง UDR เพื่อล็อกเบี้ยสุขภาพให้คงที่ได้",
        indications: ["ชีวิตอยู่ในช่วงรอยต่อหรือมีการเปลี่ยนแปลงบ่อย", "ต้องการความคุ้มครองชีวิตสูงมากด้วยงบจำกัด (High Leverage)", "นักลงทุนที่ต้องการสวัสดิการสุขภาพแบบเบี้ยไม่พุ่งตามอายุ"],
        features: { flex: 10, growth: 8, guar: 2, lev: 8 },
        taxDeductible: "Partial" 
    },
    "AIA Smart Select": { 
        type: "UnitLinked", minSA: 500000, maxSA: Infinity, minPremiumRPP: 30000, builtInRiders: [], coverageYears: 99, payYears: 99, minAge: 0, maxAge: 70, 
        fallback: "AIA Issara Plus",
        highlight: "สมดุลระหว่างประกันและการลงทุน (Hybrid) เพิ่มโอกาสเติบโตผ่านกองทุนรวม สามารถถอนเงินหรือหยุดพักชำระเบี้ยได้",
        indications: ["เริ่มต้นวางแผนการเงินแบบ Hybrid (วัยทำงาน/First Jobber)", "ต้องการความยืดหยุ่นของกระแสเงินสด", "การออมเพื่อเป้าหมายระยะยาว (Goal-Based)"],
        features: { flex: 10, growth: 9, guar: 2, lev: 7 },
        taxDeductible: "Partial"
    },
    "AIA Smart Select Prestige": { 
        type: "UnitLinked_HNW", minSA: 10000000, maxSA: Infinity, builtInRiders: [], coverageYears: 99, payYears: 99, minAge: 0, maxAge: 70, 
        fallback: "AIA Smart Select",
        highlight: "ส่งต่อมรดกแบบเพิ่มค่า รับส่วนลดค่าการประกันภัย (COI) 10% พร้อมเข้าถึงบริการจัดการดูแลผู้ป่วยระดับโลก (Medix)",
        indications: ["การส่งต่อมรดกแบบเพิ่มค่า (Wealth Transfer & Growth)", "บริหารเงินก้อนใหญ่ให้มีประสิทธิภาพทางต้นทุนประกัน", "นักธุรกิจที่ต้องการยืดหยุ่นกระแสเงินสดตามวงจรเศรษฐกิจ"],
        features: { flex: 10, growth: 9, guar: 2, lev: 7 },
        taxDeductible: "Partial"
    },
    "AIA Legacy Prestige": { 
        type: "WholeLife_HNW", minSA: 10000000, maxSA: Infinity, builtInRiders: [], coverageYears: 99, payYears: 15, minAge: 18, maxAge: 65, 
        fallback: "AIA Pay Life Plus (20 Pay)",
        highlight: "สร้างกองมรดกที่การันตีมูลค่าแน่นอน 100% ปลอดความผันผวน เพื่อเตรียมเงินสดสำหรับการโอนและจ่ายภาษีมรดก",
        indications: ["การเตรียมกระแสเงินสดฉุกเฉินเพื่อจ่ายภาษีมรดก", "การจัดสรรรักษาสมดุลมรดก (Legacy Equalization)", "โอนย้ายความมั่งคั่งในสินทรัพย์ที่ปลอดภัยไร้ความเสี่ยง"],
        features: { flex: 2, growth: 0, guar: 10, lev: 5 },
        taxDeductible: "Full"
    },
    "AIA Legacy Prestige Plus": { 
        type: "WholeLife_HNW", minSA: 10000000, maxSA: Infinity, builtInRiders: ["WPCI", "TI"], coverageYears: 99, payYears: 20, minAge: 18, maxAge: 70, 
        fallback: "AIA Pay Life Plus (20 Pay)",
        highlight: "เหนือกว่าด้วยโอกาสรับเงินปันผล (Dividend) เพิ่มพูนมูลค่ามรดกให้เติบโตชนะเงินเฟ้อ พร้อมสิทธิพิเศษ Prestige",
        indications: ["การส่งต่อมรดกแบบเพิ่มพูนมูลค่าระยะยาว", "บริหารจัดการสภาพคล่องสำหรับสินทรัพย์ระดับ 100 ล้าน", "ล็อกความมั่งคั่งเพื่อสร้างตำนานให้แก่กงสีตระกูล"],
        features: { flex: 2, growth: 0, guar: 10, lev: 6 },
        taxDeductible: "Full"
    },
    "AIA Infinite Wealth Prestige": { 
        type: "UnitLinked_HNW", minSA: 15000000, maxSA: Infinity, builtInRiders: [], coverageYears: 99, payYears: 99, minAge: 18, maxAge: 70, 
        fallback: "AIA Smart Select Prestige",
        highlight: "Global Investment Wrap สร้างมรดกมหาศาลพร้อมโอกาสจัดพอร์ตลงทุนนอกประเทศผ่านบลจ.ระดับโลก และบริการ Medix",
        indications: ["การจัดพอร์ตสินทรัพย์ระดับโลก (Global Asset Allocation)", "มหาเศรษฐีที่ต้องการสร้างมรดกแบบทวีคูณ (Leverage)", "ต้องการโซลูชันดูแลสุขภาพระดับ Exclusive ทั่วโลก"],
        features: { flex: 10, growth: 10, guar: 1, lev: 8 },
        taxDeductible: "Partial"
    },
    "AIA Elite Income Prestige": { 
        type: "UnitLinked_HNW", minSA:  550000, maxSA: Infinity, minPremiumRPP: 500000, builtInRiders: [], coverageYears: 99, payYears: 5, minAge: 0, maxAge: 70, 
        fallback: "AIA Smart Select",
        highlight: "รับประกันแบบ GIO ไม่ต้องตรวจสุขภาพ จ่ายเบี้ยสั้น 5 ปี มี Auto-Redemption สร้าง Passive Income เสมือนรับเงินเดือน",
        indications: ["ลูกค้าที่มีปัญหาสุขภาพแต่อยากลงทุน (GIO)", "ต้องการสร้างกระแสเงินสดรายรับ (Passive Income) ทันที", "บริหารเงินเย็นก้อนใหญ่ในระยะเวลาจำกัดให้มีประสิทธิภาพ"],
        features: { flex: 6, growth: 8, guar: 3, lev: 3 },
        taxDeductible: "Partial"
    }
};

// ==========================================
// 🏥 2. UNIFIED RIDER MATRIX (Decoupled & AI Ready V7 + Tax DNA)
// ฐานข้อมูลสัญญาเพิ่มเติม (Riders)
// ==========================================
const aiaRiderMatrix = {
    // --- 🩺 กลุ่มที่ 1: Health (ค่ารักษาพยาบาล) ---
    "AIA Infinite Care": { 
        category: "Health", status: "active", minAge: 18, maxAge: 70,
        highlight: "เหมาจ่ายค่ารักษาพยาบาลวงเงินสูงลิ่ว ครอบคลุมทั่วโลก สู้เงินเฟ้อได้สบาย",
        tier: "Premium", coverageStyle: "Reimbursement", targetGap: "Global Healthcare",
        hasDeductible: false, isUDR: false, 
        taxDeductible: "Partial", 
        features: { comp: 10, deduct: 0, stab: 5, inf: 10 },
        businessRule: { type: "fixed_plan", plans: [60000000, 120000000] },
        defaultSA: 60000000
    },
    "AIA Health Starter": { 
        category: "Health", status: "active", minAge: 11, maxAge: 75,
        highlight: "ประกันสุขภาพแบบมีส่วนร่วมจ่าย (Co-pay) เบี้ยเข้าถึงง่าย",
        tier: "Entry", coverageStyle: "Co-pay", targetGap: "Budget Healthcare",
        hasCopay: true, isUDR: false,
        taxDeductible: "Full", 
        features: { comp: 5, deduct: 10, stab: 6, inf: 4 },
        businessRule: { type: "fixed_plan", plans: [1500, 2000, 2500, 3500, 4500] },
        defaultSA: 4500
    },
    "AIA Health Happy": { 
        category: "Health", status: "active", minAge: 0, maxAge: 75,
        highlight: "เหมาจ่ายค่ารักษาพยาบาล ครอบคลุมโรคร้ายแรงด้วยวงเงินดับเบิ้ล",
        tier: "Standard", coverageStyle: "Reimbursement", targetGap: "Standard Healthcare",
        hasCIDoubleLimit: true, isUDR: false,
        taxDeductible: "Full", 
        features: { comp: 8, deduct: 0, stab: 2, inf: 8 },
        businessRule: { type: "fixed_plan", plans: [1000000, 5000000, 15000000, 25000000] },
        defaultSA: 5000000
    },
    "AIA Health Saver": { 
        category: "Health", status: "active", minAge: 0, maxAge: 75,
        highlight: "ค่ารักษาพยาบาลแบบเหมาจ่ายขนาดเล็ก เหมาะสำหรับคนมีสวัสดิการอยู่แล้ว",
        tier: "Economy", coverageStyle: "Reimbursement", targetGap: "Top-up Welfare",
        hasDeductible: false, isUDR: false,
        taxDeductible: "Full", 
        features: { comp: 6, deduct: 8, stab: 3, inf: 5 },
        businessRule: { type: "fixed_plan", plans: [200000,  300000, 400000, 500000] },
        defaultSA: 400000
    },

    // --- 🛡️ กลุ่มที่ 2: CI (โรคร้ายแรง) ---
    "AIA Multi-Pay CI Plus": { 
        category: "CI", status: "active", minAge: 0, maxAge: 70,
        highlight: "เคลมโรคร้ายได้สูงสุด 800% ครอบคลุมการกลับมาเป็นซ้ำ (Relapse)",
        tier: "Premium", coverageStyle: "Lump Sum", ciStages: "All Stages & Relapse", targetGap: "Severe CI Risk",
        taxDeductible: "Full", 
        features: { multi: 10, early: 10, stab: 2, lev: 6 },
        businessRule: { type: "flexible", min: 1000000, step: 100000 },
        defaultSA: 1000000
    },
    "AIA CI Plus & AIA CI Top up": { 
        category: "CI", status: "active", minAge: 0, maxAge: 70,
        highlight: "รับเงินก้อนทันทีทุกระยะการเจ็บป่วย อุดรอยรั่วทั้งระยะเริ่มต้นถึงรุนแรง",
        tier: "Standard", coverageStyle: "Lump Sum", ciStages: "Early to Severe", targetGap: "Comprehensive CI",
        taxDeductible: "Full", 
        features: { multi: 3, early: 8, stab: 2, lev: 7 },
        businessRule: { type: "flexible", min: 300000, step: 100000 },
        defaultSA: 1000000
    },
    "AIA Care for Cancer": { 
        category: "CI", status: "active", minAge: 0, maxAge: 70,
        highlight: "รับเงินก้อน 100% ทันทีเมื่อตรวจพบมะเร็งระยะลุกลาม",
        tier: "Economy", coverageStyle: "Lump Sum", ciStages: "Severe Cancer Only", diseaseFocus: "Cancer",
        taxDeductible: "None", 
        features: { multi: 0, early: 0, stab: 2, lev: 9 },
        businessRule: { type: "flexible", min: 500000, step: 100000 },
        defaultSA: 1000000
    },
    "AIA Health Cancer": { 
        category: "CI", status: "active", minAge: 0, maxAge: 70,
        highlight: "เหมาจ่ายค่ารักษามะเร็งโดยเฉพาะ",
        tier: "Standard", coverageStyle: "Reimbursement", ciStages: "Cancer Treatment", diseaseFocus: "Cancer",
        taxDeductible: "None", 
        features: { multi: 5, early: 5, stab: 2, lev: 8 },
        businessRule: { type: "flexible", min: 500000, step: 100000 },
        defaultSA: 1000000
    },
    // --- 🛏️ กลุ่มที่ 3: Compensation (ชดเชยรายได้) ---
    "AIA HB": { 
        category: "Compensation", status: "active", minAge: 0, maxAge: 65,
        highlight: "ชดเชยรายได้รายวันเมื่อนอนโรงพยาบาล สูงสุด 700 วัน พร้อม ICU x2",
        tier: "Standard", coverageStyle: "Daily Compensation", targetGap: "Income Replacement", hasSurgeryBonus: false,
        taxDeductible: "None", 
        features: { lev: 5, stab: 2, surgery: 0 },
        businessRule: { type: "flexible", min: 500, step: 500, max: 10000 },
        defaultSA: 1000
    },
    "AIA HB Extra": { 
        category: "Compensation", status: "active", minAge: 0, maxAge: 65,
        highlight: "ชดเชยรายได้รายวัน พร้อมรับเงินก้อนพิเศษ (Lump Sum)",
        tier: "Premium", coverageStyle: "Daily + Lump Sum", targetGap: "Income Replacement & Surgery", hasSurgeryBonus: true,
        taxDeductible: "None", 
        features: { lev: 8, stab: 2, surgery: 10 },
        businessRule: { type: "flexible", min: 500, step: 500, max: 10000 },
        defaultSA: 1000
    }
};
    

// ==========================================
// 📦 3. Premium Rate Matrix (อัตราเบี้ยสัญญาหลัก ต่อทุน 1,000)
// ==========================================
const rateMatrix = {
    "AIA Endowment 15/25": {
        "M": { 30: 82, 35: 82, 36: 82, 45: 83, 50: 83, 55: 88, 60: 90, 70: 96 },
        "F": { 30: 82, 35: 82, 36: 82, 45: 83, 50: 83, 55: 88, 60: 90, 70: 96 }
    },
    "AIA Excellent 20/20": {
        "M": { 1: 152.90, 36: 153.90, 50: 156.90, 60: 161.20, 70: 170.00 },
        "F": { 1: 152.90, 36: 153.90, 50: 156.90, 60: 161.20, 70: 170.00 }
    },
    "AIA Annuity Sure": {
        "M": { 20: 44, 30: 70, 45: 178, 55: 649 },
        "F": { 20: 47, 30: 73, 45: 186, 55: 676 }
    },
    "AIA Annuity Fix": {
        "M": { 20: 16.20, 30: 25.70, 45: 65.60, 55: 236.50 },
        "F": { 20: 16.50, 30: 25.80, 45: 65.20, 55: 234.80 }
    },
    "AIA Senior Happy": {
        "M": { 50: 59.80, 55: 68.42, 65: 102.35, 70: 127.65 },
        "F": { 50: 50.02, 55: 58.07, 65: 84.52, 70: 106.95 }
    },
    "AIA 20 Pay Life": {
        "M": { 1: 12.76, 36: 24.94, 50: 37.81, 60: 55.77, 70: 78.11 },
        "F": { 1: 11.47, 36: 20.93, 50: 31.62, 60: 46.43, 70: 67.07 }
    },
    "AIA Pay Life Plus (20 Pay)": {
        "M": { 1: 14.80, 36: 28.93, 50: 43.40, 60: 60.64, 70: 97.53 },
        "F": { 1: 13.31, 36: 24.28, 50: 36.68, 60: 51.57, 70: 82.43 }
    },
    "AIA CI SuperCare": {
        "M": { 1: 22.20, 36: 42.28, 50: 62.92, 60: 100.65 },
        "F": { 1: 20.42, 36: 38.62, 50: 56.71, 60: 79.47 }
    },
    "AIA CI ProCare": {
        "M": { 1: 35.52, 36: 100.42, 50: 169.88, 60: 310.00 },
        "F": { 1: 30.63, 36: 79.56, 50: 127.60, 60: 210.60 }
    },
    "AIA Life Protector 70": {
        "M": { 20: 10.94, 30: 12.75, 45: 17.78, 55: 24.23 },
        "F": { 20: 8.00, 30: 9.02, 45: 11.91, 55: 15.88 }
    },
    "AIA Legacy Prestige Plus": {
        "M": { 20: 25.50, 30: 32.40, 40: 45.80, 50: 68.20 },
        "F": { 20: 22.10, 30: 28.50, 40: 41.20, 50: 62.10 }
    },
    "AIA Legacy Prestige": {
        "M": { 20: 28.50, 30: 36.40, 40: 50.80, 50: 75.20 },
        "F": { 20: 25.10, 30: 32.50, 40: 45.20, 50: 68.10 }
    },
    "AIA Smart Select Prestige": {
        "M": { 1: 15, 30: 20, 40: 25, 50: 35, 60: 50, 70: 75 },
        "F": { 1: 15, 30: 18, 40: 22, 50: 30, 60: 45, 70: 65 }
    },
    "AIA Infinite Wealth Prestige": {
        "M": { 1: 15, 30: 20, 40: 25, 50: 35, 60: 50, 70: 75 },
        "F": { 1: 15, 30: 18, 40: 22, 50: 30, 60: 45, 70: 65 }
    },
    "AIA Elite Income Prestige": {
        "M": { 1: 909.09, 30: 909.09, 40: 909.09, 50: 909.09, 60: 909.09, 70: 909.09 },
        "F": { 1: 909.09, 30: 909.09, 40: 909.09, 50: 909.09, 60: 909.09, 70: 909.09 }
    },
    "AIA CI SuperCare Prestige": {
        "M": { 20: 30.16, 30: 36.85, 40: 45.68, 50: 62.92 },
        "F": { 20: 27.92, 30: 33.91, 40: 42.45, 50: 56.71 }
    }
};

// ==========================================
// ⚙️ 4. ฟังก์ชันคำนวณและดึงเรทเบี้ยประกันสัญญาหลัก
// ==========================================
function findClosestRate(productMatrix, gender, age) {
    if(!productMatrix || !productMatrix[gender]) return null;
    
    let matrix = productMatrix[gender];
    let ageKeys = Object.keys(matrix).map(Number).sort((a, b) => a - b);
    let rate = 0;

    // ระบบประมาณค่าเบี้ยประกัน (Linear Interpolation) สำหรับ Base Product
    if (matrix[age] !== undefined) {
        // 1. ตรงกับเลขอายุในฐานข้อมูลเป๊ะๆ
        rate = matrix[age];
    } 
    else if (age <= ageKeys[0]) {
        // 2. อายุน้อยกว่าเรทต่ำสุด
        rate = matrix[ageKeys[0]];
    } 
    else if (age >= ageKeys[ageKeys.length - 1]) {
        // 3. อายุมากกว่าเรทสูงสุด
        rate = matrix[ageKeys[ageKeys.length - 1]];
    } 
    else {
        // 4. อายุอยู่ระหว่างกลาง (คำนวณสัดส่วนสมการเส้นตรง)
        let age1 = ageKeys[0];
        let age2 = ageKeys[ageKeys.length - 1];
        
        for (let i = 0; i < ageKeys.length - 1; i++) {
            if (age > ageKeys[i] && age < ageKeys[i + 1]) {
                age1 = ageKeys[i];
                age2 = ageKeys[i + 1];
                break;
            }
        }
        
        let rate1 = matrix[age1];
        let rate2 = matrix[age2];
        
        // สูตรสมการเส้นตรง: Y = Y1 + ((Y2 - Y1) * (X - X1) / (X2 - X1))
        rate = rate1 + ((rate2 - rate1) * (age - age1) / (age2 - age1));
    }

    return rate;
}

// ==========================================
// 📦 5. Rider Premium Matrix (อัตราเบี้ยสัญญาเพิ่มเติม)
// ==========================================
const riderRateMatrix = {
    "AIA Infinite Care": { type: "flat","M": { 20: 78480, 30: 88860, 40: 102420, 50: 138300, 60: 222000 },"F": { 20: 87180, 30: 94680, 40: 109560, 50: 139560, 60: 224040 } },
    "AIA Health Starter": { type: "fixed_plan",
        "1500": {"M": { 21: 3800, 31: 4300, 41: 4900, 51: 7100, 61: 13700, 71: 29700 },"F": { 21: 4200, 31: 4800, 41: 5500, 51: 7700, 61: 15000, 71: 32400 }},
        "2000": {"M": { 21: 6400, 31: 7300, 41: 8200, 51: 11900, 61: 20900, 71: 41100 },"F": { 21: 7700, 31: 8300, 41: 9200, 51: 13000, 61: 22500, 71: 44600 }},
        "2500": {"M": { 21: 7800, 31: 9000, 41: 10100, 51: 14500, 61: 25600, 71: 50200 },"F": { 21: 9000, 31: 10100, 41: 11400, 51: 16000, 61: 27700, 71: 54700 }},
        "3500": {"M": { 21: 9900, 31: 11700, 41: 13000, 51: 18700, 61: 33000, 71: 65200 },"F": { 21: 11900, 31: 13400, 41: 15000, 51: 20700, 61: 36200, 71: 72200 }},
        "4500": {"M": { 21: 11700, 31: 13700, 41: 15300, 51: 22000, 61: 39000, 71: 77300 },"F": { 21: 14500, 31: 15700, 41: 17600, 51: 24500, 61: 42900, 71: 85700 }}},
    "AIA Health Cancer": { type: "flat","M": { 20: 3500, 30: 5500, 40: 9500, 50: 18500 },"F": { 20: 4200, 30: 6800, 40: 12000, 50: 22000 } },
    "AIA CI Plus & AIA CI Top up": { type: "per_thousand","M": { 20: 3.33, 30: 4.30, 40: 7.75, 50: 28.44, 60: 77.93 },"F": { 20: 3.10, 30: 5.23, 40: 7.86, 50: 15.51, 60: 38.23 } },
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
    "AIA CI Plus": { type: "per_thousand", "M": { 20: 1.85, 30: 2.65, 40: 5.45, 50: 12.80 }, "F": { 20: 1.95, 30: 2.90, 40: 6.10, 50: 11.50 } },
    "AIA Multi-Pay CI Plus": { type: "per_thousand", "M": { 20: 3.50, 30: 5.20, 40: 10.80, 50: 25.40 }, "F": { 20: 3.80, 30: 5.80, 40: 12.20, 50: 23.50 } },
    "AIA Care for Cancer": { type: "per_thousand", "M": { 20: 1.10, 30: 1.60, 40: 3.50, 50: 8.20 }, "F": { 20: 1.25, 30: 2.10, 40: 4.80, 50: 9.50 } },
    "AIA HB Extra": { type: "per_thousand", "M": { 20: 1350, 30: 1450, 40: 1850, 50: 2650 }, "F": { 20: 1400, 30: 1650, 40: 2150, 50: 2950 } },
    "AIA HB": { type: "per_thousand", "M": { 20: 1150, 30: 1250, 40: 1550, 50: 2150 }, "F": { 20: 1200, 30: 1450, 40: 1850, 50: 2450 } }
};

// ==========================================
// ⚙️ 6. ฟังก์ชันคำนวณเรทเบี้ยสัญญาเพิ่มเติม (Rider)
// ==========================================
function calculateRiderPremium(riderName, gender, age, planOrSA) {
    if (typeof riderRateMatrix === 'undefined' || !riderRateMatrix[riderName]) return 0;
    
    // 1. แปลงค่าเพศเป็นมาตรฐาน M, F
    let genderKey = (gender === "หญิง" || gender === "F") ? "F" : "M";
    
    let productType = riderRateMatrix[riderName].type;
    let matrix;

    // 2. เลือกดึงข้อมูลตามประเภทให้ถูกต้อง (รองรับ fixed_plan ทุกรูปแบบ)
    if (productType === "fixed_plan") {
        let planKey = planOrSA.toString();
        
        // ถ้าไม่มีระบุแผนตามที่ค้นหาเป๊ะๆ ให้หาแผนที่ใกล้เคียงที่สุด (Fallback) ป้องกัน Error หรือเบี้ยเป็น 0
        if (!riderRateMatrix[riderName][planKey]) {
            let availablePlans = Object.keys(riderRateMatrix[riderName])
                                       .filter(k => k !== "type")
                                       .map(Number)
                                       .sort((a,b) => a-b);
            
            if (availablePlans.length === 0) return 0;
            
            let closestPlan = availablePlans.reduce((prev, curr) => 
                Math.abs(curr - planOrSA) < Math.abs(prev - planOrSA) ? curr : prev
            );
            planKey = closestPlan.toString();
        }
        
        matrix = riderRateMatrix[riderName][planKey][genderKey];
    } else {
        // กลุ่ม flat และ per_thousand ดึงฐานข้อมูลตามเพศได้เลย
        matrix = riderRateMatrix[riderName][genderKey];
    }

    if (!matrix) return 0;

    // 3. ระบบประมาณค่าเบี้ยประกันตามช่วงอายุ (Linear Interpolation)
    let ageKeys = Object.keys(matrix).map(Number).sort((a, b) => a - b);
    let rate = 0;

    if (matrix[age] !== undefined) {
        // ตรงกับเลขอายุเป๊ะๆ
        rate = matrix[age];
    } else if (age <= ageKeys[0]) {
        // อายุน้อยกว่าช่วงที่มี (ดึงเรทต่ำสุด)
        rate = matrix[ageKeys[0]];
    } else if (age >= ageKeys[ageKeys.length - 1]) {
        // อายุมากกว่าช่วงที่มี (ดึงเรทสูงสุด)
        rate = matrix[ageKeys[ageKeys.length - 1]];
    } else {
        // อายุอยู่ระหว่างกลาง คำนวณสัดส่วนสมการเส้นตรง
        let age1 = ageKeys[0];
        let age2 = ageKeys[ageKeys.length - 1];
        
        for (let i = 0; i < ageKeys.length - 1; i++) {
            if (age > ageKeys[i] && age < ageKeys[i + 1]) {
                age1 = ageKeys[i];
                age2 = ageKeys[i + 1];
                break;
            }
        }
        
        let rate1 = matrix[age1];
        let rate2 = matrix[age2];
        rate = rate1 + ((rate2 - rate1) * (age - age1) / (age2 - age1));
    }

    // 4. คำนวณค่าเบี้ยสุดท้ายตาม Type ของสินค้า
    if (productType === "flat" || productType === "fixed_plan") {
        return rate; 
    }
    if (productType === "per_thousand") {
        return (planOrSA / 1000) * rate;
    }
    
    return 0;
}

// (ต่อจากส่วนของ riderRateMatrix และ calculateRiderPremium...)

// ==========================================
// 🧠 7. [UPGRADE] อัลกอริทึมจำลองมูลค่าบัญชี (Account Value) และ COI ของ Unit-Linked สมจริง
// ==========================================

function getCOIRate(age, gender) {
    // 🌟 [UPGRADE 1] ปรับอัตรามรณะ (Mortality Rate) อิงโครงสร้างตาราง TMO 2017
    let baseRate = gender === 'F' ? 0.6 : 1.0;
    let agingFactor = Math.pow(1.095, Math.max(0, age - 25)); // พุ่งขึ้น 9.5% ทุกปีหลังอายุ 25
    
    // เพิ่ม Shock factor ช่วงชรา (อายุเกิน 70 จะเสี่ยงตายและ COI แพงทวีคูณ)
    if (age > 70) agingFactor *= Math.pow(1.05, age - 70); 

    let ratePerThousand = baseRate * agingFactor;
    
    // Cap อัตราสูงสุดไม่เกิน 300 ต่อ 1000 (30% ของทุน) เพื่อไม่ให้ทะลุเพดานกฎหมาย
    return Math.min(ratePerThousand, 300) / 1000; 
}

// 🌟 [UPGRADE 2] จำลองการหัก COI และ FMC แบบรายเดือนเพื่อความแม่นยำ
function simulateUnitLinkedCV(age, premium, sumAssured, expectedRoi, gender, payYears = 99, designType = 'A') {
    let cv = 0; 
    let lapseAge = 99; 
    
    const FMC_RATE_ANNUAL = 0.012; 
    const fmcMonthly = FMC_RATE_ANNUAL / 12;
    const policyFeeMonthly = 1200 / 12; // 100 บาทต่อเดือน
    
    // แปลงผลตอบแทนคาดหวังรายปี เป็นรายเดือน (Effective Monthly Rate)
    let monthlyRoi = Math.pow(1 + expectedRoi, 1/12) - 1;
    let netMonthlyRoi = monthlyRoi - fmcMonthly;

    for (let y = 1; y <= (99 - age); y++) {
        let currentAge = age + y - 1;
        
        let premiumChargePct = 0;
        if (y <= payYears) {
            if (y === 1) premiumChargePct = 0.50;
            else if (y === 2) premiumChargePct = 0.30;
            else if (y === 3) premiumChargePct = 0.10;
            else premiumChargePct = 0.00;
        }
        
        // จ่ายเบี้ยรายปี นำเข้าพอร์ตตอนต้นปี
        let netPremium = (y <= payYears) ? premium * (1 - premiumChargePct) : 0;
        cv += netPremium;
        
        // ดึงเรท COI รายปี แล้วหาร 12 เพื่อหักรายเดือน
        let annualCOIRate = getCOIRate(currentAge, gender);
        let monthlyCOIRate = annualCOIRate / 12;
        
        // 🔄 Loop หักค่าใช้จ่ายและคำนวณผลตอบแทนแบบรายเดือน
        for (let m = 1; m <= 12; m++) {
            cv -= policyFeeMonthly;
            
            let nar = 0; // Net Amount at Risk
            if (designType === 'A') {
                nar = Math.max(0, sumAssured - cv);
            } else {
                nar = sumAssured;
            }
            
            let monthlyCOI = nar * monthlyCOIRate;
            cv -= monthlyCOI;
            
            // เช็คพอร์ตแตกกลางปี
            if (cv <= 0) {
                cv = 0;
                break; 
            }
            
            // รับผลตอบแทนรายเดือน
            cv = cv * (1 + netMonthlyRoi);
        }
        
        // ตรวจสอบสถานะพอร์ตแตกเมื่อจบปี
        if (cv <= 0 && y > 1) {
            lapseAge = currentAge;
            break;
        }
    }
    
    return { lapseAge: lapseAge, finalCV: Math.max(0, cv) };
}

// 🌟 [UPGRADE 3] ปรับอัลกอริทึมค้นหาเบี้ย (Binary Search) เพื่อการทำ Premium Holiday
function optimizeUnitLinkedPremium(age, sumAssured, expectedRoi, gender, minPremium) {
    // เป้าหมายใหม่: พอร์ตต้องรอดอย่างน้อยถึงอายุ 85 ปี (อายุขัยเฉลี่ย)
    let targetLapseAge = Math.max(85, age + 20); 

    let low = minPremium;
    let high = sumAssured * 0.15; // แคปเบี้ยสูงสุดไว้ที่ 15% ของทุน ป้องกัน AI เสนอเบี้ยแพงเว่อร์
    let optimalPremium = high;
    
    // 💡 ปรับให้ส่งเบี้ยแค่ 20 ปี แล้ว "หยุดพักชำระเบี้ย (Premium Holiday)"
    let simulationPayYears = 20; 
    
    for (let i = 0; i < 20; i++) { 
        let mid = (low + high) / 2;
        
        // จำลองสถานการณ์: ส่งเบี้ย 20 ปี, แบบประกัน Type A
        let simResult = simulateUnitLinkedCV(age, mid, sumAssured, expectedRoi, gender, simulationPayYears, 'A');
        
        if (simResult.lapseAge >= targetLapseAge) {
            optimalPremium = mid; // ถ้ารอดถึง 85 ปี! ลองลดเบี้ยลงอีกให้ลูกค้าประหยัด
            high = mid;
        } else {
            low = mid; // ไม่รอด พอร์ตแตกก่อนอายุ 85 ต้องดันเบี้ยขึ้น
        }
    }
    
    // ปัดเศษเบี้ยให้สวยงาม (หลักพัน)
    return Math.max(minPremium, Math.ceil(optimalPremium / 1000) * 1000);
}

// ==========================================
// 🎯 8. MASTER FUNCTION: คำนวณเบี้ยประกันแบบระบุตัวตน
// ==========================================
function calculateExactPremium(productName, gender, age, sumAssured) {
    // หมายเหตุ: ฟังก์ชัน isEligible จะต้องอยู่ในไฟล์ HTML หลัก หรืออยู่ในไฟล์นี้ด้วย (Global Scope ดึงกันได้)
    if (typeof isEligible === 'function' && !isEligible(productName, age)) {
        return { success: false, error: "อายุไม่อยู่ในเกณฑ์รับประกัน" };
    }
    
    try {
        let product = aiaBaseProductMatrix[productName]; 

        // 1. กรณีมีข้อมูลใน Rate Matrix (ประกันทั่วไป)
        if (typeof rateMatrix !== 'undefined' && rateMatrix[productName]) {
            let ratePerThousand = rateMatrix[productName][gender][age] || findClosestRate(rateMatrix[productName], gender, age);
            if (ratePerThousand) {
                let exactPremium = (sumAssured / 1000) * ratePerThousand;
                if (product && product.minPremiumRPP && exactPremium < product.minPremiumRPP) {
                    exactPremium = product.minPremiumRPP;
                }
                return { success: true, premium: exactPremium };
            }
        }
        
        // 2. กรณีกลุ่ม Unit Linked หรือสินค้าที่ต้องใช้ Optimization
        if (product && product.minPremiumRPP) {
            // ดึงผลตอบแทนเป้าหมายจากหน้าจอ
            let expectedRoiInput = document.getElementById('r_preRet');
            let expectedRoi = expectedRoiInput ? (parseFloat(expectedRoiInput.value) / 100) : 0.05;
            
            let uwAge = parseInt(age) || 35;
            let genderKey = (gender === "หญิง" || gender === "F") ? "F" : "M";
            
            // คำนวณเบี้ยที่คุ้มค่าที่สุดด้วย Binary Search Simulation
            let calculatedPremium = optimizeUnitLinkedPremium(uwAge, sumAssured, expectedRoi, genderKey, product.minPremiumRPP);
            
            // Safety Guardrail: เบี้ยไม่ควรเกิน 10% ของทุน (ยกเว้นเบี้ยชำระครั้งเดียว)
            let maxRealisticPremium = sumAssured * 0.10;
            if (calculatedPremium > maxRealisticPremium) {
                calculatedPremium = Math.ceil(maxRealisticPremium / 1000) * 1000;
            }
            
            return { success: true, premium: Math.max(product.minPremiumRPP, calculatedPremium) };
        }

        return { success: false, error: "ไม่มีข้อมูลอัตราเบี้ยในระบบ Matrix" };
    } catch (e) {
        console.error("Premium Calculation Error:", e);
        return { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูล" };
    }
}