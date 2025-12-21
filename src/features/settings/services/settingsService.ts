import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../../../shared/api/apiClient';

export interface UserSettings {
  id: number;
  userId: number;
  language: 'es' | 'en';
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export const settingsService = {
  async getUserSettings(): Promise<{ success: boolean; data?: UserSettings; error?: string }> {
    try {
      const data = await apiClient.get<UserSettings>('/user/settings');
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('getUserSettings error:', error);
      return {
        success: false,
        error: error.message || 'No se pudo cargar la configuración',
      };
    }
  },

  async updateUserSettings(
    settings: Partial<Pick<UserSettings, 'language' | 'theme' | 'notificationsEnabled'>>,
  ): Promise<{ success: boolean; data?: UserSettings; error?: string }> {
    try {
      const data = await apiClient.patch<UserSettings>('/user/settings', settings);

      // Update local storage for offline access
      if (settings.language) {
        await AsyncStorage.setItem('userLanguage', settings.language);
      }
      if (settings.theme) {
        await AsyncStorage.setItem('userTheme', settings.theme);
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('updateUserSettings error:', error);
      return {
        success: false,
        error: error.message || 'No se pudo actualizar la configuración',
      };
    }
  },

  async getLocalLanguage(): Promise<'es' | 'en'> {
    const stored = await AsyncStorage.getItem('userLanguage');
    return (stored as 'es' | 'en') || 'es';
  },

  async getLocalTheme(): Promise<'light' | 'dark'> {
    const stored = await AsyncStorage.getItem('userTheme');
    return (stored as 'light' | 'dark') || 'light';
  },
};
