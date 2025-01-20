import {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

export const useBounceButton = (
  pressedScale: number = 0.95,
  releasedScale: number = 1
) => {
  const scale = useSharedValue(releasedScale)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value
      }
    ]
  }))

  const handlePressIn = () => {
    scale.value = withSpring(pressedScale, { damping: 10, stiffness: 200 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(releasedScale, { damping: 10, stiffness: 200 })
  }

  return {
    animatedStyle,
    handlePressIn,
    handlePressOut
  }
}
