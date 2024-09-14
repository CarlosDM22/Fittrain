import CardGoal from "@/components/CardGoal";
import LargeButton from "@/components/largeButton";
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
      <View className="flex items-center">
        <LargeButton
          title="Siguiente"
          ruta="/genderSelector"
          disabled={!selectedGoal}
        />
      </View>
    </View>
  );
}
