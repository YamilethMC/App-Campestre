import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
  },
  eventImage: {
    height: 120,
    width: '100%',
    borderRadius: 8,
    marginBottom: 12,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePlaceholderText: {
    color: COLORS.gray500,
    fontSize: 14,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray800,
    flex: 1,
  },
  eventNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  badgeContainer: {
    marginLeft: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 12,
    lineHeight: 18,
  },
  eventInfo: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.gray600,
    marginLeft: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.gray200,
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.gray600,
    minWidth: 70,
  },
  registeredContainer: {
    alignItems: 'center',
  },
  registeredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.error,
    marginVertical: 8,
  },
  cancelButtonText: {
    color: COLORS.error, // Letra roja fuerte
    fontWeight: '600',
  },
  registeredText: {
    fontSize: 16,
    color: COLORS.success,
    marginLeft: 6,
    fontWeight: '600',
  },
  reminderButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.info,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderButtonText: {
    color: COLORS.info, // Letra azul fuerte
    fontWeight: '600',
    marginLeft: 6,
  },
  reminderIcon: {
    marginRight: 4,
  },
});

export default styles;
