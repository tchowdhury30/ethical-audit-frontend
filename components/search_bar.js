/* CITATION: Used Chatgpt to create the loading circle on this page */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import useStore from '../services/useStore';

function Search({ searchQuery, setSearchQuery, querySubmitted, setQuerySubmitted }) {
  const fetchCompanyByName = useStore((state) => state.fetchCompanyByName);
  const [loading, setLoading] = useState(false);

  const handleSearchSubmit = async () => {
    console.log('Search submitted:', searchQuery);

    if (searchQuery) {
      setLoading(true);
      try {
        await fetchCompanyByName(searchQuery);
      } catch (error) {
        console.error('Error fetching company:', error);
      } finally {
        setLoading(false);
      }
    }

    setQuerySubmitted(true);
    console.log("QUERY SUBMITTED IS NOW: ", querySubmitted);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <View style={styles.flexibleSearchContainer}>
          <SearchBar
            showsCancelButton={true}
            onChangeText={setSearchQuery}
            value={searchQuery}
            onSubmitEditing={handleSearchSubmit} 
            placeholder='Search for a company...'
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            leftIconContainerStyle={styles.searchIconContainer}
            inputStyle={styles.searchInput}
            searchIcon={{ size: 20 }}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchSubmit}>
          <Icon name="angle-right" type="font-awesome" color="#7A00E6" backgroundColor="#fff" />
        </TouchableOpacity>
      </View>
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7A00E6" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flexibleSearchContainer: {
    flex: 1, 
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInputContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    height: 35,
    borderRadius: 10,
  },
  searchIconContainer: {
    paddingLeft: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  searchButton: {
    padding: 7,
    borderRadius: 10,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;