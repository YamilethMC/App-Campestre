import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { FilterSectionProps } from '../../interfaces/eventInterface';
import styles from './Style';

interface AdvancedFilterSectionProps extends FilterSectionProps {
  availableOnly?: boolean;
  popularitySort?: 'none' | 'asc' | 'desc';
  onAvailableOnlyChange?: (value: boolean) => void;
  onPopularitySortChange?: (value: 'none' | 'asc' | 'desc') => void;
  onResetFilters?: () => void;
}

const FilterSection: React.FC<AdvancedFilterSectionProps> = ({
  selectedEventType,
  onEventTypeChange,
  availableOnly = false,
  popularitySort = 'none',
  onAvailableOnlyChange,
  onPopularitySortChange,
  onResetFilters,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const eventTypes = [
    { value: 'Todos', label: 'Todos', icon: 'apps-outline' },
    { value: 'SPORT', label: 'Deportivo', icon: 'football-outline' },
    { value: 'SOCIAL', label: 'Social', icon: 'people-outline' },
    { value: 'FAMILY', label: 'Familiar', icon: 'home-outline' },
    { value: 'OTHER', label: 'Otros', icon: 'ellipsis-horizontal-outline' },
  ];

  const { messages } = useMessages();
  const hasActiveFilters = selectedEventType !== 'Todos' || availableOnly || popularitySort !== 'none';
  const activeFilterCount = 
    (selectedEventType !== 'Todos' ? 1 : 0) + 
    (availableOnly ? 1 : 0) + 
    (popularitySort !== 'none' ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.filterGroup}>
        {/* Single Filters Button */}
        <TouchableOpacity
          style={[
            styles.filterButton,
            hasActiveFilters && styles.activeFilterButton,
          ]}
          onPress={() => setShowAdvancedFilters(true)}
          accessibilityRole="button"
          accessibilityLabel="Filtros"
          activeOpacity={0.7}
        >
          <View style={styles.filterButtonContent}>
            <Ionicons 
              name="options-outline" 
              size={18} 
              color={hasActiveFilters ? COLORS.white : COLORS.gray600}
            />
            <Text
              style={[
                styles.filterButtonText,
                hasActiveFilters && styles.activeFilterButtonText,
              ]}
            >
              {messages.FILTERS.LABEL}
            </Text>
            {hasActiveFilters && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>
                  {activeFilterCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Advanced Filters Modal */}
      <Modal
        visible={showAdvancedFilters}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAdvancedFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setShowAdvancedFilters(false)}>
                <Ionicons name="close" size={24} color={COLORS.gray800} />
              </TouchableOpacity>
            </View>

            {/* Event Type Selection */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Categoría</Text>
              <View style={styles.sortOptions}>
                {eventTypes.map((eventType) => (
                  <TouchableOpacity
                    key={eventType.value}
                    style={[
                      styles.sortOption,
                      selectedEventType === eventType.value && styles.sortOptionActive,
                    ]}
                    onPress={() => onEventTypeChange(eventType.value as 'Todos' | 'SPORT' | 'SOCIAL' | 'FAMILY' | 'OTHER')}
                  >
                    <View style={styles.filterButtonContent}>
                      <Ionicons 
                        name={eventType.icon as any} 
                        size={16} 
                        color={selectedEventType === eventType.value ? COLORS.white : COLORS.gray700}
                      />
                      <Text style={[
                        styles.sortOptionText,
                        selectedEventType === eventType.value && styles.sortOptionTextActive,
                      ]}>
                        {eventType.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Available Only Filter */}
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => onAvailableOnlyChange?.(!availableOnly)}
            >
              <View style={styles.filterOptionContent}>
                <Ionicons 
                  name="people-outline" 
                  size={20} 
                  color={COLORS.primary}
                />
                <Text style={styles.filterOptionText}>Solo con cupos disponibles</Text>
              </View>
              <View style={[styles.checkbox, availableOnly && styles.checkboxActive]}>
                {availableOnly && (
                  <Ionicons name="checkmark" size={16} color={COLORS.white} />
                )}
              </View>
            </TouchableOpacity>

            {/* Popularity Sort */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Ordenar por popularidad</Text>
              <View style={styles.sortOptions}>
                <TouchableOpacity
                  style={[
                    styles.sortOption,
                    popularitySort === 'none' && styles.sortOptionActive,
                  ]}
                  onPress={() => onPopularitySortChange?.('none')}
                >
                  <Text style={[
                    styles.sortOptionText,
                    popularitySort === 'none' && styles.sortOptionTextActive,
                  ]}>Sin orden</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sortOption,
                    popularitySort === 'desc' && styles.sortOptionActive,
                  ]}
                  onPress={() => onPopularitySortChange?.('desc')}
                >
                  <Text style={[
                    styles.sortOptionText,
                    popularitySort === 'desc' && styles.sortOptionTextActive,
                  ]}>Más populares</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sortOption,
                    popularitySort === 'asc' && styles.sortOptionActive,
                  ]}
                  onPress={() => onPopularitySortChange?.('asc')}
                >
                  <Text style={[
                    styles.sortOptionText,
                    popularitySort === 'asc' && styles.sortOptionTextActive,
                  ]}>Menos populares</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  onResetFilters?.();
                  setShowAdvancedFilters(false);
                }}
              >
                <Text style={styles.resetButtonText}>Limpiar filtros</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowAdvancedFilters(false)}
              >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterSection;