import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";

const { API_REGISTER_URL } = Constants.expoConfig.extra;

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validate = () => {
    if (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      Alert.alert("❌ Error", "Los campos no pueden estar vacíos");
      return;
    }

    if (username.length < 3) {
      Alert.alert(
        "❌ Error",
        "El nombre de usuario debe tener al menos 3 caracteres"
      );
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("❌ Error", "El correo no es válido");
      return;
    }

    if (password.length < 6) {
      Alert.alert("❌ Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("❌ Error", "Las contraseñas no coinciden");
      return;
    }

    handleRegister();
  };

  const handleRegister = async () => {
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
        Alert.alert("✅ Éxito", "Cuenta creada exitosamente");
      } else {
        const error = await response.json();

        let errorMessage = "Los datos no son válidos";
        if (error.detail) {
          switch (error.detail) {
            case "Email already exists":
              errorMessage = "El correo electrónico ya existe";
              break;
            case "Invalid credentials":
              errorMessage = "Credenciales no válidas";
              break;
            default:
              errorMessage = error.detail;
              break;
          }
        }
        Alert.alert("❌ Error", errorMessage);
      }
    } catch (err) {
      Alert.alert("❌ Error", "Hubo un problema con la solicitud");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>APP2</Text>
      <Text style={styles.subtitle}>Crea una cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#a9aaae"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#a9aaae"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#a9aaae"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#a9aaae"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.loginButton} onPress={validate}>
        <Text style={styles.textLoginButton}>Crear una cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202531",
  },
  loginButton: {
    backgroundColor: "#C58C6D",
    width: 220,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginBottom: 16,
  },
  textLoginButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    padding: 10,
    width: 220,
    marginBottom: 12,
    backgroundColor: "#37404F",
    borderRadius: 5,
    borderWidth: 1,
    color: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
});
