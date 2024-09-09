import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

// Definir niveles de dificultad
const levels: Level[] = ["Básico", "Intermedio", "Avanzado"];

type Level = "Básico" | "Intermedio" | "Avanzado";

export default function DifficultSelector() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const router = useRouter();

  return (
    <View
      className="flex-1 justify-between p-4"
      style={{ backgroundColor: "#222" }}
    >
      {/* Primera fila: Título */}
      <View className="flex items-center mt-6">
        <Text className="text-2xl font-bold text-gray-200">
          ¿Cuál es tu nivel?
        </Text>
      </View>

      {/* Segunda fila: 3 Pressables centrados */}
      <View className="flex-grow justify-center gap-4 items-center">
        {levels.map((level) => (
          <Pressable
            key={level}
            onPress={() => setSelectedLevel(level)}
            className={`${
              selectedLevel === level ? "bg-blue-500 border" : "bg-gray-500"
            } p-6 rounded-2xl w-full max-w-2xl flex items-center justify-center ease-linear`}
          >
            <Text className="text-white text-lg">{level}</Text>
          </Pressable>
        ))}
      </View>

      {/* Última fila: Botón 'Siguiente' */}
      <View className="flex items-center">
        <Pressable
          className={`${
            selectedLevel ? "bg-amber-500/80" : "bg-gray-500/50"
          } p-6 rounded-2xl m-6 active:bg-amber-700 active:scale-95 transition w-full max-w-2xl`}
          disabled={!selectedLevel}
          onPress={() => selectedLevel && router.push(`/rutinas`)}
        >
          <Text className="text-lg font-bold text-center text-white">
            Siguiente
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
