import React, { useCallback, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import Footer from "../components/footer";
import { supabase } from "../services/supabase";

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
  tag: string;
}

const tags = [
  "Informativo",
  "Urgente",
  "Evento",
  "Comunicado",
];

export default function GerenciarAvisosScreen({
  navigation,
}: any) {
  const [pesquisaAviso, setPesquisaAviso] = useState("");

  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalEditar, setModalEditar] = useState(false);
  const [avisoSelecionado, setAvisoSelecionado] =
    useState<Aviso | null>(null);

  const [tituloEdit, setTituloEdit] = useState("");
  const [descricaoEdit, setDescricaoEdit] = useState("");
  const [tagEdit, setTagEdit] = useState("");

  const [salvando, setSalvando] = useState(false);

  /*
   * Retorna a cor correspondente a cada tag.
   * Essas são as mesmas cores utilizadas na tela de avisos.
   */
  function corTag(tag: string) {
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

  /*
   * Formata a data recebida do Supabase.
   */
  function formatarData(data: string) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  /*
   * Busca os avisos cadastrados no Supabase.
   */
  async function carregarAvisos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("avisos")
      .select("*")
      .order("data", {
        ascending: false,
      });

    if (error) {
      console.log("Erro ao carregar avisos:", error);

      Alert.alert(
        "Erro",
        "Não foi possível carregar os avisos."
      );

      setLoading(false);
      return;
    }

    setAvisos(data ?? []);
    setLoading(false);
  }

  /*
   * Atualiza a lista sempre que o usuário entra nesta tela.
   */
  useFocusEffect(
    useCallback(() => {
      carregarAvisos();
    }, [])
  );

  /*
   * Filtra os avisos pelo título, descrição ou tag.
   */
  const avisosFiltrados = avisos.filter((aviso) => {
    const pesquisa = pesquisaAviso.trim().toLowerCase();

    return (
      aviso.titulo.toLowerCase().includes(pesquisa) ||
      aviso.descricao.toLowerCase().includes(pesquisa) ||
      aviso.tag.toLowerCase().includes(pesquisa)
    );
  });

  /*
   * Abre o modal e preenche os campos com os dados do aviso.
   */
  function abrirEditar(aviso: Aviso) {
    setAvisoSelecionado(aviso);
    setTituloEdit(aviso.titulo);
    setDescricaoEdit(aviso.descricao);
    setTagEdit(aviso.tag);
    setModalEditar(true);
  }

  /*
   * Fecha o modal e limpa os campos de edição.
   */
  function fecharModalEditar() {
    if (salvando) {
      return;
    }

    setModalEditar(false);
    setAvisoSelecionado(null);
    setTituloEdit("");
    setDescricaoEdit("");
    setTagEdit("");
  }

  /*
   * Salva as alterações do aviso no Supabase.
   */
  async function salvarEdicao() {
    if (
      tituloEdit.trim() === "" ||
      descricaoEdit.trim() === "" ||
      tagEdit.trim() === ""
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha o título, a descrição e selecione uma tag."
      );

      return;
    }

    if (!avisoSelecionado) {
      Alert.alert(
        "Erro",
        "Nenhum aviso foi selecionado."
      );

      return;
    }

    setSalvando(true);

    const { error } = await supabase
      .from("avisos")
      .update({
        titulo: tituloEdit.trim(),
        descricao: descricaoEdit.trim(),
        tag: tagEdit,
      })
      .eq("id", avisoSelecionado.id);

    setSalvando(false);

    if (error) {
      console.log("Erro ao atualizar aviso:", error);

      Alert.alert(
        "Erro",
        "Não foi possível atualizar o aviso."
      );

      return;
    }

    fecharModalEditar();
    await carregarAvisos();

    Alert.alert(
      "Sucesso",
      "Aviso atualizado com sucesso."
    );
  }

  /*
   * Exclui o aviso selecionado.
   */
  function confirmarExclusao(aviso: Aviso) {
    Alert.alert(
      "Excluir aviso",
      `Deseja realmente excluir o aviso "${aviso.titulo}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirAviso(aviso.id),
        },
      ]
    );
  }

  /*
   * Remove o aviso do Supabase.
   */
  async function excluirAviso(id: number) {
    const { error } = await supabase
      .from("avisos")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Erro ao excluir aviso:", error);

      Alert.alert(
        "Erro",
        "Não foi possível excluir o aviso."
      );

      return;
    }

    await carregarAvisos();

    Alert.alert(
      "Sucesso",
      "Aviso excluído com sucesso."
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <View style={styles.content}>
        {/* Cabeçalho */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
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

          <View style={styles.headerButton} />
        </View>

        {/* Pesquisa */}

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999999"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar aviso..."
            placeholderTextColor="#999999"
            value={pesquisaAviso}
            onChangeText={setPesquisaAviso}
          />

          {pesquisaAviso.length > 0 && (
            <TouchableOpacity
              onPress={() => setPesquisaAviso("")}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color="#999999"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Novo aviso */}

        <TouchableOpacity
          style={styles.newButton}
          onPress={() => navigation.navigate("Criar")}
        >
          <Ionicons
            name="add-circle"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.newButtonText}>
            Novo Aviso
          </Text>
        </TouchableOpacity>

        {/* Conteúdo */}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={theme.primary}
            />

            <Text style={styles.loadingText}>
              Carregando avisos...
            </Text>
          </View>
        ) : (
          <FlatList
            data={avisosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.listContent,
              avisosFiltrados.length === 0 &&
                styles.emptyListContent,
            ]}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="notifications-off-outline"
                  size={60}
                  color="#999999"
                />

                <Text style={styles.emptyTitle}>
                  Nenhum aviso encontrado
                </Text>

                <Text style={styles.emptyText}>
                  Não existem avisos correspondentes à sua
                  pesquisa.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.info}>
                  <Text style={styles.cardTitle}>
                    {item.titulo}
                  </Text>

                  <Text style={styles.description}>
                    {item.descricao}
                  </Text>

                  <View style={styles.dateContainer}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={theme.subtitle}
                    />

                    <Text style={styles.date}>
                      Publicado em {formatarData(item.data)}
                    </Text>
                  </View>

                  {/* Tag com cor correspondente */}

                  <View
                    style={[
                      styles.tag,
                      {
                        backgroundColor: corTag(item.tag),
                      },
                    ]}
                  >
                    <Text style={styles.tagText}>
                      {item.tag}
                    </Text>
                  </View>

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => abrirEditar(item)}
                    >
                      <Ionicons
                        name="create-outline"
                        size={18}
                        color="#FFFFFF"
                      />

                      <Text style={styles.buttonText}>
                        Editar
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() =>
                        confirmarExclusao(item)
                      }
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#FFFFFF"
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
        )}
      </View>

      <Footer />

      {/* Modal de edição */}

      <Modal
        visible={modalEditar}
        animationType="slide"
        transparent
        statusBarTranslucent
        onRequestClose={fecharModalEditar}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>
                    Editar Aviso
                  </Text>

                  <Text style={styles.modalSubtitle}>
                    Atualize as informações do aviso.
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={fecharModalEditar}
                  disabled={salvando}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={theme.subtitle}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>
                Título
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Digite o título do aviso"
                placeholderTextColor="#999999"
                value={tituloEdit}
                onChangeText={setTituloEdit}
                maxLength={100}
              />

              <Text style={styles.characterCounter}>
                {tituloEdit.length}/100
              </Text>

              <Text style={styles.label}>
                Descrição
              </Text>

              <TextInput
                style={styles.textArea}
                placeholder="Digite a descrição do aviso"
                placeholderTextColor="#999999"
                multiline
                value={descricaoEdit}
                onChangeText={setDescricaoEdit}
                maxLength={500}
              />

              <Text style={styles.characterCounter}>
                {descricaoEdit.length}/500
              </Text>

              <Text style={styles.label}>
                Tag
              </Text>

              <View style={styles.tagsContainer}>
                {tags.map((tag) => {
                  const selecionada = tagEdit === tag;

                  return (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.tagOption,
                        selecionada && {
                          backgroundColor: corTag(tag),
                          borderColor: corTag(tag),
                        },
                      ]}
                      onPress={() => setTagEdit(tag)}
                      activeOpacity={0.8}
                    >
                      <View
                        style={[
                          styles.tagColorIndicator,
                          {
                            backgroundColor: corTag(tag),
                          },
                          selecionada &&
                            styles.tagColorIndicatorSelected,
                        ]}
                      />

                      <Text
                        style={[
                          styles.tagOptionText,
                          selecionada &&
                            styles.tagOptionTextSelected,
                        ]}
                      >
                        {tag}
                      </Text>

                      {selecionada && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#FFFFFF"
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  salvando && styles.disabledButton,
                ]}
                onPress={salvarEdicao}
                disabled={salvando}
              >
                {salvando ? (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />
                ) : (
                  <>
                    <Ionicons
                      name="save-outline"
                      size={20}
                      color="#FFFFFF"
                    />

                    <Text style={styles.saveText}>
                      Salvar Alterações
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={fecharModalEditar}
                disabled={salvando}
              >
                <Text style={styles.cancelText}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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

  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: theme.primary,
    textAlign: "center",
  },

  searchContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
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
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: theme.subtitle,
  },

  listContent: {
    paddingBottom: 140,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  card: {
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: theme.border,
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
  },

  info: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: theme.subtitle,
    marginTop: 6,
    marginBottom: 10,
    lineHeight: 20,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  date: {
    marginLeft: 6,
    color: theme.subtitle,
    fontSize: 14,
  },

  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 14,
    marginBottom: 16,
  },

  tagText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editButton: {
    flex: 1,
    backgroundColor: theme.secondary,
    paddingVertical: 11,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 8,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    paddingVertical: 11,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 6,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    textAlign: "center",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: theme.subtitle,
    textAlign: "center",
    lineHeight: 20,
  },

  /* Modal */

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    padding: 20,
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.primary,
  },

  modalSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: theme.subtitle,
  },

  modalCloseButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.background,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: theme.text,
  },

  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 15,
    fontSize: 15,
    color: theme.text,
  },

  textArea: {
    minHeight: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 15,
    fontSize: 15,
    color: theme.text,
    textAlignVertical: "top",
  },

  characterCounter: {
    textAlign: "right",
    marginTop: 5,
    marginBottom: 18,
    fontSize: 12,
    color: theme.subtitle,
  },

  tagsContainer: {
    marginBottom: 10,
  },

  tagOption: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },

  tagColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },

  tagColorIndicatorSelected: {
    backgroundColor: "#FFFFFF",
  },

  tagOptionText: {
    flex: 1,
    color: theme.text,
    fontWeight: "500",
    fontSize: 15,
  },

  tagOptionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  saveButton: {
    minHeight: 52,
    backgroundColor: theme.primary,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 15,
  },

  disabledButton: {
    opacity: 0.65,
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },

  cancelButton: {
    padding: 16,
    alignItems: "center",
    marginTop: 6,
  },

  cancelText: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 16,
  },
});