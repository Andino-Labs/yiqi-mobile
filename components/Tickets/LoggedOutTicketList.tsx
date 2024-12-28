import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { GradientButton } from '../ui/GradientButton'

const LoggedOutTicketList: React.FC = () => {
  const { t } = useTranslation()
  const onCallToActionPress = () => router.navigate('/login')
  return (
    <View className="flex-1 justify-center items-center px-6">
      <View className="bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <ThemedText className="text-white text-xl font-bold text-center mb-4">
          {t('tickets.loggedOutTitle')}
        </ThemedText>
        <ThemedText className="text-neutral-400 text-center mb-6">
          {t('tickets.LoggedOutDescription')}
        </ThemedText>
        <GradientButton
          text={t('general.login')}
          onPress={onCallToActionPress}
          containerClassName={'mt-6 self-center'}
        />
      </View>
    </View>
  )
}

export default LoggedOutTicketList
