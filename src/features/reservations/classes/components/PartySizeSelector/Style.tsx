import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginLeft: 8,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Cuadrados de esquina redondeada con borde y símbolo verde, como en la
  // pantalla 4 de la infografía (no círculos grises).
  counterButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  counterButtonDisabled: {
    opacity: 0.4,
  },
  counterValue: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.gray900,
    minWidth: 60,
    textAlign: 'center',
  },
  // Fondo verde claro con borde, como en la infografía.
  priceBox: {
    marginTop: 16,
    backgroundColor: COLORS.primary + '14',
    borderWidth: 1,
    borderColor: COLORS.primary + '33',
    borderRadius: 8,
    padding: 12,
  },
  priceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  // Columna fija para que los precios queden alineados entre sí y pegados a las
  // etiquetas, como en la infografía, y no separados de orilla a orilla.
  priceLabelColumn: {
    width: 110,
  },
  priceRowActive: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  priceLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  priceValue: {
    fontSize: 14,
    color: COLORS.gray800,
    fontWeight: '600',
  },
  // Leyenda de disponibilidad de la infografía: palomita en círculo verde,
  // etiqueta chica arriba y el estado en verde abajo.
  availabilityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: COLORS.primary + '14',
    borderWidth: 1,
    borderColor: COLORS.primary + '33',
    borderRadius: 8,
    padding: 12,
  },
  availabilityIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  availabilityCaption: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  availabilityValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

export default styles;
