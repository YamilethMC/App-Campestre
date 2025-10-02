import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useStore } from '../store';

// Import screens
import MainTabs from './MainTabs';
import AuthScreen from './stacksScreens/authScreen';
import ProfileScreen from '../features/profile/containers';
import MoreOptionsScreen from '../features/moreOptions';

// Create stack navigator
const Stack = createNativeStackNavigator();

// Main navigator
const MainNavigator = () => {
  const { isAuthenticated } = useStore();
  
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
        <>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'Perfil' }}
          />
          <Stack.Screen 
            name="MoreOptions" 
            component={MoreOptionsScreen} 
            options={{ title: 'Más opciones' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;