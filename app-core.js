    // --- 🛠️ Smart Functions & 🤖 NLG Core ---

    function validateSumAssured(productName, proposedSumAssured, proposedPremium = 0) {
        let product = aiaBaseProductMatrix[productName];
        if (!product) return proposedSumAssured;

        let minSA = product.minSA || 0;
        let maxSA = product.maxSA || Infinity; // 🌟 ดึงค่าเพดานสูงสุดมาใช้

        // 1. ถ้าคำนวณมาต่ำกว่าขั้นต่ำ -> บังคับใช้ขั้นต่ำ
        if (proposedSumAssured < minSA) proposedSumAssured = minSA;
        
        // 2. ถ้าคำนวณมาทะลุเพดาน -> บังคับให้หยุดที่เพดานสูงสุด
        if (proposedSumAssured > maxSA) proposedSumAssured = maxSA;

        // 3. ปัดเศษทุนประกันให้สวยงาม (เพื่อไม่ให้เบี้ยมีเศษสตางค์แปลกๆ)
        if (proposedSumAssured >= 1000000) {
            return Math.ceil(proposedSumAssured / 100000) * 100000; 
        } else {
            return Math.ceil(proposedSumAssured / 10000) * 10000; 
        }
    }

    function isEligible(productName, age) {
        // เช็คได้ทั้ง Base Plan และ Rider
        let product = aiaBaseProductMatrix[productName] || aiaRiderMatrix[productName];
        if (!product) return true; 
        return age >= (product.minAge || 0) && age <= (product.maxAge || 99);
    }
     
    // 🌟 ระบบแต่งประโยค AI (NLG) ที่สร้างคำแนะนำแบบไดนามิก
    function generateNLGRecommendation(productName, customerAge, proposedSumAssured) {
        let product = aiaBaseProductMatrix[productName];
        if (!product) {
            return `ระบบแนะนำ <b>${productName}</b> เป็นเครื่องมือทางการเงินเพื่ออุดรอยรั่วความเสี่ยงของคุณครับ`;
        }

        // 1. ตรวจสอบสิทธิ์อายุ
        if (!isEligible(productName, customerAge)) {
            return `<span class="text-red-600">⚠️ ขออภัยครับ แบบประกัน <b>${productName}</b> ไม่รองรับช่วงอายุ ${customerAge} ปี กรุณาปรับเปลี่ยนแผนใหม่</span>`;
        }

        // 2. แต่งประโยคเชิงลึกตามบริบททุนประกันและระยะเวลาชำระเบี้ย
        let validatedSum = validateSumAssured(productName, proposedSumAssured);
        let sumText = validatedSum >= 10000000 ? `ทุนประกันระดับสูง ${validatedSum.toLocaleString()} บาท` : `ทุนเริ่มต้น ${validatedSum.toLocaleString()} บาท`;
        let payText = product.payYears !== 99 ? `ด้วยภาระการชำระเบี้ยที่กำหนดไว้ชัดเจนเพียง ${product.payYears} ปี` : `ด้วยการชำระเบี้ยแบบยืดหยุ่น`;
        
        let aiReason = "";
        
        // 3. ปรับโทนข้อความให้เข้ากับ Type ของผลิตภัณฑ์ (NLG Logic)
        if (product.type.includes("HNW") || product.type.includes("Prestige")) {
            aiReason = `<b>AI Navigator วิเคราะห์:</b> ด้วยสถานะทางการเงินของคุณ ระบบแนะนำให้ใช้เครื่องมือระดับพรีเมียมอย่าง <b>${productName}</b> ${payText} เพื่อจัดสรร ${sumText} 💡 <i>"${product.highlight}"</i>`;
        } 
        else if (product.type.includes("UnitLinked")) {
            aiReason = `<b>AI Navigator วิเคราะห์:</b> เพื่อเพิ่มโอกาสให้เงินทำงาน ระบบประเมินว่า <b>${productName}</b> คือคำตอบที่ใช่ ${payText} 💡 <i>"${product.highlight}"</i>`;
        }
        else if (product.type.includes("Annuity") || product.type.includes("Senior")) {
            aiReason = `<b>AI Navigator วิเคราะห์:</b> การเตรียมพร้อมล่วงหน้าคือหัวใจสำคัญ ขอแนะนำ <b>${productName}</b> ${payText} 💡 <i>"${product.highlight}"</i>`;
        }
        else {
            aiReason = `<b>AI Navigator วิเคราะห์:</b> เพื่อเสริมเกราะป้องกันความเสี่ยงขั้นพื้นฐาน แนะนำให้โอนความเสี่ยงไว้กับ <b>${productName}</b> วงเงิน ${sumText} 💡 <i>"${product.highlight}"</i>`;
        }

        return aiReason;
    }

    // ==========================================
    // 🧠 AI Portfolio Analyzer & Competitor Learning System
    // ==========================================

    // 1. ฟังก์ชันเรียนรู้และสกัดจุดอ่อนจากพอร์ตกรมธรรม์เดิม (Feature Extraction)
    function analyzeExistingPortfolio() {
        let insights = {
            totalPremium: 0,
            totalSumAssured: 0,
            hasSaving: false,
            hasWholeLife: false,
            hasHealth: false,
            hasCI: false,
            competitorCount: 0, 
            premiumBurdenPct: 0, 
            missingCI: true, 
            lowLiquidity: false 
        };

        // กวาดข้อมูลกรมธรรม์ทั้งหมดที่ลูกค้ากรอกเข้ามาในหน้าจอ
        let policyElements = document.querySelectorAll('.policy-wrapper');
        policyElements.forEach(el => {
            let name = el.querySelector('.col-ins-name') ? el.querySelector('.col-ins-name').value : "";
            let type = el.querySelector('.col-ins-type') ? el.querySelector('.col-ins-type').value : "";
            let val = parseNum(el.querySelector('.col-ins-val') ? el.querySelector('.col-ins-val').value : 0);
            let prem = parseNum(el.querySelector('.col-ins-prem') ? el.querySelector('.col-ins-prem').value : 0);

            insights.totalPremium += prem;
            insights.totalSumAssured += val;

            // ตรวจสอบว่าเป็นของค่ายอื่นหรือไม่ (ชื่อไม่ได้ระบุว่า AIA)
            let isCompetitor = name !== "" && !name.toUpperCase().includes("AIA");
            if (isCompetitor) insights.competitorCount++;

            // เรียนรู้ประเภทผลประโยชน์
            if (type.includes("สะสมทรัพย์")) insights.hasSaving = true;
            if (type.includes("ตลอดชีพ")) insights.hasWholeLife = true;
            if (type.includes("สุขภาพ") || type.includes("ค่ารักษา")) insights.hasHealth = true;
            if (type.includes("โรคร้ายแรง") || type.includes("CI")) {
                insights.hasCI = true;
                insights.missingCI = false;
            }
        });

        if (insights.totalSumAssured > 0) {
            insights.premiumBurdenPct = (insights.totalPremium / insights.totalSumAssured) * 100;
        }

        if (insights.hasSaving && !insights.hasCI) {
            insights.lowLiquidity = true;
        }

        return insights;
    }

    // 2. ฟังก์ชัน NLG อัจฉริยะ: ผสานข้อเสนอ AIA เข้ากับจุดอ่อนของพอร์ตเดิม
    function generateSmartGapAnalysisNLG(aiaProductName, customerAge, proposedSumAssured) {
        // ดึง NLG มาตรฐานจากฟังก์ชันตัวบนมาใช้เป็นแกนหลัก
        let baseNLG = generateNLGRecommendation(aiaProductName, customerAge, proposedSumAssured); 
        
        let portfolioInsights = analyzeExistingPortfolio();

        if (portfolioInsights.totalSumAssured === 0) return baseNLG;

        let gapPitch = "";

        if (portfolioInsights.missingCI && (aiaProductName.includes("CI SuperCare") || aiaProductName.includes("CI ProCare"))) {
            gapPitch = `<div class="mt-3 p-3 bg-red-50 border-l-4 border-red-500 text-sm text-red-800 rounded">
                <b>💡 AI Portfolio Analysis:</b> ระบบวิเคราะห์โครงสร้างพอร์ตเดิมของคุณพบว่า <b>"ยังไม่มีเกราะป้องกันกลุ่มโรคร้ายแรง (CI)"</b> ซึ่งเป็นความเสี่ยงหลักที่อาจทำลายเงินออมในกรมธรรม์อื่นได้ทั้งหมด การเพิ่ม <b>${aiaProductName}</b> เข้าไป จะช่วยอุดรอยรั่วนี้ได้อย่างสมบูรณ์แบบ
            </div>`;
        } 
        else if (portfolioInsights.lowLiquidity && (aiaProductName.includes("UnitLinked") || aiaProductName.includes("Issara") || aiaProductName.includes("Prestige"))) {
            gapPitch = `<div class="mt-3 p-3 bg-purple-50 border-l-4 border-purple-500 text-sm text-purple-800 rounded">
                <b>💡 AI Portfolio Analysis:</b> กรมธรรม์เดิมของคุณมีสัดส่วนของการล็อกเงินทุนระยะยาวสูง (สภาพคล่องต่ำ) ระบบจึงแนะนำโครงสร้างแบบ <b>${aiaProductName}</b> เพื่อเพิ่ม "ความยืดหยุ่นและโอกาสรับผลตอบแทนระดับสากล" ทำให้พอร์ตโดยรวมของคุณสมดุลขึ้น
            </div>`;
        }
        else if (portfolioInsights.premiumBurdenPct > 5 && aiaProductName.includes("20 Pay Life")) {
            gapPitch = `<div class="mt-3 p-3 bg-green-50 border-l-4 border-green-500 text-sm text-green-800 rounded">
                <b>💡 AI Portfolio Analysis:</b> อัตราต้นทุนเบี้ยประกันต่อความคุ้มครองในพอร์ตเดิมของคุณค่อนข้างสูง (Premium Burden) ระบบจึงตั้งใจเลือก <b>${aiaProductName}</b> เพื่อดึงค่าเฉลี่ยต้นทุนความเสี่ยงของคุณลงมา (Cost-Effective Protection)
            </div>`;
        }
        else if (portfolioInsights.competitorCount > 0) {
             gapPitch = `<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-500 text-sm text-blue-800 rounded">
                <b>💡 AI Portfolio Analysis:</b> ระบบได้เรียนรู้และควบรวมโครงสร้างผลประโยชน์จากกรมธรรม์ปัจจุบันของคุณ การเติม <b>${aiaProductName}</b> เข้าไปจิ๊กซอว์ตัวนี้ จะทำให้เลเยอร์การปกป้องความมั่งคั่งของคุณครอบคลุมทุกมิติมากยิ่งขึ้น
            </div>`;
        }

        return baseNLG + gapPitch;
    }

// =====================================================================
// 🧠 [ULTIMATE MASTER] AI Dynamic 3-Option Solutions (Economics & Psychology Integrated)
// =====================================================================
// ฟังก์ชันคำนวณระยะห่าง (KNN Distance) - หาความต่างระหว่าง "ใจลูกค้า" กับ "ตัวสินค้า"
function calculatePenalty(target, features) {
    let penalty = 0;
    for (let key in target) {
        if (features && features[key] !== undefined) {
            // ใช้สูตร Manhattan Distance (ผลรวมความต่าง) เพื่อความเข้าใจง่าย
            penalty += Math.abs(target[key] - features[key]);
        }
    }
    return penalty;
}

// ฟังก์ชันกรองและจัดอันดับสินค้าตามหมวดหมู่ (Assembly Machine)
function matchProductsByPersona(clientTarget, category, isHNW, currentAge) {
    let results = [];
    
    // เลือกใช้ Matrix ตามหมวดหมู่ (Base หรือ Rider)
    let db = (category === 'Base') ? aiaBaseProductMatrix : aiaRiderMatrix;

    for (let name in db) {
        let p = db[name];
        
        // --- 🛡️ Business Rules (Hard Filters) ---
        if (p.status === 'legacy') continue; // ข้ามสินค้าที่เลิกขายแล้ว
        if (currentAge < p.minAge || currentAge > p.maxAge) continue; // ข้ามถ้าอายุไม่ผ่านเกณฑ์
        
        // ถ้าไม่ใช่ HNW ให้ข้ามสินค้ากลุ่ม Prestige/HNW
        let isProductHNW = (p.type && p.type.includes('HNW')) || name.includes('Prestige');
        if (!isHNW && isProductHNW) continue;

        // --- 🧠 AI Scoring (Soft Matching) ---
        // กรณี Rider ต้องเช็ค Category (Health/CI/Compensation) ให้ตรงกับที่ AI กำลังหา
        if (category !== 'Base' && p.category !== category) continue;

        let score = calculatePenalty(clientTarget, p.features);
        results.push({ name: name, penalty: score, highlight: p.highlight, features: p.features });
    }

    // 1. เรียงลำดับตัวที่ Penalty น้อยที่สุดขึ้นก่อน (ยิ่งน้อยยิ่ง Match)
    results.sort((a, b) => a.penalty - b.penalty);
    
    // 2. 🧠 AI EXPLORATION LOGIC (Top-K Sampling)
    // ดึงเฉพาะกลุ่ม Top ที่คะแนนสูสีกันมาสุ่ม เพื่อให้กรณีศึกษามีความหลากหลายสมจริง
    if (results.length > 0) {
        let bestScore = results[0].penalty;
        
        // ดึงสินค้าที่คะแนนห่างจากอันดับ 1 ไม่เกิน 3 แต้ม (หรือดึงมาแค่ 3 อันดับแรก)
        let topCandidates = results.filter(r => r.penalty <= bestScore + 3).slice(0, 3);
        
        // สุ่มเลือก 1 ตัวจากกลุ่ม Top Candidates แบบมีน้ำหนัก
        let winnerIndex = Math.floor(Math.random() * topCandidates.length);
        let winner = topCandidates[winnerIndex];
        
        // ดันผู้ชนะขึ้นไปอยู่อันดับ 1 (Index 0) เพื่อให้ระบบนำไปจัดลงตะกร้าทันที
        results = results.filter(r => r.name !== winner.name); // เอาตัวที่ชนะออกจากอาเรย์เดิมก่อน
        results.unshift(winner); // เอาไปแทรกไว้ตำแหน่งแรกสุด
    }

    return results;
}

// --- 🧠 ฟังก์ชันคำนวณและปัดเศษเข้าหา Business Rule (อัปเกรดระบบลดโดสยา + คุมเพดาน UW Limit) 🧠--- //
function calculateDynamicCoverage(productName, category, inc, expTotal, ratio = 1.0, uwLimit = Infinity) {
    let productData = aiaRiderMatrix[productName];
    let rule = productData ? productData.businessRule : null;
    if (!rule) return { text: "แผนมาตรฐาน", value: 1000000 }; 

    if (category === 'Health' && rule.type === 'fixed_plan') {
        let idealNeed = (inc * 12) * ratio; 
        
        let validPlans = rule.plans.filter(p => p <= uwLimit);
        if (validPlans.length === 0) return null; 

        let selectedPlan = validPlans.find(p => p >= idealNeed);
        if (!selectedPlan) selectedPlan = validPlans[validPlans.length - 1]; 

        let text = selectedPlan >= 1000000 ? `แผน ${selectedPlan/1000000} ล้านบาท` : `แผน ${selectedPlan/10000} หมื่นบาท`;
        return { text: text, value: selectedPlan };
    } 
    else if (category === 'CI' && rule.type === 'flexible') {
        let idealNeed = ((expTotal * 12) * 3) * ratio; 
        let actualPlan = Math.max(rule.min, Math.ceil(idealNeed / rule.step) * rule.step);
        
        actualPlan = Math.min(actualPlan, uwLimit);
        if (actualPlan < rule.min) return null; 

        let text = actualPlan >= 1000000 ? `ทุน ${(actualPlan/1000000).toFixed(1)} ล้านบาท` : `ทุน ${(actualPlan/100000).toFixed(1)} แสนบาท`;
        return { text: text, value: actualPlan };
    }
    else if (category === 'Compensation' && rule.type === 'flexible') {
        let idealNeed = (inc / 30) * ratio;
        let actualPlan = Math.max(rule.min, Math.floor(idealNeed / rule.step) * rule.step);
        
        actualPlan = Math.min(actualPlan, uwLimit);
        if (actualPlan < rule.min) return null;

        return { text: `วันละ ${actualPlan.toLocaleString()} บาท`, value: actualPlan };
    }
    return { text: "", value: 0 };
}

function getDynamicAIASolutions(diffLife, diffHealth, diffCI, personaType, netCashflow, rawAge, safeDisc) {
    // 1. ตรวจสอบเงื่อนไขอายุขั้นสูง (Self-Insurance / Wealth Management)
    if (rawAge > 75) {
        return `
        <div class="bg-slate-100 border-2 border-slate-200 p-8 rounded-2xl text-center shadow-inner animate-fade-in">
            <span class="text-5xl mb-4 block">🏛️</span>
            <h4 class="font-bold text-slate-800 text-xl mb-2">การบริหารสินทรัพย์เพื่อวัยอิสระ (Wealth Management Only)</h4>
            <p class="text-sm text-slate-600 leading-relaxed italic max-w-2xl mx-auto">
                "เนื่องจากอายุปัจจุบันอยู่นอกเหนือเกณฑ์การรับประกันมาตรฐาน ระบบ AI จึงปรับโหมดจากการนำเสนอประกัน เป็นการแนะนำการบริหารกองทุนส่วนบุคคล และกลยุทธ์ Self-Insurance เพื่อเป็นกองทุนค่ารักษาพยาบาลและวางแผนส่งต่อมรดกแทนครับ"
            </p>
        </div>`;
    }

    // 2. จัดกลุ่ม Persona และดึงข้อมูลพื้นฐาน
    let isHNW = ['HNW_Biz', 'HNW_Founder', 'HNW_Rentier', 'UHNW_Elite', 'Executive', 'Specialist', 'MNC_Corp'].some(c => personaType.includes(c)) || personaType.includes('HNW');
    let primaryFear = document.getElementById('bq_5') ? document.getElementById('bq_5').value : "family"; 

    // =====================================================================
    // 🌟 [FIX 100%] Safe DOM Data Extraction (Single Source of Truth)
    // ป้องกันปัญหาตัวแปรล่องหน (Undeclared Variables) โดยกวาดข้อมูลใหม่ให้จบใน Scope
    // =====================================================================
    const getSum = (selector) => {
        let sum = 0;
        document.querySelectorAll(selector).forEach(input => {
            sum += Number(input.value.replace(/,/g, '')) || 0;
        });
        return sum;
    };

    // ดึงค่าการเงินพื้นฐาน
    let inc = getSum('#c_inc .col-val, .inc-val') || 15000;
    let monthlyExpense = getSum('#c_exp .col-val, .exp-val') || 15000;
    let totalLiabilities = getSum('#c_liab .col-val') || 0;
    let realAst = getSum('#c_assets .col-val') || 0;
    let safeNetWorth = realAst - totalLiabilities;
    
    // ดึงข้อมูลส่วนตัว
    let currentAge = parseInt(document.getElementById('p_age')?.value) || rawAge || 26;
    let safeAge = currentAge;
    let gender = document.getElementById('p_gender')?.value || "M";
    let medInfRate = parseFloat(document.getElementById('r_med_inf')?.value) || 6.0;
    let occString = (document.getElementById('p_occ')?.value || '').toLowerCase();
    let isFreelance = occString.includes('ฟรีแลนซ์') || occString.includes('อิสระ') || occString.includes('ค้าขาย') || occString.includes('เทรดเดอร์') || occString.includes('influencer');
    let isGigWorker = occString.includes('รายวัน') || occString.includes('ชั่วคราว') || occString.includes('ไรเดอร์') || occString.includes('โรงงาน');
    let isBusinessOwner = occString.includes('กิจการ') || occString.includes('ธุรกิจ') || occString.includes('ประธาน') || occString.includes('นายจ้าง');
    let healthString = (document.getElementById('p_health')?.value || '').toLowerCase();
    let hasHealthIssues = healthString.includes('โรค') || healthString.includes('ป่วย') || healthString.includes('ผ่าตัด') || healthString.includes('ความดัน') || healthString.includes('เบาหวาน') || healthString.includes('ไขมัน');
    let depString = document.getElementById('p_dep')?.value || '0';
    let dependentCount = parseInt(depString.replace(/\D/g, '')) || 0;
    let numDependents = dependentCount;
    let hasDependents = dependentCount > 0;

    // กวาดข้อมูลงบรายจ่ายเพื่อหักลบ
    let monthlyDebtPmt = 0;
    let savingsAmt = 0;
    let expNoTaxDebt = 0; 
    document.querySelectorAll('#c_exp .data-row, #c_exp .custom-row, #c_exp > div, .exp-row').forEach(row => {
        let nameElem = row.querySelector('.col-name');
        let name = nameElem ? nameElem.value : (row.innerText || "");
        let val = Number((row.querySelector('.col-val, .exp-val') || {value:'0'}).value.replace(/,/g, '')) || 0;
        
        if (row.dataset?.cat === 'เงินชำระคืนหนี้สิน' || name.includes('หนี้')) {
            monthlyDebtPmt += val;
        } else if (row.dataset?.cat === 'รายจ่ายเพื่อออม/ลงทุน' || name.includes('ออม')) {
            savingsAmt += val;
        } 
        if (!name.includes('ภาษี') && !name.includes('หนี้')) {
            expNoTaxDebt += val;
        }
    });

    // กวาดข้อมูลพอร์ตประกันเดิมของลูกค้า
    let existingInsLife = 0;
    let existingInsHealth = 0;
    document.querySelectorAll('#c_ins .custom-row').forEach(row => {
        let type = row.querySelector('.col-ins-type')?.value || '';
        let val = Number((row.querySelector('.col-ins-val') || {value:'0'}).value.replace(/,/g, '')) || 0;
        if (type.includes('สุขภาพ') || type.includes('โรคร้าย')) existingInsHealth += val;
        else if (!type.includes('ชดเชย')) existingInsLife += val; // ตลอดชีพ, บำนาญ ฯลฯ
    });

    // กวาดข้อมูลพอร์ตลงทุนและสภาพคล่อง
    let liquidAssets = 0;
    let investmentAssets = 0;
    let legacyAssetsValue = 0; 
    let availableInvestmentsForLifeGap = 0; 

    document.querySelectorAll('#c_assets > div, .asset-row, .custom-row').forEach(row => {
        let valInput = row.querySelector('.col-val, .asset-val');
        let text = row.innerText || "";
        let val = valInput ? Number(valInput.value.replace(/,/g, '')) || 0 : 0;

        if (text.includes('สภาพคล่อง') || text.includes('เงินฝาก') || text.includes('ออมทรัพย์')) {
            liquidAssets += val;
        } else if (text.includes('ลงทุน') || text.includes('ต่างประเทศ')) {
            investmentAssets += val;
        }
    });

    document.querySelectorAll('#c_invest_current .custom-row').forEach(row => {
        let val = Number((row.querySelector('.col-inv-val') || {value:'0'}).value.replace(/,/g, '')) || 0;
        let obj = row.querySelector('.col-inv-obj')?.value || "";
        if (obj === 'ส่งมอบความมั่งคั่ง/ธุรกิจ') legacyAssetsValue += val; 
        else if (obj === 'สำรองฉุกเฉิน/สภาพคล่อง') availableInvestmentsForLifeGap += val; 
        else availableInvestmentsForLifeGap += (val * 0.80); 
    });

    if (availableInvestmentsForLifeGap === 0 && investmentAssets > 0) {
        availableInvestmentsForLifeGap = investmentAssets * 0.80; // Default assumption
    }

    // ประเมินมูลค่าสวัสดิการ
    let welfareText = document.getElementById('p_welfare')?.value || "";
    let welfareLifeValue = 0;
    let welfareHealthValue = 0;

    if (welfareText.includes("ผู้บริหาร") || welfareText.includes("Executive")) { welfareHealthValue = 5000000; } 
    else if (welfareText.includes("ข้าราชการ") || welfareText.includes("รัฐวิสาหกิจ")) { welfareHealthValue = 1000000; welfareLifeValue = 200000; } 
    else if (welfareText.includes("ประกันกลุ่ม") || welfareText.includes("สวัสดิการพนักงาน")) { welfareHealthValue = 500000; welfareLifeValue = 100000; } 
    else if (welfareText.includes("ประกันสังคม")) { welfareHealthValue = 300000; welfareLifeValue = 50000; }

    // =====================================================================
    // 🔄 DYNAMIC NET RISK GAP CALCULATION (คำนวณใหม่ทับค่าที่รับเข้ามา)
    // =====================================================================
    
    // 1. คำนวณส่วนขาดทุนชีวิต (Life Gap)
    let dependentYears = 5; 
    if (dependentCount > 0) {
        if (currentAge <= 35) dependentYears = 20; 
        else if (currentAge <= 45) dependentYears = 15; 
        else if (currentAge <= 55) dependentYears = 10; 
    }
    
    let safeTargetLife = totalLiabilities + (expNoTaxDebt * 12 * dependentYears); // คำนวณเป้าหมายที่แท้จริง
    let existingLifeResource = liquidAssets + availableInvestmentsForLifeGap + existingInsLife + welfareLifeValue; 
    diffLife = Math.max(0, safeTargetLife - existingLifeResource); // อัปเดต diffLife 

    // 2. คำนวณส่วนขาดค่ารักษา (Health & CI Gap)
    let currentCICost = isHNW ? 5000000 : 1000000; 
    if (safeNetWorth >= 50000000 || inc >= 200000) currentCICost = 15000000; 
    
    let targetHealthCostShortTerm = currentCICost * Math.pow((1 + (medInfRate / 100)), 5); // เงินเฟ้อแพทย์ 5 ปี
    let maxSelfFund = isHNW ? (safeNetWorth >= 50000000 ? 5000000 : 2000000) : 500000; 
    let disposableAssets = Math.min((liquidAssets * 0.20) + (availableInvestmentsForLifeGap * 0.10), maxSelfFund); 
    
    let totalExistingHealth = existingInsHealth + welfareHealthValue + disposableAssets;
    diffHealth = Math.max(0, targetHealthCostShortTerm - totalExistingHealth); // อัปเดต diffHealth
    diffCI = Math.max(0, (monthlyExpense * 12 * 3) - totalExistingHealth); // อัปเดต diffCI (ชดเชยรายได้ 3 ปี)

    if (diffLife <= 0 && diffHealth <= 0 && diffCI <= 0) {
        if (legacyAssetsValue >= 10000000 || investmentAssets >= 15000000) {
            let legacyText = legacyAssetsValue > 0 ? `${(legacyAssetsValue/1000000).toFixed(1)} ล้านบาท` : `${(investmentAssets/1000000).toFixed(1)} ล้านบาท`;
            return `<div class="bg-purple-50 border border-purple-200 p-6 rounded-2xl text-center shadow-sm animate-fade-in">
                <span class="text-5xl mb-4 block">🏛️</span>
                <h4 class="font-bold text-purple-900 text-xl mb-2">ป้อมปราการมรดกแข็งแกร่ง (Wealth & Legacy Planning)</h4>
                <p class="text-sm text-purple-800 leading-relaxed italic max-w-2xl mx-auto">"ครอบครัวของคุณปลอดภัยจากความเสี่ยงพื้นฐาน แต่พบว่ามีสินทรัพย์หรือธุรกิจที่ตั้งใจเก็บเป็นมรดกสูงถึง ${legacyText} ซึ่งอาจมีความเสี่ยงเรื่องความล่าช้าในการส่งมอบหรือข้อพิพาทและภาษี"</p>
                <div class="mt-4 p-3 bg-white/60 rounded-lg inline-block text-sm text-purple-900 font-medium">AI แนะนำพิจารณาใช้ <b>AIA Legacy Prestige</b> เพื่อสร้างกองเงินสดทันที (Instant Cash) สำหรับครอบครัวระหว่างรอผู้จัดการมรดกดำเนินการครับ</div>
            </div>`;
        } else {
            return `<div class="bg-green-50 border border-green-200 p-6 rounded-2xl text-center shadow-sm animate-fade-in">
                <span class="text-5xl mb-4 block">🌟</span>
                <h4 class="font-bold text-green-900 text-xl mb-2">ป้อมปราการความมั่งคั่งของคุณแข็งแกร่งสมบูรณ์แบบ</h4>
                <p class="text-sm text-green-800 leading-relaxed italic max-w-2xl mx-auto">"ตามปรัชญาของเราที่มุ่งมั่นสร้างแผนที่นำทางสู่ความสำเร็จ ระบบตรวจพบว่ารากฐานการเงินของคุณไม่มีช่องโหว่ที่ต้องกังวลในขณะนี้"</p>
                <div class="mt-4 p-3 bg-white/60 rounded-lg inline-block text-sm text-green-900 font-medium">AI แนะนำให้นำกระแสเงินสดส่วนเกิน โฟกัสไปที่ <b>การลงทุนเพื่อการเติบโต (Wealth Accumulation)</b> ได้เต็มที่ครับ</div>
            </div>`;
        }
    }

    // ==========================================
    // 🩺 4. การวินิจฉัยโรคทางการเงิน (Financial Triage)
    // ==========================================
    const lifestyleBufferMonthly = inc * 0.10;
    const availableSurplusMonthly = netCashflow - lifestyleBufferMonthly; 
    let financialHealth = 'mild'; 
    let maxSafePremiumYearly = 0; 
    let doseRatios = [1.0, 0.7, 0.4];

    if (netCashflow <= 0) {
        financialHealth = 'severe';
        doseRatios = [0.2, 0.1, 0.0]; 
        maxSafePremiumYearly = 0; 
    } else if (availableSurplusMonthly < (inc * 0.05)) {
        financialHealth = 'moderate';
        doseRatios = [0.7, 0.5, 0.3]; 
        maxSafePremiumYearly = Math.min(availableSurplusMonthly * 12, inc * 12 * 0.08); 
    } else {
        financialHealth = 'mild';
        let lossAversionLambda = 1.0; 
        if (primaryFear === 'family') lossAversionLambda = 2.5;      
        else if (primaryFear === 'survive') lossAversionLambda = 2.0;
        else if (primaryFear === 'self') lossAversionLambda = 1.5; 
        maxSafePremiumYearly = Math.min(availableSurplusMonthly * 12 * lossAversionLambda, inc * 12 * 0.25); 
    }

    // ==========================================
        // 🧮 THE ELASTIC BUDGET ENGINE 
        // ==========================================
        let incAnnual = inc * 12; 
        let expAnnual = monthlyExpense * 12; 
        let debtAnnual = monthlyDebtPmt * 12;
        let baseFCF = incAnnual - expAnnual; 
        let safeBudgetFromFCF = Math.max(0, baseFCF * 0.5); 
        let requiredEmergencyFund = ((expAnnual + debtAnnual) / 12) * 6;
        let excessLiquidity = Math.max(0, liquidAssets - requiredEmergencyFund);
        let budgetFromLiquidity = excessLiquidity * 0.20;

        let budgetFromWants = 0;
        document.querySelectorAll('#c_goals > div, .goal-row').forEach(row => {
            let inputs = row.querySelectorAll('input');
            if (inputs.length >= 4) {
                let goalName = inputs[0].value || "";
                let monthlySave = Number(inputs[3].value.replace(/,/g, '')) || 0;
                if (!goalName.includes('เกษียณ') && !goalName.includes('ศึกษา') && !goalName.includes('หนี้')) {
                    budgetFromWants += (monthlySave * 12);
                }
            }
        });

        let theoreticalMax = maxSafePremiumYearly > 0 ? maxSafePremiumYearly : (incAnnual * 0.15); 
        let realityMax = safeBudgetFromFCF + budgetFromLiquidity + budgetFromWants;
        let masterSafePremiumYearly = Math.min(theoreticalMax, realityMax);
        if (masterSafePremiumYearly < 10000) masterSafePremiumYearly = Math.max(12000, incAnnual * 0.05); 

        let realDti = inc > 0 ? (monthlyDebtPmt / inc) : (monthlyDebtPmt > 0 ? 1.0 : 0); 
        let realSr = inc > 0 ? (savingsAmt / inc) : 0;
        let totalAssetsVal = safeNetWorth + totalLiabilities; 

    const customerDataForAI = {
        "Age": safeAge, 
        "Income_Monthly": inc,  
        "Dependents": dependentCount,
        "Total_Debt": totalLiabilities, // ✅ แก้เป็น totalLiabilities
        "Debt_Payment_Monthly": monthlyDebtPmt,
        "Total_Expenses_Monthly": monthlyExpense,
        "Savings_Monthly": savingsAmt,
        "Liquid_Cash": liquidAssets,
        "Investments": investmentAssets, // ✅ แอบแก้ Investments ให้ตรงด้วย
        "Net_Worth": safeNetWorth,
        "DTI_Ratio": realDti,
        "Debt_Asset_Ratio": totalAssetsVal > 0 ? (totalLiabilities / totalAssetsVal) : 0, // ✅ แก้เป็น totalLiabilities
        "Savings_Ratio": realSr,
        "Is_Struggling": (inc < 30000 && dependentCount > 0) ? 1 : 0,
        "Is_Wealthy": (inc >= 200000 || safeNetWorth >= 50000000) ? 1 : 0
    }

    let budget1 = masterSafePremiumYearly;           
    let budget2 = masterSafePremiumYearly * 0.75;    
    let budget3 = masterSafePremiumYearly * 0.45;    
    
    // 🚨 Safety Net: หนี้เกินกำหนด หรือ Struggling
    if (customerDataForAI.Is_Struggling === 1 || customerDataForAI.Debt_Asset_Ratio > 0.45) {
        budget1 = Math.min(budget1, incAnnual * 0.05); 
        budget2 = Math.min(budget2, incAnnual * 0.03); 
        budget3 = Math.min(budget3, incAnnual * 0.02); 
    }

    let dynamicGap = 0;
    if (customerDataForAI.Is_Wealthy === 1) {
        let estateTaxGap = customerDataForAI.Net_Worth > 100000000 ? (customerDataForAI.Net_Worth - 100000000) * 0.05 : 0;
        let wealthTransferGap = customerDataForAI.Net_Worth * 0.10; 
        dynamicGap = Math.max(estateTaxGap, wealthTransferGap, 10000000); 
    } else if (customerDataForAI.Is_Struggling === 1 || customerDataForAI.Debt_Asset_Ratio > 0.45) {
        dynamicGap = customerDataForAI.Total_Debt * 1.2; 
    } else {
        dynamicGap = Math.max((typeof diffLife !== 'undefined' ? diffLife : 500000), 500000); 
    }

    // ==========================================
    // 🧠 5. Helper & Pharmacy AI (อัปเกรด Safety Net)
    // ==========================================
    
    // 🛡️ Safety Wrapper สำหรับการคำนวณเบี้ย (ห้าม Return 0 เด็ดขาด ไม่งั้น AI จะหยิบของฟรีจนล้นพอร์ต)
    function getSafePremium(productName, g, a, sa) {
        if (!productName || productName === "ไม่แนบเพิ่มเติม") return 0;
        
        // Fallback: ถ้าไม่มีฟังก์ชันคำนวณเบี้ย ให้สมมติเบี้ยคร่าวๆ (เช่น 4% ของทุน)
        if (typeof calculateExactPremium !== 'function') return sa * 0.04; 
        
        try {
            let result = calculateExactPremium(productName, g, a, sa);
            return result && result.success ? result.premium : (sa * 0.04);
        } catch (e) {
            console.warn("Pricing Engine Error:", e);
            return sa * 0.04; // คืนค่าเบี้ยสมมติเพื่อไม่ให้ AI พัง
        }
    }

    // 🛡️ Safety Wrapper สำหรับประเมินความเสี่ยงทิ้งกรมธรรม์ (Lapse Risk)
    function getSafeLapseRisk(premium, inc, netCF, dti, disc) {
        if (typeof calculateLapseRisk === 'function') {
            try {
                return calculateLapseRisk(premium, inc, netCF, dti, disc);
            } catch (e) { console.warn("Lapse Risk Engine Error:", e); }
        }
        // Fallback: ประเมินคร่าวๆ ด้วย Rule-based แบบง่ายเผื่อฟังก์ชันหลักพัง
        let ratio = premium / (inc * 12 || 1);
        if (ratio > 0.15 || netCF < 0) return { level: 'High', probabilityScore: 85, keyRiskFactors: ['สัดส่วนเบี้ยประกันสูงเกินเกณฑ์ความปลอดภัย หรือกระแสเงินสดติดลบ'] };
        if (ratio > 0.08) return { level: 'Medium', probabilityScore: 45, keyRiskFactors: ['สัดส่วนเบี้ยประกันเริ่มตึงตัว (เกิน 8% ของรายได้)'] };
        return { level: 'Low', probabilityScore: 10, keyRiskFactors: [] };
    }

    function getFinancialUWLimit(productCategory, age, annualIncome, netWorth, isWorking) {
        let maxLimit = Infinity;
        if (productCategory === "Base") {
            if (isWorking) {
                if (age >= 16 && age <= 45) maxLimit = annualIncome * 30; 
                else if (age >= 46 && age <= 50) maxLimit = annualIncome * 25; 
                else if (age >= 51) maxLimit = annualIncome * 15; 
            } else {
                maxLimit = Math.max(1000000, netWorth * 0.30); 
            }
        } else if (productCategory === "CI") {
            if (isWorking) {
                if (age >= 16 && age <= 45) maxLimit = annualIncome * 18; 
                else if (age >= 46 && age <= 50) maxLimit = annualIncome * 12; 
                else if (age >= 51 && age <= 65) maxLimit = annualIncome * 10; 
                else if (age >= 66) maxLimit = annualIncome * 5; 
                maxLimit = Math.min(maxLimit, 50000000); 
            } else {
                maxLimit = netWorth * 0.30; 
                maxLimit = Math.min(maxLimit, 30000000); 
            }
        }
        return maxLimit;
    }

    function optimizeDosage(productName, gender, age, startSA, targetGap, budget, customerData) {
        if (!productName || productName === "ไม่แนบเพิ่มเติม") return { finalPlan: "ไม่แนบเพิ่มเติม", finalSA: 0 };
        
        let currentPlan = productName;
        let planData = aiaBaseProductMatrix[currentPlan] || {};
        let minBaseSA = planData.minSA || 100000;
        let currentPremium = getSafePremium(currentPlan, gender, age, minBaseSA);

        if ((currentPremium === 0 || currentPremium > budget) && planData.fallback) {
            currentPlan = planData.fallback; 
            planData = aiaBaseProductMatrix[currentPlan] || {};
            minBaseSA = planData.minSA || 100000;
            currentPremium = getSafePremium(currentPlan, gender, age, minBaseSA);
        }

        let currentSA = Math.max(minBaseSA, startSA || minBaseSA);

        if (getSafePremium(currentPlan, gender, age, currentSA) > budget) {
            currentSA = minBaseSA; 
        } else {
            let maxProductSA = planData.maxSA || Infinity;
            let annualIncome = (customerData.Income_Monthly || 0) * 12;
            let isWorking = annualIncome > 0 && customerData.Age < 75; 
            let uwMaxLimit = typeof getFinancialUWLimit === 'function' ? getFinancialUWLimit("Base", age, annualIncome, customerData.Net_Worth || 0, isWorking) : Infinity;

            let absoluteMaxSA = Math.min(maxProductSA, uwMaxLimit, Math.max(targetGap, currentSA));
            let step = 100000; 
            let loopCount = 0;
            
            while ((currentSA + step <= absoluteMaxSA) && (loopCount < 1000)) {
                if (currentSA >= 10000000) step = 500000;
                else if (currentSA >= 5000000) step = 200000;
                else step = 100000;

                let testSA = currentSA + step;
                let testPremium = getSafePremium(currentPlan, gender, age, testSA);

                if (testPremium > 0 && testPremium <= budget) currentSA = testSA; 
                else break; 
                
                loopCount++;
            }
        }
        return { finalPlan: currentPlan, finalSA: currentSA };
    }

    function scoreBasePlans(purpose, maxBudget) {
    let scoredPlans = [];
    let prefWholeLife = 0.5, prefSavings = 0.5, prefUL = 0.5, prefHNW = 0.5;

    // 🌟 ดึงความต้องการของลูกค้าเรื่อง Unit-Linked
    let p_unitlinked_pref = document.getElementById('p_unitlinked') ? document.getElementById('p_unitlinked').value : "สนใจ";

    if (customerDataForAI.Is_Wealthy === 1) { 
        prefHNW = 0.95; 
        prefUL = 0.85; 
    }

    Object.entries(aiaBaseProductMatrix).forEach(([name, attr]) => {
        let aiScore = 0;
        
        if (attr.type === "ตลอดชีพ" || attr.type === "WholeLife") aiScore += (prefWholeLife * 100);
        if (attr.type === "สะสมทรัพย์") aiScore += (prefSavings * 100);
        
        let isUL = attr.isUnitLinked || (attr.type && attr.type.includes("UnitLinked"));
        if (isUL) {
            // 🚨 กฎเหล็ก: ถ้าลูกค้า "ไม่สนใจ" UL ให้แบนสินค้าทิ้งโดยการติดลบคะแนนมหาศาล!
            if (p_unitlinked_pref === "ไม่สนใจ") {
                aiScore -= 1000; 
            } else {
                aiScore += (prefUL * 100); // ⚖️ ปรับให้ยุติธรรม (คูณ 100 เท่ากับสินค้าอื่น)
            }
        }
        
        if (attr.targetTier === "HNW" || name.includes("Prestige")) aiScore += (prefHNW * 150);
        if (attr.targetTier === "Mass") aiScore += ((1 - prefHNW) * 100); 

        let estPrem = (attr.minSA || 100000) * 0.04; 
        let isApproved = true;
        if (safeAge < (attr.minAge || 0) || safeAge > (attr.maxAge || 99)) isApproved = false;
        if (estPrem > maxBudget) isApproved = false;
        if (isUL && safeAge < 18) isApproved = false;

        if (isApproved) {
            if (estPrem > maxBudget * 0.7) aiScore -= 20;
            scoredPlans.push({ name, attr, score: aiScore });
        }
    });
    return scoredPlans.sort((a, b) => b.score - a.score);
}

    let b1_candidates = scoreBasePlans("Basket1_Life", budget1);
    let base1 = b1_candidates.length > 0 ? b1_candidates[0].name : "ไม่แนบเพิ่มเติม";
    
    let b2_candidates = scoreBasePlans("Basket2_Core", budget2);
    let base2 = "ไม่แนบเพิ่มเติม";
    for (let candidate of b2_candidates) {
        if (candidate.name !== base1) { base2 = candidate.name; break; }
    }

    let b3_candidates = scoreBasePlans("Basket3_Eco", budget3);
    let base3 = "ไม่แนบเพิ่มเติม";
    for (let candidate of b3_candidates) {
        if (candidate.name !== base1 && candidate.name !== base2) { base3 = candidate.name; break; }
    }

    function getRiderPremiumTotal(riderName, gender, age, actualCoverage = null) {
        if (!riderName || riderName === "ไม่แนบเพิ่มเติม") return 0;
        
        // 🛡️ Fallback: ถ้าไม่มีฟังก์ชัน ให้สุ่มเบี้ยแพงไว้ก่อน (เช่น 5,000 บาท) เพื่อให้ AI คิดหนักๆ ก่อนหยิบใส่ตะกร้า
        if (typeof calculateRiderPremium !== 'function') return 5000; 

        let riders = riderName.split('+').map(s => s.trim());
        let totalPremium = 0;
        riders.forEach(name => {
            let cleanName = Object.keys(aiaRiderMatrix).find(key => name.includes(key));
            if (cleanName) {
                let productData = aiaRiderMatrix[cleanName];
                let defaultSA = productData ? productData.defaultSA : 1000000;
                let planOrSA = actualCoverage || defaultSA;
                try {
                    totalPremium += calculateRiderPremium(cleanName, gender, age, planOrSA);
                } catch(e) {
                    totalPremium += 5000; // ห้าม +0 บาทเด็ดขาด
                }
            }
        });
        return totalPremium;
    }

    function getRiderUWLimit(riderName, category, customerData, baseSA) {
        let annualIncome = (customerData.Income_Monthly || 0) * 12;
        let isWorking = annualIncome > 0 && customerData.Age < 60; 
        let age = customerData.Age;
        let netWorth = customerData.Net_Worth || 0;

        if (category === "Health") return (baseSA < 100000) ? 0 : Infinity; 
        if (category === "Compensation") {
            if (baseSA < 100000) return 0; 
            if (isWorking) return 10000; 
            else return (baseSA >= 200000) ? 4000 : 1000; 
        }
        if (category === "CI") {
            let maxCILimit = 0;
            if (isWorking) {
                if (age >= 16 && age <= 45) maxCILimit = annualIncome * 18;
                else if (age >= 46 && age <= 50) maxCILimit = annualIncome * 12;
                else if (age >= 51 && age <= 65) maxCILimit = annualIncome * 10;
                else maxCILimit = annualIncome * 5;
            } else {
                maxCILimit = netWorth * 0.30; 
            }
            if (riderName.includes("CI Plus")) maxCILimit = Math.min(maxCILimit, isWorking ? 25000000 : 15000000);
            else if (riderName.includes("Multi-Pay")) maxCILimit = Math.min(maxCILimit, isWorking ? 8000000 : 4000000);
            else if (riderName.includes("Care for Cancer")) maxCILimit = Math.min(maxCILimit, 10000000);
            return maxCILimit;
        }
        return Infinity;
    }

    // =====================================================================
    // 🎒 [NEW] CUSTOMER-CENTRIC KNAPSACK ALGORITHM (ระบบจัดกระเป๋าตามงบ)
    // =====================================================================
    // ฟังก์ชันดึง Rider ทั้งหมดที่ขายได้ เรียงจากเกรด Premium -> Standard -> Economy
    function getSortedValidRiders(category, age, taxFocus) {
        let valid = [];
        if (typeof aiaRiderMatrix === 'undefined') return valid; // 🛡️ Safety check
        for (let riderName in aiaRiderMatrix) {
            let rider = aiaRiderMatrix[riderName];
            if (rider.category === category && age >= rider.minAge && age <= rider.maxAge) {
                if (taxFocus && rider.taxDeductible === "None") continue;
                valid.push(riderName);
            }
        }
        // ลำดับความสำคัญในการลองใส่กระเป๋า (เอาของดีที่สุดใส่ก่อน)
        const tierWeight = { "Premium": 3, "Standard": 2, "Economy": 1 };
        valid.sort((a, b) => {
            let weightA = tierWeight[aiaRiderMatrix[a]?.tier] || 0;
            let weightB = tierWeight[aiaRiderMatrix[b]?.tier] || 0;
            return weightB - weightA; // เรียงจากมากไปน้อย
        });
        return valid;
    }

    // =====================================================================
    // 🎒 [ULTIMATE UPGRADE] DP KNAPSACK ALGORITHM (ระบบจัดกระเป๋าแบบ Dynamic Programming)
    // =====================================================================
    
    // 🟢 1. สกัดข้อมูลพอร์ตเดิมของลูกค้าก่อนจัดกระเป๋า
    let portfolioInsights = typeof analyzeExistingPortfolio === 'function' ? analyzeExistingPortfolio() : { hasHealth: false, hasCI: false, missingCI: true };
    let isTaxFocus = incAnnual >= 500000;

    function buildSmartBasketKnapsack(baseName, budgetLimit, tierLevel) {
        if (baseName === "ไม่แนบเพิ่มเติม") return { base: baseName, sa: 0, healthUI: "ไม่แนบเพิ่มเติม", ciUI: "ไม่แนบเพิ่มเติม", totalPremium: 0 };
        
        // --- 🚨 1. [Predictive Churn Guard] ---
        let monthlyInc = typeof inc !== 'undefined' ? inc : 50000;
        let netCF = typeof netCashflow !== 'undefined' ? netCashflow : (monthlyInc * 0.2); 
        let dti = window.latestMLFeatures?.dti || 0;
        let disc = window.latestMLFeatures?.discipline || 0.5;

        // เรียกใช้ฟังก์ชันที่ปลอดภัยจาก Step 6
        let churnRisk = getSafeLapseRisk(budgetLimit, monthlyInc, netCF, dti, disc);
        
        // 🛡️ หากความเสี่ยงสูง ให้สั่ง "ลดงบประมาณในใจของ AI" (Safety Multiplier) ลง
        let safetyMultiplier = 1.0;
        if (churnRisk.level.includes('High')) {
            safetyMultiplier = 0.60; // บีบงบให้เหลือ 60% เพื่อป้องกันกรมธรรม์ขาดอายุ
        } else if (churnRisk.level.includes('Medium')) {
            safetyMultiplier = 0.85; 
        }
        
        let adjustedBudgetLimit = budgetLimit * safetyMultiplier;

        // --- 💊 2. คำนวณต้นทุนสัญญาหลัก (Base Plan) ---
        let planData = typeof aiaBaseProductMatrix !== 'undefined' ? aiaBaseProductMatrix[baseName] : null;
        let initialSA = planData ? (planData.minSA || 100000) : 100000;
        if (typeof customerDataForAI !== 'undefined' && customerDataForAI.Is_Wealthy === 1) initialSA = Math.max(initialSA, 5000000); 
        if (tierLevel === 1 && typeof customerDataForAI !== 'undefined' && customerDataForAI.Is_Wealthy === 1) initialSA = Math.max(initialSA, 10000000); 

        let baseMinPremium = getSafePremium(baseName, typeof gender !== 'undefined' ? gender : 'M', typeof safeAge !== 'undefined' ? safeAge : 30, initialSA);
        
        // งบประมาณที่เหลือสำหรับนำไปช้อปปิ้ง Rider (ยอมให้เกินงบได้นิดหน่อย 10%)
        let maxAllowedRiderBudget = (adjustedBudgetLimit * 1.1) - baseMinPremium;

        // --- 🧠 3. [DYNAMIC PROGRAMMING ENGINE & SMART SCORING] ---
        
        // 🟢 🎯 เปลี่ยนจากคะแนนตายตัว เป็น "Dynamic Scoring" อิงตาม Gap จริงของลูกค้า
        let scoreHealth = (typeof diffHealth !== 'undefined' && diffHealth > 0) ? 300 : (portfolioInsights.hasHealth ? 20 : 150); 
        let scoreCI = (typeof diffCI !== 'undefined' && diffCI > 0) ? 250 : (portfolioInsights.hasCI ? 30 : 180);
        let scoreComp = ((typeof diffCI !== 'undefined' && diffCI > 0) && monthlyInc > 50000) ? 100 : 20;

        const scoringSystem = {
            "Health": { "Premium": scoreHealth, "Standard": scoreHealth * 0.7, "Economy": scoreHealth * 0.4 },
            "CI": { "Premium": scoreCI, "Standard": scoreCI * 0.7, "Economy": scoreCI * 0.4 },
            "Compensation": { "Premium": scoreComp, "Standard": scoreComp * 0.6, "Economy": scoreComp * 0.3 }
        };

        let categories = [];
        let skipRiders = (typeof customerDataForAI !== 'undefined' && customerDataForAI.Is_Wealthy === 1);
        let checkSevere = typeof financialHealth !== 'undefined' ? financialHealth : 'mild';
        
        if (!skipRiders && checkSevere !== 'severe') {
            // 🟢 🎯 AI จะไม่ดึงหมวดหมู่นี้มาคำนวณเลย ถ้าคะแนนความต้องการต่ำกว่า 50 (มีของเดิมเยอะแล้ว)
            if (scoreHealth > 50) categories.push("Health");
            if (scoreCI > 50) categories.push("CI");
            if (scoreComp > 50) categories.push("Compensation");
        }

        // ก. สร้างตัวเลือกทั้งหมด (Options) ของแต่ละหมวดหมู่
        let categoryOptions = {};
        categories.forEach(cat => {
            // ทางเลือกแรกสุดคือ "ไม่ซื้ออะไรเลยในหมวดนี้" (Cost 0, Score 0)
            let options = [{ name: "None", premium: 0, score: 0, uiText: "ไม่แนบเพิ่มเติม" }]; 
            
            let candidates = getSortedValidRiders(cat, typeof safeAge !== 'undefined' ? safeAge : 30, isTaxFocus);
            candidates.forEach(riderName => {
                let riderInfo = aiaRiderMatrix[riderName];
                let uwLimit = getRiderUWLimit(riderName, cat, typeof customerDataForAI !== 'undefined' ? customerDataForAI : {}, initialSA);
                if (uwLimit <= 0) return;

                let ratios = typeof doseRatios !== 'undefined' ? doseRatios : [1.0, 0.7, 0.4];
                let ratio = ratios[tierLevel - 1] || 1.0; 
                let monthlyExp = typeof monthlyExpense !== 'undefined' ? monthlyExpense : 15000;
                let coverage = calculateDynamicCoverage(riderName, cat, monthlyInc, monthlyExp, ratio, uwLimit);

                if (coverage) {
                    let premium = getRiderPremiumTotal(riderName, typeof gender !== 'undefined' ? gender : 'M', typeof safeAge !== 'undefined' ? safeAge : 30, coverage.value);
                    
                    // 🎯 ให้คะแนน AI ว่าสินค้าชิ้นนี้แก้ปัญหาได้ดีแค่ไหน
                    let itemScore = scoringSystem[cat][riderInfo.tier] || 50;

                    let highlightText = riderInfo.highlight ? `<div class="text-[11px] text-slate-500 italic mt-0.5 leading-tight ml-4">💡 เหตุผล: ${riderInfo.highlight}</div>` : "";
                    let uiText = `<div class="mb-2"><span class="font-medium text-slate-700">+ ${riderName}</span> <span class="text-blue-600 font-semibold text-sm">(${coverage.text})</span>${highlightText}</div>`;

                    options.push({ name: riderName, premium: premium, score: itemScore, uiText: uiText, cat: cat });
                }
            });
            categoryOptions[cat] = options;
        });

        // ข. รันสมการ Dynamic Programming (Pareto Optimization)
        // เริ่มต้นกระเป๋าว่างเปล่า
        let dpStates = [{ cost: 0, score: 0, items: { Health: null, CI: null, Compensation: null } }];

    categories.forEach(cat => {
        let nextStates = [];
        let options = categoryOptions[cat];

        dpStates.forEach(state => {
            options.forEach(option => {
                let newCost = state.cost + option.premium;
                // ถ้าหยิบชิ้นนี้แล้วงบไม่บานปลาย
                if (newCost <= maxAllowedRiderBudget) {
                    let newItems = { ...state.items };
                    newItems[cat] = option;
                    nextStates.push({
                        cost: newCost,
                        score: state.score + option.score,
                        items: newItems
                    });
                }
            });
        });

        // 🧠 Pareto Filter: กำจัด "แผนที่จ่ายแพงกว่าแต่ได้คะแนนน้อยกว่า" ทิ้งไป เพื่อให้ AI ประมวลผลไวขึ้น
        nextStates.sort((a, b) => a.cost - b.cost || b.score - a.score);
        let paretoStates = [];
        let maxScoreSoFar = -1;
        
        nextStates.forEach(state => {
            if (state.score > maxScoreSoFar) {
                paretoStates.push(state);
                maxScoreSoFar = state.score;
            }
        });
        dpStates = paretoStates;
    });

    // ค. หา "ผู้ชนะ" (แผนที่คะแนนสูงสุดภายใต้งบ)
    let bestState = dpStates[dpStates.length - 1] || { cost: 0, items: {} };

    // ง. แกะข้อมูลจากผู้ชนะมาสร้าง UI
    let approvedRidersPremium = bestState.cost;
    let healthUI = (bestState.items.Health && bestState.items.Health.name !== "None") ? bestState.items.Health.uiText : "ไม่แนบเพิ่มเติม";
    
    // รวม CI และ Comp ไว้ในช่องแสดงผลเดียวกัน
    let ciUI = "";
    if (bestState.items.CI && bestState.items.CI.name !== "None") ciUI += bestState.items.CI.uiText;
    if (bestState.items.Compensation && bestState.items.Compensation.name !== "None") ciUI += bestState.items.Compensation.uiText;
    if (ciUI === "") ciUI = "ไม่แนบเพิ่มเติม";

    // --- 💰 4. Optimize Base Dose (คำนวณเงินทอน) ---
    // นำงบประมาณที่เหลือจากการจัด Rider ไปเพิ่มทุนประกันหลักให้สูงที่สุด
    let remainingBudgetForBase = budgetLimit - approvedRidersPremium;
    if (remainingBudgetForBase < 0) remainingBudgetForBase = 0; 

    let dose = optimizeDosage(baseName, gender, safeAge, initialSA, dynamicGap, remainingBudgetForBase, customerDataForAI);
    let finalBasePremium = getSafePremium(dose.finalPlan, gender, safeAge, dose.finalSA);
    
    let absoluteTotalPremium = finalBasePremium + approvedRidersPremium;

    // 🚨 กรณีวิกฤต บังคับทิ้ง Rider ทั้งหมด (Safety Override)
    if (financialHealth === 'severe' || dose.finalSA === 0) {
        healthUI = "ไม่แนบเพิ่มเติม";
        ciUI = "ไม่แนบเพิ่มเติม";
        absoluteTotalPremium = finalBasePremium;
    }

    return {
        base: dose.finalPlan,
        sa: dose.finalSA || 0,
        healthUI: healthUI,
        ciUI: ciUI,
        totalPremium: absoluteTotalPremium || 0
    };
}

    // สร้างตะกร้าทั้ง 3 ใบด้วย Knapsack Algorithm
    let basket1 = buildSmartBasketKnapsack(base1, budget1, 1);
    let basket2 = buildSmartBasketKnapsack(base2, budget2, 2);
    let basket3 = buildSmartBasketKnapsack(base3, budget3, 3);

    window.latestPresentationFunnel = {
        budgetLimitCalculated: masterSafePremiumYearly, // งบประมาณสูงสุดที่ AI คำนวณได้
        aiRecommendedPlan: "Plan B: Core-Growth",
        proposedBasket: basket2 // เก็บข้อมูลสินค้าตะกร้า 2 ที่ AI แนะนำ
    };

    // 🧠 [อัปเกรด] คำนวณความเสี่ยงการทิ้งกรมธรรม์ (Lapse Risk) จากตะกร้าแนะนำ (Best Match)
    // ใช้ค่า inc, netCashflow, realDti, safeDisc ที่ถูกประกาศไว้ก่อนหน้าในฟังก์ชันนี้
    // --- [เพิ่มลอจิกที่หายไปเพื่อแก้ Error] ---
    // 1. ตรวจสอบสถานะสุขภาพทางการเงิน (Financial Triage)
    // ถ้าน้ำกระแสเงินสดสุทธิ (netCashflow) ติดลบ ให้ถือเป็นเคสวิกฤต (Severe)
    let severeWarningHTML = (netCashflow <= 0) 
        ? `<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-4 mx-6 mt-4 text-red-800 text-sm shadow-sm animate-pulse rounded-r-lg">
             <span class="text-lg">🚨</span> <b>AI Financial Alert (คำเตือน):</b> สภาวะกระแสเงินสดของคุณกำลังติดลบ ตามหลักการวางแผนการเงิน <b>"ไม่แนะนำให้สร้างภาระผูกพันระยะยาวเพิ่ม"</b> ควรโฟกัสที่การลดรายจ่ายหรือเคลียร์หนี้สินก่อน อย่างไรก็ตาม AI ได้จัดเตรียมแผนความคุ้มครองเริ่มต้นเพื่ออุดรอยรั่วชั่วคราวไว้ให้พิจารณาเท่านั้นครับ
            </div>` 
        : ``;

    // 2. ตรวจสอบภาษีมรดก (Estate Tax)
    let estateTaxWarningHTML = ``;
    let gapForTax = typeof window.liquidityGapForTax !== 'undefined' ? window.liquidityGapForTax : 0;
    if (gapForTax > 0) {
        estateTaxWarningHTML = `
        <div class="bg-indigo-900 border-l-4 border-yellow-400 p-5 mb-4 mx-6 mt-4 text-indigo-100 rounded-r-xl shadow-lg animate-fade-in relative overflow-hidden">
            <div class="absolute -right-10 -top-10 text-9xl opacity-10">🏛️</div>
            <div class="relative z-10">
                <h4 class="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">🏛️ AI Wealth Preservation Insight</h4>
                <p class="text-sm leading-relaxed mb-3">
                    ระบบประเมินว่าคุณอาจมีภาระภาษีมรดกและค่าใช้จ่ายในการโอนที่ต้องเตรียมสูงถึง <b>${(gapForTax/1000000).toFixed(1)} ล้านบาท</b> ซึ่งสภาพคล่องปัจจุบันอาจไม่เพียงพอ เสี่ยงต่อการถูกบังคับขายสินทรัพย์ในอนาคต
                </p>
            </div>
        </div>`;
    }
    // ------------------------------------------
    let churnEval = getSafeLapseRisk(basket2.totalPremium, inc, netCashflow, realDti, safeDisc);
    
    // สร้าง Badge แสดงสถานะความยั่งยืน
    let sustainabilityBadge = '';
    // 🌟 [แก้บั๊ก] เปลี่ยนมาใช้ .includes() เพื่อดักจับคีย์เวิร์ดใน String แทนการเทียบแบบเป๊ะๆ
    if (churnEval.level.includes('Low')) {
        sustainabilityBadge = `<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[11px] font-bold border border-green-200 shadow-sm">🛡️ แผนมีความยั่งยืนสูง</span>`;
    } else if (churnEval.level.includes('Medium')) {
        sustainabilityBadge = `<span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[11px] font-bold border border-yellow-200 shadow-sm">⚠️ แผนมีความตึงตัวระดับกลาง</span>`;
    } else {
        sustainabilityBadge = `<span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[11px] font-bold border border-red-200 shadow-sm animate-pulse">🚨 แผนมีความเสี่ยงต่อกระแสเงินสด</span>`;
    }

    let churnAdvice = '';
    // 🌟 [แก้บั๊ก] เปลี่ยนมาใช้ .includes() เช่นเดียวกัน
    if (churnEval.level.includes('High') || churnEval.level.includes('Medium')) {
        let riskDetails = (churnEval.keyRiskFactors && churnEval.keyRiskFactors.length > 0) 
            ? churnEval.keyRiskFactors.map(r => `<li>${r}</li>`).join('') 
            : `<li>สัดส่วนการใช้เงินส่วนเกิน ${Math.round(churnEval.fcfUsage * 100)}% ซึ่งตึงตัวเกินไป</li>`;

        let alertColor = churnEval.level.includes('High') ? 'red' : 'yellow';
        let alertBg = churnEval.level.includes('High') ? 'bg-red-50 border-red-400 text-red-700' : 'bg-yellow-50 border-yellow-400 text-yellow-800';

        churnAdvice = `
        <div class="mt-3 p-3 ${alertBg} border-l-4 text-[12px] italic mb-4 shadow-sm rounded-r">
            <b>🚨 AI Predictive Lapse Warning (ความเสี่ยงทิ้งกรมธรรม์: ${churnEval.probabilityScore}%):</b><br>
            ระบบตรวจพบความเสี่ยงที่ท่านอาจส่งเบี้ยไม่ครบกำหนดตลอดสัญญา เนื่องจาก:<br>
            <ul class="list-disc ml-5 mt-1 space-y-1">${riskDetails}</ul>
            AI จึงได้ปรับแผนให้รัดกุมและเน้นประสิทธิภาพสูงสุด เพื่อลดภาระและให้ท่านถือครองกรมธรรม์ได้ต่อเนื่องครับ
        </div>`;
    } else {
        // บังคับโชว์กล่องสีเขียวถ้าระบบประเมินว่า "เสี่ยงต่ำ"
        churnAdvice = `
        <div class="mt-3 p-3 bg-green-50 border-l-4 border-green-500 text-[12px] text-green-800 italic mb-4 shadow-sm rounded-r">
            <b>✅ AI Predictive Lapse (ความเสี่ยงทิ้งกรมธรรม์: ${churnEval.probabilityScore}%):</b><br>
            ระบบประเมินว่ากระแสเงินสดของคุณแข็งแกร่งเพียงพอที่จะถือครองแผนนี้ตลอดรอดฝั่งได้อย่างสบายใจครับ
        </div>`;
    }

    let html = `
    <div class="mb-6 animate-fade-in border border-indigo-200 rounded-2xl overflow-hidden shadow-lg bg-white">
        <div class="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 p-6 text-white relative">
            <div class="flex justify-between items-center mb-3">
                <h4 class="font-bold text-xl flex items-center gap-3">
                    <span class="bg-white/20 p-2 rounded-lg">🎯</span> ทางเลือกแก้ปัญหา (AI-Driven Solutions)
                </h4>
                <div class="hidden md:block">${sustainabilityBadge}</div>
            </div>
            <div class="border-l-4 border-blue-400 pl-4 py-1 text-sm text-blue-100 italic">
                "ข้อเสนอเหล่านี้เป็นเพียงการจำลองเท่านั้น ให้ยึดถือข้อมูลจากบริษัทเป็นสำคัญ"
            </div>
        </div>

        <div class="bg-indigo-50/50 p-5 text-sm text-gray-700 border-b">
            <div class="md:hidden mb-3 text-center">${sustainabilityBadge}</div>
            <div class="flex items-center gap-2"><span class="text-xl">💡</span> <b>AI Mathematical Reality Check:</b> ระบบได้คำนวณ <b>"3 ตะกร้าสินค้า"</b> ภายใต้งบประมาณของคุณดังนี้:</div>
            ${churnAdvice}
        </div>
        
        ${severeWarningHTML}
        ${estateTaxWarningHTML}
        
        <div class="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mt-6 items-stretch">
            
            <div class="p-6 flex flex-col h-full hover:bg-gray-50 transition-colors group">
                <div class="text-center pb-4 mb-5 border-b">
                    <span class="text-4xl block mb-2">🛡️</span>
                    <h4 class="font-bold text-gray-800 text-lg">The Ultimate Shield</h4>
                </div>
                <div class="space-y-4 text-sm flex-grow flex flex-col">
                    <div class="bg-white p-3 rounded-xl border-l-4 border-purple-500 shadow-sm">
                        <p class="text-[10px] text-gray-500 uppercase font-bold">💊 ยารักษาหลัก (Base Plan):</p>
                        <p class="font-bold text-slate-800 text-sm mt-1">${basket1.base}</p>
                        <p class="text-xs font-bold text-blue-600 mt-1">ขนาดโดส: ${(basket1.sa || 0).toLocaleString()} บาท</p>
                    </div>
                    <div class="bg-white p-3 rounded-xl border-l-4 border-teal-500 shadow-sm flex-grow">
                        <p class="text-[10px] text-gray-500 uppercase font-bold">💉 ยาเสริมอาการ (Rider Assembly):</p>
                        ${basket1.healthUI !== "ไม่แนบเพิ่มเติม" ? `<div class="mt-2 border-b border-gray-100 pb-2">${basket1.healthUI}</div>` : ''}
                        ${basket1.ciUI !== "ไม่แนบเพิ่มเติม" ? `<div class="mt-2">${basket1.ciUI}</div>` : ''}
                    </div>
                    <div class="bg-pink-50 p-3 rounded text-right border border-pink-100 mt-auto">
                        <p class="text-[10px] text-pink-500 uppercase font-bold">ประเมินค่ายารวม</p>
                        <b class="text-pink-600 text-lg">${Math.round(basket1.totalPremium).toLocaleString()} บ./ปี</b>
                    </div>
                </div>
            </div>

            <div class="p-6 flex flex-col h-full bg-blue-50/40 relative border-t-4 xl:border-t-0 border-blue-500 group">
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1 rounded-b-lg z-20 shadow-md">AI BEST MATCH</div>
                <div class="text-center pb-4 mb-5 border-b border-blue-200 mt-2">
                    <span class="text-4xl block mb-2">⚖️</span>
                    <h4 class="font-bold text-blue-900 text-lg">The Smart Core</h4>
                </div>
                <div class="space-y-4 text-sm flex-grow flex flex-col">
                    <div class="bg-white p-3 rounded-xl border-l-4 border-blue-600 shadow-sm">
                        <p class="text-[10px] text-blue-500 uppercase font-bold">💊 ยารักษาหลัก (Base Plan):</p>
                        <p class="font-bold text-blue-900 text-sm mt-1">${basket2.base}</p>
                        <p class="text-xs font-bold text-blue-700 mt-1">ขนาดโดส: ${(basket2.sa || 0).toLocaleString()} บาท</p>
                    </div>
                    <div class="bg-white p-3 rounded-xl border-l-4 border-teal-500 shadow-sm flex-grow">
                        <p class="text-[10px] text-blue-500 uppercase font-bold">💉 ยาเสริมอาการ (Rider Assembly):</p>
                        ${basket2.healthUI !== "ไม่แนบเพิ่มเติม" ? `<div class="mt-2 border-b border-gray-100 pb-2">${basket2.healthUI}</div>` : ''}
                        ${basket2.ciUI !== "ไม่แนบเพิ่มเติม" ? `<div class="mt-2">${basket2.ciUI}</div>` : ''}
                    </div>
                    <div class="bg-pink-50 p-3 rounded text-right border border-pink-100 mt-auto">
                        <p class="text-[10px] text-pink-500 uppercase font-bold">ประเมินค่ายารวม</p>
                        <b class="text-pink-600 text-lg">${Math.round(basket2.totalPremium).toLocaleString()} บ./ปี</b>
                    </div>
                </div>
            </div>

            <div class="p-6 flex flex-col h-full hover:bg-gray-50 transition-colors">
                <div class="text-center pb-4 mb-5 border-b">
                    <span class="text-4xl block mb-2">🌱</span>
                    <h4 class="font-bold text-gray-800 text-lg">The Tactical Essential</h4>
                </div>
                <div class="space-y-4 text-sm flex-grow flex flex-col">
                    <div class="bg-white p-3 rounded-xl border-l-4 border-orange-400 shadow-sm">
                        <p class="text-[10px] text-gray-500 uppercase font-bold">💊 ยารักษาหลัก (Base Plan):</p>
                        <p class="font-bold text-slate-800 text-sm mt-1">${basket3.base}</p>
                        <p class="text-xs font-bold text-orange-600 mt-1">ขนาดโดส: ${(basket3.sa || 0).toLocaleString()} บาท</p>
                    </div>
                    <div class="bg-white p-3 rounded-xl border-l-4 border-gray-400 shadow-sm flex-grow">
                        <p class="text-[10px] text-gray-500 uppercase font-bold">💉 ยาเสริมอาการ (Rider Assembly):</p>
                        ${basket3.healthUI !== "ไม่แนบเพิ่มเติม" ? `<div class="mt-2 border-b border-gray-100 pb-2">${basket3.healthUI}</div>` : ''}
                        ${basket3.ciUI !== "ไม่แนบเพิ่มเติม" ? `<div class="mt-2">${basket3.ciUI}</div>` : ''}
                    </div>
                    <div class="bg-pink-50 p-3 rounded text-right border border-pink-100 mt-auto">
                        <p class="text-[10px] text-pink-500 uppercase font-bold">ประเมินค่ายารวม</p>
                        <b class="text-pink-600 text-lg">${Math.round(basket3.totalPremium).toLocaleString()} บ./ปี</b>
                    </div>
                </div>
            </div>
            
        </div>
    </div>`;

    return html;
}

    // --- ระบบตรวจสอบ การพิมพ์ข้อมูลผิดพลาด (ป้องกันพิมพ์ตัวอักษรในช่องตัวเลข) ---
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('money-input') || e.target.type === 'number') {
            let original = e.target.value;
            let sanitized = original.replace(/[^0-9.,-]/g, '');
            if (original !== sanitized) {
                e.target.value = sanitized;
                e.target.classList.add('border-red-500', 'bg-red-50');
                setTimeout(() => e.target.classList.remove('border-red-500', 'bg-red-50'), 300);
            }
        }

        // [NEW] ตรวจสอบ Logical Error ทันทีเมื่อพิมพ์แก้ไขช่องเป้าหมาย หรือช่องรายได้
        if (e.target.id === 'r_reqInc' || (e.target.closest && e.target.closest('#c_inc'))) {
            checkRetirementGoalLogic();
        }
    });

    // --- Helper for Number Formatting ---
    function parseNum(val) {
        if (typeof val === 'number') return val;
        if (!val) return 0;
        return Number(val.toString().replace(/,/g, '')) || 0;
    }

    function formatInput(el) {
        if (el.value) {
            el.value = parseNum(el.value).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
    }

    function unformatInput(el) {
        if (el.value) {
            let n = parseNum(el.value);
            el.value = n === 0 ? '' : n;
        }
    }

    // --- [NEW] ฟังก์ชันตรวจสอบ Logical Error เชิงพฤติกรรม ---
    window.checkRetirementGoalLogic = function() {
        const reqIncInput = document.getElementById('r_reqInc');
        const warningEl = document.getElementById('r_reqInc_warning');
        if (!reqIncInput || !warningEl) return;

        // 1. ดึงค่าเป้าหมายที่กรอก
        const reqInc = parseNum(reqIncInput.value);

        // 2. ดึงค่ารายได้รวมปัจจุบันทั้งหมดในหน้าฟอร์ม
        let totalInc = 0;
        document.querySelectorAll('#c_inc .col-val').forEach(input => {
            totalInc += parseNum(input.value);
        });

        // 3. เปรียบเทียบและแสดง/ซ่อนแจ้งเตือน
        if (reqInc > totalInc && totalInc > 0) {
            warningEl.classList.remove('hidden');
            reqIncInput.classList.remove('focus:ring-blue-200');
            reqIncInput.classList.add('border-yellow-400', 'bg-yellow-50', 'focus:ring-yellow-300');
        } else {
            warningEl.classList.add('hidden');
            reqIncInput.classList.remove('border-yellow-400', 'bg-yellow-50', 'focus:ring-yellow-300');
            reqIncInput.classList.add('focus:ring-blue-200');
        }
    };

    // Scroll to Top Listener
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('scrollTopBtn');
        if (window.scrollY > 300) {
            btn.classList.remove('opacity-0', 'pointer-events-none');
            btn.classList.add('opacity-100');
        } else {
            btn.classList.remove('opacity-100');
            btn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    // --- System & Settings Management ---
    const defaultSettings = {
        creatorName: 'ที่ปรึกษาการเงิน FA',
        faLicense: '1234567890',
        icLicense: '123456'
    };

    function getSettings() {
        const saved = localStorage.getItem('fa_settings_v2');
        return saved ? JSON.parse(saved) : defaultSettings;
    }

    function saveSettingsData(newSettings) {
        localStorage.setItem('fa_settings_v2', JSON.stringify(newSettings));
        applySettingsToUI();
    }

    window.applySettingsToUI = function() {
        const s = getSettings();
        document.getElementById('head_title').innerText = `Personal Financial Report by ${s.creatorName}`;
        document.getElementById('app_subtitle').innerHTML = `โดย ${s.creatorName} | ใบอนุญาตตัวแทน ${s.faLicense} | IC License ${s.icLicense}`;
        //document.getElementById('creator_header').innerText = `ข้อมูลผู้จัดทำ: ${s.creatorName}`;
        document.getElementById('cover_creator').innerText = s.creatorName;
        document.getElementById('cover_licenses').innerHTML = `<span>ใบอนุญาตตัวแทน: ${s.faLicense}</span> | <span>IC License: ${s.icLicense}</span>`;
        
        document.getElementById('print_footer').innerHTML = `
            <div class="flex justify-between items-center w-full">
                <div class="text-left font-medium text-gray-800">
                    <b>รายงานวิเคราะห์สุขภาพทางการเงินและแผนบริหารความมั่งคั่ง</b><br>
                    <span class="text-[10px] text-gray-500">จัดทำโดย: ${s.creatorName} | ใบอนุญาตตัวแทน: ${s.faLicense} | IC License: ${s.icLicense}</span>
                </div>
                <div class="text-right text-gray-500 text-[10px]">
                    เอกสารสำหรับใช้อ้างอิงส่วนบุคคล (Confidential)<br>
                    พิมพ์เมื่อ: ${new Date().toLocaleString('th-TH')}
                </div>
            </div>`;
            
        // ---- สำหรับแสดงผลผู้จัดทำตอนพิมพ์ ----
        if(document.getElementById('print_header_creator')) document.getElementById('print_header_creator').innerText = `ผู้จัดทำ: ${s.creatorName}`;
        if(document.getElementById('print_header_license')) document.getElementById('print_header_license').innerText = `ใบอนุญาตตัวแทน: ${s.faLicense} | IC: ${s.icLicense}`;
    }

    window.openSettings = function() {
        const s = getSettings();
        document.getElementById('set_creator').value = s.creatorName;
        document.getElementById('set_fa_lic').value = s.faLicense;
        document.getElementById('set_ic_lic').value = s.icLicense;
        renderLibraryManager();
        switchTab('tab_creator'); // เปลี่ยนให้เปิดหน้าข้อมูลผู้จัดทำแทน
        document.getElementById('settingsModal').classList.remove('hidden');
    }

    window.closeSettings = function() {
        document.getElementById('settingsModal').classList.add('hidden');
    }

    window.saveSettingsForm = function() {
    const s = getSettings();
    const newSettings = {
        creatorName: document.getElementById('set_creator').value || s.creatorName,
        faLicense: document.getElementById('set_fa_lic').value || s.faLicense,
        icLicense: document.getElementById('set_ic_lic').value || s.icLicense
    };
    
    // บันทึกและดึงค่าไปใช้อัปเดตโครงสร้างหลัก (เช่น หน้าปก PDF)
    saveSettingsData(newSettings);
    
    alert("✅ บันทึกข้อมูลผู้จัดทำเรียบร้อยแล้ว");
    closeSettings();
    
    // 🌟 [อัปเดตทันที] เปลี่ยนชื่อต้อนรับทั้งบน Header และหน้า Home แบบ Real-time
    const welcomeText = `👋 ยินดีต้อนรับ, ${newSettings.creatorName}`;
    
    if (document.getElementById('welcomeMsg')) {
        document.getElementById('welcomeMsg').innerText = welcomeText;
    }
    if (document.getElementById('homeWelcomeName')) {
        document.getElementById('homeWelcomeName').innerText = welcomeText;
    }
}

    function initNetworkMonitor() {
        // ฟังก์ชันประเมินความพร้อมของระบบจากสภาพแวดล้อมจริง
        function checkSystemReadiness() {
            let score = 0;

            // 1. ตรวจสอบระบบบันทึกข้อมูล Local Storage (25 คะแนน)
            try {
                localStorage.setItem('sys_diagnostic_test', '1');
                localStorage.removeItem('sys_diagnostic_test');
                score += 25;
            } catch(e) {
                console.warn("System Warning: LocalStorage is disabled or full.");
            }

            // 2. ตรวจสอบระบบแสดงผลกราฟ Chart.js (25 คะแนน)
            if (typeof Chart !== 'undefined') {
                score += 25;
            } else {
                console.warn("System Warning: Chart.js library is not ready.");
            }

            // 3. ตรวจสอบความสมบูรณ์ของโครงสร้างเว็บ (25 คะแนน)
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                score += 25;
            }

            // 4. ตรวจสอบขีดความสามารถในการประมวลผลขั้นสูงและเครือข่าย (25 คะแนน)
            // เช็คว่าเบราว์เซอร์รองรับการรันสคริปต์เบื้องหลัง (สำคัญสำหรับ AI/Monte Carlo)
            if (typeof Worker !== 'undefined' && typeof Promise !== 'undefined') {
                score += 15;
            }
            // เช็คสถานะการเชื่อมต่อ (ถ้าออนไลน์ได้เต็ม 10, ถ้าออฟไลน์ได้ 5 เพราะระบบยังรันแบบ Local ได้)
            if (navigator.onLine) {
                score += 10;
            } else {
                score += 5; 
            }

            // ตรวจสอบให้แน่ใจว่าคะแนนไม่เกิน 100
            return Math.min(Math.max(score, 0), 100);
        }

        // ฟังก์ชันสำหรับอัปเดตหน้าจอ
        function updateReadinessUI() {
            const percent = checkSystemReadiness();
            
            // ใช้ ID ของคุณ (อาจจะเป็น 'networkBadge', 'offlineStatus' หรืออื่นๆ ตามที่คุณตั้งไว้ใน HTML)
            const badge = document.getElementById('networkBadge'); 
            
            if (!badge) return;

            let dotColor = '';
            let pulse = '';

            // เกณฑ์การแสดงผลไฟสถานะตามที่คุณต้องการ
            if (percent > 90) {
                dotColor = 'bg-green-500';
                pulse = 'animate-pulse';
            } else if (percent > 50) {
                dotColor = 'bg-yellow-400';
                pulse = '';
            } else {
                dotColor = 'bg-red-500';
                pulse = 'animate-ping';
            }

            badge.innerHTML = `<span class="w-2.5 h-2.5 rounded-full ${dotColor} ${pulse} inline-block mr-1"></span> ระบบพร้อมทำงาน ${percent}%`;
            badge.title = "คลิกเพื่อตรวจสอบความพร้อมของระบบอีกครั้ง"; // เพิ่ม Tooltip ให้รู้ว่ากดได้
        }

        // รันการตรวจสอบทันทีที่เริ่ม
        updateReadinessUI();

        // รันการตรวจสอบซ้ำเมื่อโหลดหน้าเว็บทุกอย่างเสร็จสมบูรณ์เผื่อกราฟโหลดช้า
        window.addEventListener('load', updateReadinessUI);
        
        // ตรวจสอบอัตโนมัติเมื่อสถานะอินเทอร์เน็ตเปลี่ยน
        window.addEventListener('online', updateReadinessUI);
        window.addEventListener('offline', updateReadinessUI);

        // ให้ผู้ใช้สามารถคลิกที่ป้ายสถานะเพื่อกด "Refresh/Check" ความพร้อมใหม่ได้แบบ Real-time
        const badgeElement = document.getElementById('networkBadge');
        if (badgeElement) {
            badgeElement.style.cursor = 'pointer';
            badgeElement.addEventListener('click', () => {
                // แสดงสถานะกำลังโหลดแปปนึงเพื่อให้ดูมีการตอบสนอง (UX)
                badgeElement.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-gray-400 animate-pulse inline-block mr-1"></span> กำลังวิเคราะห์...`;
                setTimeout(updateReadinessUI, 600); // ดีเลย์ 0.6 วิแล้วค่อยแสดงผลจริง
            });
        }
    }

    function enterSystem() {
        document.getElementById('policyScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('policyScreen').classList.add('hidden');
            document.getElementById('sysHeader').classList.remove('hidden');
            document.getElementById('sysHeader').classList.add('flex');
        }, 300);
        
        const s = getSettings();
        document.getElementById('welcomeMsg').innerText = `👋 ยินดีต้อนรับ, ${s.creatorName}`;
    }

    // 🔄 ฟังก์ชันอัปเดตความเสี่ยงตามอายุ (ปรับปรุงให้ใช้กับ 10 คำถามใหม่)
    window.syncAgeToRisk = function() {
        let ageInput = document.getElementById('p_age');
        if (!ageInput) return;
        let age = parseInt(ageInput.value) || 0;
        
        // ซิงค์กับคำถามใหม่หมวดที่ 2 (ความเสี่ยง)
        let bq8 = document.getElementById('bq_8'); // ระยะเวลาลงทุน
        let bq6 = document.getElementById('bq_6'); // ความทนทานพอร์ตติดลบ
        
        if (bq8) {
            if (age < 35) bq8.value = "3"; // อายุน้อย ลงทุนได้ยาว
            else if (age <= 55) bq8.value = "2"; // วัยกลางคน ลงทุนระยะกลาง
            else bq8.value = "1"; // ใกล้เกษียณ เน้นสภาพคล่อง
        }
        
        if (bq6 && age >= 60) {
            bq6.value = "1"; // ผู้สูงอายุ มักจะรับความเสี่ยงพอร์ตติดลบได้น้อย
        }
    };
    window.handleWelfareChange = function() {
        const val = document.getElementById('p_welfare').value;
        const container = document.getElementById('c_ins');
        let currentInsurances = container.innerText || '';

        if (val === 'ประกันกลุ่มองค์กร' && !currentInsurances.includes('ประกันกลุ่ม')) {
            let p1 = addBasePolicy('ประกันกลุ่มบริษัท', 'ประกันกลุ่ม/สวัสดิการ', '500000', '0', '', '', '');
            addRiderRow(p1.querySelector('button'), 'สวัสดิการชดเชยรายได้กลุ่ม', 'ชดเชยรายได้ (HB)', '1000', '0');
        } else if (val === 'สวัสดิการระดับผู้บริหาร' && !currentInsurances.includes('ผู้บริหาร')) {
            addBasePolicy('สวัสดิการสุขภาพผู้บริหาร', 'ประกันกลุ่ม/สวัสดิการ', '5000000', '0', '', '', '');
        } else if (val === 'ประกันชีวิต (ส่วนตัว)' && !currentInsurances.includes('AIA')) {
            let p1 = addBasePolicy('AIA 20 Pay Life', 'ตลอดชีพ (Whole Life)', '1000000', '25000', '', '', '');
            addRiderRow(p1.querySelector('button'), 'AIA Health Saver', 'สุขภาพ (Health)', '500000', '15000');
            addRiderRow(p1.querySelector('button'), 'AIA HB Extra', 'ชดเชยรายได้ (HB)', '2000', '5000');
        }
    };

    function pullInvestments(showAlert = true) {
        document.getElementById('c_invest_current').innerHTML = '';
        document.querySelectorAll('#c_assets .data-row').forEach(row => {
            // ดึงทั้ง สินทรัพย์ลงทุน และ สินทรัพย์ต่างประเทศ
            if(row.dataset.cat === 'สินทรัพย์ลงทุน' || row.dataset.cat === 'สินทรัพย์ต่างประเทศ') {
                let name = row.querySelector('.col-name').value;
                let val = parseNum(row.querySelector('.col-val').value);
                
                let obj = 'ทุนเกษียณอายุ (Retirement)'; 
                let roi = '5.0';
                
                if(name.includes('หุ้น') || name.includes('ตราสารทุน')) { roi = '8.0'; obj = 'เติบโตระยะยาว (Long-term Growth)'; }
                if(name.includes('คริปโต') || name.includes('Forex')) { roi = '12.0'; obj = 'เติบโตระยะยาว (Long-term Growth)'; }
                if(name.includes('ตราสารหนี้') || name.includes('พันธบัตร')) roi = '3.0';
                
                // ตรวจจับสินทรัพย์ต่างประเทศ
                if(row.dataset.cat === 'สินทรัพย์ต่างประเทศ' || name.includes('ต่างประเทศ') || name.includes('Offshore')) { 
                    roi = '9.0'; 
                    obj = 'เติบโตระยะยาว (Long-term Growth)'; 
                }

                addInvestRow(name, val, roi, obj);
            }
        });
        if (showAlert) alert('ดึงข้อมูลสินทรัพย์ลงทุนและต่างประเทศเข้าสู่พอร์ตตราสารการเงินเรียบร้อยแล้ว');
    }

    function pullTaxDeductions(showAlert = true) {
        document.getElementById('c_tax_current').innerHTML = '';
        
        let socialSec = 0;
        if(document.getElementById('p_welfare').value.includes('ประกันสังคม')) socialSec = 9000;
        if(socialSec > 0) addCustomRow('c_tax_current', ['รายการลดหย่อน (อ้างอิง ภ.ง.ด.90/91)', 'จำนวนเงิน (บาท)'], ['เงินสมทบกองทุนประกันสังคม', socialSec.toString()], ['tax_list', '']);

        let lifeIns = 0;
        let healthIns = 0;
        let currentYearThai = new Date().getFullYear() + 543;

        document.querySelectorAll('#c_ins .custom-row').forEach(row => {
            let start = parseInt(row.querySelector('.col-ins-start').value) || 0;
            let end = parseInt(row.querySelector('.col-ins-end').value) || 9999;
            let isActive = true;
            if(start > 0 && currentYearThai < start) isActive = false;
            if(end > 0 && currentYearThai > end) isActive = false;

            if (isActive) {
                let type = row.querySelector('.col-ins-type').value || '';
                let premium = parseNum(row.querySelector('.col-ins-prem').value) || 0;
                if((type.includes('ตลอดชีพ') || type.includes('สะสมทรัพย์') || type.includes('ชีวิต') || type.includes('บำนาญ')) && !type.includes('สุขภาพ')) lifeIns += premium; // Adjusted to include basic life insurance for tax calculation appropriately
                if(type.includes('สุขภาพ')) healthIns += premium;
            }
        });
        
        let allowedHealth = Math.min(healthIns, 25000);
        let allowedLifeHealth = Math.min(lifeIns + allowedHealth, 100000);
        
        if(allowedLifeHealth > 0) addCustomRow('c_tax_current', ['รายการลดหย่อน (อ้างอิง ภ.ง.ด.90/91)', 'จำนวนเงิน (บาท)'], ['เบี้ยประกันชีวิตและสุขภาพ', allowedLifeHealth.toString()], ['tax_list', '']);

        let depStr = document.getElementById('p_dep').value || '0';
        let numDep = parseInt(depStr.replace(/\D/g, '')) || 0;
        if(numDep > 0) addCustomRow('c_tax_current', ['รายการลดหย่อน (อ้างอิง ภ.ง.ด.90/91)', 'จำนวนเงิน (บาท)'], ['ลดหย่อนบุตร (คนละ 30,000.00 บาท)', (numDep * 30000).toString()], ['tax_list', '']);

        document.querySelectorAll('#c_exp .data-row').forEach(row => {
            let cat = row.dataset.cat;
            let name = row.querySelector('.col-name').value.toUpperCase();
            let val = parseNum(row.querySelector('.col-val').value) || 0;
            
            if(cat === 'รายจ่ายเพื่อออม/ลงทุน' && (name.includes('SSF') || name.includes('RMF') || name.includes('ESG'))) {
                let title = name.includes('ESG') ? 'ค่าซื้อหน่วยลงทุน Thai ESG' : 'ค่าซื้อหน่วยลงทุนในกองทุนรวม (SSF/RMF)';
                let yearlyVal = val*12;
                if(name.includes('ESG')) yearlyVal = Math.min(yearlyVal, 300000); 
                addCustomRow('c_tax_current', ['รายการลดหย่อน (อ้างอิง ภ.ง.ด.90/91)', 'จำนวนเงิน (บาท)'], [title, yearlyVal.toString()], ['tax_list', '']);
            }
            if(cat === 'เงินชำระคืนหนี้สิน' && name.includes('บ้าน')) {
                addCustomRow('c_tax_current', ['รายการลดหย่อน (อ้างอิง ภ.ง.ด.90/91)', 'จำนวนเงิน (บาท)'], ['ดอกเบี้ยเงินกู้ยืมอยู่อาศัย (ตามจริงไม่เกิน 1 แสน)', Math.min(val*12*0.5, 100000).toString()], ['tax_list', '']); 
            }
        });

        if (showAlert) alert('ดึงข้อมูลลดหย่อนภาษีเบื้องต้น (อิงเกณฑ์ 2568) เรียบร้อยแล้ว กรุณาตรวจสอบและแก้ไขตัวเลขให้ตรงกับความจริง');
    }

    if (typeof ChartDataLabels !== 'undefined') {
        Chart.register(ChartDataLabels);
    }

    const fmt = (num) => {
        return parseNum(num).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    };
    
    // 🟢 วางฟังก์ชันสุ่มคำ (NLG Helper) ไว้ตรงนี้ เพื่อให้ใช้ได้ทั้งระบบ 🟢
    const pickStr = (arr) => arr[Math.floor(Math.random() * arr.length)];
    let flowChart, simChart, astChart;
    let autoFetchedData = null;

    function getNormallyDistributedRandom(mean, stdDev) {
        let u1 = Math.random();
        let u2 = Math.random();
        if(u1 === 0) u1 = 0.00001; 
        let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return mean + (z0 * stdDev);
    }

    // ฟังก์ชันสุ่มจำนวนครั้งที่เกิดวิกฤตแบบ Poisson Distribution (Knuth's algorithm)
function getPoissonRandom(lambda) {
    let L = Math.exp(-lambda);
    let k = 0;
    let p = 1.0;
    do {
        k++;
        p *= Math.random();
    } while (p > L);
    return k - 1;
}

// ฟังก์ชันสุ่มการแจกแจงปกติ (Gaussian)
function getGaussianRandom() {
    let u1 = Math.random(); 
    let u2 = Math.random();
    if(u1 === 0) u1 = 0.00001; 
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
}

// --- สอดแทรกฟังก์ชันสุ่ม Regime ---
const REGIME_TRANSITION = [
    [0.60, 0.35, 0.05], // จาก Bull (0) ไป -> [Bull, Sideway, Bear]
    [0.20, 0.70, 0.10], // จาก Sideway (1) ไป -> [Bull, Sideway, Bear]
    [0.25, 0.25, 0.50]  // จาก Bear (2) ไป -> [Bull, Sideway, Bear]
];

function getNextRegime(currentRegime) {
    let rand = Math.random();
    let probs = REGIME_TRANSITION[currentRegime];
    if (rand < probs[0]) return 0;
    if (rand < probs[0] + probs[1]) return 1;
    return 2;
}

// --- ฟังก์ชัน getAdvancedReturn แบบใหม่ ---
function getAdvancedReturn(mean, stdDev, skewness = 0, kurtosis = 0, jumpFreq = 0, jumpMean = 0, jumpStd = 0, regime = 1, dt = 1) {
    let adjustedMean, adjustedStd;
    
    // กำหนด Momentum States
    if (regime === 0) { // 🟢 Bull
        adjustedMean = mean * 1.5; 
        adjustedStd = stdDev * 0.7;
    } else if (regime === 1) { // 🟡 Sideway
        adjustedMean = mean * 0.8; 
        adjustedStd = stdDev * 1.0;
    } else { // 🔴 Bear
        adjustedMean = mean * -1.0; 
        adjustedStd = stdDev * 2.0;
    }

    let Z = getGaussianRandom();
    let Z_CF = Z;

    // ปรับหางการกระจายตัวด้วย Cornish-Fisher Expansion
    if (skewness !== 0 || kurtosis !== 0) {
        let Z2 = Z * Z; 
        let Z3 = Z2 * Z;
        let S = skewness; 
        let K = kurtosis;
        Z_CF = Z + (1/6)*(Z2 - 1)*S + (1/24)*(Z3 - 3*Z)*K - (1/36)*(2*Z3 - 5*Z)*(S*S);
    }

    // ส่วนของการเกิดวิกฤต (Residual Shocks)
    let jumpComponent = 0;
    let compensator = 0;

    if (jumpFreq > 0) {
        let numJumps = getPoissonRandom(jumpFreq * dt);
        for (let i = 0; i < numJumps; i++) {
            let jumpSizeZ = getGaussianRandom();
            jumpComponent += jumpMean + (jumpSizeZ * jumpStd);
        }
        compensator = jumpFreq * jumpMean * dt;
    }

    let drift = (adjustedMean - (Math.pow(adjustedStd, 2) / 2)) * dt;
    let diffusion = adjustedStd * Math.sqrt(dt) * Z_CF;
    let logReturn = drift - compensator + diffusion + jumpComponent;
    
    return Math.exp(logReturn) - 1; 
}


// =====================================================================
// 🚀 [UPGRADE] TRUE INLINE WEB WORKER (Monte Carlo Simulation)
// + Dynamic Cashflow Liberation, Stochastic Inflation, Correlation & Withdrawal Guardrails
// =====================================================================

const mcWorkerCode = `
    // --- Math Helper Functions ---
    function getNormallyDistributedRandom(mean, stdDev) {
        let u1 = Math.random(); let u2 = Math.random();
        if(u1 === 0) u1 = 0.00001; 
        let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return mean + (z0 * stdDev);
    }

    function getPoissonRandom(lambda) {
        let L = Math.exp(-lambda), k = 0, p = 1.0;
        do { k++; p *= Math.random(); } while (p > L);
        return k - 1;
    }

    // 1. สร้างฟังก์ชันเพื่อดึง Z-Score เพียวๆ ออกมาใช้งาน
    function getGaussianRandom() {
        let u1 = Math.random(); let u2 = Math.random();
        if(u1 === 0) u1 = 0.00001; 
        return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    }

    // 2. [NEW] ฟังก์ชันปรับ Markov Transition Matrix ตามสภาวะ Macro
    function getDynamicRegimeTransition(macroRoi, macroInf) {
        let realReturn = macroRoi - macroInf;
        if (realReturn > 0.03) {
            // Bullish/Goldilocks
            return [[0.70, 0.25, 0.05], [0.30, 0.60, 0.10], [0.40, 0.30, 0.30]]; 
        } else if (realReturn < 0.0) {
            // Bearish/Stagflation
            return [[0.40, 0.40, 0.20], [0.10, 0.60, 0.30], [0.10, 0.20, 0.70]]; 
        } else {
            // Neutral
            return [[0.60, 0.35, 0.05], [0.20, 0.70, 0.10], [0.25, 0.25, 0.50]]; 
        }
    }

    // 3. [UPDATED] รับค่า Transition Matrix แบบไดนามิก
    function getNextRegime(currentRegime, transitionMatrix) {
        let rand = Math.random();
        let probs = transitionMatrix[currentRegime];
        if (rand < probs[0]) return 0;
        if (rand < probs[0] + probs[1]) return 1;
        return 2;
    }

    // 4. [UPDATED] รองรับ Z-Score จากภายนอกเพื่อทำ Correlation
    function getAdvancedReturn(mean, stdDev, skewness = 0, kurtosis = 0, jumpFreq = 0, jumpMean = 0, jumpStd = 0, regime = 1, dt = 1, z_score = null) {
        let adjustedMean, adjustedStd;
        if (regime === 0) { adjustedMean = mean * 1.5; adjustedStd = stdDev * 0.7; }
        else if (regime === 1) { adjustedMean = mean * 0.8; adjustedStd = stdDev * 1.0; }
        else { adjustedMean = mean * -1.0; adjustedStd = stdDev * 2.0; }

        let Z = z_score !== null ? z_score : getGaussianRandom(); 
        let Z_CF = Z;
        
        if (skewness !== 0 || kurtosis !== 0) {
            let Z2 = Z * Z; let Z3 = Z2 * Z; let S = skewness; let K = kurtosis;
            Z_CF = Z + (1/6)*(Z2 - 1)*S + (1/24)*(Z3 - 3*Z)*K - (1/36)*(2*Z3 - 5*Z)*(S*S);
        }
        
        let jumpComponent = 0; let compensator = 0;
        if (jumpFreq > 0) {
            let numJumps = getPoissonRandom(jumpFreq * dt);
            for (let i = 0; i < numJumps; i++) jumpComponent += jumpMean + (getGaussianRandom() * jumpStd);
            compensator = jumpFreq * jumpMean * dt;
        }
        
        let drift = (adjustedMean - (Math.pow(adjustedStd, 2) / 2)) * dt;
        let diffusion = adjustedStd * Math.sqrt(dt) * Z_CF;
        let logReturn = drift - compensator + diffusion + jumpComponent;
        return Math.exp(logReturn) - 1; 
    }

    // --- Main Worker Execution ---
    self.onmessage = function(e) {
        const data = e.data;
        let successCount = 0;
        const updateInterval = Math.floor(data.iterations / 10) || 1; 

        // 🌟 กำหนดความสัมพันธ์ (Correlation) ระหว่างเงินเฟ้อกับผลตอบแทนตลาด (-0.30)
        const RHO = -0.30; 

        for (let sim = 0; sim < data.iterations; sim++) {
            let wR = data.initialWealth;
            let currentDynamicWithdrawal = data.baseExpense;
            let IWR = 0;
            let lastYearRoiR = data.targetRoi;
            let isDepleted = false;
            let currentRegime = 1;
            
            let hitBySORR = (Math.random() < 0.15); 
            let currentCashBuffer = 0;
            let stochasticBaseExpense = data.baseExpense; 

            for (let i = data.rawAge; i <= data.lifeExp; i++) {
                let yearsElapsed = i - data.rawAge;

                // 🌪️ [ตรรกะที่ 2] สุ่มเงินเฟ้อแบบ Stochastic Inflation + Correlation
                let z_inf = getGaussianRandom();
                let currentYearInf = data.infRate + (z_inf * (data.infSd || 0.015));
                currentYearInf = Math.max(0.01, currentYearInf); // ค่าครองชีพขั้นต่ำโตปีละ 1%
                stochasticBaseExpense = stochasticBaseExpense * (1 + currentYearInf);

                // 🎯 1. สุ่ม Z-Score สำหรับผลตอบแทนที่ผูกกับเงินเฟ้อ (Cholesky Decomposition)
                let z_ret_raw = getGaussianRandom();
                let z_ret_correlated = (RHO * z_inf) + (Math.sqrt(1 - Math.pow(RHO, 2)) * z_ret_raw);

                // 📈 Dynamic Glide Path
                let dynamicRoi = data.targetRoi;
                let dynamicSd = data.sdEst;
                let glideStartAge = data.retAge - 10;
                let glideEndAge = data.retAge;
                let floorRoi = Math.max(0.03, data.targetRoi - 0.04);
                let floorSd = Math.max(0.04, data.sdEst * 0.4);

                if (i <= glideStartAge) {
                    dynamicRoi = data.targetRoi; dynamicSd = data.sdEst;
                } else if (i >= glideEndAge) {
                    dynamicRoi = floorRoi; dynamicSd = floorSd;
                } else {
                    let progress = (i - glideStartAge) / (glideEndAge - glideStartAge);
                    dynamicRoi = data.targetRoi - (progress * (data.targetRoi - floorRoi));
                    dynamicSd = data.sdEst - (progress * (data.sdEst - floorSd));
                }

                // 📊 2. อัปเดต Regime ของตลาดตามสภาวะ Macro เศรษฐกิจ (Real Return)
                let dynamicTransitionMatrix = getDynamicRegimeTransition(dynamicRoi, data.infRate);
                currentRegime = getNextRegime(currentRegime, dynamicTransitionMatrix);

                // ==========================================
                // 🟢 ช่วงก่อนเกษียณ (Accumulation Phase)
                // ==========================================
                if (i < data.retAge) {
                    // 🔓 ปลดล็อกกระแสเงินสดหลังปลดหนี้
                    let dynamicSavings = data.annualSavings;
                    if (data.debtSchedules) {
                        data.debtSchedules.forEach(debt => {
                            if (yearsElapsed >= debt.payoffYear) {
                                dynamicSavings += debt.amount; 
                            }
                        });
                    }

                    // 📈 คำนวณผลตอบแทนด้วย z_ret_correlated
                    let currentRoi = getAdvancedReturn(dynamicRoi, dynamicSd, data.skew, data.kurt, data.jumpF, data.jumpM, data.jumpS, currentRegime, 1, z_ret_correlated);
                    
                    wR = (wR * (1 + currentRoi)) + dynamicSavings;
                    // 🚨 [FIX 2.1] ล็อกไม่ให้กู้เงินตลาดเมื่อพอร์ตแตก
                    if (wR <= 0) { 
                        wR = 0; 
                        isDepleted = true; 
                        break; // ทะลุก้นถังแล้ว ไม่ต้องรันอายุปีถัดไป
                    }
                // ==========================================
                // 🔴 ช่วงหลังเกษียณ (Decumulation Phase)
                // ==========================================
                } else {
                    let isSORRPeriod = hitBySORR && (i >= data.retAge && i <= data.retAge + 3);
                    
                    // 📈 คำนวณผลตอบแทน
                    let postRetRoi = isSORRPeriod 
                        ? (data.targetRoi * -1) + (dynamicSd * z_ret_correlated) 
                        : Math.max(getAdvancedReturn(dynamicRoi, dynamicSd, data.skew/2, data.kurt/2, data.jumpF/2, data.jumpM, data.jumpS, currentRegime, 1, z_ret_correlated), -0.3);
                    
                    if (i === data.retAge) {
                        // 🌟 [FIX 4.3] ปีแรกที่เกษียณ ให้ดึงค่าใช้จ่ายที่ทบต้นด้วยเงินเฟ้อสุ่มมาใช้งานเลย
                        currentDynamicWithdrawal = stochasticBaseExpense; 
                        IWR = currentDynamicWithdrawal / (wR || 1);
                        
                        const SWR_CAP = 0.06;
                        if (IWR > SWR_CAP) IWR = SWR_CAP;
                        if (IWR <= 0) IWR = 0.04; 
                        
                        if (data.cashBufferTarget) {
                            let bufferNeeded = Math.min(wR * 0.15, data.cashBufferTarget);
                            wR -= bufferNeeded;
                            currentCashBuffer += bufferNeeded;
                        }
                    } else {
                        // ⚙️ Guyton-Klinger Dynamic Withdrawal Rules
                        // 🌟 [FIX 4.4] ปีต่อๆ ไป กฎการปรับขึ้นเงินเดือนเกษียณ ต้องวิ่งตาม currentYearInf เสมอ
                        let proposedWithdrawal = currentDynamicWithdrawal * (1 + currentYearInf);
                        
                        if (lastYearRoiR < 0) {
                            proposedWithdrawal = currentDynamicWithdrawal;
                        }
                        
                        let CWR = proposedWithdrawal / (wR + currentCashBuffer || 1);
                        
                        if (CWR > IWR * 1.20) {
                            proposedWithdrawal = Math.max(proposedWithdrawal * 0.90, data.floorExpense);
                        } 
                        else if (CWR < IWR * 0.80) {
                            proposedWithdrawal = proposedWithdrawal * 1.10;
                        }
                        
                        currentDynamicWithdrawal = proposedWithdrawal;
                    }
                    
                    lastYearRoiR = postRetRoi;
                    let currentYearPension = 0;
                    if (data.pensionStreams && data.pensionStreams.length > 0) {
                        data.pensionStreams.forEach(p => {
                            if (i >= p.startAge) currentYearPension += p.yearlyAmount;
                        });
                    }

                    let actualWithdrawalFromPortfolio = currentDynamicWithdrawal - currentYearPension;
                    if (actualWithdrawalFromPortfolio < 0) actualWithdrawalFromPortfolio = 0; 
                    
                    // 🩺 สุ่มค่าใช้จ่ายสุขภาพก้อนใหญ่
                    if (i >= data.retAge + 10 && i % 5 === 0) {
                        let medicalShockAmt = 500000 * Math.pow(1 + (data.medInfRate || 0.08), (i - data.rawAge)); 
                        actualWithdrawalFromPortfolio += medicalShockAmt;
                    }

                    // 🪣 Bucket Strategy Guardrail (Cash Buffer System)
                    if (postRetRoi < -0.05 && currentCashBuffer >= actualWithdrawalFromPortfolio) {
                        currentCashBuffer -= actualWithdrawalFromPortfolio;
                        wR = wR * (1 + postRetRoi); 
                    } else {
                        let hwR = actualWithdrawalFromPortfolio / 2;
                        wR = (wR - hwR > 0 ? wR - hwR : 0) * (1 + postRetRoi) - hwR;
                        
                        // Refill Buffer ถ้าตลาดเป็นขาขึ้น
                        if (postRetRoi > 0.10 && currentCashBuffer < data.cashBufferTarget) {
                            let excessGain = wR * (postRetRoi - 0.10); 
                            let refillAmount = Math.min(excessGain, data.cashBufferTarget - currentCashBuffer);
                            if (refillAmount > 0) {
                                wR -= refillAmount;
                                currentCashBuffer += refillAmount;
                            }
                        }
                    }
                    
                    if (wR + currentCashBuffer <= 0) { isDepleted = true; break; }
                }
            }
            if (!isDepleted) successCount++;

            if (sim % updateInterval === 0 || sim === data.iterations - 1) {
                self.postMessage({ type: 'progress', percent: Math.round((sim / data.iterations) * 100) });
            }
        }
        
        self.postMessage({ type: 'done', result: (successCount / data.iterations) * 100 });
    };
`;

const mcBlob = new Blob([mcWorkerCode], { type: 'application/javascript' });
const mcWorkerUrl = URL.createObjectURL(mcBlob);

function runMonteCarloWorker(data, onProgress = null) {
    return new Promise((resolve, reject) => {
        if (typeof Worker === 'undefined') return reject(new Error("เบราว์เซอร์นี้ไม่รองรับ Web Worker"));
        const worker = new Worker(mcWorkerUrl);
        worker.onmessage = function(e) {
            if (e.data.type === 'progress' && onProgress) onProgress(e.data.percent);
            else if (e.data.type === 'done') { worker.terminate(); resolve(e.data.result); }
        };
        worker.onerror = function(error) { worker.terminate(); reject(error); };
        worker.postMessage(data); 
    });
}

    async function processReportInit() {
        if (window.isSystemProcessing) {
        return; // เด้งออกทันทีถ้ามีงานเดิมรันอยู่ (ป้องกันกราฟพัง)
        }
        window.isSystemProcessing = true; // 🔒 ล็อกระบบ
        window.compromisedRetireAge = null;
        window.wiRandomCache = null;
        window.wiLastRoi = null;
        window.whatIfAdjustmentsCount = 0;
        window.diffHealth = null;
        window.diffCI = null;

        // 🛡️ Safety Net: ตั้งเวลาปลดล็อกอัตโนมัติ (เผื่อระบบค้างหนักจนไม่เข้า finally)
        let safetyUnlock = setTimeout(() => {
            window.isSystemProcessing = false;
            let overlay = document.getElementById('mlLoadingOverlay');
            if(overlay) overlay.classList.add('hidden');
        }, 10000); // 10000 ms = 10 วินาที

        applySettingsToUI();
        const overlay = document.getElementById('mlLoadingOverlay');
        const progressBar = document.getElementById('mlProgressBar');
        const loadText = document.getElementById('mlLoadingText');
        
        overlay.classList.remove('hidden');
        progressBar.style.width = '10%';
        loadText.innerText = "Gathering User Input Features...";

        try {
            // [ลบตัวแปรหลอกออก บังคับให้ AI ดึงข้อมูลจากสมมติฐานที่เราอัพเดท (Single Source of Truth)]
            await new Promise(r => setTimeout(r, 200)); 
            
            progressBar.style.width = '30%';
            loadText.innerText = "🧠 Applying Pre-trained Logistic Regression Model...";
            await new Promise(r => setTimeout(r, 200));

            await processReport(progressBar, loadText);
            
        } catch (error) {
            console.error("AI Engine Error:", error);
            alert("⚠️ เกิดข้อผิดพลาด: " + error.message + "\n\n(ลองแคปหน้าจอนี้ หรือดูรายละเอียดบรรทัดที่พังได้ใน Console [F12] ครับ)");
        } finally {
            clearTimeout(safetyUnlock); // ยกเลิกการนับเวลา Safety Net (ถ้ารันเสร็จก่อน 10 วินาที)
            overlay.classList.add('hidden');
            window.isSystemProcessing = false; // 🔓 ปลดล็อกระบบตรงนี้! (ตัวแก้ปัญหาปุ่มค้าง)
        }
    }

    function addRow(containerId, selectId, placeholders, defaultName = '', defaultVal = '', listId = '') {
        const container = document.getElementById(containerId);
        const select = document.getElementById(selectId);
        const category = select.options[select.selectedIndex].text;
        const catValue = select.value;
        const div = document.createElement('div');
        div.className = 'input-row data-row bg-gray-50 p-2 rounded border mb-2 transition-all hover:shadow-md hover:border-blue-300';
        div.dataset.cat = catValue;
        
        let fmtVal = defaultVal ? parseNum(defaultVal).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '';
        div.innerHTML = `
            <span class="text-xs font-semibold w-32 truncate text-gray-600 bg-gray-200 px-2 py-1 rounded" title="${category}">${category.split('(')[0]}</span>
            <input type="text" placeholder="${placeholders[0]}" class="input-field col-name" value="${defaultName}" ${listId ? `list="${listId}"` : ''}>
            <input type="text" placeholder="${placeholders[1]}" class="input-field col-val w-28 text-right font-bold text-blue-700 money-input" value="${fmtVal}" onblur="formatInput(this)" onfocus="unformatInput(this)">
            <button type="button" onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700 px-3 font-bold text-lg no-print bg-white border rounded transition-colors hover:bg-red-50">×</button>
        `;
        container.appendChild(div);
    }

    function addCustomRow(containerId, placeholders, defaults = [], listIds = []) {
        const container = document.getElementById(containerId);
        const div = document.createElement('div');
        div.className = 'input-row custom-row bg-gray-50 p-2 rounded border mb-2 transition-all hover:shadow-md hover:border-purple-300';
        let inputsHTML = placeholders.map((p, i) => {
            let isMoney = p.includes('บาท') || p.includes('จำนวนเงิน');
            let type = isMoney ? 'text' : (p.includes('%')||p.includes('ปี')||p.includes('ระดับ') ? 'number' : 'text');
            let val = defaults[i] || '';
            let evts = isMoney ? `onblur="formatInput(this)" onfocus="unformatInput(this)"` : '';
            let list = listIds[i] ? `list="${listIds[i]}"` : '';
            let moneyClass = isMoney ? 'money-input' : '';
            if(isMoney && val) val = parseNum(val).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            return `<input type="${type}" placeholder="${p}" class="input-field text-sm ${moneyClass}" value="${val}" ${evts} ${list}>`;
        }).join('');
        div.innerHTML = inputsHTML + `<button type="button" onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700 px-3 font-bold text-lg no-print bg-white border rounded transition-colors hover:bg-red-50">×</button>`;
        container.appendChild(div);
    }

    // --- ฟังก์ชันจัดการบำนาญ (Annuity) ---
    function updateInsPlaceholder(selectEl) {
        const row = selectEl.closest('.custom-row');
        const valInput = row.querySelector('.col-ins-val');
        if (selectEl.value.includes('บำนาญ')) {
            valInput.placeholder = "เงินบำนาญต่อปี (บาท)"; valInput.classList.add('bg-green-50'); 
        } else {
            valInput.placeholder = "ทุนประกัน/ค่ารักษา (บาท)"; valInput.classList.remove('bg-green-50');
        }
    }

    // --- ระบบคลังแบบประกันส่วนตัว (Local Product Library V2 - จัดการได้ + AIA Database) ---
    const aiaBaseProducts = ['AIA Pay Life Plus (20 Pay)', 'AIA 20 Pay Life',  'AIA Legacy Prestige Plus', 'AIA Endowment 15/25', 'AIA Excellent', 'AIA Annuity Fix', 'AIA Annuity Sure', 'AIA CI ProCare', 'AIA Super Care', 'AIA Issara Plus', 'AIA Smart Wealth', 'AIA Smart Select', 'AIA Infinite Wealth Prestige', 'AIA Wealth Max', 'AIA Elite Income Prestige'];
    const aiaRiderProducts = ['AIA Health Starter', 'AIA Health Saver', 'AIA Health Happy', 'AIA Infinite Care', 'HB / HB Extra', 'AIA CI Plus', 'AIA CI Top Up', 'AIA Multi-Pay CI Plus', 'AIA Care for Cancer', 'AIA Health Cancer', 'WP', 'WPCI'];

    function getProductLibrary() {
        const saved = localStorage.getItem('fa_product_library_v2');
        return saved ? JSON.parse(saved) : [];
    }

    // ฟังก์ชันตอนกดปุ่ม ⭐
    function saveProductToLibrary(btnElement) {
        const row = btnElement.closest('.custom-row');
        const nameInput = row.querySelector('.col-ins-name').value.trim();
        const mainType = row.querySelector('.col-ins-main-type').value; 
        const typeStr = mainType === 'สัญญาหลัก' ? 'base' : 'rider';

        if (!nameInput) {
            alert('⚠️ กรุณากรอกชื่อแบบประกันก่อนกดบันทึกครับ');
            return;
        }

        let library = getProductLibrary();
        
        // เช็คว่าซ้ำไหม
        let isExist = library.some(p => {
            let pName = typeof p === 'object' ? p.name : p;
            let pType = typeof p === 'object' ? p.type : 'base';
            return pName === nameInput && pType === typeStr;
        });

        if (!isExist) {
            library.push({ name: nameInput, type: typeStr });
            localStorage.setItem('fa_product_library_v2', JSON.stringify(library));
            updateProductDatalist();
            renderLibraryManager(); 
            
            btnElement.classList.add('scale-150', 'text-yellow-400');
            setTimeout(() => btnElement.classList.remove('scale-150', 'text-yellow-400'), 300);
            
            alert(`✅ บันทึก "${nameInput}" (${mainType}) ลงในคลังเรียบร้อยแล้ว!`);
        } else {
            alert(`⭐ "${nameInput}" มีอยู่ในคลังหมวดหมู่${mainType}แล้วครับ`);
        }
    }

    function updateProductDatalist() {
        const baseList = document.getElementById('saved_base_library');
        const riderList = document.getElementById('saved_rider_library');
        if (!baseList || !riderList) return;
        
        const library = getProductLibrary();
        let htmlBase = '';
        let htmlRider = '';

        // Add AIA Standard Base
        aiaBaseProducts.forEach(name => htmlBase += `<option value="${name}">`);
        // Add Custom Base
        library.forEach(p => {
            let name = typeof p === 'object' ? p.name : p;
            let type = typeof p === 'object' ? p.type : 'base';
            if (type === 'base' && !aiaBaseProducts.includes(name)) htmlBase += `<option value="${name}">`;
        });

        // Add AIA Standard Riders
        aiaRiderProducts.forEach(name => htmlRider += `<option value="${name}">`);
        // Add Custom Riders
        library.forEach(p => {
            let name = typeof p === 'object' ? p.name : p;
            let type = typeof p === 'object' ? p.type : 'base';
            if (type === 'rider' && !aiaRiderProducts.includes(name)) htmlRider += `<option value="${name}">`;
        });

        baseList.innerHTML = htmlBase;
        riderList.innerHTML = htmlRider;
    }

    // แสดงรายการในหน้าตั้งค่า
    function renderLibraryManager() {
        const container = document.getElementById('library_list_container');
        if (!container) return;
        const library = getProductLibrary();
        
        if (library.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-400 py-3">ยังไม่มีข้อมูลในคลัง (แบบเพิ่มเอง)</div>';
            return;
        }
        
        let html = '';
        library.forEach((p, index) => {
            let name = typeof p === 'object' ? p.name : p;
            let type = typeof p === 'object' ? p.type : 'base';
            let badge = type === 'base' ? 
                '<span class="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">สัญญาหลัก</span>' : 
                '<span class="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded border border-orange-200">เพิ่มเติม</span>';
            
            html += `
            <div class="flex justify-between items-center py-1.5 border-b border-gray-200 last:border-0 hover:bg-white transition px-2 rounded">
                <div class="truncate pr-2 flex items-center gap-2">${badge} <span class="text-gray-700 font-medium">${name}</span></div>
                <button type="button" onclick="removeProductFromLibrary(${index})" class="text-red-400 hover:text-white hover:bg-red-500 font-bold px-2 py-0.5 rounded transition-colors text-xs shadow-sm">ลบ</button>
            </div>`;
        });
        container.innerHTML = html;
    }

    // เพิ่มผ่านฟอร์มในหน้าตั้งค่า
    function addManualProduct() {
        const nameInput = document.getElementById('new_prod_name');
        const typeInput = document.getElementById('new_prod_type');
        const name = nameInput.value.trim();
        const type = typeInput.value;

        if(!name) return alert('⚠️ กรุณากรอกชื่อแบบประกันครับ');
        
        let library = getProductLibrary();
        let isExist = library.some(p => (typeof p === 'object' ? p.name : p) === name && (typeof p === 'object' ? p.type : 'base') === type);
        
        if (!isExist) {
            library.push({ name: name, type: type });
            localStorage.setItem('fa_product_library_v2', JSON.stringify(library));
            nameInput.value = ''; // เคลียร์ช่องให้กรอกอันต่อไปง่ายๆ
            updateProductDatalist();
            renderLibraryManager();
        } else {
            alert('รายชื่อนี้มีอยู่ในคลังแล้วครับ');
        }
    }

    // ลบทีละรายการ
    function removeProductFromLibrary(index) {
        let library = getProductLibrary();
        library.splice(index, 1);
        localStorage.setItem('fa_product_library_v2', JSON.stringify(library));
        updateProductDatalist();
        renderLibraryManager();
    }

    // ล้างทั้งหมด
    function clearProductLibrary() {
        if(confirm('⚠️ คุณแน่ใจหรือไม่ว่าต้องการ "ล้างรายชื่อแบบประกันทั้งหมด"?\n(การกระทำนี้ไม่สามารถย้อนกลับได้)')) {
            localStorage.removeItem('fa_product_library_v2');
            updateProductDatalist();
            renderLibraryManager();
            alert('🗑️ ล้างข้อมูลคลังแบบประกันเรียบร้อยแล้วครับ');
        }
    }

    function addBasePolicy(defaultName='', defaultType='ตลอดชีพ (Whole Life)', defaultVal='', defaultPrem='', defaultStart='', defaultEnd='', defaultCV='') {
        const container = document.getElementById('c_ins');
        const policyWrapper = document.createElement('div');
        policyWrapper.className = 'policy-wrapper bg-white border-2 border-purple-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md';
        
        let types = ['ตลอดชีพ (Whole Life)', 'สะสมทรัพย์ (Endowment)', 'บำนาญ (Annuity)', 'ควบการลงทุน (Unit Linked)', 'โรคร้ายแรง (CI - หลัก)', 'ประกันกลุ่ม/สวัสดิการ'];
        let options = types.map(t => `<option value="${t}" ${defaultType.includes(t.split(' ')[0]) ? 'selected' : ''}>${t}</option>`).join('');
        
        let currentYearThai = new Date().getFullYear() + 543;
        let startYear = defaultStart || currentYearThai;
        let endYear = defaultEnd || (currentYearThai + 20);

        let fmtVal = defaultVal ? parseNum(defaultVal).toLocaleString('th-TH') : '';
        let fmtPrem = defaultPrem ? parseNum(defaultPrem).toLocaleString('th-TH') : '';
        let fmtCV = defaultCV ? parseNum(defaultCV).toLocaleString('th-TH') : '';

        policyWrapper.innerHTML = `
            <div class="custom-row bg-purple-50/50 p-4 border-b border-purple-100 relative">
                <input type="hidden" class="col-ins-main-type" value="สัญญาหลัก">
                <div class="absolute top-2 right-2">
                    <button type="button" onclick="this.closest('.policy-wrapper').remove()" class="text-red-500 hover:text-white hover:bg-red-500 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm transition-colors" title="ลบกรมธรรม์นี้">×</button>
                </div>
                <h4 class="font-bold text-purple-800 mb-3 flex items-center"><span class="bg-purple-600 text-white text-xs px-2 py-1 rounded mr-2">สัญญาหลัก</span></h4>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3 w-full mb-3">
                    <div class="flex items-center gap-1 w-full relative">
                        <input type="text" placeholder="ชื่อบริษัท/แบบประกัน (สัญญาหลัก)" class="input-field text-sm col-ins-name font-bold w-full pr-8" value="${defaultName}" list="saved_base_library">
                        <button type="button" onclick="saveProductToLibrary(this)" class="absolute right-2 text-gray-300 hover:text-yellow-500 transition-all transform hover:scale-110 text-lg" title="บันทึกแบบประกันนี้เก็บไว้ใช้ครั้งหน้า">⭐</button>
                    </div>
                    <select class="input-field text-sm col-ins-type" onchange="updateInsPlaceholder(this)">${options}</select>
                    <input type="text" placeholder="${defaultType.includes('บำนาญ') ? 'เงินบำนาญต่อปี (บาท)' : 'ทุนประกันชีวิต (บาท)'}" class="input-field text-sm col-ins-val money-input font-bold text-blue-700 ${defaultType.includes('บำนาญ') ? 'bg-green-50' : ''}" value="${fmtVal}" onblur="formatInput(this)" onfocus="unformatInput(this)">
                    <input type="text" placeholder="มูลค่าเวนคืน (CV)" class="input-field text-sm col-ins-cv money-input bg-blue-50" value="${fmtCV}" onblur="formatInput(this)" onfocus="unformatInput(this)" title="มูลค่าเวนคืนกรมธรรม์ ณ ปัจจุบัน">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
                    <div class="flex items-center gap-2"><span class="text-xs text-gray-600">เริ่มปี พ.ศ.</span><input type="number" class="input-field text-sm col-ins-start w-full" value="${startYear}"></div>
                    <div class="flex items-center gap-2"><span class="text-xs text-gray-600">สิ้นสุด พ.ศ.</span><input type="number" class="input-field text-sm col-ins-end w-full" value="${endYear}"></div>
                    <div class="md:col-span-2 flex items-center gap-2">
                        <span class="text-xs font-bold text-gray-700">เบี้ยสัญญาหลัก/ปี</span>
                        <input type="text" placeholder="เบี้ยสัญญาหลัก (บาท)" class="input-field text-sm col-ins-prem money-input font-bold" value="${fmtPrem}" onblur="formatInput(this)" onfocus="unformatInput(this)">
                    </div>
                </div>
            </div>
            <div class="riders-container p-3 space-y-2 bg-gray-50/50"></div>
            <div class="p-2 bg-white border-t border-gray-100">
                <button type="button" onclick="addRiderRow(this)" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded transition-colors w-full border border-dashed border-indigo-200">+ เพิ่มสัญญาเพิ่มเติม (Rider) แนบท้ายกรมธรรม์นี้</button>
            </div>
        `;
        container.appendChild(policyWrapper);
        return policyWrapper;
    }

    // --- ฟังก์ชันสร้างสัญญาเพิ่มเติม (Rider) ---
    function addRiderRow(btnEl, defaultName='', defaultType='สุขภาพ (Health)', defaultVal='', defaultPrem='') {
        const ridersContainer = btnEl.closest('.policy-wrapper').querySelector('.riders-container');
        const riderDiv = document.createElement('div');
        riderDiv.className = 'custom-row bg-white p-3 rounded border border-gray-200 shadow-sm relative pl-8';
        
        let types = ['สุขภาพ (Health)', 'โรคร้ายแรง (CI - เพิ่มเติม)', 'ชดเชยรายได้ (HB)', 'ยกเว้นเบี้ย (WP)', 'อุบัติเหตุ (PA)'];
        let options = types.map(t => `<option value="${t}" ${defaultType.includes(t.split(' ')[0]) ? 'selected' : ''}>${t}</option>`).join('');
        
        // ดึงปีเริ่ม/สิ้นสุดจากสัญญาหลักมาเป็นค่า Default
        const parentBase = btnEl.closest('.policy-wrapper').querySelector('.custom-row');
        let startYear = parentBase.querySelector('.col-ins-start').value;
        let endYear = parentBase.querySelector('.col-ins-end').value;

        let fmtVal = defaultVal ? parseNum(defaultVal).toLocaleString('th-TH') : '';
        let fmtPrem = defaultPrem ? parseNum(defaultPrem).toLocaleString('th-TH') : '';

        riderDiv.innerHTML = `
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">↳</div>
            <input type="hidden" class="col-ins-main-type" value="สัญญาเพิ่มเติม">
            <input type="hidden" class="col-ins-cv" value="0"> <div class="grid grid-cols-1 md:grid-cols-6 gap-2 w-full pr-6">
                <div class="flex items-center gap-1 w-full relative md:col-span-2">
                    <div class="flex items-center gap-1 w-full relative md:col-span-2">
                    <input type="text" placeholder="ชื่อสัญญาเพิ่มเติม" class="input-field text-xs col-ins-name w-full pr-8" value="${defaultName}" list="saved_rider_library">
                    <button type="button" onclick="saveProductToLibrary(this)" class="absolute right-2 text-gray-300 hover:text-yellow-500 transition-all transform hover:scale-110 text-sm" title="บันทึกสัญญาเพิ่มเติมนี้เก็บไว้ใช้ครั้งหน้า">⭐</button>
                </div>
                </div>
                <select class="input-field text-xs col-ins-type">${options}</select>
                <input type="text" placeholder="วงเงินความคุ้มครอง" class="input-field text-xs col-ins-val money-input" value="${fmtVal}" onblur="formatInput(this)" onfocus="unformatInput(this)">
                <input type="text" placeholder="เบี้ยทิ้งรายปี" class="input-field text-xs col-ins-prem money-input text-orange-600 font-semibold" value="${fmtPrem}" onblur="formatInput(this)" onfocus="unformatInput(this)">
                <div class="flex gap-1">
                    <input type="number" placeholder="เริ่ม" class="input-field text-[10px] col-ins-start px-1" value="${startYear}" title="ปี พ.ศ. เริ่ม">
                    <input type="number" placeholder="จบ" class="input-field text-[10px] col-ins-end px-1" value="${endYear}" title="ปี พ.ศ. สิ้นสุด">
                </div>
            </div>
            <button type="button" onclick="this.closest('.custom-row').remove()" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 font-bold">×</button>
        `;
        ridersContainer.appendChild(riderDiv);
    }

    // --- ฟังก์ชันดั้งเดิมสำหรับการรองรับไฟล์ Load (Backward Compatibility) ---
    function addInsRow(defaultName='', defaultType='', defaultVal='', defaultPrem='', defaultIsBase='สัญญาหลัก', defaultStart='', defaultEnd='', defaultCV='') {
        if (defaultIsBase === 'สัญญาเพิ่มเติม') {
            let wrappers = document.querySelectorAll('#c_ins .policy-wrapper');
            let lastWrapper = wrappers[wrappers.length - 1];
            if (lastWrapper) {
                let btn = lastWrapper.querySelector('button');
                addRiderRow(btn, defaultName, defaultType, defaultVal, defaultPrem);
                return;
            }
        }
        addBasePolicy(defaultName, defaultType, defaultVal, defaultPrem, defaultStart, defaultEnd, defaultCV);
    }

    // --- ฟังก์ชันเพิ่มการลงทุน (ปรับให้รูปแบบเหมือนงบดุล) ---
    function addInvestRow(defaultType='', defaultVal='', defaultRoi='', defaultObj='') {
        const container = document.getElementById('c_invest_current');
        const div = document.createElement('div');
        div.className = 'input-row custom-row bg-gray-50 p-2 rounded border mb-2 transition-all hover:shadow-md hover:border-purple-300';
        
        let sel = document.getElementById('sel_invest');
        let catName = defaultType;
        
        // ถ้าเป็นการกดปุ่มเพิ่มเอง ไม่ได้โหลดไฟล์
        if (!defaultType && sel) {
            let opt = sel.options[sel.selectedIndex];
            catName = opt.value;
            defaultRoi = defaultRoi || opt.getAttribute('data-roi');
        } else if (!defaultType) {
            catName = 'การลงทุน';
        }

        // ตัดคำให้สั้นลงสำหรับแสดงผลบน Badge
        let shortCatName = catName.split('/')[0].split(' ')[0]; 
        if(shortCatName.length > 15) shortCatName = shortCatName.substring(0, 15) + '..';

        let objs = ['ทุนเกษียณอายุ (Retirement)', 'เติบโตระยะยาว (Long-term Growth)', 'สำรองฉุกเฉิน/สภาพคล่อง', 'ทุนการศึกษา', 'ส่งมอบความมั่งคั่ง/ธุรกิจ', 'ลดหย่อนภาษี', 'สร้างกระแสเงินสด (Passive)'];
        let objOptions = objs.map(t => `<option value="${t}" ${defaultObj === t ? 'selected' : ''}>${t}</option>`).join('');
        let fmtVal = defaultVal ? parseNum(defaultVal).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '';

        div.innerHTML = `
            <span class="text-xs font-semibold w-24 truncate text-gray-600 bg-gray-200 px-2 py-1 rounded text-center" title="หมวดหมู่: ${catName}">${shortCatName}</span>
            <input type="text" placeholder="ชื่อรายการ (แก้ไขได้)" class="input-field text-sm col-inv-name" value="${catName}" data-base-type="${catName}">
            <input type="text" placeholder="มูลค่าปัจจุบัน (บาท)" class="input-field text-sm col-inv-val money-input" value="${fmtVal}" onblur="formatInput(this)" onfocus="unformatInput(this)">
            <input type="number" placeholder="คาดหวัง (%)" class="input-field text-sm col-inv-roi bg-blue-50 font-bold" value="${defaultRoi || ''}" oninput="validateRoi(this)" title="ผลตอบแทนที่คาดหวังต่อปี">
            <select class="input-field text-sm col-inv-obj" title="เป้าหมายการลงทุน">
                <option value="" disabled ${!defaultObj ? 'selected' : ''}>-- เป้าหมาย --</option>
                ${objOptions}
            </select>
            <button type="button" onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700 px-3 font-bold text-lg no-print bg-white border rounded transition-colors hover:bg-red-50">×</button>
        `;
        container.appendChild(div);
        if (defaultRoi) validateRoi(div.querySelector('.col-inv-roi'));
    }

    // --- ตรวจสอบ ROI อัตโนมัติ (Sanity Check) ---
    function validateRoi(inputEl) {
        if (!inputEl) return;
        const row = inputEl.parentElement;
        const nameInput = row.querySelector('.col-inv-name');
        
        // ดึง Base Type มาตรวจสอบ เพื่อให้แจ้งเตือนถูกแม้ลูกค้าจะแก้ชื่อ input ไปแล้ว
        const type = (nameInput.getAttribute('data-base-type') || nameInput.value || '').toLowerCase();
        const roi = parseFloat(inputEl.value) || 0;
        
        let limit = 15; 
        let warningMsg = "ตัวเลขนี้สูงกว่าค่าเฉลี่ยตลาดทั่วไปในระยะยาว";

        if (type.includes('เงินฝาก')) {
            limit = 3;
            warningMsg = "ผลตอบแทนเงินฝากปกติมักไม่เกิน 1-3% ต่อปี";
        } else if (type.includes('ตราสารหนี้') || type.includes('พันธบัตร')) {
            limit = 5;
            warningMsg = "ผลตอบแทนตราสารหนี้มักเฉลี่ยอยู่ที่ 2-5% ต่อปี";
        } else if (type.includes('หุ้น')) {
            limit = 12;
            warningMsg = "ผลตอบแทนดัชนีหุ้นระยะยาวมักเฉลี่ยอยู่ที่ 8-12% ต่อปี";
        }

        if (roi > limit) {
            inputEl.style.backgroundColor = "#ffedd5"; 
            inputEl.style.borderColor = "#f97316";
            inputEl.title = "⚠️ " + warningMsg;
        } else {
            inputEl.style.backgroundColor = ""; 
            inputEl.style.borderColor = "";
            inputEl.title = "ผลตอบแทนที่คาดหวังต่อปี";
        }
    }

    function clearDataForLoad() {
        ['c_assets', 'c_liab', 'c_inc', 'c_exp', 'c_ins', 'c_goals', 'c_invest_current', 'c_tax_current'].forEach(id => {
            if(document.getElementById(id)) document.getElementById(id).innerHTML = '';
        });
    }

    function exportData() {
        // 🛡️ ป้องกัน Error แบบ 100% ถ้าหาช่องไม่เจอให้คืนค่าว่างหรือ "0"
        const getSafeVal = (id) => document.getElementById(id) ? document.getElementById(id).value : "0";

        const data = {
            profile: {
                // ✅ แก้ไขให้ใช้ getSafeVal ทั้งหมด ป้องกันแอปแครช
                p_name: getSafeVal('p_name'),
                p_age: getSafeVal('p_age'),
                p_occ: getSafeVal('p_occ'),
                p_province: getSafeVal('p_province'),
                p_welfare: getSafeVal('p_welfare'),
                p_health: getSafeVal('p_health'),
                p_dep: getSafeVal('p_dep'),
                p_contact: getSafeVal('p_contact'),
                p_unitlinked: getSafeVal('p_unitlinked'),
                
                // 🧠 ข้อมูลจาก 10 คำถามใหม่ (Behavioral Profiling)
                bq_1: getSafeVal('bq_1'), bq_2: getSafeVal('bq_2'), bq_3: getSafeVal('bq_3'),
                bq_4: getSafeVal('bq_4'), bq_5: getSafeVal('bq_5'), bq_6: getSafeVal('bq_6'),
                bq_7: getSafeVal('bq_7'), bq_8: getSafeVal('bq_8'), bq_9: getSafeVal('bq_9'),
                bq_10: getSafeVal('bq_10')
            },
            retirement: {
                r_retAge: getSafeVal('r_retAge'),
                r_lifeExp: getSafeVal('r_lifeExp'),
                r_reqInc: parseNum(getSafeVal('r_reqInc')), 
                r_preRet: getSafeVal('r_preRet'),
                r_inf: getSafeVal('r_inf'),
                r_med_inf: getSafeVal('r_med_inf')
            },
            dynamic: {
                c_assets: getStandardRows('c_assets'),
                c_liab: getStandardRows('c_liab'),
                c_inc: getStandardRows('c_inc'),
                c_exp: getStandardRows('c_exp'),
                c_ins: getCustomRows('c_ins'),
                c_goals: getCustomRows('c_goals'),
                c_invest_current: getCustomRows('c_invest_current'),
                c_tax_current: getCustomRows('c_tax_current')
            },
            // 💎 [NEW] ก้อนข้อมูล AI & Insights สำหรับส่งเข้า CRM / Data Lake
            ai_insights: {
                export_timestamp: new Date().toISOString(),
                financialVitals: window.latestFinancialVitals || {},
                behavioralFeatures: window.latestMLFeatures || {},
                aiCluster: window.currentAICluster || "Standard",
                simulationStats: window.latestSimulationStats || {},
                fa_xray_panel: {
                    behavioral_lead_score: typeof faLeadScore !== 'undefined' ? faLeadScore.toFixed(1) : 0,
                    financial_grade: typeof clientGrade !== 'undefined' ? clientGrade : "Unclassified",
                    lapse_risk_level: typeof faLeadScore !== 'undefined' ? (faLeadScore < 50 ? 'High' : (faLeadScore < 80 ? 'Medium' : 'Low')) : "Unknown",
                    recommended_strategy: typeof salesPitchStrategy !== 'undefined' ? 
                        (faLeadScore >= 80 ? 'Wealth Transfer / Unit Linked' : 
                        (faLeadScore >= 50 ? 'Health Protection / Endowment' : 'Term Life / Debt Restructure')) : "Needs Review"
                }
            }
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        let fileName = data.profile.p_name ? data.profile.p_name.replace(/\s+/g, '_') : 'client';
        dlAnchorElem.setAttribute("download", `${fileName}_financial_plan.json`);
        dlAnchorElem.click();
    }

    function getStandardRows(containerId) {
        let rows = [];
        document.querySelectorAll(`#${containerId} .data-row`).forEach(row => {
            rows.push({
                catText: row.querySelector('span').title || row.querySelector('span').innerText,
                catValue: row.dataset.cat,
                name: row.querySelector('.col-name').value,
                val: parseNum(row.querySelector('.col-val').value) 
            });
        });
        return rows;
    }

    function getCustomRows(containerId) {
        let rows = [];
        document.querySelectorAll(`#${containerId} .custom-row`).forEach(row => {
            let inputs = [];
            row.querySelectorAll('input, select').forEach(inp => {
                if (inp.classList.contains('money-input') || (inp.placeholder && (inp.placeholder.includes('บาท') || inp.placeholder.includes('จำนวนเงิน')))) {
                    inputs.push(parseNum(inp.value));
                } else {
                    inputs.push(inp.value);
                }
            });
            rows.push(inputs);
        });
        return rows;
    }

    function triggerLoad() {
        document.getElementById('fileInput').click();
    }

    function handleFileLoad(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                clearDataForLoad();
                
                if(data.profile) {
                    for (let key in data.profile) {
                        if(document.getElementById(key)) document.getElementById(key).value = data.profile[key];
                    }
                }
                if(data.retirement) {
                    for (let key in data.retirement) {
                        let el = document.getElementById(key);
                        if(el) {
                            if (key === 'r_reqInc') {
                                el.value = parseNum(data.retirement[key]).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                            } else {
                                el.value = data.retirement[key];
                            }
                        }
                    }
                }
                
                if(data.dynamic) {
                    loadStandardRows('c_assets', data.dynamic.c_assets, ['ชื่อรายการ', 'มูลค่า (บาท)'], 'ast_list');
                    loadStandardRows('c_liab', data.dynamic.c_liab, ['ชื่อรายการ', 'ยอดคงเหลือ (บาท)'], 'liab_list');
                    loadStandardRows('c_inc', data.dynamic.c_inc, ['ชื่อรายการ', 'จำนวน (บาท/เดือน)'], 'inc_list');
                    loadStandardRows('c_exp', data.dynamic.c_exp, ['ชื่อรายการ', 'จำนวน (บาท/เดือน)'], 'exp_list');
                    
                    if(data.dynamic.c_ins) data.dynamic.c_ins.forEach(vals => {
                        // แยกการโหลดระหว่าง "สัญญาหลัก" และ "สัญญาเพิ่มเติม" เพราะลำดับ Input ใน HTML เรียงต่างกัน
                        if (vals[0] === 'สัญญาหลัก') {
                            // จัดเรียง: (Name, Type, Val, Prem, IsBase, Start, End, CV)
                            addInsRow(vals[1], vals[2], vals[3], vals[7], vals[0], vals[5], vals[6], vals[4]);
                        } else if (vals[0] === 'สัญญาเพิ่มเติม') {
                            // จัดเรียงของ Rider: (Name, Type, Val, Prem, IsBase)
                            addInsRow(vals[2], vals[3], vals[4], vals[5], vals[0]);
                        } else {
                            // เผื่อรองรับไฟล์ที่เซฟจากเวอร์ชันเก่ามากๆ
                            if(vals.length >= 8) {
                                addInsRow(vals[0], vals[2], vals[3], vals[7], vals[1], vals[4], vals[5], vals[6]);
                            } else {
                                addInsRow(vals[0], vals[1], vals[2], vals[3]);
                            }
                        }
                    });
                    if(data.dynamic.c_goals) data.dynamic.c_goals.forEach(vals => addCustomRow('c_goals', ['ชื่อเป้าหมาย (Specific)', 'จำนวนเงินที่ต้องการ (Measurable)', 'ระยะเวลา/ปี (Time-bound)', 'ระดับความสำคัญ (1=สูงสุด)'], vals, ['goal_list', '', '', '']));
                    if(data.dynamic.c_invest_current) data.dynamic.c_invest_current.forEach(vals => addInvestRow(vals[0], vals[1], vals[2], vals[3]));
                    if(data.dynamic.c_tax_current) data.dynamic.c_tax_current.forEach(vals => addCustomRow('c_tax_current', ['รายการลดหย่อน (อ้างอิง ภ.ง.ด.90/91)', 'จำนวนเงิน (บาท)'], vals, ['tax_list', '']));
        }
                alert('โหลดข้อมูลลูกค้าสำเร็จ!');
            } catch (err) {
                console.error(err);
                alert('ไฟล์ไม่ถูกต้องหรือไม่สามารถอ่านข้อมูลได้');
            }
            event.target.value = ''; 
        };
        reader.readAsText(file);
    }

    function loadStandardRows(containerId, rowsData, placeholders, listId = '') {
        if(!rowsData || !Array.isArray(rowsData)) return;
        const container = document.getElementById(containerId);
        rowsData.forEach(r => {
            const div = document.createElement('div');
            div.className = 'input-row data-row bg-gray-50 p-2 rounded border mb-2 transition-all hover:shadow-md hover:border-blue-300';
            div.dataset.cat = r.catValue;
            let displayCat = r.catText ? r.catText.split('(')[0] : r.catValue;
            let fmtVal = r.val ? parseNum(r.val).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '';
            div.innerHTML = `
                <span class="text-xs font-semibold w-32 truncate text-gray-600 bg-gray-200 px-2 py-1 rounded" title="${r.catText || r.catValue}">${displayCat}</span>
                <input type="text" placeholder="${placeholders[0]}" class="input-field col-name" value="${r.name}" ${listId ? `list="${listId}"` : ''}>
                <input type="text" placeholder="${placeholders[1]}" class="input-field col-val w-28 text-right font-bold text-blue-700 money-input" value="${fmtVal}" onblur="formatInput(this)" onfocus="unformatInput(this)">
                <button type="button" onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700 px-3 font-bold text-lg no-print bg-white border rounded transition-colors hover:bg-red-50">×</button>
            `;
            container.appendChild(div);
        });
    }

    function toggleMode(mode) {
        const inputSec = document.getElementById('inputSection');
        const reportSec = document.getElementById('reportSection');
        const manualSec = document.getElementById('manualSection');
        
        const btnEdit = document.getElementById('btnEdit');
        const btnPrint = document.getElementById('btnPrint');
        const btnProcess = document.getElementById('btnProcess');
        const btnClear = document.getElementById('btnClear');
        const btnSave = document.getElementById('btnSave');
        const btnLoad = document.getElementById('btnLoad');
        const btnRandom = document.getElementById('btnRandom');
        const btnPortfolioSim = document.getElementById('btnPortfolioSim');

        if(mode === 'edit') {
            inputSec.style.display = 'block';
            reportSec.style.display = 'none';
            if(manualSec) manualSec.style.display = 'none';
            
            btnEdit.classList.add('hidden');
            btnPrint.classList.add('hidden');
            btnProcess.classList.remove('hidden');
            btnClear.classList.remove('hidden');
            btnSave.classList.remove('hidden');
            btnLoad.classList.remove('hidden');
            if(btnRandom) btnRandom.classList.remove('hidden');
            window.scrollTo({top: 0, behavior: 'smooth'});
            if(btnPortfolioSim) btnPortfolioSim.classList.add('hidden');
        } else if (mode === 'report') {
            inputSec.style.display = 'none';
            reportSec.style.display = 'block';
            if(manualSec) manualSec.style.display = 'none';
            
            btnEdit.classList.remove('hidden');
            btnPrint.classList.remove('hidden');
            btnProcess.classList.add('hidden');
            btnClear.classList.add('hidden');
            btnSave.classList.add('hidden');
            btnLoad.classList.add('hidden');
            if(btnRandom) btnRandom.classList.add('hidden');
            window.scrollTo({top: 0, behavior: 'smooth'});
            if(btnPortfolioSim) btnPortfolioSim.classList.remove('hidden');
        }
    }

    function animateValue(id, start, end, duration, isPercent = false, isRatio = false) {
        if (start === end && end === 0) {
            const obj = document.getElementById(id);
            if(obj) obj.innerHTML = (isRatio ? "0.00" : "0.00") + (isPercent ? '%' : '');
            return;
        }
        const obj = document.getElementById(id);
        if(!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let current = progress * (end - start) + start;
            let displayVal = isRatio ? Number(current).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : fmt(current);
            obj.innerHTML = displayVal + (isPercent ? '%' : '');
            if (progress < 1) { window.requestAnimationFrame(step); } 
            else { 
                let finalVal = isRatio ? Number(end).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : fmt(end);
                obj.innerHTML = finalVal + (isPercent ? '%' : ''); 
            }
        };
        window.requestAnimationFrame(step);
    }

    function setProgressBar(id, value, max, isReverseGood = false) {
        const el = document.getElementById(id);
        if(!el) return;
        let percentage = (value / max) * 100;
        if(percentage > 100) percentage = 100;
        if(percentage < 0) percentage = 0;
        
        el.style.width = '0%';
        setTimeout(() => {
            el.style.width = percentage + '%';
            if(isReverseGood) {
                el.className = `progress-fill ${percentage > 80 ? 'bg-red-500' : (percentage > 50 ? 'bg-yellow-400' : 'bg-green-500')}`;
            } else {
                el.className = `progress-fill ${percentage < 40 ? 'bg-red-500' : (percentage < 80 ? 'bg-yellow-400' : 'bg-green-500')}`;
            }
        }, 100);
    }

    // [อัปเกรด] คำนวณภาษีบุคคลธรรมดา พร้อมประเมินความคุ้มค่าในการตั้งนิติบุคคล (Holding Co.)
function calcThaiTax(yearlyNet) {
    let net = yearlyNet < 0 ? 0 : yearlyNet;
    let tax = 0; 
    let bracket = 'ยกเว้นภาษี';
    
    // คำนวณบุคคลธรรมดา
    if (net > 5000000) { tax += (net - 5000000) * 0.35 + 1265000; bracket = '35%'; }
    else if (net > 2000000) { tax += (net - 2000000) * 0.30 + 365000; bracket = '30%'; }
    else if (net > 1000000) { tax += (net - 1000000) * 0.25 + 115000; bracket = '25%'; }
    else if (net > 750000) { tax += (net - 750000) * 0.20 + 65000; bracket = '20%'; }
    else if (net > 500000) { tax += (net - 500000) * 0.15 + 27500; bracket = '15%'; }
    else if (net > 300000) { tax += (net - 300000) * 0.10 + 7500; bracket = '10%'; }
    else if (net > 150000) { tax += (net - 150000) * 0.05; bracket = '5%'; }
    
    // [NEW] คำนวณภาษีนิติบุคคล (Corporate Tax 20% Flat Rate หยาบๆ สำหรับเปรียบเทียบ)
    let corpTaxEst = net * 0.20; 
    let corpTaxSaving = tax - corpTaxEst;
    let recommendCorp = false;

    // ถ้ารายได้สุทธิเกิน 3 ล้าน และประหยัดภาษีได้มากกว่า 200,000 บาทต่อปี ให้เสนอจดบริษัท
    if (net > 3000000 && corpTaxSaving > 200000) {
        recommendCorp = true;
    }

    return { 
        tax: tax, 
        bracket: bracket, 
        corpTaxEst: corpTaxEst, 
        corpTaxSaving: corpTaxSaving,
        recommendCorp: recommendCorp
    };
}

    const getRowsHtml = (containerId, extraItems = []) => {
    let groups = {};
    
    // 1. กวาดข้อมูลจากหน้าจอและจัดกลุ่ม (Group Data)
    document.querySelectorAll(`#${containerId} .data-row`).forEach(row => {
        let name = row.querySelector('.col-name').value || 'ไม่ระบุ';
        let val = parseNum(row.querySelector('.col-val').value) || 0;
        
        // 🌟 ดึงชื่อหมวดหมู่จาก dataset.cat จะแม่นยำกว่าดึงจาก span
        // หรือถ้าไม่มี ให้พยายามทำความสะอาดข้อความจาก span
        let rawCat = row.dataset.cat || (row.querySelector('span') ? row.querySelector('span').innerText.replace('🔄', '').trim() : 'อื่นๆ');
        // ตัดข้อความในวงเล็บออกเพื่อให้ชื่อหมวดหมู่ดูสะอาดตา (เช่น "สินทรัพย์สภาพคล่อง (เงินสด)" -> "สินทรัพย์สภาพคล่อง")
        let cat = rawCat.split('(')[0].trim();

        if (!groups[cat]) groups[cat] = [];
        groups[cat].push({ name, val });
    });
    
    // 2. นำข้อมูลอัตโนมัติ (Extra Items) เช่น เบี้ยประกัน มาจัดกลุ่มรวมด้วย
    extraItems.forEach(item => {
        if(item.val > 0) {
            let cat = item.cat ? item.cat.split('(')[0].trim() : 'รายการอัตโนมัติ';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push({ name: item.name, val: item.val, isExtra: true });
        }
    });

    // 3. สร้าง HTML แบบแบ่งหมวดหมู่ + ยอดรวมย่อย (Sub-total)
    let html = '';
    for (let cat in groups) {
        // คำนวณยอดรวมย่อยของหมวดหมู่นี้
        let subTotal = groups[cat].reduce((sum, item) => sum + item.val, 0);
        
        // 🔵 บรรทัดหัวข้อหมวดหมู่ (แสดงชื่อหมวดหมู่ + ยอดรวมของหมวดหมู่นั้น)
        html += `
        <tr class="bg-gray-100/70 border-b border-gray-200">
            <td class="py-2 px-3 text-sm font-bold text-gray-800">${cat}</td>
            <td class="text-right py-2 px-3 text-sm font-bold text-gray-800">${fmt(subTotal)}</td>
        </tr>`;
        
        // ⚪ บรรทัดรายการย่อย (ทำ Indent ย่อหน้าเข้าไป และแสดงรายการ)
        groups[cat].forEach(item => {
            let badge = item.isExtra ? `<span class="text-[9px] bg-blue-100 text-blue-800 px-1 rounded ml-1 border border-blue-200">Auto</span>` : '';
            html += `
            <tr class="hover:bg-gray-50 transition border-b border-gray-50">
                <td class="py-1.5 px-3 pl-8 text-gray-600 text-sm flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-gray-400 rounded-full block"></span> ${item.name} ${badge}
                </td>
                <td class="text-right py-1.5 px-3 text-sm text-gray-700">${fmt(item.val)}</td>
            </tr>`;
        });
    }
    
    return html || '<tr><td colspan="2" class="text-center text-gray-400 py-3">ไม่มีข้อมูล</td></tr>';
};

    function addAutoRow(containerId, catValue, name, val, listId) {
        const container = document.getElementById(containerId);
        const div = document.createElement('div');
        div.className = 'input-row data-row bg-blue-50/50 p-2 rounded border border-blue-200 mb-2 transition-all hover:shadow-md auto-gen-row';
        div.dataset.cat = catValue;
        
        let fmtVal = val ? parseNum(val).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '';
        div.innerHTML = `
            <span class="text-xs font-semibold w-32 truncate text-blue-600 bg-blue-100 px-2 py-1 rounded" title="ดึงข้อมูลอัตโนมัติ">🔄 ${catValue.split('(')[0]}</span>
            <input type="text" placeholder="ชื่อรายการ" class="input-field col-name bg-transparent" value="${name}" readonly>
            <input type="text" placeholder="มูลค่า" class="input-field col-val w-28 text-right font-bold text-blue-700 money-input bg-transparent" value="${fmtVal}" readonly>
            <button type="button" onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700 px-3 font-bold text-lg no-print bg-white border rounded transition-colors hover:bg-red-50">×</button>
        `;
        container.appendChild(div);
    }

    function syncAssetsAndLiabilities() {
        // ล้างข้อมูลที่เคย auto-sync เพื่อไม่ให้ซ้ำซ้อน
        document.querySelectorAll('.auto-gen-row').forEach(el => el.remove());
        
        let currentYearThai = new Date().getFullYear() + 543;

        // 1. นำมูลค่าเวนคืน (สัญญาหลัก) ไปเป็นสินทรัพย์ส่วนตัว/สภาพคล่อง
        document.querySelectorAll('#c_ins .custom-row').forEach(row => {
            let typeMain = row.querySelector('.col-ins-main-type').value;
            let cv = parseNum(row.querySelector('.col-ins-cv').value);
            let name = row.querySelector('.col-ins-name').value || 'กรมธรรม์ประกันชีวิต';
            
            let start = parseInt(row.querySelector('.col-ins-start').value) || 0;
            let end = parseInt(row.querySelector('.col-ins-end').value) || 9999;
            let isActive = true;
            if(start > 0 && currentYearThai < start) isActive = false;
            
            if (isActive && typeMain === 'สัญญาหลัก' && cv > 0) {
                // เช็คว่ามีกรอกไว้ด้วยมือแล้วหรือยัง
                let exists = false;
                document.querySelectorAll('#c_assets .col-name').forEach(input => {
                    if (input.value.includes(name)) exists = true;
                });
                if (!exists) {
                    addAutoRow('c_assets', 'สินทรัพย์ส่วนตัว', 'มูลค่าเวนคืน: ' + name, cv, 'ast_list');
                }
            }
        });

        // 2. นำข้อมูลการลงทุนไปเป็นสินทรัพย์ลงทุน
        document.querySelectorAll('#c_invest_current .custom-row').forEach(row => {
            let name = row.querySelector('.col-inv-name').value || 'การลงทุน';
            let val = parseNum(row.querySelector('.col-inv-val').value);
            if (val > 0) {
                let exists = false;
                document.querySelectorAll('#c_assets .col-name').forEach(input => {
                    if (input.value === name) exists = true;
                });
                if (!exists) {
                    addAutoRow('c_assets', 'สินทรัพย์ลงทุน', name, val, 'ast_list');
                }
            }
        });
    }
    // ==========================================
    // 🎯 ฟังก์ชันคำนวณช่วงความเชื่อมั่น 95% (Confidence Interval 95%)
    // ==========================================
    function calculateCI95(meanProb, iterations = 20000) {
        if (meanProb <= 0) return "0.00% - 0.00%";
        if (meanProb >= 100) return "99.90% - 100.00%";
        
        let p = meanProb / 100;
        let standardError = Math.sqrt((p * (1 - p)) / iterations);
        let marginOfError = 1.96 * standardError * 100;
        
        marginOfError = Math.max(marginOfError, 0.50);

        let min = Math.max(0, meanProb - marginOfError);
        let max = Math.min(100, meanProb + marginOfError);
        
        return `${min.toFixed(2)}% - ${max.toFixed(2)}%`;
    }
    // ==========================================
    async function processReport(progressBar = null, loadText = null) {
        
        // --- [NEW] SINGLE SOURCE OF TRUTH: ดึงค่าเศรษฐกิจ ณ วินาทีที่กดประมวลผล ---
        let infRate = parseFloat(document.getElementById('r_inf').value) || 3.0; // เงินเฟ้อทั่วไป
        let r_med_inf = parseFloat(document.getElementById('r_med_inf').value) || 6.0; // เงินเฟ้อแพทย์
        let targetRoiEst = parseFloat(document.getElementById('r_preRet').value) || 5.0; // ผลตอบแทนคาดหวัง
        let processTimestamp = window.globalMacroData ? window.globalMacroData.lastUpdate : new Date().toLocaleString('th-TH');
        // ----------------------------------------------------------------------

        // --- Auto Sync Assets ---
        syncAssetsAndLiabilities();

        let totalInsPrem = 0;
        let currentYearThai = new Date().getFullYear() + 543;

        document.querySelectorAll('#c_ins .custom-row').forEach(row => {
            let start = parseInt(row.querySelector('.col-ins-start').value) || 0;
            let end = parseInt(row.querySelector('.col-ins-end').value) || 9999;
            
            // เช็คว่าอยู่ในช่วงส่งเบี้ยไหม (ถ้าไม่ได้ระบุ ให้ถือว่าส่งเบี้ยอยู่)
            if (start === 0 || (currentYearThai >= start && currentYearThai <= end)) {
                let premInput = row.querySelector('.col-ins-prem');
                let prem = parseNum(premInput ? premInput.value : 0) || 0;
                totalInsPrem += prem;
            }
        });
        
        let monthlyInsPrem = Math.round(totalInsPrem / 12);
        
        if (monthlyInsPrem > 0) {
            let found = false;
            document.querySelectorAll('#c_exp .data-row').forEach(row => {
                let nameInput = row.querySelector('.col-name');
                if (nameInput.value.includes('เบี้ยประกัน')) {
                    row.querySelector('.col-val').value = monthlyInsPrem.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                    found = true;
                }
            });
            if (!found) {
                document.getElementById('sel_exp').value = 'รายจ่ายเพื่อออม/ลงทุน';
                addRow('c_exp', 'sel_exp', ['ชื่อรายการ', 'จำนวน (บาท/เดือน)'], 'เบี้ยประกันชีวิตและสุขภาพรวม', monthlyInsPrem.toString(), 'exp_list');
            }
        }

        toggleMode('report');
        
        // 🌟 [เพิ่มคำว่า "คุณ" นำหน้าชื่อ]
        let rawCusName = document.getElementById('p_name').value.trim();
        let displayCusName = rawCusName ? (rawCusName.startsWith('คุณ') ? rawCusName : `คุณ ${rawCusName}`) : 'คุณลูกค้าคนสำคัญ';

        document.getElementById('rep_name').innerText = displayCusName;
        document.getElementById('rep_date').innerText = new Date().toLocaleDateString('th-TH', {year: 'numeric', month: 'long', day: 'numeric'});

        // ---- สำหรับแสดงผลชื่อลูกค้า/วันประมวลผลตอนพิมพ์ ----
        if(document.getElementById('print_header_client')) document.getElementById('print_header_client').innerText = displayCusName;
        if(document.getElementById('print_header_date')) document.getElementById('print_header_date').innerText = new Date().toLocaleString('th-TH');

        rawAge = Number(document.getElementById('p_age')?.value) || 30;
        let retAgeInput = document.getElementById('r_retAge');
        if (Number(retAgeInput.value) < rawAge) {
            alert('⚠️ อายุเกษียณไม่สามารถน้อยกว่าอายุปัจจุบันได้ ระบบได้ปรับให้เท่ากับอายุปัจจุบันโดยอัตโนมัติ');
            retAgeInput.value = rawAge;
        }

        let occString = (document.getElementById('p_occ')?.value || '').toLowerCase();
        const province = document.getElementById('p_province').value || 'ไม่ระบุ';
        const welfare = document.getElementById('p_welfare').value || 'ไม่มีสวัสดิการ (จ่ายเอง/บัตรทอง)';
        const healthString = (document.getElementById('p_health').value || '').toLowerCase();
        const depString = document.getElementById('p_dep').value || '0';
        const wantUnitLinked = document.getElementById('p_unitlinked').value === 'สนใจ';
        
        const isFreelance = occString.includes('ฟรีแลนซ์') || occString.includes('อิสระ') || occString.includes('ค้าขาย') || occString.includes('เทรดเดอร์') || occString.includes('influencer');
        const isGigWorker = occString.includes('รายวัน') || occString.includes('ชั่วคราว') || occString.includes('ไรเดอร์') || occString.includes('โรงงาน');
        const isBusinessOwner = occString.includes('กิจการ') || occString.includes('ธุรกิจ') || occString.includes('ประธาน') || occString.includes('นายจ้าง');
        const hasHealthIssues = healthString.includes('โรค') || healthString.includes('ป่วย') || healthString.includes('ผ่าตัด') || healthString.includes('ความดัน') || healthString.includes('เบาหวาน') || healthString.includes('ไขมัน');
        const numDependents = parseInt(depString.replace(/\D/g, '')) || 0;
        const hasDependents = numDependents > 0;
        
        const hasGovWelfare = welfare.includes('ข้าราชการ') || welfare.includes('รัฐวิสาหกิจ');
        const hasGroupMed = welfare.includes('ประกันกลุ่ม');
        const hasExecBenefits = welfare.includes('ผู้บริหาร');
        const hasSocialSec = welfare.includes('ประกันสังคม'); 

        let riskScore = 0;
        let riskLevel = '';
        let recAssetAllocation = '';
        let sdEst = 0; 

        // ==========================================================
        // 🛡️ ฟังก์ชันช่วยดึงค่า ป้องกัน Error null
        const getSafeVal = (id) => {
            let el = document.getElementById(id);
            return el ? el.value : "0";
        };

        // 🧠 คำนวณความเสี่ยง (Risk Score) จาก 10 คำถามใหม่ (หมวดที่ 2: bq_6 ถึง bq_8)
        let bq6 = parseInt(getSafeVal('bq_6')) || 1; // ความทนทานต่อพอร์ตติดลบ (1-3)
        let bq7 = parseInt(getSafeVal('bq_7')) || 1; // เป้าหมายผลตอบแทน (1-3)
        let bq8 = parseInt(getSafeVal('bq_8')) || 1; // ระยะเวลาลงทุน (1-3)

        // แปลงคะแนน 3 ข้อใหม่ (เต็ม 9) ให้เป็นสเกล Risk Score ของระบบเดิม (สเกล 5 - 20)
        // เพื่อให้กราฟและคำแนะนำด้านล่างของระบบเดิมยังทำงานได้ปกติ 100%
        let rawBqScore = bq6 + bq7 + bq8; 
        riskScore = Math.round(((rawBqScore - 3) / 6) * 15 + 5); 
        
        // กรองค่าให้มั่นใจว่าคะแนนไม่หลุดกรอบ 5-20
        riskScore = Math.max(5, Math.min(20, riskScore));
        // ==========================================================

        if (riskScore <= 9) {
            riskLevel = 'เสี่ยงต่ำ (Conservative)';
            recAssetAllocation = 'ตราสารหนี้/เงินฝาก 80%, หุ้น 20%';
        } else if (riskScore <= 13) {
            riskLevel = 'เสี่ยงปานกลางค่อนข้างต่ำ (Moderate Conservative)';
            recAssetAllocation = 'ตราสารหนี้ 60%, หุ้น 40%';
        } else if (riskScore <= 16) {
            riskLevel = 'เสี่ยงปานกลางค่อนข้างสูง (Moderate Aggressive)';
            recAssetAllocation = 'ตราสารหนี้ 40%, หุ้น 60%';
        } else {
            riskLevel = 'เสี่ยงสูง (Aggressive)';
            recAssetAllocation = 'ตราสารหนี้ 20%, หุ้น 80% (หรือทรัพย์สินทางเลือก)';
        }

        // ====================================================================
        // --- 🧠 [NEW] จุดที่ 2: อัพเดท AI Insights ให้เชื่อมกับ Single Source of Truth ---
        // ====================================================================
        let realReturn = targetRoiEst - infRate;
        let calculatedSentiment = "";
        let sentimentColor = "";
        let sentimentDesc = "";
        
        // ดึงข้อมูลแหล่งที่มา (ถ้าไม่มีให้แสดงค่าเริ่มต้น)
        let dataSourceStr = window.globalMacroData && window.globalMacroData.source ? window.globalMacroData.source : "ฐานข้อมูลจำลองการเงิน (Financial Simulator)";

        if (realReturn >= 4.0) {
            calculatedSentiment = "Growth Phase (Bullish) 🚀";
            sentimentColor = "text-green-400";
            sentimentDesc = "สภาวะตลาดเอื้อต่อการเติบโต เอาชนะเงินเฟ้อได้ดี";
        } else if (realReturn >= 2.0) {
            calculatedSentiment = "Cautiously Optimistic 📈";
            sentimentColor = "text-blue-400";
            sentimentDesc = "สภาวะตลาดทรงตัว ผลตอบแทนยังคงเป็นบวก";
        } else if (realReturn >= 0) {
            calculatedSentiment = "Volatile but Safe (Neutral) ⚖️";
            sentimentColor = "text-yellow-400";
            sentimentDesc = "ตลาดผันผวน ผลตอบแทนปริ่มระดับเงินเฟ้อ";
        } else {
            calculatedSentiment = "Inflation Pressure (Bearish) 📉";
            sentimentColor = "text-red-400";
            sentimentDesc = "เงินเฟ้อพุ่งสูงกว่าผลตอบแทน เสี่ยงอำนาจซื้อลดลง";
        }

        const sentimentEl = document.getElementById('ml_fetch_sentiment');
        if (sentimentEl) {
            sentimentEl.innerText = calculatedSentiment;
            sentimentEl.className = `font-bold text-lg mb-1 ${sentimentColor}`;
            let descEl = sentimentEl.nextElementSibling;
            if (descEl && descEl.tagName.toLowerCase() === 'p') {
                descEl.innerText = sentimentDesc;
            }
        }

        const infEl = document.getElementById('ml_fetch_inf');
        if (infEl) {
            infEl.innerText = `${infRate.toFixed(2)}%`;
            infEl.className = `font-bold text-lg mb-1 text-orange-400`;
            let infDescEl = infEl.nextElementSibling;
            if (infDescEl && infDescEl.tagName.toLowerCase() === 'p') {
                // อัพเดทให้แสดงทั้งเวลาและแหล่งที่มา
                infDescEl.innerHTML = `อ้างอิงข้อมูล ณ: ${processTimestamp}<br><span class="text-[9px] text-gray-400 mt-0.5 inline-block">แหล่งที่มา: ${dataSourceStr}</span>`;
            }
        }
        // ====================================================================

        const getSumByCat = (containerId, keyword) => { let sum = 0; document.querySelectorAll(`#${containerId} .data-row`).forEach(row => { if(row.dataset.cat === keyword || row.querySelector('span').innerText.includes(keyword)) sum += parseNum(row.querySelector('.col-val').value) || 0; }); return sum; };

        const incActive = getSumByCat('c_inc', 'รายได้จากการทำงาน');
        const incPassive = getSumByCat('c_inc', 'รายได้จากสินทรัพย์');
        const incBusiness = getSumByCat('c_inc', 'รายได้จากธุรกิจ/เงินปันผล');
        const incOther = getSumByCat('c_inc', 'รายได้อื่นๆ');
        const totalInc = incActive + incPassive + incBusiness + incOther;

        const expSave = getSumByCat('c_exp', 'รายจ่ายเพื่อออม/ลงทุน');
        const expDebt = getSumByCat('c_exp', 'เงินชำระคืนหนี้สิน');
        const expLive = getSumByCat('c_exp', 'รายจ่ายประจำ/ใช้ชีวิต');
        const expTax = getSumByCat('c_exp', 'ภาษี');
        const expOther = getSumByCat('c_exp', 'รายจ่ายอื่น');

        let insLife = 0;
        let insHealth = 0;
        let insDailyComp = 0;
        let yearlyAnnuityIncome = 0;

        document.querySelectorAll('#c_ins .custom-row').forEach(row => { 
            let start = parseInt(row.querySelector('.col-ins-start').value) || 0;
            let end = parseInt(row.querySelector('.col-ins-end').value) || 9999;
            let isActive = true;
            if(start > 0 && currentYearThai < start) isActive = false;
            if(end > 0 && currentYearThai > end) isActive = false;

            if(isActive) {
                let type = row.querySelector('.col-ins-type').value || '';
                let val = parseNum(row.querySelector('.col-ins-val').value) || 0; 
                
                if(type.includes('ชดเชย') || type.includes('รายวัน')) insDailyComp += val;
                else if(type.includes('สุขภาพ') || type.includes('โรคร้าย')) insHealth += val;
                else if(type.includes('บำนาญ')) yearlyAnnuityIncome += val; 
                else insLife += val;
            }
        });

        const pureExp = expDebt + expLive + expTax + expOther; 
        let totalExp = expSave + pureExp;

        const astLiquid = getSumByCat('c_assets', 'สภาพคล่อง');
        const astInvest = getSumByCat('c_assets', 'ลงทุน');
        const astPersonal = getSumByCat('c_assets', 'ส่วนตัว');
        const astRealEstate = getSumByCat('c_assets', 'อสังหาริมทรัพย์');
        const astAlt = getSumByCat('c_assets', 'ธุรกิจและสินทรัพย์');
        const astOffshore = getSumByCat('c_assets', 'ต่างประเทศ');
        
        const totalAst = astLiquid + astInvest + astPersonal + astRealEstate + astAlt + astOffshore;

        const liabShort = getSumByCat('c_liab', 'ระยะสั้น');
        const liabLong = getSumByCat('c_liab', 'ระยะยาว');
        const liabWealth = getSumByCat('c_liab', 'บริหารความมั่งคั่ง');
        const totalLiab = liabShort + liabLong + liabWealth;
        
        const netWorth = totalAst - totalLiab;

        const sr = totalInc > 0 ? (expSave/totalInc) : 0;
        const dti = totalInc > 0 ? (expDebt/totalInc) : 0;
        const liquidRatio = totalExp > 0 ? (astLiquid / totalExp) : 0;
        const investRatio = netWorth > 0 ? ((astInvest + astOffshore + astRealEstate + astAlt) / netWorth) : 0;
        
        // --- แยกลอจิกประเมินพอร์ต: คำนวณสัดส่วนพอร์ตเกษียณ ---
        let sumRetirementFocus = 0;
        let sumTotalInvestTarget = 0;
        document.querySelectorAll('#c_invest_current .custom-row').forEach(row => {
            let val = parseNum(row.querySelector('.col-inv-val').value) || 0;
            let obj = row.querySelector('.col-inv-obj').value || '';
            if(val > 0) {
                sumTotalInvestTarget += val;
                if(obj.includes('เกษียณ') || obj.includes('มั่นคง')) sumRetirementFocus += val;
            }
        });
        let retirementFocusRatio = sumTotalInvestTarget > 0 ? (sumRetirementFocus / sumTotalInvestTarget) : 0.5;
        
        // --- [NEW] ดึงค่าพฤติกรรมจากหน้า UI (ข้อมูลใหม่) ---
        const recency = parseFloat(document.getElementById('p_recency') ? document.getElementById('p_recency').value : 12);
        const frequency = parseFloat(document.getElementById('p_frequency') ? document.getElementById('p_frequency').value : 6);
        const discipline = parseFloat(document.getElementById('p_discipline') ? document.getElementById('p_discipline').value : 0.6);

        // --- 🧠 [อัปเกรด] เชื่อมต่อสมองกล AI ของจริงเข้ากับระบบ ---
        // 🛠️ คำนวณสินทรัพย์รวมก่อน เพื่อเอาไปหา Debt to Asset Ratio (หนี้สินต่อสินทรัพย์)
        const totalAssetsVal = netWorth + totalLiab;

        const customerDataForAI = {
            "Age": rawAge, 
            "Income_Monthly": totalInc,  
            "Dependents": numDependents,
            "Total_Debt": totalLiab, 
            "Debt_Payment_Monthly": expDebt,
            "Total_Expenses_Monthly": totalExp,
            "Savings_Monthly": expSave,
            "Liquid_Cash": astLiquid,
            "Investments": astInvest + astOffshore, // จับรวมพอร์ตลงทุนและต่างประเทศ
            "Net_Worth": netWorth,
            "DTI_Ratio": dti,
            "Debt_Asset_Ratio": totalAssetsVal > 0 ? (totalLiab / totalAssetsVal) : 0, 
            "Savings_Ratio": sr,
            "Is_Struggling": (totalInc < 30000 && numDependents > 0) ? 1 : 0,
            "Is_Wealthy": (totalInc >= 200000 || netWorth >= 50000000) ? 1 : 0
        };

        // =========================================================
        // 🚀 อัปเกรดระบบเป็น 2-Tier Analysis (อัตลักษณ์ + พฤติกรรม)
        // =========================================================
        
        let safeSr = typeof sr !== 'undefined' ? sr : 0;

        // ===============================================================
        // 🧠 HOLISTIC AI MAPPING: สกัดค่าพฤติกรรมจากคำถามทั้ง 10 ข้อ
        // ===============================================================
        let q1 = parseInt(document.getElementById('bq_1') ? document.getElementById('bq_1').value : "0");
        let q2 = parseInt(document.getElementById('bq_2') ? document.getElementById('bq_2').value : "0");
        let q3 = parseInt(document.getElementById('bq_3') ? document.getElementById('bq_3').value : "0");
        let q4 = parseInt(document.getElementById('bq_4') ? document.getElementById('bq_4').value : "0");
        let q5 = document.getElementById('bq_5') ? document.getElementById('bq_5').value : "self";
        let q9 = parseInt(document.getElementById('bq_9') ? document.getElementById('bq_9').value : "1");
        let q10 = document.getElementById('bq_10') ? document.getElementById('bq_10').value : "hybrid";

        // --- แกนที่ 8: วินัย (Discipline) คิดจาก Q1 ถึง Q4 ---
        let totalDisc = q1 + q2 + q3 + q4;
        let safeDisc = 0.5;
        if (totalDisc >= 10) safeDisc = 0.9;
        else if (totalDisc >= 7) safeDisc = 0.7;
        else if (totalDisc >= 4) safeDisc = 0.5;
        else safeDisc = 0.2;

        // --- แกนที่ 7: ความถี่ (Frequency) คิดจากสไตล์และความรู้ (Q9, Q10) ---
        let safeFreq = 2; // ค่ามาตรฐานปีละ 2 ครั้ง
        if (q10 === 'diy' || q9 === 3) {
            safeFreq = 12; // สายเทรด สายลุย ดูทุกเดือน
        } else if (q10 === 'hybrid') {
            safeFreq = 4;  // สายลูกผสม รีวิวทุกไตรมาส
        } else if (q10 === 'delegator') {
            safeFreq = 1;  // สายปล่อยวาง ปีละครั้งพอ
        }

        // --- แกนที่ 6: ความใหม่ (Recency) คิดจากสไตล์และความกังวล (Q5, Q10) ---
        let safeRecency = 12; // ค่ามาตรฐาน
        if (q10 === 'diy') safeRecency = 1;       // เพิ่งอัปเดตไปหมาดๆ
        else if (q10 === 'hybrid') safeRecency = 3; // อัปเดตเมื่อไตรมาสที่แล้ว
        else if (q10 === 'delegator') safeRecency = 12; // อัปเดตเมื่อปีที่แล้ว
        
        // ถ้ากำลังช็อต/หมุนเงินไม่ทัน มักจะทิ้งแผนการเงิน (หนีปัญหา)
        if (q5 === 'survive') {
            safeRecency += 6; 
            safeFreq = Math.max(0, safeFreq - 1);
        }

        // 🌟 สกัดแกนที่ 9: ภาระผู้อุปการะ (เปลี่ยนชื่อเป็น safeDep เพื่อไม่ให้ซ้ำกับของเดิมข้างบน)
        let safeDep = parseInt(document.getElementById('p_dep')?.value) || 0;
        
        // 🌟 เติมบรรทัดนี้เข้าไปครับ! เพื่อหลอกให้โค้ดส่วนล่างที่ยังใช้ชื่อเก่า ทำงานต่อไปได้โดยไม่ Error
        let dependentsCount = safeDep; 

        // 🟢 อัปเดตข้อมูลให้ระบบอื่นๆ รู้จักตัวแปรครบทั้ง 9 มิติ
        window.latestMLFeatures = {
            age: rawAge, inc: totalInc, nw: netWorth, risk: riskScore, dti: dti,
            recency: safeRecency, frequency: safeFreq, discipline: safeDisc, dep: safeDep
        };

        // 🟢 🎯 ส่งพารามิเตอร์ทั้ง 9 มิติ เข้าสู่สมอง AI K-Means (ML Engine)
        const userCluster = classifyUserKMeans(rawAge, totalInc, netWorth, riskScore, dti, safeRecency, safeFreq, safeDisc, safeDep);
        
        // 🟢 🎯 เรียกใช้ Rule-based แกนที่ 2 (พฤติกรรม / Behavior)
        const userBehaviors = analyzeBehaviorProfile(totalInc, dti, safeSr, riskScore, dependentsCount);
        let detectedCluster = userCluster; window.currentAICluster = userCluster;
        let isRetireSet = parseNum(document.getElementById('r_reqInc')?.value) > 0 ? 80.0 : null; 
        let isOtherGoalSet = document.querySelectorAll('#c_goals .custom-row').length > 0 ? 80.0 : null;

        // 🧠 🎯 [NEW] เรียกใช้งาน Hybrid Co-Advisor
        const hybridResult = runCoAdvisorConsensus(customerDataForAI, userBehaviors, isRetireSet, isOtherGoalSet);

        // 3. แสดงผลลัพธ์แบบแยกส่วน (Single Responsibility)
        
        // 🔵 ส่วนที่ 3.1: อัปเดต Cluster (นำ Hybrid Persona มาใช้)
        let clusterBox = document.getElementById('profile_cluster');
        if (clusterBox) {
            clusterBox.innerHTML = `
                <div class="text-white text-[11px] leading-tight font-bold">${hybridResult.hybridPersona.split('(')[0].trim()}</div>
                ${hybridResult.hasConflict ? '<div class="text-red-300 text-[9px] mt-1 animate-pulse">⚠️ Rule Conflict Detected</div>' : '<div class="text-green-300 text-[9px] mt-1">✅ ML & Rule Synced</div>'}
            `;
        }

        // 🔴 ส่วนที่ 3.2: อัปเดตกล่อง Risk Profile
        let riskBox = document.getElementById('ml_knn_profile');
        if (riskBox) {
            riskBox.innerHTML = `
                <div class="text-[11px] text-gray-400 space-y-1 mt-1">
                    ${userBehaviors.map(b => `<div>${b}</div>`).join('')}
                </div>
            `;
        }

        // =========================================================
        // ปรับแต่งคำแนะนำผลตอบแทนตาม Cluster ที่ AI วิเคราะห์ได้ (Dynamic ROI Tuning)
        // =========================================================
        if (userCluster.includes('UHNW') || userCluster.includes('Legacy') || userCluster.includes('เศรษฐี')) {
            sdEst += 3.5;
        } else if (userCluster.includes('High-Earner') || userCluster.includes('DINKs') || userCluster.includes('อายุน้อยร้อยล้าน')) {
            sdEst += 2.0;
        } else if (userCluster.includes('Young Wealth Builder') || userCluster.includes('Family Builder')) {
            sdEst += 1.0;
        } else if (userCluster.includes('Overleveraged') || userCluster.includes('Cash Hoarder') || userCluster.includes('เดอะแบก')) {
            // Anomaly Penalty: กลุ่มเสี่ยงสูง หรือกลัวความเสี่ยง ระบบจะบังคับกดผลตอบแทนลงเพื่อเน้นความปลอดภัย (Safety First)
            sdEst = Math.max(3, sdEst - 4.0);
        }
        // Cluster อื่นๆ คงค่า Target ROI ตามเดิม

        const isHNW = netWorth >= 50000000 || totalInc >= 500000;
        const isUHNW = netWorth >= 100000000;

        let welfareHealthValue = 0;
        let welfareLifeValue = 0;

        if (hasExecBenefits) welfareHealthValue = 5000000;
        else if (hasGovWelfare){ welfareHealthValue = 1000000; welfareLifeValue = 200000;}
        else if (hasGroupMed) { welfareHealthValue = 500000; welfareLifeValue = 100000; }
        else if (hasSocialSec) { welfareHealthValue = 300000; welfareLifeValue = 50000; } 

        document.getElementById('sum_assets_body').innerHTML = getRowsHtml('c_assets');
        document.getElementById('sum_liab_body').innerHTML = getRowsHtml('c_liab');
        document.getElementById('sum_inc_body').innerHTML = getRowsHtml('c_inc');
        
        let extraExpItems = [];
        document.getElementById('sum_exp_body').innerHTML = getRowsHtml('c_exp', extraExpItems);
        
        document.getElementById('sum_assets_total').innerText = fmt(totalAst);
        document.getElementById('sum_liab_total').innerText = fmt(totalLiab);
        animateValue('sum_net_worth', 0, netWorth, 1000);

        // อัปเดตข้อมูล UI ส่วนที่ 1 ใหม่ (ความมั่งคั่ง & กระแสเงินสด)
        if(document.getElementById('val_total_inc_sum')) document.getElementById('val_total_inc_sum').innerText = fmt(totalInc);
        if(document.getElementById('val_total_exp_sum')) document.getElementById('val_total_exp_sum').innerText = fmt(totalExp);
        if(document.getElementById('val_netcash_sum')) document.getElementById('val_netcash_sum').innerText = fmt(totalInc - totalExp);
        
        let expRatio = totalInc > 0 ? Math.min((totalExp / totalInc) * 100, 100) : 0;
        if(document.getElementById('bar_exp_sum')) {
             document.getElementById('bar_exp_sum').style.width = expRatio + '%';
             document.getElementById('bar_exp_sum').className = `h-2.5 rounded-full transition-all duration-1000 ${expRatio > 80 ? 'bg-red-500' : 'bg-orange-500'}`;
        }
        
        // เรียก Render กราฟ Cash Flow Doughnut
        renderCFSummaryChart(expSave, expDebt, expTax, expLive + expOther);

        // --- [ส่วนเติมข้อมูล Profile เข้าสู่หน้ารายงาน] ---
        // เติมข้อมูลที่ดึงจาก Input ต่างๆ ในหน้าแรก
        if(document.getElementById('profile_age')) {
            document.getElementById('profile_age').innerText = (document.getElementById('p_age')?.value || "-") + " ปี";
        }
        if(document.getElementById('profile_occ')) {
            document.getElementById('profile_occ').innerText = document.getElementById('p_occ')?.value || "-";
        }
        if(document.getElementById('profile_status')) {
            document.getElementById('profile_status').innerText = document.getElementById('p_status')?.value || "-";
        }
        if(document.getElementById('profile_goal')) {
            document.getElementById('profile_goal').innerText = document.getElementById('p_goal')?.value || "วางแผนการเงินรอบด้าน";
        }

        document.getElementById('sum_inc_total').innerText = fmt(totalInc);
        document.getElementById('sum_exp_total').innerText = fmt(totalExp);
        animateValue('sum_net_cash', 0, totalInc - totalExp, 1000);

        document.getElementById('val_total_ast').innerText = fmt(totalAst);
        document.getElementById('val_total_liab').innerText = fmt(totalLiab);
        animateValue('val_networth', 0, netWorth, 1000);
        
        // --- คำนวณความยาวกราฟตามสัดส่วนจริง (Relative Scale) ---
        let maxAstLiab = Math.max(totalAst, totalLiab); // หาว่าฝั่งไหนมีค่ามากกว่ากัน
        let astRatio = maxAstLiab > 0 ? (totalAst / maxAstLiab) * 100 : 0;
        let liabRatio = maxAstLiab > 0 ? (totalLiab / maxAstLiab) * 100 : 0;
        
        setTimeout(() => { 
            if(document.getElementById('bar_ast')) document.getElementById('bar_ast').style.width = astRatio + '%';
            if(document.getElementById('bar_liab')) document.getElementById('bar_liab').style.width = liabRatio + '%'; 
        }, 100);
        
        renderAssetChart(astLiquid, astInvest + astOffshore, astPersonal + astRealEstate + astAlt);

        const rSurvive = totalExp > 0 ? (totalInc / totalExp) : 0;
        const rWealth = totalExp > 0 ? ((incPassive + incBusiness) / totalExp) : 0;
        const rLiquid = totalExp > 0 ? (astLiquid / totalExp) : 0;
        const rDebt = totalInc > 0 ? (expDebt / totalInc) * 100 : 0;
        const rSave = totalInc > 0 ? (expSave / totalInc) * 100 : 0;
        const rInvest = netWorth > 0 ? ((astInvest + astOffshore + astRealEstate + astAlt) / netWorth) * 100 : 0;
        // --- ส่วนที่เพิ่ม: แก้ไขชื่อตัวแปรให้ตรงกับระบบเดิม ---
        let rSolvency = (netWorth / totalAst) * 100;
        let rDebtAsset = (totalLiab / totalAst) * 100;
        let rInvestAsset = ((astInvest + astOffshore) / totalAst) * 100;

        // 7. Solvency - แสดงผลตัวเลขและเกจสี
        animateValue('rt_solvency', 0, rSolvency, 1000, true, true);
        setProgressBar('pb_solvency', rSolvency, 100);
        document.getElementById('st_solvency').innerHTML = rSolvency > 50 ? '🟢' : (rSolvency >= 20 ? '🟡' : '🔴');

        // 8. Debt to Asset - แสดงผลตัวเลขและเกจสี
        animateValue('rt_debt_asset', 0, rDebtAsset, 1000, true, true);
        setProgressBar('pb_debt_asset', rDebtAsset, 100, true); 
        document.getElementById('st_debt_asset').innerHTML = rDebtAsset < 50 ? '🟢' : (rDebtAsset <= 70 ? '🟡' : '🔴');

        // 9. Investment to Asset - แสดงผลตัวเลขและเกจสี
        animateValue('rt_invest_asset', 0, rInvestAsset, 1000, true, true);
        setProgressBar('pb_invest_asset', rInvestAsset, 25); 
        document.getElementById('st_invest_asset').innerHTML = rInvestAsset > 20 ? '🟢' : (rInvestAsset >= 10 ? '🟡' : '🔴');

        let score = 0;
        let bd_surv = 0, bd_liq = 0, bd_debt = 0, bd_save = 0, bd_inv = 0;
        
        if(rSurvive >= 1) bd_surv += 15; if(rSurvive > 1.2) bd_surv += 5;
        
        // --- 1. วิเคราะห์สภาพคล่องตามความผันผวนของอาชีพ (Income Volatility) ---
        let liqBenchmarkMin = 3; // ค่าพื้นฐานพนักงานประจำ
        if (isHNW) {
            liqBenchmarkMin = 6; // HNW ควรมีสภาพคล่องเผื่อธุรกิจ
        } else if (occString.includes('คริปโต') || occString.includes('เทรดเดอร์') || occString.includes('influencer')) {
            liqBenchmarkMin = 12; // อาชีพผันผวนสูงมาก บังคับสำรอง 1 ปี
        } else if (isFreelance || isGigWorker || isBusinessOwner) {
            liqBenchmarkMin = 6;  // ฟรีแลนซ์/เจ้าของกิจการ บังคับสำรอง 6 เดือน
        }

        // --- 2. วิเคราะห์ความเสี่ยงด้านสุขภาพ (Medical Inflation) ---
        let dynamicMedInf = (rawAge >= 50 || hasHealthIssues) ? 8.0 : 6.0; // คนสูงวัยหรือมีโรคประจำตัว เงินเฟ้อค่ารักษาจะพุ่งเร็วกว่า
        document.getElementById('r_med_inf').value = dynamicMedInf; // อัปเดตกลับไปที่ UI
        
        // 🧠 แก้ไข: ยกเลิกการบวก forcedHealthPremium แฝงเข้าไปใน expLive และ totalExp 
        // เพื่อให้ตัวเลขกระแสเงินสดปัจจุบัน สะท้อนผลรวมข้อมูลที่ลูกค้ากรอกมาตรงเป๊ะ 100%
        
        if(rLiquid >= liqBenchmarkMin) bd_liq += 15; if(rLiquid >= liqBenchmarkMin * 2) bd_liq += 5;
        
        // 🌟 [แก้บั๊ก Case 3: The Bankrupt Big Spender]
        if(rDebt <= 45) bd_debt += 15; 
        if(rDebt <= 30 && rSurvive >= 1) {
            bd_debt += 10; // หนี้ต่ำ และกระแสเงินสดเป็นบวก (รอดตาย) -> ให้คะแนนเต็ม
        } else if (rDebt <= 30 && rSurvive < 1) {
            bd_debt += 0; // หนี้ต่ำ แต่ใช้เงินเกินตัว (กระแสเงินสดติดลบ) -> ริบคะแนนโบนัส!
            console.log("AI Flag: No debt, but negative cash flow detected. Net Worth is shrinking.");
        }

        if(rSave >= 10) bd_save += 15; if(rSave >= 20) bd_save += 10;
        if(rInvest >= 50) bd_inv += 10;
        
        score = bd_surv + bd_liq + bd_debt + bd_save + bd_inv;
        window.latestFinancialVitals = {
            healthScore: score,
            survivalRatio: rSurvive,
            liquidityRatio: rLiquid,
            debtToIncomePct: rDebt,
            savingsRatePct: rSave,
            investToWealthPct: rInvest
        };
        animateValue('val_fin_score', 0, score, 1500);

        const buildScoreBox = (title, pts, max) => {
            let color = pts === max ? 'text-green-400' : (pts > 0 ? 'text-yellow-400' : 'text-red-400');
            return `<div class="bg-gray-800 p-2 rounded border border-gray-600 flex flex-col items-center justify-center text-center"><span class="text-gray-400 mb-1">${title}</span><span class="font-bold text-lg ${color}">${pts}/${max}</span></div>`;
        };

        document.getElementById('score_breakdown_container').innerHTML = 
            buildScoreBox('อัตราความอยู่รอด', bd_surv, 20) +
            buildScoreBox('สภาพคล่อง', bd_liq, 20) +
            buildScoreBox('ภาระหนี้สิน', bd_debt, 25) +
            buildScoreBox('การออม', bd_save, 25) +
            buildScoreBox('การลงทุน', bd_inv, 10);

        animateValue('rt_survive', 0, rSurvive, 1000, false, true); 
        document.getElementById('st_survive').innerHTML = rSurvive > 1 ? '✅' : '⚠️'; 
        setProgressBar('pb_survive', rSurvive, 2); 
        
        animateValue('rt_wealth', 0, rWealth, 1000, false, true); 
        document.getElementById('st_wealth').innerHTML = rWealth > 1 ? '✅' : '⚠️'; 
        setProgressBar('pb_wealth', rWealth, 2); 

        document.getElementById('liquid_benchmark_text').innerText = `${liqBenchmarkMin} - ${liqBenchmarkMin*2} เท่า`;
        animateValue('rt_liquid', 0, rLiquid, 1000, false, true); 
        document.getElementById('st_liquid').innerHTML = rLiquid >= liqBenchmarkMin ? '✅' : '⚠️'; 
        setProgressBar('pb_liquid', rLiquid, liqBenchmarkMin*2);
        
        animateValue('rt_debt', 0, rDebt, 1000, true, true); 
        document.getElementById('st_debt').innerHTML = rDebt <= 45 ? '✅' : '⚠️'; 
        setProgressBar('pb_debt', rDebt, 100, true);
        
        animateValue('rt_save', 0, rSave, 1000, true, true); 
        document.getElementById('st_save').innerHTML = rSave >= 10 ? '✅' : '⚠️'; 
        setProgressBar('pb_save', rSave, 30);
        
        animateValue('rt_invest', 0, rInvest, 1000, true, true); 
        document.getElementById('st_invest').innerHTML = rInvest >= 50 ? '✅' : '⚠️'; 
        setProgressBar('pb_invest', rInvest, 100);

        let targetSavePct = 0.10;
        let maxDebtPct = 0.45;
        
        //นำ Insight อาชีพ "แพทย์" เข้ามารวมกับกลุ่มเป้าหมายพิเศษ
        let isHighSaverProfession = occString.includes('เทรดเดอร์') || occString.includes('แพทย์');

        if (isHNW || isHighSaverProfession) { targetSavePct = 0.30; maxDebtPct = 0.30; }
        else if (totalInc <= 100000) { targetSavePct = 0.15; maxDebtPct = 0.40; }
        else { targetSavePct = 0.20; maxDebtPct = 0.35; }

        if (!isHNW && (isFreelance || isGigWorker)) { targetSavePct += 0.05; maxDebtPct -= 0.05; }
        if (hasDependents) { maxDebtPct -= 0.05; }

        targetSavePct = Math.max(0.10, Math.min(targetSavePct, 0.50));
        maxDebtPct = Math.max(0.20, Math.min(maxDebtPct, 0.50));

        let propSaveTarget = totalInc * targetSavePct;
        let propDebtTarget = totalInc * maxDebtPct;

        let propDebt = expDebt > propDebtTarget ? propDebtTarget : expDebt;
        let fixedCosts = expTax; 
        let cLiveGroup = expLive + expOther;
        
        // 🌟 [FIX 1: การจัดการงบใช้ชีวิต] ให้งบใช้ชีวิตอิงตามพฤติกรรมเดิมเป็นหลัก
        let minLivePct = totalInc < 30000 ? 0.50 : (isHNW ? 0.20 : 0.40); 
        let currentLivePct = totalInc > 0 ? (cLiveGroup / totalInc) : 0;
        if (currentLivePct > 0 && currentLivePct < minLivePct) {
            minLivePct = currentLivePct; // ถ้ายอมลำบากประหยัดได้ ก็ให้ยึดนิสัยประหยัดนี้ไว้
        }
        
        // ล็อกงบใช้ชีวิตขั้นต่ำ
        let propLive = Math.max(cLiveGroup, totalInc * minLivePct);
        
        // 🌟 [FIX 2: กวาดเงินส่วนเกินลงพอร์ต] เงินที่เหลือจาก หนี้ + ภาษี + ใช้ชีวิต ให้โยนเข้า "ออม/ลงทุน" ทั้งหมด!
        let propSave = totalInc - propLive - propDebt - fixedCosts;
        
        // 🌟 [FIX 3: เซฟตี้] ถ้าคำนวณแล้วเงินออมน้อยกว่าเกณฑ์เป้าหมาย ค่อยไปบังคับบีบงบใช้ชีวิตลง
        if (propSave < propSaveTarget) {
            propSave = Math.max(expSave, propSaveTarget);
            propLive = totalInc - propSave - propDebt - fixedCosts;
            
            // กรณีเงินตึงจัดๆ จ่ายหนี้ก็หมดแล้ว
            if (propLive < 0) {
                propLive = 0;
                propSave = Math.max(0, totalInc - propDebt - fixedCosts); 
            }
        }

        // 🌟 [แก้บั๊ก Case 2: โยกเงินไปโปะหนี้ดอกเบี้ยสูง]
        let extraDebtPay = 0;
        let safeSavingRatio = totalInc * 0.10; 
        
        if (totalLiab > 0 && propSave > safeSavingRatio) {
            extraDebtPay = propSave - safeSavingRatio; 
            propSave -= extraDebtPay;  
            propDebt += extraDebtPay;  
        }

        let parsedGoals = [];
        let currentAgeCalc = parseInt(document.getElementById('p_age')?.value) || 30;
        let lifeExpCalc = parseInt(document.getElementById('r_lifeExp')?.value) || 85;
        document.querySelectorAll('#c_goals .custom-row').forEach(row => {
            let inputs = row.querySelectorAll('input');
            let name = inputs[0].value || 'ไม่ระบุเป้าหมาย';
            let amount = parseNum(inputs[1].value) || 0;
            let years = parseNum(inputs[2].value) || 1;
            if (years <= 0) {
                if (name.includes('เกษียณ') || name.includes('บำนาญ')) {
                    name = "กองทุนบริหารความมั่งคั่งและส่งมอบมรดก";
                    years = Math.max(1, lifeExpCalc - currentAgeCalc); // นำอายุขัยลบอายุจริง
                } else {
                    years = 1; // กันพลาดให้เป้าหมายอื่นๆ
                }
                inputs[0].value = name;
                inputs[2].value = years;
            }
            let priority = parseNum(inputs[3] ? inputs[3].value : 1) || 1;
            let months = years * 12;
            let reqMonthlyNoInvest = months > 0 ? amount / months : 0;
            
            // 🧠 แก้ไข: คืนค่า ROI ให้ตรงกับระยะเวลาเป้าหมาย (ไม่ดึงความเสี่ยงพอร์ตเกษียณมาปนกับเป้าสั้น)
            let goalExpectedRoi;
            if(years <= 3) {
                goalExpectedRoi = 0.025; // 2.5% สำหรับเป้าหมายระยะสั้น (ฝากประจำ/กองทุนตลาดเงิน)
            } else if(years <= 7) {
                goalExpectedRoi = 0.05; // 5% สำหรับเป้าหมายระยะกลาง (ตราสารหนี้/กองทุนผสม)
            } else {
                goalExpectedRoi = targetRoiEst > 0 ? targetRoiEst / 100 : 0.08; // อิงตามพอร์ตหลักสำหรับเป้าหมายระยะยาว
            }
            
            // สร้างตัวแปรใหม่เก็บค่า % ผลตอบแทนของเป้าหมายนี้
            let currentTargetRoiEst = goalExpectedRoi * 100;
            let rate = goalExpectedRoi / 12;
            let reqMonthlyInvest = 0;
            let existingGoalPV = 0;
            
            // สแกนพอร์ตการลงทุนปัจจุบัน เพื่อดูว่ามีเงินกองไหนตั้งใจเก็บไว้เป้าหมายนี้หรือไม่
            document.querySelectorAll('#c_invest_current .custom-row').forEach(invRow => {
                let invVal = parseNum(invRow.querySelector('.col-inv-val').value) || 0;
                let invObj = invRow.querySelector('.col-inv-obj').value || '';
                
                // เทียบคีย์เวิร์ดเป้าหมาย (Goal) กับวัตถุประสงค์พอร์ต (Investment Objective)
                if (name.includes('ศึกษา') && invObj.includes('การศึกษา')) {
                    existingGoalPV += invVal;
                } else if ((name.includes('บ้าน') || name.includes('รถ') || name.includes('สินทรัพย์')) && (invObj.includes('ระยะยาว') || invObj.includes('เติบโต'))) {
                    existingGoalPV += invVal;
                }
            });
            
            if(amount > 0 && months > 0) {
                // 1. นำเงินต้นปัจจุบัน (PV) มาทบต้นด้วยผลตอบแทนคาดหวัง ไปจนถึงระยะเวลาเป้าหมาย (FV of PV)
                let futureValueOfExistingAssets = existingGoalPV * Math.pow(1 + rate, months);
                
                // 2. หาส่วนต่างที่ยังขาดอยู่ (Target FV - FV of PV)
                let actualShortfallFV = Math.max(0, amount - futureValueOfExistingAssets);
                
                if (actualShortfallFV > 0) {
                    // 3. นำ "ส่วนที่ขาด" มาเข้าสูตรหาเงินออมรายเดือน (PMT)
                    reqMonthlyInvest = (actualShortfallFV * rate) / (Math.pow(1 + rate, months) - 1);
                } else {
                    // 4. ถ้าเงินก้อนเดิมโตทันเป้าหมายแล้ว ระบบจะสั่งให้หยุดออมเพิ่มในเป้าหมายนี้! (ประหยัดงบ)
                    reqMonthlyInvest = 0; 
                }
            }
            
            // ส่งค่า currentTargetRoiEst เข้าไปใน object ที่จะ push ลง array เลย
            parsedGoals.push({ name, amount, years, priority, reqMonthlyNoInvest, reqMonthlyInvest, targetRoiEst: currentTargetRoiEst });
        });
        parsedGoals.sort((a, b) => a.priority - b.priority);

        let allocIns = Math.min(monthlyInsPrem, propSave); 
        let totalGoalReq = parsedGoals.reduce((sum, g) => sum + g.reqMonthlyInvest, 0);
        let totalNeededSavings = allocIns + totalGoalReq;
        
        let didSqueeze = false;
        let originalPropLive = propLive;

        if (propSave < totalNeededSavings) {
            let shortfall = totalNeededSavings - propSave;
            let minLiveExp = totalInc * minLivePct; 
            let squeezableLive = Math.max(0, propLive - minLiveExp);
            
            if (squeezableLive > 0) {
                let squeezeAmt = Math.min(shortfall, squeezableLive);
                propLive -= squeezeAmt;
                propSave += squeezeAmt;
                didSqueeze = true;
            }
        }

        // 🧠 [NLG] Dynamic Cash Flow Explanation (Personalized Context)
        let aiExplainTxt = "";
        let savePct = ((propSave/totalInc)*100).toFixed(0);
        let debtPct = ((propDebt/totalInc)*100).toFixed(0);
        let livePct = ((propLive/totalInc)*100).toFixed(0);

        if (rDebt > 40 || userCluster.includes("Overleveraged")) {
            // กรณีลูกค้าหนี้ตึงตัว
            aiExplainTxt = pickStr([
                `<b>🚨 AI Cashflow Restructuring:</b> สัดส่วนหนี้สินของคุณอยู่ในโซนตึงตัว ระบบจึงบีบอัดงบประมาณเพื่อสร้างสมดุลใหม่ โดยบังคับตรึงรายจ่ายหนี้ไว้ที่ <b>${debtPct}%</b> และต้องรักษาวินัยออมขั้นต่ำ <b>${savePct}%</b> เพื่อพยุงไม่ให้เป้าหมายสำคัญในอนาคตพังทลาย`,
                `<b>⚖️ Debt-Control Framework:</b> เพื่อหยุดเลือดที่ไหลจากดอกเบี้ยจ่าย AI แนะนำงบประมาณแบบรัดเข็มขัด: <b>คุมหนี้ไม่เกิน ${debtPct}%</b> และดึงกระแสเงินสดมาออม/ลงทุนให้ได้ <b>${savePct}%</b> ส่วนงบใช้ชีวิตต้องประหยัดลงเหลือ <b>${livePct}%</b> ทันที`
            ]);
        } else if (isHNW || userCluster.includes("Legacy")) {
            // กรณีลูกค้าระดับมั่งคั่ง
            aiExplainTxt = pickStr([
                `<b>💎 Wealth Optimization:</b> สำหรับฐานะระดับ High Net Worth การปล่อยเงินสดไว้เฉยๆ คือค่าเสียโอกาสมหาศาล ระบบแนะนำให้ปรับโครงสร้างใหม่โดยดันสัดส่วนออม/ลงทุนไปที่ <b>${savePct}%</b> เพื่อเร่งเครื่องสร้างผลตอบแทนทบต้นให้เร็วที่สุด`,
                `<b>🚀 Dynamic Capital Allocation:</b> ปัญหาเรื่องหนี้สินไม่ใช่ประเด็นของคุณ (${debtPct}%) เป้าหมายตอนนี้คือการรีดประสิทธิภาพเงินทุน AI แนะนำให้โยกกระแสเงินสดไปฝั่งการสะสมความมั่งคั่งให้ถึง <b>${savePct}%</b> เพื่อสร้าง Alpha Return`
            ]);
        } else if (rSave < 10) {
            // กรณีลูกค้าออมน้อยกว่าเกณฑ์
            aiExplainTxt = pickStr([
                `<b>🎯 หลักการ Pay Yourself First:</b> สถิติชี้ว่าวินัยการออมของคุณยังต่ำกว่าเกณฑ์ ระบบบังคับให้คุณ "จ่ายให้ตัวเองก่อน" ด้วยการหักเงินออมทันที <b>${savePct}%</b> ตั้งแต่วันที่เงินเดือนออก และจำกัดงบไลฟ์สไตล์ไว้ที่ <b>${livePct}%</b>`,
                `<b>⚙️ AI Zero-Based Budgeting:</b> เพื่อปลดล็อกเป้าหมายทางการเงิน คุณต้องอุดรอยรั่วจากการใช้จ่ายเกินตัว AI ปรับงบใหม่ให้บังคับออม <b>${savePct}%</b> ทันที และให้ยึดกรอบงบใช้ชีวิตประจำเดือนที่ <b>${livePct}%</b> อย่างเคร่งครัด`
            ]);
        } else {
            // กรณีลูกค้าทั่วไป (Standard)
            aiExplainTxt = pickStr([
                `<b>⚖️ Balanced Cashflow Approach:</b> โครงสร้างของคุณจัดสมดุลได้ดี แผน Benchmark นี้มุ่งเน้นการรักษาวินัยระยะยาว โดยจัดสรรเป็น: <b>ออม/ลงทุน ${savePct}%, ชำระหนี้ ${debtPct}% และงบไลฟ์สไตล์ ${livePct}%</b> ซึ่งสอดคล้องกับภาระครอบครัวของคุณ`,
                `<b>📊 Blueprint for Success:</b> เพื่อรักษาระดับความมั่งคั่งให้เติบโตตามเป้า ระบบแนะนำโครงสร้างกระแสเงินสดอุดมคติที่: <b>เติบโตพอร์ต ${savePct}%, บริหารหนี้ ${debtPct}% และใช้ชีวิตแบบไร้กังวล ${livePct}%</b>`
            ]);
        }
        
        // 🚨 [FIX BUG 2.2] ตรรกะ Asset Monetization สำหรับเศรษฐีที่ดิน/เกษตรกรเงินช็อต
        let isAssetRichCashPoor = ((typeof astPersonal !== 'undefined' && astPersonal >= 5000000) || netWorth >= 10000000) && didSqueeze; 
        
        // ใช้วิธีประกาศชื่อตัวแปรใหม่ (isIncomeSeasonal) เพื่อไม่ให้ชนกับโค้ดด้านล่าง
        let isIncomeSeasonal = (typeof occString !== 'undefined' && (occString.includes('เกษตรกร') || occString.includes('รับเหมา') || occString.includes('ค้าขาย'))) || isFreelance || isGigWorker || isBusinessOwner;

        if (isAssetRichCashPoor) {
            // โหมดเศรษฐีที่ดินเงินช็อต: ไม่หั่นงบ แต่แนะให้เอาที่ดินไปกู้ OD
            aiExplainTxt += `<div class="mt-3 pt-2 border-t border-dashed border-blue-300 text-sm text-blue-800 bg-blue-50 p-2 rounded">💡 <b>AI Asset Monetization (แปลงสินทรัพย์เป็นทุน):</b> ท่านมีสินทรัพย์ส่วนตัว/ที่ดินมูลค่าสูงมาก แต่กระแสเงินสดปัจจุบันตึงตัว (Collision) ระบบไม่แนะนำให้ลดค่าใช้จ่าย แต่แนะนำให้ <b>"นำสินทรัพย์ไปจัดวงเงินสินเชื่อ (OD / Land for Loan)"</b> เพื่อเสริมสภาพคล่องหมุนเวียนครับ</div>`;
        } else if (isIncomeSeasonal && didSqueeze) {
            // โหมดเกษตรกร/ฟรีแลนซ์: ปลอบใจว่ารายได้ฤดูกาล ให้ดึงเงินสำรองมาใช้ก่อน
            aiExplainTxt += `<div class="mt-3 pt-2 border-t border-dashed border-orange-300 text-sm text-orange-800 bg-orange-50 p-2 rounded">⚠️ <b>AI Seasonal Cashflow:</b> อาชีพของท่านมีรายได้แบบฤดูกาล (Seasonal Income) กระแสเงินสดที่ตึงตัวในเดือนนี้ไม่ใช่ภาวะล้มละลาย ระบบแนะนำให้ใช้ <b>"เงินสำรองฉุกเฉิน 12 เดือน"</b> หมุนเวียนชั่วคราว ระหว่างรอรอบรายได้ก้อนใหญ่ครับ</div>`;
        } else if (didSqueeze) {
            // โหมดคนทำงานประจำปกติ: โดนสั่งหั่นงบตามเดิม
            aiExplainTxt += `<div class="mt-3 pt-2 border-t border-dashed border-gray-300 text-sm text-indigo-700 bg-indigo-50/50 p-2 rounded">💡 <b>SMART Goals Auto-Adjustment:</b> ${pickStr([
                `เพื่อให้เป้าหมายที่สำคัญที่สุดของคุณ (Priority 1) เป็นจริง ระบบตรวจพบว่ากระแสเงินสดไม่พอ จึงได้ตัดสินใจ <b>"โยกงบไลฟ์สไตล์ ${fmt(originalPropLive - propLive)} บาท/เดือน"</b> มาเติมในพอร์ตลงทุน (Trade-off)`,
                `เป้าหมายของคุณต้องใช้เม็ดเงินสูง AI จึงทำการปรับสมดุล (Reality Check) โดย <b>"ลดงบใช้ชีวิตฟุ่มเฟือยลง ${fmt(originalPropLive - propLive)} บาท"</b> เพื่อให้เป้าหมายมีโอกาสสำเร็จโดยไม่ต้องก่อหนี้เพิ่ม`,
                `ความต้องการและทรัพยากรเกิดสภาวะแย่งงบกัน (Collision) ระบบจึงบังคับ <b>"ตัดงบใช้จ่ายรายเดือนลง ${fmt(originalPropLive - propLive)} บาท"</b> เพื่อปกป้องเป้าหมายหลักไม่ให้ล้มเหลว`
            ])}</div>`;
        }

        document.getElementById('cashflow_explain').innerHTML = aiExplainTxt;

        document.getElementById('tb_c_inc').innerText = fmt(totalInc); document.getElementById('tb_p_inc').innerText = fmt(totalInc);
        document.getElementById('tb_c_save').innerText = fmt(expSave); document.getElementById('tb_p_save').innerText = fmt(propSave);
        document.getElementById('tb_c_debt').innerText = fmt(expDebt); document.getElementById('tb_p_debt').innerText = fmt(propDebt);
        document.getElementById('tb_c_fixed').innerText = fmt(fixedCosts); document.getElementById('tb_p_fixed').innerText = fmt(fixedCosts);
        document.getElementById('tb_c_live').innerText = fmt(cLiveGroup); document.getElementById('tb_p_live').innerText = fmt(propLive);
        
        document.getElementById('tb_c_net').innerText = fmt(totalInc - totalExp); 
        document.getElementById('tb_p_net').innerText = fmt(totalInc - propSave - propDebt - fixedCosts - propLive);
        
        renderCashflowChart(expSave, expDebt, cLiveGroup, fixedCosts, propSave, propDebt, propLive, fixedCosts, totalInc);

        let hasShortTermDebt = liabShort > 0;
        let isDebtHeavy = rDebt > 40;
        
        if (hasShortTermDebt && !isHNW) {
        document.getElementById('debt_clearance_section').classList.remove('hidden');
        
        let rateShort = 0.18; // ดอกเบี้ยบัตรเครดิต/สินเชื่อบุคคล (18% ต่อปี)
        let balShort = liabShort;
        // จ่ายขั้นต่ำ 5% แต่ต้องดักไว้ว่าต้องมากกว่าดอกเบี้ยรายเดือน ไม่งั้นเงินต้นไม่ลด
        let currentMonthlyPayShort = Math.max(balShort * 0.05, (balShort * rateShort / 12) + 100); 
        
        // ✅ [FIX LAYER 2: ป้องกัน Negative Arbitrage] 
        // โยกเงินออมส่วนเกิน (Free Cashflow) 100% มาทุบหนี้ดอกโหดให้หมด ห้ามเอาไปลงทุนเด็ดขาด!
        let netCashflowCheck = totalInc - totalExp;
        let extraPay = netCashflowCheck >= 0 ? propSave : 0; 
        let proposedMonthlyPayShort = currentMonthlyPayShort + extraPay;

        // ✅ [FIX LAYER 2: สมการลดต้นลดดอกของจริง (Amortization / NPER Formula)]
        function calculateNPER(ratePerPeriod, pmt, pv) {
            if (pv <= 0) return 0; // ไม่มีหนี้
            if (pmt <= pv * ratePerPeriod) return Infinity; // จ่ายน้อยกว่าหรือเท่ากับดอกเบี้ย (เงินต้นไม่ลด)
            return Math.ceil(-Math.log(1 - (pv * ratePerPeriod) / pmt) / Math.log(1 + ratePerPeriod));
        }

        // คำนวณจำนวนเดือนที่แท้จริง
        let monthsCurrent = calculateNPER(rateShort / 12, currentMonthlyPayShort, balShort);
        let monthsProposed = calculateNPER(rateShort / 12, proposedMonthlyPayShort, balShort);

        // คำนวณดอกเบี้ยจ่ายรวม = (ยอดผ่อน x จำนวนเดือน) - เงินต้น
        let intCurrent = (monthsCurrent === Infinity) 
            ? "วิกฤต (ดอกเบี้ยทบต้นล้มละลาย)" 
            : (monthsCurrent * currentMonthlyPayShort) - balShort;

        let intProposed = (monthsProposed === Infinity) 
            ? "วิกฤต (เงินผ่อนไม่พอตัดต้น)" 
            : (monthsProposed * proposedMonthlyPayShort) - balShort;

        // 🧠 [NLG] Debt Management Strategy
        let debtAlertMsg = pickStr([
            `คุณมีหนี้ระยะสั้นมูลค่า ${fmt(balShort)} บาท ซึ่งกำลังสร้างรอยรั่วทางการเงิน ระบบจำลอง 2 กลยุทธ์คือ <b>Debt Snowball</b> (ปิดก้อนเล็กสร้างกำลังใจ) และ <b>Debt Avalanche</b> (ปิดดอกเบี้ยแพงสุดก่อนเพื่อประหยัดเงินสูงสุด) แนะนำให้นำเงินออมส่วนเกินมาทุบหนี้ก้อนนี้ให้จบก่อนเริ่มลงทุน`,
            `ภาระหนี้บริโภคมูลค่า ${fmt(balShort)} บาท ดอกเบี้ยทำงานแบบทบต้นและมีพลังทำลายล้างสูง การนำเงิน ${fmt(extraPay)} บ./เดือน มาชำระหนี้เพิ่ม (Snowball/Avalanche) ให้อัตราผลตอบแทนที่แน่นอนกว่าการคาดหวังจากตลาดหุ้น`
        ]);

        let aiReasonMsg = pickStr([
            `การนำเงินออมส่วนเกิน (${fmt(extraPay)} บ./เดือน) มาโปะเฉพาะหนี้บริโภคหรือหนี้ระยะสั้นก่อน จะช่วยหยุดเลือดที่ไหลออกได้เร็วที่สุด และประหยัดดอกเบี้ยได้มหาศาล`,
            `สมการคณิตศาสตร์ชี้ชัดว่า การจ่ายขั้นต่ำทำให้คุณเสียดอกเบี้ยจำนวนมหาศาล การโปะเพิ่มเพียงเดือนละ ${fmt(extraPay)} บาท ช่วยประหยัดดอกเบี้ยและคืนอิสรภาพทางการเงินได้เร็วขึ้นอย่างชัดเจน`
        ]);

        let debtHtml = `
            <div class="mb-4 bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 class="font-bold text-red-800 mb-2">🛑 ตรวจพบหนี้บริโภคดอกเบี้ยสูง (Bad Debt)</h4>
                <p class="text-sm text-gray-700">${debtAlertMsg}</p>
            </div>
            
            <h4 class="font-bold text-gray-800 mb-2 mt-4">เปรียบเทียบกลยุทธ์การปลดหนี้ (Debt Clearance Strategy)</h4>
            <div class="overflow-x-auto">
                <table class="w-full text-sm border mb-4">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2 border text-left">ทางเลือก (Strategy)</th><th class="p-2 border text-right">ยอดผ่อน/เดือน</th><th class="p-2 border text-center">เวลาปลดหนี้โดยประมาณ</th><th class="p-2 border text-right">ดอกเบี้ยจ่ายรวม (คาดการณ์)</th></tr>
                    </thead>
                    <tbody>
                        <tr class="hover:bg-gray-50">
                            <td class="p-2 border">1. ชำระขั้นต่ำ (Do Nothing)</td>
                            <td class="p-2 border text-right text-gray-700">${fmt(currentMonthlyPayShort)}</td>
                            <td class="p-2 border text-center ${monthsCurrent === Infinity ? 'text-red-600 font-bold' : ''}">${monthsCurrent === Infinity ? 'วิกฤต/ไม่ลดต้น' : monthsCurrent + ' เดือน'}</td>
                            <td class="p-2 border text-right text-red-600">${typeof intCurrent === 'number' ? fmt(intCurrent) : intCurrent}</td>
                        </tr>
                        <tr class="bg-green-50/50 hover:bg-green-50 border-l-4 border-l-green-500 shadow-sm">
                            <td class="p-2 border font-bold text-green-800">⭐ 2. Snowball / Avalanche (โปะเพิ่ม)</td>
                            <td class="p-2 border text-right font-bold text-green-700">${fmt(proposedMonthlyPayShort)}</td>
                            <td class="p-2 border text-center font-bold text-blue-700">${monthsProposed === Infinity ? 'วิกฤต' : monthsProposed + ' เดือน'}</td>
                            <td class="p-2 border text-right font-bold text-green-600">${typeof intProposed === 'number' ? fmt(intProposed) : intProposed}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bg-blue-50 p-3 rounded border border-blue-200 text-sm text-gray-700">
                <p><b>💡 AI Financial Logic:</b> ${aiReasonMsg}</p>
            </div>
        `;
            document.getElementById('debt_clearance_content').innerHTML = debtHtml;
        } else {
            let dcSection = document.getElementById('debt_clearance_section');
            if(dcSection) dcSection.classList.add('hidden');
        }

        const retAge = Number(document.getElementById('r_retAge').value) || 60;
        let targetEmg = pureExp * liqBenchmarkMin;
        
        // 🌟 [FIX: ล้างบางบั๊กตัวแปรล่องหน]
        // ดึงค่าอายุและภาระอุปการะจากตัวแปรหลักที่ประกาศไว้ถูกต้องแล้วด้านบน
        let dependentCount = numDependents; 
        let clientAge = rawAge;
        let lifeProtectYears = 5; // มาตรฐาน 5 ปี
        if (dependentCount > 0) {
            if (clientAge <= 35) lifeProtectYears = 20;
            else if (clientAge <= 45) lifeProtectYears = 15;
            else if (clientAge <= 55) lifeProtectYears = 10;
        }
        
        // ==========================================
        // 🧠 [UPGRADE] ตรรกะ "ความมั่งคั่งที่หายไปในวันสิ้นใจ" (Estate Tax Liquidity Gap)
        // ==========================================
        // 1. ประเมินภาษีมรดกตามกฎหมายไทย (หักลบประกันชีวิตที่ได้รับยกเว้นภาษี)
        // 🌟 [แก้บั๊ก Case 4] หักมูลค่าทุนประกันชีวิต (insLife) ออกจากความมั่งคั่งสุทธิก่อน
        let netEstate = Math.max(0, netWorth - insLife); 
        
        let estateTaxExempt = 100000000; // ยกเว้น 100 ล้านแรก (สำหรับบุพการี/ผู้สืบสันดาน)
        let taxableEstate = Math.max(0, netEstate - estateTaxExempt);
        let estateTaxEst = taxableEstate * 0.05; // ภาษี 5%

        // 2. เช็คสภาพคล่องที่มีเทียบกับภาษีมรดกที่ต้องจ่าย
        window.liquidityGapForTax = Math.max(0, estateTaxEst - astLiquid); // เก็บตัวแปรไว้ให้ AI ใช้

        // 🧠 1. เตรียมข้อมูลพื้นฐานและแยกเงื่อนไขคนโสด
        const pDepInput = document.getElementById('p_dep')?.value || "0";
        const numDep = parseInt(pDepInput) || 0;
        const livingExpWithoutDebt = Math.max(0, pureExp - expDebt); // หักหนี้ออกเพราะเคลียร์ด้วยหนี้ก้อนใหญ่ไปแล้ว

        // 🧠 2. คำนวณเป้าหมายทุนประกันชีวิต (Logic: คนโสด vs คนมีภาระ)
        // ✅ [FIX LAYER 3] หักทั้งหนี้ (expDebt) และ ภาษีเงินได้ (expTax) ออกจากค่าใช้จ่าย
        const livingExpWithoutDebtAndTax = Math.max(0, pureExp - expDebt - expTax); 
    
        let targetLife = 0;
        // 🌟 [FIX 3] นำเป้าหมายสำคัญ (เช่น การศึกษาบุตร) มารวมในทุนประกันชีวิต (Needs Approach)
        let familyObligationsFV = 0;
        if (typeof parsedGoals !== 'undefined') {
            parsedGoals.forEach(g => {
                // ถ้าเป็นเป้าหมายเรื่องลูก หรือเรื่องบ้านที่เป็นชื่อร่วม ต้องบวกเป็นความคุ้มครอง!
                if (g.name.includes('ศึกษา') || g.name.includes('บุตร') || g.name.includes('บ้าน')) {
                    familyObligationsFV += g.amount;
                }
            });
        }

        if (numDep === 0) {
            targetLife = totalLiab + 500000 + estateTaxEst; 
        } else {
            // บวก Family Obligations เข้าไป เพื่อให้แน่ใจว่าถ้าจากไป ลูกจะได้เรียนจบและมีบ้านอยู่
            targetLife = totalLiab + (livingExpWithoutDebtAndTax * 12 * lifeProtectYears) + estateTaxEst + familyObligationsFV; 
        }
        
        // 🧠 3. คำนวณเป้าหมายค่ารักษาพยาบาล (Logic: ปรับฐานตามความเหมาะสม)
        let targetHealthBase = isHNW ? 10000000 : (hasHealthIssues ? 5000000 : 3000000); 

        // 🌟 [FIX: ตรรกะสิทธิข้าราชการ ปะทะ เงินเฟ้อแพทย์ 8%] 
        // ถ้าลูกค้ามีสิทธิรักษาฟรี (ข้าราชการ/รัฐวิสาหกิจ) ให้หั่นเป้าหมายลงเหลือแค่ "ค่าห้องพิเศษ/ยานอกบัญชี"
        if (hasGovWelfare) {
            targetHealthBase = 500000; // ล็อกเป้าหมายตั้งต้นไว้ที่ 5 แสนบาท
        }

        // ✅ [แก้ไขใหม่ให้สอดคล้อง] คุ้มครองระยะสั้น 5 ปี สำหรับการตั้งเป้าอุดความเสี่ยงวันนี้
        let shortTermHealthYears = 5; 
        let targetHealth = targetHealthBase * Math.pow(1 + (r_med_inf || 6)/100, shortTermHealthYears); 

        // ✅ [เพิ่มใหม่] คำนวณกองทุนสุขภาพยามเกษียณ (เผื่อนำไปแสดงในวงเล็บให้ลูกค้าตระหนัก)
        let yearsForHealthInf = Math.max(0, retAge - rawAge); 
        let targetHealthRetirement = targetHealthBase * Math.pow(1 + (r_med_inf || 6)/100, yearsForHealthInf);

        // 🧠 4. คำนวณทรัพยากรที่มีอยู่ และ ส่วนขาด/เกิน (Gap)
        // (หักสภาพคล่อง 20% มารวมเป็นค่ารักษาเหมือนในตรรกะ AI)
        let disposableAssetsForHealth = astLiquid * 0.20; 
        let totalCurrentHealth = insHealth + welfareHealthValue + disposableAssetsForHealth;
        let totalCurrentLife = insLife + welfareLifeValue + astLiquid + astInvest;
    
        const diffEmg = astLiquid - targetEmg;
        const diffLife = totalCurrentLife - targetLife;
        const diffHealth = totalCurrentHealth - targetHealth;
        window.diffHealth = diffHealth;
        window.diffLife = diffLife;

    // =============================================================
    // 🧠 ระบบดึงข้อมูลส่วนที่ 1 & 1.2 เข้าสู่ Summary Profile + NLG (ภาษาไทย)
    // =============================================================
    // 1. ดึงข้อมูลพื้นฐานจาก Input (ส่วนที่ 1: ข้อมูลทั่วไป)
    let rawPName = document.getElementById('p_name')?.value.trim() || "";
    const pName = rawPName ? (rawPName.startsWith('คุณ') ? rawPName : `คุณ ${rawPName}`) : "คุณลูกค้า";
    const pAge = document.getElementById('p_age')?.value || "-";
    const pJob = document.getElementById('p_occ')?.value || "-";
    const pWelfare = document.getElementById('p_welfare')?.value || "ไม่มี/ไม่ระบุ"; 
    const pDep = document.getElementById('p_dep')?.value || "0";
    const numDepLocal = parseInt(pDep) || 0; 

    // 2. ดึงข้อมูลพฤติกรรม (ส่วนที่ 1.2: AI Behavioral Profiling)
    const pRisk = document.getElementById('bq_2')?.options[document.getElementById('bq_2').selectedIndex]?.text || "ไม่ระบุ";
    const pDiscipline = document.getElementById('bq_1')?.options[document.getElementById('bq_1').selectedIndex]?.text || "ทั่วไป";

    // 3. แสดงผลลงในกล่อง Profile
    if(document.getElementById('profile_name')) document.getElementById('profile_name').innerText = pName;
    if(document.getElementById('profile_age')) document.getElementById('profile_age').innerText = pAge;
    if(document.getElementById('profile_occ')) document.getElementById('profile_occ').innerText = pJob;
    if(document.getElementById('profile_dep')) document.getElementById('profile_dep').innerText = pDep;
    if(document.getElementById('profile_welfare')) document.getElementById('profile_welfare').innerText = pWelfare;
    if(document.getElementById('profile_risk')) document.getElementById('profile_risk').innerText = pRisk;
    if(document.getElementById('profile_discipline')) document.getElementById('profile_discipline').innerText = pDiscipline;

    // 4. ระบบ NLG Insight (Co-Advisor Storytelling)
        let nlgText = `🧭 <b class="text-indigo-300">บทวิเคราะห์จาก Hybrid Co-Advisor:</b> จากการประมวลผลข้อมูลของคุณ <b>${pName}</b> <br>`;
        nlgText += `<div class="bg-indigo-900/40 p-2 rounded mt-2 border border-indigo-500/30 text-xs">`;
        nlgText += `${hybridResult.consensusMessage}</div><br>`;
        
        if (typeof generateXAIReport === 'function') {
            let probCurrentXAI = typeof predictSuccessProbability === 'function' ? predictSuccessProbability(customerDataForAI) : 50;
            let topDrivers = generateXAIReport(customerDataForAI, probCurrentXAI);
    
            if (topDrivers.length > 0) {
                nlgText += `<div class="bg-indigo-900/40 p-3 rounded mt-2 mb-3 border border-indigo-500/30 text-xs">`;
                nlgText += `<b class="text-cyan-300">🔍 Explainable AI (ปัจจัยหลักที่ส่งผลต่อเป้าหมายของคุณ):</b><ul class="list-disc ml-4 mt-2 space-y-1.5 text-indigo-100">`;
                topDrivers.forEach(driver => {
                    nlgText += `<li>${driver.nlgMessage}</li>`;
                });
                nlgText += `</ul></div>`;
            }
        }

        // 5.1 วิเคราะห์ภาระผู้อุปการะ (Rule-Based Condition)
        if (numDepLocal > 0) {
            nlgText += `🛡️ <b>การปกป้องครอบครัว (Rule):</b> เนื่องจากคุณมีผู้อยู่ในความอุปการะถึง ${numDepLocal} ท่าน แผนนี้จะให้น้ำหนักกับการสร้างหลักประกันที่มั่นคงเป็นอันดับแรก `;
        } else {
            nlgText += `📈 <b>การต่อยอดความมั่งคั่ง (Rule):</b> เนื่องจากคุณไม่มีภาระผู้อุปการะ แผนนี้จึงสามารถโฟกัสไปที่การต่อยอดความมั่งคั่ง (Wealth Accumulation) ได้อย่างเต็มที่ `;
        }

        // 5.2 วิเคราะห์สวัสดิการ
        if (pWelfare === "ไม่มี" || pWelfare === "-" || pWelfare === "") {
            nlgText += `รวมถึงแนะนำให้ปิดความเสี่ยงด้านค่ารักษาพยาบาลโดยด่วน เนื่องจากปัจจุบันคุณยังไม่มีสวัสดิการรองรับครับ`;
        } else {
            nlgText += `และระบบ <b>ML Simulation</b> จะนำสวัสดิการปัจจุบันของคุณ (${pWelfare}) มาเป็นฐาน เพื่อจำลองหาจุดคุ้มทุน (Optimization) ในการทำประกันส่วนเพิ่มครับ`;
        }
        
        if(document.getElementById('profile_nlg_insight')) {
            document.getElementById('profile_nlg_insight').innerHTML = nlgText;
        }

    // 📝 5. เตรียมข้อความ NLG ให้สอดคล้อง (ส่งต่อไปใช้ใน Section 2)
    let lifeShortfallMsg = "";
    if (diffLife < 0) {
        lifeShortfallMsg = numDep === 0 ? `เพื่อปิดหนี้และไม่เป็นภาระคนข้างหลัง (ขาดอีก ${fmt(Math.abs(diffLife))} บ.)` : `เพื่อเป็นกองทุนดูแลครอบครัวในวันที่ท่านไม่อยู่ (ขาดอีก ${fmt(Math.abs(diffLife))} บ.)`;
    }

    const pyramidIsStrong = (diffEmg >= 0 && diffLife >= 0 && diffHealth >= 0);
    const pyrBase = document.getElementById('pyr_base');
    const pyrActionText = document.getElementById('pyr_action_text');

    // ==========================================
    // 🏗️ Algorithm คำนวณรูปร่าง Dynamic Pyramid 4 ชั้น
    // ==========================================
    // 1. ประเมินคะแนนแต่ละชั้น (เต็ม 100)
    let scoreLiq = Math.min(100, (rLiquid / liqBenchmarkMin) * 100);
    let scoreDebt = rDebt <= 40 ? 100 : Math.max(0, ((100 - rDebt) / 60) * 100);
    let baseHealthScore = (scoreLiq * 0.6) + (scoreDebt * 0.4);

    let scoreLife = targetLife > 0 ? Math.min(100, (totalCurrentLife / targetLife) * 100) : 100;
    let scoreHealth = targetHealth > 0 ? Math.min(100, (totalCurrentHealth / targetHealth) * 100) : 100;
    let protectHealthScore = (scoreLife * 0.5) + (scoreHealth * 0.5);

    let accumHealthScore = Math.min(100, (rInvest / 50) * 100);
    let transferScore = Math.min(100, (netWorth / 20000000) * 100);

    // 2. แปลงคะแนนเป็นความกว้างของแท่ง (Width %)
    let wBase = 30 + (baseHealthScore * 0.7);
    let wProtect = 30 + (protectHealthScore * 0.7);
    let wAccum = 30 + (accumHealthScore * 0.7);
    let wTransfer = 20 + (transferScore * 0.4);

    // 3. คำนวณ "โอกาสพังทลาย" (Collapse Probability)
    let structuralPenalty = 0;
    if (wAccum > wProtect) structuralPenalty += (wAccum - wProtect);
    if (wProtect > wBase) structuralPenalty += (wProtect - wBase);
    let collapseProb = 100 - ((baseHealthScore * 0.5) + (protectHealthScore * 0.5)) + (structuralPenalty * 0.5);
    collapseProb = Math.min(99, Math.max(1, collapseProb));

    // 4. ฟังก์ชันกำหนดสีตามความแข็งแกร่ง
    const getColor = (score, isBase=false) => {
        if (isBase) return score >= 80 ? 'linear-gradient(135deg, #475569, #1f2937)' : (score >= 50 ? 'linear-gradient(135deg, #71717a, #4b5563)' : 'linear-gradient(135deg, #ef4444, #991b1b)');
        return score >= 80 ? 'linear-gradient(135deg, #10b981, #059669)' : (score >= 50 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #ef4444, #b91c1c)');
    };

    // 5. สร้างกราฟิก Dynamic Pyramid ลงใน Container
    let dynPyramidHtml = `
        <div class="dyn-layer" style="width: ${wTransfer}%; background: linear-gradient(135deg, #8b5cf6, #6d28d9); border-radius: 8px 8px 0 0;" title="คะแนนความพร้อม: ${transferScore.toFixed(0)}%">
            ส่งมอบมรดก
        </div>
        <div class="dyn-layer" style="width: ${wAccum}%; background: linear-gradient(135deg, #3b82f6, #2563eb);" title="คะแนนพอร์ตลงทุน: ${accumHealthScore.toFixed(0)}%">
            สะสมความมั่งคั่ง
        </div>
        <div class="dyn-layer" style="width: ${wProtect}%; background: ${getColor(protectHealthScore)};" title="คะแนนประกัน: ${protectHealthScore.toFixed(0)}%">
            ปกป้องความเสี่ยง
        </div>
        <div class="dyn-layer" style="width: ${wBase}%; background: ${getColor(baseHealthScore, true)}; border-radius: 0 0 8px 8px;" title="คะแนนสภาพคล่อง/หนี้สิน: ${baseHealthScore.toFixed(0)}%">
            บริหารสภาพคล่อง/หนี้
        </div>
    `;
    document.getElementById('dynamic_pyramid_container').innerHTML = dynPyramidHtml;

    // 6. ควบคุม Effect การพังทลาย และข้อความแนะนำ
    const wrapper = document.getElementById('dynamic_pyramid_wrapper');
    const badge = document.getElementById('collapse_badge');
    const actionText = document.getElementById('pyr_action_text');
    
    // 🚨แยก "หนี้คนรวย (Leverage)" ออกจาก "หนี้คนจน (Bad Debt)"
    // ตรรกะ: ถ้าเป็น HNW (สินทรัพย์รวม > 50 ล้าน) และมีหนี้เกิน 10 ล้าน ถือเป็นการทำ Leverage ธุรกิจ ไม่ใช่วิกฤต
    let isRichLeverage = (typeof isHNW !== 'undefined' && isHNW && netWorth > 50000000 && totalLiab > 10000000);

    if (isRichLeverage) {
        badge.classList.remove('hidden');
        badge.classList.replace('bg-red-600', 'bg-blue-600'); // เปลี่ยนสีป้ายเป็นสีน้ำเงินพรีเมียม
        document.getElementById('collapse_val').innerText = 'Leverage';
        actionText.innerHTML = pickStr([
            '<span class="text-blue-700">💡 <b>AI Wealth Strategy:</b> ท่านมีการใช้ Leverage (หนี้สินธุรกิจ) ในระดับสูง ถือเป็นกลยุทธ์ปกติของการบริหารทุน แนะนำให้โฟกัสที่การรักษาสภาพคล่องสำรอง (Cash Buffer)</span>',
            '<span class="text-blue-700">💡 <b>AI Analysis:</b> โครงสร้างหนี้ระดับนี้คือการทำ Leverage เพื่อต่อยอดความมั่งคั่ง ระบบแนะนำให้เตรียมสภาพคล่องเพื่อรองรับความผันผวนของดอกเบี้ยครับ</span>'
        ]);
    } else if (collapseProb >= 60) {
        badge.classList.remove('hidden');
        if (badge.classList.contains('bg-blue-600')) badge.classList.replace('bg-blue-600', 'bg-red-600'); // คืนค่าป้ายสีแดงให้คนปกติ
        document.getElementById('collapse_val').innerText = collapseProb.toFixed(0) + '%';
        actionText.innerHTML = pickStr([
            '<span class="text-red-600">🚨 <b>โครงสร้างเสี่ยงพังทลาย!</b> ยอดใหญ่กว่าฐาน (Top-Heavy) หรือภาระหนี้สูงเกินไป กรุณาเร่งอุดรอยรั่วที่ฐานรากทันที!</span>',
            '<span class="text-red-600">🚨 <b>อันตรายระดับวิกฤต!</b> ฐานรากการเงินรับน้ำหนักไม่ไหว เสี่ยงล้มครืนหากเกิดเหตุฉุกเฉิน เร่งจัดการหนี้หรือเพิ่มสภาพคล่องด่วน!</span>',
            '<span class="text-red-600">🚨 <b>สภาวะเปราะบางสูงสุด!</b> หนี้สินและเป้าหมายการลงทุนใหญ่เกินกว่ารากฐานจะรับได้ ควรหยุดพักการลงทุนและสร้างฐานให้แน่นก่อน</span>'
        ]);
    } else if (collapseProb >= 30) {
        badge.classList.add('hidden'); // ซ่อนป้าย
        actionText.innerHTML = pickStr([
            '<span class="text-orange-600">⚠️ <b>ฐานรากไม่สมดุล:</b> โครงสร้างมีความเสี่ยงปานกลาง ควรเพิ่มสภาพคล่องหรือปรับโครงสร้างหนี้ให้มั่นคงก่อน</span>',
            '<span class="text-orange-600">⚠️ <b>โครงสร้างเริ่มเอนเอียง:</b> การลงทุนและหนี้สินเริ่มกดดันฐานราก แนะนำให้เติมเงินสำรองฉุกเฉินเพื่อสร้างสมดุล</span>',
            '<span class="text-orange-600">⚠️ <b>ความเสี่ยงแฝงระดับกลาง:</b> โครงสร้างทางการเงินยังขาดความเสถียร ควรพิจารณาปิดความเสี่ยงเรื่องประกันหรือหนี้สินเพิ่มเติม</span>'
        ]);
    } else {
        badge.classList.add('hidden'); // ซ่อนป้าย
        actionText.innerHTML = pickStr([
            '<span class="text-green-600">✅ <b>โครงสร้างแข็งแกร่ง:</b> ฐานรากแน่นหนา สามารถโฟกัสไปที่การลงทุนสะสมความมั่งคั่งได้อย่างเต็มที่</span>',
            '<span class="text-green-600">✅ <b>ฐานรากไร้รอยรั่ว:</b> ความเสี่ยงถูกปิดสนิท พีระมิดการเงินสมบูรณ์แบบ พร้อมสำหรับการเร่งเครื่องสร้างผลตอบแทน</span>',
            '<span class="text-green-600">✅ <b>โครงสร้างสมดุลยอดเยี่ยม:</b> การบริหารหนี้และสภาพคล่องอยู่ในเกณฑ์ปลอดภัยสูงสุด ลุยแผนเกษียณได้อย่างไร้กังวล</span>'
        ]);
    }

    const formatStatus = (diff) => {
        if (diff < 0) return `<div class="text-red-600 font-bold p-2 bg-red-50 rounded border border-red-200 text-center shadow-inner">ต้องเตรียมเพิ่ม<br>${fmt(Math.abs(diff))}</div>`;
        return `<div class="text-green-600 font-bold p-2 bg-green-50 rounded border border-green-200 text-center shadow-inner">เพียงพอ/เกินเป้า<br>+${fmt(diff)}</div>`;
    };

    // ✅ เปลี่ยนเป้าหมายเป็น "ระยะสั้น" และแสดงเป้าเกษียณในวงเล็บเตือนใจ
    // 🚨 ปรับเป้าหมายเงินสำรองให้เข้ากับอาชีพ (Seasonal Income / Freelance / เกษตรกร)
        let isSeasonalIncome = (typeof occString !== 'undefined' && (occString.includes('เกษตรกร') || occString.includes('รับเหมา') || occString.includes('ค้าขาย'))) || isFreelance || isGigWorker || isBusinessOwner;
        // ถ้าเป็นกลุ่มรายได้ผันผวน บังคับสำรอง 12 เดือน (แต่ถ้าของเดิมลูกค้าตั้งไว้สูงกว่า 12 ให้ยึดค่าที่สูงกว่า)
        let safeEmgMonths = isSeasonalIncome ? Math.max(12, liqBenchmarkMin) : Math.max(6, liqBenchmarkMin);
        targetEmg = pureExp * safeEmgMonths; // อัปเดตเป้าหมายเงินสำรองใหม่ให้ AI รับรู้

        let liqTargetText = `เป้าหมาย: สำรองเงินสด ${safeEmgMonths} เดือน<br><span class="text-xs text-blue-600 font-medium mt-1 block"><b>ข้อมูลเชิงคุณภาพ:</b> ความเสี่ยงรายได้ ${isSeasonalIncome ? 'สูง (รายได้ผันผวน/ฤดูกาล)' : 'ปานกลาง (รายได้ประจำ)'}</span>`;
    
    let healthTargetText = `เป้าหมาย: ความคุ้มครองค่ารักษา/โรคร้าย <b>(ระยะสั้น 5 ปี)</b><br><span class="text-[10px] text-red-500 font-bold">*(คาดการณ์ค่ารักษายามเกษียณ: ${fmt(targetHealthRetirement)} บ.)*</span><br><span class="text-xs text-blue-600 font-medium mt-1 block"><b>ข้อมูลเชิงคุณภาพ:</b> สุขภาพปัจจุบัน (${healthString || 'ไม่ระบุ'}), สวัสดิการ (${welfare})</span>`;
    
    // ปรับรูปแบบข้อความเป้าหมายให้ถูกต้องชัดเจน
    let lifeTargetText = (dependentCount > 0) 
        ? `เป้าหมาย: ปลดภาระหนี้สิน + ดูแลครอบครัว ${lifeProtectYears} ปี ${estateTaxEst > 0 ? `<br><span class="text-[10px] text-red-600 font-bold">*(รวมภาษีมรดกประเมิน ${fmt(estateTaxEst)} บ.)*</span>` : ''}<br><span class="text-xs text-blue-600 font-medium mt-1 block"><b>ข้อมูลเชิงคุณภาพ:</b> อาชีพ ${occString || 'ไม่ระบุ'}, ผู้อยู่ในอุปการะ ${dependentCount} คน</span>`
        : `เป้าหมาย: ปลดภาระหนี้สิน + ค่าจัดการวาระสุดท้าย ${estateTaxEst > 0 ? `<br><span class="text-[10px] text-red-600 font-bold">*(รวมภาษีมรดกประเมิน ${fmt(estateTaxEst)} บ.)*</span>` : ''}<br><span class="text-xs text-blue-600 font-medium mt-1 block"><b>ข้อมูลเชิงคุณภาพ:</b> อาชีพ ${occString || 'ไม่ระบุ'}, ผู้อยู่ในอุปการะ 0 คน</span>`;

    let lifeDisplay = fmt(totalCurrentLife) + `<br><span class="text-[10px] text-gray-500">`+`(สินทรัพย์สภาพคล่อง ${fmt(astLiquid)} + สินทรัพย์ลงทุน ${fmt(astInvest)} + สวัสดิการที่มี ${fmt(welfareLifeValue)} + ประกัน  ${fmt(insLife)})`+`</span>`;
    
    // ✅ [แก้ไขข้อความ] เพิ่มการโชว์ว่าเรานำสภาพคล่อง (Disposable Asset) มาร่วมเป็นเกราะป้องกันสุขภาพด้วย
    let healthDisplay = fmt(totalCurrentHealth) + `<br><span class="text-[10px] text-gray-500">(20%สินทรัพย์สภาพคล่อง ${fmt(disposableAssetsForHealth)} + สวัสดิการ ${fmt(welfareHealthValue)} + ประกัน ${fmt(insHealth)})</span>`;
    
    let pyramidHtml = `
        <tr class="hover:bg-gray-50 transition"><td class="py-3 px-4"><b>1. สภาพคล่องฉุกเฉิน (Liquidity/Emergency Fund)</b><br><span class="text-xs text-gray-500">${liqTargetText}</span></td><td class="text-right px-4">${fmt(targetEmg)}</td><td class="text-right px-4 text-blue-700 font-semibold">${fmt(astLiquid)}</td><td class="px-4 w-1/4">${formatStatus(diffEmg)}</td></tr>
        <tr class="hover:bg-gray-50 transition"><td class="py-3 px-4"><b>2. การเตรียมพร้อมส่งมอบ / ทุนประกันชีวิต</b><br><span class="text-xs text-gray-500">${lifeTargetText}</span></td><td class="text-right px-4">${fmt(targetLife)}</td><td class="text-right px-4 text-blue-700 font-semibold">${lifeDisplay}</td><td class="px-4 w-1/4">${formatStatus(diffLife)}</td></tr>
        <tr class="hover:bg-gray-50 transition"><td class="py-3 px-4"><b>3. การปกป้องความมั่งคั่งด้านสุขภาพ (Health & CI)</b><br><span class="text-xs text-gray-500">${healthTargetText}</span></td><td class="text-right px-4">${fmt(targetHealth)}</td><td class="text-right px-4 text-blue-700 font-semibold">${healthDisplay}</td><td class="px-4 w-1/4">${formatStatus(diffHealth)}</td></tr>
    `;
        document.getElementById('tb_risk_body').innerHTML = pyramidHtml;

    // ==========================================
        // 🧠 ดึงข้อมูลเพื่อส่งให้ AI Engine วิเคราะห์
    // ==========================================
        // ✅ 1. ล้างตรรกะเหมาจ่าย เปลี่ยนมาดึงรายจ่ายจริง (pureExp) ไปประมวลผล pureExp คือ (หนี้ + ใช้ชีวิต + ภาษี + อื่นๆ) ซึ่งคำนวณมาแล้วจากด้านบนอย่างแม่นยำ
        let annualExp = pureExp * 12; 
        let diffCI = annualExp * 3; // มาตรฐาน CFP: โรคร้ายแรงควรมีเงินชดเชยรายได้ 3-5 เท่าของรายจ่ายรายปี
        window.diffCI = diffCI;
        runSuccessLeapAnalysis(customerDataForAI, rawAge, sr, dti, netWorth, liquidRatio, investRatio, retirementFocusRatio);

        // 🧠 2. ดึงค่า Persona ปัจจุบันจากช่องชื่อ (รองรับข้อมูลแบบจำลอง) หรือวิเคราะห์จากอาชีพ
        let currentPersona = "Standard";
        let pNameInput = document.getElementById('p_name') ? document.getElementById('p_name').value : '';
        let match = pNameInput.match(/\[จำลอง:\s*(.*?)\]/);
        
        occString = (document.getElementById('p_occ').value || '').toLowerCase();

        if (match && match[1]) {
            currentPersona = match[1];
        } else {
            // สำรอง: หากผู้ใช้พิมพ์ชื่อเอง ให้ AI จัดกลุ่มคร่าวๆ จากคีย์เวิร์ดอาชีพ
            if (occString.includes('รับจ้าง') || occString.includes('โรงงาน') || occString.includes('เกษตร')) currentPersona = 'Informal_Worker';
            else if (occString.includes('แพทย์') || occString.includes('ผู้บริหาร') || occString.includes('เจ้าของ')) currentPersona = 'High_Earner';
            else if (occString.includes('ข้าราชการ') || occString.includes('รัฐวิสาหกิจ')) currentPersona = 'Civil_Servant';
        }

        // 🤖 เรียกใช้งาน AI Engine เพื่อขอคำแนะนำ (ส่ง netCashflow และ rawAge ไปคุมงบประมาณ)
        let netCashflow = totalInc - totalExp;
        let aiRecommendation = getDynamicAIASolutions(diffLife, diffHealth, diffCI, currentPersona, netCashflow, rawAge, safeDisc);

        // ==========================================
        // 🎨 ประกอบร่างกลับเข้าไปใน UI (เปลี่ยนจาก Before/After เป็น 3-Options)
        // ==========================================
        let aiaExplanationHtml = `
            <div class="p-6 bg-gradient-to-br from-gray-50 to-white border-t-2 border-blue-500">
                <h4 class="font-bold text-blue-900 mb-5 flex items-center gap-2"><span class="text-2xl">🎯</span> บทวิเคราะห์และทางเลือกแก้ปัญหา (Financial Problem Solutions)</h4>
                ${aiRecommendation}
            </div>
        `;
        let explanationBox = document.getElementById('aia_protection_explanation');
        if (explanationBox) {
            explanationBox.innerHTML = aiaExplanationHtml;
        }

        let goalsHtml = '';
        let availableBudget = propSave - allocIns; 
        let totalGoalAlloc = 0; 
        let retirementDCA = 0; // 🌟 เก็บยอดออมที่ระบุว่าเป็นเป้าเกษียณ

        parsedGoals.forEach(goal => {
            let allocatedAmount = 0;
            if (availableBudget >= goal.reqMonthlyInvest) {
                allocatedAmount = goal.reqMonthlyInvest;
                availableBudget -= goal.reqMonthlyInvest;
            } else if (availableBudget > 0) {
                allocatedAmount = availableBudget;
                availableBudget = 0;
            }
            
            totalGoalAlloc += allocatedAmount;
            
            // 🌟 เช็คว่าเป็นเป้าหมายเกษียณหรือไม่ เพื่อนำยอดไปแสดงผลในกราฟและตารางพอร์ตได้อย่างถูกต้อง
            let gName = goal.name.toLowerCase();
            if (gName.includes('เกษียณ') || gName.includes('fire') || gName.includes('บำนาญ') || gName.includes('มรดก') || gName.includes('ความมั่งคั่ง')) {
                retirementDCA += allocatedAmount;
            }

            let successProb = goal.reqMonthlyInvest > 0 ? (allocatedAmount / goal.reqMonthlyInvest) * 100 : 100;
            if(successProb > 100) successProb = 100;
            let isAchievable = successProb >= 99;
            
            let priorityText = goal.priority === 1 ? 'สูงสุด (1)' : (goal.priority === 2 ? 'ปานกลาง (2)' : `ทั่วไป (${goal.priority})`);

            let recInst = '';
            let expReturnTxt = '';
            
            // --- Update AIA Specific Instruments Logic ---
            // 🚨 ดักจับผู้สูงวัย ห้ามแนะนำสินทรัพย์เสี่ยงสูงเด็ดขาด
            if(goal.years <= 3) {
                recInst = 'เงินฝากประจำ / พันธบัตรรัฐบาล';
                expReturnTxt = '2-3%';
            } else if(goal.years <= 7) {
                if(riskScore >= 13) {
                    recInst = 'AIA Smart Select / AIA Issara Plus (ปรับสัดส่วนกองทุน) / กองทุนรวมผสม';
                    expReturnTxt = '4-6%';
                } else {
                    recInst = 'AIA Endowment 15/25 / กองทุนตราสารหนี้ระยะกลาง';
                    expReturnTxt = '3-4%';
                }
            } else {
                // เพิ่มเงื่อนไขเช็คอายุ 70 ปีขึ้นไป หรือรับความเสี่ยงได้ต่ำมาก
                if (currentAgeCalc >= 70 || riskScore < 10) {
                    recInst = 'พันธบัตรรัฐบาล / หุ้นกู้เรทติ้งสูง / กองทุนรักษามูลค่าเงินต้น';
                    expReturnTxt = '3-4%';
                } else if (isHNW || (typeof wantUnitLinked !== 'undefined' && wantUnitLinked)) {
                    recInst = 'AIA Infinite Wealth Prestige / AIA Elite Income Prestige / กองทุนรวมต่างประเทศ';
                    expReturnTxt = '7-9%';
                } else if (riskScore >= 16) {
                    recInst = 'AIA Issara Plus / กองทุนรวมหุ้นโลก / AIA Unit Linked';
                    expReturnTxt = '8-10%';
                } else {
                    recInst = 'AIA Excellent / AIA Annuity Sure / กองทุนรวมดัชนี';
                    expReturnTxt = '5-7%';
                }
            }

            // 🧠 [NEW] NLG Smart Goal Recommendations (Content & Time-Horizon Aware)
            
            // กรองประเภทของเป้าหมายจากชื่อ เพื่อความเฉพาะเจาะจงของ NLG
            let goalCategory = "general";
            if (gName.includes('เกษียณ') || gName.includes('fire') || gName.includes('บำนาญ')) goalCategory = "retire";
            else if (gName.includes('รถ') || gName.includes('บ้าน') || gName.includes('คอนโด') || gName.includes('ที่ดิน')) goalCategory = "asset";
            else if (gName.includes('เที่ยว') || gName.includes('แต่งงาน') || gName.includes('กระเป๋า')) goalCategory = "lifestyle";
            else if (gName.includes('สำรอง') || gName.includes('ฉุกเฉิน') || gName.includes('สภาพคล่อง')) goalCategory = "emergency";

            let aiReason = '';
            
            if (goalCategory === "emergency") {
                 aiReason = pickStr([
                     '<b>"เงินสำรองคือถุงลมนิรภัยของชีวิต"</b> ห้ามนำเงินก้อนนี้ไปเสี่ยงในตลาดทุนเด็ดขาด ระบบจึงเลือกเครื่องมือที่เน้นรักษาสภาพคล่อง 100% พร้อมดึงมาใช้เมื่อเกิดวิกฤตทันที',
                     'เป้าหมายนี้ไม่ได้เน้นผลตอบแทน แต่เน้นความปลอดภัยสูงสุด (Safety First) เพื่อเป็นหลังพิงให้คุณไม่ต้องกู้หนี้ยืมสินในวันที่เกิดเหตุฉุกเฉิน'
                 ]);
            } else if (goal.years <= 3) {
                if (goalCategory === "lifestyle") {
                    aiReason = pickStr([
                        'เป้าหมายความสุขระยะสั้น ควรเก็บในสินทรัพย์ผันผวนต่ำ เพื่อรับประกันว่าแผนไลฟ์สไตล์ของคุณจะไม่ถูกยกเลิกกะทันหันเพราะตลาดหุ้นตก',
                        'เวลาใกล้เข้ามาแล้ว การปกป้องเงินต้นสำคัญกว่าการเก็งกำไร เพื่อให้คุณได้ใช้เงินก้อนนี้ตามที่วาดฝันไว้อย่างแน่นอน'
                    ]);
                } else {
                    aiReason = pickStr([
                        'เนื่องจากกรอบเวลาสั้นมาก (Capital Preservation Phase) การนำไปเสี่ยงในตลาดหุ้นอาจทำให้เงินต้นสูญหายและแก้ไขพอร์ตไม่ทันเวลา',
                        'ระยะเวลาไม่เอื้ออำนวยต่อการรับความผันผวน ระบบจึงเน้นเครื่องมือที่ล็อคผลตอบแทนแน่นอนและปกป้องเงินต้นเป็นหลัก'
                    ]);
                }
            } else if (goal.years <= 7) {
                if (goalCategory === "asset") {
                     aiReason = pickStr([
                        'เงินดาวน์ทรัพย์สินขนาดใหญ่ในระยะกลาง ต้องเอาชนะเงินเฟ้อราคาบ้าน/รถ การจัดพอร์ตสมดุล (Balanced) จะช่วยเร่งให้เงินถึงเป้าได้ไวขึ้นโดยไม่เสี่ยงเกินไป',
                        'เพื่อรักษาอำนาจซื้อของเงินก้อนนี้ให้เติบโตทันราคาทรัพย์สินที่พุ่งขึ้นทุกปี การกระจายความเสี่ยงไปในกองทุนผสมคือกลยุทธ์ที่ดีที่สุด'
                     ]);
                } else {
                     aiReason = pickStr([
                        'ช่วงเวลาแบบนี้ต้องใช้ <b>Asset Allocation</b> สู้เงินเฟ้อ โดยผสมผสานระหว่างสินทรัพย์มั่นคงและสินทรัพย์เติบโต เพื่อหาผลตอบแทนระดับกลางที่ปลอดภัย',
                        'กรอบเวลา 3-7 ปี เปิดโอกาสให้เรารับความผันผวนได้พอประมาณ เพื่อสร้าง Alpha Return ให้เงินทำงานได้เร็วกว่าอัตราดอกเบี้ยเงินฝาก'
                    ]);
                }
            } else {
                if (goalCategory === "retire") {
                     aiReason = pickStr([
                        '<b>เป้าหมายเกษียณต้องการพลังของ "ดอกเบี้ยทบต้น" (Compound Interest)</b> การมี Time Horizon ที่ยาวนานช่วยเจือจางความผันผวนของตลาดหุ้นได้ดีเยี่ยม',
                        'เงินก้อนนี้มีไว้ใช้ในอีกหลายสิบปีข้างหน้า การกล้าลงทุนในสินทรัพย์เติบโตสูง (Growth Assets) คือเครื่องมือต้านทาน Medical Inflation ที่ดีที่สุด'
                     ]);
                } else {
                     aiReason = pickStr([
                        'เป้าหมายระยะยาว คุณมีเวลาเป็นเพื่อน (Time Advantage) สามารถขยับระดับความเสี่ยงเพื่อตักตวงผลตอบแทนจากตลาดโลกได้อย่างเต็มที่',
                        'ระยะเวลาที่ยาวนานเปิดโอกาสให้ผ่านวัฏจักรเศรษฐกิจได้หลายรอบ ระบบจึงเน้นสินทรัพย์เสี่ยงเพื่อสร้างการเติบโตแบบก้าวกระโดด'
                     ]);
                }
            }

            // 🚨 [FIX BUG 4] ตรรกะ The Inflation Trap (เตือนภัยเมื่อผลตอบแทนแพ้เงินเฟ้อ)
            // ดึงตัวเลขผลตอบแทนขั้นต่ำที่ AI เพิ่งเลือกให้มาตรวจสอบ (เช่น '3-4%' จะแปลงเป็นเลข 3)
            let expectedReturnNum = parseFloat(expReturnTxt) || 3; 
            let currentInfRate = typeof infRate !== 'undefined' ? infRate : 3.0; // ดึงค่าเงินเฟ้อของระบบ (มาตรฐาน 3%)

            // เงื่อนไข: ถ้าเป็นเป้าหมายระยะยาว (> 5 ปี) แต่ผลตอบแทนแทบไม่ชนะเงินเฟ้อ (ห่างไม่เกิน 0.5%)
            if (goal.years > 5 && expectedReturnNum <= currentInfRate + 0.5) {
                // แทรกคำเตือนสีแดงเข้าไปต่อท้ายคำอธิบายของ AI ทันที
                aiReason += `<br><span class="text-red-600 text-[11px] mt-2 block border-l-2 border-red-500 pl-2 bg-red-50 p-1">⚠️ <b>AI Inflation Alert:</b> การเลือกรับความเสี่ยงต่ำในระยะยาว จะทำให้เกิด <b>"กับดักเงินเฟ้อ (Inflation Trap)"</b> (ผลตอบแทนคาดหวัง ${expReturnTxt} แทบไม่ชนะเงินเฟ้อ ${currentInfRate.toFixed(2)}%) ระบบแนะนำให้ปรับสัดส่วน Asset Allocation ขยับความเสี่ยงขึ้นเล็กน้อยเพื่อปกป้องอำนาจซื้อในอนาคตครับ</span>`;
            }

            // 🧠 [NEW] NLG Trade-off & Reality Check (กรณีเป้าหมายพังทลาย)
            let suggestionHtml = '';
            if (!isAchievable) {
                let shortfallAmt = goal.reqMonthlyInvest - allocatedAmount;
                suggestionHtml = `
                <div class="mt-4 border border-orange-300 rounded-lg overflow-hidden shadow-sm hover-scale">
                    <div class="bg-gradient-to-r from-orange-100 to-red-100 text-orange-900 font-bold p-2 text-sm text-center flex items-center justify-center gap-2 border-b border-orange-200">
                        <span class="text-xl">⚖️</span> <span>AI Reality Check & Trade-off</span>
                    </div>
                    <div class="p-4 bg-white text-sm text-gray-700 leading-relaxed relative">
                        <div class="absolute right-2 top-2 opacity-10 text-4xl">💭</div>
                        ${pickStr([
                            `<b>ทรัพยากรไม่เพียงพอ:</b> งบจัดสรรขาดไปอีก <b><span class="text-red-600">${fmt(shortfallAmt)} บ./ด.</span></b> สำหรับเป้าหมายระดับ ${priorityText} ระบบแนะนำให้คุณ <b>"ยืดระยะเวลาเป้าหมายออกไปอีก 1-3 ปี"</b> หรือ <b>"ลดสเปกเป้าหมายลง"</b> เพื่อความสมจริง`,
                            `<b>เกิดการแย่งชิงกระแสเงินสด (Collision):</b> เพื่อให้ <b>${goal.name}</b> สำเร็จ คุณต้องหารายได้เพิ่มหรือตัดรายจ่ายฟุ่มเฟือยอีก <b><span class="text-red-600">${fmt(shortfallAmt)} บ./ด.</span></b> หากทำไม่ได้ การเลื่อนเวลาออกไปคือทางออกทางคณิตศาสตร์ที่ถูกต้องที่สุด`,
                            `<b>เกินกำลัง ณ ปัจจุบัน:</b> เป้าหมายนี้กำลังกดดันกระแสเงินสด (Shortfall <b><span class="text-red-600">${fmt(shortfallAmt)} บ./ด.</span></b>) นี่คือจุดที่คุณต้องเลือกระหว่าง "ยอมเจ็บปวดลดงบเที่ยว/ไลฟ์สไตล์มาอุด" หรือ "ยอมรับความจริงและลดขนาดเป้าหมายลง"`
                        ])}
                    </div>
                </div>`;
            } else {
                suggestionHtml = `
                <div class="text-sm mt-4 bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 opacity-20 text-6xl">🤖</div>
                    <p class="text-green-800 mb-3 border-b border-green-200 pb-2 text-base">⭐ <b>AI Recommendation (ผ่านเกณฑ์ความปลอดภัย 100%)</b></p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs relative z-10">
                        <div class="bg-white/60 p-2 rounded border border-green-100">
                            <p class="text-gray-500 mb-1 font-bold uppercase tracking-wider">เครื่องมือทางการเงินแนะนำ</p>
                            <p class="font-bold text-blue-800 text-sm">${recInst}</p>
                            <p class="text-green-700 mt-1 font-bold bg-green-100/50 inline-block px-2 py-0.5 rounded">ผลตอบแทนเป้าหมาย: ${expReturnTxt}</p>
                        </div>
                        <div class="md:border-l md:border-green-200 md:pl-4 flex flex-col justify-center">
                            <p class="text-gray-500 mb-1 font-bold uppercase tracking-wider">เหตุผลเชิงจิตวิทยา (AI Analysis)</p>
                            <p class="text-gray-800 leading-relaxed">${aiReason} <br><span class="text-blue-600 mt-1 inline-block">(สอดคล้องกับ Risk Profile ระดับ ${riskLevel})</span></p>
                        </div>
                    </div>
                </div>`;
            }

            // กำหนดสีพื้นหลังและสถานะตามโอกาสสำเร็จ (เขียว, เหลือง, แดง)
            let cardStyle = '';
            let borderStyle = '';
            let badgeStyle = '';
            let statusIcon = '';

            if (successProb >= 85) {
                cardStyle = 'bg-green-50 border-green-200';
                borderStyle = 'border-green-200';
                badgeStyle = 'bg-green-200 text-green-800';
                statusIcon = '✅';
            } else if (successProb >= 50) {
                cardStyle = 'bg-yellow-50 border-yellow-200';
                borderStyle = 'border-yellow-200';
                badgeStyle = 'bg-yellow-200 text-yellow-800';
                statusIcon = '⚠️';
            } else {
                cardStyle = 'bg-red-50 border-red-200';
                borderStyle = 'border-red-200';
                badgeStyle = 'bg-red-200 text-red-800';
                statusIcon = '🛑';
            }

            goalsHtml += `
            <div class="mb-5 p-4 border rounded-xl shadow-sm ${cardStyle}">
                <div class="flex justify-between items-center mb-3 border-b pb-2 ${borderStyle}">
                    <h4 class="font-bold text-lg text-gray-800">🎯 ${goal.name} <span class="text-xs text-gray-500 font-normal ml-2">ความสำคัญ: ${priorityText}</span></h4>
                    <span class="px-3 py-1 text-xs rounded-full font-bold shadow-sm ${badgeStyle}">${statusIcon} โอกาสสำเร็จ ${successProb.toFixed(0)}%</span>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-3">
                        <div class="bg-white p-2 rounded border"><span class="text-gray-500 block text-[11px] lg:text-xs">เป้าหมาย</span><b class="text-gray-800">${fmt(goal.amount)} ฿</b></div>
                        <div class="bg-white p-2 rounded border"><span class="text-gray-500 block text-[11px] lg:text-xs">ระยะเวลา</span><b class="text-gray-800">${goal.years} ปี</b></div>
                        <div class="bg-white p-2 rounded border"><span class="text-gray-500 block text-[11px] lg:text-xs">ออมปกติ</span><b class="text-gray-800">${fmt(goal.reqMonthlyNoInvest)} ฿/ด.</b></div>
                        <div class="bg-white p-2 rounded border border-blue-200"><span class="text-gray-500 block text-[11px] lg:text-xs">ลงทุน (คาด ${goal.targetRoiEst.toFixed(2)}%)</span><b class="text-blue-700 text-base">${fmt(goal.reqMonthlyInvest)} ฿/ด.</b></div>
                        <div class="bg-blue-100 p-2 rounded border border-blue-300 shadow-inner"><span class="text-blue-800 block text-[11px] lg:text-xs font-bold">งบจัดสรรที่ทำได้</span><b class="text-blue-900 text-base">${fmt(allocatedAmount)} ฿/ด.</b></div>
                    </div>
                ${suggestionHtml}
            </div>`;
        });
        
        if(!goalsHtml) goalsHtml = '<p class="text-center text-gray-500 py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">ไม่ได้ระบุเป้าหมายระยะสั้น/กลาง (สามารถเพิ่มได้ในส่วนที่ 3.1)</p>';
        document.getElementById('smart_goals_container').innerHTML = goalsHtml;

        // ==========================================
        // 🧠 6. อัปเกรด Tax Plan ให้รองรับเกณฑ์ปี 2568 (AI Optimized & CFP Standard)
        // ==========================================
        const WHT = expTax * 12; 
        
        // ดึงอายุลูกค้ามาเช็ค (ถ้าไม่มีให้สมมติเป็น 30)
        let safeAgeForTax = typeof rawAge !== 'undefined' ? rawAge : (parseInt(document.getElementById('p_age').value) || 30);
        
        // ✅ [FIX LAYER 5.1: สิทธิผู้สูงอายุ] ถ้าอายุ >= 65 ปี ได้รับยกเว้นเงินได้ 190,000 บาท
        let exemptElderly = safeAgeForTax >= 65 ? 190000 : 0;

        // แยกฐานรายได้ กฎหมายให้หักค่าใช้จ่าย 50% เฉพาะรายได้ Active Income
        let yearlyActiveInc = (typeof incActive !== 'undefined' ? incActive : (inc || 0)) * 12; 
        let yearlyTotalInc = totalInc * 12;

        // หักค่าใช้จ่าย 50% สูงสุดไม่เกิน 100,000 บาท 
        // 🌟 [แก้บั๊ก Case 3: The Non-Deductible Entrepreneur]
        // 1. หักค่าใช้จ่ายเงินเดือน (มาตรา 40(1),(2)) สูงสุด 100,000 บาท
        let deductActive = Math.min(yearlyActiveInc * 0.5, 100000);
        
        // 2. หักค่าใช้จ่ายธุรกิจ (มาตรา 40(8)) แบบเหมา 60% (ไม่มีเพดาน)
        let yearlyBusinessInc = (typeof incBusiness !== 'undefined' ? incBusiness : 0) * 12;
        let deductBusiness = yearlyBusinessInc * 0.60; 
        
        let deductExpense = deductActive + deductBusiness; // นำมารวมกันเป็นค่าใช้จ่ายทั้งหมด
        let deductPersonal = 60000; 
        
        let cTaxSum = 0;
        let customTaxRowsHtml_C = '';
        let currentRetirementTaxUsage = 0; 
        
        document.querySelectorAll('#c_tax_current .custom-row').forEach(row => {
            let name = row.querySelectorAll('input')[0].value || 'รายการลดหย่อนอื่น ๆ';
            let val = parseNum(row.querySelectorAll('input')[1].value) || 0;
            cTaxSum += val;
            customTaxRowsHtml_C += `<tr class="hover:bg-gray-50 text-sm"><td class="py-1 px-3 pl-6 text-gray-700">- ${name}</td><td class="text-right text-red-600">-${fmt(val)}</td><td class="text-right text-red-600">-${fmt(val)}</td></tr>`;
            
            // ✅ [FIX LAYER 1.3: จับรวมกลุ่มเกษียณเช็คเพดาน 500k ตามเกณฑ์สรรพากร]
            let nLower = name.toLowerCase();
            if(nLower.includes('rmf') || nLower.includes('ssf') || nLower.includes('กบข') || 
               nLower.includes('สำรองเลี้ยงชีพ') || nLower.includes('pvd') || nLower.includes('บำนาญ')) {
                currentRetirementTaxUsage += val;
            }
        });

        // นำสิทธิผู้สูงอายุ (exemptElderly) เข้าไปรวมในก้อนลดหย่อนรวมด้วย
        let totalDeductC = deductExpense + deductPersonal + exemptElderly + cTaxSum;

        // คำนวณเงินออมส่วนเกินที่เหลือ เพื่อเอาไปเสนอแผนภาษี (ไม่ให้กระเทือนกระแสเงินสด)
        let yearlyFreeSave = Math.max(0, (propSave - allocIns - totalGoalAlloc - (typeof extraPay !== 'undefined' ? extraPay : 0)) * 12); 
        let availableForTaxSaving = Math.max(0, yearlyFreeSave * 0.8); // ดึงงบมาจัดสรรภาษีได้สูงสุด 80% ของ Free Cash Flow

        // 🌟 [UPGRADE] AI Tax Alpha Optimization: ลดหย่อนแบบหวังผล ไม่ล็อคเงินฟรี!
        let esgLimit = Math.min(yearlyTotalInc * 0.3, 300000); 
        let retirementGroupMaxLegalLimit = Math.min(yearlyTotalInc * 0.3, 500000);
        let rmfRemainingLimit = Math.max(0, retirementGroupMaxLegalLimit - currentRetirementTaxUsage); 
        
        let optimizedThaiESG = 0;
        let optimizedRetirement = 0;
        let remainingFreeSave = availableForTaxSaving;

        // คำนวณรายได้สุทธิก่อนเริ่มปรับแผน (Net Taxable Income)
        let simulatedNetIncome = Math.max(0, yearlyTotalInc - totalDeductC);

        // 🧠 กฎเหล็ก AI: จะลงทุนเพื่อลดหย่อนภาษี ก็ต่อเมื่อฐานภาษีอยู่ระดับ 10% ขึ้นไปเท่านั้น (รายได้สุทธิ > 300,000)
        // ถ้าฐานภาษีแค่ 5% (ประหยัดได้นิดเดียว) AI จะแนะนำให้เก็บเงินสดหรือลงทุนพอร์ตปกติแทนเพื่อรักษาสภาพคล่อง
        while (remainingFreeSave > 1000 && simulatedNetIncome > 300000) {
            // Priority 1: เติม Thai ESG ก่อน เพราะเงื่อนไขถือครองสั้นกว่า (5 ปี) และไม่ไปกินโควต้ากลุ่มเกษียณ
            if (optimizedThaiESG < esgLimit) {
                // คำนวณว่าจะเติมเงินเข้าไปเท่าไหร่เพื่อดึงฐานภาษีลงมา หรือจนกว่าเงินลงทุน/เพดานจะหมด
                let fillAmount = Math.min(remainingFreeSave, esgLimit - optimizedThaiESG, simulatedNetIncome - 300000);
                if (fillAmount > 0) {
                    optimizedThaiESG += fillAmount;
                    remainingFreeSave -= fillAmount;
                    simulatedNetIncome -= fillAmount;
                    continue; // อัปเดตยอดแล้ววนเช็คเงื่อนไขใหม่
                }
            }
            
            // Priority 2: ถ้า ESG เต็มเพดานแล้ว แต่ยังอยู่ในฐาน 10%+ ค่อยมาเติม RMF/SSF
            if (optimizedRetirement < rmfRemainingLimit) {
                let fillAmount = Math.min(remainingFreeSave, rmfRemainingLimit - optimizedRetirement, simulatedNetIncome - 300000);
                if (fillAmount > 0) {
                    optimizedRetirement += fillAmount;
                    remainingFreeSave -= fillAmount;
                    simulatedNetIncome -= fillAmount;
                    continue;
                }
            }
            
            break; // เต็มเพดานทุกอย่างแล้ว หรือหลุดฐาน 10% แล้ว
        }
        
        let totalDeductP = totalDeductC + optimizedThaiESG + optimizedRetirement;

        const taxCurrent = calcThaiTax(yearlyTotalInc - totalDeductC);
        const taxRec = calcThaiTax(yearlyTotalInc - totalDeductP);
        
        let finalTaxC = taxCurrent.tax - WHT;
        let finalTaxP = taxRec.tax - WHT;
        
        const formatFinalTax = (val) => {
            if (val < 0) return `<span class="text-green-500 font-bold">ได้คืน ${fmt(Math.abs(val))}</span>`;
            if (val === 0) return `<span class="text-gray-500 font-bold">พอดี (0.00)</span>`;
            return `<span class="text-red-500 font-bold">จ่ายเพิ่ม ${fmt(val)}</span>`;
        };

        const taxAlpha = taxCurrent.tax - taxRec.tax;

        let netC = Math.max(0, yearlyTotalInc - totalDeductC);
        let netP = Math.max(0, yearlyTotalInc - totalDeductP);

        // ✅ เพิ่มบรรทัดโชว์ "ยกเว้นผู้สูงอายุ" ในตารางแบบไดนามิก (ถ้าอายุถึง 65 บรรทัดนี้จะโผล่มาอัตโนมัติ)
        let elderlyRowHtml = exemptElderly > 0 ? `<tr class="bg-blue-50 text-sm"><td class="py-1 px-3 pl-6 text-blue-800 font-semibold">- ยกเว้นผู้สูงอายุ (65 ปีขึ้นไป)</td><td class="text-right text-red-600">-${fmt(exemptElderly)}</td><td class="text-right text-red-600">-${fmt(exemptElderly)}</td></tr>` : '';

        let taxHtml = `
            <tr class="hover:bg-gray-50"><td class="py-2 px-3 font-semibold text-gray-800">1. รายได้พึงประเมินรวมตลอดปี</td><td class="text-right">${fmt(yearlyTotalInc)}</td><td class="text-right">${fmt(yearlyTotalInc)}</td></tr>
            <tr class="hover:bg-gray-50"><td class="py-2 px-3 font-semibold text-gray-800">2. หัก ค่าใช้จ่าย</td><td class="text-right text-red-600">-${fmt(deductExpense)}</td><td class="text-right text-red-600">-${fmt(deductExpense)}</td></tr>
            <tr class="bg-gray-100"><td colspan="3" class="py-2 px-3 font-semibold text-gray-800">3. หัก รายการลดหย่อนและยกเว้น (อ้างอิงเกณฑ์ปี 2568)</td></tr>
            <tr class="hover:bg-gray-50 text-sm"><td class="py-1 px-3 pl-6 text-gray-700">- ผู้มีเงินได้ (60,000.00 บาท)</td><td class="text-right text-red-600">-${fmt(deductPersonal)}</td><td class="text-right text-red-600">-${fmt(deductPersonal)}</td></tr>
            ${elderlyRowHtml}
            ${customTaxRowsHtml_C}
        `;

        if(optimizedThaiESG > 0 || optimizedRetirement > 0) {
            taxHtml += `<tr class="bg-green-50/50 text-sm"><td class="py-1 px-3 pl-6 text-green-800 font-semibold">+ แผนลดหย่อนเพิ่ม (Optimized AI)</td><td class="text-right text-gray-400">-</td><td class="text-right text-gray-400">-</td></tr>`;
            if(optimizedRetirement > 0) {
                taxHtml += `<tr class="hover:bg-green-50 text-sm"><td class="py-1 px-3 pl-10 text-green-700">- กองทุนรวมเพื่อการเลี้ยงชีพ (RMF/SSF)</td><td class="text-right text-gray-400">0.00</td><td class="text-right text-green-600 font-bold">-${fmt(optimizedRetirement)}</td></tr>`;
            }
            if(optimizedThaiESG > 0) {
                taxHtml += `<tr class="hover:bg-green-50 text-sm"><td class="py-1 px-3 pl-10 text-green-700">- กองทุนรวมไทยเพื่อความยั่งยืน (Thai ESG)</td><td class="text-right text-gray-400">0.00</td><td class="text-right text-green-600 font-bold">-${fmt(optimizedThaiESG)}</td></tr>`;
            }
        }

        taxHtml += `
            <tr class="hover:bg-gray-50 border-t"><td class="py-2 px-3 font-semibold text-blue-800">4. เงินได้สุทธิเพื่อคำนวณภาษี (Net Income)</td><td class="text-right font-bold text-blue-800">${fmt(netC)}</td><td class="text-right font-bold text-blue-800">${fmt(netP)}</td></tr>
            <tr class="hover:bg-gray-50 text-gray-600"><td class="py-2 px-3">5. ภาษีที่คำนวณได้ (ฐาน ${taxCurrent.bracket} -> ${taxRec.bracket})</td><td class="text-right">${fmt(taxCurrent.tax)}</td><td class="text-right">${fmt(taxRec.tax)}</td></tr>
            <tr class="hover:bg-gray-50 text-gray-600"><td class="py-2 px-3">6. หัก ภาษี ณ ที่จ่ายล่วงหน้า (รายเดือน x 12)</td><td class="text-right text-blue-600">-${fmt(WHT)}</td><td class="text-right text-blue-600">-${fmt(WHT)}</td></tr>
            <tr class="bg-gray-800 text-white font-bold"><td class="py-2 px-3">7. สรุปภาษีสิ้นปี (ต้องจ่ายเพิ่ม / <span class="text-green-400">ได้คืน</span>)</td><td class="text-right">${formatFinalTax(finalTaxC)}</td><td class="text-right">${formatFinalTax(finalTaxP)}</td></tr>
        `;
        document.getElementById('tb_tax_body').innerHTML = taxHtml;

        // 🧠 [NLG] Tax Optimization Analysis
        let taxAnalysisText = '';
        if (isHNW) {
            document.getElementById('tax_desc').innerHTML = `การประเมินภาษีเงินได้บุคคลธรรมดา ปี 2568 และโอกาสในการทำ <b>Tax Optimization</b> ผ่านนิติบุคคล (Holding Company) หรือ Offshore Investment`;
            taxAnalysisText = `<h4 class="font-bold text-orange-800 text-lg mb-1">ผลประเมินการวางแผนภาษีระดับ HNW</h4>
                               <p class="text-sm text-orange-900">${pickStr([
                                   `รายได้ของคุณอยู่ในฐานภาษีขั้นสูง (${taxCurrent.bracket}) ขอแนะนำให้พิจารณาการโอนสินทรัพย์เข้าสู่ <b>นิติบุคคล (Holding Company)</b> เพื่อจัดการฐานภาษี หรือลงทุนผ่าน <b>AIA Unit Linked</b> ที่ให้สิทธิประโยชน์ปกป้องภาษีมรดก`,
                                   `ด้วยฐานภาษีที่สูง (${taxCurrent.bracket}) การลดหย่อนทั่วไปอาจไม่เพียงพอ กลยุทธ์การสร้าง <b>Tax Shield ผ่านกรมธรรม์พรีเมียม (AIA Infinite Wealth Prestige)</b> คือทางออกที่จะช่วยรักษามรดกของกงสีให้สมบูรณ์ที่สุด`,
                                   `ระบบแนะนำให้ยกระดับจากการลดหย่อนธรรมดา สู่การวางโครงสร้าง <b>Wealth Transfer</b> ควบคู่กับการใช้กองทุน Thai ESG เต็มสิทธิ์ เพื่อลดแรงเสียดทานทางภาษีอย่างยั่งยืน`
                               ])}</p>`;
        } else if(taxAlpha > 0) {
            taxAnalysisText = `<h4 class="font-bold text-orange-800 text-lg mb-1">ผลประเมินการวางแผนภาษี: สร้าง Tax Alpha ได้ ${fmt(taxAlpha)} บาท/ปี</h4>
                               <p class="text-sm text-orange-900">${pickStr([
                                   `นำเงินออมส่วนเกินลงทุนใน <b>Thai ESG / RMF / SSF</b> เพื่อดึงเงินคืนภาษีกลับมาลงทุนต่อ ซึ่งเปรียบเสมือนผลตอบแทนไร้ความเสี่ยงตั้งแต่เริ่มลงทุน`,
                                   `คุณกำลังทิ้งเงินไว้บนโต๊ะ! การปรับแผนลดหย่อนใหม่จะช่วยประหยัดเงินได้ ${fmt(taxAlpha)} บาท นำเงินก้อนนี้ไป Re-invest ในกองทุนรวม จะช่วยให้คุณเกษียณได้เร็วขึ้น`,
                                   `แผนการลดหย่อนที่ AI ปรับปรุงให้ จะสร้าง "กำไรส่วนเพิ่ม (Alpha)" จากโครงสร้างภาษีของคุณ นำเงินที่ได้คืนมาเสริมสภาพคล่องหรือโปะหนี้จะเกิดประโยชน์สูงสุด`
                               ])}</p>`;
        } else {
             taxAnalysisText = `<h4 class="font-bold text-blue-800 text-lg mb-1">ผลประเมินการวางแผนภาษี: รักษาสภาพคล่องเป็นหลัก</h4>
                               <p class="text-sm text-blue-900">${pickStr([
                                   `ฐานภาษีของคุณปัจจุบันอยู่ในระดับ 5% หรือยกเว้นภาษี การนำเงินไปล็อกใน RMF/SSF เพื่อลดหย่อนจึง <b class="text-red-600">ไม่คุ้มค่ากับสภาพคล่องที่เสียไป</b> ระบบแนะนำให้นำเงินไปลงทุนในพอร์ตปกติแทนครับ`,
                                   `ปัจจุบันโครงสร้างภาษีของคุณมีประสิทธิภาพดีแล้ว AI แนะนำไม่ให้ซื้อกองทุนลดหย่อนภาษีเพิ่ม เพื่อไม่ให้เงินถูกล็อกยาวเกินความจำเป็น โฟกัสหลักคือพอร์ตการลงทุนที่ยืดหยุ่นกว่าครับ`,
                                   `เนื่องจากสิทธิประโยชน์ทางภาษีไม่ใช่ประเด็นเร่งด่วน (ฐานภาษีต่ำกว่า 10%) คุณจึงมีอิสระในการเลือกเครื่องมือการลงทุนได้หลากหลายโดยไม่ต้องกังวลเรื่องระยะเวลาถือครองตามกฎหมายสรรพากร`
                               ])}</p>`;
        }
        document.getElementById('tax_analysis_card').innerHTML = taxAnalysisText;

        const lifeExp = Number(document.getElementById('r_lifeExp').value) || 85;
        const roi = Number(document.getElementById('r_preRet').value) || 6;
        
        const roi_neg = -2; 

        if(simChart) simChart.destroy();
        let labels = [], dataC = [], dataR = [], dataR_inf = [], dataR_neg = [], dataDIY = [];
        let wC = astInvest + astOffshore, wR = astInvest + astOffshore, wR_inf = astInvest + astOffshore, wR_neg = astInvest + astOffshore, wDIY = astInvest + astOffshore;
        let tableHtml = '';

        let depleteAge_normal = lifeExp + 1;
        let depleteAge_inf = lifeExp + 1;
        let depleteAge_neg = lifeExp + 1;
        let depleteAge_current = lifeExp + 1;
        let wC_at_ret = 0;
        let wR_at_ret = 0;

        let currentInvestAmt = 0;
        let currentWeightedRoi = 0;
        let currentWeightedSd = 0;

        document.querySelectorAll('#c_invest_current .custom-row').forEach(row => {
            let inputs = row.querySelectorAll('input, select');
            let val = parseNum(inputs[1].value) || 0;
            let rowRoi = parseNum(inputs[2].value) || 0;
            let obj = inputs[3].value || '';
            if (val > 0) {
                currentInvestAmt += val;
                currentWeightedRoi += (val * rowRoi);
                // --- ปรับลอจิกความเสี่ยง (SD) ตามธรรมชาติของเป้าหมาย ---
                let rowSd = rowRoi * 1.5; // ค่ามาตรฐาน
                if(obj.includes('เกษียณ')) {
                    rowSd = rowRoi * 1.0; // พอร์ตเกษียณเน้นความมั่นคง ความผันผวน(SD) ต่ำกว่า
                } else if(obj.includes('เติบโต')) {
                    rowSd = rowRoi * 2.2; // พอร์ตเติบโตเน้น Aggressive ความผันผวน(SD) สูงกว่า
                }
                currentWeightedSd += (val * rowSd);
            }
        });

        let currentPortfolioRoiEst = currentInvestAmt > 0 ? (currentWeightedRoi / currentInvestAmt) : 1.5;
        
        // 1. คำนวณ SD แบบถ่วงน้ำหนักเส้นตรง (ค่าตั้งต้นที่เสี่ยงเกินจริง)
        let baseWeightedSd = currentInvestAmt > 0 ? (currentWeightedSd / currentInvestAmt) : Math.max(currentPortfolioRoiEst * 1.5, 2);

        // 2. นับจำนวนรายการสินทรัพย์ที่มีในพอร์ต เพื่อดูว่าลูกค้ามีการกระจายความเสี่ยงหรือไม่
        let activeAssetCount = 0;
        document.querySelectorAll('#c_invest_current .custom-row').forEach(row => {
            let v = parseNum(row.querySelectorAll('input, select')[1].value) || 0;
            if (v > 0) activeAssetCount++;
        });

        // 3. หักส่วนลดความผันผวน (Correlation Effect) ถ้ากระจายการลงทุนเยอะ ความผันผวนรวมของพอร์ต (SD) จะต้องลดลง
        let divMultiplier = 1.0; // ค่าเริ่มต้น (มีสินทรัพย์เดียว = ไม่กระจายความเสี่ยง)
        if (activeAssetCount === 2) {
            divMultiplier = 0.90; // กระจาย 2 กอง ลด SD ลง 10%
        } else if (activeAssetCount === 3) {
            divMultiplier = 0.85; // กระจาย 3 กอง ลด SD ลง 15%
        } else if (activeAssetCount >= 4) {
            divMultiplier = 0.80; // กระจาย 4 กองขึ้นไป ลด SD ลง 20% (Max Benefit)
        }

        // 4. ได้ค่า SD ที่แท้จริงและสมเหตุสมผลตามหลัก CFP
        let currentSdEst = baseWeightedSd * divMultiplier;

        // แทรกการอัปเดตตัวเลขผลตอบแทนในหัวตารางตรงนี้ครับ
        if(document.getElementById('th_sim_rec')) {
            document.getElementById('th_sim_rec').innerHTML = `พอร์ตปรับปรุง ⭐<br><span class="text-[10px] font-normal">(${targetRoiEst.toFixed(1)}%)</span>`;
            document.getElementById('th_sim_cur').innerHTML = `พอร์ตปัจจุบัน<br><span class="text-[10px] font-normal">(${currentPortfolioRoiEst.toFixed(1)}%)</span>`;
            document.getElementById('th_sim_inf').innerHTML = `สู้เงินเฟ้อ<br><span class="text-[10px] font-normal">(${(targetRoiEst * 0.7).toFixed(1)}%)</span>`;
        }

        let altRatio = netWorth > 0 ? (astAlt / netWorth) : 0;
        let isAltHeavy = altRatio > 0.15; 
        let skew = isAltHeavy ? -0.8 : 0;
        let kurt = isAltHeavy ? 3.0 : 0;
        let jumpF = isAltHeavy ? 0.05 : 0.01; 
        let jumpM = -0.25; 
        let jumpS = 0.10;

        let currentYearlyRetExp_base = (parseNum(document.getElementById('r_reqInc').value) * 12) || 360000;
        let essentialExpensesFloor = currentYearlyRetExp_base * 0.6; 
        let IWR = 0;
        let currentDynamicWithdrawal = currentYearlyRetExp_base;
        let lastYearRoiR = targetRoiEst/100;
        let currentExtraPay = typeof extraPay !== 'undefined' ? extraPay : 0;
        
        let netCashflowYearly = (totalInc - totalExp) * 12;
        // ❌ (ลบเศษโค้ด if (netCashflowYearly < 0) ที่แอบเรียกตัวแปรผิดลำดับออกไปแล้ว) 

        let annualDebtPayment = (propDebt + currentExtraPay) * 12;
        let avgDebtInterest = 0.06; 
        if (typeof totalLiab !== 'undefined' && totalLiab > 0) {
            let shortTermRatio = (typeof liabShort !== 'undefined' ? liabShort : 0) / totalLiab;
            if (shortTermRatio > 0.5) avgDebtInterest = 0.16; 
            else if (shortTermRatio > 0) avgDebtInterest = 0.10; 
        }

        let yearsToPayoff = 0;
        
        // ============================================================
        // 🌟 [แก้บั๊ก 100%] ตรรกะ DCA ให้ยอมรับการติดลบ (ถอนเงินกินทุน)
        // ============================================================
        
        // 1. ใช้ยอดเงินออมเพื่อเกษียณที่ "จัดสรรงบได้จริง (Allocated)" ไม่ใช่ยอดอุดมคติ
        let actualRetirementDCA = typeof retirementDCA !== 'undefined' ? retirementDCA : 0;
        
        // 2. คำนวณเงินออมส่วนเหลือทั้งหมด (หักเบี้ยประกัน และเป้าหมายอื่นๆ ออกไปแล้ว)
        let fallbackAvailableBudget = propSave - allocIns - (typeof totalGoalAlloc !== 'undefined' ? totalGoalAlloc : 0);
        if (fallbackAvailableBudget < 0) fallbackAvailableBudget = 0;

        // 3. ป้องกัน Double Counting: หักรายได้จากสินทรัพย์ (Passive Income) ออกจากเงินที่จะเอาไปทบต้น
        let monthlyPassiveIncome = typeof incPassive !== 'undefined' ? incPassive : 0;
        let totalMonthlyDCA = actualRetirementDCA + fallbackAvailableBudget;
        let trueDCAWithoutDoubleCount = Math.max(0, totalMonthlyDCA - monthlyPassiveIncome);

        // 4. หายอด DCA พอร์ตเกษียณที่แท้จริง (ประกาศตัวแปรให้เรียบร้อยก่อนเรียกใช้)
        let actualRetirementSave_R = 0;
        let actualRetirementSave_C = 0;

        if (netCashflowYearly < 0) {
            // 🚨 เงินช็อต: ถอนเงินกินทุน (ยอดติดลบ) ไม่สนใจ DCA
            actualRetirementSave_C = netCashflowYearly;
            actualRetirementSave_R = netCashflowYearly;
        } else {
            // ✅ [ฝั่งแผนแนะนำ - Proposed] กวาดเงินออมที่เหลือจากสมการ AI โยนเข้าพอร์ตหลัก
            actualRetirementSave_R = trueDCAWithoutDoubleCount * 12;
            
            // ✅ [ฝั่งพอร์ตปัจจุบัน - Current] ตรรกะใหม่: "กวาดเงินสุทธิทั้งหมดบังคับยัดเข้าพอร์ต"
            // นำ "เงินออมที่ระบุ (expSave)" มารวมกับ "เงินเหลือในบัญชีที่ไม่ได้ระบุ (Net Cashflow)"
            let netCashflowMonthly = totalInc - totalExp; 
            let totalCurrentFreeCash = expSave + Math.max(0, netCashflowMonthly); 
            
            // นำเงินกองรวมทั้งหมด มาหักลบค่าประกัน, เป้าหมายอื่นๆ และหนี้
            actualRetirementSave_C = (totalCurrentFreeCash - monthlyInsPrem - (typeof totalGoalAlloc !== 'undefined' ? totalGoalAlloc : 0) - currentExtraPay) * 12;
            
            // คุมไม่ให้ยอดติดลบ (Safety Guard)
            actualRetirementSave_C = Math.max(0, actualRetirementSave_C);
        }

        // เชื่อมตัวแปรเก่าเผื่อมีฟังก์ชันอื่นดึงไปใช้
        let baseAnnualSavings = actualRetirementSave_R;
        // 🌟 [อัปเกรด] วิเคราะห์กระแสเงินสดรับยามเกษียณแยกตามช่วงอายุ (Dynamic Pension Streams)
        let pensionStreams = [];
        
        // 1. ประกันสังคม (เริ่มจ่ายอายุ 55) สมมติฐานบำนาญชราภาพสูงสุดประมาณ 5,000 บ./เดือน
        if (welfare.includes('ประกันสังคม')) {
            pensionStreams.push({ name: "บำนาญชราภาพ (ประกันสังคม)", startAge: 55, yearlyAmount: 60000 });
        }
        
        // 2. บำนาญข้าราชการ / กบข. (เริ่มจ่ายตามอายุเกษียณราชการ 60)
        if (occString.includes('ข้าราชการ') || welfare.includes('สิทธิข้าราชการ')) {
            let civilPension = (totalInc * 12) * 0.5; // สมมติบำนาญ = 50% ของเงินเดือนเดือนสุดท้าย
            pensionStreams.push({ name: "บำนาญข้าราชการ", startAge: 60, yearlyAmount: civilPension });
        }

        // 3. บำนาญจากประกันชีวิตส่วนตัว (ดึงจากตารางที่ FA กรอก)
        document.querySelectorAll('#c_ins .custom-row').forEach(row => { 
            let type = row.querySelector('.col-ins-type').value || '';
            let val = parseNum(row.querySelector('.col-ins-val').value) || 0; 
            
            if (type.includes('บำนาญ') && val > 0) {
                // หากไม่ได้กรอกปีเริ่มต้น ให้ผูกกับอายุเกษียณ (retAge) อัตโนมัติ
                let startYearTh = parseInt(row.querySelector('.col-ins-start').value) || 0;
                let annuityStartAge = retAge; 
                
                // ถ้าระบุเป็นเลขอายุ 2 หลัก ให้ใช้อายุนั้นเลย (เช่น กรอก 55 หรือ 60)
                if (startYearTh > 0 && startYearTh < 100) {
                    annuityStartAge = startYearTh;
                } 
                pensionStreams.push({ name: "ประกันชีวิตแบบบำนาญ", startAge: annuityStartAge, yearlyAmount: val });
            }
        });
        // ---------------------------------------------------------------------
        // 💸 3. [CASHFLOW] Cashflow Release Engine (อัปเกรดรองรับหนี้ธุรกิจ/Lombard)
        // ---------------------------------------------------------------------
        let currentAge_5Y = parseInt(document.getElementById('p_age') ? document.getElementById('p_age').value : 35) || 35;
        let retAge_5Y = parseInt(document.getElementById('r_retAge') ? document.getElementById('r_retAge').value : 60) || 60;
        let annualDebtPmtTotal = (typeof propDebt !== 'undefined' ? propDebt : 0) * 12;

        // 🚨 [NEW] เพิ่มถัง interestOnly ที่ตั้งอายุไว้ 99 ปี (ไม่หมดใน 5 ปี และจ่ายแต่ดอกเบี้ย)
        let debtBuckets = {
            shortTerm: { val: 0, assumeYears: 1 }, 
            car: { val: 0, assumeYears: 5 }, 
            home: { val: 0, assumeYears: Math.max(10, retAge_5Y - currentAge_5Y) }, 
            other: { val: 0, assumeYears: 10 },
            interestOnly: { val: 0, assumeYears: 99 } 
        };

        if(document.getElementById('c_liab')) {
            document.getElementById('c_liab').querySelectorAll('.data-row, .input-row').forEach(row => {
                let cat = row.dataset.cat || "";
                let nameInput = row.querySelector('.col-name');
                let valInput = row.querySelector('.col-val');
                let name = nameInput ? nameInput.value.toLowerCase() : "";
                let val = valInput ? Number(valInput.value.replace(/,/g, '')) || 0 : 0;

                // 🚨 ดักจับ Keyword หี้ธุรกิจ หรือ Lombard Loan ให้อยู่ในถัง Interest-Only
                if (name.includes("lombard") || name.includes("margin") || name.includes("ธุรกิจ") || name.includes("od") || name.includes("เบิกเกินบัญชี") || cat.includes("ธุรกิจ")) {
                    debtBuckets.interestOnly.val += val;
                }
                else if (cat.includes("สั้น") || name.includes("บัตร") || name.includes("บุคคล") || name.includes("นอกระบบ")) debtBuckets.shortTerm.val += val;
                else if (name.includes("รถ")) debtBuckets.car.val += val;
                else if (cat.includes("ยาว") || name.includes("บ้าน") || name.includes("คอนโด") || name.includes("ที่อยู่")) debtBuckets.home.val += val;
                else debtBuckets.other.val += val;
            });
        }

        // ประเมินยอดผ่อนต่อปีเพื่อนำไปหาน้ำหนัก (Weight)
        let estPmtShort = debtBuckets.shortTerm.val / debtBuckets.shortTerm.assumeYears;
        let estPmtCar   = debtBuckets.car.val / debtBuckets.car.assumeYears;
        let estPmtHome  = debtBuckets.home.val / debtBuckets.home.assumeYears;
        let estPmtOther = debtBuckets.other.val / debtBuckets.other.assumeYears;
        // 🚨 หนี้ธุรกิจ สมมติว่าจ่ายแต่ดอกเบี้ยเฉลี่ย 5% ต่อปี เพื่อเอายอดไปคำนวณ Weight
        let estPmtInterestOnly = debtBuckets.interestOnly.val * 0.05; 
        
        let totalEstPmt = (estPmtShort + estPmtCar + estPmtHome + estPmtOther + estPmtInterestOnly) || 1;

        let actualPmtShort = annualDebtPmtTotal * (estPmtShort / totalEstPmt);
        let actualPmtCar   = annualDebtPmtTotal * (estPmtCar / totalEstPmt);
        let actualPmtHome  = annualDebtPmtTotal * (estPmtHome / totalEstPmt);
        let actualPmtOther = annualDebtPmtTotal * (estPmtOther / totalEstPmt);
        let actualPmtInterestOnly = annualDebtPmtTotal * (estPmtInterestOnly / totalEstPmt); // 🚨 ยอดผ่อนส่วนหนี้ธุรกิจ

        // 🌟 [ตรรกะที่ 1] จำลอง Schedule ปลดหนี้เพื่อนำกระแสเงินสดกลับมาทบต้น (Liberation)
        // นำยอดผ่อนคูณ 12 เพื่อให้เป็นยอดต่อปี ส่งเข้า Web Worker
        let debtSchedules = [
            { payoffYear: debtBuckets.shortTerm.assumeYears, amount: actualPmtShort * 12 },
            { payoffYear: debtBuckets.car.assumeYears, amount: actualPmtCar * 12 },
            { payoffYear: debtBuckets.home.assumeYears, amount: actualPmtHome * 12 },
            { payoffYear: debtBuckets.other.assumeYears, amount: actualPmtOther * 12 }
        ];

        // 🌟 [ตรรกะที่ 3] ตั้งเป้าหมาย Cash Buffer (กันชนเกษียณ) ไว้ที่ 2 ปีของรายจ่ายเกษียณเริ่มต้น
        let yearsToRet = Math.max(0, retAge - rawAge);
        let inflatedRetExpForBuffer = currentYearlyRetExp_base * Math.pow(1 + (infRate/100), yearsToRet);
        let initialCashBufferTarget = inflatedRetExpForBuffer * 2; 

        // สร้าง Parameter สำหรับพอร์ตแนะนำ
        let mcParams = {
            iterations: 2000,
            initialWealth: astInvest + astOffshore,
            baseExpense: currentYearlyRetExp_base,
            floorExpense: essentialExpensesFloor,
            annualSavings: actualRetirementSave_R,
            targetRoi: targetRoiEst/100,
            sdEst: sdEst/100,
            infRate: infRate/100,
            medInfRate: (parseFloat(document.getElementById('r_med_inf').value) || 6.0) / 100,
            
            // 🌟 แทรก 3 ตรรกะใหม่เข้าไปใน Engine
            infSd: 0.015, // [ตรรกะที่ 2] ความผันผวนเงินเฟ้อที่ 1.5%
            debtSchedules: debtSchedules, // [ตรรกะที่ 1]
            cashBufferTarget: initialCashBufferTarget, // [ตรรกะที่ 3]

            skew: skew,
            kurt: kurt,
            jumpF: jumpF,
            jumpM: jumpM,
            jumpS: jumpS,
            rawAge: rawAge,
            retAge: retAge,
            lifeExp: lifeExp,
            pensionStreams: pensionStreams 
        };

        // สร้าง Parameter สำหรับพอร์ตปัจจุบัน (เพื่อให้คำนวณแยกกัน)
        let mcParamsCurrent = {
            ...mcParams,
            annualSavings: actualRetirementSave_C,
            targetRoi: currentPortfolioRoiEst/100,
            sdEst: currentSdEst/100,
            // ในพอร์ตแบบปัจจุบัน จะไม่มีการจัดการหนี้แบบใหม่และไม่มีการจัดถัง Cash Buffer ให้
            debtSchedules: [], 
            cashBufferTarget: 0 
        };

        window.simData = mcParams; // บันทึกค่าตั้งต้นให้พอร์ต DIY

        let finalMcProb = 0;
        let currentMcProb = 0;
        if(progressBar) {
            loadText.innerText = "⚡ Running True Monte Carlo (Proposed Plan) ...";
            finalMcProb = await runMonteCarloWorker(mcParams, (percent) => {
                progressBar.style.width = (30 + (percent * 0.35)) + '%';
            });
            loadText.innerText = "⚡ Running True Monte Carlo (Current Plan) ...";
            currentMcProb = await runMonteCarloWorker(mcParamsCurrent, (percent) => {
                progressBar.style.width = (65 + (percent * 0.35)) + '%';
            });
            progressBar.style.width = '100%';
            loadText.innerText = "✅ Optimization Complete!";
            await new Promise(r => setTimeout(r, 400));
        } else {
            finalMcProb = await runMonteCarloWorker(mcParams);
            currentMcProb = await runMonteCarloWorker(mcParamsCurrent);
        }

        if(document.getElementById('td_prob_rec')) {
        // แสดงผลเป็นช่วง CI 95%
        document.getElementById('td_prob_diy').innerText = calculateCI95(finalMcProb, mcParams.iterations);
        document.getElementById('td_prob_rec').innerText = calculateCI95(finalMcProb, mcParams.iterations);
        document.getElementById('td_prob_cur').innerText = calculateCI95(currentMcProb, mcParamsCurrent.iterations);
            
        // ปรับลดขนาดฟอนต์จาก text-lg เป็น text-base เพื่อรองรับข้อความที่ยาวขึ้น
        document.getElementById('td_prob_diy').className = "py-3 px-2 text-right font-black text-purple-700 text-base";
        document.getElementById('td_prob_rec').className = "py-3 px-2 text-right font-black text-blue-700 text-base";
        document.getElementById('td_prob_cur').className = "py-3 px-2 text-right font-bold text-gray-600 text-base";
        }

        let currentRegimeChart = 1; 

        for(let i = rawAge; i <= lifeExp; i++) {
            labels.push('อายุ ' + i);
            dataC.push(wC); dataR.push(wR); dataR_inf.push(wR_inf); dataR_neg.push(wR_neg);
            
            let pensionText = '-';
            let aaText = '';

            // ==========================================
            // 🧠 Dynamic Glide Path Logic (UI & Chart Rendering)
            // ==========================================
            let dynamicRoi = targetRoiEst / 100;
            let dynamicSd = sdEst / 100;
            
            let glideStartAge = retAge - 10;
            let glideEndAge = retAge;
            
            let floorRoi = Math.max(0.03, (targetRoiEst / 100) - 0.04);
            let floorSd = Math.max(0.04, (sdEst / 100) * 0.4);

            if (i <= glideStartAge) {
                // 🟢 Accumulation Phase
                dynamicRoi = targetRoiEst / 100;
                dynamicSd = sdEst / 100;
            } else if (i >= glideEndAge) {
                // 🔵 Preservation Phase
                dynamicRoi = floorRoi;
                dynamicSd = floorSd;
            } else {
                // 🟡 Transition Phase
                let progress = (i - glideStartAge) / (glideEndAge - glideStartAge);
                dynamicRoi = (targetRoiEst / 100) - (progress * ((targetRoiEst / 100) - floorRoi));
                dynamicSd = (sdEst / 100) - (progress * ((sdEst / 100) - floorSd));
            }

            currentRegimeChart = getNextRegime(currentRegimeChart);

            if(i < retAge) {
                // ช่วงสะสม: ใช้ค่า Dynamic
                let currentRoi = getAdvancedReturn(dynamicRoi, dynamicSd, skew, kurt, jumpF, jumpM, jumpS, currentRegimeChart);
                let currentRoiInf = getAdvancedReturn(dynamicRoi * 0.7, dynamicSd, skew, kurt, jumpF, jumpM, jumpS, currentRegimeChart);
                let currentRoiNeg = getNormallyDistributedRandom(roi_neg/100, dynamicSd);

                let currentRoi_C = getAdvancedReturn(currentPortfolioRoiEst/100, currentSdEst/100, 0, 0, 0, 0, 0, currentRegimeChart);

                lastYearRoiR = currentRoi; 

                // 🌟 [แก้บั๊ก Case 2: The Immortal Debt (Debt Snowball)]
                let currentYearSavings_R = (i - rawAge < yearsToPayoff) ? baseAnnualSavings : (baseAnnualSavings + annualDebtPayment);
                
                wC = (wC * (1 + currentRoi_C)) + actualRetirementSave_C;
                wR = (wR * (1 + currentRoi)) + currentYearSavings_R;
                wR_inf = (wR_inf * (1 + currentRoiInf)) + currentYearSavings_R;
                wR_neg = (wR_neg * (1 + currentRoiNeg)) + currentYearSavings_R;
                pensionText = 'ช่วงสะสม';
            } else {
                // ช่วงถอนเงินหลังเกษียณ
                let postRetRoi = Math.max(getAdvancedReturn(dynamicRoi, dynamicSd, skew/2, kurt/2, jumpF/2, jumpM, jumpS, currentRegimeChart), -0.3); 
                let postRetRoi_inf = Math.max(getAdvancedReturn(dynamicRoi * 0.7, dynamicSd, skew/2, kurt/2, jumpF/2, jumpM, jumpS, currentRegimeChart), -0.3);
                let postRetRoi_neg = getNormallyDistributedRandom(roi_neg/100, dynamicSd);
                let postRetRoi_C = Math.max(getAdvancedReturn(currentPortfolioRoiEst/100 - 0.01, currentSdEst/200, 0, 0, 0, 0, 0, currentRegimeChart), -0.3);
                let yearsFromNow = i - rawAge; 
                let inflatedExp = currentYearlyRetExp_base * Math.pow(1 + (infRate/100), yearsFromNow);

                if (i === retAge) {
                    wC_at_ret = wC;
                    wR_at_ret = wR;
                    currentDynamicWithdrawal = inflatedExp; 
                    IWR = currentDynamicWithdrawal / (wR || 1);
                    
                    // 🛡️ บังคับเพดานการถอนเงินให้กราฟเส้น
                    const SWR_CAP = 0.06;
                    if (IWR > SWR_CAP) IWR = SWR_CAP;
                    if (IWR <= 0) IWR = 0.04; 
                    
                } else {
                    let proposedWithdrawal = currentDynamicWithdrawal * (1 + infRate/100);
                    if (lastYearRoiR < 0) {
                        proposedWithdrawal = currentDynamicWithdrawal;
                    }
                    let CWR = proposedWithdrawal / (wR || 1);
                    if (CWR > IWR * 1.20) {
                        proposedWithdrawal = proposedWithdrawal * 0.90; 
                        if (proposedWithdrawal < essentialExpensesFloor) proposedWithdrawal = essentialExpensesFloor;
                    } else if (CWR < IWR * 0.80) {
                        proposedWithdrawal = proposedWithdrawal * 1.10; 
                    }
                    currentDynamicWithdrawal = proposedWithdrawal;
                }

                lastYearRoiR = postRetRoi;
                
                let currentYearlyPension = 0;
                if (mcParams.pensionStreams) {
                    mcParams.pensionStreams.forEach(p => {
                        if (i >= p.startAge) currentYearlyPension += p.yearlyAmount;
                    });
                }

                pensionText = fmt(currentDynamicWithdrawal / 12);
                if (currentYearlyPension > 0) {
                    pensionText += `<br><span class="text-[9px] text-green-600 font-bold bg-green-50 px-1 rounded border border-green-200">(มีบำนาญช่วย ${fmt(currentYearlyPension/12)})</span>`;
                }

                let actualWithdraw_C = Math.max(0, inflatedExp - currentYearlyPension);
                let actualWithdraw_R = Math.max(0, currentDynamicWithdrawal - currentYearlyPension);
                let actualWithdraw_Inf = Math.max(0, inflatedExp - currentYearlyPension);
                let actualWithdraw_Neg = Math.max(0, inflatedExp - currentYearlyPension);

                if (typeof retAge !== 'undefined' && typeof rawAge !== 'undefined') {
                    if (i >= retAge + 10 && i % 5 === 0) {
                        let medInfRate = typeof r_med_inf !== 'undefined' ? (r_med_inf / 100) : 0.08;
                        let medicalShockAmt = 500000 * Math.pow(1 + medInfRate, (i - rawAge)); 
                        
                        actualWithdraw_R += medicalShockAmt;
                        actualWithdraw_C += medicalShockAmt;
                        actualWithdraw_Inf += medicalShockAmt;
                        actualWithdraw_Neg += medicalShockAmt;
                    }
                }

                let hw_C = actualWithdraw_C / 2;
                let hwR = actualWithdraw_R / 2;
                let hw_inf = actualWithdraw_Inf / 2;
                let hw_neg = actualWithdraw_Neg / 2;

                if (wC < actualWithdraw_C) {
                    wC = 0; 
                    if (depleteAge_current > lifeExp) depleteAge_current = i; 
                } else wC = (wC - hw_C) * (1 + postRetRoi_C) - hw_C;

                if (wR < actualWithdraw_R) {
                    wR = 0; 
                    if (depleteAge_normal > lifeExp) depleteAge_normal = i; 
                } else wR = (wR - hwR) * (1 + postRetRoi) - hwR;

                if (wR_inf < actualWithdraw_Inf) {
                    wR_inf = 0; 
                    if (depleteAge_inf > lifeExp) depleteAge_inf = i; 
                } else wR_inf = (wR_inf - hw_inf) * (1 + postRetRoi_inf) - hw_inf;

                if (wR_neg < actualWithdraw_Neg) {
                    wR_neg = 0; 
                    if (depleteAge_neg > lifeExp) depleteAge_neg = i; 
                } else wR_neg = (wR_neg - hw_neg) * (1 + postRetRoi_neg) - hw_neg;
            }

            dataDIY.push(wR); 

            // 🌟 สร้างข้อความสัดส่วนลงทุนตามเงื่อนไขที่กำหนด
            let dcaMonthly_R = actualRetirementSave_R / 12;
            let actionDCA = "";
            
            if (i < retAge) {
                // ช่วงสะสม
                if (dcaMonthly_R > 0) {
                    actionDCA = `ออมเพิ่ม (DCA): ${fmt(dcaMonthly_R)} ฿/ด.`;
                } else if (dcaMonthly_R === 0) {
                    actionDCA = `<span class="text-gray-500 font-bold">ไม่ได้ออมเพิ่ม (DCA: 0)</span>`;
                } else {
                    actionDCA = `<span class="text-red-500 font-bold">ถอนเงินกินทุน: ${fmt(Math.abs(dcaMonthly_R))} ฿/ด.</span>`;
                }
            } else {
                // ช่วงหลังเกษียณ (เช็คก่อนว่ามีเงินในพอร์ตให้ถอนไหม)
                if (wR > 0) {
                    actionDCA = `ถอนออกใช้: ${fmt(currentDynamicWithdrawal/12)} ฿/ด.`;
                } else {
                    actionDCA = `<span class="text-red-600 font-bold">⚠️ เงินหมดพอร์ต (0 ฿)</span>`;
                }
            }

            aaText = `<b>${actionDCA}</b><br>ผลตอบแทน: ${(dynamicRoi*100).toFixed(2)}% | ความผันผวน: ${(dynamicSd*100).toFixed(2)}%<br>หุ้นเติบโตทั่วโลก / สินทรัพย์ทางเลือก`;

            // ตรวจสอบเงื่อนไข แถวแรก, ทุกๆ 5 ปี, ปีเกษียณ, ปีสุดท้าย
            if(i === rawAge || i % 5 === 0 || i === retAge || i === lifeExp) {
                let disp_wC = fmt(wC), disp_wR = fmt(wR), disp_wR_inf = fmt(wR_inf), disp_wR_neg = fmt(wR_neg), disp_wDIY = fmt(wR);
                let disp_age = i;

                // บังคับแถวแรก (ปีปัจจุบัน) ให้แสดงค่าเงินก้อนเริ่มต้น (investableAssets) เท่ากันหมด
                if (i === rawAge) {
                    let initialPortVal = fmt(astInvest + astOffshore);
                    disp_wC = initialPortVal;
                    disp_wR = initialPortVal;
                    disp_wR_inf = initialPortVal;
                    disp_wR_neg = initialPortVal;
                    disp_wDIY = initialPortVal;
                    disp_age = `${i} (ปัจจุบัน)`;
                }

                tableHtml += `<tr class="hover:bg-gray-50 transition border-b">
                <td class="py-2 px-2 text-center font-semibold text-gray-700">${disp_age}</td>
                <td class="py-2 px-2 text-left text-[10px] text-indigo-700 leading-tight">${aaText}</td>
                <td class="py-2 px-2 text-right font-bold text-purple-600 bg-purple-50/30" id="td_diy_${i}">${disp_wDIY}</td>
                <td class="py-2 px-2 text-right font-bold text-blue-700">${disp_wR}</td>
                <td class="py-2 px-2 text-right text-gray-600">${disp_wC}</td>
                <td class="py-2 px-2 text-right text-orange-600">${disp_wR_inf}</td>
                <td class="py-2 px-2 text-right text-red-600">${disp_wR_neg}</td>
                <td class="py-2 px-2 text-right text-purple-700 bg-purple-50 font-medium">${pensionText}</td></tr>`;
            }
        }
        
        document.getElementById('tb_retire_body').innerHTML = tableHtml;

        // --- ส่วนที่เพิ่มใหม่: ฟังก์ชันแปลงตัวเลขอายุที่เงินหมด ---
        const formatDeplete = (age, maxLife) => {
            if (age > maxLife) return `<span class="text-green-600">> ${maxLife} (รอด)</span>`;
            return `${age} ปี`;
        };

        // ส่งค่าอายุที่เงินหมดของแต่ละพอร์ตไปแสดงบนตาราง
        if (document.getElementById('td_deplete_rec')) {
            document.getElementById('td_deplete_rec').innerHTML = formatDeplete(depleteAge_normal, lifeExp);
            document.getElementById('td_deplete_cur').innerHTML = formatDeplete(depleteAge_current, lifeExp);
            document.getElementById('td_deplete_inf').innerHTML = formatDeplete(depleteAge_inf, lifeExp);
            document.getElementById('td_deplete_neg').innerHTML = formatDeplete(depleteAge_neg, lifeExp);
        }

        const ctxSim = document.getElementById('simChart').getContext('2d');
        simChart = new Chart(ctxSim, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: 'พอร์ตจัดเอง (DIY)', data: dataDIY, borderColor: '#9333ea', backgroundColor: 'rgba(147, 51, 234, 0.1)', borderWidth: 3, tension: 0.4, fill: true, pointRadius: 0, pointHitRadius: 10 },
                    { label: 'แผนปรับปรุง (Expected)', data: dataR, borderColor: '#2563eb', borderWidth: 2, borderDash: [5, 5], tension: 0.4, pointRadius: 0, pointHitRadius: 10 },
                    { label: 'พอร์ตปัจจุบัน', data: dataC, borderColor: '#6b7280', borderWidth: 2, tension: 0.4, pointRadius: 0, pointHitRadius: 10 },
                    { label: 'สู้เงินเฟ้อ (Stress)', data: dataR_inf, borderColor: '#f59e0b', borderWidth: 2, tension: 0.4, pointRadius: 0, pointHitRadius: 10 },
                    { label: 'วิกฤตเศรษฐกิจ', data: dataR_neg, borderColor: '#ef4444', borderWidth: 1, borderDash: [2, 2], tension: 0.4, pointRadius: 0, pointHitRadius: 10 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 6, font: { size: 10, family: 'Prompt' } } },
                    datalabels: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + Number(context.raw).toLocaleString('th-TH', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + ' ฿';
                            }
                        }
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: true, 
                        ticks: { callback: function(value) { return (value/1000000).toFixed(1) + 'M'; }, font: { size: 10, family: 'Prompt' } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: { ticks: { maxTicksLimit: 10, font: { size: 10, family: 'Prompt' } }, grid: { display: false } }
                },
                interaction: { mode: 'index', intersect: false }
            }
        });

        const probBg = finalMcProb >= 85 ? 'bg-green-100 border-green-300' : (finalMcProb >= 50 ? 'bg-yellow-100 border-yellow-300' : 'bg-red-100 border-red-300');
        const probText = finalMcProb >= 85 ? 'text-green-800' : (finalMcProb >= 50 ? 'text-yellow-800' : 'text-red-800');
        
        let simInsight = '';
        if (finalMcProb >= 85) simInsight = 'แผนการลงทุนนี้มีความแข็งแกร่งสูงมาก สามารถทนทานต่อสภาวะตลาดหมีและเงินเฟ้อได้ดี โอกาสความสำเร็จทางการเงินตามเป้าหมายสูงมาก';
        else if (finalMcProb >= 50) simInsight = 'แผนนี้อยู่ในระดับที่ยอมรับได้ แต่อาจต้องปรับตัวหากเกิดวิกฤตเศรษฐกิจรุนแรง แนะนำให้เพิ่มอัตราการออมหรือยืดอายุเกษียณออกไปเล็กน้อย';
        else simInsight = '⚠️ แผนนี้มีความเสี่ยงสูงมากที่จะเงินหมดก่อนสิ้นอายุขัย จำเป็นต้องปรับโครงสร้างด่วน (ลดรายจ่าย, เพิ่มรายได้, หรือเพิ่มผลตอบแทน)';

        // 1. เพิ่มคำอธิบายหากผลตอบแทนพอร์ตปัจจุบันสูงกว่าแผนแนะนำ
        let riskAlertHtml = '';
        if (currentPortfolioRoiEst > targetRoiEst) {
            riskAlertHtml = `
            <div class="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg text-sm text-yellow-800 shadow-sm transition-all hover:shadow-md">
                <p class="flex items-center gap-2 mb-1"><span class="text-xl">💡</span> <b class="text-base">ทำไมระบบจึงแนะนำพอร์ตที่ผลตอบแทนต่ำกว่าปัจจุบัน?</b></p>
                <p class="leading-relaxed pl-7">พอร์ตปัจจุบันของคุณคาดหวังผลตอบแทนที่ <b>${currentPortfolioRoiEst.toFixed(1)}%</b> ซึ่งสูงกว่าพอร์ตแนะนำ <b>(${targetRoiEst.toFixed(1)}%)</b> แต่มาพร้อมกับ <b>"ความเสี่ยงและความผันผวนที่สูงเกินระดับ Risk Profile ของคุณ (${riskLevel})"</b> 
                ระบบจึงปรับลดระดับความเสี่ยงลงมาเพื่อปกป้องเงินต้น ป้องกันการบังคับขาย (Forced Sale) ในช่วงวิกฤต โดยเน้นความสม่ำเสมอและให้โอกาสความสำเร็จทางการเงินที่ปลอดภัยกว่าในระยะยาว</p>
            </div>
            `;
        }

        // --- เริ่มขั้นที่ 4: Goal-Based Trade-off Algorithm ---
        let tradeoffHtml = '';
        if (finalMcProb < 50) {
            // 🧠 1. คำนวณแบบจำลองการเงินที่ถูกต้อง (Time Value of Money - FV, PV & PMT)
            let safeYearsLeft = Math.max(1, retAge - rawAge);
            
            // ก. หาเป้าหมายเงินก้อนที่ต้องมี ณ วันเกษียณ (รวมเงินเฟ้อช่วงก่อนเกษียณแล้ว)
            let inflatedRetExp = currentYearlyRetExp_base * Math.pow(1 + infRate/100, safeYearsLeft);
            
            // 🌟 [UPGRADE] ใช้สมการ Present Value of Annuity (PVA) แทน Rule of 25
            let yearsInRetirement = Math.max(1, lifeExp - retAge); // จำนวนปีที่ใช้ชีวิตหลังเกษียณ
            let postRetRoi = Math.max((targetRoiEst / 100) - 0.02, 0.02); // ผลตอบแทนหลังเกษียณ (ลดระดับความเสี่ยงลง 2% จากช่วงสะสม)
            let inflation = infRate / 100;
            
            // คำนวณ Real Return (อัตราผลตอบแทนแท้จริง) เพื่อชดเชยเงินเฟ้อหลังเกษียณ
            let realReturn = ((1 + postRetRoi) / (1 + inflation)) - 1;
            let targetCorpus = 0;
            
            if (Math.abs(realReturn) < 0.0001) {
                // กรณีผลตอบแทนชนะเงินเฟ้อไม่ได้เลย (Real Return = 0) ต้องเตรียมเงินสดคูณจำนวนปีตรงๆ
                targetCorpus = inflatedRetExp * yearsInRetirement;
            } else {
                // สูตร Present Value of Annuity Due (สมมติถอนเงินก้อนออกมาใช้ตอนต้นปี)
                targetCorpus = inflatedRetExp * ((1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn) * (1 + realReturn);
            }
            // ข. หาเงินต้นปัจจุบันที่จะเติบโตไปถึงวันเกษียณ (มูลค่าอนาคต - FV)
            let currentInvestable = (typeof astLiquid !== 'undefined' ? astLiquid : 0) + (typeof astInvest !== 'undefined' ? astInvest : 0);
            let expectedRoi = (targetRoiEst > 0 ? targetRoiEst : 5) / 100;
            let fvCurrentAssets = currentInvestable * Math.pow(1 + expectedRoi, safeYearsLeft);

            // ค. หาส่วนต่างที่ยังขาดอยู่ (Shortfall)
            let shortfall = Math.max(0, targetCorpus - fvCurrentAssets);

            // ง. คำนวณเงินออมต่อเดือนที่แท้จริง (PMT Formula)
            let requiredSavings = 0;
            let monthlyRate = expectedRoi / 12;
            let monthsLeft = safeYearsLeft * 12;
            
            if (shortfall > 0) {
                // คำนวณเงินออมแบบมีดอกเบี้ยทบต้น
                requiredSavings = (shortfall * monthlyRate) / (Math.pow(1 + monthlyRate, monthsLeft) - 1);
            } else {
                // ถ้าเงินต้นก้อนเดิมโตจนพอแล้ว ไม่ต้องออมเพิ่มเลยก็ได้
                requiredSavings = actualRetirementSave_R; 
            }

            // จ. เลื่อนอายุเกษียณให้สมเหตุสมผล (บวกไป 5 ปีจากเป้าหมาย หรืออย่างน้อย 3 ปีจากอายุจริง)
            let requiredRetAge = Math.max(retAge + 5, rawAge + 3);

            // 🧠 1. เช็คว่าปัญหาคืออะไร (เสี่ยงน้อยไป ออมน้อยไป หรือ เกษียณไปแล้วแต่เงินไม่พอ)
            let tradeoffDesc = "";
            if (rawAge >= retAge) {
                tradeoffDesc = `ท่านอยู่ในวัยเกษียณแล้ว แต่พอร์ตการลงทุนปัจจุบันอาจรองรับค่าใช้จ่ายไปได้ไม่ถึงอายุขัยที่คาดหวัง (${lifeExp} ปี) นี่คือ 3 ทางเลือกเร่งด่วนในการบริหารจัดการเงินก้อนสุดท้าย:`;
            } else {
                tradeoffDesc = targetRoiEst < 7 ? 
                    `เป้าหมายเกษียณที่คุณตั้งไว้ ต้องใช้ผลตอบแทนค่อนข้างสูง แต่แบบประเมินความเสี่ยงของคุณระบุว่ารับความเสี่ยงได้ต่ำ ระบบจึงจัดพอร์ต <b>${targetRoiEst.toFixed(1)}%</b> ให้เพื่อความปลอดภัย ซึ่ง <b>"ปลอดภัยแต่ผลลัพธ์อาจไม่เพียงพอ"</b> นี่คือ 3 ทางเลือกที่คุณต้องตัดสินใจ:` : 
                    `เป้าหมายเกษียณที่คุณตั้งไว้ มีขนาดใหญ่กว่าความสามารถในการออม ณ ปัจจุบัน แม้ระบบจะจัดพอร์ตลงทุนเชิงรุกที่ <b>${targetRoiEst.toFixed(1)}%</b> ให้แล้ว ก็ยังไปไม่ถึงเป้าหมาย นี่คือ 3 ทางเลือกที่คุณต้องตัดสินใจ:`;
            }

            // 🧠 2. ไดนามิกข้อความใน 3 ทางเลือก ให้สมเหตุสมผลกับปัญหา
            let option1Desc = "", option2Desc = "", option3Desc = "";
            
            if (rawAge >= retAge) {
                // คนเกษียณแล้ว
                option1Desc = `ปรับโครงสร้างพอร์ตเพื่อสร้างกระแสเงินสด (Income Portfolio) เช่น หุ้นกู้คุณภาพสูง หรือกองทุนอสังหาริมทรัพย์/REITs เพื่อเพิ่ม Yield ต่อปี`;
                option2Desc = `ลดระดับการใช้จ่ายรายเดือนลงประมาณ 20-30% ทันที เพื่อยืดอายุการใช้งานของพอร์ตลงทุนออกไปให้ยาวนานที่สุด`;
                option3Desc = `พิจารณาแปลงสินทรัพย์ที่ไม่ได้สร้างรายได้ (เช่น บ้าน) เป็นกระแสเงินสดผ่าน Reverse Mortgage หรือการลดขนาดที่อยู่อาศัย (Downsizing)`;
            } else {
                // คนยังไม่เกษียณ
                option1Desc = targetRoiEst < 7 ? 
                    `คงเงินออมและเวลาเกษียณเท่าเดิม แต่ต้องปรับพอร์ตไปรับความเสี่ยงสูงขึ้น (หุ้น 80%) เพื่อคาดหวังผลตอบแทน 8-10% (ต้องทำแบบประเมินใหม่)` :
                    `ปรับพอร์ตให้ดุดันขั้นสุด (Aggressive/Thematic) เพื่อหาผลตอบแทนระดับ 10-12% (มีความผันผวนและความเสี่ยงสูงมาก)`;
                
                option2Desc = targetRoiEst < 7 ?
                    `รักษาความปลอดภัยของพอร์ตความเสี่ยงต่ำไว้ แต่คุณต้องเพิ่มเงินออมเพื่อการเกษียณเป็นประมาณ <b>${fmt(requiredSavings/12)} บ./เดือน</b>` :
                    `คงพอร์ตลงทุนเชิงรุกไว้ดังเดิม แต่ต้องรักษาวินัยเพิ่มเงินออมเพื่ออุดช่องโหว่เป็นประมาณ <b>${fmt(requiredSavings/12)} บ./เดือน</b>`;

                option3Desc = targetRoiEst < 7 ?
                    `คงเงินออมและพอร์ตเสี่ยงต่ำไว้ แต่ต้องยอมเลื่อนอายุเกษียณออกไปเป็น <b>${requiredRetAge} ปี</b> หรือปรับลดค่าใช้จ่ายหลังเกษียณลง 40%` :
                    `ยอมรับความจริงและเลื่อนอายุเกษียณออกไปเป็น <b>${requiredRetAge} ปี</b> หรือปรับลดเป้าหมายการใช้จ่ายหลังเกษียณลง 40%`;
            }

            // สร้าง HTML Output
            tradeoffHtml = `
            <div class="mt-6 border border-red-200 rounded-xl overflow-hidden shadow-md bg-white hover-scale">
                <div class="bg-red-50 p-4 border-b border-red-200">
                    <h4 class="font-bold text-red-800 text-lg flex items-center gap-2"><span class="text-2xl">⚠️</span> ทำไมแผนแนะนำ (ติดดาว) ถึงมีโอกาสสำเร็จต่ำ?</h4>
                    <p class="text-sm text-gray-700 mt-2">${tradeoffDesc}</p>
                </div>
                <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-gray-50 p-3 rounded-lg border">
                        <span class="text-xs font-bold text-gray-500 uppercase">ทางเลือกที่ 1</span>
                        <h5 class="font-bold text-blue-700 mt-1 mb-2">อัปเกรดพอร์ตลงทุน 📈</h5>
                        <p class="text-xs text-gray-600">${option1Desc}</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border border-green-200 shadow-inner">
                        <span class="text-xs font-bold text-green-600 uppercase">ทางเลือกที่ 2 (แนะนำ)</span>
                        <h5 class="font-bold text-green-700 mt-1 mb-2">เพิ่มอัตราการออม 💰</h5>
                        <p class="text-xs text-gray-600">${option2Desc}</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border">
                        <span class="text-xs font-bold text-gray-500 uppercase">ทางเลือกที่ 3</span>
                        <h5 class="font-bold text-orange-600 mt-1 mb-2">ปรับเป้าหมาย ⏱️</h5>
                        <p class="text-xs text-gray-600">${option3Desc}</p>
                    </div>
                </div>
            </div>`;
        }
        // --- จบขั้นที่ 4 ---

        // ==========================================
        // 2. คำนวณบำนาญต่อเดือนที่คาดว่าจะทำได้จริง ณ วันเกษียณ (อิงสมการ Annuity แทนกฎ 4%)
        // ==========================================
        let yearsInRetirement = Math.max(1, lifeExp - retAge);
        let inflation = infRate / 100;

        // ดึงผลตอบแทนหลังเกษียณของทั้งสองพอร์ต (ลดความเสี่ยงลง 2% จากช่วงสะสม)
        let postRetRoi_Rec = Math.max((targetRoiEst / 100) - 0.02, 0.02); 
        let postRetRoi_Cur = Math.max((currentPortfolioRoiEst / 100) - 0.02, 0.02); 
        
        // คำนวณอัตราผลตอบแทนแท้จริง (Real Return)
        let realReturn_Rec = ((1 + postRetRoi_Rec) / (1 + inflation)) - 1;
        let realReturn_Cur = ((1 + postRetRoi_Cur) / (1 + inflation)) - 1;

        // ฟังก์ชันคณิตศาสตร์การเงิน: คำนวณเงินที่ถอนได้ต่อปี (PMT) จากเงินต้น (PV)
        const calculateSustainablePMT = (pv, n, r) => {
            if (Math.abs(r) < 0.0001) return pv / n; // ถ้าผลตอบแทนแพ้เงินเฟ้อ ให้จับหารจำนวนปีทื่อๆ
            return pv / (((1 - Math.pow(1 + r, -n)) / r) * (1 + r));
        };

        let baseAnnuity = (yearlyAnnuityIncome || 0) / 12; // บำนาญจากประกัน (ถ้ามี)
        
            yearsToRet = Math.max(0, retAge - rawAge);
        let inflatedGoalExpense = currentYearlyRetExp_base * Math.pow(1 + inflation, yearsToRet);
        let goalPension = inflatedGoalExpense / 12;

        // 🧠 คำนวณ currentPension และ recPension ด้วยสมการ PMT (แม่นยำตามระยะเวลาเกษียณจริง)
        // 🛠️ [FIX] คํานวณมูลค่าพอร์ต ณ วันเกษียณแบบ Deterministic (FV) แทนที่จะไปหยิบมาจากการสุ่มของกราฟ
        let yearsToRetForPension = Math.max(0, retAge - rawAge);

        // พอร์ตปัจจุบัน (นำเงินต้นไปโตด้วย ROI ปัจจุบัน + เงินออมที่ติดลบ)
        let wC_expected_at_ret = (astInvest + astOffshore) * Math.pow(1 + (currentPortfolioRoiEst/100), yearsToRetForPension);
        if (actualRetirementSave_C !== 0) {
            let r_C = currentPortfolioRoiEst/100;
            wC_expected_at_ret += actualRetirementSave_C * ((Math.pow(1 + r_C, yearsToRetForPension) - 1) / r_C);
        }
        // พอร์ตแนะนำ (นำเงินต้นไปโตด้วย ROI ใหม่ + เงินออมใหม่)
        let wR_expected_at_ret = (astInvest + astOffshore) * Math.pow(1 + (targetRoiEst/100), yearsToRetForPension);
        if (actualRetirementSave_R !== 0) {
            let r_R = targetRoiEst/100;
            wR_expected_at_ret += actualRetirementSave_R * ((Math.pow(1 + r_R, yearsToRetForPension) - 1) / r_R);
        }
        // คุมกำเนิดไม่ให้พอร์ตติดลบก่อนนำไปคำนวณ PMT
        wC_expected_at_ret = Math.max(0, wC_expected_at_ret);
        wR_expected_at_ret = Math.max(0, wR_expected_at_ret);
        // ส่งเข้าสมการ PMT ด้วยตัวเลขที่เสถียร 100%
        let currentPension = (calculateSustainablePMT(wC_expected_at_ret, yearsInRetirement, realReturn_Cur) / 12) + baseAnnuity;
        let recPension = (calculateSustainablePMT(wR_expected_at_ret, yearsInRetirement, realReturn_Rec) / 12) + baseAnnuity;

        let pensionComparisonHtml = `
            <div class="mt-6 border-t border-gray-200 pt-5">
                <h4 class="font-bold text-gray-800 mb-3 text-base flex items-center gap-2"><span class="text-xl">💰</span> เปรียบเทียบกระแสเงินสดที่ทำได้ ณ วันเกษียณ (อายุ ${retAge} ปี)</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                    <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md">
                        <p class="text-xs text-gray-500 font-bold mb-2">เป้าหมายรายจ่ายที่ต้องการ</p>
                        <p class="text-2xl font-black text-gray-800">${fmt(goalPension)} <span class="text-sm font-normal text-gray-500">บ./ด.</span></p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md">
                        <p class="text-xs text-gray-500 font-bold mb-2">พอร์ตปัจจุบันทำได้ (คาดการณ์)</p>
                        <p class="text-2xl font-black ${currentPension >= goalPension ? 'text-green-600' : 'text-red-500'}">${fmt(currentPension)} <span class="text-sm font-normal text-gray-500">บ./ด.</span></p>
                    </div>
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 shadow-md relative overflow-hidden transition hover:shadow-lg transform hover:-translate-y-1">
                        <div class="absolute -right-4 -top-4 text-6xl opacity-10">⭐</div>
                        <p class="text-xs text-blue-800 font-bold mb-2 relative z-10">แผนแนะนำทำได้ ⭐</p>
                        <p class="text-2xl font-black text-blue-700 relative z-10">${fmt(recPension)} <span class="text-sm font-normal text-blue-500">บ./ด.</span></p>
                    </div>
                </div>
                <p class="text-[10px] text-gray-400 mt-2 text-center">* ประเมินความสามารถในการถอนเงินอย่างปลอดภัยด้วยกฎ Safe Withdrawal Rate (4%) จากมูลค่าพอร์ต ณ วันเกษียณ รวมกับเงินบำนาญประกันชีวิต (ถ้ามี)</p>
            </div>
        `;

        let whatIfHtml = `
            <div class="mt-5 p-5 bg-indigo-50 border border-indigo-100 rounded-xl shadow-inner no-print transition-all">
                <div class="flex justify-between items-center mb-4 border-b border-indigo-100 pb-2">
                    <h4 class="font-bold text-indigo-800 flex items-center gap-2"><span class="text-xl">🎛️</span> Interactive "What-If" (ลองปรับแผนจำลองดูสิ!)</h4>
                    <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full" id="wi_status">🟢 ระบบคำนวณอัตโนมัติ</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label class="flex justify-between text-xs font-bold text-gray-700 mb-2">
                            <span>อายุเกษียณ (ปี)</span>
                            <span id="wi_val_retAge" class="text-indigo-700 text-sm bg-indigo-100 px-2 py-0.5 rounded">${retAge}</span>
                        </label>
                        <input type="range" id="wi_retAge" min="${rawAge}" max="75" step="1" value="${retAge}" class="w-full accent-indigo-600 cursor-pointer" oninput="updateWhatIf()">
                    </div>
                    <div>
                        <label class="flex justify-between text-xs font-bold text-gray-700 mb-2">
                            <span>เงินออม/ลงทุนเพิ่ม (บาท/เดือน)</span>
                            <span id="wi_val_save" class="text-indigo-700 text-sm bg-indigo-100 px-2 py-0.5 rounded">${fmt(actualRetirementSave_R/12)}</span>
                        </label>
                        <input type="range" id="wi_save" min="0" max="${Math.max(200000, (actualRetirementSave_R/12)*3)}" step="1000" value="${actualRetirementSave_R/12}" class="w-full accent-indigo-600 cursor-pointer" oninput="updateWhatIf()">
                    </div>
                    <div>
                        <label class="flex justify-between text-xs font-bold text-gray-700 mb-2">
                            <span>ผลตอบแทนพอร์ต (%)</span>
                            <span id="wi_val_roi" class="text-indigo-700 text-sm bg-indigo-100 px-2 py-0.5 rounded">${targetRoiEst.toFixed(1)}%</span>
                        </label>
                        <input type="range" id="wi_roi" min="1" max="15" step="0.5" value="${targetRoiEst}" class="w-full accent-indigo-600 cursor-pointer" oninput="updateWhatIf()">
                    </div>
                </div>
                <p class="text-[10px] text-indigo-500 mt-3">* เลื่อนแถบสไลเดอร์เพื่อดูการขยับของกราฟ "พอร์ตจัดเอง (สีม่วง)" ทันที และเมื่อหยุดเลื่อน ระบบจะคำนวณ % โอกาสสำเร็จใหม่ให้โดยอัตโนมัติ</p>
            </div>
        `;

        // ส่ง What-If ไปแสดงใต้กราฟก่อนตาราง
        document.getElementById('what_if_container').innerHTML = whatIfHtml;

        // แทรก tradeoffHtml เข้าไปแสดงผลรวม
        document.getElementById('prob_success_container').innerHTML = `
            <div class="${probBg} p-5 rounded-xl border mt-4 shadow-sm">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="flex-1">
                        <h4 class="font-bold ${probText} text-lg mb-2 flex items-center gap-2">
                            <span class="text-2xl">🛡️</span> บททดสอบความแข็งแกร่งของแผนเกษียณ
                        </h4>
                        <p class="text-sm ${probText} opacity-90 leading-relaxed">${simInsight}</p>
                        <p class="text-xs ${probText} opacity-75 mt-2">* ระบบได้ทำการทดสอบแผนของคุณถึง 2,000 รูปแบบ (Monte Carlo Simulation) โดยจำลองทั้งช่วงตลาดหุ้นขาขึ้น ขาลง วิกฤตเศรษฐกิจ และอัตราเงินเฟ้อ เพื่อหา <b>"โอกาสที่เงินก้อนนี้จะใช้ได้เพียงพอไปตลอดชีวิตโดยไม่หมดกลางทาง"</b></p>
                    </div>
                    <div class="text-center bg-white/60 p-4 rounded-xl border border-white/50 backdrop-blur-sm shadow-inner min-w-[150px]">
                        <p class="text-xs ${probText} font-bold mb-1">โอกาสสำเร็จแผนเกษียณ</p>
                        <p id="mc_prob_display" class="text-2xl md:text-3xl font-black ${probText} transition-all duration-300">${calculateCI95(finalMcProb, 2000)}</p>
                    </div>
                </div>
            </div>
            ${riskAlertHtml}
            ${tradeoffHtml}
            ${pensionComparisonHtml}
        `;

        // =====================================================================
        // 8.1 Forecast Quarterly Cashflow Projection (Copy Statement of Cash Flows)
        // =====================================================================
        
        // 1. ดึงค่ายอดหนี้รวมตั้งต้นจากหน้าจอ (ส่วนที่ 2: งบดุล)
        let initialDebt_8_1 = 0;
        if(document.getElementById('c_liab')) {
            document.getElementById('c_liab').querySelectorAll('.col-val').forEach(inp => {
                initialDebt_8_1 += Number(inp.value.replace(/,/g, '')) || 0;
            });
        }
        let currentDebt = initialDebt_8_1;

        // 2. ฟังก์ชันดึงรายการจากหน้าจอโดยตรง (แก้บั๊ก ID ให้ตรงกับ Source Code ของคุณเป๊ะๆ)
        function getSimpleLineItems(containerId, defaultName) {
            let items = [];
            let container = document.getElementById(containerId);
            if(!container) return items;
            
            // กวาดหาบรรทัดข้อมูลที่ลูกค้ากรอกไว้
            let rows = container.querySelectorAll('.data-row, .input-row');
            rows.forEach(row => {
                let nameInput = row.querySelector('.col-name');
                let valInput = row.querySelector('.col-val');
                
                if(valInput) {
                    let val = Number(valInput.value.replace(/,/g, '')) || 0;
                    if(val > 0) {
                        let name = (nameInput && nameInput.value) ? nameInput.value : defaultName;
                        items.push({ name: name, val: val });
                    }
                }
            });
            return items;
        }

        // 🌟 ชี้เป้าหมายไปที่ ID ที่ถูกต้อง (c_inc = รายรับ, c_exp = รายจ่าย)
        let inflowsList = getSimpleLineItems('c_inc', 'รายรับ');
        let outflowsList = getSimpleLineItems('c_exp', 'รายจ่าย');

        // Fallback เผื่อไว้กรณีฉุกเฉิน
        if(inflowsList.length === 0 && typeof totalInc !== 'undefined') inflowsList.push({ name: 'รายได้รวม', val: totalInc });
        if(outflowsList.length === 0 && typeof totalOut !== 'undefined') outflowsList.push({ name: 'รายจ่ายรวม', val: totalOut });

        // 3. สร้างโครงสร้างตาราง HTML แนวนอน (4 ไตรมาส)
        let projectionHtml = `<div class="w-full pb-2">
            <table class="w-full text-sm text-left border-collapse mb-0">
                <thead class="bg-gray-100 text-gray-800 border-b-2 border-gray-300">
                    <tr>
                        <th class="p-3 w-2/6 font-bold border-r border-gray-200 bg-gray-50">รายการ / ไตรมาส</th>
                        <th class="p-3 w-1/6 text-right font-bold bg-gray-50">Q1<br><span class="text-[9px] font-normal text-gray-500">(เดือน 1-3)</span></th>
                        <th class="p-3 w-1/6 text-right font-bold bg-gray-50">Q2<br><span class="text-[9px] font-normal text-gray-500">(เดือน 4-6)</span></th>
                        <th class="p-3 w-1/6 text-right font-bold bg-gray-50">Q3<br><span class="text-[9px] font-normal text-gray-500">(เดือน 7-9)</span></th>
                        <th class="p-3 w-1/6 text-right font-bold bg-gray-50">Q4<br><span class="text-[9px] font-normal text-gray-500">(เดือน 10-12)</span></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">`;

        // 4. Render รายรับ (Inflows) โชว์ยอดคูณ 3
        projectionHtml += `<tr class="bg-blue-50 font-bold"><td colspan="5" class="p-3 text-blue-800 border-r border-gray-200">🟢 กระแสเงินสดรับ (Inflows)</td></tr>`;
        let totalInflowQ = 0;
        inflowsList.forEach(item => {
            let qVal = item.val * 3;
            totalInflowQ += qVal;
            let fmtQVal = fmt(qVal);
            projectionHtml += `<tr>
                <td class="p-3 text-gray-700 pl-6 border-r border-gray-200">${item.name}</td>
                <td class="p-3 text-right text-blue-600">${fmtQVal}</td><td class="p-3 text-right text-blue-600">${fmtQVal}</td><td class="p-3 text-right text-blue-600">${fmtQVal}</td><td class="p-3 text-right text-blue-600">${fmtQVal}</td>
            </tr>`;
        });

        // 5. Render รายจ่าย (Outflows) โชว์ยอดคูณ 3 พร้อมตรวจจับ "หนี้สิน"
        projectionHtml += `<tr class="bg-red-50 font-bold"><td colspan="5" class="p-3 text-red-800 border-r border-gray-200">🔴 กระแสเงินสดจ่าย (Outflows)</td></tr>`;
        let totalOutflowQ = 0;
        let totalDebtPaymentQ = 0; // เก็บยอดชำระหนี้รายไตรมาส

        outflowsList.forEach(item => {
            let qVal = item.val * 3;
            totalOutflowQ += qVal;
            let fmtQVal = fmt(qVal);
            
            // ตรวจจับคีย์เวิร์ดว่าเป็นรายการผ่อนชำระหนี้หรือไม่
            if(item.name.includes('หนี้') || item.name.includes('ผ่อน') || item.name.includes('สินเชื่อ') || item.name.includes('บัตร') || item.name.includes('กู้') || item.name.includes('รถ') || item.name.includes('บ้าน')) {
                totalDebtPaymentQ += qVal;
            }

            projectionHtml += `<tr>
                <td class="p-3 text-gray-700 pl-6 border-r border-gray-200">${item.name}</td>
                <td class="p-3 text-right text-red-500">-${fmtQVal}</td><td class="p-3 text-right text-red-500">-${fmtQVal}</td><td class="p-3 text-right text-red-500">-${fmtQVal}</td><td class="p-3 text-right text-red-500">-${fmtQVal}</td>
            </tr>`;
        });

        // 6. สรุปกระแสเงินสดสุทธิ (Net Cash Flow)
        let netCF_Q = totalInflowQ - totalOutflowQ;
        let cfColor = netCF_Q >= 0 ? 'text-green-600' : 'text-red-600';
        let fmtNetCF = fmt(netCF_Q);

        projectionHtml += `<tr class="bg-gray-100 font-bold border-t-2 border-gray-300">
            <td class="p-3 text-gray-800 border-r border-gray-200">🔵 กระแสเงินสดสุทธิ (Net Cash Flow)</td>
            <td class="p-3 text-right ${cfColor}">${fmtNetCF}</td>
            <td class="p-3 text-right ${cfColor}">${fmtNetCF}</td>
            <td class="p-3 text-right ${cfColor}">${fmtNetCF}</td>
            <td class="p-3 text-right ${cfColor}">${fmtNetCF}</td>
        </tr>`;

        // 7. สรุปยอดหนี้คงเหลือ (ลดลงแบบ Simple Math หักลบตรงๆ)
        if(initialDebt_8_1 > 0) {
            projectionHtml += `<tr class="bg-indigo-50 border-t-4 border-white"><td class="p-3 font-bold text-indigo-800 border-r border-gray-200">📉 ยอดหนี้สินคงเหลือ (แบบหักลบตรง)</td>`;
            
            for(let i=0; i<4; i++) {
                currentDebt = Math.max(0, currentDebt - totalDebtPaymentQ);
                projectionHtml += `<td class="p-3 text-right font-bold text-red-600">${fmt(currentDebt)}</td>`;
            }
            projectionHtml += `</tr>`;
        }

        projectionHtml += `</tbody></table></div>`;
        
        // 8. นำไปแสดงผลใน UI
        let container81 = document.getElementById('cashflow_projection_container');
        if (container81) {
            container81.innerHTML = projectionHtml;
        }

        // =====================================================================
        // 8.2 Forecast 5 Years Wealth (Ultimate Edition)
        // =====================================================================
        // 🚨 [FIX] ประกาศตัวแปร investableAssets เผื่อไว้ในกรณีที่ระบบเดิมไม่มี
        let investableAssets = 0;
        // ---------------------------------------------------------------------
        // 🧠 1. [AI ENGINE] Smart Asset Allocation Parser (อัปเกรดพจนานุกรม UHNW)
        // ---------------------------------------------------------------------
        let parsedTotalAssets = 0;
        let weightedRoiSum = 0;
        let weightedSdSum = 0;

        // 🚨 [UPGRADE] พจนานุกรม AI ที่ครอบคลุมสินทรัพย์ระดับ High Net Worth
        const assetKnowledgeBase = [
            // 💰 สภาพคล่อง & ความเสี่ยงต่ำ
            { keywords: ['เงินสด', 'ฝาก', 'ออมทรัพย์', 'เผื่อเรียก', 'สภาพคล่อง', 'fcd', 'เงินตราต่างประเทศ'], roi: 0.5, sd: 0.0 },
            { keywords: ['ประจำ', 'ฝากประจำ', 'สลาก', 'ออมสิน', 'เงินฝาก'], roi: 1.5, sd: 0.0 },
            { keywords: ['ตราสารหนี้', 'พันธบัตร', 'หุ้นกู้', 'สหกรณ์', 'bond', 'debenture', 'fixed income'], roi: 3.0, sd: 2.0 },
            
            // 📈 การลงทุนทั่วไป & อสังหาฯ
            { keywords: ['กองทุนรวม', 'ssf', 'rmf', 'ผสม', 'esg', 'mutual fund', 'กองทุน'], roi: 5.0, sd: 8.0 },
            { keywords: ['อสังหา', 'reit', 'property fund', 'กองทุนรวมอสังหา', 'โครงสร้างพื้นฐาน'], roi: 6.0, sd: 10.0 },
            { keywords: ['หุ้นไทย', 'หุ้นสามัญ', 'ตราสารทุน', 'pvd', 'กบข', 'equity', 'stock'], roi: 8.0, sd: 15.0 },
            
            // 🌐 การลงทุนต่างประเทศ & UHNW Assets (สินทรัพย์ซับซ้อน)
            { keywords: ['ต่างประเทศ', 'offshore', 'เทค', 's&p', 'global', 'dr', 'drx'], roi: 10.0, sd: 18.0 },
            { keywords: ['private fund', 'hedge fund', 'กองทุนส่วนบุคคล'], roi: 8.5, sd: 14.0 },
            { keywords: ['structured', 'eln', 'derivative', 'อนุพันธ์', 'หุ้นกู้ที่มีอนุพันธ์', 'note'], roi: 7.0, sd: 12.0 },
            { keywords: ['private equity', 'vc', 'venture', 'startup', 'angel'], roi: 15.0, sd: 30.0 },
            
            // 💎 สินทรัพย์ทางเลือก
            { keywords: ['คริปโต', 'crypto', 'บิทคอยน์', 'bitcoin', 'eth', 'digital'], roi: 15.0, sd: 40.0 },
            { keywords: ['ทองคำ', 'gold', 'นาฬิกา', 'ของสะสม', 'art', 'ทางเลือก'], roi: 4.0, sd: 15.0 }
        ];

        if(document.getElementById('c_assets')) {
            document.getElementById('c_assets').querySelectorAll('.data-row, .input-row').forEach(row => {
                let cat = row.dataset.cat || "";
                if (cat.includes('สภาพคล่อง') || cat.includes('ลงทุน') || cat.includes('ต่างประเทศ')) {
                    let nameInput = row.querySelector('.col-name');
                    let valInput = row.querySelector('.col-val');
                    let name = nameInput ? nameInput.value.toLowerCase() : "";
                    let val = valInput ? Number(valInput.value.replace(/,/g, '')) || 0 : 0;
                    
                    if (val > 0) {
                        // 🚨 [UPGRADE] เอา "ชื่อที่ FA พิมพ์" + "หมวดหมู่ในระบบ" มารวมกันเพื่อค้นหา ป้องกัน FA พิมพ์ชื่อย่อ
                        let searchText = (name + " " + cat).toLowerCase();
                        
                        // 🚨 [UPGRADE] Smart Fallback กำหนดค่าพื้นฐานตาม "หมวดหมู่" เผื่อหาในพจนานุกรมไม่เจอเลย
                        let matchedRoi = cat.includes('สภาพคล่อง') ? 1.0 : (cat.includes('ต่างประเทศ') ? 8.0 : 5.0);
                        let matchedSd = cat.includes('สภาพคล่อง') ? 0.5 : (cat.includes('ต่างประเทศ') ? 15.0 : 8.0);
                        
                        // กวาดหาคีย์เวิร์ด
                        for (let rule of assetKnowledgeBase) {
                            if (rule.keywords.some(kw => searchText.includes(kw))) {
                                matchedRoi = rule.roi; 
                                matchedSd = rule.sd; 
                                break;
                            }
                        }
                        parsedTotalAssets += val;
                        row.dataset.tempRoi = matchedRoi;
                        row.dataset.tempSd = matchedSd;
                        row.dataset.tempVal = val;
                    }
                }
            });

            if (parsedTotalAssets > 0) {
                document.getElementById('c_assets').querySelectorAll('.data-row, .input-row').forEach(row => {
                    let val = Number(row.dataset.tempVal) || 0;
                    if (val > 0) {
                        let weight = val / parsedTotalAssets; 
                        weightedRoiSum += weight * Number(row.dataset.tempRoi);
                        weightedSdSum += weight * Number(row.dataset.tempSd);
                    }
                });
                currentPortfolioRoiEst = weightedRoiSum;
                currentSdEst = Math.max(0.1, weightedSdSum); 
                investableAssets = parsedTotalAssets; 
            }
        }

        // ---------------------------------------------------------------------
        // 🎯 2. [UPGRADE] MULTI-GOAL ASSET ALLOCATION (เป้าหมายระยะสั้น-กลาง-ยาว)
        // ---------------------------------------------------------------------
        let totalWealthToAllocate = investableAssets || 0; 
        let monthlySavingToAllocate = Math.max(0, (typeof propSave !== 'undefined' ? propSave : 0) - allocIns);
        let ageForAlloc = parseInt(document.getElementById('p_age') ? document.getElementById('p_age').value : 35) || 35;
        let monthlyExpForAlloc = (typeof totalOut !== 'undefined' ? totalOut : 50000); 

        // 🧠 1. โครงสร้าง 4 ถัง (ถัง 1-3 โชว์ที่ข้อ 5, ถัง 4 โชว์ที่ข้อ 7)
        let buckets = {
            short: { name: "🟢 ถังที่ 1: สภาพคล่อง & ระยะสั้น (0-3 ปี)", goals: [], targetLump: 0, targetDCA: 0, allocatedLump: 0, allocatedDCA: 0, roi: 2.5, sd: 1.0, assets: "เงินฝากดิจิทัล / กองทุนตลาดเงิน", color: "green" },
            mid: { name: "🟡 ถังที่ 2: เป้าหมายระยะกลาง (3-7 ปี)", goals: [], targetLump: 0, targetDCA: 0, allocatedLump: 0, allocatedDCA: 0, roi: 5.0, sd: 6.0, assets: "ตราสารหนี้ / กองทุนผสม (สมดุล)", color: "yellow" },
            long: { name: "🟠 ถังที่ 3: เป้าหมายระยะยาว (>7 ปี)", goals: [], targetLump: 0, targetDCA: 0, allocatedLump: 0, allocatedDCA: 0, roi: 8.0, sd: 12.0, assets: "พอร์ตหุ้นโลก / กองทุนเติบโต", color: "orange" },
            retire: { name: "🟣 ทุนเกษียณและมรดก (Core Portfolio)", goals: [], targetLump: 0, targetDCA: 0, allocatedLump: 0, allocatedDCA: 0, roi: 8.5, sd: 12.0, assets: "พอร์ตเกษียณหลัก", color: "purple" }
        };

        // 🧠 2. กวาดเป้าหมายลงถัง
        let checkSeasonal = typeof isIncomeSeasonal !== 'undefined' ? isIncomeSeasonal : false;
        let emergencyFundTarget = monthlyExpForAlloc * (checkSeasonal ? 12 : 6);
        buckets.short.targetLump += emergencyFundTarget;
        buckets.short.goals.push({name: `สำรองฉุกเฉิน ${checkSeasonal ? 12 : 6} เดือน`, amount: emergencyFundTarget, reqMonthlyInvest: 0});

        if (typeof parsedGoals !== 'undefined') {
            parsedGoals.forEach(g => {
                let gName = g.name.toLowerCase();
                let isRetire = gName.includes('เกษียณ') || gName.includes('fire') || gName.includes('บำนาญ') || gName.includes('มรดก') || gName.includes('ความมั่งคั่ง');

                if (isRetire) {
                    buckets.retire.goals.push(g);
                    buckets.retire.targetDCA += g.reqMonthlyInvest;
                } else if (g.years <= 3) {
                    buckets.short.goals.push(g);
                    buckets.short.targetDCA += g.reqMonthlyInvest;
                } else if (g.years <= 7) {
                    buckets.mid.goals.push(g);
                    buckets.mid.targetDCA += g.reqMonthlyInvest;
                } else {
                    buckets.long.goals.push(g);
                    buckets.long.targetDCA += g.reqMonthlyInvest;
                }
            });
        }

        // 🧠 3. จูนผลตอบแทนถังระยะยาว/เกษียณ ตาม Risk Profile
        let checkWealthy = (typeof customerDataForAI !== 'undefined' && customerDataForAI.Is_Wealthy === 1) || (typeof isHNW !== 'undefined' && isHNW);
        if ((typeof riskScore !== 'undefined' && riskScore >= 16) || checkWealthy) { 
            buckets.long.roi = 10.0; buckets.long.sd = 16.0; buckets.long.assets = "หุ้นเติบโตทั่วโลก / สินทรัพย์ทางเลือก"; 
            buckets.retire.roi = 10.0; buckets.retire.sd = 16.0; buckets.retire.assets = "หุ้นเติบโตทั่วโลก / สินทรัพย์ทางเลือก"; 
        } else if (typeof riskScore !== 'undefined' && riskScore <= 10) { 
            buckets.long.roi = 6.0; buckets.long.sd = 7.0; buckets.long.assets = "กองทุนผสมเน้นป้องกันความเสี่ยง / หุ้นกู้"; 
            buckets.retire.roi = 6.0; buckets.retire.sd = 7.0; buckets.retire.assets = "กองทุนผสมเน้นป้องกันความเสี่ยง / หุ้นกู้"; 
        } else if (ageForAlloc >= 55) {
            buckets.long.roi = 5.5; buckets.long.sd = 6.0; buckets.long.assets = "หุ้นปันผล / REITs / ตราสารหนี้ระยะยาว";
            buckets.retire.roi = 5.5; buckets.retire.sd = 6.0; buckets.retire.assets = "หุ้นปันผล / REITs / ตราสารหนี้ระยะยาว";
        }

        // 🧠 4. Waterfall รินเงิน
        let remainingWealth = totalWealthToAllocate;
        ['short', 'mid', 'long', 'retire'].forEach(b => {
            let need = buckets[b].targetLump;
            if (b === 'retire') { buckets[b].allocatedLump = remainingWealth; remainingWealth = 0; }
            else if (remainingWealth >= need) { buckets[b].allocatedLump = need; remainingWealth -= need; }
            else { buckets[b].allocatedLump = remainingWealth; remainingWealth = 0; }
        });

        let remainingDCA = monthlySavingToAllocate;
        ['short', 'mid', 'long', 'retire'].forEach(b => {
            let need = buckets[b].targetDCA;
            if (b === 'retire') { buckets[b].allocatedDCA += remainingDCA; remainingDCA = 0; }
            else if (remainingDCA >= need) { buckets[b].allocatedDCA = need; remainingDCA -= need; }
            else { buckets[b].allocatedDCA = remainingDCA; remainingDCA = 0; }
        });

        let newBlendedRoi = 0; let newBlendedSd = 0;
        let totalAllocatedWealthForMath = buckets.long.allocatedLump + buckets.retire.allocatedLump;
        if (totalAllocatedWealthForMath > 0) {
             newBlendedRoi = ((buckets.long.allocatedLump * buckets.long.roi) + (buckets.retire.allocatedLump * buckets.retire.roi)) / totalAllocatedWealthForMath;
             newBlendedSd = ((buckets.long.allocatedLump * buckets.long.sd) + (buckets.retire.allocatedLump * buckets.retire.sd)) / totalAllocatedWealthForMath;
        } else {
             newBlendedRoi = typeof targetRoiEst !== 'undefined' ? targetRoiEst : 5.0; 
             newBlendedSd = typeof sdEst !== 'undefined' ? sdEst : 8.0;
        }

        // 🎨 5. สร้าง UI นำถัง 1-3 ไปต่อท้าย Section 5 (SMART Goals)
        let allocHtml = `
        <div class="mt-8 border-t-2 border-gray-200 pt-6">
            <div class="mb-4 bg-indigo-50/50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm">
                <h4 class="font-bold text-indigo-900 text-lg flex items-center"><span class="mr-2">🧺</span> Multi-Goal Asset Allocation (การจัดพอร์ตแยกตามเป้าหมาย)</h4>
                <p class="text-sm text-gray-700 mt-1">ระบบได้ดึงเม็ดเงินออมไปจัดสรรลงตะกร้าตามกรอบเวลา เพื่อให้เป้าหมายระยะสั้นปลอดภัย และเป้าหมายระยะยาวเติบโต <span class="text-red-500 font-medium">(※ ถังทุนเกษียณ/มรดก ถูกกันเงินแยกไปประมวลผลเชิงลึกในส่วนที่ 7)</span></p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">`;

        ['short', 'mid', 'long'].forEach(b => {
            let buck = buckets[b];
            let goalsListStr = buck.goals.map(g => `<li class="truncate pb-1 border-b border-${buck.color}-200/50 last:border-0 last:pb-0 before:content-['•'] before:mr-1 before:text-${buck.color}-500">${g.name}</li>`).join('');
            if (!goalsListStr) goalsListStr = `<li class="text-gray-400 italic text-center py-2">- ไม่มีเป้าหมายในระยะนี้ -</li>`;
            let hasFunds = (buck.allocatedLump > 0 || buck.allocatedDCA > 0);
            let opacityClass = hasFunds ? "opacity-100" : "opacity-60 grayscale-[30%]";

            allocHtml += `
            <div class="bg-white p-4 rounded-xl border-t-4 border-${buck.color}-500 shadow-md hover-scale flex flex-col h-full ${opacityClass}">
                <h5 class="font-bold text-${buck.color}-800 mb-3 text-sm">${buck.name}</h5>
                <div class="bg-${buck.color}-50 p-3 rounded-lg text-xs text-${buck.color}-900 mb-4 flex-grow shadow-inner border border-${buck.color}-100">
                    <p class="font-bold mb-2 text-[10px] uppercase tracking-widest text-${buck.color}-600">รายการเป้าหมาย:</p>
                    <ul class="space-y-1.5">${goalsListStr}</ul>
                </div>
                <div class="space-y-2 border-t border-gray-100 pt-3 mt-auto">
                    <div class="flex justify-between items-center text-xs"><span class="text-gray-600">เงินก้อน:</span><span class="font-bold text-gray-800">${fmt(buck.allocatedLump)} ฿</span></div>
                    <div class="flex justify-between items-center text-xs"><span class="text-gray-600">ออมเพิ่ม (DCA):</span><span class="font-bold text-indigo-600">${fmt(buck.allocatedDCA)} ฿/ด.</span></div>
                </div>
                <div class="mt-4 bg-gray-50 p-3 rounded-lg border text-center shadow-sm">
                    <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">ลงทุนใน</p>
                    <p class="text-[11px] font-bold text-gray-800 leading-tight">${buck.assets}</p>
                    <p class="text-[10px] text-${buck.color}-600 font-bold mt-1.5 bg-${buck.color}-100/50 inline-block px-2 py-0.5 rounded-full border border-${buck.color}-200">
                        คาดหวัง ${buck.roi.toFixed(1)}% | SD ${buck.sd.toFixed(1)}%
                    </p>
                </div>
            </div>`;
        });
        allocHtml += `</div></div>`;

        // นำตะกร้า 3 ใบไปแปะต่อท้ายเป้าหมาย SMART Goals (Section 5)
        let smartGoalsContainer = document.getElementById('smart_goals_container');
        if (smartGoalsContainer) {
            smartGoalsContainer.innerHTML = goalsHtml + allocHtml;
        }

        // 🎨 6. สร้าง UI ถังเกษียณและฉีดเข้า Section 7 (ถูกยกเลิกการแสดงผลตามคำขอ)
        let retireBuck = buckets['retire'];
        
        // ลบ Wrapper ตัวเก่าทิ้งเสมอเพื่อไม่ให้รกหน้าจอ
        let oldRetireBox = document.getElementById('injected_retire_box');
        if (oldRetireBox) oldRetireBox.remove(); 
        let oldWrapper = document.getElementById('injected_retire_box_wrapper');
        if(oldWrapper) oldWrapper.remove();

        targetRoiEst = newBlendedRoi;
        sdEst = newBlendedSd;

        // ---------------------------------------------------------------------
        // 🎲 4. [SIMULATION] Monte Carlo Simulation (รัน 2,000 รอบ)
        // ---------------------------------------------------------------------
        function runMiniMonteCarlo5Y(initW, roi, sd, baseSavePerYear, isCurrent) {
            let iterations = 2000;
            let resultsByYear = { 1: [], 2: [], 3: [], 4: [], 5: [] };
            
            let _skew = isCurrent ? 0 : typeof skew !== 'undefined' ? skew : 0;
            let _kurt = isCurrent ? 0 : typeof kurt !== 'undefined' ? kurt : 0;
            let _jumpF = isCurrent ? 0.01 : typeof jumpF !== 'undefined' ? jumpF : 0;
            let _jumpM = typeof jumpM !== 'undefined' ? jumpM : 0;
            let _jumpS = typeof jumpS !== 'undefined' ? jumpS : 0;
            
            for (let i = 0; i < iterations; i++) {
                let w = initW;
                let currentRegime5Y = 1;
                
                for (let y = 1; y <= 5; y++) {
                    currentRegime5Y = getNextRegime(currentRegime5Y);

                    let currentYearDebtPmt = 0;
                    if (y <= debtBuckets.shortTerm.assumeYears) currentYearDebtPmt += actualPmtShort;
                    if (y <= debtBuckets.car.assumeYears)       currentYearDebtPmt += actualPmtCar;
                    if (y <= debtBuckets.home.assumeYears)      currentYearDebtPmt += actualPmtHome;
                    if (y <= debtBuckets.other.assumeYears)     currentYearDebtPmt += actualPmtOther;
                    if (y <= debtBuckets.interestOnly.assumeYears) currentYearDebtPmt += actualPmtInterestOnly; // 🚨 จะถูกหักออกตลอดกาล เพราะอายุ 99 ปี
                    
                    let freedUpCashflow = annualDebtPmtTotal - currentYearDebtPmt;
                    let actualSavePerYear = baseSavePerYear + freedUpCashflow;

                    let simulatedRoi = roi;
                    if (typeof getAdvancedReturn === 'function') {
                        simulatedRoi = getAdvancedReturn(roi, sd, _skew, _kurt, _jumpF, _jumpM, _jumpS, currentRegime5Y);
                    } else {
                        let u = 0, v = 0; while(u === 0) u = Math.random(); while(v === 0) v = Math.random();
                        let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                        simulatedRoi = roi + (sd * num);
                    }
                    
                    w = (w * (1 + simulatedRoi)) + actualSavePerYear;
                    if (w < 0) w = 0;
                    resultsByYear[y].push(w);
                }
            }
            
            let stats = {};
            for (let y = 1; y <= 5; y++) {
                let sorted = resultsByYear[y].sort((a, b) => a - b);
                let expected = sorted[Math.floor(iterations * 0.5)]; 
                let cutoffIndex = Math.floor(iterations * 0.05);
                let worst5Percent = sorted.slice(0, cutoffIndex);
                let cvar = worst5Percent.reduce((sum, val) => sum + val, 0) / worst5Percent.length;
                stats[y] = { expected: expected, cvar: Math.max((initW + (baseSavePerYear * y)) * 0.3, cvar) }; 
            }
            return stats;
        }

        // ---------------------------------------------------------------------
        // 🛠️ [FIX 2] ตรวจสอบกระแสเงินสดสุทธิ (ใช้ตัวแปร totalExp ที่คำนวณไว้แล้ว)
        // ---------------------------------------------------------------------
        let totalIncomeMonthly = (typeof totalInc !== 'undefined' ? totalInc : 0);
        let totalExpenseMonthly = (typeof totalExp !== 'undefined' ? totalExp : 0);
        
        // คำนวณกระแสเงินสดสุทธิต่อปี (ถ้ารายจ่ายมากกว่ารายรับ ค่านี้จะติดลบอย่างถูกต้อง)
        netCashflowYearly = (totalIncomeMonthly - totalExpenseMonthly) * 12;

        let annualSaveC = typeof expSave !== 'undefined' ? expSave * 12 : 0;
        let annualSaveR = typeof propSave !== 'undefined' ? propSave * 12 : 0;
        
        // ป้องกัน Error หากไม่มีตัวแปรให้ยึดค่า propSave เป็นหลัก
        if(annualSaveC === 0 && annualSaveR > 0) annualSaveC = annualSaveR; 

        // 🧠 AI Logic: ถ้าเงินช็อต (Net CF ติดลบ) เงินออมเพื่อลงทุนประจำปีจะถูกกลืนกิน และกลายเป็นยอดถอน (Negative Save)
        if (netCashflowYearly < 0) {
            annualSaveC = netCashflowYearly; // พอร์ตปัจจุบัน: บังคับให้ระบบถอนเงินออกจากพอร์ตมาอุดรอยรั่วทุกปี
        }

        // โยนตัวเลขเข้าสู่ระบบจำลอง Monte Carlo 2,000 รอบ
        let mcStatsC = runMiniMonteCarlo5Y(investableAssets, currentPortfolioRoiEst / 100, currentSdEst / 100, annualSaveC, true);
        let mcStatsR = runMiniMonteCarlo5Y(investableAssets, targetRoiEst / 100, sdEst / 100, annualSaveR, false);
        window.latestSimulationStats = {
            iterationsRun: mcParams.iterations,
            probabilityDIY: currentMcProb,
            probabilityProposed: finalMcProb,
            depleteAgeProposed: depleteAge_normal, 
            worstCase5YrCVaR: mcStatsR[5] ? mcStatsR[5].cvar : 0,
            macroContext: {
                inflationAssumption: infRate,
                medInflationAssumption: r_med_inf,
                marketReturnAssumption: targetRoiEst
            }
        };

        // ---------------------------------------------------------------------
        // 📊 5. [RENDER] สร้างตาราง HTML พร้อมระบุ ROI, SD และ % ความคลาดเคลื่อน 
        // ---------------------------------------------------------------------
        let cRoi = Number(currentPortfolioRoiEst || 0).toFixed(2);
        let cSd = Number(currentSdEst || 0).toFixed(2);
        let rRoi = Number(targetRoiEst || 0).toFixed(2);
        let rSd = Number(sdEst || 0).toFixed(2);

        let cfWarningHtml = "";
        if (netCashflowYearly < 0) {
            cfWarningHtml = `
                <div class="bg-red-50 border-l-4 border-red-500 p-3 mb-3 rounded-r text-sm text-red-700 flex items-start">
                    <span class="mr-2 text-lg">⚠️</span>
                    <div><strong>AI Warning: กระแสเงินสดรายเดือนติดลบ!</strong><br>
                    <span class="text-xs">ระบบตรวจพบรอยรั่วทางการเงิน จึงจำลองการ "ถอนเงิน" ออกจากพอร์ตปัจจุบันมาใช้จ่ายปีละ ${Number(Math.abs(netCashflowYearly)).toLocaleString()} บาท ซึ่งส่งผลกระทบรุนแรงต่อการเติบโตในอนาคต</span></div>
                </div>
            `;
        }
        let fc5Html = `
            <div class="overflow-x-auto w-full pb-2 mt-4">
                <table class="w-full text-sm text-left border-collapse mb-0">
                    <thead class="bg-gray-100 text-gray-800 border-b-2 border-gray-300">
                        <tr>
                            <th rowspan="2" class="p-3 w-1/5 text-center font-bold border-r border-gray-200 align-middle">ระยะเวลา</th>
                            <th colspan="2" class="p-2 text-center font-bold border-r border-gray-200 bg-gray-50">
                                📊 พฤติกรรมเดิม (Status Quo)<br>
                                <span class="text-[10px] font-normal text-gray-500">ผลตอบแทนคาดหวัง ${cRoi}% | ความผันผวน (SD) ${cSd}%</span>
                            </th>
                            <th colspan="2" class="p-2 text-center font-bold text-blue-800 bg-blue-50/50">
                                🚀 แผนแนะนำ (Proposed Plan)<br>
                                <span class="text-[10px] font-normal text-blue-500">ผลตอบแทนคาดหวัง ${rRoi}% | ความผันผวน (SD) ${rSd}%</span>
                            </th>
                        </tr>
                        <tr class="text-xs">
                            <th class="p-2 text-right text-gray-700 bg-gray-50 border-t border-gray-200">เติบโตคาดหวัง (Expected)</th>
                            <th class="p-2 text-right text-red-700 bg-red-50 border-t border-r border-gray-200">กรณีเลวร้ายสุด 5% (CVaR)</th>
                            <th class="p-2 text-right text-blue-700 bg-blue-50/50 border-t border-gray-200">เติบโตคาดหวัง (Expected)</th>
                            <th class="p-2 text-right text-orange-700 bg-orange-50 border-t border-gray-200">กรณีเลวร้ายสุด 5% (CVaR)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
        `;

        const fmt2 = (num) => Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        for(let y = 1; y <= 5; y++) {
            let expC = mcStatsC[y].expected; let cvarC = mcStatsC[y].cvar;
            let expR = mcStatsR[y].expected; let cvarR = mcStatsR[y].cvar;

            let dropC_pct = (((cvarC - expC) / expC) * 100).toFixed(1);
            let dropR_pct = (((cvarR - expR) / expR) * 100).toFixed(1);

            fc5Html += `
                <tr class="hover:bg-gray-50 transition">
                    <td class="p-3 text-center font-bold text-gray-700 bg-gray-50 border-r border-gray-200">สิ้นปีที่ ${y}</td>
                    <td class="p-3 text-right text-gray-700 font-medium">${fmt2(expC)}</td>
                    <td class="p-3 text-right text-red-600 bg-red-50/30 border-r border-gray-200">
                        <span class="font-bold">${fmt2(cvarC)}</span><br><span class="text-[10px] text-red-400 font-normal">(${dropC_pct}%)</span>
                    </td>
                    <td class="p-3 text-right text-blue-700 font-bold">${fmt2(expR)}</td>
                    <td class="p-3 text-right text-orange-600 bg-orange-50/30">
                        <span class="font-bold">${fmt2(cvarR)}</span><br><span class="text-[10px] text-orange-400 font-normal">(${dropR_pct}%)</span>
                    </td>
                </tr>
            `;
        }
        fc5Html += `</tbody></table></div>`;
        
        let container82 = document.getElementById('tb_5yr_forecast_container');
        if (container82) container82.innerHTML = fc5Html;

        // ---------------------------------------------------------------------
        // 🤖 6. [NLG] AI Insight (อัปเดตคำอธิบายสำหรับตาราง 5 ปี)
        // ---------------------------------------------------------------------
        let targetDescElement = document.getElementById('forecast_5yr_desc');
        if (targetDescElement) {
            targetDescElement.innerHTML = `
                <div class="flex flex-col gap-2">
                    <p class="font-bold text-indigo-700 flex items-center"><span class="mr-2">💡</span> AI Insight: ตารางคาดการณ์มูลค่าสินทรัพย์และจำลองวิกฤต (5-Year Horizon)</p>
                    <p class="leading-relaxed text-gray-800">
                        แม้กราฟเป้าหมายเกษียณระยะยาวจะดูเติบโตสวยงาม แต่ในโลกความเป็นจริง การลงทุนระยะ 1-5 ปีแรกมักจะเต็มไปด้วยความผันผวน ตารางนี้จะตอบคำถามว่า <span class="font-semibold text-indigo-900">"หากคุณเริ่มลงทุนตามแผน AI วันนี้ แล้วบังเอิญเจอตลาดหุ้นตกหนักหรือวิกฤตเศรษฐกิจ พอร์ตของคุณจะสามารถรับแรงกระแทกได้ดีกว่าพฤติกรรมเดิมแค่ไหน?"</span>
                    </p>
                    <p class="text-xs text-gray-500 italic border-t border-gray-200 pt-2 mt-1">
                        *ประมวลผลความเสี่ยงขาลงด้วยโมเดล Expected Shortfall (CVaR 95%) เพื่อจำลองสถานการณ์ 5% ที่เลวร้ายที่สุด (Worst-case Scenario) ให้คุณเห็นภาพความเสี่ยงที่แท้จริงก่อนตัดสินใจลงทุน
                    </p>
                </div>
            `;
            targetDescElement.className = "text-sm p-5 bg-indigo-50/50 border-l-4 border-indigo-500 rounded-r-xl shadow-sm mb-4";
        }

        // 🧠 [NLG] AI Expert Analysis (Behavioral/DISC focus)
        let aiAdviceHtml = '';
        const buildAiBlock = (icon, title, color, content) => `
            <div class="relative bg-white p-5 rounded-xl border border-${color}-100 shadow-sm hover-scale group">
                <div class="absolute -left-3 -top-3 w-10 h-10 bg-${color}-100 text-${color}-600 rounded-full flex items-center justify-center text-xl shadow border border-white group-hover:scale-110 transition-transform">${icon}</div>
                <h4 class="font-bold text-${color}-800 ml-6 mb-2 text-lg">${title}</h4>
                <div class="text-sm text-gray-700 leading-relaxed">${content}</div>
            </div>
        `;

        if (pyramidIsStrong) {
            aiAdviceHtml += buildAiBlock('🛡️', 'รากฐานแข็งแกร่ง (D-Style: Focus on Growth)', 'green', pickStr([
                `ฐานรากทางการเงินของคุณมั่นคงแล้ว (สภาพคล่องและประกันเพียงพอ) สิ่งที่คุณควรโฟกัสตอนนี้คือ <b>"ความเร็วในการเติบโต (Velocity of Money)"</b> แนะนำให้จัดสรรเงินส่วนเกินไปที่สินทรัพย์เติบโตสูง เพื่อร่นระยะเวลาสู่เป้าหมาย`,
                `เมื่อป้อมปราการป้องกันความเสี่ยงไร้รอยรั่ว คุณก็สามารถ <b>"บุกทำกำไรได้อย่างเต็มกำลัง"</b> พิจารณาเพิ่มสัดส่วนพอร์ตในตราสารทุนโลก หรือ Unit Linked เพื่อให้เงินทำงานหนักขึ้นแทนคุณ`
            ]));
        } else {
            if (diffEmg < 0 && (diffLife < 0 || diffHealth < 0)) {
                aiAdviceHtml += buildAiBlock('⚠️', 'อุดรอยรั่วฉุกเฉิน (S-Style: Focus on Security)', 'red', pickStr([
                    `ความเสี่ยงหลักตอนนี้คือ <b>"สภาพคล่องและวงเงินคุ้มครอง"</b> หากเกิดเหตุไม่คาดฝัน ความมั่งคั่งทั้งหมดอาจถูกทำลาย แนะนำให้เร่งสร้างสภาพคล่อง ${liqBenchmarkMin} เดือน และโอนความเสี่ยงให้ประกัน (AIA) ทันที`
                ]));
            } else if (diffEmg < 0) {
                aiAdviceHtml += buildAiBlock('⚠️', 'เร่งเติมสภาพคล่อง (S-Style: Focus on Security)', 'orange', pickStr([
                    `ความเสี่ยงหลักตอนนี้คือ <b>"การขาดเงินสำรองฉุกเฉิน"</b> แม้คุณจะมีความคุ้มครองที่ดี แต่หากรายได้สะดุดอาจต้องกู้หนี้ยืมสิน แนะนำให้เร่งสร้างสภาพคล่อง ${liqBenchmarkMin} เดือนให้เต็มก่อนเริ่มลงทุน`
                ]));
            } else {
                let gapText = diffHealth < 0 ? "ค่ารักษาพยาบาล" : "ทุนชีวิต";
                aiAdviceHtml += buildAiBlock('⚠️', 'ปิดความเสี่ยง (S-Style: Focus on Protection)', 'red', pickStr([
                    `สภาพคล่องคุณดีแล้ว แต่ป้อมปราการยังมีรอยรั่วเรื่อง <b>"วงเงินคุ้มครอง${gapText}"</b> หากเกิดเหตุไม่คาดฝัน ความมั่งคั่งทั้งหมดอาจถูกบังคับขาย แนะนำให้โอนความเสี่ยงให้ระบบประกันทันที`
                ]));
            }
        }

        if (rDebt > 40) {
            aiAdviceHtml += buildAiBlock('📉', 'ยุทธการปลดหนี้ (C-Style: Focus on Numbers)', 'orange', pickStr([
                `อัตราส่วนหนี้สินคุณ (${rDebt.toFixed(1)}%) อยู่ในโซนอันตราย ดอกเบี้ยจ่ายกำลังกัดกินความมั่งคั่ง แนะนำเทคนิค <b>Debt Snowball</b> โปะหนี้ดอกเบี้ยสูงให้จบก่อน เพราะการลดรายจ่ายดอกเบี้ยได้ผลลัพธ์แน่นอนกว่าหาผลตอบแทนจากตลาดหุ้น`,
                `กระแสเงินสดของคุณกำลังติดกับดักภาระหนี้บริโภค <b>(Debt Trap)</b> ระบบขอให้คุณโฟกัสทรัพยากรทั้งหมดไปที่การเคลียร์หนี้ก้อนที่ดอกเบี้ยแพงที่สุดก่อน เพื่อปลดปล่อยสภาพคล่องกลับคืนมา`,
                `ตัวเลขคณิตศาสตร์ไม่เคยโกหก ดอกเบี้ยหนี้สินกำลังทำให้พอร์ตโดยรวมของคุณเติบโตช้าลง การปิดหนี้บัตรเครดิตหรือสินเชื่อส่วนบุคคล คือ "การลงทุน" ที่ดีที่สุดและไร้ความเสี่ยงที่สุดในตอนนี้`
            ]));
        } else {
            if (rawAge >= retAge) {
                // 🧠 AI Advice สำหรับคนเกษียณ
                aiAdviceHtml += buildAiBlock('🛡️', 'รักษาสมดุลเงินก้อนสุดท้าย (Focus on Capital Preservation)', 'blue', pickStr([
                    `คุณอยู่ในช่วงวัยแห่งการเก็บเกี่ยวผลจากการทำงานหนัก เป้าหมายหลักตอนนี้ไม่ใช่การหาผลตอบแทนสูงสุด แต่คือการ <b>"ปกป้องเงินต้น"</b> และบริหารการถอนเงินให้พอใช้ไปตลอดชีวิต (Longevity Risk Management)`,
                    `พอร์ตการลงทุนในวัยเกษียณควรเน้นสร้าง <b>Passive Income</b> ที่สม่ำเสมอ เช่น หุ้นกู้คุณภาพสูง หรือกองทุนอสังหาริมทรัพย์ เพื่อนำกระแสเงินสดมาใช้จ่ายรายเดือน โดยหลีกเลี่ยงการขายทำกำไรกินทุนก้อนหลัก`
                ]));
            } else {
                // 🧠 AI Advice สำหรับคนวัยทำงาน
                if (rSave < 10) {
                    aiAdviceHtml += buildAiBlock('🚨', 'เพิ่มพลังออมด่วน (S-Style: Focus on Security)', 'red', pickStr([
                        `เงินออมของคุณตอนนี้ (${rSave.toFixed(1)}%) ยังไม่พอที่จะเอาชนะเงินเฟ้อและเป้าหมายระยะยาวได้ แนะนำให้ทำงบประมาณแบบ Zero-Based Budgeting ตัดรายจ่ายฟุ่มเฟือย และดึงเงินออมให้ถึง 10-20% โดยด่วน`,
                        `จำไว้ว่า <b>"รายได้สูง ไม่เท่ากับ มั่งคั่งสูง"</b> วินัยการออมที่ต่ำกว่าเกณฑ์กำลังเป็นตัวถ่วงแผนการเงินของคุณ เริ่มต้นง่ายๆ ด้วยการหักบัญชีอัตโนมัติ (DCA) ทันทีที่เงินเดือนออก`
                    ]));
                } else {
                    let ulPref = document.getElementById('p_unitlinked') ? document.getElementById('p_unitlinked').value : "";
                    let explicitlyWantsUL = ulPref.includes('สนใจ') && !ulPref.includes('ไม่สนใจ');
                    let ulPitch = (explicitlyWantsUL || (wantUnitLinked && rawAge < 50)) ? `ลองพิจารณา <b>AIA Unit Linked</b> ที่ช่วยจัดพอร์ตระดับโลก พร้อมสิทธิลดหย่อนภาษี` : `การจัดพอร์ตกระจายความเสี่ยงระดับสากล จะช่วยปกป้องความมั่งคั่งให้เงินทำงานหนักขึ้นแทนคุณ`;
                    
                    aiAdviceHtml += buildAiBlock('🚀', 'เตรียมสปีดความมั่งคั่ง (I-Style: Focus on Premium Lifestyle)', 'purple', pickStr([
                        `วินัยทางการเงินของคุณยอดเยี่ยมมาก! (ออม ${rSave.toFixed(1)}%) ขั้นต่อไปคือการ <b>"Optimize"</b> ภาษีและผลตอบแทน ${ulPitch}`,
                        `คุณคือนักออมตัวยง! ตอนนี้ถึงเวลาให้เงินทำงานอย่างมีประสิทธิภาพสูงสุด การพึ่งพาที่ปรึกษาทางการเงินเพื่อจัด <b>Strategic Asset Allocation</b> จะช่วยให้พอร์ตของคุณเติบโตอย่างมั่นคงและยั่งยืน`
                    ]));
                }
            }
        }

        if(taxAlpha > 0) {
             aiAdviceHtml += buildAiBlock('💰', 'สร้าง Tax Alpha (D-Style: Maximize Returns)', 'yellow', pickStr([
                 `คุณกำลังเสียเงินฟรีๆ ให้กับภาษี! แผนใหม่นี้ช่วยคุณสร้าง <b>Tax Alpha ได้ ${fmt(taxAlpha)} บาท/ปี</b> นำเงินส่วนนี้กลับไปรีอินเวสต์ (Re-invest) มันคือผลตอบแทนการันตีตั้งแต่วันแรกโดยไม่ต้องรับความเสี่ยงตลาดเลยครับ`,
                 `ทำไมต้องจ่ายภาษีเกินความจำเป็น? การจัดสรรเงินเข้าเครื่องมือลดหย่อน ไม่เพียงแต่ช่วยปกป้องความมั่งคั่ง แต่ยังเป็นการดึงเงินสดกลับมาหมุนเวียนในพอร์ตการลงทุนของคุณได้ทันที`,
                 `นี่คือโอกาส Arbitrage ที่ไม่ควรพลาด การปรับแผนลดหย่อนภาษีจะช่วยปิดรอยรั่วทางภาษี และเพิ่มอัตราผลตอบแทนรวม (Total Return) ให้กับแผนการเงินของคุณได้อย่างง่ายดาย`
             ]));
        }

        document.getElementById('ai_advice_container').innerHTML = aiAdviceHtml;

        // ==========================================
        // 🌪️ 10. แบบจำลองสถานการณ์ความเสี่ยง (Contextual Historical Stress Test - Powered by Real 8D K-Means)
        // ==========================================
        let scnHtml = '';
        
        const buildScn = (title, currentImpact, recImpact, color, aiInsight, icon) => `
            <div class="bg-white rounded-xl p-5 shadow-sm border-t-4 border-${color}-500 flex flex-col h-full break-inside-avoid border-x border-b border-gray-200 hover:shadow-md transition">
                <div class="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                    <span class="text-3xl">${icon}</span>
                    <h4 class="font-bold text-gray-800 text-sm leading-tight">${title}</h4>
                </div>
                <div class="flex flex-col gap-2 mb-4 flex-grow text-xs">
                    <div class="bg-red-50 text-red-700 p-2.5 rounded border border-red-100">
                        <span class="font-bold block mb-1 text-[10px] uppercase tracking-wider">📉 หากใช้แผนเดิม:</span> 
                        ${currentImpact}
                    </div>
                    <div class="bg-green-50 text-green-700 p-2.5 rounded border border-green-100">
                        <span class="font-bold block mb-1 text-[10px] uppercase tracking-wider">🛡️ หากใช้แผน AI:</span> 
                        ${recImpact}
                    </div>
                </div>
                <div class="bg-${color}-50 p-3 rounded-lg text-[11px] text-${color}-800 border border-${color}-100 mt-auto shadow-inner">
                    <span class="font-bold block mb-1">🤖 AI Historical Insight:</span>
                    <span class="leading-relaxed">${aiInsight}</span>
                </div>
            </div>
        `;

        // 🧠 --- 8D K-Means Clustering Engine (Real ML Logic) ---
        // 1. ดึงค่าจากผู้ใช้ (ใช้ค่าสมมติหากบางตัวแปรไม่มีในสโคป)
        let uAge = typeof rawAge !== 'undefined' ? rawAge : 30;
        let uInc = typeof totalInc !== 'undefined' ? totalInc * 12 : 360000;
        let uSaveRate = (typeof propSave !== 'undefined' && totalInc > 0) ? (propSave / totalInc) : 0.1;
        let uNetWorth = (typeof astInvest !== 'undefined' ? astInvest : 0) + (typeof liqCash !== 'undefined' ? liqCash : 0);
        let uRisk = typeof targetRoiEst !== 'undefined' ? targetRoiEst : 5;
        let uDep = typeof dep !== 'undefined' ? dep : 0;
        
// 🧠 --- FHS (Filtered Historical Simulation) Modifier ---
let marketVolatilityScale = (typeof autoFetchedData !== 'undefined' && autoFetchedData !== null && autoFetchedData.sentimentScore < 0.5) ? 1.5 : 1.0; 

// --- 1. Health & Critical Illness Crisis (วิกฤตสุขภาพ โจมตีเงินเก็บ) ---
// ⚠️ สำคัญมาก: เปลี่ยนชื่อกลุ่มใน If ให้เป็นชื่อของระบบใหม่ 12 กลุ่มด้วยครับ
let healthInsight = (detectedCluster.includes("Gen Z") || detectedCluster.includes("First-Jobber") || uAge < 35) ? 
    `อัลกอริทึม <b>8D K-Means</b> จัดคุณอยู่ในกลุ่ม <b>${detectedCluster}</b> สถิติชี้ว่าผู้ป่วยโรคร้ายแรงวัยนี้เพิ่มขึ้น 15% การโอนความเสี่ยง (Risk Transfer) จะช่วยปกป้องพลังดอกเบี้ยทบต้นของคุณไม่ให้พังทลาย` : 
    `วิเคราะห์จากโปรไฟล์ <b>${detectedCluster}</b> ข้อมูล Historical Data ชี้ว่า <b>เงินเฟ้อทางการแพทย์สูงกว่าทั่วไปถึง 2 เท่า</b> แผน Protection นี้คํานวณเพื่อล็อกความเสี่ยงไม่ให้ลามไปกินเงินเกษียณ 100%`;
        scnHtml += buildScn(`วิกฤตสุขภาพ: ป่วยหนัก (ค่ารักษาเฉลี่ย ${fmt(targetHealthBase || 3000000)})`, 
            diffHealth < 0 ? pickStr(['ต้องเทขายพอร์ตลงทุนมารักษาตัว', 'เงินเก็บทั้งหมดถูกสูบสูญ', 'ครอบครัวต้องแบกภาระหนี้ก้อนใหญ่']) : 'กระทบสภาพคล่องระยะสั้นถึงปานกลาง', 
            pickStr(['วงเงิน AIA ครอบคลุมค่ารักษาทั้งหมด', 'รักษาตัวโดยไม่กระทบเงินเก็บสักบาท', 'กระแสเงินสดพอร์ตหลักยังเติบโตต่อได้']), 
            'purple', healthInsight, '🏥');

        // --- 2. Sudden Income Shock (วิกฤตขาดรายได้ โจมตีกระแสเงินสด) ---
        let shockName = (detectedCluster === "Grassroots/Struggling") ? "วิกฤตภัยแล้ง/ขาดสภาพคล่องฉับพลัน" : "วิกฤตเลิกจ้างกะทันหัน/ธุรกิจสะดุด";
        let shockInsight = `<b>Centroid Analysis</b> ตรวจพบความเสี่ยงด้านกระแสเงินสดในกลุ่มคุณ การจัดสรรเงินใหม่จะสร้าง <b>Oxygen Buffer</b> เพื่อต่อลมหายใจให้รอดพ้นช่วงวิกฤตอย่างน้อย ${typeof liqBenchmarkMin !== 'undefined' ? liqBenchmarkMin : 6} เดือน`;

        scnHtml += buildScn(`Income Shock: ${shockName} 6 เดือน`, 
            diffEmg < 0 ? pickStr(['ต้องพึ่งพาหนี้นอกระบบ/บัตรกดเงินสด', 'ขาดสภาพคล่องรุนแรงทันที', 'ไม่มีเงินจ่ายค่างวดและรายจ่ายประจำ']) : `รอดตัวไปได้ราว ${typeof liqBenchmarkMin !== 'undefined' ? liqBenchmarkMin : 6} เดือน`, 
            pickStr([`มีสำรองพอดำรงชีพ > ${typeof liqBenchmarkMin !== 'undefined' ? liqBenchmarkMin : 6} เดือน`, 'ไม่ก่อให้เกิดหนี้สินพอกพูน', 'ซื้อเวลาให้ตั้งหลักฟื้นฟูกิจการ/หางานใหม่']), 
            'orange', shockInsight, '💼');

        // --- 3. Historical Market Crash (วิกฤตเศรษฐกิจ โจมตีความมั่งคั่ง) ---
        let crashName = (detectedCluster === "HNW/Legacy" || uNetWorth > 5000000) ? "วิกฤตซับไพรม์ (Subprime 2008)" : "วิกฤตต้มยำกุ้ง (1997)";
        let crashLossCurrent = astInvest * (0.4 * marketVolatilityScale); 
        let crashLossRec = (propSave * 12 * 5) * ((typeof targetRoiEst !== 'undefined' ? targetRoiEst : 5) > 6 ? 0.2 : 0.1); 

        let crashInsight = `โมเดล <b>Filtered Historical Simulation (FHS)</b> ตรวจพบว่าพอร์ตที่มี Risk Score ระดับคุณมักเสียหายหนักใน ${crashName} การทำ Asset Allocation ใหม่จะลดแรงกระแทก (Drawdown) ลงอย่างมีนัยสำคัญ`;

        let currentCrashText = astInvest > 0 ? `มูลค่าพอร์ตหายไปราว ${fmt(crashLossCurrent)} บ. แผนสะดุดและฟื้นตัวช้า` : 'ไม่มีผลกระทบ (เนื่องจากยังไม่มีพอร์ตลงทุน)';
        let recCrashText = (astInvest > 0 || propSave > 0) ? `พอร์ตทำหน้าที่เป็น Shock Absorber ขาดทุนจำกัดเพียง ${fmt(crashLossRec)} บ.` : 'ไม่ได้รับผลกระทบ';

        scnHtml += buildScn(`Historical Crash: เศรษฐกิจถดถอย (${crashName})`, currentCrashText, recCrashText, 'red', crashInsight, '📉');

        // ✅ แสดงผลลง Container
        document.getElementById('scenario_test_container').innerHTML = `
            <div class="print-page avoid-break mt-6 mb-8">
                <div class="bg-gray-800 text-white p-4 rounded-t-xl font-bold text-sm flex items-center justify-between shadow-md">
                    <span class="flex items-center gap-2 text-lg"><span class="text-2xl">🌪️</span> 10. การทดสอบภาวะวิกฤต (Stress Test Analysis)</span>
                    <span class="bg-blue-600 text-[10px] px-2 py-0.5 rounded-full border border-blue-400 uppercase tracking-widest shadow-inner">Powered by 8D K-Means AI</span>
                </div>
                <div class="bg-gray-100 p-6 rounded-b-xl border border-gray-300 border-t-0 shadow-inner">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${scnHtml}
                    </div>
                </div>
            </div>
        `;

        // 🚨 [แก้ไข BUG] ดึงค่า % ความสำเร็จมาเตรียมไว้ก่อน เพื่อให้ส่วนที่ 11 และ 12 ดึงไปใช้ได้โดยไม่ Error
        let currentAiProbRaw = document.getElementById('ml_prob_current') ? document.getElementById('ml_prob_current').innerText : '--%';
        let proposedAiProbRaw = document.getElementById('ml_prob_proposed') ? document.getElementById('ml_prob_proposed').innerText : '--%';
        
        // ดึงตัวเลข % ออกมาเพื่อประเมินเงื่อนไขต่างๆ ด้านล่าง
        let cProbNum = parseFloat(currentAiProbRaw) || 0;
        let pProbNum = parseFloat(proposedAiProbRaw) || 0;   

        // ==========================================
        // 🛣️ 11. Alternative Strategy (A-B-C Plans + K-Means + AI Recommended + NLG)
        // ==========================================
        let altHtml = '';

        // 🧠 1. วิเคราะห์ Cluster เพื่อจ่าย "กลยุทธ์ 3 ทางเลือก" ให้ตรงโรค
        const isWealthy = userCluster.includes("UHNW") || userCluster.includes("High-Earner") || userCluster.includes("Legacy");
        const isVolatileIncome = userCluster.includes("Farmer") || userCluster.includes("Informal") || userCluster.includes("Gig");
        const isStableIncome = userCluster.includes("Corporate") || userCluster.includes("Civil");
        const isAging = userCluster.includes("Retiree") || rawAge >= 55;

        // 🧠 2. โครงสร้างฟังก์ชันสร้างกล่องทางเลือก (รองรับป้าย ⭐ Recommended)
        const buildAltBox = (title, icon, desc, listItems, isRecommended = false, nlgReason = "") => {
            let recBadge = isRecommended ? `<div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-yellow-200 z-10">⭐ AI RECOMMENDED</div>` : "";
            let ringStyle = isRecommended ? `ring-2 ring-yellow-400 transform scale-105 shadow-lg bg-gradient-to-b from-white to-yellow-50/30` : `shadow-sm bg-gradient-to-br from-gray-50 to-white hover-scale opacity-90 hover:opacity-100`;
            let reasonHtml = (isRecommended && nlgReason) ? `<div class="mt-3 pt-3 border-t border-yellow-200 text-[10px] text-yellow-800 bg-yellow-100/50 p-2 rounded-lg leading-relaxed"><span class="font-bold">💡 เหตุผลที่ AI แนะนำ:</span> ${nlgReason}</div>` : "";

            return `
            <div class="relative border p-4 rounded-xl transition duration-300 border-t-4 border-t-${icon.color}-500 ${ringStyle}">
                ${recBadge}
                <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2"><span class="text-lg">${icon.emoji}</span> ${title}</h4>
                <p class="text-xs text-gray-600 mb-3 leading-relaxed min-h-[40px]">${desc}</p>
                <ul class="text-xs text-gray-700 list-disc list-inside space-y-1.5 mb-2">
                    ${listItems.map(item => `<li>${item}</li>`).join('')}
                </ul>
                ${reasonHtml}
            </div>
            `;
        };

        // 🧠 3. สังเคราะห์ทางเลือก A, B, C ตามบริบทของกลุ่มลูกค้า
        let planA, planB, planC;
        let aiReason = "";

        if (isWealthy) {
            aiReason = pickStr([
                `โมเดลคำนวณพบว่าการใช้ Global Multi-Asset ช่วยเพิ่มโอกาสบรรลุเป้าหมายเป็น ${proposedAiProbRaw} โดยไม่ทิ้งภาระภาษีให้ทายาท`,
                `จากการวิเคราะห์กลุ่ม HNW แผนนี้ช่วยปกป้องความมั่งคั่งและสร้าง Alpha Return ได้ดีที่สุดในสภาวะตลาดปัจจุบัน`
            ]);
            planA = buildAltBox("Plan A: Legacy Protection", {emoji: "🛡️", color: "blue"}, "เน้นปกป้องทรัพย์สินกงสีและส่งมอบมรดกปลอดภาษี", ["AIA Legacy Prestige", "Family Holding Company", "พันธบัตรรัฐบาล/หุ้นกู้"], false);
            planB = buildAltBox("Plan B: Optimal Core-Satellite", {emoji: "⚖️", color: "yellow"}, "สมดุลระหว่างการปกป้องความมั่งคั่งและการเติบโตระดับสากล", ["AIA Infinite Wealth (Unit Linked)", "พอร์ต Global Allocation", "กองทุนรวมเพื่อสิทธิประโยชน์ภาษี"], true, aiReason);
            planC = buildAltBox("Plan C: Global Aggressive", {emoji: "🚀", color: "indigo"}, "มุ่งเน้นผลตอบแทนสูงสุด กระจายความเสี่ยงออกนอกประเทศ 100%", ["Offshore Private Banking", "AIA InvestPro", "Private Equity / Alternative"], false);

        } else if (isAging) {
            aiReason = pickStr([
                `AI ตรวจพบความเสี่ยงด้านค่ารักษาพยาบาล (Medical Inflation) แผนนี้จะล็อกค่าใช้จ่ายสุขภาพไม่ให้กัดกินเงินเก็บเกษียณของคุณ`,
                `ในวัยนี้ การมีกระแสเงินสดรับที่แน่นอนบวกกับสวัสดิการสุขภาพเหมาจ่าย คือสมการที่ทำให้โอกาสรอดในวัยเกษียณสูงที่สุด`
            ]);
            planA = buildAltBox("Plan A: Capital Preservation", {emoji: "💰", color: "green"}, "ปกป้องเงินต้น 100% เน้นกระแสเงินสดรับสม่ำเสมอ", ["AIA ประกันบำนาญ", "เงินฝากดอกเบี้ยสูง", "กองทุนอสังหาฯ (REITs)"], false);
            planB = buildAltBox("Plan B: Health & Yield Buffer", {emoji: "🏥", color: "yellow"}, "รักษามูลค่าเงินพร้อมสร้างกันชนค่ารักษาพยาบาลก้อนใหญ่", ["AIA Senior Happy / Health Happy", "หุ้นกู้เรตติ้ง A ขึ้นไป", "กองทุนตราสารหนี้ผสม"], true, aiReason);
            planC = buildAltBox("Plan C: Legacy Growth", {emoji: "📈", color: "red"}, "ลงทุนต่อยอดเพื่อทิ้งมรดกให้ลูกหลาน ยอมรับความแกว่งได้", ["AIA Unit Linked (เน้นส่งต่อ)", "กองทุนหุ้นปันผล (Dividend Stock)"], false);

        } else if (isVolatileIncome) {
            aiReason = pickStr([
                `สถิติของกลุ่มอาชีพอิสระชี้ว่า การขาดสภาพคล่องคือความเสี่ยงอันดับ 1 แผนนี้ให้ความยืดหยุ่นสูงสุดและป้องกันกรณีขาดรายได้ฉับพลัน`,
                `ระบบประเมินว่าการล็อกเงินก้อนใหญ่เสี่ยงเกินไปสำหรับกระแสเงินสดของคุณ แผน Micro-Accumulation จะตอบโจทย์และทำได้จริงอย่างยั่งยืน`
            ]);
            planA = buildAltBox("Plan A: Liquidity First", {emoji: "💧", color: "teal"}, "เก็บกระแสเงินสดสำรอง 100% และปิดหนี้ระยะสั้น", ["เงินฝากออมทรัพย์ดิจิทัล", "บัญชีฝากประจำ 6 เดือน", "ชำระหนี้บัตรเครดิตให้หมด"], false);
            planB = buildAltBox("Plan B: Micro-Accumulation", {emoji: "🌱", color: "yellow"}, "ออมยืดหยุ่นทีละน้อย พร้อมสวัสดิการชดเชยรายได้", ["AIA ชดเชยรายได้รายวัน (HB)", "ออมทอง/กองทุนรวม 100 บาท", "ประกันอุบัติเหตุส่วนบุคคล (PA)"], true, aiReason);
            planC = buildAltBox("Plan C: High Yield Seeking", {emoji: "🔥", color: "red"}, "รับความเสี่ยงสูงเพื่อหวังเงินก้อนใหญ่มาหมุนเวียนธุรกิจ", ["หุ้นเทคฯ / คริปโตฯ (สัดส่วนเล็ก)", "กองทุน High Yield Bond"], false);

        } else {
            // Default / Corporate / Civil Servant
            aiReason = pickStr([
                `ระบบจำลอง (Simulation) พบว่าการทำ DCA ร่วมกับ Unit Linked ช่วยเร่งผลตอบแทนทบต้นให้คุณบรรลุเป้าหมายเกษียณได้เร็วขึ้น 3-5 ปี`,
                `พฤติกรรมการเงินของคุณเหมาะกับการใช้ระบบ "ตัดเงินอัตโนมัติ" แผนนี้จะเปลี่ยนวินัยให้เป็นความมั่งคั่งพร้อมได้สิทธิลดหย่อนภาษีเต็มแม็กซ์`
            ]);
            planA = buildAltBox("Plan A: Tax & Safety", {emoji: "🛡️", color: "emerald"}, "เน้นความชัวร์ ได้ลดหย่อนภาษี เงินต้นไม่หาย", ["AIA 15/25 (สะสมทรัพย์)", "พันธบัตรรัฐบาล / เงินฝาก", "Provident Fund / กบข. (ขั้นต่ำ)"], false);
            planB = buildAltBox("Plan B: Core-Growth (DCA)", {emoji: "📈", color: "yellow"}, "จัดพอร์ตลงทุนระยะยาวควบคู่ความคุ้มครอง (สมดุลที่สุด)", ["AIA Issara Plus (Unit Linked)", "DCA กองทุนรวมดัชนีโลก (Index)", "Max ภาษีด้วย SSF/RMF/ThaiESG"], true, aiReason);
            planC = buildAltBox("Plan C: Aggressive FIRE", {emoji: "🚀", color: "purple"}, "ซิ่งสุดตัวเพื่อเป้าหมายเกษียณเร็ว (Financial Independence)", ["จัดพอร์ตหุ้นเติบโต (Growth Stock)", "AIA InvestPro (เร่งผลตอบแทน)", "เพิ่มสัดส่วน Alternative Asset"], false);
        }

        altHtml = `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            ${planA}
            ${planB}
            ${planC}
        </div>`;
        
        document.getElementById('alt_strategy_container').innerHTML = altHtml;

        // 12. Macroeconomics
        // 💡 ดึงเวลาอัพเดทล่าสุด
        let updateTimeStr = window.globalMacroData ? window.globalMacroData.lastUpdate : new Date().toLocaleString('th-TH');
    
        // 💡 บังคับดึงตัวเลขจากที่อัพเดทมา (ถ้ามี) ถ้าไม่มีให้ใช้ค่าเดิมในระบบ
        let displayInf = window.globalMacroData ? window.globalMacroData.inflation : (typeof infRate !== 'undefined' ? infRate : 3.0);
        let displayMedInf = window.globalMacroData ? window.globalMacroData.medInflation : (typeof r_med_inf !== 'undefined' ? r_med_inf : 6.0);
        let displayRet = window.globalMacroData ? window.globalMacroData.marketReturn : (typeof targetRoiEst !== 'undefined' ? targetRoiEst : 5.0);
    
        document.getElementById('eco_indicators_container').innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-indigo-900 flex items-center gap-2"><span class="text-xl">📊</span> ฐานข้อมูลเศรษฐกิจมหภาค (Macro-Economic Base)</h3>
            <span class="text-[10px] bg-indigo-50 px-3 py-1 rounded-full text-indigo-600 border border-indigo-200 shadow-sm font-semibold">
                อ้างอิงข้อมูล ณ: ${updateTimeStr}
            </span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-2">
            <div class="bg-gray-50 border border-gray-100 p-3 rounded-xl hover-scale">
                <p class="text-xs text-gray-500 mb-1">สมมติฐานเงินเฟ้อทั่วไป</p>
                <p class="font-bold text-2xl text-orange-600">${displayInf.toFixed(2)}%<span class="text-xs text-orange-400">/ปี</span></p>
            </div>
            <div class="bg-gray-50 border border-gray-100 p-3 rounded-xl hover-scale">
                <p class="text-xs text-gray-500 mb-1">เงินเฟ้อทางการแพทย์</p>
                <p class="font-bold text-2xl text-red-600">${displayMedInf.toFixed(2)}%<span class="text-xs text-red-400">/ปี</span></p>
            </div>
            <div class="bg-gray-50 border border-gray-100 p-3 rounded-xl hover-scale">
                <p class="text-xs text-gray-500 mb-1">ผลตอบแทนที่คาดหวัง</p>
                <p class="font-bold text-2xl text-blue-600">${displayRet.toFixed(2)}%<span class="text-xs text-blue-400">/ปี</span></p>
            </div>
            <div class="bg-gray-50 border border-gray-100 p-3 rounded-xl hover-scale">
                <p class="text-xs text-gray-500 mb-1">Risk Profile (บุคลิกการลงทุน)</p>
                <p class="font-bold text-sm text-indigo-700 mt-2">${typeof riskLevel !== 'undefined' ? riskLevel : 'ไม่ระบุ'}</p>
            </div>
        </div>
        <p class="text-[10px] text-gray-400 mt-3 text-center">* แผนการเงินนี้ได้ปรับสมมติฐานค่าเงินตามเวลา (Time Value of Money) และทดสอบแบบจำลอง Stress Test ตามตัวเลขดัชนีด้านบนเรียบร้อยแล้ว</p>
    `;

        // --- ส่วนที่เพิ่ม: Generate Insurance Summary UI ---
        let insSummaryHtml = '';
        document.querySelectorAll('#c_ins .policy-wrapper').forEach((wrapper, index) => {
            const baseRow = wrapper.querySelector('.custom-row:first-child');
            if(!baseRow) return;
            
            const bName = baseRow.querySelector('.col-ins-name').value || 'กรมธรรม์หลักไม่ได้ระบุชื่อ';
            const bVal = parseNum(baseRow.querySelector('.col-ins-val').value) || 0;
            const bPrem = parseNum(baseRow.querySelector('.col-ins-prem').value) || 0;
            const bStart = baseRow.querySelector('.col-ins-start').value;
            const bEnd = baseRow.querySelector('.col-ins-end').value;

            let totalPolicyPrem = bPrem;
            let ridersHtml = '';

            wrapper.querySelectorAll('.riders-container .custom-row').forEach(rider => {
                const rName = rider.querySelector('.col-ins-name').value || 'สัญญาเพิ่มเติม';
                const rVal = parseNum(rider.querySelector('.col-ins-val').value) || 0;
                const rPrem = parseNum(rider.querySelector('.col-ins-prem').value) || 0;
                totalPolicyPrem += rPrem;

                ridersHtml += `
                    <div class="flex justify-between items-center py-1.5 border-b border-gray-100 border-dashed last:border-0 pl-6 relative">
                        <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">↳</span>
                        <div class="text-xs text-gray-600 font-medium">${rName} <span class="text-[10px] text-gray-400 ml-1">(คุ้มครอง ${fmt(rVal)})</span></div>
                        <div class="text-xs text-orange-600 font-semibold">${fmt(rPrem)}</div>
                    </div>
                `;
            });

            insSummaryHtml += `
                <div class="border rounded-lg mb-3 overflow-hidden shadow-sm avoid-break">
                    <div class="bg-purple-50/40 p-3 flex justify-between items-center border-b border-purple-100">
                        <div>
                            <span class="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded mr-2 font-bold">กรมธรรม์ที่ ${index + 1}</span>
                            <span class="font-bold text-gray-800">${bName}</span>
                            <span class="text-xs text-gray-500 ml-2">(ความคุ้มครอง: ${fmt(bVal)} | ปี ${bStart}-${bEnd})</span>
                        </div>
                        <div class="text-right">
                            <div class="text-xs text-gray-500">เบี้ยรวมกรมธรรม์/ปี</div>
                            <div class="font-bold text-purple-700">${fmt(totalPolicyPrem)}</div>
                        </div>
                    </div>
                    ${ridersHtml ? `<div class="p-2 bg-white">${ridersHtml}</div>` : ''}
                </div>
            `;
        });
        
        if(!insSummaryHtml) insSummaryHtml = '<div class="text-center text-gray-400 py-4 border border-dashed rounded-lg">ไม่มีข้อมูลกรมธรรม์ปัจจุบัน</div>';
        document.getElementById('ins_summary_container').innerHTML = insSummaryHtml;
        // --- จบส่วนที่เพิ่ม (Insurance) ---

        // --- ส่วนที่เพิ่ม: Generate Investment Summary UI ---
        let investSummaryHtml = '<table class="w-full text-sm border-collapse mb-0"><thead class="bg-gray-100"><tr class="border-b border-gray-200"><th class="py-3 px-4 text-left font-bold">ชื่อการลงทุน</th><th class="py-3 px-4 text-right font-bold">มูลค่า (บาท)</th><th class="py-3 px-4 text-center font-bold">ผลตอบแทนคาดหวัง</th><th class="py-3 px-4 text-left font-bold">เป้าหมายหลัก</th></tr></thead><tbody class="divide-y divide-gray-100">';
        let hasInvest = false;
        let totalInvestSummary = 0;

        document.querySelectorAll('#c_invest_current .custom-row').forEach(row => {
            let name = row.querySelector('.col-inv-name').value || 'ไม่ระบุ';
            let val = parseNum(row.querySelector('.col-inv-val').value) || 0;
            let roi = row.querySelector('.col-inv-roi').value || 0;
            let obj = row.querySelector('.col-inv-obj').value || '-';

            if (val > 0 || name !== 'ไม่ระบุ') {
                hasInvest = true;
                totalInvestSummary += val;
                investSummaryHtml += `<tr class="hover:bg-gray-50 transition"><td class="py-3 px-4 text-gray-800 font-medium">${name}</td><td class="py-3 px-4 text-right text-blue-700 font-bold">${fmt(val)}</td><td class="py-3 px-4 text-center text-green-600 font-medium">${roi}%</td><td class="py-3 px-4 text-left text-gray-600">${obj}</td></tr>`;
            }
        });

        // 🌟 ส่วนที่ปรับปรุง: เพิ่มผลตอบแทนเฉลี่ย (Weighted ROI) และ ความผันผวน (SD) ในบรรทัดสรุป
        investSummaryHtml += `
            </tbody>
            <tfoot>
                <tr class="bg-blue-50/50 border-t-2 border-blue-200">
                    <td class="py-3 px-4 text-left font-bold text-gray-800 align-middle">รวมมูลค่าพอร์ตการลงทุน</td>
                    <td class="py-3 px-4 text-right text-blue-800 font-black text-lg align-middle">${fmt(totalInvestSummary)}</td>
                    <td colspan="2" class="py-2 px-4 text-left align-middle">
                        <div class="inline-block bg-white px-3 py-1.5 rounded border border-blue-100 shadow-sm w-full md:w-auto">
                            <div class="text-xs text-gray-600 font-medium flex justify-between gap-4">
                                <span>ผลตอบแทนพอร์ตเฉลี่ย (ROI):</span> 
                                <span class="text-green-600 font-bold text-sm">${(currentPortfolioRoiEst || 0).toFixed(2)}%</span>
                            </div>
                            <div class="text-[10px] text-gray-500 mt-0.5 flex justify-between gap-4">
                                <span>ความผันผวนโดยประมาณ (SD):</span>
                                <span>${(currentSdEst || 0).toFixed(2)}%</span>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>`;

        if(!hasInvest) investSummaryHtml = '<div class="text-center text-gray-400 py-6 bg-gray-50">ไม่มีข้อมูลการลงทุนปัจจุบัน</div>';
        
        document.getElementById('invest_summary_container').innerHTML = investSummaryHtml;
        // --- จบส่วนที่เพิ่ม (Investment) ---
        
        // ==========================================
        // 🎯 บทสรุปจากผู้จัดทำ (Executive Financial Summary - Storytelling)
        // ==========================================
        // 1. ปลดล็อค Grid เดิม
        const dashboardContainer = document.getElementById('modern_dashboard');
        if (dashboardContainer) dashboardContainer.className = "mb-6"; 

        // --- 🧠 ลอจิก 1: มุมมองปัจจุบัน (NLG Tone & Status) ---
let b1_tone = "";
let b1_desc = "";

// แยกตัวแปรเพื่อเช็คปัญหาแต่ละด้านให้ชัดเจน
let isLowLiquidity = rLiquid < liqBenchmarkMin;
let isHighDebt = rDebt > 40 || userCluster.includes("Overleveraged");

if (isLowLiquidity && isHighDebt) {
    // กรณีที่ 1: แย่ทั้งคู่ (สภาพคล่องต่ำ + หนี้สูง)
    b1_tone = "🚨 เร่งด่วน (Critical)";
    b1_desc = pickStr([
        "ปัจจุบันสุขภาพการเงินของคุณอยู่ในสภาวะตึงตัว ระบบพบปัญหาหลักเรื่องสภาพคล่องที่ต่ำและภาระหนี้สินที่สูงเกินไป ซึ่งอาจส่งผลกระทบต่อเป้าหมายระยะยาว",
        "ตรวจพบสัญญาณเฝ้าระวังด้านกระแสเงินสดและภาระหนี้ที่สูงเกินเกณฑ์มาตรฐานสากล จำเป็นต้องมีการปรับโครงสร้างงบประมาณใหม่โดยเร็ว"
    ]);
} else if (isHighDebt) {
    // กรณีที่ 2: หนี้สูงอย่างเดียว (แต่สภาพคล่องรอด)
    b1_tone = "🚨 เร่งด่วน (Critical)";
    b1_desc = pickStr([
        "สถานะการเงินปัจจุบันมีความเปราะบางสูงจาก 'สัดส่วนหนี้สินต่อรายได้' ที่สูงเกินเกณฑ์ ซึ่งกำลังกดดันการออมและทำให้แผนเกษียณมีความเสี่ยงจะหยุดชะงัก",
        "ระบบพบปัญหาหลักเรื่องภาระหนี้สินที่ค่อนข้างตึงตัว แม้สภาพคล่องจะยังทำงานได้ แต่ควรเร่งปรับโครงสร้างหนี้เพื่อลดความเสี่ยงระยะยาว"
    ]);
} else if (isLowLiquidity) {
    // กรณีที่ 3: สภาพคล่องต่ำอย่างเดียว (ไม่มีหนี้ หรือหนี้น้อย)
    b1_tone = "🚨 เร่งด่วน (Critical)";
    b1_desc = pickStr([
        "สถานะการเงินปัจจุบันปลอดหนี้สินถือว่าทำได้ดีมาก แต่ระบบพบจุดเปราะบางเรื่อง 'เงินสำรองฉุกเฉิน (สภาพคล่อง)' ที่ต่ำกว่าเกณฑ์มาตรฐาน ซึ่งอาจเป็นความเสี่ยงหากขาดรายได้ฉับพลัน",
        "ปัจจุบันสุขภาพการเงินของคุณมีความเสี่ยงด้านสภาพคล่อง ระบบแนะนำให้เร่งสะสมเงินสดสำรองให้ได้ตามเกณฑ์ก่อนเริ่มลงทุนเชิงรุก แม้จะบริหารหนี้สินได้ดีแล้วก็ตาม"
    ]);
} else if (userCluster.includes("Cash Hoarder")) {
    // กรณีที่ 4: เงินสดล้น
    b1_tone = "💡 แนะนำ (Suggestive)";
    b1_desc = pickStr([
        "ปัจจุบันสุขภาพการเงินของคุณแข็งแกร่งมากในแง่เงินสด แต่พบรอยรั่วเรื่องการจัดสรรเงินที่ไม่มีประสิทธิภาพ ซึ่งอาจทำให้มูลค่าเงินพ่ายแพ้ต่อเงินเฟ้อ",
        "ภาพรวมการเงินดีมาก แต่ขาดการกระจายความเสี่ยงจากเงินสดไปสู่พอร์ตลงทุนที่มีโอกาสเติบโตตามเป้าหมายเกษียณที่วางไว้"
    ]);
} else if (diffHealth < 0 || diffLife < 0) {
    // กรณีที่ 5: ขาดความคุ้มครอง
    b1_tone = "⚠️ เฝ้าระวัง (Warning)";
    b1_desc = pickStr([
        "ปัจจุบันสุขภาพการเงินของคุณวันนี้ดูปกติ แต่พบรอยรั่วสำคัญด้านการปกป้องความมั่งคั่ง (Protection Layer) หากเกิดเหตุไม่คาดฝันอาจทำให้พอร์ตลงทุนสะดุด",
        "แม้ตัวเลขกระแสเงินสดจะดูดี แต่โครงสร้างการป้องกันความเสี่ยงยังมีช่องโหว่ขนาดใหญ่ที่พร้อมจะทำลายความมั่งคั่งสะสมของคุณได้ทุกเมื่อ"
    ]);
} else {
    // กรณีที่ 6: ดีเยี่ยม
    b1_tone = "🌟 ชื่นชม (Appreciative)";
    b1_desc = pickStr([
        "ปัจจุบันโครงสร้างการเงินของคุณมั่นคง ฐานรากแข็งแกร่ง และมีการจัดการความเสี่ยงด้านต่างๆ ได้เป็นอย่างดี",
        "สถานะการเงินของคุณจัดอยู่ในกลุ่มที่มีเสถียรภาพสูงสุด พร้อมสำหรับการต่อยอดความมั่งคั่งสู่เป้าหมายที่ใหญ่ขึ้น"
    ]);
}

        // --- 🧠 ลอจิก 2: ปัญหาที่พบ & ทางออก (NLG Problem & Solution) ---
        let rootCauseText = pickStr([
            "พอร์ตการลงทุนที่เติบโตไม่ทันเงินเฟ้อ หรือการตั้งเป้าหมายที่สูงเกินกำลัง",
            "โครงสร้างสินทรัพย์ลงทุนขาดความหลากหลายและผลตอบแทนคาดหวังต่ำเกินไป",
            "แผนการออมปัจจุบันยังไม่สอดคล้องกับมูลค่าเงินในอนาคตที่ปรับตามเงินเฟ้อแล้ว"
        ]);
        
        let solutionAction = pickStr([
            "ปรับพอร์ตการลงทุน จัดสรรสินทรัพย์ใหม่ และเพิ่มวินัยการออม",
            "ยกระดับการลงทุนสู่พอร์ต Global Allocation และเพิ่มสัดส่วนการออมรายเดือน",
            "รีเซ็ตแผนการลงทุนใหม่ตามคำแนะนำ AI และปิดรอยรั่วความคุ้มครองทันที"
        ]);

        let isLowLiq = rLiquid < liqBenchmarkMin;
        let isOverDebt = rDebt > 40 || userCluster.includes("Overleveraged");

        if (isLowLiq && isOverDebt) {
            rootCauseText = pickStr(["สภาพคล่องฉุกเฉินไม่เพียงพอและภาระหนี้สินที่คอยกดดันกระแสเงินสด", "กับดักหนี้บริโภคและกระแสเงินสดสำรองที่อยู่ในระดับวิกฤต"]);
            solutionAction = pickStr(["ลดภาระหนี้สินที่ไม่จำเป็นและเร่งสร้างเงินสำรองฉุกเฉินให้ได้ตามเกณฑ์", "ทำ Debt Snowball เพื่อปลดล็อกสภาพคล่องและสำรองเงินสด 3-6 เดือนแรก"]);
        } else if (isOverDebt) {
            rootCauseText = pickStr(["ภาระหนี้สินที่สูงเกินเกณฑ์คอยกดดันกระแสเงินสด", "กับดักหนี้บริโภคที่บั่นทอนความสามารถในการออม"]);
            solutionAction = pickStr(["ลดภาระหนี้สินที่ไม่จำเป็นโดยด่วน", "ทำ Debt Snowball เพื่อปลดล็อกกระแสเงินสดรายเดือน"]);
        } else if (isLowLiq) {
            rootCauseText = pickStr(["สภาพคล่องฉุกเฉินไม่เพียงพอต่อความเสี่ยง", "กระแสเงินสดสำรองที่อยู่ในระดับต่ำกว่ามาตรฐาน"]);
            solutionAction = pickStr(["เร่งสร้างเงินสำรองฉุกเฉินให้ได้ตามเกณฑ์ก่อนเริ่มลงทุนเชิงรุก", "ชะลอการลงทุนความเสี่ยงสูงและเติมเต็มสภาพคล่อง 3-6 เดือนแรก"]);
        } else if (diffHealth < 0 || diffLife < 0) {
            // ดึงจำนวนผู้อยู่ในอุปการะมาเช็คสถานะ
            let checkDep = parseInt(document.getElementById('p_dep')?.value) || 0; 
            
            if (checkDep === 0) {
                // 🚨 [FIX BUG 3] จิตวิทยาการขาย: The Single-Life Pivot (สำหรับคนโสดไร้ภาระ)
                if (diffHealth < 0 && diffLife < 0) {
                    rootCauseText = "การขาดกองทุนจัดการวาระสุดท้าย (Clean Slate) และสวัสดิการสุขภาพยามเกษียณ";
                    solutionAction = "เตรียมทุนประกันชีวิตพื้นฐานเพื่อไม่ให้เป็นภาระใคร และโยกงบที่เหลือไปจัดเต็มกับประกันสุขภาพเหมาจ่าย (AIA)";
                } else if (diffHealth < 0) {
                    rootCauseText = "การขาดเกราะความคุ้มครองสุขภาพเหมาจ่ายที่สอดคล้องกับค่ารักษาพยาบาลในอนาคต";
                    solutionAction = "โอนความเสี่ยงด้วยประกันสุขภาพเหมาจ่าย (AIA) เพื่อปกป้องเงินเก็บทั้งหมดของคุณให้อยู่รอด";
                } else {
                    rootCauseText = "การขาดกองทุนจัดการวาระสุดท้าย (Final Expenses) เพื่อไม่ให้ภาระตกสู่ญาติพี่น้อง";
                    solutionAction = "เตรียมทุนประกันชีวิตขั้นพื้นฐานเพื่อเคลียร์ภาระชิ้นสุดท้ายอย่างสมบูรณ์แบบ";
                }
            } else {
                // กรณีมีคนในอุปการะ (ครอบครัว)
                let gapName = (diffHealth < 0 && diffLife < 0) ? "ความคุ้มครองสุขภาพและทุนคุ้มครองรายได้ครอบครัว" : (diffHealth < 0 ? "ความคุ้มครองสุขภาพ" : "ทุนประกันชีวิตเพื่อคนข้างหลัง");
                rootCauseText = `การขาดเกราะ${gapName}ที่ไม่ครอบคลุมภาระความเสี่ยง`;
                solutionAction = `โอนความเสี่ยงด้วยการทำประกัน${gapName}ให้เต็มวงเงินความจำเป็น (AIA)`;
            }
        }

        // ข้อความร้อยเรียงสำหรับ Box 2
        let b2_text = pickStr([
            `ปัญหาสำคัญที่ AI ตรวจพบคือ <b>"${rootCauseText}"</b> ซึ่งส่งผลให้โอกาสสำเร็จทางการเงินของคุณมีเพียง`,
            `จากการรัน Simulation พบว่า <b>"${rootCauseText}"</b> คืออุปสรรคหลักที่ทำให้โอกาสเกษียณสำเร็จของคุณอยู่ที่`,
            `จุดเปราะบางที่สุดคือ <b>"${rootCauseText}"</b> ระบบจึงประเมินโอกาสที่คุณจะไปถึงเป้าหมายได้เพียง`
        ]);
        
        if(cProbNum >= 80) b2_text = pickStr([
            `แม้ระบบจะไม่พบปัญหาวิกฤต แต่ยังมีจุดที่ปรับจูนได้ (Optimization) ซึ่งปัจจุบันโอกาสสำเร็จทางการเงินของคุณสูงถึง`,
            `โครงสร้างแผนการเงินปัจจุบันของคุณดีเยี่ยมอยู่แล้ว โดย AI ประเมินความน่าจะเป็นที่จะบรรลุเป้าหมายไว้ที่`,
            `คุณทำได้ดีมากครับ ปัจจุบันโอกาสความสำเร็จทางการเงินของคุณพุ่งไปอยู่ที่`
        ]);

        // 2. สร้าง HTML มัดรวม (The Executive Summary)
const dashboardHtml = `
`;
        
        if (dashboardContainer) dashboardContainer.innerHTML = dashboardHtml;
        // ==========================================

        let curWStr = fmt(netWorth);
        let retWStr = fmt(wR_at_ret);

        // ==========================================
        // 🧠 [DYNAMIC NLG ENGINE] สร้างข้อความบรรยายแบบดิ้นได้
        // ==========================================

        // 1. จัดกลุ่มบริบทลูกค้า (Context)
        let aiTheme = "Standard";
        if (userCluster.includes("UHNW") || userCluster.includes("High-Earner") || netWorth >= 20000000) aiTheme = "Wealthy";
        else if (userCluster.includes("Overleveraged") || rDebt > 45) aiTheme = "Crisis";
        else if (userCluster.includes("Cash Hoarder") || rLiquid > 12) aiTheme = "Conservative";
        else if (userCluster.includes("Young Wealth Builder") || rawAge < 35) aiTheme = "AggressiveBuilder";
        else if (userCluster.includes("DINKs")) aiTheme = "Lifestyle";
        
// ============================================================
// 🧠 ระบบ NLG 11.1: Fact & Actionable Recommendation (รองรับ Print/PDF 100%)
// ============================================================
{
    // 1. 📥 สกัดตัวเลข "ความจริง" จากระบบ
    let nlg_clientName = (document.getElementById('p_name') && document.getElementById('p_name').value.trim() !== '') ? document.getElementById('p_name').value.trim() : "คุณลูกค้า";
    let nlg_netWorth = typeof netWorth !== 'undefined' ? netWorth : 0;
    let nlg_rDebt = typeof rDebt !== 'undefined' ? rDebt : 0;
    let nlg_rSurvive = typeof rSurvive !== 'undefined' ? rSurvive : 0;
    let nlg_taxAlpha = typeof taxAlpha !== 'undefined' ? taxAlpha : 0;
    
    // ช่องโหว่ความเสี่ยง
    let gapEmg = Math.abs(Math.min(0, (typeof diffEmg !== 'undefined' ? diffEmg : 0)));
    let gapHealth = Math.abs(Math.min(0, (typeof diffHealth !== 'undefined' ? diffHealth : 0)));
    let gapLife = Math.abs(Math.min(0, (typeof diffLife !== 'undefined' ? diffLife : 0)));
    let nlg_totalRiskGap = gapEmg + gapHealth + gapLife;

    // ตัวเลขความน่าจะเป็นจากระบบ AI
    let nlg_probBefore = parseFloat(document.getElementById('ml_prob_current') ? document.getElementById('ml_prob_current').innerText : '0'); 
    let nlg_probAfter = parseFloat(document.getElementById('ml_prob_proposed') ? document.getElementById('ml_prob_proposed').innerText : '0');

    // 2. 🧬 สร้างข้อค้นพบ + แนวทางแนะนำแบบแยกส่วน
    let liveFindings = [];
    
    // 🟢 เรื่องสภาพคล่องและภาระหนี้สิน
    if (nlg_rDebt > 40 && nlg_rSurvive < 6) {
        liveFindings.push(`
            <b>วิกฤตสภาพคล่องซ้อนทับ:</b> ข้อมูลระบุภาระหนี้สูง (${nlg_rDebt.toFixed(1)}%) ร่วมกับเงินสำรองต่ำกว่าเกณฑ์ (${nlg_rSurvive.toFixed(1)} เดือน) 
            <div class="mt-2 p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg text-[14.5px]">
                <span class="font-bold text-indigo-700">💡 แนวทางแนะนำ:</span> ชะลอการลงทุนสินทรัพย์เสี่ยง และพุ่งเป้าไปที่การจัดการรวบยอดหนี้ เพื่อหยุดเลือดและเพิ่มระยะเวลาเอาตัวรอด (Survival Ratio) เป็นอันดับแรกครับ
            </div>
        `);
    } else if (nlg_rDebt > 40 && nlg_rSurvive >= 6) {
        liveFindings.push(`
            <b>ภาระหนี้สูงแต่สภาพคล่องปลอดภัย:</b> แม้ภาระหนี้จะสูงถึง ${nlg_rDebt.toFixed(1)}% แต่คุณมีเงินสำรองฉุกเฉินแข็งแกร่ง (${nlg_rSurvive.toFixed(1)} เดือน)
            <div class="mt-2 p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg text-[14.5px]">
                <span class="font-bold text-indigo-700">💡 แนวทางแนะนำ:</span> รักษาระดับสภาพคล่องนี้ไว้เป็นเกราะป้องกัน และนำกระแสเงินสดส่วนเกินไปทยอยลดยอดหนี้สินที่มีดอกเบี้ยสูงครับ
            </div>
        `);
    } else if (nlg_rDebt <= 40 && nlg_rSurvive < 6) {
        liveFindings.push(`
            <b>ข้อควรระวังด้านสภาพคล่อง:</b> ภาระหนี้ของคุณอยู่ในเกณฑ์ควบคุมได้ (${nlg_rDebt.toFixed(1)}%) แต่เงินสำรองฉุกเฉินยังต่ำกว่า 6 เดือน (${nlg_rSurvive.toFixed(1)} เดือน)
            <div class="mt-2 p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg text-[14.5px]">
                <span class="font-bold text-indigo-700">💡 แนวทางแนะนำ:</span> ควรพักเงินสดหรือสินทรัพย์สภาพคล่องสูงเพิ่มเติมให้เต็ม 6 เดือน ก่อนนำเงินไปจัดสรรในสินทรัพย์ที่ล็อกระยะเวลาครับ
            </div>
        `);
    } else {
        liveFindings.push(`
            <b>โครงสร้างสภาพคล่องยอดเยี่ยม:</b> ภาระหนี้ปลอดภัย (${nlg_rDebt.toFixed(1)}%) และมีเงินสำรองเพียงพอ (${nlg_rSurvive.toFixed(1)} เดือน)
            <div class="mt-2 p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg text-[14.5px]">
                <span class="font-bold text-indigo-700">💡 แนวทางแนะนำ:</span> ฐานรากแข็งแกร่งมากครับ สามารถนำกระแสเงินสดส่วนเกินไปโฟกัสที่การลงทุนและสะสมความมั่งคั่งได้เต็มกำลังครับ
            </div>
        `);
    }

    // 🟢 เรื่องรอยรั่วความคุ้มครอง
    if (nlg_totalRiskGap > 0) {
        let riskParts = [];
        if(gapEmg > 0) riskParts.push(`สำรองฉุกเฉิน ${(gapEmg/1000000).toFixed(2)} ลบ.`); 
        if(gapHealth > 0) riskParts.push(`สวัสดิการค่ารักษา ${(gapHealth/1000000).toFixed(2)} ลบ.`); 
        if(gapLife > 0) riskParts.push(`ทุนครอบครัว ${(gapLife/1000000).toFixed(2)} ลบ.`);
        
        liveFindings.push(`
            <b>รอยรั่วความเสี่ยง (Risk Gap):</b> ระบบพบช่องว่างที่ขาดการปกป้อง ได้แก่ <u>${riskParts.join(", ")}</u> (รวม ${(nlg_totalRiskGap/1000000).toFixed(2)} ล้านบาท)
            <div class="mt-2 p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg text-[14.5px]">
                <span class="font-bold text-indigo-700">💡 แนวทางแนะนำ:</span> ควรใช้เครื่องมือทางการเงินเพื่อ "โอนความเสี่ยง" อุดรอยรั่วนี้ ป้องกันไม่ให้ความมั่งคั่งหลัก (${typeof fmt === 'function' ? fmt(nlg_netWorth) : nlg_netWorth} บาท) ถูกดึงไปใช้เมื่อเกิดเหตุไม่คาดฝันครับ
            </div>
        `);
    }

    // 🟢 เรื่องประสิทธิภาพภาษี
    if (nlg_taxAlpha > 0) {
        liveFindings.push(`
            <b>ศักยภาพการประหยัดภาษี:</b> ข้อมูลบ่งชี้โอกาสในการใช้สิทธิประโยชน์ทางภาษีเพิ่มเติม
            <div class="mt-2 p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg text-[14.5px]">
                <span class="font-bold text-indigo-700">💡 แนวทางแนะนำ:</span> ควรจัดสรรเครื่องมือลดหย่อนภาษีให้เต็มสิทธิ ซึ่งจะช่วยสร้างกระแสเงินสดรับกลับคืนมาได้สูงถึง <b>${typeof fmt === 'function' ? fmt(nlg_taxAlpha) : nlg_taxAlpha} บาท/ปี</b> ครับ
            </div>
        `);
    }

    // 3. ✍️ เตรียมข้อความ (ใช้ร่วมกันทั้ง Screen และ Print)
    let textIntro = `
        สวัสดีครับ <b>คุณ${nlg_clientName}</b> 🤝<br>
        ผมได้ทำการประมวลผลข้อมูลจริงทั้งหมดบนระบบเรียบร้อยแล้วครับ นี่คือ <b>"สัญญาณชีพทางการเงิน (Financial Vitals)"</b> ของคุณครับ:
        <div class="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-2 text-sm">
            <div class="bg-white p-2 rounded shadow-sm border-l-2 border-indigo-500">💰 สินทรัพย์สุทธิ: <b>${typeof fmt === 'function' ? fmt(nlg_netWorth) : nlg_netWorth} ฿</b></div>
            <div class="bg-white p-2 rounded shadow-sm border-l-2 ${nlg_rDebt > 40 ? 'border-rose-500' : 'border-emerald-500'}">💳 ภาระหนี้สิน: <b>${nlg_rDebt.toFixed(1)}%</b></div>
            <div class="bg-white p-2 rounded shadow-sm border-l-2 ${nlg_rSurvive < 6 ? 'border-amber-500' : 'border-emerald-500'}">⏳ สภาพคล่อง: <b>${nlg_rSurvive.toFixed(1)} ด.</b></div>
            <div class="bg-white p-2 rounded shadow-sm border-l-2 ${nlg_probBefore < 80 ? 'border-amber-500' : 'border-emerald-500'}">🎯 โอกาสสำเร็จ: <b>${nlg_probBefore.toFixed(1)}%</b></div>
        </div>
    `;

    let textFindings = `<p class="text-[14px] font-bold text-indigo-900 mb-4 uppercase tracking-wide flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse print-hidden-pulse"></span> ข้อค้นพบ และแนวทางที่ระบบแนะนำ:</p>` + 
                       liveFindings.map((item, index) => `
                           <div class="mb-5 pb-5 border-b border-slate-100 last:border-0 last:pb-0 flex items-start gap-3 page-break-avoid">
                               <span class="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mt-0.5 print-bg-exact">${index+1}</span> 
                               <div class="flex-1">${item}</div>
                           </div>
                       `).join("");

    let textConclusion = `
        <b>บทสรุปจากการวิเคราะห์:</b><br>
        หากคุณ${nlg_clientName} เริ่มดำเนินการตามแนวทางแนะนำด้านบน โมเดลคณิตศาสตร์ของเราคำนวณว่า <b>"โอกาสสำเร็จของเป้าหมาย"</b> จะถูกยกระดับจาก <span class="text-amber-500 font-bold">${nlg_probBefore.toFixed(1)}%</span> ทะยานสู่ <b><span class="text-emerald-500 text-lg">${nlg_probAfter.toFixed(1)}%</span></b> อย่างชัดเจนครับ<br><br>
        
    `;

    // 4. 🖥️ แสดงผล UI (แบ่งโซน หน้าจอ 🆚 พรินต์)
    let nlg_container = document.getElementById('exec_summary_container');
    if (nlg_container) {
        nlg_container.innerHTML = `
            <style>
                @keyframes blinkCursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes blinkDots { 0%, 100% { opacity: 0.3; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }
                @keyframes slideUpFade { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
                .typing-cursor { display: inline-block; width: 6px; height: 16px; background-color: #6366f1; margin-left: 4px; vertical-align: middle; animation: blinkCursor 0.8s infinite; }
                .dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #818cf8; margin: 0 2px; }
                .dot:nth-child(1) { animation: blinkDots 1.4s infinite ease-in-out both; }
                .dot:nth-child(2) { animation: blinkDots 1.4s infinite ease-in-out both 0.2s; }
                .dot:nth-child(3) { animation: blinkDots 1.4s infinite ease-in-out both 0.4s; }
                .chat-bubble-ai { display: none; opacity: 0; }
                .chat-bubble-ai.show { display: flex; animation: slideUpFade 0.5s ease-out forwards; }
                .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); }
                
                /* ========================================= */
                /* 🖨️ ระบบ PRINT / PDF OVERRIDE STYLE         */
                /* ========================================= */
                @media print {
                    /* ซ่อน UI แชทที่มีอนิเมชันตอนพรินต์ */
                    #ai_chat_interactive { display: none !important; }
                    /* โชว์กล่องข้อความแบบเต็มตอนพรินต์ */
                    #ai_chat_print_ready { display: block !important; }
                    
                    /* บังคับให้สีพื้นหลังติดตอนพรินต์ */
                    .print-bg-exact, .bg-slate-50, .bg-indigo-50, .bg-indigo-100, .bg-indigo-600, .bg-white {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    /* ป้องกันการตัดหน้ากระดาษขาดครึ่งในกล่อง */
                    .page-break-avoid { page-break-inside: avoid; }
                    .print-hidden-pulse { animation: none !important; opacity: 1 !important; }
                }
                
                @media screen {
                    /* บนหน้าจอปกติ ให้ซ่อนตัว Print */
                    #ai_chat_print_ready { display: none !important; }
                }
            </style>
            
            <div id="ai_chat_interactive" class="bg-gradient-to-br from-slate-100 to-[#f8fafc] p-6 md:p-10 rounded-[2rem] shadow-xl border border-slate-200 mt-6 font-sans min-h-[450px]">
                <div class="flex items-center gap-4 border-b border-slate-200 pb-4 mb-6">
                    <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white text-xl shadow-lg relative print-bg-exact">
                        📊<span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">สรุปแผนการเงินโดยผู้ช่วยส่วนตัว (AI Financial Agent)</h3>
                        <p class="text-[11px] text-emerald-500 font-semibold tracking-wider uppercase" id="ai_status_text">System: Ready</p>
                    </div>
                </div>

                <div class="space-y-6" id="ai_chat_area">
                    <div id="ai_bubble_1" class="chat-bubble-ai justify-start">
                        <div class="glass-card p-5 rounded-2xl rounded-tl-sm max-w-[90%] shadow-md relative">
                            <p class="text-[15.5px] text-slate-700 leading-relaxed" id="ai_msg_1"></p>
                        </div>
                    </div>

                    <div id="ai_bubble_2" class="chat-bubble-ai justify-start">
                        <div class="bg-indigo-50/70 border border-indigo-100 p-5 rounded-2xl rounded-tl-sm max-w-[95%] shadow-md print-bg-exact">
                            <div class="bg-white p-5 rounded-xl border border-white shadow-sm text-[15.5px] text-slate-700 leading-relaxed" id="ai_msg_2"></div>
                        </div>
                    </div>

                    <div id="ai_bubble_3" class="chat-bubble-ai justify-start">
                        <div class="bg-slate-800 text-white border border-slate-700 p-5 rounded-2xl rounded-tl-sm max-w-[90%] shadow-lg print-bg-exact">
                            <p class="text-[15.5px] text-slate-200 leading-relaxed" id="ai_msg_3"></p>
                        </div>
                    </div>

                    <div id="ai_typing" class="hidden justify-start transition-all duration-300">
                        <div class="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                            <span class="text-xs text-indigo-500 font-semibold mr-1 tracking-widest uppercase text-[10px]" id="typing_text">PROCESSING...</span>
                            <span class="dot print-bg-exact"></span><span class="dot print-bg-exact"></span><span class="dot print-bg-exact"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div id="ai_chat_print_ready" class="bg-white p-6 border-2 border-slate-200 rounded-2xl mt-6 font-sans">
                <div class="flex items-center gap-3 border-b border-slate-300 pb-4 mb-5">
                    <span class="text-2xl">📊</span>
                    <h3 class="text-xl font-bold text-slate-800">Fact-Based AI Executive Summary</h3>
                </div>
                
                <div class="space-y-6">
                    <div class="text-[14px] text-slate-700 leading-relaxed">
                        ${textIntro}
                    </div>
                    
                    <div class="bg-slate-50 border border-slate-200 p-5 rounded-xl text-[14px] text-slate-700 leading-relaxed print-bg-exact page-break-avoid">
                        ${textFindings}
                    </div>
                    
                    <div class="bg-slate-800 text-white p-5 rounded-xl text-[14px] leading-relaxed print-bg-exact page-break-avoid">
                        ${textConclusion}
                    </div>
                </div>
            </div>
        `;

        // 5. ⚙️ Asynchronous Typing Engine (สำหรับหน้าจอ Interactive เท่านั้น)
        window.nlgChatId = (window.nlgChatId || 0) + 1;
        let currentChatId = window.nlgChatId;

        (async () => {
            const sleep = ms => new Promise(r => setTimeout(r, ms));
            const typingIndicator = document.getElementById('ai_typing');
            const typingText = document.getElementById('typing_text');
            const statusText = document.getElementById('ai_status_text');

            const typeWriter = async (elementId, htmlString, speed) => {
                let el = document.getElementById(elementId);
                if (!el) return;
                let currentHTML = "";
                for (let i = 0; i < htmlString.length; i++) {
                    if (window.nlgChatId !== currentChatId) return; 
                    let char = htmlString.charAt(i);
                    if (char === '<') {
                        let tag = "";
                        while (i < htmlString.length && htmlString.charAt(i) !== '>') {
                            tag += htmlString.charAt(i);
                            i++;
                        }
                        tag += '>';
                        currentHTML += tag;
                    } else {
                        currentHTML += char;
                        await sleep(speed); 
                    }
                    el.innerHTML = currentHTML + '<span class="typing-cursor"></span>';
                }
                el.innerHTML = currentHTML;
            };

            statusText.innerText = "Reading Inputs...";
            typingText.innerText = "READING ACTUAL DATA...";
            typingIndicator.style.display = 'flex';
            await sleep(600);
            if (window.nlgChatId !== currentChatId) return;
            typingIndicator.style.display = 'none';
            document.getElementById('ai_bubble_1').classList.add('show');
            await typeWriter('ai_msg_1', textIntro, 12);
            await sleep(300);

            statusText.innerText = "Generating Plans...";
            typingText.innerText = "EXTRACTING RECOMMENDATIONS...";
            typingIndicator.style.display = 'flex';
            await sleep(1000);
            if (window.nlgChatId !== currentChatId) return;
            typingIndicator.style.display = 'none';
            document.getElementById('ai_bubble_2').classList.add('show');
            await typeWriter('ai_msg_2', textFindings, 6); 
            await sleep(300);

            statusText.innerText = "Concluding...";
            typingText.innerText = "CALCULATING FINAL OUTCOME...";
            typingIndicator.style.display = 'flex';
            await sleep(1200);
            if (window.nlgChatId !== currentChatId) return;
            typingIndicator.style.display = 'none';
            document.getElementById('ai_bubble_3').classList.add('show');
            await typeWriter('ai_msg_3', textConclusion, 12);
            
            statusText.innerText = "System: Idle";
        })();
    }
}

        // ==========================================
        // 🧠 [NEW] ML-Driven Behavioral & Protection Insights
        // ==========================================
        // 1. คำนวณมูลค่าความเสียหายหากเกิดวิกฤต (Portfolio Impact)
        let potentialLoss = Math.abs(Math.min(0, diffHealth) + Math.min(0, diffLife));
        let portfolioImpactPct = astInvest > 0 ? Math.min(100, (potentialLoss / astInvest * 100)).toFixed(1) : 0;
        
        let mlProtText = "";
        let mlBehavText = "";

        // 2. ใช้ ML K-Means แยกแยะข้อความแทงใจดำตามกลุ่มพฤติกรรม (อัปเกรดเป็น NLG)
        if (userCluster.includes("Overleveraged")) {
            mlProtText = pickStr([
                `<b>⚠️ สถานะ: เปราะบางระดับวิกฤต</b><br>กระแสเงินสดตึงตัวมาก หากเกิดเหตุไม่คาดฝัน คุณจะไม่มีทางเลือกนอกจากต้อง <b>"ก่อหนี้เพิ่ม"</b> ระบบบังคับให้สร้างสภาพคล่องเป็น Priority แรกสุด`,
                `<b>⚠️ สถานะ: เสี่ยงล้มละลายฉับพลัน</b><br>ภาระหนี้สินบดบังความมั่นคงไปหมด หากเจ็บป่วยตอนนี้จะกระทบเงินเก็บทั้งหมด แนะนำให้หยุดสร้างหนี้ใหม่และเน้นบริหารกระแสเงินสด`
            ]);
            mlBehavText = pickStr([
                `<b>🧠 อคติพฤติกรรม: Present Bias & Debt Denial</b><br>คุณกำลังโฟกัสกับการหมุนเงินในปัจจุบันจนละเลยความเสี่ยงระยะยาว ต้องระวังการใช้จ่ายเพื่อเยียวยาจิตใจ (Retail Therapy)`,
                `<b>🧠 อคติพฤติกรรม: Ostrich Effect</b><br>คุณอาจกำลังหลีกเลี่ยงการเผชิญหน้ากับความจริงเรื่องหนี้สิน ระบบแนะนำให้ทำ Debt Snowball อย่างจริงจังเพื่อดึงสติกลับมา`
            ]);
        
        } else if (userCluster.includes("Cash Hoarder")) {
            mlProtText = diffHealth < 0 ? 
                pickStr([
                    `<b>✅ สถานะ: สภาพคล่องล้นเหลือ แต่ขาดประสิทธิภาพ</b><br>คุณมีเกราะป้องกันที่หนามาก แต่การเก็บเงินสดไว้เฉยๆ ทำให้เสียโอกาส ควรนำเงินสดบางส่วนไปปิดความเสี่ยงสุขภาพ`,
                    `<b>✅ สถานะ: เงินสดสูงแต่มีรอยรั่วสุขภาพ</b><br>การถือเงินสดเยอะเป็นเรื่องดี แต่หากป่วยหนักเงินนั้นก็จะหายไปอยู่ดี ควรผ่องถ่ายความเสี่ยงให้บริษัทประกันรับจบแทน`
                ]) : 
                pickStr([
                    `<b>✅ สถานะ: สภาพคล่องล้นเหลือ แต่เสียโอกาสเติบโต</b><br>คุณจัดการความเสี่ยงได้ดีมาก แต่การถือเงินสดมากเกินไปกำลังทำให้เงินของคุณถูกเงินเฟ้อกัดกินมูลค่าลงทุกปี`,
                    `<b>✅ สถานะ: แข็งแกร่งแต่อนุรักษ์นิยมเกินไป</b><br>ป้อมปราการของคุณไร้รอยขีดข่วน แต่ต้องระวังกับดัก 'เงินสดด้อยค่า' ควรจัดสรรบางส่วนไปลงทุนเพื่อสู้เงินเฟ้อ`
                ]);
            mlBehavText = pickStr([
                `<b>🧠 อคติพฤติกรรม: Extreme Loss Aversion</b><br>ความกลัวสูญเสียเงินต้นทำให้คุณไม่กล้าลงทุน ท้ายที่สุด <b>"ความเสี่ยงที่แท้จริงคือการไม่เสี่ยงอะไรเลย"</b>`,
                `<b>🧠 อคติพฤติกรรม: Status Quo Bias</b><br>ความคุ้นชินกับการฝากเงินในธนาคารกำลังทำให้แผนเกษียณสะดุด ลองเปิดใจเรียนรู้สินทรัพย์ที่ชนะเงินเฟ้อดูบ้าง`
            ]);
        
        } else if (userCluster.includes("UHNW") || userCluster.includes("High-Earner") || userCluster.includes("Legacy")) {
            mlProtText = pyramidIsStrong ? 
                pickStr([
                    `<b>🛡️ สถานะ: มั่นคงระดับผู้มีฐานะมั่งคั่งสูง</b><br>ป้อมปราการแข็งแกร่ง ความเสี่ยงเดียวคือ <b>"การส่งมอบมรดก"</b> แนะนำให้ใช้โครงสร้างประกัน (เช่น AIA Legacy) สร้างเกราะคุ้มครองภาษี`,
                    `<b>🛡️ สถานะ: Wealth Preservation สำบูรณ์</b><br>ทุกอย่างอยู่ในเกณฑ์ High Net Worth ขั้นต่อไปคือการทำ Estate Planning เพื่อส่งต่อความมั่งคั่งให้ทายาทโดยไม่สะดุด`
                ]) : 
                pickStr([
                    `<b>⚠️ สถานะ: สินทรัพย์สูง แต่สภาพคล่องเปราะบาง</b><br>แม้จะมั่งคั่งสูง แต่รอยรั่วที่ฐานรากอาจทำให้ต้องดึงเงินจากธุรกิจมาใช้ หรือถูกบังคับขายสินทรัพย์ ควรเร่งอุดรอยรั่วด่วน`,
                    `<b>⚠️ สถานะ: รวยสินทรัพย์ ขัดสนสภาพคล่อง</b><br>ระวังกับดัก Asset Rich, Cash Poor ควรเสริมสภาพคล่องและวงเงินประกันให้สมน้ำสมเนื้อกับขนาดความมั่งคั่ง`
                ]);
            mlBehavText = pickStr([
                `<b>🧠 อคติพฤติกรรม: Overconfidence & Estate Neglect</b><br>ด้วยฐานะที่มั่งคั่ง อาจทำให้เกิดความประมาทในการเตรียมเงินสดฉุกเฉิน หรือละเลยการจัดโครงสร้างภาษีมรดก`,
                `<b>🧠 อคติพฤติกรรม: Illusion of Control</b><br>การคิดว่าสามารถควบคุมทุกวิกฤตได้ด้วยเงินเก็บ อาจทำให้ละเลยเครื่องมือลดหย่อนหรือตัวช่วยโอนความเสี่ยงทางภาษีที่มีประสิทธิภาพ`
            ]);
        
        } else if (userCluster.includes("Young Wealth Builder") || userCluster.includes("Crypto")) {
            mlProtText = potentialLoss > 0 ? 
                pickStr([
                    `<b>⚠️ สถานะ: โตเร็ว แต่พอร์ตไร้กันชน (Top-Heavy)</b><br>หากเจ็บป่วย พอร์ตลงทุนจะถูกบังคับขาย (Forced Sale) และขาดทุนย่อยยับถึง ${portfolioImpactPct}% ทันที ควรนำกำไรมาอุดรอยรั่วนี้`,
                    `<b>⚠️ สถานะ: สร้างตัวเร็ว แต่ฐานยังกลวง</b><br>การเร่งลงทุนโดยไม่มีสวัสดิการรักษารองรับ เปรียบเหมือนการขับรถสปอร์ตโดยไม่คาดเข็มขัดนิรภัย เสี่ยงล้มกระดานได้ทุกเมื่อ`
                ]) : 
                pickStr([
                    `<b>✅ สถานะ: โตเร็วและมีกันชนที่แข็งแกร่ง</b><br>คุณวางแผนป้องกันความเสี่ยงได้ดีเยี่ยม ทำให้พอร์ตสามารถเติบโตได้อย่างเต็มที่โดยไม่ต้องกังวลเรื่องค่าหมอ`,
                    `<b>✅ สถานะ: คนรุ่นใหม่วินัยเยี่ยม</b><br>การกลัดกระดุมเม็ดแรกถูกต้อง พอร์ตสุขภาพและสภาพคล่องแน่นหนา พร้อมลุยในสมรภูมิการลงทุนได้ 100%`
                ]);
            mlBehavText = pickStr([
                `<b>🧠 อคติพฤติกรรม: FOMO & Recency Bias</b><br>พฤติกรรมกลัวตกรถทำให้คุณนำเงินไปกระจุกในสินทรัพย์เสี่ยงสูง ควรมีวินัยในการกระจายความเสี่ยง (Asset Allocation)`,
                `<b>🧠 อคติพฤติกรรม: Over-Optimism</b><br>ความมั่นใจในวัยหนุ่มสาวอาจทำให้คุณประเมินความเสี่ยงต่ำกว่าความเป็นจริง อย่าลืมจัดสรรสินทรัพย์ป้องกันความเสี่ยงไว้เสมอ`
            ]);
        
        } else if (userCluster.includes("DINKs") || userCluster.includes("Lifestyle")) {
            mlProtText = diffHealth < 0 ? 
                pickStr([
                    `<b>🛡️ สถานะ: คล่องตัวสูง แต่พึ่งพารายได้ 2 ทาง</b><br>หากคนหนึ่งเจ็บป่วย ไลฟ์สไตล์พรีเมียมจะสะดุด จำเป็นต้องมีประกันโรคร้ายแรง (CI) ระดับสูง เพื่อรักษาระดับการใช้ชีวิต`,
                    `<b>🛡️ สถานะ: อิสระสูง แต่มีความเสี่ยงแฝง</b><br>ชีวิตที่ไม่มีลูกหมายถึงต้องพึ่งพากันเองยามแก่เฒ่า การมีสวัสดิการสุขภาพที่ครอบคลุมจึงเป็นสิ่งจำเป็นอันดับหนึ่งของกลุ่ม DINKs`
                ]) : 
                pickStr([
                    `<b>✅ สถานะ: คล่องตัวสูง และปกป้องไลฟ์สไตล์ได้ดี</b><br>วงเงินคุ้มครองที่เพียงพอทำให้มั่นใจได้ว่า แม้ใครคนใดคนหนึ่งเจ็บป่วย ไลฟ์สไตล์พรีเมียมของครอบครัวจะไม่สะดุด`,
                    `<b>✅ สถานะ: อิสระและปลอดภัย 100%</b><br>เกราะป้องกันที่เตรียมไว้เพียงพอต่อการซัพพอร์ตวิถีชีวิตแบบ DINKs ได้อย่างยั่งยืน ลุยตามเป้าหมายไลฟ์สไตล์ได้เต็มที่`
                ]);
            mlBehavText = pickStr([
                `<b>🧠 อคติพฤติกรรม: Lifestyle Creep</b><br>รายได้ที่เพิ่มมักจะหมดไปกับไลฟ์สไตล์ ระวังอคติที่มองว่าการจ่ายเบี้ยประกันคือการลดทอนความสุขในปัจจุบัน (Present Bias)`,
                `<b>🧠 อคติพฤติกรรม: Hyperbolic Discounting</b><br>การให้ค่ากับความสุขระยะสั้นมากกว่าความมั่นคงระยะยาว อาจทำให้เงินเกษียณของพวกคุณไม่เพียงพอในอนาคต`
            ]);
        
        } else {
            // กลุ่มมาตรฐาน (Standard)
            mlProtText = pyramidIsStrong ? 
                pickStr([
                    `<b>✅ สถานะ: ป้อมปราการมั่นคง</b><br>คุณอุดรอยรั่วทางการเงินได้ดีเยี่ยม ทำให้พอร์ตลงทุนมี "เกราะป้องกัน" ที่แข็งแกร่ง แผนนี้จะไม่พังทลายลงง่ายๆ`,
                    `<b>✅ สถานะ: ฐานรากสมดุลย์</b><br>ระบบการเงินของคุณมีภูมิต้านทานที่ดีเลิศต่อวิกฤตเศรษฐกิจและการเจ็บป่วย ถือเป็นโครงสร้างที่ยอดเยี่ยม`
                ]) : 
                pickStr([
                    `<b>⚠️ สถานะ: พบช่องโหว่มูลค่า ${fmt(potentialLoss)} บาท</b><br>หากเกิดเหตุไม่คาดฝัน คุณอาจถูก <b>บังคับขายพอร์ตลงทุน (Forced Sale)</b> ซึ่งทำมูลค่าพอร์ตหายไปถึง ${portfolioImpactPct}% ทันที`,
                    `<b>⚠️ สถานะ: ระวังรอยรั่วขนาดกลาง</b><br>ควรจัดสรรเงินสดบางส่วนมาปิดความเสี่ยงสุขภาพและชีวิต เพื่อป้องกันไม่ให้เป้าหมายเกษียณต้องถูกดึงเงินไปใช้ผิดประเภท`
                ]);
            mlBehavText = pickStr([
                `<b>🧠 คำแนะนำจาก AI: รักษาสมดุลพฤติกรรม</b><br>การตัดสินใจของคุณสมดุล แนะนำให้โฟกัสที่วินัยการออม (Pay Yourself First) และอย่าให้ความผันผวนของตลาดทำให้หลุดจากแผน`,
                `<b>🧠 คำแนะนำจาก AI: รักษาวินัยระยะยาว</b><br>อย่าปล่อยให้อารมณ์ระยะสั้นมาทำลายแผนระยะยาว ยึดมั่นในวินัยการจัดสรรเงินออม และทบทวนแผนปีละ 1 ครั้ง`
            ]);
        }

        // 3. ส่งข้อมูลกลับไปเสียบในหน้าจอ HTML
        const protEl = document.getElementById('prot_layer_desc');
        const behavEl = document.getElementById('behav_risk_desc');
        if (protEl) protEl.innerHTML = mlProtText;
        if (behavEl) behavEl.innerHTML = mlBehavText;

    }
    function renderCashflowChart(cSave, cDebt, cLive, cFixed, pSave, pDebt, pLive, pFixed, totalInc) {
        const ctx = document.getElementById('cashflowChart').getContext('2d');
        if(flowChart) flowChart.destroy();
        
        flowChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ปัจจุบัน', 'แผนปรับปรุง'],
                datasets: [
                    { label: 'ออม/ลงทุน', data: [cSave, pSave], backgroundColor: '#10b981' },
                    { label: 'หนี้สิน', data: [cDebt, pDebt], backgroundColor: '#ef4444' },
                    { label: 'ภาษีหัก ณ ที่จ่าย', data: [cFixed, pFixed], backgroundColor: '#8b5cf6' },
                    { label: 'ใช้ชีวิต/อื่นๆ', data: [cLive, pLive], backgroundColor: '#f59e0b' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { x: { stacked: true }, y: { stacked: true, max: totalInc > 0 ? totalInc * 1.1 : 1000 } },
                plugins: { 
                    datalabels: { color: '#fff', font: { weight: 'bold', size: 10, family: 'Prompt' }, formatter: (value) => value > 0 ? (value/1000).toFixed(0)+'k' : '' },
                    legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10, family: 'Prompt' } } }
                }
            }
        });

        document.getElementById('cashflowPrintInfo').innerHTML = `
            <div class="flex flex-wrap gap-2 text-xs justify-center mb-2">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded">ออม/ลงทุน</span>
                <span class="px-2 py-1 bg-red-100 text-red-800 rounded">หนี้สิน</span>
                <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded">ภาษีหัก ณ ที่จ่าย</span>
                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">ใช้ชีวิต</span>
            </div>
            <div class="grid grid-cols-2 gap-4 text-center text-sm border p-2 rounded bg-gray-50">
                <div><b>ปัจจุบัน:</b> ออม ${fmt(cSave)}, หหนี้ ${fmt(cDebt)}, ใช้ชีวิต ${fmt(cLive)}</div>
                <div><b>แผนใหม่:</b> ออม ${fmt(pSave)}, หนี้ ${fmt(pDebt)}, ใช้ชีวิต ${fmt(pLive)}</div>
            </div>
        `;
    }

    function renderAssetChart(liquid, invest, personal) {
        const ctx = document.getElementById('assetChart').getContext('2d');
        if(astChart) astChart.destroy();
        
        const total = liquid + invest + personal;
        const pLiq = total > 0 ? ((liquid/total)*100).toFixed(1) : 0;
        const pInv = total > 0 ? ((invest/total)*100).toFixed(1) : 0;
        const pPer = total > 0 ? ((personal/total)*100).toFixed(1) : 0;

        astChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['สภาพคล่อง', 'ลงทุน', 'ส่วนตัว/อื่นๆ'],
                datasets: [{
                    data: [liquid, invest, personal],
                    // เปลี่ยนช่องที่ 3 เป็นสีเหลืองทอง (#eab308)
                    backgroundColor: ['#3b82f6', '#10b981', '#eab308'],
                    borderWidth: 2, borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                cutout: '50%', // ปรับขนาดรูตรงกลางให้เล็กลงเพื่อแสดงตัวเลข %
                plugins: {
                    legend: { 
                        display: true, 
                        position: 'bottom',
                        labels: { boxWidth: 10, padding: 10, font: { size: 10, family: 'Prompt' } }
                    },
                    datalabels: { 
                        display: true,
                        color: '#ffffff',
                        font: { weight: 'bold', size: 10, family: 'Prompt' },
                        formatter: (value, context) => {
                            if (value === 0) return ''; // ซ่อนข้อความถ้าค่าเป็น 0
                            let sum = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            let percentage = ((value / sum) * 100).toFixed(1);
                            return percentage + '%';
                        }
                    }
                }
            }
        });

        // ปรับข้อความของ "ส่วนตัว" ตอนกดพิมพ์เป็นสีเหลืองทอง (text-yellow-600)
        document.getElementById('assetPrintInfo').innerHTML = `
            <div class="text-xs text-center border p-2 rounded bg-gray-50">
                <span class="text-blue-600 font-bold">สภาพคล่อง: ${pLiq}%</span> | 
                <span class="text-green-600 font-bold">ลงทุน: ${pInv}%</span> | 
                <span class="text-yellow-600 font-bold">ส่วนตัว: ${pPer}%</span>
            </div>
        `;
    }

    let cfSumChart; // ประกาศตัวแปรรองรับกราฟใหม่

    // ฟังก์ชันสำหรับ Render กราฟสรุป Cash Flow รูปโดนัท (เวอร์ชันแสดงคำอธิบายสี)
    function renderCFSummaryChart(save, debt, fixed, live) {
        const ctx = document.getElementById('cfSummaryChart').getContext('2d');
        if(cfSumChart) cfSumChart.destroy();
        
        const total = save + debt + fixed + live;
        
        // คำนวณสัดส่วน % สำหรับแสดงในกล่องตอนพิมพ์
        const pSave = total > 0 ? ((save/total)*100).toFixed(1) : 0;
        const pDebt = total > 0 ? ((debt/total)*100).toFixed(1) : 0;
        const pFixed = total > 0 ? ((fixed/total)*100).toFixed(1) : 0;
        const pLive = total > 0 ? ((live/total)*100).toFixed(1) : 0;

        // ถ้าไม่มีรายจ่ายเลย ให้แสดงกราฟว่างๆ
        if (total === 0) {
             cfSumChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['ไม่มีข้อมูล'],
                    datasets: [{ data: [1], backgroundColor: ['#e5e7eb'], borderWidth: 0 }]
                },
                options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { tooltip: {enabled: false}, datalabels: {display: false}, legend: {display: false} } }
            });
            return;
        }

        cfSumChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['ออม/ลงทุน', 'ภาระหนี้สิน', 'ภาษี', 'ใช้ชีวิต'],
                datasets: [{
                    data: [save, debt, fixed, live],
                    backgroundColor: ['#10b981', '#ef4444', '#8b5cf6', '#f59e0b'], // เขียว, แดง, ม่วง, ส้มทอง
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '50%',
                plugins: {
                    legend: {
                        display: true, // เปิดการแสดงคำอธิบายสี
                        position: 'bottom',
                        labels: { boxWidth: 10, padding: 10, font: { size: 10, family: 'Prompt' } }
                    },
                    datalabels: {
                        color: '#fff',
                        font: { weight: 'bold', size: 10, family: 'Prompt' },
                        formatter: (value, context) => {
                            if (value === 0) return '';
                            let sum = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            let percentage = ((value / sum) * 100).toFixed(0);
                            return percentage > 5 ? percentage + '%' : ''; // ซ่อนข้อความถ้า % น้อยเกินไป
                        }
                    }
                }
            }
        });

        // อัปเดตข้อความสำหรับแสดงผลตอนกดพิมพ์ (Print)
        const cfPrintInfo = document.getElementById('cfPrintInfo');
        if(cfPrintInfo) {
            cfPrintInfo.innerHTML = `
                <div class="text-xs text-center border p-2 rounded bg-gray-50 flex flex-wrap justify-center gap-1">
                    <span class="text-green-600 font-bold">ออม: ${pSave}%</span> | 
                    <span class="text-red-600 font-bold">หนี้: ${pDebt}%</span> | 
                    <span class="text-purple-600 font-bold">ภาษี: ${pFixed}%</span> | 
                    <span class="text-yellow-600 font-bold">ใช้ชีวิต: ${pLive}%</span>
                </div>
            `;
        }
    }

    function clearData() {
        if(confirm('ต้องการล้างข้อมูลทั้งหมดหรือไม่? ข้อมูลที่ไม่ได้บันทึกจะสูญหาย')) {
            clearDataForLoad();
            document.getElementById('mainForm').reset();
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }
// --- ระบบ Interactive What-If (อัปเกรดความผันผวนสมจริง + Caching ล็อกรูปร่างกราฟ) ---
    let wiDebounceTimer = null; 

    function updateWhatIf() {
        if (!simChart || !window.simData) return;
        window.whatIfAdjustmentsCount = (window.whatIfAdjustmentsCount || 0) + 1;
        window.compromisedRetireAge = parseInt(document.getElementById('wi_retAge').value);
        let newRetAge = parseInt(document.getElementById('wi_retAge').value);
        let newSave = parseInt(document.getElementById('wi_save').value);
        let newRoi = parseFloat(document.getElementById('wi_roi').value);

        // 1. อัปเดตตัวเลขเหนือสไลเดอร์ทันที
        document.getElementById('wi_val_retAge').innerText = newRetAge;
        document.getElementById('wi_val_save').innerText = newSave.toLocaleString('th-TH');
        document.getElementById('wi_val_roi').innerText = newRoi.toFixed(1) + '%';

        // 2. คำนวณเส้นกราฟพอร์ต DIY ใหม่ทันที
        let wDIY = window.simData.initialWealth;
        let newDataDIY = [];
        let currentDynamicWithdrawal = window.simData.baseExpense;
        let IWR = 0;
        let actualRetSave = newSave * 12;
        let depleteAge_DIY = 999;

        let newSd = newRoi * 1.5; 

        // 🌟 [หัวใจสำคัญ] ระบบ Caching ล็อกค่าความผันผวน
        // กราฟจะสุ่มใหม่ (แกว่ง) ก็ต่อเมื่อเปลี่ยนผลตอบแทน (newRoi) เท่านั้น
        if (!window.wiRandomCache || window.wiLastRoi !== newRoi) {
            window.wiRandomCache = [];
            let tempRegime = 1; 
            let maxYears = window.simData.lifeExp - window.simData.rawAge;

            for(let y = 0; y <= maxYears; y++) {
                tempRegime = getNextRegime(tempRegime);
                
                let workRoi = getAdvancedReturn(newRoi/100, newSd/100, 0, 0, 0, 0, 0, tempRegime);
                
                let postRetRoiTarget = Math.max((newRoi/100) - 0.02, 0.02);
                let postRetSd = Math.max((newSd/100) * 0.4, 0.03);
                let retRoi = Math.max(getAdvancedReturn(postRetRoiTarget, postRetSd, 0, 0, 0, 0, 0, tempRegime), -0.3);
                
                window.wiRandomCache.push({ workRoi: workRoi, retRoi: retRoi });
            }
            window.wiLastRoi = newRoi;
        }

        for (let i = window.simData.rawAge; i <= window.simData.lifeExp; i++) {
            
            let yearIndex = i - window.simData.rawAge;
            let cachedReturn = window.wiRandomCache[yearIndex]; // ดึงค่าจากแคช

            if (i < newRetAge) {
                // ช่วงสะสม
                let currentVolatileRoi = cachedReturn.workRoi; 
                wDIY = (wDIY * (1 + currentVolatileRoi)) + actualRetSave;
            } else {
                // ช่วงถอน
                let postRetRoiVolatile = cachedReturn.retRoi;

                if (i === newRetAge) {
                    currentDynamicWithdrawal = window.simData.baseExpense;
                    IWR = currentDynamicWithdrawal / (wDIY || 1);
                    if (IWR > 0.1 || IWR <= 0) IWR = 0.04;
                } else {
                    let proposedWithdrawal = currentDynamicWithdrawal * (1 + window.simData.infRate);
                    let CWR = proposedWithdrawal / (wDIY || 1);
                    if (CWR > IWR * 1.20) {
                        proposedWithdrawal = proposedWithdrawal * 0.90; 
                        if (proposedWithdrawal < window.simData.floorExpense) proposedWithdrawal = window.simData.floorExpense;
                    } else if (CWR < IWR * 0.80) {
                        proposedWithdrawal = proposedWithdrawal * 1.10; 
                    }
                    currentDynamicWithdrawal = proposedWithdrawal;
                }

                let actualWithdraw_R = Math.max(0, currentDynamicWithdrawal - (window.simData.yearlyAnnuity || 0));
                let hwR = actualWithdraw_R / 2;
                
                if (wDIY < actualWithdraw_R) {
                    wDIY = 0; 
                    if (depleteAge_DIY === 999) depleteAge_DIY = i; 
                } else {
                    wDIY = (wDIY - hwR) * (1 + postRetRoiVolatile) - hwR;
                }
            }

            // 🟢 เก็บข้อมูลเข้ากราฟและตาราง (ลบการ Push ซ้ำซ้อน)
            if (i === window.simData.rawAge) {
                newDataDIY.push(window.simData.initialWealth);
                let cell = document.getElementById('td_diy_' + i);
                if (cell) cell.innerText = window.simData.initialWealth.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            } else {
                newDataDIY.push(wDIY);
                let cell = document.getElementById('td_diy_' + i);
                if (cell) cell.innerText = wDIY.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            }
        }

        simChart.data.datasets[0].data = newDataDIY;
        simChart.update('none');
        
        let cellDepleteDIY = document.getElementById('td_deplete_diy');
        if (cellDepleteDIY) {
            if (depleteAge_DIY === 999 || depleteAge_DIY > window.simData.lifeExp) {
                cellDepleteDIY.innerHTML = `<span class="text-green-600">> ${window.simData.lifeExp} (รอด)</span>`;
            } else {
                cellDepleteDIY.innerHTML = `<span class="text-purple-700">${depleteAge_DIY} ปี</span>`;
            }
        }

        let statusBadge = document.getElementById('wi_status');
        if(statusBadge) {
            statusBadge.innerText = '⏳ กำลังประมวลผล...';
            statusBadge.className = 'text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full animate-pulse';
        }
        
        let tdProbDIY = document.getElementById('td_prob_diy');
        if(tdProbDIY) tdProbDIY.innerText = 'คำนวณ...';

        clearTimeout(wiDebounceTimer);
        wiDebounceTimer = setTimeout(() => {
            recalcMonteCarloAuto();
        }, 600); 
    }

// ฟังก์ชันรันคำนวณที่ถูกเรียกใช้อัตโนมัติ (What-If Auto Calc)
async function recalcMonteCarloAuto() {
    if (!window.simData) return;

    let newRetAge = parseInt(document.getElementById('wi_retAge').value);
    let newSave = parseInt(document.getElementById('wi_save').value);
    let newRoi = parseFloat(document.getElementById('wi_roi').value);

    let newMcParams = {
        ...window.simData,
        retAge: newRetAge,
        annualSavings: newSave * 12,
        targetRoi: newRoi / 100
    };

    // รัน Monte Carlo 4,000 รอบใน Background
    let newProbDIY = await runMonteCarloWorker(newMcParams);

    // อัปเดต UI เมื่อรันเสร็จ 
    let statusBadge = document.getElementById('wi_status');
    if(statusBadge) {
        statusBadge.innerText = '🟢 อัปเดตล่าสุด';
        statusBadge.className = 'text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full';
    }

    let tdProbDIY = document.getElementById('td_prob_diy');
    if (tdProbDIY) {
        // 🌟 [แก้บั๊ก] นำผลลัพธ์ที่ได้ ไปวิ่งผ่านฟังก์ชันคำนวณช่วงความเชื่อมั่น 95% (CI) ก่อนแสดงผล!
        tdProbDIY.innerText = calculateCI95(newProbDIY, newMcParams.iterations || 4000); 
        
        tdProbDIY.classList.add('scale-125', 'text-purple-700');
        setTimeout(() => tdProbDIY.classList.remove('scale-125', 'text-purple-700'), 400);
    }
}