import { View, Text, StyleSheet } from "react-native";
import TelaDeBusca from "../../Components/Busca/TelaDeBusca";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { TextInput } from "react-native";

export default function Busca() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <TelaDeBusca />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECDCCC",
  },
});
