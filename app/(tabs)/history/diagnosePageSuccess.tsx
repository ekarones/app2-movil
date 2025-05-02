import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";

const { API_GET_IMAGE_URL, API_GET_IMAGE_ASSETS_URL } = Constants.expoConfig.extra;

export default function DiagnosePageSuccess() {
  const { result0, result1 } = useLocalSearchParams();
  const result_1 = result1 ? JSON.parse(result1 as string) : null;
  const result = result0 ? JSON.parse(result0 as string) : null;

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.textSubtitle}>Información de la imagen</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            {result.record_image ? (
              <View style={styles.imageContainerb}>
                <Image source={{ uri: API_GET_IMAGE_URL + "?filename=" + result.record_image }} style={styles.image} resizeMode="cover" />
              </View>
            ) : (
              <Text style={styles.subtitle}>Imagen no disponible</Text>
            )}
            <Text style={styles.imageLabel}>Imagen procesada</Text>
          </View>

          <View style={styles.imageContainer}>
            {result.disease_image ? (
              <View style={styles.imageContainerb}>
                <Image source={{ uri: API_GET_IMAGE_ASSETS_URL + "?filename=" + result.disease_image }} style={styles.image} resizeMode="contain" />
              </View>
            ) : (
              <Text style={styles.subtitle}>Imagen no disponible</Text>
            )}
            <Text style={styles.imageLabel}>Imagen referencial</Text>
          </View>
        </View>
        <View style={{ gap: 5 }}>
          <Text style={styles.subtitle}>
            <Text style={{ fontWeight: "bold" }}>Diagnóstico:</Text> {result.disease_name || "Desconocido"}
          </Text>
          <Text style={styles.subtitle}>
            <Text style={{ fontWeight: "bold" }}>Descripción:</Text> {result.description || "Desconocido"}
          </Text>
        </View>

        <Text style={[styles.textSubtitle, { paddingVertical: 20 }]}>Consejos recomendados por expertos</Text>
        <View style={styles.form}>
          {result_1?.data?.map((advice, index) => (
            <View key={advice[0]} style={styles.accordionContainer}>
              <View style={styles.accordionHeader}>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                  <Ionicons name="checkmark-circle" size={24} color="black" />
                  <Text style={styles.accordionTitle}>Consejo # {index + 1}</Text>
                </View>
              </View>
              <View style={styles.accordionContent}>
                <Text style={styles.accordionText}>{advice[2]}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical:5,
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
  scrollContainer: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  subtitle: {
    color: "#595c5f",
    fontSize: 16,
  },

  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  imageContainerb: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },
  imageLabel: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#595c5f",
  },
  accordionContainer: {
    elevation: 8,
    borderRadius: 10,
  },
  accordionHeader: {
    backgroundColor: "#ffffff",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
    width: 300,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  accordionTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  accordionContent: {
    padding: 10,
    backgroundColor: "#595c5f",
    width: 300,
    position: "relative",
    borderEndEndRadius: 10,
    borderStartEndRadius: 10,
  },
  accordionText: {
    fontSize: 15,
    color: "#FFFFFF",
    lineHeight: 24,
  },
  form: {
    alignItems: "center",
    gap: 20,
    padding: 10,
  },
});
