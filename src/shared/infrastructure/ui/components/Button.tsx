import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const Button = ({
  text,
  onClick,
  isPrimary,
  isSubmitting = false,
  isDisabled = false, // Nueva prop para deshabilitar el botón
}: {
  text: string;
  onClick: () => void;
  isPrimary?: boolean;
  isSubmitting?: boolean;
  isDisabled?: boolean; // Nueva prop para deshabilitar el botón
}) => {
  return (
    <TouchableOpacity
      onPress={isDisabled ? undefined : onClick} // Evita el clic si está deshabilitado
      style={[
        styles.button,
        {
          backgroundColor: isPrimary
            ? (isDisabled ? "#B3A6F4" : "#7E49FF") // Color de fondo para botón deshabilitado
            : (isDisabled ? "#E0E0E0" : "#FFFFFF"), // Color de fondo para botón deshabilitado
          borderWidth: isPrimary ? 0 : 2,
          borderColor: isPrimary ? (isDisabled ? "#B3A6F4" : "#7E49FF") : "#7E49FF", // Color del borde para botón deshabilitado
        },
      ]}
      disabled={isDisabled || isSubmitting} // Desactiva el botón si está deshabilitado o en estado de envío
    >
      {isSubmitting ? (
        <ActivityIndicator color={isPrimary ? "#FFFFFF" : "#7E49FF"} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            { color: isPrimary ? (isDisabled ? "#D3D3D3" : "#FFFFFF") : (isDisabled ? "#B3A6F4" : "#7E49FF") }, // Color del texto para botón deshabilitado
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
    height: 60,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: "Inter",
    fontWeight: "bold",
  },
});

export default Button;
