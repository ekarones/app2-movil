import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";

const { API_GET_ALL_NOTIFICATIONS_URL } = Constants.expoConfig.extra;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetch(API_GET_ALL_NOTIFICATIONS_URL)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setNotifications(data.data.reverse());
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
          setLoading(false);
        });
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item[1]}</Text>
      <Text style={styles.description}>{item[2]}</Text>
      <Text style={styles.date}>Fecha: {item[3]}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={notifications}
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
  card: {
    borderColor: "#37404F",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 5,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
