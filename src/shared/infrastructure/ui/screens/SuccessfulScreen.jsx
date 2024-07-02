import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome"; // Importa el icono que prefieras

const SuccesfullScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <Icon name="check-circle" size={80} color="#4CAF50" />
        <Text style={styles.successMessage}>¡Reservación exitosa!</Text>
        <Text style={{ textAlign: "center", marginTop: 10, color: "#7E7E7E" }}>
          Su vehículo estará listo para ser recogido en la fecha indicada. El
          arrendatario le confirmará unas horas antes para que pueda recogerlo.
          Que tenga un ¡buen viaje!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Continuar"
          isPrimary
          onClick={() => navigation.navigate("HomeTabs")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    padding: 17,
    paddingTop: 0,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center", // Ajusta para centrar verticalmente
    paddingTop: 16,
  },
  successMessage: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default SuccesfullScreen;
