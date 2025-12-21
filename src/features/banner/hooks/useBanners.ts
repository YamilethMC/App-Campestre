import { useState, useEffect } from 'react';
import { bannerService } from '../services';
import { Banner } from '../interfaces/Banner';

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const refreshInterval = 30 * 60 * 1000; // 30 minutos en milisegundos

  const loadBanners = async () => {
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
  }, []);

  return {
    banners,
    loading,
    error,
    refetch: loadBanners,
  };
};
