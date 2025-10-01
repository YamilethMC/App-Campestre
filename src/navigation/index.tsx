import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';

// Import screens
import ProtectedTabNavigator from './mainNavigator';
import AuthScreen from './stacksScreens/authScreen';

// Create stack navigator
const Stack = createNativeStackNavigator();

// Main navigator
const MainNavigator = () => {
  const { isAuthenticated } = useStore();
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'MainTabs' : 'Auth'}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen 
          name="MainTabs" 
          component={ProtectedTabNavigator} 
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;