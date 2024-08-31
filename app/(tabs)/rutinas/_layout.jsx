import { View, Text, Pressable, Image } from "react-native";
import { CalendarProvider } from "react-native-calendars";
import { CardRoutine } from "@/components/CardRoutine";
import CustomCalendar from "@/components/CustomCalendar";
import { PlusIcon } from "@/components/Icons";
import { Link, Stack } from "expo-router";

export default function RutinasLayout() {
  return (
    <CalendarProvider date={"2024-08-23"}>
      <Stack className="flex-1">
        <Stack.Screen
          name="index"
          options={{ title: "Rutinas", headerShown: false }}
        />
        <Stack.Screen
          name="addRoutineOne"
          options={{
            title: "Rutina 1",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="addRoutineTwo"
          options={{
            title: "Rutina 2",
            headerShown: true,
          }}
        />
      </Stack>
    </CalendarProvider>
  );
}
