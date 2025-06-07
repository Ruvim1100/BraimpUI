import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en/translation.json';
import ro from '../locales/ro/translation.json';
import ru from '../locales/ru/translation.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ro', 'ru'],
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: en },
      ro: { translation: ro },
      ru: { translation: ru },
    },
  });

export default i18n;
