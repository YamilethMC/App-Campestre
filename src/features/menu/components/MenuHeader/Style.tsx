import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 4,
  },
  menuCount: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    marginLeft: 16,
  },
  downloadButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  downloadButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
