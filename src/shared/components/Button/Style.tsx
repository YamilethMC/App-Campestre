import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
    button: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      minHeight: 48,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
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
    iconButton: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 8,
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
      fontSize: 17,
      fontWeight: '600',
      letterSpacing: 0.3,
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
    iconButtonText: {
      color: COLORS.gray600,
    },
    dangerButtonText: {
      color: COLORS.white,
    },
  });