import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    marginTop: 0,
    marginBottom: 16,
  },
  filterGroup: {
    marginVertical: 8,
  },
  scrollWrapper: {
    position: 'relative',
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryScrollContent: {
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: COLORS.white,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterIcon: {
    marginRight: 2,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 15,
    color: COLORS.gray700,
  },
  activeFilterButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  fadeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: 'transparent',
  },
  fadeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: 'transparent',
  },
});

export default styles;