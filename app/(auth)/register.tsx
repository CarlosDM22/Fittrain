// app/(auth)/register.js
import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, Pressable } from "react-native";
import { useAuth } from "@/lib/AuthContext"; // Importa el hook del contexto
import { useRouter } from "expo-router";

export default function Register() {
  const { signUp } = useAuth(); // Usa el hook para acceder a la función de registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
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
      // Aquí puedes redirigir al login o realizar otras acciones
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Crear una Cuenta
      </Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{
          marginBottom: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        style={{
          marginBottom: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          marginBottom: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{
          marginBottom: 20,
          padding: 8,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
        }}
      />
      <Button title="Registrarse" onPress={handleSignUp} />
      {/* Enlace al login */}
      <Pressable onPress={() => router.push("/(auth)/login")}>
        <Text style={{ color: "blue", marginTop: 20, textAlign: "center" }}>
          ¿Ya tienes una cuenta? Inicia Sesión
        </Text>
      </Pressable>
    </View>
  );
}
