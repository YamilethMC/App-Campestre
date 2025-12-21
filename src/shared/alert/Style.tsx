import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

const styles = StyleSheet.create({
  alert: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  alertText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.gray700,
  },
});

export default styles;
