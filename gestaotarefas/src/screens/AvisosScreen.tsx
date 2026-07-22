import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import Footer from "../components/footer";
import { supabase } from "../services/supabase";

const theme = {
  primary: "#7B2CBF",
  accent: "#00BFA6",
  background: "#F5F6FA",
  card: "#FFFFFF",
  text: "#222222",
  subtitle: "#777777",
};

interface Aviso {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  tag: string;
}

export default function AvisosScreen() {

  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarAvisos() {

    setLoading(true);

    const { data, error } = await supabase
      .from("avisos")
      .select("*")
      .order("data", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setAvisos(data as Aviso[]);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      carregarAvisos();
    }, [])
  );

  function renderIcon(tag: string) {

    switch (tag) {

      case "Informativo":
        return "information-circle-outline";

      case "Urgente":
        return "warning-outline";

      case "Evento":
        return "calendar-outline";

      case "Comunicado":
        return "notifications-outline";

      default:
        return "megaphone-outline";

    }

  }

  function renderBadgeColor(tag: string) {

    switch (tag) {

      case "Informativo":
        return "#7B2CBF";

      case "Urgente":
        return "#EF4444";

      case "Evento":
        return "#00BFA6";

      case "Comunicado":
        return "#2196F3";

      default:
        return "#7B2CBF";

    }

  }

  function formatarData(data: string) {

    return new Date(data).toLocaleDateString("pt-BR");

  }

  const renderItem = ({ item }: { item: Aviso }) => (

    <View style={styles.card}>

      <View style={styles.iconContainer}>

        <Ionicons
          name={renderIcon(item.tag)}
          size={30}
          color={theme.primary}
        />

      </View>

      <View style={styles.info}>

        <Text style={styles.titulo}>
          {item.titulo}
        </Text>

        <Text style={styles.data}>
          {formatarData(item.data)}
        </Text>

        <Text style={styles.descricao}>
          {item.descricao}
        </Text>

        <View style={styles.cardFooter}>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: renderBadgeColor(item.tag),
              },
            ]}
          >

            <Text style={styles.badgeText}>
              {item.tag}
            </Text>

          </View>

        </View>

      </View>

    </View>

  );

    return (

    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

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

        {loading ? (

          <View style={styles.loadingContainer}>

            <ActivityIndicator
              size="large"
              color={theme.primary}
            />

          </View>

        ) : (

          <FlatList
            data={avisos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={

              <View style={styles.emptyContainer}>

                <Ionicons
                  name="notifications-off-outline"
                  size={60}
                  color="#999"
                />

                <Text style={styles.emptyTitle}>
                  Nenhum aviso encontrado
                </Text>

                <Text style={styles.emptyText}>
                  Ainda não existe nenhum aviso publicado.
                </Text>

              </View>

            }
          />

        )}

      </View>

      <Footer />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  content: {
    flex: 1,
  },

  header: {
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
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
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    color: "#EAEAEA",
    marginTop: 5,
    fontSize: 15,
  },

  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 140,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: theme.subtitle,
    textAlign: "center",
    paddingHorizontal: 30,
  },

  card: {
    backgroundColor: theme.card,
    flexDirection: "row",
    borderRadius: 18,
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
    width: 58,
    height: 58,
    borderRadius: 16,
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
    marginTop: 5,
    marginBottom: 10,
    color: theme.subtitle,
    fontSize: 13,
  },

  descricao: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },

  cardFooter: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  badge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },

});