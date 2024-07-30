import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator, // Importa el ActivityIndicator
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../../shared/infrastructure/ui/components/Button";
import AppBar from "../../../shared/infrastructure/ui/components/AppBar";
import Comment from "../../../shared/infrastructure/ui/components/Comment";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  getVehicleByIdUseCase,
  getCommentsByVehicleIdUseCase,
} from "../dependencies";
import {
  dateToString,
  howManyDays,
} from "../../../rentals/infrastructure/ui/utils/dateUtils";
import PagerView from "react-native-pager-view";

import { createRental } from "../../../rentals/infrastructure/dependencies";
import RentalEntity from "../../../rentals/domain/entities/RentalEntity";
import { selectUser } from "../../../shared/infrastructure/redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { updateVehicleUseCase } from "../dependencies";

type RootStackParamList = {
  CarDetails: { vehicleId: string; startDate: string; endDate: string, isCurrentlyRented?: boolean };
  AddCard: undefined;
  Success: { message: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "CarDetails">;

const CarDetailsScreen = ({ navigation, route }: Props) => {
  const [vehicle, setVehicle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const [arrowOpacity] = useState(new Animated.Value(1));
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  const pagerViewRef = React.useRef(null);
  const interactionTimeoutRef = React.useRef(null);

  const { vehicleId, startDate, endDate, isCurrentlyRented } = route.params;
  const user = useSelector(selectUser);

  const loadVehicle = async () => {
    try {
      const vehicle = await getVehicleByIdUseCase.execute(vehicleId);
      handleFeatures(vehicle.description);
      setVehicle(vehicle)
    } finally {
      setIsLoading(false); // Cambia a false después de cargar los datos
    }
  };

  const loadComments = async () => {
    const comments = await getCommentsByVehicleIdUseCase.execute(vehicleId);
    setComments(comments);
  };

  const handleSubmission = () => {
    setIsSubmitting(true);
    const newRental = new RentalEntity({
      uuid: "",
      lesse_id: user._id,
      lessor_id: vehicle.userId.uuid,
      vehicle_id: vehicleId,
      start_date: startDate,
      end_date: endDate,
      total_amount: totalPrice,
      status: "CREATED",
    });

    createRental.execute(newRental)
      .then(() => {
        console.log("Renta creada");
        return updateVehicleUseCase.execute({
          ...vehicle,
          avalible: false,
        }, vehicleId);
      })
      .then(() => {
        console.log("Vehículo actualizado");
        navigation.navigate("Success", {
          message: "Tu renta ha sido creada exitosamente, espera la confirmación del arrendador.",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response && error.response.status === 400) {
          Alert.alert("Error", "Ocurrió un error, verifique los datos");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    loadVehicle().then(() => {
      if (vehicle) {
        handleFeatures(vehicle.description);
      }
    });
    loadComments();
    console.log(comments);
  }, []);

  const totalPrice = vehicle
    ? vehicle.rentalPrice * howManyDays(startDate, endDate)
    : 0;

  const handleFeatures = (description: string) => {
    const features = description.split(",");
    setFeatures(features);
  };

  const goToNextPage = () => {
    if (currentPage < vehicle.vehicleImages.length - 1) {
      pagerViewRef.current.setPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      pagerViewRef.current.setPage(currentPage - 1);
    }
  };

  const handleInteraction = () => {
    setShowArrows(true);
    arrowOpacity.setValue(1); // Restablece la opacidad a 1
    clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      Animated.timing(arrowOpacity, {
        toValue: 0, // Desaparecer
        duration: 1000, // 1 segundo
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setShowArrows(false);
      });
    }, 2000); // Ocultar flechas después de 2 segundos de inactividad
  };

  useEffect(() => {
    handleInteraction();
    return () => {
      clearTimeout(interactionTimeoutRef.current);
    };
  }, [currentPage]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <AppBar
        text="Detalles"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {vehicle && (
          <>
            <View
              style={styles.pagerViewContainer}
              onTouchStart={handleInteraction}
            >
              <PagerView
                ref={pagerViewRef}
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
              >
                {vehicle.vehicleImages.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.pagerImage}
                  />
                ))}
              </PagerView>
              {showArrows && (
                <>
                  <Animated.View
                    style={[
                      styles.arrowButton,
                      styles.leftArrow,
                      { opacity: arrowOpacity },
                    ]}
                  >
                    <TouchableOpacity onPress={goToPreviousPage}>
                      <Icon name="chevron-back" size={28} color="#FFF" />
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View
                    style={[
                      styles.arrowButton,
                      styles.rightArrow,
                      { opacity: arrowOpacity },
                    ]}
                  >
                    <TouchableOpacity onPress={goToNextPage}>
                      <Icon name="chevron-forward" size={28} color="#FFF" />
                    </TouchableOpacity>
                  </Animated.View>
                </>
              )}
            </View>

            <Text
              style={styles.title}
            >{`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}</Text>

            <View style={styles.subtitleSecondary}>
              <Icon name="location-outline" size={17} />
              <Text style={styles.subtitleText}>{vehicle.address}</Text>
            </View>

            <View style={styles.subtitleSecondary}>
              <Icon name="star-outline" size={17} />
              <Text style={styles.subtitleText}>5</Text>
            </View>

            <Text style={styles.sectionTitle}>Qué ofrece este vehículo</Text>
            <View style={styles.bulletPoints}>
              {features.map((feature, index) => (
                <Text key={index} style={styles.bullet}>
                  • {feature}
                </Text>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Precio</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.price}>
                • <Text style={styles.priceText}>${vehicle.rentalPrice}</Text>{" "}
                MXN
                <Text style={styles.grayText}> por día</Text>
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Arrendador</Text>

            <View style={styles.profileContainer}>
              <Image
                source={vehicle.userId.imageUrl ? { uri: vehicle.userId.imageUrl } : require("../../../../assets/images/defaultprofile.png")}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{`${vehicle.userId.firstName} ${vehicle.userId.lastName}`}</Text>
            </View>

            <View
              style={{
                borderBottomColor: "#CCCCCC",
                borderBottomWidth: 1,
                marginTop: 20,
                opacity: 0.5,
              }}
            ></View>

            <View style={styles.commentsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <Comment
                      key={index}
                      user={`${comment.userId.firstName} ${comment.userId.lastName}`}
                      userImage={comment.userId.imageUrl} 
                      date="Hace 2 días"
                      comment={comment.text}
                      rating={comment.stars}
                    />
                  ))
                ) : (
                  <Text style={styles.noCommentsText}>
                    Este vehículo aún no ha sido calificado
                  </Text>
                )}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonTextLeft}>
            {dateToString(startDate)} - {dateToString(endDate)}
          </Text>
          <Text style={styles.buttonTextRight}>
            <Text style={styles.priceText}>${totalPrice}mxn</Text> total
          </Text>
        </View>
        <Button
          text="Rentar"
          isPrimary
          onClick={handleSubmission}
          isSubmitting={isSubmitting}
          isDisabled={user._id === vehicle?.userId.uuid || isCurrentlyRented}
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
  pagerViewContainer: {
    position: "relative",
    width: "100%",
    height: 231,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  pagerView: {
    width: "100%",
    height: 231,
  },
  pagerImage: {
    width: "100%",
    height: 231,
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -12 }],
    width: 30,
    height: 30,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
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
  descriptionText: {
    fontFamily: "Inter",
    fontSize: 17,
    color: "#7E7E7E",
    marginTop: 8,
    marginLeft: 20,
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
    paddingTop: 20,
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
  commentsContainer: {
    marginVertical: 20,
    marginBottom: 30,
  },
  comment: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  commentText: {
    fontFamily: "Inter",
    fontSize: 15,
    color: "#333333",
  },
  commentAuthor: {
    marginTop: 5,
    fontFamily: "Inter",
    fontSize: 13,
    color: "#777777",
  },
  noCommentsText: {
    fontFamily: "Inter",
    fontSize: 15,
    color: "#777777",
    marginTop: 10,
  },
  loaderContainer: { // Estilo para el contenedor del indicador de carga
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default CarDetailsScreen;
