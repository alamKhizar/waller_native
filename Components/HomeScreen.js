import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColor } from '../assets/Colors/AppColor'
import CustomHeader from './CustomHeader'
import MainView from './HomeScreenComponents/MainView'

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
     <MainView/>
    </View>
  )
}

export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.appColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
   
  },
});