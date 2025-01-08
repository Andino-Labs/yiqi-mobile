import { Colors } from '@/constants/Colors'
import React from 'react'
import { View } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'

interface ProgressBarProps {
  progress: SharedValue<number>
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Progress bar animated style
  const progressBarStyle = useAnimatedStyle(() => ({
    width: progress.value
  }))

  return (
    <View className="mx-4">
      <View className="relative w-full h-2 bg-gray-300 rounded-full">
        {/* Outer wrapper with margin */}
        <Animated.View
          style={[
            progressBarStyle,
            {
              height: '100%',
              backgroundColor: Colors.dark.tint,
              borderRadius: 4
            }
          ]}
        />
      </View>
    </View>
  )
}

export default ProgressBar
