import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { supabase } from "@/lib/supabase"; // Asegúrate de tener la configuración de supabase
import { useAuth } from "@/lib/AuthContext"; // Para manejar la autenticación
import { Link } from "expo-router";

// Componente para cada tarjeta de rutina
const RoutineCard = ({ title, reps, sets, description, image, onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {/* Imagen */}
        <Image source={image} style={styles.image} />

        {/* Repeticiones y Sets */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Rep</Text>
            <Text style={styles.infoValue}>{reps}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Set</Text>
            <Text style={styles.infoValue}>{sets}</Text>
          </View>
        </View>

        {/* Descripción */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>Descripción:</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      {/* Botón */}
      <Link href="/descubrir" asChild>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Guardar</Text>
        </Pressable>
      </Link>
    </View>
  );
};

// Componente principal para listar las rutinas
export default function RoutineList() {
  const { session } = useAuth(); // Acceder al contexto de autenticación
  const [loading, setLoading] = useState(false); // Estado de carga

  const routines = [
    {
      title: "Sentadillas",
      reps: 15,
      sets: 3,
      description:
        "Un excelente ejercicio para fortalecer las piernas y glúteos.",
      image: require("@/assets/fuerza.png"),
      ejercicio_id: 26, // Sentadillas
    },
    {
      title: "Flexiones",
      reps: 10,
      sets: 4,
      description: "Trabaja el pecho, hombros y brazos con este ejercicio.",
      image: require("@/assets/fuerza.png"),
      ejercicio_id: 34, // Flexiones
    },
    {
      title: "Burpees",
      reps: 5,
      sets: 5,
      description:
        "Inician con una posición de cuclillas, luego se flexiona y se salta en el aire.",
      image: require("@/assets/fuerza.png"),
      ejercicio_id: 36, // Burpees
    },
  ];

  const handlePress = async (routine) => {
    if (!session || !session.user) {
      Alert.alert("Debe iniciar sesión para guardar el plan y rutina.");
      return;
    }

    try {
      setLoading(true);
      const userId = session.user.id;

      // Crear un nuevo plan
      const nuevoPlan = {
        usuario_id: userId,
        nombre: "Plan Personalizado Sin Equipo",
        descripcion: "Plan diseñado a medida.",
        tipo: "Entrenamiento",
        frecuencia: 3,
        dificultad: "Intermedio",
        dias: "Lunes, Miércoles, Viernes",
      };

      const { data: planData, error: planError } = await supabase
        .from("plan")
        .insert(nuevoPlan)
        .select();

      if (planError) {
        console.error("Error al insertar plan:", planError);
        throw planError;
      }
      const planId = planData[0].id;

      // Crear una nueva rutina
      const nuevaRutina = {
        plan_id: planId,
        dia: "Lunes, Miércoles, Viernes",
        nombre: routine.title,
        descanso_entre_series: 60,
        descanso_entre_ejercicios: 90,
      };

      const { data: rutinaData, error: rutinaError } = await supabase
        .from("rutina")
        .insert(nuevaRutina)
        .select();

      if (rutinaError) {
        console.error("Error al insertar rutina:", rutinaError);
        throw rutinaError;
      }
      const rutinaId = rutinaData[0].id;

      // Crear los ejercicios para la rutina solo con el ejercicio seleccionado
      const rutinaEjercicio = {
        rutina_id: rutinaId,
        ejercicio_id: routine.ejercicio_id, // Usamos el ejercicio_id del botón presionado
        sets: routine.sets,
        reps: routine.reps,
        peso: 0,
      };

      const { error: ejerciciosError } = await supabase
        .from("rutinaejercicios")
        .insert(rutinaEjercicio);

      if (ejerciciosError) {
        console.error("Error al insertar ejercicios:", ejerciciosError);
        throw ejerciciosError;
      }

      console.log("Guardado correctamente!");
      Alert.alert("¡Plan y rutina guardados exitosamente!");
    } catch (error) {
      console.error("Error completo:", error);
      Alert.alert("Error al guardar el plan y la rutina.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rutinas sin Equipo de Gimnasio</Text>
      {routines.map((routine, index) => (
        <RoutineCard
          key={index}
          title={routine.title}
          reps={routine.reps}
          sets={routine.sets}
          description={routine.description}
          image={routine.image}
          onPress={() => handlePress(routine)} // Al presionar, guardamos el plan y rutina
        />
      ))}
      {loading && <Text>Guardando...</Text>}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  infoBox: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  infoText: {
    fontSize: 20,
    color: "#555",
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionBox: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 1,
  },
  description: {
    fontSize: 12,
    color: "#777",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
