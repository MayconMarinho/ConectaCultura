import { View, Text, StyleSheet } from "react-native";
import Footer from "../components/footer";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Avisos</Text>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});