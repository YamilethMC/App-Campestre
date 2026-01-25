import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 35,
    overflow: 'hidden',
    width: windowWidth - 32, // Ajustar al ancho de la pantalla menos márgenes
    maxWidth: 600, // Limitar el ancho máximo para pantallas grandes
    alignSelf: 'center',
    elevation: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  imageWrapper: {
    position: 'relative', // base para el absolute
  },
  image: {
    height: 200,
    width: windowWidth * 1.1, // 110% del ancho de la pantalla
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginBottom: 0,
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
    marginBottom: 0,
    marginTop: -16,
  },
  placeholderText: {
    color: COLORS.gray500,
    fontSize: 14,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    left: 10,
    alignItems: 'flex-start',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.gray800,
    flex: 1,
    marginBottom: 6,
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    color: COLORS.gray600,
    marginBottom: 12,
    lineHeight: 18,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    marginHorizontal: -8,
  },
  iconBox: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    minWidth: 70,
    width: '30%'
  },
  icon: {
    marginBottom: 6,
  },
  iconText: {
    fontSize: 12,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  tagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryTagText: {
    color: COLORS.gray700,
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;