import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Reservation } from '../../../my-reservations/interfaces';
import ReservationCard from '../ReservationCard';

interface MyReservationsSectionProps {
  reservations: Reservation[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onReservationPress: (reservation: Reservation) => void;
  /** Título del apartado de instalaciones. Sólo se pinta si hay alguna reservada. */
  groupTitle?: string;
  /** Tarjetas de otro tipo que viven en esta misma sección (hoy, las clases). */
  extraItems?: React.ReactNode;
  /** Cuántas son, para el contador de activas y para el estado vacío. */
  extraCount?: number;
  /** Título de ese segundo apartado. */
  extraTitle?: string;
}

const groupTitleStyle = {
  fontSize: 13,
  fontWeight: '600' as const,
  color: COLORS.gray500,
  letterSpacing: 0.5,
  marginBottom: 8,
  marginTop: 4,
};

const MyReservationsSection: React.FC<MyReservationsSectionProps> = ({
  reservations,
  loading,
  refreshing,
  onRefresh,
  onReservationPress,
  groupTitle,
  extraItems,
  extraCount = 0,
  extraTitle
}) => {
  const { t } = useTranslation();
  // El contador suma todo lo que el socio tiene reservado, sea del tipo que sea.
  const activeReservationsCount = reservations.length + extraCount;
  const hasReservations = reservations.length > 0;
  const hasExtras = extraCount > 0;
  // Format date to show "Hoy", "Mañana" or the actual date
  const formatDate = (dateString: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const reservationDate = new Date(dateString);
    
    // Set time to 00:00 to compare dates only
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    reservationDate.setHours(0, 0, 0, 0);
    
    if (reservationDate.getTime() === today.getTime()) {
      return 'Hoy';
    } else if (reservationDate.getTime() === tomorrow.getTime()) {
      return 'Mañana';
    } else {
      // Format as DD/MM/YYYY
      const day = reservationDate.getDate().toString().padStart(2, '0');
      const month = (reservationDate.getMonth() + 1).toString().padStart(2, '0');
      const year = reservationDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  // Format time to show HH:MM hrs
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} hrs`;
  };

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.gray900 }}>
          Mis Reservas
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: COLORS.gray600, marginRight: 5 }}>
            ACTIVAS ({activeReservationsCount})
          </Text>
          {/*<View style={{ 
            backgroundColor: COLORS.primary, 
            borderRadius: 12, 
            paddingHorizontal: 8, 
            paddingVertical: 2 
          }}>
            <Text style={{ color: COLORS.white, fontSize: 14, fontWeight: '600' }}>
              {activeReservationsCount}
            </Text>
          </View>*/}
        </View>
      </View>

      {/* Instalaciones. El encabezado del apartado sólo aparece si hay algo debajo
          y si además hay otro apartado con el que confundirse. */}
      {hasReservations && (
        <>
          {groupTitle && hasExtras && (
            <Text style={groupTitleStyle}>{groupTitle}</Text>
          )}
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onPress={() => onReservationPress(reservation)}
            />
          ))}
        </>
      )}

      {/* Segundo apartado: hoy las clases. */}
      {hasExtras && (
        <>
          {extraTitle && hasReservations && (
            <Text style={groupTitleStyle}>{extraTitle}</Text>
          )}
          {extraItems}
        </>
      )}

      {/* Sin nada de nada */}
      {!hasReservations && !hasExtras && (
        <View style={{ 
          backgroundColor: COLORS.gray100, 
          borderRadius: 12, 
          padding: 20, 
          alignItems: 'center',
          marginVertical: 10
        }}>
          <Text style={{ fontSize: 16, color: COLORS.gray600, textAlign: 'center' }}>
            No tienes reservaciones activas
          </Text>
        </View>
      )}
    </View>
  );
};

export default MyReservationsSection;