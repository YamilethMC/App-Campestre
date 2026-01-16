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
    marginHorizontal: -8,
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 20,
    marginRight: 8,
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
    fontSize: 13,
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
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    borderRadius: 10,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  segmentButtonFirst: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  segmentButtonLast: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  segmentButtonActive: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.gray900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray600,
  },
  segmentButtonTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default styles;