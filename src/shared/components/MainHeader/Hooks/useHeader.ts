import { DrawerActions, useNavigation } from 'expo-router/react-navigation';
import { CommonActions } from 'expo-router/react-navigation';

export const useHeader = () => {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handleNotifications = () => {
    // Reset the More stack and navigate to Notifications
    navigation.dispatch(
      CommonActions.navigate({
        name: 'MainTabs',
        params: {
          screen: 'More',
          params: {
            screen: 'Notifications',
          },
        },
      })
    );
  };

  return {
    toggleDrawer,
    handleNotifications
  }
}
