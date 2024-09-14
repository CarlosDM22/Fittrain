import { View, Image, Text, ImageSourcePropType } from "react-native";

export default function CardGoal({
  title,
  image,
}: {
  title: string;
  image: any;
}) {
  return (
    <View className="rounded-2xl p-2 border-2 border-gray-300 ">
      <Image
        resizeMode="cover"
        source={{ uri: image }}
        className="w-32 h-32 object-cover rounded-2xl"
      />
      <Text className="text-md font-bold mt-4 text-center text-gray-200">
        {title}
      </Text>
    </View>
  );
}
