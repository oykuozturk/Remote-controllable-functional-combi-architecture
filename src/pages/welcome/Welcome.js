/** @format */

import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearForecast, takeWeatherApi } from "../../redux/weatherSlice";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(clearForecast());
    dispatch(takeWeatherApi());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require("../../assets/logo.png")}
          style={{
            width: "100%",
          }}
          resizeMode="contain"
        />
      </View>

      <Animatable.View
        animation="fadeInUp"
        delay={600}
        style={styles.containerForm}
      >
        <Text style={styles.title}>
          Uzaktan kombi yönetimi için yazılan mobil uygulamaya hoş geldiniz
        </Text>
        <Text style={styles.text}>
          Lütfen giriş yapmak için butona tıklayınız.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Giriş</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
  },
  containerLogo: {
    backgroundColor: "#38a69d",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingStart: "8%",
    paddingEnd: "8%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 25,
    textAlign: "center",
  },
  text: {
    color: "#a1a1a1",
  },
  button: {
    position: "absolute",
    backgroundColor: "#38a69d",
    borderRadius: 50,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#FFF",
  },
});

export default Welcome;
