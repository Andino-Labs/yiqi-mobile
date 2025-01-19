import React from 'react'
import { View, Text, StyleProp, ViewStyle, Pressable } from 'react-native'
import {
  Calendar,
  MapPin,
  Users,
  Building2,
  ImageOff
} from 'lucide-react-native'
import { PublicEventType } from '@/types/eventTypes'
import { Image } from 'expo-image'

const EventCard: React.FC<{
  event: PublicEventType
  onEventPress: (eventId: string) => void
  styles?: StyleProp<ViewStyle>
}> = ({
  onEventPress,
  event: {
    id,
    title,
    city,
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
    <Pressable
      className="flex-1 bg-neutral-900 shadow-md rounded-lg"
      onPress={() => onEventPress(id)}
      style={styles}
    >
      <View className="min-h-[130px] overflow-hidden">
        {openGraphImage ? (
          <Image
            source={{ uri: openGraphImage }}
            contentFit="cover"
            className="w-full aspect-video"
            style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <ImageOff color="gray" size={50} />
          </View>
        )}
      </View>

      <View className="p-4 flex-1">
        <Text className="text-white font-bold text-lg">{title}</Text>

        <View className="mt-4">
          <View className="flex-row items-center mb-2">
            <Calendar size={16} color="white" />
            <Text className="text-gray-300 text-sm ml-2">{formattedDate}</Text>
          </View>
          <View className="flex-row items-center">
            <MapPin size={16} color="white" />
            <Text className="text-gray-300 text-sm ml-2">{city}</Text>
          </View>
        </View>
      </View>

      {/* Footer with border and bottom border radius */}
      <View className="p-1 bg-neutral-800">
        <View className="flex-row items-center justify-between">
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
            <Text className="text-gray-300 text-sm ml-2">{registrations}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default EventCard
