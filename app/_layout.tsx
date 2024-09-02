import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#222" }}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(flow-routines)/addRoutineOne"
            options={{
              headerShown: true,
              title: "Rutinas",
              headerTitle: "Nueva Rutina",
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#222" },
            }}
          />
          <Stack.Screen
            name="(flow-routines)/addRoutineTwo"
            options={{
              headerShown: true,
              title: "Rutinas",
              headerTitle: "Nueva Rutina",
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#222" },
            }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
