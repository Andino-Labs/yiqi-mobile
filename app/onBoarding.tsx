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

const { width } = Dimensions.get('window')

const OnBoarding = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const progress = useSharedValue(0)
  const pagerRef = useRef<PagerView>(null) // Ref for PagerView
  const { data } = trpc.getUserProfile.useQuery()

  const steps = [
    'Personal Details',
    'Professional Details',
    'Enhanced Networking'
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
  const handleStepChange = (direction: 'next' | 'back') => {
    const nextStep = currentStep + (direction === 'next' ? 1 : -1)
    if (nextStep >= 0 && nextStep < steps.length) {
      setCurrentStep(nextStep)
      updateProgress(nextStep)
      pagerRef.current?.setPage(nextStep)
    } else if (direction === 'back' && currentStep === 0) {
      router.back()
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center m-4">
        <Pressable onPress={() => handleStepChange('back')}>
          <ArrowLeft color="white" />
        </Pressable>
        <ThemedText className="text-lg font-semibold text-center">
          {steps[currentStep]}
        </ThemedText>
        <Pressable onPress={() => router.back()}>
          <X color="white" />
        </Pressable>
      </View>
      <ProgressBar progress={progress} />
      {/* PagerView for Screens */}
      <PagerView
        ref={pagerRef} // Attach ref to PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={e => {
          setCurrentStep(e.nativeEvent.position)
          updateProgress(e.nativeEvent.position)
        }}
      >
        <View key="1" className="p-4">
          {data && <StepOne user={data} />}
        </View>
        <View key="2" className="p-4">
          {data && <StepTwo user={data} />}
        </View>

        <View key="3" className="p-4">
          {data && <StepThree initialData={data} />}
        </View>
      </PagerView>
      {/* <View className="flex-row justify-between p-2">
        {currentStep > 0 && (
          <TouchableOpacity
            onPress={handleBack}
            className="px-4 py-2 rounded-lg"
          >
            <ThemedText className="text-gray-700">Back</ThemedText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleNext}
          className="px-4 py-2  rounded-lg"
        >
          <ThemedText className="text-white">
            {currentStep < steps.length - 1 ? 'Next' : 'Submit'}
          </ThemedText>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  )
}

export default OnBoarding
