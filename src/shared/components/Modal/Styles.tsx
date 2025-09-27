import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../theme/colors';

const { width } = Dimensions.get('window');

// Valores de espaciado
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// Estilos tipográficos
const typography = {
  h3: {
    fontSize: 20,
    fontWeight: '500' as const,
    lineHeight: 28,
    color: COLORS.gray900,
  },
  button: {
    fontSize: 14,
    fontWeight: '500' as const,
    textTransform: 'uppercase' as const,
  },
};

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  container: {
    width: width - spacing.xl * 2,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: COLORS.gray900,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...typography.h3,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  content: {
    marginBottom: spacing.lg,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.gray200,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.gray400,
    opacity: 0.7,
  },
  buttonText: {
    ...typography.button,
    color: COLORS.white,
  },
  cancelButtonText: {
    color: COLORS.gray700,
  },
});
