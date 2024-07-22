import React, { useLayoutEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import SearchWithDate from "../components/SearchWithDate";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { listVehiclesUseCase } from "../../../../vehicles/infrastructure/dependencies";

const HomeScreen = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchText, setSearchText] = useState("");

  const loadVehicles = async (text = "") => {
    setLoading(true);
    const vehiclesList = await listVehiclesUseCase.execute(text);
    setVehicles(vehiclesList);
    setLoading(false);
  };

  useLayoutEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setEndDate(tomorrow);
    loadVehicles();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVehicles(searchText);
    setRefreshing(false);
  };

  const handleSearch = () => {
    loadVehicles(searchText);
  };

  return (
    <Layout title={"Rent & Ride"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SearchWithDate
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingIndicator}
          />
        ) : (
          vehicles.map((vehicle) => (
            <Card
              key={vehicle._id}
              image={vehicle.vehicleImages[0]}
              title={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
              price={vehicle.rentalPrice}
              location={vehicle.address}
              stars={vehicle.stars}
              onPress={() =>
                navigation.navigate("CarDetails", {
                  vehicleId: vehicle._id,
                  startDate: startDate.toDateString(),
                  endDate: endDate.toDateString(),
                })
              }
            />
          ))
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  searchButton: {
    backgroundColor: "#7E49FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
