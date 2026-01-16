import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  subtitleText: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 4,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop: 16,
  },
});

export default styles;