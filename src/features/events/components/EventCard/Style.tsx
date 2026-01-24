import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 35,
    overflow: 'hidden',
    width: windowWidth - 32, // Ajustar al ancho de la pantalla menos márgenes
    maxWidth: 600, // Limitar el ancho máximo para pantallas grandes
    alignSelf: 'center',
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOpacity: 50,
    shadowRadius: 120,
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },
  imageWrapper: {
    position: 'relative', // base para el absolute
  },
  eventImage: {
    height: 200,
    width: '110%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginBottom: 12,
    marginTop: -16,
    marginLeft: -16,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: COLORS.gray100,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: -16,
  },
  imagePlaceholderText: {
    color: COLORS.gray500,
    fontSize: 14,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray800,
    flex: 1,
    textAlign: 'center',
  },
  eventNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: 10,
    alignItems: 'flex-end',
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  eventDescription: {
    fontSize: 15,
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
    fontSize: 14,
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
    fontSize: 14,
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