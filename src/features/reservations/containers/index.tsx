import React, { useEffect, useState } from 'react';
import { Alert, Modal, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Components
import Button from '../../../shared/components/Button/Button';
import { CalendarComponent } from '../components/CalendarComponent';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { CourtSelector } from '../components/CourtSelector';
import MyReservationsSection from '../components/MyReservationsSection';
import { ServiceCard } from '../components/ServiceCard';
import { SummaryCard } from '../components/SummaryCard';
import { TableSelector } from '../components/TableSelector';
import { TimeSlots } from '../components/TimeSlots';

// Hooks
import useMessages from '../hooks/useMessages';
import { useReservation } from '../hooks/useReservation';

// Styles
import styles from './Style';

// Mocks

// My Reservations components and hooks
import { useAuthStore } from '../../../features/auth/store/useAuthStore';
import { useMyReservations } from '../../../features/my-reservations/hooks';
import { Reservation } from '../../../features/my-reservations/interfaces';

// Store
import { COLORS } from '../../../shared/theme/colors';

// Icons
import { Ionicons } from '@expo/vector-icons';

const ReservationsContainer = () => {
  const { messages } = useMessages();
  const { userId } = useAuthStore.getState();
  const { getReservations, cancelReservation } = useMyReservations();
  const {
    selectedService,
    date,
    time,
    selectedCourt,
    selectedCourtId,
    selectedTable,
    partySize,
    showConfirmationModal,
    facilities,
    availableTimeSlots,
    loading,
    loadingTimeSlots,
    setTime,
    setSelectedCourt,
    setSelectedCourtId,
    setSelectedTable,
    setPartySize,
    setShowConfirmationModal,
    handleSelectService,
    handleDateChange,
    getAvailableCourts,
    getCourtName,
    getAvailableTables,
    getTableName,
    getAvailableTimeSlots,
    confirmReservation,
    resetSelection,
    loadTimeSlotsForCourt
  } = useReservation();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  // Available services for new reservations
  const availableServices = [
    {
      id: 'padel',
      name: 'Padel',
      description: 'Canchas para disfrutar del padel',
      icon: 'tennisball-outline',
      color: '#10B981' //COLORS.primary
    }/*,
    {
      id: 'golf',
      name: 'Golf',
      description: 'Campo de golf y equipamiento',
      icon: 'golf-outline',
      color: '#10B981' //COLORS.info
    },
    {
      id: 'tenis',
      name: 'Tenis',
      description: 'Canchas y equipos para disfrutar del tenis',
      icon: 'tennisball-outline',
      color: '#10B981'
    },
    {
      id: 'gimnasio',
      name: 'Gimnasio',
      description: 'Equipos y clases de fitness',
      icon: 'barbell-outline',
      color: '#10B981' //COLORS.warning
    }*/
    
  ];

  useEffect(() => {
    if (!selectedService) {
      loadReservations();
    }
  }, [selectedService]);

  const loadReservations = async () => {
    if (!userId) {
      Alert.alert('Error', 'No se pudo obtener el ID de usuario');
      setLoadingReservations(false);
      return;
    }

    try {
      const data = await getReservations();
      if (data !== null) {
        // Filter only active reservations (not cancelled)
        const activeReservations = data.filter(
          reservation => reservation.status.toUpperCase() !== 'CANCELLED'
        );
        // Sort reservations by start time (closest first)
        const sortedReservations = [...activeReservations].sort((a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
        setReservations(sortedReservations);
      } else {
        setReservations([]);
      }
    } catch (error) {
      console.error('Error loading reservations:', error);
    } finally {
      setLoadingReservations(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadReservations();
    setRefreshing(false);
  };

  const handleCancelReservation = async (reservationId: number, startTime: string, endTime: string): Promise<boolean> => {
    const success = await cancelReservation(reservationId, startTime, endTime);

    if (success) {
      // Remove the cancelled reservation from the list
      setReservations(prev =>
        prev.filter(reservation => reservation.id !== reservationId)
      );
      setShowReservationModal(false);
    }

    return success;
  };

  const openReservationModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowReservationModal(true);
  };

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

  // Calculate duration in minutes
  const getDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffMs = endDate.getTime() - startDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    return `${diffMins} min`;
  };

  // Get service icon based on type
  const getServiceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'tenis':
        return 'tennisball-outline';
      case 'padel':
        return 'tennisball-outline';
      case 'golf':
        return 'golf-outline';
      case 'gimnasio':
      case 'gym':
        return 'barbell-outline';
      case 'spa':
        return 'water-outline';
      case 'restaurante':
        return 'restaurant-outline';
      default:
        return 'cube-outline';
    }
  };

  // Get facility color based on type
  const getFacilityColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'tenis':
        return '#10B981'; // Green
      case 'padel':
        return '#10B981'; // Green
      case 'golf':
        return '#10B981'; //COLORS.info; // Blue
      case 'gimnasio':
      case 'gym':
        return '#10B981'; //COLORS.warning; // Orange
      case 'spa':
        return '#10B981'; //'#8B5CF6'; // Purple
      case 'restaurante':
        return '#10B981'; //COLORS.error; // Red
      default:
        return '#10B981'; //COLORS.gray500; // Gray
    }
  };

  // Count active reservations
  const activeReservationsCount = reservations.length;


  // Si hay un servicio seleccionado, mostrar la interfaz de reserva
  if (selectedService) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
          {/* Componente de calendario */}
          <CalendarComponent
            selectedDate={date}
            onDateChange={handleDateChange}
          />

          {/* Componente de canchas - Mostrar solo para padel */}
          {selectedService.id === 'padel' && (
            <CourtSelector
              selectedCourt={selectedCourt}
              onCourtChange={(courtId) => {
                // Set both the string ID and numeric ID
                setSelectedCourt(courtId);
                const numericId = parseInt(courtId);
                setSelectedCourtId(numericId);

                // Load time slots for this court and selected date
                if (date) {
                  loadTimeSlotsForCourt(numericId, date);
                }
              }}
              courts={getAvailableCourts()}
              unavailableMessage={messages.CONTAINER.NO_COURTS_AVAILABLE}
            />
          )}

          {/* Componentes adicionales para otros servicios */}
          {selectedService.id === 'restaurante' && (
            <>
              <View style={styles.numberSelector}>
                <Ionicons name="people-outline" size={24} color={COLORS.gray600} />
                <Text style={styles.label}>{messages.CONTAINER.DINERS}</Text>
                <View style={styles.counter}>
                  <Button
                    variant="icon"
                    text="-"
                    onPress={() => setPartySize(prev => Math.max(1, prev - 1))}
                  />
                  <Text style={styles.counterText}>{partySize}</Text>
                  <Button
                    variant="icon"
                    text="+"
                    onPress={() => setPartySize(prev => prev + 1)}
                  />
                </View>
              </View>

              <TableSelector
                selectedTable={selectedTable}
                onTableChange={setSelectedTable}
                tables={getAvailableTables()}
                unavailableMessage={messages.CONTAINER.NO_TABLES_AVAILABLE}
              />
            </>
          )}

          {/* Componente de horarios - Mostrar solo para padel y cuando se haya seleccionado cancha y fecha */}
          {selectedService.id === 'padel' && (
            <TimeSlots
              selectedTime={time}
              onTimeChange={setTime}
              availableTimes={getAvailableTimeSlots()}
              selectedDate={date}
              unavailableMessage={date && selectedCourt ? messages.CONTAINER.NO_HOURS_AVAILABLE : "Debe seleccionar fecha y cancha para mostrar los horarios"}
            />
          )}

          {/* Resumen de la reserva */}
          {(date && time) && (
            <SummaryCard
              serviceName={selectedService.name}
              date={date}
              time={time}
              details={{
                ...(selectedService.id === 'padel' && selectedCourt && { court: getCourtName(selectedCourt), courtId: selectedCourtId }),
                ...(selectedService.id === 'restaurante' && selectedTable && { table: getTableName(selectedTable), tableId: selectedTable, partySize }),
              }}
            />
          )}

          {/* Botón de confirmar */}
          <View style={styles.confirmButton}>
            <Button
              text={messages.CONTAINER.CONFIRM_RESERVATION}
              onPress={confirmReservation}
              disabled={!date || !time ||
                (selectedService.id === 'padel' && !selectedCourtId) ||
                (selectedService.id === 'restaurante' && !selectedTable)}
            />
          </View>

          {/* Botón para seleccionar otro servicio */}
          <View style={styles.changeServiceButton}>
            <Button
              text={messages.CONTAINER.OTHER_SELECT}
              variant="outline"
              onPress={resetSelection}
            />
          </View>
          {/* Modal de confirmación */}
          <ConfirmationModal
            visible={showConfirmationModal}
            onClose={() => {
              setShowConfirmationModal(false);
              resetSelection();
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Si no hay servicio seleccionado, mostrar la vista principal con Mis Reservas y Nueva Reservación
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        
        <MyReservationsSection
          reservations={reservations}
          loading={loadingReservations}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onReservationPress={openReservationModal}
        />

        {/* Nueva Reserva Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.gray900, marginBottom: 15 }}>
            Nueva Reservación
          </Text>

          {/* Services Grid - 2 per row */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {availableServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onPress={() => handleSelectService(service)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Reservation Detail Modal */}
      <Modal
        visible={showReservationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReservationModal(false)}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setShowReservationModal(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        </TouchableOpacity>
        {selectedReservation && (
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end'
          }}>
            <View style={{
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              maxHeight: '80%'
            }}>
              <View style={{
                width: 40,
                height: 4,
                backgroundColor: COLORS.gray300,
                borderRadius: 2,
                alignSelf: 'center',
                marginBottom: 15
              }} />

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: `${getFacilityColor(selectedReservation.facility.type)}20`,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15
                  }}
                >
                  <Ionicons
                    name={getServiceIcon(selectedReservation.facility.type)}
                    size={24}
                    color={getFacilityColor(selectedReservation.facility.type)}
                  />
                </View>

                <View>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.gray900 }}>
                    {selectedReservation.facility.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: COLORS.gray600 }}>
                    {selectedReservation.facility.type}
                  </Text>
                </View>
              </View>

              <View style={{ marginBottom: 25 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.gray800, marginBottom: 5 }}>
                  Detalles de la Reservación
                </Text>

                <View>
                  <Text style={{ fontSize: 15, color: COLORS.gray700, marginBottom: 8 }}>
                    <Text style={{ fontWeight: '600' }}>Fecha:</Text> {formatDate(selectedReservation.startTime)}
                  </Text>

                  <Text style={{ fontSize: 15, color: COLORS.gray700, marginBottom: 8 }}>
                    <Text style={{ fontWeight: '600' }}>Hora:</Text> {formatTime(selectedReservation.startTime)} - {formatTime(selectedReservation.endTime)}
                  </Text>

                  <Text style={{ fontSize: 15, color: COLORS.gray700 }}>
                    <Text style={{ fontWeight: '600' }}>Duración:</Text> {getDuration(selectedReservation.startTime, selectedReservation.endTime)}
                  </Text>
                </View>
              </View>

              <Button
                text="Cancelar Reservación"
                variant="danger"
                onPress={() => {
                  Alert.alert(
                    'Confirmar cancelación',
                    `¿Estás seguro de que deseas cancelar la reservación para ${selectedReservation.facility.name} el día ${formatDate(selectedReservation.startTime)} a las ${formatTime(selectedReservation.startTime)}?`,
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Confirmar',
                        style: 'destructive',
                        onPress: () => handleCancelReservation(
                          selectedReservation.id,
                          selectedReservation.startTime,
                          selectedReservation.endTime
                        )
                      }
                    ]
                  );
                }}
              />

              <TouchableOpacity
                style={{
                  marginTop: 10,
                  padding: 10,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLORS.gray200,
                  borderRadius: 8
                }}
                onPress={() => setShowReservationModal(false)}
              >
                <Text style={{ fontSize: 16, color: COLORS.gray600 }}>
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default ReservationsContainer;