import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// Import screens
import AuthScreen from './authScreen';
import MainTabs from './mainTabs';

// Types
import { RootStackParamList } from './types';

// Create stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Main navigator
import { useAuthStore } from '../features/auth/store/useAuthStore';

const MainNavigator = (): React.JSX.Element => {
  const { isAuthenticated, pendingPasswordChange } = useAuthStore();

  return (
    <Stack.Navigator>
      {!isAuthenticated || pendingPasswordChange ? (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            headerShown: false,
            title: 'Iniciar Sesión',
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              headerShown: false,
              title: 'Inicio',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
