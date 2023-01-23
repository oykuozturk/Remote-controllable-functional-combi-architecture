/** @format */

import React, { useState } from "react";
import {
  AlertNotificationRoot,
  Toast,
  ALERT_TYPE,
} from "react-native-alert-notification";

import {
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { login, changeEmail, changePassword } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useIsLoggedIn } from "../../hooks/hooks";
import { loginValidationSchema } from "../../validation/ValidateLoginForm";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
const SignIn = () => {
  const isLoggedIn = useIsLoggedIn();
  const email = useSelector((state) => state.auth.email);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const password = useSelector((state) => state.auth.password);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleEmailChange = (email) => {
    dispatch(changeEmail(email));
  };

  const handlePasswordChange = (password) => {
    dispatch(changePassword(password));
  };

  const handleLogin = async () => {
    await dispatch(login({ email, password }));
    isLoggedIn ? navigation.navigate("Main") : null;
  };
  const showToast = (type, title, textBody) => {
    return Toast.show({
      type,
      title,
      textBody,
    });
  };

  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Animatable.View
            animation="fadeInLeft"
            delay={500}
            style={styles.containerHeader}
          >
            <Text style={styles.header}>Giriş Yap</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => {
                handleEmailChange(values.email);
                handlePasswordChange(values.password);
                handleLogin().then(() => {
                  isLoggedIn
                    ? showToast(
                        ALERT_TYPE.SUCCESS,
                        "Başarılı",
                        "Giriş başarılı bir şekilde gerçekleştirildi"
                      )
                    : showToast(
                        ALERT_TYPE.DANGER,
                        "Başarısız",
                        "Eposta veya şifre yanlış"
                      );
                });
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <>
                  <Text style={styles.title}>Email </Text>

                  <TextInput
                    onChange={(e) => {
                      handleEmailChange(e.nativeEvent.text);
                    }}
                    name="email"
                    onChangeText={handleChange("email")}
                    keyboardType="email-address"
                    onBlur={handleBlur("email")}
                    value={values.email}
                    style={styles.input}
                    placeholder="örnek@gmail.com"
                    textContentType="emailAddress"
                  />
                  {errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <Text style={styles.title}>Şifre</Text>

                  <TextInput
                    onChange={(e) => {
                      handlePasswordChange(e.nativeEvent.text);
                    }}
                    name="password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    style={styles.input}
                    placeholder="Şifre"
                    secureTextEntry={true}
                  />
                  {errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  <TouchableOpacity
                    style={
                      isValid
                        ? { ...styles.button }
                        : { ...styles.button, ...styles.disabled }
                    }
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    {isLoading ? (
                      <View style={styles.indicator}>
                        <ActivityIndicator size="small" color="#0fffff" />
                        <Text style={styles.buttonText}>Giriş Yap</Text>
                      </View>
                    ) : (
                      <Text style={styles.buttonText}>Giriş Yap</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.registerText}>
                      Hesabın yokmu? Kayıt ol.
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
  },
  containerHeader: {
    marginTop: "40%",
    marginBottom: "8%",
    paddingStart: "8%",
  },
  indicator: {
    flexDirection: "row",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  containerForm: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingStart: "8%",
    paddingEnd: "8%",
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 3,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 10,
    color: "red",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#38a69d",
    width: "100%",
    borderRadius: 5,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
  disabled: {
    backgroundColor: "gray",
    disabled: "true",
  },
});

export default SignIn;
