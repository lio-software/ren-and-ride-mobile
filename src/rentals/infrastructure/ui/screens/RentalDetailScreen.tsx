import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Layout from "../../../../shared/infrastructure/ui/components/Layout";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../../../shared/infrastructure/ui/components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getRentalById } from "../../dependencies";
import { dateToString } from "../utils/dateUtils";
import { updateRental } from "../../dependencies";
import { updateVehicleUseCase } from "../../../../vehicles/infrastructure/dependencies";

type RootStackParamList = {
  RentalDetail: {
    rentalId: string;
    startDate: string;
    endDate: string;
    status?: boolean;
  };
  AddCard: undefined;
  Success: { message: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "RentalDetail">;

const RentalDetailScreen = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rental, setRental] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { rentalId, startDate, endDate, status } = route.params;

  const handlePhonePress = () => {
    Linking.openURL(`tel:${rental?.lesse_id.phoneNumber}`);
  };

  const fetchRentalData = async () => {
    setIsLoading(true);
    try {
      const rentalData = await getRentalById.execute(rentalId);
      setRental(rentalData);
      console.log(rentalData);
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
    await fetchRentalData();
    setRefreshing(false);
  };

  const statusText = {
    CREATED: "Marcar como disponible para recoger",
    WAITING: "Esperando recolección",
    ACTIVE: "He recibido mi vehículo",
    FINISHED: "Servicio finalizado",
  };

  const handleStatusChange = async () => {
    if (!rental || !rental.vehicle_id) {
      console.error("Rental or vehicle_id is undefined");
      return;
    }

    let newStatus = rental.status;
    if (rental.status === "CREATED") {
      newStatus = "WAITING";
    } else if (rental.status === "WAITING") {
      newStatus = "ACTIVE";
    } else if (rental.status === "ACTIVE") {
      const vehicle = rental.vehicle_id;

      await updateVehicleUseCase
        .execute(
          {
            ...vehicle,
            avalible: true,
          },
          vehicle.uuid
        )
        .then(() => {
          console.log("Vehículo actualizado");
        })
        .catch((error) => {
          console.error("Error updating vehicle:", error);
        });

      newStatus = "FINISHED";
    }

    const updatedRental = {
      ...rental,
      status: newStatus,
      vehicle_id: rental.vehicle_id.uuid,
    };

    const lesseId = rental.lesse_id.uuid;
    updatedRental.lesse_id = lesseId;

    await updateRental
      .execute(updatedRental, rentalId)
      .then(() => {
        console.log("Rental updated");
        fetchRentalData();
      })
      .catch((error) => {
        console.error("Error updating rental:", error);
      });
  };

  return (
    <Layout title={"Detalles de renta"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#7E49FF"]}
          />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#7E49FF" />
        ) : (
          <>
            <Text style={styles.dateText}>
              {dateToString(rental?.start_date)} - {dateToString(rental?.end_date)}
            </Text>
            <Image
              source={{ uri: rental?.vehicle_id.vehicleImages[0] }}
              style={{
                width: "100%",
                height: 231,
                borderRadius: 8,
                marginBottom: 16,
              }}
            />

            <Text
              style={styles.title}
            >{`${rental?.vehicle_id.brand} ${rental?.vehicle_id.model} ${rental?.vehicle_id.year}`}</Text>

            <View style={styles.subtitleSecondary}>
              <Icon name="location-outline" size={17} />
              <Text style={styles.subtitleText}>
                {rental?.vehicle_id.address}
              </Text>
            </View>
            <View style={styles.subtitleSecondary}>
              <Icon name="star-outline" size={17} />
              <Text style={styles.subtitleText}>
                {rental?.vehicle_id.stars}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Precio</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.price}>
                •{" "}
                <Text style={styles.priceText}>
                  ${rental?.vehicle_id.rentalPrice}
                </Text>{" "}
                MXN
                <Text style={styles.grayText}> por día</Text>
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Arrendatario</Text>
            <View style={styles.profileContainer}>
              <Image
                source={rental?.lesse_id.imageUrl ? { uri: rental?.lesse_id.imageUrl } : require("../../../../../assets/images/defaultprofile.png")}
                style={styles.profileImage}
              />
              <View>
              <Text style={styles.profileName}>{`${rental?.lesse_id.firstName} ${rental?.lesse_id.lastName}`}</Text>
              <TouchableOpacity onPress={handlePhonePress}>
                  <Text style={styles.phoneNumber}>{rental?.lesse_id.phoneNumber}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button
              text={statusText[rental?.status]}
              onClick={handleStatusChange}
              isPrimary
              isDisabled={rental?.status === "FINISHED" || rental?.status === "WAITING"}
            />
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

export default RentalDetailScreen;
