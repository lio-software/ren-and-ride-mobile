import React, { useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import AppBar from "../components/AppBar";
import Input from "../components/Input";
import { useDispatch } from "react-redux";
import {
  authenticateUseCase,
  createUserUseCase,
} from "../../../../users/infrastructure/dependecies";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (input) => {
    let newSuggestions = [];
    if (input.length < 8) {
      newSuggestions.push("La contraseña debe tener al menos 8 caracteres");
    }
    if (!/\d/.test(input)) {
      newSuggestions.push("Añade al menos un número");
    }
    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
      newSuggestions.push("Incluye letras mayúsculas y minúsculas");
    }
    if (!/[^A-Za-z0-9]/.test(input)) {
      newSuggestions.push("Incluye al menos un carácter especial");
    }

    setSuggestions(newSuggestions);

    // Determine password strength based on suggestions
    if (newSuggestions.length === 0) {
      setStrength("Muy fuerte");
    } else if (newSuggestions.length <= 1) {
      setStrength("Fuerte");
    } else if (newSuggestions.length <= 2) {
      setStrength("Moderada");
    } else if (newSuggestions.length <= 3) {
      setStrength("Débil");
    } else {
      setStrength("Muy débil");
    }
  };

  const validateName = (name) => {
    const re = /^[A-Za-z\s]+$/;
    return re.test(name);
  };

  const validatePhoneNumber = (number) => {
    const re = /^\(?\d{2}\)?\s?\d{4}\s?\d{4}$/;
    return re.test(number);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!firstName || !lastName || !email || !password) {
      setErrorMessage("Por favor, llena todos los campos.");
      setIsSubmitting(false);
      return;
    }

    if (!validateName(firstName) || !validateName(lastName)) {
      setErrorMessage("El nombre y el apellido solo deben contener letras y espacios.");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor, ingresa un correo válido.");
      setIsSubmitting(false);
      return;
    }

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      setErrorMessage("Por favor, ingresa un número de teléfono válido.");
      setIsSubmitting(false);
      return;
    }

    if (suggestions.length > 0) {
      setErrorMessage("La contraseña no es lo suficientemente fuerte.");
      setIsSubmitting(false);
      return;
    }

    try {
      const user = await createUserUseCase.execute(
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      );

      if (user) {
        dispatch({
          type: "LOGIN",
          payload: user,
        });
      } else {
        setErrorMessage(
          "Error al registrar. Por favor, verifica tus credenciales."
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorMessage(
        "Se produjo un error durante el registro. Por favor, inténtalo de nuevo."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <AppBar
        text={"Sign Up"}
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <Input
          label="Nombre(s)"
          value={firstName}
          placeholder={"John"}
          onChangeText={setFirstName}
        />

        <Input
          label="Apellido(s)"
          value={lastName}
          placeholder={"Dao"}
          onChangeText={setLastName}
        />

        <Input
          label="Email"
          value={email}
          placeholder={"example@mail.com"}
          onChangeText={setEmail}
          keyboardType={"email-address"}
        />

        <Input
          label="Número de teléfono"
          value={phoneNumber}
          placeholder={"(55) 1234 5678"}
          onChangeText={setPhoneNumber}
          keyboardType={"phone-pad"}
        />

        <Input
          label="Contraseña"
          value={password}
          placeholder={"********"}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
          secureTextEntry
        />

        <View style={styles.passwordStrengthContainer}>
          <Text style={styles.strengthText}>
            Fortaleza de la contraseña: {strength}
          </Text>
          <View style={styles.strengthMeter}>
            <View
              style={{
                width: `${
                  strength === "Muy fuerte"
                    ? 100
                    : strength === "Fuerte"
                    ? 75
                    : strength === "Moderada"
                    ? 50
                    : strength === "Débil"
                    ? 25
                    : 0
                }%`,
                height: 10,
                backgroundColor:
                  strength === "Muy débil"
                    ? "#F44336"
                    : strength === "Débil"
                    ? "#FF9800"
                    : strength === "Moderada"
                    ? "#FFEB3B"
                    : strength === "Fuerte"
                    ? "#8BC34A"
                    : "#4CAF50",
              }}
            ></View>
          </View>
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Text style={styles.suggestionsText}>
          {suggestions.map((suggestion, index) => (
            <Text key={index}>
              {suggestion}{"\n"}
            </Text>
          ))}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("TermsAndConditions")}
        style={styles.termsContainer}
      >
        <Text style={styles.termsText}>
          Al crear una cuenta aceptas los{" "}
          <Text style={styles.termsBoldText}>Términos y condiciones</Text> de
          nuestra aplicación
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button text="Registrarme" isPrimary onClick={handleSubmit} isSubmitting={isSubmitting} />
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
  passwordStrengthContainer: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 17,
  },
  termsContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 17,
  },
  termsText: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "#7E7E7E",
    textAlign: "center",
  },
  termsBoldText: {
    fontWeight: "bold",
    color: "#7E49FF",
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
  strengthText: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#7E7E7E",
  },
  suggestionsText: {
    color: "red",
    marginTop: 10,
  },
  strengthMeter: {
    width: "100%",
    height: 10,
    backgroundColor: "#ccc",
    marginTop: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default RegisterScreen;
