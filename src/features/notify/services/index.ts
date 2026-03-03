import { handleAuthError } from '../../../shared/utils/authErrorHandler';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { ServiceResponse } from '../interfaces';

// Service class for handling notification API calls
export class NotificationService {
  private baseUrl: string = `${process.env.EXPO_PUBLIC_API_URL}/notify`;

  private getAuthHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      accept: '*/*',
    };
  }

  private handleUnauthorized(): ServiceResponse {
    handleAuthError();
    return { success: false, error: 'No autorizado: Sesión expirada', status: 401 };
  }

  // Fetch general broadcast notifications (for the admin/notification board)
  async getNotifications(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    order: string = 'asc',
    orderBy: string = 'title',
    active: boolean = true
  ): Promise<ServiceResponse> {
    try {
      const { token } = useAuthStore.getState();
      if (!token) {
        return { success: false, error: 'No authentication token available', status: 401 };
      }

      const searchParam = search ? encodeURIComponent(search) : '';
      const url = `${this.baseUrl}?page=${page}&limit=${limit}&search=${searchParam}&order=${order}&orderBy=${orderBy}&active=${active}`;

      const response = await fetch(url, { method: 'GET', headers: this.getAuthHeaders(token) });

      if (!response.ok) {
        if (response.status === 401) return this.handleUnauthorized();
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `Error en la solicitud: ${response.status}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return { success: true, data: data.data, message: 'Notificaciones cargadas exitosamente', status: response.status };
    } catch (error: any) {
      return { success: false, error: error.message || 'Error desconocido', status: 500 };
    }
  }

  // Fetch personal notifications for the authenticated member
  async getMyNotifications(unreadOnly: boolean = false): Promise<ServiceResponse> {
    try {
      const { token } = useAuthStore.getState();
      if (!token) {
        return { success: false, error: 'No authentication token available', status: 401 };
      }

      const url = `${this.baseUrl}/me/my-notifications${unreadOnly ? '?unreadOnly=true' : ''}`;
      const response = await fetch(url, { method: 'GET', headers: this.getAuthHeaders(token) });

      if (!response.ok) {
        if (response.status === 401) return this.handleUnauthorized();
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `Error ${response.status}`,
          status: response.status,
        };
      }

      const data = await response.json();
      const notifications = Array.isArray(data) ? data : data.data ?? [];
      return { success: true, data: { notifications, meta: { total: notifications.length, page: 1, limit: notifications.length, totalPages: 1 } }, status: response.status };
    } catch (error: any) {
      return { success: false, error: error.message || 'Error desconocido', status: 500 };
    }
  }

  // Mark a single personal notification as read
  async markAsRead(notifyMemberId: number): Promise<{ success: boolean; error?: string }> {
    try {
      const { token } = useAuthStore.getState();
      if (!token) return { success: false, error: 'No authentication token available' };

      const response = await fetch(
        `${this.baseUrl}/me/my-notifications/${notifyMemberId}/read`,
        { method: 'PATCH', headers: this.getAuthHeaders(token) }
      );

      if (!response.ok) {
        if (response.status === 401) handleAuthError();
        return { success: false, error: `Error ${response.status}` };
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Mark all personal notifications as read
  async markAllAsRead(): Promise<{ success: boolean; error?: string }> {
    try {
      const { token } = useAuthStore.getState();
      if (!token) return { success: false, error: 'No authentication token available' };

      const response = await fetch(
        `${this.baseUrl}/me/my-notifications/read-all`,
        { method: 'PATCH', headers: this.getAuthHeaders(token) }
      );

      if (!response.ok) {
        if (response.status === 401) handleAuthError();
        return { success: false, error: `Error ${response.status}` };
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

// Export a singleton instance of the service
export const notificationService = new NotificationService();