import LargeButton from "@/components/largeButton";
import { useUserStore } from "@/hooks/userStore";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const weightOptions = [...Array(200).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}));

export default function HeightSelector() {
  const [selectedHeight, setSelectedHeight] = useState(0);

  const updateUserData = useUserStore((state) => state.updateUserData);
  const router = useRouter();

  const handleNext = () => {
    updateUserData("altura", selectedHeight);
    // Redirigir a la siguiente pantalla
    router.push("/goalSelector");
  };

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

      {/* Botón Siguiente */}
      <View className="flex items-center m-2">
        <View className="flex items-center">
          <Pressable
            className={`${
              selectedHeight ? "bg-amber-500/80" : "bg-gray-500/50"
            } p-6 rounded-2xl m-6 active:bg-amber-700 active:scale-95 transition w-full max-w-2xl`}
            onPress={() => handleNext()}
            disabled={!selectedHeight}
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
