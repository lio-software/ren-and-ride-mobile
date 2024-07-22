import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Layout from "../../../../shared/infrastructure/ui/components/Layout";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../../../shared/infrastructure/ui/components/Button";
import { getRentalById, updateRental } from "../../dependencies";
import { dateToString } from "../utils/dateUtils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  ActiveRentals: { rentalId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "ActiveRentals">;

const ActiveRentalsScreen = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rental, setRental] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { rentalId } = route.params;

  const fetchRentalData = async () => {
    setIsLoading(true);
    try {
      const rentalData = await getRentalById.execute(rentalId);
      setRental(rentalData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRentalData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchRentalData();
    setRefreshing(false);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${rental?.vehicle_id.userId.phoneNumber}`);
  };

  const statusText = {
    CREATED: "Esperando confirmación",
    WAITING: "He recibido el vehículo",
    ACTIVE: "Servicio activo",
    FINISHED: "Vehiculo entregado",
  };

  const statusDescription = {
    CREATED: "El arrendatario esta preparando el vehiculo",
    WAITING: "El arrendatario esta esperando que recojas el vehiculo",
    ACTIVE: "Servicio en curso, disfruta tu viaje",
    FINISHED: "Has terminado el servicio",
  };

  const handleStatusChange = async () => {
    let newStatus = rental?.status;
    if (rental?.status === "CREATED") {
      newStatus = "WAITING";
    } else if (rental?.status === "WAITING") {
      newStatus = "ACTIVE";
    } else if (rental?.status === "ACTIVE") {
      newStatus = "FINISHED";
    }

    rental.status = newStatus;
    rental.vehicle_id = rental.vehicle_id.uuid;

    const lesse_id = rental.lesse_id.uuid;
    rental.lesse_id = lesse_id;

    await updateRental.execute(rental, rentalId).then(() => {
      console.log("Rental updated");
      fetchRentalData();
    });
  };

  return (
    <Layout
      title={"Rentas activas"}
      onBackPress={() => navigation.goBack()}
      showBackButton
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#7E49FF"]} // Color del indicador de carga
          />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#7E49FF" />
        ) : (
          <>
            <Text style={styles.dateText}>
              {dateToString(rental.start_date)} -{" "}
              {dateToString(rental.end_date)}
            </Text>
            <Image
              source={{ uri: rental.vehicle_id.vehicleImages[0] }}
              style={{
                width: "100%",
                height: 231,
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
            <Text
              style={styles.title}
            >{`${rental.vehicle_id.brand} ${rental.vehicle_id.model} ${rental.vehicle_id.year}`}</Text>
            <View style={styles.subtitleSecondary}>
              <Icon name="location-outline" size={17} />
              <Text style={styles.subtitleText}>
                {rental.vehicle_id.address}
              </Text>
            </View>
            <View style={styles.subtitleSecondary}>
              <Icon name="star-outline" size={17} />
              <Text style={styles.subtitleText}>{rental.vehicle_id.stars}</Text>
            </View>
            <Text style={styles.sectionTitle}>Precio</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.price}>
                •{" "}
                <Text style={styles.priceText}>
                  ${rental.vehicle_id.rentalPrice}
                </Text>{" "}
                MXN
                <Text style={styles.grayText}> por día</Text>
              </Text>
            </View>
            <Text style={styles.sectionTitle}>Arrendador</Text>
            <View style={styles.profileContainer}>
              <Image
                source={rental.vehicle_id.userId.imageUrl ? { uri: rental.vehicle_id.userId.imageUrl } : require("../../../../../assets/images/defaultprofile.png")}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.profileName}>{`${rental.vehicle_id.userId.firstName} ${rental.vehicle_id.userId.lastName}`}</Text>
                <TouchableOpacity onPress={handlePhonePress}>
                  <Text style={styles.phoneNumber}>{rental.vehicle_id.userId.phoneNumber}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              text={statusText[rental.status]}
              onClick={handleStatusChange}
              isPrimary
              isDisabled={
                rental.status === "CREATED" || rental.status === "FINISHED" || rental.status === "ACTIVE"
              }
            />
            <Text
              style={[styles.grayText, { marginTop: 10, textAlign: "center" }]}
            >
              {statusDescription[rental.status]}
            </Text>
          </>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  dateText: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 17,
    marginTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
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
    paddingVertical: 10,
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
  phoneNumber: {
    fontSize: 15,
    color: "#7E7E7E",
    marginTop: 1,
    fontFamily: "Inter",
    fontWeight: "500",
  },
});

export default ActiveRentalsScreen;
