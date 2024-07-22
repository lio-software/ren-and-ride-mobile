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
  ActivityIndicator,
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
  CarDetails: {
    vehicleId: string;
    startDate: string;
    endDate: string;
    isCurrentlyRented?: boolean;
  };
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
  const [isLoading, setIsLoading] = useState(true);

  const pagerViewRef = React.useRef(null);
  const interactionTimeoutRef = React.useRef(null);

  const { vehicleId, startDate, endDate, isCurrentlyRented } = route.params;
  const user = useSelector(selectUser);

  const loadVehicle = async () => {
    try {
      const vehicle = await getVehicleByIdUseCase.execute(vehicleId);
      handleFeatures(vehicle.description);
      setVehicle(vehicle);
    } finally {
      setIsLoading(false);
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

    createRental
      .execute(newRental)
      .then(() => {
        console.log("Renta creada");
        return updateVehicleUseCase.execute(
          {
            ...vehicle,
            avalible: false,
          },
          vehicleId
        );
      })
      .then(() => {
        console.log("Vehículo actualizado");
        navigation.navigate("Success", {
          message:
            "Tu renta ha sido creada exitosamente, espera la confirmación del arrendador.",
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
    arrowOpacity.setValue(1);
    clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      Animated.timing(arrowOpacity, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setShowArrows(false);
      });
    }, 2000);
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
              <Text style={styles.subtitleText}>{vehicle.stars}</Text>
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
                source={
                  vehicle.userId.imageUrl
                    ? { uri: vehicle.userId.imageUrl }
                    : require("../../../../assets/images/defaultprofile.png")
                }
                style={styles.profileImage}
              />
              <Text
                style={styles.profileName}
              >{`${vehicle.userId.firstName} ${vehicle.userId.lastName}`}</Text>
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
                  <Text style={styles.noCommentsText}>No hay comentarios.</Text>
                )}
              </ScrollView>
            </View>

            <Button
              text="Rentar"
              isPrimary
              onClick={handleSubmission}
              isSubmitting={isSubmitting}
              isDisabled={
                user._id === vehicle?.userId.uuid || isCurrentlyRented
              }
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagerViewContainer: {
    height: 250,
    marginBottom: 20,
  },
  pagerView: {
    flex: 1,
  },
  pagerImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitleSecondary: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  subtitleText: {
    marginLeft: 5,
    color: "#555555",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  bulletPoints: {
    marginLeft: 10,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
  },
  priceText: {
    fontWeight: "bold",
  },
  grayText: {
    color: "#888888",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentsContainer: {
    marginTop: 20,
  },
  noCommentsText: {
    color: "#888888",
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -25 }],
    zIndex: 1,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
});

export default CarDetailsScreen;
