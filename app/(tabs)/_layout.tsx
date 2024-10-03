import { useEffect, useState } from "react";
import { useNavigation, Tabs, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase"; // Asegúrate de que esté correctamente configurado
import {
  ProfileIconTab,
  DietIconTab,
  RutinasIconTab,
  StatsIconTab,
  DiscoverIconTab,
} from "@/components/Icons";

// Función para verificar la autenticación del usuario
const isAuthenticated = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data?.session; // Retorna true si el usuario está autenticado
};

export default function TabsLayout() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        setLoading(false);
        //router.replace("/(auth)/login"); // Redirige al login si no está autenticado
      } else {
        setLoading(false); // Si está autenticado, deja de cargar
      }
    };

    checkAuth();
  }, []);

  // Mostrar un spinner mientras se verifica la autenticación
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FFC107" />
      </View>
    );
  }

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
          title: "Estadísticas",
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
