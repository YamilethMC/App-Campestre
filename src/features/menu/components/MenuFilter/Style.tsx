import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    minWidth: 70,
    justifyContent: 'center',
  },
  selectedFilterButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.gray700,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
  },
  selectedFilterText: {
    color: COLORS.white,
  },
  countContainer: {
    backgroundColor: COLORS.gray200,
    borderRadius: 6,
    minWidth: 24,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 6,
  },
  selectedCountText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  countText: {
    color: COLORS.gray600,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default styles;