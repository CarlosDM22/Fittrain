import React, { useState, useCallback } from "react";
import { styled } from "nativewind";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import ModeSelector from "@/components/RoutineModeSelector";

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
    className={`p-4 m-1 rounded-md w-[12%] items-center ${
      isSelected ? "bg-green-600" : "bg-gray-300"
    }`}
  >
    <Text className="text-black text-xl">{day.charAt(0)}</Text>
  </StyledPressable>
));

export default function AddRoutineOne() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Memorización de la función toggleDay para evitar recreaciones innecesarias
  const toggleDay = useCallback((day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day]
    );
  }, []);

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
        <Text className="text-center m-3 text-white">Modo Rutina</Text>
        <View className="flex-row justify-center items-center">
          <ModeSelector />
        </View>
        <Text className="text-center mb-3 text-white">Frecuencia Semanal</Text>
        <View className="flex-row justify-evenly gap-2 m-2">
          {daysOfWeek.map((day) => (
            <DayButton
              key={day}
              day={day}
              isSelected={selectedDays.includes(day)}
              onPress={() => toggleDay(day)}
            />
          ))}
        </View>
        <Link href={"/addRoutineTwo"} asChild>
          <Pressable className="bg-amber-500/80 p-6 rounded-2xl m-3 active:bg-amber-700 active:scale-95 transition">
            <View className="flex-row justify-around items-center">
              <Text className="text-lg font-bold">Siguiente</Text>
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
