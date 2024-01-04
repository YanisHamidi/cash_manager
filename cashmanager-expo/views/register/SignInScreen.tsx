import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
// API Request
import { Login } from "../../api/login/login";
// Context
import { useUserDispatch } from "../../store/Context";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");

  const dispatch = useUserDispatch();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  async function login() {
    if (email === "") alert("L'email est vide");
    else if (psw === "") alert("Le mot de passe est vide");
    else if (validateEmail(email)) await Login(email, psw, dispatch);
    else alert("L'email n'est pas valide");
  }

  return (
    <View className="h-screen bg-[#0D5B5F] flex items-center justify-center px-10">
      <View className="mb-10">
        <Text className="text-[#F9C578] text-4xl text-center font-semibold mb-4">
          Connectez-vous
        </Text>
        <Text className="text-white text-center text-xl font-light">
          Welcome back you’ve been missed!
        </Text>
      </View>
      <View className="w-full">
        <View className="w-full">
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
        <View className="w-full mb-6">
          <Pressable>
            <Text className="text-right text-white">Mot de passe oublié ?</Text>
          </Pressable>
        </View>
        <View className="w-full">
          <Pressable
            onPress={login}
            className="h-14 bg-[#F9C578] flex items-center justify-center rounded-lg mb-6"
          >
            <Text className="text-white text-xl font-semibold">Connexion</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("SignUp")}
            className="h-10 bg-[#168489] flex items-center justify-center rounded-lg"
          >
            <Text className="text-white">Pas de compte ? Inscrivez-vous</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
