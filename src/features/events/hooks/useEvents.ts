
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useStore } from '../../../store';
import useMessages from '../hooks/useMessages';

export const useEvents = () => {
  const { messages } = useMessages();
  const { 
    events, 
    registeredEvents, 
    fetchEvents, 
    registerForEvent, 
    unregisterFromEvent, 
    toggleReminder 
  } = useStore();
  
  const { t } = useTranslation();
  
  // Current month and year state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness'>('Todos');
  
  // Event types filter options
  const eventTypes = ['Todos', 'Deportivo', 'Social', 'Familiar', 'Fitness'];
  
  // Format month and year display
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const displayMonth = `${monthNames[currentMonth]} de ${currentYear}`;
  
  // Filter and sort events by date
  const filteredEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      const eventMonth = eventDate.getMonth();
      const eventYear = eventDate.getFullYear();
      
      // Filter by month and year
      const isCurrentMonth = eventMonth === currentMonth && eventYear === currentYear;
      
      // Filter by search query
      const matchesSearch = 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by event type
      const matchesType = 
        selectedEventType === 'Todos' || event.eventType === selectedEventType;
      
      // Filter out past events (events that occurred before today)
      const isNotPast = eventDate >= new Date();
      
      return isCurrentMonth && matchesSearch && matchesType && isNotPast;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Check if there are events for the current month
  const hasEventsThisMonth = events.some(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  // Check if there are events after current month
  const hasFutureMonths = events.some(event => {
    const eventDate = new Date(event.date);
    return (eventDate.getFullYear() > currentYear) || 
           (eventDate.getFullYear() === currentYear && eventDate.getMonth() > currentMonth);
  });

  // Check if current displayed month is after the actual current month
  const isAfterCurrentMonth = (currentYear > new Date().getFullYear()) || 
                             (currentYear === new Date().getFullYear() && currentMonth > new Date().getMonth());

  // Navigation functions
  const goToPreviousMonth = () => {
    const prevDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentMonth(prevDate.getMonth());
    setCurrentYear(prevDate.getFullYear());
  };

  const goToNextMonth = () => {
    const nextDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentMonth(nextDate.getMonth());
    setCurrentYear(nextDate.getFullYear());
  };

  // Handler functions for registration
  const handleRegister = (eventId: string) => {
    registerForEvent(eventId);
  };

  const handleUnregister = (eventId: string) => {
    unregisterFromEvent(eventId);
  };

  const handleToggleReminder = (eventId: string) => {
    toggleReminder(eventId);
  };
  // Effect to fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    registeredEvents,
    fetchEvents,
    registerForEvent,
    unregisterFromEvent,
    toggleReminder,
    currentMonth,
    currentYear,
    goToPreviousMonth,
    goToNextMonth,
    handleRegister,
    handleUnregister,
    handleToggleReminder,
    filteredEvents,
    hasEventsThisMonth,
    hasFutureMonths,
    isAfterCurrentMonth,
    searchQuery,
    setSearchQuery,
    selectedEventType,
    setSelectedEventType,
    eventTypes,
    monthNames,
    displayMonth,
  };
};