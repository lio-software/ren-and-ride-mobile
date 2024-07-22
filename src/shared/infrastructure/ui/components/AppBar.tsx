import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AppBar = ({
  text,
  showBackButton = false,
  onBackPress,
}: {
  text: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}) => {
  return (
    <View style={styles.appBar}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <View style={styles.iconContainer}>
            <Icon name="chevron-left" size={34} />
          </View>
        </TouchableOpacity>
      )}
      <Text style={styles.appBarTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  appBarTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Inter",
    fontWeight: "bold",
  },
});

export default AppBar;
