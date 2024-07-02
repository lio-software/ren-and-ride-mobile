import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/Button";
import AppBar from "../components/AppBar";

const CarDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <AppBar text="Detalles" />

      <ScrollView style={styles.content}>
        <Image
          source={require("../../../../../assets/images/aveo.jpg")}
          style={{
            width: "100%",
            height: 231,
            borderRadius: 8,
            marginBottom: 16,
          }}
        />

        <Text style={styles.title}>Aveo Hatchback 2024</Text>

        <View style={styles.subtitleSecondary}>
          <Icon name="location-outline" size={17} />
          <Text style={styles.subtitleText}>Tuxtla Gutiérrez, Chiapas</Text>
        </View>

        <View style={styles.subtitleSecondary}>
          <Icon name="star-outline" size={17} />
          <Text style={styles.subtitleText}>4.9</Text>
        </View>

        <Text style={styles.sectionTitle}>Qué ofrece este vehículo</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bullet}>
            • Eficiencia en el consumo de combustible
          </Text>
          <Text style={styles.bullet}>• Aire acondicionado</Text>
          <Text style={styles.bullet}>• Navegacion GPS</Text>
          <Text style={styles.bullet}>• Puertos USB</Text>
        </View>

        <Text style={styles.sectionTitle}>Precio</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.price}>
            • <Text style={styles.priceText}>$600</Text> MXN
            <Text style={styles.grayText}> por día</Text>
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Arrendador</Text>

        <View style={styles.profileContainer}>
          <Image
            source={require("../../../../../assets/images/profile.jpg")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Luis Roberto Conriquez</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonTextLeft}>29 Jun - 31 Jun</Text>
          <Text style={styles.buttonTextRight}>
            <Text style={styles.priceText}>$1800mxn</Text> total
          </Text>
        </View>
        <Button
          text="Rentar"
          isPrimary
          onClick={() => navigation.navigate("AddCard")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 17,
    paddingTop: 16,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#CCCCCC",
    padding: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  subtitleSecondary: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  subtitleText: {
    marginLeft: 4,
    fontFamily: "Inter",
    fontSize: 17,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "500",
    marginTop: 20,
    fontFamily: "Inter",
  },
  bulletPoints: {
    marginLeft: 20,
  },
  bullet: {
    fontFamily: "Inter",
    fontSize: 17,
    marginLeft: 6,
    color: "#7E7E7E",
  },
  price: {
    fontFamily: "Inter",
    fontSize: 17,
    marginLeft: 6,
  },
  priceText: {
    color: "#000000",
    fontWeight: "600",
  },
  grayText: {
    color: "#7E7E7E",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 20,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 20,
  },
  profileName: {
    textAlign: "left",
    fontSize: 17,
    fontWeight: "600",
  },
  buttonTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonTextLeft: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  buttonTextRight: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#7E7E7E",
    fontWeight: "500",
  },
});

export default CarDetailsScreen;
