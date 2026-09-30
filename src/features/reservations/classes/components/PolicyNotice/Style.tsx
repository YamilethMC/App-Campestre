import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
  },
  titulo: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 10,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  punto: {
    marginTop: 7,
    marginRight: 8,
  },
  texto: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.gray600,
  },
});

export default styles;
