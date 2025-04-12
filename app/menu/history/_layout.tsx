import { Stack } from "expo-router";

export default function HistoryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
    // <Stack
    //   screenOptions={{
    //     headerStyle: { backgroundColor: "#37404F" },
    //     headerTintColor: "#FFFFFF",
    //     contentStyle: { backgroundColor: "#202531" },
    //   }}
    // >
    //   <Stack.Screen
    //     name="index"
    //     options={{
    //       headerShown: false,
    //     }}
    //   />
    //   <Stack.Screen
    //     name="diagnosePageSuccess"
    //     options={{
    //       headerTitle: "Volver a historial",
    //     }}
    //   />
    // </Stack>
  );
}
