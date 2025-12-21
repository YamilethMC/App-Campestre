import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  modalConfirmation: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    alignItems: 'center',
    padding: 20,
  },
  ViewComponent: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray800,
    textAlign: 'center',
    marginBottom: 8,
  },
  textSubTitle: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default styles;
