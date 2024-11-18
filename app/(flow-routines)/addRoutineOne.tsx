import React, { useState, useCallback, useEffect } from "react";
import { styled } from "nativewind";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link, useNavigation } from "expo-router";
import usePlanStore from "@/hooks/usePlanStore";
import { useAuth } from "@/lib/AuthContext";

const daysOfWeek: string[] = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

// Tipos para las props del componente DayButton
type DayButtonProps = {
  day: string;
  isSelected: boolean;
  onPress: () => void;
};

const StyledPressable = styled(Pressable);

const DayButton = React.memo(({ day, isSelected, onPress }: DayButtonProps) => (
  <StyledPressable
    onPress={onPress}
    className={`p-4 m-2 rounded-md w-auto items-center ${
      isSelected ? "bg-green-600" : "bg-gray-300"
    }`}
  >
    <Text className="text-black text-xl">{day.charAt(0)}</Text>
  </StyledPressable>
));

export default function AddRoutineOne() {
  const { session } = useAuth();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipoEntrenamiento, setTiempoEntrenamiento] = useState("");
  const [frecuencia, setFrecuencia] = useState(0);
  const [days, setDays] = useState<string[]>([]);

  const handleAddPlan = () => {
    const newPlan = {
      usuario_id: session.user.id, // ID del usuario
      nombre: "",
      descripcion: "Plan para mejorar fuerza",
      tipo: "entrenamiento",
      frecuencia: 3,
      dias: "Lunes, Miércoles, Viernes",
    };

    addPlan(newPlan);

    const newRoutine = {
      plan_id: newPlan.id,
      dia: "Lunes",
      nombre: "Rutina de fuerza",
      descanso_entre_series: 60,
      descanso_entre_ejercicios: 90,
    };

    addRoutine(newRoutine);
  };
  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const addPlan = usePlanStore((state) => state.addPlan);
  const addRoutine = usePlanStore((state) => state.addRoutine);

  // Memorización de la función toggleDay para evitar recreaciones innecesarias
  const toggleDay = useCallback((day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day]
    );
  }, []);

  // Establecer las opciones de navegación una vez que el componente se monta
  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Nueva Rutina" });
  }, [navigation]);

  return (
    <View className="flex-1" style={{ backgroundColor: "#222" }}>
      <TextInput
        placeholder="Nombre"
        placeholderTextColor={"white"}
        className="p-3 m-3 border-2 border-white rounded text-white"
      />
      <TextInput
        placeholder="Descripción (opcional)"
        placeholderTextColor={"white"}
        className="p-3 m-3 border-2 border-white rounded h-20 text-white"
      />

      <View>
        <Text className="text-center mb-3 text-white">Frecuencia Semanal</Text>
        <View className="flex-row flex-wrap gap-2 m-2 ">
          {daysOfWeek.map((day) => (
            <DayButton
              key={day}
              day={day}
              isSelected={selectedDays.includes(day)}
              onPress={() => toggleDay(day)}
            />
          ))}
        </View>

        <Pressable className="bg-amber-500/80 p-6 rounded-2xl m-3 active:bg-amber-700 active:scale-95 transition">
          <View className="flex-row justify-around items-center">
            <Text className="text-lg font-bold">Siguiente</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
