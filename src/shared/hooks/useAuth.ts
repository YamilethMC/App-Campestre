import { useEffect } from 'react';
import { useStore } from '../../store';

// Custom hook to check authentication status
export const useAuth = () => {
  const { isAuthenticated, currentUser } = useStore();

  return {
    isAuthenticated,
    currentUser,
    isLoading: false, // In a real app, you'd track loading state
  };
};

// Custom hook to protect routes
export const useRequireAuth = (navigation: any) => {
  const { isAuthenticated } = useStore();

  useEffect(() => {
    if (!isAuthenticated) {
      // @ts-ignore - we'll handle navigation in the actual app
      navigation.replace('Login');
    }
  }, [isAuthenticated, navigation]);

  return isAuthenticated;
};
