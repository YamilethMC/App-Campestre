// src/features/menus/containers/RestaurantContainer.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dish } from '../interfaces/dishInterface';
import RestaurantDishCard from '../components/RestaurantDishCard';
import StickyCart from '../components/StickyCart';
import { COLORS } from '../../../shared/theme/colors';

const RestaurantContainer: React.FC = () => {
  const { t } = useTranslation('restaurant');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  
  // Sample data for dishes - this would come from your API/service
  const allDishes: Dish[] = [
    {
      id: '1',
      name: 'Ensalada César',
      description: 'Lechuga romana, crutones, queso parmesano, aderezo césar',
      price: 89,
      category: 'Entrada',
      preparationTime: '10-15 min',
      rating: 4.7,
      isVegetarian: true,
      isPopular: true
    },
    {
      id: '2',
      name: 'Pollo a la Parrilla',
      description: 'Pechuga de pollo a la parrilla con vegetales al vapor',
      price: 129,
      category: 'Plato Fuerte',
      preparationTime: '15-20 min',
      rating: 4.8,
      isSpicy: false
    },
    {
      id: '3',
      name: 'Tacos de Carnitas',
      description: 'Tres tacos de carnitas con cebolla y cilantro',
      price: 95,
      category: 'Platillo Fuerte',
      preparationTime: '10-12 min',
      rating: 4.9,
      isSpicy: true
    },
    {
      id: '4',
      name: 'Pasta Primavera',
      description: 'Pasta con verduras frescas y salsa ligera',
      price: 110,
      category: 'Plato Fuerte',
      preparationTime: '12-15 min',
      rating: 4.6,
      isVegetarian: true,
      isGlutenFree: false
    },
    {
      id: '5',
      name: 'Sopa del Día',
      description: 'Sopa casera de temporada',
      price: 65,
      category: 'Entrada',
      preparationTime: '5-10 min',
      rating: 4.5,
      isVegetarian: true
    },
    {
      id: '6',
      name: 'Postre del Día',
      description: 'Selección de postres caseros',
      price: 75,
      category: 'Postre',
      preparationTime: '5-10 min',
      rating: 4.8,
      isVegetarian: true
    }
  ];

  useEffect(() => {
    // Filter dishes based on search query
    if (searchQuery.trim() === '') {
      setFilteredDishes(allDishes);
    } else {
      const filtered = allDishes.filter(dish => 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDishes(filtered);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      {/* Header with restaurant name and opening hours */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('headerText')}</Text>
        <Text style={styles.openingHours}>{t('openingHours')}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor={COLORS.gray500}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Dish List */}
      <ScrollView style={styles.dishList}>
        {filteredDishes.length > 0 ? (
          filteredDishes.map(dish => (
            <RestaurantDishCard 
              key={dish.id} 
              dish={dish} 
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('noDishesAvailable')}</Text>
          </View>
        )}
      </ScrollView>

      {/* Sticky Cart Component */}
      <StickyCart />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  openingHours: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  searchContainer: {
    margin: 15,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dishList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
  },
});

export default RestaurantContainer;