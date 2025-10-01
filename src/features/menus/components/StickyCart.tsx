// src/features/menus/components/StickyCart.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import useMessages from '../hooks/useRestaurantMessages';
import { useCartStore } from '../store/useCartStore';
import CartModal from './CartModal';

const StickyCart: React.FC = () => {
  const { messages } = useMessages();
  const { t } = useTranslation('restaurant');
  const totalItems = useCartStore(state => state.totalItems);
  const totalPrice = useCartStore(state => state.totalPrice);
  const { getTotalItems, getTotalPrice } = useCartStore();
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
            <Text style={styles.cartIcon}>🛒</Text>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cartButton: {
    flex: 1,
    marginRight: 15,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  cartText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  totalContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalItems: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 3,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
  },
});

export default StickyCart;