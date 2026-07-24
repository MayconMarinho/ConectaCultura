import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
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

export default function NovaTarefaScreen({ navigation }: any) {
  const [descricao, setDescricao] = useState("");
  const [setor, setSetor] = useState("");
  const [tipo, setTipo] = useState("Diário");
  const [pontuacao, setPontuacao] = useState("");

  async function salvarTarefa() {
    if (!descricao || !setor || !pontuacao) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos."
      );
      return;
    }

    const { error } = await supabase
      .from("tarefas")
      .insert({
        descricao,
        setor,
        tipo,
        pontuacao: Number(pontuacao),
      });

    if (error) {
      Alert.alert("Erro", error.message);
      return;
    }

    Alert.alert(
      "Sucesso",
      "Tarefa cadastrada com sucesso!"
    );

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.header}>
          <Image
            source={require("../../assets/logoprov.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            Nova Tarefa
          </Text>
        </View>

        <View style={styles.card}>

          <Text style={styles.label}>
            Descrição
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Descrição da tarefa"
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.label}>
            Setor
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Packing"
            value={setor}
            onChangeText={setSetor}
          />

          <Text style={styles.label}>
            Tipo
          </Text>

          <View style={styles.picker}>
            <Picker
              selectedValue={tipo}
              onValueChange={setTipo}
            >
              <Picker.Item
                label="Diário"
                value="Diário"
              />

              <Picker.Item
                label="Semanal"
                value="Semanal"
              />

              <Picker.Item
                label="Mensal"
                value="Mensal"
              />
            </Picker>
          </View>

          <Text style={styles.label}>
            XP
          </Text>

          <TextInput
            style={styles.input}
            placeholder="100"
            keyboardType="numeric"
            value={pontuacao}
            onChangeText={setPontuacao}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={salvarTarefa}
          >
            <Ionicons
              name="save"
              size={22}
              color="#FFF"
            />

            <Text style={styles.botaoTexto}>
              Salvar Tarefa
            </Text>
          </TouchableOpacity>

        </View>

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

  header: {
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 55,
    paddingBottom: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },

  logo: {
    width: 95,
    height: 95,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },

  card: {
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 20,
    padding: 20,

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.text,
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
  },

  picker: {
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    overflow: "hidden",
  },

  botao: {
    marginTop: 35,
    backgroundColor: theme.primary,
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 10,
  },
});