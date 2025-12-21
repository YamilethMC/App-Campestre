import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CartState, CartItem, Dish } from '../interfaces/dishInterface';

interface ExtendedCartState extends CartState {
  totalItems: number;
  totalPrice: number;
  updateTotals: () => void;
}

export const useCartStore = create<ExtendedCartState>()(
  devtools(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      updateTotals: () => {
        const items = get().items;
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

        set({ totalItems, totalPrice });
      },

      addItem: (dish: Dish, quantity = 1) => {
        set(state => {
          const existingItem = state.items.find(item => item.id === dish.id);

          let newItems;
          if (existingItem) {
            // Update quantity if item already exists
            newItems = state.items.map(item =>
              item.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item,
            );
          } else {
            // Add new item to cart
            newItems = [...state.items, { ...dish, quantity }];
          }

          const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          );

          return {
            items: newItems,
            totalItems,
            totalPrice,
          };
        });
      },

      removeItem: (dishId: string) => {
        set(state => {
          const newItems = state.items.filter(item => item.id !== dishId);
          const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          );

          return {
            items: newItems,
            totalItems,
            totalPrice,
          };
        });
      },

      updateQuantity: (dishId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(dishId);
          return;
        }

        set(state => {
          const newItems = state.items.map(item =>
            item.id === dishId ? { ...item, quantity } : item,
          );

          const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          );

          return {
            items: newItems,
            totalItems,
            totalPrice,
          };
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      getTotalItems: () => get().totalItems,

      getTotalPrice: () => get().totalPrice,

      getItemsCount: () => get().items.length,
    }),
    { name: 'cart-store' },
  ),
);
