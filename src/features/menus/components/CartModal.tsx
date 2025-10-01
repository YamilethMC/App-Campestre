// src/features/menus/components/CartModal.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { CartItem } from '../interfaces/dishInterface';
import { useCartStore } from '../store/useCartStore';
import { COLORS } from '../../../shared/theme/colors';
import { useTranslation } from 'react-i18next';

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation('restaurant');
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [ivaRate] = useState(0.16); // 16% IVA

  const subtotal = getTotalPrice();
  const iva = subtotal * ivaRate;
  const total = subtotal + iva;

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    Alert.alert(t('dishRemoved'));
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
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerIcon}>🛒</Text>
            <Text style={styles.headerTitle}>Carrito de compras</Text>
            <Text style={styles.headerSubtitle}>{items.length} {items.length === 1 ? 'producto' : 'productos'}</Text>
          </View>
        </View>

        {/* Cart Items */}
        <ScrollView style={styles.content}>
          {items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tu carrito está vacío</Text>
            </View>
          ) : (
            items.map((item: CartItem) => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.itemImageContainer}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Text style={styles.placeholderText}>🍽️</Text>
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
                  <Text style={styles.removeItemText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        {/* Order Summary */}
        {items.length > 0 && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>IVA ({(ivaRate * 100).toFixed(0)}%)</Text>
              <Text style={styles.summaryValue}>${iva.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.continueButton} 
                onPress={handleContinueShopping}
              >
                <Text style={styles.continueButtonText}>Continuar comprando</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.payButton} 
                onPress={handleProceedToPayment}
              >
                <Text style={styles.payButtonText}>Proceder al pago</Text>
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
    return '👕';
  } else if (categoryLower.includes('accesorio') || categoryLower.includes('anillo') || categoryLower.includes('collar')) {
    return '🎒';
  } else if (categoryLower.includes('evento') || categoryLower.includes('boleto') || categoryLower.includes('entrada')) {
    return '🎟️';
  } else if (categoryLower.includes('deporte') || categoryLower.includes('balon') || categoryLower.includes('raqueta')) {
    return '⚽';
  } else {
    return '🍽️'; // Default for restaurant items
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 15,
    paddingTop: 40,
    paddingBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 40,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray600,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
  },
  itemImage: {
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
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  itemCategory: {
    fontSize: 12,
    color: COLORS.gray600,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 2,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantityButton: {
    backgroundColor: COLORS.primary,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityDisplay: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  removeItemButton: {
    padding: 5,
  },
  removeItemText: {
    fontSize: 20,
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  continueButton: {
    flex: 1,
    backgroundColor: COLORS.gray200,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  payButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default CartModal;