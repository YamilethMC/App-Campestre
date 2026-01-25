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
    /*{ value: SurveyCategory.ALL, label: 'Todas', icon: 'apps-outline' },*/
    { value: SurveyCategory.SERVICES, label: 'Servicios', icon: 'construct-outline' },
    { value: SurveyCategory.RESTAURANT, label: 'Restaurante', icon: 'restaurant-outline' },
    { value: SurveyCategory.SPORTS, label: 'Deportes', icon: 'football-outline' },
    { value: SurveyCategory.EVENTS, label: 'Eventos', icon: 'calendar-outline' },
  ];

  const statusOptions = [
    { value: 'abiertas', label: 'Abiertas' },
    { value: 'completadas', label: 'Completadas' },
    { value: 'cerradas', label: 'Cerradas' },
  ];

  return (
    <View style={styles.container}>
      {/* Category Filters */}
      {/* Status Filters - Segmented Control */}
      <View style={styles.filterGroup}>
        <View style={styles.segmentedControl}>
          {statusOptions.map((status, index) => {
            const isSelected = selectedStatus === status.value;
            const isFirst = index === 0;
            const isLast = index === statusOptions.length - 1;
            
            return (
              <TouchableOpacity
                key={status.value}
                style={[
                  styles.segmentButton,
                  isFirst && styles.segmentButtonFirst,
                  isLast && styles.segmentButtonLast,
                  isSelected && styles.segmentButtonActive,
                ]}
                onPress={() => onStatusChange(status.value as 'abiertas' | 'completadas' | 'cerradas')}
                accessibilityRole="button"
                accessibilityLabel={status.label}
                accessibilityState={{ selected: isSelected }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.segmentButtonText,
                    isSelected && styles.segmentButtonTextActive,
                  ]}
                >
                  {status.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Divider Line */}
      {/*<View style={styles.divider} />*/}

      <View style={[styles.filterGroup, styles.filterCategory]}>
        <View style={styles.scrollWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category.value;
              return (
                <TouchableOpacity
                  key={category.value}
                  style={[
                    styles.filterButton,
                    isSelected && styles.activeFilterButton,
                  ]}
                  onPress={() => onCategoryChange(category.value)}
                  accessibilityRole="button"
                  accessibilityLabel={`Filtrar por ${category.label}`}
                  accessibilityState={{ selected: isSelected }}
                  activeOpacity={0.7}
                >
                  <View style={styles.filterButtonContent}>
                    {/*<Ionicons 
                      name={category.icon as any} 
                      size={16} 
                      color={isSelected ? COLORS.white : COLORS.gray600}
                      style={styles.filterIcon}
                    />*/}
                    <Text
                      style={[
                        styles.filterButtonText,
                        isSelected && styles.activeFilterButtonText,
                      ]}
                    >
                      {category.label.toUpperCase()}
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