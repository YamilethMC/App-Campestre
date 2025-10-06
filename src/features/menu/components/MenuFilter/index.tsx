import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Style';

interface FilterCounts {
  all: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  drinks: number;
  specials: number;
}

interface MenuFilterProps {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
  counts: FilterCounts;
}

const MenuFilter: React.FC<MenuFilterProps> = ({ selectedFilter, onSelectFilter, counts }) => {
  const filters = [
    { key: 'all', label: 'Todos', count: counts.all },
    { key: 'breakfast', label: 'Desayuno', count: counts.breakfast },
    { key: 'lunch', label: 'Almuerzo', count: counts.lunch },
    { key: 'dinner', label: 'Cena', count: counts.dinner },
    { key: 'drinks', label: 'Bebidas', count: counts.drinks },
    { key: 'specials', label: 'Especiales', count: counts.specials },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.selectedFilterButton,
            ]}
            onPress={() => onSelectFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.key && styles.selectedFilterText,
              ]}
            >
              {filter.label}
            </Text>
            <View style={styles.countContainer}>
              <Text style={[
                styles.countText,
                selectedFilter === filter.key && styles.selectedCountText
              ]}>
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MenuFilter;