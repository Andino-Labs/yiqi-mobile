import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { Image } from 'expo-image'
import { User } from 'lucide-react-native'
import { UserType } from '@/schemas/userSchema'

const UserInfo: React.FC<{ user: Pick<UserType, 'name' | 'picture'> }> = ({
  user
}) => {
  return (
    <View className="items-center my-6">
      {user?.picture ? (
        <Image
          source={{ uri: user?.picture }}
          className="w-32 h-32 rounded-full bg-gray-700"
          contentFit="cover"
        />
      ) : (
        <View className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
          <User size={48} color="white" />
        </View>
      )}
      <ThemedText className="text-lg font-semibold text-white mt-2">
        {user?.name}
      </ThemedText>
    </View>
  )
}

export default UserInfo
