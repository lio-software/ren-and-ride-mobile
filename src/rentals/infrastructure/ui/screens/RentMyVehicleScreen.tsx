import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Input from "../../../../shared/infrastructure/ui/components/Input";
import AppBar from "../../../../shared/infrastructure/ui/components/AppBar";
import Button from "../../../../shared/infrastructure/ui/components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InputCheckbox from "../../../../shared/infrastructure/ui/components/InputCheckbox";
import { createVehicleUseCase } from "../../../../vehicles/infrastructure/dependencies";
import VehicleEntity from "../../../../vehicles/domain/entities/VehicleEntity";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../shared/infrastructure/redux/reducers/authReducer";

const RentMyVehicleScreen = ({ navigation }) => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [media, setMedia] = useState([] as any);
  const [errors, setErrors] = useState({
    model: undefined,
    brand: undefined,
    type: undefined,
    year: undefined,
    price: undefined,
    address: undefined,
  });
  const [features, setFeatures] = useState({
    airConditioning: false,
    automaticTransmission: false,
    fourDoors: false,
    fivePassengers: false,
    gps: false,
    insuranceIncluded: false,
    helmetIncluded: false,
    twoHelmets: false,
    twoPassengers: false,
    ecoBooster: false,
  });

  const user = useSelector(selectUser);

  const handleCheckboxChange = (feature) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };

  const handleSubmit = async () => {
    const newErrors = validateInputs();
    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    const selectedFeatures = Object.keys(features)
      .filter((feature) => features[feature])
      .map((feature) => {
        switch (feature) {
          case "airConditioning":
            return "Aire acondicionado";
          case "automaticTransmission":
            return "Transmision automatica";
          case "fourDoors":
            return "4 puertas";
          case "fivePassengers":
            return "5 pasajeros";
          case "gps":
            return "GPS";
          case "insuranceIncluded":
            return "Seguro incluido";
          case "helmetIncluded":
            return "Casco incluido";
          case "twoHelmets":
            return "2 cascos incluidos";
          case "twoPassengers":
            return "2 pasajeros";
          case "ecoBooster":
            return "Eco Booster";
          default:
            return "";
        }
      })
      .join(",");

    setIsSubmitting(true);
    const vehicleData = new VehicleEntity({
      id: "",
      model,
      brand,
      vehicle_type: type,
      year: parseInt(year, 10),
      price: parseFloat(price),
      location: address,
      user_id: user._id,
      avaliable: true,
      stars: 0,
      vehicleImages: media.map((image) => image.uri),
      // TODO:
      description: selectedFeatures,
      color: "",
    });

    await createVehicleUseCase.execute(vehicleData);
    setIsSubmitting(false);

    navigation.navigate("Success", {
      message:
        "Excelente! Tu vehiculo ha sido publicado, pronto recibiras solicitudes de alquiler.",
    });
  };

  const validateInputs = () => {
    const newErrors = {
      model: undefined,
      brand: undefined,
      type: undefined,
      year: undefined,
      price: undefined,
      address: undefined,
    };
    if (!model) newErrors.model = "Modelo es requerido";
    if (!brand) newErrors.brand = "Marca es requerida";
    if (!type) newErrors.type = "Tipo de vehículo es requerido";
    if (
      !year ||
      isNaN(parseInt(year, 10)) ||
      parseInt(year, 10) < 2021 ||
      parseInt(year, 10) > 2025
    ) {
      newErrors.year = "Año es requerido y debe ser entre 2021 y 2025";
    }
    if (!price || isNaN(parseFloat(price)))
      newErrors.price = "Precio es requerido y debe ser numérico";
    if (!address) newErrors.address = "Dirección es requerida";
    return newErrors;
  };

  const handleAddPhotos = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const localImageUris = result.assets.map((asset) => asset.uri);
      const localMedia = result.assets.map((asset) => asset);
      setMedia((prevAssets) => [...prevAssets, ...localMedia]);
      setImages((prevImages) => [...prevImages, ...localImageUris]);
    }
    console.log("media", media.length);
    console.log("images", images.length);
  };

  const handleRemovePhoto = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setMedia((prevAssets) => prevAssets.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppBar
        text="Rentar mi vehiculo"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label="Modelo"
          value={model}
          placeholder="Aveo"
          onChangeText={(text) => {
            setModel(text);
            setErrors((prevErrors) => ({ ...prevErrors, model: undefined }));
          }}
        />
        {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}

        <Input
          label="Marca"
          value={brand}
          placeholder="Chevrolet"
          onChangeText={(text) => {
            setBrand(text);
            setErrors((prevErrors) => ({ ...prevErrors, brand: undefined }));
          }}
        />
        {errors.brand && <Text style={styles.errorText}>{errors.brand}</Text>}

        <Input
          label="Tipo de vehiculo"
          value={type}
          placeholder="Carro"
          onChangeText={(text) => {
            setType(text);
            setErrors((prevErrors) => ({ ...prevErrors, type: undefined }));
          }}
        />
        {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}

        <Input
          label="Año"
          value={year}
          placeholder="2019"
          onChangeText={(text) => {
            setYear(text);
            setErrors((prevErrors) => ({ ...prevErrors, year: undefined }));
          }}
          keyboardType="numeric"
        />
        {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}

        <Input
          label="Precio por dia"
          value={price}
          placeholder="500"
          onChangeText={(text) => {
            setPrice(text);
            setErrors((prevErrors) => ({ ...prevErrors, price: undefined }));
          }}
          keyboardType="numeric"
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <Input
          label="Dirección de entrega"
          value={address}
          placeholder="Calle 123"
          onChangeText={(text) => {
            setAddress(text);
            setErrors((prevErrors) => ({ ...prevErrors, address: undefined }));
          }}
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}

        <TouchableOpacity
          style={styles.addPhotosButton}
          onPress={handleAddPhotos}
        >
          <Icon name="camera-burst" size={24} color="#7E7E7E" />
          <Text style={styles.addPhotosText}>Agregar fotos</Text>
        </TouchableOpacity>

        {images.length > 0 && (
          <View style={styles.imageContainerWrapper}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.imageContainer}
              showsHorizontalScrollIndicator={false}
            >
              {images.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemovePhoto(index)}
                  >
                    <Icon name="close-circle" size={28} color="#7E49FF" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Caracteristicas</Text>
          <InputCheckbox
            text="Aire acondicionado"
            checked={features.airConditioning}
            onChange={() => handleCheckboxChange("airConditioning")}
          />
          <InputCheckbox
            text="Transmision automatica"
            checked={features.automaticTransmission}
            onChange={() => handleCheckboxChange("automaticTransmission")}
          />
          <InputCheckbox
            text="4 puertas"
            checked={features.fourDoors}
            onChange={() => handleCheckboxChange("fourDoors")}
          />
          <InputCheckbox
            text="5 pasajeros"
            checked={features.fivePassengers}
            onChange={() => handleCheckboxChange("fivePassengers")}
          />
          <InputCheckbox
            text="GPS"
            checked={features.gps}
            onChange={() => handleCheckboxChange("gps")}
          />
          <InputCheckbox
            text="Seguro incluido"
            checked={features.insuranceIncluded}
            onChange={() => handleCheckboxChange("insuranceIncluded")}
          />
          <InputCheckbox
            text="Casco incluido"
            checked={features.helmetIncluded}
            onChange={() => handleCheckboxChange("helmetIncluded")}
          />
          <InputCheckbox
            text="2 cascos incluidos"
            checked={features.twoHelmets}
            onChange={() => handleCheckboxChange("twoHelmets")}
          />
          <InputCheckbox
            text="2 pasajeros"
            checked={features.twoPassengers}
            onChange={() => handleCheckboxChange("twoPassengers")}
          />
          <InputCheckbox
            text="Eco Booster"
            checked={features.ecoBooster}
            onChange={() => handleCheckboxChange("ecoBooster")}
          />
          
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button text="Guardar" isPrimary onClick={handleSubmit} isSubmitting={isSubmitting} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingTop: 0,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
    padding: 17,
  },
  addPhotosButton: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E1E7ED",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  addPhotosText: {
    color: "#7E7E7E",
    fontSize: 14,
  },
  imageContainerWrapper: {
    height: 120, // Set the desired height for the ScrollView
    width: "100%",
    marginTop: 16,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  imageWrapper: {
    position: "relative",
    margin: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 17,
  },
  featuresContainer: {
    width: "100%",
    marginTop: 16,
  },
  featuresTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default RentMyVehicleScreen;
