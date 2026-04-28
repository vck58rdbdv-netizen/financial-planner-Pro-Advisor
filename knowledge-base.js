// ==========================================
// 📚 Financial Planner - Comprehensive Knowledge Base Module
// ไฟล์นี้รวบรวมพจนานุกรมคำอธิบายระบบและทฤษฎีอ้างอิง
// ==========================================

const systemDictionary = {
    "math-cfp": {
        icon: "📊",
        title: "1. กลุ่มสมการประเมินสุขภาพการเงิน (Financial Ratios - CFP Standards)",
        content: `
        <p class="mb-3">ใช้สำหรับวินิจฉัยจุดอ่อนและจุดแข็งของกระแสเงินสดและงบดุล อิงตามมาตรฐานคณะกรรมการวิชาชีพนักวางแผนการเงิน (CFP Board)</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-blue-800">1. อัตราความอยู่รอด (Survival Ratio)</b>
                <p class="text-xs text-gray-600 mt-1">วัดความสามารถในการหารายได้เทียบกับรายจ่าย (ต้อง > 1 เท่าเสมอ)</p>
                <div class="mt-2 bg-gray-50 p-2 rounded text-center font-mono text-sm border border-gray-200">
                    Survival Ratio = Total Income / Total Expenses
                </div>
            </div>
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-emerald-800">2. อัตราส่วนสภาพคล่อง (Liquidity Ratio)</b>
                <p class="text-xs text-gray-600 mt-1">วัดจำนวนเดือนที่สามารถอยู่รอดได้หากขาดรายได้ฉับพลัน (เกณฑ์ 3-6 เดือน หรือ 12 เดือนสำหรับอาชีพอิสระ)</p>
                <div class="mt-2 bg-gray-50 p-2 rounded text-center font-mono text-sm border border-gray-200">
                    Liquidity Ratio = Liquid Assets / Total Expenses (Monthly)
                </div>
            </div>
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-red-800">3. อัตราส่วนภาระหนี้สินต่อรายได้ (Debt-to-Income Ratio: DTI)</b>
                <p class="text-xs text-gray-600 mt-1">วัดสัดส่วนภาระผ่อนชำระหนี้สินรวมเทียบกับรายได้ (ไม่ควรเกิน 36-45%)</p>
                <div class="mt-2 bg-gray-50 p-2 rounded text-center font-mono text-sm border border-gray-200">
                    DTI = (Total Debt Repayment / Total Income) &times; 100%
                </div>
            </div>
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-purple-800">4. อัตราส่วนความสามารถในการชำระหนี้ (Solvency Ratio)</b>
                <p class="text-xs text-gray-600 mt-1">วัดความมั่นคงของสินทรัพย์เทียบกับหนี้สิน บ่งบอกถึงความเสี่ยงล้มละลาย (เกณฑ์ > 50%)</p>
                <div class="mt-2 bg-gray-50 p-2 rounded text-center font-mono text-sm border border-gray-200">
                    Solvency Ratio = (Net Worth / Total Assets) &times; 100%
                </div>
            </div>
        </div>`
    },
    "math-tvm": {
        icon: "⏳",
        title: "2. กลุ่มสมการมูลค่าเงินตามเวลาและการจัดการหนี้ (TVM & Debt Management)",
        content: `
        <p class="mb-3">ใช้สำหรับคำนวณเป้าหมายเกษียณ การเติบโตของพอร์ต และกลยุทธ์การปลดหนี้ (Debt Snowball/Avalanche)</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-indigo-800">1. อัตราผลตอบแทนแท้จริง (Real Return)</b>
                <p class="text-xs text-gray-600 mt-1">ปรับลดผลตอบแทนที่คาดหวังด้วยอัตราเงินเฟ้อ เพื่อหามูลค่าแท้จริงของอำนาจซื้อ (Fisher Equation)</p>
                <div class="mt-2 bg-indigo-50/50 p-3 rounded font-mono text-sm border border-indigo-100 flex justify-center">
                    r<sub>real</sub> = [ (1 + r<sub>nominal</sub>) / (1 + r<sub>inflation</sub>) ] - 1
                </div>
            </div>
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-indigo-800">2. มูลค่าเป้าหมายกองทุนเกษียณอายุ (Present Value of Annuity Due)</b>
                <p class="text-xs text-gray-600 mt-1">คำนวณเงินก้อนที่ต้องมี ณ วันเกษียณ โดยสมมติว่ามีการถอนเงินออกมาใช้ "ทุกต้นปี" (PMT = รายจ่ายต่อปี, n = อายุขัยหลังเกษียณ)</p>
                <div class="mt-2 bg-indigo-50/50 p-3 rounded font-mono text-sm border border-indigo-100 flex justify-center text-center overflow-x-auto">
                    PV = PMT &times; [ { 1 - (1 + r<sub>real</sub>)<sup>-n</sup> } / r<sub>real</sub> ] &times; (1 + r<sub>real</sub>)
                </div>
                <p class="text-[10px] text-gray-500 mt-2">*หมายเหตุ: หาก r<sub>real</sub> เข้าใกล้ศูนย์ ระบบมี Guardrail ให้เปลี่ยนไปใช้สมการเส้นตรง (PV = PMT &times; n) เพื่อป้องกัน Divide by Zero</p>
            </div>
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-red-800">3. ระยะเวลาปลดหนี้ (NPER - Number of Periods)</b>
                <p class="text-xs text-gray-600 mt-1">สมการลดต้นลดดอก (Amortization Formula) ใช้เพื่อหาจำนวนเดือนที่จะผ่อนหนี้หมดเมื่อมีการโปะเพิ่ม</p>
                <div class="mt-2 bg-red-50/50 p-3 rounded font-mono text-sm border border-red-100 flex justify-center text-center">
                    n = -ln( 1 - (PV &times; r) / PMT ) / ln(1 + r)
                </div>
                <p class="text-[10px] text-red-600 font-bold mt-2">🚨 Negative Amortization Trap: หากจ่ายขั้นต่ำน้อยกว่าดอกเบี้ย (PMT &le; PV &times; r) สมการ ln จะติดลบ ระบบจะแจ้งเตือนสถานะ "วิกฤต/ไม่ลดต้น" (Infinity) ทันที</p>
            </div>
        </div>`
    },
    "math-dnn": {
        icon: "🕸️",
        title: "3. โครงข่ายประสาทเทียมประเมินโอกาสสำเร็จ (Deep Neural Network - Doctor AI)",
        content: `
        <p class="mb-3">โครงสร้าง <b>Multi-Layer Perceptron (MLP)</b> ที่ผ่านการฝึกสอน (Pre-trained Weights) ฝังไว้ใน Client-side เพื่อประมวลผล Success Probability แบบ Offline 100%</p>
        <div class="space-y-4">
            <div class="bg-slate-800 text-white p-4 rounded-lg border shadow-sm">
                <b class="text-cyan-300">1. โครงสร้างข้อมูลขาเข้า 15 มิติ (Input Feature Space)</b>
                <p class="text-xs text-gray-300 mt-1 mb-2">เวกเตอร์ขาเข้า X ประกอบด้วยข้อมูล 15 ด้าน เช่น อายุ, รายได้, จำนวนผู้อุปการะ, หนี้สินรวม, พอร์ตลงทุน ฯลฯ</p>
            </div>
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-blue-800">2. สมการโครงข่ายประสาทเทียม (Forward Pass Execution)</b>
                <ul class="font-mono text-xs text-gray-700 bg-gray-50 p-3 rounded border border-gray-200 mt-2 space-y-1">
                    <li>H<sup>(1)</sup> = ReLU(Z &middot; W<sup>(0)</sup> + B<sup>(0)</sup>)</li>
                    <li>H<sup>(2)</sup> = ReLU(H<sup>(1)</sup> &middot; W<sup>(2)} + B<sup>(2)</sup>)</li>
                    <li class="text-blue-700 font-bold border-t pt-1 mt-1">P<sub>raw</sub> = 1 / (1 + e<sup>-(H<sup>(2)</sup> &middot; W<sup>(3)</sup> + B<sup>(3)</sup>)</sup>)</li>
                </ul>
            </div>
            <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-200 shadow-sm">
                <b class="text-emerald-800">3. Success Leap Analysis (การวิเคราะห์ความก้าวกระโดด)</b>
                <p class="text-xs text-emerald-900 mt-1">ระบบจำลองการปรับโครงสร้างการเงินสมบูรณ์แบบ แล้วป้อนกลับเข้า Neural Network เพื่อเปรียบเทียบ Before vs After</p>
            </div>
        </div>`
    },
    "math-kmeans": {
        icon: "🧬",
        title: "4. ระบบจัดกลุ่มอัตลักษณ์ลูกค้า (8D K-Means Clustering)",
        content: `
        <p class="mb-3">อัลกอริทึมจัดกลุ่มลูกค้า (Persona Profiling) ประมวลผลจากข้อมูล 8 แกน</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-purple-800">1. หาระยะห่างทางเรขาคณิต (Euclidean Distance to Centroids)</b>
                <p class="text-xs text-gray-600 mt-1">วัดความคล้ายคลึงของเวกเตอร์ลูกค้า (P) กับจุดศูนย์กลาง (C<sub>k</sub>)</p>
                <div class="mt-2 bg-gray-50 p-2 rounded font-mono text-sm border border-gray-200 text-center">
                    d(P, C<sub>k</sub>) = &radic;<span class="border-t border-gray-800">&Sigma;(P<sub>norm,i</sub> - C<sub>k,i</sub>)<sup>2</sup></span>
                </div>
            </div>
        </div>`
    },
    "math-consensus": {
        icon: "⚖️",
        title: "5. กลไกตัดสินใจร่วม (Hybrid Co-Advisor Consensus Engine)",
        content: `
        <p class="mb-3">ป้องกัน <b>AI Hallucinations</b> โดยนำคะแนน ML มาปะทะกับเกณฑ์ผู้เชี่ยวชาญ (Human-in-the-loop)</p>
        <div class="space-y-3">
            <div class="bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm">
                <b class="text-red-800">ใบแดง (Critical Flags / Hard Caps)</b>
                <p class="text-xs text-red-900 mt-1">ล็อกเพดานความน่าจะเป็นสูงสุด (Maximum Limit) หากพบพฤติกรรมเสี่ยงล้มละลาย</p>
                <ul class="text-[11px] list-disc list-inside mt-1 ml-2 text-red-800">
                    <li>พบ "หนี้สินอันตราย" &rarr; Cap<sub>hard</sub> = min(Cap, 30.0%)</li>
                    <li>พบ "หมุนเงินชนเดือน" หรือ "พึ่งพาสินเชื่อ" &rarr; Cap<sub>hard</sub> = min(Cap, 50.0%)</li>
                </ul>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow-sm">
                <b class="text-yellow-800">ใบเหลือง (Warning Flags / Probability Discounting)</b>
                <p class="text-xs text-yellow-900 mt-1">หักลดทอนคะแนน (Discount Rate: D<sub>rate</sub>) ตามพฤติกรรมสะสม</p>
                <ul class="text-[11px] list-disc list-inside mt-1 ml-2 text-yellow-800">
                    <li>พบ "ละเลยความคุ้มครอง" &rarr; &Sigma;D<sub>rate</sub> += 0.15</li>
                    <li>พบ "กับดักไลฟ์สไตล์" &rarr; &Sigma;D<sub>rate</sub> += 0.10</li>
                    <li>พบ "กอดเงินสด" &rarr; &Sigma;D<sub>rate</sub> += 0.05</li>
                </ul>
                <p class="text-[10px] mt-1 text-yellow-700 italic">*Guardrail: &Sigma;D<sub>rate</sub> สูงสุดไม่เกิน 0.50 (50%)</p>
            </div>
            <div class="bg-slate-800 p-4 rounded-lg shadow-sm text-white">
                <b class="text-cyan-300">สมการรวบยอด (The Consensus Equation)</b>
                <div class="mt-2 font-mono text-sm text-center">
                    P<sub>discounted</sub> = P<sub>ML</sub> &times; (1 - &Sigma;D<sub>rate</sub>)<br>
                    P<sub>final</sub> = max(0.1, min(99.9, min(P<sub>discounted</sub>, Cap<sub>hard</sub>)))
                </div>
            </div>
        </div>`
    },
    "math-market": {
        icon: "📉",
        title: "6. สมการผลตอบแทนตลาดและสภาวะวิกฤต (Market Dynamics)",
        content: `
        <p class="mb-3">วิศวกรรมการเงินที่รองรับ Black Swan และ Market Regimes</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-red-800">สมการวิกฤตการณ์ฉับพลัน (Merton's Jump Diffusion Model)</b>
                <p class="text-xs text-gray-600 mt-1">ใช้ Poisson Process สุ่มความถี่เกิดวิกฤต และขนาดวิกฤต</p>
                <div class="mt-2 bg-red-50 p-2 rounded font-mono text-[10px] border border-red-200 text-center overflow-x-auto text-red-900">
                    R<sub>yearly</sub> = exp( (&mu;<sub>adj</sub> - &sigma;<sub>adj</sub><sup>2</sup>/2)&Delta;t - Comp + &sigma;<sub>adj</sub>&radic;&Delta;t Z<sub>CF</sub> + J ) - 1
                </div>
            </div>
        </div>`
    },
    "math-accum": {
        icon: "📈",
        title: "7. กลไกช่วงสะสมความมั่งคั่ง (Accumulation Phase Dynamics)",
        content: `
        <p class="mb-3">จำลองการเติบโตแบบความน่าจะเป็น (Stochastic Growth) ก่อนวัยเกษียณ</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-blue-800">1. Dynamic Glide Path (ลดความเสี่ยงก่อนเกษียณ 10 ปี)</b>
                <p class="text-xs text-gray-600 mt-1">ปรับลดผลตอบแทน (&mu;) และความผันผวน (&sigma;) ลงแบบ Linear Interpolation</p>
            </div>
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-blue-800">2. สมการทบต้นความมั่งคั่ง (Wealth Accumulation Equation)</b>
                <div class="mt-2 bg-gray-50 p-2 rounded font-mono text-sm border border-gray-200 text-center">
                    W<sub>t</sub> = W<sub>t-1</sub> &times; (1 + R<sub>t</sub>) + Savings<sub>t</sub>
                </div>
            </div>
        </div>`
    },
    "math-decum": {
        icon: "🏛️",
        title: "8. กลไกหลังเกษียณและประเมินความเสี่ยงขาลง (Decumulation & Tail Risk)",
        content: `
        <p class="mb-3">กลยุทธ์ป้องกัน Longevity Risk และการรับมือวิกฤตเศรษฐกิจ (Stress Test)</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-purple-800">1. กฎการถอนเงินแบบไดนามิก (Guyton-Klinger Rules)</b>
                <p class="text-xs text-gray-600 mt-1">ควบคุมอัตราการถอนเงินปัจจุบัน (CWR) ไม่ให้ฉีกห่างจากอัตราถอนเริ่มต้น (IWR) มากเกินไป</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm">
                <b class="text-red-800">2. Expected Shortfall (CVaR 95%)</b>
                <p class="text-xs text-red-900 mt-1">ประเมินมูลค่าความเสียหาย "ค่าเฉลี่ยใน 5% ของเหตุการณ์ที่เลวร้ายที่สุด"</p>
                <div class="mt-2 font-mono text-[11px] bg-white p-2 border border-red-300 rounded text-center">
                    CVaR<sub>95%</sub>(X) = E[ X | X &le; VaR<sub>95%</sub>(X) ]
                </div>
            </div>
        </div>`
    },
    "math-knapsack": {
        icon: "🎒",
        title: "9. อัลกอริทึมจัดกระเป๋าผลิตภัณฑ์ (DP Knapsack & Optimization)",
        content: `
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-emerald-800">อัลกอริทึม 0/1 Knapsack ผสาน Pareto Optimization</b>
                <p class="text-xs text-gray-600 mt-1">คำนวณส่วนผสมของ Base + Rider ที่ให้ "อรรถประโยชน์สูงสุด" ภายใต้งบประมาณที่จ่ายไหว</p>
                <ul class="text-[11px] list-disc list-inside mt-2 font-mono bg-gray-50 p-2 border rounded">
                    <li>Cost(s') = Cost(s) + P<sub>i</sub> &le; Budget<sub>max</sub></li>
                    <li>Score(s') = Score(s) + U<sub>i</sub></li>
                </ul>
            </div>
        </div>`
    },
    "math-taxalpha": {
        icon: "⚖️",
        title: "10. อัลกอริทึมประเมินภาษีเชิงรุก (Tax Alpha Engine)",
        content: `
        <p class="mb-3">ระบบคำนวณประหยัดภาษี (Tax Optimization) อิงตามกฎหมาย ภ.ง.ด. 90/91 (เกณฑ์ปี 2568)</p>
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border shadow-sm">
                <b class="text-orange-800">Greedy Tax Alpha Optimization</b>
                <p class="text-xs text-gray-600 mt-1">รินงบส่วนเกินเข้าสู่กองทุนลดหย่อน โดย <b>AI มีกฎเหล็กคือ จะแนะนำลงทุนก็ต่อเมื่อฐานภาษี > 10% เท่านั้น</b></p>
                <ul class="text-[11px] list-decimal list-inside mt-2 space-y-1">
                    <li><b>Priority 1:</b> กองทุน Thai ESG (เงื่อนไข 5 ปี)</li>
                    <li><b>Priority 2:</b> กลุ่มเกษียณ RMF / SSF</li>
                </ul>
            </div>
        </div>`
    },
    "term-invest": {
        icon: "📈",
        title: "11. พจนานุกรม: การวิเคราะห์และกลยุทธ์การลงทุน (Investment & Strategy)",
        content: `<ul class="list-disc list-inside mt-2 space-y-3 text-sm text-gray-700">
            <li><b>Asset Allocation (การจัดสรรสินทรัพย์):</b> การกระจายสัดส่วนเงินลงทุนไปในสินทรัพย์ประเภทต่างๆ เพื่อรักษาสมดุลระหว่างผลตอบแทนและความเสี่ยง</li>
            <li><b>Expected Shortfall (CVaR 95%):</b> มูลค่าความเสียหายที่คาดว่าจะเกิดขึ้น ในกรณีที่ตลาดตกต่ำที่สุด 5%</li>
            <li><b>Tax Alpha:</b> ผลตอบแทนส่วนเพิ่มจากการวางแผนโครงสร้างภาษีอย่างมีประสิทธิภาพ ทำให้ได้เงินคืนภาษีกลับมา Re-invest ทันที</li>
        </ul>`
    },
    "term-behavior": {
        icon: "🎭",
        title: "12. พจนานุกรม: จิตวิทยาและพฤติกรรมทางการเงิน (Behavioral Finance & DISC)",
        content: `
        <ul class="list-disc list-inside mt-2 space-y-2 text-sm text-gray-700">
            <li><b>Loss Aversion (ความเกลียดกลัวการขาดทุน):</b> อคติที่มนุษย์จะรู้สึกเจ็บปวดกับการขาดทุน มากกว่าความดีใจที่ได้กำไรในจำนวนเงินที่เท่ากัน (ประมาณ 2-2.5 เท่า)</li>
            <li><b>Lifestyle Creep (กับดักไลฟ์สไตล์):</b> ภาวะที่ค่าใช้จ่ายรายเดือนเพิ่มสูงขึ้นเรื่อยๆ ตามรายได้ที่เพิ่มขึ้น</li>
            <li><b>Debt Snowball / Avalanche:</b> กลยุทธ์การปลดหนี้ (Snowball = โปะยอดน้อยสุดก่อน, Avalanche = โปะดอกเบี้ยแพงสุดก่อน)</li>
        </ul>
        <div class="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm">
            <h5 class="font-bold text-indigo-900 mb-2 flex items-center gap-2"><span class="text-lg">🗣️</span> ทฤษฎีพฤติกรรม (DISC Personality Model)</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div class="bg-white p-3 rounded border shadow-sm"><b class="text-red-600 block mb-1">D - Dominance (สไตล์ผู้นำ)</b><i class="text-gray-500">FA ควรนำเสนอผลลัพธ์สุทธิ ตัวเลขชัดเจน ให้เขาตัดสินใจเอง</i></div>
                <div class="bg-white p-3 rounded border shadow-sm"><b class="text-yellow-600 block mb-1">I - Influence (สไตล์เข้าสังคม)</b><i class="text-gray-500">FA ควรนำเสนอแบบ Storytelling ภาพใหญ่ เลี่ยงตารางซับซ้อน</i></div>
                <div class="bg-white p-3 rounded border shadow-sm"><b class="text-green-600 block mb-1">S - Steadiness (สไตล์มั่นคง)</b><i class="text-gray-500">FA ควรนำเสนอแผนที่เน้นปกป้องเงินต้น อธิบายอย่างใจเย็น</i></div>
                <div class="bg-white p-3 rounded border shadow-sm"><b class="text-blue-600 block mb-1">C - Conscientious (นักวิเคราะห์)</b><i class="text-gray-500">FA ควรเตรียมหลักฐานเชิงประจักษ์ สถิติ กราฟ และตอบด้วยตรรกะ</i></div>
            </div>
        </div>`
    }
};

// Export (หากใช้งานผ่าน Webpack/Node)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { systemDictionary };
}