// src/screens/RotinasScreen.tsx

import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
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

/* ===========================
    TIPAGEM
=========================== */

type Periodo = "Diário" | "Semanal" | "Mensal";

interface Tarefa {
  id: string;
  periodo: Periodo;
  titulo: string;
  concluida: boolean;
}

/* ===========================
    DADOS (MOCK)

    FUTURAMENTE:
    Substitua este array pelo
    retorno do PHP/MySQL.
=========================== */

const tarefasIniciais: Tarefa[] = [
  // DIÁRIO
  { id: "d1", periodo: "Diário", titulo: "Verificar novas sugestões dos colaboradores", concluida: false },
  { id: "d2", periodo: "Diário", titulo: "Publicar comunicados urgentes", concluida: false },
  { id: "d3", periodo: "Diário", titulo: "Responder dúvidas recebidas", concluida: false },
  { id: "d4", periodo: "Diário", titulo: "Atualizar mural de avisos", concluida: false },
  { id: "d5", periodo: "Diário", titulo: "Conferir eventos do dia", concluida: false },

  // SEMANAL
  { id: "s1", periodo: "Semanal", titulo: "Publicar comunicado semanal", concluida: false },
  { id: "s2", periodo: "Semanal", titulo: "Atualizar calendário de eventos", concluida: false },
  { id: "s3", periodo: "Semanal", titulo: "Divulgar campanha ativa", concluida: false },
  { id: "s4", periodo: "Semanal", titulo: "Revisar conteúdos da plataforma", concluida: false },
  { id: "s5", periodo: "Semanal", titulo: "Verificar indicadores de acesso", concluida: false },
  { id: "s6", periodo: "Semanal", titulo: "Enviar lembrete de treinamentos", concluida: false },

  // MENSAL
  { id: "m1", periodo: "Mensal", titulo: "Escolher colaborador destaque", concluida: false },
  { id: "m2", periodo: "Mensal", titulo: "Criar pesquisa de clima organizacional", concluida: false },
  { id: "m3", periodo: "Mensal", titulo: "Publicar resultados das campanhas", concluida: false },
  { id: "m4", periodo: "Mensal", titulo: "Atualizar missão, visão e valores (se necessário)", concluida: false },
  { id: "m5", periodo: "Mensal", titulo: "Gerar relatório de engajamento", concluida: false },
  { id: "m6", periodo: "Mensal", titulo: "Arquivar comunicados antigos", concluida: false },
];

const PERIODOS: Periodo[] = ["Diário", "Semanal", "Mensal"];

export default function RotinasScreen() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);
  const [abaAtiva, setAbaAtiva] = useState<Periodo>("Diário");

  /* Marca / desmarca uma tarefa */
  const toggleTarefa = (id: string) => {
    setTarefas((atual) =>
      atual.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  };

  /* Tarefas da aba selecionada */
  const tarefasDaAba = useMemo(
    () => tarefas.filter((t) => t.periodo === abaAtiva),
    [tarefas, abaAtiva]
  );

  /* Progresso da aba atual */
  const total = tarefasDaAba.length;
  const concluidas = tarefasDaAba.filter((t) => t.concluida).length;
  const progresso = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  const renderItem = ({ item }: { item: Tarefa }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={() => toggleTarefa(item.id)}
    >
      <View style={[styles.checkbox, item.concluida && styles.checkboxMarcado]}>
        {item.concluida && (
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
        )}
      </View>

      <Text
        style={[styles.itemTexto, item.concluida && styles.itemTextoConcluido]}
      >
        {item.titulo}
      </Text>
    </TouchableOpacity>
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
          <Text style={styles.title}>Gestão de Rotinas</Text>
        </View>

        {/* Barra de abas: Diário / Semanal / Mensal */}
        <View style={styles.tabBar}>
          {PERIODOS.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.tab, abaAtiva === p && styles.tabAtiva]}
              onPress={() => setAbaAtiva(p)}
            >
              <Text
                style={[styles.tabText, abaAtiva === p && styles.tabTextAtivo]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Título da seção + progresso */}
        <View style={styles.checklistHeader}>
          <Text style={styles.checklistTitle}>Check List {abaAtiva}</Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progresso}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {concluidas}/{total} concluídas
          </Text>
        </View>

        {/* Lista de itens da aba */}
        <FlatList
          data={tarefasDaAba}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Ionicons
                name="checkmark-done-outline"
                size={40}
                color={theme.subtitle}
              />
              <Text style={styles.vazioText}>Nenhuma tarefa neste período.</Text>
            </View>
          }
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
  },

  /* ===========================
      HEADER
  =========================== */

  header: {
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  /* ===========================
      BARRA DE ABAS
  =========================== */

  tabBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 30,
    padding: 5,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },

  tabAtiva: {
    backgroundColor: theme.primary,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.subtitle,
  },

  tabTextAtivo: {
    color: "#FFFFFF",
  },

  /* ===========================
      CHECKLIST HEADER
  =========================== */

  checklistHeader: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 5,
  },

  checklistTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
    marginTop: 14,
  },

  progressFill: {
    height: "100%",
    borderRadius: 8,
    backgroundColor: theme.accent,
  },

  progressText: {
    color: theme.subtitle,
    fontSize: 13,
    marginTop: 6,
    fontWeight: "600",
    textAlign: "center",
  },

  /* ===========================
      LISTA
  =========================== */

  list: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 140,
  },

  /* ===========================
      ITEM DO CHECKLIST
  =========================== */

  item: {
    backgroundColor: theme.card,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  checkboxMarcado: {
    backgroundColor: theme.primary,
  },

  itemTexto: {
    flex: 1,
    fontSize: 15,
    color: theme.text,
    lineHeight: 21,
  },

  itemTextoConcluido: {
    textDecorationLine: "line-through",
    color: theme.subtitle,
  },

  /* ===========================
      LISTA VAZIA
  =========================== */

  vazio: {
    alignItems: "center",
    marginTop: 40,
    gap: 10,
  },

  vazioText: {
    color: theme.subtitle,
    fontSize: 15,
  },
});