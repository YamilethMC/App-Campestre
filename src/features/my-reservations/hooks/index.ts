import { Alert } from 'react-native';
import { useAuthStore } from '../../../features/auth/store/useAuthStore';
import { reservationService } from '../services';
import { CancelReservationRequest, Reservation } from '../interfaces';

export const useMyReservations = () => {
  const { userId } = useAuthStore.getState();

  const getReservations = async (): Promise<Reservation[] | null> => {
    if (!userId) {
      Alert.alert('Error', 'No se pudo obtener el ID de usuario');
      return null;
    }

    try {
      const response = await reservationService.getReservations(userId);

      if (!response.success || !response.data) {
        Alert.alert('Error', response.error || 'Error al cargar las reservaciones');
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('Error in getReservations hook:', error);
      Alert.alert('Error', 'Error inesperado al cargar las reservaciones');
      return null;
    }
  };

  const cancelReservation = async (reservationId: number, startTime: string, endTime: string): Promise<boolean> => {
    if (!userId) {
      Alert.alert('Error', 'No se pudo obtener el ID de usuario');
      return false;
    }

    const cancelData: CancelReservationRequest = {
      startTime,
      endTime,
      status: 'CANCELLED'
    };

    try {
      const response = await reservationService.cancelReservation(reservationId, userId, cancelData);

      if (!response.success) {
        Alert.alert('Error', response.error || 'Error al cancelar la reservación');
        return false;
      }
      return true;
    } catch (error) {
        console.error('Error in cancelReservation hook:', error);
        Alert.alert('Error', 'Error inesperado al cancelar la reservación');
      return false;
    }
  };

  return {
    getReservations,
    cancelReservation,
  };
};