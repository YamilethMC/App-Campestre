import { useTranslation } from 'react-i18next';

const useRestaurantMessages = () => {
  const { t } = useTranslation();
  const messages = {
    CONTAINER: {
      TITLE: t('restaurant.title'),
      HEADER_TEXT: t('restaurant.headerText'),
      OPENING_HOURS: t('restaurant.openingHours'),
      SEARCH_PLACEHOLDER: t('restaurant.searchPlaceholder'),
      NO_DISHES_AVAILABLE: t('restaurant.noDishesAvailable'),
      DISH_ADDED: t('restaurant.dishAdded'),
      DISH_REMOVED: t('restaurant.dishRemoved'),
      ADD: t('restaurant.add'),
    },
    CARRITO: {
      SEE: t('restaurant.carrito.see'),
      TITLE: t('restaurant.carrito.title'),
      EMPTY_CART: t('restaurant.carrito.emptyCart'),
      ITEMS: t('restaurant.carrito.items'),
      SUBTOTAL: t('restaurant.carrito.subtotal'),
      TAX: t('restaurant.carrito.tax'),
      TOTAL: t('restaurant.carrito.total'),
      CHECKOUT: t('restaurant.carrito.checkout'),
      CLEAR_CART: t('restaurant.carrito.clearCart'),
      CONFIRM_CLEAR_CART: t('restaurant.carrito.confirmClearCart'),
      CANCEL: t('restaurant.carrito.cancel'),
      CONFIRM: t('restaurant.carrito.ok'),
      CONTINUE_SHOPPING: t('restaurant.carrito.continueShopping'),
      PAYMENT: t('restaurant.carrito.payment'),
      DISH: t('restaurant.carrito.dish'),
    },
    TAGS: {
      POPULAR: t('restaurant.tags.popular'),
      SPICY: t('restaurant.tags.spicy'),
      VEGETARIAN: t('restaurant.tags.vegetarian'),
      GLUTEN_FREE: t('restaurant.tags.glutenFree'),
    },
  };

  return { messages };
};

export default useRestaurantMessages;
