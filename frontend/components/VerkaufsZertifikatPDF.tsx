// frontend/components/VerkaufsZertifikatPDF.tsx
// Premium Wertgutachten PDF - Ausführliche Variante

'use client';

import { Document, Page, Text, View, StyleSheet, Image, Svg, Circle, Path, G } from '@react-pdf/renderer';
import { LOGO_BASE64 } from '@/lib/pdfAssets';

// Typen für die Zertifikat-Daten
export interface ZertifikatData {
  zertifikatNummer: string;
  ausstellungsDatum: string;
  // Pferdedaten
  pferdeName?: string;
  rasse: string;
  alter: string;
  geschlecht: string;
  stockmass?: string;
  ausbildung: string;
  aku?: string;
  haupteignung?: string;
  abstammung?: string;
  // Bewertung
  preisVon: number;
  preisBis: number;
  // Verifikations-URL für QR-Code
  verifikationsUrl?: string;
  // QR-Code als Base64 Data-URL (muss extern generiert werden)
  qrCodeDataUrl?: string;
  // Ausführliche Texte
  bewertungsDetails?: {
    rasseText?: string;
    abstammungText?: string;
    ausbildungText?: string;
    gesundheitText?: string;
    fazit?: string;
  };
}

export type ZertifikatVariante = 'kurz' | 'ausfuehrlich';

// Farben
const COLORS = {
  primary: '#1a365d',
  secondary: '#2d5a3d',
  gold: '#b8860b',
  lightGold: '#d4a853',
  text: '#1a202c',
  textLight: '#4a5568',
  border: '#cbd5e0',
  background: '#f7fafc',
  white: '#ffffff',
  accent: '#276749',
};

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 11,
    fontFamily: 'Times-Roman',
    backgroundColor: COLORS.white,
  },
  outerFrame: {
    margin: 20,
    padding: 3,
    border: `2pt solid ${COLORS.gold}`,
  },
  innerFrame: {
    padding: 25,
    border: `1pt solid ${COLORS.border}`,
  },
  // Kopfzeile mit Logo und Meta-Daten
  kopfzeile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 12,
    borderBottom: `1pt solid ${COLORS.border}`,
  },
  kopfzeileLogo: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    marginLeft: -5,
  },
  kopfzeileMeta: {
    alignItems: 'flex-end',
  },
  kopfzeileMetaRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  kopfzeileMetaLabel: {
    fontSize: 8,
    color: COLORS.textLight,
    marginRight: 5,
  },
  kopfzeileMetaValue: {
    fontSize: 8,
    fontFamily: 'Times-Bold',
    color: COLORS.text,
  },
  // Titel-Bereich zentriert
  titleSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Times-Bold',
    color: COLORS.primary,
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Legacy header styles (für kurze Variante)
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: `1pt solid ${COLORS.border}`,
  },
  logo: {
    width: 150,
    height: 45,
    objectFit: 'contain',
    marginBottom: 12,
  },
  // Pferdename prominent
  pferdeNameContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  pferdeName: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  metaText: {
    fontSize: 9,
    color: COLORS.textLight,
  },
  metaValue: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
    color: COLORS.text,
  },
  introText: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 1.5,
    color: COLORS.text,
    paddingHorizontal: 20,
  },
  dataSection: {
    marginBottom: 15,
  },
  dataSectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: COLORS.primary,
    marginBottom: 10,
    borderBottom: `1pt solid ${COLORS.border}`,
    paddingBottom: 5,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottom: `0.5pt solid ${COLORS.border}`,
  },
  dataLabel: {
    width: '40%',
    fontSize: 10,
    color: COLORS.textLight,
  },
  dataValue: {
    width: '60%',
    fontSize: 10,
    color: COLORS.text,
    fontFamily: 'Times-Bold',
  },
  wertBox: {
    backgroundColor: COLORS.background,
    border: `2pt solid ${COLORS.gold}`,
    borderRadius: 4,
    padding: 20,
    marginVertical: 15,
    alignItems: 'center',
  },
  wertLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 8,
    textAlign: 'center',
  },
  wertValue: {
    fontSize: 28,
    fontFamily: 'Times-Bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 5,
  },
  wertSubtext: {
    fontSize: 9,
    color: COLORS.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Bullet-Points für kurze Variante
  bulletSection: {
    marginTop: 15,
    marginBottom: 10,
  },
  bulletTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 5,
  },
  bulletDot: {
    width: 15,
    fontSize: 10,
    color: COLORS.gold,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.4,
  },
  bulletLabel: {
    fontFamily: 'Times-Bold',
  },
  // Detail-Sektionen
  detailSection: {
    marginTop: 12,
    marginBottom: 8,
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 3,
    borderLeft: `3pt solid ${COLORS.gold}`,
  },
  detailTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: COLORS.primary,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 9,
    color: COLORS.text,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  // Siegel
  sealContainer: {
    position: 'absolute',
    right: 50,
    bottom: 100,
    alignItems: 'center',
  },
  // QR-Code Bereich
  qrSection: {
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 10,
    borderTop: `0.5pt solid ${COLORS.border}`,
  },
  qrLabel: {
    fontSize: 8,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  qrUrl: {
    fontSize: 7,
    color: COLORS.primary,
    marginTop: 4,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 45,
    right: 45,
  },
  disclaimer: {
    fontSize: 7,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 1.4,
    marginBottom: 8,
    paddingTop: 8,
    borderTop: `0.5pt solid ${COLORS.border}`,
  },
  footerBrand: {
    fontSize: 8,
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: 'Times-Bold',
  },
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  // Page 2 styles
  page2Header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: `1pt solid ${COLORS.border}`,
  },
  page2Title: {
    fontSize: 16,
    fontFamily: 'Times-Bold',
    color: COLORS.primary,
  },
  page2Subtitle: {
    fontSize: 9,
    color: COLORS.textLight,
    marginTop: 3,
  },
});

// Siegel-Komponente
const CertificateSeal = () => (
  <Svg width={65} height={65} viewBox="0 0 100 100">
    <Circle cx={50} cy={50} r={48} fill={COLORS.primary} />
    <Circle cx={50} cy={50} r={44} fill="none" stroke={COLORS.gold} strokeWidth={2} />
    <Circle cx={50} cy={50} r={40} fill="none" stroke={COLORS.gold} strokeWidth={1} />
    <G>
      <Path
        d="M50 20 L56 38 L75 38 L60 50 L66 68 L50 56 L34 68 L40 50 L25 38 L44 38 Z"
        fill={COLORS.gold}
      />
    </G>
  </Svg>
);


// Hilfsfunktion: Preis formatieren
const formatPreis = (preis: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(preis);
};

// Props
interface Props {
  data: ZertifikatData;
  variante?: ZertifikatVariante;
}

// ============================================
// VARIANTE B: KURZ (1 Seite mit Bullet-Points)
// ============================================
const VarianteKurz: React.FC<{ data: ZertifikatData }> = ({ data }) => {
  const {
    zertifikatNummer,
    ausstellungsDatum,
    pferdeName,
    rasse,
    alter,
    geschlecht,
    stockmass,
    ausbildung,
    aku,
    haupteignung,
    abstammung,
    preisVon,
    preisBis,
  } = data;

  const pferdeInfoLinks = [
    { label: 'Rasse', value: rasse },
    { label: 'Alter', value: `${alter} Jahre` },
    { label: 'Geschlecht', value: geschlecht },
    ...(stockmass ? [{ label: 'Stockmaß', value: `${stockmass} cm` }] : []),
  ];

  const pferdeInfoRechts = [
    { label: 'Ausbildung', value: ausbildung },
    ...(aku ? [{ label: 'AKU-Status', value: aku }] : []),
    ...(haupteignung ? [{ label: 'Eignung', value: haupteignung }] : []),
  ];

  const wertfaktoren = [
    { label: 'Rasse', text: `${rasse} – etablierte Warmblutrasse mit hoher Marktakzeptanz` },
    ...(abstammung ? [{ label: 'Abstammung', text: abstammung }] : []),
    { label: 'Ausbildung', text: `${ausbildung} – solider Ausbildungsstand mit Entwicklungspotenzial` },
    ...(aku ? [{ label: 'Gesundheit', text: `AKU ${aku} – positiver Gesundheitsstatus` }] : []),
  ];

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.outerFrame}>
        <View style={styles.innerFrame}>
          {/* Kopfzeile: Logo links, Meta rechts */}
          <View style={styles.kopfzeile}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              src={LOGO_BASE64}
              style={styles.kopfzeileLogo}
            />
            <View style={styles.kopfzeileMeta}>
              <View style={styles.kopfzeileMetaRow}>
                <Text style={styles.kopfzeileMetaLabel}>Zertifikat-Nr.:</Text>
                <Text style={styles.kopfzeileMetaValue}>{zertifikatNummer}</Text>
              </View>
              <View style={styles.kopfzeileMetaRow}>
                <Text style={styles.kopfzeileMetaLabel}>Ausgestellt am:</Text>
                <Text style={styles.kopfzeileMetaValue}>{ausstellungsDatum}</Text>
              </View>
            </View>
          </View>

          {/* Titel zentriert */}
          <View style={styles.titleSection}>
            <Text style={styles.headerTitle}>VERKAUFS-ZERTIFIKAT</Text>
            <Text style={styles.headerSubtitle}>KI-gestützte Marktwertermittlung von PferdeWert</Text>
          </View>

          {/* Pferdename prominent */}
          {pferdeName && (
            <View style={styles.pferdeNameContainer}>
              <Text style={styles.pferdeName}>{pferdeName}</Text>
            </View>
          )}

          {/* Pferdedaten */}
          <View style={styles.dataSection}>
            <Text style={styles.dataSectionTitle}>Pferdedaten</Text>
            <View style={styles.twoColumnContainer}>
              <View style={styles.column}>
                {pferdeInfoLinks.map((item, idx) => (
                  <View key={idx} style={styles.dataRow}>
                    <Text style={styles.dataLabel}>{item.label}</Text>
                    <Text style={styles.dataValue}>{item.value}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.column}>
                {pferdeInfoRechts.map((item, idx) => (
                  <View key={idx} style={styles.dataRow}>
                    <Text style={styles.dataLabel}>{item.label}</Text>
                    <Text style={styles.dataValue}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Wert-Box */}
          <View style={styles.wertBox}>
            <Text style={styles.wertLabel}>Ermittelter Marktwert</Text>
            <Text style={styles.wertValue}>
              {formatPreis(preisVon)} – {formatPreis(preisBis)}
            </Text>
            <Text style={styles.wertSubtext}>
              basierend auf aktuellen Marktdaten (Stand: {ausstellungsDatum})
            </Text>
          </View>

          {/* Wertfaktoren */}
          <View style={styles.bulletSection}>
            <Text style={styles.bulletTitle}>Wertbestimmende Faktoren</Text>
            {wertfaktoren.map((item, idx) => (
              <View key={idx} style={styles.bulletItem}>
                <Text style={styles.bulletDot}>✓</Text>
                <Text style={styles.bulletText}>
                  <Text style={styles.bulletLabel}>{item.label}: </Text>
                  {item.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Siegel */}
          <View style={styles.sealContainer}>
            <CertificateSeal />
            <Text style={{ fontSize: 7, color: COLORS.textLight, marginTop: 3 }}>VERIFIZIERT</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.disclaimer}>
          Dieses Dokument stellt eine KI-gestützte Werteinschätzung dar und ersetzt keine veterinärmedizinische
          Untersuchung oder ein Gutachten durch einen öffentlich bestellten Sachverständigen.
          PferdeWert übernimmt keine Haftung für die Richtigkeit der Bewertung.
        </Text>
        <Text style={styles.footerBrand}>
          PferdeWert – Ihr Partner für faire Pferdebewertungen
        </Text>
      </View>
    </Page>
  );
};

// ============================================
// VARIANTE C: AUSFÜHRLICH (2 Seiten)
// ============================================
const VarianteAusfuehrlich: React.FC<{ data: ZertifikatData }> = ({ data }) => {
  const {
    zertifikatNummer,
    ausstellungsDatum,
    pferdeName,
    rasse,
    alter,
    geschlecht,
    stockmass,
    ausbildung,
    aku,
    haupteignung,
    preisVon,
    preisBis,
    verifikationsUrl,
    qrCodeDataUrl,
    bewertungsDetails,
  } = data;

  const pferdeInfoLinks = [
    { label: 'Rasse', value: rasse },
    { label: 'Alter', value: `${alter} Jahre` },
    { label: 'Geschlecht', value: geschlecht },
    ...(stockmass ? [{ label: 'Stockmaß', value: `${stockmass} cm` }] : []),
  ];

  const pferdeInfoRechts = [
    { label: 'Ausbildung', value: ausbildung },
    ...(aku ? [{ label: 'AKU-Status', value: aku }] : []),
    ...(haupteignung ? [{ label: 'Eignung', value: haupteignung }] : []),
  ];

  // Default Texte falls nicht übergeben
  const details = bewertungsDetails || {
    rasseText: `${rasse} sind eine der führenden Warmblutrassen im deutschen Pferdesport. Die Zuchtrichtung garantiert Rittigkeit, Leistungsbereitschaft und ein ausgeglichenes Temperament. Dies rechtfertigt einen Preisaufschlag von etwa 15-20% gegenüber weniger etablierten Rassen.`,
    abstammungText: `Die Abstammung des Pferdes trägt wesentlich zum Marktwert bei. Nachkommen bekannter Vererber erzielen regelmäßig höhere Preise am Markt.`,
    ausbildungText: `Der Ausbildungsstand auf ${ausbildung}-Niveau ist solide und bietet Potenzial für weitere Entwicklung. Dies stabilisiert den Marktwert und macht das Pferd für eine breite Käuferschicht attraktiv.`,
    gesundheitText: aku ? `Der AKU-Befund "${aku}" ist ein positiver Faktor, der das Vertrauen potenzieller Käufer stärkt und den Wert unterstützt.` : 'Ein aktueller AKU-Befund liegt nicht vor.',
    fazit: `Das Pferd bietet ein ausgewogenes Preis-Leistungs-Verhältnis. Der ermittelte Marktwert spiegelt die Kombination aus Rasse, Ausbildung und Gesundheitszustand wider.`,
  };

  const verifyUrl = verifikationsUrl || `https://pferdewert.de/verify/${zertifikatNummer}`;

  return (
    <>
      {/* SEITE 1: Übersicht */}
      <Page size="A4" style={styles.page}>
        <View style={styles.outerFrame}>
          <View style={styles.innerFrame}>
            {/* Kopfzeile: Logo links, Meta rechts */}
            <View style={styles.kopfzeile}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                src={LOGO_BASE64}
                style={styles.kopfzeileLogo}
              />
              <View style={styles.kopfzeileMeta}>
                <View style={styles.kopfzeileMetaRow}>
                  <Text style={styles.kopfzeileMetaLabel}>Gutachten-Nr.:</Text>
                  <Text style={styles.kopfzeileMetaValue}>{zertifikatNummer}</Text>
                </View>
                <View style={styles.kopfzeileMetaRow}>
                  <Text style={styles.kopfzeileMetaLabel}>Ausgestellt am:</Text>
                  <Text style={styles.kopfzeileMetaValue}>{ausstellungsDatum}</Text>
                </View>
              </View>
            </View>

            {/* Titel zentriert */}
            <View style={styles.titleSection}>
              <Text style={styles.headerTitle}>WERTGUTACHTEN</Text>
              <Text style={styles.headerSubtitle}>Ausführliche KI-gestützte Marktwertanalyse von PferdeWert</Text>
            </View>

            {/* Pferdename prominent und fett */}
            {pferdeName && (
              <View style={styles.pferdeNameContainer}>
                <Text style={styles.pferdeName}>{pferdeName}</Text>
              </View>
            )}

            {/* Pferdedaten */}
            <View style={styles.dataSection}>
              <Text style={styles.dataSectionTitle}>Pferdedaten</Text>
              <View style={styles.twoColumnContainer}>
                <View style={styles.column}>
                  {pferdeInfoLinks.map((item, idx) => (
                    <View key={idx} style={styles.dataRow}>
                      <Text style={styles.dataLabel}>{item.label}</Text>
                      <Text style={styles.dataValue}>{item.value}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.column}>
                  {pferdeInfoRechts.map((item, idx) => (
                    <View key={idx} style={styles.dataRow}>
                      <Text style={styles.dataLabel}>{item.label}</Text>
                      <Text style={styles.dataValue}>{item.value}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Wert-Box */}
            <View style={styles.wertBox}>
              <Text style={styles.wertLabel}>Ermittelter Marktwert</Text>
              <Text style={styles.wertValue}>
                {formatPreis(preisVon)} – {formatPreis(preisBis)}
              </Text>
              <Text style={styles.wertSubtext}>
                Detaillierte Begründung auf Seite 2
              </Text>
            </View>

            {/* Kurzzusammenfassung */}
            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Zusammenfassung</Text>
              <Text style={styles.detailText}>{details.fazit}</Text>
            </View>

            {/* Siegel */}
            <View style={styles.sealContainer}>
              <CertificateSeal />
              <Text style={{ fontSize: 7, color: COLORS.textLight, marginTop: 3 }}>VERIFIZIERT</Text>
            </View>
          </View>
        </View>

        {/* Footer Seite 1 */}
        <View style={styles.footer}>
          <Text style={{ fontSize: 9, color: COLORS.textLight, textAlign: 'center' }}>
            Seite 1 von 2 · Fortsetzung auf der nächsten Seite
          </Text>
        </View>
      </Page>

      {/* SEITE 2: Detaillierte Begründung */}
      <Page size="A4" style={[styles.page, { padding: 40 }]}>
        {/* Kopfzeile Seite 2: Logo links, Meta rechts */}
        <View style={[styles.kopfzeile, { marginBottom: 20 }]}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            src={LOGO_BASE64}
            style={styles.kopfzeileLogo}
          />
          <View style={styles.kopfzeileMeta}>
            <View style={styles.kopfzeileMetaRow}>
              <Text style={styles.kopfzeileMetaLabel}>Gutachten-Nr.:</Text>
              <Text style={styles.kopfzeileMetaValue}>{zertifikatNummer}</Text>
            </View>
            <View style={styles.kopfzeileMetaRow}>
              <Text style={styles.kopfzeileMetaLabel}>Seite:</Text>
              <Text style={styles.kopfzeileMetaValue}>2 von 2</Text>
            </View>
          </View>
        </View>

        <View style={styles.page2Header}>
          <Text style={styles.page2Title}>Detaillierte Wertbegründung</Text>
          <Text style={styles.page2Subtitle}>
            {pferdeName || rasse}
          </Text>
        </View>

        {/* Rasse */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Rasse & Zucht</Text>
          <Text style={styles.detailText}>{details.rasseText}</Text>
        </View>

        {/* Abstammung */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Abstammung</Text>
          <Text style={styles.detailText}>{details.abstammungText}</Text>
        </View>

        {/* Ausbildung */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Ausbildungsstand</Text>
          <Text style={styles.detailText}>{details.ausbildungText}</Text>
        </View>

        {/* Gesundheit */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Gesundheit & AKU</Text>
          <Text style={styles.detailText}>{details.gesundheitText}</Text>
        </View>

        {/* QR-Code Bereich */}
        <View style={styles.qrSection}>
          <Text style={styles.qrLabel}>Gutachten online verifizieren:</Text>
          {qrCodeDataUrl && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={qrCodeDataUrl} style={{ width: 70, height: 70 }} />
          )}
          <Text style={styles.qrUrl}>{verifyUrl}</Text>
        </View>

        {/* Footer Seite 2 */}
        <View style={[styles.footer, { bottom: 25 }]}>
          <Text style={styles.disclaimer}>
            Dieses Wertgutachten stellt eine KI-gestützte Werteinschätzung dar und ersetzt keine veterinärmedizinische
            Untersuchung oder ein Gutachten durch einen öffentlich bestellten und vereidigten Sachverständigen.
            Die Bewertung basiert auf den bereitgestellten Angaben und wurde automatisiert erstellt.
            PferdeWert übernimmt keine Haftung für die Richtigkeit der Bewertung.
          </Text>
          <Text style={styles.footerBrand}>
            PferdeWert – Ihr Partner für faire Pferdebewertungen
          </Text>
        </View>
      </Page>
    </>
  );
};

// ============================================
// HAUPTKOMPONENTE
// ============================================
const VerkaufsZertifikatPDF: React.FC<Props> = ({ data, variante = 'kurz' }) => {
  return (
    <Document title={`PferdeWert ${variante === 'kurz' ? 'Verkaufs-Zertifikat' : 'Wertgutachten'} ${data.zertifikatNummer}`}>
      {variante === 'kurz' ? (
        <VarianteKurz data={data} />
      ) : (
        <VarianteAusfuehrlich data={data} />
      )}
    </Document>
  );
};

export default VerkaufsZertifikatPDF;
