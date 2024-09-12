import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColor } from '../assets/Colors/AppColor'

export const FavScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FavScreen</Text>
    </View>
  )
}

export default FavScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.appColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
   
  },
});