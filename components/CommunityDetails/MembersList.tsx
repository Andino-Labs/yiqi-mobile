import { View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { Image } from 'expo-image'

import { UserType } from '@/types/UserType'
import { ImageOff } from 'lucide-react-native'

export default function Memberslist({ users }: { users: UserType[] }) {
  return (
    <View className="mt-2">
      {users.map((el, index) => (
        <View key={index} className="flex-row items-center py-2 px-4">
          {el.picture ? (
            <Image
              source={el.picture}
              className="w-12 h-12 rounded-full mr-4"
            />
          ) : (
            <View className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <ImageOff color="gray" size={30} />
            </View>
          )}
          <ThemedText className="text-lg text-white-800">{el.name}</ThemedText>
        </View>
      ))}
    </View>
  )
}
