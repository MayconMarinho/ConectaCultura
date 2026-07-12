import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DaySelector from '../components/DaySelector';
import TaskInput from '../components/TaskInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native";
import Footer from "../components/footer";



const theme = {
  primary: '#7B2CBF',      // Roxo
  accent: '#00BFA6',       // Ciano
  background: '#1C1C1C',   // Cinza-chumbo
  text: '#FFFFFF',         // Branco
};

export default function HomeScreen({ navigation }) {
  // 🔹 Estado para controlar o dia selecionado
  const [selectedDay, setSelectedDay] = useState('segunda');

  // 🔹 Estado com listas de tarefas separadas por dia
  const [tasks, setTasks] = useState({
    segunda: [],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sabado: [],
    domingo: [],
  });

  // 🔹 Função para adicionar nova tarefa
  const addTask = (day, text) => {
  if (text.trim() === '') return;
  const newTask = { text, completed: false }; // ✅ adiciona completed
  setTasks(prev => ({
    ...prev,
    [day]: [...prev[day], newTask],
  }));
};

const toggleTask = (day, index) => {
  setTasks(prev => ({
    ...prev,
    [day]: prev[day].map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    ),
  }));
};

const deleteTask = (day, index) => {
  setTasks(prev => ({
    ...prev,
    [day]: prev[day].filter((_, i) => i !== index),
  }));
};

useEffect(() => {
  // 🔹 Carrega as tarefas do armazenamento ao iniciar o app
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas:', error);
    }
  };

  loadTasks();
}, []);

useEffect(() => {
  // 🔹 Salva as tarefas sempre que forem alteradas
  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log('Erro ao salvar tarefas:', error);
    }
  };

  // Só salva depois que o app já carregou as tarefas
  if (Object.keys(tasks).length > 0) {
    saveTasks();
  }
}, [tasks]);


  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
  {/* 🔹 Logo à esquerda */}
  <View style={styles.logoContainer}>
    <Image 
      source={require('../../assets/logoprov.png')}
      style={{ width: 80, height: 70 }}
    />
  </View>

  {/* 🔹 Título central */}
  <Text style={styles.title}>Tarefas Semanais</Text>

  {/* 🔹 Botão "Principal" à direita */}
  <TouchableOpacity
    style={[styles.mainButton, { backgroundColor: theme.primary }]}
    onPress={() => navigation.navigate('Main')}
  >
    <Ionicons name="home-outline" size={20} color={theme.text} />
    <Text style={[styles.mainButtonText, { color: theme.text }]}>Principal</Text>
  </TouchableOpacity>
</View>

      {/* Seleção de dias */}
      <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      {/* Campo de entrada da tarefa */}
      <TaskInput onAddTask={(task) => addTask(selectedDay, task)} />

      {/* Lista de tarefas do dia atual */}
      <FlatList
  data={tasks[selectedDay]}
  keyExtractor={(item, index) => index.toString()}
  contentContainerStyle={{ paddingBottom: 100 }} // espaço para o input fixo
  renderItem={({ item, index }) => (
    <View style={styles.taskItem}>
      {/* Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        onPress={() => toggleTask(selectedDay, index)}
      >
        {item.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
      </TouchableOpacity>

      {/* Texto da tarefa */}
      <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
        {item.text}
      </Text>

      {/* Lixeira */}
      <TouchableOpacity onPress={() => deleteTask(selectedDay, index)}>
        <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
    
  )}
/>

{/* 🔹 Rodapé moderno */}
<Footer />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 25,
  backgroundColor: theme.background,
},

logoContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
},

mainButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 12,
  gap: 6,
  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 3,
  elevation: 3,
},

mainButtonText: {
  fontSize: 16,
  fontWeight: '600',
},

title: {
  fontSize: 22,
  fontWeight: 'bold',
  color: theme.text,
  textAlign: 'center',
  flex: 1,
},
  icon: {
    marginRight: 10,
  },
  taskItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#2A2A2A',
  padding: 14,
  borderRadius: 14,
  marginVertical: 6,
  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 3,
},
checkbox: {
  width: 26,
  height: 26,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: theme.accent,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
},
checkboxChecked: {
  backgroundColor: theme.accent,
  borderColor: theme.accent,
},
taskText: {
  flex: 1,
  fontSize: 16,
  color: theme.text,
},
taskCompleted: {
  textDecorationLine: 'line-through',
  color: '#888',
},

});
