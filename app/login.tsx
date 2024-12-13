import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, Linking } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useAuth } from '@/hooks/useAuth'
import LogoSvg from '@/assets/svgs/LogoSvg'
import LinkedInSvg from '@/assets/svgs/LinkedInSvg'
import GoogleSvg from '@/assets/svgs/GoogleSvg'
import LinkedInModal from '@/components/LinkedInModal'
import { useTranslation } from 'react-i18next'
import showToast from '@/helpers/showToast'

export default function Login() {
  const { onGoogleLogin, onLinkedInLogin } = useAuth()
  const [isLinkedInModalVisible, setLinkedInModalVisible] = useState(false)

  const handleSupportPress = () => {
    Linking.openURL('https://wa.me/51943056060').catch(err =>
      console.error('Failed to open support URL:', err)
    )
  }

  const handleLinkedInButtonPress = () => setLinkedInModalVisible(true)

  const handleLinkedInLoginCancel = () => setLinkedInModalVisible(false)

  const handleLinkedInLoginSuccess = async (authorizationCode: string) => {
    setLinkedInModalVisible(false)
    if (authorizationCode) {
      await onLinkedInLogin(authorizationCode)
    } else {
      showToast('Cannot get access token', { type: 'error' })
    }
  }

  const AuthButton = ({
    onPress,
    Icon,
    text
  }: {
    onPress: () => void
    Icon: React.FC
    text: string
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-black py-3 rounded-md flex-row justify-center items-center mb-4"
    >
      <Icon />
      <ThemedText className="font-medium text-white ml-2">{text}</ThemedText>
    </TouchableOpacity>
  )
  const { t } = useTranslation()

  return (
    <SafeAreaView className="bg-black flex-1 justify-center items-center px-5">
      <ThemedView
        className="bg-gray-900 border-r-4"
        style={{ borderRadius: 10, padding: 10 }}
      >
        <ThemedView className="bg-gray-900 items-center mb-8">
          <LogoSvg height={100} width={100} />
          <ThemedText className="text-white text-xl font-semibold">
            {t('loginScreen.welcome')}
          </ThemedText>
          <ThemedText className="text-gray-400 text-sm">
            Please sign in or sign up below
          </ThemedText>
        </ThemedView>

        {/* Login Buttons */}
        <AuthButton
          onPress={onGoogleLogin}
          Icon={GoogleSvg}
          text={t('loginScreen.loginWith') + ' Google'}
        />
        <AuthButton
          onPress={handleLinkedInButtonPress}
          Icon={LinkedInSvg}
          text={t('loginScreen.loginWith') + ' LinkedIn'}
        />

        {/* Support Section */}
        <ThemedView className="border-t-slate-800 border-t-2 my-4" />
        <ThemedText className="text-gray-400 text-sm">
          {t('loginScreen.help') + ' '}
          <ThemedText
            onPress={handleSupportPress}
            className="text-white text-sm underline"
            style={{ textDecorationLine: 'underline' }}
          >
            {t('loginScreen.technicalSupport')}
          </ThemedText>
        </ThemedText>
      </ThemedView>

      {/* LinkedIn Modal */}
      <LinkedInModal
        isVisible={isLinkedInModalVisible}
        onLoginCancel={handleLinkedInLoginCancel}
        onLoginSuccess={handleLinkedInLoginSuccess}
      />
    </SafeAreaView>
  )
}
