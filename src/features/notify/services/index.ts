import { useAuthStore } from '../../auth/store/useAuthStore';

// Interface for notification data
export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  sentDate: string;
  active: boolean;
  visibleUntil: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for pagination metadata
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Interface for the API response
export interface NotificationResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    meta: PaginationMeta;
  };
  timestamp: string;
  messageId: string;
  traceId: string;
}

// Service class for handling notification API calls
export class NotificationService {
  private baseUrl: string = `${process.env.EXPO_PUBLIC_API_URL}/notify`;

  // Fetch notifications from the API
  async getNotifications(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    order: string = 'asc',
    orderBy: string = 'title',
    active: boolean = true
  ): Promise<NotificationResponse> {
    try {
      const {token } = useAuthStore.getState();
        if (!token) {
          throw new Error('No authentication token available');
        }

      const searchParam = search ? encodeURIComponent(search) : '';
      const url = `${this.baseUrl}?page=${page}&limit=${limit}&search=${searchParam}&order=${order}&orderBy=${orderBy}&active=${active}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'accept': '*/*',
          },
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle specific error codes
        if (response.status === 401) {
          throw new Error('No autorizado: Por favor inicie sesión para continuar.');
        } else if (response.status === 403) {
          throw new Error('Prohibido: No tiene permisos para acceder a esta información.');
        } else {
          throw new Error(errorData.message || `Error en la solicitud: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log('Notifications data:', data);
      return data;
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      // Return error message to be shown in the UI
      throw new Error(error.message || 'Error desconocido al obtener las notificaciones');
    }
  }
}

// Export a singleton instance of the service
export const notificationService = new NotificationService();