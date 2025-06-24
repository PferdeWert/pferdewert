import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: 'Times-Roman',
    position: 'relative'
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 30,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  labelBlock: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontFamily: 'Helvetica-Bold',
    width: '30%',
  },
  value: {
    width: '70%',
  },
  paragraph: {
    marginBottom: 10,
  },
  bullet: {
    marginLeft: 12,
    marginBottom: 6,
  },
  disclaimer: {
    marginTop: 40,
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 20,
    right: 40,
    textAlign: 'right',
    color: 'grey'
  }
});

const PferdeWertPDF = ({ markdownData }: { markdownData: string }) => {
  const lines = markdownData.split('\n');

  const renderContent = () => {
    return lines.map((line, idx) => {
      if (line.startsWith('###')) {
        return <Text key={idx} style={styles.heading}>{line.replace('###', '').trim()}</Text>;
      } else if (/\*\*.*\*\*:/.test(line)) {
        const [label, value] = line.replace(/\*\*/g, '').split(':');
        return (
          <View key={idx} style={styles.labelBlock}>
            <Text style={styles.label}>{label.trim()}:</Text>
            <Text style={styles.value}>{value.trim()}</Text>
          </View>
        );
      } else if (/\*\*.*\*\*/.test(line)) {
        return <Text key={idx} style={{ fontFamily: 'Helvetica-Bold' }}>{line.replace(/\*\*/g, '').replace('/€', '€')}</Text>;
      } else if (line.startsWith('-')) {
        return <Text key={idx} style={styles.bullet}>{line}</Text>;
      } else {
        return <Text key={idx} style={styles.paragraph}>{line}</Text>;
      }
    });
  };

  return (
    <Document title="PferdeWert-Analyse">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.logo} />
          <Text style={styles.title}>PferdeWert-Analyse</Text>
        </View>
        {renderContent()}
        <Text style={styles.disclaimer}>
          Erstellt durch PferdeWert AI von www.pferdewert.de – dies ist keine verbindliche Wertermittlung.
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
