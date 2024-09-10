import LargeButton from "@/components/largeButton";
import { Text, View } from "react-native";

export default function WeightSelector() {
  return (
    <View
      className="flex-1 justify-between p-4"
      style={{ backgroundColor: "#222" }}
    >
      <View className="flex items-center mt-6">
        <Text className="text-2xl font-bold text-gray-200">
          ¿Cuál es tu peso?
        </Text>
      </View>

      <View className="flex-grow">
        {/* TODO: Implementar selector de pesos */}
      </View>
      <View className="flex items-center">
        <LargeButton title="Siguiente" ruta="/goalSelector" />
      </View>
    </View>
  );
}
