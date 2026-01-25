import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Reservation } from '../../../my-reservations/interfaces';
import styles from './Style';

interface ReservationCardProps {
  reservation: Reservation;
  onPress: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onPress }) => {
  // Format date to show "Hoy", "Mañana" or the actual date
  const formatDate = (dateString: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const reservationDate = new Date(dateString);

    // Set time to 00:00 to compare dates only
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    reservationDate.setHours(0, 0, 0, 0);

    if (reservationDate.getTime() === today.getTime()) {
      return 'Hoy';
    } else if (reservationDate.getTime() === tomorrow.getTime()) {
      return 'Mañana';
    } else {
      // Format as DD/MM/YYYY
      const day = reservationDate.getDate().toString().padStart(2, '0');
      const month = (reservationDate.getMonth() + 1).toString().padStart(2, '0');
      const year = reservationDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  // Format time to show HH:MM hrs
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} hrs`;
  };

  // Get service icon based on type
  const getServiceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'tenis':
        return 'tennisball-outline';
      case 'padel':
        return 'tennisball-outline';
      case 'golf':
        return 'golf-outline';
      case 'gimnasio':
      case 'gym':
        return 'barbell-outline';
      case 'spa':
        return 'water-outline';
      case 'restaurante':
        return 'restaurant-outline';
      default:
        return 'cube-outline';
    }
  };

  // Get facility color based on type
  const getFacilityColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'tenis':
        return '#10B981'; // Green
      case 'padel':
        return '#10B981'; // Green
      case 'golf':
        return COLORS.info; // Blue
      case 'gimnasio':
      case 'gym':
        return COLORS.warning; // Orange
      case 'spa':
        return '#8B5CF6'; // Purple
      case 'restaurante':
        return COLORS.error; // Red
      default:
        return COLORS.gray500; // Gray
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      {/* Service Icon */}
      <View
        style={[styles.iconContainer, {
          backgroundColor: `${getFacilityColor(reservation.facility.type)}10`,
        }]}
      >
        <Ionicons
          name={getServiceIcon(reservation.facility.type)}
          size={24}
          color={getFacilityColor(reservation.facility.type)}
        />
      </View>

      {/* Reservation Info */}
      <View style={styles.textContainer}>
        <Text style={styles.serviceName}>
          {reservation.facility.name}
        </Text>
        <Text style={styles.serviceTime}>
          {formatDate(reservation.startTime)}, {formatTime(reservation.startTime)}
        </Text>
        <Text style={styles.detailText}>
          Ver detalle
        </Text>
      </View>

      {/* Navigation Arrow */}
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={24} color={COLORS.gray200} />
      </View>
    </TouchableOpacity>
  );
};

export default ReservationCard;