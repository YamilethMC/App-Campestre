import React, { useEffect } from 'react';
import BannerCarousel from '../components/BannerCarousel';
import { useBanners } from '../hooks/useBanners';

const BannerContainer = () => {
  const { banners, loading, error, refetch } = useBanners();
  const refreshInterval = 30 * 60 * 1000; // 30 minutos en milisegundos

  useEffect(() => {
    // Configurar intervalo para actualizar banners cada 30 minutos
    // cuando el componente esté montado (es decir, cuando estés en la pantalla de home)
    const intervalId = setInterval(() => {
      refetch();
    }, refreshInterval);

    // Limpiar intervalo cuando el componente se desmonte
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [refetch]);

  return <BannerCarousel banners={banners} loading={loading} error={error} />;
};

export default BannerContainer;
