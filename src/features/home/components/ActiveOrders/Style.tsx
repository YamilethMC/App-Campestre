import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginLeft: 8,
  },
  noOrdersText: {
    textAlign: 'center',
    color: COLORS.gray500,
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  ordersList: {
    maxHeight: 150,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  serviceIcon: {
    marginRight: 12,
  },
  orderDetails: {
    flex: 1,
  },
  orderName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray800,
  },
  orderService: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  dateInfo: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 2,
  },
  timeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  timeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default styles;
