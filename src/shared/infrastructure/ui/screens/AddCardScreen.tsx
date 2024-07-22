import { View, StyleSheet, StatusBar, Text } from "react-native";
import Input from "../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/AppBar";
import Button from "../components/Button";
import { useState } from "react";

const AddCardScreen = ({ navigation }) => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [errors, setErrors] = useState({
    cardName: undefined,
    cardNumber: undefined,
    expiryDate: undefined,
    cvv: undefined,
    postalCode: undefined,
  });

  const validate = () => {
    const newErrors = {
      cardName: undefined,
      cardNumber: undefined,
      expiryDate: undefined,
      cvv: undefined,
      postalCode: undefined,
    };
    
    if (!cardName) newErrors.cardName = "Nombre del titular es requerido";
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = "Número de tarjeta inválido";
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) newErrors.expiryDate = "Fecha de expiración inválida";
    if (expiryDate) {
      const [month, year] = expiryDate.split('/');
      if (parseInt(month, 10) > 12) newErrors.expiryDate = "El mes no puede ser mayor a 12";
      if (parseInt(year, 10) < new Date().getFullYear() % 100) newErrors.expiryDate = "La tarjeta ha expirado";
      if (parseInt(year, 10) === new Date().getFullYear() % 100 && parseInt(month, 10) < new Date().getMonth() + 1) newErrors.expiryDate = "La tarjeta ha expirado";
    }
    if (!cvv || !/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV inválido";
    if (!postalCode || !/^\d{5}$/.test(postalCode)) newErrors.postalCode = "Código postal inválido";
    
    setErrors(newErrors);

    return Object.values(newErrors).every(error => error === undefined);
  };

  const handlePay = () => {
    if (validate()) {
      navigation.navigate("Success", {
        message:
          "Su vehículo estará listo para ser recogido en la fecha indicada. El arrendador le confirmará unas horas antes para que pueda recogerlo. Que tenga un ¡buen viaje!",
      });
    }
  };

  const handleCardNumberChange = (text) => {
    const formattedText = text.replace(/\D/g, "").slice(0, 16);
    setCardNumber(formattedText);
  };

  const handleExpiryDateChange = (text) => {
    const cleanedText = text.replace(/\D/g, "");
    let formattedText = cleanedText;

    if (cleanedText.length >= 2) {
      const month = cleanedText.slice(0, 2);
      const day = cleanedText.slice(2, 4);

      formattedText = month + (day ? "/" + day : "");
    }
    
    setExpiryDate(formattedText);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <AppBar
        text={"Agregar tarjeta"}
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <Input
          label="Nombre del titular"
          value={cardName}
          placeholder="Nombre del titular"
          onChangeText={setCardName}
        />
        {errors.cardName && <Text style={styles.errorText}>{errors.cardName}</Text>}

        <Input
          label="Número de tarjeta"
          value={cardNumber}
          placeholder="1234 5678 9012 3456"
          onChangeText={handleCardNumberChange}
          keyboardType="numeric"
        />
        {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}

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
              value={expiryDate}
              placeholder={"MM/DD"}
              onChangeText={handleExpiryDateChange}
              keyboardType="numeric"
            />
            {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
          </View>
          <View style={styles.inputHalf}>
            <Input
              label="CVV"
              value={cvv}
              placeholder={"123"}
              onChangeText={setCvv}
              secureTextEntry
              keyboardType="numeric"
            />
            {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
          </View>
        </View>

        <Input
          label="Código postal"
          value={postalCode}
          placeholder="12345"
          onChangeText={setPostalCode}
          keyboardType="numeric"
        />
        {errors.postalCode && <Text style={styles.errorText}>{errors.postalCode}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text="Pagar"
          isPrimary
          onClick={handlePay}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingTop: 0,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
    padding: 17,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 17,
    paddingBottom: 20,
  },
  inputHalf: {
    width: "48%",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "center",
  },
});

export default AddCardScreen;
