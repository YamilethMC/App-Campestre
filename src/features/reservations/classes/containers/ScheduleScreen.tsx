import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ReservationStackParamList } from '../../../../navigation/types';
import Button from '../../../../shared/components/Button/Button';
import { TimeSlots } from '../../components/TimeSlots';
import useMessages from '../../hooks/useMessages';
import { DateField } from '../components/DateField';
import { PartySizeSelector } from '../components/PartySizeSelector';
import { useClasses } from '../hooks/useClasses';
import styles from './Style';

type Navigation = NativeStackNavigationProp<ReservationStackParamList, 'ClassesSchedule'>;
type Route = RouteProp<ReservationStackParamList, 'ClassesSchedule'>;

/**
 * Ventana de reserva del calendario, en horas.
 *
 * El horario de los profesionales es semanal, así que la ventana de 48 h que usa
 * la reserva de canchas dejaría fuera casi todos los días. Se abre a 30 días
 * mientras el Club define la anticipación máxima real, que sigue pendiente (§10).
 */
const CLASS_BOOKING_WINDOW_HOURS = 30 * 24;

/** Iniciales del profesional mientras el Club no entrega su foto (§10). */
const getInitials = (fullName: string): string =>
  fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

/**
 * Pantalla 4 del flujo: fecha, horario y número de personas.
 *
 * Reutiliza CalendarComponent y TimeSlots del módulo de Reservas sin modificarlos.
 * Los horarios que se ofrecen salen de la regla de §8: sólo bloques "Particulares",
 * fecha no pasada y sin reserva previa para ese mismo espacio.
 */
const ScheduleScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { messages } = useMessages();
  const {
    getDisciplineById,
    getProfessionalById,
    getScheduleSlots,
    getTakenSlots,
    priceRules,
    minPartySize,
    maxPartySize,
  } = useClasses();

  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(minPartySize);

  const discipline = getDisciplineById(params.disciplineId);
  const professional = getProfessionalById(params.professionalId);
  const scheduleSlots = getScheduleSlots(professional, date);
  const takenSlots = getTakenSlots(professional, date);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    // Al cambiar de día, la hora elegida deja de tener sentido.
    setTime('');
  };

  const handleContinue = () => {
    if (!date || !time) return;
    navigation.navigate('ClassesConfirm', {
      disciplineId: params.disciplineId,
      professionalId: params.professionalId,
      date,
      startTime: time,
      partySize,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContentFlush} showsVerticalScrollIndicator={false}>
        {professional && (
          <View style={styles.professionalHeader}>
            <View style={styles.professionalAvatar}>
              <Text style={styles.professionalInitials}>
                {getInitials(professional.displayName)}
              </Text>
            </View>
            <View>
              <Text style={styles.professionalName}>{professional.displayName}</Text>
              <Text style={styles.professionalDiscipline}>
                {discipline ? discipline.name : ''}
              </Text>
            </View>
          </View>
        )}

        <DateField
          label={messages.CLASSES.SELECT_DATE}
          placeholder={messages.CLASSES.DATE_PLACEHOLDER}
          selectedDate={date}
          maxBookingWindowHours={CLASS_BOOKING_WINDOW_HOURS}
          onDateChange={handleDateChange}
        />

        <TimeSlots
          selectedTime={time}
          onTimeChange={setTime}
          availableTimes={scheduleSlots}
          selectedDate={date}
          unavailableMessage={date ? messages.CLASSES.NO_SLOTS : messages.CLASSES.SELECT_DATE_FIRST}
          unavailableTimes={takenSlots}
          unavailableLabel={messages.CLASSES.TAKEN}
        />

        <PartySizeSelector
          label={messages.CLASSES.NUMBER_OF_PEOPLE}
          priceTitle={messages.CLASSES.PRICES_PER_CLASS}
          personLabel={messages.CLASSES.PERSON}
          peopleLabel={messages.CLASSES.PEOPLE}
          partySize={partySize}
          minPartySize={minPartySize}
          maxPartySize={maxPartySize}
          priceRules={priceRules}
          onChange={setPartySize}
          availabilityCaption={messages.CLASSES.AVAILABILITY_CAPTION}
          availabilityValue={messages.CLASSES.AVAILABILITY_VALUE}
          showAvailability={Boolean(time)}
        />

        <View style={styles.actionContainer}>
          <Button
            text={messages.CLASSES.CONTINUE}
            onPress={handleContinue}
            disabled={!date || !time}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
