import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator, // Import TouchableOpacity for tag removal
} from "react-native";
import { AppColor } from "../assets/Colors/AppColor";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UUID from "react-native-uuid";
import { imageDB } from "../FireBase/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../Context/UserContext";
import { set } from "mongoose";
const axiosInstance = require("../Axios/AxiosInstance");

export const AddScreen = () => {
  const [pickedImage, setPickedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [imgURL, setImgURL] = useState("");

  const { username, userID } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // Function to upload image
  const upload_Image_to_FireBase = async () => {
    setLoading(true);

    console.log("Fetching token...");
    const token = await AsyncStorage.getItem("authToken");
    console.log("Token from AsyncStorage: ", token);

    try {
      if (!pickedImage) {
        console.log("No image selected.");
        setLoading(false); // Hide loading indicator
        return;
      }

      const res = await fetch(pickedImage);
      const blob = await res.blob();
      const imageRef = ref(imageDB, `wallpaper/${UUID.v4()}`);
      const snapshot = await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      console.log("\n\nI GOT THE URL LINK: ", downloadURL);

      if (downloadURL) {
        setImgURL(downloadURL);

        const sendRequestCall = await axiosInstance.post(
          "/waller/auth/sendImageDetails",
          {
            title,
            imageUrl: downloadURL,
            tags,
            userId: userID,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLoading(false);
      }

      return downloadURL;
    } catch (err) {
      console.log("Error uploading image:", err);
      setLoading(false); // Hide loading indicator
    }
  };

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  // Function to add a tag to the tags array
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  // Function to remove a tag from the tags array
  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag)); // Remove the tag that matches the clicked tag
  };

  // Function to validate input fields
  const validateFields = () => {
    return pickedImage && title.trim() && description.trim() && tags.length > 0;
  };

  // Function to handle submit
  const handleSubmit = async () => {
    if (!validateFields()) {
      console.log("Please fill all the fields.");

      return;
    }

    const downloadURL = await upload_Image_to_FireBase();
    console.log({
      pickedImage,
      title,
      description,
      tags,
      downloadURL,
    });

     // Clear all fields
     setPickedImage(null);
     setTitle("");
     setDescription("");
     setTags([]);
     setNewTag("");
     setImgURL(""); // Optional: Clear image URL if needed
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={{ color: AppColor.fontColor, fontSize: 20, marginBottom: 20 }}
      >
        {username}
      </Text>
      {pickedImage && (
        <Image source={{ uri: pickedImage }} style={styles.imagePreview} />
      )}

      <Button
        title="Pick an Image"
        onPress={pickImage}
        color={AppColor.btnHighlight}
      />

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, styles.inputField]}
        selectionColor={AppColor.iconColor}
        placeholderTextColor={AppColor.iconColor}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.inputField]}
        selectionColor={AppColor.iconColor}
        placeholderTextColor={AppColor.iconColor}
        multiline
      />

      <View style={styles.tagContainer}>
        <TextInput
          placeholder="Add a tag"
          value={newTag}
          onChangeText={setNewTag}
          style={[styles.input, styles.tagInput, { color: AppColor.iconColor }]}
          selectionColor={AppColor.iconColor}
          placeholderTextColor={AppColor.iconColor}
        />
        <Button
          title="Add Tag"
          onPress={handleAddTag}
          color={AppColor.btnHighlight}
        />
      </View>

      <FlatList
        data={tags}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRemoveTag(item)}>
            <View
              style={[styles.tag, { backgroundColor: AppColor.btnHighlight }]}
            >
              <Text style={styles.tagText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsList}
      />

      <Button
        title="Upload"
        onPress={handleSubmit}
        color={AppColor.btnHighlight}
        disabled={!validateFields()}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color={AppColor.iconColor}
          style={styles.loader}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: AppColor.appColor,
  },
  imagePreview: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
  },
  inputField: {
    backgroundColor: AppColor.btnHighlight,
    color: AppColor.iconColor,
    borderRadius: 15,
    paddingLeft: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  tagInput: {
    flex: 1,
    backgroundColor: AppColor.btnHighlight,
    marginRight: 10,
  },
  tagsList: {
    marginVertical: 10,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 80,
  },
  tagText: {
    fontSize: 12,
    color: AppColor.fontColor,
  },
});

export default AddScreen;
