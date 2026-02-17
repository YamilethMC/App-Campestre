import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 120,
    height: 120,
    tintColor: COLORS.white,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    letterSpacing: 1,
    marginBottom: 2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: COLORS.gray400,
    marginHorizontal: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: COLORS.primaryDark,
    letterSpacing: 2,
    fontWeight: '500',
  },
});

export default styles;