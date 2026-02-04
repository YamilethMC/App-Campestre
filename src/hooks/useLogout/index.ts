import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useProfileStore } from '../../features/profile/store/useProfileStore';
import { useAuthStore } from '../../store';
import useMessages from './useMessage';

const useLogout = () => {
  const navigation = useNavigation();
  const { clearAuth } = useAuthStore();
  const { clearProfile } = useProfileStore();
  const messages = useMessages();

  const handleLogout = useCallback(async () => {
    try {
      await clearAuth();
      clearProfile();
      // @ts-ignore - Navigation type will be inferred by the navigator
      navigation.navigate('Auth');
    } catch (error) {
      Alert.alert('Error', messages?.CONTAINER?.TEXT_LOGOUT || 'Error al cerrar sesión');
    }
  }, [clearAuth, clearProfile, navigation, messages]);

  return { handleLogout };
};

export default useLogout;
