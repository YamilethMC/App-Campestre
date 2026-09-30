import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  tarjeta: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  ayuda: {
    fontSize: 13,
    color: COLORS.gray600,
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 18,
  },
  etiqueta: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray600,
    marginBottom: 4,
  },
  campo: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.gray900,
    marginBottom: 12,
  },
  error: {
    fontSize: 13,
    color: COLORS.error,
    marginBottom: 10,
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  secundario: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: 'center',
  },
  textoSecundario: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray600,
  },
  primario: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  apagado: {
    opacity: 0.5,
  },
  textoPrimario: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default styles;
