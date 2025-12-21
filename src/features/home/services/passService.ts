import { useAuthStore } from '../../auth/store/useAuthStore';

export interface CreatePassRequest {
  guestName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  type: 'GUEST' | 'TEMPORAL';
}

export interface PassResponse {
  pass: {
    id: string;
    hostId: number;
    guestId: number;
    type: string;
    isValid: boolean;
    createdAt: string;
    host: {
      id: number;
      name: string;
      lastName: string;
      email: string;
    };
    guest: {
      id: number;
      name: string;
      lastName: string;
      email: string;
    };
  };
  token: string;
  viewUrl: string;
}

interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

export const passService = {
  /**
   * Crear un nuevo pase de invitado usando el endpoint /pass
   */
  createPass: async (passData: CreatePassRequest): Promise<ServiceResponse<PassResponse>> => {
    const { token } = useAuthStore.getState();

    if (!token) {
      return {
        success: false,
        error: 'No hay token de autenticación disponible.',
        status: 401,
      };
    }

    try {
      console.log('Creating pass with data:', passData);

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/pass`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify(passData),
      });

      console.log('Pass creation response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Error al crear el pase de invitado';

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Si no se puede parsear el error, usar el mensaje por defecto
        }

        switch (response.status) {
          case 400:
            if (errorMessage.includes('límite')) {
              errorMessage = 'Has alcanzado el límite de 5 pases mensuales';
            }
            break;
          case 403:
            errorMessage = 'No tienes permisos para crear pases';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status,
        };
      }

      const result = await response.json();
      console.log('Pass created successfully:', result);

      return {
        success: true,
        data: result,
        message: 'Pase de invitado creado exitosamente',
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error creating pass:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al crear el pase',
        status: 500,
      };
    }
  },

  /**
   * Obtener pases disponibles del mes actual
   */
  getAvailablePasses: async (): Promise<
    ServiceResponse<{ available: number; used: number; limit: number }>
  > => {
    const { token } = useAuthStore.getState();

    if (!token) {
      return {
        success: false,
        error: 'No hay token de autenticación disponible.',
        status: 401,
      };
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/pass/available`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Error al obtener pases disponibles',
          status: response.status,
        };
      }

      const result = await response.json();

      return {
        success: true,
        data: result,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error getting available passes:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido',
        status: 500,
      };
    }
  },

  /**
   * Obtener todos los pases del usuario
   */
  getUserPasses: async (includeInvalid: boolean = false): Promise<ServiceResponse<any[]>> => {
    const { token } = useAuthStore.getState();

    if (!token) {
      return {
        success: false,
        error: 'No hay token de autenticación disponible.',
        status: 401,
      };
    }

    try {
      const url = `${process.env.EXPO_PUBLIC_API_URL}/pass${includeInvalid ? '?includeInvalid=true' : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Error al obtener los pases',
          status: response.status,
        };
      }

      const result = await response.json();

      return {
        success: true,
        data: result,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error getting user passes:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido',
        status: 500,
      };
    }
  },

  /**
   * Invalidar un pase
   */
  invalidatePass: async (passId: string): Promise<ServiceResponse<void>> => {
    const { token } = useAuthStore.getState();

    if (!token) {
      return {
        success: false,
        error: 'No hay token de autenticación disponible.',
        status: 401,
      };
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/pass/${passId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      });

      if (!response.ok) {
        return {
          success: false,
          error: 'Error al invalidar el pase',
          status: response.status,
        };
      }

      return {
        success: true,
        message: 'Pase invalidado exitosamente',
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error invalidating pass:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido',
        status: 500,
      };
    }
  },
};
