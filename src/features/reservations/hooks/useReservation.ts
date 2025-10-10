
import { useState } from 'react';
import { mockRestaurantTables, mockTennisCourts, mockTimeSlots } from '../services/reservationService';
import { useReservationStore } from '../store';

export const useReservation = () => {
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
    
      // Manejar el cambio de fecha, limpiando la hora si la fecha seleccionada está inhabilitada
      const handleDateChange = (newDate: string) => {
        // Verificar si la fecha seleccionada es en el pasado
        const selectedDateObj = new Date(newDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establecer horas a 0 para comparación precisa
        
        const isPastDate = selectedDateObj < today;
        
        if (isPastDate) {
          // Si la fecha es pasada, limpiar la hora seleccionada
          setDate(newDate);
          setTime('');
        } else {
          // Si la fecha es válida, actualizarla normalmente
          setDate(newDate);
          
          // Si la fecha seleccionada es hoy y la hora actual ya pasó, limpiar la hora seleccionada
          const isToday = 
            selectedDateObj.getDate() === today.getDate() &&
            selectedDateObj.getMonth() === today.getMonth() &&
            selectedDateObj.getFullYear() === today.getFullYear();
          
          if(isToday && time) {
            const [hours, minutes] = time.split(':').map(Number);
            const selectedTime = new Date();
            selectedTime.setHours(hours, minutes, 0, 0);
            
            // Si la hora seleccionada ya pasó comparada con la hora actual, limpiarla
            if(selectedTime < new Date()) {
              setTime('');
            }
          }
        }
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

      return {
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
        resetSelection,
      };
}
