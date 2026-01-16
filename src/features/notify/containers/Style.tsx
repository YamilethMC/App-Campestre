import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.gray500,
    marginTop: 4,
  },
  notificationsList: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  noNotificationsText: {
    fontSize: 18,
    color: COLORS.gray400,
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingMoreContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingMoreText: {
    fontSize: 16,
    color: COLORS.gray500,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  paginationControlsContainer: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  pageNumberButton: {
    marginHorizontal: 3,
    minWidth: 42,
    height: 42,
    paddingHorizontal: 8,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.error,
    backgroundColor: 'transparent',
  },
  currentPageButton: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error,
  },
  currentPageButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  paginationArrowButton: {
    minWidth: 46,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.info,
    backgroundColor: 'transparent',
  },
  paginationArrowButtonDisabled: {
    backgroundColor: COLORS.gray400,
    borderColor: COLORS.gray400,
  },
  paginationArrowButtonText: {
    color: COLORS.info,
    fontWeight: '700',
  },
  paginationArrowButtonTextDisabled: {
    color: COLORS.gray500,
  },
  pageNumberButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;