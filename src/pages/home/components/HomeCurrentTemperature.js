/** @format */

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const HomeCurrentTemperature = () => {
  const { hum, temp, mode } = useSelector((state) => state.firebase);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Evin Güncel Durumu</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}> Şuanki Sıcaklık : {temp}°</Text>
        <Text style={styles.contentText}>Şuanki Nem : {hum}%</Text>
        <Text style={styles.contentText}>Evin Isınma Modu : {mode} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2a6f51",
    width: "100%",
    height: 335,
    borderRadius: 40,
    marginTop: 28,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    alignItems: "center",
    flexDirection: "column",
  },
  headerText: {
    color: "#C2B8FF",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "80%",
    padding: 20,
  },

  contentText: {
    marginBottom: 30,
    fontSize: 12,
    color: "#C2B8FF",
    fontSize: 15,
  },
});
export default HomeCurrentTemperature;
