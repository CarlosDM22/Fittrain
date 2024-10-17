import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Pressable } from "react-native";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "expo-router";

export default function Login() {
  const { login } = useAuth();
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
      await login(email, password);
      Alert.alert("¡Éxito!", "Has iniciado sesión correctamente");
      // Redirige o realiza otras acciones necesarias
    } catch (error) {
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
        <View>
          {/* Enlace al registro */}
          <Pressable onPress={() => router.push("/(auth)/register")}>
            <Text style={{ color: "blue", marginTop: 20, textAlign: "center" }}>
              ¿No tienes una cuenta? Regístrate
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
