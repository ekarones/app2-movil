import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const DiagnoseSection = () => {
  return (
    <>
      <Text>Diagnóstico</Text>
    </>
  );
};

const HistorySection = () => {
  return (
    <>
      <Text>History</Text>
    </>
  );
};

const UserSection = () => {
  return (
    <>
      <Text>User</Text>
    </>
  );
};

const NotificationsSection = () => {
  return (
    <>
      <Text>Notification</Text>
    </>
  );
};

export default function Menu() {
  return (
    <Tab.Navigator
      {...({} as any)}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#24242c",
          boxShadow: "0 0 16 rgba(0, 0, 0, 0.4)",
        },
        tabBarActiveTintColor: "#D4805C",
        tabBarInactiveTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#24242c",
          borderBottomWidth: 0.5,
          borderBottomColor: "#fff",
          boxShadow: "0 0 16 rgba(0, 0, 0, 0.4)",
        },
        headerTintColor: "#fff",
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Diagnóstico"
        component={DiagnoseSection}
        options={{
          tabBarLabel: "Diagnóstico",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" size={size} color={color} /> // Icono para Home
          ),
        }}
      />
      <Tab.Screen
        name="Historial"
        component={HistorySection}
        options={{
          tabBarLabel: "Historial",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-sharp" size={size} color={color} /> // Icono para Settings
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={UserSection}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} /> // Icono para Profile
          ),
        }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={NotificationsSection}
        options={{
          tabBarLabel: "Notificaciones",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} /> // Icono para Notifications
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24242c",
  },
});
