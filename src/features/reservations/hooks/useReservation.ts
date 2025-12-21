import { useState } from 'react';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { facilityService, mockRestaurantTables } from '../services/reservationService';
import { useReservationStore } from '../store';

export const useReservation = () => {
  // Estados principales
  const [selectedService, setSelectedService] = useState<any>(null);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [selectedCourtId, setSelectedCourtId] = useState<number | null>(null); // Store the numeric ID
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  // Estados para manejar las instalaciones y horarios
  const [facilities, setFacilities] = useState<any[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState<boolean>(false);

  // Obtener la función para agregar reservas del store
  const { addReservation } = useReservationStore();

  // Manejar la selección de un servicio
  const handleSelectService = async (service: any) => {
    setSelectedService(service);
    // Resetear las selecciones anteriores
    setDate('');
    setTime('');
    setSelectedCourt('');
    setSelectedCourtId(null);
    setSelectedTable('');
    setFacilities([]);
    setAvailableTimeSlots([]);

    // Si el servicio es padel, obtener las canchas
    if (service.id === 'padel') {
      await loadFacilitiesForService(service.id);
    }
  };

  // Cargar las instalaciones para un servicio específico
  const loadFacilitiesForService = async (serviceType: string) => {
    setLoading(true);

    // Obtener el ID del miembro del store de autenticación
    const memberInfo = useAuthStore.getState();
    const clubMemberId = memberInfo.userId ? parseInt(memberInfo.userId) : 1; // Default to 1 if needed

    const response = await facilityService.getFacilities({
      page: 1,
      limit: 10,
      type: serviceType.toUpperCase(), // Convert to uppercase as per your requirement
      status: 'ACTIVE',
      orderBy: 'name',
    });

    if (response.success && response.data) {
      setFacilities(response.data.data);
    } else {
      alert(response.error || 'No se encontraron instalaciones');
    }

    setLoading(false);
  };

  // Manejar el cambio de fecha, limpiando la hora si la fecha seleccionada está inhabilitada
  const handleDateChange = (newDate: string) => {
    // Si hay una cancha seleccionada y la nueva fecha es hoy, verificar si la cancha ya cerró
    if (selectedCourtId && selectedCourt) {
      const selectedDateObj = new Date(newDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Establecer horas a 0 para comparación precisa

      const isToday =
        selectedDateObj.getDate() === today.getDate() &&
        selectedDateObj.getMonth() === today.getMonth() &&
        selectedDateObj.getFullYear() === today.getFullYear();

      // Si es hoy, necesitamos verificar si la cancha ya cerró
      if (isToday) {
        // Buscar la cancha seleccionada para ver su hora de cierre
        const facility = facilities.find(f => f.id === selectedCourtId);
        if (facility && facility.closeTime) {
          const closeTime = facility.closeTime.substring(0, 5); // HH:MM format
          const [closeHours, closeMinutes] = closeTime.split(':').map(Number);
          const closeDateTime = new Date();
          closeDateTime.setHours(closeHours, closeMinutes, 0, 0);

          // Si la hora actual es mayor a la hora de cierre, deseleccionar la cancha
          if (new Date() > closeDateTime) {
            setSelectedCourt('');
            setSelectedCourtId(null);
            setTime('');
            alert(`La cancha cierra a las ${closeTime}`);
            setDate(newDate);
            return;
          }
        }
      }
    }

    setDate(newDate);

    // Si ya tenemos seleccionada una cancha, cargar los horarios disponibles para esta fecha y cancha
    if (selectedCourtId) {
      loadTimeSlotsForCourt(selectedCourtId, newDate);
    }
  };

  // Obtener canchas disponibles (from API now)
  const getAvailableCourts = () => {
    // Si no hay fecha seleccionada, todas las canchas están disponibles
    if (!date) {
      return facilities.map(facility => ({
        id: facility.id.toString(), // Convert to string to match UI component expectations
        name: facility.name,
        available: true, // All facilities are available if no date is selected
      }));
    }

    // Si hay fecha seleccionada, verificar si es hoy y si ya pasó la hora de cierre
    const selectedDateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer horas a 0 para comparación precisa

    const isToday =
      selectedDateObj.getDate() === today.getDate() &&
      selectedDateObj.getMonth() === today.getMonth() &&
      selectedDateObj.getFullYear() === today.getFullYear();

    // Si es hoy, deshabilitar las canchas que ya cerraron
    if (isToday) {
      return facilities.map(facility => {
        const closeTime = facility.closeTime.substring(0, 5); // HH:MM format
        const [closeHours, closeMinutes] = closeTime.split(':').map(Number);
        const closeDateTime = new Date();
        closeDateTime.setHours(closeHours, closeMinutes, 0, 0);

        // Si la hora actual es mayor o igual a la hora de cierre, la cancha no está disponible
        const isClosed = new Date() >= closeDateTime;

        return {
          id: facility.id.toString(),
          name: facility.name,
          available: !isClosed,
        };
      });
    }

    // Si no es hoy, todas las canchas estan disponibles
    return facilities.map(facility => ({
      id: facility.id.toString(),
      name: facility.name,
      available: true,
    }));
  };

  // Obtener nombre de la cancha por ID
  const getCourtName = (courtId: string) => {
    const facility = facilities.find(f => f.id.toString() === courtId);
    return facility ? facility.name : '';
  };

  // Obtener nombre de la mesa por ID
  const getTableName = (tableId: string) => {
    const table = mockRestaurantTables.find(t => t.id === tableId);
    return table ? table.name : '';
  };

  // Obtener mesas disponibles según la fecha, hora y número de personas
  const getAvailableTables = () => {
    return mockRestaurantTables.filter(table => table.available && table.capacity >= partySize);
  };

  // Cargar los horarios disponibles para una cancha y fecha específica
  const loadTimeSlotsForCourt = async (courtId: number, date: string) => {
    if (!courtId || !date) {
      setAvailableTimeSlots([]);
      return;
    }

    setLoadingTimeSlots(true);
    const response = await facilityService.getFacilityAvailability(courtId, date);

    if (response.success && response.data) {
      // Extraer los horarios disponibles de la respuesta
      const availableSlots = response.data.availableSlots || [];
      const reservedSlots = response.data.reservedSlots || [];

      // Convertir horarios disponibles a strings
      const availableTimeSlots = availableSlots.map(
        (slot: any) => `${slot.startTime.substring(0, 5)}-${slot.endTime.substring(0, 5)}`,
      );

      // Convertir horarios reservados a strings
      const reservedTimeSlots = reservedSlots.map(
        (slot: any) => `${slot.startTime.substring(0, 5)}-${slot.endTime.substring(0, 5)}`,
      );

      // Combinar disponibles con reservados y excluir los reservados
      let timeSlotStrings = availableTimeSlots;

      // Si hay horarios reservados, excluirlos de la lista
      if (reservedSlots.length > 0) {
        timeSlotStrings = availableTimeSlots.filter(
          timeSlot => !reservedTimeSlots.includes(timeSlot),
        );
      }

      // Si es la fecha actual, filtrar también por hora actual
      const selectedDateObj = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Establecer horas a 0 para comparación precisa

      const isToday =
        selectedDateObj.getDate() === today.getDate() &&
        selectedDateObj.getMonth() === today.getMonth() &&
        selectedDateObj.getFullYear() === today.getFullYear();

      if (isToday) {
        const currentTime = new Date();
        timeSlotStrings = timeSlotStrings.filter(timeString => {
          const [startTime] = timeString.split('-');
          const [hours, minutes] = startTime.split(':').map(Number);
          const slotTime = new Date();
          slotTime.setHours(hours, minutes, 0, 0);

          // Solo mantener horarios que aún no han pasado
          return slotTime > currentTime;
        });
      }

      setAvailableTimeSlots(timeSlotStrings);
    } else {
      console.error('Error loading time slots:', response.error);
      alert(response.error || 'No se encontraron horarios disponibles');
    }

    setLoadingTimeSlots(false);
  };

  // Verificar si hay horarios disponibles
  const getAvailableTimeSlots = () => {
    // Solo mostrar horarios si ya se seleccionó una cancha y una fecha
    if (!date || !selectedCourtId) {
      return []; // Return empty array to show "Debe seleccionar fecha y cancha para mostrar los horarios"
    }

    return availableTimeSlots;
  };

  function toUTC(localDateTime: string) {
    const date = new Date(localDateTime);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
  }

  // Confirmar la reserva
  const confirmReservation = async () => {
    if (!date || !time || !selectedService) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    // Validar que se hayan seleccionado elementos adicionales si es necesario
    if (selectedService.id === 'padel' && !selectedCourtId) {
      alert('Por favor seleccione una cancha');
      return;
    }

    if (selectedService.id === 'restaurante' && !selectedTable) {
      alert('Por favor seleccione una mesa');
      return;
    }

    // Extraer hora de inicio y fin del time seleccionado (formato "HH:MM-HH:MM")
    if (!time.includes('-')) {
      alert('Formato de hora inválido');
      return;
    }
    const fixedDate = new Date(date);
    fixedDate.setDate(fixedDate.getDate() - 1);
    const [startTimePart, endTimePart] = time.split('-');
    const startTimeISO = `${fixedDate.toISOString().split('T')[0]}T${startTimePart}:00Z`;
    const endTimeISO = `${fixedDate.toISOString().split('T')[0]}T${endTimePart}:00Z`;

    try {
      // Obtener el ID del miembro del store de autenticación
      const memberInfo = useAuthStore.getState();
      const clubMemberId = memberInfo.userId ? parseInt(memberInfo.userId) : 1; // Default to 1 if needed

      if (!memberInfo.userId) {
        alert('No se pudo obtener el ID del miembro. Por favor inicie sesión.');
        return;
      }

      // Si es Padel, usar el servicio de reservas para instalaciones
      if (selectedService.id === 'padel' && selectedCourtId) {
        const reservationData = {
          startTime: startTimeISO,
          endTime: endTimeISO,
        };
        const response = await facilityService.createReservation(
          selectedCourtId,
          clubMemberId,
          reservationData,
        );
        if (response.success) {
          // Crear objeto de reserva para almacenar localmente
          const newReservation = {
            id: response.data.id.toString(),
            userId: memberInfo.userId || 'unknown', // Provide fallback if userId is null
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            date,
            time: `${startTimePart}-${endTimePart}`, // Store as HH:MM-HH:MM format
            details: {
              court: selectedCourt, // Store court name
              courtId: selectedCourtId,
            },
            status: response.data.status || 'confirmed',
            createdAt: response.data.createdAt || new Date().toISOString(),
            updatedAt: response.data.updatedAt || new Date().toISOString(),
          };

          // Agregar la reserva al store
          addReservation(newReservation);

          // Mostrar modal de confirmación
          setShowConfirmationModal(true);
        } else {
          alert(response.message || 'Error al confirmar la reserva');
        }
      }
    } catch (error: any) {
      console.error('Error confirming reservation:', error);
      alert(error.message || 'Error al confirmar la reserva');
    }
  };

  // Reiniciar la selección para hacer una nueva reserva
  const resetSelection = () => {
    setSelectedService(null);
    setDate('');
    setTime('');
    setSelectedCourt('');
    setSelectedCourtId(null);
    setSelectedTable('');
    setPartySize(2);
    setFacilities([]);
    setAvailableTimeSlots([]);
  };

  return {
    selectedService,
    date,
    time,
    selectedCourt,
    selectedCourtId, // Add selectedCourtId to the return
    selectedTable,
    partySize,
    showConfirmationModal,
    facilities, // Add facilities to the return
    availableTimeSlots, // Add availableTimeSlots to the return
    loading, // Add loading state to the return
    loadingTimeSlots, // Add loadingTimeSlots to the return
    setTime,
    setSelectedCourt,
    setSelectedCourtId, // Add setSelectedCourtId to the return
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
  };
};
