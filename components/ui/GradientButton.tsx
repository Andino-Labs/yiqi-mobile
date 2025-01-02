import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemedText } from '@/components/ui/ThemedText'

interface GradientButtonProps extends PressableProps {
  text: string
  colors?: string[]
  containerClassName?: string
  textClassName?: string
  iconRight?: React.ReactNode
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  colors = ['#04F1FF', '#6de4e8'],
  containerClassName,
  textClassName = 'text-gray-800',
  iconRight,
  ...pressableProps
}) => {
  return (
    <Pressable
      className={`rounded-lg overflow-hidden ${containerClassName}`}
      {...pressableProps}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-row items-center justify-center p-3"
      >
        <ThemedText className={`font-bold text-base ${textClassName}`}>
          {text}
        </ThemedText>
        {iconRight}
      </LinearGradient>
    </Pressable>
  )
}
