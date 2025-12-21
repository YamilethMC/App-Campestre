export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  preparationTime: string; // e.g., "15-20 min"
  rating: number; // e.g., 4.8
  image?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isAvailable?: boolean;
}

export interface CartItem extends Dish {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (dish: Dish, quantity?: number) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemsCount: () => number;
}

export interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface RestaurantDishCardProps {
  dish: Dish;
}
