import { useAuthStore } from '../../auth/store/useAuthStore';

// Types for the API responses
export interface Facility {
  id: number;
  name: string;
  type: string;
  description: string;
  status: string;
  openTime: string;
  closeTime: string;
  maxDuration: number;
  createdAt: string;
  updatedAt: string;
  reservations?: any[];
}

export interface FacilityWithSlots extends Facility {
  availableSlots?: {
    startTime: string;
    endTime: string;
  }[];
  reservedSlots?: {
    startTime: string;
    endTime: string;
  }[];
}

export interface FacilityListResponse {
  success: boolean;
  data: {
    data: Facility[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  timestamp: string;
  messageId: string;
  traceId: string;
  message?: string;
}

export interface FacilityDetailResponse {
  success: boolean;
  data: FacilityWithSlots;
  timestamp: string;
  messageId: string;
  traceId: string;
  message?: string;
}

export interface ReservationRequest {
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
}

export interface ReservationResponse {
  success: boolean;
  data: any; // The response structure from the reservation endpoint
  timestamp: string;
  messageId: string;
  traceId: string;
  message?: string;
}

// Interface for service responses
interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

// Service functions for facilities API
export const facilityService = {
  /**
   * Get list of facilities
   */
  getFacilities: async (params: {
    page: number;
    limit: number;
    type: string;
    status: string;
    orderBy: string;
  }): Promise<ServiceResponse<FacilityListResponse['data']>> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401,
      };
    }

    const { page, limit, type, status, orderBy } = params;
    const url = `${process.env.EXPO_PUBLIC_API_URL}/facilities?page=${page}&limit=${limit}&type=${type}&status=${status}&orderBy=${orderBy}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      });

      if (!response.ok) {
        let errorMessage = 'Error al cargar las instalaciones';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Petición inválida. Verifica los parámetros.';
            break;
          case 404:
            errorMessage = 'No se encontraron instalaciones';
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
          status: response.status,
        };
      }

      const result = await response.json();

      return {
        success: true,
        data: result.data,
        message: 'Instalaciones cargadas exitosamente',
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error fetching facilities:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al cargar las instalaciones',
        status: 500,
      };
    }
  },

  /**
   * Get facility availability by date
   */
  getFacilityAvailability: async (
    facilityId: number,
    date: string,
  ): Promise<ServiceResponse<FacilityWithSlots>> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401,
      };
    }
    const fecha = new Date(`${date}T00:00:00`);
    fecha.setDate(fecha.getDate() - 1);
    const dateG = fecha.toISOString().split('T')[0];
    // Verify date format is YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateG)) {
      return {
        success: false,
        error: 'Formato de fecha inválido. Use YYYY-MM-DD',
        status: 400,
      };
    }

    const url = `${process.env.EXPO_PUBLIC_API_URL}/facilities/${facilityId}?date=${dateG}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      });

      if (!response.ok) {
        let errorMessage = 'Error al cargar la disponibilidad de la instalación';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Formato de fecha inválido. Use YYYY-MM-DD';
            break;
          case 404:
            errorMessage = 'Instalación no encontrada';
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
          status: response.status,
        };
      }

      const responseJson = await response.json();

      return {
        success: true,
        data: responseJson.data,
        message: 'Disponibilidad de instalación cargada exitosamente',
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error fetching facility availability:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al cargar la disponibilidad de la instalación',
        status: 500,
      };
    }
  },

  /**
   * Create a reservation
   */
  createReservation: async (
    facilityId: number,
    clubMemberId: number,
    reservationData: ReservationRequest,
  ): Promise<ServiceResponse<any>> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401,
      };
    }

    const url = `${process.env.EXPO_PUBLIC_API_URL}/facilities/${facilityId}/club-members/${clubMemberId}/reservations`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        let errorMessage = 'Error al crear la reserva';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Rango de tiempo inválido o instalación no disponible';
            break;
          case 404:
            errorMessage = 'Miembro o instalación no encontrado';
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
          status: response.status,
        };
      }

      const responseJson = await response.json();

      return {
        success: true,
        data: responseJson.data,
        message: 'Reserva creada exitosamente',
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error creating reservation:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al crear la reserva',
        status: 500,
      };
    }
  },
};
