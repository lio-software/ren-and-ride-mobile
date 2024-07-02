import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SearchWithDate from '../components/SearchWithDate';
import Card from '../components/Card';
import Layout from '../components/Layout';

const HomeScreen = ({navigation}) => {
  return (
    <Layout title={"Rent & Ride"}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <SearchWithDate />
        <View style={styles.cardContainer}>
          <Card
            image={require("../../../../../assets/images/aveo.jpg")}
            title="Aveo Hatchback 2024"
            price={600}
            location="Tuxtla Gutierrez, Chiapas"
            stars={4.5}
            onPress={() => navigation.navigate("CarDetails")}
          />
          <Card
            image={require("../../../../../assets/images/sentra.jpg")}
            title="Nissan Sentra 2023"
            price={450}
            location="Tuxtla Gutierrez, Chiapas"
            stars={4.9}
          />
          <Card
            image={require("../../../../../assets/images/kia.jpg")}
            title="Kia Rio 2022"
            price={400}
            location="Tuxtla Gutierrez, Chiapas"
            stars={4.3}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
  },
});

export default HomeScreen;
