// components/AddRoutineTwo.js
import InputSpinner from "react-native-input-spinner";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import usePlanStore from "@/hooks/usePlanStore";
import useRoutineStore from "@/hooks/useRoutineStore";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { useRouter } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { TrashIcon } from "@/components/Icons";

export default function EditRoutineTwo() {
  const { tempPlan, UpdatePlanAndRoutines } = usePlanStore();
  const {
    routines,
    agregarRutina,
    updateRoutine,
    updateExerciseInRoutine,
    removeExerciseFromRoutine,
    fetchRoutinesandExercises,
  } = useRoutineStore(); // Métodos del store
  const router = useRouter();
  const layout = Dimensions.get("window");

  const [index, setIndex] = useState(0);
  const [routes] = useState(
    tempPlan?.dias.split(",").map((day) => ({
      key: day.toLowerCase(),
      title: day,
    })) || []
  );

  const timeOptions = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString(),
    value: i,
  }));

  useEffect(() => {
    const idTempPlan = tempPlan?.id;
    if (idTempPlan) {
      fetchRoutinesandExercises(idTempPlan);
    }
    // Inicializa las rutinas al cargar el componente
    routes.forEach((route) => {
      const idRtn = uuidv4();
      const dayKey = route.key;
      if (!routines[dayKey]) {
      }
    });
  }, [routes, routines, agregarRutina]);

  const saveRoutine = async () => {
    console.log("Rutinas guardadas con sus Ejercicios y datos:", routines);
    UpdatePlanAndRoutines(routines);
    router.replace("/rutinas");
    // Llamar a saveTempPlan y pasar las rutinas para que las guarde junto con el plan
  };

  const renderScene = ({ route }) => {
    const dayKey = route.key;
    const routine = routines[dayKey] || {};

    const handleTimeChange = (field, unit, value) => {
      updateRoutine(dayKey, {
        [field]: {
          ...routine[field], // Mantén los valores existentes
          [unit]: value, // Actualiza solo minutos o segundos
        },
      });
    };

    const updateExercise = (exerciseId, updatedFields) => {
      updateExerciseInRoutine(dayKey, exerciseId, updatedFields);
    };
    const removeExercise = (dayKey, exerciseId) => {
      removeExerciseFromRoutine(dayKey, exerciseId);
    };

    return (
      <View className="flex-1 p-4" style={{ backgroundColor: "#fff" }}>
        <Text className="text-black text-base mb-2 text-center">
          Configuración de Rutina
        </Text>

        {/* Tiempos de Descanso */}
        <View className="flex-row justify-around items-center mb-4">
          <View className="items-center">
            <Text className="text-black text-sm mb-1">Descanso Series</Text>
            <View className="flex-row items-center">
              <WheelPicker
                visibleItemCount={3}
                data={timeOptions}
                value={routine?.descansoEntreSeries?.minutos || 0}
                itemHeight={30}
                width={50}
                itemTextStyle={{ fontSize: 16, color: "black" }}
                onValueChanged={({ item: { value } }) => {
                  console.log(value);
                  handleTimeChange("descansoEntreSeries", "minutos", value);
                }}
              />
              <Text className="text-black mx-1">:</Text>
              <WheelPicker
                visibleItemCount={3}
                data={timeOptions}
                value={routine?.descansoEntreSeries?.segundos || 0}
                itemHeight={30}
                width={50}
                itemTextStyle={{ fontSize: 16, color: "black" }}
                onValueChanged={({ item: { value } }) =>
                  handleTimeChange("descansoEntreSeries", "segundos", value)
                }
              />
            </View>
          </View>

          <View className="items-center">
            <Text className="text-black text-sm mb-1">Descanso Ejercicios</Text>
            <View className="flex-row items-center">
              <WheelPicker
                visibleItemCount={3}
                data={timeOptions}
                value={routine?.descansoEntreEjercicios?.minutos || 0}
                itemHeight={30}
                width={50}
                itemTextStyle={{ fontSize: 16, color: "black" }}
                onValueChanged={({ item: { value } }) =>
                  handleTimeChange("descansoEntreEjercicios", "minutos", value)
                }
              />
              <Text className="text-black mx-1">:</Text>
              <WheelPicker
                visibleItemCount={3}
                data={timeOptions}
                value={routine?.descansoEntreEjercicios?.segundos || 0}
                itemHeight={30}
                width={50}
                itemTextStyle={{ fontSize: 16, color: "black" }}
                onValueChanged={({ item: { value } }) =>
                  handleTimeChange("descansoEntreEjercicios", "segundos", value)
                }
              />
            </View>
          </View>
        </View>

        {/* Lista de Ejercicios */}
        <Text className="text-black text-md">Ejercicios Seleccionados</Text>
        <FlatList
          data={routine.ejercicios || []}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <View className="flex-1 p-2 bg-gray-200 rounded-lg shadow mb-2">
              <View className="flex-row items-center">
                <Image
                  source={{
                    uri: "../assets/imagenesEjercicios/" + item.imagen,
                  }}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <Text className="text-sm text-black text-balanced">
                  {item.nombre}
                </Text>
                {/*Boton de Eliminar */}
                <Pressable
                  onPress={() => removeExercise(dayKey, item.id)}
                  className="ml-auto"
                >
                  <TrashIcon />
                </Pressable>
              </View>

              <View className="flex-1">
                <View className="flex-row  justify-around mt-2">
                  <View className="flex-col items-center">
                    {/*Spinner  Sets */}
                    <Text>Sets</Text>
                    <InputSpinner
                      max={999}
                      min={1}
                      step={1}
                      onChange={(num) => {
                        updateExercise(item.id, { sets: num });
                        console.log("Sets:", dayKey, item.id, num);
                      }}
                      width={100}
                      skin="clean"
                      buttonStyle={{ height: 30, width: 30 }}
                    />
                  </View>
                  <View className="flex-col items-center">
                    {/*Spinner Reps*/}
                    <Text>Reps</Text>
                    <InputSpinner
                      max={999}
                      min={1}
                      step={1}
                      onChange={(num) => {
                        updateExercise(item.id, { reps: num });
                      }}
                      width={100}
                      skin="clean"
                      buttonStyle={{ height: 30, width: 30 }}
                    />
                  </View>
                  <View className="flex-col items-center">
                    {/*Spinner Reps*/}
                    <Text>Peso(kg)</Text>
                    <InputSpinner
                      max={999}
                      min={0}
                      step={1}
                      onChange={(num) => {
                        updateExercise(item.id, { peso: num });
                      }}
                      width={100}
                      skin="clean"
                      buttonStyle={{ height: 30, width: 30 }}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text className="text-gray-500 text-center mt-4">
              No hay ejercicios seleccionados.
            </Text>
          )}
        />
        <View className="flex-row justify-around">
          <Pressable
            onPress={() =>
              router.push({
                pathname: "exerciseModal",
                params: { dayKey },
              })
            }
            className="bg-green-500 p-4 rounded-lg mt-4 active:bg-green-700"
          >
            <Text className="text-white font-bold text-center">
              Agregar Ejercicio
            </Text>
          </Pressable>
          <Pressable
            onPress={saveRoutine}
            className="bg-amber-500 p-4 rounded-lg mt-4 active:bg-amber-700"
          >
            <Text className="text-white font-bold text-center">
              Guardar Rutina
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <>
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
    </>
  );
}
