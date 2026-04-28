// ==========================================
// 🧮 Scripts: เครื่องคำนวณทางการเงินอัจฉริยะ (Calculator Engine)
// ==========================================

window.tvmTarget = 'pmt'; // ค่าเริ่มต้นให้คำนวณ PMT

// ฟังก์ชันเปิด-ปิด Modal
window.openCalculatorModal = function() {
    let modal = document.getElementById('calculatorModal');
    if(modal) {
        modal.classList.remove('hidden');
        // รันเครื่องคิดเลขทุกตัวให้โชว์ค่าเริ่มต้นทันที
        if(typeof window.initCalculators === 'function') window.initCalculators();
    }
};

window.closeCalculatorModal = function() {
    let modal = document.getElementById('calculatorModal');
    if(modal) modal.classList.add('hidden');
};

// ฟังก์ชันสลับ Tab ภายในเครื่องคิดเลข
window.switchSandboxTab = function(tabId) {
    ['tab_retire', 'tab_cagr', 'tab_irr', 'tab_tvm'].forEach(id => {
        let el = document.getElementById(id);
        if(el) {
            el.classList.add('hidden');
            el.classList.remove('flex');
        }
        let btn = document.getElementById('btn_sb_' + id.replace('tab_', ''));
        if(btn) {
            btn.classList.remove('text-indigo-700', 'border-indigo-600', 'bg-indigo-50/50');
            btn.classList.add('text-gray-500', 'border-transparent');
        }
    });

    let activeEl = document.getElementById(tabId);
    if(activeEl) {
        activeEl.classList.remove('hidden');
        activeEl.classList.add('flex');
    }
    
    let activeBtn = document.getElementById('btn_sb_' + tabId.replace('tab_', ''));
    if(activeBtn) {
        activeBtn.classList.add('text-indigo-700', 'border-indigo-600', 'bg-indigo-50/50');
        activeBtn.classList.remove('text-gray-500', 'border-transparent');
    }
};

// สลับเป้าหมายการคำนวณ (Smart Toggle) พร้อมเปลี่ยนสี UI
window.setTVMTarget = function(target) {
    window.tvmTarget = target;
    
    // อัปเดตสีปุ่ม และ ช่องกรอกข้อมูล
    ['fv', 'pv', 'pmt', 'n', 'r'].forEach(t => {
        let btn = document.getElementById('btn_tvm_' + t);
        let inp = document.getElementById('tvm_' + t);
        
        if (!btn || !inp) return;

        // จัดการสีปุ่ม
        if(t === target) {
            btn.className = "flex-1 py-1.5 text-[10px] font-bold rounded shadow-sm bg-white text-purple-700 transition";
        } else {
            btn.className = "flex-1 py-1.5 text-[10px] font-bold rounded text-gray-600 hover:bg-white/50 transition";
        }
        
        // จัดการสถานะและสีช่องกรอกข้อมูล (Input)
        if(t === target) {
            inp.disabled = true;
            inp.value = "คำนวณอัตโนมัติ";
            // เปลี่ยนสีเป็น Inactive (สีม่วงทึบ)
            inp.classList.add('bg-purple-100', 'text-purple-800', 'border-purple-300');
            inp.classList.remove('text-gray-800', 'text-red-600', 'bg-red-50', 'bg-red-50/50');
        } else {
            inp.disabled = false;
            if(inp.value === "คำนวณอัตโนมัติ") inp.value = "0"; 
            
            // เปลี่ยนสีกลับเป็น Active
            inp.classList.remove('bg-purple-100', 'text-purple-800', 'border-purple-300');
            
            // จัดสีเฉพาะให้ PMT เป็นสีแดงเพื่อความโดดเด่น
            if (t === 'pmt') {
                inp.classList.add('text-red-600', 'bg-red-50/50');
            } else {
                inp.classList.add('text-gray-800');
            }
        }
    });
    
    window.calcTVM();
};

// ล้างค่าตัวแปรเป็น 0 ทั้งหมด (ยกเว้นตัวที่เป็น Target)
window.clearTVM = function() {
    ['fv', 'pv', 'pmt', 'n', 'r'].forEach(t => {
        if(t !== window.tvmTarget) {
            document.getElementById('tvm_' + t).value = "0";
        }
    });
    window.calcTVM();
};

// ฟังก์ชัน Utility ดึงตัวเลขเพื่อรองรับช่องที่มี 2 ทศนิยม
const getNumSafe = (id) => parseFloat(document.getElementById(id).value.replace(/,/g, '')) || 0;

// 1. จำลองเกษียณ
window.calcRetirement = function() {
    let age = parseInt(document.getElementById('sb_age').value) || 0;
    let ret = parseInt(document.getElementById('sb_ret').value) || 0;
    let life = parseInt(document.getElementById('sb_life').value) || 0;
    let exp = getNumSafe('sb_exp');
    let wealth = getNumSafe('sb_wealth');
    let roi = parseFloat(document.getElementById('sb_roi').value) || 0;
    let inf = parseFloat(document.getElementById('sb_inf').value) || 0;

    let calcAge = age;
    let calcRet = ret <= calcAge ? calcAge + 1 : ret;
    let calcLife = life <= calcRet ? calcRet + 1 : life;

    let yearsAccum = calcRet - calcAge;
    let yearsRetire = calcLife - calcRet;
    
    let rateNominal = roi / 100;
    let rateInflation = inf / 100;
    let rateReal = ((1 + rateNominal) / (1 + rateInflation)) - 1;
    
    let expFuture = exp * Math.pow(1 + rateInflation, yearsAccum);
    let targetCorpus = 0;
    let annualExpFuture = expFuture * 12;
    
    if (Math.abs(rateReal) < 0.0001) {
        targetCorpus = annualExpFuture * yearsRetire;
    } else {
        targetCorpus = annualExpFuture * ((1 - Math.pow(1 + rateReal, -yearsRetire)) / rateReal) * (1 + rateReal);
    }
    
    let fvWealth = wealth * Math.pow(1 + rateNominal, yearsAccum);
    let shortfall = Math.max(0, targetCorpus - fvWealth);
    
    let monthlyRate = rateNominal / 12;
    let totalMonths = yearsAccum * 12;
    let pmt = 0;
    
    if (shortfall > 0) {
        pmt = (monthlyRate === 0) ? (shortfall / totalMonths) : (shortfall * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const fmt2 = (num) => Number(num).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    document.getElementById('out_roi').innerText = roi.toFixed(2) + '%';
    document.getElementById('out_inf').innerText = inf.toFixed(2) + '%';
    document.getElementById('out_real_return').innerText = (rateReal * 100).toFixed(2) + '%';
    document.getElementById('out_years_accum').innerText = yearsAccum;
    document.getElementById('out_exp_future').innerText = fmt2(expFuture) + ' ฿/ด.';
    document.getElementById('out_fv_wealth').innerText = fmt2(fvWealth) + ' ฿';
    document.getElementById('out_corpus').innerText = fmt2(targetCorpus) + ' ฿';
    document.getElementById('out_shortfall').innerText = fmt2(shortfall) + ' ฿';
    
    let pmtEl = document.getElementById('out_pmt');
    if (pmt <= 0) {
        pmtEl.innerText = "0.00 ฿ (เงินพอแล้ว)"; pmtEl.className = "text-2xl font-black text-green-600";
    } else {
        pmtEl.innerText = fmt2(pmt) + ' ฿'; pmtEl.className = "text-2xl font-black text-red-600";
    }
};

// 2. ผลตอบแทนลงทุน (CAGR)
window.calcCAGR = function() {
    let pv = getNumSafe('cagr_pv');
    let fv = getNumSafe('cagr_fv');
    let n = parseFloat(document.getElementById('cagr_n').value) || 1;

    let cagr = 0, roi = 0, profit = 0;

    if (pv > 0 && n > 0) {
        cagr = (Math.pow((fv / pv), (1 / n)) - 1) * 100;
        roi = ((fv - pv) / pv) * 100;
        profit = fv - pv;
    }

    const fmt2 = (num) => Number(num).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    document.getElementById('out_cagr_val').innerText = cagr.toFixed(2) + '%';
    document.getElementById('out_cagr_roi').innerText = roi.toFixed(2) + '%';
    document.getElementById('out_cagr_profit').innerText = fmt2(profit) + ' ฿';

    let insightEl = document.getElementById('out_cagr_insight');
    if (cagr >= 8.0) {
        insightEl.innerText = "ผลตอบแทนอยู่ในระดับ 'กองทุนตราสารทุน (หุ้น)' (High Growth) เหมาะสำหรับเงินเย็นระยะยาวที่สามารถรับความผันผวนระหว่างทางได้เพื่อสร้างความมั่งคั่งก้าวกระโดด";
    } else if (cagr >= 4.0) {
        insightEl.innerText = "ผลตอบแทนอยู่ในระดับ 'กองทุนผสม' หรือ 'หุ้นกู้เอกชน' (Balanced/Moderate) เอาชนะเงินเฟ้อได้ดี เหมาะเป็นพอร์ตหลัก (Core Portfolio) สำหรับเป้าหมายระยะกลาง-ยาว";
    } else if (cagr > 0) {
        insightEl.innerText = "ผลตอบแทนอยู่ในระดับ 'ตลาดเงินหรือตราสารหนี้ระยะสั้น' เน้นรักษาเงินต้น (Capital Preservation) เหมาะสำหรับพักเงินสำรองฉุกเฉิน แต่ระวังผลกระทบจากเงินเฟ้อในระยะยาว";
    } else {
        insightEl.innerText = "ผลตอบแทนติดลบ สะท้อนถึงภาวะตลาดที่หดตัว (Drawdown) หากเป็นการลงทุนระยะยาว ควรประเมินพื้นฐานสินทรัพย์ว่ายังแข็งแกร่งหรือไม่ เพื่อหาจังหวะถัวเฉลี่ย (DCA) หรือตัดขาดทุน";
    }

    let card = document.getElementById('cagr_result_card');
    card.classList.add('scale-105', 'border-sky-400');
    setTimeout(() => { card.classList.remove('scale-105', 'border-sky-400'); }, 200);
};

// 3. ผลตอบแทนประกัน (IRR)
window.calcIRR = function() {
    let pmt = getNumSafe('irr_pmt');
    let nPay = parseInt(document.getElementById('irr_n_pay').value) || 0;
    let cb = getNumSafe('irr_cb');
    let cbStart = parseInt(document.getElementById('irr_cb_start').value) || 1;
    let cbEnd = parseInt(document.getElementById('irr_cb_end').value) || 19;
    let nMat = parseInt(document.getElementById('irr_n_mat').value) || 0;
    let mat = getNumSafe('irr_mat');

    let cfs = new Array(nMat + 1).fill(0);
    for(let i = 0; i < nPay && i <= nMat; i++) cfs[i] -= pmt;
    for(let i = cbStart; i <= cbEnd && i <= nMat; i++) cfs[i] += cb;
    if(nMat > 0) cfs[nMat] += mat;

    let guess = 0.05, irr = 0;
    for (let i = 0; i < 100; i++) {
        let npv = 0, dNpv = 0;
        for (let t = 0; t <= nMat; t++) {
            if (cfs[t] === 0) continue;
            let v = Math.pow(1 + guess, t);
            npv += cfs[t] / v;
            if (t > 0) dNpv -= (t * cfs[t]) / (v * (1 + guess));
        }
        if (Math.abs(npv) < 1e-5 || dNpv === 0) { irr = guess * 100; break; }
        guess = guess - (npv / dNpv);
    }
    
    if (isNaN(irr) || irr < -100 || irr > 1000) irr = 0;

    let totalPaid = pmt * nPay;
    let totalReturn = mat;
    for(let i = cbStart; i <= cbEnd && i <= nMat; i++) totalReturn += cb;
    let profit = totalReturn - totalPaid;

    const fmt2 = (num) => Number(num).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('out_irr_cost').innerText = fmt2(totalPaid) + ' ฿';
    document.getElementById('out_irr_return').innerText = fmt2(totalReturn) + ' ฿';
    document.getElementById('out_irr_profit').innerText = `กำไรสุทธิ: ${fmt2(profit)} บาท`;
    
    let rateEl = document.getElementById('out_irr_rate');
    let insightEl = document.getElementById('out_irr_insight');
    rateEl.innerText = irr.toFixed(2) + '%';
    
    if (irr >= 4.0) {
        rateEl.className = "text-5xl font-black text-green-500 py-2";
        insightEl.innerText = "ผลตอบแทนอยู่ในเกณฑ์สูงมาก (High Yield) เทียบเท่าหรือเอาชนะตราสารหนี้ระยะยาวได้ น่าสนใจอย่างยิ่งในการเข้าถือครอง";
    } else if (irr >= 2.0) {
        rateEl.className = "text-5xl font-black text-teal-500 py-2";
        insightEl.innerText = "ผลตอบแทนระดับนี้ชนะเงินฝากประจำและมีความปลอดภัยสูงมาก เหมาะสำหรับการใช้เป็นเครื่องมือรักษามูลค่าเงินต้น และลดหย่อนภาษี";
    } else if (irr > 0) {
        rateEl.className = "text-5xl font-black text-yellow-500 py-2";
        insightEl.innerText = "ผลตอบแทนค่อนข้างต่ำ จุดเด่นของแผนนี้อาจอยู่ที่ 'ความคุ้มครองชีวิต' หรือ 'สิทธิประโยชน์ทางภาษี' มากกว่าผลประโยชน์ที่เป็นตัวเงิน";
    } else {
        rateEl.className = "text-5xl font-black text-red-500 py-2";
        insightEl.innerText = "โครงการนี้ให้ผลตอบแทนติดลบ (ขาดทุนทางคณิตศาสตร์) ควรพิจารณาเฉพาะในกรณีที่ต้องการความคุ้มครองชีวิตสูงมากๆ เท่านั้น";
    }
};

// 4. เป้าหมายการเงิน (Omni-TVM Calculator)
window.calcTVM = function() {
    let target = window.tvmTarget || 'pmt';
    
    let fvStr = document.getElementById('tvm_fv').value.replace(/,/g, '');
    let pvStr = document.getElementById('tvm_pv').value.replace(/,/g, '');
    let pmtStr = document.getElementById('tvm_pmt').value.replace(/,/g, '');
    let nStr = document.getElementById('tvm_n').value.replace(/,/g, '');
    let rStr = document.getElementById('tvm_r').value.replace(/,/g, '');
    
    let fv = parseFloat(fvStr) || 0;
    let pv = parseFloat(pvStr) || 0;
    let pmt = parseFloat(pmtStr) || 0;
    let n = parseFloat(nStr) || 0;
    let r = parseFloat(rStr) || 0;
    
    let rate = r / 100;
    let periods = n;
    
    let resultTitle = "";
    let resultVal = 0;
    const fmt2 = (num) => Number(num).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    // สมการหลัก FV = PV(1+i)^n + PMT[((1+i)^n-1)/i]
    if (target === 'fv') {
        resultTitle = "เป้าหมายเงินก้อนรวม (FV)";
        if (rate === 0) resultVal = pv + (pmt * periods);
        else resultVal = pv * Math.pow(1+rate, periods) + pmt * ((Math.pow(1+rate, periods) - 1) / rate);
        document.getElementById('tvm_fv').value = fmt2(resultVal);
    } 
    else if (target === 'pv') {
        resultTitle = "เงินก้อนเริ่มต้นที่ต้องใช้ (PV)";
        if (rate === 0) resultVal = fv - (pmt * periods);
        else resultVal = (fv - pmt * ((Math.pow(1+rate, periods) - 1) / rate)) / Math.pow(1+rate, periods);
        if(resultVal < 0) resultVal = 0;
        document.getElementById('tvm_pv').value = fmt2(resultVal);
    }
    else if (target === 'pmt') {
        resultTitle = "เงินออมที่ต้องเก็บต่องวด (PMT)";
        let fvOfPv = pv * Math.pow(1+rate, periods);
        let shortfall = fv - fvOfPv;
        if (periods <= 0) resultVal = 0;
        else if (rate === 0) resultVal = shortfall / periods;
        else resultVal = (shortfall * rate) / (Math.pow(1+rate, periods) - 1);
        if(resultVal < 0) resultVal = 0;
        document.getElementById('tvm_pmt').value = fmt2(resultVal);
    }
    else if (target === 'n') {
        resultTitle = "ระยะเวลาที่ต้องใช้ (จำนวนงวด N)";
        if (fv <= pv) resultVal = 0;
        else if (pmt <= 0 && rate <= 0) resultVal = 0;
        else if (rate === 0) resultVal = (fv - pv) / pmt;
        else {
            let top = fv * rate + pmt;
            let bottom = pv * rate + pmt;
            if (bottom <= 0 || top <= 0) resultVal = 0;
            else resultVal = Math.log(top / bottom) / Math.log(1 + rate);
        }
        document.getElementById('tvm_n').value = resultVal.toFixed(2);
    }
    else if (target === 'r') {
        resultTitle = "ผลตอบแทนที่ต้องทำได้ (% ต่องวด)";
        if (periods <= 0 || fv <= pv + (pmt * periods)) resultVal = 0;
        else {
            // Bisection Method สำหรับหาค่า R
            let low = 0.00001, high = 100.0, mid = 0;
            for(let iter=0; iter<100; iter++) {
                mid = (low + high) / 2;
                let currentFV = pv * Math.pow(1+mid, periods) + pmt * ((Math.pow(1+mid, periods) - 1) / mid);
                if (currentFV > fv) high = mid; else low = mid;
            }
            resultVal = mid * 100;
        }
        document.getElementById('tvm_r').value = resultVal.toFixed(2);
    }
    
    // ดึงค่ากลับมาคำนวณต้นทุน/กำไรใหม่
    fv = parseFloat(document.getElementById('tvm_fv').value.replace(/,/g, '')) || 0;
    pv = parseFloat(document.getElementById('tvm_pv').value.replace(/,/g, '')) || 0;
    pmt = parseFloat(document.getElementById('tvm_pmt').value.replace(/,/g, '')) || 0;
    n = parseFloat(document.getElementById('tvm_n').value.replace(/,/g, '')) || 0;
    
    let cost = pv + (pmt * n);
    let profit = fv - cost;
    if(profit < 0) profit = 0;

    // อัปเดตการแสดงผลฝั่งขวา
    document.getElementById('out_tvm_title').innerText = resultTitle;
    
    let displayVal = "";
    if (target === 'r') displayVal = resultVal.toFixed(2) + ' %';
    else if (target === 'n') displayVal = resultVal.toFixed(2) + ' งวด';
    else displayVal = fmt2(resultVal) + ' ฿';
    
    document.getElementById('out_tvm_val').innerText = displayVal;
    document.getElementById('out_tvm_cost').innerText = fmt2(cost) + ' ฿';
    document.getElementById('out_tvm_profit').innerText = fmt2(profit) + ' ฿';

    let card = document.getElementById('tvm_result_card');
    card.classList.add('scale-105', 'border-purple-400');
    setTimeout(() => { card.classList.remove('scale-105', 'border-purple-400'); }, 150);
};

window.initCalculators = function() {
    window.calcRetirement();
    window.calcCAGR();
    window.calcIRR();
    window.calcTVM();
};