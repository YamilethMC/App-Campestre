import { DrawerActions, useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

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
      }),
    );
  };

  return {
    toggleDrawer,
    handleNotifications,
  };
};
