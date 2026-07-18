import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const theme = {
  primary: "#7B2CBF",
  accent: "#00BFA6",
  background: "#1C1C1C",
  text: "#FFFFFF",
};

interface MenuItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: string;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    title: "Principal",
    icon: "home-outline",
    screen: "Main",
  },
  {
    id: "2",
    title: "Tarefas",
    icon: "checkbox-outline",
    screen: "GestaoRotinas",
  },
  {
    id: "3",
    title: "Ranking",
    icon: "trophy-outline",
    screen: "Ranking",
  },
  {
    id: "4",
    title: "Avisos",
    icon: "notifications-outline",
    screen: "Avisos",
  },
  {
    id: "5",
    title: "Criar",
    icon: "add-circle-outline",
    screen: "CriarAviso",
  },
  {
    id: "6",
    title: "Perfil",
    icon: "person-circle-outline",
    screen: "Perfil",
  },

  {
    id: "8",
    title: "Admin",
    icon: "settings-outline",
    screen: "Admin",
  },
  {
    id: "9",
    title: "Login",
    icon: "log-in-outline",
    screen: "Login",
  },
  {
    id: "10",
    title: "Cadastro",
    icon: "person-add-outline",
    screen: "Cadastro",
  },

];

export default function Footer() {

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.footer}>
      <FlatList
        data={menuItems}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.footerList}
        renderItem={({ item }: { item: MenuItem }) => (
          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => navigation.navigate(item.screen as never)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={
  route.name === item.screen
    ? theme.accent
    : theme.text
}
            />

            <Text
  style={[
    styles.footerText,
    route.name === item.screen && {
      color: theme.accent,
    },
  ]}
>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#2A2A2A",
    borderTopWidth: 1,
    borderTopColor: theme.primary,
    paddingVertical: 10,
    paddingBottom: 40,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 4,
  },

  footerList: {
    paddingHorizontal: 10,
  },

  footerItem: {
    width: 85,
    alignItems: "center",
    justifyContent: "center",
  },

  footerText: {
    fontSize: 12,
    color: theme.text,
    marginTop: 2,
  },
});