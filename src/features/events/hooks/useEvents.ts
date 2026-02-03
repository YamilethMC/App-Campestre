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
    refreshing,
    error,
    setEvents,
    setLoading,
    setRefreshing,
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
    // Cache management
    markFetched,
    isCacheValid,
    // Advanced filters
    availableOnly,
    popularitySort,
    startDateFilter,
    endDateFilter,
    setAvailableOnly,
    setPopularitySort,
    setDateRange,
    resetFilters
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

  const eventTypes = ['Todos', 'SOCIAL', 'SPORT', 'FAMILY', 'OTHER', 'Deportivo', 'Social', 'Familiar', 'Fitness'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Fetch events with pagination and stale-while-revalidate pattern
  const fetchEvents = useCallback(async (
    page: number = 1,
    forceRefresh: boolean = false,
    overrideEventType?: 'Todos' | 'SOCIAL' | 'SPORT' | 'FAMILY' | 'OTHER'
  ) => {
    // Evitar múltiples ejecuciones simultáneas
    if (fetchRef.current) return;

    // Check cache validity - if valid and not forcing refresh, skip fetch
    const cacheValid = isCacheValid();
    if (!overrideEventType && cacheValid && !forceRefresh && events.length > 0) {
      // Cache is valid and we have data, use cached data
      return;
    }

    fetchRef.current = true;
    
    // If we have cached data, show it while refreshing in background
    const hasExistingData = events.length > 0;
    if (hasExistingData && !forceRefresh) {
      setRefreshing(true); // Background refresh indicator
    } else {
      setLoading(true); // Full loading state
    }
    
    try {
      // Format the date as 'yyyy-mm'
      const dateParam = selectedDate || `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`;
      const requestedEventType = overrideEventType ?? selectedEventType;
      const eventTypeParam = requestedEventType === 'Todos' ? '' : requestedEventType;

      const result = await eventsService.getEvents(
        page,
        searchQuery,
        eventTypeParam,
        dateParam,
        availableOnly,
        popularitySort,
        startDateFilter,
        endDateFilter
      );

      if (result.success && result.data) {
        setEvents(result.data.events);
        setPagination({
          page: result.data.meta.page,
          limit: result.data.meta.limit,
          total: result.data.meta.total,
          totalPages: result.data.meta.totalPages,
        });
        markFetched(); // Mark cache as fresh
      } else {
        // Only show error if we don't have cached data
        if (!hasExistingData) {
          setError(result.error || 'Error al cargar los eventos');
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los eventos';
      // Only show error if we don't have cached data
      if (!hasExistingData) {
        setError(errorMessage);
      }
    } finally {
      fetchRef.current = false;
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchQuery, selectedEventType, selectedDate, currentMonth, currentYear, setEvents, setError, setPagination, setLoading, setRefreshing, markFetched, isCacheValid, events.length, availableOnly, popularitySort, startDateFilter, endDateFilter]);

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
    fetchEvents(1, false, storeType as 'Todos' | 'SOCIAL' | 'SPORT' | 'FAMILY' | 'OTHER');
  }, [setStoreSelectedEventType, fetchEvents]);

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

    // Force refresh events to update registration status, bypassing cache
    await fetchEvents(1, true);
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
  const registerParticipants = useCallback(async (memberId: number, totalRegistrations: number) => {
    const result = await eventsService.registerForEvent(currentEventId, memberId.toString(), totalRegistrations);

    if (result.success) {
      // Update event locally in store for instant UI feedback
      updateEvent(currentEventId, { 
        isRegistered: true,
        availableSpots: result.data?.availableSpots ?? 0
      });
      return true;
    } else {
      Alert.alert('Error', result.error || 'Error al registrar en el evento');
      return false;
    }
  }, [currentEventId, updateEvent]);

  // Function to cancel registration from an event
  const cancelRegistration = useCallback(async (eventId: string) => {
    const userId = useAuthStore.getState().userId;
    if (!userId) {
      Alert.alert('Error', 'No se pudo obtener el ID de usuario');
      return false;
    }

    const result = await eventsService.cancelEventRegistration(eventId, userId);

    if (result.success) {
      // Update event locally in store for instant UI feedback
      updateEvent(eventId, { 
        isRegistered: false
      });
      // Force refresh events to update registration status, bypassing cache
      await fetchEvents(1, true);
      return true;
    } else {
      Alert.alert('Error', result.error || 'Error al cancelar el registro');
      return false;
    }
  }, [fetchEvents, updateEvent]);

  return {
    // State
    events,
    loading: loading && fetchRef.current, // Show loading only when fetch is in progress
    refreshing, // Background refresh indicator
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
    
    // Advanced filters state
    availableOnly,
    popularitySort,
    startDateFilter,
    endDateFilter,

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
    
    // Advanced filter actions
    setAvailableOnly,
    setPopularitySort,
    setDateRange,
    resetFilters,
  };
};