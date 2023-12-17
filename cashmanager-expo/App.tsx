import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Views
// Register
import SignUpScreen from "./views/register/SignUpScreen";
import SignInScreen from "./views/register/SignInScreen";
import WelcomeScreen from "./views/register/WelcomeScreen";
// Home
// import HomeScreen from "./views/home/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // if (state.isLoading) {
  //   // We haven't finished checking for the token yet
  //   return <SplashScreen />;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {state.userToken == null ? ( */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        {/* ) : ( */}
        {/* <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} /> */}
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
