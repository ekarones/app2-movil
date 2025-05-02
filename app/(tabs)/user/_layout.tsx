import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#000",
        headerStyle: { backgroundColor: "#17B8A6" },
        contentStyle: { backgroundColor: "#f2f2f2" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Perfil",
        }}
      />
      <Stack.Screen
        name="notificationsPage"
        options={{
          title: "Noticias",
        }}
      />
      <Stack.Screen
        name="guide"
        options={{
          title: "Guía rápida",
        }}
      />
    </Stack>
  );
}
