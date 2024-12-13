import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { PublicEventType } from '@/types/eventTypes'
import { Image } from 'expo-image'

const EventCard: React.FC<{
  event: PublicEventType
  onEventPress: (eventId: string) => void
}> = ({
  onEventPress,
  event: {
    id,
    title,
    description,
    location,
    startDate,
    openGraphImage,
    organization,
    registrations
  }
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
      onPress={() => onEventPress(id)}
      className="bg-gray-900 rounded-lg shadow-md w-80 mx-auto mt-4"
    >
      {/* Header Section */}
      <View className=" rounded-t-lg">
        {openGraphImage ? (
          <Image
            source={{ uri: openGraphImage }}
            contentFit="contain"
            className="w-full aspect-video"
          />
        ) : (
          <Text className="text-gray-500 text-center py-4">No Image</Text>
        )}
      </View>

      {/* Content Section */}
      <View className="p-4">
        <Text className="text-white font-bold text-lg">{title}</Text>
        {/* <Text className="text-gray-400 text-sm mt-1">{description}</Text> */}

        {/* Date and Location */}
        <View className="mt-4">
          <View className="flex-row items-center mb-2">
            <FontAwesome name="calendar" size={16} color="white" />
            <Text className="text-gray-300 text-sm ml-2">{formattedDate}</Text>
          </View>
          <View className="flex-row items-center">
            <FontAwesome name="map-marker" size={16} color="white" />
            <Text className="text-gray-300 text-sm ml-2">{location}</Text>
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View className="flex-row items-center justify-between px-4 py-2 bg-gray-800 rounded-b-lg">
        {/* Organization Info */}
        <View className="flex-row items-center">
          {organization?.logo ? (
            <Image
              source={{ uri: organization.logo }}
              className="h-5 w-5 rounded-full"
              contentFit="contain"
            />
          ) : (
            <FontAwesome name="building" size={16} color="white" />
          )}
          <Text className="text-gray-300 text-sm ml-2">
            {organization?.name || 'Unknown'}
          </Text>
        </View>

        {/* Registrations */}
        <View className="flex-row items-center">
          <FontAwesome name="user" size={16} color="white" />
          <Text className="text-gray-300 text-sm ml-2">
            {registrations} Going
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default EventCard
