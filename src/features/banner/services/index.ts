import { handleAuthError } from '../../../shared/utils/authErrorHandler';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { GetAvailableBannersResponse } from '../interfaces/Banner';

const API_BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}`;

export const bannerService = {
  /**
   * Fetch available banners from the API
   */
  getAvailableBanners: async (): Promise<GetAvailableBannersResponse> => {
    const { token } = useAuthStore.getState();
    if (!token) {
      return {
        success: false,
        banners: [],
        error: 'No authentication token available',
        status: 401
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/banner/avaible`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
            banners: [],
            error: 'No autorizado: Sesión expirada',
            status: response.status
          };
        }

        let errorMessage = 'Error al cargar los banners';

        // Manejar códigos de error específicos en el servicio
        switch (response.status) {
          case 400:
            errorMessage = 'Petición inválida. Verifica los parámetros.';
            break;
          case 401:
            errorMessage = 'No autorizado: Por favor inicia sesión para continuar';
            break;
          case 404:
            errorMessage = 'Banners no encontrados';
            break;
          case 500:
            errorMessage = 'Error interno del servidor: Por favor intenta más tarde';
            break;
          default:
            errorMessage = `Error en la solicitud: ${response.status}`;
        }

        return {
          success: false,
          banners: [],
          error: errorMessage,
          status: response.status
        };
      }

      const data = await response.json();

      // Transform the API response to match the expected format
      const transformedData = {
        success: true,
        banners: Array.isArray(data.data) ? data.data : [], // Ensure we return an array
        status: response.status
      };

      return transformedData;
    } catch (error: any) {
      return {
        success: false,
        banners: [],
        error: error.message || 'Error desconocido al obtener los banners',
        status: 500
      };
    }
  },
};