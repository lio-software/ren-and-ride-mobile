import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Input = ({ label, value, placeholder, onChangeText, secureTextEntry }) => {
  const textInputRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  return (
    <TouchableWithoutFeedback onPress={() => textInputRef.current.focus()}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={isPasswordVisible && secureTextEntry}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={24} color="gray" />
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
    borderColor: '#E1E7ED',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#7E7E7E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    color: '#000000',
    flex: 1,
    padding: 0,
    marginTop: 4,
  },
  toggleButton: {
    marginLeft: 10,
  },
});

export default Input;
