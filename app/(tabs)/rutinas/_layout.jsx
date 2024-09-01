import { View, Text, Pressable, Image } from "react-native";
import { CalendarProvider } from "react-native-calendars";
import { CardRoutine } from "@/components/CardRoutine";
import CustomCalendar from "@/components/CustomCalendar";
import { PlusIcon } from "@/components/Icons";
import { Link, Stack } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

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
            backgroundColor: "#fff",
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 20,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#fff",
          },
        }}
      >
        <TopTab.Screen
          name="Rutinas"
          component={CardRoutine}
          options={{ tabBarLabel: "Rutinas" }}
        />
        <TopTab.Screen
          name="Hoy"
          component={screencomponent}
          options={{ tabBarLabel: "Hoy" }}
          tabBarLabelStyle={{ color: "red" }}
        />
        <TopTab.Screen
          name="Mas"
          component={screencomponent}
          options={{ tabBarLabel: "Mas" }}
        />
      </TopTab.Navigator>
    </CalendarProvider>
  );
}
