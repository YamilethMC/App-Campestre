// hooks/useEvents.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { eventsService } from '../service/eventsService';
import { useEventStore } from '../store/useEventStore';
import { Guest, Member } from '../interfaces/eventInterface';

export const useEvents = () => {
  const { userId } = useAuthStore();
  const {
    events,
    loading,
    error,
    setEvents,
    setLoading,
    setError,
    updateEvent,
    pagination,
    setPagination,
    searchQuery: storeSearchQuery,
    selectedEventType: storeSelectedEventType,
    selectedDate: storeSelectedDate,
    setSearchQuery: setStoreSearchQuery,
    setSelectedEventType: setStoreSelectedEventType,
    setSelectedDate: setStoreSelectedDate,
    resetEvents
  } = useEventStore();

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = useState(storeSearchQuery);
  const [selectedEventType, setSelectedEventType] = useState(storeSelectedEventType);
  const [selectedDate, setSelectedDate] = useState(storeSelectedDate);

  // States for member selection flow
  const [members, setMembers] = useState<Member[]>([]);
  const [memberLoading, setMemberLoading] = useState<boolean>(false);
  const [memberError, setMemberError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Referencia para evitar múltiples ejecuciones
  const isInitialLoad = useRef(true);
  const fetchRef = useRef(false);

  const eventTypes = ['Todos', 'SOCIAL', 'SPORT', 'FAMILY', 'OTHER', 'Deportivo', 'Social', 'Familiar', 'Fitness'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Fetch events with pagination
  const fetchEvents = useCallback(async (page: number = 1) => {
    // Evitar múltiples ejecuciones simultáneas
    if (fetchRef.current) return;
    
    fetchRef.current = true;
    try {
      // Format the date as 'yyyy-mm'
      const dateParam = selectedDate || `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`;
      const eventTypeParam = selectedEventType === 'Todos' ? '' : selectedEventType;
      
      const result = await eventsService.getEvents(
        page,
        searchQuery,
        eventTypeParam,
        dateParam
      );
      
      setEvents(result.events);
      setPagination({
        page: result.meta.page,
        limit: result.meta.limit,
        total: result.meta.total,
        totalPages: result.meta.totalPages,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los eventos';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      console.error(err);
    } finally {
      fetchRef.current = false;
    }
  }, [searchQuery, selectedEventType, selectedDate, currentMonth, currentYear, setEvents, setError, setPagination]);

  // Fetch events only once on initial load
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      fetchEvents(1);
    }
  }, [fetchEvents]);

  // Event registration handlers
  const registerForEvent = useCallback(async (eventId: string) => {
    if (!userId) {
      Alert.alert('Error', 'Usuario no autenticado');
      return { success: false, error: 'Usuario no autenticado' };
    }

    try {
      const result = await eventsService.registerForEvent(eventId, userId);
      
      // Actualizar directamente el evento en la lista con los nuevos valores
      updateEvent(eventId, {
        availableSpots: result.availableSpots,
        ocupedSpots: (events.find(e => e.id === eventId)?.totalSpots || 0) - result.availableSpots,
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrarse';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [userId, events, updateEvent, setError]);

  const unregisterFromEvent = useCallback(async (eventId: string) => {
    if (!userId) {
      Alert.alert('Error', 'Usuario no autenticado');
      return { success: false, error: 'Usuario no autenticado' };
    }

    try {
      await eventsService.unregisterFromEvent(eventId, userId);
      
      // Actualizar directamente el evento en la lista con los nuevos valores
      const currentEvent = events.find(e => e.id === eventId);
      if (currentEvent) {
        updateEvent(eventId, {
          availableSpots: currentEvent.availableSpots + 1,
          ocupedSpots: currentEvent.ocupedSpots - 1,
        });
      }
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cancelar registro';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [userId, events, updateEvent, setError]);

  // Navigation
  const goToPreviousMonth = useCallback(() => {
    const prevDate = new Date(currentYear, currentMonth - 1, 1);
    const newMonth = prevDate.getMonth();
    const newYear = prevDate.getFullYear();
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    
    // Update the selected date to reflect the new month
    const newDate = `${newYear}-${(newMonth + 1).toString().padStart(2, '0')}`;
    setSelectedDate(newDate);
    setStoreSelectedDate(newDate);
    
    // Fetch new events for the selected month but don't reset pagination
    fetchEvents(1);
  }, [currentMonth, currentYear, setSelectedDate, setStoreSelectedDate, fetchEvents]);

  const goToNextMonth = useCallback(() => {
    const nextDate = new Date(currentYear, currentMonth + 1, 1);
    const newMonth = nextDate.getMonth();
    const newYear = nextDate.getFullYear();
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    
    // Update the selected date to reflect the new month
    const newDate = `${newYear}-${(newMonth + 1).toString().padStart(2, '0')}`;
    setSelectedDate(newDate);
    setStoreSelectedDate(newDate);
    
    // Fetch new events for the selected month but don't reset pagination
    fetchEvents(1);
  }, [currentMonth, currentYear, setSelectedDate, setStoreSelectedDate, fetchEvents]);

  // Pagination functions
  const fetchNextPage = useCallback(async () => {
    if (pagination.page < pagination.totalPages) {
      await fetchEvents(pagination.page + 1);
    }
  }, [pagination, fetchEvents]);

  const fetchPreviousPage = useCallback(async () => {
    if (pagination.page > 1) {
      await fetchEvents(pagination.page - 1);
    }
  }, [pagination, fetchEvents]);

  const goToPage = useCallback(async (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      await fetchEvents(page);
    }
  }, [pagination, fetchEvents]);

  // Utility functions
  const checkIfRegistered = useCallback((eventId: string): boolean => {
    // Consider the user as registered if there are fewer available spots than total spots
    const event = events.find(e => e.id === eventId);
    if (!event) return false;
    return event.availableSpots < event.totalSpots;
  }, [events]);

  const hasEventsThisMonth = events.length > 0;

  const hasFutureMonths = () => {
    const currentDate = new Date();
    const currentMonthYear = currentDate.getMonth() + currentDate.getFullYear() * 12;
    const thisMonthYear = currentMonth + currentYear * 12;
    return thisMonthYear >= currentMonthYear;
  };

  const isAfterCurrentMonth = () => {
    const currentDate = new Date();
    const currentMonthYear = currentDate.getMonth() + currentDate.getFullYear() * 12;
    const thisMonthYear = currentMonth + currentYear * 12;
    return thisMonthYear > currentMonthYear;
  };

  // Update search and type filters with debouncing
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setStoreSearchQuery(query);
    // Reset to page 1 when search changes and fetch new data
    fetchEvents(1);
  }, [setStoreSearchQuery, fetchEvents]);

  const handleEventTypeChange = useCallback((type: 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness' | 'SOCIAL' | 'SPORT' | 'FAMILY' | 'OTHER') => {
    // Convertir los nombres antiguos a los nuevos tipos del store
    const storeType = type === 'Deportivo' ? 'SPORT' :
              type === 'Social' ? 'SOCIAL' :
              type === 'Familiar' ? 'FAMILY' :
              type === 'Fitness' ? 'OTHER' :
              type === 'Todos' ? 'Todos' :
              type === 'SOCIAL' ? 'SOCIAL' :
              type === 'SPORT' ? 'SPORT' :
              type === 'FAMILY' ? 'FAMILY' : 'OTHER';

    setSelectedEventType(storeType as 'Todos' | 'SOCIAL' | 'SPORT' | 'FAMILY' | 'OTHER');
    setStoreSelectedEventType(storeType as 'Todos' | 'SOCIAL' | 'SPORT' | 'FAMILY' | 'OTHER');
    // Reset to page 1 when changing filters and fetch new data
    fetchEvents(1);
  }, [setStoreSelectedEventType, fetchEvents]);

  // Member selection functions
  // Fetch members from API
  const fetchMembers = useCallback(async (search: string = '') => {
    setMemberLoading(true);
    setMemberError(null);

    try {
      const response = await eventsService.getMembers(
        1, 10, search, 'name', true
      );

      if (response.success && response.data) {
        // Transform the API response to match our Member interface
        // Filter to only include members who have a memberCode (socios)
        const filteredMembers = (response.data.members || []).filter(m => m.memberCode !== null);
        const transformedMembers = filteredMembers.map(member => ({
          id: member.id,
          memberCode: member.memberCode,
          name: member.user.name,
          lastName: member.user.lastName,
          guests: [] // Will be populated when user selects the member
        }));

        setMembers(transformedMembers);
      } else {
        setMemberError(response.error || 'Error al cargar socios');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setMemberError(errorMessage);
    } finally {
      setMemberLoading(false);
    }
  }, []);

  // Fetch member details and guests
  const fetchMemberDetails = useCallback(async (memberId: number) => {
    try {
      const response = await eventsService.getMemberById(memberId);

      if (response.success && response.data) {
        // Update the selected member with guests
        const updatedMember: Member = {
          id: response.data.id,
          memberCode: response.data.memberCode,
          name: response.data.user.name,
          lastName: response.data.user.lastName,
          guests: response.data.guests.map(guest => ({
            id: guest.id,
            name: guest.user.name,
            lastName: guest.user.lastName
          }))
        };

        setSelectedMember(updatedMember);
        // Reset selected guests when changing member
        setSelectedGuests([]);
      } else {
        setMemberError(response.error || 'Error al cargar detalles del socio');
        Alert.alert('Error', response.error || 'Error al cargar detalles del socio');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setMemberError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  }, []);

  // Select a member
  const selectMember = useCallback((member: Member) => {
    setSelectedMember(member);
    // Reset selected guests when changing member
    setSelectedGuests([]);
  }, []);

  // Toggle guest selection
  const toggleGuestSelection = useCallback((guest: Guest) => {
    setSelectedGuests(prev => {
      const isAlreadySelected = prev.some(g => g.id === guest.id);

      if (isAlreadySelected) {
        // Deselect the guest
        return prev.filter(g => g.id !== guest.id);
      } else {
        // Select the guest
        return [...prev, guest];
      }
    });
  }, []);

  // Register for event
  const registerForEventWithMembers = useCallback(async (
    eventId: string,
    clubMemberId: number,
    totalRegistrations: number
  ) => {
    try {
      const response = await eventsService.registerForEventWithMembers(
        eventId,
        clubMemberId,
        totalRegistrations
      );

      if (!response.success) {
        if (response.error) {
          Alert.alert('Error', response.error);
        }
        return response;
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      Alert.alert('Error', errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    // State
    events,
    loading: loading && fetchRef.current, // Show loading only when fetch is in progress
    error,
    currentMonth,
    currentYear,
    searchQuery,
    selectedEventType,
    eventTypes,
    monthNames,
    hasEventsThisMonth,
    hasFutureMonths: hasFutureMonths(),
    isAfterCurrentMonth: isAfterCurrentMonth(),
    displayMonth: `${monthNames[currentMonth]} de ${currentYear}`,
    pagination,

    // Member selection state
    members,
    memberLoading,
    memberError,
    selectedMember,
    selectedGuests,
    searchTerm,
    setSearchTerm,

    // Actions
    setSearchQuery: handleSearchChange,
    setSelectedEventType: handleEventTypeChange,
    goToPreviousMonth,
    goToNextMonth,
    registerForEvent,
    unregisterFromEvent,
    checkIfRegistered,
    fetchEvents,
    fetchNextPage,
    fetchPreviousPage,
    goToPage,

    // Member selection actions
    fetchMembers,
    fetchMemberDetails,
    selectMember,
    toggleGuestSelection,
    registerForEventWithMembers,
  };
};