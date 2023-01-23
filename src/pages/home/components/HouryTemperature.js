/** @format */

import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
const colorToday = "#C2B8FF";

const HouryTemperature = () => {
  const forecast = useSelector((state) => state.weather.forecast);
  return (
    <View style={styles.bottom}>
      <View style={styles.bottomHeader}>
        <Text style={styles.bottomContentText}>Saatlik hava durumu</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.bottomContent}>
          {forecast.map((hourly, idx) => {
            const hour = parseInt(hourly.time.split(" ")[1].substring(0, 2));
            const now = new Date(Date.now()).getHours();

            if (hour - now >= -1) {
              return (
                <View
                  key={idx}
                  style={
                    hour < now
                      ? { ...styles.hourlyForecast, backgroundColor: "#295BB3" }
                      : hour == now
                      ? { ...styles.hourlyForecast, backgroundColor: "#253243" }
                      : { ...styles.hourlyForecast }
                  }
                >
                  <Text style={styles.hour}>
                    {hour === now ? "Şaun" : hourly.time.split(" ")[1]}
                  </Text>
                  <Image
                    source={{
                      uri: `https:${hourly.condition.icon}`,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
                    }}
                  />
                  <Text style={styles.hourlyDegree}>{hourly.temp_c}°</Text>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "#2a6f51",
    width: "100%",
    height: 335,
    borderRadius: 40,
    marginTop: 28,
  },
  bottomHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    alignItems: "center",
    flexDirection: "column",
  },
  bottomContent: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  bottomContentText: {
    color: "#C2B8FF",
  },
  scrollView: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  hourlyForecast: {
    borderWidth: 1,
    width: 70,
    height: 146,
    borderRadius: 30,
    backgroundColor: "#265890",
    padding: 15,
    alignItems: "center",
    marginRight: 5,
    borderColor: "#81B2E3",
  },
  hour: {
    color: "white",
    marginBottom: 10,
    fontSize: 12,
  },
  hourlyDegree: {
    color: "white",
    marginTop: 10,
  },
});

export default HouryTemperature;
