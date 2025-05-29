import React, { useState } from "react";
import { Alert, ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../../components/AuthContext";
import { useFocusEffect } from "expo-router";
import { useRouter } from "expo-router"; // Para redireccionar al login

import Constants from "expo-constants";

const { API_GET_USER_BY_ID_URL } = Constants.expoConfig.extra;

interface UserData {
  data: [string, string, string];
}

export default function ConfigAccount() {
  const { userId } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // opcional
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetch(`${API_GET_USER_BY_ID_URL}${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setUsername(data.data[1]);
          setEmail(data.data[2]);
          setPassword(data.data[3]); // opcional
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setLoading(false);
        });
    }, [])
  );
  const validate = () => {
    if (username.length === 0 || email.length === 0) {
      alert("❌ Los campos no pueden estar vacíos");
      return;
    }

    if (username.length < 3) {
      alert("❌ El nombre de usuario debe tener al menos 3 caracteres");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("❌ El correo no es válido");
      return;
    }

    handleSave();
  };

  const handleSave = async () => {
    setLoading2(true);
    try {
      const response = await fetch(`${API_GET_USER_BY_ID_URL}${userId}`, {
        method: "PUT", // o PATCH si tu backend lo usa
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("✅ Éxito", "Datos actualizados correctamente.");
        setIsUsernameEditable(false);
        setIsEmailEditable(false);
      } else {
        alert("❌ El correo electrónico ya existe");
      }
    } catch (error) {
      console.error("❌ Error en la actualización:", error);
      alert("❌ Error en la conexión.");
    } finally {
      setLoading2(false);
    }
  };

  const router = useRouter();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setLoading2(true);
            try {
              const response = await fetch(`${API_GET_USER_BY_ID_URL}${userId}`, {
                method: "DELETE",
              });

              if (response.ok) {
                Alert.alert("✅ Cuenta eliminada", "Tu cuenta ha sido eliminada correctamente.");
                // Opcional: cerrar sesión aquí si usas AuthContext
                router.replace("/loginPage"); // asegúrate que esta ruta exista
              } else {
                Alert.alert("❌ Error", "No se pudo eliminar la cuenta.");
              }
            } catch (error) {
              console.error("Error al eliminar cuenta:", error);
              Alert.alert("❌ Error", "Hubo un problema al eliminar la cuenta.");
            } finally {
              setLoading2(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#595c5f" />
        </View>
      ) : (
        <View style={{ flex: 1, borderWidth: 0, flexDirection: "column", justifyContent: "space-between" }}>
          <View style={{ gap: 20 }}>
            <View style={styles.card}>
              <View style={{ gap: 10 }}>
                <Text style={styles.title}>Actualizar datos</Text>

                {/* Usuario */}
                <View>
                  <Text style={{ color: "#17B8A6", paddingBottom: 1 }}>Nombre de usuario</Text>
                  <View style={styles.row}>
                    <TextInput
                      style={isUsernameEditable ? styles.inputEditable : styles.input}
                      autoCapitalize="none"
                      placeholder="Nombre de usuario"
                      placeholderTextColor="#dee2e6"
                      value={username}
                      onChangeText={setUsername}
                      editable={isUsernameEditable}
                    />
                    <TouchableOpacity style={styles.editButton} onPress={() => setIsUsernameEditable(!isUsernameEditable)}>
                      <Ionicons name={isUsernameEditable ? "checkmark" : "pencil"} size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ borderBottomWidth: 1, width: 300, borderBottomColor: "#b3b3b3" }}></View>

                {/* Correo */}
                <View>
                  <Text style={{ color: "#17B8A6", paddingBottom: 1 }}>Correo electrónico</Text>
                  <View style={styles.row}>
                    <TextInput
                      style={isEmailEditable ? styles.inputEditable : styles.input}
                      autoCapitalize="none"
                      placeholder="Correo electrónico"
                      placeholderTextColor="#dee2e6"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={setEmail}
                      editable={isEmailEditable}
                    />
                    <TouchableOpacity style={styles.editButton} onPress={() => setIsEmailEditable(!isEmailEditable)}>
                      <Ionicons name={isEmailEditable ? "checkmark" : "pencil"} size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>

                {(isUsernameEditable || isEmailEditable) && (
                  <TouchableOpacity style={styles.primaryButton} onPress={validate}>
                    <Text style={styles.title}>Guardar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Eliminar cuenta */}
            <View style={styles.cardb}>
              <View style={{ width: 300 }}>
                <View style={styles.row}>
                  <Text style={styles.title}>Eliminar cuenta</Text>
                  <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                    <Ionicons name="trash-outline" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <Image source={require("../../../assets/images/config-img.png")} resizeMode="contain" style={{ height: 200, width: 300 }} />
          </View>
        </View>
      )}
      {loading2 && (
        <View style={styles.overlay2}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 20,
    alignItems: "center",
    // justifyContent: "center",
    gap: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  overlay2: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // width: 300,
    padding: 20,
    elevation: 8,
  },
  cardb: {
    backgroundColor: "#cd6155",
    borderRadius: 10,
    // width: 300,
    padding: 20,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
  },
  primaryButton: {
    backgroundColor: "#17B8A6",
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    elevation: 8,
  },
  editButton: {
    backgroundColor: "#17B8A6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    elevation: 8,
  },
  deleteButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    elevation: 8,
  },
  input: {
    backgroundColor: "#b3b3b3",
    width: 240,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  inputEditable: {
    backgroundColor: "#ffffff", // o el color que prefieras
    width: 240,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#17B8A6",
  },
});
