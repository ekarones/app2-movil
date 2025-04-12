import { Stack } from "expo-router";

export default function DiagnoseLayout() {
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
    //       headerTitle: "Nuevo Diagnóstico",
    //     }}
    //   />
    // </Stack>
  );
}
