// Datei: frontend/components/PferdeWertPDF.tsx

'use client';

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { ReactNode } from 'react';

type Props = {
  markdownData: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 13, // leicht erhöht
    lineHeight: 1.6,
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
    fontSize: 22,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 18,
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
  bullet: {
    marginLeft: 0,
    marginBottom: 10,
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
  italic: {
    fontStyle: 'italic',
  },
});

const PferdeWertPDF: React.FC<Props> = ({ markdownData }) => {
  const today = new Date().toLocaleDateString('de-DE');
  const lines: string[] = markdownData
    .replace(/[ /]/g, ' ')
    .split('\n')
    .filter((line: string) => line.trim() !== '');

  const content: ReactNode[] = lines.map((line, idx) => {
    const trimmed = line.trim().toLowerCase();
    const isFazit = trimmed === 'fazit';

    if (line.startsWith('###')) {
      return <Text key={idx} style={[styles.paragraph, styles.bold]}>{line.replace('###', '').trim()}</Text>;
    } else if (/^- \*\*(.*?)\*\*:/.test(line)) {
      const match = line.match(/^- \*\*(.*?)\*\*: (.+)/);
      if (match) {
        const [, label, value] = match;
        return <Text key={idx} style={styles.bullet}>• <Text style={styles.bold}>{label.trim()}:</Text> {value.trim()}</Text>;
      }
    } else if (/^\*\*(.*?)\*\*:/.test(line)) {
      const [label, value] = line.replace(/\*\*/g, '').split(':');
      return <Text key={idx} style={styles.paragraph}><Text style={styles.bold}>{label.trim()}:</Text> {value.trim()}</Text>;
    } else if (/^\*\*(.+)\*\*$/.test(line)) {
      return <Text key={idx} style={[styles.paragraph, styles.bold]}>{line.replace(/\*\*/g, '').trim()}</Text>;
    } else if (isFazit) {
      return <Text key={idx} style={[styles.paragraph, styles.bold, styles.italic]}>{line}</Text>;
    } else {
      return <Text key={idx} style={styles.paragraph}>{line}</Text>;
    }
  });

  return (
    <Document title="PferdeWert-Analyse">
      <Page size="A4" style={styles.page} wrap>
      <View style={styles.header} fixed>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
        src={process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png` : '/logo.png'}
        style={styles.logo}
        />
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
