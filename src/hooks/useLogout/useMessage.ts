import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();

  return {
    LOGOUT: t('common.textLogout'),
    CONTAINER: {
      TEXT_LOGOUT: t('common.textLogout'),
    },
  };
};

export default useMessages;
