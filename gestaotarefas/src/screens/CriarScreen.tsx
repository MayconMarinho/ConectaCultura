import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

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


export default function CriarAvisoScreen({ navigation }: any) {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tagSelecionada, setTagSelecionada] = useState("");

  const tags = [
    "Informativo",
    "Urgente",
    "Evento",
    "Comunicado",
  ];


  async function publicarAviso() {

    if (
      titulo.trim() === "" ||
      descricao.trim() === "" ||
      tagSelecionada === ""
    ) {

      Alert.alert(
        "Campos obrigatórios",
        "Preencha título, descrição e selecione uma tag."
      );

      return;
    }


    const { error } = await supabase
      .from("avisos")
      .insert([
        {
          titulo,
          descricao,
          tag: tagSelecionada,
        },
      ]);


    if (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível publicar o aviso."
      );

      return;
    }


    Alert.alert(
      "Sucesso",
      "Aviso publicado com sucesso!"
    );


    setTitulo("");
    setDescricao("");
    setTagSelecionada("");

    navigation.goBack();

  }



  return (

    <SafeAreaView style={styles.container}>


      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >

          <Ionicons
            name="arrow-back"
            size={28}
            color={theme.primary}
          />

        </TouchableOpacity>


        <Text style={styles.title}>
          Novo Aviso
        </Text>


        <View style={{ width: 28 }} />

      </View>



      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >


        <Text style={styles.label}>
          Título
        </Text>


        <TextInput
          style={styles.input}
          placeholder="Digite o título do aviso"
          value={titulo}
          onChangeText={setTitulo}
        />



        <Text style={styles.label}>
          Descrição
        </Text>


        <TextInput
          style={styles.textArea}
          placeholder="Digite a descrição do aviso"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />



        <Text style={styles.label}>
          Tag
        </Text>


        <View style={styles.tagsContainer}>

          {tags.map((tag) => (

            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                tagSelecionada === tag && styles.tagSelected,
              ]}
              onPress={() => setTagSelecionada(tag)}
            >

              <Ionicons
                name={
                  tagSelecionada === tag
                    ? "checkbox"
                    : "square-outline"
                }
                size={22}
                color={
                  tagSelecionada === tag
                    ? "#FFF"
                    : theme.primary
                }
              />


              <Text
                style={[
                  styles.tagText,
                  tagSelecionada === tag &&
                  styles.tagTextSelected,
                ]}
              >
                {tag}
              </Text>


            </TouchableOpacity>

          ))}

        </View>



        <TouchableOpacity
          style={styles.publishButton}
          onPress={publicarAviso}
        >

          <Text style={styles.publishText}>
            Publicar
          </Text>

        </TouchableOpacity>



        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >

          <Text style={styles.cancelText}>
            Cancelar
          </Text>

        </TouchableOpacity>


      </ScrollView>


    </SafeAreaView>

  );

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
  },


  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },


  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.primary,
  },


  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: theme.text,
  },


  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 12,
    marginBottom: 15,
  },


  textArea: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 15,
  },


  tagsContainer: {
    marginBottom: 15,
  },


  tagButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },


  tagSelected: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },


  tagText: {
    marginLeft: 10,
    color: theme.text,
    fontWeight: "500",
  },


  tagTextSelected: {
    color: "#FFF",
  },


  publishButton: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 5,
  },


  publishText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },


  cancelButton: {
    marginTop: 10,
    padding: 12,
    alignItems: "center",
  },


  cancelText: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 15,
  },

});