import { StyleSheet, Text, View } from "react-native";

const AppBar = ({ text }) => {
  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  appBarTitle: {
    fontSize: 17,
    fontFamily: "Inter",
    fontWeight: "bold",
  },
});

export default AppBar;
