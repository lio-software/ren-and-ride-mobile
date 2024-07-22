import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import AppBar from "../components/AppBar";
import Input from "../components/Input";
import { useState } from "react";
import { authenticateUseCase } from "../../../../users/infrastructure/dependecies";
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!email || !password) {
      setErrorMessage("Por favor, llena todos los campos.");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor, ingresa un correo válido.");
      setIsSubmitting(false);
      return;
    }

    try {
      const user = await authenticateUseCase.execute(email, password);
      if (user) {
        dispatch(
          {
            type: "LOGIN",
            payload: user,
          }
        )
        console.log(user);
        setIsSubmitting(false);
        navigation.navigate("HomeTabs");
      } else {
        setErrorMessage("Autenticación fallida. Por favor, verifica tus credenciales.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setErrorMessage("Se produjo un error durante la autenticación. Por favor, inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <AppBar text={"Ya tengo una cuenta"} showBackButton onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Input
          label="Email"
          value={email}
          placeholder={"ejemplo@mail.com"}
          onChangeText={setEmail}
          keyboardType={"email-address"}
        />

        <Input
          label="Contraseña"
          value={password}
          placeholder={"********"}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Iniciar sesión"
          isPrimary
          onClick={handleSubmit}
          isSubmitting={isSubmitting}
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
  welcomeTitle: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 17,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default LoginScreen;
