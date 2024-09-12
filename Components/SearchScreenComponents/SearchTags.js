import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppColor } from '../../assets/Colors/AppColor';

const SearchTags = () => {
  const tags = [
    { id: "1", tag: "#nature" },
    { id: "2", tag: "#beach" },
    { id: "3", tag: "#mountain" },
    { id: "4", tag: "#food" },
    { id: "5", tag: "#city" },
    { id: "6", tag: "#animals" },
    { id: "7", tag: "#birds" },
  ];

  // Function to generate a random soft color
  const getRandomSoftColor = () => {
    const colors = [
      '#ff4c4c', // Light pink
      '#fcd55e', // Light red
      '#eef5ff', // Misty rose
      '#b5ebe2', // Light cyan
      '#E6E6FA', // Lavender
      '#fbacff', // Khaki
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tags}
        renderItem={({ item }) => (
          <View style={[styles.tag, { backgroundColor: AppColor.btnHighlight }]}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchTags;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    // marginLeft:"8%"
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height:30,
    width:70
  },
  tagText: {
    fontSize: 10,
    color: '#e3e2e2', // Color of the text
  },
});
