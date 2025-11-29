import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noFilesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noFilesText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
    marginTop: 16,
  },
  loadingMoreContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  loadingMoreText: {
    fontSize: 14,
    color: COLORS.gray600,
    fontStyle: 'italic',
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
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default styles;