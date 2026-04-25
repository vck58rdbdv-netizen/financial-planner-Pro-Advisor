// =====================================================================
// 🧠 [MODULE] Thai Demographics & Reality Sync + Actuarial Math
// ฟังก์ชันสำหรับสร้างกรณีศึกษา (Case Study Generator)
// =====================================================================

function loadCaseStudy() {
    if(!confirm('ต้องการล้างข้อมูลเก่า และจำลองกรณีศึกษาแบบสมจริงระดับ 7 มิติ (ความหลากหลาย x10 เท่า) หรือไม่?')) return;
    
    // 1. ล้างข้อมูลเดิมทั้งหมดออกจากหน้าจอ
    if(typeof clearDataForLoad === 'function') clearDataForLoad();
    if(document.getElementById('mainForm')) document.getElementById('mainForm').reset();

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pickStr = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const roundTo = (num, step) => Math.round(num / step) * step;

    // ==========================================
    // 🔔 สถิติขั้นสูง: Gaussian Distribution
    // ==========================================
    const gaussianRandom = (mean = 0, stdev = 1) => {
        const u = 1 - Math.random(); 
        const v = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return z * stdev + mean;
    };

    const randNormal = (min, max) => {
        let mean = (min + max) / 2;
        let stdev = (max - min) / 6; 
        let val;
        do {
            val = gaussianRandom(mean, stdev);
        } while (val < min || val > max); 
        return Math.floor(val);
    };

    // 🟢 มิติที่ 1: กลุ่มระดับความมั่งคั่งและอาชีพ
    const jobMatrix = [
        { class: "Grassroots_Daily", occs: ["แรงงานรายวัน/ลูกจ้างชั่วคราว", "พนักงานทำความสะอาด/รปภ."], incRange: [9000, 15000] },
        { class: "Grassroots", occs: ["พนักงานโรงงาน", "เกษตรกร/ทำไร่ทำนา", "Gig Worker/ขับรถส่งของ"], incRange: [12000, 25000] },
        { class: "Informal", occs: ["พ่อค้าแม่ค้าตามตลาด", "ร้านอาหารริมทาง/Street Food", "ช่างซ่อมทั่วไป"], incRange: [18000, 45000] },
        { class: "Informal_Ecom", occs: ["แม่ค้าออนไลน์/Live สด", "ขายของ Dropship"], incRange: [30000, 150000] },
        { class: "Civil_Junior", occs: ["ข้าราชการ/พนักงานราชการ (ระดับต้น)", "ครูผู้ช่วย/ตำรวจชั้นประทวน"], incRange: [15000, 35000] },
        { class: "Civil_Senior", occs: ["ข้าราชการชำนาญการพิเศษ", "ผู้พิพากษา/อัยการ", "นายทหาร/นายตำรวจชั้นผู้ใหญ่"], incRange: [50000, 120000] },
        { class: "EntryCorp", occs: ["พนักงานบริษัทเอกชน (First Jobber)"], incRange: [18000, 35000] },
        { class: "MidCorp", occs: ["พนักงานบริษัทเอกชน (Senior/Manager)", "วิศวกร/สถาปนิก", "นักวิเคราะห์การเงิน"], incRange: [40000, 90000] },
        { class: "TechCorp", occs: ["โปรแกรมเมอร์/Software Engineer", "Data Scientist", "UX/UI Designer"], incRange: [60000, 180000] },
        { class: "MNC_Corp", occs: ["ผู้บริหารระดับกลางบริษัทข้ามชาติ (MNC)", "Expat (ทำงานในไทย)"], incRange: [120000, 350000] },
        { class: "Freelance", occs: ["ฟรีแลนซ์/รับจ้างอิสระ", "ช่างภาพ/กราฟิกดีไซน์", "Content Creator/Youtuber"], incRange: [30000, 150000] },
        { class: "Freelance_Creative", occs: ["ศิลปิน/นักแสดง", "นักแต่งเพลง/ผู้กำกับ"], incRange: [50000, 300000] },
        { class: "Specialist", occs: ["แพทย์เฉพาะทาง", "ทันตแพทย์", "นักบินพาณิชย์"], incRange: [100000, 350000] },
        { class: "Executive", occs: ["ผู้บริหารระดับสูง (C-Level)", "ผู้อำนวยการฝ่าย (VP/Director)"], incRange: [150000, 500000] },
        { class: "HNW_Biz", occs: ["เจ้าของธุรกิจ/นายจ้าง (SME)", "ผู้รับเหมาขนาดกลาง"], incRange: [300000, 1000000] },
        { class: "HNW_Founder", occs: ["ผู้ก่อตั้ง Tech Startup", "เจ้าของแฟรนไชส์"], incRange: [250000, 800000] },
        { class: "HNW_Rentier", occs: ["นักลงทุนอิสระ (Full-time)", "เจ้าของอสังหาฯปล่อยเช่า/เสือนอนกิน"], incRange: [150000, 600000] },
        { class: "UHNW_Elite", occs: ["ทายาทธุรกิจกงสีระดับประเทศ", "ประธานกรรมการบริษัทมหาชน", "เศรษฐีที่ดิน"], incRange: [1500000, 5000000] }
    ];

    // 🟢 มิติที่ 2: ช่วงวัยและสถานะครอบครัว 
    const stageMatrix = [
        { stage: "GenZ_Starter", minAge: 20, maxAge: 24, dep: 0, desc: "เพิ่งเรียนจบ/เริ่มทำงานปีแรก" },
        { stage: "FirstJobber", minAge: 25, maxAge: 28, dep: 0, desc: "วัยเริ่มสร้างตัว" },
        { stage: "YoungMarried", minAge: 28, maxAge: 33, dep: 0, desc: "เพิ่งแต่งงาน/เตรียมซื้อบ้าน" },
        { stage: "Single", minAge: 29, maxAge: 35, dep: pickStr([0,1]), desc: "โสดวัยทำงาน/ดูแลพ่อแม่" },
        { stage: "LateSingle", minAge: 36, maxAge: 50, dep: pickStr([0,1,2]), desc: "โสดอิสระ/ดูแลพ่อแม่วัยชรา" },
        { stage: "SingleParent", minAge: 30, maxAge: 45, dep: rand(1,3), desc: "พ่อแม่เลี้ยงเดี่ยว (ภาระสูง)" },
        { stage: "DINKs", minAge: 32, maxAge: 45, dep: 0, desc: "คู่รักไม่มีบุตร (Double Income)" },
        { stage: "SeniorDINKs", minAge: 46, maxAge: 55, dep: 0, desc: "คู่รักวัยกลางคนไม่มีบุตร (เน้นลงทุน)" },
        { stage: "Family", minAge: 30, maxAge: 45, dep: rand(1,3), desc: "สร้างครอบครัว/มีบุตร" },
        { stage: "Sandwich", minAge: 35, maxAge: 50, dep: rand(2,4), desc: "เดอะแบก (ดูแลทั้งพ่อแม่และลูก)" },
        { stage: "EmptyNester", minAge: 51, maxAge: 60, dep: 0, desc: "รังนกเปล่า (ลูกพึ่งพาตัวเองได้แล้ว)" },
        { stage: "PreRetire", minAge: 51, maxAge: 59, dep: pickStr([0,1]), desc: "เตรียมเกษียณ" },
        { stage: "Retiree", minAge: 60, maxAge: 70, dep: 0, desc: "เกษียณตอนต้น (Active Retiree)" },
        { stage: "LateRetiree", minAge: 71, maxAge: 85, dep: 0, desc: "วัยชรา (เตรียมส่งมอบมรดก/ค่ารักษา)" }
    ];

    const selectedJob = pickStr(jobMatrix); 
    const occ = pickStr(selectedJob.occs);
    let validStages = stageMatrix.filter(stage => { 
        const jobClass = selectedJob.class;
        if (["Executive", "Civil_Senior", "Specialist", "MNC_Corp", "HNW_Biz", "UHNW_Elite", "HNW_Founder"].includes(jobClass)) {
            return stage.minAge >= 35; 
        }
        if (jobClass === "EntryCorp" || stage.stage === "GenZ_Starter") {
            return stage.maxAge <= 30; 
        }
        if (stage.stage === "Retiree" || stage.stage === "LateRetiree") {
             return ["HNW_Rentier", "UHNW_Elite", "Informal_Ecom", "Freelance_Creative"].includes(jobClass); 
        }
        return stage.maxAge <= 60; 
    });
    if(validStages.length === 0) {
        validStages = stageMatrix.filter(s => s.minAge >= 30 && s.maxAge <= 55); 
    }
    const selectedStage = pickStr(validStages); 
    const age = rand(selectedStage.minAge, selectedStage.maxAge);
    const inc = roundTo(randNormal(selectedJob.incRange[0], selectedJob.incRange[1]), 1000); 
    const dep = selectedStage.dep;
    const isRetiree = selectedStage.stage === "Retiree" || selectedStage.stage === "LateRetiree";

    const provs = [
    "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร", "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ", "ชุมพร", "เชียงราย", "เชียงใหม่", "นครปฐม", "นครราชสีมา", "นครสวรรค์", "นนทบุรี", "ปทุมธานี", "พระนครศรีอยุธยา", "พิษณุโลก", "ภูเก็ต", "ระยอง", "ราชบุรี", "สงขลา", "สมุทรปราการ", "สมุทรสาคร", "สระบุรี", "สุราษฎร์ธานี", "อุดรธานี", "อุบลราชธานี"
    ];
    
    let welf = "ไม่มีสวัสดิการ (จ่ายเอง/บัตรทอง)";
    if(selectedJob.class.includes("Corp")) welf = pickStr(["สิทธิประกันสังคม", "ประกันกลุ่มองค์กร"]);
    if(selectedJob.class.includes("Civil")) welf = "สิทธิข้าราชการ/รัฐวิสาหกิจ";
    if(selectedJob.class.includes("Executive") || selectedJob.class.includes("HNW") || selectedJob.class.includes("UHNW")) welf = pickStr(["สวัสดิการระดับผู้บริหาร", "ประกันชีวิต/สุขภาพ (ส่วนตัว)"]);
    if(selectedJob.class.includes("Grassroots")) welf = pickStr(["สิทธิประกันสังคม (ม.39/ม.40)", "ไม่มีสวัสดิการ (จ่ายเอง/บัตรทอง)"]);

    // 🟢 มิติที่ 3: พฤติกรรมและวินัยทางการเงิน
    let bq1, bq2, bq3, bq4, bq5, bq6, bq7, bq8, bq9, bq10;
    const isStruggling = (inc < 30000 && dep > 0) || selectedJob.class.includes("Grassroots");
    const isWealthy = inc >= 200000 || selectedJob.class.includes("HNW") || selectedJob.class.includes("UHNW");
    bq1 = isStruggling ? pickStr(["0", "1"]) : pickStr(["2", "3"]);
    bq2 = isWealthy ? "3" : pickStr(["0", "1", "3"]);
    bq3 = (welf.includes("ไม่มี") || isStruggling) ? pickStr(["0", "1"]) : pickStr(["1", "3"]);
    bq4 = (selectedJob.class.includes("Civil")) ? "2" : (isStruggling ? "0" : "3");
    bq5 = isStruggling ? "survive" : (dep > 0 ? "family" : (isWealthy ? "invest" : "self"));
    bq6 = (age > 55 || selectedJob.class.includes("Civil")) ? "1" : (isWealthy ? pickStr(["2", "3"]) : "2");
    bq7 = isWealthy ? "3" : (age > 50 ? "1" : "2");
    bq8 = age > 55 ? "1" : (age < 35 ? "3" : "2");
    bq9 = selectedJob.class.includes("HNW") || occ.includes("แพทย์") ? "3" : (inc > 40000 ? "2" : "1");
    bq10 = (isWealthy || occ.includes("แพทย์")) ? "delegator" : (selectedJob.class.includes("Freelance") ? "diy" : "hybrid");

    // 🟢 มิติที่ 4: ภาระหนี้สินซ่อนเร้น
    let cLiab = [];
    let debtPmt = 0;
    let debtTotal = 0;
    let maxDTI = inc * 0.6;
    let hasCar = rand(1, 10) > 3; // โอกาสมีรถ 70%

    let currentHouseDebt = 0; let housePmt = 0;
    let currentCarDebt = 0;   let carPmt = 0;
    let badDebt = 0;          let badPmt = 0;
    let bizDebt = 0;          let bizPmt = 0;
    
    if(!isRetiree) {
        // 1. หนี้บ้าน
        if(inc >= 25000 && age >= 27 && rand(1,10) > 4) {
            housePmt = roundTo(inc * (rand(20, 40) / 100), 1000); 
            if(debtPmt + housePmt <= maxDTI) {
                let initialHouseDebt = (housePmt / 7000) * 1000000; 
                let yearsWorked = Math.max(0, age - 25); 
                let debtReductionRatio = Math.max(0.5, 1 - (yearsWorked * 0.03)); 
                currentHouseDebt = roundTo(initialHouseDebt * debtReductionRatio, 100000);

                cLiab.push({cat: "หนี้สินระยะยาว", name: "สินเชื่อบ้าน/ที่อยู่อาศัย", val: currentHouseDebt});
                debtPmt += housePmt; debtTotal += currentHouseDebt;
            } else { housePmt = 0; }
        }
        // 2. หนี้รถยนต์
        if(inc >= 15000 && hasCar && selectedJob.class !== "UHNW_Elite") {
            carPmt = roundTo(inc * (rand(15, 25) / 100), 500); 
            if(debtPmt + carPmt <= maxDTI) {
                currentCarDebt = carPmt * rand(30, 60); 
                cLiab.push({cat: "หนี้สินระยะยาว", name: "สินเชื่อรถยนต์", val: currentCarDebt});
                debtPmt += carPmt; debtTotal += currentCarDebt;
            } else { carPmt = 0; }
        }
        // 3. หนี้บริโภค
        if(isStruggling && rand(1,10) > 5) {
            badDebt = roundTo(rand(30000, 150000), 5000);
            badPmt = roundTo(badDebt * 0.05, 500);
            cLiab.push({cat: "หนี้สินระยะสั้น", name: pickStr(["บัตรเครดิต", "บัตรกดเงินสด/สินเชื่อบุคคล"]), val: badDebt});
            debtPmt += badPmt; debtTotal += badDebt;
        }
        // 4. หนี้ธุรกิจ / Lombard
        if(selectedJob.class.includes("HNW") || occ.includes("ธุรกิจ")) {
            bizDebt = roundTo(inc * rand(20, 50), 1000000);
            bizPmt = roundTo(bizDebt * 0.01, 10000);
            cLiab.push({cat: "หนี้สินเพื่อบริหารความมั่งคั่ง", name: "สินเชื่อธุรกิจ/OD", val: bizDebt});
            debtPmt += bizPmt; debtTotal += bizDebt;
        }
    }

    // 🟢 มิติที่ 5: โครงสร้างค่าใช้จ่าย 
    let basicExp = roundTo(inc * (isWealthy ? 0.15 : (isStruggling ? 0.50 : 0.35)), 500);
    let socialTax = (selectedJob.class === "Civil" || selectedJob.class.includes("Corp")) ? roundTo(inc * 0.05, 500) : 0;
    let parentCare = (selectedStage.stage === "Sandwich" || selectedStage.stage === "Single") ? roundTo(inc * 0.15, 1000) : 0;
    let childCare = (dep > 0 && selectedStage.stage !== "Sandwich") ? roundTo(inc * 0.20 * dep, 1000) : 0;
    let totalExp = basicExp + socialTax + parentCare + childCare + debtPmt;
    
    let cExp = [
        {cat: "รายจ่ายประจำ/ใช้ชีวิต", name: "ค่าใช้จ่ายอุปโภคบริโภคพื้นฐาน", val: basicExp}
    ];

    if(housePmt > 0) cExp.push({cat: "เงินชำระคืนหนี้สิน", name: "ผ่อนชำระสินเชื่อบ้าน", val: housePmt});
    if(carPmt > 0)   cExp.push({cat: "เงินชำระคืนหนี้สิน", name: "ผ่อนชำระค่างวดรถยนต์", val: carPmt});
    if(badPmt > 0)   cExp.push({cat: "เงินชำระคืนหนี้สิน", name: "ผ่อนชำระหนี้บัตร/สินเชื่อบุคคล", val: badPmt});
    if(bizPmt > 0)   cExp.push({cat: "เงินชำระคืนหนี้สิน", name: "ดอกเบี้ย/ผ่อนสินเชื่อธุรกิจ", val: bizPmt});

    if(socialTax > 0) cExp.push({cat: "รายจ่ายอื่น", name: "ภาษีสังคม/สมาคม", val: socialTax});
    if(parentCare > 0) cExp.push({cat: "รายจ่ายประจำ/ใช้ชีวิต", name: "ดูแลบุพการี", val: parentCare});
    if(childCare > 0) cExp.push({cat: "รายจ่ายอื่น", name: "ค่าเทอม/เลี้ยงดูบุตร", val: childCare});
    
    function calculateThaiTax(monthlyIncome) {
        let annualIncome = monthlyIncome * 12;
        let netIncome = annualIncome - Math.min(annualIncome * 0.5, 100000) - 60000;
        if (netIncome <= 150000) return 0; 
        let tax = 0;
        if (netIncome > 150000) tax += (Math.min(netIncome, 300000) - 150000) * 0.05;
        if (netIncome > 300000) tax += (Math.min(netIncome, 500000) - 300000) * 0.10;
        if (netIncome > 500000) tax += (Math.min(netIncome, 750000) - 500000) * 0.15;
        if (netIncome > 750000) tax += (Math.min(netIncome, 1000000) - 750000) * 0.20;
        if (netIncome > 1000000) tax += (Math.min(netIncome, 2000000) - 1000000) * 0.25;
        if (netIncome > 2000000) tax += (Math.min(netIncome, 5000000) - 2000000) * 0.30;
        if (netIncome > 5000000) tax += (netIncome - 5000000) * 0.35;
        return roundTo(tax / 12, 100); 
    }

    let monthlyTax = calculateThaiTax(inc);
    if(monthlyTax > 0) {
        cExp.push({cat: "ภาษี", name: "ภาษีหัก ณ ที่จ่าย (ประมาณการ)", val: monthlyTax});
    }

    // 🟢 มิติที่ 6: ทรัพย์สินและพอร์ตการลงทุน 
    let cAssets = [];
    let cInvest = [];
    
    let totalLiq = roundTo(inc * rand(1, isWealthy ? 20 : 5), 5000);
    let cashOnHand = roundTo(totalLiq * 0.05, 1000); // เงินสด 5%
    let currentAcct = roundTo(totalLiq * 0.15, 1000); // กระแสรายวัน 15%
    let savingsAcct = totalLiq - cashOnHand - currentAcct; // ออมทรัพย์ 80%

    if (cashOnHand > 0) cAssets.push({cat: "สินทรัพย์สภาพคล่อง", name: "เงินสดในมือ", val: cashOnHand});
    if (currentAcct > 0) cAssets.push({cat: "สินทรัพย์สภาพคล่อง", name: "เงินฝากกระแสรายวัน", val: currentAcct});
    if (savingsAcct > 0) {
        cAssets.push({cat: "สินทรัพย์สภาพคล่อง", name: "เงินฝากออมทรัพย์", val: savingsAcct});
        cInvest.push(["เงินฝากออมทรัพย์", savingsAcct, 0.5, "สำรองฉุกเฉิน/สภาพคล่อง"]);
    }

    if(inc > 40000 || isWealthy) {
        let pvdVal = roundTo(inc * rand(5, 30), 10000);
        let pvdName = selectedJob.class.includes("Civil") ? "กองทุนบำเหน็จบำนาญข้าราชการ (กบข.)" : "กองทุนสำรองเลี้ยงชีพ (PVD)";
        cAssets.push({cat: "สินทรัพย์ลงทุน", name: pvdName, val: pvdVal});
        cInvest.push([pvdName, pvdVal, 5.0, "ทุนเกษียณอายุ (Retirement)"]);

        let yearsWorked = Math.max(1, age - 22);
        let totalInvestBudget = roundTo((inc * (rand(10, 20)/100)) * 12 * yearsWorked, 50000);

        let rmfVal = roundTo(totalInvestBudget * 0.15, 5000);
        let thaiEsgVal = roundTo(totalInvestBudget * 0.10, 5000);
        let legacySsfVal = age > 30 ? roundTo(totalInvestBudget * 0.05, 5000) : 0;

        if (rmfVal > 0) {
            cAssets.push({cat: "สินทรัพย์ลงทุน", name: "กองทุนรวม RMF", val: rmfVal});
            cInvest.push(["กองทุนรวม RMF", rmfVal, (typeof riskScore !== 'undefined' && riskScore > 13) ? 6.0 : 4.0, "ทุนเกษียณอายุ (Retirement)"]);
        }
        if (thaiEsgVal > 0) {
            cAssets.push({cat: "สินทรัพย์ลงทุน", name: "กองทุนรวม Thai ESG", val: thaiEsgVal});
            cInvest.push(["กองทุนรวม Thai ESG", thaiEsgVal, 5.0, "ลดหย่อนภาษี"]);
        }
        if (legacySsfVal > 0) {
            cAssets.push({cat: "สินทรัพย์ลงทุน", name: "กองทุนรวม SSF (เดิม)", val: legacySsfVal});
            cInvest.push(["กองทุนรวม SSF (เดิม)", legacySsfVal, 5.0, "เติบโตระยะยาว (Long-term Growth)"]);
        }

        let remainingInvest = Math.max(0, totalInvestBudget - rmfVal - thaiEsgVal - legacySsfVal);
        
        if (remainingInvest > 0) {
            if ((typeof riskScore !== 'undefined' && riskScore > 14) || isWealthy) {
                let directStock = roundTo(remainingInvest * 0.5, 5000);
                let eqFund = roundTo(remainingInvest * 0.3, 5000);
                let reit = remainingInvest - directStock - eqFund;

                if(directStock > 0) { cAssets.push({cat: "สินทรัพย์ลงทุน", name: "พอร์ตหุ้นสามัญ (Direct Stocks)", val: directStock}); cInvest.push(["พอร์ตหุ้นสามัญ (Direct Stocks)", directStock, 8.0, "เติบโตระยะยาว (Long-term Growth)"]); }
                if(eqFund > 0) { cAssets.push({cat: "สินทรัพย์ลงทุน", name: "กองทุนรวมตราสารทุน (Equity Fund)", val: eqFund}); cInvest.push(["กองทุนรวมตราสารทุน (Equity Fund)", eqFund, 7.0, "เติบโตระยะยาว (Long-term Growth)"]); }
                if(reit > 0) { cAssets.push({cat: "สินทรัพย์ลงทุน", name: "กองทุนรวมอสังหาฯ (REITs)", val: reit}); cInvest.push(["กองทุนรวมอสังหาฯ (REITs)", reit, 6.0, "สร้างกระแสเงินสด (Passive)"]); }
            } else {
                let mixFund = roundTo(remainingInvest * 0.6, 5000);
                let fixFund = remainingInvest - mixFund;

                if(mixFund > 0) { cAssets.push({cat: "สินทรัพย์ลงทุน", name: "กองทุนรวมแบบผสม (Mixed Fund)", val: mixFund}); cInvest.push(["กองทุนรวมแบบผสม (Mixed Fund)", mixFund, 5.0, "เติบโตระยะยาว (Long-term Growth)"]); }
                if(fixFund > 0) { cAssets.push({cat: "สินทรัพย์ลงทุน", name: "กองทุนรวมตราสารหนี้ (Fixed Income)", val: fixFund}); cInvest.push(["กองทุนรวมตราสารหนี้ (Fixed Income)", fixFund, 3.0, "สำรองฉุกเฉิน/สภาพคล่อง"]); }
            }
        }

        if(isWealthy) {
            let offShore = roundTo(inc * rand(50, 200), 100000);
            cAssets.push({cat: "สินทรัพย์ต่างประเทศ", name: "พอร์ตลงทุนต่างประเทศ (Offshore)", val: offShore});
            cInvest.push(["พอร์ตลงทุนต่างประเทศ (Offshore)", offShore, 10.0, "เติบโตระยะยาว (Long-term Growth)"]);
        }
    }

    let houseAssetVal = 0;
    let carAssetVal = 0;

    if (currentHouseDebt > 0) houseAssetVal = roundTo(currentHouseDebt * rand(110, 150) / 100, 100000); 
    if (currentCarDebt > 0) carAssetVal = roundTo(currentCarDebt * rand(80, 120) / 100, 10000); 

    if (currentHouseDebt === 0 && age > 35 && rand(1,10) > 5) {
        houseAssetVal = roundTo(inc * rand(40, 100), 100000); 
    }
    if (currentCarDebt === 0 && age > 25 && hasCar) {
        carAssetVal = roundTo(inc * rand(10, 20), 10000); 
    }

    if (houseAssetVal > 0) {
        cAssets.push({cat: "อสังหาริมทรัพย์และที่ดิน", name: "บ้าน/ที่อยู่อาศัย (ราคาประเมิน)", val: houseAssetVal});
    }
    if (carAssetVal > 0) {
        cAssets.push({cat: "สินทรัพย์ส่วนตัว", name: "รถยนต์ (ประเมินหลังหักค่าเสื่อม)", val: carAssetVal});
    }

    const namePrefix = occ.includes("แพทย์") ? "นพ./พญ." : (occ.includes("ครู") ? "ครู" : (isWealthy ? "คุณ(VIP)" : "คุณ"));
    const mockNames = [
        "กิตติ", "สมชาย", "อารยา", "จิราพร", "วิทย์", "พลอย", "ณัฐ", "ชัย", "มินท์", "เอก", "จอย", "แอน",
        "ภูมิ", "ศักดิ์", "วีระ", "ตั้ม", "บอย", "เก่ง", "นนท์", "พีร์", "ก้อง", "ต้น", "เต้ย", "แบงค์", "อาร์ต", "ป๊อป", "วิน", "แม็ค", "โอ๊ต", "บอส", "เจมส์", "พงศ์", "วุฒิ", "กฤษณ์", "ท็อป", "พีท", "นพ",
        "เมย์", "นุ่น", "โบว์", "แนน", "ฟ้า", "น้ำ", "ป่าน", "ตาล", "กิ๊ฟ", "ส้ม", "ชมพู่", "พิม", "แพร", "หญิง", "มายด์", "ปุ๊ก", "ก้อย", "ตูน", "เจน", "แพท", "มุก", "อร", "รัตน์", "วิภา", "สุ", "ดา",
        "ภัทร", "กานต์", "รวิ", "ธาม", "ศร", "อิน", "ชล", "วศิน", "ธร", "พอร์ช", "ปราชญ์", "จิณณ์"
    ];
    const p_name = `${namePrefix}${pickStr(mockNames)} [${selectedStage.desc} - ${selectedJob.class}]`;

    const highCostProvs = ["กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "สมุทรปราการ", "ภูเก็ต", "ชลบุรี", "ระยอง"];
    const midCostProvs = ["เชียงใหม่", "ขอนแก่น", "นครราชสีมา", "สงขลา", "สุราษฎร์ธานี", "พระนครศรีอยุธยา"];
    const selectedProv = pickStr(provs);
    let livingCostByProvince = 15000; 
    if (highCostProvs.includes(selectedProv)) {
        livingCostByProvince = 30000; 
    } else if (midCostProvs.includes(selectedProv)) {
        livingCostByProvince = 22000; 
    }
        
    const data = {
        p_name: p_name,
        p_age: age,
        p_occ: occ,
        p_province: selectedProv,
        p_welfare: welf,
        p_health: rand(1,10) > 8 ? "มีโรคประจำตัว (ความดัน, ไขมัน, เบาหวาน)" : "แข็งแรงดี / ไม่มีโรคประจำตัวร้ายแรง",
        p_dep: dep,
        p_unitlinked: (inc > 50000 ? "สนใจ" : "ไม่สนใจ"),
        bq_1: bq1, bq_2: bq2, bq_3: bq3, bq_4: bq4, bq_5: bq5, bq_6: bq6, bq_7: bq7, bq_8: bq8, bq_9: bq9, bq_10: bq10,
        r_retAge: (selectedJob.class === "Civil" ? 60 : (isRetiree ? age : 55)),
        r_lifeExp: (selectedJob.class === "Grassroots" ? 85 : 85),
        r_reqInc: (isRetiree ? livingCostByProvince : roundTo(totalExp * (isWealthy ? 0.8 : 0.6), 1000)),
        r_preRet: window.globalMacroData ? window.globalMacroData.marketReturn : 5.0,
        r_inf: window.globalMacroData ? window.globalMacroData.inflation : 3.0,
        r_med_inf: window.globalMacroData ? window.globalMacroData.medInflation : 6.0
    };

    Object.keys(data).forEach(key => {
        if(document.getElementById(key)) document.getElementById(key).value = data[key];
    });

    let genInc = [{catValue: "รายได้จากการทำงาน", catText: "รายได้จากการทำงาน", name: "รายได้หลัก", val: inc}];
    if (isWealthy || selectedJob.class.includes("Rentier")) {
        let passiveVal = roundTo(inc * (rand(10, 40) / 100), 5000);
        genInc.push({catValue: "รายได้จากสินทรัพย์", catText: "รายได้จากสินทรัพย์", name: "ค่าเช่า/เงินปันผล", val: passiveVal});
    }
    
    // โหลดลงตารางปกติ
    if(typeof loadStandardRows === 'function') {
        loadStandardRows('c_assets', cAssets.map(x => ({catValue: x.cat, catText: x.cat, name: x.name, val: x.val})), ['ชื่อรายการ', 'มูลค่า (บาท)'], 'ast_list');
        loadStandardRows('c_liab', cLiab.map(x => ({catValue: x.cat, catText: x.cat, name: x.name, val: x.val})), ['ชื่อรายการ', 'ยอดคงเหลือ (บาท)'], 'liab_list');
        loadStandardRows('c_inc', genInc, ['ชื่อรายการ', 'จำนวน (บาท/เดือน)'], 'inc_list');
        loadStandardRows('c_exp', cExp.map(x => ({catValue: x.cat, catText: x.cat, name: x.name, val: x.val})), ['ชื่อรายการ', 'จำนวน (บาท/เดือน)'], 'exp_list');
    }
    
    let cGoals = [];
    if (dep > 0) {cGoals.push(["ทุนการศึกษาบุตร", roundTo(1000000 * dep, 100000), rand(5, 15), 1]);} 
    if (age >= 25 && age <= 40 && inc >= 30000) {cGoals.push(["ดาวน์บ้าน / ซื้อที่อยู่อาศัย", roundTo(inc * 25, 100000), rand(3, 7), 2]);} 
    
    if(typeof addCustomRow === 'function') {
        cGoals.forEach(vals => addCustomRow('c_goals', ['ชื่อเป้าหมาย (Specific)', 'จำนวนเงินที่ต้องการ (Measurable)', 'ระยะเวลา/ปี (Time-bound)', 'ระดับความสำคัญ (1=สูงสุด)'], vals, ['goal_list', '', '', '']));
    }
    if(typeof addInvestRow === 'function') {
        cInvest.forEach(vals => addInvestRow(vals[0], vals[1], vals[2], vals[3]));
    }

    // ==========================================
    // 🚨 8. จำลองพอร์ตกรมธรรม์เดิม (AI Policy Simulation)
    // ==========================================
    let currentYearThai = new Date().getFullYear() + 543;
    let numPolicies = 0;
    if (inc > 15000) {
        let randChance = rand(1, 100);
        if (isWealthy) {
            if (randChance <= 85) numPolicies = rand(1, 4);
        } else if (age > 40) {
            if (randChance <= 75) numPolicies = rand(1, 3);
        } else {
            if (randChance <= 60) numPolicies = rand(1, 2);
        }
    }

    let accumulatedTotalPremium = 0;
    let maxAffordablePremium = (inc * 12) * 0.20; 

    for (let pCount = 0; pCount < numPolicies; pCount++) {
        if (accumulatedTotalPremium >= maxAffordablePremium) break;

        let maxPolicyAge = Math.max(1, age - 20); 
        let policyAge = rand(1, Math.min(12, maxPolicyAge)); 
        let issueAge = age - policyAge; 

        // ตรวจสอบว่าระบบมี aiaBaseProductMatrix หรือไม่
        if (typeof aiaBaseProductMatrix !== 'undefined') {
            let eligibleBases = Object.entries(aiaBaseProductMatrix).filter(([name, attr]) => {
                let minA = attr.minAge !== undefined ? attr.minAge : 0;
                let maxA = attr.maxAge !== undefined ? attr.maxAge : 99;
                if (issueAge < minA || issueAge > maxA) return false;

                if ((name.includes("Senior") || name.includes("ซีเนียร์")) && issueAge < 50) return false;
                let isUnitLinked = (attr.type && attr.type.includes("UnitLinked")) || name.includes("Issara");
                if (isUnitLinked && issueAge < 18) return false;

                let isPrestige = name.includes("Prestige") || (attr.type && attr.type.includes("HNW"));
                if (isPrestige && !isWealthy) return false; 
                if (!isPrestige && isWealthy && rand(1,10) > 3) return false; 

                if (name === "AIA Elite Income Prestige" && (inc * 12 * 0.4) < 500000) return false;

                let estPrem = (attr.minSA || 100000) * 0.03; 
                if (attr.minPremiumRPP) estPrem = attr.minPremiumRPP;
                
                if (accumulatedTotalPremium + estPrem > maxAffordablePremium) return false;

                return true; 
            });

            if(eligibleBases.length > 0) {
                let selectedBase = pickStr(eligibleBases);
                let baseName = selectedBase[0];
                let baseDef = selectedBase[1];

                let wlVal = 0;
                let wlPrem = 0;
                let baseType = baseDef.type || 'ตลอดชีพ/สะสมทรัพย์';

                if (baseName === "AIA Elite Income Prestige") {
                    let minElitePrem = 500000;
                    let availableBudget = maxAffordablePremium - accumulatedTotalPremium;
                    let maxEliteAfford = Math.max(minElitePrem, Math.min(availableBudget, roundTo(inc * 12 * rand(20, 50)/100, 100000)));
                    wlPrem = maxEliteAfford;
                    wlVal = wlPrem * 5 * 1.10;
                } else {
                    let minSA = baseDef.minSA || 100000;
                    let maxSA = baseDef.maxSA || Infinity;
                    if (maxSA > 50000000) maxSA = (inc * 12) * 10; 

                    let multiplier = pCount === 0 ? rand(10, 50) : rand(5, 20);
                    wlVal = Math.max(minSA, roundTo(inc * multiplier, 50000)); 
                    if (wlVal > maxSA) wlVal = maxSA;

                    wlPrem = roundTo(wlVal * 0.03, 1000); 

                    if (baseDef.minPremiumRPP && wlPrem < baseDef.minPremiumRPP) {
                        wlPrem = baseDef.minPremiumRPP;
                        wlVal = roundTo(wlPrem / 0.03, 50000); 
                    }
                }

                accumulatedTotalPremium += wlPrem; 

                let startYear = currentYearThai - policyAge;
                let endYear = currentYearThai + (baseDef.payYears || 20); 
                
                let csv = 0;
                if (baseType !== "Term" && baseType !== "CIBase" && policyAge >= 2) { 
                    let totalPremiumPaid = wlPrem * policyAge; 
                    csv = roundTo(totalPremiumPaid * Math.min(0.85, (policyAge * 0.08)), 1000);
                    if(csv > wlVal) csv = wlVal; 
                }

                if (typeof addBasePolicy === 'function') {
                    let p1 = addBasePolicy(`${baseName} (เล่มที่ ${pCount + 1})`, baseType, wlVal.toString(), wlPrem.toString(), startYear, endYear, csv.toString());
                    
                    if (p1 && inc > 15000 && typeof aiaRiderMatrix !== 'undefined') {
                        let btn = p1.querySelector('button'); 
                        let targetTier = isWealthy ? "Premium" : (inc > 50000 ? pickStr(["Standard", "Premium"]) : "Economy");
                        const checkRiderAgeLimit = (attr) => (issueAge >= (attr.minAge||0) && issueAge <= (attr.maxAge||99));

                        // 🩺 4.1 สุขภาพ
                        if(rand(1,10) > 6) { 
                            let hOpts = Object.entries(aiaRiderMatrix).filter(([k, attr]) => attr.category === "Health" && checkRiderAgeLimit(attr));
                            let tMatch = hOpts.filter(([k, attr]) => !attr.tier || attr.tier === targetTier);
                            if (tMatch.length > 0) hOpts = tMatch;

                            if(hOpts.length > 0 && typeof addRiderRow === 'function') {
                                let [hName, hDef] = pickStr(hOpts);
                                let hSA = (hDef.businessRule && hDef.businessRule.type === "fixed_plan") ? pickStr(hDef.businessRule.plans) : (hDef.defaultSA || (isWealthy ? 15000000 : 5000000));
                                let hPrem = roundTo((inc * 12) * (isWealthy ? 0.02 : 0.04), 1000); 
                                
                                if (accumulatedTotalPremium + hPrem <= maxAffordablePremium) {
                                    addRiderRow(btn, `${hName} (เดิม)`, 'สุขภาพ (Health)', hSA.toString(), hPrem.toString());
                                    accumulatedTotalPremium += hPrem;
                                }
                            }
                        }

                        // 🛏️ 4.2 ชดเชยรายได้
                        if(rand(1,10) > 7) { 
                            let hbOpts = Object.entries(aiaRiderMatrix).filter(([k, attr]) => attr.category === "Compensation" && checkRiderAgeLimit(attr));
                            if(hbOpts.length > 0 && typeof addRiderRow === 'function') {
                                let [hbName, hbDef] = pickStr(hbOpts);
                                let minHB = hbDef.businessRule?.min || 500;
                                let stepHB = hbDef.businessRule?.step || 500;
                                let maxHB = hbDef.businessRule?.max || 10000;
                                
                                let targetHB = roundTo(inc / 30, stepHB);
                                let hbSA = Math.max(minHB, Math.min(maxHB, targetHB)); 
                                let hbPrem = roundTo(hbSA * 4, 100); 
                                
                                if (accumulatedTotalPremium + hbPrem <= maxAffordablePremium) {
                                    addRiderRow(btn, `${hbName} (เดิม)`, 'ชดเชยรายได้ (HB)', hbSA.toString(), hbPrem.toString());
                                    accumulatedTotalPremium += hbPrem;
                                }
                            }
                        }
                        
                        // 🛡️ 4.3 โรคร้ายแรง
                        let numCI = rand(0, 2);
                        if(numCI > 0) {
                            let ciOpts = Object.entries(aiaRiderMatrix).filter(([k, attr]) => attr.category === "CI" && checkRiderAgeLimit(attr));
                            if(ciOpts.length > 0 && typeof addRiderRow === 'function') {
                                ciOpts.sort(() => 0.5 - Math.random()); 
                                let limit = Math.min(numCI, ciOpts.length); 
                                for(let i = 0; i < limit; i++) {
                                    let [ciName, ciDef] = ciOpts[i];
                                    let minCI = ciDef.businessRule?.min || 500000;
                                    let stepCI = ciDef.businessRule?.step || 100000;
                                    let maxCI = ciDef.businessRule?.max || 10000000;
                                    
                                    let targetCI = roundTo((inc * 12) * rand(1, 3), stepCI);
                                    let ciSA = Math.max(minCI, Math.min(maxCI, targetCI)); 
                                    let ciPrem = roundTo(ciSA * 0.005, 500); 
                                    
                                    if (accumulatedTotalPremium + ciPrem <= maxAffordablePremium) {
                                        addRiderRow(btn, `${ciName} (เดิม)`, 'โรคร้ายแรง (CI)', ciSA.toString(), ciPrem.toString());
                                        accumulatedTotalPremium += ciPrem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } 

    if(typeof syncAgeToRisk === 'function') syncAgeToRisk();
    alert(`✅ สร้างกรณีศึกษา: ${p_name} สำเร็จ!\n\n(AI จำลองข้อมูลระดับ 7 มิติ พร้อมสุ่มพอร์ตกรมธรรม์เดิมให้เรียบร้อย)`);
}

// 🟢 ฟังก์ชันทางเลือกเพื่อสร้างเคสเปล่าตอนโหลดเข้าโปรแกรม (สำหรับ AutoSave Init)
function loadCaseStudy1() {
    let elName = document.getElementById('p_name');
    let elAge = document.getElementById('p_age');
    let elOcc = document.getElementById('p_occ');
    let elRetAge = document.getElementById('r_retAge');
    let elReqInc = document.getElementById('r_reqInc');

    if(elName) elName.value = "คุณ สมมติ รักการออม (กรณีศึกษา)";
    if(elAge) elAge.value = "35";
    if(elOcc) elOcc.value = "พนักงานบริษัทเอกชน";
    if(elRetAge) elRetAge.value = "60";
    if(elReqInc) elReqInc.value = "30000";

    if(typeof syncAgeToRisk === 'function') syncAgeToRisk();
}