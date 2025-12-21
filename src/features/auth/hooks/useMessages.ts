import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();
  const messages = {
    CONTAINER: {
      TITLE: t('auth.container.title'),
    },
    LOGO: {
      TITLE: t('auth.logo.name'),
      SUBTITLE: t('auth.logo.place'),
    },
    LOGIN: {
      EMAIL: t('auth.login.email'),
      PASSWORD: t('auth.login.password'),
      BUTTON: t('auth.login.loginButton'),
      FORGOT_PASSWORD: t('auth.login.forgotPassword'),
      LOADING: t('common.loading'),
      EXAMPLE_EMAIL: t('common.exampleEmail'),
      EXAMPLE_PASSWORD: t('common.examplePassword'),
    },
    ALERTS: {
      TITLE: t('auth.alert.title'),
      MESSAGE: t('auth.alert.message'),
      REQUIRED_FIELDS: t('auth.alert.requiredFields'),
      ERROR: t('common.error'),
      OK: t('common.ok'),
    },
  };

  return { messages };
};

export default useMessages;
