import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

// Components
import Button from '../../../shared/components/Button/Button';
import { CalendarComponent } from '../components/CalendarComponent';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { CourtSelector } from '../components/CourtSelector';
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
import { mockServices } from '../services/reservationService';

// My Reservations component
import MyReservationsScreen from '../../my-reservations';

// Store

// Colors
import { COLORS } from '../../../shared/theme/colors';

// Icons
import { Ionicons } from '@expo/vector-icons';

const ReservationsContainer = () => {
  const { messages } = useMessages();
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
    loadTimeSlotsForCourt,
  } = useReservation();

  const [showMyReservations, setShowMyReservations] = useState(false);

  // Si showMyReservations es true, mostrar la pantalla de mis reservaciones
  if (showMyReservations) {
    return (
      <MyReservationsScreen
        navigation={{
          goBack: () => setShowMyReservations(false),
        }}
      />
    );
  }

  // Si no hay servicio seleccionado, mostrar la lista de servicios (solo Padel)
  if (!selectedService) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.questionText}>{messages.CONTAINER.QUESTION}</Text>
          <ScrollView
            contentContainerStyle={styles.servicesContainer}
            showsVerticalScrollIndicator={false}
          >
            {mockServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onPress={() => handleSelectService(service)}
              />
            ))}
          </ScrollView>

          {/* Botón fijo de ver mis reservaciones en la parte inferior */}
          <View style={styles.fixedBottomButton}>
            <Button
              text="Ver mis reservaciones"
              variant="outline"
              onPress={() => setShowMyReservations(true)}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Si hay un servicio seleccionado, mostrar la interfaz de reserva
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Componente de calendario */}
        <CalendarComponent selectedDate={date} onDateChange={handleDateChange} />

        {/* Componente de canchas - Mostrar solo para padel */}
        {selectedService.id === 'padel' && (
          <CourtSelector
            selectedCourt={selectedCourt}
            onCourtChange={courtId => {
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
                <Button variant="icon" text="+" onPress={() => setPartySize(prev => prev + 1)} />
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
            unavailableMessage={
              date && selectedCourt
                ? messages.CONTAINER.NO_HOURS_AVAILABLE
                : 'Debe seleccionar fecha y cancha para mostrar los horarios'
            }
          />
        )}

        {/* Resumen de la reserva */}
        {date && time && (
          <SummaryCard
            serviceName={selectedService.name}
            date={date}
            time={time}
            details={{
              ...(selectedService.id === 'padel' &&
                selectedCourt && { court: getCourtName(selectedCourt), courtId: selectedCourtId }),
              ...(selectedService.id === 'restaurante' &&
                selectedTable && {
                  table: getTableName(selectedTable),
                  tableId: selectedTable,
                  partySize,
                }),
            }}
          />
        )}

        {/* Botón de confirmar */}
        <View style={styles.confirmButton}>
          <Button
            text={messages.CONTAINER.CONFIRM_RESERVATION}
            onPress={confirmReservation}
            disabled={
              !date ||
              !time ||
              (selectedService.id === 'padel' && !selectedCourtId) ||
              (selectedService.id === 'restaurante' && !selectedTable)
            }
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
};

export default ReservationsContainer;
