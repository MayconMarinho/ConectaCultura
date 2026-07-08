import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const theme = {
  primary: '#7B2CBF',      // Roxo
  accent: '#00BFA6',       // Ciano
  background: '#1C1C1C',   // Cinza-chumbo
  text: '#FFFFFF',         // Branco
};

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Painel Principal</Text>

      {/* Container dos botões */}
      <View style={styles.grid}>
        {/* Perfil */}
        <TouchableOpacity style={styles.card} onPress={() => console.log('Ir para Perfil')}>
          <Ionicons name="person-outline" size={36} color={theme.accent} />
          <Text style={styles.cardText}>Perfil</Text>
        </TouchableOpacity>

        {/* Configurações */}
        <TouchableOpacity style={styles.card} onPress={() => console.log('Ir para Configurações')}>
          <Ionicons name="settings-outline" size={36} color={theme.accent} />
          <Text style={styles.cardText}>Configurações</Text>
        </TouchableOpacity>

        {/* Financeiro */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Finance')}>
          <Ionicons name="wallet-outline" size={36} color={theme.accent} />
          <Text style={styles.cardText}>Financeiro</Text>
        </TouchableOpacity>

        {/* Alimentação */}
        <TouchableOpacity style={styles.card} onPress={() => console.log('Ir para Alimentação')}>
          <Ionicons name="fast-food-outline" size={36} color={theme.accent} />
          <Text style={styles.cardText}>Alimentação</Text>
        </TouchableOpacity>

        {/* Tarefas */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="list-outline" size={36} color={theme.accent} />
          <Text style={styles.cardText}>Tarefas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    width: 110,
    height: 110,
    backgroundColor: '#2A2A2A',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    color: theme.text,
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
});
