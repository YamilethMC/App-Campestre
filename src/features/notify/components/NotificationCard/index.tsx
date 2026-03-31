import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Notification, NotificationCardProps } from '../../interfaces';
import styles from './Style';

interface NotificationCardPropsExtended extends NotificationCardProps {
  onPress: (notification: Notification) => void;
  onDelete?: (notification: Notification) => void;
}

const NotificationCard: React.FC<NotificationCardPropsExtended> = ({ notification, onPress, onDelete }) => {

  const getTypeColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('aviso')) return COLORS.warning;
    if (lowerType.includes('celebración') || lowerType.includes('celebracion') || lowerType.includes('festiv')) return '#BD10E0';
    if (lowerType.includes('informativo')) return COLORS.primary;
    if (lowerType.includes('evento') || lowerType.includes('actividad')) return '#50E3C2';
    if (lowerType.includes('cierre') || lowerType.includes('cerrado') || lowerType.includes('urgente')) return COLORS.error;
    return COLORS.info;
  };

  const getIconName = (type: string): any => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('aviso') || lowerType.includes('noticia')) return 'information-circle';
    if (lowerType.includes('celebración') || lowerType.includes('celebracion') || lowerType.includes('festiv')) return 'gift';
    if (lowerType.includes('informativo')) return 'information-circle';
    if (lowerType.includes('evento') || lowerType.includes('actividad')) return 'calendar';
    if (lowerType.includes('cierre') || lowerType.includes('cerrado') || lowerType.includes('urgente')) return 'alert-circle';
    return 'megaphone';
  };

  const typeColor = getTypeColor(notification.type);
  const isRead = notification.read === true;

  const handleDelete = (e: any) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(notification);
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { borderLeftColor: COLORS.primary },
        isRead && { opacity: 0.6 }
      ]}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Icon and type commented out for cleaner UI */}
        {/* <View style={styles.iconContainer}>
          <Ionicons
            name={getIconName(notification.type)}
            size={24}
            color={typeColor}
          />
        </View> */}
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, isRead && { fontWeight: '400' }]} numberOfLines={2}>
            {notification.title}
          </Text>
          <Text style={[styles.message, isRead && { fontWeight: '400' }]} numberOfLines={3}>
            {notification.message}
          </Text>
        </View>
        
        {/* Type badge commented out for cleaner UI */}
        {/* <View style={[styles.badge, { backgroundColor: typeColor }]}>
          <Text style={styles.badgeText} numberOfLines={1}>
            {notification.type}
          </Text>
        </View> */}
      </View>
      
      <View style={styles.deleteSection}>
        {onDelete && (
          <TouchableOpacity 
            onPress={handleDelete}
            style={styles.deleteButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons
              name="trash-outline"
              size={25}
              color={COLORS.error}
            />
            {/*<Text style={styles.deleteButtonText}>Eliminar</Text>*/}
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;