import ExampleChart from "@/components/chats/ExampleChart";
import ProgressChart from "@/components/Grafico_Prueba";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatsTab() {
  const data1 = [
    { x: "Lu", y: 15 },
    { x: "Ma", y: 60 },
    { x: "Mi", y: 30 },
    { x: "Ju", y: 70 },
    { x: "Vi", y: 25 },
    { x: "Sa", y: 80 },
    { x: "Do", y: 12 },
  ];

  const data2 = [
    { x: "Lu", y: 30 },
    { x: "Ma", y: 100 },
    { x: "Mi", y: 50 },
    { x: "Ju", y: 35 },
    { x: "Vi", y: 10 },
    { x: "Sá", y: 40 },
    { x: "Do", y: 0 },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1">
        <ProgressChart title="Gráfico de Ejercicios por Día" data={data1} />

        <ProgressChart
          title="Gráfico de Peso por Día"
          data={data2}
          // Puedes ajustar el tamaño también
        />
      </View>
    </SafeAreaView>
  );
}
