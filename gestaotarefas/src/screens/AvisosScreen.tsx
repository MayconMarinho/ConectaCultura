import Footer from "../components/footer";

import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const theme = {
  primary: "#7B2CBF",
  accent: "#00BFA6",
  background: "#F5F6FA",
  card: "#FFFFFF",
  text: "#222222",
  subtitle: "#777777",
};

/*
=============================================
FUTURAMENTE

Substituir esta lista pelos dados vindos
do banco MySQL.

Exemplo:

const [avisos, setAvisos] = useState([]);

useEffect(() => {
   fetch("http://SEU_IP/api/listarAvisos.php")
      .then((response) => response.json())
      .then((data) => setAvisos(data));
}, []);

=============================================
*/

const avisos = [
  {
    id: "1",
    titulo: "Treinamento de Segurança",
    descricao:
      "Treinamento obrigatório para os colaboradores do setor Produção.",
    data: "10/07/2026",
    categoria: "Treinamento",
  },
  {
    id: "2",
    titulo: "Reunião Geral",
    descricao:
      "Reunião para apresentação dos resultados do semestre.",
    data: "18/07/2026",
    categoria: "Reunião",
  },
  {
    id: "3",
    titulo: "Campanha do Agasalho",
    descricao:
      "Doe roupas e cobertores até o dia 30 de julho.",
    data: "20/07/2026",
    categoria: "Campanha",
  },
  {
    id: "4",
    titulo: "Aniversariantes do Mês",
    descricao:
      "Confira os aniversariantes de julho e deixe sua mensagem.",
    data: "01/07/2026",
    categoria: "Comunicado",
  },
];

export default function AvisosScreen() {
  const renderIcon = (categoria: string) => {
    switch (categoria) {
      case "Treinamento":
        return "school-outline";

      case "Reunião":
        return "people-outline";

      case "Campanha":
        return "megaphone-outline";

      default:
        return "notifications-outline";
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>

      <View style={styles.iconContainer}>

        <Ionicons
          name={renderIcon(item.categoria)}
          size={30}
          color={theme.primary}
        />

      </View>

      <View style={styles.info}>

        <Text style={styles.titulo}>
          {item.titulo}
        </Text>

        <Text style={styles.data}>
          {item.data}
        </Text>

        <Text style={styles.descricao}>
          {item.descricao}
        </Text>

        <View style={styles.footer}>

          <Ionicons
            name="pricetag-outline"
            size={16}
            color={theme.accent}
          />

          <Text style={styles.categoria}>
            {item.categoria}
          </Text>

        </View>

      </View>

    </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      {/* Cabeçalho */}

      <View style={styles.header}>

        <Image
          source={require("../../assets/logoprov.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Avisos
        </Text>

        <Text style={styles.subtitle}>
          Comunicados Internos
        </Text>

      </View>

      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

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
      LISTA
  =========================== */

  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  /* ===========================
      CARD
  =========================== */

  card: {
    flexDirection: "row",
    backgroundColor: theme.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
  },

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#F2E9FC",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
  },

  data: {
    fontSize: 13,
    color: theme.subtitle,
    marginTop: 4,
    marginBottom: 10,
  },

  descricao: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  categoria: {
    marginLeft: 6,
    color: theme.accent,
    fontWeight: "600",
    fontSize: 14,
  },
});