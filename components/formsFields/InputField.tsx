import React from 'react'
import { TextInput, Text, View } from 'react-native'
import { Controller, FieldError, get, useFormContext } from 'react-hook-form'
import { ThemedText } from '@/components/ui/ThemedText'

type InputFieldProps = {
  name: string
  label?: string
  placeholder?: string
  secureTextEntry?: boolean
  containerClassName?: string
  labelClassName?: string
  leftIcon?: React.ReactNode
  disabled?: boolean
  textarea?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  secureTextEntry = false,
  containerClassName,
  labelClassName,
  leftIcon,
  disabled,
  textarea = false // New prop to toggle textarea behavior
}) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const fieldError = get(errors, name) as FieldError | undefined

  return (
    <View className={containerClassName || 'mb-4'}>
      {label && (
        <ThemedText
          className={`${labelClassName || ''} mb-1 text-sm font-medium`}
        >
          {label}
        </ThemedText>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            className={`flex-row items-center rounded-md border ${
              fieldError ? 'border-red-500' : 'border-neutral-600'
            } ${textarea ? 'px-2 py-3' : 'px-2 py-2'}`} // Adjust padding for textarea
          >
            {leftIcon && !textarea && (
              <View className={'mr-2'}>{leftIcon}</View>
            )}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor="gray"
              multiline={textarea}
              numberOfLines={textarea ? 3 : 1}
              className={`flex-1 text-white text-sm`}
              editable={!disabled}
            />
          </View>
        )}
      />
      {fieldError?.message && (
        <Text className={'text-red-500 mt-1 text-xs'}>
          {fieldError.message}
        </Text>
      )}
    </View>
  )
}

export default InputField
