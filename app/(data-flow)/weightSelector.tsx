import LargeButton from "@/components/largeButton";
import { useUserStore } from "@/hooks/userStore";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const weightOptions = [...Array(200).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}));

const decimalOptions = [...Array(10).keys()].map((index) => ({
  value: index / 10,
  label: index.toString(), // Formatea el número con un decimal
}));

export default function WeightSelector() {
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedDecimal, setSelectedDecimal] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const updateUserData = useUserStore((state) => state.updateUserData);
  const router = useRouter();

  const handleNext = () => {
    console.log(totalWeight);
    updateUserData("peso", totalWeight);
    // Redirigir a la siguiente pantalla
    router.push("/heightSelector");
  };

  // Actualiza el total del peso cada vez que cambian los valores
  useEffect(() => {
    setTotalWeight(selectedWeight + selectedDecimal);
  }, [selectedWeight, selectedDecimal]);

  return (
    <View
      className="flex-1 justify-between p-4"
      style={{ backgroundColor: "#222" }}
    >
      <View className="flex items-center mt-6">
        <Text className="text-xl font-bold text-gray-200">
          ¿Cuál es tu peso?
        </Text>
      </View>
      <View className="flex items-center justify-center">
        {/* TODO:  Modo de seleccion de peso kg o lbs */}
        <Text className="font-sans text-4xl text-center text-gray-200">
          {totalWeight}
          {" kg"}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-center">
        <View className="flex items-center mr-2">
          <WheelPicker
            key={weightOptions.length}
            data={weightOptions}
            value={selectedWeight}
            itemHeight={50}
            width={50}
            itemTextStyle={{
              fontSize: 20,
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onValueChanged={({ item: { value } }) => setSelectedWeight(value)}
          />
        </View>
        <View className="flex items-center justify-top">
          <Text className="text-2xl text-center text-black font-bold">.</Text>
        </View>
        <View className="flex items-center ml-2">
          <WheelPicker
            key={decimalOptions.length}
            data={decimalOptions}
            value={selectedDecimal}
            itemHeight={50}
            width={50}
            itemTextStyle={{
              fontSize: 20,
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onValueChanged={({ item: { value } }) => setSelectedDecimal(value)}
          />
        </View>
      </View>

      {/* Botón Siguiente */}
      <View className="flex items-center m-2">
        <View className="flex items-center">
          <Pressable
            className={`${
              totalWeight ? "bg-amber-500/80" : "bg-gray-500/50"
            } p-6 rounded-2xl m-6 active:bg-amber-700 active:scale-95 transition w-full max-w-2xl`}
            onPress={() => handleNext()}
            disabled={!totalWeight}
          >
            <Text className="text-lg font-bold text-center text-white">
              Siguiente
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
