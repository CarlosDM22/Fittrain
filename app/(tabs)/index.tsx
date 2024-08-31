import ExampleChart from "@/components/chats/ExampleChart";
import { View, Text, StyleSheet } from "react-native";

export default function StatsTab() {
  return (
    <View>
      <ExampleChart />
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
