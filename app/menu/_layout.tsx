import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function Menu() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#202531",
        },
        tabBarActiveTintColor: "#C58C6D",
        tabBarInactiveTintColor: "#FFFFFF",
        headerStyle: {
          backgroundColor: "#202531",
        },
        headerTintColor: "#FFFFFF",
      }}
    >
      <Tabs.Screen
        name="diagnose"
        options={{
          title: "Diagnóstico",
          tabBarLabel: "Diagnóstico",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Historial",
          tabBarLabel: "Historial",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notificaciones",
          tabBarLabel: "Notificaciones",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
