import { handleAuthError } from '../../../shared/utils/authErrorHandler';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { FAQ, HelpCenterResponse } from '../interfaces';

export const helpCenterService = {
  // Obtener preguntas frecuentes
  getFAQs: async (): Promise<{
    success: boolean;
    data?: FAQ[];
    message?: string;
    error?: string;
    status: number;
  }> => {
    const { token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/help-center`, {
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

        let errorMessage = 'Error al cargar las preguntas frecuentes';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Petición inválida. Verifica los parámetros';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 404:
            errorMessage = 'Preguntas frecuentes no encontradas';
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

      const result: HelpCenterResponse = await response.json();

      return {
        success: true,
        data: result.data,
        message: 'Preguntas frecuentes cargadas exitosamente',
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error desconocido al cargar las preguntas frecuentes',
        status: 500
      };
    }
  },
};