import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotsProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
  availableTimes: string[];
  unavailableMessage?: string;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({ 
  selectedTime, 
  onTimeChange, 
  availableTimes, 
  unavailableMessage = "No hay horarios disponibles" 
}) => {
  // Convertir los horarios disponibles en el formato con disponibilidad
  const timeSlots = availableTimes.map(time => ({
    time,
    available: true
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>Horario</Text>
      </View>
      
      {timeSlots.length > 0 ? (
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                slot.available ? styles.availableSlot : styles.unavailableSlot,
                selectedTime === slot.time && styles.selectedSlot
              ]}
              onPress={() => slot.available && onTimeChange(slot.time)}
              disabled={!slot.available}
            >
              <Text style={[
                styles.timeText,
                selectedTime === slot.time && styles.selectedTimeText,
                !slot.available && styles.unavailableText
              ]}>
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.noAvailabilityContainer}>
          <Text style={styles.noAvailabilityText}>{unavailableMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray700,
    marginLeft: 8,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    flex: 1,
    margin: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10, // Menos radio
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minWidth: 80,
    maxWidth: 100,
  },
  availableSlot: {
    backgroundColor: COLORS.gray50,
    borderColor: COLORS.gray300,
  },
  unavailableSlot: {
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray300,
  },
  selectedSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray700,
  },
  selectedTimeText: {
    color: COLORS.white,
  },
  unavailableText: {
    color: COLORS.gray400,
  },
  noAvailabilityContainer: {
    padding: 16,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  noAvailabilityText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
  },
});