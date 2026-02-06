import React from 'react';
import BannerCarousel from '../components/BannerCarousel';
import { useBanners } from '../hooks/useBanners';

const BannerContainer = () => {
  const { banners, loading, error, refetch, isRefetching } = useBanners();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <BannerCarousel 
      banners={banners} 
      loading={loading} 
      error={error} 
      onRefresh={handleRefresh}
      isRefreshing={isRefetching}
    />
  );
};

export default BannerContainer;