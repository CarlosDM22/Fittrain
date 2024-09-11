import LargeButton from "@/components/largeButton";
import WheelPicker from "@quidone/react-native-wheel-picker";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

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

      <View className="flex items-center">
        <LargeButton title="Siguiente" ruta="/goalSelector" />
      </View>
    </View>
  );
}
