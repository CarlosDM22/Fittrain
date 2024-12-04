import { View, Text } from "react-native";
import { CalendarProvider } from "react-native-calendars";
import CardRecipe from "@/components/CardRecipe";
import CustomCalendar from "@/components/CustomCalendar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DietaList from "@/components/DietaList";

const TopTab = createMaterialTopTabNavigator();

function DietasHoy() {
  return (
    <View className="flex-1" style={{ backgroundColor: "#222" }}>
      <Text className="text-xl font-bold text-amber-100 mx-12">Desayuno</Text>
      <CardRecipe />
      <Text className="text-xl font-bold text-amber-100 mx-12">Almuerzo</Text>
      <CardRecipe />
      <Text className="text-xl font-bold text-amber-100 mx-12">Cena</Text>
      <CardRecipe />
    </View>
  );
}

export default function DietLayout() {
  return (
    <CalendarProvider date={"2022-10-28"}>
      <View className="flex-1" style={{ backgroundColor: "#222" }}>
        <CustomCalendar />
        <TopTab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#222",
            },
            tabBarLabelStyle: {
              fontSize: 16,
              color: "#fff",
            },
            tabBarIndicatorStyle: {
              backgroundColor: "#fff",
            },
          }}
        >
          <TopTab.Screen
            name="Dietas"
            component={DietaList}
            options={{ tabBarLabel: "Dietas" }}
          />
          <TopTab.Screen
            name="Hoy"
            component={DietasHoy}
            options={{ tabBarLabel: "Hoy" }}
            tabBarLabelStyle={{ color: "red" }}
          />
        </TopTab.Navigator>
      </View>
    </CalendarProvider>
  );
}
