import React, { useState } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import WheelPicker from "@quidone/react-native-wheel-picker";
import usePlanStore from "@/hooks/usePlanStore";
import ExerciseCard from "@/components/Exercises";
import { CardRoutine } from "@/components/CardRoutine";
import { Link, router } from "expo-router";

export default function AddRoutineTwo() {
  const { tempPlan } = usePlanStore();
  const layout = Dimensions.get("window");

  // Crear pestañas dinámicas según los días seleccionados en el plan
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState(
    tempPlan?.dias.split(",").map((day) => ({
      key: day.toLowerCase(),
      title: day,
    })) || []
  );

  // Estado para gestionar las configuraciones por día
  const [routines, setRoutines] = useState(
    routes.reduce((acc, route) => {
      acc[route.key] = {
        descansoEntreSeries: { minutos: 0, segundos: 0 },
        descansoEntreEjercicios: { minutos: 0, segundos: 0 },
      };
      return acc;
    }, {})
  );

  // Manejar cambios en los valores seleccionados
  const handleTimeChange = (dayKey, field, unit, value) => {
    setRoutines((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [field]: {
          ...prev[dayKey][field],
          [unit]: value,
        },
      },
    }));
  };

  // Opciones para el WheelPicker (0-59)
  const timeOptions = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString(),
    value: i,
  }));

  const openModal = () => {
    router.push("exerciseModal");
  };

  // Escena para cada pestaña
  const renderScene = ({ route }) => {
    const dayKey = route.key;
    const routine = routines[dayKey] || {};

    return (
      <View className="flex-1 p-4" style={{ backgroundColor: "#fff" }}>
        <Text className="text-black text-base mb-2 text-center">
          Configuración de Rutina
        </Text>

        <View className="flex-row justify-around items-center mb-4 ">
          {/* Temporizador: Descanso entre series */}
          <View className="items-center">
            <Text className="text-black text-sm mb-1">Descanso Series</Text>
            <View className="flex-row items-center">
              <WheelPicker
                visibleItemCount={3}
                data={timeOptions}
                value={routine.descansoEntreSeries.minutos}
                itemHeight={30}
                width={50}
                itemTextStyle={{ fontSize: 16, color: "black" }}
                onValueChanged={({ item: { value } }) =>
                  handleTimeChange(
                    dayKey,
                    "descansoEntreSeries",
                    "minutos",
                    value
                  )
                }
              />
              <Text className="text-black mx-1">:</Text>
              <WheelPicker
                visibleItemCount={3}
                data={timeOptions}
                value={routine.descansoEntreSeries.segundos}
                itemHeight={30}
                width={50}
                itemTextStyle={{ fontSize: 16, color: "black" }}
                onValueChanged={({ item: { value } }) =>
                  handleTimeChange(
                    dayKey,
                    "descansoEntreSeries",
                    "segundos",
                    value
                  )
                }
              />
            </View>
          </View>

          {/* Temporizador: Descanso entre ejercicios */}
          <View className="items-center">
            <Text className="text-black text-sm mb-1">Descanso Ejercicios</Text>
            <View className="flex-row items-center">
              <WheelPicker
                visibleItemCount={3}
                data={timeOptions}
                value={routine.descansoEntreEjercicios.minutos}
                itemHeight={30}
                width={50}
                itemTextStyle={{ fontSize: 16, color: "black" }}
                onValueChanged={({ item: { value } }) =>
                  handleTimeChange(
                    dayKey,
                    "descansoEntreEjercicios",
                    "minutos",
                    value
                  )
                }
              />
              <Text className="text-black mx-1">:</Text>
              <WheelPicker
                visibleItemCount={3}
                data={timeOptions}
                value={routine.descansoEntreEjercicios.segundos}
                itemHeight={30}
                width={50}
                itemTextStyle={{ fontSize: 16, color: "black" }}
                onValueChanged={({ item: { value } }) =>
                  handleTimeChange(
                    dayKey,
                    "descansoEntreEjercicios",
                    "segundos",
                    value
                  )
                }
              />
            </View>
          </View>
        </View>

        {/* Espacio disponible para agregar ejercicios */}
        <Text className="text-black text-md">Ejercicios</Text>
        <View className="flex-1 items-center border-2 border-gray-300 border-rounded-lg">
          <View className="flex-row">
            <Pressable
              onPress={openModal}
              className="bg-green-500 p-4 rounded-lg mt-4 active:bg-green-700"
            >
              <Text className="text-white font-bold text-center">
                Agregar Ejercicio
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "white" }}
          style={{ backgroundColor: "#333" }}
          labelStyle={{ color: "white" }}
        />
      )}
    />
  );
}
