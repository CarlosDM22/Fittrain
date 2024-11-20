import React, { useState, useCallback, useEffect } from "react";
import { styled } from "nativewind";
import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import usePlanStore from "@/hooks/usePlanStore";
import { useAuth } from "@/lib/AuthContext";
import { v4 as uuidv4 } from "uuid";

const daysOfWeek: string[] = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

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
  const setTempPlan = usePlanStore((state) => state.setTempPlan);
  const [routineName, setRoutineName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDay = useCallback((day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day]
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Nueva Rutina" });
  }, [navigation]);

  const handleNext = async () => {
    const planid = uuidv4();

    if (!routineName || selectedDays.length === 0) {
      console.log("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true);

    const planData = {
      id: planid,
      nombre: routineName,
      descripcion: description,
      tipo: "Alimentacion",
      frecuencia: selectedDays.length,
      dias: selectedDays.join(","),
      usuario_id: session.user.id,
    };

    setTempPlan(planData); // Guarda la rutina temporal

    console.log(planData);

    router.push("/addRoutineTwo");
  };

  return (
    <View className="flex-1" style={{ backgroundColor: "#222" }}>
      <TextInput
        placeholder="Nombre"
        placeholderTextColor={"white"}
        className="p-3 m-3 border-2 border-white rounded text-white"
        value={routineName}
        onChangeText={setRoutineName}
      />
      <TextInput
        placeholder="Descripción (opcional)"
        placeholderTextColor={"white"}
        className="p-3 m-3 border-2 border-white rounded h-20 text-white"
        value={description}
        onChangeText={setDescription}
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

        <Pressable
          className={`bg-amber-500/80 p-6 rounded-2xl m-3 active:bg-amber-700 active:scale-95 transition ${isLoading ? "opacity-50" : ""}`}
          onPress={handleNext}
          disabled={isLoading}
        >
          <View className="flex-row justify-around items-center">
            <Text className="text-lg font-bold">
              {isLoading ? "Cargando..." : "Siguiente"}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
