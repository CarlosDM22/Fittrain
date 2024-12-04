import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import useRoutineStore from "@/hooks/useRoutineStore";
import { styled } from "nativewind";
import { supabase } from "@/lib/supabase";

const StyledPressable = styled(Pressable);

export default function ComidasModal() {
  const router = useRouter();

  const { dayKey, tipo } = useGlobalSearchParams();

  const { addComidaToRoutine } = useRoutineStore();

  const [recetas, setRecetas] = useState([]);

  const [selectedRecetas, setSelectedRecetas] = useState([]);

  // Cargar recetas al montar el modal
  useEffect(() => {
    const loadRecetas = async () => {
      const fetchedRecetas = await fetchRecetas();
      setRecetas(fetchedRecetas);
      console.log("Recetas cargadas:", fetchedRecetas);
      console.log("Day key:", dayKey);
      console.log("tipo comida", tipo);
    };

    loadRecetas();
  }, []);

  const fetchRecetas = async () => {
    try {
      const { data, error } = await supabase.from("receta").select("*");

      if (error) throw error;

      return data;
    } catch (err) {
      console.error("Error fetching recetas:", err);
      return [];
    }
  };

  const toggleRecetaSelection = (receta) => {
    setSelectedRecetas((prevSelected) => {
      if (prevSelected.some((rc) => rc.id === receta.id)) {
        // Si ya está seleccionada, deseleccionarla
        return prevSelected.filter((rc) => rc.id !== receta.id);
      } else {
        // Si no está seleccionada, agregarla
        return [...prevSelected, receta];
      }
    });
  };

  const handleSave = () => {
    console.log("Day key:", dayKey);
    console.log("Tipo comida:", tipo);

    // Agregar el tipo a cada receta seleccionada
    const recetasConTipo = selectedRecetas.map((receta) => ({
      ...receta,
      tipo, // Añadir el tipo de comida
    }));
    console.log("Recetas seleccionadas:", recetasConTipo);
    // Añadir las recetas con tipo a la rutina
    addComidaToRoutine(dayKey, recetasConTipo);
    router.back(); // Regresa a la pantalla anterior
  };

  return (
    <View className="flex-1 justify-center items-center bg-black/50">
      <View className="bg-white p-6 rounded-lg w-4/5 max-h-[80%]">
        <Text className="text-lg font-bold mb-4">Seleccionar Recetas</Text>

        <FlatList
          data={recetas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedRecetas.some((rc) => rc.id === item.id);
            return (
              <Pressable
                onPress={() => toggleRecetaSelection(item)}
                className={`flex-row items-center p-3 border-b border-gray-200 ${
                  isSelected ? "bg-green-100" : "bg-white"
                }`}
              >
                <Image
                  source={{
                    uri: "../assets/imagenesRecetas/" + item.imagen,
                  }}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <Text className="text-gray-800 text-md">{item.nombre}</Text>
              </Pressable>
            );
          }}
          ListEmptyComponent={() => (
            <Text className="text-gray-500 text-center mt-4">
              No hay recetas disponibles.
            </Text>
          )}
        />

        <View className="flex-row justify-end mt-4">
          <StyledPressable
            className="bg-gray-400 p-3 rounded-lg mr-2"
            onPress={() => router.back()}
          >
            <Text className="text-white">Cancelar</Text>
          </StyledPressable>

          <StyledPressable
            className="bg-green-500 p-3 rounded-lg"
            onPress={handleSave}
          >
            <Text className="text-white">Guardar</Text>
          </StyledPressable>
        </View>
      </View>
    </View>
  );
}
