import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Perfil: undefined;
  Configuracoes: undefined;
  Tarefas: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const theme = {
  primary: '#7B2CBF',
  accent: '#00BFA6',
  background: '#1C1C1C',
  text: '#FFFFFF',
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        {/* Logo */}
        <Image
          source={require("../../assets/logoprov.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Conecta Cultura
        </Text>

        <Text style={styles.subtitle}>
          Engajamento e Comunicação Interna
        </Text>

      </View>

      {/* Boas-vindas */}
      <Text style={styles.title}>Bem-vindo!</Text>

      <Text style={styles.description}>
        Seja bem-vindo ao sistema da empresa.
        Aqui você poderá acompanhar suas tarefas,
        acessar suas informações de perfil e configurar
        sua conta de forma rápida e prática.
      </Text>

      {/* Botões */}
      <View style={styles.grid}>

        {/* Perfil */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Ionicons
            name="person-outline"
            size={38}
            color={theme.accent}
          />
          <Text style={styles.cardText}>Perfil</Text>
        </TouchableOpacity>

        {/* Ranking */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Ranking')}
        >
          <Ionicons
            name="settings-outline"
            size={38}
            color={theme.accent}
          />
          <Text style={styles.cardText}>Ranking</Text>
        </TouchableOpacity>

        {/* Tarefas */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('GestaoRotinas')}
        >
          <Ionicons
            name="list-outline"
            size={38}
            color={theme.accent}
          />
          <Text style={styles.cardText}>Tarefas</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 45,
  },

  logo: {
    width: 240,
    height: 230,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "black",
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 15,
    color: "#0b0b0b",
    marginTop: 6,
  },

  description: {
    color: '#010101',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },

  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },

  card: {
    width: 120,
    height: 120,
    backgroundColor: '#7B2CBF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    elevation: 5,
  },

  cardText: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
    fontWeight: '600',
  },
});