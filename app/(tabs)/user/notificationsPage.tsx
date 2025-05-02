import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";

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
      <Text style={styles.date}>
        Fecha: {item[3].slice(0, -8)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ?         <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#595c5f" />
              </View> : <FlatList data={notifications} keyExtractor={(item) => item[0].toString()} renderItem={renderItem} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical:5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  header: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderBottomWidth:3,
    borderBottomColor:"#f2f2f2",
    borderLeftWidth:5,
    borderLeftColor:"#f2f2f2",
    borderRightWidth:5,
    borderRightColor:"#f2f2f2",
    padding: 10,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: "#000",
    marginTop: 5,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign:"right",
  },
  textHeader: {
    color: "#17B8A6",
    fontSize: 30,
    fontWeight: "bold",
  },
  textSubtitle: {
    color: "#595c5f",
    fontSize: 16,
    fontWeight: "bold",
  },
  textNormalButton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
