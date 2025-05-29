// components/RedirectGate.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "./AuthContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const RedirectGate = ({ children }: { children: React.ReactNode }) => {
  const { userId, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (userId) {
        router.replace("/(tabs)");
      } else {
        router.replace("/loginPage");
      }
    }
  }, [loading, userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  // Se muestra solo si ya redireccionaste o estás en la ruta correcta
  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7f8387",
  },
});
