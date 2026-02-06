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
  const [memberCode, setMemberCode] = useState('');
  const [password, setPassword] = useState('');
  const [memberCodeError, setMemberCodeError] = useState<boolean>(false);
  

  // Función para limpiar errores
  const clearError = () => setError(null);

  // Función para manejar el login
  const login = async (memberCode: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { success, token, user, error: authError, status } = await authService.login(memberCode, password);

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
        Alert.alert('Error', errorMessage);
        return false;
      }
    } catch (err) {
      const errorMessage = messages.ALERTS.CONNECTION_ERROR || 'Error al conectar con el servidor';
      Alert.alert('Error', errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateMemberCode = (memberCode: string) => {
    // Validar que sea un número de acción válido (puede ser solo números o con formato específico)
    const memberCodeRegex = /^\d+$/; // Asumiendo que es solo números
    const isValid = memberCodeRegex.test(memberCode);
    setMemberCodeError(!isValid);
    return isValid;
  };

  // Función para manejar el envío del formulario
  const handleLogin = useCallback(
    async (memberCode: string, password: string) => {
      await login(memberCode, password);
    },
    [login]
  );

  // Funcion para manejar el cambio del número de acción
  const handleMemberCodeChange = (memberCode: string) => {
    setMemberCode(memberCode);
    validateMemberCode(memberCode);
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
    }
  };


  return {
    memberCode,
    password,
    isLoading,
    error,
    memberCodeError,
    setMemberCode: handleMemberCodeChange,
    setPassword,
    login,
    logout,
    clearError,
    handleLogin,
  };
};
