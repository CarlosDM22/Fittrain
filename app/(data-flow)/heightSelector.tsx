import LargeButton from "@/components/largeButton";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { useState } from "react";
import { Text, View } from "react-native";

const weightOptions = [...Array(200).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}));

export default function HeightSelector() {
  const [selectedHeight, setSelectedHeight] = useState(0);
  return (
    <View
      className="flex-1 justify-between p-4"
      style={{ backgroundColor: "#222" }}
    >
      <View className="flex items-center mt-6">
        <Text className="text-xl font-bold text-gray-200">
          ¿Cuál es tu Estatura?
        </Text>
      </View>
      <View className="flex items-center justify-center">
        {/* TODO:  Modo de seleccion de peso kg o lbs */}
        <Text className="font-sans text-4xl text-center text-gray-200">
          {selectedHeight}
          {" kg"}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-center">
        <View className="flex items-center">
          <WheelPicker
            key={weightOptions.length}
            data={weightOptions}
            value={selectedHeight}
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
            onValueChanged={({ item: { value } }) => setSelectedHeight(value)}
          />
        </View>
      </View>

      <View className="flex items-center">
        <LargeButton title="Siguiente" ruta="/goalSelector" />
      </View>
    </View>
  );
}
