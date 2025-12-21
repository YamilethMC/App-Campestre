import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FilterSectionProps } from '../../interfaces/eventInterface';
import styles from './Style';

const FilterSection: React.FC<FilterSectionProps> = ({ selectedEventType, onEventTypeChange }) => {
  const eventTypes = [
    { value: 'Todos', label: 'Todos' },
    { value: 'SPORT', label: 'Deportivo' }, // Using API format
    { value: 'SOCIAL', label: 'Social' }, // Using API format
    { value: 'FAMILY', label: 'Familiar' }, // Using API format
    { value: 'OTHER', label: 'Otros' }, // Using API format
  ];

  // Dividir los filtros en dos filas
  const firstRow = eventTypes.slice(0, 3);
  const secondRow = eventTypes.slice(3);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map(eventType => (
          <TouchableOpacity
            key={eventType.value}
            style={[
              styles.filterButton,
              selectedEventType === eventType.value && styles.activeFilterButton,
            ]}
            onPress={() =>
              onEventTypeChange(
                eventType.value as 'Todos' | 'SPORT' | 'SOCIAL' | 'FAMILY' | 'OTHER',
              )
            }
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedEventType === eventType.value && styles.activeFilterButtonText,
              ]}
            >
              {eventType.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {secondRow.map(eventType => (
          <TouchableOpacity
            key={eventType.value}
            style={[
              styles.filterButton,
              selectedEventType === eventType.value && styles.activeFilterButton,
            ]}
            onPress={() =>
              onEventTypeChange(
                eventType.value as 'Todos' | 'SPORT' | 'SOCIAL' | 'FAMILY' | 'OTHER',
              )
            }
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedEventType === eventType.value && styles.activeFilterButtonText,
              ]}
            >
              {eventType.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FilterSection;
