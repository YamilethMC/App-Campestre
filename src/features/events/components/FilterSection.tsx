import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

interface FilterSectionProps {
  selectedEventType: 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness';
  onEventTypeChange: (type: 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness') => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedEventType,
  onEventTypeChange,
}) => {
  const eventTypes = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Deportivo', label: 'Deportivo' },
    { value: 'Social', label: 'Social' },
    { value: 'Familiar', label: 'Familiar' },
    { value: 'Fitness', label: 'Fitness' },
  ];

  // Dividir los filtros en dos filas
  const firstRow = eventTypes.slice(0, 3);
  const secondRow = eventTypes.slice(3);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map((eventType) => (
          <TouchableOpacity
            key={eventType.value}
            style={[
              styles.filterButton,
              selectedEventType === eventType.value && styles.activeFilterButton,
            ]}
            onPress={() => onEventTypeChange(eventType.value as 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness')}
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
        {secondRow.map((eventType) => (
          <TouchableOpacity
            key={eventType.value}
            style={[
              styles.filterButton,
              selectedEventType === eventType.value && styles.activeFilterButton,
            ]}
            onPress={() => onEventTypeChange(eventType.value as 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness')}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 8,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.gray700,
    textAlign: 'center',
  },
  activeFilterButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default FilterSection;