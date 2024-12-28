import React from 'react'
import { Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemedText } from '@/components/ui/ThemedText'

interface GradientButtonProps {
  text: string
  colors?: string[]
  onPress: () => void
  containerClassName?: string
  textClassName?: string
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  colors = ['#04F1FF', '#6de4e8'],
  onPress,
  containerClassName,
  textClassName = 'text-gray-800'
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-lg overflow-hidden ${containerClassName}`}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex items-center justify-center p-3"
      >
        <ThemedText className={`font-bold text-base ${textClassName}`}>
          {text}
        </ThemedText>
      </LinearGradient>
    </Pressable>
  )
}
