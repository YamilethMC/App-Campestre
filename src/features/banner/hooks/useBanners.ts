import { useState, useEffect } from 'react';
import { bannerService } from '../services';
import { Banner } from '../interfaces/Banner';

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBanners = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await bannerService.getAvailableBanners();
      setBanners(response.banners || []);
    } catch (err) {
      console.error('Error loading banners:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setBanners([]); // Ensure banners is an empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return {
    banners,
    loading,
    error,
    refetch: loadBanners,
  };
};