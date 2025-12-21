import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 70, // Espacio suficiente para la paginación y moreOptions
  },
  contentContainer: {
    marginTop: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    minHeight: 200,
  },
  noFilesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    minHeight: 300,
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
  fixedPaginationContainer: {
    backgroundColor: COLORS.gray50,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  currentPageButton: {},
  currentPageButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchContainer: {
    margin: 15,
    marginBottom: 10,
  },
});

export default styles;
