import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import { SurveyCategory } from '../interfaces';

interface FilterSectionProps {
  selectedCategory: SurveyCategory;
  selectedStatus: 'activas' | 'completadas';
  onCategoryChange: (category: SurveyCategory) => void;
  onStatusChange: (status: 'activas' | 'completadas') => void;
}

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  filterGroup: {
    marginVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray300,
    marginVertical: 8,
    marginHorizontal: -8, // Extender un poco más allá para compensar el padding
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 8,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 13,
    color: COLORS.gray700,
  },
  activeFilterButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default FilterSection;