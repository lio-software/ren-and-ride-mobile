import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppBar from "../../../../shared/infrastructure/ui/components/AppBar";
import Input from "../../../../shared/infrastructure/ui/components/Input";
import Button from "../../../../shared/infrastructure/ui/components/Button";
import { updateUserUseCase } from "../../dependecies";
import { updateUser } from "../../../../shared/infrastructure/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import UserEntity from "../../../domain/entities/UserEntity";
import { selectUser } from "../../../../shared/infrastructure/redux/reducers/authReducer";

const EditProfileScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // State variables
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(user.phoneNumber);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error states
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle photo selection
  const handleSelectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewProfilePhoto(result.assets[0].uri);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    // Clear previous errors
    setFirstNameError("");
    setLastNameError("");
    setPhoneError("");
    setPasswordError("");

    let valid = true;

    if (!firstName) {
      setFirstNameError('El nombre es obligatorio.');
      valid = false;
    }

    if (!lastName) {
      setLastNameError('El apellido es obligatorio.');
      valid = false;
    }

    if (!phone) {
      setPhoneError('El número de teléfono es obligatorio.');
      valid = false;
    }

    if (!password) {
      setPasswordError('Debes ingresar tu contraseña actual.');
      valid = false;
    }

    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear el nuevo objeto de usuario
      const newUser = new UserEntity({
        ...user,
        id: "",
        firstName,
        lastName,
        email: user.email,
        password, // Asegúrate de que la contraseña esté presente
        phoneNumber: phone,
        imageUrl: newProfilePhoto,
      });

      // Llamar a la función useCase para actualizar el perfil
      const updatedUser = await updateUserUseCase.execute(newUser, user._id);

      if (updatedUser){
        dispatch(updateUser({
          ...user,
          firstName,
          lastName,
          phoneNumber: phone,
          imageUrl: newProfilePhoto,
        }));
        setIsSubmitting(false);
        navigation.goBack();
      } else {
        alert('Error al actualizar el perfil. Inténtalo de nuevo.');
      }

      // Dispatch action to update user in Redux
    } catch (error) {
    }

    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <AppBar text="Editar mi perfil" showBackButton onBackPress={() => navigation.goBack()} />

      <View style={styles.photoContainer}>
        <TouchableOpacity onPress={handleSelectPhoto}>
          <View style={styles.photoWrapper}>
            {newProfilePhoto ? (
              <Image source={{ uri: newProfilePhoto }} style={styles.photo} />
            ) : (
              <Image source={user.imageUrl ? { uri: user.imageUrl } : require("../../../../../assets/images/defaultprofile.png")} style={styles.photo} />
            )}
          </View>
          <View style={styles.changePhotoIcon}>
            <Ionicons name="pencil-circle" size={30} color="#7E49FF" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>

          <Input
            label="Nombre(s)"
            value={firstName}
            placeholder="John"
            onChangeText={setFirstName}
          />
          {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

          <Input
            label="Apellido(s)"
            value={lastName}
            placeholder="Doe"
            onChangeText={setLastName}
          />
          {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

          <Input
            label="Número de teléfono"
            value={phone}
            placeholder={"(55) 1234 5678"}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

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
          text="Guardar"
          isSubmitting={isSubmitting}
          isPrimary
          onClick={handleUpdateProfile}
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
  photoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  photoWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    position: 'relative',
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  changePhotoIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 2,
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
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default EditProfileScreen;
