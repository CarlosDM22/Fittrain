import CardGoal from "@/components/CardGoal";
import LargeButton from "@/components/largeButton";
import { useUserStore } from "@/hooks/userStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const goals: Goal[] = [
  { title: "Ganar Fuerza", image: "./assets/fuerza.png" },
  { title: "Ganar Musculatura", image: "./assets/musculatura.png" },
  { title: "Perder peso", image: "./assets/peso.png" },
  { title: "Tonificar", image: "./assets/tonificar.png" },
];

type Goal = {
  title: string;
  image: string;
};

export default function GoalSelector() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const updateUserData = useUserStore((state) => state.updateUserData);
  const router = useRouter();

  const handleNext = () => {
    console.log(selectedGoal);
    updateUserData("objetivo", selectedGoal?.title);
    // Redirigir a la siguiente pantalla
    router.push("/difficultSelector");
  };
  return (
    <View className="flex-1 bg-black justify-center align-center">
      <Text className="text-2xl text-white text-center m-3">
        Cual es tu objetivo
      </Text>
      <View className="flex-1 justify-center">
        <View className=" flex-row flex-wrap justify-center my-3">
          {goals.map((goal, index) => (
            <Pressable
              className={
                selectedGoal?.title === goal.title
                  ? "bg-gray-700 rounded-2xl m-1"
                  : "bg-black m-1"
              }
              key={index}
              onPress={() => setSelectedGoal(goal)}
            >
              <CardGoal title={goal.title} image={goal.image} />
            </Pressable>
          ))}
        </View>
      </View>
      {/* Botón Siguiente */}
      <View className="flex items-center m-2">
        <View className="flex items-center">
          <Pressable
            className={`${
              selectedGoal ? "bg-amber-500/80" : "bg-gray-500/50"
            } p-6 rounded-2xl m-6 active:bg-amber-700 active:scale-95 transition w-full max-w-2xl`}
            onPress={() => handleNext()}
            disabled={!selectedGoal}
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
