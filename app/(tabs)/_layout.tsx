// app/(tabs)/_layout.js
import { Tabs } from "expo-router";

import {
  ProfileIconTab,
  DietIconTab,
  RutinasIconTab,
  StatsIconTab,
  DiscoverIconTab,
} from "@/components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#222" },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="rutinas"
        options={{
          title: "Rutinas",
          tabBarLabel: "Rutinas",
          tabBarIcon: () => <RutinasIconTab />,
        }}
      />
      <Tabs.Screen
        name="dietas"
        options={{
          title: "Dietas",
          tabBarIcon: () => <DietIconTab />,
        }}
      />
      <Tabs.Screen
        name="descubrir"
        options={{
          title: "Descubrir",
          tabBarIcon: () => <DiscoverIconTab />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Estadisticas",
          tabBarIcon: () => <StatsIconTab />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: () => <ProfileIconTab />,
        }}
      />
    </Tabs>
  );
}
