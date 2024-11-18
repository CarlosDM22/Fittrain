import {
  FlatList,
  Pressable,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import { PlusIcon } from "@/components/Icons";
import { MinusIcon } from "@/components/Icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute } from "@react-navigation/native";

// Crear el Top Tab Navigator
const Tab = createMaterialTopTabNavigator();

// Componente de contenido de la rutina para cada día
const RoutineTabContent = ({ route }) => {
  const { day } = route.params;
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl text-gray-200">{`s${day}`}</Text>
      {/* Puedes añadir aquí otros componentes como una lista de ejercicios para este día */}
    </View>
  );
};

export default function AddRoutineTwo() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Nueva Rutina" });
  }, [navigation]);

  const route = useRoute();
  const { selectedDays } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "green" },
        tabBarLabelStyle: { color: "white" },
        tabBarStyle: { backgroundColor: "#333" },
      }}
    >
      {selectedDays.map((day) => (
        <Tab.Screen
          key={day}
          name={day}
          component={RoutineTabContent}
          initialParams={{ day }}
        />
      ))}
    </Tab.Navigator>
  );
}
