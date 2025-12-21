import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useHelpCenterStore } from '../store';

export const useHelpCenterActions = () => {
  const { faqs, loading, error, fetchFAQs } = useHelpCenterStore();

  // Fetch FAQs on initial load
  useEffect(() => {
    fetchFAQs();
  }, []);

  // Show error as an alert when error state changes
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return {
    faqs,
    loading,
    error,
    refreshFAQs: fetchFAQs,
  };
};
