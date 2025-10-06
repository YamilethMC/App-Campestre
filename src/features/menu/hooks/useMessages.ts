import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();
  const messages = {
    TITLE: t('menus.title'),
    CONTAINER: {
      PLACEHOLDER: t('menus.searchPlaceholder'),
      ALLMENUS: t('menus.allMenus'),
      NOMENUSAVAILABLE: t('menus.noMenusAvailable'),
    },
    MENUCARD: {
        FEATURED: t('menus.menuCard.featured'),
        DOWNLOAD: t('menus.menuCard.download'),
    },
    MENUHEADER: {
        MENU: t('menus.menuHeader.menu'),
        RESTAURANTCLUB: t('menus.menuHeader.RestaurantClub'),
        ALLDOWNLOAD: t('menus.menuHeader.allDownload'),
    },
    RESTAURANTHOURS: {
        TITLE: t('menus.restaurantHours.title'),
        BREAKFAST: t('menus.restaurantHours.breakfast'),
        LUNCH: t('menus.restaurantHours.lunch'),
        DINNER: t('menus.restaurantHours.dinner'),
        TEXT: t('menus.restaurantHours.text'),
    }
  };

  return { messages };
};

export default useMessages;
