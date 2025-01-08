import { ProfileWithPrivacy } from '@/schemas/userSchema'
import React from 'react'
import { View, Switch } from 'react-native'
import { ThemedText } from '../ui/ThemedText'
import { useFormContext } from 'react-hook-form'

type PrivacySwitchComponentProps = {
  field: keyof ProfileWithPrivacy['privacySettings']
  label: string
}

const PrivacySwitch: React.FC<PrivacySwitchComponentProps> = ({
  field,
  label
}) => {
  const { watch, setValue } = useFormContext()
  return (
    <View className="flex-row items-center justify-between">
      <ThemedText className="mb-1 text-sm font-medium">{label}</ThemedText>
      <Switch
        value={watch(`privacySettings.${field}`)}
        onValueChange={checked =>
          setValue(`privacySettings.${field}`, checked, {
            shouldDirty: true
          })
        }
      />
    </View>
  )
}
export default PrivacySwitch
