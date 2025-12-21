import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray700,
    marginLeft: 8,
  },
  tablesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  table: {
    flex: 1,
    margin: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginHorizontal: 4,
    minWidth: 80,
    maxWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  availableTable: {
    backgroundColor: COLORS.gray50,
    borderColor: COLORS.gray300,
  },
  unavailableTable: {
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray300,
  },
  selectedTable: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tableText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray700,
  },
  selectedTableText: {
    color: COLORS.white,
  },
  capacityText: {
    fontSize: 12,
    color: COLORS.gray600,
    marginTop: 4,
  },
  selectedCapacityText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  unavailableText: {
    color: COLORS.gray400,
  },
  noAvailabilityContainer: {
    padding: 16,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  noAvailabilityText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
  },
});

export default styles;
