import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
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
  gold: "#F5C542",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
};

const usuario = {
  nome: "Maycon Marinho",
  cargo: "Líder de Produção",
  xpHoje: 180,
  xpMes: 3250,
};

const setores = [
  "Geral",
  "Produção",
  "Logística",
  "Expedição",
  "Qualidade",
  "Manutenção",
  "Administrativo",
];

const ranking = [
  { id: 1, nome: "Maycon Marinho", setor: "Produção", xp: 3250 },
  { id: 2, nome: "João Pedro", setor: "Produção", xp: 3010 },
  { id: 3, nome: "Carlos Henrique", setor: "Produção", xp: 2875 },
  { id: 4, nome: "Lucas Silva", setor: "Logística", xp: 2780 },
  { id: 5, nome: "Ana Paula", setor: "Expedição", xp: 2705 },
  { id: 6, nome: "Maria Souza", setor: "Qualidade", xp: 2610 },
  { id: 7, nome: "Pedro Oliveira", setor: "Produção", xp: 2480 },
  { id: 8, nome: "Fernanda Lima", setor: "Administrativo", xp: 2350 },
  { id: 9, nome: "José Santos", setor: "Logística", xp: 2240 },
  { id: 10, nome: "Juliana Costa", setor: "Qualidade", xp: 2150 },
];

export default function RankingScreen() {

  {/*Filtra os usuários com base no setor selecionado*/}
  const [setorSelecionado, setSetorSelecionado] = useState("Geral");

  const rankingFiltrado =
    setorSelecionado === "Geral"
      ? ranking
      : ranking.filter(
          (item) => item.setor === setorSelecionado
        );

  {/*Ordena o ranking filtrado por XP em ordem decrescente (Top 3)*/}
  const top3 = rankingFiltrado.slice(0, 3);

  {/*Tudo aqui será exibido na tela*/}
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* Cabeçalho */}
  {/* Cabeçalho da tela, com título, subtítulo e ícone de perfil */}
        <View style={styles.header}>

          <View>

            <Text style={styles.title}>
              Ranking
            </Text>

            <Text style={styles.subtitle}>
              Conecta Cultura • ALLTAK
            </Text>

          </View>

          <TouchableOpacity>

            <Ionicons
              name="person-circle"
              size={48}
              color={theme.primary}
            />

          </TouchableOpacity>

        </View>


        {/* Cards XP */}
        
        {/*Cards que mostram o XP do usuário hoje e no mês, com ícones representativos*/}
        <View style={styles.cardsContainer}>


        {/* Card XP Hoje */}
          <View style={styles.cardXP}>

            <Ionicons
              name="flash"
              size={28}
              color={theme.accent}
            />

            <Text style={styles.cardLabel}>
              XP Hoje
            </Text>

            <Text style={styles.cardValue}>
              {usuario.xpHoje}
            </Text>

         {/*Card XP Mês*/}
          </View>

          <View style={styles.cardXP}>

            <Ionicons
              name="star"
              size={28}
              color={theme.gold}
            />

            <Text style={styles.cardLabel}>
              XP do Mês
            </Text>

            <Text style={styles.cardValue}>
              {usuario.xpMes}
            </Text>

          </View>

        </View>

        
        {/* Perfil */}

        {/*Exibe as informações do usuário logado, incluindo avatar, nome e cargo*/}
        <View style={styles.profileContainer}>

          <Image
            source={{
              uri:
                "",
            }}
            style={styles.avatar}
          />

          <Text style={styles.userName}>
            {usuario.nome}
          </Text>

          <Text style={styles.userRole}>
            {usuario.cargo}
          </Text>

        </View>

        {/* Filtro */}
       {/*Exibe os botões de filtro para selecionar o setor desejado, permitindo filtrar o ranking por setor    */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >

          {setores.map((setor) => (

            <TouchableOpacity
              key={setor}
              style={[
                styles.filterButton,
                setorSelecionado === setor &&
                  styles.filterButtonSelected,
              ]}
              onPress={() =>
                setSetorSelecionado(setor)
              }
            >

              <Text
                style={[
                  styles.filterText,
                  setorSelecionado === setor &&
                    styles.filterTextSelected,
                ]}
              >
                {setor}
              </Text>

            </TouchableOpacity>

          ))}

        </ScrollView>

        {/* Pódio */}
       {/*Exibe o pódio com os três primeiros colocados do ranking, mostrando suas posições, nomes e XP*/}
        <Text style={styles.sectionTitle}>
          🏆 Top 3
        </Text>

        <View style={styles.podiumContainer}>

          {/* Segundo */}

          <View style={styles.secondPlace}>

            <View
              style={[
                styles.medal,
                {
                  backgroundColor:
                    theme.silver,
                },
              ]}
            >
              <Text style={styles.medalText}>
                2
              </Text>
            </View>

            <Text style={styles.podiumName}>
              {top3[1]?.nome ?? "-"}
            </Text>

            <Text style={styles.podiumXP}>
              {top3[1]?.xp ?? 0} XP
            </Text>

          </View>

          {/* Primeiro */}

          <View style={styles.firstPlace}>

            <Ionicons
              name="trophy"
              size={34}
              color={theme.gold}
            />

            <View
              style={[
                styles.medal,
                {
                  backgroundColor:
                    theme.gold,
                },
              ]}
            >
              <Text style={styles.medalText}>
                1
              </Text>
            </View>

            <Text style={styles.podiumName}>
              {top3[0]?.nome ?? "-"}
            </Text>

            <Text style={styles.podiumXP}>
              {top3[0]?.xp ?? 0} XP
            </Text>

          </View>

          {/* Terceiro */}

          <View style={styles.thirdPlace}>

            <View
              style={[
                styles.medal,
                {
                  backgroundColor:
                    theme.bronze,
                },
              ]}
            >
              <Text style={styles.medalText}>
                3
              </Text>
            </View>

            <Text style={styles.podiumName}>
              {top3[2]?.nome ?? "-"}
            </Text>

            <Text style={styles.podiumXP}>
              {top3[2]?.xp ?? 0} XP
            </Text>

          </View>

        </View>

                {/* Ranking Geral */}
        {/*Exibe a classificação geral do ranking, mostrando a posição, nome, setor e XP de cada usuário*/}
        <Text style={styles.sectionTitle}>
          Classificação Geral
        </Text>

        <View style={styles.rankingContainer}>

          {rankingFiltrado.map((item, index) => {

            const usuarioLogado =
              item.nome === usuario.nome;

            return (

              <View
                key={item.id}
                style={[
                  styles.rankingItem,
                  usuarioLogado &&
                    styles.myRankingItem,
                ]}
              >

                {/* Posição */}

                <View style={styles.positionContainer}>

                  <Text
                    style={styles.positionText}
                  >
                    {index + 1}º
                  </Text>

                </View>

                {/* Avatar */}

                <Ionicons
                  name="person-circle"
                  size={42}
                  color={
                    usuarioLogado
                      ? theme.primary
                      : "#999"
                  }
                />

                {/* Informações */}

                <View style={styles.userInfo}>

                  <Text
                    style={[
                      styles.userItemName,
                      usuarioLogado && {
                        color: theme.primary,
                      },
                    ]}
                  >
                    {item.nome}
                  </Text>

                  <Text style={styles.userSector}>
                    {item.setor}
                  </Text>

                </View>

                {/* XP */}

                <View style={styles.xpContainer}>

                  <Ionicons
                    name="flash"
                    size={18}
                    color={theme.accent}
                  />

                  <Text style={styles.xpText}>
                    {item.xp}
                  </Text>

                </View>

              </View>

            );

          })}

        </View>

      </ScrollView>

      {/* Footer */}

      <Footer />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: theme.text,
  },

  subtitle: {
    fontSize: 15,
    color: theme.subtitle,
    marginTop: 4,
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  cardXP: {
    backgroundColor: theme.card,
    width: "48%",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
  },

  cardLabel: {
    fontSize: 14,
    color: theme.subtitle,
    marginTop: 10,
  },

  cardValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: theme.text,
    marginTop: 5,
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: theme.primary,
  },

  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.text,
    marginTop: 12,
  },

  userRole: {
    fontSize: 15,
    color: theme.subtitle,
    marginTop: 3,
  },

  filterContainer: {
    paddingLeft: 20,
    marginBottom: 30,
  },

  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#EAEAEA",
    borderRadius: 25,
    marginRight: 10,
  },

  filterButtonSelected: {
    backgroundColor: theme.primary,
  },

  filterText: {
    color: "#555",
    fontWeight: "600",
  },

  filterTextSelected: {
    color: "#FFF",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.text,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  podiumContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    marginBottom: 40,
    paddingHorizontal: 10,
  },

  firstPlace: {
    alignItems: "center",
    width: 120,
  },

  secondPlace: {
    alignItems: "center",
    width: 100,
    marginTop: 35,
  },

  thirdPlace: {
    alignItems: "center",
    width: 100,
    marginTop: 60,
  },

  medal: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  medalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },

  podiumName: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
    textAlign: "center",
  },

  podiumXP: {
    fontSize: 13,
    color: theme.subtitle,
    marginTop: 4,
  },

  rankingContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },

  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
  },

  myRankingItem: {
    borderWidth: 2,
    borderColor: theme.primary,
    backgroundColor: "#F4EDFF",
  },

  positionContainer: {
    width: 45,
    alignItems: "center",
  },

  positionText: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.primary,
  },

  userInfo: {
    flex: 1,
    marginLeft: 12,
  },

  userItemName: {
    fontSize: 17,
    fontWeight: "700",
    color: theme.text,
  },

  userSector: {
    fontSize: 14,
    color: theme.subtitle,
    marginTop: 2,
  },

  xpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  xpText: {
    fontSize: 17,
    fontWeight: "700",
    color: theme.text,
    marginLeft: 6,
  },
});