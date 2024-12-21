import React from 'react'
import { TextInput, Text, View } from 'react-native'
import { Controller, FieldError, get, useFormContext } from 'react-hook-form'
import { ThemedText } from '../ThemedText'

type InputFieldProps = {
  name: string
  label?: string
  placeholder?: string
  secureTextEntry?: boolean
  containerClassName?: string
  labelClassName?: string
  leftIcon?: React.ReactNode
  disabled?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  secureTextEntry = false,
  containerClassName,
  labelClassName,
  leftIcon,
  disabled
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
            }  px-2 py-2`}
          >
            {leftIcon && <View className={'mr-2'}>{leftIcon}</View>}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              // editable={!disabled}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor="gray"
              className={'flex-1 text-white text-sm'}
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
