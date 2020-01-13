import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as translationEng from './locales/en.json';
import * as translationVn from './locales/vn.json'
import Backend from 'i18next-xhr-backend';

const resources = {
  en: {
    translation: translationEng
  },
  vn: {
    translation: translationVn
  }
}

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    debug: true,
    returnObjects: true
  });


export default i18n;