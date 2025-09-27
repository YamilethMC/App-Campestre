import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Valores de espaciado temporal
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// Estilos tipográficos temporales
const typography = {
  h3: {
    fontSize: 20,
    fontWeight: '500' as const,
    lineHeight: 28,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: '#000000',
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
    color: '#212121',
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
  },
  cancelButton: {
    backgroundColor: '#EEEEEE',
  },
  confirmButton: {
    backgroundColor: '#1E88E5',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  buttonText: {
    ...typography.button,
    color: '#FFFFFF',
  },
  cancelButtonText: {
    color: '#757575',
  },
});
