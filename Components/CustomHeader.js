// Components/CustomHeader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from "./Svg/SVG_FILLED/Logo"; // Adjust the import path as needed

const CustomHeader = ({ color, width, height }) => {
  return (
    <View style={styles.headerContainer}>
      <Logo width={width} height={height} color={color} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // Center the content
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
