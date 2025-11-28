import { Alert } from 'react-native';
import { notificationService, NotificationResponse } from '../services';

// Hook to handle notification data and API calls
export const useNotifications = () => {
  // Function to fetch notifications and handle errors
  const fetchNotifications = async (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    order: string = 'asc',
    orderBy: string = 'title',
    active: boolean = true
  ): Promise<NotificationResponse | null> => {
    try {
      const response = await notificationService.getNotifications(
        page,
        limit,
        search,
        order,
        orderBy,
        active
      );

      return response;
    } catch (error: any) {
      // Show error message in an alert
      Alert.alert(
        'Error',
        error.message || 'Ocurrió un error al obtener las notificaciones',
        [
          {
            text: 'Aceptar',
            style: 'default'
          }
        ]
      );

      return null;
    }
  };

  return {
    fetchNotifications
  };
};