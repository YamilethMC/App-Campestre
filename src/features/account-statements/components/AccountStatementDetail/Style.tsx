import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 0,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerLeft: {
    flex: 1,
  },
  period: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statusContainer: {
    marginRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: COLORS.gray700,
    paddingHorizontal: 20,
    marginBottom: 15,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  closeButton: {
    padding: 4,
  },
  infoContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  personalInfoContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  personalInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray800,
    marginBottom: 10,
  },
  personalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.gray600,
    fontWeight: '600',
    flex: 1.5,
  },
  infoValue: {
    fontSize: 13,
    color: COLORS.gray800,
    textAlign: 'right',
    flex: 1,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    paddingVertical: 8,
    marginBottom: 2,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.gray800,
    textAlign: 'left',
  },
  conceptColumn: {
    flex: 2,
    paddingLeft: 4,
  },
  chargesColumn: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 4,
  },
  creditsColumn: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 4,
  },
  tableBody: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  tableText: {
    fontSize: 12,
    color: COLORS.gray700,
  },
  rightAlign: {
    textAlign: 'right',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 10,
  },
  summaryContainer: {
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  summaryConcept: {
    fontSize: 14,
    color: COLORS.gray700,
    flex: 2,
  },
  summaryAmount: {
    fontSize: 14,
    color: COLORS.gray900,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    borderTopWidth: 2,
    borderTopColor: COLORS.primary,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray800,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  downloadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginBottom: 20,
  },
  downloadButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default styles;
