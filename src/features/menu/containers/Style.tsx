// src/features/menu/containers/styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    paddingBottom: 100,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    color: COLORS.gray800,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 12,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
  },
});