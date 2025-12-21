import { Alert, RefreshControl, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { COLORS } from '../../../shared/theme/colors';
import Header from '../components/Header';
import NoReservations from '../components/NoReservations';
import ReservationCard from '../components/ReservationCard';
import { useMyReservations } from '../hooks';
import { Reservation } from '../interfaces';
import styles from './Style';

interface MyReservationsContainerProps {
  navigation?: any;
}

const MyReservationsContainer: React.FC<MyReservationsContainerProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { userId } = useAuthStore.getState();
  const { getReservations, cancelReservation } = useMyReservations();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    if (!userId) {
      Alert.alert('Error', 'No se pudo obtener el ID de usuario');
      setLoading(false);
      return;
    }

    try {
      const data = await getReservations();
      if (data !== null) {
        // Sort reservations by start time (newest first)
        const sortedReservations = [...data].sort(
          (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
        );
        setReservations(sortedReservations);
      } else {
        // Set to empty array if data is null
        setReservations([]);
      }
    } catch (error) {
      console.error('Error loading reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadReservations();
    setRefreshing(false);
  };

  const handleCancelReservation = async (
    reservationId: number,
    startTime: string,
    endTime: string,
  ): Promise<boolean> => {
    const success = await cancelReservation(reservationId, startTime, endTime);

    if (success) {
      // Remove the cancelled reservation from the list
      setReservations(prev => prev.filter(reservation => reservation.id !== reservationId));
    }

    return success;
  };

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack(); // This will go back to the previous screen
    } else {
      // Fallback if navigation is not provided
      console.log('Navigation not available');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Header
            title={t('reservations.myReservations') || 'Mis Reservaciones'}
            subtitle={'Consulta y gestiona todas tus reservaciones activas'}
            onBack={handleGoBack}
          />
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <Text style={styles.loadingText}>{t('common.loading') || 'Cargando...'}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header
          title={t('reservations.myReservations') || 'Mis Reservaciones'}
          subtitle={'Consulta y gestiona todas tus reservaciones activas'}
          onBack={handleGoBack}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
          <View style={styles.reservationsList}>
            {reservations.length > 0 ? (
              reservations.map(reservation => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onCancel={handleCancelReservation}
                />
              ))
            ) : (
              <NoReservations />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyReservationsContainer;
