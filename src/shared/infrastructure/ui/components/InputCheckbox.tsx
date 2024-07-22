import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InputCheckbox = ({ text, checked, onChange }) => {
  const toggleCheckbox = () => {
    onChange();
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Icon name="check" size={18} color="#fff" />}
      </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#667085',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#7E49FF',
    borderColor: '#7E49FF',
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 18,
    color: '#333',
  },
});

export default InputCheckbox;
