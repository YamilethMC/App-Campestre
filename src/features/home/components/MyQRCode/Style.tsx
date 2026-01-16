import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray800,
    marginLeft: 10,
  },
  qrContainer: {
    alignItems: 'center',
  },
  qrPlaceholderContainer: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    borderStyle: 'dashed',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 6,
    textAlign: 'center',
  },
  memberText: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 20,
    textAlign: 'center',
  },
  showQrButton: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.primaryLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  showQrButtonText: {
    color: COLORS.primaryDark,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;