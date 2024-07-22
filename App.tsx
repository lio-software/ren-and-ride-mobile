import React, { useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import MainNavigator from './src/shared/infrastructure/ui/navigation/MainNavigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import store from './src/shared/infrastructure/redux/store';
import { Provider } from 'react-redux';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/Inter.ttf"),
  });

  useEffect(() => {
    const prepareResources = async () => {
      await SplashScreen.preventAutoHideAsync();
    };

    prepareResources();
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  // Referencia para manejar el teclado
  const keyboardDismiss = useRef(null);

  // Función para cerrar el teclado al tocar fuera de su área
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <Provider store={store}>
          <MainNavigator />
      </Provider>
    </TouchableWithoutFeedback>
  );
}
