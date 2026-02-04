import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

export const handleAuthError = () => {
  Alert.alert(
    'Sesión expirada',
    'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
    [
      {
        text: 'Aceptar',
        onPress: () => {
          useAuthStore.getState().clearAuth();

          router.replace('/');
        }
      }
    ],
    { cancelable: false }
  );
};

export const isAuthError = (response: any): boolean => {
  return response?.status === 401 || response?.error?.includes?.('401') || response?.message?.includes?.('401');
};