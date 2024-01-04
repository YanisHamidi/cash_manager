import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
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

  return (
    <View className="relative h-screen">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View className="mt-14 mb-4">
          <Text className="text-lg text-capitalize">
            Salut, {user.firstname}
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
            <View className="h-[90%] flex items-center justify-center">
              <Text className="text-2xl text-center text-[#168489] font-semibold">
                Aucune boutique ne se trouve autour de vous !
              </Text>
            </View>
          ) : (
            <View className="border-b border-[#E6E6E6] pb-4 mb-4">
              <View className="bg-[#E6E6E6] h-32 w-full rounded-lg mb-4"></View>
              <Text className="text-md">Galleries Lafayette</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <NavbarComponent routeName="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 96,
  },
});
