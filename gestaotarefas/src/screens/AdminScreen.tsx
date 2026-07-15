import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/footer";

const theme = {
  primary: "#7B2CBF",
  accent: "#00BFA6",
  background: "#F3F5F7",
  card: "#FFFFFF",
  text: "#222222",
  subtitle: "#666666",
};

export default function AdminScreen({ navigation }: any) {

  /* ===========================
          DADOS MOCKADOS
  =========================== */

  const indicadores = {
    usuarios: 128,
    avisos: 8,
    rotinas: 35,
    xpMedio: 745,
  };

  const grafico = [
    {
      setor: "Produção",
      xp: 95,
    },
    {
      setor: "Packing",
      xp: 78,
    },
    {
      setor: "Picking",
      xp: 90,
    },
    {
      setor: "Shipping",
      xp: 60,
    },
  ];

  /* ===========================
            ESTADOS
  =========================== */

  const [usuario] = useState({
    nome: "Maycon Marinho",
    cargo: "Administrador",
  });

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* ===========================
                HEADER
        =========================== */}

        <View style={styles.header}>

          <Image
            source={require("../../assets/logoprov.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            Painel Administrativo
          </Text>

          <Text style={styles.subtitle}>
            Bem-vindo,
          </Text>

          <Text style={styles.userName}>
            {usuario.nome}
          </Text>

          <Text style={styles.userRole}>
            {usuario.cargo}
          </Text>

        </View>

        {/* ===========================
              INDICADORES
        =========================== */}

        <View style={styles.cardsContainer}>

          {/* Usuários */}

          <View style={styles.card}>

            <Ionicons
              name="people-outline"
              size={34}
              color="#7B2CBF"
            />

            <Text style={styles.cardValue}>
              {indicadores.usuarios}
            </Text>

            <Text style={styles.cardTitle}>
              Usuários
            </Text>

          </View>

          {/* Avisos */}

          <View style={styles.card}>

            <Ionicons
              name="notifications-outline"
              size={34}
              color="#2196F3"
            />

            <Text style={styles.cardValue}>
              {indicadores.avisos}
            </Text>

            <Text style={styles.cardTitle}>
              Avisos
            </Text>

          </View>

        </View>

        <View style={styles.cardsContainer}>

          {/* Rotinas */}

          <View style={styles.card}>

            <Ionicons
              name="clipboard-outline"
              size={34}
              color="#4CAF50"
            />

            <Text style={styles.cardValue}>
              {indicadores.rotinas}
            </Text>

            <Text style={styles.cardTitle}>
              Rotinas
            </Text>

          </View>

          {/* XP Médio */}

          <View style={styles.card}>

            <Ionicons
              name="star-outline"
              size={34}
              color="#FF9800"
            />

            <Text style={styles.cardValue}>
              {indicadores.xpMedio}
            </Text>

            <Text style={styles.cardTitle}>
              XP Médio
            </Text>

          </View>

        </View>

                {/* ===========================
                GRÁFICO
        =========================== */}

        <View style={styles.chartContainer}>

          <Text style={styles.sectionTitle}>
            XP Médio por Setor
          </Text>

          {grafico.map((item, index) => (

            <View
              key={index}
              style={styles.chartItem}
            >

              <View style={styles.chartHeader}>

                <Text style={styles.chartLabel}>
                  {item.setor}
                </Text>

                <Text style={styles.chartValue}>
                  {item.xp}%
                </Text>

              </View>

              <View style={styles.chartBackground}>

                <View
                  style={[
                    styles.chartFill,
                    {
                      width: `${item.xp}%`,
                    },
                  ]}
                />

              </View>

            </View>

          ))}

        </View>

        {/* ===========================
            MENU ADMINISTRATIVO
        =========================== */}

        <Text style={styles.sectionTitle}>
          Gerenciamento
        </Text>

        {/* Usuários */}

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() =>
            navigation.navigate("GerenciarUsuarios")
          }
        >

          <View style={styles.menuLeft}>

            <Ionicons
              name="people-outline"
              size={28}
              color={theme.primary}
            />

            <Text style={styles.menuText}>
              Gerenciar Usuários
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#999"
          />

        </TouchableOpacity>

        {/* Avisos */}

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() =>
            navigation.navigate("GerenciarAvisos")
          }
        >

          <View style={styles.menuLeft}>

            <Ionicons
              name="notifications-outline"
              size={28}
              color="#2196F3"
            />

            <Text style={styles.menuText}>
              Gerenciar Avisos
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#999"
          />

        </TouchableOpacity>

        {/* Rotinas */}

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() =>
            navigation.navigate("GestaoRotinas")
          }
        >

          <View style={styles.menuLeft}>

            <Ionicons
              name="clipboard-outline"
              size={28}
              color="#4CAF50"
            />

            <Text style={styles.menuText}>
              Gestão de Rotinas
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#999"
          />

        </TouchableOpacity>

        {/* ===========================
            BOTÃO SAIR
        =========================== */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() =>
            navigation.replace("Login")
          }
        >

          <Ionicons
            name="log-out-outline"
            size={26}
            color="#FFFFFF"
          />

          <Text style={styles.logoutText}>
            Encerrar Sessão
          </Text>

        </TouchableOpacity>

        {/* Espaço para o Footer */}

        <View
          style={{
            height: 120,
          }}
        />

      </ScrollView>

      <Footer />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  /* ===========================
      HEADER
  =========================== */

  header: {
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 55,
    paddingBottom: 40,
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
    width: 100,
    height: 100,
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    marginTop: 12,
    fontSize: 15,
    color: "#F2F2F2",
  },

  userName: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 2,
  },

  userRole: {
    fontSize: 15,
    color: "#E5E5E5",
    marginTop: 3,
  },

  /* ===========================
      CARDS
  =========================== */

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginTop: 18,
  },

  card: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: "center",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  cardValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.text,
    marginTop: 10,
  },

  cardTitle: {
    marginTop: 5,
    fontSize: 15,
    color: theme.subtitle,
    fontWeight: "600",
  },

  /* ===========================
      SEÇÕES
  =========================== */

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
  },

  /* ===========================
      GRÁFICO
  =========================== */

  chartContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginTop: 20,
    borderRadius: 18,
    padding: 18,

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  chartItem: {
    marginBottom: 18,
  },

  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  chartLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.text,
  },

  chartValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: theme.primary,
  },

  chartBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#ECECEC",
    borderRadius: 50,
  },

  chartFill: {
    height: 10,
    backgroundColor: theme.accent,
    borderRadius: 50,
  },

  /* ===========================
      MENU
  =========================== */

  menuButton: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginBottom: 15,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 14,
    fontSize: 17,
    fontWeight: "600",
    color: theme.text,
  },

  /* ===========================
      LOGOUT
  =========================== */

  logoutButton: {
    backgroundColor: "#D32F2F",
    marginHorizontal: 18,
    marginTop: 25,
    borderRadius: 16,
    paddingVertical: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});