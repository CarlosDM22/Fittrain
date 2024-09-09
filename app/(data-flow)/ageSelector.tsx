import { FlashList } from "@shopify/flash-list";
import { Text, View, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LargeButton from "@/components/largeButton";

const ITEM_WIDTH = 80; // Anchura y altura de cada ítem de la lista

export default function AgeSelector() {
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Crear una lista de edades de 1 a 91 años
  const ageData = Array.from({ length: 91 }, (_, i) => i + 10);

  // Función para manejar el scroll y seleccionar la edad
  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0].item;
      setSelectedAge(visibleItem + 1);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-dark text-2xl text-center mt-4 font-bold">
        Edad
      </Text>
      <View className="flex-grow m-2 p-3 shadow-md bg-white rounded-xl ">
        {/* Whell picker Selector */}
      </View>
      <LargeButton title="Siguiente" ruta="/heightSelector" />
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
  },
});
