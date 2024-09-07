import CardGoal from "@/components/CardGoal";
import LargeButton from "@/components/largeButton";
import { Text, View } from "react-native";

export default function GoalSelector() {
  return (
    <View className="flex-1 bg-black justify-center align-center">
      <Text className="text-2xl text-white text-center m-3">
        Cual es tu objetivo
      </Text>
      <View className="flex-1 justify-center">
        <View className=" flex-row flex-wrap justify-center my-3">
          <CardGoal title="Ganar Fuerza" image="./assets/fuerza.png" />
          <CardGoal
            title="Ganar Musculatura"
            image="./assets/musculatura.png"
          />
          <CardGoal title="Perder peso" image="./assets/peso.png" />
          <CardGoal title="Tonificar" image="./assets/peso.png" />
        </View>
      </View>
      <View className="">
        <LargeButton title="Siguiente" ruta="/genderSelector" />
      </View>
    </View>
  );
}
