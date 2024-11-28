import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import useStore from '../services/useStore';

function ProductDetailScreen({ navigation, route }) {
  const { companyName } = route.params;
  const fetchCompanyByName = useStore((state) => state.fetchCompanyByName);
  const company = useStore((state) => state.currentCompany);

  useEffect(() => {
    fetchCompanyByName(companyName);
  }, [companyName]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {(company.logoImage === 'https://media.giphy.com/media/UYBDCJjwOd9Re/giphy.gif' || !company.logoImage) ? (
                <Image
                    style={styles.companyImage}
                    source={require('../assets/images/placeholder.png')}
                    resizeMode="contain"
                />
            ) : (
                <Image
                    style={styles.logo}
                    source={{ uri: company.logoImage }}
                    resizeMode="contain"
                />
        )}
        <Text style={styles.headerText}>{company.companyName}</Text>
        <Text style={styles.rating}>
          Overall Rating:
          {company.overallScore}
        </Text>
      </View>
      <View style={styles.breakdown}>
        <View style={styles.breakdownItems}>
          {company.categorizedScores && Object.keys(company.categorizedScores).map((key) => (
            <View key={key} style={styles.breakdownItem}>
              <Text style={styles.breakdownTitle}>{key.replace(/([A-Z])/g, ' $1').trim()}: {company.categorizedScores[key].score}</Text>
              <Text style={styles.breakdownText}>{company.categorizedScores[key].explanation}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 18,
    color: '#333',
  },
  breakdown: {
    padding: 10,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  breakdownItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
  },
  breakdownItem: {
    marginVertical: 5,
    borderRadius: 8,
    marginBottom: 10
  },
  breakdownText: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    padding: 10,
  },
});

export default ProductDetailScreen;
