import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Layout from "../../../../shared/infrastructure/ui/components/Layout";
import Card from "../../../../shared/infrastructure/ui/components/Card";
import { listRentalsByLesseId } from "../../dependencies";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../shared/infrastructure/redux/reducers/authReducer";
import Button from "../../../../shared/infrastructure/ui/components/Button";
import { dateToString } from "../utils/dateUtils";
import NoRentalsMessage from "../../../../shared/infrastructure/ui/components/NoRentalsMessage";

const LesseeHistoryScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentalData = await listRentalsByLesseId.execute(user._id);
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
    CREATED: "Preparando",
    WAITING: "Esperando",
    ACTIVE: "Activo",
    FINISHED: "Terminado",
  };

  return (
    <Layout
      title={"Historial de arrendador"}
      showBackButton
      onBackPress={() => navigation.goBack()}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#7E49FF" style={styles.loader} />
        ) : rentals.length === 0 ? (
          <NoRentalsMessage
            title={"No tienes rentas...aun!"}
            message={"Es tiempo de encontrar tu próximo vehículo, ¿no crees?."}
            onPress={() => navigation.navigate("Inicio")}
          />
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
              <Card
                image={rental.vehicle_id.vehicleImages[0]}
                title={`${rental.vehicle_id.brand} ${rental.vehicle_id.model} ${rental.vehicle_id.year}`}
                price={rental.vehicle_id.rentalPrice}
                location={rental.vehicle_id.address}
                stars={rental.vehicle_id.stars}
                onPress={() =>
                  navigation.navigate("CarDetails", {
                    vehicleId: rental.vehicle_id.uuid,
                    startDate: rental.start_date,
                    endDate: rental.end_date,
                    isCurrentlyRented: rental.status !== "FINISHED",
                  })
                }
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RateExperience", {
                    vehicleId: rental.vehicle_id.uuid,
                  })
                }
                style={styles.rateContainer}
              >
                <Icon name="star-outline" size={20} color="#FFFFFF" />
                <Text style={styles.rateText}>¡Califica tu experiencia!</Text>
              </TouchableOpacity>
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
    marginVertical: 8,
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
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#7E49FF",
    alignSelf: "center",
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  rateText: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
    color: "#FFFFFF",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default LesseeHistoryScreen;
