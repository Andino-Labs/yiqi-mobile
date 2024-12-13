import en from '@/translations/en'
import es from '@/translations/es'

export const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
}

export type Language = keyof typeof resources
