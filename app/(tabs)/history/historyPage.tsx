import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { useAuth } from "../../../components/AuthContext";
import { router } from "expo-router";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const { API_GET_RECORDS_BY_ID_URL, API_GET_IMAGE_URL, API_RECORDS_URL, API_GET_DIAGNOSE_BY_RECORD_URL, API_GET_ADVICES_BY_DISEASE_URL } = Constants.expoConfig.extra;

export default function HistoryPage() {
  const { userId } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetch(`${API_GET_RECORDS_BY_ID_URL}${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setRecords(data.data.reverse());
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching records:", error);
          setLoading(false);
        });
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert("Eliminar registro", "¿Estás seguro de que deseas eliminar este registro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: () => {
          fetch(`${API_RECORDS_URL}${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then(() => {
              setRecords(records.filter((record) => record[0] !== id));
            })
            .catch((error) => {
              console.error("Error deleting record:", error);
            });
        },
        style: "destructive",
      },
    ]);
  };

  const handleView = async (id) => {
    try {
      // Primera petición
      const response = await fetch(`${API_GET_DIAGNOSE_BY_RECORD_URL}${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      // Validar que `result.disease_name` existe antes de hacer la segunda petición
      if (!result.disease_name) {
        throw new Error("El resultado no contiene 'disease_name'.");
      }

      /// Segunda petición (Corrección: Método GET en lugar de POST)
      const response_1 = await fetch(`${API_GET_ADVICES_BY_DISEASE_URL}?disease_name=${encodeURIComponent(result.disease_name)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response_1.ok) {
        throw new Error("Error en la segunda solicitud.");
      }

      const result_1 = await response_1.json();

      // Si ambas peticiones fueron exitosas, navegar a la pantalla de éxito
      router.push({
        pathname: "history/diagnosePageSuccess",
        params: {
          result0: JSON.stringify(result),
          result1: JSON.stringify(result_1),
        },
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: API_GET_IMAGE_URL + "?filename=" + item[2] }} style={styles.image} />
      <Text style={styles.title}>Diagnóstico: {item[4]}</Text>
      <Text style={styles.date}>Fecha: {item[5]}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item[0])}>
          <Text style={styles.buttonTextDelete}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.viewButton]} onPress={() => handleView(item[0])}>
          <Text style={styles.buttonText}>Ver mas detalle</Text>
          <Ionicons name="chevron-forward-sharp" size={20} color="#17B8A6" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#595c5f" />
        </View>
      ) : (
        <>
          <FlatList data={records} keyExtractor={(item) => item[0].toString()} renderItem={renderItem} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingVertical: 5,
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
  header: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignSelf: "stretch",
    flex: 1,
    elevation: 8,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: "#000",
    marginTop: 2,
  },
  // 💪 Estilo para los botones
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    // gap: 10,
  },
  button: {
    // flex: 1,
    // padding: 8,
    borderRadius: 5,
    alignItems: "center",
    // elevation: 8,
    height: 30,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  viewButton: {
    // backgroundColor: "#fff",
    // borderWidth: 1,
    height: 30,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#cd6155", // Rojo para "Eliminar"
  },
  buttonText: {
    color: "#17B8A6",
    fontWeight: "bold",
  },
  buttonTextDelete: {
    color: "#fff",
    fontWeight: "bold",
  },
  textHeader: {
    color: "#17B8A6",
    fontSize: 30,
    fontWeight: "bold",
  },
  textNormalButton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  textSubtitle: {
    color: "#595c5f",
    fontSize: 16,
    fontWeight: "bold",
  },
});
