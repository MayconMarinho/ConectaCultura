import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const theme = {
  primary: "#7B2CBF",
  accent: "#00BFA6",
  background: "#F5F6FA",
  card: "#FFFFFF",
  text: "#222222",
  subtitle: "#777777",
};

export default function CadastroScreen({ navigation }: any) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState("Produção");
  const [cargo, setCargo] = useState("Operador");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {/* Cabeçalho */}

        <View style={styles.header}>

          <Image
            source={require("../../assets/logoprov.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            Criar Conta
          </Text>

          <Text style={styles.subtitle}>
            Conecta Cultura • ALLTAK
          </Text>

        </View>

        {/* Card */}

        <View style={styles.card}>

          {/* Nome */}

          <Text style={styles.label}>
            Nome Completo
          </Text>

          <View style={styles.inputContainer}>

            <Ionicons
              name="person-outline"
              size={22}
              color={theme.primary}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />

          </View>

          {/* Email */}

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
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

          </View>

          {/* Matrícula */}

          <Text style={styles.label}>
            Matrícula
          </Text>

          <View style={styles.inputContainer}>

            <Ionicons
              name="card-outline"
              size={22}
              color={theme.primary}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite sua matrícula"
              placeholderTextColor="#999"
              value={matricula}
              onChangeText={setMatricula}
            />

          </View>

          {/* CPF */}

          <Text style={styles.label}>
            CPF
          </Text>

          <View style={styles.inputContainer}>

            <Ionicons
              name="id-card-outline"
              size={22}
              color={theme.primary}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={cpf}
              onChangeText={setCpf}
            />

          </View>

          {/* Setor */}

          <Text style={styles.label}>
  Setor
</Text>

<View style={styles.pickerContainer}>

  <Ionicons
    name="business-outline"
    size={22}
    color={theme.primary}
    style={{ marginLeft: 15 }}
  />

  <Picker
    selectedValue={setor}
    style={styles.picker}
    onValueChange={(itemValue) => setSetor(itemValue)}
  >
    <Picker.Item label="Produção" value="Produção" />
    <Picker.Item label="Logística" value="Logística" />
    <Picker.Item label="Expedição" value="Expedição" />
    <Picker.Item label="Qualidade" value="Qualidade" />
    <Picker.Item label="Administrativo" value="Administrativo" />
  </Picker>

</View>

{/* Cargo */}

<Text style={styles.label}>
  Cargo
</Text>

<View style={styles.pickerContainer}>

  <Ionicons
    name="briefcase-outline"
    size={22}
    color={theme.primary}
    style={{ marginLeft: 15 }}
  />

  <Picker
    selectedValue={cargo}
    style={styles.picker}
    onValueChange={(itemValue) => setCargo(itemValue)}
  >
    <Picker.Item label="Operador" value="Operador" />
    <Picker.Item label="Líder" value="Líder" />
    <Picker.Item label="Supervisor" value="Supervisor" />
    <Picker.Item label="Gerente" value="Gerente" />
    <Picker.Item label="Administrador" value="Administrador" />
  </Picker>

</View>

          {/* Senha */}

          <Text style={styles.label}>
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
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
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

          {/* Confirmar Senha */}

          <Text style={styles.label}>
            Confirmar Senha
          </Text>

          <View style={styles.inputContainer}>

            <Ionicons
              name="lock-closed-outline"
              size={22}
              color={theme.primary}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              placeholderTextColor="#999"
              secureTextEntry={!mostrarConfirmacao}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />

            <TouchableOpacity
              onPress={() =>
                setMostrarConfirmacao(
                  !mostrarConfirmacao
                )
              }
            >

              <Ionicons
                name={
                  mostrarConfirmacao
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={22}
                color="#777"
              />

            </TouchableOpacity>

          </View>

          {/* Botão */}

          <TouchableOpacity
            style={styles.registerButton}
          >

            <Ionicons
              name="person-add-outline"
              size={22}
              color="#FFF"
            />

            <Text style={styles.registerButtonText}>
              Cadastrar
            </Text>

          </TouchableOpacity>

          {/* Login */}

          <View style={styles.loginContainer}>

            <Text style={styles.loginLabel}>
              Já possui uma conta?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Login")
              }
            >

              <Text style={styles.loginText}>
                Entrar
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  scroll: {
    paddingBottom: 40,
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
      CARD
  =========================== */

  card: {
    backgroundColor: theme.card,
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 22,
    padding: 22,

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
  },

  /* ===========================
      LABELS
  =========================== */

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.text,
    marginBottom: 8,
    marginTop: 15,
  },

  /* ===========================
      INPUTS
  =========================== */

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
      BOTÃO
  =========================== */

  registerButton: {
    backgroundColor: theme.primary,
    height: 55,
    borderRadius: 15,
    marginTop: 30,

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

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },

  /* ===========================
      LOGIN
  =========================== */

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },

  loginLabel: {
    color: theme.subtitle,
    fontSize: 15,
  },

  loginText: {
    color: theme.primary,
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },

  /* ===========================
      Seleção de Setor
  =========================== */

  pickerContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F4F4F4",
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#DDDDDD",
  height: 55,
},

picker: {
  flex: 1,
  color: theme.text,
},
});

  