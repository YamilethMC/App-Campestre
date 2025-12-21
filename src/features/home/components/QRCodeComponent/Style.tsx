import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  qrContainer: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    borderStyle: 'dashed',
  },
  qrPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.white,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
