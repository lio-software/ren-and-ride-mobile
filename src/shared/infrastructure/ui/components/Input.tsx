import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Input = ({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType = "default", // Paso 2: Establecer "default" como valor predeterminado
  multiline = false, // Añadir multiline como prop opcional
  min,
  max,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
  min?: number;
  max?: number;
}) => {
  const textInputRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const handleTextChange = (text: string) => {
    if (keyboardType === "numeric") {
      const numericValue = parseFloat(text);
      if (!isNaN(numericValue)) {
        if ((min !== undefined && numericValue < min) || (max !== undefined && numericValue > max)) {
          return;
        }
      }
    }
    onChangeText(text);
  };

  return (
    <TouchableWithoutFeedback onPress={() => textInputRef.current?.focus()}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputContainer, multiline && styles.multilineContainer]}>
          <TextInput
            ref={textInputRef}
            style={[styles.input, multiline && styles.multilineInput]}
            value={value}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            secureTextEntry={isPasswordVisible && secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline} // Pasar multiline a TextInput
            numberOfLines={multiline ? 4 : 1} // Ajustar número de líneas
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderWidth: 1,
    borderColor: "#E1E7ED",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#7E7E7E",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  multilineContainer: {
    alignItems: "flex-start", // Alinear el contenido al inicio para multiline
  },
  input: {
    fontSize: 18,
    color: "#000000",
    flex: 1,
    padding: 0,
    marginTop: 4,
  },
  multilineInput: {
    textAlignVertical: "top", // Alinear el texto al inicio para multiline
    height: 100, // Ajustar la altura para multiline
  },
  toggleButton: {
    marginLeft: 10,
  },
});

export default Input;
