import { useState, useEffect } from 'react';
import { bannerService } from '../services';
import { Banner } from '../interfaces/Banner';
import { useAuthStore } from '../../auth/store/useAuthStore';

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated } = useAuthStore();
  const refreshInterval = 30 * 60 * 1000; // 30 minutos en milisegundos

  const loadBanners = async () => {
    // No cargar banners si no hay autenticación
    if (!token || !isAuthenticated) {
      setLoading(false);
      setBanners([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await bannerService.getAvailableBanners();
      setBanners(response.banners || []);
    } catch (err) {
      console.error('Error loading banners:', err);
      // No mostrar error en UI al usuario, simplemente no mostrar banners
      setBanners([]); // Asegurarse de que banners es un array vacío en caso de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Solo cargar banners si el usuario está autenticado
    if (!isAuthenticated || !token) {
      setLoading(false);
      return;
    }

    loadBanners();

    // Configurar intervalo para actualizar banners cada 30 minutos
    const intervalId = setInterval(() => {
      loadBanners();
    }, refreshInterval);

    // Limpiar intervalo cuando el componente se desmonte
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuthenticated, token]);

  return {
    banners,
    loading,
    error,
    refetch: loadBanners,
  };
};