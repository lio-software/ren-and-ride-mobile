import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import { StatusBar } from 'expo-status-bar';

const Layout = ({ children, title, showBackButton, onBackPress } : { children: React.ReactNode, title: string, showBackButton?: boolean, onBackPress?: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <AppBar text={title} showBackButton={showBackButton} onBackPress={onBackPress} />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 17,
    paddingTop: 0,
  },
});

export default Layout;
