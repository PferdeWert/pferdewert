#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend/pages/pferde-ratgeber/was-kostet-ein-pferd.tsx');
console.log(`Reading ${filePath}...`);

let content = fs.readFileSync(filePath, 'utf8');

// Fix 1: Line 466 - Convert content/type props to children
const old1 = `<RatgeberHighlightBox
              title="Preisspanne erklärt"
              content="Die Preise variieren basierend auf Abstammung, Ausbildungsstand, Erfolgen, Gesundheitszustand und individuellen Anlagen. Premium-Blutlinien oder besondere Erfolge können Preise deutlich erhöhen."
              type="info"
            />`;

const new1 = `<RatgeberHighlightBox title="Preisspanne erklärt">
              <p>Die Preise variieren basierend auf Abstammung, Ausbildungsstand, Erfolgen, Gesundheitszustand und individuellen Anlagen. Premium-Blutlinien oder besondere Erfolge können Preise deutlich erhöhen.</p>
            </RatgeberHighlightBox>`;

// Fix 2: Line 647 - Convert content/type props to children
const old2 = `<RatgeberHighlightBox
              title="Wichtig beim Pferdekauf"
              content="Der Pferd Preis allein sagt nichts über die Gesamtkosten aus. Bedenken Sie immer die laufenden monatlichen Kosten (300-800€), Versicherungen, Tierarzt und unvorhersehbare Ausgaben. Ein günstiges Pferd kann durch hohe Folgekosten teurer werden als ein gut ausgebildetes, gesundes Pferd mit höherem Kaufpreis."
              type="warning"
            />`;

const new2 = `<RatgeberHighlightBox title="Wichtig beim Pferdekauf">
              <p>Der Pferd Preis allein sagt nichts über die Gesamtkosten aus. Bedenken Sie immer die laufenden monatlichen Kosten (300-800€), Versicherungen, Tierarzt und unvorhersehbare Ausgaben. Ein günstiges Pferd kann durch hohe Folgekosten teurer werden als ein gut ausgebildetes, gesundes Pferd mit höherem Kaufpreis.</p>
            </RatgeberHighlightBox>`;

// Fix 3: Line 719 - Convert content/type props to children
const old3 = `<RatgeberHighlightBox
                title="Realistische Budgetplanung"
                content="Die durchschnittlichen monatlichen Pferd Kosten liegen bei 580€ - 880€. Budget immer nach oben planen: Unvorhergesehene Tierarztkosten, Zusatzfutter im Winter oder Notfall-Hufbeschlag können das Budget schnell erhöhen. Eine Rücklage von mindestens 2.000€ für Notfälle ist empfehlenswert."
                type="warning"
              />`;

const new3 = `<RatgeberHighlightBox title="Realistische Budgetplanung">
                <p>Die durchschnittlichen monatlichen Pferd Kosten liegen bei 580€ - 880€. Budget immer nach oben planen: Unvorhergesehene Tierarztkosten, Zusatzfutter im Winter oder Notfall-Hufbeschlag können das Budget schnell erhöhen. Eine Rücklage von mindestens 2.000€ für Notfälle ist empfehlenswert.</p>
              </RatgeberHighlightBox>`;

// Apply fixes
let fixCount = 0;
if (content.includes(old1)) {
  content = content.replace(old1, new1);
  console.log('✅ Fixed error at line 466');
  fixCount++;
} else {
  console.log('⚠️  Pattern 1 not found (line 466)');
}

if (content.includes(old2)) {
  content = content.replace(old2, new2);
  console.log('✅ Fixed error at line 647');
  fixCount++;
} else {
  console.log('⚠️  Pattern 2 not found (line 647)');
}

if (content.includes(old3)) {
  content = content.replace(old3, new3);
  console.log('✅ Fixed error at line 719');
  fixCount++;
} else {
  console.log('⚠️  Pattern 3 not found (line 719)');
}

// Write back
if (fixCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n✅ Applied ${fixCount}/3 fixes to ${filePath}`);
} else {
  console.log('\n❌ No fixes applied - patterns not found');
  process.exit(1);
}
