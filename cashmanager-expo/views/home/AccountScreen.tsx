import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
// Components
import NavbarComponent from "../../components/navbar/NavbarComponent";
// Store
import { Context, useUserDispatch } from "../../store/Context";
// Modification des informations
import { Update } from "../../api/update/update";
// Localstorage
import * as SecureStore from "expo-secure-store";

export default function AccountScreen({ navigation }: any) {
  const user = useContext(Context);
  const dispatch = useUserDispatch();

  const [nom, setNom] = useState<string>(
    user.lastname == null ? "" : user.lastname
  );
  const [prenom, setPrenom] = useState<string>(
    user.firstname == null ? "" : user.firstname
  );
  const [email, setEmail] = useState<string>(
    user.email == null ? "" : user.email
  );
  const [psw, setPsw] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  async function modify() {
    if (validateEmail(email))
      await Update(user.id, prenom, nom, email, psw, dispatch);
    else alert("L'email n'est pas valide");
  }

  async function logout() {
    await SecureStore.deleteItemAsync("auth_token");
    dispatch({
      type: "clearUser",
    });
  }

  return (
    <View className="relative h-screen">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View className="h-full flex items-center justify-center">
          <View className="mb-10">
            <Text className="text-4xl font-semibold text-[#168489] mb-4">
              Settings
            </Text>
            <Text className="text-[#808080]">
              Sur cette page dédiée, vous avez la possibilité de mettre à jour
              et personnaliser vos informations de profil selon vos préférences
              et besoins.
            </Text>
          </View>
          <View className="w-full">
            <View className="w-full">
              <TextInput
                className="h-12 w-full bg-[#F2F2F2] mb-6 border border-[#168489] rounded-lg px-4"
                onChangeText={setPrenom}
                value={prenom}
                placeholder="Votre prénom"
                returnKeyType="done"
              />
            </View>
            <View className="w-full">
              <TextInput
                className="h-12 w-full bg-[#F2F2F2] mb-6 border border-[#168489] rounded-lg px-4"
                onChangeText={setNom}
                value={nom}
                placeholder="Votre nom de famille"
                returnKeyType="done"
              />
            </View>
            <View className="w-full">
              <TextInput
                className="h-12 w-full bg-[#F2F2F2] mb-6 border border-[#168489] rounded-lg px-4"
                onChangeText={setEmail}
                value={email}
                placeholder="Votre email"
                returnKeyType="done"
                inputMode="email"
                keyboardType="email-address"
              />
            </View>
            <View className="w-full">
              <TextInput
                className="h-12 w-full bg-[#F2F2F2] mb-6 border border-[#168489] rounded-lg px-4"
                secureTextEntry={true}
                onChangeText={setPsw}
                value={psw}
                placeholder="Votre mot de passe"
                returnKeyType="done"
              />
            </View>
            <Pressable
              onPress={modify}
              className="h-11 w-full bg-[#168489] flex items-center justify-center rounded-lg mb-4"
            >
              <Text className="text-white">Modifier vos informations</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-32 w-full flex items-center justify-center">
        <Pressable
          onPress={logout}
          className="h-12 w-[90%] bg-red-500 flex items-center justify-center rounded-lg"
        >
          <Text className="text-white text-xl">Déconnexion</Text>
        </Pressable>
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
