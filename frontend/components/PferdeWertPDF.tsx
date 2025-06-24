// Datei: frontend/components/PferdeWertPDF.tsx

'use client';

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

type Props = {
  markdownData: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: 'Times-Roman',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 30,
    objectFit: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  labelBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  label: {
    fontFamily: 'Times-Bold',
    width: '35%',
  },
  value: {
    width: '65%',
  },
  paragraph: {
    marginBottom: 12,
  },
  bullet: {
    marginLeft: 12,
    marginBottom: 6,
  },
  bulletLabel: {
    flexDirection: 'row',
    marginLeft: 12,
    marginBottom: 6,
  },
  bulletLabelText: {
    fontFamily: 'Times-Bold',
    marginRight: 4,
  },
  bulletValueText: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    fontSize: 9,
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 20,
    right: 40,
    textAlign: 'right',
    color: 'grey',
  },
});

const PferdeWertPDF: React.FC<Props> = ({ markdownData }) => {
  const today = new Date().toLocaleDateString('de-DE');
  const lines = markdownData
    .replace(/\u202F/g, ' ') // NBSP entfernen
    .split('\n')
    .filter(line => line.trim() !== '');

  const renderContent = () => {
    return lines.map((line, idx) => {
      if (line.startsWith('###')) {
        return <Text key={idx} style={styles.heading}>{line.replace('###', '').trim()}</Text>;
      } else if (/^\*\*.*?\*\*:/.test(line)) {
        const [label, value] = line.replace(/\*\*/g, '').split(':');
        return (
          <View key={idx} style={styles.labelBlock}>
            <Text style={styles.label}>{label.trim()}:</Text>
            <Text style={styles.value}>{value.trim()}</Text>
          </View>
        );
      } else if (line.includes('€') && /^\*\*.+\*\*$/.test(line)) {
        return <Text key={idx} style={{ fontFamily: 'Times-Bold' }}>{line.replace(/\*\*/g, '').trim()}</Text>;
      } else if (/^\*\*(.+)\*\*$/.test(line)) {
        return <Text key={idx} style={{ fontFamily: 'Times-Bold' }}>{line.replace(/\*\*/g, '').trim()}</Text>;
      } else if (/^- \*\*(.*?)\*\*:/.test(line)) {
        const match = line.match(/^- \*\*(.*?)\*\*: (.+)/);
        if (match) {
          const [, label, value] = match;
          return (
            <View key={idx} style={styles.bulletLabel}>
              <Text style={styles.bulletLabelText}>• {label.trim()}:</Text>
              <Text style={styles.bulletValueText}>{value.trim()}</Text>
            </View>
          );
        }
      } else if (line.startsWith('-')) {
        return <Text key={idx} style={styles.bullet}>{line}</Text>;
      } else {
        return <Text key={idx} style={styles.paragraph}>{line}</Text>;
      }
    });
  };

  return (
    <Document title="PferdeWert-Analyse">
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} fixed>
          <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`} style={styles.logo} />
          <Text style={styles.title}>PferdeWert-Analyse</Text>
        </View>
        <Text style={styles.date}>Stand: {today}</Text>
        {renderContent()}
        <Text style={styles.footer} fixed>
          © Erstellt durch PferdeWert AI von www.pferdewert.de – dies ist keine verbindliche Wertermittlung.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};

export default PferdeWertPDF;
