import React from 'react'
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import { ImageOff } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

const EmptyEventComponent: React.FC<{ styles?: StyleProp<ViewStyle> }> = ({
  styles
}) => {
  const { t } = useTranslation()
  return (
    <View
      style={styles}
      className="flex-row bg-neutral-900 rounded-lg shadow-md w-full overflow-hidden my-2"
    >
      <View className="p-4 flex-1">
        <Text className="text-[#04F1FF] text-sm mb-2">
          {t('community.noEventAvailable')}
        </Text>
        <Text className="text-white font-bold text-lg">
          {t('community.noEventAvailableDescription')}
        </Text>
      </View>
      <View className="p-2 w-1/3 h-24 mr-2">
        <View className="bg-neutral-800 flex items-center justify-center h-full w-full rounded-lg">
          <ImageOff color={'gray'} size={30} />
        </View>
      </View>
    </View>
  )
}

export default EmptyEventComponent
