import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    primaryButton: {
      backgroundColor: COLORS.primaryDark,
      borderColor: COLORS.primaryDark,
    },
    filledButton: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
    secondaryButton: {
      backgroundColor: COLORS.gray200,
      borderColor: COLORS.gray200,
    },
    outlineButton: {
      backgroundColor: COLORS.white,
      borderColor: COLORS.primary,
    },
    dangerButton: {
      backgroundColor: COLORS.error,
      borderColor: COLORS.error,
    },
    disabledButton: {
      opacity: 0.6,
      backgroundColor: COLORS.gray400,
      borderColor: COLORS.gray400,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    primaryButtonText: {
      color: COLORS.white,
    },
    filledButtonText: {
      color: COLORS.white,
    },
    secondaryButtonText: {
      color: COLORS.gray800,
    },
    outlineButtonText: {
      color: COLORS.primary,
    },
    dangerButtonText: {
      color: COLORS.white,
    },
  });