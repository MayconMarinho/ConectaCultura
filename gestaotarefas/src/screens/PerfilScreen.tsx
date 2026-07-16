import React from "react";
import {
  SafeAreaView,
  View,
 Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/footer";

const theme = {
  primary: "#7B2CBF",
  accent: "#00BFA6",
  background: "#F5F6FA",
  card: "#FFFFFF",
  text: "#222222",
  subtitle: "#777777",
};

export default function PerfilScreen() {
  const usuario = {
    nome: "João Pedro da Silva",
    email: "joao.silva@empresa.com",
    setor: "Tecnologia da Informação",
    cargo: "Desenvolvedor Mobile",
    xp: 1450,
    foto:
      "https://i.pravatar.cc/300",
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <Image
          source={{ uri: usuario.foto }}
          style={styles.profileImage}
        />

        <Text style={styles.name}>
          {usuario.nome}
        </Text>

        <Text style={styles.position}>
          {usuario.cargo}
        </Text>

      </View>

      {/* CARD */}

      <View style={styles.card}>

        <View style={styles.infoItem}>

          <Ionicons
            name="business-outline"
            size={24}
            color={theme.primary}
          />

          <View style={styles.infoText}>
            <Text style={styles.label}>
              Setor
            </Text>

            <Text style={styles.value}>
              {usuario.setor}
            </Text>

          </View>

        </View>

        <View style={styles.separator} />

        <View style={styles.infoItem}>

          <Ionicons
            name="briefcase-outline"
            size={24}
            color={theme.primary}
          />

          <View style={styles.infoText}>
            <Text style={styles.label}>
              Cargo
            </Text>

            <Text style={styles.value}>
              {usuario.cargo}
            </Text>

          </View>

        </View>

        <View style={styles.separator} />

        <View style={styles.infoItem}>

          <Ionicons
            name="mail-outline"
            size={24}
            color={theme.primary}
          />

          <View style={styles.infoText}>
            <Text style={styles.label}>
              Email
            </Text>

            <Text style={styles.value}>
              {usuario.email}
            </Text>

          </View>

        </View>

        <View style={styles.separator} />

        <View style={styles.infoItem}>

          <Ionicons
            name="star-outline"
            size={24}
            color={theme.accent}
          />

          <View style={styles.infoText}>
            <Text style={styles.label}>
              XP Total
            </Text>

            <Text style={styles.xp}>
              {usuario.xp} XP
            </Text>

          </View>

        </View>

      </View>

      {/* BOTÕES */}

      <TouchableOpacity style={styles.editButton}>

        <Ionicons
          name="create-outline"
          size={22}
          color="#FFF"
        />

        <Text style={styles.buttonText}>
          Editar Perfil
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>

        <Ionicons
          name="log-out-outline"
          size={22}
          color={theme.primary}
        />

        <Text style={styles.logoutText}>
          Sair
        </Text>

      </TouchableOpacity>

      <Text style={styles.version}>
        Conecta Cultura • ALLTAK
      </Text>

      <Footer />

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
    paddingTop: 55,
    paddingBottom: 50,
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

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#FFF",
    marginBottom: 15,
  },

  name: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
  },

  position: {
    color: "#EAEAEA",
    fontSize: 16,
    marginTop: 5,
  },

  /* ===========================
      CARD
  =========================== */

  card: {
    backgroundColor: theme.card,
    marginHorizontal: 25,
    marginTop: -35,
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

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  infoText: {
    marginLeft: 15,
    flex: 1,
  },

  label: {
    color: theme.subtitle,
    fontSize: 13,
  },

  value: {
    color: theme.text,
    fontSize: 17,
    fontWeight: "600",
    marginTop: 3,
  },

  xp: {
    color: theme.accent,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 3,
  },

  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 8,
  },

  /* ===========================
      BOTÃO EDITAR
  =========================== */

  editButton: {
    marginHorizontal: 25,
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

  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 8,
  },

  /* ===========================
      BOTÃO SAIR
  =========================== */

  logoutButton: {
    marginHorizontal: 25,
    marginTop: 0,
    marginBottom: 25,
    height: 55,

    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.primary,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  logoutText: {
    color: theme.primary,
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 8,
  },

  /* ===========================
      RODAPÉ
  =========================== */

  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 13,
    marginBottom: 20,
  },

});