// src/features/restaurante/components/CartModal/index.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useMessages from '../../hooks/useRestaurantMessages';
import { CartItem, CartModalProps } from '../../interfaces/dishInterface';
import { useCartStore } from '../../store/useCartStore';
import { styles } from './Style';

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const { messages } = useMessages();
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const totalItems = useCartStore(state => state.totalItems);
  const [ivaRate] = useState(0.16); // 16% IVA

  const subtotal = getTotalPrice();
  const iva = subtotal * ivaRate;
  const total = subtotal + iva;

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    Alert.alert(messages.CONTAINER.DISH_REMOVED);
  };

  const handleIncrement = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecrement = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      // Si la cantidad es 1 y se decrementa, eliminar del carrito
      removeItem(itemId);
      Alert.alert(messages.CONTAINER.DISH_REMOVED);
    }
  };

  const handleProceedToPayment = () => {
    Alert.alert('Proceder al pago', 'Funcionalidad de pago aún no implementada');
    onClose();
  };

  const handleContinueShopping = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Ionicons name="cart-outline" size={24} color="white" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>{messages.CARRITO.TITLE}</Text>
            <Text style={styles.headerSubtitle}>{totalItems} {totalItems === 1 ? messages.CARRITO.ITEMS : messages.CARRITO.ITEMS + 's'}</Text>
          </View>
        </View>

        {/* Cart Items */}
        <ScrollView style={styles.content}>
          {items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{messages.CARRITO.EMPTY_CART}</Text>
            </View>
          ) : (
            items.map((item: CartItem) => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.itemImageContainer}>
                  {item.image ? (
                    <View style={styles.placeholderImage}>
                      <Text style={styles.placeholderText}>{messages.CARRITO.DISH}</Text>
                    </View>
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Ionicons name="restaurant-outline" size={20} color={styles.placeholderText.color} />
                    </View>
                  )}
                </View>
                
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemCategory}>{getCategoryIcon(item.category)} {item.category}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    style={styles.quantityButton} 
                    onPress={() => handleDecrement(item.id)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityDisplay}>{item.quantity}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton} 
                    onPress={() => handleIncrement(item.id)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.removeItemButton} 
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        {/* Order Summary */}
        {items.length > 0 && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{messages.CARRITO.SUBTOTAL}</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{messages.CARRITO.TAX} ({(ivaRate * 100).toFixed(0)}%)</Text>
              <Text style={styles.summaryValue}>${iva.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{messages.CARRITO.TOTAL}</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.continueButton} 
                onPress={handleContinueShopping}
              >
                <Text style={styles.continueButtonText}>{messages.CARRITO.CONTINUE_SHOPPING}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.payButton} 
                onPress={handleProceedToPayment}
              >
                <Text style={styles.payButtonText}>{messages.CARRITO.PAYMENT}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

// Helper function to get category icon
const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('ropa') || categoryLower.includes('camisa') || categoryLower.includes('pantalon')) {
    return <Ionicons name="shirt-outline" size={14} color="#6B7280" />;
  } else if (categoryLower.includes('accesorio') || categoryLower.includes('anillo') || categoryLower.includes('collar')) {
    return <Ionicons name="bag-handle-outline" size={14} color="#6B7280" />;
  } else if (categoryLower.includes('evento') || categoryLower.includes('boleto') || categoryLower.includes('entrada')) {
    return <Ionicons name="ticket-outline" size={14} color="#6B7280" />;
  } else if (categoryLower.includes('deporte') || categoryLower.includes('balon') || categoryLower.includes('raqueta')) {
    return <Ionicons name="football-outline" size={14} color="#6B7280" />;
  } else {
    return <Ionicons name="restaurant-outline" size={14} color="#6B7280" />; // Default for restaurant items
  }
};

export default CartModal;