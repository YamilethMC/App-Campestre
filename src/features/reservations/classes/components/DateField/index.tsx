import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';
import { CalendarComponent } from '../../../components/CalendarComponent';
import { formatShortDate } from '../../utils/date';
import styles from './Style';

interface DateFieldProps {
  label: string;
  placeholder: string;
  selectedDate: string;
  maxBookingWindowHours?: number;
  onDateChange: (date: string) => void;
}

/**
 * Campo de fecha de un solo renglón, que despliega el calendario al tocarlo.
 *
 * La infografía muestra la fecha como un campo compacto, no como una rejilla de
 * mes abierta: así la pantalla de horario cabe casi completa sin scrollear.
 * Por dentro reutiliza el CalendarComponent del módulo de Reservas para no
 * duplicar la lógica de días, ventana de reserva y días pasados.
 */
export const DateField: React.FC<DateFieldProps> = ({
  label,
  placeholder,
  selectedDate,
  maxBookingWindowHours,
  onDateChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (date: string) => {
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <TouchableOpacity
        style={[styles.field, isOpen && styles.fieldOpen]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={selectedDate ? styles.valueText : styles.placeholderText}>
          {selectedDate ? formatShortDate(selectedDate) : placeholder}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'calendar'}
          size={20}
          color={COLORS.primary}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.calendarPanel}>
          <CalendarComponent
            selectedDate={selectedDate}
            onDateChange={handleSelect}
            maxBookingWindowHours={maxBookingWindowHours}
            showHeader={false}
          />
        </View>
      )}
    </View>
  );
};
