import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)', // Light greenish background (primary color with low opacity)
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginLeft: 8,
  },
  hoursContainer: {
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  hourLabel: {
    fontSize: 14,
    color: COLORS.gray700,
    fontWeight: '500',
  },
  hourValue: {
    fontSize: 14,
    color: COLORS.gray800,
    fontWeight: '600',
  },
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray600,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default styles;