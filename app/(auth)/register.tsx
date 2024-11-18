// app/(auth)/register.js
import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, Pressable } from "react-native";
import { useAuth } from "@/lib/AuthContext"; // Importa el hook del contexto
import { useRouter } from "expo-router";

export default function Register() {
  const { signUp } = useAuth(); // Usa el hook para acceder a la función de registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert(
        "¡Éxito!",
        "Cuenta creada correctamente. Por favor, revisa tu correo para verificar tu cuenta."
      );
      router.replace("/nameSelector");
      // Aquí puedes redirigir al login o realizar otras acciones
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: "#222" }}
    >
      <View className="bg-white rounded-lg p-5 shadow-lg w-5/6">
        <Text className="text-2xl font-bold mb-4 text-center">
          Crear una Cuenta
        </Text>
        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          className="p-3 mb-4 border border-gray-300 focus:border-blue-500 rounded text-black"
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="p-3 mb-4 border border-gray-300 focus:border-blue-500 rounded text-black"
        />
        <TextInput
          placeholder="Confirmar Contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="p-3 mb-4 border border-gray-300 focus:border-blue-500 rounded text-black"
        />
        <View className="mt-3">
          <Pressable
            onPress={handleSignUp}
            className="bg-blue-500 p-3 rounded max-w-3xl"
          >
            <Text className="text-base text-white text-center">Registrate</Text>
          </Pressable>
        </View>
        {/* Enlace al login */}
        <Pressable onPress={() => router.back()}>
          <Text className="mt-2 text-base text-center">
            ¿Ya tienes una cuenta?
          </Text>
          <Text className="text-base text-center text-blue-500">
            Ingresa aqui
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
