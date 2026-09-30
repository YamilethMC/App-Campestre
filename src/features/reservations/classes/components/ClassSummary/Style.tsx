import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';

const styles = StyleSheet.create({
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary + '1A',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray900,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  label: {
    fontSize: 13,
    color: COLORS.gray600,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginTop: 1,
  },
});

export default styles;
