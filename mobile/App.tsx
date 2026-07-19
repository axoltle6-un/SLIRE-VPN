import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import LocationsScreen from './src/screens/LocationsScreen';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator();

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
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Locations" component={LocationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
