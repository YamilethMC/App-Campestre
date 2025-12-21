import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 150, // Increased padding to account for bottom tab navigation
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
  noFAQsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noFAQsText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
  },
});

export default styles;
