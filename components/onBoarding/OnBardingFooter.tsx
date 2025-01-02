import { LoaderIcon, ChevronRight } from 'lucide-react-native'
import React from 'react'
import { View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { GradientButton } from '../ui/GradientButton'

type OnBordingButtonProps = {
  isLoading: boolean
  handleStepChange: () => void
}

const OnBordingButton: React.FC<OnBordingButtonProps> = ({
  handleStepChange,
  isLoading
}) => (
  <View className="flex-row justify-center items-center border-t border-neutral-800 p-3">
    <Animated.View entering={FadeIn}>
      <GradientButton
        containerClassName="w-80"
        onPress={handleStepChange}
        text={isLoading ? '' : 'Next'}
        textClassName="text-gray-800"
        iconRight={
          isLoading ? (
            <LoaderIcon color="black" />
          ) : (
            <ChevronRight color="black" />
          )
        }
        disabled={isLoading}
      />
    </Animated.View>
  </View>
)

export default OnBordingButton
