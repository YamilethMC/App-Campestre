// Navigation
import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';

// Alert
import { Alert } from 'react-native';

// Store
import { useProfileStore } from '../../profile/store/useProfileStore';
import { useAuth } from '../store/useAuthStore';

// Services
import { authService } from '../services/authService';

// Interfaces
import { userProfile } from '../interfaces';

// Hooks
import useMessages from './useMessages';

export const useLogin = () => {
  const { messages } = useMessages();
  const navigation = useNavigation();
  const { setAuthData, clearAuth } = useAuth();
  const { setProfile } = useProfileStore();
  
  // Estado local para manejar la carga y errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<boolean>(false);
  

  // Función para limpiar errores
  const clearError = () => setError(null);

  // Función para manejar el login
  const login = async (email: string, password: string): Promise<boolean> => {

    if (!validateEmail(email)) {
      console.log('Email invalido');
      return false;
    }

    if (!email || !password) {
      setError(messages.ALERTS.REQUIRED_FIELDS);
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Llamar al servicio de autenticación
      const { success, token, user, error: authError } = await authService.login(email, password);
      console.log('login hook user:', user);

      if (success && user) {
        // 2. Separar datos de autenticación y perfil
        const profileData = { ...user};
        
        // 3. Actualizar los stores
        setAuthData(user.id, token ?? '');
        // Asegurarse de que profileData cumpla con UserProfile
        setProfile(profileData as userProfile);
        
        // 4. Navegar a la pantalla principal
        // @ts-ignore - asumiendo que existe la ruta 'MainTabs'
        // navigation.navigate('Main');
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(!isValid);
    return isValid;
  };

  // Función para manejar el envío del formulario
  const handleLogin = useCallback(
    async (email: string, password: string) => {
      await login(email, password);
    },
    [login]
  );

  // Funcion para manejar el cambio del correo
  const handleEmailChange = (email: string) => {
    setEmail(email);
    validateEmail(email);
  };

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
    email,
    password,
    isLoading,
    error,
    emailError,
    setEmail: handleEmailChange,
    setPassword,
    login,
    logout,
    clearError,
    handleLogin,
  };
};
