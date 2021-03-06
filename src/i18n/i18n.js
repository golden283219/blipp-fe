import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      sv: {
        translations: require('./locales/sv.json'),
      },
      en: {
        translations: require('./locales/en.json'),
      },
    },
    ns: ['translations'],
    defaultNS: 'translations',
    debug: process.env.NODE_ENV === 'development',
    react: {
      wait: true,
    },
  });

i18n.languages = ['sv', 'en'];

export default i18n;
