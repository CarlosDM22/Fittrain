import React from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";

export default function SeleccionarDietas() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selección de Alimentacion</Text>

      {/* Dieta Fácil */}
      <View style={styles.DietaBox}>
        <View style={styles.DietaHeader}>
          <Text style={styles.subtitle}>Dieta Fácil</Text>
          {/* Boton para guardar */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.imageRow2}>
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
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

      {/* Dieta Normal */}
      <View style={styles.DietaBox}>
        <View style={styles.DietaHeader}>
          <Text style={styles.subtitle}>Dieta Normal</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageRow}>
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
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

      {/* Dieta Difícil */}
      <View style={styles.DietaBox}>
        <View style={styles.DietaHeader}>
          <Text style={styles.subtitle}>Rutina Difícil</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageRow}>
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
          <Image
            source={require("@/assets/Plato_de_comida.png")}
            style={styles.exerciseImage}
          />
        </View>
        <View style={styles.daysContainer}>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  DietaBox: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    marginBottom: 30,
  },
  DietaHeader: {
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
