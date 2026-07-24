import React, {
  useCallback,
  useState,
} from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  useFocusEffect,
} from "@react-navigation/native";

import Footer from "../components/footer";

import {
  supabase,
} from "../services/supabase";

const theme = {
  primary: "#7B2CBF",
  accent: "#00BFA6",
  background: "#F3F5F7",
  card: "#FFFFFF",
  text: "#222222",
  subtitle: "#666666",
};

interface Usuario {
  id: number;
  nome: string;
  cargo: string;
  setor: string;
  xp: number;
}

interface Tarefa {
  id: number;
  descricao: string;
  setor: string;
  tipo: string;
  pontuacao: number;
}

export default function AdminScreen({
  navigation,
}: any) {
  /* ===========================
        INDICADORES
  =========================== */

  const [quantidadeUsuarios, setQuantidadeUsuarios] =
    useState(0);

  const [quantidadeAvisos, setQuantidadeAvisos] =
    useState(0);

  const [carregandoIndicadores, setCarregandoIndicadores] =
    useState(true);

  /* ===========================
        GERENCIAMENTO DE USUÁRIOS
  =========================== */

  const [modalUsuarios, setModalUsuarios] =
    useState(false);

  const [pesquisa, setPesquisa] = useState("");

  const [usuarios, setUsuarios] = useState<Usuario[]>(
    []
  );

  const [carregandoUsuarios, setCarregandoUsuarios] =
    useState(false);

  const [excluindoUsuarioId, setExcluindoUsuarioId] =
    useState<number | null>(null);

/* ===========================
      GESTÃO DE ROTINAS
=========================== */

const [modalRotinas, setModalRotinas] =
  useState(false);

const [pesquisaRotina, setPesquisaRotina] =
  useState("");

const [tarefas, setTarefas] = useState<Tarefa[]>([]);

async function carregarTarefas() {

  const { data, error } = await supabase
    .from("tarefas")
    .select("*")
    .order("id");

  if (error) {
    Alert.alert("Erro", error.message);
    return;
  }

  setTarefas(data || []);
}

  /* ===========================
        USUÁRIO ADMINISTRADOR
  =========================== */

  const [usuario] = useState({
    nome: "Maycon Marinho",
    cargo: "Administrador",
  });

  /* ===========================
        INDICADORES SIMULADOS
  =========================== */

  const indicadores = {
    rotinas: 35,
    xpMedio: 745,
  };

  /* ===========================
        GRÁFICO SIMULADO
  =========================== */

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
        CONTAR USUÁRIOS
  =========================== */

  async function carregarQuantidadeUsuarios() {
    const {
      count,
      error,
    } = await supabase
      .from("usuarios")
      .select("id", {
        count: "exact",
        head: true,
      });

    if (error) {
      console.log(
        "Erro ao contar usuários:",
        error
      );

      setQuantidadeUsuarios(0);
      return;
    }

    setQuantidadeUsuarios(count ?? 0);
  }

  /* ===========================
        CONTAR AVISOS
  =========================== */

  async function carregarQuantidadeAvisos() {
    const {
      count,
      error,
    } = await supabase
      .from("avisos")
      .select("id", {
        count: "exact",
        head: true,
      });

    if (error) {
      console.log(
        "Erro ao contar avisos:",
        error
      );

      setQuantidadeAvisos(0);
      return;
    }

    setQuantidadeAvisos(count ?? 0);
  }

  /* ===========================
        CARREGAR USUÁRIOS
  =========================== */

  async function carregarUsuarios() {
    setCarregandoUsuarios(true);

    const {
      data,
      error,
    } = await supabase
      .from("usuarios")
      .select(
        `
          id,
          nome,
          cargo,
          setor,
          xp
        `
      )
      .order("nome", {
        ascending: true,
      });

    if (error) {
      console.log(
        "Erro ao carregar usuários:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível carregar os usuários cadastrados."
      );

      setUsuarios([]);
      setCarregandoUsuarios(false);

      return;
    }

    const usuariosFormatados: Usuario[] = (
      data ?? []
    ).map((item: any) => ({
      id: item.id,
      nome: item.nome ?? "Nome não informado",
      cargo: item.cargo ?? "Cargo não informado",
      setor: item.setor ?? "Setor não informado",
      xp: Number(item.xp ?? 0),
    }));

    setUsuarios(usuariosFormatados);
    setCarregandoUsuarios(false);
  }

  /* ===========================
        CARREGAR INDICADORES
  =========================== */

  async function carregarIndicadores() {
    setCarregandoIndicadores(true);

    await Promise.all([
      carregarQuantidadeUsuarios(),
      carregarQuantidadeAvisos(),
    ]);

    setCarregandoIndicadores(false);
  }

  /* ===========================
        ATUALIZAR AO ENTRAR
        NA TELA
  =========================== */

  useFocusEffect(
    useCallback(() => {
      carregarIndicadores();
    }, [])
  );

  /* ===========================
        ABRIR MODAL DE USUÁRIOS
  =========================== */

  async function abrirModalUsuarios() {
    setPesquisa("");
    setModalUsuarios(true);

    await carregarUsuarios();
  }

  /* ===========================
        FECHAR MODAL
  =========================== */

  function fecharModalUsuarios() {
    setPesquisa("");
    setModalUsuarios(false);
  }

  /* ===========================
        FILTRAR USUÁRIOS
  =========================== */

  const usuariosFiltrados = usuarios.filter(
    (usuarioItem) => {
      const textoPesquisa = pesquisa
        .trim()
        .toLowerCase();

      if (textoPesquisa === "") {
        return true;
      }

      const nome = usuarioItem.nome
        .toLowerCase();

      const cargo = usuarioItem.cargo
        .toLowerCase();

      const setor = usuarioItem.setor
        .toLowerCase();

      return (
        nome.includes(textoPesquisa) ||
        cargo.includes(textoPesquisa) ||
        setor.includes(textoPesquisa)
      );
    }
  );

  /* ===========================
        CONFIRMAR EXCLUSÃO
  =========================== */

  function confirmarExclusaoUsuario(
    usuarioItem: Usuario
  ) {
    Alert.alert(
      "Excluir usuário",
      `Deseja realmente excluir o usuário "${usuarioItem.nome}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () =>
            excluirUsuario(usuarioItem.id),
        },
      ]
    );
  }

  /* ===========================
        EXCLUIR USUÁRIO
  =========================== */

  async function excluirUsuario(id: number) {
    setExcluindoUsuarioId(id);

    const {
      error,
    } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", id);

    setExcluindoUsuarioId(null);

    if (error) {
      console.log(
        "Erro ao excluir usuário:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível excluir o usuário."
      );

      return;
    }

    setUsuarios((usuariosAtuais) =>
      usuariosAtuais.filter(
        (usuarioItem) => usuarioItem.id !== id
      )
    );

    await carregarQuantidadeUsuarios();

    Alert.alert(
      "Sucesso",
      "Usuário excluído com sucesso."
    );
  }

  /* ===========================
        FILTRAR TAREFAS
  =========================== */

  const tarefasFiltradas = tarefas.filter(
    (tarefa) => {
      const textoPesquisa = pesquisaRotina
        .trim()
        .toLowerCase();

      return (
        tarefa.titulo
          .toLowerCase()
          .includes(textoPesquisa) ||
        tarefa.setor
          .toLowerCase()
          .includes(textoPesquisa)
      );
    }
  );

  /* ===========================
        EXCLUIR TAREFA
  =========================== */

  function excluirTarefa(id: number) {
    Alert.alert(
      "Excluir tarefa",
      "Deseja realmente excluir esta tarefa?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setTarefas((tarefasAtuais) =>
              tarefasAtuais.filter(
                (tarefa) => tarefa.id !== id
              )
            );
          },
        },
      ]
    );
  }

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

            {carregandoIndicadores ? (
              <ActivityIndicator
                size="small"
                color={theme.primary}
                style={styles.cardLoading}
              />
            ) : (
              <Text style={styles.cardValue}>
                {quantidadeUsuarios}
              </Text>
            )}

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

            {carregandoIndicadores ? (
              <ActivityIndicator
                size="small"
                color="#2196F3"
                style={styles.cardLoading}
              />
            ) : (
              <Text style={styles.cardValue}>
                {quantidadeAvisos}
              </Text>
            )}

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
          <Text style={styles.sectionTitleChart}>
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
          onPress={abrirModalUsuarios}
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
            color="#999999"
          />
        </TouchableOpacity>

        {/* Avisos */}

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() =>
            navigation.navigate("CriarAviso")
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
            color="#999999"
          />
        </TouchableOpacity>

        {/* Rotinas */}

        <TouchableOpacity
          style={styles.menuButton}
          onPress={async () => {
            setModalRotinas(true);
              await carregarTarefas();
          }}
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
            color="#999999"
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

        <View style={styles.footerSpace} />
      </ScrollView>

      {/* ===========================
          MODAL DE USUÁRIOS
      =========================== */}

      <Modal
        visible={modalUsuarios}
        animationType="slide"
        transparent
        onRequestClose={fecharModalUsuarios}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  Gerenciar Usuários
                </Text>

                <Text style={styles.modalSubtitle}>
                  {quantidadeUsuarios} usuário(s) cadastrado(s)
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={fecharModalUsuarios}
              >
                <Ionicons
                  name="close"
                  size={28}
                  color="#333333"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={22}
                color="#777777"
              />

              <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar colaborador..."
                placeholderTextColor="#999999"
                value={pesquisa}
                onChangeText={setPesquisa}
              />

              {pesquisa.length > 0 && (
                <TouchableOpacity
                  onPress={() => setPesquisa("")}
                >
                  <Ionicons
                    name="close-circle"
                    size={21}
                    color="#999999"
                  />
                </TouchableOpacity>
              )}
            </View>

            {carregandoUsuarios ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color={theme.primary}
                />

                <Text style={styles.loadingText}>
                  Carregando usuários...
                </Text>
              </View>
            ) : (
              <FlatList
                data={usuariosFiltrados}
                keyExtractor={(item) =>
                  item.id.toString()
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                  styles.usersList,
                  usuariosFiltrados.length === 0 &&
                    styles.emptyList,
                ]}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Ionicons
                      name="people-outline"
                      size={58}
                      color="#999999"
                    />

                    <Text style={styles.emptyTitle}>
                      Nenhum usuário encontrado
                    </Text>

                    <Text style={styles.emptyText}>
                      Não existem usuários correspondentes à
                      pesquisa realizada.
                    </Text>
                  </View>
                }
                renderItem={({ item }) => (
                  <View style={styles.userCard}>
                    <View style={styles.userInfo}>
                      <Ionicons
                        name="person-circle"
                        size={65}
                        color={theme.primary}
                      />

                      <View style={styles.userText}>
                        <Text
                          style={styles.modalUserName}
                        >
                          {item.nome}
                        </Text>

                        <Text style={styles.userCargo}>
                          {item.cargo}
                        </Text>

                        <Text style={styles.userSetor}>
                          {item.setor}
                        </Text>

                        <Text style={styles.userXP}>
                          ⭐ XP: {item.xp}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.deleteButton,
                        excluindoUsuarioId === item.id &&
                          styles.disabledButton,
                      ]}
                      disabled={
                        excluindoUsuarioId === item.id
                      }
                      onPress={() =>
                        confirmarExclusaoUsuario(item)
                      }
                    >
                      {excluindoUsuarioId === item.id ? (
                        <ActivityIndicator
                          size="small"
                          color="#FFFFFF"
                        />
                      ) : (
                        <>
                          <Ionicons
                            name="trash-outline"
                            size={20}
                            color="#FFFFFF"
                          />

                          <Text
                            style={
                              styles.deleteButtonText
                            }
                          >
                            Excluir
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* ===========================
          MODAL DE ROTINAS
      =========================== */}

      <Modal
        visible={modalRotinas}
        animationType="slide"
        transparent
        onRequestClose={() =>
          setModalRotinas(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Gestão de Rotinas
              </Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() =>
                  setModalRotinas(false)
                }
              >
                <Ionicons
                  name="close"
                  size={28}
                  color="#333333"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={22}
                color="#777777"
              />

              <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar tarefa..."
                placeholderTextColor="#999999"
                value={pesquisaRotina}
                onChangeText={setPesquisaRotina}
              />
            </View>

            <TouchableOpacity
            style={styles.newTaskButton}
            onPress={() => {
              setModalRotinas(false);
              navigation.navigate("NovaTarefa");
            }}
            >
              <Ionicons
                name="add-circle"
                size={22}
                color="#FFFFFF"
              />

              <Text style={styles.newTaskText}>
                Nova Tarefa
              </Text>
            </TouchableOpacity>

            <FlatList
              data={tarefasFiltradas}
              keyExtractor={(item) =>
                item.id.toString()
              }
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.taskCard}>
                  <View>
                    <Text style={styles.taskTitle}>
                      {item.descricao}
                    </Text>

                    <Text style={styles.taskSector}>
                      Setor: {item.setor}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteMiniButton}
                    onPress={() =>
                      excluirTarefa(item.id)
                    }
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

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
    shadowColor: "#000000",
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
    minHeight: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  cardLoading: {
    marginTop: 15,
    marginBottom: 8,
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

  sectionTitleChart: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 20,
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
    shadowColor: "#000000",
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
    shadowColor: "#000000",
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
    shadowColor: "#000000",
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

  footerSpace: {
    height: 120,
  },

  /* ===========================
      MODAIS
  =========================== */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "92%",
    height: "82%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: theme.text,
  },

  modalSubtitle: {
    marginTop: 4,
    color: theme.subtitle,
    fontSize: 14,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ===========================
      PESQUISA
  =========================== */

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    marginRight: 8,
    color: theme.text,
    fontSize: 16,
  },

  /* ===========================
      CARREGAMENTO
  =========================== */

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: theme.subtitle,
  },

  /* ===========================
      LISTA DE USUÁRIOS
  =========================== */

  usersList: {
    paddingBottom: 30,
  },

  emptyList: {
    flexGrow: 1,
  },

  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  userInfo: {
    flexDirection: "row",
  },

  userText: {
    marginLeft: 15,
    flex: 1,
  },

  modalUserName: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
  },

  userCargo: {
    marginTop: 3,
    fontSize: 15,
    color: "#666666",
  },

  userSetor: {
    marginTop: 2,
    fontSize: 15,
    color: "#888888",
  },

  userXP: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#F9A825",
  },

  /* ===========================
      BOTÃO EXCLUIR
  =========================== */

  deleteButton: {
    marginTop: 18,
    minHeight: 48,
    backgroundColor: "#D32F2F",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  disabledButton: {
    opacity: 0.6,
  },

  /* ===========================
      LISTA VAZIA
  =========================== */

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginTop: 15,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 14,
    color: theme.subtitle,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },

  /* ===========================
      GESTÃO DE ROTINAS
  =========================== */

  newTaskButton: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  newTaskText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
  },

  taskSector: {
    marginTop: 6,
    color: theme.subtitle,
    fontSize: 15,
  },

  deleteMiniButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#D32F2F",
    justifyContent: "center",
    alignItems: "center",
  },
});