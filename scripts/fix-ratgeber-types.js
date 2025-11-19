#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend/pages/pferde-ratgeber/was-kostet-ein-pferd.tsx');
console.log(`Reading ${filePath}...`);

let content = fs.readFileSync(filePath, 'utf8');

// Fix 1: Line 466 - Convert content/type props to children (Preisspanne erklärt)
const regex1 = /<RatgeberHighlightBox\s+title="Preisspanne erklärt"\s+content="Die Preise variieren basierend auf Abstammung, Ausbildungsstand, Erfolgen, Gesundheitszustand und individuellen Anlagen\. Premium-Blutlinien oder besondere Erfolge können Preise deutlich erhöhen\."\s+type="info"\s*\/>/;
const replacement1 = `<RatgeberHighlightBox title="Preisspanne erklärt">
              <p>Die Preise variieren basierend auf Abstammung, Ausbildungsstand, Erfolgen, Gesundheitszustand und individuellen Anlagen. Premium-Blutlinien oder besondere Erfolge können Preise deutlich erhöhen.</p>
            </RatgeberHighlightBox>`;

// Fix 2: Line 647 - Convert content/type props to children (Wichtig beim Pferdekauf)
const regex2 = /<RatgeberHighlightBox\s+title="Wichtig beim Pferdekauf"\s+content="Der Pferd Preis allein sagt nichts über die Gesamtkosten aus\. Bedenken Sie immer die laufenden monatlichen Kosten \(300-800€\), Versicherungen, Tierarzt und unvorhersehbare Ausgaben\. Ein günstiges Pferd kann durch hohe Folgekosten teurer werden als ein gut ausgebildetes, gesundes Pferd mit höherem Kaufpreis\."\s+type="warning"\s*\/>/;
const replacement2 = `<RatgeberHighlightBox title="Wichtig beim Pferdekauf">
              <p>Der Pferd Preis allein sagt nichts über die Gesamtkosten aus. Bedenken Sie immer die laufenden monatlichen Kosten (300-800€), Versicherungen, Tierarzt und unvorhersehbare Ausgaben. Ein günstiges Pferd kann durch hohe Folgekosten teurer werden als ein gut ausgebildetes, gesundes Pferd mit höherem Kaufpreis.</p>
            </RatgeberHighlightBox>`;

// Fix 3: Line 719 - Convert content/type props to children (Realistische Budgetplanung)
const regex3 = /<RatgeberHighlightBox\s+title="Realistische Budgetplanung"\s+content="Die durchschnittlichen monatlichen Pferd Kosten liegen bei 580€ - 880€\. Budget immer nach oben planen: Unvorhergesehene Tierarztkosten, Zusatzfutter im Winter oder Notfall-Hufbeschlag können das Budget schnell erhöhen\. Eine Rücklage von mindestens 2\.000€ für Notfälle ist empfehlenswert\."\s+type="warning"\s*\/>/;
const replacement3 = `<RatgeberHighlightBox title="Realistische Budgetplanung">
                <p>Die durchschnittlichen monatlichen Pferd Kosten liegen bei 580€ - 880€. Budget immer nach oben planen: Unvorhergesehene Tierarztkosten, Zusatzfutter im Winter oder Notfall-Hufbeschlag können das Budget schnell erhöhen. Eine Rücklage von mindestens 2.000€ für Notfälle ist empfehlenswert.</p>
              </RatgeberHighlightBox>`;

// Apply fixes
let fixCount = 0;
if (regex1.test(content)) {
  content = content.replace(regex1, replacement1);
  console.log('✅ Fixed error at line 466 (Preisspanne erklärt)');
  fixCount++;
} else {
  console.log('⚠️  Pattern 1 not found (line 466)');
}

if (regex2.test(content)) {
  content = content.replace(regex2, replacement2);
  console.log('✅ Fixed error at line 647 (Wichtig beim Pferdekauf)');
  fixCount++;
} else {
  console.log('⚠️  Pattern 2 not found (line 647)');
}

if (regex3.test(content)) {
  content = content.replace(regex3, replacement3);
  console.log('✅ Fixed error at line 719 (Realistische Budgetplanung)');
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
