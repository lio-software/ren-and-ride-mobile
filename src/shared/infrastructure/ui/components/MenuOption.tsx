import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuOption = ({ iconName, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuOption} onPress={onPress}>
      <Icon name={iconName} size={30} />
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuText}>{text}</Text>
      </View>
      <Icon name="chevron-right" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuOption: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  menuText: {
    fontFamily: 'Inter',
    fontSize: 17,
  },
});

export default MenuOption;
