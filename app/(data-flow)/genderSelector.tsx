import LargeButton from "@/components/largeButton";
import { styled } from "nativewind";
import { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

type Gender = "hombre" | "mujer" | "otro";

export default function GenderSelector() {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const { width } = useWindowDimensions();
  const GenderOption = styled(Pressable);

  return (
    <View className="flex-1 bg-black justify-center">
      <Text className="text-white text-center font-bold text-3xl my-4">
        Seleccione su Genero
      </Text>

      {/* Primera fila: Hombre y Mujer */}
      <View className="flex items-center">
        <View className="flex-row w-full justify-evenly mb-4 max-w-3xl">
          <GenderOption
            className={`flex-1 mx-2 items-center p-4 rounded-lg max-w-md border-2 border-gray-300 ${
              selectedGender === "hombre"
                ? "bg-gray-100 text-dark" // Fondo gris claro si está seleccionado
                : "" // Sin fondo si no está seleccionado
            }`}
            onPress={() => setSelectedGender("hombre")}
          >
            <Image
              className="rounded-2xl"
              source={{ uri: "./assets/Genero1.jpg" }} // Reemplaza por la imagen de hombre
              style={{
                width: width * 0.4,
                height: width * 0.4,
                maxWidth: 200,
                maxHeight: 300,
              }}
              resizeMode="cover"
            />
            <Text
              className={`text-lg font-bold mt-2 ${
                selectedGender === "hombre" ? "text-dark" : "text-white"
              }`}
            >
              Hombre
            </Text>
          </GenderOption>

          <GenderOption
            className={`flex-1 mx-2 items-center p-4 rounded-lg max-w-md border-2 border-gray-300 ${
              selectedGender === "mujer"
                ? "bg-gray-100" // Fondo gris claro si está seleccionado
                : "" // Sin fondo si no está seleccionado
            }`}
            onPress={() => setSelectedGender("mujer")}
          >
            <Image
              className="rounded-2xl"
              source={{ uri: "./assets/Genero2.jpg" }} // Reemplaza por la imagen de mujer
              style={{
                width: width * 0.4,
                height: width * 0.4,
                maxWidth: 200,
                maxHeight: 300,
              }}
            />
            <Text
              className={`text-lg font-bold mt-2 ${
                selectedGender === "mujer" ? "text-black" : "text-white"
              }`}
            >
              Mujer
            </Text>
          </GenderOption>
        </View>
      </View>

      {/* Segunda fila: Otros */}
      <View className="flex items-center m-2">
        <GenderOption
          className={`w-full p-4 rounded-lg max-w-3xl border-2 border-gray-300 ${
            selectedGender === "otro"
              ? "bg-gray-100" // Fondo gris claro si está seleccionado
              : "" // Sin fondo si no está seleccionado
          }`}
          onPress={() => setSelectedGender("otro")}
        >
          <Text
            className={`text-lg font-bold text-center ${
              selectedGender === "otro" ? "text-black" : "text-white"
            }`}
          >
            Otros
          </Text>
        </GenderOption>
      </View>

      {/* Botón Siguiente */}
      <View className="flex items-center m-2">
        <LargeButton
          title="Siguiente"
          ruta="/difficultSelector"
          disabled={!selectedGender}
        />
      </View>
    </View>
  );
}
