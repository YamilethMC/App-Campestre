import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 12,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray600,
    marginLeft: 8,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray800,
    textAlign: 'right',
  },
});

export default styles;
