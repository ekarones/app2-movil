import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../../components/AuthContext";
import Constants from "expo-constants";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { API_GET_USER_BY_ID_URL } = Constants.expoConfig.extra;

interface UserData {
  data: [string, string, string];
}

export default function UserPage() {
  const { userId, setUserId } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetch(`${API_GET_USER_BY_ID_URL}${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setLoading(false);
        });
    }, [])
  );

  const logout = async () => {
    await AsyncStorage.removeItem("userId");
    setUserId(null);
    router.replace("/login");
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar sesión", onPress: logout, style: "destructive" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#595c5f" />
        </View>
      ) : (
        <>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="person-circle" size={100} color="#b3b3b3" />
            <View style={{ paddingTop: 5, paddingBottom: 40, width: 300, gap: 5 }}>
              <Text style={styles.whiteText}>
                <Text style={{ fontWeight: "bold" }}>Nombre de usuario: </Text>
                {userData.data[1]}
              </Text>
              <Text style={styles.whiteText}>
                <Text style={{ fontWeight: "bold" }}>Correo: </Text>
                {userData.data[2]}
              </Text>
            </View>
            <View style={styles.form}>
              <TouchableOpacity style={styles.normalButton} onPress={() => router.push("/user/configAccount")}>
                <Ionicons name="settings-outline" size={64} color="black" />
                <Text style={styles.textNormalButton}>Configuración</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.normalButton} onPress={() => router.push("/user/notificationsPage")}>
                <Ionicons name="newspaper-outline" size={64} color="black" />
                <Text style={styles.textNormalButton}>Noticias</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.normalButton} onPress={() => router.push("/user/guide")}>
                <Ionicons name="help-circle-outline" size={64} color="black" />
                <Text style={styles.textNormalButton}>Guía</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.normalButton} onPress={handleLogout}>
                <Ionicons name="exit-outline" size={64} color="black" />
                <Text style={styles.textNormalButton}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  normalButton: {
    backgroundColor: "#fff",
    width: 140,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    elevation: 8,
  },
  textNormalButton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  whiteText: {
    color: "#000",
    fontSize: 16,
    backgroundColor: "#b3b3b3",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 300,
  },
  perfil: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 5,
    marginBottom: 32,
  },
  form: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: 320,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
