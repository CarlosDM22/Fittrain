import LargeButton from "@/components/largeButton";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useUserStore } from "@/hooks/userStore";
import { useRouter } from "expo-router";

export default function NameSelector() {
  const updateUserData = useUserStore((state) => state.updateUserData);
  const [nombre, setNombre] = useState("");
  const router = useRouter();

  const handleNext = () => {
    updateUserData("fullName", nombre);
    // Redirigir a la siguiente pantalla
    router.push("/genderSelector");
  };

  return (
    <View
      className="flex-1 justify-center p-4"
      style={{ backgroundColor: "#222" }}
    >
      <View className="flex items-center mt-6">
        <Text className="text-2xl font-bold text-gray-200">
          Ingresa tu Nombre de Usuario
        </Text>
      </View>

      <View className="flex items-center justify-center">
        {/* Imput para ingresar el nombre */}
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          className="p-3 mb-4 border border-gray-300 focus:border-blue-500 rounded text-black"
        />
      </View>

      {/* Última fila: Botón 'Siguiente' */}
      <View className="flex items-center">
        <Pressable
          className={`${
            nombre !== "" ? "bg-amber-500/80" : "bg-gray-500/50"
          } p-6 rounded-2xl m-6 active:bg-amber-700 active:scale-95 transition w-full max-w-2xl`}
          onPress={() => handleNext()}
        >
          <Text className="text-lg font-bold text-center text-white">
            Siguiente
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
