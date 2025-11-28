import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

// Colores dinámicos basados en tipo de notificación
const TYPE_COLORS = {
  default: '#4A90E2', // Azul
  aviso: '#F5A623',   // Naranja
  informativo: '#7ED321', // Verde
  celebración: '#BD10E0', // Púrpura
  evento: '#50E3C2',  // Turquesa
  cierre: '#D0021B',  // Rojo
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: TYPE_COLORS.default, // Color por defecto, se sobreescribe en el componente
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray800,
    lineHeight: 21,
    marginBottom: 4,
  },
  typeContainer: {
    backgroundColor: TYPE_COLORS.default, // Color por defecto, se sobreescribe en el componente
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    flex: 0,
    flexShrink: 1,
    minWidth: 65,
    maxWidth: 110,
  },
  type: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
    textTransform: 'uppercase',
    textAlign: 'center',
    overflow: 'hidden',
  },
  message: {
    fontSize: 14,
    color: COLORS.gray800,
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'justify',
    fontStyle: 'normal',
  },
  footer: {
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingTop: 10,
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateLabel: {
    fontSize: 11,
    color: COLORS.gray600,
    fontWeight: '500',
    marginRight: 6,
    minWidth: 80,
  },
  dateValue: {
    fontSize: 11,
    color: COLORS.gray800,
    flex: 1,
    fontWeight: '600',
  },
});

export default styles;