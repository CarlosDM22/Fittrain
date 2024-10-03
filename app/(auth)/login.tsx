import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Pressable } from "react-native";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    // Validación básica
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    // Intentar iniciar sesión con Supabase
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        console.log("Supabase Data:", data);
        Alert.alert("¡Éxito!", "Has iniciado sesión correctamente");
        // Aquí puedes redirigir a la pantalla principal o lo que sea necesario
        router.replace("/");
      }
    } catch (error: any) {
      console.log("Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View
      className="flex-1 justify-center items-center "
      style={{ backgroundColor: "#222" }}
    >
      <View className="w-4/5 bg-white rounded-lg p-5 shadow-lg">
        <Text className="text-2xl font-bold mb-5 text-center">Login</Text>

        <TextInput
          placeholder="Correo Electrónico"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          className="p-3 mb-4 border border-gray-300 rounded text-black"
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="p-3 mb-4 border border-gray-300 rounded text-black"
        />

        <View className="mt-3">
          <Pressable
            onPress={handleLogin}
            className="bg-blue-500 p-3 rounded max-w-3xl"
          >
            <Text className="text-white text-center">Iniciar Sesion</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
