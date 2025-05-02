import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";


export default function Menu() {
    useEffect(() => {
      NavigationBar.setBackgroundColorAsync("#ffffff");
      NavigationBar.setButtonStyleAsync("dark");
    }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#17B8A6" }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#ffffff",
            elevation: 0,
            borderColor:"transparent",
          },
          tabBarActiveTintColor: "#17B8A6",
          tabBarInactiveTintColor: "#000",
          headerTransparent: true,
          headerTitle: "",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Diagnóstico",
            tabBarLabel: "Diagnóstico",
            tabBarIcon: ({ color, size }) => <Ionicons name="leaf-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "Historial",
            tabBarLabel: "Historial",
            tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            title: "Perfil",
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
