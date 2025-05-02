import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";

const { API_REGISTER_URL } = Constants.expoConfig.extra;

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
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

    if (password.length < 6) {
      alert("❌ La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    handleRegister();
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        alert("✔️ Cuenta creada exitosamente");
      } else {
        const error = await response.json();

        let errorMessage = "❌ Los datos no son válidos";
        if (error.detail) {
          switch (error.detail) {
            case "Email already exists":
              errorMessage = "❌ El correo electrónico ya existe";
              break;
            case "Invalid credentials":
              errorMessage = "❌ Credenciales no válidas";
              break;
            default:
              errorMessage = error.detail;
              break;
          }
        }
        alert(errorMessage);
      }
    } catch (err) {
      alert("❌ Hubo un problema con la conexión");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#7f8387" }}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>!Crea una cuenta!</Text>
          <Text>Ingresa tus datos para registrarse</Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.form}>
            <View style={styles.row}>
              <Ionicons name="person-outline" size={24} color="#ffffff" />
              <TextInput style={styles.input} autoCapitalize="none" placeholder="Usuario" placeholderTextColor="#dee2e6" value={username} onChangeText={setUsername} />
            </View>
            <View style={styles.row}>
              <Ionicons name="at" size={24} color="#ffffff" />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Correo electrónico"
                placeholderTextColor="#dee2e6"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.row}>
              <Ionicons name="key-outline" size={24} color="#ffffff" />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Contraseña"
                placeholderTextColor="#dee2e6"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.row}>
              <Ionicons name="key-outline" size={24} color="#ffffff" />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Confirmar contraseña"
                placeholderTextColor="#dee2e6"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={validate}>
              <Text style={styles.loginButtonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#7f8387",
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    width: 260,
    fontSize: 16,
    color: "#FFFFFF",
  },
  subtitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#f2f2f2",
    borderBottomRightRadius: 50,
    paddingTop: 90,
    paddingHorizontal: 35,
    paddingBottom: 20,    
    elevation: 8,
  },
  loginButton: {
    backgroundColor: "#17B8A6",
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  loginButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
  },
  form: {
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  overlay: {
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
});
