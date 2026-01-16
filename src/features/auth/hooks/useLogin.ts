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
import { AuthStackNavigationProp } from '../../../navigation/authScreen/types';
import useMessages from './useMessages';

export const useLogin = () => {
  const { messages } = useMessages();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { setAuthData, clearAuth, setPendingPasswordChange } = useAuth();
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
    setIsLoading(true);
    setError(null);

    try {
      const { success, token, user, error: authError } = await authService.login(email, password);

      if (success && user) {
        const profileData = { ...user};
        
        setAuthData(user.id, token ?? '');
        setProfile(profileData as userProfile);
        
        const numericUserId = typeof user.id === 'number' ? user.id : Number(user.id);

        if (user.mustChangePassword) {
          setPendingPasswordChange(true);
          // @ts-ignore
          navigation.navigate('ChangePassword', { 
            userId: numericUserId, 
            isFirstLogin: true 
          });
          return true;
        }
        setPendingPasswordChange(false);
        
        return true;
      } else {
        const errorMessage = authError || messages.ALERTS.LOGIN_ERROR || 'Error en la autenticación';
        setError(errorMessage);
        Alert.alert(
          messages.ALERTS.ERROR,
          errorMessage,
          [
            {
              text: messages.ALERTS.OK,
              onPress: () => setError(null),
            },
          ],
          { cancelable: false }
        );
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = messages.ALERTS.CONNECTION_ERROR || 'Error al conectar con el servidor';
      setError(errorMessage);
      Alert.alert(
        messages.ALERTS.ERROR,
        errorMessage,
        [
          {
            text: messages.ALERTS.OK,
            onPress: () => setError(null),
          },
        ],
        { cancelable: false }
      );
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
