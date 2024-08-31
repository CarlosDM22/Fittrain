import { View, Text } from "react-native";
import { CalendarProvider } from "react-native-calendars";
import CardRecipe from "@/components/CardRecipe";
import CustomCalendar from "@/components/CustomCalendar";

export default function DietLayout() {
  return (
    <CalendarProvider date={"2022-10-28"}>
      <View className="flex-1" style={{ backgroundColor: "#222" }}>
        <CustomCalendar />
        <Text className="text-xl font-bold text-amber-100 mx-12">Desayuno</Text>
        <CardRecipe />
        <Text className="text-xl font-bold text-amber-100 mx-12">Almuerzo</Text>
        <CardRecipe />
        <Text className="text-xl font-bold text-amber-100 mx-12">Cena</Text>
        <CardRecipe />
      </View>
    </CalendarProvider>
  );
}
