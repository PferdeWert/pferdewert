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
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Times-Bold',
    width: '35%',
  },
  value: {
    width: '65%',
  },
  paragraph: {
    marginBottom: 14,
  },
  bullet: {
    marginLeft: 12,
    marginBottom: 10,
  },
  bulletLabel: {
    flexDirection: 'row',
    marginLeft: 12,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  bulletLabelText: {
    fontFamily: 'Times-Bold',
    marginRight: 4,
    flexShrink: 0,
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
    .replace(/[ /]/g, ' ') // geschütztes Leerzeichen & Slash entfernen
    .split('\n')
    .filter(line => line.trim() !== '');

  const content: JSX.Element[] = [];
  let currentBlock: JSX.Element[] = [];
  let wrapCurrentBlock = true;

  const flushBlock = () => {
    if (currentBlock.length) {
      content.push(
        <View wrap={wrapCurrentBlock} key={`block-${content.length}`}>{currentBlock}</View>
      );
      currentBlock = [];
    }
  };

  lines.forEach((line, idx) => {
    if (line.startsWith('###')) {
      flushBlock();
      const heading = line.replace('###', '').trim();
      wrapCurrentBlock = !heading.toLowerCase().includes('fazit');
      content.push(<Text key={idx} style={styles.heading}>{heading}</Text>);
    } else {
      if (/^\*\*.*?\*\*:/.test(line)) {
        const [label, value] = line.replace(/\*\*/g, '').split(':');
        currentBlock.push(
          <View key={idx} style={styles.labelBlock} wrap={false}>
            <Text style={styles.label}>{label.trim()}:</Text>
            <Text style={styles.value}>{value.trim()}</Text>
          </View>
        );
      } else if (/€/.test(line) && /^\*\*.+\*\*$/.test(line)) {
        currentBlock.push(
          <Text key={idx} style={{ fontFamily: 'Times-Bold' }}>{line.replace(/\*\*/g, '').trim()}</Text>
        );
      } else if (/^\*\*(.+)\*\*$/.test(line)) {
        currentBlock.push(
          <Text key={idx} style={{ fontFamily: 'Times-Bold' }}>{line.replace(/\*\*/g, '').trim()}</Text>
        );
      } else if (/^- \*\*(.*?)\*\*:/.test(line)) {
        const match = line.match(/^- \*\*(.*?)\*\*: (.+)/);
        if (match) {
          const [, label, value] = match;
          currentBlock.push(
            <View key={idx} style={styles.bulletLabel} wrap={false}>
              <Text style={styles.bulletLabelText}>• {label.trim()}:</Text>
              <Text style={styles.bulletValueText}>{value.trim()}</Text>
            </View>
          );
        }
      } else if (line.startsWith('-')) {
        currentBlock.push(<Text key={idx} style={styles.bullet}>{line}</Text>);
      } else {
        currentBlock.push(<Text key={idx} style={styles.paragraph}>{line}</Text>);
      }
    }
  });

  flushBlock();

  return (
    <Document title="PferdeWert-Analyse">
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} fixed>
          <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`} style={styles.logo} />
          <Text style={styles.title}>PferdeWert-Analyse</Text>
        </View>
        <Text style={styles.date}>Stand: {today}</Text>
        {content}
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
