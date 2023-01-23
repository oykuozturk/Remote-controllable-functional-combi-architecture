/** @format */

import * as Animatable from "react-native-animatable";
import { Text, View, StyleSheet, Image } from "react-native";

const Settings = () => {
  return (
    <Animatable.View
      animation="fadeInRight"
      duration={600}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Uzaktan Kontrol Edilebilir Fonksiyonel
          </Text>
          <Text style={styles.title}>Kombi Mimarisi</Text>
        </View>

        <View style={styles.header}>
          <Image
            source={require("../../assets/oyku.jpg")}
            style={styles.image}
          ></Image>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Öykü ÖZTÜRK</Text>
        <Text style={styles.contentText}>Bartın Üniversitesi</Text>
        <Text style={styles.contentText}>
          Mühendislik Mimarlık ve Tasarım Fakültesi
        </Text>
        <Text style={styles.contentText}>Bilgisayar Mühendisliği</Text>
        <Text style={styles.contentText}>Dr. Evrim GÜLER</Text>
      </View>
      <View style={styles.close}></View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2b5a54",
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    paddingHorizontal: 20,
    fontWeight: "600",
    color: "#cccc",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 160,
    backgroundColor: "white",
    borderRadius: 80,
    borderWidth: 3,
    borderColor: "purple",
  },
  image: {
    resizeMode: "contain",
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  contentText: {
    fontSize: 15,
    marginTop: 5,
    color: "#cccc",
  },
});
export default Settings;
