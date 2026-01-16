import { GetAvailableBannersResponse } from '../interfaces/Banner';
import { useAuthStore } from '../../auth/store/useAuthStore';

const API_BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}`;

export const bannerService = {
  /**
   * Fetch available banners from the API
   */
  getAvailableBanners: async (): Promise<GetAvailableBannersResponse> => {
    try {
      const token = useAuthStore.getState().token;
      
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(`${API_BASE_URL}/banner/avaible`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch banners: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Transform the API response to match the expected format
      const transformedData = {
        banners: data.data || [] // Extract banners from the 'data' property
      };

      return transformedData;
    } catch (error) {
      console.error('Error fetching available banners:', error);
      throw error;
    }
  },
};