import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Success: { message: string };
  HomeTabs: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

const SuccesfullScreen = ({ navigation, route }: Props) => {
  const { message } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <Icon name="check-circle" size={80} color="#4CAF50" />
        <Text style={styles.successMessage}>¡Listo!</Text>
        <Text style={{ textAlign: "center", marginTop: 10, color: "#7E7E7E", fontSize: 16 }}>
          {message}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Continuar"
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
    justifyContent: "center",
    paddingTop: 16,
  },
  successMessage: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default SuccesfullScreen;
