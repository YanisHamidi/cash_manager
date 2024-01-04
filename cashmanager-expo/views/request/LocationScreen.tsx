import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { getLocation } from "../../utils/getLocation";

export default function LocationScreen({ navigation }: any) {
  const [status, setStatus] = useState<string>("");

  const fetchLocation = async () => {
    try {
      const locationData = await getLocation();
      setStatus(locationData);
    } catch (error) {
      console.error("Erreur lors de la récupération de la localisation", error);
    } finally {
      if (status != "null") navigation.navigate("Home");
    }
  };

  return (
    <View className="h-screen flex items-center justify-center px-5">
      <Text className="text-3xl">Nous avons besoin de ta localisation</Text>
      <Pressable
        onPress={fetchLocation}
        className="w-full bg-[#168489] rounded-lg p-3 my-10"
      >
        <Text className="text-center text-white text-xl font-semibold">
          Activer la location
        </Text>
      </Pressable>
      <Text className="text-gray-500 text-sm">
        En activant cette fonctionnalité, vous déverrouillerez un univers de
        possibilités personnalisées, avec des boutiques à portée de main. Nous
        tenons à souligner que vos données de localisation seront utilisées
        exclusivement dans le but de personnaliser votre expérience shopping.
        Sans cette fonctionnalité, l'application ne pourra pas fonctionner
        pleinement, car elle a besoin de votre emplacement pour vous offrir des
        recommandations pertinentes.
      </Text>
    </View>
  );
}
