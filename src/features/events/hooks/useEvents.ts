// hooks/useEvents.ts
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { eventsService } from '../service/eventsService';
import { useEventStore } from '../store/useEventStore';

export const useEvents = () => {
  const { userId } = useAuthStore();
  const { t } = useTranslation();
  const { 
    events = [], 
    loading, 
    error, 
    setEvents, 
    setLoading, 
    setError,
    updateEvent,
    addEvents
  } = useEventStore();
  
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness'>('Todos');
  
  const eventTypes = ['Todos', 'Deportivo', 'Social', 'Familiar', 'Fitness'] as const;
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ] as const;

  // Fetch events on mount
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await eventsService.fetchEvents();
        setEvents(eventsData);
      } catch (err) {
        setError('Error al cargar los eventos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, [setEvents, setLoading, setError]);

  // Filtered and sorted events
  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        const eventMonth = eventDate.getMonth();
        const eventYear = eventDate.getFullYear();
        
        const isCurrentMonth = eventMonth === currentMonth && eventYear === currentYear;
        const matchesSearch = 
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = 
          selectedEventType === 'Todos' || event.eventType === selectedEventType;
        const isNotPast = eventDate >= new Date();
        
        return isCurrentMonth && matchesSearch && matchesType && isNotPast;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, currentMonth, currentYear, searchQuery, selectedEventType]);

  // Event registration handlers
  const registerForEvent = useCallback(async (eventId: string) => {
    if (!userId) return { success: false, error: 'Usuario no autenticado' };
    
    setLoading(true);
    try {
      const updatedEvent = await eventsService.registerForEvent(eventId, userId);
      updateEvent(eventId, {
        registeredUsers: [...(updatedEvent.registeredUsers || [])],
        availableSpots: updatedEvent.availableSpots
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrarse';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [userId, updateEvent, setLoading, setError]);

  const unregisterFromEvent = useCallback(async (eventId: string) => {
    if (!userId) return { success: false, error: 'Usuario no autenticado' };
    
    setLoading(true);
    try {
      const updatedEvent = await eventsService.unregisterFromEvent(eventId, userId);
      updateEvent(eventId, {
        registeredUsers: [...(updatedEvent.registeredUsers || [])],
        availableSpots: updatedEvent.availableSpots
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cancelar registro';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [userId, updateEvent, setLoading, setError]);

  // Navigation
  const goToPreviousMonth = useCallback(() => {
    const prevDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentMonth(prevDate.getMonth());
    setCurrentYear(prevDate.getFullYear());
  }, [currentMonth, currentYear]);

  const goToNextMonth = useCallback(() => {
    const nextDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentMonth(nextDate.getMonth());
    setCurrentYear(nextDate.getFullYear());
  }, [currentMonth, currentYear]);

  // Utility functions
  const checkIfRegistered = useCallback((eventId: string): boolean => {
    if (!userId) return false;
    const event = events.find(e => e.id === eventId);
    return event ? (event.registeredUsers || []).includes(userId) : false;
  }, [events, userId]);

  const hasEventsThisMonth = useMemo(() => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && 
             eventDate.getFullYear() === currentYear;
    });
  }, [events, currentMonth, currentYear]);

  const hasFutureMonths = useMemo(() => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return (eventDate.getFullYear() > currentYear) || 
             (eventDate.getFullYear() === currentYear && 
              eventDate.getMonth() > currentMonth);
    });
  }, [events, currentMonth, currentYear]);

  const isAfterCurrentMonth = (currentYear > new Date().getFullYear()) || 
                            (currentYear === new Date().getFullYear() && 
                             currentMonth > new Date().getMonth());

  return {
    // State
    events: filteredEvents,
    loading,
    error,
    currentMonth,
    currentYear,
    searchQuery,
    selectedEventType,
    eventTypes,
    monthNames,
    hasEventsThisMonth,
    hasFutureMonths,
    isAfterCurrentMonth,
    displayMonth: `${monthNames[currentMonth]} de ${currentYear}`,
    
    // Actions
    setSearchQuery,
    setSelectedEventType,
    goToPreviousMonth,
    goToNextMonth,
    registerForEvent,
    unregisterFromEvent,
    checkIfRegistered,
    fetchEvents: () => {
      setLoading(true);
      eventsService.fetchEvents()
        .then(setEvents)
        .catch(err => setError('Error al cargar eventos'))
        .finally(() => setLoading(false));
    },
    handleToggleReminder: () => {}, // Implement if needed
  };
};