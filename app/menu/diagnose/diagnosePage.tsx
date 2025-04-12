import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../../components/AuthContext";
import { router } from "expo-router";
import * as ImageManipulator from "expo-image-manipulator";

import Constants from "expo-constants";

const { API_UPLOAD_IMAGE_URL, API_GET_ADVICES_BY_DISEASE_URL } =
  Constants.expoConfig.extra;

export default function DiagnosePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { userId } = useAuth();

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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

      const response_1 = await fetch(
        `${API_GET_ADVICES_BY_DISEASE_URL}?disease_name=${encodeURIComponent(
          result.disease_name
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result_1 = await response_1.json();

      router.push({
        pathname: "/menu/diagnose/diagnosePageSuccess",
        params: {
          result0: JSON.stringify(result),
          result1: JSON.stringify(result_1),
        },
      });
    } catch (error) {
      console.error(error);
      alert("Error al enviar la imagen al servidor.");
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      ) : (
        <Ionicons name="image" size={200} color="#37404F" />
      )}
      <TouchableOpacity
        style={styles.normalButton}
        onPress={handleCameraLaunch}
      >
        <Text style={styles.textNormalButton}>Tomar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.normalButton} onPress={handleImagePick}>
        <Text style={styles.textNormalButton}>Cargar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sendButton} onPress={handleSendImage}>
        <Text style={styles.textSendButton}>Diagnosticar</Text>
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
  sendButton: {
    backgroundColor: "#C58C6D",
    width: 220,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  textSendButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
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
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 10,
  },
});
