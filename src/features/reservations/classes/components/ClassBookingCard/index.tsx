import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';
import { ClassBooking } from '../../interfaces';
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
 * Vive en el mismo apartado que las reservas de cancha porque el §7 lo pide
 * ("La reserva aparece en Mis Reservas"), pero con su propia tarjeta: una clase
 * tiene profesional, personas y precio; una cancha tiene instalación y rango de
 * horas. Son datos distintos y forzarlos a la misma tarjeta escondería la mitad.
 *
 * Muestra los mismos seis datos que la pantalla de confirmación, así que no hace
 * falta abrir un detalle para verlos. Cuando el Club defina la política de
 * cancelación (§10, pendiente) tendrá sentido darle un detalle con esa acción.
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
        {booking.disciplineName} · {booking.professionalName}
      </Text>
      <Text style={styles.cardDetail}>
        {formatDate(booking.date)} · {booking.startTime} hrs
      </Text>
      <Text style={styles.cardDetail}>
        {booking.partySize} {booking.partySize === 1 ? personLabel : peopleLabel}
      </Text>
    </View>

    <Text style={styles.price}>${booking.priceSnapshot}</Text>
  </View>
);
