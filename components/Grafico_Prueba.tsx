import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

const ProgressChart = ({ title, data, height, width, label }) => {
  return (
    <View style={styles.container} accessibilityHint="Grafico">
      {/* Título dinámico */}
      <Text style={styles.title}>{title}</Text>

      <View style={styles.chartContainer}>
        <VictoryChart
          domainPadding={{ x: 60 }}
          theme={VictoryTheme.material}
          width={width || Dimensions.get("window").width - 10} // Si no se pasa un width, usa el de la pantalla
          height={height || Dimensions.get("window").height / 3} // Si no se pasa un height, usa un valor predeterminado
        >
          {/* Eje Y */}
          <VictoryAxis
            dependentAxis
            label={label || "Progreso"}
            domain={[0, 100]}
            tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            tickFormat={(tick) => `${tick}`}
            style={{
              axisLabel: {
                padding: 39,
                fontSize: 12,
              },
              ticks: {
                padding: 10,
              },
            }}
          />
          {/* Eje X */}
          <VictoryAxis />
          <VictoryAxis
            label="Semanas"
            style={{
              axisLabel: { padding: 30, fontSize: 12 },
            }}
          />
          {/* Barras */}
          <VictoryBar
            data={data}
            alignment="middle"
            style={{
              data: { fill: "#4b7bec", stroke: "#ffffff", strokeWidth: 1 },
            }}
            barWidth={30}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default ProgressChart;
