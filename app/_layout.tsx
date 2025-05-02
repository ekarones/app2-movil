import { SplashScreen, Stack } from "expo-router";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AuthProvider } from "../components/AuthContext";
import * as NavigationBar from "expo-navigation-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Engagement-Regular": require("../assets/fonts/Engagement-Regular.ttf"),
  });

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#7f8387");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerTransparent: true,
            contentStyle: { backgroundColor: "#7f8387" },
            headerTitle: "",
            animation: "fade",
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="dark" />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7f8387",
  },
});
