import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import styles from './Style';

const RestaurantHours: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={20} color={COLORS.primary} />
        <Text style={styles.title}>Horarios del restaurante</Text>
      </View>
      
      <View style={styles.hoursContainer}>
        <View style={styles.hourRow}>
          <Text style={styles.hourLabel}>Desayuno:</Text>
          <Text style={styles.hourValue}>7:00 AM - 11:00 AM</Text>
        </View>
        <View style={styles.hourRow}>
          <Text style={styles.hourLabel}>Almuerzo:</Text>
          <Text style={styles.hourValue}>12:00 PM - 4:00 PM</Text>
        </View>
        <View style={styles.hourRow}>
          <Text style={styles.hourLabel}>Cena:</Text>
          <Text style={styles.hourValue}>6:00 PM - 10:00 PM</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Los menús se actualizan semanalmente. Para reservaciones llama al 555-1234 o reserva desde la app
        </Text>
      </View>
    </View>
  );
};

export default RestaurantHours;