// src/features/menus/components/RestaurantDishCard.tsx
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import useMessages from '../hooks/useRestaurantMessages';
import { Dish } from '../interfaces/dishInterface';
import { useCartStore } from '../store/useCartStore';

interface RestaurantDishCardProps {
  dish: Dish;
}

const RestaurantDishCard: React.FC<RestaurantDishCardProps> = ({ dish }) => {
  const { messages } = useMessages();
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const [quantity, setQuantity] = useState(0);
  const [isInCart, setIsInCart] = useState(false);

  // Actualizar estado cuando cambian los elementos del carrito
  useEffect(() => {
    const cartItem = items.find(item => item.id === dish.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setIsInCart(true);
    } else {
      setQuantity(0);
      setIsInCart(false);
    }
  }, [items, dish.id]);

  const handleAddToCart = () => {
    addItem(dish, 1);
    setQuantity(1);
    setIsInCart(true);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    updateQuantity(dish.id, newQuantity);
    setQuantity(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateQuantity(dish.id, newQuantity);
      setQuantity(newQuantity);
    } else {
      // Si la cantidad es 1 y se decrementa, eliminar del carrito
      removeItem(dish.id);
      setQuantity(0);
      setIsInCart(false);
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
            <Text style={styles.rating}> ⭐ {dish.rating}</Text>
          </View>
        </View>

        {/* Dish tags (popular, spicy, vegetarian, gluten-free) */}
        <View style={styles.tagsContainer}>
          {dish.isPopular && <Text style={styles.tag}>⭐ {messages.TAGS.POPULAR}</Text>}
          {dish.isSpicy && <Text style={styles.tag}>🌶️ {messages.TAGS.SPICY}</Text>}
          {dish.isVegetarian && <Text style={styles.tag}>🥦 {messages.TAGS.VEGETARIAN}</Text>}
          {dish.isGlutenFree && <Text style={styles.tag}>🌾🚫 {messages.TAGS.GLUTEN_FREE}</Text>}
        </View>

        {/* Add to cart or quantity controls */}
        <View style={styles.actionsContainer}>
          {!isInCart ? (
            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>(+) {messages.CONTAINER.ADD}</Text>
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