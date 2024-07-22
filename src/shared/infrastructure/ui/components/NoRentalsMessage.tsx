import { View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Button from "./Button"

const NoRentalsMessage = ({title, message, onPress}) => {
  return (
    <View style={styles.noRentalsContainer}>
    <Icon
      name="alert-decagram-outline"
      size={100}
      color="#7E49FF"
      style={styles.noRentalsImage}
    />
    <Text style={styles.noRentalsText}>{title}</Text>
    <Text style={styles.noRentalsSubText}>
      {message}
    </Text>

    <Button
      text="Buscar vehículo"
      onClick={onPress}
      isPrimary
    />
  </View>
  )
}

const styles = StyleSheet.create({
  noRentalsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E5E5E5",
  },
  noRentalsImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noRentalsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Inter",
  },
  noRentalsSubText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Inter",
  },
  searchButton: {
    width: "100%",
  },
})

export default NoRentalsMessage;