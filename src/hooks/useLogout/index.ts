import { useCallback } from 'react';
import { Alert } from 'react-native';
import { authService } from '../../features/auth/services/authService';
import { useProfileStore } from '../../features/profile/store/useProfileStore';
import { useAuthStore } from '../../store';
import useMessages from './useMessage';

const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const { clearProfile } = useProfileStore();
  const messages = useMessages();

  const handleLogout = useCallback(async () => {
    try {
      // Avisarle al servidor antes de borrar nada: si no revoca el refresh,
      // cerrar sesión no serviría de mucho, porque ese token seguiría sirviendo
      // para abrir otra.
      await authService.logout();

      await clearAuth();
      clearProfile();

      // No se navega a mano: MainNavigator muestra el login en cuanto
      // isAuthenticated queda en false. Hacerlo aquí además fallaba al cerrar
      // sesión desde la pantalla de bloqueo biométrico, que vive fuera del
      // navegador y por eso no podía resolver la ruta 'Auth'.
    } catch (error) {
      Alert.alert('Error', messages?.CONTAINER?.TEXT_LOGOUT || 'Error al cerrar sesión');
    }
  }, [clearAuth, clearProfile, messages]);

  return { handleLogout };
};

export default useLogout;
