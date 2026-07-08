import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const theme = {
  primary: '#7B2CBF',      // Roxo
  accent: '#00BFA6',       // Ciano
  background: '#1C1C1C',   // Cinza-chumbo
  text: '#FFFFFF',         // Branco
  muted: '#999999',        // Cinza para placeholders
};

export default function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim() === '') return;
    onAddTask(taskText);
    setTaskText('');
  };

  return (
    <View style={styles.container}>
      {/* Campo de texto */}
      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa..."
        placeholderTextColor={theme.muted}
        value={taskText}
        onChangeText={setTaskText}
      />

      {/* Botão + */}
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },

  input: {
    flex: 1,
    backgroundColor: '#2A2A2A', // Cinza-chumbo mais claro que o fundo
    color: theme.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: theme.primary, // Roxo discreto nas bordas
  },

  button: {
    backgroundColor: theme.accent, // Ciano brilhante
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },

  buttonText: {
    color: theme.text,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
