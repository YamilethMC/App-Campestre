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
}

const MyReservationsSection: React.FC<MyReservationsSectionProps> = ({
  reservations,
  loading,
  refreshing,
  onRefresh,
  onReservationPress
}) => {
  const { t } = useTranslation();
  const activeReservationsCount = reservations.length;
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

      {/* Reservations List */}
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onPress={() => onReservationPress(reservation)}
          />
        ))
      ) : (
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