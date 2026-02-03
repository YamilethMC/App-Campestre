import AsyncStorage from '@react-native-async-storage/async-storage';

const QR_CACHE_KEY = 'cached_qr_data';

export interface CachedQRData {
  memberCode: string;
  memberName: string;
  memberId: string;
  cachedAt: string;
}

export const qrCacheService = {
  /**
   * Save QR data to AsyncStorage for offline access
   */
  saveQRData: async (data: CachedQRData): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(QR_CACHE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving QR data to cache:', error);
      return false;
    }
  },

  /**
   * Get cached QR data from AsyncStorage
   */
  getCachedQRData: async (): Promise<CachedQRData | null> => {
    try {
      const cached = await AsyncStorage.getItem(QR_CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
      return null;
    } catch (error) {
      console.error('Error reading cached QR data:', error);
      return null;
    }
  },

  /**
   * Check if QR data is cached
   */
  hasCachedQRData: async (): Promise<boolean> => {
    try {
      const cached = await AsyncStorage.getItem(QR_CACHE_KEY);
      return cached !== null;
    } catch (error) {
      return false;
    }
  },

  /**
   * Clear cached QR data
   */
  clearCachedQRData: async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(QR_CACHE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing cached QR data:', error);
      return false;
    }
  },

  /**
   * Check if device is online (simple fetch test)
   */
  isOnline: async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Format cached date for display
   */
  formatCachedDate: (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },
};

export default qrCacheService;
