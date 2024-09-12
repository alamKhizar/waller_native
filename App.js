import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Components/HomeScreen";
import SearchScreen from "./Components/SearchScreen";
import AddScreen from "./Components/AddScreen";
import ProfileScreen from "./Components/ProfileScreen";
import FavScreen from "./Components/FavScreen";
import SvgHome from "./Components/Svg/SvgHome";
import SvgHomeFilled from "./Components/Svg/SVG_FILLED/SvgHomeFilled";
import SvgSearch from "./Components/Svg/SvgSearch";
import SvgAdd from "./Components/Svg/SvgAdd";
import SvgFavFill from "./Components/Svg/SVG_FILLED/SvgFavFilled";
import SvgProfileUnfill from "./Components/Svg/SVG_FILLED/SvgProfileUnfil";
import SvgComponent from "./Components/Svg/SvgComponent";
import { AppColor } from "./assets/Colors/AppColor";
import SvgProfile from "./Components/Svg/SvgProfile";
import CustomHeader from "./Components/CustomHeader";
import SvgMenu from "./Components/Svg/SvgMenu";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowImage from "./Components/HomeScreenComponents/ShowImage";
import AuthScreen from "./Components/HomeScreenComponents/AuthScreen";
import { UserProvider } from "./Context/UserContext";

// Initialize the bottom tab navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Create a stack that shows AuthScreen first
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="MainApp" component={MainAppTabs} />
      <Stack.Screen name="ShowImage" component={ShowImage} />
    </Stack.Navigator>
  );
}

// Move Tab Navigator to a separate function to be called after Auth
function MainAppTabs() {
  return (
    
    <Tab.Navigator
      initialRouteName="Home" // Set "Home" as the initial route
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: AppColor.appColor,
          elevation: 0,
          borderTopColor: AppColor.appColor,
          height: 60,
          paddingLeft: 20,
          paddingRight: 20,
        },
        headerStyle: {
          backgroundColor: AppColor.appColor,
          elevation: 0,
          borderBottomWidth: 0,
          height: 110,
        },
        headerTitleAlign: "center", // Ensure header title is centered
        headerTitle: () => (
          <CustomHeader width={50} height={50} color={AppColor.fontColor} />
        ),
        tabBarLabelStyle: {
          fontSize: 14,
        },

        //menu button
        headerRight: () => (
          <View style={{ marginRight: 20 }}>
            <SvgMenu width={23} height={23} color={AppColor.iconColor} />
          </View>
        ),

        tabBarLabel: () => null, // Hide text labels
        tabBarIcon: ({ color, size, focused }) => {
          let icon;

          // Determine the icon color based on whether the tab is focused
          const iconColor = focused ? AppColor.fontColor : AppColor.iconColor;

          switch (route.name) {
            case "Home":
              icon = focused ? (
                <SvgHomeFilled width={size} height={size} color={iconColor} />
              ) : (
                <SvgHome width={size} height={size} color={iconColor} />
              );
              break;
            case "Search":
              icon = (
                <SvgSearch width={size} height={size} color={iconColor} />
              );
              break;
            case "Add":
              icon = (
                <View
                  style={{
                    height: 40,
                    width: 50,
                    backgroundColor: AppColor.btnHighlight,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SvgAdd width={17} height={17} color={iconColor} />
                </View>
              );
              break;
            case "Favorites":
              icon = focused ? (
                <SvgFavFill width={size} height={size} color={"#Fe2c54"} />
              ) : (
                <SvgComponent width={size} height={size} color={iconColor} />
              );
              break;
            case "Profiles":
              icon = focused ? (
                <SvgProfile
                  width={23}
                  height={23}
                  color={AppColor.fontColor}
                />
              ) : (
                <SvgProfileUnfill
                  width={23}
                  height={23}
                  strokeWidth={60}
                  strokeColor={iconColor}
                />
              );
              break;
            default:
              icon = null;
          }

          return icon;
        },
        tabBarActiveTintColor: "yellow", // Color when active
        tabBarInactiveTintColor: "green", // Color when inactive
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Favorites" component={FavScreen} />
      <Tab.Screen name="Profiles" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Wrap everything in the NavigationContainer
export default function App() {
  return (

    <UserProvider>
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
    </UserProvider>
  );
}
