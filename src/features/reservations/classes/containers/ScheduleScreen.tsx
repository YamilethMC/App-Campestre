import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ReservationStackParamList } from '../../../../navigation/types';
import Button from '../../../../shared/components/Button/Button';
import { COLORS } from '../../../../shared/theme/colors';
import { TimeSlots } from '../../components/TimeSlots';
import useMessages from '../../hooks/useMessages';
import { DateField } from '../components/DateField';
import { PartySizeSelector } from '../components/PartySizeSelector';
import { useAvailability, useProfessional } from '../hooks/useClasses';
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

const MIN_PARTY_SIZE = 1;
const MAX_PARTY_SIZE = 3;

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
 * Los horarios los decide el backend, no la app: devuelve cada bloque con su
 * estado, así que aquí no se calcula disponibilidad, sólo se pinta. Los que no
 * se pueden tomar llegan marcados y se muestran apagados con "Ocupado".
 */
const ScheduleScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { messages } = useMessages();

  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(MIN_PARTY_SIZE);

  // La ficha no depende de la fecha, así que el profesional y los precios se ven
  // desde que entra a la pantalla. La disponibilidad sí la necesita.
  const { professional, prices } = useProfessional(params.professionalId);
  const { slots, loading } = useAvailability(params.professionalId, date);

  const professionalName = professional?.displayName ?? '';
  const disciplineName = professional?.discipline.name ?? '';

  const availableTimes = slots.map((slot) => slot.startTime);
  const takenTimes = slots.filter((slot) => !slot.available).map((slot) => slot.startTime);
  const price = prices.find((rule) => rule.partySize === partySize)?.price ?? 0;

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    // Al cambiar de día, la hora elegida deja de tener sentido.
    setTime('');
  };

  const handleContinue = () => {
    if (!date || !time) return;

    navigation.navigate('ClassesConfirm', {
      professionalId: params.professionalId,
      disciplineName,
      professionalName,
      date,
      startTime: time,
      partySize,
      price,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContentFlush} showsVerticalScrollIndicator={false}>
        {professionalName ? (
          <View style={styles.professionalHeader}>
            <View style={styles.professionalAvatar}>
              <Text style={styles.professionalInitials}>{getInitials(professionalName)}</Text>
            </View>
            <View>
              <Text style={styles.professionalName}>{professionalName}</Text>
              <Text style={styles.professionalDiscipline}>{disciplineName}</Text>
            </View>
          </View>
        ) : null}

        <DateField
          label={messages.CLASSES.SELECT_DATE}
          placeholder={messages.CLASSES.DATE_PLACEHOLDER}
          selectedDate={date}
          maxBookingWindowHours={CLASS_BOOKING_WINDOW_HOURS}
          onDateChange={handleDateChange}
        />

        {loading && date ? (
          <ActivityIndicator style={styles.loader} color={COLORS.primary} />
        ) : (
          <TimeSlots
            selectedTime={time}
            onTimeChange={setTime}
            availableTimes={availableTimes}
            unavailableMessage={date ? messages.CLASSES.NO_SLOTS : messages.CLASSES.SELECT_DATE_FIRST}
            unavailableTimes={takenTimes}
            unavailableLabel={messages.CLASSES.TAKEN}
          />
        )}

        <PartySizeSelector
          label={messages.CLASSES.NUMBER_OF_PEOPLE}
          priceTitle={messages.CLASSES.PRICES_PER_CLASS}
          personLabel={messages.CLASSES.PERSON}
          peopleLabel={messages.CLASSES.PEOPLE}
          partySize={partySize}
          minPartySize={MIN_PARTY_SIZE}
          maxPartySize={MAX_PARTY_SIZE}
          priceRules={prices}
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
