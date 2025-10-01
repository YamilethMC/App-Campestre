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
    }
  };

  return { messages };
};

export default useRestaurantMessages;