import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  filterGroup: {
    marginVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray300,
    marginVertical: 8,
    marginHorizontal: -8, // Extender un poco más allá para compensar el padding
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 8,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 13,
    color: COLORS.gray700,
  },
  activeFilterButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default styles;
