import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';
import { ClassBooking } from '../../interfaces';
import { dateFromInstant, timeFromInstant } from '../../utils/date';
import styles from './Style';

interface ClassBookingCardProps {
  booking: ClassBooking;
  personLabel: string;
  peopleLabel: string;
  formatDate: (date: string) => string;
}

/**
 * Tarjeta de una clase reservada, dentro de "Mis Reservas".
 *
 * Vive en el mismo apartado que las reservas de cancha porque el §7 lo pide,
 * pero con su propia tarjeta: una clase tiene profesional, personas y precio, y
 * una cancha tiene instalación y rango de horas.
 *
 * Muestra los mismos seis datos que la pantalla de confirmación, así que no hace
 * falta abrir un detalle. Cuando el Club defina la política de cancelación (§10)
 * tendrá sentido darle uno con esa acción.
 */
export const ClassBookingCard: React.FC<ClassBookingCardProps> = ({
  booking,
  personLabel,
  peopleLabel,
  formatDate,
}) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <Ionicons name="school-outline" size={24} color={COLORS.primary} />
    </View>

    <View style={styles.info}>
      <Text style={styles.cardTitle}>
        {booking.discipline.name} · {booking.professional.displayName}
      </Text>
      <Text style={styles.cardDetail}>
        {formatDate(dateFromInstant(booking.startsAt))} · {timeFromInstant(booking.startsAt)} hrs
      </Text>
      <Text style={styles.cardDetail}>
        {booking.partySize} {booking.partySize === 1 ? personLabel : peopleLabel}
      </Text>
    </View>

    <Text style={styles.price}>${Number(booking.priceSnapshot)}</Text>
  </View>
);
