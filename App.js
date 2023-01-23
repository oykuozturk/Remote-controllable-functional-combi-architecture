/** @format */
import { Logs } from "expo";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/Routes";
import { store } from "./src/redux";
import { Provider } from "react-redux";
export default function App() {
  Logs.enableExpoCliLogging();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
