import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Layout from '../components/Layout';
import MenuOption from '../components/MenuOption';

const ProfileScreen = () => {
  return (
    <Layout title={"Mi perfil"}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../../../../../assets/images/profile.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Luis Roberto Conriquez</Text>
      </View>

      <Text style={{ fontSize: 17, fontWeight: "bold" }}>Configuración</Text>

      <MenuOption iconName="account-circle-outline" text="Información de mi perfil" />
      <MenuOption iconName="history" text="Historial de rentas como arrendatario" />
      <MenuOption iconName="history" text="Historial de rentas como arrendador" />
      <MenuOption iconName="car" text="Rentar mi carro" />
      <MenuOption iconName="car-clock" text="Mis carros rentados" />
      <MenuOption iconName="credit-card-outline" text="Mis pagos" />
      <MenuOption iconName="trash-can-outline" text="Eliminar mi cuenta" />
      <MenuOption iconName="exit-to-app" text="Cerrar sesión" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 20,
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
});

export default ProfileScreen;
