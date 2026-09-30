import { createNativeStackNavigator } from 'expo-router/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Screens
import AuthScreen from './authScreen';
import MainTabs from './mainTabs';

// Types
import { RootStackParamList } from './types';

// Store y pantalla de bloqueo
import { BiometricLock } from '../features/auth/components/BiometricLock';
import { useSessionRefresh } from '../features/auth/hooks/useSessionRefresh';
import { useAuthStore } from '../features/auth/store/useAuthStore';
import { COLORS } from '../shared/theme/colors';

// Create stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = (): React.JSX.Element => {
  const { isAuthenticated, pendingPasswordChange, biometricsEnabled, biometricsUnlocked } =
    useAuthStore();
  const sessionReady = useSessionRefresh();

  // Mientras se recupera la sesión guardada y se renueva el token si ya venció.
  // Sin esto, las pantallas pedirían sus datos con un token vencido.
  if (!sessionReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});

export default MainNavigator;