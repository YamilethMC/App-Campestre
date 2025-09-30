import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';

// Import feature containers
import LoginScreen from '../features/auth';

import ProtectedTabNavigator from './menu';

// Create stack navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



// Main navigator (without NavigationContainer since Expo Router provides it)
const MainNavigator = () => {
  const { isAuthenticated } = useStore();
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'MainTabs' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: t('login.title') }}
        />
      ) : null}
      
      <Stack.Screen 
        name="MainTabs" 
        component={ProtectedTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;