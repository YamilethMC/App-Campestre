import React from 'react';
import BannerCarousel from '../components/BannerCarousel';
import { useBanners } from '../hooks/useBanners';

const BannerContainer = () => {
  const { banners, loading, error } = useBanners();

  return (
    <BannerCarousel banners={banners} loading={loading} error={error} />
  );
};

export default BannerContainer;