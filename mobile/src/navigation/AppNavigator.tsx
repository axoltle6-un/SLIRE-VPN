import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Shield, BarChart2, User } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import LocationsScreen from '../screens/LocationsScreen';
import ProtectionScreen from '../screens/ProtectionScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#090909',
          borderTopWidth: 0,
          elevation: 0,
          height: 90,
          paddingTop: 15,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textGray,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 4 }
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'VPN',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />
        }} 
      />
      <Tab.Screen 
        name="ProtectionTab" 
        component={ProtectionScreen} 
        options={{
          tabBarLabel: 'Protection',
          tabBarIcon: ({ color }) => <Shield color={color} size={24} />
        }} 
      />
      <Tab.Screen 
        name="StatsTab" 
        component={StatisticsScreen} 
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color }) => <BarChart2 color={color} size={24} />
        }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={24} />
        }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Locations" component={LocationsScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="SettingsStack" component={SettingsScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ animation: 'slide_from_bottom' }} />
    </Stack.Navigator>
  );
}
