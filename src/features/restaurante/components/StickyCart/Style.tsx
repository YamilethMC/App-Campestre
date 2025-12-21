// src/features/restaurante/components/StickyCart/Style.tsx
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cartButton: {
    flex: 1,
    marginRight: 15,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  cartText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  totalContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalItems: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 3,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
  },
});
