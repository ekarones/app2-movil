import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { AuthProvider } from "../components/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#202531" },
          headerTintColor: "#FFFFFF",
          contentStyle: { backgroundColor: "#202531" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Iniciar sesión",
          }}
        />
        <Stack.Screen
          name="registerPage"
          options={{
            headerTitle: "Regístrate",
          }}
        />
        <Stack.Screen
          name="menu"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </AuthProvider>
  );
}
