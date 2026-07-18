import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/footer";


const selecionarImagem = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setEditUsuario({
      ...editUsuario,
      foto: result.assets[0].uri,
    });
  }
};

const theme = {
  primary: "#7B2CBF",
  accent: "#00BFA6",
  background: "#F5F6FA",
  card: "#FFFFFF",
  text: "#222222",
  subtitle: "#777777",
};

export default function PerfilScreen() {
const [usuario, setUsuario] = useState({
  nome: "João Pedro da Silva",
  email: "joao.silva@empresa.com",
  setor: "Tecnologia da Informação",
  cargo: "Desenvolvedor Mobile",
  xp: 1450,
  foto: "https://i.pravatar.cc/300",
});

const [modalVisible, setModalVisible] = useState(false);

const [editUsuario, setEditUsuario] = useState(usuario);

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
>

      {/* HEADER */}

      <View style={styles.header}>

        <Image
          source={{ uri: usuario.foto }}
          style={styles.profileImage}
        />

        <Text style={styles.name}>
          {usuario.nome}
        </Text>

        <Text style={styles.position}>
          {usuario.cargo}
        </Text>

      </View>

      {/* CARD */}

      <View style={styles.card}>

        <View style={styles.infoItem}>

          <Ionicons
            name="business-outline"
            size={24}
            color={theme.primary}
          />

          <View style={styles.infoText}>
            <Text style={styles.label}>
              Setor
            </Text>

            <Text style={styles.value}>
              {usuario.setor}
            </Text>

          </View>

        </View>

        <View style={styles.separator} />

        <View style={styles.infoItem}>

          <Ionicons
            name="briefcase-outline"
            size={24}
            color={theme.primary}
          />

          <View style={styles.infoText}>
            <Text style={styles.label}>
              Cargo
            </Text>

            <Text style={styles.value}>
              {usuario.cargo}
            </Text>

          </View>

        </View>

        <View style={styles.separator} />

        <View style={styles.infoItem}>

          <Ionicons
            name="mail-outline"
            size={24}
            color={theme.primary}
          />

          <View style={styles.infoText}>
            <Text style={styles.label}>
              Email
            </Text>

            <Text style={styles.value}>
              {usuario.email}
            </Text>

          </View>

        </View>

        <View style={styles.separator} />

        <View style={styles.infoItem}>

          <Ionicons
            name="star-outline"
            size={24}
            color={theme.accent}
          />

          <View style={styles.infoText}>
            <Text style={styles.label}>
              XP Total
            </Text>

            <Text style={styles.xp}>
              {usuario.xp} XP
            </Text>

          </View>

        </View>

      </View>

      {/* BOTÕES */}

      <TouchableOpacity
  style={styles.editButton}
  onPress={() => {
    setEditUsuario(usuario);
    setModalVisible(true);
  }}>
        <Ionicons
          name="create-outline"
          size={22}
          color="#FFF"
        />

        <Text style={styles.buttonText}>
          Editar Perfil
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>

        <Ionicons
          name="log-out-outline"
          size={22}
          color={theme.primary}
        />

        <Text style={styles.logoutText}>
          Sair
        </Text>

      </TouchableOpacity>

      <Text style={styles.version}>
        Conecta Cultura • ALLTAK
      </Text>
    
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent >

      <View style={styles.modalOverlay}>

        <View style={styles.modalContainer}>

          <Text style={styles.modalTitle}>
            Editar Perfil
          </Text>

          <View style={styles.photoContainer}>

  <TouchableOpacity
    style={styles.photoButton}
    onPress={selecionarImagem}
  >
    <Image
      source={{ uri: editUsuario.foto }}
      style={styles.modalProfileImage}
    />

    <View style={styles.cameraIcon}>
      <Ionicons
        name="camera"
        size={18}
        color="#FFF"
      />
    </View>

  </TouchableOpacity>

  <Text style={styles.changePhoto}>
    Alterar foto
  </Text>

</View>

          <TextInput
            style={styles.modalInput}
            value={editUsuario.nome}
            placeholder="Nome"
            onChangeText={(text) =>
              setEditUsuario({
                ...editUsuario,
                nome: text,
              })
            }
          />

          <TextInput
            style={styles.modalInput}
            value={editUsuario.email}
            placeholder="Email"
            onChangeText={(text) =>
              setEditUsuario({
                ...editUsuario,
                email: text,
              })
            } />

          <TextInput
            style={styles.modalInput}
            value={editUsuario.setor}
            placeholder="Setor"
            onChangeText={(text) =>
              setEditUsuario({
                ...editUsuario,
                setor: text,
              })
            } />

          <TextInput
            style={styles.modalInput}
            value={editUsuario.cargo}
            placeholder="Cargo"
            onChangeText={(text) =>
              setEditUsuario({
                ...editUsuario,
                cargo: text,
              })
            } />

          <View style={styles.modalButtons}>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)} >
              <Text style={styles.cancelText}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                setUsuario(editUsuario);
                setModalVisible(false);
              }} >
              <Text style={styles.saveText}>
                Salvar
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>

    </ScrollView>

      <Footer />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "space-between",
  },

  /* ===========================
      HEADER
  =========================== */

  header: {
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 55,
    paddingBottom: 50,
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

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#FFF",
    marginBottom: 15,
  },

  name: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
  },

  position: {
    color: "#EAEAEA",
    fontSize: 16,
    marginTop: 5,
  },

  /* ===========================
      CARD
  =========================== */

  card: {
    backgroundColor: theme.card,
    marginHorizontal: 25,
    marginTop: -35,
    borderRadius: 20,
    padding: 25,

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  infoText: {
    marginLeft: 15,
    flex: 1,
  },

  label: {
    color: theme.subtitle,
    fontSize: 13,
  },

  value: {
    color: theme.text,
    fontSize: 17,
    fontWeight: "600",
    marginTop: 3,
  },

  xp: {
    color: theme.accent,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 3,
  },

  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 8,
  },

  /* ===========================
      BOTÃO EDITAR
  =========================== */

  editButton: {
    marginHorizontal: 25,
    backgroundColor: theme.primary,
    height: 55,
    borderRadius: 16,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 8,
  },

  /* ===========================
      BOTÃO SAIR
  =========================== */

  logoutButton: {
    marginHorizontal: 25,
    marginTop: 0,
    marginBottom: 25,
    height: 55,

    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.primary,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  logoutText: {
    color: theme.primary,
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 8,
  },

  /* ===========================
      RODAPÉ
  =========================== */

  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 13,
    marginBottom: 20,
  },

  /* ========================
      Modal
  ==========================*/

  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.45)",
  justifyContent: "center",
  alignItems: "center",
},

modalContainer: {
  width: "90%",
  backgroundColor: theme.card,
  borderRadius: 20,
  padding: 25,

  elevation: 10,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowRadius: 8,
},

modalTitle: {
  fontSize: 22,
  fontWeight: "bold",
  color: theme.primary,
  textAlign: "center",
  marginBottom: 25,
},

modalInput: {
  height: 55,
  backgroundColor: "#F4F4F4",
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#DDDDDD",
  paddingHorizontal: 15,
  marginBottom: 15,
  fontSize: 16,
  color: theme.text,
},

modalButtons: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
},

cancelButton: {
  flex: 1,
  height: 50,
  borderWidth: 2,
  borderColor: theme.primary,
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 8,
},

saveButton: {
  flex: 1,
  height: 50,
  backgroundColor: theme.primary,
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 8,
},

cancelText: {
  color: theme.primary,
  fontWeight: "bold",
  fontSize: 16,
},

saveText: {
  color: "#FFF",
  fontWeight: "bold",
  fontSize: 16,
},

photoContainer: {
  alignItems: "center",
  marginBottom: 20,
},

photoButton: {
  position: "relative",
},

modalProfileImage: {
  width: 110,
  height: 110,
  borderRadius: 55,
  borderWidth: 3,
  borderColor: theme.primary,
},

cameraIcon: {
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: theme.primary,
  width: 34,
  height: 34,
  borderRadius: 17,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#FFF",
},

changePhoto: {
  marginTop: 10,
  color: theme.primary,
  fontWeight: "600",
  fontSize: 15,
},

});