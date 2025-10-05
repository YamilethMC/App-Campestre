import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// Components
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../../shared/components/Button/Button';
import { CalendarComponent } from '../components/CalendarComponent';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { CourtSelector } from '../components/CourtSelector';
import { ServiceCard } from '../components/ServiceCard';
import { SummaryCard } from '../components/SummaryCard';
import { TableSelector } from '../components/TableSelector';
import { TimeSlots } from '../components/TimeSlots';

// Mocks
import { mockRestaurantTables, mockServices, mockTennisCourts, mockTimeSlots } from '../services/reservationService';

// Store
import { useReservationStore } from '../store';

// Colors
import { COLORS } from '../../../shared/theme/colors';

// Icons
import { Ionicons } from '@expo/vector-icons';

const ReservationsContainer = () => {
  // Estados principales
  const [selectedService, setSelectedService] = useState<any>(null);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  
  // Obtener la función para agregar reservas del store
  const { addReservation } = useReservationStore();

  // Manejar la selección de un servicio
  const handleSelectService = (service: any) => {
    setSelectedService(service);
    // Resetear las selecciones anteriores
    setDate('');
    setTime('');
    setSelectedCourt('');
    setSelectedTable('');
  };

  // Obtener canchas disponibles según la fecha y hora seleccionadas
  const getAvailableCourts = () => {
    return mockTennisCourts.filter(court => court.available);
  };

  // Obtener nombre de la cancha por ID
  const getCourtName = (courtId: string) => {
    const court = mockTennisCourts.find(c => c.id === courtId);
    return court ? court.name : '';
  };

  // Obtener nombre de la mesa por ID
  const getTableName = (tableId: string) => {
    const table = mockRestaurantTables.find(t => t.id === tableId);
    return table ? table.name : '';
  };

  // Obtener mesas disponibles según la fecha, hora y número de personas
  const getAvailableTables = () => {
    return mockRestaurantTables.filter(table => 
      table.available && table.capacity >= partySize
    );
  };

  // Verificar si hay horarios disponibles
  const getAvailableTimeSlots = () => {
    // Simular disponibilidad basada en la fecha y el servicio
    // En una implementación real, esto se haría con una API
    if (selectedService?.id === 'tenis') {
      return mockTimeSlots.filter(timeSlot => {
        // Simular que algunos horarios no están disponibles para tenis
        return timeSlot !== '12:00' && timeSlot !== '13:00' && timeSlot !== '19:30';
      });
    } else if (selectedService?.id === 'restaurante') {
      return mockTimeSlots.filter(timeSlot => {
        // Simular que algunos horarios no están disponibles para restaurante
        return timeSlot !== '08:00' && timeSlot !== '08:30' && timeSlot !== '20:30';
      });
    }
    return mockTimeSlots;
  };

  // Confirmar la reserva
  const confirmReservation = () => {
    if (!date || !time || !selectedService) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    // Validar que se hayan seleccionado elementos adicionales si es necesario
    if (selectedService.id === 'tenis' && !selectedCourt) {
      alert('Por favor seleccione una cancha');
      return;
    }
    
    if (selectedService.id === 'restaurante' && !selectedTable) {
      alert('Por favor seleccione una mesa');
      return;
    }

    // Crear objeto de reserva
    const newReservation = {
      id: Date.now().toString(),
      userId: 'current_user', // En una implementación real, se obtendría del store de autenticación
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date,
      time,
      details: {
        ...(selectedService.id === 'tenis' && { court: selectedCourt }), // Usar ID para persistencia
        ...(selectedService.id === 'restaurante' && { table: selectedTable, partySize }), // Usar ID para persistencia
      },
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Agregar la reserva al store
    addReservation(newReservation);
    
    // Mostrar modal de confirmación
    setShowConfirmationModal(true);
  };

  // Reiniciar la selección para hacer una nueva reserva
  const resetSelection = () => {
    setSelectedService(null);
    setDate('');
    setTime('');
    setSelectedCourt('');
    setSelectedTable('');
    setPartySize(2);
  };

  // Si no hay servicio seleccionado, mostrar la lista de servicios
  if (!selectedService) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.questionText}>¿Qué deseas reservar?</Text>
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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={resetSelection} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              Reservar {selectedService.name}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              Detalles de reserva
            </Text>
          </View>
          <View style={styles.rightContainer} />
        </View>
      </View>
      <ScrollView style={styles.container}>
        {/* Componente de calendario */}
        <CalendarComponent 
          selectedDate={date} 
          onDateChange={setDate} 
        />
        
        {/* Componente de horarios */}
        <TimeSlots 
          selectedTime={time}
          onTimeChange={setTime}
          availableTimes={getAvailableTimeSlots()}
          unavailableMessage="No hay disponibilidad de horarios"
        />
        
        {/* Componentes adicionales según el servicio */}
        {selectedService.id === 'tenis' && (
          <CourtSelector
            selectedCourt={selectedCourt}
            onCourtChange={setSelectedCourt}
            courts={getAvailableCourts()}
            unavailableMessage="No hay disponibilidad de canchas"
          />
        )}
        
        {selectedService.id === 'restaurante' && (
          <>
            <View style={styles.numberSelector}>
              <Ionicons name="people-outline" size={24} color={COLORS.gray600} />
              <Text style={styles.label}>Comensales</Text>
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
              unavailableMessage="No hay disponibilidad de mesas"
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
            text="Confirmar Reserva"
            onPress={confirmReservation}
            disabled={!date || !time || 
              (selectedService.id === 'tenis' && !selectedCourt) || 
              (selectedService.id === 'restaurante' && !selectedTable)}
          />
        </View>
        
        {/* Botón para seleccionar otro servicio */}
        <View style={styles.changeServiceButton}>
          <Button
            text="Seleccionar otro servicio"
            variant="outline"
            onPress={resetSelection}
          />
        </View>
      </ScrollView>
      
      {/* Modal de confirmación */}
      <ConfirmationModal
        visible={showConfirmationModal}
        onClose={() => {
          setShowConfirmationModal(false);
          resetSelection();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    width: 50, // Ancho fijo para el botón de atrás
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 1, // Tomar el espacio restante
    alignItems: 'center',
    marginHorizontal: 10, // Espacio adicional
    minWidth: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  rightContainer: {
    width: 50, // Ancho fijo para el espacio derecho
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 20,
    textAlign: 'center',
  },
  servicesContainer: {
    paddingBottom: 20,
  },
  confirmButton: {
    marginVertical: 16,
  },
  changeServiceButton: {
    marginBottom: 20,
  },
  numberSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray700,
    flex: 1,
    marginLeft: 12,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    color: COLORS.gray800,
  },
});

export default ReservationsContainer;