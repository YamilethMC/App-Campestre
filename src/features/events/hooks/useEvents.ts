// hooks/useEvents.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { Guest, Member } from '../interfaces/eventInterface';
import { eventsService } from '../service/eventsService';
import { useEventStore } from '../store/useEventStore';

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
    resetEvents,
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

  // State to track selected participants for registration
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [showRegistrationScreen, setShowRegistrationScreen] = useState<boolean>(false);
  const [currentEventId, setCurrentEventId] = useState<string>('');

  // Referencia para evitar múltiples ejecuciones
  const isInitialLoad = useRef(true);
  const fetchRef = useRef(false);

  const eventTypes = [
    'Todos',
    'SOCIAL',
    'SPORT',
    'FAMILY',
    'OTHER',
    'Deportivo',
    'Social',
    'Familiar',
    'Fitness',
  ];
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  // Fetch events with pagination
  const fetchEvents = useCallback(
    async (page: number = 1) => {
      // Evitar múltiples ejecuciones simultáneas
      if (fetchRef.current) return;

      fetchRef.current = true;
      try {
        // Format the date as 'yyyy-mm'
        const dateParam =
          selectedDate || `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`;
        const eventTypeParam = selectedEventType === 'Todos' ? '' : selectedEventType;

        const result = await eventsService.getEvents(page, searchQuery, eventTypeParam, dateParam);

        if (result.success && result.data) {
          setEvents(result.data.events);
          setPagination({
            page: result.data.meta.page,
            limit: result.data.meta.limit,
            total: result.data.meta.total,
            totalPages: result.data.meta.totalPages,
          });
        } else {
          Alert.alert('Error', result.error || 'Error al cargar los eventos');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar los eventos';
        Alert.alert('Error', errorMessage);
      } finally {
        fetchRef.current = false;
      }
    },
    [
      searchQuery,
      selectedEventType,
      selectedDate,
      currentMonth,
      currentYear,
      setEvents,
      setError,
      setPagination,
    ],
  );

  // Set up auto-refresh every 30 minutes (1800000 ms)
  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      fetchEvents();
    }, 1800000); // 30 minutes = 1800000 ms

    // Initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      fetchEvents(1);
    }

    // Cleanup interval on unmount
    return () => {
      clearInterval(autoRefreshInterval);
    };
  }, [searchQuery, selectedEventType, selectedDate, currentMonth, currentYear, fetchEvents]);

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

  const goToPage = useCallback(
    async (page: number) => {
      if (page >= 1 && page <= pagination.totalPages) {
        await fetchEvents(page);
      }
    },
    [pagination, fetchEvents],
  );

  // Utility functions
  const checkIfRegistered = useCallback(
    (eventId: string): boolean => {
      // Consider the user as registered if there are fewer available spots than total spots
      const event = events.find(e => e.id === eventId);
      if (!event) return false;
      return event.availableSpots < event.totalSpots;
    },
    [events],
  );

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
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setStoreSearchQuery(query);
      // Reset to page 1 when search changes and fetch new data
      fetchEvents(1);
    },
    [setStoreSearchQuery, fetchEvents],
  );

  const handleEventTypeChange = useCallback(
    (
      type:
        | 'Todos'
        | 'Deportivo'
        | 'Social'
        | 'Familiar'
        | 'Fitness'
        | 'SOCIAL'
        | 'SPORT'
        | 'FAMILY'
        | 'OTHER',
    ) => {
      // Convertir los nombres antiguos a los nuevos tipos del store
      const storeType =
        type === 'Deportivo'
          ? 'SPORT'
          : type === 'Social'
            ? 'SOCIAL'
            : type === 'Familiar'
              ? 'FAMILY'
              : type === 'Fitness'
                ? 'OTHER'
                : type === 'Todos'
                  ? 'Todos'
                  : type === 'SOCIAL'
                    ? 'SOCIAL'
                    : type === 'SPORT'
                      ? 'SPORT'
                      : type === 'FAMILY'
                        ? 'FAMILY'
                        : 'OTHER';

      setSelectedEventType(storeType as 'Todos' | 'SOCIAL' | 'SPORT' | 'FAMILY' | 'OTHER');
      setStoreSelectedEventType(storeType as 'Todos' | 'SOCIAL' | 'SPORT' | 'FAMILY' | 'OTHER');
      // Reset to page 1 when changing filters and fetch new data
      fetchEvents(1);
    },
    [setStoreSelectedEventType, fetchEvents],
  );

  // Function to handle opening the registration screen
  const openRegistrationScreen = useCallback((eventId: string, memberId: number) => {
    setCurrentEventId(eventId);
    setShowRegistrationScreen(true);

    // Reset participants selection when opening screen
    setSelectedParticipants([]);
  }, []);

  // Function to handle closing the registration screen
  const closeRegistrationScreen = useCallback(() => {
    setShowRegistrationScreen(false);
    setCurrentEventId('');
    setSelectedParticipants([]);
  }, []);

  // Function to handle registration completion and refresh events
  const handleRegistrationComplete = useCallback(async () => {
    setShowRegistrationScreen(false);
    setCurrentEventId('');
    setSelectedParticipants([]);

    // Refresh events to update registration status
    await fetchEvents(1);
  }, [fetchEvents]);

  // Function to toggle participant selection
  const toggleParticipantSelection = useCallback((id: number) => {
    setSelectedParticipants(prev => {
      if (prev.includes(id)) {
        return prev.filter(participantId => participantId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  // Function to get member details
  const getMemberDetails = useCallback(async (memberId: number) => {
    const result = await eventsService.getMemberDetails(memberId);

    if (result.success && result.data) {
      return result.data;
    } else {
      Alert.alert('Error', result.error || 'Error al cargar los detalles del miembro');
    }
  }, []);

  // Function to register participants to an event
  const registerParticipants = useCallback(
    async (memberId: number, totalRegistrations: number) => {
      const result = await eventsService.registerForEvent(
        currentEventId,
        memberId.toString(),
        totalRegistrations,
      );

      if (result.success) {
        return true;
      } else {
        Alert.alert('Error', result.error || 'Error al registrar en el evento');
        return false;
      }
    },
    [currentEventId],
  );

  // Function to cancel registration from an event
  const cancelRegistration = useCallback(
    async (eventId: string) => {
      const userId = useAuthStore.getState().userId;
      if (!userId) {
        Alert.alert('Error', 'No se pudo obtener el ID de usuario');
        return false;
      }

      const result = await eventsService.cancelEventRegistration(eventId, userId);

      if (result.success) {
        await fetchEvents(1);
        return true;
      } else {
        Alert.alert('Error', result.error || 'Error al cancelar el registro');
        return false;
      }
    },
    [fetchEvents],
  );

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

    // Registration screen state
    showRegistrationScreen,
    setShowRegistrationScreen,
    currentEventId,
    selectedParticipants,
    setSelectedParticipants,

    // Actions
    setSearchQuery: handleSearchChange,
    setSelectedEventType: handleEventTypeChange,
    goToPreviousMonth,
    goToNextMonth,
    checkIfRegistered,
    fetchEvents,
    fetchNextPage,
    fetchPreviousPage,
    goToPage,
    openRegistrationScreen,
    closeRegistrationScreen,
    handleRegistrationComplete,
    toggleParticipantSelection,
    registerParticipants,
    getMemberDetails,
    cancelRegistration,
  };
};
