import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function ModeSelector() {
  const [selectedMode, setSelectedMode] = useState("Mode1");

  const modes = ["Mode1", "Mode2", "Mode3"];

  return (
    <View className="flex-row justify-center m-4 border border-gray-400 rounded-lg overflow-hidden">
      {modes.map((mode, index) => (
        <StyledPressable
          key={mode}
          onPress={() => setSelectedMode(mode)}
          className={`px-5 py-3 flex-1 ${
            selectedMode === mode
              ? "bg-amber-500/80 text-white"
              : "bg-gray-300 text-black"
          } ${index > 0 ? "border-l border-gray-400" : ""}`}
        >
          <Text className="text-center text-xl">{mode}</Text>
        </StyledPressable>
      ))}
    </View>
  );
}
