import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, ImageBackground } from "react-native";
// Navigation datas
import { useRoute } from "@react-navigation/native";
import { getProducts } from "../../api/shop/products";

export default function ShopScreen({ navigation }: any) {
  const route = useRoute();
  const { shop }: any = route.params;

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getShopProducts = async () => {
      setProducts(await getProducts(shop.id));
    };

    getShopProducts();
  }, []);

  return (
    <View className="relative">
      <Pressable
        onPress={() => navigation.goBack()}
        className="absolute top-14 left-5 z-10 bg-white rounded-full p-2"
      >
        <Text className="text-black">Retour</Text>
      </Pressable>
      <ImageBackground
        source={{ uri: shop.image }}
        style={{
          width: "100%",
          height: 200,
          marginBottom: 20,
        }}
      ></ImageBackground>
      <View className="pb-6 border-b border-[#E6E6E6]">
        <Text className="text-3xl font-semibold text-center">{shop.name}</Text>
        <Text className="text-center text-[#808080] mt-2">{shop.address}</Text>
      </View>
      <View className="my-4">
        {products === null ? (
          <View className="w-full mt-4 px-5">
            <Text className="text-xl text-center font-semibold">
              Cette boutique ne possède aucun produit.
            </Text>
          </View>
        ) : (
          products.map(
            (product: {
              id: React.Key | null | undefined;
              name: string;
              price: string;
              description: string;
              image: string;
            }) => (
              <Pressable
                key={product.id}
                onPress={() => navigation.navigate("Product", { product })}
                className="flex flex-row items-center justify-between border-b border-[#E6E6E6] pb-4 mt-3 mx-6"
              >
                <View className="w-[60%]">
                  <Text className="text-xl font-semibold">{product.name}</Text>
                  <Text className="text-lg text-[#808080] font-semibold mb-1">
                    {product.price} €
                  </Text>
                  <Text className="font-light">{product.description}</Text>
                </View>
                <ImageBackground
                  className="h-20 w-20 rounded-full overflow-hidden"
                  source={{ uri: product.image }}
                ></ImageBackground>
              </Pressable>
            )
          )
        )}
      </View>
    </View>
  );
}
