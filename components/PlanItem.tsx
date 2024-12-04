import React from "react";
import { View, Text, Image, Pressable } from "react-native";

export default function PlanItem({ plan, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow mb-2"
    >
      <View className="flex-1 mr-4">
        <Text className="text-lg font-bold text-black">{plan.nombre}</Text>
        <Text className="text-sm text-gray-600">{plan.descripcion}</Text>
      </View>
      <Image
        source={{ uri: plan.imagen || "https://via.placeholder.com/50" }}
        className="w-12 h-12 rounded-full"
      />
    </Pressable>
  );
}
