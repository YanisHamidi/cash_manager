import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ImageBackground } from "react-native";
// Navigation datas
import { useRoute } from "@react-navigation/native";
// Context
import { useUser, useUserDispatch } from "../../store/Context";

export default function ShopScreen({ navigation }: any) {
  const [select, setSelect] = useState<boolean>(false);

  const route = useRoute();
  const { product }: any = route.params;

  const dispatch = useUserDispatch();

  const addToCart = (product: {
    id: React.Key | null | undefined;
    name: string;
    price: string;
    description: string;
    image: string;
  }) => {
    dispatch({ type: "addToCart", payload: product });
    setSelect(true);
    setTimeout(() => setSelect(false), 2000);
  };

  return (
    <View className="relative h-[100vh]">
      <View
        className={
          select
            ? `absolute top-0 w-full h-28 flex items-center justify-center bg-green-500 z-20 pt-10`
            : `hidden`
        }
      >
        <Text className="text-xl font-semibold text-center text-white">
          Le produit est ajouté au panier !
        </Text>
      </View>
      <Pressable
        onPress={() => navigation.goBack()}
        className="absolute top-14 left-5 z-10 bg-white rounded-full p-2"
      >
        <Text className="text-black">Retour</Text>
      </Pressable>
      <ImageBackground
        source={{ uri: product.image }}
        style={{
          width: "100%",
          height: 250,
          marginBottom: 20,
        }}
      ></ImageBackground>
      <View className="pb-6">
        <Text className="text-3xl font-semibold text-center">
          {product.name}
        </Text>
        <Text className="text-2xl text-center text-[#808080] mt-2">
          {product.price} €
        </Text>
        <Text className="text text-center mt-10">{product.description}</Text>
      </View>

      <View className="absolute bottom-20 w-full flex items-center justify-center">
        <Pressable
          onPress={() => {
            addToCart(product);
          }}
          className="h-12 w-[90%] bg-black flex items-center justify-center rounded-lg"
        >
          <Text className="text-white text-xl">Ajouter au panier</Text>
        </Pressable>
      </View>
    </View>
  );
}
