import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterSectionProps } from '../../interfaces/eventInterface';
import { COLORS } from '../../../../shared/theme/colors';
import styles from './Style';

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedEventType,
  onEventTypeChange,
}) => {

  const eventTypes = [
    { value: 'Todos', label: 'Todos', icon: 'apps-outline' },
    { value: 'SPORT', label: 'Deportivo', icon: 'football-outline' },
    { value: 'SOCIAL', label: 'Social', icon: 'people-outline' },
    { value: 'FAMILY', label: 'Familiar', icon: 'home-outline' },
    { value: 'OTHER', label: 'Otros', icon: 'ellipsis-horizontal-outline' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.filterGroup}>
        <View style={styles.scrollWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {eventTypes.map((eventType) => {
              const isSelected = selectedEventType === eventType.value;
              return (
                <TouchableOpacity
                  key={eventType.value}
                  style={[
                    styles.filterButton,
                    isSelected && styles.activeFilterButton,
                  ]}
                  onPress={() => onEventTypeChange(eventType.value as 'Todos' | 'SPORT' | 'SOCIAL' | 'FAMILY' | 'OTHER')}
                  accessibilityRole="button"
                  accessibilityLabel={`Filtrar por ${eventType.label}`}
                  accessibilityState={{ selected: isSelected }}
                  activeOpacity={0.7}
                >
                  <View style={styles.filterButtonContent}>
                    <Ionicons 
                      name={eventType.icon as any} 
                      size={16} 
                      color={isSelected ? COLORS.white : COLORS.gray600}
                      style={styles.filterIcon}
                    />
                    <Text
                      style={[
                        styles.filterButtonText,
                        isSelected && styles.activeFilterButtonText,
                      ]}
                    >
                      {eventType.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* Scroll fade indicators */}
          <View style={styles.fadeLeft} pointerEvents="none" />
          <View style={styles.fadeRight} pointerEvents="none" />
        </View>
      </View>
    </View>
  );
};

export default FilterSection;