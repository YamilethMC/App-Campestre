import { useAuthStore } from '../../../features/auth/store/useAuthStore';
import { handleAuthError } from '../../../shared/utils/authErrorHandler';
import { CancelReservationRequest, CancelReservationResponse, GetReservationsResponse, Reservation, ServiceResponse } from '../interfaces';

export const reservationService = {
  /**
   * Get reservations for a club member
   */
  getReservations: async (idMember: string | number): Promise<ServiceResponse<Reservation[]>> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    const url = `${process.env.EXPO_PUBLIC_API_URL}/facilities/${idMember}/reservations`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Verificar si es un error de autenticación
        if (response.status === 401) {
          // Llamar a la función global para manejar el error de autenticación
          handleAuthError();
          return {
            success: false,
            error: 'No autorizado: Sesión expirada',
            status: response.status
          };
        }

        let errorMessage = 'Error al cargar las reservaciones';

        // Handle specific error codes
        switch (response.status) {
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 404:
            errorMessage = 'Socio no encontrado';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorText = await response.text();
            errorMessage = `Error en la solicitud: ${response.status}. ${errorText}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const result: GetReservationsResponse = await response.json();
      return {
        success: true,
        data: result.data,
        message: result.message || 'Reservaciones cargadas exitosamente',
        status: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Error desconocido al cargar las reservaciones',
        status: 500
      };
    }
  },

  /**
   * Cancel a reservation
   */
  cancelReservation: async (
    reservationId: number, 
    idMember: string | number, 
    cancelData: CancelReservationRequest
  ): Promise<ServiceResponse<any>> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    const url = `${process.env.EXPO_PUBLIC_API_URL}/facilities/reservations/${reservationId}/club-member/${idMember}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cancelData),
      });

      if (!response.ok) {
        // Verificar si es un error de autenticación
        if (response.status === 401) {
          // Llamar a la función global para manejar el error de autenticación
          handleAuthError();
          return {
            success: false,
            error: 'No autorizado: Sesión expirada',
            status: response.status
          };
        }

        let errorMessage = 'Error al cancelar la reservación';

        // Handle specific error codes
        switch (response.status) {
          case 400:
            errorMessage = 'Rango de tiempo inválido o instalación no disponible';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 403:
            errorMessage = 'No autorizado para actualizar esta reservación';
            break;
          case 404:
            errorMessage = 'Reservación no encontrada';
            break;
          case 409:
            errorMessage = 'Horario ya reservado';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorText = await response.text();
            errorMessage = `Error en la solicitud: ${response.status}. ${errorText}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const result: CancelReservationResponse = await response.json();

      return {
        success: true,
        data: result.data,
        message: result.message || 'Reservación cancelada exitosamente',
        status: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Error desconocido al cancelar la reservación',
        status: 500
      };
    }
  },
};