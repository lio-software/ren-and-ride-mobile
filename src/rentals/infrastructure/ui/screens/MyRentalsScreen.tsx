import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import Layout from "../../../../shared/infrastructure/ui/components/Layout";
import ListingCard from "../../../../shared/infrastructure/ui/components/ListingCard";
import { listRentalsByLesseId } from "../../dependencies";
import Button from "../../../../shared/infrastructure/ui/components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { selectUser } from "../../../../shared/infrastructure/redux/reducers/authReducer";
import { useSelector } from "react-redux";

const MyRentalsScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const [rentals, setRentals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRentals = async () => {
    try {
      const rental = await listRentalsByLesseId.execute(user._id, true);
      setRentals(rental);
      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRentals();
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
        Es tiempo de encontrar tu próximo vehículo, ¿no crees?.
      </Text>

      <Button
        text="Buscar vehículo"
        onClick={() => navigation.navigate("Inicio")}
        isPrimary
      />
    </View>
  );

  return (
    <Layout title={"Rentas activas"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading && <ActivityIndicator size="large" color="#7E49FF" />}
        {!isLoading && rentals.length === 0 && <NoRentalsMessage />}
        {!isLoading &&
          rentals.map((rental) => (
            <ListingCard
              image={rental.vehicle_id.vehicleImages[0]}
              key={rental.uuid}
              title={`${rental.vehicle_id.brand} ${rental.vehicle_id.model} ${rental.vehicle_id.year}`}
              price={rental.vehicle_id.rentalPrice}
              onPress={() =>
                navigation.navigate("ActiveRentals", { rentalId: rental.uuid })
              }
            />
          ))}
      </ScrollView>
    </Layout>
  );
};

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
  searchButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MyRentalsScreen;
