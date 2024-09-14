import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function LargeButton({
  title,
  ruta,
  disabled = false,
}: {
  title: string;
  ruta: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(ruta)}
      style={{
        opacity: disabled ? 0.5 : 1,
      }}
      disabled={disabled}
      className="bg-amber-500/80 p-6 rounded-2xl m-6 active:bg-amber-700 active:scale-95 transition w-full max-w-2xl"
    >
      <View className="flex-row justify-around items-center ">
        <Text className="text-lg font-bold">{title}</Text>
      </View>
    </Pressable>
  );
}
