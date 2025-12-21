import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();
  const messages = {
    CONTAINER: {
      SPANISH: t('settings.Spanish'),
      ENGLISH: t('settings.English'),
      APPEARANCE: t('settings.appearance'),
      DARK_MODE: t('settings.darkMode'),
      NOTIFICATIONS: t('settings.notifications'),
      ENABLE_NOTIFICATIONS: t('settings.enableNotifications'),
      LANGUAGE: t('settings.language'),
    },
  };

  return { messages };
};

export default useMessages;
