import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Layout from "../../../../shared/infrastructure/ui/components/Layout";
import Card from "../../../../shared/infrastructure/ui/components/Card";
import { listRentalsByLessorId } from "../../dependencies";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../shared/infrastructure/redux/reducers/authReducer";
import { dateToString } from "../utils/dateUtils";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../../../shared/infrastructure/ui/components/Button";

const LessorHistoryScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setIsLoading(true);
        const rentalData = await listRentalsByLessorId.execute(user._id);
        setRentals(rentalData);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentals();
  }, [user._id]);

  const status = {
    "CREATED": "Preparando",
    "WAITING": "Esperando",
    "ACTIVE": "Activo",
    "FINISHED": "Terminado",
  };

  const NoRentalsMessage = () => (
    <View style={styles.noRentalsContainer}>
      <Icon
        name="alert-decagram-outline"
        size={100}
        color="#7E49FF"
        style={styles.noRentalsImage}
      />
      <Text style={styles.noRentalsText}>No tienes rentas... aún!</Text>
      <Text style={styles.noRentalsSubText}>
        Pronto tendrás clientes interesados en tus vehículos.
      </Text>
      <Button
        text="Buscar vehículo"
        onClick={() => navigation.navigate("Inicio")}
        isPrimary
      />
    </View>
  );

  return (
    <Layout
      title={"Historial de arrendatario"}
      showBackButton
      onBackPress={() => navigation.goBack()}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
      >
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#7E49FF" />
          </View>
        ) : rentals.length === 0 ? (
          <NoRentalsMessage />
        ) : (
          rentals.map((rental) => (
            <View key={rental.uuid}>
              <View style={styles.dateStatusContainer}>
                <Text style={styles.dateText}>
                  {dateToString(rental.start_date)} -{" "}
                  {dateToString(rental.end_date)}
                </Text>
                <Text style={styles.statusText}>{status[rental.status]}</Text>
              </View>
              <View style={styles.profileContainer}>
                <Image
                  source={rental.lesse_id.imageUrl ? { uri: rental.lesse_id.imageUrl } : require("../../../../../assets/images/defaultprofile.png")}
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>{`${rental.lesse_id.firstName} ${rental.lesse_id.lastName}`}</Text>
              </View>
              <Card
                image={rental.vehicle_id.vehicleImages[0]}
                title={`${rental.vehicle_id.brand} ${rental.vehicle_id.model} ${rental.vehicle_id.year}`}
                price={rental.vehicle_id.rentalPrice}
                location={rental.vehicle_id.address}
                stars={rental.vehicle_id.stars}
                onPress={() => navigation.navigate("RentalDetail", {
                  rentalId: rental.uuid,
                  startDate: rental.start_date,
                  endDate: rental.end_date,
                  status: rental.status,
                })}
              />
            </View>
          ))
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  dateStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  dateText: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 17,
  },
  statusText: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 17,
    color: "#7E7E7E",
    opacity: 0.5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "#7E7E7E",
  },
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
  loaderContainer: { // Estilo para el contenedor del indicador de carga
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default LessorHistoryScreen;