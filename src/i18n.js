// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import ps from './locales/ps/translation.json';
import fa from './locales/fa/translation.json';
import ar from './locales/ar/translation.json';
import ur from './locales/ur/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ps: { translation: ps },
      fa: { translation: fa },
      ar: { translation: ar },
      ur: { translation: ur }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
