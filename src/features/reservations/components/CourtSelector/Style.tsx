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
  courtsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  court: {
    margin: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minWidth: 80,
    maxWidth: 100,
  },
  availableCourt: {
    backgroundColor: COLORS.gray50,
    borderColor: COLORS.gray300,
  },
  unavailableCourt: {
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray300,
  },
  selectedCourt: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  courtText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray700,
    textAlign: 'center', // Center the court name text
  },
  selectedCourtText: {
    color: COLORS.white,
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
