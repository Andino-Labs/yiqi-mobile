import React from 'react'
import { Linking, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelectedLanguage } from '@/i18n/utils'
import { ThemedText } from '@/components/ThemedText'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import {
  Settings,
  Lock,
  LogOut,
  User,
  LanguagesIcon,
  CircleHelp
} from 'lucide-react-native'
import { Select } from '@/components/Select'
import UserInfo from '@/components/Profile/UserInfo'
import { Colors } from '@/constants/Colors'
import { ChevronRight } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

const APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION || '1.0.1'
const iconProps = { size: 24, color: Colors.dark.tint }

interface SectionProps {
  icon: React.ReactNode
  text: string
  onPress?: () => void
  children?: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ icon, text, onPress, children }) => (
  <>
    <Pressable
      className="flex-row justify-between items-center py-2"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        {icon}
        <ThemedText className="text-white ml-2">{text}</ThemedText>
      </View>
      {children || <ChevronRight {...iconProps} />}
    </Pressable>
    <View className="h-[1px] w-full bg-neutral-700 my-2" />
  </>
)

export default function Profile() {
  const { language, setLanguage } = useSelectedLanguage()
  const {
    session: { authenticated, user },
    signOut
  } = useAuthContext()
  const handleSupportPress = () => {
    Linking.openURL('https://wa.me/51943056060').catch(err =>
      console.error('Failed to open support URL:', err)
    )
  }
  const router = useRouter()
  const { t } = useTranslation()
  const languages = [
    { label: t('profile.languages.en'), value: 'en' },
    { label: t('profile.languages.es'), value: 'es' },
    { label: t('profile.languages.fr'), value: 'fr' },
    { label: t('profile.languages.pt'), value: 'pt' }
  ]
  return (
    <SafeAreaView className="flex-1">
      {authenticated && user ? (
        <>
          <UserInfo user={user} />
          <View className="bg-neutral-900 p-2 rounded-lg shadow-lg m-2">
            <Section
              icon={<Settings {...iconProps} />}
              text={t('profile.profileSettings')}
              onPress={() => router.navigate('/(tabs)/profile/profileSettings')}
            />
            <Section
              icon={<LanguagesIcon {...iconProps} />}
              text={t('profile.language')}
            >
              <Select
                value={language}
                onSelect={selected => setLanguage(selected.value)}
                items={languages}
                placeholder="Language"
                dropdownButtonStyle={{ minWidth: '40%', height: 40 }}
              />
            </Section>
            <Section
              icon={<CircleHelp {...iconProps} />}
              text={t('profile.support')}
              onPress={handleSupportPress}
            />
            <Section
              icon={<Lock {...iconProps} />}
              text={t('profile.privacyPolicy')}
              onPress={() =>
                Linking.openURL('https://www.yiqi.lat/politics/privacy')
              }
            />
            <Section
              icon={<LogOut {...iconProps} />}
              text={t('profile.signOut')}
              onPress={signOut}
            />
            <ThemedText className="text-gray-500 text-sm text-center py-4">
              {t('profile.appVersion')}: {APP_VERSION}
            </ThemedText>
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          {/* Unauthenticated Screen */}
          <User size={80} color="white" />
          <ThemedText className="text-center text-gray-300 text-lg mt-4 mb-6">
            {t('profile.notLoggedIn')}
          </ThemedText>
          <Pressable onPress={() => router.navigate('/login')}>
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
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  )
}
