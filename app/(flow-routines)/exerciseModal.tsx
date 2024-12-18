import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import useRoutineStore from "@/hooks/useRoutineStore";
import { styled } from "nativewind";
import { supabase } from "@/lib/supabase";

const StyledPressable = styled(Pressable);

export default function ExerciseModal() {
  const router = useRouter();
  const { dayKey } = useLocalSearchParams();

  const { addExerciseToRoutine } = useRoutineStore();

  const [exercises, setExercises] = useState([]);

  const [selectedExercises, setSelectedExercises] = useState([]);

  // Cargar ejercicios al montar el modal
  useEffect(() => {
    const loadExercises = async () => {
      const fetchedExercises = await fetchExercises();
      setExercises(fetchedExercises);
      console.log("Ejercicios cargados:", fetchedExercises);
      console.log("Day key:", dayKey);
    };

    loadExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const { data, error } = await supabase.from("ejercicio").select("*");

      if (error) throw error;

      return data;
    } catch (err) {
      console.error("Error fetching exercises:", err);
      return [];
    }
  };

  const toggleExerciseSelection = (exercise) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.some((ex) => ex.id === exercise.id)) {
        // Si ya está seleccionado, deseleccionarlo
        return prevSelected.filter((ex) => ex.id !== exercise.id);
      } else {
        // Si no está seleccionado, agregarlo
        return [...prevSelected, exercise];
      }
    });
  };

  const handleSave = () => {
    console.log(dayKey);
    console.log("Ejercicios seleccionados:", selectedExercises);

    addExerciseToRoutine(dayKey, selectedExercises);
    // Aquí podrías guardar los ejercicios seleccionados en el estado global o local
    router.back(); // Regresa a la pantalla anterior
  };

  return (
    <View className="flex-1 justify-center items-center bg-black/50">
      <View className="bg-white p-6 rounded-lg w-4/5 max-h-[80%]">
        <Text className="text-lg font-bold mb-4">Seleccionar Ejercicios</Text>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedExercises.some(
              (ex) => ex.id === item.id
            );
            return (
              <Pressable
                onPress={() => toggleExerciseSelection(item)}
                className={`flex-row items-center p-3 border-b border-gray-200 ${
                  isSelected ? "bg-green-100" : "bg-white"
                }`}
              >
                <Image
                  source={{
                    uri: "../assets/imagenesEjercicios/" + item.imagen,
                  }}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <Text className="text-gray-800 text-md">{item.nombre}</Text>
              </Pressable>
            );
          }}
          ListEmptyComponent={() => (
            <Text className="text-gray-500 text-center mt-4">
              No hay ejercicios disponibles.
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
