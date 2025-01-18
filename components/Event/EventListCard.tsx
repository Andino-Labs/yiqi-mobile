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

type EventCardType = Pick<
  PublicEventType,
  | 'id'
  | 'title'
  | 'location'
  | 'startDate'
  | 'openGraphImage'
  | 'organization'
  | 'registrations'
>

const EventListCard: React.FC<{
  event: EventCardType
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

  return (
    <TouchableOpacity
      style={styles}
      onPress={() => onEventPress(id)}
      className="flex-1 bg-neutral-900 rounded-lg shadow-md w-full flex-row overflow-hidden my-2"
    >
      <View className="w-1/3 p-1">
        {openGraphImage ? (
          <Image
            source={{ uri: openGraphImage }}
            contentFit="cover"
            className="h-full w-full rounded-lg"
          />
        ) : (
          <View className="bg-neutral-800 flex items-center justify-center h-full w-full rounded-lg">
            <ImageOff color={'gray'} size={50} />
          </View>
        )}
      </View>

      <View className="p-4 flex-1">
        <Text numberOfLines={3} className="text-white font-bold text-base">
          {title}
        </Text>

        <View className="mt-2">
          <View className="flex-row items-center mb-2">
            <Calendar size={16} color="white" />
            <Text className="text-gray-300 text-sm ml-2">{formattedDate}</Text>
          </View>
          <View className="flex-row items-center">
            <MapPin size={16} color="white" />
            <Text className="text-gray-300 text-sm ml-2">{location}</Text>
          </View>
        </View>

        {organization && (
          <View className="flex-row items-center justify-between mt-4">
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
                {registrations}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default EventListCard
