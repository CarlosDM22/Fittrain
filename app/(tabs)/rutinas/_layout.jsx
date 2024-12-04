import { View, Text, Pressable, Image } from "react-native";
import { CalendarProvider } from "react-native-calendars";
import { CardRoutine } from "@/components/CardRoutine";
import CustomCalendar from "@/components/CustomCalendar";
import { PlusIcon } from "@/components/Icons";
import { usePlanStore } from "@/hooks/usePlanStore";
import { Link, Stack } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PlanList from "@/components/PlanList";

const TopTab = createMaterialTopTabNavigator();

function screencomponent() {
  return <View></View>;
}

export default function RutinasLayout() {
  return (
    <CalendarProvider date={"2024-08-23"}>
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
          name="Rutinas"
          component={PlanList}
          options={{ tabBarLabel: "Rutinas" }}
        />
        <TopTab.Screen
          name="Hoy"
          component={screencomponent}
          options={{ tabBarLabel: "Hoy" }}
          tabBarLabelStyle={{ color: "red" }}
        />
      </TopTab.Navigator>
    </CalendarProvider>
  );
}
