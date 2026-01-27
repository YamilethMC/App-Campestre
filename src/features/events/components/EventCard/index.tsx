import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Image, Text, View } from 'react-native';
import Button from '../../../../shared/components/Button/Button';
import Card from '../../../../shared/components/Card/Card';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { EventCardProps } from '../../interfaces/eventInterface';
import styles from './Style';

const getEventTypeDisplayName = (eventType: string) => {
  switch (eventType) {
    case 'SPORT':
      return 'Deportivo';
    case 'SOCIAL':
      return 'Social';
    case 'FAMILY':
      return 'Familiar';
    case 'OTHER':
      return 'Otros';
    case 'Deportivo':
      return 'Deportivo';
    case 'Social':
      return 'Social';
    case 'Familiar':
      return 'Familiar';
    case 'Fitness':
      return 'Fitness';
    default:
      return eventType;
  }
};

const getEventTypeColor = (eventType: string) => {
  const displayType = getEventTypeDisplayName(eventType);
  switch (displayType) {
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

const toPastel = (hex: string, amount = 0.7) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const pastel = (c: number) =>
    Math.round(c + (255 - c) * amount);

  return `rgb(${pastel(r)}, ${pastel(g)}, ${pastel(b)})`;
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
  onOpenRegisterScreen,
  onUnregister
}) => {
  const { messages } = useMessages();
  const eventTypeColor = getEventTypeColor(event.eventType);
  const eventTypeDisplay = getEventTypeDisplayName(event.eventType);
  const progressPercentage = event.totalSpots > 0 ? Math.round(((event.totalSpots - event.availableSpots) / event.totalSpots) * 100) : 0;

  const handleReminderPress = () => {
    Alert.alert(
      'Funcionalidad no disponible',
      'La funcionalidad de recordatorios aún no está implementada.',
      [{ text: 'OK' }]
    );
  };

  return (
    <Card style={styles.card}>
      <View style={styles.imageWrapper}>
        {event.image ? (
          <Image
            source={{ uri: event.image }}
            style={styles.eventImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Imagen del Evento</Text>
          </View>
        )}

        {/* Badge sobre la imagen */}
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, { backgroundColor: toPastel(eventTypeColor) }]}>
            <Text style={[styles.badgeText, { color: eventTypeColor }]}>
              {eventTypeDisplay.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.eventNameContainer}>
        <Text style={styles.eventName}>{event.name}</Text>
      </View>

      <Text style={styles.eventDescription} numberOfLines={10}>
        {event.description}
      </Text>

      <View style={styles.eventInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="time" size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>{event.time} hrs.</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="location" size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        {event.inscritedShow !== false && (
          <View style={styles.infoItem}>
            <Ionicons name="people" size={16} color={COLORS.gray500} />
            <Text style={styles.infoText}>
              {event.totalSpots - event.availableSpots} {messages.EVENTCARD.REGISTERED} {event.totalSpots}
            </Text>
          </View>
        )}
      </View>

      {event.progressShow !== false && (
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
          <Text style={styles.progressText}>{progressPercentage}% {messages.EVENTCARD.BUSY}</Text>
        </View>
      )}

      {isRegistered ? (
        <View style={styles.registeredContainer}>
          <View style={styles.registeredInfo}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
            <Text style={styles.registeredText}>{messages.EVENTCARD.SUCCESSREGISTERED}</Text>
          </View>
          <Button
            text={messages.EVENTCARD.CANCELREGISTRATION}
            variant="outline"
            onPress={() => onUnregister && onUnregister(event.id)}
            style={styles.cancelButton}
            titleStyle={styles.cancelButtonText}
          />
          {/*<Button
            text={messages.EVENTCARD.ACTIVATEREMINDER}
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
          />*/}
        </View>
      ) : (
        <Button
          text={messages.EVENTCARD.REGISTER}
          variant="primary"
          onPress={() => onOpenRegisterScreen && onOpenRegisterScreen(event.id)}
          disabled={event.availableSpots <= 0}
        />
      )}
    </Card>
  );
};

export default EventCard;