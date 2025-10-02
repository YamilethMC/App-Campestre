import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../../store';

const EventsContainer = () => {
  const { events, addReservation } = useStore();
  const { t } = useTranslation();

  const handleReservation = (eventId: string) => {
    addReservation(eventId);
    Alert.alert(t('common.success'), t('events.bookEvent'));
  };

  const renderEvent = ({ item }: { item: any }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDate}>
          {new Date(item.date).toLocaleDateString()} - {item.time}
        </Text>
      </View>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <View style={styles.eventFooter}>
        <Text style={styles.availableSpots}>
          {t('events.availableSpots')}: {item.availableSpots}
        </Text>
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={() => handleReservation(item.id)}
          disabled={item.availableSpots <= 0}
        >
          <Text style={styles.reserveButtonText}>
            {item.availableSpots > 0 ? t('events.bookEvent') : 'Full'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('events.title')}</Text>
        <Text style={styles.subtitle}>{t('events.upcomingEvents')}</Text>

        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.eventsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6B7280',
  },
  eventsList: {
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  eventDate: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 10,
  },
  eventDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availableSpots: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  reserveButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
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