import React from "react";
import { Image, StyleSheet, Text, View, Button, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { AppColor } from "../../assets/Colors/AppColor";

const ShowImage = () => {
  const route = useRoute();
  const imageUri = route.params?.item;

  const downloadImage = async () => {
    if (imageUri) {
      try {
        // Create a unique file name based on the current timestamp and original file name
        const fileName = imageUri.split("/").pop();
        const fileUri = FileSystem.documentDirectory + fileName;

        console.log("Downloading File name:", fileName);
        console.log("Downloading image to:", fileUri);

        // Download the image
        const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);

        Alert.alert("Success", `Image downloaded to ${uri}`);
      } catch (error) {
        console.log("Error", `Failed to download image: ${error.message}`);
      }
    } else {
      Alert.alert("Error", "No image URL provided");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>hi</Text> */}
      <View style={styles.item}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 18 }}
          resizeMode="contain" 
        />
      </View>

      <Button
        title="Download Image"
        onPress={downloadImage}
        color={AppColor.fontColor} // You can adjust the button color here
      />
    </View>
  );
};

export default ShowImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.appColor,
    
  },

  item: {
    // flex: 1,
    width: "70%", // Ensure items fill the container's width
    // aspectRatio: 1, // Maintain a 1:1 aspect ratio
    height: "70%",
    borderRadius: 18, // Optional: Rounded corners for the items
    aspectRatio: 1/2,
  },
});
