import { useTranslation } from 'react-i18next'
import * as SecureStore from 'expo-secure-store'
import { useCallback } from 'react'
import { secureStorageKeys } from '@/constants/SecureStore'

export const useSelectedLanguage = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const setLanguage = useCallback(
    async (lang: string) => {
      await SecureStore.setItemAsync(secureStorageKeys.LANGUAGE, lang)
      i18n.changeLanguage(lang)
    },
    [i18n]
  )

  return { language: currentLanguage, setLanguage }
}
