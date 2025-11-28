import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Fondo más cálido que el blanco puro
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
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
    color: '#95a5a6',
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
    color: '#7f8c8d',
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
    borderColor: '#e74c3c', // Rojo más vibrante
    backgroundColor: 'transparent',
  },
  currentPageButton: {
    backgroundColor: '#e74c3c', // Rojo más vibrante
    borderColor: '#e74c3c',
  },
  currentPageButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  paginationArrowButton: {
    minWidth: 46,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#3498db', // Azul más vibrante
    backgroundColor: 'transparent',
  },
  paginationArrowButtonDisabled: {
    backgroundColor: '#bdc3c7',
    borderColor: '#bdc3c7',
  },
  paginationArrowButtonText: {
    color: '#3498db', // Azul más vibrante
    fontWeight: '700',
  },
  paginationArrowButtonTextDisabled: {
    color: '#7f8c8d',
  },
  pageNumberButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;