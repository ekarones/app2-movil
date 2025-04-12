import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../../components/AuthContext";
import { router } from "expo-router";
import Constants from "expo-constants";

const {
  API_GET_RECORDS_BY_ID_URL,
  API_GET_IMAGE_URL,
  API_RECORDS_URL,
  API_GET_DIAGNOSE_BY_RECORD_URL,
  API_GET_ADVICES_BY_DISEASE_URL,
} = Constants.expoConfig.extra;

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
    Alert.alert(
      "Eliminar registro",
      "¿Estás seguro de que deseas eliminar este registro?",
      [
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
      ]
    );
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

      if (!response_1.ok) {
        throw new Error("Error en la segunda solicitud.");
      }

      const result_1 = await response_1.json();

      // Si ambas peticiones fueron exitosas, navegar a la pantalla de éxito
      router.push({
        pathname: "/menu/history/diagnosePageSuccess",
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
      <Image
        source={{ uri: API_GET_IMAGE_URL + "?filename=" + item[2] }}
        style={styles.image}
      />
      <Text style={styles.title}>Diagnóstico: {item[4]}</Text>
      <Text style={styles.date}>Fecha: {item[5]}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.viewButton]}
          onPress={() => handleView(item[0])}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item[0])}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item[0].toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#202531",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderColor: "#37404F",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignSelf: "stretch",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 2,
  },
  // 💪 Estilo para los botones
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#37404F",
  },
  deleteButton: {
    backgroundColor: "#cd6155", // Rojo para "Eliminar"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
