import { View, Text, Button, Pressable, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import CustomCalendar from "@/components/CustomCalendar";
import { PlusIcon } from "@/components/Icons";

export default function Rutinas() {
  return (
    <View>
      <Link href="rutinas/addRoutineOne" asChild>
        <Pressable className="bg-amber-500/80 p-6 rounded-2xl m-3 active:bg-amber-700 active:scale-95 transition">
          <View className="flex-row justify-around items-center">
            <Image source={require("@/assets/favicon.png")} />
            <Text className="text-lg font-bold">Nueva Rutina</Text>
            <PlusIcon />
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
