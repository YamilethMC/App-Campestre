import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useStore } from '../store';

// Import screens
import AuthScreen from './authScreen';
import MainTabs from './mainTabs';

// Types
import { RootStackParamList } from './types';

// Create stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Main navigator
const MainNavigator = (): React.JSX.Element => {
  const { isAuthenticated } = useStore();

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ 
            headerShown: false,
            title: 'Iniciar Sesión'
          }}
        />
      ) : (
        <>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ 
              headerShown: false,
              title: 'Inicio'
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;