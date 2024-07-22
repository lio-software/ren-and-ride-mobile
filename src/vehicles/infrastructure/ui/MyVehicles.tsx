import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Layout from "../../../shared/infrastructure/ui/components/Layout";
import ListingCard from "../../../shared/infrastructure/ui/components/ListingCard";
import { listVehiclesByUserIdUseCase, updateVehicleUseCase } from "../dependencies";
import { useEffect, useState } from "react";
import { selectUser } from "../../../shared/infrastructure/redux/reducers/authReducer";
import { useSelector } from "react-redux";
import Button from "../../../shared/infrastructure/ui/components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { isRentalActiveByVehicleId } from "../../../rentals/infrastructure/dependencies";

const MyVehicles = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);

  const loadVehicles = async () => {
    const vehiclesList = await listVehiclesByUserIdUseCase.execute(user._id);
    setVehicles(vehiclesList);
    setIsLoading(false);
  };

  useEffect(() => {
    loadVehicles();
    console.log(user._id);
  }, []);

  const handleDeactivate = async (vehicleId) => {
    const vehicleToUpdate = vehicles.find(vehicle => vehicle._id === vehicleId);
    if (vehicleToUpdate) {
      await updateVehicleUseCase.execute(
        {
          ...vehicleToUpdate,
          avalible: false,
        },
        vehicleId
      );
      loadVehicles();
    }
  };

  const handleReactivate = async (vehicleId) => {
    const vehicleToUpdate = vehicles.find(vehicle => vehicle._id === vehicleId);

    const isRentActive = await isRentalActiveByVehicleId.execute(vehicleId);

    if (vehicleToUpdate && isRentActive===false) {
      console.log("isRentActive", isRentActive);
      console.log("vehicleToUpdate", vehicleToUpdate);
      await updateVehicleUseCase.execute(
        {
          ...vehicleToUpdate,
          avalible: true,
        },
        vehicleId
      );
      loadVehicles();
    } else {
      Alert.alert("Error", "No puedes reactivar un vehículo con rentas activas.");
    }
  };

  const NoCarsMessage = () => (
    <View style={styles.noRentalsContainer}>
      <Icon
        name="alert-decagram-outline"
        size={100}
        color="#7E49FF"
        style={styles.noRentalsImage}
      />
      <Text style={styles.noRentalsText}>No tienes carros registrados!</Text>
      <Text style={styles.noRentalsSubText}>
        Ahora es el momento de registrar tus vehículos. ¡Vamos!.
      </Text>

      <Button
        text="Rentar mi vehículo"
        onClick={() => navigation.navigate("Perfil")}
        isPrimary
      />
    </View>
  );

  return (
    <Layout
      title={"Mis vehiculos"}
      showBackButton
      onBackPress={() => navigation.goBack()}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
      >
        {isLoading && <ActivityIndicator size="large" color="#7E49FF" />}
        {!isLoading && vehicles.length === 0 && <NoCarsMessage />}
        {!isLoading &&
          vehicles.map((vehicle) => (
            <ListingCard
              key={vehicle._id}
              image={vehicle.vehicleImages[0]}
              title={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
              price={vehicle.rentalPrice}
              isAvaliable={vehicle.avalible}
              onPress={() => {}}
              showDeactivateButton
              showReactivateButton
              onDeactivate={() => handleDeactivate(vehicle._id)}
              onReactivate={() => handleReactivate(vehicle._id)}
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
});

export default MyVehicles;
