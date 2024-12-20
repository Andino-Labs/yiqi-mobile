import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '../ThemedText'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

const LoggedOutTicketList: React.FC = () => {
  const { t } = useTranslation()
  return (
    <View className="flex-1 justify-center items-center px-6">
      <View className="bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <ThemedText className="text-white text-xl font-bold text-center mb-4">
          {t('tickets.loggedOutTitle')}
        </ThemedText>
        <ThemedText className="text-neutral-400 text-center mb-6">
          {t('tickets.LoggedOutDescription')}
        </ThemedText>
        <Link href="/login" className={'mt-6 self-center'}>
          <LinearGradient
            colors={['#04F1FF', '#6de4e8']}
            className={
              'px-4 py-3 rounded-lg items-center justify-center bg-transparent'
            }
          >
            <ThemedText className={'text-black text-lg font-semibold text'}>
              {t('general.login')}
            </ThemedText>
          </LinearGradient>
        </Link>
      </View>
    </View>
  )
}

export default LoggedOutTicketList
