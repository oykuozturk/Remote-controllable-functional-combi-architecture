/** @format */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Ionicons name="location" size={24} color="white" />
        <Text style={styles.headerLeftText}>Bartın</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(logout());
        }}
      >
        <Ionicons name="log-out" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLeftText: {
    color: "white",
    marginLeft: 5,
    fontSize: 15,
  },
});
