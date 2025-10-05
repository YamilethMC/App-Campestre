import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';

type RootStackParamList = {
    Notifications: undefined;
    // Agrega otras rutas aquí según sea necesario
  };

export const useHeader = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handleNotifications = () => {
    // Show alert that the update is not available yet
    Alert.alert(
      'Actualización no disponible',
      'Lo sentimos, esta actualización aún no está disponible. ¡Pronto estará disponible!',
      [
        {
          text: 'Aceptar',
          style: 'default'
        }
      ]
    );
  };

  return {  
    toggleDrawer,
    handleNotifications
  }
}
