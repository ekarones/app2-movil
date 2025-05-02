import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";
import { useAuth } from "../../../components/AuthContext";

const { API_UPLOAD_IMAGE_URL, API_GET_ADVICES_BY_DISEASE_URL } = Constants.expoConfig.extra;

export default function DiagnosePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Se necesitan permisos para acceder a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCameraLaunch = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Se necesitan permisos para acceder a la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handleSendImage = async () => {
    if (!selectedImage) {
      alert("No se ha seleccionado ninguna imagen.");
      return;
    }
    setLoading(true);
    try {
      // 🔧 Comprimir y redimensionar la imagen
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        selectedImage,
        [{ resize: { width: 800 } }], // Cambia el ancho, mantiene el aspecto
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Comprime a 70%
      );

      const formData = new FormData();
      formData.append("user_id", String(userId));
      formData.append("image", {
        uri: manipulatedImage.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);

      const response = await fetch(API_UPLOAD_IMAGE_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error del servidor:", errorText);
        throw new Error("Error al subir la imagen");
      }

      const result = await response.json();

      if (!result.disease_name) {
        throw new Error("El resultado no contiene 'disease_name'.");
      }

      const response_1 = await fetch(`${API_GET_ADVICES_BY_DISEASE_URL}?disease_name=${encodeURIComponent(result.disease_name)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result_1 = await response_1.json();

      router.push({
        pathname: "/diagnosePageSuccess",
        params: {
          result0: JSON.stringify(result),
          result1: JSON.stringify(result_1),
        },
      });
    } catch (error) {
      console.error(error);
      alert("Error al enviar la imagen al servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textSubtitle}>Selecciona una imagen o toma una foto</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <Image source={require("../../../assets/images/take-photo.png")} resizeMode="contain" style={styles.image} />
        )}
        <View style={styles.form}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.normalButton} onPress={handleImagePick}>
              <Ionicons name="images-outline" size={64} color="black" />
              <Text style={styles.textNormalButton}>Cargar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.normalButton} onPress={handleCameraLaunch}>
              <Ionicons name="camera-outline" size={64} color="black" />
              <Text style={styles.textNormalButton}>Tomar Foto</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendImage}>
            <Text style={styles.textSendButton}>Diagnosticar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#595c5f" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical:5,
  },
  header: {
    padding: 20,
  },
  textHeader: {
    color: "#17B8A6",
    fontSize: 32,
    fontWeight: "bold",
  },
  textSubtitle: {
    color: "#595c5f",
    fontSize: 16,
    fontWeight: "bold",
  },
  sendButton: {
    backgroundColor: "#17B8A6",
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    elevation: 8,
  },
  textSendButton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
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
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 30,
  },
  form: {
    alignItems: "center",
    gap: 20,
  },
  row: {
    gap: 20,
    flexDirection: "row",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
