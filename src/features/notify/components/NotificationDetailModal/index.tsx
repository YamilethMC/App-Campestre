import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/theme/colors';
import { Notification } from '../../interfaces';
import styles from './Style';

interface NotificationDetailModalProps {
  visible: boolean;
  notification: Notification | null;
  onClose: () => void;
}

const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  visible,
  notification,
  onClose,
}) => {
  if (!notification) return null;

  const formatDate = (dateString: string) => {
    const [y, m, d] = dateString.substring(0, 10).split('-');
    const meses = ["ene", "feb", "mar", "abr", "may", "jun",
                 "jul", "ago", "sep", "oct", "nov", "dic"];
    return `${d} ${meses[Number(m) - 1]} ${y}`;
  };

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
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons
                name={getIconName(notification.type)}
                size={24}
                color={typeColor}
                style={styles.headerIcon}
              />
              <Text style={styles.title} numberOfLines={2}>
                {notification.title}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color={COLORS.gray600} />
            </TouchableOpacity>
          </View>

          {/* Type Badge */}
          <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
            <Text style={styles.typeText}>{notification.type}</Text>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.message}>{notification.message}</Text>

            {/* Dates */}
            <View style={styles.datesContainer}>
              <View style={styles.dateRow}>
                <Ionicons name="time-outline" size={16} color={typeColor} />
                <Text style={styles.dateLabel}>Enviado:</Text>
                <Text style={styles.dateValue}>{formatDate(notification.sentDate)}</Text>
              </View>

              <View style={styles.dateRow}>
                <Ionicons name="eye-outline" size={16} color={typeColor} />
                <Text style={styles.dateLabel}>Visible hasta:</Text>
                <Text style={styles.dateValue}>{formatDate(notification.visibleUntil)}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationDetailModal;
