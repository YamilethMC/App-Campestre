// src/features/restaurante/components/StickyCart/index.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useMessages from '../../hooks/useRestaurantMessages';
import { useCartStore } from '../../store/useCartStore';
import CartModal from '../CartModal';
import { styles } from './Style';

const StickyCart: React.FC = () => {
  const { messages } = useMessages();
  const totalItems = useCartStore(state => state.totalItems);
  const totalPrice = useCartStore(state => state.totalPrice);
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  
  const hasItems = totalItems > 0;

  const handleViewCart = () => {
    setIsCartModalVisible(true);
  };

  if (!hasItems) {
    return null; // Don't show if cart is empty
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.cartButton} onPress={handleViewCart}>
          <View style={styles.buttonContent}>
            <Ionicons name="cart-outline" size={20} color="gray" style={styles.cartIcon} />
            <Text style={styles.cartText}>{messages.CARRITO.SEE}</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.totalContainer}>
          <Text style={styles.totalItems}>{totalItems} {totalItems === 1 ? messages.CARRITO.ITEMS : messages.CARRITO.ITEMS + 's'}</Text>
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
      </View>
      
      <CartModal 
        visible={isCartModalVisible} 
        onClose={() => setIsCartModalVisible(false)} 
      />
    </>
  );
};

export default StickyCart;