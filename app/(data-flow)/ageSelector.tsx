import { FlashList } from "@shopify/flash-list";
import { Text, View, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LargeButton from "@/components/largeButton";
import WheelPicker from "@quidone/react-native-wheel-picker";

export default function AgeSelector() {
  const [selectedAge, setSelectedAge] = useState(0);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Crear una lista de edades de 10 a 120 años
  const ageOptions = [...Array(120).keys()].map((index) => ({
    value: index,
    label: index.toString(),
  }));

  return (
    <View
      className="flex-1 justify-between p-4"
      style={{ backgroundColor: "#222" }}
    >
      <Text className="text-dark text-2xl text-center mt-4 font-bold">
        Edad
      </Text>
      <View className="flex items-center justify-center">
        {/* TODO:  Modo de seleccion de peso kg o lbs */}
        <Text className="text-2xl text-center text-gray-200">
          {selectedAge}
          {" Años"}
        </Text>
      </View>
      <View className="flex flex-row  items-center justify-center m-2 p-3  rounded-xl ">
        {/* Whell picker Selector */}
        <WheelPicker
          key={ageOptions.length}
          data={ageOptions}
          value={selectedAge}
          itemHeight={50}
          width={200}
          itemTextStyle={{
            fontSize: 20,
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          onValueChanged={({ item: { value } }) => setSelectedAge(value)}
        />
      </View>
      <View className="flex items-center">
        <LargeButton title="Siguiente" ruta="/heightSelector" />
      </View>
    </View>
  );
}
