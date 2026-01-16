import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    width: '100%',
    maxHeight: '85%',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  headerIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray900,
    lineHeight: 26,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  message: {
    fontSize: 16,
    color: COLORS.gray800,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'justify',
  },
  datesContainer: {
    backgroundColor: COLORS.gray50,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: COLORS.gray600,
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 8,
  },
  dateValue: {
    fontSize: 14,
    color: COLORS.gray900,
    fontWeight: '600',
  },
});

export default styles;
