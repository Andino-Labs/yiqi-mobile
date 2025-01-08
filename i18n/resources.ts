import en from '@/translations/en'
import es from '@/translations/es'
import fr from '@/translations/fr'
import pt from '@/translations/pt'

export const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  },
  fr: {
    translation: fr
  },
  pt: {
    translation: pt
  }
}

export type Language = keyof typeof resources
