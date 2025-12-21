import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/theme/colors';
import { Notification, NotificationCardProps } from '../../interfaces';
import styles from './Style';

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    const [y, m, d] = dateString.substring(0, 10).split('-');
    const meses = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ];
    return `${d} ${meses[Number(m) - 1]} ${y}`;
  };

  // Get type color based on notification type
  const getTypeColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('aviso')) return '#F5A623'; // Naranja
    if (
      lowerType.includes('celebración') ||
      lowerType.includes('celebracion') ||
      lowerType.includes('festiv')
    )
      return '#BD10E0'; // Púrpura
    if (lowerType.includes('informativo')) return '#7ED321'; // Verde
    if (lowerType.includes('evento') || lowerType.includes('actividad')) return '#50E3C2'; // Turquesa
    if (lowerType.includes('cierre') || lowerType.includes('cerrado')) return '#D0021B'; // Rojo
    return '#4A90E2'; // Azul por defecto
  };

  // Get appropriate icon based on notification type
  const getIconName = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('aviso') || lowerType.includes('noticia')) return 'information-circle';
    if (
      lowerType.includes('celebración') ||
      lowerType.includes('celebracion') ||
      lowerType.includes('festiv')
    )
      return 'gift';
    if (lowerType.includes('informativo')) return 'information-circle';
    if (lowerType.includes('evento') || lowerType.includes('actividad')) return 'calendar';
    if (lowerType.includes('cierre') || lowerType.includes('cerrado')) return 'lock-closed';
    // Default icon for any other type
    return 'megaphone';
  };

  // Get the color for this notification
  const typeColor = getTypeColor(notification.type);

  // Get text color based on background for better contrast
  const getTextColor = (bgColor: string) => {
    // Return white text for darker background colors
    const darkColors = ['#D0021B', '#BD10E0', '#4A90E2', '#7ED321'];
    return darkColors.includes(bgColor) ? '#FFFFFF' : '#000000';
  };

  return (
    <View style={[styles.container, { borderLeftColor: typeColor }]}>
      {/* Mostrar imagen si está disponible */}
      {notification.image && (
        <Image source={{ uri: notification.image }} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Ionicons
              name={getIconName(notification.type)}
              size={22}
              color={typeColor}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.title} numberOfLines={2}>
              {notification.title}
            </Text>
          </View>
        </View>
        <View style={[styles.typeContainer, { backgroundColor: typeColor }]}>
          <Text
            style={[styles.type, { color: getTextColor(typeColor) }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {notification.type}
          </Text>
        </View>
      </View>

      <Text style={styles.message} numberOfLines={10}>
        {notification.message}
      </Text>

      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <Ionicons name="time-outline" size={12} color={typeColor} style={{ marginRight: 6 }} />
          <Text style={styles.dateLabel}>Enviado:</Text>
          <Text style={styles.dateValue}>{formatDate(notification.sentDate)}</Text>
        </View>

        <View style={styles.dateContainer}>
          <Ionicons name="eye-outline" size={12} color={typeColor} style={{ marginRight: 6 }} />
          <Text style={styles.dateLabel}>Visible hasta:</Text>
          <Text style={styles.dateValue}>{formatDate(notification.visibleUntil)}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
