// src/features/restaurante/components/RestaurantDishCard/index.tsx
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../../../shared/components/Card';
import useMessages from '../../hooks/useRestaurantMessages';
import { RestaurantDishCardProps } from '../../interfaces/dishInterface';
import { useCartStore } from '../../store/useCartStore';
import { styles } from './Style';

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
    <Card style={styles.card}>
      {/* Dish Image - Space reserved even if image is not available */}
      <View style={styles.imageContainer}>
        {dish.image ? (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Imagen</Text>
          </View>
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
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={14} color="#6B7280" style={styles.timeIcon} />
            <Text style={styles.preparationTime}> {dish.preparationTime}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FBBF24" style={styles.starIcon} />
            <Text style={styles.rating}> {dish.rating}</Text>
          </View>
        </View>

        {/* Dish tags (popular, spicy, vegetarian, gluten-free) */}
        <View style={styles.tagsContainer}>
          {dish.isPopular && (
            <View style={styles.tagContainer}>
              <Ionicons name="star" size={12} color="#FBBF24" />
              <Text style={styles.tag}> {messages.TAGS.POPULAR}</Text>
            </View>
          )}
          {dish.isSpicy && (
            <View style={styles.tagContainer}>
              <Ionicons name="flame-outline" size={12} color="#EF4444" />
              <Text style={styles.tag}> {messages.TAGS.SPICY}</Text>
            </View>
          )}
          {dish.isVegetarian && (
            <View style={styles.tagContainer}>
              <Ionicons name="leaf-outline" size={12} color="#10B981" />
              <Text style={styles.tag}> {messages.TAGS.VEGETARIAN}</Text>
            </View>
          )}
          {dish.isGlutenFree && (
            <View style={styles.tagContainer}>
              <Ionicons name="nutrition-outline" size={12} color="#8B5CF6" />
              <Text style={styles.tag}> {messages.TAGS.GLUTEN_FREE}</Text>
            </View>
          )}
        </View>

        {/* Add to cart or quantity controls */}
        <View style={styles.actionsContainer}>
          {!isInCart ? (
            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>+ {messages.CONTAINER.ADD}</Text>
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
    </Card>
  );
};

export default RestaurantDishCard;