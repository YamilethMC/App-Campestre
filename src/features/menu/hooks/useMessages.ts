import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();
  const messages = {
    CONTAINER: {
        TITLE: t('menus.title'),
        SELECT_MENU_TYPE: t('menus.selectMenuType'),
        NO_MENUS_AVAILABLE: t('menus.noMenusAvailable'),
        NO_MENUS_FOR_TYPE: t('menus.noMenusForType'),
        TYPES: {
            DAILY: t('menus.types.daily'),
            WEEKLY: t('menus.types.weekly'),
            SPECIAL: t('menus.types.special')
        }
    }
  };

  return { messages };
};

export default useMessages;