import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButton: {
      backgroundColor: '#4A90E2',
    },
    secondaryButton: {
      backgroundColor: '#E5E7EB',
    },
    dangerButton: {
      backgroundColor: '#EF4444',
    },
    disabledButton: {
      opacity: 0.6,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    primaryButtonText: {
      color: '#FFFFFF',
    },
    secondaryButtonText: {
      color: '#374151',
    },
    dangerButtonText: {
      color: '#FFFFFF',
    },
  });