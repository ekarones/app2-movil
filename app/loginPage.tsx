import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../components/AuthContext";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 👈 agregado

const { API_LOGIN_URL } = Constants.expoConfig.extra;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserId } = useAuth();

  const validate = () => {
    if (password.length === 0 || email.length === 0) {
      alert("❌ Los campos no pueden estar vacíos");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("❌ El correo no es válido");
      return;
    }

    handleLogin();
  };

  const handleLogin = async () => {
    setLoading(true);
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

      const responseData = await response.json();
      if (response.ok && responseData.message === "Login successful") {
        await AsyncStorage.setItem("userId", String(responseData.user_id)); // ✅ corregido

        // await AsyncStorage.setItem("userId", responseData.user_id); // 👈 persistencia
        setUserId(responseData.user_id);
        router.push("/(tabs)");
      } else {
        alert("❌ Credenciales incorrectas");
      }
    } catch (error) {
      alert("❌ Hubo un problema con la conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>App-2</Text>
        <Text style={styles.subtitle}>¡Bienvenido de vuelta!</Text>
        <View style={styles.imageContent}>
          <Image
            source={require("../assets/images/login-img.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <Text>Ingresa tus credenciales para continuar</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.form}>
          <View style={styles.row}>
            <Ionicons name="at" size={24} color="#ffffff" />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Correo eletrónico"
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
          <TouchableOpacity style={styles.loginButton} onPress={validate}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/registerPage")}>
            <Text style={styles.registerButtonText}>Crear una cuenta</Text>
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
  header: {
    backgroundColor: "#f2f2f2",
    borderBottomLeftRadius: 50,
    paddingTop: 90,
    paddingHorizontal: 35,
    paddingBottom: 20,
    elevation: 8,
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  input: {
    padding: 10,
    width: 260,
    fontSize: 16,
    color: "#ffffff",
  },
  title: {
    color: "#000000",
    fontSize: 50,
    fontFamily: "Engagement-Regular",
  },
  subtitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#17B8A6",
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    elevation: 8,
  },
  loginButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  registerButtonText: {
    fontWeight: "bold",
    color: "#dee2e6",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  image: {
    width: 300,
    height: 140,
  },
  imageContent: {
    alignItems: "center",
    padding: 5,
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
