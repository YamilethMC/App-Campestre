import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButton: {
      backgroundColor: COLORS.primary,
    },
    secondaryButton: {
      backgroundColor: COLORS.gray200,
    },
    dangerButton: {
      backgroundColor: COLORS.error,
    },
    disabledButton: {
      opacity: 0.6,
      backgroundColor: COLORS.gray400,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    primaryButtonText: {
      color: COLORS.white,
    },
    secondaryButtonText: {
      color: COLORS.gray800,
    },
    dangerButtonText: {
      color: COLORS.white,
    },
  });