import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import { Calendar, Users } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ThemedText } from '@/components/ui/ThemedText'
import { GradientButton } from '@/components/ui/GradientButton'
import { Image } from 'expo-image'
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated'

interface HeroSectionProps {
  onCallToActionPress: () => void
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  animationDelay?: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  animationDelay = 0
}) => (
  <Animated.View
    key={title}
    entering={FadeInLeft.delay(animationDelay)}
    className={`mt-5 p-4 rounded-xl border border-[#04F1FF]/20`}
  >
    <LinearGradient
      colors={['#000000', '#6de4e818']}
      className="absolute inset-0 rounded-xl"
    />
    {icon}
    <ThemedText className="text-lg font-semibold text-white mb-2">
      {title}
    </ThemedText>
    <ThemedText className="text-gray-400 text-sm">{description}</ThemedText>
  </Animated.View>
)

export default function HeroSection({ onCallToActionPress }: HeroSectionProps) {
  const { t } = useTranslation()

  return (
    <View className="mt-10 px-4">
      <Animated.View entering={FadeIn}>
        <Image
          source={require('@/assets/images/logo.png')}
          className="h-12 aspect-video mt-2"
          contentFit="fill"
        />
      </Animated.View>
      <ThemedText className="text-white text-4xl font-bold mt-6">
        {t('Home.HeroSection.heroTitle1')}
      </ThemedText>
      <MaskedView
        maskElement={
          <ThemedText className="text-4xl font-bold text-white">
            {t('Home.HeroSection.heroTitle2')}
          </ThemedText>
        }
      >
        <LinearGradient
          colors={['#04F1FF', '#6de4e8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-10"
        />
      </MaskedView>
      <ThemedText className="text-gray-400 text-base mt-4">
        {t('Home.HeroSection.heroDescription')}
      </ThemedText>
      <GradientButton
        text={t('Home.HeroSection.heroCTA')}
        onPress={onCallToActionPress}
        containerClassName="mt-6"
      />
      <FeatureCard
        icon={<Calendar className="text-[#04F1FF] mb-3" size={32} />}
        title={t('Home.HeroSection.feature1Title')}
        description={t('Home.HeroSection.feature1Description')}
      />
      <FeatureCard
        icon={<Users className="text-[#04F1FF] mb-3" size={32} />}
        title={t('Home.HeroSection.feature2Title')}
        description={t('Home.HeroSection.feature2Description')}
        animationDelay={150}
      />
    </View>
  )
}
