import React from 'react';
import {
  ScrollView,
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
  Ranking: undefined;
  GestaoRotinas: undefined;
  Configuracoes: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const theme = {
  primary: '#7B2CBF',
  accent: '#00BFA6',
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image
          source={require('../../assets/logoprov.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Conecta Cultura</Text>

        <Text style={styles.subtitle}>
          Engajamento e Comunicação Interna
        </Text>
      </View>

      <Text style={styles.welcome}>Bem-vindo!</Text>

      <Text style={styles.description}>
        Seja bem-vindo ao sistema da empresa. Aqui você terá acesso às suas
        tarefas de forma dinâmica e divertida. Você poderá participar de
        competições e acompanhar sua performance de forma justa.
      </Text>

      <View style={styles.grid}>
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

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Ranking')}
        >
          <Ionicons
            name="trophy-outline"
            size={38}
            color={theme.accent}
          />
          <Text style={styles.cardText}>Ranking</Text>
        </TouchableOpacity>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },

  subtitle: {
    fontSize: 15,
    color: '#444',
    marginTop: 5,
  },

  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },

  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },

  card: {
    width: 120,
    height: 120,
    backgroundColor: '#7B2CBF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    elevation: 5,
  },

  cardText: {
    color: '#FFF',
    marginTop: 10,
    fontWeight: '600',
    fontSize: 15,
  },
});