import React, { useState } from "react";
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
  Alert
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

interface Usuario {
  id: number;
  nome: string;
  cargo: string;
  setor: string;
  xp: number;
  ativo: boolean;
}

interface Tarefa {
  id: number;
  titulo: string;
  setor: string;
}

export default function AdminScreen({ navigation }: any) {


  {/*Referente ao gerenciamento de usuários*/}
  const [modalUsuarios, setModalUsuarios] = useState(false);

const [pesquisa, setPesquisa] = useState("");

const [usuarios, setUsuarios] = useState<Usuario[]>([
  {
    id: 1,
    nome: "Maycon Marinho",
    cargo: "Administrador",
    setor: "Produção",
    xp: 3250,
    ativo: true,
  },
  {
    id: 2,
    nome: "João Pedro",
    cargo: "Operador",
    setor: "Packing",
    xp: 2840,
    ativo: true,
  },
  {
    id: 3,
    nome: "Maria Clara",
    cargo: "Supervisor",
    setor: "Shipping",
    xp: 4125,
    ativo: false,
  },
  {
    id: 4,
    nome: "Carlos Eduardo",
    cargo: "Operador",
    setor: "Picking",
    xp: 1925,
    ativo: true,
  },
  {
    id: 5,
    nome: "Fernanda Souza",
    cargo: "Líder",
    setor: "Produção",
    xp: 3890,
    ativo: true,
  },
]);

const usuariosFiltrados = usuarios.filter((usuario) =>

  usuario.nome
    .toLowerCase()
    .includes(pesquisa.toLowerCase()) ||

  usuario.cargo
    .toLowerCase()
    .includes(pesquisa.toLowerCase()) ||

  usuario.setor
    .toLowerCase()
    .includes(pesquisa.toLowerCase())

);

const excluirUsuario = (id: number) => {

  Alert.alert(

    "Excluir usuário",

    "Deseja realmente excluir este usuário?",

    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {

          setUsuarios((usuarios) =>
            usuarios.filter((u) => u.id !== id)
          );

        },
      },
    ]

  );

};

/* ===========================
    GESTÃO DE ROTINAS
=========================== */

const [modalRotinas, setModalRotinas] = useState(false);

const [pesquisaRotina, setPesquisaRotina] = useState("");

const [tarefas, setTarefas] = useState<Tarefa[]>([
  {
    id: 1,
    titulo: "Conferir EPI",
    setor: "Picking",
  },
  {
    id: 2,
    titulo: "Organizar Bancada",
    setor: "Packing",
  },
  {
    id: 3,
    titulo: "Realizar Auditoria",
    setor: "Shipping",
  },
  {
    id: 4,
    titulo: "Limpeza do Setor",
    setor: "Produção",
  },
]);

const tarefasFiltradas = tarefas.filter((tarefa) =>

  tarefa.titulo
    .toLowerCase()
    .includes(pesquisaRotina.toLowerCase()) ||

  tarefa.setor
    .toLowerCase()
    .includes(pesquisaRotina.toLowerCase())

);

const excluirTarefa = (id: number) => {

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
          setTarefas((tarefas) =>
            tarefas.filter((t) => t.id !== id)
          );
        },
      },
    ]
  );

};

  /* ===========================
          DADOS SIMULADOS
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
setModalUsuarios(true)
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
            color="#999"
          />

        </TouchableOpacity>

        {/* Rotinas */}

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setModalRotinas(true)}
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

      <Modal
  visible={modalUsuarios}
  animationType="slide"
  transparent={true}
>
  <View style={styles.modalOverlay}>

    <View style={styles.modalContainer}>

      <View style={styles.modalHeader}>

        <Text style={styles.modalTitle}>
          Gerenciar Usuários
        </Text>

        <TouchableOpacity
          onPress={() => setModalUsuarios(false)}
        >
          <Ionicons
            name="close"
            size={30}
            color="#333"
          />
        </TouchableOpacity>

      </View>

      <View style={styles.searchContainer}>

        <Ionicons
          name="search"
          size={22}
          color="#777"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar colaborador..."
          placeholderTextColor="#999"
          value={pesquisa}
          onChangeText={setPesquisa}
        />

      </View>

      <FlatList
        data={usuariosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (

          <View style={styles.userCard}>

            <View style={styles.userInfo}>

              <Ionicons
                name="person-circle"
                size={65}
                color={theme.primary}
              />

              <View style={styles.userText}>

                <Text style={styles.modalUserName}>
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

                <Text
                  style={[
                    styles.userStatus,
                    {
                      color: item.ativo
                        ? "#4CAF50"
                        : "#D32F2F",
                    },
                  ]}
                >
                  {item.ativo ? "🟢 Ativo" : "🔴 Desativado"}
                </Text>

              </View>

            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => excluirUsuario(item.id)}
            >

              <Ionicons
                name="trash-outline"
                size={20}
                color="#FFF"
              />

              <Text style={styles.deleteButtonText}>
                Excluir
              </Text>

            </TouchableOpacity>

          </View>

        )}
      />

    </View>

  </View>

</Modal>

<Modal
  visible={modalRotinas}
  animationType="slide"
  transparent={true}
>

  <View style={styles.modalOverlay}>

    <View style={styles.modalContainer}>

      <View style={styles.modalHeader}>

        <Text style={styles.modalTitle}>
          Gestão de Rotinas
        </Text>

        <TouchableOpacity
          onPress={() => setModalRotinas(false)}
        >
          <Ionicons
            name="close"
            size={30}
            color="#333"
          />
        </TouchableOpacity>

      </View>

      <View style={styles.searchContainer}>

        <Ionicons
          name="search"
          size={22}
          color="#777"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar tarefa..."
          value={pesquisaRotina}
          onChangeText={setPesquisaRotina}
        />

      </View>

      <TouchableOpacity
        style={styles.newTaskButton}
        onPress={() => {}}
      >

        <Ionicons
          name="add-circle"
          size={22}
          color="#FFF"
        />

        <Text style={styles.newTaskText}>
          Nova Tarefa
        </Text>

      </TouchableOpacity>

      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <View style={styles.taskCard}>

            <View>

              <Text style={styles.taskTitle}>
                {item.titulo}
              </Text>

              <Text style={styles.taskSector}>
                Setor: {item.setor}
              </Text>

            </View>

            <TouchableOpacity
              style={styles.deleteMiniButton}
              onPress={() => excluirTarefa(item.id)}
            >

              <Ionicons
                name="trash-outline"
                size={20}
                color="#FFF"
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

  /* ===========================
        MODAL USUÁRIOS
=========================== */

modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.45)",
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
  fontSize: 24,
  fontWeight: "bold",
  color: theme.text,
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
  color: theme.text,
  fontSize: 16,
},

/* ===========================
        CARD USUÁRIO
=========================== */

userCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  padding: 18,
  marginBottom: 15,

  elevation: 3,

  shadowColor: "#000",
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
  color: "#666",
},

userSetor: {
  marginTop: 2,
  fontSize: 15,
  color: "#888",
},

userXP: {
  marginTop: 8,
  fontSize: 16,
  fontWeight: "bold",
  color: "#F9A825",
},

userStatus: {
  marginTop: 6,
  fontWeight: "bold",
  fontSize: 15,
},

/* ===========================
        BOTÃO EXCLUIR
=========================== */

deleteButton: {
  marginTop: 18,
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
  color: "#FFF",
  fontSize: 16,
  fontWeight: "bold",
  marginLeft: 8,
},

taskCard: {
  backgroundColor: "#FFF",
  borderRadius: 15,
  padding: 18,
  marginBottom: 15,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  elevation: 3,

  shadowColor: "#000",
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