import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Views
// Register
import SignUpScreen from "./views/register/SignUpScreen";
import SignInScreen from "./views/register/SignInScreen";
import WelcomeScreen from "./views/register/WelcomeScreen";
// Home
import HomeScreen from "./views/home/HomeScreen";
// Request
import LocationScreen from "./views/request/LocationScreen";
// Context
import { Context, Provider } from "./store/Context";
// Localstorage
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const user = useContext(Context);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await SecureStore.getItemAsync("auth_token");
        if (token !== null || token !== undefined) setIsLoggedIn(false);
        else setIsLoggedIn(true);
      } catch (error) {
        console.error("Erreur lors de la récupération du token :", error);
      }
    };

    checkLoginStatus();
  }, [user.id]);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}
