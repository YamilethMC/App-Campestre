import React from 'react';
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
    selectedTable,
    partySize,
    showConfirmationModal,
    setTime,
    setSelectedCourt,
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
    resetSelection
  } = useReservation();
 
  // Si no hay servicio seleccionado, mostrar la lista de servicios
  if (!selectedService) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.questionText}>{messages.CONTAINER.QUESTION}</Text>
          <ScrollView contentContainerStyle={styles.servicesContainer}>
            {mockServices.map((service) => (
              <ServiceCard 
                key={service.id}
                service={service}
                onPress={() => handleSelectService(service)}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // Si hay un servicio seleccionado, mostrar la interfaz de reserva
  return (
    <SafeAreaView style={styles.safeArea}>
        
      <ScrollView style={styles.container}>
        {/* Componente de calendario */}
        <CalendarComponent 
          selectedDate={date} 
          onDateChange={handleDateChange} 
        />
        
        {/* Componente de horarios */}
        <TimeSlots 
          selectedTime={time}
          onTimeChange={setTime}
          availableTimes={getAvailableTimeSlots()}
          selectedDate={date}
          unavailableMessage={messages.CONTAINER.NO_HOURS_AVAILABLE}
        />
        
        {/* Componentes adicionales según el servicio */}
        {selectedService.id === 'tenis' && (
          <CourtSelector
            selectedCourt={selectedCourt}
            onCourtChange={setSelectedCourt}
            courts={getAvailableCourts()}
            unavailableMessage={messages.CONTAINER.NO_COURTS_AVAILABLE}
          />
        )}
        
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
        
        {/* Resumen de la reserva */}
        {(date && time) && (
          <SummaryCard
            serviceName={selectedService.name}
            date={date}
            time={time}
            details={{
              ...(selectedService.id === 'tenis' && selectedCourt && { court: getCourtName(selectedCourt), courtId: selectedCourt }),
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
              (selectedService.id === 'tenis' && !selectedCourt) || 
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
};

export default ReservationsContainer;