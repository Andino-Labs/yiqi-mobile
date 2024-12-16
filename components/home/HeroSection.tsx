import React from 'react'
import { View, TouchableOpacity, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import { Calendar, Users } from 'lucide-react-native'
import { Image } from 'expo-image'
import { useTranslation } from 'react-i18next'
import { ThemedText } from '../ThemedText'
interface HeroSectionProps {
  onCallToActionPress: () => void
}
export default function HeroSection({ onCallToActionPress }: HeroSectionProps) {
  const { t } = useTranslation()
  return (
    <View className={'mt-10 px-4'}>
      <Image
        source={require('@/assets/images/logo.png')}
        className="h-16 aspect-video"
        contentFit="fill"
      />
      <ThemedText className={'text-white text-4xl font-bold mt-6'}>
        {t('Home.HeroSection.heroTitle1')}
      </ThemedText>
      <MaskedView
        maskElement={
          <ThemedText className={'text-4xl font-bold text-white'}>
            {t('Home.HeroSection.heroTitle2')}
          </ThemedText>
        }
      >
        <LinearGradient
          colors={['#04F1FF', '#6de4e8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className={'h-10'}
        />
      </MaskedView>

      <ThemedText className={'text-gray-400 text-base mt-4'}>
        {t('Home.HeroSection.heroDescription')}
      </ThemedText>
      <Pressable
        className={'mt-6 w-full sm:w-auto'}
        onPress={onCallToActionPress}
      >
        <LinearGradient
          colors={['#04F1FF', '#6de4e8']}
          className={
            'px-4 py-3 rounded-lg items-center justify-center bg-transparent'
          }
        >
          <ThemedText className={'text-gray-800 text-base font-bold'}>
            {t('Home.HeroSection.heroCTA')}
          </ThemedText>
        </LinearGradient>
      </Pressable>

      <View className={'mt-10 space-y-4'}>
        <TouchableOpacity
          className={'p-4 rounded-xl border border-[#04F1FF]/20'}
        >
          <LinearGradient
            colors={['#000000', '#04F1FF10']}
            className={'absolute inset-0 rounded-xl'}
          />
          <Calendar className={'text-[#04F1FF] mb-3'} size={32} />
          <ThemedText className={'text-lg font-semibold text-white mb-2'}>
            {t('Home.HeroSection.feature1Title')}
          </ThemedText>
          <ThemedText className={'text-gray-400 text-sm'}>
            {t('Home.HeroSection.feature1Description')}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          className={'p-4 rounded-xl border border-[#6de4e8]/20'}
        >
          <LinearGradient
            colors={['#000000', '#6de4e818']}
            className={'absolute inset-0 rounded-xl'}
          />
          <Users className={'text-[#6de4e8] mb-3'} size={32} />
          <ThemedText className={'text-lg font-semibold text-white mb-2'}>
            {t('Home.HeroSection.feature2Title')}
          </ThemedText>
          <ThemedText className={'text-gray-400 text-sm'}>
            {t('Home.HeroSection.feature2Description')}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  )
}
