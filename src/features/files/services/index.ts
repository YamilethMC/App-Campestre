import { handleAuthError } from '../../../shared/utils/authErrorHandler';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { ServiceResponse } from '../interfaces';

// In src/features/files/services/index.ts
export const fileService = {
  getFiles: async (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    order: string = 'asc',
    orderBy: string = 'name'
  ): Promise<ServiceResponse<any>> => {
    const { token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const url = `${process.env.EXPO_PUBLIC_API_URL}/files?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&order=${order}&orderBy=${orderBy}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
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

        let errorMessage = 'Error al cargar los archivos';

        // Manejar códigos de error específicos
        switch (response.status) {
          case 400:
            errorMessage = 'Petición inválida. Verifica los parámetros.';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 500:
            errorMessage = 'Error interno del servidor. Detalles: ' + (await response.text());
            break;
          default:
            errorMessage = `Error en la solicitud: ${response.status}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      // Parse the JSON response
      const result = await response.json();

      return {
        success: true,
        data: result.data,
        message: result.message || 'Archivos cargados exitosamente',
        status: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Error desconocido al obtener los archivos',
        status: 500
      };
    }
  },

  downloadFile: async (fileId: number): Promise<ServiceResponse<any>> => {
    const { token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/files/download/${fileId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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

        let errorMessage = 'Error al descargar el archivo';

        // Manejar códigos de error específicos
        switch (response.status) {
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 404:
            errorMessage = 'Archivo no encontrado.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor. Detalles: ' + (await response.text());
            break;
          default:
            errorMessage = `Error en la solicitud: ${response.status}`;
        }

        return {
          success: false,
          error: errorMessage,
          status: response.status
        };
      }

      // Parse the JSON response to get the signed URL
      const result = await response.json();

      // Return the signed URL from the response
      if (result.data && result.data.signedUrl) {
        return {
          success: true,
          data: result.data.signedUrl,
          message: 'URL de descarga obtenida exitosamente',
          status: response.status
        };
      } else if (result.data && result.data.url) {
        return {
          success: true,
          data: result.data.url,
          message: 'URL de descarga obtenida exitosamente',
          status: response.status
        };
      } else if (result.signedUrl) {
        return {
          success: true,
          data: result.signedUrl,
          message: 'URL de descarga obtenida exitosamente',
          status: response.status
        };
      } else if (result.url) {
        return {
          success: true,
          data: result.url,
          message: 'URL de descarga obtenida exitosamente',
          status: response.status
        };
      } else {
        return {
          success: false,
          error: 'No se encontró la URL de descarga en la respuesta',
          status: 500
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Error desconocido al descargar el archivo',
        status: 500
      };
    }
  },
};