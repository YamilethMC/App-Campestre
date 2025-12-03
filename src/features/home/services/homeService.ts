// Mock service for home-related data
import { authService } from '../../auth/services/authService';
import { useAuthStore } from '../../auth/store/useAuthStore';

// Interface for guest data
interface GuestUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface Guest {
  id: number;
  relationship: string;
  user: GuestUser;
}

// Interface for API response
interface MemberDataResponse {
  success: boolean;
  data: {
    guests: Guest[];
  };
  message?: string;
  timestamp: string;
  messageId: string;
  traceId: string;
}

export interface MemberData {
  id: number;
  guests: Guest[];
}

// Get member data from API
export const getMemberData = async (memberId: number): Promise<{
  success: boolean;
  data?: MemberData;
  message?: string;
  error?: string;
  status: number;
}> => {
  const { token } = useAuthStore.getState();
  if (!token) {
    return {
      success: false,
      error: 'No hay token de autenticación disponible.',
      status: 401
    };
  }

  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/club-members/${memberId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
    });

    if (!response.ok) {
      let errorMessage = 'Error al cargar los datos del socio';

      // Manejar códigos de error específicos en el servicio
      switch (response.status) {
        case 404:
          errorMessage = 'Socio no encontrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
          break;
        default:
          const errorText = await response.text();
          errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorText}`;
      }

      return {
        success: false,
        error: errorMessage,
        status: response.status
      };
    }

    const result: MemberDataResponse = await response.json();

    if (result.success) {
      const data: MemberData = {
        id: memberId,
        guests: result.data.guests || [],
      };

      return {
        success: true,
        data: data,
        message: 'Datos del socio cargados exitosamente',
        status: response.status
      };
    } else {
      return {
        success: false,
        error: result.message || 'Error al obtener los datos del socio',
        status: response.status
      };
    }
  } catch (error) {
    console.error('Error fetching member data:', error);
    return {
      success: false,
      error: 'Error desconocido al cargar los datos del socio',
      status: 500
    };
  }
};

// Get user vehicles (mock implementation)
export const getVehiclesForCurrentUser = async (): Promise<any[]> => {
  // In a real app, this would fetch from the server
  // For now, we'll return the vehicles from the auth service
  const user = await authService.getCurrentUser();
  return user?.vehicles || [];
};

// Call waiter service (mock implementation)
export const callWaiter = async (): Promise<{ success: boolean; message?: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock success response
  return {
    success: true,
    message: "Mesero llamado, llegará en 7 minutos",
  };
};

// Request vehicle service (mock implementation)
export const requestVehicle = async (vehicleId: string): Promise<{ success: boolean; message?: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock success response
  return {
    success: true,
    message: `Auto solicitado, llega en 5 minutos`,
  };
};

// Delete guest from member's guest list
export const deleteGuest = async (guestId: number): Promise<{ success: boolean; message?: string; error?: string; status: number }> => {
  const { token } = useAuthStore.getState();
  if (!token) {
    return {
      success: false,
      error: 'No hay token de autenticación disponible.',
      status: 401
    };
  }
console.log('guestId:', guestId);
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/club-members/${guestId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
    });

    if (!response.ok) {
      let errorMessage = 'Error al eliminar el invitado';

      // Manejar códigos de error específicos
      switch (response.status) {
        case 404:
          errorMessage = 'Miembro no encontrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
          break;
        default:
          const errorText = await response.text();
          errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorText}`;
      }

      return {
        success: false,
        error: errorMessage,
        status: response.status
      };
    }

    return {
      success: true,
      message: 'Invitado eliminado exitosamente',
      status: response.status
    };
  } catch (error) {
    return {
      success: false,
      error: 'Error desconocido al eliminar el invitado',
      status: 500
    };
  }
};