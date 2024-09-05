import {
  FlatList,
  Pressable,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import { PlusIcon } from "@/components/Icons";
import { MinusIcon } from "@/components/Icons";
import React, { useState } from "react";

const exercises = [
  {
    name: "Push-ups",
    description: "Do 20 push-ups.",
    reps: 20,
    sets: 3,
    image: require("@/assets/favicon.png"),
  },
  {
    name: "Squats",
    description: "Perform 15 squats. ",
    reps: 15,
    sets: 3,
    image: require("@/assets/favicon.png"),
  },
  {
    name: "Lunges",
    description: "Complete 10 lunges per leg.",
    reps: 10,
    sets: 3,
    image: require("@/assets/favicon.png"),
  },
];
function Exercise({ name, reps, sets, image }: any) {
  const [currentReps, setCurrentReps] = useState(String(reps));
  const [currentSets, setCurrentSets] = useState(String(sets));

  const increaseReps = () => setCurrentReps(String(Number(currentReps) + 1));
  const decreaseReps = () =>
    setCurrentReps(String(Math.max(Number(currentReps) - 1, 0)));
  const increaseSets = () => setCurrentSets(String(Number(currentSets) + 1));
  const decreaseSets = () =>
    setCurrentSets(String(Math.max(Number(currentSets) - 1, 0)));

  return (
    <View className="flex-row items-center p-2 bg-white rounded-lg shadow mb-2">
      <Image
        source={image}
        className="w-16 h-16 mr-4 border border-gray-300 rounded-lg"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <View className="flex-row justify-evenly mt-2">
          <View className="flex-row items-center">
            <Pressable
              onPress={decreaseReps}
              className="mr-1 px-1 border rounded"
            >
              <MinusIcon />
            </Pressable>
            <TextInput
              value={currentReps}
              onChangeText={(text) =>
                setCurrentReps(text.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              className="text-sm border border-gray-300  px-2 py-1 rounded w-12 text-center"
            />
            <Pressable
              onPress={increaseReps}
              className="ml-1 px-1 border rounded"
            >
              <PlusIcon />
            </Pressable>
          </View>
          <View className="flex-row items-center">
            <Pressable
              onPress={decreaseSets}
              className="mr-1 px-1 border rounded bg-amber-500/70"
            >
              <MinusIcon />
            </Pressable>
            <TextInput
              value={currentSets}
              onChangeText={(text) =>
                setCurrentSets(text.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              className="text-sm px-2 py-1 rounded w-12 text-center border border-gray-300 "
            />
            <Pressable
              onPress={increaseSets}
              className="ml-1 px-1 border  rounded"
            >
              <PlusIcon />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function AddRoutineTwo() {
  return (
    <View className="flex-1 bg-white">
      <Text className="text-xl font-bold text-center">Ejercicios</Text>
      <View className="bg-gray-500 rounded-2xl p-4 mx-3 shadow-inner min-h-[80%]">
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <Exercise
              name={item.name}
              reps={item.reps}
              sets={item.sets}
              image={"@/assets/favicon.png"}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
      <Pressable className="bg-amber-500/80 p-6 rounded-2xl m-3 active:bg-amber-700 active:scale-95 transition">
        <View className="flex-row justify-around items-center">
          <Text className="text-lg font-bold">Siguiente</Text>
        </View>
      </Pressable>
    </View>
  );
}
