import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 20,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
  },
  searchContainer: {
    backgroundColor: COLORS.primary,
    paddingBottom: 2,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  headerIcon: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.gray800,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  filterButton: {
    marginHorizontal: 4,
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeFilterText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  inactiveFilterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  monthSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  navButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  monthDisplay: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray800,
  },
  eventsCount: {
    fontSize: 16,
    color: COLORS.gray600,
  },
  eventsList: {
    paddingBottom: 20,
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  noEventsText: {
    fontSize: 18,
    color: COLORS.gray500,
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  reserveButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationInfoContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  paginationInfoText: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  paginationControlsContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  paginationArrowButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  paginationArrowButtonDisabled: {
    opacity: 0.3,
  },
  paginationArrowButtonText: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  paginationArrowButtonTextDisabled: {
    color: COLORS.gray400,
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  pageNumberButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  pageNumberButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.gray700,
  },
  currentPageButton: {
  },
  currentPageButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

export default styles;