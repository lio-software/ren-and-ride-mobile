import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/reducers/authReducer";
import LaunchScreen from "../screens/LaunchScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CarDetailsScreen from "../../../../vehicles/infrastructure/ui/CarDetailsScreen";
import AddCardScreen from "../screens/AddCardScreen";
import SuccesfullScreen from "../screens/SuccessfulScreen";
import ActiveRentalsScreen from "../../../../rentals/infrastructure/ui/screens/ActiveRentalsScreen";
import EditProfileScreen from "../../../../users/infrastructure/ui/screens/EditProfileScreen";
import LessorHistoryScreen from "../../../../rentals/infrastructure/ui/screens/LessorHistoryScreen";
import RentMyVehicleScreen from "../../../../rentals/infrastructure/ui/screens/RentMyVehicleScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import LesseeHistoryScreen from "../../../../rentals/infrastructure/ui/screens/LesseeHistoryScreen";
import MyVehicles from "../../../../vehicles/infrastructure/ui/MyVehicles";
import RateExperienceScreen from '../../../../vehicles/infrastructure/ui/RateExperienceScreen';
import RentalDetailScreen from "../../../../rentals/infrastructure/ui/screens/RentalDetailScreen";
import MyRentalsScreen from "../../../../rentals/infrastructure/ui/screens/MyRentalsScreen";
import DeleteMyAccountScreen from '../../../../vehicles/infrastructure/ui/DeleteMyAccountScreen';

type RootStackParamList = {
  HomeTabs: undefined;
  Launch: undefined;
  Register: undefined;
  Login: undefined;
  TermsAndConditions: undefined;
  AddCard: undefined;
  CarDetails: { vehicleId: string, startDate: string, endDate: string };
  Success: { message: string };
  EditProfile: undefined;
  LessorHistory: undefined;
  RentMyVehicle: undefined;
  LesseeHistory: undefined;
  MyVehicles: undefined;
  RateExperience: { vehicleId: string };
  RentalDetail: undefined;
  MyRentals: undefined;
  ActiveRentals: undefined;
  DeleteMyAccount: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MyRentalsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyRentals" component={MyRentalsScreen} />
      <Stack.Screen name="ActiveRentals" component={ActiveRentalsScreen} />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "account" : "account-outline";
          } else if (route.name === "Rentas activas") {
            iconName = focused ? "car" : "car-outline";
          }

          return <Icon name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "#7E49FF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 30, height: 85, paddingTop: 10 },
        tabBarLabelStyle: { fontFamily: "Inter", fontSize: 12 },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Rentas activas"
        component={MyRentalsStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Launch"
              component={LaunchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditionsScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="AddCard"
              component={AddCardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CarDetails"
              component={CarDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Success"
              component={SuccesfullScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LessorHistory"
              component={LessorHistoryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RentMyVehicle"
              component={RentMyVehicleScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LesseeHistory"
              component={LesseeHistoryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyVehicles"
              component={MyVehicles}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RateExperience"
              component={RateExperienceScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RentalDetail"
              component={RentalDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DeleteMyAccount"
              component={DeleteMyAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabNavigator}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
