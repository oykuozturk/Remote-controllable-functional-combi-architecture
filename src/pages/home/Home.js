/** @format */
import { useEffect } from "react";
import * as Animatable from "react-native-animatable";

import { onValue, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import {
  onTempChange,
  onHumChange,
  setActive,
  setAutomatic,
  setManual,
  setTargetTemp,
  setMode,
} from "../../redux/firebaseSlice";

import { rtDb } from "../../config/firebase";

import Header from "./components/Header";
import CurrentTemperature from "./components/CurrentTemperature";
import HouryTemperature from "./components/HouryTemperature";
import HomeCurrentTemperature from "./components/HomeCurrentTemperature.js";

const Home = () => {
  const dispatch = useDispatch();

  const handleChanges = () => {
    onValue(ref(rtDb, "/tem"), (querySnapShot) => {
      dispatch(onTempChange(querySnapShot.val()));
    });
    onValue(ref(rtDb, "/hum"), (querySnapShot) => {
      dispatch(onHumChange(querySnapShot.val()));
    });
    onValue(ref(rtDb, "/active"), (querySnapShot) => {
      dispatch(setActive(querySnapShot.val()));
    });
    onValue(ref(rtDb, "/targetTemp"), (querySnapShot) => {
      dispatch(setTargetTemp(querySnapShot.val()));
    });
    onValue(ref(rtDb, "/manual"), (querySnapShot) => {
      dispatch(setManual(querySnapShot.val()));
    });
    onValue(ref(rtDb, "/automatic"), (querySnapShot) => {
      dispatch(setAutomatic(querySnapShot.val()));
    });
    onValue(ref(rtDb, "/mode"), (querySnapShot) => {
      dispatch(setMode(querySnapShot.val()));
    });
  };
  useEffect(() => {
    return handleChanges();
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#2c8153",
      }}
      showsVerticalScrollIndicator={false}
    >
      <Animatable.View
        animation="fadeInDown"
        duration={600}
        style={styles.container}
      >
        <Header />
        <CurrentTemperature />
        <HouryTemperature />
        <HomeCurrentTemperature />
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c8153",
    flex: 1,
    padding: 10,
    paddingBottom: 100,
  },
});
export default Home;
