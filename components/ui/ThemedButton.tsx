import React from 'react'
import { ActivityIndicator, Pressable, PressableProps } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useBounceButton } from '@/hooks/useBounceButton'
import Animated from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'

interface ThemedButtonProps extends PressableProps {
  text: string
  buttonClassName?: string
  textClassName?: string
  isLoading?: boolean
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  text,
  buttonClassName = '',
  textClassName = '',
  isLoading = false,
  ...pressableProps
}) => {
  const { animatedStyle, handlePressIn, handlePressOut } = useBounceButton()
  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isLoading}
        className={`border-neutral-200 border-[1px] py-3 rounded-lg items-center ${buttonClassName}`}
        {...pressableProps}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.dark.tint} />
        ) : (
          <ThemedText
            className={`font-bold text-white text-base ${textClassName}`}
          >
            {text}
          </ThemedText>
        )}
      </Pressable>
    </Animated.View>
  )
}
