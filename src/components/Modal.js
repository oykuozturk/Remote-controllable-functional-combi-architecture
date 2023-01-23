/** @format */

import { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../redux/authSlice";
import { changeAll, rdSetActive } from "../config/firebase";

const CustomModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.auth.isModalOpen);
  const { temp, hum, mode, automatic, manual, targetTemp, active } =
    useSelector((state) => state.firebase);
  const { temp_c } = useSelector((state) => state.weather.current);
  const [input, setInput] = useState();
  const [ttemp, setTtemp] = useState(0);
  const [auto, setAuto] = useState(false);
  const [act, setAct] = useState(false);
  const [mods, setMods] = useState("Kapalı");
  const [man, setMan] = useState(false);
  const types = {
    manual: "manual",
    automatic: "automatic",
  };
  const handleChanges = (state, dispatch, type) => {
    changeAll(state, dispatch, type);
  };

  useEffect(() => {
    setAct(true);
    setAuto(false);
    setMan(true);
    setMods("Manuel");
    setTtemp(input);
  }, [input]);

  useEffect(() => {
    setAct(true);
    setMan(false);
    setAuto(true);
    setMods("Otomatik");
  }, [input === ""]);

  return (
    <View style={styles.container}>
      <ReactNativeModal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          dispatch(setModal(!open));
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: 50,
                  position: "absolute",
                  right: -5,
                  height: 50,
                  top: -10,
                }}
              >
                <TouchableOpacity
                  style={{ ...styles.hide, width: 35, height: 35 }}
                  onPress={() => {
                    dispatch(setModal(false));
                  }}
                >
                  <Text
                    style={{
                      ...styles.hideText,
                      color: "#2c8153",
                      fontWeight: "600",
                      fontSize: 18,
                      borderColor: "#2c8153",
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.manualContainer}>
                <Text style={styles.manualTitle}>Manuel Mod</Text>
                <Text style={styles.manualContent}>
                  Bu modun geçerli olması durumunda kombiniz girdiğiniz değeri
                  alt sınır belirleyerek, ortam sıcaklığını girilen alt sınır
                  değerinin altına düştüğünde kendisini aktif edecektir.
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Sıcaklık değeri giriniz"
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={(value) => {
                      setInput(value);
                    }}
                  />
                  <TouchableOpacity
                    disabled={input ? false : true}
                    style={
                      input
                        ? { ...styles.manualSubmit }
                        : { ...styles.manualSubmit, backgroundColor: "gray" }
                    }
                    onPress={() => {
                      handleChanges(
                        {
                          ttemp,
                          mods,
                          man,
                          auto,
                          act,
                        },
                        dispatch,
                        types.manual
                      );
                      setInput("");
                    }}
                  >
                    <Text style={styles.manualSubmitText}> Aktif Et</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.automaticContainer}>
                <Text style={styles.automaticTitle}>Otomatik Mod</Text>
                <Text style={styles.automaticContent}>
                  Bu modun geçerli olması durumunda kombiniz, hava durumu
                  verilerinden aldığı değerlere göre ortam sıcaklığını
                  kendiliğinden ayarlayacaktır.
                </Text>
                <TouchableOpacity
                  disabled={automatic ? true : input ? true : false}
                  style={
                    input
                      ? { ...styles.automaticSubmit, backgroundColor: "gray" }
                      : automatic
                      ? { ...styles.automaticSubmit, backgroundColor: "gray" }
                      : { ...styles.automaticSubmit }
                  }
                  onPress={() => {
                    handleChanges(
                      {
                        mods,
                        man,
                        auto,
                        act,
                      },
                      dispatch,
                      types.automatic
                    );
                  }}
                >
                  <Text style={styles.automaticSubmitText}>Aktif Et</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.homeContainer}>
                <View style={styles.homeTitle}>
                  <Text style={styles.homeTitleText}>Evin Güncel Durumu</Text>
                </View>
                <Text style={styles.homeContentText}>
                  Evin güncel sıcaklığı : {temp}°
                </Text>
                <Text style={styles.homeContentText}>
                  Evin güncel nem oranı : {hum}%
                </Text>
                <Text style={styles.homeContentText}>
                  Evin güncel ısınma modu : {mode}
                </Text>
                <Text style={styles.homeContentText}>
                  Güncel şehir sıcaklığı : {temp_c}°
                </Text>
                <Text style={styles.homeContentText}>
                  Kombi Durumu : {active ? "Açık" : "Kapalı"}
                </Text>
                {manual ? (
                  <Text style={styles.homeContentText}>
                    Manuel mod için geçerli sıcaklık : {targetTemp}°
                  </Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={{
                  ...styles.hide,
                  backgroundColor: "#2c8153",
                  position: "absolute",
                  bottom: 15,
                }}
                onPress={() => {
                  rdSetActive(!active, dispatch);
                }}
              >
                <Text style={{ ...styles.manualSubmitText, color: "white" }}>
                  {active ? "Kombiyi Kapat" : "Kombiyi Aç"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ReactNativeModal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
    marginTop: -55,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "100%",
  },
  manualContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  manualTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  manualContent: {
    textAlign: "center",
    color: "#666769",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 12,
    width: "50%",
    paddingHorizontal: 10,
    height: 30,
  },
  manualSubmit: {
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    backgroundColor: "#2c8153",
    borderColor: "gray",
  },
  manualSubmitText: {
    color: "white",
  },
  automaticContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  automaticTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  automaticContent: {
    color: "#666769",
    marginBottom: 10,
  },
  automaticSubmit: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    backgroundColor: "#2c8153",
    height: 30,
    borderColor: "gray",
  },

  automaticSubmitText: {
    color: "white",
  },
  homeContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  homeTitle: {
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  homeTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  homeContentText: {
    color: "#666769",
    marginBottom: 10,
  },
  hide: {
    borderWidth: 1,
    width: 150,
    marginTop: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "gray",
  },
  hideText: {
    color: "black",
    fontSize: 15,
    fontWeight: "600",
  },
  exit: {
    width: 20,
    height: 20,
    backgroundColor: "red",
  },
});
export default CustomModal;
