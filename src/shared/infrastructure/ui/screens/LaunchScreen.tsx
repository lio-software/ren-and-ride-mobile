import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";

const LaunchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <Image
          source={require("../../../../../assets/images/launch_icon.png")}
          style={{ marginBottom: 40 }}
        />

        <Text style={styles.welcomeTitle}>Bienvenido a Rent & Ride!</Text>
        <Text style={styles.welcomeText}>
          Alquile un vehiculo de forma rápida y sencilla. Elija su vehículo,
          reserve en segundos y lánzate a la carretera. Disfrute de una
          experiencia de alquiler sin complicaciones con Rent & Ride.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text="Ya tengo una cuenta"
          isPrimary
          onClick={() => navigation.navigate("Login")}
        />
        <Button
          text="Crear cuenta"
          onClick={() => navigation.navigate("Register")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 17,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  welcomeTitle: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  welcomeText: {
    fontFamily: "Inter",
    fontSize: 17,
    textAlign: "center",
    marginTop: 5,
    color: "#7E7E7E",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default LaunchScreen;
