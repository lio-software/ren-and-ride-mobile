import { View, StyleSheet, StatusBar, Text } from "react-native";
import Input from "../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/AppBar";
import Button from "../components/Button";

const AddCardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />

      <AppBar text={"Agregar tarjeta"} />

      <View style={styles.content}>
        <Input
          label="Nombre del titular"
          name="name"
          placeholder={"John Doe"}
        />

        <Input
          label="Número de tarjeta"
          name="cardNumber"
          placeholder={"1234 5678 1234 5678"}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={styles.inputHalf}>
            <Input
              label="Fecha de expiración"
              name="expiryDate"
              placeholder={"MM/AA"}
            />
          </View>
          <View style={styles.inputHalf}>
            <Input
              label="CVV"
              name="cvv"
              placeholder={"123"}
              secureTextEntry
            />
          </View>
        </View>
        <Input label="Código postal" name="postalCode" placeholder={"123"} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text="Pagar"
          isPrimary
          onClick={() => navigation.navigate("Success")}
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
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  inputHalf: {
    width: "48%",
    alignItems: "center",
  },
});

export default AddCardScreen;
