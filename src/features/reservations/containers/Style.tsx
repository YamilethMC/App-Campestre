import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    width: 50, // Ancho fijo para el botón de atrás
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 1, // Tomar el espacio restante
    alignItems: 'center',
    marginHorizontal: 10, // Espacio adicional
    minWidth: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  rightContainer: {
    width: 50, // Ancho fijo para el espacio derecho
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 20,
    textAlign: 'center',
  },
  servicesContainer: {
    paddingBottom: 20,
  },
  confirmButton: {
    marginVertical: 16,
  },
  changeServiceButton: {
    marginBottom: 20,
  },
  numberSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray700,
    flex: 1,
    marginLeft: 12,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    color: COLORS.gray800,
  },
  myReservationsButton: {
    marginTop: 16,
  },
  fixedBottomButton: {
    position: 'absolute',
    bottom: 90, // Ajustar para dejar espacio para el menú inferior (82px + algo de margen)
    left: 16,
    right: 16,
    zIndex: 10,
  },
});

export default styles;
