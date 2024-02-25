import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from "react-native";
// Screens
import ShopScreen from "../shop/ShopScreen";
// Components
import NavbarComponent from "../../components/navbar/NavbarComponent";
// Context User Datas
import { Context } from "../../store/Context";
// Boutiques
import { getShops } from "../../api/shop/shop";
// Localisation
import * as Location from "expo-location";

export default function HomeScreen({ navigation }: any) {
  const user = useContext(Context);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [shops, setShops] = useState<any>();

  useEffect(() => {
    async function getDatas() {
      await Location.getBackgroundPermissionsAsync();
      let locations = await Location.getCurrentPositionAsync({});

      if (locations != null && !loading) {
        setShops(
          await getShops(locations.coords.latitude, locations.coords.longitude)
        );
        setLoading(true);
      }
    }

    getDatas();
  }, []);

  if (!loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#168489" />
      </View>
    );
  }

  const filteredShops = shops?.filter(
    (shop: {
      id: React.Key | null | undefined;
      image: string;
      name: string;
      address: string;
    }) => shop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="relative h-screen">
      <View style={styles.scrollContent}>
        <View className="mt-14 mb-4">
          <Text className="text-lg text-capitalize">
            Salut, {user.firstname === null ? "" : user.firstname}
          </Text>
        </View>
        <View className="mb-2">
          <TextInput
            className="h-12 w-full bg-[#E6E6E6] mb-6 rounded-lg px-4"
            onChangeText={setSearch}
            value={search}
            placeholder="Recherche votre boutique"
            returnKeyType="done"
          />
        </View>
        <View>
          {shops === null ? (
            <View className="mt-10">
              <Text className="text-2xl text-center text-[#168489] font-semibold">
                Aucune boutique ne se trouve autour de vous !
              </Text>
            </View>
          ) : filteredShops.length > 0 ? (
            <FlatList
              data={filteredShops}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  key={item.id}
                  onPress={() => navigation.navigate("Shop", { shop: item })}
                  className="border-b border-[#E6E6E6] pb-4 mb-4"
                >
                  <ImageBackground
                    className="w-full h-[125px] rounded-lg mb-4 overflow-hidden"
                    source={{ uri: item.image }}
                  ></ImageBackground>
                  <Text className="font-semibold">
                    {item.name},{" "}
                    <Text className="text-[#808080] font-light">
                      {item.address}
                    </Text>
                  </Text>
                </Pressable>
              )}
            />
          ) : (
            shops.map(
              (shop: {
                id: React.Key | null | undefined;
                image: string;
                name: string | undefined;
                address: string;
              }) => (
                <Pressable
                  key={shop.id}
                  onPress={() => navigation.navigate("Shop", { shop })}
                  className="border-b border-[#E6E6E6] pb-4 mb-4"
                >
                  <ImageBackground
                    className="w-full h-[125px] rounded-lg mb-4 overflow-hidden"
                    source={{ uri: shop.image }}
                  ></ImageBackground>
                  <Text className="font-semibold">
                    {shop.name},{" "}
                    <Text className="text-[#808080] font-light">
                      {shop.address}
                    </Text>
                  </Text>
                </Pressable>
              )
            )
          )}
        </View>
      </View>
      <NavbarComponent navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});
