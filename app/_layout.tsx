import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // Asegúrate de tener configurado Supabase
import { Session } from "@supabase/supabase-js";
import { AuthProvider } from "@/lib/AuthContext";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  NativeWindStyleSheet.setOutput({
    default: "native",
  });

  // Verificar el estado de la sesión al cargar la aplicación
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        // Si no hay sesión, redirigir al login
        router.replace("/(auth)/login");
        return null;
      }
    };

    checkSession();

    // Monitorear cambios en la sesión de Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);

        if (!session) {
          router.replace("/(auth)/login");
          return;
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#222" }}>
        <StatusBar style="light" />
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              headerStyle: { backgroundColor: "#222" },
              headerTintColor: "#fff",
            }}
          >
            {session ? (
              <>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="(flow-routines)" />
              </>
            ) : (
              <Stack.Screen
                name="(auth)/login"
                options={{ headerShown: false }}
              />
            )}
          </Stack>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
