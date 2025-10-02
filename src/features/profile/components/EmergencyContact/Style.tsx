import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
  },
  contactInfo: {
    width: '100%',
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailRowEditing: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.gray900,
    marginRight: 8,
    fontWeight: 'bold',
  },
  detailLabelEditing: {
    fontSize: 14,
    color: COLORS.gray600,
    marginRight: 0,
    marginBottom: 4,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.gray900,
    flex: 1,
    fontWeight: 'bold',
  },
  detailValueEditing: {
    fontWeight: 'normal',
  },
  phone: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  input: {
    marginBottom: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 0,
    paddingLeft: 0,
  },
  select: {
    width: '100%',
    marginBottom: 0,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 20,
  },
  selectedText: {
    fontSize: 14,
    color: COLORS.gray800,
    flex: 1,
  },
  editFieldContainer: {
    width: '100%',
  },
});
