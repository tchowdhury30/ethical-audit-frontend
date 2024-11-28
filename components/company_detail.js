import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useStore from '../services/useStore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


function CompanyDetailScreen({ navigation, route }) {
  const { companyName } = route.params;
  const fetchCompanyByName = useStore((state) => state.fetchCompanyByName);
  const company = useStore((state) => state.currentCompany);

  useEffect(() => {
    fetchCompanyByName(companyName);
  }, [companyName]);

  if (!company) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {(company.logoImage === 'https://media.giphy.com/media/UYBDCJjwOd9Re/giphy.gif' || !company.logoImage) ? (
            <Image
                style={styles.logo}
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
      </View>

      {/* company info and rating */}
      <View>
        <View style={styles.titleNrating}>
          <Text style={styles.titleText}>{company.companyName}</Text>
          <View style={styles.ratingBox}>
            <Text style={styles.rating}>Overall Rating: </Text>
            <Text style={styles.ratingScore}>{company.overallScore}</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {company.summary}
        </Text>
      </View>

      {/* breakdown */}
      <View style={styles.breakdown}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, marginBottom: 5}}>
          <Text style={styles.breakdownTitle}>Breakdown</Text>
          <TouchableOpacity style= {{flexDirection: 'row'}} onPress={() => navigation.navigate('ProductDetailScreen', {companyName: company.companyName})}>
            <Text style={styles.readMore}>Read More</Text>
            <FontAwesomeIcon icon={faChevronDown} style={styles.readMoreIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.breakdownItems}>
          {company.categorizedScores && Object.keys(company.categorizedScores).map((key) => (
            <View key={key} style={styles.breakdownItem}>
              {(company.categorizedScores[key].score === 'Not Applicable') ||
              (company.categorizedScores[key].score === 'n/a') ||
              (company.categorizedScores[key].score === 'not applicable') ?
                <Text style={styles.breakdownScore}>N/A</Text> :
                <Text style={styles.breakdownScore}>{company.categorizedScores[key].score}</Text>
              }
              <Text style={styles.breakdownLabel}>{key}</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  titleNrating: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ratingBox: {
    backgroundColor: '#F3F8FE',
    padding: 10,
    borderRadius: 30,
    flexDirection: 'row',
  },
  rating: {
    fontSize: 14,
    color: '#7A00E6',
    fontWeight: 'bold'
  },
  ratingScore: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  breakdown: {
    padding: 20,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'SemiBold',
    marginBottom: 10,
  },
  readMore: {
    color: '#7A00E6',
    textAlign: 'center',
    fontWeight: 'light',
  },
  readMoreIcon: {
    color: '#7A00E6',
    marginLeft: 5,
  },
  breakdownItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  breakdownItem: {
    width: '31%',
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#F3F8FE',
    borderRadius: 8,
    alignItems: 'center',
  },
  breakdownScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  breakdownLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default CompanyDetailScreen;
