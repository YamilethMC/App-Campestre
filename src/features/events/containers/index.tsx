import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextStyle,
  View,
  ViewStyle
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
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

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
    setSelectedEventType = (type: any) => {},
    goToPreviousMonth = () => {},
    goToNextMonth = () => {},
    checkIfRegistered = (eventId: string) => false,
    fetchEvents = async (page: number = 1) => {},
    pagination = {
      page: 1,
      totalPages: 1,
      total: 0,
      limit: 10
    },
    fetchNextPage = async () => {},
    fetchPreviousPage = async () => {},
    goToPage = async (page: number) => {},
  } = useEvents();

  const openRegisterScreen = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleRegistrationSuccess = async () => {
    // Refresh events to update the registration status
    await fetchEvents(1);
    setSelectedEventId(null);
  };

  const handleCancelRegistration = () => {
    setSelectedEventId(null);
  };

  const displayMonth = `${monthNames?.[currentMonth] || ''} ${currentYear}`;

  const getVisiblePages = () => {
    const total = pagination.totalPages;
    const current = pagination.page;
    const maxVisible = 6;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = current - Math.floor(maxVisible / 2);
    if (start < 1) start = 1;

    let end = start + maxVisible - 1;
    if (end > total) {
      end = total;
      start = end - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Show loading state
  if (loading && pagination.page === 1) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        {/* Loading indicator removed */}
      </View>
    );
  }

  // Show error state
  if (error && pagination.page === 1) {
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
          onEventTypeChange={setSelectedEventType as (type: 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness' | 'SPORT' | 'SOCIAL' | 'FAMILY' | 'OTHER') => void}
        />

        <View style={styles.monthSelectorContainer}>
          <Button
            variant="outline"
            onPress={goToPreviousMonth}
            disabled={!isAfterCurrentMonth}
            style={styles.navButton}
            icon={
              <Ionicons
                name="chevron-back"
                size={22}
                color={!isAfterCurrentMonth ? COLORS.gray400 : COLORS.primary}
              />
            }
          />

          <Text style={styles.monthDisplay}>{displayMonth}</Text>

          <Button
            variant="outline"
            onPress={goToNextMonth}
            disabled={!hasFutureMonths}
            style={styles.navButton}
            icon={
              <Ionicons
                name="chevron-forward"
                size={22}
                color={!hasFutureMonths ? COLORS.gray400 : COLORS.primary}
              />
            }
          />
        </View>

        <View style={styles.eventsHeader}>
          <Text style={styles.eventsTitle}>Próximos Eventos</Text>
          {/*<Text style={styles.eventsCount}>
            {events?.length || 0} {events?.length === 1 ? 'evento' : 'eventos'}
          </Text>*/}
        </View>

        {events && events.length > 0 ? (
          <View style={styles.eventsList}>
            {events?.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isRegistered={checkIfRegistered(event.id)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No se encontraron eventos</Text>
          </View>
        )}

        {/* Pagination controls - only show if there are pages to display */}
        {pagination.totalPages > 1 && (
          <View style={styles.paginationControlsContainer}>
            <View style={styles.paginationRow}>
              <Button
                icon={<Ionicons name="chevron-back" size={22} color={COLORS.primary} />}
                variant="outline"
                onPress={fetchPreviousPage}
                disabled={pagination.page <= 1}
                style={[
                  styles.paginationArrowButton,
                  pagination.page <= 1 && styles.paginationArrowButtonDisabled
                ]}
              />

              <View style={styles.pageNumbersContainer}>
                {getVisiblePages().map(pageNum => (
                  <Button
                    key={pageNum}
                    text={pageNum.toString()}
                    variant="outline"
                    onPress={() => goToPage(pageNum)}
                    style={[
                      styles.pageNumberButton,
                      pageNum === pagination.page && styles.currentPageButton
                    ]}
                    titleStyle={[
                      styles.pageNumberButtonText,
                      pageNum === pagination.page && styles.currentPageButtonText
                    ]}
                  />
                ))}
              </View>

              <Button
                icon={<Ionicons name="chevron-forward" size={22} color={COLORS.primary} />}
                variant="outline"
                onPress={fetchNextPage}
                disabled={pagination.page >= pagination.totalPages}
                style={[
                  styles.paginationArrowButton,
                  pagination.page >= pagination.totalPages && styles.paginationArrowButtonDisabled
                ]}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default EventsContainer;