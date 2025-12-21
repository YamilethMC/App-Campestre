import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 12,
  },
  fileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  fileInfo: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  fileIconContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  fileDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 4,
  },
  fileType: {
    fontSize: 12,
    color: COLORS.warning,
    borderColor: COLORS.warning,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  downloadButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
