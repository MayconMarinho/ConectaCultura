import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const theme = {
  primary: "#7B2CBF",
  accent: "#00BFA6",
  background: "#F5F6FA",
  card: "#FFFFFF",
  text: "#222222",
  subtitle: "#777777",
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      {/* Topo */}

      <View style={styles.header}>

        <Image
          source={require("../../assets/logoprov.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Conecta Cultura
        </Text>

        <Text style={styles.subtitle}>
          Engajamento e Comunicação Interna
        </Text>

      </View>

      {/* Card */}

      <View style={styles.card}>

        <Text style={styles.label}>
          Email
        </Text>

        <View style={styles.inputContainer}>

          <Ionicons
            name="mail-outline"
            size={22}
            color={theme.primary}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>
          Senha
        </Text>

        <View style={styles.inputContainer}>

          <Ionicons
            name="lock-closed-outline"
            size={22}
            color={theme.primary}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />

          <TouchableOpacity
            onPress={() =>
              setMostrarSenha(!mostrarSenha)
            }
          >

            <Ionicons
              name={
                mostrarSenha
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#777"
            />

          </TouchableOpacity>

        </View>

        {/* Esqueci senha */}

        <TouchableOpacity
          style={styles.forgotContainer}
        >

          <Text style={styles.forgotText}>
            Esqueci minha senha
          </Text>

        </TouchableOpacity>

        {/* Botão */}

        <TouchableOpacity
          style={styles.loginButton}
        >

          <Ionicons
            name="log-in-outline"
            size={22}
            color="#FFF"
          />

          <Text style={styles.loginText}>
            Entrar
          </Text>

        </TouchableOpacity>

        {/* Cadastro */}

        <View style={styles.registerContainer}>

          <Text style={styles.registerLabel}>
            Não possui uma conta?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Cadastro")
            }
          >

            <Text style={styles.registerText}>
              Cadastre-se
            </Text>

          </TouchableOpacity>

        </View>

      </View>

      {/* Rodapé */}

      <Text style={styles.version}>
        Conecta Cultura • ALLTAK
      </Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "space-between",
  },

  /* ===========================
      HEADER
  =========================== */

  header: {
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 45,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 15,
    color: "#EAEAEA",
    marginTop: 6,
  },

  /* ===========================
      CARD LOGIN
  =========================== */

  card: {
    backgroundColor: theme.card,
    marginHorizontal: 25,
    marginTop: -30,
    borderRadius: 20,
    padding: 25,

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.text,
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
    marginLeft: 10,
  },

  /* ===========================
      ESQUECI SENHA
  =========================== */

  forgotContainer: {
    alignSelf: "flex-end",
    marginTop: 15,
  },

  forgotText: {
    color: theme.primary,
    fontWeight: "600",
    fontSize: 14,
  },

  /* ===========================
      BOTÃO LOGIN
  =========================== */

  loginButton: {
    marginTop: 30,
    backgroundColor: theme.primary,
    height: 55,
    borderRadius: 16,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
  },

  loginText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8,
  },

  /* ===========================
      CADASTRO
  =========================== */

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  registerLabel: {
    color: theme.subtitle,
    fontSize: 15,
  },

  registerText: {
    color: theme.primary,
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 5,
  },

  /* ===========================
      RODAPÉ
  =========================== */

  version: {
    textAlign: "center",
    color: "#999999",
    fontSize: 13,
    marginBottom: 20,
  },
});