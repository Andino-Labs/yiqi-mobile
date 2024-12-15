import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native'
import {
  Calendar,
  MapPin,
  Users,
  Building2,
  ImageOff
} from 'lucide-react-native'
import { PublicEventType } from '@/types/eventTypes'
import { Image } from 'expo-image'
import { useTranslation } from 'react-i18next'

const EventCard: React.FC<{
  event: PublicEventType
  onEventPress: (eventId: string) => void
  styles?: StyleProp<ViewStyle>
}> = ({
  onEventPress,
  event: {
    id,
    title,
    location,
    startDate,
    openGraphImage,
    organization,
    registrations
  },
  styles
}) => {
  // Format the date
  const formattedDate = startDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  const { t } = useTranslation()
  return (
    <TouchableOpacity
      style={styles}
      onPress={() => onEventPress(id)}
      className="bg-neutral-900 rounded-lg shadow-md w-80 mx-auto mt-4"
    >
      <View className="min-h-[180px] rounded-t-lg overflow-hidden">
        {openGraphImage ? (
          <Image
            source={{ uri: openGraphImage }}
            contentFit="cover"
            className="w-full aspect-video"
            style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <ImageOff color={'gray'} size={50} />
          </View>
        )}
      </View>

      <View className="p-4">
        <Text className="text-white font-bold text-lg">{title}</Text>

        <View className="mt-4">
          <View className="flex-row items-center mb-2">
            <Calendar size={16} color="white" />
            <Text className="text-gray-300 text-sm ml-2">{formattedDate}</Text>
          </View>
          <View className="flex-row items-center">
            <MapPin size={16} color="white" />
            <Text className="text-gray-300 text-sm ml-2">{location}</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-between px-4 py-2 bg-neutral-800 rounded-b-lg">
        <View className="flex-row items-center">
          {organization?.logo ? (
            <Image
              source={{ uri: organization.logo }}
              className="h-5 w-5 rounded-full"
              contentFit="fill"
            />
          ) : (
            <Building2 size={16} color="white" />
          )}
          <Text className="text-gray-300 text-sm ml-2">
            {organization?.name || 'Unknown'}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Users size={16} color="white" />
          <Text className="text-gray-300 text-sm ml-2">
            {registrations} {t('general.going')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default EventCard
