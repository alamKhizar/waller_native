import React, { useState, useRef } from "react";
import { View, Button, StyleSheet, Dimensions, Alert, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { imageDB } from "../FireBase/Config";
import { uploadBytes, ref, listAll } from "firebase/storage";
import UUID from "react-native-uuid";
import { AppColor } from "../assets/Colors/AppColor";

export default function App() {
  const [videoUri, setVideoUri] = useState(null);
  const videoRef = useRef(null);

  
  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }
    

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const uploadVideo = async () => {
    if (!videoUri) {
      Alert.alert("No video selected", "Please select a video to upload.");
      return;
    }

    try {
      const response = await fetch(videoUri);
      const blob = await response.blob();

      const videoRef = ref(imageDB, `videos/${UUID.v4()}`);
      await uploadBytes(videoRef, blob);

      Alert.alert("Video uploaded!");
    } catch (error) {
      console.error("Error uploading video:", error);
      Alert.alert("Error uploading video:", error.message);
    }
  };

  const playPause = async () => {
    const status = await videoRef.current.getStatusAsync();
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a video from camera roll" onPress={pickVideo} />
      <Button title="Upload Video" onPress={uploadVideo} />
      {videoUri && (
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: videoUri }}
            resizeMode="cover"
            style={styles.video}
            isLooping={true}
          />
          <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={playPause} style={styles.controlButton}>
              <Text style={styles.controlText}>Play/Pause</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColor.appColor,
  },
  videoContainer: {
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').height * 0.45,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    position: 'relative',
  },
  video: {
    flex: 1,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  controlText: {
    color: '#fff',
  },
});
