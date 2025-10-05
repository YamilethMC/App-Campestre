import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from '../../../shared/components/Button/Button';
import Search from '../../../shared/components/Search/Search';
import { COLORS } from '../../../shared/theme/colors';
import { useStore } from '../../../store';
import EventCard from '../components/EventCard';
import FilterSection from '../components/FilterSection';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 20,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchContainer: {
    margin: 15,
    marginBottom: 10,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  headerIcon: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.gray800,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  filterButton: {
    marginHorizontal: 4,
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeFilterText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  inactiveFilterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  monthSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthDisplay: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray800,
  },
  eventsCount: {
    fontSize: 16,
    color: COLORS.gray600,
  },
  eventsList: {
    paddingBottom: 20,
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  noEventsText: {
    fontSize: 18,
    color: COLORS.gray500,
    textAlign: 'center',
paddingVertical: 8,
    borderRadius: 6,
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EventsContainer;