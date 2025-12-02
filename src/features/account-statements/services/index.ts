
//Obtener el toekn
import { useAuthStore } from '../../auth/store/useAuthStore';

// Interface para service responses
interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

// Get user information from auth service
// const getUserInfo = () => {
//   // Using mock user data from auth service
//   return {
//     id: '22308', // Member number as requested
//     name: 'Mariana Landy Jimenez',
//     address: 'Privada Jazmín No. 101 Col. Montealegre',
//     city: 'Tampico, Tamaulipas',
//     postalCode: '89210',
//     memberSince: new Date('2020-05-15'),
//     membershipType: 'Premium',
//   };
// };

// Mock data for account statements with detailed information
export const accountStatementService = {
  getAccountStatements: async (clubMemberId?: number, page: number = 1, limit: number = 5): Promise<ServiceResponse<any[]>> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/account-statements/member/${clubMemberId}?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      if (!response.ok) {
        let errorMessage = 'Error al cargar los estados de cuenta';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 404:
            errorMessage = 'Estados de cuenta no encontrados';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorText = await response.text().catch(() => '');
            errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorText}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const data = await response.json();

      return {
        success: true,
        data: data.data,
        message: 'Estados de cuenta cargados exitosamente',
        status: response.status
      };

    } catch (error: any) {
      console.error('Error en getAccountStatements:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al cargar los estados de cuenta',
        status: 500
      };
    }
  },

  getAccountStatementById: async (id: string): Promise<ServiceResponse<any>> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/account-statements/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        let errorMessage = 'Error al cargar el estado de cuenta';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 404:
            errorMessage = 'Estado de cuenta no encontrado';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorText = await response.text().catch(() => '');
            errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorText}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const data = await response.json();

      return {
        success: true,
        data: data.data,
        message: 'Estado de cuenta cargado exitosamente',
        status: response.status
      }
    } catch (error: any) {
      console.error('Error en getAccountStatementById:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al cargar el estado de cuenta',
        status: 500
      };
    }
  },

   downloadAccountStatement: async (id: string): Promise<ServiceResponse<string>> => {
    const token = useAuthStore.getState().token;
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/account-statements/download/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        let errorMessage = 'Error al descargar el estado de cuenta';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Solicitud incorrecta: Verifica los datos proporcionados';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 403:
            errorMessage = 'Acceso prohibido: No tienes permisos para descargar este estado de cuenta';
            break;
          case 404:
            errorMessage = 'Estado de cuenta no encontrado para descargar';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            const errorText = await response.text().catch(() => '');
            errorMessage = `Error en la solicitud: ${response.status}. Detalles: ${errorText}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      const data = await response.json();

      return {
        success: true,
        data: data.data,
        message: 'Descarga de estado de cuenta exitosa',
        status: response.status
      }
    } catch (error: any) {
      console.error('Error al descargar:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al descargar el estado de cuenta',
        status: 500
      };
    }
  }
};