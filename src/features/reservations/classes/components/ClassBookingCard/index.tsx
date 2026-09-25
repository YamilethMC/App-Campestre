import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';
import { CancellationPreview, ClassBooking } from '../../interfaces';
import { dateFromInstant, timeFromInstant } from '../../utils/date';
import styles from './Style';

interface ClassBookingCardProps {
  booking: ClassBooking;
  personLabel: string;
  peopleLabel: string;
  formatDate: (date: string) => string;
  /** Qué costaría cancelar, para avisarle antes de que confirme. */
  onPreviewCancel?: (bookingId: number) => Promise<CancellationPreview | null>;
  onCancel?: (bookingId: number) => Promise<{ success: boolean; error?: string }>;
  canceling?: boolean;
}

/**
 * Tarjeta de una clase reservada, dentro de "Mis Reservas".
 *
 * Vive en el mismo apartado que las reservas de cancha porque el §7 lo pide,
 * pero con su propia tarjeta: una clase tiene profesional, personas y precio, y
 * una cancha tiene instalación y rango de horas.
 *
 * Muestra los mismos seis datos que la pantalla de confirmación, así que no hace
 * falta abrir un detalle.
 *
 * Cancelar pide confirmación **diciendo lo que cuesta**. El Club fija la ventana
 * sin costo y el porcentaje, y el servidor los calcula: aquí sólo se enseña lo
 * que responde, sin repetir la regla, para que cambiarla en el panel no obligue
 * a tocar la app.
 */
export const ClassBookingCard: React.FC<ClassBookingCardProps> = ({
  booking,
  personLabel,
  peopleLabel,
  formatDate,
  onPreviewCancel,
  onCancel,
  canceling,
}) => {
  const preguntarYCancelar = async () => {
    const aviso = onPreviewCancel ? await onPreviewCancel(booking.id) : null;

    const mensaje = !aviso
      ? '¿Seguro que quieres cancelar esta clase?'
      : aviso.sinCosto
        ? `Faltan ${Math.round(aviso.horasFaltantes)} horas. Cancelar ahora no tiene costo.`
        : `Faltan menos de ${aviso.cancellationWindowHours} horas, así que se te cobrará ` +
          `$${aviso.chargeAmount} (${aviso.chargePercent}% de la clase).`;

    Alert.alert('Cancelar la clase', mensaje, [
      { text: 'Mejor no', style: 'cancel' },
      {
        text: 'Sí, cancelar',
        style: 'destructive',
        onPress: async () => {
          const resultado = onCancel ? await onCancel(booking.id) : null;
          if (resultado && !resultado.success) {
            Alert.alert('No se pudo cancelar', resultado.error ?? 'Intenta de nuevo');
          }
        },
      },
    ]);
  };

  return (
  <View style={styles.contenedor}>
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

    {onCancel && (
      <View style={styles.pieCancelar}>
        <TouchableOpacity
          style={styles.botonCancelar}
          onPress={preguntarYCancelar}
          disabled={canceling}
        >
          <Text style={styles.textoCancelar}>
            {canceling ? 'Cancelando...' : 'Cancelar clase'}
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
  );
};
