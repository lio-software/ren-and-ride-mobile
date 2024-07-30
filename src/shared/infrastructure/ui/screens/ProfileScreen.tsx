import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";
import MenuOption from "../components/MenuOption";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/authReducer";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  useEffect(() => {
    console.log("User Image URL:", user);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Layout title={"Mi perfil"}>
      <View style={styles.profileContainer}>
        <Image
          source={user.imageUrl ? { uri: user.imageUrl } : require("../../../../../assets/images/defaultprofile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
      </View>

      <Text style={{ fontSize: 17, fontWeight: "bold" }}>Configuración</Text>

      <MenuOption
        iconName="account-circle-outline"
        text="Editar mi perfil"
        onPress={() => navigation.navigate("EditProfile")}
      />
      <MenuOption
        iconName="car"
        text="Rentar mi vehiculo"
        onPress={() => navigation.navigate("RentMyVehicle")}
      />
      <MenuOption
        iconName="bike"
        text="Mis vehiculos"
        onPress={() => {navigation.navigate("MyVehicles")}}
      />
      <MenuOption
        iconName="car-clock"
        text="Historial de rentas como arrendatario"
        onPress={() => navigation.navigate("LessorHistory")}
      />
      <MenuOption
        iconName="history"
        text="Historial de rentas como arrendador"
        onPress={() => navigation.navigate("LesseeHistory")}
      />
      <MenuOption
        iconName="chart-line"
        text="Mi rendimiento"
        onPress={() => navigation.navigate("MyPerformance")}
      />
      <MenuOption
        iconName="trash-can-outline"
        text="Eliminar mi cuenta"
        onPress={() => navigation.navigate("DeleteMyAccount")}
      />
      <MenuOption
        iconName="exit-to-app"
        text="Cerrar sesión"
        onPress={handleLogout}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
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
