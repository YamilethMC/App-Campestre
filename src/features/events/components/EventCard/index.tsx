import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import Button from '../../../../shared/components/Button/Button';
import Card from '../../../../shared/components/Card/Card';
import { COLORS } from '../../../../shared/theme/colors';
import { EventCardProps } from '../../interfaces/eventInterface';
import styles from './Style';


const getEventTypeColor = (eventType: string) => {
  switch (eventType) {
    case 'Deportivo':
      return COLORS.primary;
    case 'Social':
      return COLORS.info;
    case 'Familiar':
      return COLORS.success;
    case 'Fitness':
      return COLORS.warning;
    default:
      return COLORS.gray600;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return date.toLocaleDateString('es-ES', options);
};

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  isRegistered, 
  onRegister, 
  onUnregister, 
  onToggleReminder 
}) => {
  const eventTypeColor = getEventTypeColor(event.eventType);
  const progressPercentage = Math.round(((event.totalSpots - event.availableSpots) / event.totalSpots) * 100);
  
  const handleReminderPress = () => {
    Alert.alert(
      'Funcionalidad no disponible',
      'La funcionalidad de recordatorios aún no está implementada.',
      [{ text: 'OK' }]
    );
  };

  return (
    <Card style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>Imagen del Evento</Text>
      </View>
      
      <Text style={styles.eventName}>{event.name}</Text>
      
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { backgroundColor: eventTypeColor + '20' }]}>
          <Text style={[styles.badgeText, { color: eventTypeColor }]}>
            {event.eventType}
          </Text>
        </View>
      </View>
      
      <Text style={styles.eventDescription} numberOfLines={2}>
        {event.description}
      </Text>
      
      <View style={styles.eventInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>{formatDate(event.date)}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>{event.time}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="location" size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="people" size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>
            {event.totalSpots - event.availableSpots} inscritos de {event.totalSpots}
          </Text>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${progressPercentage}%`, 
                backgroundColor: progressPercentage > 75 ? COLORS.warning : COLORS.primary 
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{progressPercentage}% ocupado</Text>
      </View>
      
      {isRegistered ? (
        <View style={styles.registeredContainer}>
          <View style={styles.registeredInfo}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
            <Text style={styles.registeredText}>¡Ya estás registrado!</Text>
          </View>
          <Button
            text="Cancelar registro"
            variant="outline"
            onPress={() => onUnregister(event.id)}
            style={styles.cancelButton}
            titleStyle={styles.cancelButtonText}
          />
          <Button
            text="Activar Recordatorio"
            variant="outline"
            onPress={handleReminderPress}
            style={styles.reminderButton}
            titleStyle={styles.reminderButtonText}
            icon={
              <Ionicons 
                name="notifications-outline" 
                size={16} 
                color={COLORS.info} 
                style={styles.reminderIcon} 
              />
            }
          />
        </View>
      ) : (
        <Button
          text="Registrarse"
          variant="primary"
          onPress={() => onRegister(event.id)}
          disabled={event.availableSpots <= 0}
        />
      )}
    </Card>
  );
};

export default EventCard;