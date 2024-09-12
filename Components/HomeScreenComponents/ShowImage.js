import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Button, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { AppColor } from "../../assets/Colors/AppColor";

const ShowImage = () => {
  const route = useRoute();
  const imageUri = route.params?.item;
  const [count, setCount] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermission();
  }, []);

  const downloadImage = async () => {
    if (imageUri) {
      if (!hasPermission) {
        Alert.alert("Permission Denied", "Permission to access media library was denied.");
        return;
      }

      try {
        // Create a unique file name based on the current timestamp and original file name
        const fileName = `image_${count + 1}.jpg`;
        // Save to the cache directory for simplicity
        const fileUri = FileSystem.cacheDirectory + fileName;

        console.log("Downloading File name:", fileName);
        console.log("Downloading image to:", fileUri);

        // Create a download resumable instance
        const downloadResumable = FileSystem.createDownloadResumable(
          imageUri,
          fileUri,
          {}
        );

        // Download the image
        const { uri } = await downloadResumable.downloadAsync();

        Alert.alert("Success", `Image downloaded to ${uri}`);

        // Save to media library
        const asset = await MediaLibrary.createAssetAsync(uri);
        setCount(count + 1);
      } catch (error) {
        console.log("Error", `Failed to download image: ${error.message}`);
        Alert.alert("Error", `Failed to download image: ${error.message}`);
      }
    } else {
      Alert.alert("Error", "No image URL provided");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: "100%", borderRadius: 18, marginBottom: 40 }}
          resizeMode="contain" 
        />
      </View>

      <Button
        title="Download Image"
        onPress={downloadImage}
        color={AppColor.btnHighlight} // You can adjust the button color here
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
    width: "70%", // Ensure items fill the container's width
    height: "70%",
    borderRadius: 18, // Optional: Rounded corners for the items
    aspectRatio: 1 / 2,
    marginBottom: 30
  },
});
