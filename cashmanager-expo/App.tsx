import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Views
// Register Screen
import SignUpScreen from "./views/register/SignUpScreen";
import SignInScreen from "./views/register/SignInScreen";
import WelcomeScreen from "./views/register/WelcomeScreen";
// Home Screen
import HomeScreen from "./views/home/HomeScreen";
// Request Location Screen
import LocationScreen from "./views/request/LocationScreen";
// Shop Screen
import ShopScreen from "./views/shop/ShopScreen";
// Product Screen
import ProductScreen from "./views/shop/ProductScreen";
// Panier Screen
import CartScreen from "./views/cart/CartScreen";
// Account Screen
import AccountScreen from "./views/home/AccountScreen";
// Scan Screen
import ScanScreen from "./views/cart/ScanScreen";
// Request API
import { getInfos } from "./api/login/login";
// Context
import { Context, Provider, useUserDispatch } from "./store/Context";
// Localstorage
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Context
  const user = useContext(Context);
  const dispatch = useUserDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await SecureStore.getItemAsync("auth_token");
        if (token !== null && token !== undefined) {
          setIsLoggedIn(false);
          getInfos(token, dispatch);
        } else setIsLoggedIn(true);
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
          <Stack.Screen name="Shop" component={ShopScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
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
