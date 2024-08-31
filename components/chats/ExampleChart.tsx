import { Pressable, View, Text, Image } from "react-native";
import { PlusIcon } from "../Icons";

export default function ExampleChart() {
  return (
    <Pressable className="bg-lime-500/60 p-6 rounded-2xl m-3">
      <View className="flex-row justify-around items-center">
        <Image source={require("@/assets/favicon.png")} />
        <Text className="text-lg font-bold">Grafico</Text>
        <PlusIcon />
      </View>
    </Pressable>
  );
}
