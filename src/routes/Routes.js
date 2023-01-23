/** @format */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../pages/welcome/Welcome";
import SignIn from "../pages/signin/SingIn";
import Main from "../pages/home/Main.js";
import { auth } from "../config/firebase";
import { useIsLoggedIn } from "../hooks/hooks";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
