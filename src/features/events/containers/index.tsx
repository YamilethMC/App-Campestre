import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';
import Button from '../../../shared/components/Button/Button';
import Search from '../../../shared/components/Search/Search';
import { COLORS } from '../../../shared/theme/colors';
import EventCard from '../components/EventCard';
import FilterSection from '../components/FilterSection';
import useMessages from '../hooks/useMessages';
import styles from './Style';

// Hooks
import { useEvents } from '../hooks/useEvents';

const EventsContainer = () => {
  const { messages } = useMessages();
  const { 
    events, 
    registeredEvents, 
    currentMonth,
    currentYear,
    searchQuery,
    selectedEventType,
    eventTypes,
    monthNames,
    displayMonth,
    filteredEvents,
    hasEventsThisMonth,
    hasFutureMonths,
    isAfterCurrentMonth,
    setSearchQuery,
    setSelectedEventType,
    goToPreviousMonth,
    goToNextMonth,
    handleRegister,
    handleUnregister,
    handleToggleReminder,
    fetchEvents, 
    registerForEvent, 
    unregisterFromEvent, 
    toggleReminder,
    
  } = useEvents();
  
  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search
            placeholder={messages.CONTAINER.PLACEHOLDER}
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
          <Text style={styles.eventsTitle}>{messages.CONTAINER.UPCOMINGEVENTS}</Text>
          <Text style={styles.eventsCount}>
            {filteredEvents.length} {filteredEvents.length === 1 ? messages.CONTAINER.TITLESINGULAR : messages.CONTAINER.TITLESINGULAR + "s"}
          </Text>
        </View>

        {hasEventsThisMonth ? (
          <View style={styles.eventsList}>
            {filteredEvents.map((item) => (
              <EventCard
                key={item.id}
                event={item}
                isRegistered={registeredEvents.includes(item.id)}
                onRegister={handleRegister}
                onUnregister={handleUnregister}
                onToggleReminder={handleToggleReminder}
              />
            ))}
          </View>
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>{messages.CONTAINER.NOEVENTSREGISTERED}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default EventsContainer;