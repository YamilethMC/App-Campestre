import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray900,
    marginLeft: 10,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'center',
  },
  carActionItem: {
    backgroundColor: '#E0F2FE', // Pastel blue for car
    shadowColor: '#0EA5E9', // Blue shadow
  },
  waiterActionItem: {
    backgroundColor: '#FFEDD5', // Pastel orange for waiter
    shadowColor: '#F97316', // Orange shadow
  },
  disabledActionItem: {
    backgroundColor: COLORS.gray300,
    elevation: 1,
    shadowColor: COLORS.gray400,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carIconContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.3)', // Green tint for car (transportation)
  },
  waiterIconContainer: {
    backgroundColor: 'rgba(249, 115, 22, 0.3)', // Orange tint for waiter (service)
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  carActionText: {
    color: '#0369A1', // Darker blue for car text
  },
  waiterActionText: {
    color: '#B45309', // Darker orange for waiter text
  },
  disabledActionText: {
    color: COLORS.gray600,
  },
});

export default styles;
