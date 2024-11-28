/* CITATION: Used Chatgpt to create the loading circle and the notifications on this page */
/* eslint-disable no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { Easing, Notifier } from 'react-native-notifier';
import useStore from '../services/useStore';
import CompanyTile from './company_tile';
import Search from './search_bar';

function Homepage() {
  const navigation = useNavigation();
  const error = useStore((state) => state.error);
  const resetError = useStore((state) => state.resetError);
  const fetchAllCompanies = useStore((state) => state.fetchAllCompanies);
  const fetchPopularCompaniesByCategory = useStore((state) => state.fetchPopularCompaniesByCategory);
  const fetchBoycottedCompaniesByCategory = useStore((state) => state.fetchBoycottedCompaniesByCategory);
  const companies = useStore((state) => state.companies);
  const popularCompanies = useStore((state) => state.popularCompanies);
  const boycottedCompanies = useStore((state) => state.boycottedCompanies);
  const currentCompany = useStore((state) => state.currentCompany);
  const [searchQuery, setSearchQuery] = useState('');
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Technology', 'Healthcare', 'Finance', 'Consumer_Goods', 'Retail', 'Automotive', 'Energy', 'Telecommunications', 'Food', 'Beverage', 'Transportation', 'Logistics'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await fetchPopularCompaniesByCategory(selectedCategory);
        await fetchBoycottedCompaniesByCategory(selectedCategory);
        await fetchAllCompanies();

        if (querySubmitted) {
          setShowText(filteredPopularCompanies.length === 0 && filteredBoycottedCompanies.length === 0 && searchQuery.length > 0);
          setQuerySubmitted(false);
        }
      } catch (error) {
        Notifier.showNotification({
          title: 'Error',
          description: 'Something went wrong while fetching information. Please reload the page and try again.',
          duration: 0,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          onHidden: () => { resetError(); },
        });        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, currentCompany, error, querySubmitted]);

  const filteredBoycottedCompanies = boycottedCompanies.filter((company) => company.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPopularCompanies = popularCompanies.filter((company) => company.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* search */}
        <View style={styles.searchContainerWrapper}>
          <Search
            companies={companies}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            querySubmitted={querySubmitted}
            setQuerySubmitted={setQuerySubmitted}
          />
        </View>
  
        {/* categories */}
        <ScrollView horizontal style={styles.categories} showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.category,
                selectedCategory === category && styles.selectedCategory
              ]}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category.replace(/_/g, ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
  
        {/* Loading indicator or company display */}
        {loading || querySubmitted ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7A00E6" />
          </View>
        ) : (
          <>
            {/* Ethical Companies */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Ethical Companies</Text>
                <TouchableOpacity onPress={() => navigation.navigate('PopularSeeAll', { category: selectedCategory })}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
  
              <ScrollView horizontal>
                {searchQuery.length === 0 ? (
                  popularCompanies.map((company) => (
                    <TouchableOpacity key={company._id} onPress={() => navigation.navigate('CompanyDetail', { companyName: company.companyName })}>
                      <CompanyTile company={company}></CompanyTile>
                    </TouchableOpacity>
                  ))
                ) : filteredPopularCompanies.length > 0 && searchQuery.length > 0 ? (
                  filteredPopularCompanies.map((company) => (
                    <TouchableOpacity key={company._id} onPress={() => navigation.navigate('CompanyDetail', { companyName: company.companyName })}>
                      <CompanyTile company={company}></CompanyTile>
                    </TouchableOpacity>
                  ))
                ) : showText && (
                  <Text>No ethical company called '{searchQuery}' was found in the '{selectedCategory}' category.</Text>
                )}
              </ScrollView>
            </View>
  
            {/* Non-Ethical Companies */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Non-Ethical Companies</Text>
                <TouchableOpacity onPress={() => navigation.navigate('BoycottSeeAll', { category: selectedCategory })}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal>
                {searchQuery.length === 0 ? (
                  boycottedCompanies.map((company) => (
                    <TouchableOpacity key={company._id} onPress={() => navigation.navigate('CompanyDetail', { companyName: company.companyName })}>
                      <CompanyTile company={company}></CompanyTile>
                    </TouchableOpacity>
                  ))
                ) : (
                  filteredBoycottedCompanies.length > 0 && searchQuery.length > 0 ? (
                    filteredBoycottedCompanies.map((company) => (
                      <TouchableOpacity key={company._id} onPress={() => navigation.navigate('CompanyDetail', { companyName: company.companyName })}>
                        <CompanyTile company={company}></CompanyTile>
                      </TouchableOpacity>
                    ))
                  ) : showText && (
                    <Text>No non-ethical company called '{searchQuery}' was found in the '{selectedCategory}' category.</Text>
                  )
                )}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5
  },
  searchContainerWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  searchSection: {
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 60,
  },
  search: {
    fontSize: 18,
    backgroundColor: '#fff',
  },
  categories: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  category: {
    borderRadius: 20,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  categoryText: {
    textAlign: 'center',
    color: "#B8B8B8"
  },
  selectedCategory: {
    backgroundColor: 'rgba(122, 0, 230, 0.05)',
    color: '#fff',
  },
  selectedCategoryText: {
    color: '#7A00E6',
  },
  section: {
    padding: 10,
    minHeight: 300,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#7A00E6',
  },
  companyLogo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInputContainer: {
    backgroundColor: '#f0f0f0',
    height: 35,
    borderRadius: 10,
    borderColor: 'gray',
  },
  searchIconContainer: {
    paddingLeft: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  itemContainer: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Homepage;
