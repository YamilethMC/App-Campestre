import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  searchContainerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.gray800,
    fontSize: 16,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});
