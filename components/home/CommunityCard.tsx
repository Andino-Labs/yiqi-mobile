import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { CommunitiesType } from '@/types/communitiesType'
import { Calendar, ImageOff } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

interface CommunityCardProps {
  navigateToCommunity: (id: string) => void
  community: CommunitiesType
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  navigateToCommunity
}) => {
  const { id, name, description, logo, eventCount } = community
  const { t } = useTranslation()
  return (
    <TouchableOpacity
      onPress={() => navigateToCommunity(id)}
      activeOpacity={0.9}
      className="bg-neutral-900 rounded-lg shadow-md border border-neutral-800 overflow-hidden flex-1 mx-2 mb-4 min-h-[250px]"
    >
      <View className="h-[150px] w-full relative">
        {logo ? (
          <Image
            source={{ uri: logo }}
            className="absolute inset-0 w-full h-full object-cover"
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <ImageOff color="gray" size={50} />
          </View>
        )}
      </View>

      <View className="p-2">
        <Text numberOfLines={1} className="text-gray-200 font-semibold mb-1">
          {name}
        </Text>
        <Text numberOfLines={3} className="text-gray-400 text-sm">
          {description}
        </Text>
        {eventCount && (
          <View className="flex-row items-center mt-2">
            <View className="flex-row items-center border border-neutral-200 p-2 rounded-lg">
              <Calendar size={16} color="white" />
              <Text className="text-gray-300 text-sm ml-2">
                {eventCount} {t('general.events')}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CommunityCard
