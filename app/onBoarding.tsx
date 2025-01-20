import React, { useRef, useState } from 'react'
import { View, Dimensions, Pressable } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import trpc from '@/constants/trpc'
import { ThemedText } from '@/components/ui/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import StepOne from '@/components/onBoarding/StepOne'
import StepTwo from '@/components/onBoarding/StepTwo'
import StepThree from '@/components/onBoarding/StepThree'
import { ArrowLeft, X } from 'lucide-react-native'
import ProgressBar from '@/components/onBoarding/ProgressBar'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'

const { width } = Dimensions.get('window')

const OnBoarding = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const progress = useSharedValue(0)
  const pagerRef = useRef<PagerView>(null)
  const { data } = trpc.getUserProfile.useQuery()
  const { t } = useTranslation()
  const steps = [
    t('onBoarding.step1'),
    t('onBoarding.step2'),
    t('onBoarding.step3')
  ]
  const progressBarWidth = width - 32

  const updateProgress = (step: number) => {
    progress.value = withTiming(
      (step / (steps.length - 1)) * progressBarWidth,
      {
        duration: 300
      }
    )
  }

  const handleBack = () => {
    if (currentStep === 0 && router.canGoBack()) {
      router.back()
      return
    }

    const previousStep = currentStep - 1
    if (previousStep >= 0) {
      setCurrentStep(previousStep)
      updateProgress(previousStep)
      pagerRef.current?.setPage(previousStep)
    }
  }

  const handleStepChange = () => {
    const nextStep = currentStep + 1
    if (nextStep < steps.length) {
      setCurrentStep(nextStep)
      updateProgress(nextStep)
      pagerRef.current?.setPage(nextStep)
    } else {
      router.navigate('/(tabs)')
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center m-4">
        <Pressable onPress={handleBack}>
          <ArrowLeft color="white" />
        </Pressable>
        <ThemedText className="text-lg font-semibold text-center">
          {steps[currentStep]}
        </ThemedText>
        <Pressable onPress={() => router.navigate('/(tabs)/')}>
          <X color="white" />
        </Pressable>
      </View>

      <ProgressBar progress={progress} />

      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={e => {
          const position = e.nativeEvent.position
          setCurrentStep(position)
          updateProgress(position)
        }}
      >
        {[StepOne, StepTwo, StepThree].map((StepComponent, index) => (
          <View key={index} className="p-4">
            {data && (
              <StepComponent handleStepChange={handleStepChange} user={data} />
            )}
          </View>
        ))}
      </PagerView>
    </SafeAreaView>
  )
}

export default OnBoarding
