import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/footer";

const theme = {
  primary: "#7B2CBF",
  secondary: "#9D4EDD",
  accent: "#00BFA6",
  background: "#F3F5F7",
  card: "#FFFFFF",
  text: "#222222",
  subtitle: "#666666",
  border: "#E5E7EB",
};

interface Aviso {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  status: "Ativo" | "Expirado";
  imagem: string;
}

export default function GerenciarAvisosScreen({ navigation }: any) {

  const [modalAvisos, setModalAvisos] = useState(false);

  const [pesquisaAviso, setPesquisaAviso] = useState("");

  const [avisos, setAvisos] = useState<Aviso[]>([
  {
    id: 1,
    titulo: "Treinamento de Segurança",
    descricao:
      "Treinamento obrigatório para todos os colaboradores da unidade. Compareça no auditório às 14h.",
    data: "12/07/2026",
    status: "Ativo",
    imagem: "",
  },
  {
    id: 2,
    titulo: "Campanha do Agasalho",
    descricao:
      "Doe roupas e cobertores em bom estado até o final do mês e participe da campanha solidária.",
    data: "10/07/2026",
    status: "Ativo",
    imagem: "",
  },
  {
    id: 3,
    titulo: "Reunião Geral",
    descricao:
      "Reunião mensal para apresentação dos resultados e alinhamento das metas do próximo ciclo.",
    data: "05/07/2026",
    status: "Expirado",
    imagem: "",
  },
]);

  const avisosFiltrados = avisos.filter((aviso) =>
    aviso.titulo
      .toLowerCase()
      .includes(pesquisaAviso.toLowerCase())
  );

  const excluirAviso = (id: number) => {
    Alert.alert(
      "Excluir Aviso",
      "Deseja realmente excluir este aviso?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setAvisos((prev) =>
              prev.filter((item) => item.id !== id)
            );
          },
        },
      ]
    );
  };

  return (

<SafeAreaView
    style={styles.container}
    edges={["top"]}
>

<View style={styles.content}>

    {/* Cabeçalho */}
    <View style={styles.header}>
      <TouchableOpacity
    onPress={() => navigation.goBack()}
>
    <Ionicons
        name="arrow-back"
        size={26}
        color={theme.primary}
    />
</TouchableOpacity>

      <Text style={styles.title}>
        Gerenciar Avisos
      </Text>

      <View style={{ width: 26 }} />
    </View>

    {/* Pesquisa */}
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#999"
      />

      <TextInput
        placeholder="Pesquisar aviso..."
        placeholderTextColor="#999"
        value={pesquisaAviso}
        onChangeText={setPesquisaAviso}
        style={styles.searchInput}
      />
    </View>

    {/* Botão Novo Aviso */}
    <TouchableOpacity
      style={styles.newButton}
      onPress={() => setModalAvisos(true)}
    >
      <Ionicons
        name="add-circle"
        size={22}
        color="#FFF"
      />

      <Text style={styles.newButtonText}>
        Novo Aviso
      </Text>
    </TouchableOpacity>

    {/* Lista */}
    <FlatList
    style={{ flex: 1 }}
    data={avisosFiltrados}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
    paddingBottom: 140,
}}
      renderItem={({ item }) => (

        <View style={styles.card}>

          {/* Imagem */}
          <View style={styles.imagePlaceholder}>
            {item.imagem ? (
              <Image
                source={{ uri: item.imagem }}
                style={styles.image}
              />
            ) : (
              <Ionicons
                name="image-outline"
                size={40}
                color="#999"
              />
            )}
          </View>

          {/* Conteúdo */}
          <View style={styles.info}>

            <Text style={styles.cardTitle}>
              {item.titulo}
            </Text>

            <Text style={styles.description}>
  {item.descricao}
</Text>

            <Text style={styles.date}>
              Publicado em {item.data}
            </Text>

            <View
              style={[
                styles.status,
                item.status === "Ativo"
                  ? styles.active
                  : styles.expired,
              ]}
            >
              <Text style={styles.statusText}>
                {item.status}
              </Text>
            </View>

            <View style={styles.buttons}>

              <TouchableOpacity style={styles.editButton}>
                <Ionicons
                  name="create-outline"
                  size={18}
                  color="#FFF"
                />

                <Text style={styles.buttonText}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => excluirAviso(item.id)}
              >
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color="#FFF"
                />

                <Text style={styles.buttonText}>
                  Excluir
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      )}
    />

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
    paddingHorizontal: 20,
    paddingTop: 20,
},

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.primary,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: theme.text,
  },

  newButton: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  newButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: theme.border,
    flexDirection: "row",
    elevation: 3,
  },

  imagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  info: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
  },

  date: {
    marginTop: 5,
    color: theme.subtitle,
    fontSize: 14,
  },

  status: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15,
  },

  active: {
    backgroundColor: "#D1FAE5",
  },

  expired: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontWeight: "600",
    fontSize: 13,
    color: theme.text,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editButton: {
    flex: 1,
    backgroundColor: theme.secondary,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 8,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 8,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 6,
  },

  description: {
  fontSize: 14,
  color: theme.subtitle,
  marginTop: 6,
  marginBottom: 8,
  lineHeight: 20,
},
});