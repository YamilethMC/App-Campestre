import { useTranslation } from 'react-i18next';

const useMessages = () => {
<<<<<<< HEAD
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
=======
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
        LOGIN_ERROR: t('auth.alert.loginError'),
        CONNECTION_ERROR: t('auth.alert.connectionError')
      }
    };
  
    return { messages };
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99
  };

  return { messages };
};

export default useMessages;
