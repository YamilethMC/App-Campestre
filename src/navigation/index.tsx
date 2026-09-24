import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Screens
import AuthScreen from './authScreen';
import MainTabs from './mainTabs';

// Types
import { RootStackParamList } from './types';

// Store y pantalla de bloqueo
import { BiometricLock } from '../features/auth/components/BiometricLock';
import { useAuthStore } from '../features/auth/store/useAuthStore';

// Create stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = (): React.JSX.Element => {
  const { isAuthenticated, pendingPasswordChange, biometricsEnabled, biometricsUnlocked } =
    useAuthStore();

  // Hay sesión viva, pero el socio activó Face ID y todavía no confirma quién es
  // en esta apertura de la app. No se cierra la sesión: sólo se tapa.
  if (isAuthenticated && !pendingPasswordChange && biometricsEnabled && !biometricsUnlocked) {
    return <BiometricLock />;
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated || pendingPasswordChange ? (
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