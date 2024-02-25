import React from "react";
import { Pressable, View } from "react-native";
// Icons
import { Home, Search, ShoppingCart, UserRound } from "lucide-react-native";

export default function NavbarComponent({ navigation }: any) {
  return (
    <View className="h-24 bg-[#168489]">
      <View className="h-[80%] flex flex-row items-center justify-between px-10">
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Home color="#FFF" size={25} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Cart")}>
          <ShoppingCart color="#FFF" size={25} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Account")}>
          <UserRound color="#FFF" size={25} />
        </Pressable>
      </View>
    </View>
  );
}
