import { FlashList } from "@shopify/flash-list";
import { Text, View, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  useEffect(() => {
    console.log(selectedAge); // Verificar el valor actualizado de selectedAge
  }, [selectedAge]);

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-dark text-2xl text-center mt-4 font-bold">
        Edad
      </Text>
      <View className="m-2 p-3 shadow-md bg-white rounded-xl">
        <FlashList
          contentContainerStyle={{ paddingLeft: 70 }}
          horizontal
          data={ageData}
          keyExtractor={(item) => item.toString()}
          estimatedItemSize={ITEM_WIDTH}
          renderItem={({ item }) => (
            <View
              className={`w-[${ITEM_WIDTH}px] h-[${ITEM_WIDTH}px] justify-center items-center border-2 rounded-lg m-3 p-2 ${
                selectedAge === item ? "bg-blue-200" : "bg-white"
              }`}
            >
              <Text
                className={`text-xl ${
                  selectedAge === item ? "font-bold text-2xl" : ""
                }`}
                style={{ width: ITEM_WIDTH / 2, textAlign: "center" }} // Ancho fijo para el texto
              >
                {item}
              </Text>
            </View>
          )}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
          snapToAlignment="center"
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false} // Ocultar scroll horizontal
        />
      </View>
      {/* Indicador en el centro */}
      <View
        style={[
          styles.indicator,
          {
            left: insets.left + width / 2 - ITEM_WIDTH / 2, // Centrar horizontalmente
            top: insets.top + 65, // Ajustar la posición vertical
            height: ITEM_WIDTH, // Altura igual al ítem
            width: ITEM_WIDTH, // Ancho igual al ítem
          },
        ]}
      />
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
