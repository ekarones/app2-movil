import { Stack } from "expo-router";
import { View} from "react-native";

export default function DiagnoseLayout() {

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
            title: "Diagnóstico",
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
