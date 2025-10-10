import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native';
import Button from '../../../shared/components/Button/Button';
import Search from '../../../shared/components/Search/Search';
import { COLORS } from '../../../shared/theme/colors';
import EventCard from '../components/EventCard';
import FilterSection from '../components/FilterSection';
import baseStyles from './Style';
// Hooks
import { useEvents } from '../hooks/useEvents';

// Extend the base styles with additional styles
const styles = {
  ...baseStyles,
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  } as ViewStyle,
  loadingText: {
    marginTop: 10,
    color: COLORS.gray800,
  } as TextStyle,
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  } as ViewStyle,
  errorText: {
    color: COLORS.error,
  } as TextStyle,
};

const EventsContainer = () => {
  const {
    events = [],
    loading = false,
    error = null,
    currentMonth = new Date().getMonth(),
    currentYear = new Date().getFullYear(),
    searchQuery = '',
    selectedEventType = 'Todos',
    monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    hasEventsThisMonth = false,
    hasFutureMonths = false,
    isAfterCurrentMonth = false,
    setSearchQuery = (query: string) => {},
    setSelectedEventType = (type: 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness') => {},
    goToPreviousMonth = () => {},
    goToNextMonth = () => {},
    registerForEvent = async (eventId: string) => ({ success: false, error: 'Not implemented' }),
    unregisterFromEvent = async (eventId: string) => ({ success: false, error: 'Not implemented' }),
    checkIfRegistered = (eventId: string) => false,
  } = useEvents();

  const displayMonth = `${monthNames?.[currentMonth] || ''} ${currentYear}`;

  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Cargando eventos...</Text>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error || 'Error al cargar los eventos'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search
          placeholder="Buscar eventos..."
          onSearch={setSearchQuery}
          inputStyle={styles.searchInput}
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
                size={20} 
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
                size={20} 
                color={hasFutureMonths ? COLORS.black : COLORS.gray400} 
              />
            }
          />
        </View>

        <View style={styles.eventsHeader}>
          <Text style={styles.eventsTitle}>Próximos Eventos</Text>
          <Text style={styles.eventsCount}>
            {events?.length || 0} {events?.length === 1 ? 'evento' : 'eventos'}
          </Text>
        </View>

        {events && events.length > 0 ? (
          <View style={styles.eventsList}>
            {events?.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isRegistered={checkIfRegistered(event.id)}
                onRegister={registerForEvent}
                onUnregister={unregisterFromEvent}
                onToggleReminder={() => {}}
              />
            ))}
          </View>
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No hay eventos programados para este mes</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default EventsContainer;