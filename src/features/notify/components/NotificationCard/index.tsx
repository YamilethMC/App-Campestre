import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/theme/colors';
import { Notification, NotificationCardProps } from '../../interfaces';
import styles from './Style';

interface NotificationCardPropsExtended extends NotificationCardProps {
  onPress: (notification: Notification) => void;
}

const NotificationCard: React.FC<NotificationCardPropsExtended> = ({ notification, onPress }) => {

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

  return (
    <TouchableOpacity 
      style={[styles.container, { borderLeftColor: typeColor }]}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={getIconName(notification.type)}
            size={24}
            color={typeColor}
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {notification.title}
          </Text>
        </View>
        
        <View style={[styles.badge, { backgroundColor: typeColor }]}>
          <Text style={styles.badgeText} numberOfLines={1}>
            {notification.type}
          </Text>
        </View>
      </View>
      
      <Ionicons
        name="chevron-forward"
        size={20}
        color={COLORS.gray400}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

export default NotificationCard;