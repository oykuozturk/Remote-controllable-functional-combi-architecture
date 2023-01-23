/** @format */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CustomModal from "../components/Modal";
import Home from "../pages/home/Home";
import Settings from "../pages/settings/Settings";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { setModal } from "../redux/authSlice";

export const TabBar = () => {
  const dispatch = useDispatch();
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "Home":
        icon = routeName === selectedTab ? "ios-home" : "ios-home-outline";
        break;
      case "Settings":
        icon =
          routeName === selectedTab ? "md-person-sharp" : "md-person-outline";
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? "#38a69d" : "gray"}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1C315E" }}>
        <CustomModal />

        <CurvedBottomBar.Navigator
          style={styles1.bottomBar}
          strokeWidth={0.5}
          strokeColor="#DDDDDD"
          height={55}
          circleWidth={55}
          bgColor="white"
          initialRouteName="Home"
          borderTopLeftRight
          screenOptions={{
            headerShown: false,
            headerTintColor: "#38a69d",
            headerTitleAlign: "center",
            headerStyle: {
              ...styles1.shadow,
              borderBottomWidth: 2,
              borderBottomColor: "#38a69d",
            },
          }}
          renderCircle={({ selectedTab, navigate }) => (
            <Animated.View style={styles1.btnCircle}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
                onPress={() => {
                  dispatch(setModal(true));
                }}
              >
                <Ionicons
                  name={"ios-construct-outline"}
                  color="#38a69d"
                  size={25}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}
        >
          <CurvedBottomBar.Screen
            name="Home"
            position="LEFT"
            component={Home}
          />
          <CurvedBottomBar.Screen
            name="Settings"
            component={Settings}
            position="RIGHT"
          />
        </CurvedBottomBar.Navigator>
      </SafeAreaView>
      <SafeAreaView />
    </>
  );
};
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomBar: {},
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  img: {
    width: 30,
    height: 30,
  },
});
