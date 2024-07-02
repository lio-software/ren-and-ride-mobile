import { StyleSheet, Text } from "react-native";
import Layout from "../components/Layout";
import Card from "../components/Card";

const ActiveRentalsScreen = ({navigation}) => {
  return (
    <Layout title={"Rentas activas"}>
      <Text style={styles.dateText}>Jan 23 - Jan 28</Text>

      <Card
        image={require("../../../../../assets/images/aveo.jpg")}
        title="Aveo Hatchback 2024"
        price={600}
        location="Tuxtla Gutierrez, Chiapas"
        stars={4.5}
        onPress={() => navigation.navigate("CarDetails")}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  dateText: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 17,
    marginTop: 16,
    paddingBottom: 16,
  },
});

export default ActiveRentalsScreen;
