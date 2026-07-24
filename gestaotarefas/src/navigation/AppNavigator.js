import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import AvisosScreen from '../screens/AvisosScreen';
import AdminScreen from '../screens/AdminScreen';
import CriarAvisoScreen from '../screens/CriarAvisoScreen';
import GestaoRotinasScreen from '../screens/GestaoRotinasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import RankingScreen from '../screens/RankingScreen';
import CriarScreen from '../screens/CriarScreen';
import NovaTarefaScreen from "../screens/NovaTarefaScreen";


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false, // 🔹 Vamos criar nosso próprio topo customizado
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Avisos" component={AvisosScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="CriarAviso" component={CriarAvisoScreen} />
        <Stack.Screen name="GestaoRotinas" component={GestaoRotinasScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Ranking" component={RankingScreen} />
        <Stack.Screen name="Criar" component={CriarScreen} />
        <Stack.Screen name="NovaTarefa" component={NovaTarefaScreen}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
