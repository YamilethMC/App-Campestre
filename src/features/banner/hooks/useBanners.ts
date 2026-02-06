import { useQuery } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { Banner } from '../interfaces/Banner';
import { bannerService } from '../services';

const fetchBanners = async (): Promise<Banner[]> => {
  const { token, isAuthenticated } = useAuthStore.getState();
  
  // No cargar banners si no hay autenticación
  if (!token || !isAuthenticated) {
    return [];
  }

  const response = await bannerService.getAvailableBanners();
  
  // Verificar si es un error de autenticación
  if (!response.success) {
    if (response.status === 401) {
      // El servicio ya maneja el error de autenticación
      return [];
    }
    // Mostrar alerta solo para otros tipos de errores
    if (response.error) {
      Alert.alert('Error', response.error);
    }
    return [];
  }
  
  return response.banners || [];
};

export const useBanners = () => {
  const { token, isAuthenticated } = useAuthStore();
  
  const queryResult = useQuery({
    queryKey: ['banners'],
    queryFn: fetchBanners,
    enabled: !!token && !!isAuthenticated, // Solo ejecutar si hay token y está autenticado
    staleTime: 60000, // Datos considerados frescos por 1 minuto
    gcTime: 5 * 60 * 1000, // Mantener en caché por 5 minutos
    refetchInterval: 60000, // Refrescar cada 1 minuto para detectar nuevos banners
    refetchOnWindowFocus: true, // Refrescar cuando la app vuelva al foco
    retry: 1, // Reintentar una vez en caso de error
  });

  return {
    banners: queryResult.data || [],
    loading: queryResult.isLoading,
    error: queryResult.error ? (queryResult.error as Error).message : null,
    refetch: queryResult.refetch,
    isRefetching: queryResult.isRefetching,
  };
};