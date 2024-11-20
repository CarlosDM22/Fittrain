import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function ExerciseCard() {
  const [modalVisible, setModalVisible] = useState(false);

  // Datos temporales para ejercicios
  const [exercises, setExercises] = useState([]);

  // Manejar la adición de ejercicios
  const handleAddExercise = (newExercise) => {
    setExercises((prev) => [...prev, newExercise]);
    setModalVisible(false);
  };

  return (
    <View className="flex-1 p-4">
      {/* Card con Scroll */}
      <ScrollView
        className="bg-white p-4 rounded-lg shadow-lg"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text className="text-lg font-bold mb-4">Ejercicios</Text>

        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <View
              key={index}
              className="p-3 mb-2 border-b border-gray-200 flex-row justify-between"
            >
              <Text className="text-black">{exercise.name}</Text>
              <Text className="text-gray-600">{exercise.reps} reps</Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-500">No hay ejercicios aún.</Text>
        )}

        {/* Botón de agregar */}
        <StyledPressable
          className="bg-green-500 p-4 rounded-lg mt-4 active:bg-green-700"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white font-bold text-center">
            Agregar Ejercicio
          </Text>
        </StyledPressable>
      </ScrollView>

      {/* Modal para agregar ejercicios */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-lg font-bold mb-4">Nuevo Ejercicio</Text>

            <TextInput
              placeholder="Nombre del ejercicio"
              className="border border-gray-300 rounded p-2 mb-3"
              onChangeText={(text) => setExerciseName(text)}
            />

            <TextInput
              placeholder="Repeticiones"
              keyboardType="numeric"
              className="border border-gray-300 rounded p-2 mb-3"
              onChangeText={(text) => setExerciseReps(text)}
            />

            <View className="flex-row justify-end">
              <StyledPressable
                className="bg-gray-400 p-3 rounded-lg mr-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Cancelar</Text>
              </StyledPressable>

              <StyledPressable
                className="bg-green-500 p-3 rounded-lg"
                onPress={() =>
                  handleAddExercise({ name: exerciseName, reps: exerciseReps })
                }
              >
                <Text className="text-white">Agregar</Text>
              </StyledPressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
