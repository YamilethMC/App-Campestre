import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FilterSectionProps, SurveyCategory } from '../../interfaces';
import styles from './Style';

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}) => {
  const categories = [
    { value: SurveyCategory.ALL, label: 'Todas' },
    { value: SurveyCategory.SERVICES, label: 'Servicios' },
    { value: SurveyCategory.RESTAURANT, label: 'Restaurante' },
    { value: SurveyCategory.SPORTS, label: 'Deportes' },
    { value: SurveyCategory.EVENTS, label: 'Eventos' },
  ];

  const statusOptions = [
    { value: 'activas', label: 'Encuestas activas' },
    { value: 'completadas', label: 'Completadas' },
  ];

  return (
    <View style={styles.container}>
      {/* Category Filters */}
      <View style={styles.filterGroup}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={[
                styles.filterButton,
                selectedCategory === category.value && styles.activeFilterButton,
              ]}
              onPress={() => onCategoryChange(category.value)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCategory === category.value && styles.activeFilterButtonText,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Status Filters */}
      <View style={styles.filterGroup}>
        <View style={styles.statusRow}>
          {statusOptions.map((status) => (
            <TouchableOpacity
              key={status.value}
              style={[
                styles.filterButton,
                selectedStatus === status.value && styles.activeFilterButton,
              ]}
              onPress={() => onStatusChange(status.value as 'activas' | 'completadas')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedStatus === status.value && styles.activeFilterButtonText,
                ]}
              >
                {status.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FilterSection;