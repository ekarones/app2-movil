import React, { useState } from "react";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../components/AuthContext";
import Constants from "expo-constants";

const { API_LOGIN_URL } = Constants.expoConfig.extra;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useAuth();

  const validate = () => {
    if (password.length === 0 || email.length === 0) {
      alert("Los campos no pueden estar vacíos");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("El correo no es válido");
      return;
    }
    handleLogin();
  };
  const handleLogin = async () => {
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.message === "Login successful") {
          setUserId(responseData.user_id); // Guardar el id del usuario en el contexto
          router.push("/menu"); // Navegar a la pantalla de menú
        } else {
          alert("Credenciales incorrectas"); // Datos válidos pero incorrectos
        }
      } else {
        alert("Credenciales incorrectas"); // Datos no válidos (el correo no contiene @, la contraseña tiene menos de 6 caractéres, datos vacíos)
      }
    } catch (error) {
      alert("Hubo un problema con la conexión"); // Servidor caído
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>APP2</Text>
      <Text style={styles.subtitle}>Bienvenido de vuelta</Text>

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Correo"
        placeholderTextColor="#a9aaae"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Contraseña"
        placeholderTextColor="#a9aaae"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={validate}>
        <Text style={styles.textLoginButton}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/registerPage")}
      >
        <Text style={styles.textRegisterButton}>Crear una cuenta</Text>
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
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#FFFFFF",
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
  registerButton: {},
  textRegisterButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
