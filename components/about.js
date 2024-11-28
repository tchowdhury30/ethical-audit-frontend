import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function About() {
  return (
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Scan Your Values,
          </Text>
          <Text style={[styles.header, styles.subHeaderSpacing]}>
            Shop Your Conscience.
          </Text>
          <Text style={styles.subHeader}>
            <Text style={styles.highlight1}>Ethical Audit</Text> empowers you to make <Text style={styles.highlight2}>informed</Text> and <Text style={styles.highlight2}>ethical</Text> purchasing decisions. Our mission is to help you align your <Text style={styles.highlight2}>shopping habits</Text> with your <Text style={styles.highlight2}>values</Text>, ensuring that every product you buy supports a <Text style={styles.highlight1}>better world.</Text>
          </Text>
          <View style={styles.cover}>
            <Text style={styles.miniHeader}>
              How it Works
            </Text>
            <Text style={styles.content}>
              With Ethical Audit, making ethical choices is as easy as scanning a product's barcode. Our comprehensive database evaluates products based on six crucial criteria:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber}>1. Climate & Sustainability:</Text> We evaluate the environmental impact of the product, from production to disposal, and ensure it meets high sustainability standards.
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber}>2. Livable Wage:</Text> We verify that workers involved in the production of the product receive fair wages that meet their basic needs and more.
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber}>3. Child Labour:</Text> We assess whether the product is free from child labor in its supply chain, ensuring that no children are exploited in its production.
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber}>4. Human Rights Violations:</Text> We check for any involvement in human rights abuses, ensuring that the product is produced under fair and humane conditions.
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber}>5. Animal Cruelty:</Text> We ensure that no animals are harmed in the making of the product, adhering to strict animal welfare standards.
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber}>6. Diversity, Equity, and Inclusion:</Text> We assess the company’s commitment to DEI, ensuring that they foster inclusive and equitable workplaces.
              </Text>
            </View>
          </View>
          <View style={styles.coverBottom}>
            <Text style={styles.miniHeader}>
              Why Choose Ethical Audit?
            </Text>
            <Text style={styles.content}>
              Ethical Audit is designed for conscious consumers who want to make a positive impact with their purchases. By using our app, you can:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber}>1. Shop Confidently:</Text> Know that your purchases align with your values and support ethical practices.
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber}>2. Support Change:</Text> Encourage companies to adopt better practices by choosing products that meet high ethical standards.
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber}>3. Stay Informed:</Text> Access up-to-date information on product ethics, empowering you to make better choices.
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.listItemNumber2}>Join us in creating a more ethical world, one scan at a time.</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContentContainer: {
    marginTop: 50,
    flexGrow: 1,
    marginBottom: 100,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  subHeader: {
    marginTop: 45,
    fontSize: 16,
    marginVertical: 8,
  },
  subHeaderSpacing: {
    marginTop: 10,
  },
  cover: {
    marginTop: 45,
    padding: 20,
    backgroundColor: 'rgba(122, 0, 230, 0.05)',
    borderRadius: 20,
    marginVertical: 10,
  },
  coverBottom: {
    marginTop: 45,
    padding: 20,
    backgroundColor: 'rgba(122, 0, 230, 0.05)',
    borderRadius: 20,
    marginVertical: 10,
    marginBottom: 80,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7A00E6',
    marginVertical: 16,
  },
  highlight1: {
    color: '#7A00E6',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  highlight2: {
    color: 'black',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },
  miniHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7A00E6',
    marginBottom: 20,
  },
  list: {
    marginVertical: 16,
  },
  listItem: {
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
  },
  listItemNumber: {
    fontWeight: 'bold',
    color: '#7A00E6',
  },
  listItemNumber2: {
    marginTop: 30,
    color: '#7A00E6',
  },
});

export default About;
