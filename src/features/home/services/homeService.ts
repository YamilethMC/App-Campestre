// Mock service for home-related data
import { authService } from '../../auth/services/authService';
import { useAuthStore } from '../../auth/store/useAuthStore';

export interface GuestUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface Guest {
  id: number;
  memberCode: number | null;
  title: string | null;
  profession: string | null;
  paymentMethod: string;
  dateOfAdmission: string;
  foreignMember: boolean;
  createdAt: string;
  updatedAt: string;
  invitedById: number;
  relationship: string;
  user: GuestUser;
  type: string; // The guest type: 'INVITADO', 'DEPENDIENTE', or 'TEMPORAL'
}

export interface Address {
  id: number;
  street: string;
  externalNumber: string;
  internalNumber: string;
  suburb: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  addressId: number;
  type: string;
  active: boolean;
  birthDate: string;
  gender: string;
  RFC: string;
  expireAt: string | null;
  resetToken: string;
  tokenExpires: string;
  mustChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
  roleId: number | null;
  address: Address;
  phone: any[];
  role: null;
  qrCode: any[];
}

export interface MemberData {
  id: number;
  memberCode: number;
  title: string;
  profession: string;
  paymentMethod: string;
  dateOfAdmission: string;
  foreignMember: boolean;
  createdAt: string;
  updatedAt: string;
  invitedById: number | null;
  relationship: string | null;
  user: User;
  invitedBy: null;
  guests: Guest[];
  passesAvailable: string;
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

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        data: result.data,
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