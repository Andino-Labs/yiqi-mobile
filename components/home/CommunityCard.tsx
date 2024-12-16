import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { CommunitiesType } from '@/types/communitiesType'
import { ImageOff } from 'lucide-react-native'

interface CommunityCardProps {
  navigateToCommunity: (id: string) => void
  community: CommunitiesType
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  navigateToCommunity
}) => {
  const { id, name, description, logo } = community

  return (
    <TouchableOpacity
      onPress={() => navigateToCommunity(id)}
      activeOpacity={0.9}
      className="bg-neutral-900 rounded-lg shadow-md border border-neutral-800 overflow-hidden flex-1 mx-2 mb-4 min-h-[250px]"
    >
      {/* Logo Section */}
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

      {/* Text Content */}
      <View className="p-2 flex-1 flex flex-col justify-between">
        <Text numberOfLines={1} className="text-gray-200 font-semibold mb-1">
          {name}
        </Text>
        <Text numberOfLines={3} className="text-gray-400 text-sm">
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CommunityCard
