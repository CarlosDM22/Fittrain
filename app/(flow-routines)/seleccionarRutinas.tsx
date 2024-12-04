import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext"; // Importa el contexto de autenticación
import { Link } from "expo-router";

export default function SeleccionarRutinas() {
  const { session } = useAuth(); // Obtiene la sesión desde el contexto

  // Función para crear plan y rutina fácil
  const crearPlanYGuardarRutinaFacil = async () => {
    try {
      if (!session || !session.user) {
        alert("Debes iniciar sesión para crear un plan");
        return;
      }

      const userId = session.user.id;

      const nuevoPlan = {
        usuario_id: userId,
        nombre: "Plan Básico",
        descripcion: "Plan inicial diseñado para principiantes.",
        tipo: "Fuerza",
        frecuencia: 2,
        dificultad: "Fácil",
        dias: "Miércoles, Viernes",
      };

      const { data: planData, error: planError } = await supabase
        .from("plan")
        .insert(nuevoPlan)
        .select();

      if (planError) throw planError;

      const planId = planData[0].id;

      const rutinaFacil = {
        plan_id: planId,
        dia: "Miércoles, Viernes",
        nombre: "Rutina Fácil",
        descanso_entre_series: 60,
        descanso_entre_ejercicios: 90,
      };

      const { data: rutinaData, error: rutinaError } = await supabase
        .from("rutina")
        .insert(rutinaFacil)
        .select();

      if (rutinaError) throw rutinaError;

      const rutinaEjercicios = [
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 3,
          reps: 15,
          peso: 0,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 34,
          sets: 3,
          reps: 12,
          peso: 0,
        },
      ];

      const { error: ejerciciosError } = await supabase
        .from("rutinaejercicios")
        .insert(rutinaEjercicios);

      if (ejerciciosError) throw ejerciciosError;

      alert("¡Plan y rutina Facil guardados exitosamente!");
    } catch (error) {
      alert("Error al guardar el plan y la rutina");
    }
  };

  // Función para crear plan y rutina normal
  const crearPlanYGuardarRutinaNormal = async () => {
    try {
      if (!session || !session.user) {
        alert("Debes iniciar sesión para crear un plan");
        return;
      }

      const userId = session.user.id;

      const nuevoPlan = {
        usuario_id: userId,
        nombre: "Plan Normal",
        descripcion: "Plan diseñado para usuarios intermedios.",
        tipo: "Fuerza",
        frecuencia: 4,
        dificultad: "Normal",
        dias: "Lunes, Miércoles, Viernes, Domingo",
      };

      const { data: planData, error: planError } = await supabase
        .from("plan")
        .insert(nuevoPlan)
        .select();

      if (planError) throw planError;

      const planId = planData[0].id;

      const rutinaNormal = {
        plan_id: planId,
        dia: "Lunes, Miércoles, Viernes, Domingo",
        nombre: "Rutina Normal",
        descanso_entre_series: 45,
        descanso_entre_ejercicios: 75,
      };

      const { data: rutinaData, error: rutinaError } = await supabase
        .from("rutina")
        .insert(rutinaNormal)
        .select();

      if (rutinaError) throw rutinaError;

      const rutinaEjercicios = [
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 4,
          reps: 12,
          peso: 5,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 4,
          reps: 12,
          peso: 10,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 4,
          reps: 10,
          peso: 15,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 4,
          reps: 8,
          peso: 20,
        },
      ];

      const { error: ejerciciosError } = await supabase
        .from("rutinaejercicios")
        .insert(rutinaEjercicios);

      if (ejerciciosError) throw ejerciciosError;

      alert("¡Plan y rutina Normal guardados exitosamente!");
    } catch (error) {
      alert("Error al guardar el plan y la rutina");
    }
  };
  // Crear plan y rutina difícil
  const crearPlanYGuardarRutinaDificil = async () => {
    try {
      if (!session || !session.user) {
        alert("Debes iniciar sesión para crear un plan");
        return;
      }

      const userId = session.user.id;

      const nuevoPlan = {
        usuario_id: userId,
        nombre: "Plan Difícil",
        descripcion: "Plan diseñado para usuarios avanzados.",
        tipo: "Fuerza",
        frecuencia: 5,
        dificultad: "Difícil",
        dias: "Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo",
      };

      const { data: planData, error: planError } = await supabase
        .from("plan")
        .insert(nuevoPlan)
        .select();

      if (planError) throw planError;

      const planId = planData[0].id;

      const rutinaDificil = {
        plan_id: planId,
        dia: "Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo",
        nombre: "Rutina Difícil",
        descanso_entre_series: 30,
        descanso_entre_ejercicios: 60,
      };

      const { data: rutinaData, error: rutinaError } = await supabase
        .from("rutina")
        .insert(rutinaDificil)
        .select();

      if (rutinaError) throw rutinaError;

      const rutinaEjercicios = [
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 5,
          reps: 10,
          peso: 40,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 4,
          reps: 12,
          peso: 50,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 5,
          reps: 10,
          peso: 60,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 5,
          reps: 8,
          peso: 70,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 6,
          reps: 12,
          peso: 30,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 4,
          reps: 8,
          peso: 80,
        },
        {
          rutina_id: rutinaData[0].id,
          ejercicio_id: 26,
          sets: 4,
          reps: 6,
          peso: 100,
        },
      ];

      const { error: ejerciciosError } = await supabase
        .from("rutinaejercicios")
        .insert(rutinaEjercicios);

      if (ejerciciosError) throw ejerciciosError;

      alert("¡Plan y rutina difícil guardados exitosamente!");
    } catch (error) {
      alert("Error al guardar el plan y la rutina difícil");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selección de Rutinas</Text>

      {/* Rutina Fácil */}
      <View style={styles.routineBox}>
        <View style={styles.routineHeader}>
          <Text style={styles.subtitle}>Rutina Fácil</Text>
          <Link href="/descubrir" asChild>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={crearPlanYGuardarRutinaFacil}
            >
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.imageRow2}>
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
        </View>
        <View style={styles.daysContainer}>
          <Text style={styles.day}>lu</Text>
          <Text style={styles.day}>ma</Text>
          <Text style={styles.daySelected}>mi</Text>
          <Text style={styles.day}>ju</Text>
          <Text style={styles.daySelected}>vi</Text>
          <Text style={styles.day}>sa</Text>
          <Text style={styles.day}>do</Text>
        </View>
      </View>

      {/* Rutina Normal */}
      <View style={styles.routineBox}>
        <View style={styles.routineHeader}>
          <Text style={styles.subtitle}>Rutina Normal</Text>
          <Link href="/descubrir" asChild>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={crearPlanYGuardarRutinaNormal}
            >
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.imageRow}>
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
        </View>
        <View style={styles.daysContainer}>
          <Text style={styles.daySelected}>lu</Text>
          <Text style={styles.day}>ma</Text>
          <Text style={styles.daySelected}>mi</Text>
          <Text style={styles.day}>ju</Text>
          <Text style={styles.daySelected}>vi</Text>
          <Text style={styles.day}>sa</Text>
          <Text style={styles.daySelected}>do</Text>
        </View>
      </View>
      {/* Rutina Difícil */}
      <View style={styles.routineBox}>
        <View style={styles.routineHeader}>
          <Text style={styles.subtitle}>Rutina Difícil</Text>
          <Link href="/descubrir" asChild>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={crearPlanYGuardarRutinaDificil}
            >
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.imageRow}>
          {/* Include 7 exercises for the difficult routine */}
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/fuerza.png")}
            style={styles.exerciseImage}
          />
        </View>
        <View style={styles.daysContainer}>
          {/* Days selected in green */}
          <Text style={styles.daySelected}>lu</Text>
          <Text style={styles.daySelected}>ma</Text>
          <Text style={styles.daySelected}>mi</Text>
          <Text style={styles.daySelected}>ju</Text>
          <Text style={styles.daySelected}>vi</Text>
          <Text style={styles.daySelected}>sa</Text>
          <Text style={styles.daySelected}>do</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  routineBox: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    marginBottom: 30,
  },
  routineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#2168f5",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  day: {
    color: "#aaa",
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#444",
    textAlign: "center",
    width: 39,
  },
  daySelected: {
    color: "#fff",
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#5db075",
    textAlign: "center",
    width: 39,
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  imageRow2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 8,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginBottom: 10,
  },
});
