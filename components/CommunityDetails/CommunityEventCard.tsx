import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native'
import { ImageOff } from 'lucide-react-native'
import { PublicEventType } from '@/types/eventTypes'
import { Image } from 'expo-image'

const CommunityEventCard: React.FC<{
  event: PublicEventType
  onEventPress: (eventId: string) => void
  styles?: StyleProp<ViewStyle>
}> = ({
  onEventPress,
  event: { id, title, startDate, openGraphImage },
  styles
}) => {
  // Format the date
  const formattedDate = startDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <TouchableOpacity
      style={styles}
      onPress={() => onEventPress(id)}
      className="flex-row bg-neutral-900 rounded-lg shadow-md w-full overflow-hidden my-2"
    >
      <View className="p-4 flex-1">
        <Text className="text-[#04F1FF] text-sm mb-2">{formattedDate}</Text>
        <Text className="text-white font-bold text-lg">{title}</Text>
      </View>
      <View className="p-2 w-1/3 h-24 mr-2">
        {openGraphImage ? (
          <Image
            source={{ uri: openGraphImage }}
            contentFit="cover"
            className="h-full w-full rounded-lg overflow-hidden"
            style={{
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8
            }}
          />
        ) : (
          <View className="bg-neutral-800 flex items-center justify-center h-full w-full rounded-lg">
            <ImageOff color={'gray'} size={30} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CommunityEventCard
