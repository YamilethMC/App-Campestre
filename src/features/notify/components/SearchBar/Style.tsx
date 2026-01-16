import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 20,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderStyle: 'solid',
  },
  searchIcon: {
    marginRight: 14,
    color: COLORS.gray500,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.gray900,
    fontFamily: 'System',
    fontWeight: '500',
  },
});

export default styles;