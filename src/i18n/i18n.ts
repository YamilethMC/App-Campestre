import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
import en from '../../locales/en.json';
import es from '../../locales/es.json';

// Define supported languages
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

// Detect device language
const getDeviceLanguage = (): 'es' | 'en' => {
  const deviceLocale = Localization.getLocales()[0]?.languageCode || 'es';
  return deviceLocale.startsWith('en') ? 'en' : 'es';
};

// Initialize i18n with device detection
const initI18n = async () => {
  const storedLanguage = await AsyncStorage.getItem('userLanguage');
  const deviceLanguage = getDeviceLanguage();

  const initialLanguage = storedLanguage || deviceLanguage;

  // Save detected language if first time
  if (!storedLanguage) {
    await AsyncStorage.setItem('userLanguage', initialLanguage);
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export { getDeviceLanguage };
export default i18n;
