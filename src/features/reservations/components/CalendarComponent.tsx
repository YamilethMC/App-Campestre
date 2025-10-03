import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface CalendarComponentProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({ selectedDate, onDateChange }) => {
  // Fecha actual
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Obtener días del mes
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Obtener día de la semana del primer día del mes
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Obtener nombre del mes
  const getMonthName = (month: number) => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  };

  // Generar días del calendario
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Agregar días vacíos antes del primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Agregar días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Formatear fecha para mostrar
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return 'Selecciona una fecha';
    
    const date = new Date(dateString);
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthName = monthNames[date.getMonth()];
    
    return `${dayName}, ${day} de ${monthName}`;
  };

  // Seleccionar día
  const selectDay = (day: number | null) => {
    if (day === null) return;
    
    const date = new Date(currentYear, currentMonth, day);
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    onDateChange(formattedDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>Fecha</Text>
      </View>
      
      <View style={styles.calendarContainer}>
        <View style={styles.monthYearHeader}>
          <Text style={styles.monthYearText}>{getMonthName(currentMonth)} {currentYear}</Text>
        </View>
        
        <View style={styles.weekDaysHeader}>
          <Text style={styles.weekDayText}>Dom</Text>
          <Text style={styles.weekDayText}>Lun</Text>
          <Text style={styles.weekDayText}>Mar</Text>
          <Text style={styles.weekDayText}>Mié</Text>
          <Text style={styles.weekDayText}>Jue</Text>
          <Text style={styles.weekDayText}>Vie</Text>
          <Text style={styles.weekDayText}>Sáb</Text>
        </View>
        
        <View style={styles.calendarGrid}>
          {generateCalendarDays().map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                day === null && styles.emptyDay,
                day === currentDay && currentMonth === today.getMonth() && currentYear === today.getFullYear() && styles.todayButton,
                selectedDate && day !== null && new Date(selectedDate).getDate() === day && 
                new Date(selectedDate).getMonth() === currentMonth && 
                new Date(selectedDate).getFullYear() === currentYear && styles.selectedDayButton
              ]}
              onPress={() => selectDay(day)}
              disabled={day === null}
            >
              <Text style={[
                styles.dayText,
                day === currentDay && currentMonth === today.getMonth() && currentYear === today.getFullYear() && styles.todayText,
                selectedDate && day !== null && new Date(selectedDate).getDate() === day && 
                new Date(selectedDate).getMonth() === currentMonth && 
                new Date(selectedDate).getFullYear() === currentYear && styles.selectedDayText
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  calendarContainer: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  monthYearHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray600,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  todayButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
  },
  selectedDayButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
  },
  dayText: {
    fontSize: 16,
    color: COLORS.gray700,
  },
  todayText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  selectedDayText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});