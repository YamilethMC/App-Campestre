import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import styles from './Style';

const RestaurantHours: React.FC = () => {
  const { messages } = useMessages();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={20} color={COLORS.primary} />
        <Text style={styles.title}>{messages.RESTAURANTHOURS.TITLE}</Text>
      </View>
      
      <View style={styles.hoursContainer}>
        <View style={styles.hourRow}>
          <Text style={styles.hourLabel}>{messages.RESTAURANTHOURS.BREAKFAST}</Text>
          <Text style={styles.hourValue}>7:00 AM - 11:00 AM</Text>
        </View>
        <View style={styles.hourRow}>
          <Text style={styles.hourLabel}>{messages.RESTAURANTHOURS.LUNCH}</Text>
          <Text style={styles.hourValue}>12:00 PM - 4:00 PM</Text>
        </View>
        <View style={styles.hourRow}>
          <Text style={styles.hourLabel}>{messages.RESTAURANTHOURS.DINNER}</Text>
          <Text style={styles.hourValue}>6:00 PM - 10:00 PM</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {messages.RESTAURANTHOURS.TEXT}
        </Text>
      </View>
    </View>
  );
};

export default RestaurantHours;