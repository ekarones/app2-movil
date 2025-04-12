import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";

const { API_GET_IMAGE_URL, API_GET_IMAGE_ASSETS_URL } = Constants.expoConfig.extra;

export default function DiagnosePageSuccess() {
  const { result0, result1 } = useLocalSearchParams();
  const result_1 = result1 ? JSON.parse(result1 as string) : null;
  const result = result0 ? JSON.parse(result0 as string) : null;


  // Estado para controlar qué acordeones están abiertos
  const [expandedIndexes, setExpandedIndexes] = useState(result_1?.data ? new Array(result_1.data.length).fill(false) : []);

  // Función para alternar la expansión de los acordeones
  const toggleAccordion = (index) => {
    setExpandedIndexes((prevState) => {
      if (!Array.isArray(prevState)) return []; // Manejo de errores
      const newState = [...prevState]; // Clonar el estado anterior
      newState[index] = !newState[index]; // Alternar el estado del acordeón
      return newState;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subtitle}>
          🔎 <Text style={{ fontWeight: "bold" }}>Diagnóstico:</Text> {result.disease_name || "Desconocido"}
        </Text>

        {/* Contenedor de imágenes */}
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            {result.record_image ? <Image source={{ uri: API_GET_IMAGE_URL + "?filename=" + result.record_image }} style={styles.image} resizeMode="contain" /> : <Text style={styles.subtitle}>Imagen no disponible</Text>}
            <Text style={styles.imageLabel}>Imagen procesada</Text>
          </View>

          <View style={styles.imageContainer}>
            {result.disease_image ? <Image source={{ uri: API_GET_IMAGE_ASSETS_URL + "?filename=" + result.disease_image }} style={styles.image} resizeMode="contain" /> : <Text style={styles.subtitle}>Imagen no disponible</Text>}
            <Text style={styles.imageLabel}>Imagen referencial</Text>
          </View>
        </View>

        {/* Descripción */}
        <Text style={styles.subtitle}>
          ⚠️ <Text style={{ fontWeight: "bold" }}>Descripción:</Text> {result.description || "Desconocido"}
        </Text>

        {/* Consejos recomendados */}
        <Text style={styles.normalText}>👩‍🔬 Consejos recomendados por expertos</Text>

        {result_1?.data?.map((advice, index) => (
          <View key={advice[0]} style={styles.accordionContainer}>
            {/* Botón de acordeón */}
            <TouchableOpacity onPress={() => toggleAccordion(index)} style={styles.accordionHeader}>
              <Text style={styles.accordionTitle}>🔽 Consejo # {index + 1}</Text>
            </TouchableOpacity>

            {/* Contenido del acordeón (visible solo si está expandido) */}
            {expandedIndexes[index] && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionText}>{advice[2]}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
  scrollContainer: {
    paddingVertical: 20,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#37404F",    
    padding: 10,
    marginHorizontal: 10,
    lineHeight: 24,
    borderRadius: 5,
  },
  normalText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  imageLabel: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  accordionContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  accordionHeader: {
    backgroundColor: "#37404F",
    padding: 10,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    height: 40,
  },
  accordionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  accordionContent: {
    backgroundColor: "#202531",
    padding: 10,
    borderWidth: 2,
    borderColor: "#37404F",    
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  accordionText: {
    fontSize: 15,
    color: "#FFFFFF",
    lineHeight: 24,
  },
});
