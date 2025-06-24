import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: 'Times-Roman',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    textAlign: 'right',
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
      } else if (line.startsWith('-')) {
        return <Text key={idx} style={styles.bullet}>{line}</Text>;
      } else {
        return <Text key={idx} style={styles.paragraph}>{line}</Text>;
      }
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.logo} alt="PferdeWert Logo" />
          <Text style={styles.title}>Pferdebewertung</Text>
        </View>
        {renderContent()}
      </Page>
    </Document>
  );
};

export default PferdeWertPDF;
