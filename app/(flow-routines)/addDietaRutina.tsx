import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Pressable,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import usePlanStore from "@/hooks/usePlanStore";
import useRoutineStore from "@/hooks/useRoutineStore";
import { useRouter } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { TrashIcon } from "@/components/Icons";

export default function AddDietaRutina() {
  const { tempPlan, saveDietsAndRoutines } = usePlanStore();
  const { routines, agregarRutina, removeComidaFromRoutine } =
    useRoutineStore();
  const router = useRouter();
  const layout = Dimensions.get("window");

  const [index, setIndex] = useState(0);
  const [routes] = useState(
    tempPlan?.dias.split(",").map((day) => ({
      key: day.toLowerCase(),
      title: day,
    })) || []
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState(null);

  useEffect(() => {
    routes.forEach((route) => {
      const idRtn = uuidv4();
      const dayKey = route.key;
      if (!routines[dayKey]) {
        agregarRutina(dayKey, {
          idRtn: idRtn,
          dia: dayKey,
          nombre: "Dietas",
          comidas: [],
        });
      }
    });
  }, [routes, routines, agregarRutina]);

  const handleAddComida = (tipo) => {
    const dayKey = routes[index].key; // Obtén el dayKey actual basado en el índice activo
    setSelectedTipo(tipo);
    setShowDropdown(false); // Cierra el dropdown
    router.push({
      pathname: "comidasModal",
      params: { dayKey, tipo },
    });
  };

  const handleRemoveComida = (comida) => {
    const dayKey = routes[index].key; // Obtén el dayKey actual basado en el índice activo
    removeComidaFromRoutine(dayKey, comida);
  };

  const saveRoutine = async () => {
    console.log("Rutinas guardadas con sus Ejercicios y datos:", routines);
    //saveDietsAndRoutines(routines);
    // Llamar a saveTempPlan y pasar las rutinas para que las guarde junto con el plan
  };
  const renderScene = ({ route }) => {
    const dayKey = route.key;
    const routine = routines[dayKey] || {};

    return (
      <View className="flex-1 p-4" style={{ backgroundColor: "#fff" }}>
        <ScrollView className="flex-1">
          <Text className="text-black text-base mb-2 text-center">
            Configuración de Dietas
          </Text>
          {["desayuno", "almuerzo", "cena", "snack"].map((tipo) => {
            // Normaliza el array de comidas
            const comidasNormalizadas = (routine.comidas || []).flat();

            // Filtra las comidas según el tipo
            const comidasPorTipo = comidasNormalizadas.filter(
              (comida) => comida.tipo === tipo
            );

            if (comidasPorTipo.length === 0) return null;

            return (
              <View key={tipo} className="mb-4">
                <Text className="text-lg font-bold text-black capitalize mb-2">
                  {tipo}
                </Text>
                <FlatList
                  data={comidasPorTipo}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View className="flex-1 p-2 bg-gray-200 rounded-lg shadow mb-2">
                      <View className="flex-row items-center">
                        <Image
                          source={{
                            uri: `../assets/imagenesRecetas/${item.imagen}`,
                          }}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <Text className="text-sm text-black">
                          {item.nombre}
                        </Text>
                        <Pressable
                          onPress={() => handleRemoveComida(item.id)}
                          className="ml-auto"
                        >
                          <TrashIcon />
                        </Pressable>
                      </View>
                    </View>
                  )}
                  ListEmptyComponent={() => (
                    <Text className="text-gray-500 text-center mt-4">
                      No hay comidas seleccionadas para {tipo}.
                    </Text>
                  )}
                />
              </View>
            );
          })}
        </ScrollView>

        {/* Botón para mostrar el Dropdown  y Guardar Dieta*/}
        <View className="flex-row mt-4 space-x-4">
          {/* Botón Agregar Comida */}
          <Pressable
            onPress={() => setShowDropdown(true)}
            className="flex-1 bg-green-500 p-4 rounded-lg active:bg-green-700"
          >
            <Text className="text-white font-bold text-center">
              Agregar Comida
            </Text>
          </Pressable>

          {/* Botón Guardar Dieta */}
          <Pressable
            onPress={saveRoutine}
            className="flex-1 bg-blue-500 p-4 rounded-lg active:bg-blue-700"
          >
            <Text className="text-white font-bold text-center">
              Guardar Dieta
            </Text>
          </Pressable>
        </View>
        <Modal visible={showDropdown} transparent animationType="fade">
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white rounded-lg p-6 w-3/4">
              <Text className="text-black text-lg font-bold mb-4">
                Selecciona el tipo de comida
              </Text>
              {["desayuno", "almuerzo", "cena", "snack"].map((tipo) => (
                <Pressable
                  key={tipo}
                  onPress={() => handleAddComida(tipo)}
                  className="p-3 border-b border-gray-300"
                >
                  <Text className="text-black text-center capitalize">
                    {tipo}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                onPress={() => setShowDropdown(false)}
                className="mt-4 bg-gray-300 p-3 rounded-lg"
              >
                <Text className="text-center text-black">Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
