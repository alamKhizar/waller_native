import React, { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, View, Button, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { BlurView } from 'expo-blur';
import { AppColor } from "../../assets/Colors/AppColor";

const ShowImage = () => {
  const route = useRoute();
  const imageUri = route.params?.item;
  const [count, setCount] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [localImageUri, setLocalImageUri] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermission();
  }, []);

  useEffect(() => {
    const downloadImage = async () => {
      if (imageUri) {
        try {
          const fileName = `image_${count + 1}.jpg`;
          const fileUri = FileSystem.cacheDirectory + fileName;

          console.log("Downloading File name:", fileName);
          console.log("Downloading image to:", fileUri);

          const downloadResumable = FileSystem.createDownloadResumable(
            imageUri,
            fileUri,
            {}
          );

          const { uri } = await downloadResumable.downloadAsync();

          setLocalImageUri(uri); // Set the local image URI for blur background
        } catch (error) {
          console.log("Error", `Failed to download image: ${error.message}`);
          Alert.alert("Error", `Failed to download image: ${error.message}`);
        }
      } else {
        Alert.alert("Error", "No image URL provided");
      }
    };

    downloadImage();
  }, [imageUri, count]);

  const downloadImageToLibrary = async () => {
    if (localImageUri) {
      if (!hasPermission) {
        Alert.alert("Permission Denied", "Permission to access media library was denied.");
        return;
      }

      try {
        const asset = await MediaLibrary.createAssetAsync(localImageUri);
        setCount(count + 1);
        Alert.alert("Success", "Image downloaded to your library.");
      } catch (error) {
        console.log("Error", `Failed to save image to library: ${error.message}`);
        Alert.alert("Error", `Failed to save image to library: ${error.message}`);
      }
    } else {
      Alert.alert("Error", "No local image found to save.");
    }
  };

  return (
    <View style={styles.container}>
      {localImageUri && (
        <BlurView
          style={StyleSheet.absoluteFill}
          intensity={80}
          tint="light"
        >
          <Image
            source={{ uri: localImageUri }}
            style={StyleSheet.absoluteFill}
            blurRadius={15} // Adjust blur radius as needed
            resizeMode="cover"
          />
        </BlurView>
      )}

      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain" 
          />
        </View>

        <Button
          title="Download Image"
          onPress={downloadImageToLibrary}
          color={AppColor.btnHighlight} // You can adjust the button color here
        />
      </View>
    </View>
  );
};

export default ShowImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // No need for borderRadius as the BlurView handles this
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    padding: 20, // Optional: Add padding if needed
  },
  imageContainer: {
    width: "70%",
    height: "70%",
    borderRadius: 25,
    aspectRatio: 1 / 2,
    elevation: 8,
    marginBottom: 20,
    overflow: 'hidden', // Ensures image respects border radius
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    objectFit: "cover",
  },
});
