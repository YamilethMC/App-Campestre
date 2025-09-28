import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useProfileStore } from '../../profile/store/useProfileStore';
import { authService, UserProfile } from '../services/authService';
import { useAuth } from '../store/useAuthStore';
import useMessages from './useMessages';

export const useLogin = () => {
  const { messages } = useMessages();
  const navigation = useNavigation();
  const { setAuthData, clearAuth } = useAuth();
  const { setProfile } = useProfileStore();
  
  // Estado local para manejar la carga y errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para limpiar errores
  const clearError = () => setError(null);

  // Función para manejar el login
  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      setError(messages.ALERTS.REQUIRED_FIELDS);
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Llamar al servicio de autenticación
      const { success, user, error: authError } = await authService.login(email, password);
      
      if (success && user) {
        // 2. Separar datos de autenticación y perfil
        const { token, ...profileData } = user;
        
        // 3. Actualizar los stores
        setAuthData(user.id, token);
        // Asegurarse de que profileData cumpla con UserProfile
        setProfile({
          ...profileData,
          token: '' // Agregar token vacío o undefined si es necesario
        } as UserProfile);
        
        // 4. Navegar a la pantalla principal
        // @ts-ignore - asumiendo que existe la ruta 'MainTabs'
        navigation.navigate('MainTabs');
        return true;
      } else {
        // 5. Manejar error de autenticación
        setError(authError || 'Error en la autenticación');
        return false;
      }
    } catch (err) {
      // 6. Manejar errores inesperados
      console.error('Login error:', err);
      setError('Error al conectar con el servidor');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el envío del formulario
  const handleLogin = useCallback(
    async (email: string, password: string) => {
      await login(email, password);
    },
    [login]
  );

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await authService.logout();
      clearAuth();
      // Limpiar también el perfil
      useProfileStore.getState().clearProfile();
      // Opcional: Navegar a la pantalla de login
      // navigation.navigate('Login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Mostrar alerta de error si existe
  if (error) {
    Alert.alert(
      messages.ALERTS.ERROR,
      error,
      [
        {
          text: messages.ALERTS.OK,
          onPress: clearError,
        },
      ],
      { cancelable: false }
    );
  }

  return {
    isLoading,
    error,
    login,
    logout,
    clearError,
    handleLogin,
  };
};
