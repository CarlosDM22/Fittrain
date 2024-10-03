import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

export default function Perfiltab() {
  const router = useRouter();
  // Función para cerrar sesión
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);

      console.log("Sesión cerrada exitosamente");
      return true;
    } catch (error: any) {
      console.log("Error al cerrar sesión:", error.message);
      return false;
    }
  };

  // Función manejadora del botón de cerrar sesión
  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      // Redirigir al usuario a la pantalla de login
      router.replace("/(auth)/login");
    } else {
      Alert.alert("Error", "Hubo un problema al cerrar la sesión");
    }
  };
  return (
    <View style={styles.container}>
      <Text>Tab [Pefirl |Settings]</Text>
      <Pressable
        className="bg-amber-500/80 p-4 rounded-2xl m-3"
        onPress={handleSignOut}
      >
        <Text className="text-lg font-bold">Salir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
