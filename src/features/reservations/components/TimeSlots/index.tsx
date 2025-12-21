import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { TimeSlotsProps } from '../../interfaces/reservationInterface';
import styles from './Style';

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedTime,
  onTimeChange,
  availableTimes,
  selectedDate,
  unavailableMessage = 'No hay horarios disponibles',
}) => {
  const { messages } = useMessages();
  // Función para verificar si un horario ya pasó
  const isTimePassed = (time: string, selectedDate?: string): boolean => {
    if (!selectedDate) return false; // Si no hay fecha seleccionada, ningún horario ha pasado

    // Convertir la fecha seleccionada a un objeto Date
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();

    // Comparar solo las fechas (día, mes, año) sin la hora
    const isToday =
      selectedDateObj.getDate() === today.getDate() &&
      selectedDateObj.getMonth() === today.getMonth() &&
      selectedDateObj.getFullYear() === today.getFullYear();

    if (!isToday) return false; // Si la fecha seleccionada no es hoy, ningún horario ha pasado

    // Si es hoy, verificar si el horario ya pasó
    const [hours, minutes] = time.split(':').map(Number);
    const currentTime = new Date();
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0); // Establecer la hora seleccionada

    return selectedTime < currentTime; // Si el horario es anterior a la hora actual, ya pasó
  };

  // Convertir los horarios disponibles en el formato con disponibilidad
  const timeSlots = availableTimes.map(time => ({
    time,
    available: !isTimePassed(time, selectedDate),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>{messages.TIMESLOTS.TITLE}</Text>
      </View>

      {timeSlots.length > 0 ? (
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                slot.available ? styles.availableSlot : styles.unavailableSlot,
                selectedTime === slot.time && styles.selectedSlot,
              ]}
              onPress={() => slot.available && onTimeChange(slot.time)}
              disabled={!slot.available}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === slot.time && styles.selectedTimeText,
                  !slot.available && styles.unavailableText,
                ]}
              >
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.noAvailabilityContainer}>
          <Text style={styles.noAvailabilityText} selectable={false}>
            {unavailableMessage}
          </Text>
        </View>
      )}
    </View>
  );
};
