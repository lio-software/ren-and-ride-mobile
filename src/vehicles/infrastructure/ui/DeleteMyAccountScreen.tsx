import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../shared/infrastructure/redux/reducers/authReducer";
import AppBar from "../../../shared/infrastructure/ui/components/AppBar";
import Input from "../../../shared/infrastructure/ui/components/Input";
import Button from "../../../shared/infrastructure/ui/components/Button";
import { updateUserUseCase } from "../../../users/infrastructure/dependecies";
import UserEntity from "../../../users/domain/entities/UserEntity";

const DeleteMyAccountScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // State variables
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle account deletion
  const handleDeleteAccount = async () => {
    setPasswordError("");

    if (!password) {
      setPasswordError('Debes ingresar tu contraseña actual.');
      return;
    }

    Alert.alert(
      "Eliminar cuenta",
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setIsSubmitting(true);
            try {
              const newUser = new UserEntity({
                ...user,
                id: "",
                firstName: "Usuario",
                lastName: "Eliminado",
                email: "",
                phoneNumber: "",
                password,
                imageUrl: null,
              });

              updateUserUseCase.execute(newUser, user._id);

              dispatch({ type: 'LOGOUT' });
              setIsSubmitting(false);
              navigation.navigate('LoginScreen');
            } catch (error) {
              setPasswordError('Error al eliminar la cuenta. Inténtalo de nuevo.');
              setIsSubmitting(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <AppBar text="Eliminar mi cuenta" showBackButton onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Ionicons name="alert-circle" size={100} color="#FF0000" />
        <Text style={styles.warningText}>Esta acción eliminará permanentemente tu cuenta.</Text>
        <Text style={styles.explanationText}>
          Esta acción es irreversible y todos tus datos serán borrados permanentemente.
        </Text>
        
        <Input
          label="Contraseña"
          value={password}
          placeholder="********"
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text="Eliminar cuenta"
          isSubmitting={isSubmitting}
          isPrimary
          onClick={handleDeleteAccount}
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
    justifyContent: "center",
    paddingTop: 16,
    padding: 17,
  },
  warningText: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  explanationText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 17,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default DeleteMyAccountScreen;
