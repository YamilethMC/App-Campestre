import { RouteProp, useNavigation, useRoute } from 'expo-router/react-navigation';
import { NativeStackNavigationProp } from 'expo-router/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
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
 * Ventana del calendario mientras la ficha del profesional carga.
 *
 * La anticipación real la manda el servidor con la ficha (`policy.maxAdvanceDays`),
 * porque es algo que el Club configura desde el panel. Esto es sólo el hueco de
 * un instante, y es el valor más corto de los que el Club suele usar, así que
 * antes de conocer la regla nunca se ofrece de más.
 */
const VENTANA_MIENTRAS_CARGA_DIAS = 7;

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
  const { professional, prices, policy } = useProfessional(params.professionalId);
  const { slots, loading } = useAvailability(params.professionalId, date);

  // La regla del Club manda. Si todavía no llegó la ficha, se usa el valor de
  // arranque, que es el más corto: mejor ofrecer de menos un instante que de más.
  const ventanaEnHoras = (policy?.maxAdvanceDays ?? VENTANA_MIENTRAS_CARGA_DIAS) * 24;

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
            {professional?.photoUrl ? (
              <Image source={{ uri: professional.photoUrl }} style={styles.professionalAvatar} />
            ) : (
              <View style={styles.professionalAvatar}>
                <Text style={styles.professionalInitials}>{getInitials(professionalName)}</Text>
              </View>
            )}
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
          maxBookingWindowHours={ventanaEnHoras}
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
