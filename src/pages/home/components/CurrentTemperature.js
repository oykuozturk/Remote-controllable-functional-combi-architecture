/** @format */
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useSelector } from "react-redux";

const colorToday = "#C2B8FF";

const CurrentTemperature = () => {
  const {
    condition,
    sunrise,
    date,
    temp_c,
    feelslike_c,
    humidity,
    wind_kph,
    daily_chance_of_rain,
  } = useSelector((state) => state.weather.current);

  return (
    <>
      <View style={styles.todayContainer}>
        <View style={styles.today}>
          <Text style={styles.todayTitle}>Bugün</Text>
          <View style={styles.todayDegree}>
            <Image
              source={{
                uri: `https:${condition.icon}`,
              }}
              style={{
                width: 70,
                height: 70,
                resizeMode: "contain",
                marginRight: -10,
              }}
            />
            <Text style={styles.degreeText}>{temp_c}°</Text>
          </View>
          <Text style={styles.todayText}>{condition.text}</Text>
          <Text style={styles.todayText}>Bartın</Text>
          <Text style={styles.todayText}>{date}</Text>
          <Text style={styles.todayText}>
            Hissedilen {feelslike_c}° -- Gün Doğumu {sunrise.split(" ")[0]}
          </Text>
        </View>
      </View>

      <View style={styles.todayCurrent}>
        <View style={styles.currentElement}>
          <Ionicons name="ios-rainy" size={10} color={colorToday} />
          <Text style={styles.currentText}>{daily_chance_of_rain}%</Text>
        </View>
        <View style={styles.currentElement}>
          <Ionicons name="water" size={10} color={colorToday} />
          <Text style={styles.currentText}>{humidity}%</Text>
        </View>
        <View style={styles.currentElement}>
          <Fontisto name="wind" size={10} color={colorToday} />
          <Text style={styles.currentText}>{wind_kph} km/h</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  todayContainer: {
    with: "100%",
    alignItems: "center",
    marginTop: 20,
    height: 300,
    marginHorizontal: 56,
  },
  today: {
    backgroundColor: "#2b6a54",
    borderRadius: 20,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  todayTitle: {
    color: colorToday,
  },
  todayDegree: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  degreeText: {
    color: "#C2B8FF",
    fontSize: 70,
    marginLeft: 5,
  },
  todayText: {
    color: colorToday,
    fontSize: 12,
    marginTop: 15,
  },
  todayCurrent: {
    backgroundColor: "#2b6a54",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    borderRadius: 40,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  currentElement: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  currentText: {
    marginLeft: 5,
    color: "#C2B8FF",
    fontSize: 10,
  },
});

export default CurrentTemperature;
