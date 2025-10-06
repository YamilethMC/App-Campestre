import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Text,
  View
} from 'react-native';
import Button from '../../../shared/components/Button/Button';
import Search from '../../../shared/components/Search/Search';
import { COLORS } from '../../../shared/theme/colors';
import { useStore } from '../../../store';
import EventCard from '../components/EventCard';
import FilterSection from '../components/FilterSection';
import styles from './Style';

const EventsContainer = () => {
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

  return (
    <View style={styles.container}>
      {/*<View style={styles.headerSection}>
        <View style={styles.headerIcon}>
          <Ionicons name="calendar-outline" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.headerTitle}>Calendario de Eventos</Text>
        <Text style={styles.headerDescription}>
          Descubre y regístrate a nuestras actividades
        </Text>
      </View>*/}
      <View style={styles.searchContainer}>
        <Search
          placeholder="Buscar eventos..."
          onSearch={setSearchQuery}
          inputStyle={styles.searchInput}
        />
      </View>

      <FilterSection
        selectedEventType={selectedEventType}
        onEventTypeChange={setSelectedEventType}
      />

      <View style={styles.monthSelectorContainer}>
        <Button
          variant="icon"
          onPress={goToPreviousMonth}
          disabled={!isAfterCurrentMonth}
          style={styles.navButton}
          icon={
            <Ionicons 
              name="chevron-back-outline" 
              size={9.5} 
              color={isAfterCurrentMonth ? COLORS.black : COLORS.gray400} 
            />
          }
        />
        
        <Text style={styles.monthDisplay}>{displayMonth}</Text>
        
        <Button
          variant="icon"
          onPress={goToNextMonth}
          disabled={!hasFutureMonths}
          style={styles.navButton}
          icon={
            <Ionicons 
              name="chevron-forward-outline" 
              size={9.5} 
              color={hasFutureMonths ? COLORS.black : COLORS.gray400} 
            />
          }
        />
      </View>

      <View style={styles.eventsHeader}>
        <Text style={styles.eventsTitle}>Próximos Eventos</Text>
        <Text style={styles.eventsCount}>{filteredEvents.length} {filteredEvents.length === 1 ? "evento" : "eventos"}</Text>
      </View>

      {hasEventsThisMonth ? (
        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              isRegistered={registeredEvents.includes(item.id)}
              onRegister={handleRegister}
              onUnregister={handleUnregister}
              onToggleReminder={handleToggleReminder}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.eventsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noEventsContainer}>
              <Text style={styles.noEventsText}>No hay eventos registrados todavía</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No hay eventos registrados todavía</Text>
        </View>
      )}
    </View>
  );
};

export default EventsContainer;