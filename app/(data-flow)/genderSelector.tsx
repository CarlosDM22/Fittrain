import { Image, Pressable, Text, View } from "react-native";

export default function GenderSelector() {
  return (
    <View className="flex-1 bg-black justify-center">
      <Text className="text-white text-center font-bold text-3xl my-4">
        Seleccione su Genero
      </Text>
      <View className="flex-row mx-3 my-4 space-x-3 justify-around">
        <View className="bg-black-200 overflow-hidden rounded border-2 border-white w-auto">
          <Image
            source={require("@/assets/Genero1.jpg")}
            resizeMode="cover"
            style={{ width: 145, height: 280 }}
          />
          <Text className="text-white text-center font-bold text-xl my-4 w-auto">
            Hombre
          </Text>
        </View>
        <View className="bg-black-200 overflow-hidden rounded border-2 border-white">
          <Image
            source={require("@/assets/Genero2.jpg")}
            style={{ width: 145, height: 280 }}
            resizeMode="cover"
            resizeMethod="auto"
          />
          <Text className="text-white text-center font-bold text-xl my-4">
            Mujer
          </Text>
        </View>
      </View>
      <View className="flex-row fbg-black-200 p-2 rounded border-2 border-white mx-3 ">
        <Text className="text-white text-center font-bold text-xl my-4">
          Prefiero no Decirlo
        </Text>
      </View>

      <Pressable className="bg-amber-500/80 p-6 rounded-2xl m-3 active:bg-amber-700 active:scale-95 transition">
        <View className="flex-row justify-around items-center">
          <Text className="text-lg font-bold">Siguiente</Text>
        </View>
      </Pressable>
    </View>
  );
}
