import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext"; // Importa el hook de autenticación
import { supabase } from "@/lib/supabase";

import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";

export default function Perfiltab() {
  const { session } = useAuth(); // Obtiene la sesión desde el contexto
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  // Función para obtener los datos del usuario
  const fetchProfile = async () => {
    try {
      if (!session || !session.user) {
        console.error("Usuario no autenticado o sesión inválida");
        return;
      }

      const userId = session.user.id;
      console.log("Usuario autenticado:", userId);

      const { data, error } = await supabase
        .from("usuario")
        .select(
          "nombre, email, imagen_url, edad, sexo, altura, peso, nivel_actividad, objetivo"
        )
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error al obtener el perfil:", error.message);
    }
  };

  // Cargar el perfil cuando el componente se monta
  useEffect(() => {
    fetchProfile();
  }, [session]); // Se ejecuta cuando cambia la sesión

  // Función para cerrar sesión
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);

      console.log("Sesión cerrada exitosamente");
      return true;
    } catch (error) {
      console.log("Error al cerrar sesión:", error.message);
      return false;
    }
  };

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      router.replace("/(auth)/login");
    } else {
      Alert.alert("Error", "Hubo un problema al cerrar la sesión");
    }
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil del Usuario</Text>

      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={
            require("@/assets/Foto_Perfil/Perfil_PC.png") || {
              uri: profile.imagen_url,
            }
          }
        />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Email: {profile.email}</Text>
          <Text style={styles.infoText}>Edad: {profile.edad}</Text>
          <Text style={styles.infoText}>Sexo: {profile.sexo}</Text>
          <Text style={styles.infoText}>Altura: {profile.altura} m</Text>
          <Text style={styles.infoText}>Peso: {profile.peso} kg</Text>
        </View>
      </View>

      <Text style={styles.name}>{profile.nombre}</Text>

      <View style={styles.goalsContainer}>
        <View style={styles.goal}>
          <Text style={styles.goalText}>Objetivo:</Text>
          <Image
            style={styles.goalImage}
            source={
              require("@/assets/musculatura.png") || {
                uri: "https://via.placeholder.com/60",
              }
            }
          />
          <Text style={styles.goalText}>{profile.objetivo}</Text>
        </View>
        <View style={styles.goal}>
          <Text style={styles.goalText}>Nivel de Actividad:</Text>
          <Image
            style={styles.goalImage}
            source={
              require("@/assets/Foto_Perfil/nivel_medio.png") || {
                uri: "https://via.placeholder.com/60",
              }
            }
          />
          <Text style={styles.goalText}>{profile.nivel_actividad}</Text>
        </View>
      </View>
      {/* Foto extra */}
      <View style={styles.extraImageContainer}>
        <Image
          style={styles.extraImage}
          source={
            require("@/assets/Foto_Perfil/foto_extra.png") || {
              uri: "@/assets/FotoPerfil/foto_extra.png",
            }
          }
        />
      </View>

      <Pressable style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.logoutButtonText}>Salir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  infoContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  goalsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  goal: {
    alignItems: "center",
  },
  goalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 9,
  },
  goalImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "#ccc",
  },
  extraImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  extraImage: {
    width: 200,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  logoutButton: {
    backgroundColor: "#ff6b6b",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
