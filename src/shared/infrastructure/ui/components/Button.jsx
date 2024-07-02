import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ text, onClick, isPrimary }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.button,
        { backgroundColor: isPrimary ? "#7E49FF" : "#FFFFFF" },
        { borderWidth: isPrimary ? 0 : 2 },
        { borderColor: isPrimary ? "#7E49FF" : "#7E49FF" },
      ]}
    >
      <Text style={[styles.buttonText, { color: isPrimary ? "#FFFFFF" : "#7E49FF" }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#7E49FF",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
    height: 56,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Inter",
    fontWeight: "bold",
  },
});

export default Button;
