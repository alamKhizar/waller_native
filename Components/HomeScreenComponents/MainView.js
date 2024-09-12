import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Button,
  Text,
} from "react-native";
import { AppColor } from "../../assets/Colors/AppColor";
import SvgComponent from "../Svg/SvgComponent";
import SvgFavFill from "../Svg/SVG_FILLED/SvgFavFilled";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { imageDB } from "../../FireBase/Config";
import { useNavigation } from "@react-navigation/native";
const axiosInstance = require("../../Axios/AxiosInstance");

const MainView = () => {
  const [imgURLs, setImgURLs] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState([]);

  const navigation = useNavigation();

  const fetchImages = async () => {
    setLoading(true); 
    try {
      console.log("Refreshed images...");
      const listRef = await ref(imageDB, "wallpaper/");
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map((item) => getDownloadURL(item).then(url => ({ imageUrl: url})))
      );
      setImgURLs(urls);
    } catch (error) {
      console.log("Error in fetching images", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const ShowImageHandler = (item) => {
    navigation.navigate("ShowImage", {
      item: item,
    });
  };

  const toggleFavorite = (url) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(url)) {
        newFavorites.delete(url);
      } else {
        newFavorites.add(url);
      }
      return newFavorites;
    });
  };

  const handleRefresh = () => {
    console.log("Refreshing images...");
    fetchImages();
  };

  useEffect(() => {
    const getImages = async () => {
      try {
        const res = await axiosInstance.get("/waller/auth/searchImage");
        const data = res.data.data;
        setUserData(data);
        console.log("userData =", data);
      } catch (err) {
        console.log(err);
      }
    };
    getImages();
  }, []);

  const renderItem = ({ item }) => {
    const imageUrl = item.imageUrl;
    const id = item._id;
    const username = item.uploader.username;

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => ShowImageHandler(imageUrl)}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(imageUrl)}
            >
              {favorites.has(imageUrl) ? (
                <SvgFavFill width={20} height={20} color={AppColor.red} />
              ) : (
                <SvgComponent
                  width={20}
                  height={20}
                  color={AppColor.fontColor}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.username}>{username}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.refreshContainer}>
        <Button
          title="refresh if bug occurs :)"
          onPress={handleRefresh}
          color={AppColor.iconColor}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={AppColor.fontColor}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: AppColor.appColor,
  },
  refreshContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  list: {
    flexGrow: 1,
  },
  item: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    aspectRatio: 1 / 1.5, 
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoriteButton: {
    padding: 8,
  },
  username: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MainView;
