import { getLocales } from 'expo-localization'
import { resources } from './resources'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as SecureStore from 'expo-secure-store'

import { secureStorageKeys } from '@/constants/SecureStore'
const initI18n = async () => {
  let savedLanguage = await SecureStore.getItemAsync(secureStorageKeys.LANGUAGE)

  const deviceLanguage = getLocales()[0].languageCode ?? 'es'

  if (!savedLanguage) {
    savedLanguage = deviceLanguage
  }
  return i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    // allows integrating dynamic values into translations.
    interpolation: {
      escapeValue: false // escape passed in values to avoid XSS injections
    }
  })
}
initI18n()

export default i18n
