import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    marginBottom: 16,
  },
  logoutContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButton: {
    minWidth: 100,
    paddingHorizontal: 12,
  },
  buttonSpacer: {
    width: 8,
  },
  saveButton: {
    marginLeft: 8,
  },
  cancelButton: {
    marginLeft: 8,
  },
  cancelButtonText: {},
  logoutButton: {
    width: '100%',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.error,
  },
});

export default styles;
