import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import SvgSearch from '../Svg/SvgSearch';
import { AppColor } from '../../assets/Colors/AppColor';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={AppColor.iconColor}
          selectionColor={AppColor.iconColor}
        />
        <TouchableOpacity style={styles.iconContainer}>
          <SvgSearch width={24} height={24} color={AppColor.iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%', // Adjust width as needed
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    paddingHorizontal: 8,
    backgroundColor: AppColor.btnHighlight,
    borderRadius: 15,
    paddingLeft: 50, // Space for the icon
  },
  iconContainer: {
    position: 'absolute',
    left: 10, // Adjust to position the icon as desired
    height: '100%',
    justifyContent: 'center',
  },
});
