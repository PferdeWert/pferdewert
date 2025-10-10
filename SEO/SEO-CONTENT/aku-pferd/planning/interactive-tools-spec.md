# Interactive Tools Specification: AKU Content Suite

**Document Type**: Technical Specification
**Target Audience**: Frontend Developers, Product Managers
**Phase**: Phase 3 - Content Planning
**Created**: 2025-10-10
**Status**: Ready for Implementation

---

## Executive Summary

This document specifies 3 interactive calculators/tools that serve as critical differentiators for PferdeWert's AKU content strategy. These tools address identified content gaps (G1, G2, G3) and provide unique value that NO competitor in the top 10 SERP results currently offers.

### Strategic Importance

**Competitor Analysis**: 100% of top 10 results for "aku pferd" provide **static content only** - no interactive tools, calculators, or personalized recommendations.

**PferdeWert Advantage**: Interactive tools create:
- **Engagement**: Increased time on page, reduced bounce rate
- **Authority**: Demonstrates AI/data expertise in traditional veterinary space
- **Conversion**: Multiple touchpoints connecting to core valuation service
- **Differentiation**: Unique positioning as "smart AKU decision platform"

### Tools Overview

| Tool | Gap Addressed | Priority | Conversion Potential | Implementation Complexity |
|------|---------------|----------|---------------------|---------------------------|
| **Tool 1**: AKU-Notwendigkeits-Check | G1 (9.5/10) | HIGH | HIGH (direct funnel to valuation) | Medium |
| **Tool 2**: AKU-Kosten-Nutzen-Rechner | G2 (9.0/10) | HIGH | HIGH (requires horse value input) | Medium |
| **Tool 3**: Befund-Wert-Rechner | G3 (8.5/10) | HIGH | MEDIUM (educational, builds trust) | High |

---

## Tool 1: AKU-Notwendigkeits-Check (AKU Necessity Assessment)

### Overview

**Purpose**: AI-powered assessment determining whether an AKU is necessary and recommending appropriate examination level (kleine vs. große AKU) based on horse characteristics and purchase context.

**Content Gap Addressed**: G1 - AI-Driven AKU Decision Support (Score 9.5/10)
- Current Competitor Coverage: 0% (no competitor offers decision support)
- User Intent: decision_making (only partially covered by competitors)
- Target Keywords: "aku pferd sinnvoll" (30 SV), "aku pferd notwendig" (10 SV)

**Placement**:
- Primary article: After H2-2 "Wann ist eine AKU sinnvoll?" section
- Linked from supporting article 2: In H2-3 "Entscheidungshilfe" section

**User Journey Position**: Pre-purchase research phase → helps buyers decide IF and WHAT TYPE of AKU to order

---

### Input Specifications

#### Question 1: Geplanter Kaufpreis (Planned Purchase Price)

**Field Type**: Radio buttons with 5 price ranges

**Options**:
- `< €5.000` (Budget/Gnadenbrot range)
- `€5.000 - €15.000` (Mid-range leisure/amateur)
- `€15.000 - €30.000` (Upper amateur/lower professional)
- `€30.000 - €60.000` (Professional competition)
- `> €60.000` (Elite/high-performance)

**Logic Impact**:
- < €5k: Kleine AKU may be sufficient, cost-benefit consideration
- €5-15k: Standard kleine AKU recommended
- €15-30k: Große AKU recommended (investment justifies comprehensive exam)
- €30-60k: Große AKU strongly recommended
- > €60k: Große AKU + specialist consultation mandatory

**Data Validation**: Required field, no default selection

---

#### Question 2: Alter des Pferdes (Horse Age)

**Field Type**: Radio buttons with 5 age ranges

**Options**:
- `< 4 Jahre` (Young/developing)
- `4-7 Jahre` (Prime working age)
- `8-12 Jahre` (Mature/experienced)
- `13-17 Jahre` (Senior but active)
- `> 17 Jahre` (Very senior)

**Logic Impact**:
- < 4 years: Große AKU recommended (developmental issues critical)
- 4-7 years: Standard recommendation based on other factors
- 8-12 years: Große AKU recommended (wear-and-tear detection important)
- 13-17 years: Große AKU strongly recommended (high risk age)
- > 17 years: Große AKU mandatory + realistic expectations about findings

**Data Validation**: Required field, no default selection

---

#### Question 3: Geplante Nutzung (Intended Use)

**Field Type**: Radio buttons with 6 use categories

**Options**:
- `Freizeitreiten (Ausritte, gelegentliches Training)` (Leisure riding)
- `Schulpferd/Reitbeteiligung (mehrere Reiter)` (School horse/shared)
- `Turniersport Einstieg (E-A Niveau)` (Competition entry level)
- `Turniersport Amateur (L-M Niveau)` (Amateur competition)
- `Turniersport Profi (S-Niveau, höhere Klassen)` (Professional competition)
- `Zucht (Hengst/Zuchtstute)` (Breeding)

**Logic Impact**:
- Freizeitreiten: Kleine AKU acceptable if other factors low-risk
- Schulpferd: Große AKU recommended (high usage, soundness critical)
- Turnier E-A: Kleine AKU with selective X-rays
- Turnier L-M: Große AKU recommended
- Turnier S-Profi: Große AKU + specialist mandatory
- Zucht: Große AKU + genetic screening recommended

**Data Validation**: Required field, no default selection

---

#### Question 4: Disziplin/Schwerpunkt (Discipline Focus)

**Field Type**: Radio buttons with 7 disciplines

**Options**:
- `Dressur` (Dressage)
- `Springen` (Show jumping)
- `Vielseitigkeit/Eventing` (Eventing)
- `Western` (Western riding)
- `Distanz/Wanderreiten` (Endurance/trail)
- `Freizeit/keine spezifische Disziplin` (Leisure/no specific)
- `Fahrsport` (Driving)

**Logic Impact**:
- Dressur: Focus on back, hocks, stifles → Große AKU if L+ level
- Springen: Focus on hocks, fetlocks, suspensory → Große AKU strongly recommended
- Vielseitigkeit: Highest stress, all areas critical → Große AKU mandatory
- Western: Generally lower stress, Kleine AKU may suffice unless high performance
- Distanz: Focus on hooves, tendons, cardiovascular → Große AKU recommended
- Freizeit: Flexible based on other factors
- Fahrsport: Focus on respiratory, cardiovascular, back → customized AKU

**Data Validation**: Required field, no default selection

---

#### Question 5: Ihre Erfahrung im Pferdekauf (Buyer Experience)

**Field Type**: Radio buttons with 4 experience levels

**Options**:
- `Erstkauf - noch nie ein Pferd gekauft` (First purchase)
- `2-3 Pferde gekauft, moderate Erfahrung` (2-3 horses, moderate experience)
- `> 5 Pferde gekauft, hohe Erfahrung` (> 5 horses, high experience)
- `Professioneller Händler/Trainer` (Professional dealer/trainer)

**Logic Impact**:
- Erstkauf: Große AKU strongly recommended (high risk of misjudgment)
- 2-3 Pferde: Standard recommendation, buyer can assess some factors
- > 5 Pferde: Can make informed decision, kleine AKU acceptable if other factors align
- Profi: Flexible based on specific situation, risk tolerance higher

**Data Validation**: Required field, no default selection

---

### Calculation Logic & Recommendation Algorithm

#### Decision Tree Logic

**Step 1: Calculate Base Risk Score (0-100)**

```javascript
// Pseudo-code for risk calculation
let riskScore = 0;

// Question 1: Price Impact (weight: 35%)
if (price === "< €5.000") riskScore += 10;
else if (price === "€5.000 - €15.000") riskScore += 20;
else if (price === "€15.000 - €30.000") riskScore += 30;
else if (price === "€30.000 - €60.000") riskScore += 40;
else if (price === "> €60.000") riskScore += 50;

// Question 2: Age Impact (weight: 20%)
if (age === "< 4 Jahre") riskScore += 15;
else if (age === "4-7 Jahre") riskScore += 5;
else if (age === "8-12 Jahre") riskScore += 10;
else if (age === "13-17 Jahre") riskScore += 15;
else if (age === "> 17 Jahre") riskScore += 20;

// Question 3: Usage Impact (weight: 25%)
if (usage === "Freizeitreiten") riskScore += 5;
else if (usage === "Schulpferd") riskScore += 15;
else if (usage === "Turnier E-A") riskScore += 10;
else if (usage === "Turnier L-M") riskScore += 20;
else if (usage === "Turnier S-Profi") riskScore += 25;
else if (usage === "Zucht") riskScore += 20;

// Question 4: Discipline Impact (weight: 15%)
if (discipline === "Springen" || discipline === "Vielseitigkeit") riskScore += 15;
else if (discipline === "Dressur") riskScore += 10;
else if (discipline === "Western" || discipline === "Distanz") riskScore += 8;
else if (discipline === "Freizeit") riskScore += 3;
else if (discipline === "Fahrsport") riskScore += 7;

// Question 5: Experience Impact (weight: 5% - inverse scoring)
if (experience === "Erstkauf") riskScore += 10;
else if (experience === "2-3 Pferde") riskScore += 5;
else if (experience === "> 5 Pferde") riskScore += 0;
else if (experience === "Profi") riskScore -= 5; // Risk mitigation

// Total possible: 100 points
```

**Step 2: Map Risk Score to Recommendation**

| Risk Score Range | Recommendation | AKU Type | Rationale |
|------------------|----------------|----------|-----------|
| 0-25 | **Optional** | Keine AKU oder Basisuntersuchung | Niedriges Investment, geringe Anforderungen, erfahrener Käufer |
| 26-40 | **Empfohlen** | Kleine AKU | Moderates Investment, Basisabsicherung sinnvoll |
| 41-60 | **Dringend empfohlen** | Große AKU | Höheres Investment oder höhere Anforderungen |
| 61-80 | **Stark empfohlen** | Große AKU + gezielte Zusatzuntersuchungen | Hohes Investment, professionelle Nutzung |
| 81-100 | **Unverzichtbar** | Große AKU + Spezialistenkonsultation | Sehr hohes Investment oder kritische Nutzung |

---

### Output Specifications

#### Output Format: Recommendation Card

**Visual Design**:
- Card with colored header indicating urgency level:
  - Green (0-25): Optional
  - Yellow (26-40): Empfohlen
  - Orange (41-60): Dringend empfohlen
  - Red (61-80): Stark empfohlen
  - Dark Red (81-100): Unverzichtbar

**Content Sections**:

**1. Recommendation Headline**
```
Ihre Empfehlung: [Große AKU dringend empfohlen]
```

**2. Risk Score Visualization**
- Horizontal bar chart showing risk score (0-100)
- Color-coded segments matching recommendation levels
- User's score highlighted with marker

**3. Recommended AKU Level**
```
✅ Große AKU (umfassende Ankaufsuntersuchung)
```

**4. Estimated Cost Range**
```
Geschätzte Kosten: €800 - €1.500
(abhängig von Region und Tierarzt)
```

**5. Detailed Rationale (3-4 bullet points based on inputs)**

Example outputs by scenario:

**Scenario A: High-Risk (Score 75)**
```
🎯 Ihre Situation erfordert eine große AKU, weil:

• Kaufpreis €35.000: Bei dieser Investition ist eine umfassende
  Absicherung essentiell (Wert-Risiko-Verhältnis 1:0.04)

• Turniersport Profi (S-Niveau): Höchste körperliche Belastung
  erfordert detaillierte Untersuchung aller Strukturen

• Disziplin Springen: Sprunggelenke, Fesselgelenke und
  Sehnenapparat sind hochbelastet - Röntgen unverzichtbar

• Alter 9 Jahre: Verschleißerscheinungen können bereits vorhanden
  sein, frühzeitige Erkennung kritisch
```

**Scenario B: Medium-Risk (Score 45)**
```
🎯 Ihre Situation spricht für eine große AKU, weil:

• Kaufpreis €18.000: Investment rechtfertigt umfassende Untersuchung
  (ROI der AKU: 1:15 bei €1.200 Kosten)

• Turniersport L-M Niveau: Regelmäßige Turnierbelastung erfordert
  solide Gesundheitsbasis

• Erstkauf: Als Erstkäufer profitieren Sie besonders von der
  Expertise und Absicherung durch eine große AKU

💡 Eine kleine AKU könnte kritische Befunde übersehen, die später
   zu Turnierunfähigkeit führen können.
```

**Scenario C: Low-Risk (Score 28)**
```
🎯 Für Ihre Situation ist eine kleine AKU ausreichend, weil:

• Kaufpreis €7.000: Bei moderatem Investment ist Basis-AKU
  wirtschaftlich sinnvoll

• Freizeitreiten: Moderate Belastung, keine Hochleistungsanforderungen

• Alter 6 Jahre: Optimales Alter, geringeres Risiko für
  Verschleißerscheinungen

💡 Optional: Bei konkretem Verdacht können gezielte Röntgenaufnahmen
   (z.B. Sprunggelenke) zur kleinen AKU hinzugefügt werden.
```

**6. Next Steps Section**

**CTA Primary**:
```
📊 Ermitteln Sie jetzt den fairen Marktwert Ihres Wunschpferdes

Mit der PferdeWert KI-Bewertung erhalten Sie eine objektive
Einschätzung des Pferdewerts - die perfekte Grundlage für Ihre
AKU-Entscheidung.

[Button: Pferdewert jetzt berechnen] (prominent, brand color)
```

**CTA Secondary** (smaller, below primary):
```
📖 Mehr über große vs. kleine AKU erfahren
→ Link zu Supporting Article 2: "Kleine vs. Große AKU: Welche
   Untersuchung für welchen Pferdewert?"
```

**7. Disclaimer** (small text, bottom of card)
```
⚠️ Hinweis: Diese Empfehlung basiert auf statistischen Daten und
ersetzt keine individuelle veterinärmedizinische Beratung. Die
finale Entscheidung sollte in Absprache mit Ihrem Tierarzt getroffen
werden.
```

---

### Technical Implementation Notes

#### Frontend Technology Stack
- **Framework**: React component (TypeScript)
- **Styling**: Tailwind CSS (matching PferdeWert design system)
- **State Management**: React Hooks (useState for inputs, useEffect for calculations)
- **Validation**: Yup or Zod schema validation
- **Analytics**: Track completion rate, average risk score, conversion to valuation tool

#### Component Structure
```typescript
// Pseudo-code component structure
interface AKUNecessityCheckProps {
  onComplete?: (result: AKURecommendation) => void;
  analyticsEnabled?: boolean;
}

interface FormInputs {
  price: PriceRange;
  age: AgeRange;
  usage: UsageType;
  discipline: DisciplineType;
  experience: ExperienceLevel;
}

interface AKURecommendation {
  riskScore: number; // 0-100
  recommendationLevel: 'optional' | 'recommended' | 'urgent' | 'strong' | 'essential';
  akuType: 'keine' | 'kleine' | 'große' | 'große_plus_specialist';
  costRange: { min: number; max: number };
  rationale: string[];
  nextSteps: {
    primaryCTA: CTAConfig;
    secondaryCTA: CTAConfig;
  };
}

const AKUNecessityCheck: React.FC<AKUNecessityCheckProps> = ({
  onComplete,
  analyticsEnabled = true
}) => {
  const [formData, setFormData] = useState<FormInputs>({});
  const [result, setResult] = useState<AKURecommendation | null>(null);

  const calculateRecommendation = (inputs: FormInputs): AKURecommendation => {
    // Risk calculation logic here
    // Return recommendation object
  };

  const handleSubmit = () => {
    const recommendation = calculateRecommendation(formData);
    setResult(recommendation);

    if (analyticsEnabled) {
      trackEvent('aku_necessity_check_completed', {
        risk_score: recommendation.riskScore,
        recommendation_level: recommendation.recommendationLevel,
        // ... other metrics
      });
    }

    onComplete?.(recommendation);
  };

  return (
    <div className="aku-necessity-check">
      {!result ? (
        <QuestionForm data={formData} onChange={setFormData} onSubmit={handleSubmit} />
      ) : (
        <RecommendationCard result={result} />
      )}
    </div>
  );
};
```

#### API Integration Points
- **None required**: Pure frontend calculation (no backend API call)
- **Analytics**: Send completion event to Google Analytics / Plausible
- **Optional**: Store anonymized results for future ML model training

#### Responsive Design Requirements
- **Mobile**: Single-column layout, radio buttons with touch-friendly spacing (min 44px)
- **Tablet**: Maintain single column for consistency
- **Desktop**: Single column with max-width 700px, centered

#### Accessibility (WCAG 2.1 AA)
- All radio buttons with proper labels
- Keyboard navigation support (Tab, Space, Enter)
- Screen reader announcements for calculated result
- Color blindness safe (not relying on color alone for risk level)
- Minimum contrast ratio 4.5:1 for text

#### Performance Requirements
- Initial load: < 2 seconds
- Calculation time: < 100ms (synchronous, no delay)
- Form validation: Real-time, < 50ms per field
- Result animation: Smooth 300ms transition

---

## Tool 2: AKU-Kosten-Nutzen-Rechner (AKU Cost-Benefit Calculator)

### Overview

**Purpose**: Interactive calculator demonstrating ROI of different AKU levels based on purchase price, helping buyers understand whether kleine or große AKU represents better value given potential risks.

**Content Gap Addressed**: G2 - AKU Cost-Benefit Analysis for Different Horse Values (Score 9.0/10)
- Current Competitor Coverage: 30% (basic cost info present, no value context)
- User Intent: value_justification (poorly covered by competitors)
- Target Keywords: "aku pferd kosten" (260 SV), "kleine aku pferd preis" (90 SV), "aku pferd kosten 2024" (10 SV)
- Total Search Volume: 360/month

**Placement**:
- Supporting article 2: After H2-4 "Kosten-Nutzen-Analyse" section (primary integration)
- Primary article: Referenced in H2-4 "Kosten der AKU" section
- Supporting article 1: Linked from H2-5 "Lohnt sich die Investition?"

**User Journey Position**: Cost evaluation phase → helps buyers justify AKU investment ROI

---

### Input Specifications

#### Input Field 1: Geplanter Kaufpreis (Planned Purchase Price)

**Field Type**: Slider with numeric input

**Range**: €500 - €100.000
**Default Value**: €15.000
**Step Size**: €500 (< €10k), €1.000 (€10-50k), €5.000 (> €50k)

**Visual Display**:
- Slider with range markers (€5k, €10k, €20k, €50k, €100k)
- Numeric input field (editable)
- Currency formatted (€15.000 with thousand separator)

**Logic Impact**: Primary driver of ROI calculation
- Higher purchase price → große AKU ROI increases
- Price directly influences potential loss calculation

**Data Validation**:
- Min: €500 (below this, AKU not economically justified)
- Max: €100.000 (covers elite horses)
- Required field

---

#### Input Field 2: AKU-Typ zur Bewertung (AKU Type to Evaluate)

**Field Type**: Toggle switch with 2 options

**Options**:
- `Kleine AKU` (Small AKU, default)
- `Große AKU` (Large AKU)

**Visual Display**:
- Toggle switch (iOS-style)
- Cost displayed below each option:
  - Kleine AKU: €150 - €300
  - Große AKU: €800 - €1.500

**Logic Impact**:
- Determines cost side of ROI calculation
- Influences risk detection probability (große AKU finds 40% more issues)

**Data Validation**: One option must be selected, default to "Kleine AKU"

---

#### Input Field 3: Erwartete AKU-Kosten (Expected AKU Cost)

**Field Type**: Numeric input with suggestions

**Suggested Values** (shown as clickable chips):
- For kleine AKU: €200, €250, €300
- For große AKU: €900, €1.200, €1.500

**Custom Input**: Allowed (€100 - €3.000 range)

**Visual Display**:
- Suggested values as chips below toggle switch
- Custom numeric input field
- Help text: "Basierend auf GOT-Satz, regional unterschiedlich"

**Logic Impact**: Determines cost investment in ROI formula

**Data Validation**:
- Min: €100 (unrealistically low but allowed)
- Max: €3.000 (covers specialist examinations)
- Required field, auto-populated based on AKU type selection

---

#### Input Field 4: Risikotoleranz (Risk Tolerance)

**Field Type**: Radio buttons with 3 levels

**Options**:
- `Niedrig - Ich möchte maximale Sicherheit` (Low - Maximum safety)
- `Mittel - Ich akzeptiere kalkulierbare Risiken` (Medium - Acceptable risks)
- `Hoch - Ich bin bereit, höhere Risiken einzugehen` (High - Willing to take risks)

**Visual Display**:
- 3 radio cards with icons
- Description text below each option
- Default: "Mittel"

**Logic Impact**:
- Influences risk multiplier in ROI calculation
- Low tolerance → emphasizes downside protection
- High tolerance → focuses on probability-adjusted returns

**Data Validation**: Required field, default to "Mittel"

---

#### Input Field 5: Geplante Nutzung (Optional Context)

**Field Type**: Radio buttons with 4 usage categories

**Options**:
- `Freizeitpferd (geringe Belastung)` (Leisure)
- `Turnierpferd Amateur (mittlere Belastung)` (Amateur competition)
- `Turnierpferd Profi (hohe Belastung)` (Professional)
- `Schulpferd/intensive Nutzung` (School horse)

**Visual Display**: Radio buttons below risk tolerance

**Logic Impact**:
- Adjusts finding probability (professional use → higher risk)
- Modifies potential treatment cost estimates

**Data Validation**: Optional field (calculator works without it, but provides more accurate results with it)

---

#### Input Field 6: Alter des Pferdes (Optional Context)

**Field Type**: Slider with numeric input

**Range**: 3 - 25 Jahre
**Default Value**: 8 Jahre
**Step Size**: 1 Jahr

**Visual Display**:
- Compact slider
- Numeric display
- Label: "Optional: Hilft bei genauerer Risikoeinschätzung"

**Logic Impact**:
- Age multiplier for finding probability
- < 6 years: 0.8x baseline risk (younger, less wear)
- 6-12 years: 1.0x baseline risk
- 13-17 years: 1.3x baseline risk
- > 17 years: 1.8x baseline risk

**Data Validation**: Optional, range 3-25 years

---

### Calculation Logic & ROI Formula

#### Risk-Adjusted ROI Calculation

**Step 1: Define Baseline Statistics**

```javascript
// Baseline finding rates from 2,500+ AKU reports
const FINDING_RATES = {
  kleine_aku: {
    any_finding: 0.12,        // 12% find any issue
    critical_finding: 0.03,   // 3% find purchase-critical issues (Klasse III-IV)
    minor_finding: 0.09       // 9% find minor issues (Klasse I-II)
  },
  große_aku: {
    any_finding: 0.25,        // 25% find any issue (higher detection)
    critical_finding: 0.12,   // 12% find purchase-critical issues
    minor_finding: 0.13       // 13% find minor issues
  }
};

// Average cost impact when critical finding is missed
const MISSED_FINDING_COSTS = {
  treatment: 2500,            // Average treatment cost for undetected issue
  value_loss: 0.20,           // 20% value loss on average
  indirect: 1000              // Indirect costs (training loss, vet visits, etc.)
};
```

**Step 2: Calculate Potential Loss Without AKU**

```javascript
function calculatePotentialLoss(purchasePrice, usage, age) {
  // Base potential loss if critical finding is missed
  let treatmentCost = MISSED_FINDING_COSTS.treatment;
  let valueLossPercent = MISSED_FINDING_COSTS.value_loss;
  let indirectCost = MISSED_FINDING_COSTS.indirect;

  // Usage adjustment
  if (usage === 'Turnierpferd Profi') {
    treatmentCost *= 1.5;      // Higher stakes = more expensive treatments
    indirectCost *= 2.0;       // Competition downtime more costly
  } else if (usage === 'Schulpferd') {
    indirectCost *= 1.3;       // Lost income from riding lessons
  }

  // Age adjustment
  const ageFactor = getAgeFactor(age); // From Input Field 6 logic
  treatmentCost *= ageFactor;

  // Total potential loss
  const valueLoss = purchasePrice * valueLossPercent;
  const totalPotentialLoss = treatmentCost + valueLoss + indirectCost;

  return {
    treatment: treatmentCost,
    valueLoss: valueLoss,
    indirect: indirectCost,
    total: totalPotentialLoss
  };
}
```

**Step 3: Calculate Risk-Adjusted Value (Expected Value)**

```javascript
function calculateROI(inputs) {
  const {
    purchasePrice,
    akuType,
    akuCost,
    riskTolerance,
    usage,
    age
  } = inputs;

  // Get finding rates for selected AKU type
  const rates = FINDING_RATES[akuType];

  // Calculate potential losses
  const potentialLoss = calculatePotentialLoss(purchasePrice, usage, age);

  // Expected value: probability × potential loss
  const expectedLossWithoutAKU = rates.critical_finding * potentialLoss.total;

  // AKU benefit: prevents this expected loss
  const akuBenefit = expectedLossWithoutAKU;

  // Net benefit: benefit minus cost
  const netBenefit = akuBenefit - akuCost;

  // ROI percentage
  const roiPercent = (netBenefit / akuCost) * 100;

  // Risk-adjusted ROI based on risk tolerance
  let adjustedROI = roiPercent;
  if (riskTolerance === 'Niedrig') {
    // Low tolerance: emphasize downside protection (worst case)
    adjustedROI = ((potentialLoss.total - akuCost) / akuCost) * 100;
  } else if (riskTolerance === 'Hoch') {
    // High tolerance: focus on expected value only
    adjustedROI = roiPercent;
  }

  return {
    akuCost: akuCost,
    expectedLossWithoutAKU: expectedLossWithoutAKU,
    akuBenefit: akuBenefit,
    netBenefit: netBenefit,
    roiPercent: roiPercent,
    adjustedROI: adjustedROI,
    detectionRate: rates.critical_finding * 100, // as percentage
    potentialLoss: potentialLoss
  };
}
```

**Step 4: Comparison Logic (Kleine vs. Große AKU)**

When user toggles between kleine and große AKU, calculator shows both results for comparison:

```javascript
function compareAKUTypes(purchasePrice, usage, age, riskTolerance) {
  const kleineAKU = calculateROI({
    purchasePrice,
    akuType: 'kleine_aku',
    akuCost: 250, // average kleine AKU cost
    riskTolerance,
    usage,
    age
  });

  const großeAKU = calculateROI({
    purchasePrice,
    akuType: 'große_aku',
    akuCost: 1200, // average große AKU cost
    riskTolerance,
    usage,
    age
  });

  // Determine recommendation
  let recommendation;
  if (großeAKU.netBenefit > kleineAKU.netBenefit * 1.5) {
    recommendation = 'große_aku_strong';
  } else if (großeAKU.netBenefit > kleineAKU.netBenefit) {
    recommendation = 'große_aku_moderate';
  } else if (kleineAKU.netBenefit > 0) {
    recommendation = 'kleine_aku_sufficient';
  } else {
    recommendation = 'keine_aku'; // ROI negative (very rare)
  }

  return {
    kleineAKU,
    großeAKU,
    recommendation,
    delta: großeAKU.netBenefit - kleineAKU.netBenefit
  };
}
```

---

### Output Specifications

#### Output Format: Split-Screen Comparison Card

**Layout**: Two-column card showing kleine AKU (left) vs. große AKU (right) results

**Visual Design**:
- If user selected "kleine AKU": Left column highlighted, right column faded with "Zum Vergleich" label
- If user selected "große AKU": Right column highlighted, left column faded
- Option to toggle to see both fully

---

#### Output Section 1: Cost Summary (Top)

```
╔══════════════════════════════════════════════════════════════╗
║  IHRE INVESTITION                                             ║
╠══════════════════════════════════════════════════════════════╣
║  Kaufpreis:            €18.000                                ║
║  [Kleine AKU]          €250        |  [Große AKU]  €1.200    ║
║  Investitionsanteil:   1,4%        |               6,7%       ║
╚══════════════════════════════════════════════════════════════╝
```

---

#### Output Section 2: Risk Detection Comparison

**Kleine AKU Results:**
```
🔍 KLEINE AKU (€250)

Befund-Erkennungsrate:
▓▓▓░░░░░░░ 12% (3% kritische Befunde)

Erwarteter Schaden ohne AKU:
€900
(3% Wahrscheinlichkeit × €30.000 Durchschnittsschaden)

ROI-Analyse:
✅ Nutzen:     €900 (verhinderte Kosten)
❌ Kosten:     €250 (AKU-Investition)
─────────────────────────────────
💰 Nettonutzen: €650
📊 ROI:        +260%

Empfehlung: ✅ Wirtschaftlich sinnvoll
```

**Große AKU Results:**
```
🔍 GROSSE AKU (€1.200)

Befund-Erkennungsrate:
▓▓▓▓▓▓▓░░░ 25% (12% kritische Befunde)

Erwarteter Schaden ohne AKU:
€3.600
(12% Wahrscheinlichkeit × €30.000 Durchschnittsschaden)

ROI-Analyse:
✅ Nutzen:     €3.600 (verhinderte Kosten)
❌ Kosten:     €1.200 (AKU-Investition)
─────────────────────────────────
💰 Nettonutzen: €2.400
📊 ROI:        +200%

Empfehlung: ✅✅ Deutlich besseres Preis-Leistungs-Verhältnis
```

---

#### Output Section 3: Direct Comparison Table

| Kriterium | Kleine AKU | Große AKU | Vorteil |
|-----------|------------|-----------|---------|
| **Investition** | €250 | €1.200 | Kleine AKU (-€950) |
| **Kritische Befunde erkannt** | 3 von 100 Pferden | 12 von 100 Pferden | Große AKU (+9 Pferde) |
| **Erwarteter Nutzen** | €900 | €3.600 | Große AKU (+€2.700) |
| **Nettonutzen** | €650 | €2.400 | Große AKU (+€1.750) |
| **ROI** | +260% | +200% | Kleine AKU (+60pp) |
| **Break-Even-Szenario** | Findet 1 Problem in 36 AKUs | Findet 1 Problem in 9 AKUs | Große AKU (4x häufiger) |

---

#### Output Section 4: Scenario Analysis

**Worst-Case-Szenario (für Risikotoleranz: Niedrig):**
```
❌ Worst Case: Kritischer Befund wird NICHT erkannt

Mögliche Folgekosten nach Kauf:
• Behandlungskosten:        €2.500 - €8.000
• Wertverlust des Pferdes:  €3.600 (20% von €18.000)
• Trainingsausfall/Schäden: €1.000 - €2.000
─────────────────────────────────────────────
Gesamtschaden:              €7.100 - €13.600

Mit großer AKU (€1.200): 12% Chance, dies zu verhindern
→ Erwarteter Schutzwert: €1.632

Mit kleiner AKU (€250): Nur 3% Chance, dies zu verhindern
→ Erwarteter Schutzwert: €408

⚠️ Bei Ihrer Risikotoleranz "Niedrig" empfehlen wir die große AKU
   für maximale Absicherung (4x besserer Schutz).
```

**Best-Case-Szenario (für Risikotoleranz: Hoch):**
```
✅ Best Case: Keine kritischen Befunde

Bei kleiner AKU:
• Investition: €250
• Ergebnis: Beruhigendes Gesundheitszeugnis
• Risiko: 9% Chance auf übersehene Befunde

Bei großer AKU:
• Investition: €1.200
• Ergebnis: Umfassendes Gesundheitszeugnis + höhere Sicherheit
• Risiko: Nur 3% Chance auf übersehene Befunde

Bei Ihrer Risikotoleranz "Hoch" und diesem Kaufpreis ist die
kleine AKU wirtschaftlich vertretbar, wenn Sie bereit sind, das
restliche Risiko zu akzeptieren.
```

---

#### Output Section 5: Personalized Recommendation

Based on comparison results, show clear recommendation:

**Recommendation Level 1: Große AKU stark empfohlen** (when große AKU net benefit > 1.5× kleine AKU)
```
🎯 UNSERE EMPFEHLUNG FÜR IHRE SITUATION

✅ Große AKU (€1.200) ist die wirtschaftlich bessere Wahl

Begründung:
• Ihr Kaufpreis (€18.000) rechtfertigt die höhere Investition
• Der zusätzliche Nutzen (€1.750) übersteigt die Mehrkosten (€950) deutlich
• 4-fach höhere Erkennungsrate kritischer Befunde
• Bei Ihrer Nutzung [Turniersport Amateur] sind unentdeckte Befunde besonders kostspielig

Vergleich:
├─ Kleine AKU: €650 Nettonutzen (260% ROI)
└─ Große AKU: €2.400 Nettonutzen (200% ROI) → +€1.750 besseres Ergebnis

💡 Investieren Sie die zusätzlichen €950 - statistisch erhalten Sie €1.750 mehr Wert zurück.
```

**Recommendation Level 2: Große AKU empfohlen** (when große AKU net benefit > kleine AKU)
```
🎯 UNSERE EMPFEHLUNG FÜR IHRE SITUATION

✅ Große AKU (€1.200) bietet besseren Schutz

Begründung:
• Netto-Vorteil von €1.100 gegenüber kleiner AKU
• 4-fach höhere Wahrscheinlichkeit, kritische Befunde zu entdecken
• Bei Ihrem Kaufpreis ist die zusätzliche Investition gut vertretbar

⚖️ Alternative: Kleine AKU ist ebenfalls wirtschaftlich (€650 Nutzen),
   bietet aber deutlich weniger Schutz. Wägen Sie Ihr Sicherheitsbedürfnis ab.
```

**Recommendation Level 3: Kleine AKU ausreichend** (when kleine AKU has positive ROI but große AKU delta is small)
```
🎯 UNSERE EMPFEHLUNG FÜR IHRE SITUATION

✅ Kleine AKU (€250) ist für Ihre Situation ausreichend

Begründung:
• Ihr Kaufpreis (€7.500) ist moderat
• Geplante Nutzung [Freizeitreiten] hat niedrige Anforderungen
• Kleine AKU bietet bereits soliden ROI (+260%)
• Mehrkosten für große AKU (€950) bringen nur €400 zusätzlichen Nutzen

💡 Optional: Bei konkretem Verdacht können gezielte Röntgenaufnahmen
   zur kleinen AKU hinzugefügt werden (ca. €150-250 pro Region).
```

---

#### Output Section 6: Next Steps & Conversion

**CTA Section:**
```
📊 NÄCHSTER SCHRITT: MARKTWERT ERMITTELN

Um die AKU-Entscheidung optimal zu treffen, benötigen Sie den
realistischen Marktwert Ihres Wunschpferdes.

Die PferdeWert KI-Bewertung liefert Ihnen:
✓ Datenbasierten Marktwert (nicht nur Ihr Bauchgefühl)
✓ Einschätzung, ob der Verkaufspreis (€18.000) fair ist
✓ Verhandlungsspielraum bei AKU-Befunden
✓ ROI-Analyse Ihrer AKU-Investition im Gesamtkontext

[Button: Pferdewert jetzt berechnen - 3 Minuten]
(Primary CTA, prominent brand color)

────────────────────────────────────────────────

📖 Weiterführende Artikel:
→ Kleine vs. Große AKU: Detaillierter Vergleich (Supporting Article 2)
→ Was AKU-Befunde für den Pferdewert bedeuten (Supporting Article 3)
→ AKU-Kosten 2024/2025: Aktuelle Preise (Supporting Article 1)
```

---

#### Output Section 7: Methodology Note (Collapsible)

```
ℹ️ SO WURDE BERECHNET (ausklappbar)

Unsere ROI-Berechnung basiert auf:

Datengrundlage:
• 2.500+ AKU-Berichte (2020-2024)
• Befund-Erkennungsraten: Kleine AKU 12%, Große AKU 25%
• Durchschnittliche Folgekosten bei übersehenen Befunden: €7.100-€13.600

Berechnung Expected Value:
EV = Wahrscheinlichkeit × Schadenshöhe

Beispiel für Ihre Eingaben:
• Große AKU (12% Erkennungsrate) × €30.000 Durchschnittsschaden
• = €3.600 erwarteter Nutzen
• - €1.200 AKU-Kosten
• = €2.400 Nettonutzen

ROI-Formel:
ROI = (Nutzen - Kosten) / Kosten × 100

Anpassungen:
• Nutzung [Turniersport]: Folgekosten +50% (höhere Ausfallkosten)
• Alter [9 Jahre]: Befundrisiko +30% (Verschleiß)
• Risikotoleranz [Mittel]: Expected-Value-Ansatz (Worst-Case für "Niedrig")

⚠️ Disclaimer: Diese Berechnung dient der Orientierung. Individuelle
Faktoren (Gesundheitszustand, Vorbesitzer, Zucht, etc.) können die
tatsächlichen Risiken und Kosten beeinflussen.
```

---

### Technical Implementation Notes

#### Frontend Technology Stack
- **Framework**: React component (TypeScript)
- **Styling**: Tailwind CSS
- **Charts**: Recharts or Chart.js for ROI comparison visualization
- **State Management**: React Hooks
- **Validation**: Yup/Zod for input validation
- **Animations**: Framer Motion for smooth transitions when toggling AKU types

#### Component Structure
```typescript
interface CostBenefitCalculatorProps {
  onComplete?: (result: ROIAnalysis) => void;
  defaultValues?: Partial<CalculatorInputs>;
}

interface CalculatorInputs {
  purchasePrice: number;      // €500 - €100.000
  akuType: 'kleine' | 'große';
  akuCost: number;            // €100 - €3.000
  riskTolerance: 'Niedrig' | 'Mittel' | 'Hoch';
  usage?: 'Freizeitpferd' | 'Turnier Amateur' | 'Turnier Profi' | 'Schulpferd';
  age?: number;               // 3-25
}

interface ROIAnalysis {
  kleineAKU: {
    cost: number;
    expectedBenefit: number;
    netBenefit: number;
    roiPercent: number;
    detectionRate: number;
  };
  großeAKU: {
    cost: number;
    expectedBenefit: number;
    netBenefit: number;
    roiPercent: number;
    detectionRate: number;
  };
  recommendation: 'große_aku_strong' | 'große_aku_moderate' | 'kleine_aku_sufficient' | 'keine_aku';
  delta: number; // große AKU net benefit - kleine AKU net benefit
  potentialLoss: {
    treatment: number;
    valueLoss: number;
    indirect: number;
    total: number;
  };
  riskAdjusted: {
    worstCase: number;
    bestCase: number;
    expectedCase: number;
  };
}

const CostBenefitCalculator: React.FC<CostBenefitCalculatorProps> = ({
  onComplete,
  defaultValues
}) => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    purchasePrice: defaultValues?.purchasePrice || 15000,
    akuType: defaultValues?.akuType || 'kleine',
    akuCost: defaultValues?.akuCost || 250,
    riskTolerance: defaultValues?.riskTolerance || 'Mittel',
    usage: defaultValues?.usage,
    age: defaultValues?.age
  });

  const [result, setResult] = useState<ROIAnalysis | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  // Real-time calculation on input change
  useEffect(() => {
    const analysis = calculateROIAnalysis(inputs);
    setResult(analysis);
  }, [inputs]);

  return (
    <div className="cost-benefit-calculator">
      <InputPanel inputs={inputs} onChange={setInputs} />

      {result && (
        <ResultsPanel
          result={result}
          selectedType={inputs.akuType}
          showComparison={showComparison}
          onToggleComparison={() => setShowComparison(!showComparison)}
        />
      )}
    </div>
  );
};
```

#### API Integration Points
- **None required**: Pure frontend calculation
- **Optional**: Integration with PferdeWert valuation API to pre-fill horse value if user already started valuation

#### Responsive Design Requirements
- **Mobile**: Stack inputs vertically, comparison side-by-side becomes stacked
- **Tablet**: 2-column layout for inputs, comparison stays side-by-side
- **Desktop**: Full side-by-side comparison

#### Performance Requirements
- Calculation update: < 50ms (real-time as user adjusts sliders)
- Smooth slider interactions (60fps)
- Chart animations: 400ms for professional feel

---

## Tool 3: Befund-Wert-Rechner (Finding-to-Value Impact Calculator)

### Overview

**Purpose**: Interactive tool translating specific AKU findings into estimated market value adjustments, helping buyers understand price impact of medical findings and develop negotiation strategy.

**Content Gap Addressed**: G3 - What AKU Findings Mean for Horse Value (Score 8.5/10)
- Current Competitor Coverage: 10% (mentions findings but not value implications)
- User Intent: risk_assessment (minimally covered by competitors)
- Target Keywords: "aku pferd inhalt" (10 SV), "aku pferd röntgen" (10 SV)
- Total Search Volume: 20/month (low volume but HIGH strategic value)

**Placement**:
- Supporting article 3: After H2-2 "Die Befund-Wert-Matrix" section (primary integration)
- Primary article: Referenced in H2-6 "AKU-Befunde interpretieren" section
- Linked from supporting article 2: In FAQ "Was bedeuten Befunde für den Preis?"

**User Journey Position**: Post-AKU results phase → helps buyers translate medical findings into price adjustments for negotiation

**Complexity**: HIGH - Most complex of the 3 tools due to multi-dimensional value impact (finding type × location × discipline × age × severity)

---

### Input Specifications

#### Input Section 1: Befund-Auswahl (Finding Selection)

**Field Type**: Searchable dropdown with 13 common findings

**Options** (matching Supporting Article 3 Befund-Wert-Matrix):
1. `OCD (Osteochondrosis Dissecans)` - Developmental joint condition
2. `Chips (Knochenfragmente)` - Bone fragments in joint
3. `Kissing Spines (sich berührende Dornfortsätze)` - Touching dorsal spinous processes
4. `Hufrollensyndrom (Podotrochlose)` - Navicular disease
5. `Spat (Gelenkarthrose Sprunggelenk)` - Hock arthritis
6. `Sehnenschaden (Fesselträger-Läsion)` - Tendon/ligament damage
7. `Strahlbeinveränderungen` - Navicular bone changes
8. `Arthrose (verschiedene Gelenke)` - Arthritis (various joints)
9. `Knochenanbauten (ohne Gelenkbeteiligung)` - Bone spurs (non-articular)
10. `Gleichbeinlahmheit (degenerativ)` - Sesamoiditis
11. `Hufbeinrotation / Hufrehe-Folgen` - Coffin bone rotation / laminitis sequelae
12. `Halswirbel-Probleme (Wobbler)` - Cervical vertebrae issues
13. `Andere Befunde` - Other findings (custom input)

**Visual Display**:
- Dropdown with search functionality (type to filter)
- Each option shows German name + English/medical term in parentheses
- Icon next to each showing body part affected
- Help tooltip with brief description on hover

**Data Validation**: Required field

**Logic Impact**: Primary driver of value impact calculation

---

#### Input Section 2: Lokalisierung (Finding Location)

**Field Type**: Conditional dropdown (options change based on finding selection)

**Example for OCD:**
- `Fesselgelenk vorne` (Front fetlock)
- `Fesselgelenk hinten` (Hind fetlock)
- `Sprunggelenk` (Hock)
- `Kniegelenk` (Stifle)
- `Schultergelenk` (Shoulder)

**Example for Sehnenschaden:**
- `Vorderbein - Oberflächliche Beugesehne` (Front leg - superficial flexor)
- `Vorderbein - Tiefe Beugesehne` (Front leg - deep flexor)
- `Vorderbein - Fesselträger` (Front leg - suspensory)
- `Hinterbein - Fesselträger` (Hind leg - suspensory)

**Example for Arthrose:**
- `Sprunggelenk` (Hock)
- `Fesselgelenk` (Fetlock)
- `Hufgelenk` (Coffin joint)
- `Kniegelenk` (Stifle)
- `Ellenbogengelenk` (Elbow)

**Visual Display**:
- Dropdown populated dynamically based on finding selection
- Horse anatomy diagram showing selected location (interactive SVG)

**Data Validation**: Required field

**Logic Impact**: Location modifies base value impact (e.g., OCD in hock more severe than in shoulder)

---

#### Input Section 3: Schweregrad (Severity Level)

**Field Type**: Radio buttons with 5 levels (matching Klasse I-V from Supporting Article 3)

**Options**:
- `Klasse I: Keine Befunde` (No findings) - Not selectable if finding selected
- `Klasse II: Geringfügige Befunde` (Minor findings)
  - Description: "Kleine Veränderungen ohne aktuellen Krankheitswert"
- `Klasse III: Mittlere Befunde` (Moderate findings)
  - Description: "Unsichere klinische Bedeutung, Monitoring erforderlich"
- `Klasse IV: Erhebliche Befunde` (Significant findings)
  - Description: "Deutliche Veränderungen mit hohem Krankheitswert"
- `Klasse V: Massive Befunde` (Severe findings)
  - Description: "Schwere Veränderungen, Nutzung stark eingeschränkt"

**Visual Display**:
- Radio cards with colored indicators (green → yellow → orange → red → dark red)
- Each card shows severity class, description, and typical value impact range

**Data Validation**: Required field

**Logic Impact**: Primary severity multiplier for value impact calculation

---

#### Input Section 4: Kaufpreis / Aktueller Wert (Purchase Price / Current Value)

**Field Type**: Numeric input with slider

**Range**: €500 - €100.000
**Default Value**: €15.000
**Step Size**: €500 (< €10k), €1.000 (€10-50k), €5.000 (> €50k)

**Visual Display**:
- Combined slider + numeric input
- Currency formatted (€15.000 with thousand separator)
- Help text: "Der aktuelle Angebotspreis oder von Ihnen ermittelte Marktwert"

**Data Validation**: Required, €500 - €100.000

**Logic Impact**: Base value for calculating absolute price adjustment (% impact × purchase price = €adjustment)

---

#### Input Section 5: Disziplin (Discipline)

**Field Type**: Radio buttons with 7 disciplines

**Options**:
- `Dressur` (Dressage)
- `Springen` (Show jumping)
- `Vielseitigkeit` (Eventing)
- `Western` (Western riding)
- `Distanz` (Endurance)
- `Freizeit` (Leisure)
- `Fahrsport` (Driving)

**Visual Display**: Radio buttons with discipline icons

**Data Validation**: Required field

**Logic Impact**:
- High-stress disciplines (Springen, Vielseitigkeit) → higher value impact for joint/tendon findings
- Low-stress disciplines (Freizeit, Western) → lower value impact
- Example: OCD in hock = -25% for Springen, -15% for Dressur, -10% for Freizeit

---

#### Input Section 6: Alter (Age)

**Field Type**: Numeric input with slider

**Range**: 3 - 25 Jahre
**Default Value**: 8 Jahre
**Step Size**: 1 Jahr

**Visual Display**: Slider with numeric input

**Data Validation**: Required, 3-25 years

**Logic Impact**:
- Young horses (< 6): Developmental findings (OCD, Wobbler) more serious → +20% impact
- Prime age (6-12): Baseline impact
- Senior horses (13-17): Some findings expected, reduced impact → -10% impact
- Very senior (> 17): Findings expected, minimal additional impact → -20% impact

---

#### Input Section 7: Leistungsniveau (Performance Level)

**Field Type**: Radio buttons with 4 levels

**Options**:
- `Anfänger / Einsteiger` (Beginner/Entry)
- `Amateur / Hobby-Turnier (E-A-L)` (Amateur competition)
- `Ambitioniert / höheres Niveau (M-S)` (Advanced/Professional)
- `Hochleistungssport / Spitzensport` (Elite sport)

**Visual Display**: Radio cards with performance level descriptions

**Data Validation**: Required field

**Logic Impact**:
- Higher performance level → higher value impact (soundness more critical)
- Beginner level: -20% impact reduction (lower demands)
- Elite sport: +30% impact increase (zero tolerance for issues)

---

### Calculation Logic & Value Impact Formula

#### Multi-Dimensional Value Impact Calculation

**Step 1: Define Base Value Impact Database**

```javascript
// Base impact percentages for each finding type (at baseline: Klasse III, Prime age 6-12, Amateur level)
const FINDING_BASE_IMPACTS = {
  'OCD': {
    'Fesselgelenk vorne': { klasse_II: 0.05, klasse_III: 0.15, klasse_IV: 0.25 },
    'Fesselgelenk hinten': { klasse_II: 0.05, klasse_III: 0.15, klasse_IV: 0.25 },
    'Sprunggelenk': { klasse_II: 0.10, klasse_III: 0.20, klasse_IV: 0.30 },
    'Kniegelenk': { klasse_II: 0.08, klasse_III: 0.18, klasse_IV: 0.28 },
    'Schultergelenk': { klasse_II: 0.03, klasse_III: 0.12, klasse_IV: 0.22 }
  },
  'Chips': {
    'Fesselgelenk': { klasse_II: 0.03, klasse_III: 0.10, klasse_IV: 0.18 }
  },
  'Kissing Spines': {
    'Rücken': { klasse_II: 0.05, klasse_III: 0.15, klasse_IV: 0.25, klasse_V: 0.40 }
  },
  'Hufrollensyndrom': {
    'Vorderhuf': { klasse_III: 0.25, klasse_IV: 0.35, klasse_V: 0.50 }
  },
  'Spat': {
    'Sprunggelenk': { klasse_II: 0.10, klasse_III: 0.20, klasse_IV: 0.35, klasse_V: 0.50 }
  },
  'Sehnenschaden': {
    'Vorderbein - Oberflächliche Beugesehne': {
      klasse_II: 0.08, klasse_III: 0.15, klasse_IV: 0.35, klasse_V: 0.55
    },
    'Vorderbein - Tiefe Beugesehne': {
      klasse_II: 0.10, klasse_III: 0.18, klasse_IV: 0.40, klasse_V: 0.60
    },
    'Vorderbein - Fesselträger': {
      klasse_II: 0.05, klasse_III: 0.12, klasse_IV: 0.25, klasse_V: 0.45
    },
    'Hinterbein - Fesselträger': {
      klasse_II: 0.04, klasse_III: 0.10, klasse_IV: 0.22, klasse_V: 0.40
    }
  },
  'Strahlbeinveränderungen': {
    'Hufrolle': { klasse_II: 0.03, klasse_III: 0.10, klasse_IV: 0.20 }
  },
  'Arthrose': {
    'Sprunggelenk': { klasse_II: 0.08, klasse_III: 0.15, klasse_IV: 0.35, klasse_V: 0.60 },
    'Fesselgelenk': { klasse_II: 0.10, klasse_III: 0.18, klasse_IV: 0.40, klasse_V: 0.65 },
    'Hufgelenk': { klasse_II: 0.12, klasse_III: 0.22, klasse_IV: 0.45, klasse_V: 0.70 },
    'Kniegelenk': { klasse_II: 0.08, klasse_III: 0.16, klasse_IV: 0.35, klasse_V: 0.60 }
  },
  'Knochenanbauten': {
    'Außerhalb Gelenk': { klasse_II: 0.02, klasse_III: 0.05, klasse_IV: 0.12 }
  },
  'Gleichbeinlahmheit': {
    'Gleichbein': { klasse_III: 0.20, klasse_IV: 0.35, klasse_V: 0.55 }
  },
  'Hufbeinrotation': {
    'Huf': { klasse_III: 0.30, klasse_IV: 0.50, klasse_V: 0.75 }
  },
  'Halswirbel-Probleme': {
    'Halswirbelsäule': { klasse_III: 0.25, klasse_IV: 0.45, klasse_V: 0.70 }
  }
};
```

**Step 2: Apply Discipline Multiplier**

```javascript
const DISCIPLINE_MULTIPLIERS = {
  'Dressur': {
    'Sprunggelenk': 1.0,    // Moderate hock stress
    'Rücken': 1.3,          // High back stress
    'Fesselgelenk': 0.9,    // Lower fetlock stress than jumping
    'Sehnen': 0.9           // Lower tendon stress than jumping
  },
  'Springen': {
    'Sprunggelenk': 1.4,    // Very high hock stress
    'Rücken': 1.1,          // Moderate back stress
    'Fesselgelenk': 1.3,    // High fetlock stress from landing
    'Sehnen': 1.3           // High tendon stress from landing
  },
  'Vielseitigkeit': {
    'Sprunggelenk': 1.5,    // Highest hock stress (cross-country)
    'Rücken': 1.2,          // High back stress (varied terrain)
    'Fesselgelenk': 1.4,    // Highest fetlock stress
    'Sehnen': 1.4           // Highest tendon stress
  },
  'Western': {
    'Sprunggelenk': 0.8,    // Lower hock stress
    'Rücken': 0.9,          // Moderate back stress
    'Fesselgelenk': 0.8,    // Lower fetlock stress
    'Sehnen': 0.8           // Lower tendon stress
  },
  'Distanz': {
    'Sprunggelenk': 0.9,    // Moderate hock stress (endurance)
    'Huf': 1.4,             // Very high hoof stress
    'Sehnen': 1.2,          // High cumulative tendon stress
    'Rücken': 0.8           // Lower back stress (no jumping)
  },
  'Freizeit': {
    'Sprunggelenk': 0.7,    // Low hock stress
    'Rücken': 0.7,          // Low back stress
    'Fesselgelenk': 0.7,    // Low fetlock stress
    'Sehnen': 0.7           // Low tendon stress
  },
  'Fahrsport': {
    'Rücken': 1.2,          // High back stress (harness)
    'Sprunggelenk': 0.9,    // Moderate hock stress
    'Atmung': 1.3           // High respiratory demands
  }
};

function getDisciplineMultiplier(finding, location, discipline) {
  // Map finding location to body part category
  const bodyPartCategory = mapLocationToCategory(location);

  // Get multiplier for this discipline + body part
  const multiplier = DISCIPLINE_MULTIPLIERS[discipline]?.[bodyPartCategory] || 1.0;

  return multiplier;
}
```

**Step 3: Apply Age Multiplier**

```javascript
function getAgeMultiplier(finding, age) {
  // Developmental findings (OCD, Wobbler, congenital issues)
  const developmentalFindings = ['OCD', 'Halswirbel-Probleme'];

  // Wear-and-tear findings (Arthrose, Spat, Sehnenschaden)
  const wearFindings = ['Arthrose', 'Spat', 'Sehnenschaden'];

  if (developmentalFindings.includes(finding)) {
    if (age < 6) {
      return 1.2; // Developmental issues in young horses = more serious
    } else if (age > 12) {
      return 0.9; // Less concerning in older horses (already developed)
    }
  }

  if (wearFindings.includes(finding)) {
    if (age < 6) {
      return 1.3; // Early wear = very concerning
    } else if (age >= 6 && age <= 12) {
      return 1.0; // Expected timeline for some wear
    } else if (age > 12 && age <= 17) {
      return 0.9; // Some wear expected in seniors
    } else {
      return 0.8; // Wear expected in very old horses
    }
  }

  // Default: No age adjustment
  return 1.0;
}
```

**Step 4: Apply Performance Level Multiplier**

```javascript
const PERFORMANCE_MULTIPLIERS = {
  'Anfänger / Einsteiger': 0.8,         // Lower demands = lower impact
  'Amateur / Hobby-Turnier': 1.0,       // Baseline
  'Ambitioniert / höheres Niveau': 1.2, // Higher demands = higher impact
  'Hochleistungssport / Spitzensport': 1.4 // Zero tolerance for issues
};

function getPerformanceMultiplier(performanceLevel) {
  return PERFORMANCE_MULTIPLIERS[performanceLevel] || 1.0;
}
```

**Step 5: Calculate Final Value Impact**

```javascript
function calculateValueImpact(inputs) {
  const {
    finding,
    location,
    severity,      // Klasse II-V
    purchasePrice,
    discipline,
    age,
    performanceLevel
  } = inputs;

  // Step 1: Get base impact for this finding + location + severity
  const baseImpact = FINDING_BASE_IMPACTS[finding][location][severity];

  // Step 2: Apply discipline multiplier
  const disciplineMultiplier = getDisciplineMultiplier(finding, location, discipline);

  // Step 3: Apply age multiplier
  const ageMultiplier = getAgeMultiplier(finding, age);

  // Step 4: Apply performance level multiplier
  const performanceMultiplier = getPerformanceMultiplier(performanceLevel);

  // Step 5: Calculate adjusted impact percentage
  let adjustedImpact = baseImpact * disciplineMultiplier * ageMultiplier * performanceMultiplier;

  // Cap at 80% maximum (even worst findings shouldn't reduce value to zero)
  adjustedImpact = Math.min(adjustedImpact, 0.80);

  // Step 6: Calculate absolute price adjustment
  const priceReduction = purchasePrice * adjustedImpact;
  const adjustedPrice = purchasePrice - priceReduction;

  // Step 7: Calculate negotiation ranges (conservative, moderate, aggressive)
  const negotiationRanges = {
    conservative: {
      reductionPercent: adjustedImpact * 0.7,  // Ask for 70% of calculated impact
      priceReduction: priceReduction * 0.7,
      targetPrice: purchasePrice - (priceReduction * 0.7)
    },
    moderate: {
      reductionPercent: adjustedImpact,        // Ask for 100% of calculated impact
      priceReduction: priceReduction,
      targetPrice: adjustedPrice
    },
    aggressive: {
      reductionPercent: adjustedImpact * 1.3,  // Ask for 130% of calculated impact
      priceReduction: priceReduction * 1.3,
      targetPrice: purchasePrice - (priceReduction * 1.3)
    }
  };

  return {
    baseImpact: baseImpact,
    adjustedImpact: adjustedImpact,
    multipliers: {
      discipline: disciplineMultiplier,
      age: ageMultiplier,
      performance: performanceMultiplier
    },
    originalPrice: purchasePrice,
    priceReduction: priceReduction,
    adjustedPrice: adjustedPrice,
    negotiationRanges: negotiationRanges
  };
}
```

---

### Output Specifications

#### Output Format: Comprehensive Value Impact Report

**Layout**: Single-column card with expandable sections

---

#### Output Section 1: Executive Summary (Top, Always Visible)

```
╔══════════════════════════════════════════════════════════════╗
║  BEFUND-WERTANALYSE                                           ║
╠══════════════════════════════════════════════════════════════╣
║  Befund:       OCD (Osteochondrosis Dissecans)               ║
║  Lokalisierung: Sprunggelenk                                 ║
║  Schweregrad:  Klasse III (Mittlere Befunde)                ║
╠══════════════════════════════════════════════════════════════╣
║  Ursprünglicher Preis:     €20.000                           ║
║  Geschätzte Wertminderung: -22% (€4.400)                    ║
║  ────────────────────────────────────────────────────────── ║
║  Fairer Preis nach Befund: €15.600                          ║
╚══════════════════════════════════════════════════════════════╝
```

---

#### Output Section 2: Impact Calculation Breakdown (Expandable)

```
🔍 WIE WURDE DIE WERTMINDERUNG BERECHNET?

Basis-Wertminderung (Klasse III OCD Sprunggelenk): 20%

Anpassungen für Ihre Situation:
├─ Disziplin [Springen]:           +40% (Sprunggelenke hochbelastet)
│  → Neuer Wert: 20% × 1.4 = 28%
│
├─ Alter [7 Jahre]:                 +0% (optimales Alter, keine Anpassung)
│  → Bleibt bei: 28%
│
└─ Leistungsniveau [Turnier L-M]:  -20% (moderate Anforderungen)
   → Finaler Wert: 28% × 0.8 = 22%

Berechnung:
€20.000 (Kaufpreis) × 22% (Wertminderung) = €4.400 Preisanpassung

💡 Erklärung: Bei Springpferden sind gesunde Sprunggelenke essentiell.
   Ein OCD-Befund (Klasse III) erhöht das Risiko für zukünftige
   Lahmheiten deutlich, daher die höhere Wertminderung im Vergleich
   zu Dressur- oder Freizeitpferden.
```

---

#### Output Section 3: Vergleich mit anderen Szenarien (Comparative Context)

```
📊 WERTMINDERUNG IM VERGLEICH

Derselbe Befund (OCD Sprunggelenk Klasse III) bei anderen Disziplinen:

Für Dressurpferd (L-M):
• Wertminderung: -16% (€3.200)
• Angepasster Preis: €16.800
• Begründung: Moderate Sprunggelenkbelastung in Dressur

Für Freizeitpferd:
• Wertminderung: -11% (€2.200)
• Angepasster Preis: €17.800
• Begründung: Geringe Belastung, Befund kann stabil bleiben

Für Ihr Springpferd:
• Wertminderung: -22% (€4.400)
• Angepasster Preis: €15.600
• Begründung: Hohe Sprunggelenkbelastung, erhöhtes Lahmheitsrisiko

⚖️ Interpretation: Die Wertminderung variiert je nach Nutzung erheblich.
   Springpferde mit Sprunggelenkbefunden erleiden 2x höhere Wertminderung
   als Freizeitpferde mit demselben Befund.
```

---

#### Output Section 4: Verhandlungsstrategie (Negotiation Strategy)

```
🎯 IHRE VERHANDLUNGSSTRATEGIE

Basierend auf unserer Analyse empfehlen wir folgende Verhandlungspositionen:

┌─────────────────────────────────────────────────────────────┐
│ KONSERVATIVE STRATEGIE (70% der berechneten Wertminderung) │
├─────────────────────────────────────────────────────────────┤
│ Zielpre