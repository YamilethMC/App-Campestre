import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

// Colores dinámicos basados en tipo de notificación
const TYPE_COLORS = {
  default: COLORS.info,
  aviso: COLORS.warning,
  informativo: COLORS.primary,
  celebración: '#BD10E0',
  evento: '#50E3C2',
  cierre: COLORS.error,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: TYPE_COLORS.default,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray900,
    lineHeight: 20,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 70,
    maxWidth: 100,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  chevron: {
    marginLeft: 8,
  },
});

export default styles;