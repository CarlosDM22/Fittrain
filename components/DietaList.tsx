import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, FlatList } from "react-native";
import usePlanStore from "@/hooks/usePlanStore";
import { CardRoutine } from "./CardRoutine";
import { useNavigation, useRouter } from "expo-router";
import CardRecipe from "./CardRecipe";

export default function DietaList() {
  const { plans, fetchPlansandRoutines } = usePlanStore();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadPlans = async () => {
      setLoading(true);
      await fetchPlansandRoutines();
      setLoading(false);
    };
    loadPlans();
  }, [fetchPlansandRoutines]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Cargando planes...</Text>
      </View>
    );
  }

  if (!plans.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">No hay planes disponibles</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={plans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          // si  tipoes de entrenamiento
          item.tipo === "Alimentacion" ? (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/editRoutineOne",
                  params: { planId: item.id },
                })
              }
              className="flex-row items-center bg-white rounded-lg shadow p-4 m-2"
            >
              <View className="flex-1">
                <Text className="text-lg font-bold">{item.nombre}</Text>
                <Text className="text-sm text-gray-500">
                  {item.descripcion}
                </Text>
              </View>
              <Image
                source={{
                  uri: item.imagen || "https://via.placeholder.com/100", // Imagen por defecto
                }}
                className="w-16 h-16 rounded-lg"
              />
            </Pressable>
          ) : null
        }
      />
      <CardRecipe />
    </>
  );
}
