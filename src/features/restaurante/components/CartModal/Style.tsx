// src/features/restaurante/components/CartModal/Style.tsx
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 15,
    paddingTop: 40,
    paddingBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 40,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray600,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.gray500,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  itemCategory: {
    fontSize: 12,
    color: COLORS.gray600,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 2,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantityButton: {
    backgroundColor: COLORS.primary,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityDisplay: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  removeItemButton: {
    padding: 5,
  },
  removeItemText: {
    fontSize: 20,
  },
  summaryContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  continueButton: {
    flex: 1,
    backgroundColor: COLORS.gray200,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  payButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});