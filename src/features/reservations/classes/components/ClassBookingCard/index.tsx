import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';
import { CancellationPreview, ClassBooking } from '../../interfaces';
import { dateFromInstant, timeFromInstant } from '../../utils/date';
import { SubstituteModal } from '../SubstituteModal';
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
  /** Mandar a alguien en su lugar cuando cancelar ya cuesta (§3). */
  onSubstitute?: (
    bookingId: number,
    name: string,
    phone: string,
  ) => Promise<{ success: boolean; error?: string }>;
  /** Responder la reprogramación que propuso el profesor (§2). */
  onReschedule?: (bookingId: number, acepta: boolean) => Promise<{ success: boolean; error?: string }>;
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
  onSubstitute,
  onReschedule,
}) => {
  const [pidiendoSustituto, setPidiendoSustituto] = useState(false);
  const [respondiendo, setRespondiendo] = useState(false);

  // §2: la propuesta del profesor tras cancelar por mal clima. Es una reserva
  // en espera, con el horario ya apartado para el socio.
  const esPropuesta = Boolean(booking.rescheduledFromId) && booking.status === 'PENDING';

  const responder = async (acepta: boolean) => {
    setRespondiendo(true);
    const resultado = onReschedule ? await onReschedule(booking.id, acepta) : null;
    setRespondiendo(false);
    if (resultado && !resultado.success) {
      Alert.alert('No se pudo', resultado.error ?? 'Intenta de nuevo');
    } else if (acepta) {
      Alert.alert('Listo', 'Tu clase quedó reprogramada.');
    }
  };
  const preguntarYCancelar = async () => {
    const aviso = onPreviewCancel ? await onPreviewCancel(booking.id) : null;

    const mensaje = !aviso
      ? '¿Seguro que quieres cancelar esta clase?'
      : aviso.sinCosto
        ? `Faltan ${Math.round(aviso.horasFaltantes)} horas. Cancelar ahora no tiene costo.`
        : `Faltan menos de ${aviso.cancellationWindowHours} horas, así que se te cobrará ` +
          `$${aviso.chargeAmount} (${aviso.chargePercent}% de la clase).`;

    const cancelar = {
      text: 'Sí, cancelar',
      style: 'destructive' as const,
      onPress: async () => {
        const resultado = onCancel ? await onCancel(booking.id) : null;
        if (resultado && !resultado.success) {
          Alert.alert('No se pudo cancelar', resultado.error ?? 'Intenta de nuevo');
        }
      },
    };

    // §3: cuando cancelar ya cuesta, mandar a alguien en su lugar es la salida
    // sin penalización. Se le ofrece justo ahí, que es cuando le sirve.
    const opciones =
      aviso && !aviso.sinCosto && onSubstitute && !booking.substituteName
        ? [
            { text: 'Mejor no', style: 'cancel' as const },
            { text: 'Mandar a alguien', onPress: () => setPidiendoSustituto(true) },
            cancelar,
          ]
        : [{ text: 'Mejor no', style: 'cancel' as const }, cancelar];

    Alert.alert('Cancelar la clase', mensaje, opciones);
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

    {esPropuesta && onReschedule && (
      <View style={styles.piePropuesta}>
        <Text style={styles.tituloPropuesta}>El profesor propone este horario</Text>
        <Text style={styles.textoPropuesta}>
          Tu clase se canceló por mal clima. Este lugar está apartado para ti; si no te acomoda,
          puedes reservar el horario que prefieras sin costo.
        </Text>
        <View style={styles.botonesPropuesta}>
          <TouchableOpacity
            style={styles.rechazar}
            onPress={() => responder(false)}
            disabled={respondiendo}
          >
            <Text style={styles.textoRechazar}>No me acomoda</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aceptar}
            onPress={() => responder(true)}
            disabled={respondiendo}
          >
            <Text style={styles.textoAceptar}>
              {respondiendo ? 'Un momento...' : 'Aceptar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )}

    {booking.substituteName && (
      <View style={styles.pieSustituto}>
        <Text style={styles.textoSustituto}>
          Viene en tu lugar: {booking.substituteName}
        </Text>
      </View>
    )}

    {onSubstitute && (
      <SubstituteModal
        visible={pidiendoSustituto}
        onClose={() => setPidiendoSustituto(false)}
        onSubmit={(nombre, telefono) => onSubstitute(booking.id, nombre, telefono)}
      />
    )}

    {onCancel && !esPropuesta && (
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
