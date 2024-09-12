import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { AppColor } from "../../assets/Colors/AppColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../Context/UserContext";
import { jwtDecode } from "jwt-decode";
// import { AsyncStorage } from "react-native";

const axiosInstance = require("../../Axios/AxiosInstance");

const AuthScreen = () => {
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigation = useNavigation();

  //use effect to check if token presentt in async storage then login directly

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = await AsyncStorage.getItem("authToken");
  //     console.log("USE EFFECT, Token from async storage = " + token);
  //     if (token) {
  //       navigation.navigate("MainApp");
  //     }
  //   }
  //   checkToken();

  // },[])

  const { userID, setUserID } = useContext(UserContext);
  const { username, setUsername } = useContext(UserContext);

  // Function to handle login
  const handleLogin = async () => {
    // console.log('Logging in with:', { loginEmail, loginPassword });
    // Alert.alert('Login', `Email: ${loginEmail}\nPassword: ${loginPassword}`);

    console.log("Logging in with:", { loginEmail, loginPassword });
    try {
      console.log("Base URL:", axiosInstance.defaults.baseURL);
      const userDATA = await axiosInstance.post("/waller/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      const tokenAsync = await AsyncStorage.setItem(
        "authToken",
        userDATA.data.token
      );

      setUsername(userDATA.data.userName);
      // decode the token use=ing jwt-decode
      const decoded = jwtDecode(userDATA.data.token);
      console.log("Decoded token = ", decoded.email);

      //set id in context
      setUserID(decoded.id);

      console.log("USERDATA Token = " + userDATA.data.token);

      console.log(
        "user data token from login = " +
          (await AsyncStorage.getItem("authToken"))
      );
      if (userDATA.data.message === "User logged in successfully") {
        // Save token in AsyncStorage

        navigation.navigate("MainApp");
      } else {
        Alert.alert("Login Failed", "Please check your credentials");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Login Failed", "Please check your credentials");
    }
  };

  // Function to handle signup
  const handleSignup = async () => {
    try {
      const signupUser = await axiosInstance.post("/waller/auth/register", {
        name: name,
        email: signupEmail,
        password: signupPassword,
      });

      // const tokenAsync = await AsyncStorage.setItem(
      //   "authToken",
      //   signupUser.data.token
      // );

      // console.log("USERDATA Token = " +  signupUser.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.partitionContainer}>
        {/* Login Section */}
        <View style={styles.authSection}>
          <Text style={styles.title}>Login</Text>

          {/* Email Field for Login */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={loginEmail}
            onChangeText={setLoginEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            selectionColor={AppColor.iconColor}
            placeholderTextColor={AppColor.iconColor}
          />

          {/* Password Field for Login */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
            selectionColor={AppColor.iconColor}
            placeholderTextColor={AppColor.iconColor}
          />

          {/* Login Button */}
          <Button
            title="Login"
            onPress={handleLogin}
            color={AppColor.iconColor}
          />
        </View>

        {/* Signup Section */}
        <View style={styles.authSection}>
          <Text style={styles.title}>Sign Up</Text>

          {/* Name Field for Signup */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            selectionColor={AppColor.iconColor}
            placeholderTextColor={AppColor.iconColor}
          />

          {/* Email Field for Signup */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={signupEmail}
            onChangeText={setSignupEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            selectionColor={AppColor.iconColor}
            placeholderTextColor={AppColor.iconColor}
          />

          {/* Password Field for Signup */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={signupPassword}
            onChangeText={setSignupPassword}
            secureTextEntry
            selectionColor={AppColor.iconColor}
            placeholderTextColor={AppColor.iconColor}
          />

          {/* Confirm Password Field for Signup */}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            selectionColor={AppColor.iconColor}
            placeholderTextColor={AppColor.iconColor}
          />

          {/* Signup Button */}
          <Button
            title="Sign Up"
            onPress={handleSignup}
            color={AppColor.iconColor}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: AppColor.appColor,
  },
  partitionContainer: {
    flexDirection: "row", // Arrange items in a row (side-by-side)
    justifyContent: "space-between",
  },
  authSection: {
    flex: 1,
    marginHorizontal: 10,
    padding: 20,
    // borderWidth: 1,
    // borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    backgroundColor: AppColor.btnHighlight,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: AppColor.fontColor,
  },
  input: {
    borderWidth: 1,
    borderColor: AppColor.iconColor,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    color: AppColor.fontColor,
    backgroundColor: AppColor.btnHighlight,
  },
});

export default AuthScreen;
