import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  colors: typeof lightColors;
}

const PRIMARY_COLOR = '#0c5426';

export const lightColors = {
  primary: PRIMARY_COLOR,
  primaryDark: '#094218',
  primaryLight: '#0f6b31',

  background: '#FFFFFF',
  surface: '#F9FAFB',
  card: '#FFFFFF',

  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',

  border: '#E5E7EB',
  borderLight: '#F3F4F6',

  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const darkColors = {
  primary: '#0f6b31', // Lighter green for dark mode contrast
  primaryDark: PRIMARY_COLOR,
  primaryLight: '#12803a',

  background: '#121212',
  surface: '#1E1E1E',
  card: '#2C2C2C',

  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',

  border: '#374151',
  borderLight: '#2C2C2C',

  success: '#34D399',
  error: '#F87171',
  warning: '#FBBF24',
  info: '#60A5FA',

  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('userTheme');
      if (storedTheme) {
        setThemeState(storedTheme as Theme);
      } else {
        // Use device preference on first launch
        const deviceTheme = deviceColorScheme === 'dark' ? 'dark' : 'light';
        setThemeState(deviceTheme);
        await AsyncStorage.setItem('userTheme', deviceTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem('userTheme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark: theme === 'dark',
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
