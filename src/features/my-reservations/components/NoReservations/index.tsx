import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const NoReservations = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No se encontraron reservaciones</Text>
      <Text style={styles.message}>
        Actualmente no tienes reservaciones activas. Haz una nueva reservación en la sección de reservas.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    paddingTop: 60,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: COLORS.gray500,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default NoReservations;