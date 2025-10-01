import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CartState, CartItem, Dish } from '../interfaces/dishInterface';

export const useCartStore = create<CartState>()(
  devtools(
    (set, get) => ({
      items: [],
      
      addItem: (dish: Dish, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === dish.id);
          
          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map(item =>
                item.id === dish.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            // Add new item to cart
            return {
              items: [...state.items, { ...dish, quantity }]
            };
          }
        });
      },
      
      removeItem: (dishId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== dishId)
        }));
      },
      
      updateQuantity: (dishId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(dishId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.id === dishId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getItemsCount: () => {
        return get().items.length;
      }
    }),
    { name: 'cart-store' }
  )
);