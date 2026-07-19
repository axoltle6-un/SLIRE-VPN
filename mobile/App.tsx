import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={{
        dark: true,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: 'transparent',
          notification: colors.primary,
        }
      }}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
