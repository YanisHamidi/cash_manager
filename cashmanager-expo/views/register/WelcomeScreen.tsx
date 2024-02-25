import React from "react";
import { View, Text, Button, Image } from "react-native";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View className="h-screen bg-[#0D5B5F]">
      {/* Image */}
      <View className="h-[50%]">
        <Image source={require("../../assets/welcomeScreenImage.png")} />
      </View>
      {/* Content */}
      <View className="h-[50%] flex items-center justify-evenly px-6">
        {/* Title */}
        <View className="mb-16">
          <Text className="text-center text-4xl text-[#F9C578] font-semibold mb-5">
            Bienvenue sur Cash Manager
          </Text>
          <Text className="text-center text-white">
            Explore all the existing job roles based on your interest and study
            major
          </Text>
        </View>
        {/* Button */}
        <View className="w-full flex flex-row items-center justify-center gap-x-5">
          <View className="bg-[#F9C578] w-[45%] rounded-lg py-1">
            <Button
              title="Login"
              color="#fff"
              accessibilityLabel="Learn more about this purple button"
              onPress={() => navigation.navigate("SignIn")}
            />
          </View>
          <View className="bg-[#168489] w-[45%] rounded-lg py-1">
            <Button
              title="Register"
              color="#fff"
              accessibilityLabel="Learn more about this purple button"
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
