import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.gray500,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrFrame: {
    width: 140,
    height: 140,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    padding: 10,
  },
  memberInfo: {
    alignItems: 'center',
  },
  memberName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray900,
    textAlign: 'center',
    marginBottom: 8,
  },
  memberDetails: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.gray500,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});

export default styles;