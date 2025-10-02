// src/features/restaurante/containers/index.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import RestaurantDishCard from '../components/RestaurantDishCard';
import StickyCart from '../components/StickyCart';
import useMessages from '../hooks/useRestaurantMessages';
import { Dish } from '../interfaces/dishInterface';
import { styles } from './Style';
import Search from '@/src/shared/components/Search/Search';

const RestaurantContainer: React.FC = () => {
  const { messages } = useMessages();
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
        <Text style={styles.headerText}>{messages.CONTAINER.HEADER_TEXT}</Text>
        <Text style={styles.openingHours}>{messages.CONTAINER.OPENING_HOURS}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/*<TextInput
          style={styles.searchInput}
          placeholder={` 🔍  ${messages.CONTAINER.SEARCH_PLACEHOLDER}`}
          placeholderTextColor={COLORS.gray500}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />*/}
        <Search
          placeholder={messages.CONTAINER.SEARCH_PLACEHOLDER}
          onSearch={setSearchQuery}
          iconColor={COLORS.gray500}
          inputStyle={styles.searchInput}
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
            <Text style={styles.emptyText}>{messages.CONTAINER.NO_DISHES_AVAILABLE}</Text>
          </View>
        )}
      </ScrollView>

      {/* Sticky Cart Component */}
      <StickyCart />
    </View>
  );
};

export default RestaurantContainer;