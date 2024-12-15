import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  StyleSheet
} from 'react-native'
import { CommunitiesType } from '@/types/communitiesType'
import { ImageOff } from 'lucide-react-native'

interface CommunityCardProps {
  navigateToCommunity: (id: string) => void
  community: CommunitiesType
  style?: ViewStyle
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  navigateToCommunity,
  style
}) => {
  const { id, name, description, logo } = community

  return (
    <TouchableOpacity
      onPress={() => navigateToCommunity?.(id)}
      activeOpacity={0.9}
      style={[styles.container, style]}
      className="bg-neutral-900 rounded-lg shadow-md min-h-fit mx-auto mt-4 border border-neutral-800"
    >
      <View className="min-h-[150px] w-auto">
        {logo ? (
          <Image
            source={{ uri: logo }}
            style={styles.image}
            className="absolute inset-0 object-cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <ImageOff color={'gray'} size={50} />
          </View>
        )}
      </View>

      <View className="p-2 relative flex flex-col justify-between">
        <Text numberOfLines={1} className="text-gray-200 mb-1">
          {name}
        </Text>
        <Text className="text-gray-400 text-sm" numberOfLines={3}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default CommunityCard
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    minHeight: 250,
    width: '45%'
  },
  image: {
    width: '100%',
    height: '100%'
  }
})
