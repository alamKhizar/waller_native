import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColor } from '../assets/Colors/AppColor'
import SearchBar from './SearchScreenComponents/SearchBar'
import SearchTags from './SearchScreenComponents/SearchTags'

export const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBar/>
      <SearchTags/>
    </View>
  )
}

export default SearchScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.appColor,
   
  },
});