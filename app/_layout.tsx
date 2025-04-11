import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function App() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="registerPage"
          options={{
            headerTitle: "Registrar usuario",
            headerTintColor: "#ffffff",
            headerTransparent: true,
          }}
        />
        <Stack.Screen name="menu" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
