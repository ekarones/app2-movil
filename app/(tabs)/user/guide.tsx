import React from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Guide() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <View style={{width:300,borderWidth:0, paddingBottom:20}}>
        <Text style={styles.textHeader}>Información de cada sección</Text>
        </View>

          <View style={{ alignItems: "center" }}>
            <Image source={require("../../../assets/images/guide-1.jpg")} resizeMode="contain" style={{ height: 200, width: 100, borderWidth: 1 }} />
          </View>
          <View style={{paddingVertical: 5, paddingHorizontal:10, marginBottom:15 }}>
            <Text style={styles.title}>a. Diagnóstico</Text>
            <Text style={styles.normal}>
              Esta sección permite al usuario obtener un diagnóstico sobre el estado de salud de una hoja de manzano. El usuario puede cargar una imagen desde su galería o tomar
              una foto en tiempo real mediante la cámara del dispositivo. Una vez seleccionada la imagen, la aplicación analiza visualmente la hoja y proporciona un diagnóstico
              basado en modelos de inteligencia artificial. Al completarse el proceso, se muestran detalles como el nombre de la enfermedad, una descripción informativa, una imagen
              referencial y un consejo práctico proporcionado por expertos para tratar la afección detectada. Esta funcionalidad centraliza el objetivo de la aplicación: ofrecer un
              apoyo rápido y preciso en el cuidado del cultivo.
            </Text>
          </View>
        </View>

        <View>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../../../assets/images/guide-2.jpg")} resizeMode="contain" style={{ height: 200, width: 100, borderWidth: 1 }} />
          </View>
          <View style={{paddingVertical: 5, paddingHorizontal:10, marginBottom:15 }}>

            <Text style={styles.title}>b. Historial</Text>
            <Text style={styles.normal}>
              La sección de historial permite a los usuarios consultar los diagnósticos realizados previamente. Cada entrada muestra la imagen analizada, el nombre de la enfermedad
              detectada y la fecha y hora del diagnóstico. Los usuarios pueden optar por eliminar un registro o ver más detalles, lo que los lleva a una vista ampliada con la
              información completa del diagnóstico. Esta funcionalidad proporciona un seguimiento útil del estado de las hojas analizadas, facilitando la toma de decisiones a lo
              largo del tiempo en la gestión del cultivo.
            </Text>
          </View>
        </View>

        <View>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../../../assets/images/guide-3.jpg")} resizeMode="contain" style={{ height: 200, width: 100, borderWidth: 1 }} />
          </View>
          <View style={{paddingVertical: 5, paddingHorizontal:10}}>
            <Text style={styles.title}>c. Perfil</Text>
            <Text style={styles.normal}>
              La sección de perfil muestra la información personal del usuario, incluyendo su nombre y correo electrónico registrados. Debajo de estos datos, se presentan cuatro
              botones funcionales:
            </Text>
            <View style={{padding:5,gap:2}}>

            <Text style={styles.normal}>{"\u2022"} Configuración: permite modificar la información personal del usuario.</Text>
            <Text style={styles.normal}>{"\u2022"} Noticias: muestra una lista de novedades y actualizaciones relacionadas con la aplicación.</Text>
            <Text style={styles.normal}>{"\u2022"} Guía: ofrece una ayuda visual y textual sobre cómo utilizar la aplicación de forma efectiva.</Text>
            <Text style={styles.normal}>{"\u2022"} Salir: permite cerrar la sesión de forma segura y volver a la pantalla de inicio.</Text>
            </View>

            <Text style={styles.normal}>Esta sección facilita la gestión de la cuenta y el acceso a recursos adicionales dentro de la app.</Text>

          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 5,
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  textHeader: {
    color: "#595c5f",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // width: 300,
    padding: 20,
    elevation: 8,
  },
  cardb: {
    backgroundColor: "#cd6155",
    borderRadius: 10,
    // width: 300,
    padding: 20,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#595c5f",
  },
  normal: {
    fontSize: 14,
    color: "#595c5f",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    width: 300,
  },
});
