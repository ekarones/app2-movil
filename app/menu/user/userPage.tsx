import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../../components/AuthContext";
import Constants from "expo-constants";

const { API_GET_USER_BY_ID_URL } = Constants.expoConfig.extra;

interface UserData {
    data: [string, string, string];
  }

export default function UserPage() {
  const { userId } = useAuth();
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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <View style={styles.perfil}>
            <Ionicons name="person-circle" size={75} color="#37404F" />
            <View>
              <Text style={styles.whiteText}>
                <Text style={{ fontWeight: "bold" }}>ID: </Text>
                {userData.data[0]}
              </Text>
              <Text style={styles.whiteText}>
                <Text style={{ fontWeight: "bold" }}>Nombre de usuario: </Text>
                {userData.data[1]}
              </Text>
              <Text style={styles.whiteText}>
                <Text style={{ fontWeight: "bold" }}>Correo: </Text>
                {userData.data[2]}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.normalButton}>
            <Text style={styles.textNormalButton}>Editar datos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.normalButton}>
            <Text style={styles.textNormalButton}>Acerca de APP2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.normalButton}>
            <Text style={styles.textNormalButton}>Manual de usuario</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202531",
  },
  normalButton: {
    height: 40,
    padding: 10,
    width: 220,
    marginBottom: 12,
    backgroundColor: "#37404F",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textNormalButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  whiteText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  perfil: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: "#37404F",
    borderWidth: 2,
    borderRadius: 5,
    gap: 5,
    marginBottom: 32,
  },
});
