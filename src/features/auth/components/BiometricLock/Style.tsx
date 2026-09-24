import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray600,
    marginTop: 6,
    marginBottom: 40,
    textAlign: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignSelf: 'stretch',
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  secondaryButton: {
    marginTop: 18,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: COLORS.gray600,
    fontSize: 15,
  },
});

export default styles;
