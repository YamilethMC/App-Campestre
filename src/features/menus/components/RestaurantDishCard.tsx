// src/features/menus/components/RestaurantDishCard.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Dish } from '../interfaces/dishInterface';
import { useCartStore } from '../store/useCartStore';
import { COLORS } from '../../../shared/theme/colors';
import { useTranslation } from 'react-i18next';

interface RestaurantDishCardProps {
  dish: Dish;
  onAddToCart?: (dish: Dish) => void;
}

const RestaurantDishCard: React.FC<RestaurantDishCardProps> = ({ dish, onAddToCart }) => {
  const { t } = useTranslation('restaurant');
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const { addItem, updateQuantity, getItemsCount } = useCartStore();

  const handleAddToCart = () => {
    addItem(dish, quantity);
    setIsInCart(true);
    if (onAddToCart) {
      onAddToCart(dish);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(dish.id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(dish.id, newQuantity);
    } else {
      setQuantity(1);
      updateQuantity(dish.id, 1);
    }
  };

  return (
    <View style={styles.card}>
      {/* Dish Image - Space reserved even if image is not available */}
      <View style={styles.imageContainer}>
        {dish.image ? (
          <Image source={{ uri: dish.image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Imagen</Text>
          </View>
        )}
      </View>

      {/* Dish Info */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>{dish.name}</Text>
          <Text style={styles.price}>${dish.price}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>{dish.description}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.category}>{dish.category}</Text>
          <Text style={styles.preparationTime}>⏱️ {dish.preparationTime}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {dish.rating}</Text>
          </View>
        </View>

        {/* Dish tags (popular, spicy, vegetarian, gluten-free) */}
        <View style={styles.tagsContainer}>
          {dish.isPopular && <Text style={styles.tag}>⭐ Popular</Text>}
          {dish.isSpicy && <Text style={styles.tag}>🌶️ Picante</Text>}
          {dish.isVegetarian && <Text style={styles.tag}>🥦 Vegetariano</Text>}
          {dish.isGlutenFree && <Text style={styles.tag}>🌾🚫 Libre de Gluten</Text>}
        </View>

        {/* Add to cart or quantity controls */}
        <View style={styles.actionsContainer}>
          {!isInCart ? (
            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>(+) Agregar</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityDisplay}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.gray500,
    fontSize: 14,
  },
  infoContainer: {
    padding: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: COLORS.gray500,
    flex: 1,
  },
  preparationTime: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  rating: {
    fontSize: 12,
    color: COLORS.gray700,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 10,
    color: COLORS.gray700,
    marginRight: 5,
    marginBottom: 3,
  },
  actionsContainer: {
    alignItems: 'flex-end',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityDisplay: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
  },
});

export default RestaurantDishCard;