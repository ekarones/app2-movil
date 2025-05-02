import { Stack } from "expo-router";

export default function HistoryLayout() {
  return (
    <Stack
    screenOptions={{
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#17B8A6" },
      contentStyle: { backgroundColor: "#f2f2f2" },
    }}
  >
    <Stack.Screen
      name="index"
      options={{
        title: "Historial",
      }}
    />
    <Stack.Screen
      name="diagnosePageSuccess"
      options={{
        title: "Detalles del diagnóstico",
      }}
    />
  </Stack>
    
  );
}
