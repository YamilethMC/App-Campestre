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
  endTime: string;   // ISO 8601 format
}

export interface ReservationResponse {
  success: boolean;
  data: any; // The response structure from the reservation endpoint
  timestamp: string;
  messageId: string;
  traceId: string;
  message?: string;
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
  }): Promise<FacilityListResponse> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error('No authentication token available');
    }

    const { page, limit, type, status, orderBy } = params;
    const url = `${process.env.EXPO_PUBLIC_API_URL}/facilities?page=${page}&limit=${limit}&type=${type}&status=${status}&orderBy=${orderBy}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText);
      
      if (response.status === 404) {
        throw new Error('No se encontraron instalaciones');
      } else if (response.status === 400) {
        throw new Error('Petición inválida. Verifica los parámetros.');
      } else {
        throw new Error(`Error en la solicitud: ${response.status}. ${errorData.message || errorText}`);
      }
    }

    return await response.json();
  },

  /**
   * Get facility availability by date
   */
  getFacilityAvailability: async (facilityId: number, date: string): Promise<FacilityDetailResponse> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error('No authentication token available');
    }

    // Verify date format is YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new Error('Formato de fecha inválido. Use YYYY-MM-DD');
    }

    const url = `${process.env.EXPO_PUBLIC_API_URL}/facilities/${facilityId}?date=${date}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText);

      if (response.status === 404) {
        throw new Error('No se encontraron instalaciones');
      } else if (response.status === 400) {
        throw new Error('Formato de fecha inválido. Use YYYY-MM-DD');
      } else {
        throw new Error(`Error en la solicitud: ${response.status}. ${errorData.message || errorText}`);
      }
    }

    return await response.json();
  },

  /**
   * Create a reservation
   */
  createReservation: async (facilityId: number, clubMemberId: number, reservationData: ReservationRequest): Promise<ReservationResponse> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error('No authentication token available');
    }
    
    const url = `${process.env.EXPO_PUBLIC_API_URL}/facilities/${facilityId}/club-members/${clubMemberId}/reservations`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText);

      if (response.status === 400) {
        throw new Error('Invalid time range or facility not available');
      } else if (response.status === 404) {
        throw new Error('Member or facility not found');
      } else if (response.status === 409) {
        throw new Error('Time slot already booked');
      } else {
        throw new Error(`Error en la solicitud: ${response.status}. ${errorData.message || errorText}`);
      }
    }
    const responseJson = await response.json()
    console.log('el response al crear es: ', responseJson)
    return responseJson;
  },
};