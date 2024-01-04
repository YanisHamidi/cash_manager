import React from "react";
import { Pressable, View } from "react-native";
// Icons
import { Home, Search, ShoppingCart, UserRound } from "lucide-react-native";

export default function NavbarComponent({ navigation, routeName }: any) {
  return (
    <View className="h-24 bg-[#168489]">
      {/* Si il est sur la page d'accueil */}
      {routeName === "home" ? (
        <View className="h-[80%] flex flex-row items-center justify-between px-10">
          <Pressable
            onPress={() => navigation.navigate("home")}
            className="bg-[#F9C578]/30 rounded-full p-3"
          >
            <Home color="#F9C578" size={25} />
          </Pressable>
          <Pressable>
            <Search color="#FFF" size={25} />
          </Pressable>
          <Pressable>
            <ShoppingCart color="#FFF" size={25} />
          </Pressable>
          <Pressable>
            <UserRound color="#FFF" size={25} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
