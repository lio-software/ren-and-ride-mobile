import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import AppBar from "../components/AppBar";
import Input from "../components/Input";
import { useState } from "react";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <AppBar text={"I have an account"} />

      <View style={styles.content}>
        <Input
          label="Email"
          name="email"
          value={email}
          placeholder={"example@mail.com"}
          onChangeText={setEmail}
        />

        <Input
          label="Password"
          name="password"
          value={password}
          placeholder={"********"}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Continue"
          isPrimary
          onClick={() => navigation.navigate("HomeTabs")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    padding: 17,
    paddingTop: 0,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  welcomeTitle: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default LoginScreen;
