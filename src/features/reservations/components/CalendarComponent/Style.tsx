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
  calendarContainer: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  monthYearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    flex: 1,
    textAlign: 'center',
  },
  navButton: {
    padding: 4,
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray600,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayButton: {
    width: '14.28%', // 100% / 7 days
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  todayButton: {
    borderColor: 'transparent',
  },
  selectedDayButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  pastDayButton: {
    opacity: 0.4,
  },
  dayText: {
    fontSize: 16,
    color: COLORS.gray700,
  },
  todayText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  selectedDayText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  pastDayText: {
    color: COLORS.gray400,
  },
});

export default styles;
