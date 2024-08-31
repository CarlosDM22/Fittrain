// Componente similar a CardRoutine pero para recetas (Desayuno-Almuerzo-Cena-Merienda)

import { View, Text, Pressable, Image } from "react-native";
import { PlusIcon } from "../components/Icons";

type Recipe = {
  // define the properties of the Recipe type
  name: string;
  calories: number;
  time: number;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
};

export default function CardRecipe() {
  return (
    <Pressable className="bg-lime-500/60 p-6 rounded-2xl m-3 active:bg-lime-600 active:scale-95 transition">
      <View className="flex-row justify-around items-center">
        <Image source={require("@/assets/favicon.png")} />
        <Text className="text-lg font-bold">Nueva Receta</Text>
        <PlusIcon />
      </View>
    </Pressable>
  );
}
