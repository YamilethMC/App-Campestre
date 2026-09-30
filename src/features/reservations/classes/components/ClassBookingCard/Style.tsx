import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    overflow: 'hidden',
  },
  piePropuesta: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EFF6FF',
  },
  tituloPropuesta: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 4,
  },
  textoPropuesta: {
    fontSize: 12,
    lineHeight: 17,
    color: '#1E3A8A',
    marginBottom: 10,
  },
  botonesPropuesta: {
    flexDirection: 'row',
    gap: 8,
  },
  rechazar: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
  },
  textoRechazar: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E40AF',
  },
  aceptar: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  textoAceptar: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  pieSustituto: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFBEB',
  },
  textoSustituto: {
    fontSize: 13,
    color: '#92400E',
    fontWeight: '500',
  },
  pieCancelar: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  botonCancelar: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  textoCancelar: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.error,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '1A',
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  cardDetail: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

export default styles;
