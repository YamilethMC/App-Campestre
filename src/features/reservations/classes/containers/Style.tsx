import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 116,
  },
  scrollContentFlush: {
    // Mismo padding que la pantalla de Reservas (containers/Style.tsx: padding 16),
    // porque CalendarComponent y TimeSlots no traen margen horizontal propio:
    // dependen del padre. Sin esto quedaban de borde a borde y las tarjetas
    // propias a 20, dando tres anchos distintos apilados.
    paddingHorizontal: 16,
    // La barra de pestañas mide 98 y va en position:absolute encima del contenido.
    // Con este espacio el último elemento queda justo encima de ella: menos lo
    // tapa, más deja un hueco muerto al final del scroll.
    paddingBottom: 116,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyBox: {
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  // Sin tarjeta ni borde: en la pantalla 4 de la infografía el profesional va
  // suelto sobre el fondo y centrado, no dentro de un recuadro.
  professionalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 4,
  },
  professionalAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '1A',
    marginRight: 12,
  },
  professionalInitials: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  professionalName: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  professionalDiscipline: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  actionContainer: {
    marginTop: 24,
  },
});

export default styles;
