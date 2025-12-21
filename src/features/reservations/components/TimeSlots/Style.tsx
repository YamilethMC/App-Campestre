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
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Changed to align items to the left
  },
  timeSlot: {
    width: '31%', // Use fixed width instead of flexBasis for more predictable 3-column layout
    margin: '1%', // Use percentage for consistent spacing
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  availableSlot: {
    backgroundColor: COLORS.gray50,
    borderColor: COLORS.gray300,
  },
  unavailableSlot: {
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray300,
  },
  selectedSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: 14, // Smaller font to fit longer text
    fontWeight: '500',
    color: COLORS.gray700,
    textAlign: 'center',
    flexWrap: 'nowrap', // Prevent text wrapping to new line
  },
  selectedTimeText: {
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
    marginVertical: 8, // Add some vertical spacing
  },
  noAvailabilityText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 24, // Add line height for better readability when text wraps
  },
});

export default styles;
