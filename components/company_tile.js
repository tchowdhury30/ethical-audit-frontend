import React, { useEffect } from 'react';
import {
  View, Text, ImageBackground, StyleSheet, TouchableHighlight, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../services/useStore';

function CompanyTile({ company }) {
  const navigation = useNavigation();
  const getCompanyUrl = useStore((state) => state.getCompanyUrl);

  useEffect(() => {
    const getUrl = async () => {
      try {
        if (company != null) {
          await getCompanyUrl(company);
        }
      } catch (error) {
        Notifier.showNotification({
          title: 'Error',
          description: 'Something went wrong while fetching the company logo url. Please reload the page and try again.',
          duration: 0,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          onHidden: () => { resetError(); },
        });
      }
    };
    getUrl();
  }, []);

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate('CompanyDetail', { companyName: company.companyName });
      }}
      underlayColor="grey"
      style={styles.container}
    >
    <View style={styles.container}>
        {((company.logoImage === 'https://media.giphy.com/media/UYBDCJjwOd9Re/giphy.gif') || !company.logoImage) ? (
            <ImageBackground source={require('../assets/images/placeholder.png')} style={styles.image} resizeMode="contain">
                <View style={styles.companyNameContainer}>
                    <Text style={styles.companyName}>{company.companyName}</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Image source={require('../assets/images/star.png')} style={styles.star} />
                    <Text style={styles.score}>
                        {company.overallScore}
                    </Text>
                </View>
            </ImageBackground>
        ) : (
            <ImageBackground source={{ uri: company.logoImage }} style={styles.image} resizeMode="contain">
                <View style={styles.companyNameContainer}>
                    <Text style={styles.companyName}>{company.companyName}</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Image source={require('../assets/images/star.png')} style={styles.star} />
                    <Text style={styles.score}>
                        {company.overallScore}
                    </Text>
                </View>
            </ImageBackground>
        )}
    </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    flexDirection: 'column',
    borderRadius: 8,
    elevation: 1,
    width: 180,
    height: 250,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 250
  },
  image: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'left',
    width: '80%',
    textAlign: 'center',
    width: 100,
    height: 220,
    paddingTop: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  companyName: {
    fontSize: 14,
    color: 'white',
  },
  companyNameContainer: {
    backgroundColor: '#4D5652',
    borderRadius: 20,
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: -25,
    marginBottom: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  score: {
    fontSize: 14,
    color: 'white',
    
  },
  star: {
    width: 20,
  },
  scoreContainer: {
    backgroundColor: '#4D5652',
    borderRadius: 20,
    width: 'auto',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: -25,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
});

export default CompanyTile;
