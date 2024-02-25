import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
// API Request
import { Register } from "../../api/register/register";

export default function SignInScreen({ navigation }: any) {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  async function login() {
    if (email === "") alert("L'email est vide");
    else if (prenom === "") alert("Le prénom est vide");
    else if (nom === "") alert("Le nom est vide");
    else if (psw === "") alert("Le mot de passe est vide");
    else if (validateEmail(email)) {
      if (await Register(prenom, nom, email, psw) === 201) navigation.navigate("SignIn");
    } else alert("L'email n'est pas valide");
  }

  return (
    <View className="h-screen bg-[#0D5B5F] flex items-center justify-center px-10">
      <View className="mb-10">
        <Text className="text-[#F9C578] text-4xl text-center font-semibold mb-4">
          Inscrivez-vous
        </Text>
      </View>
      <View className="w-full">
        <View className="w-full pb-10">
          <View className="w-full flex flex-row items-center justify-between">
            <TextInput
              className="w-[48%] h-12 bg-[#F2F2F2] mb-6 rounded-lg px-4"
              onChangeText={setPrenom}
              value={prenom}
              placeholder="Prénom"
              returnKeyType="done"
              inputMode="email"
              keyboardType="email-address"
            />
            <TextInput
              className="w-[48%] h-12 bg-[#F2F2F2] mb-6 rounded-lg px-4"
              onChangeText={setNom}
              value={nom}
              placeholder="Nom"
              returnKeyType="done"
            />
          </View>
          <TextInput
            className="h-12 w-full bg-[#F2F2F2] mb-6 rounded-lg px-4"
            onChangeText={setEmail}
            value={email}
            placeholder="Votre email"
            returnKeyType="done"
            inputMode="email"
            keyboardType="email-address"
          />
          <TextInput
            className="h-12 w-full bg-[#F2F2F2] mb-6 rounded-lg pl-4"
            onChangeText={setPsw}
            secureTextEntry={true}
            value={psw}
            placeholder="Votre mot de passe"
            returnKeyType="done"
          />
        </View>
        <View className="w-full">
          <Pressable
            onPress={login}
            className="h-14 bg-[#F9C578] flex items-center justify-center rounded-lg mb-6"
          >
            <Text className="text-white text-xl font-semibold">
              Inscription
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("SignIn")}
            className="h-10 bg-[#168489] flex items-center justify-center rounded-lg px-4"
          >
            <Text className="text-white">
              Vous avez un compte ? Connectez-vous
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
