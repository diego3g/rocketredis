import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-fs-backend'
import { initReactI18next } from 'react-i18next'

const options = {
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  whitelist: ['en'],
  backend: {
    loadPath: './locales/{{lng}}/{{ns}}.json',
    addPath: './locales/{{lng}}/{{ns}}.missing.json'
  },
  react: {
    wait: false,
    useSuspense: false
  },
  saveMissing: true,
  ns: 'translations',
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  }
}

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(options)

export default i18n
