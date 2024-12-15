import { ScrollView } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useLocalSearchParams } from 'expo-router'

export default function communityDetails() {
  const { communityId } = useLocalSearchParams<{ communityId: string }>()

  return (
    <ScrollView>
      <Stack.Screen />
      <SafeAreaView className="flex-1 bg-black px-5 py-2">
        <ThemedText className="text-white text-2xl font-bold mb-2">
          {'Comminity '}
          {communityId}
        </ThemedText>
      </SafeAreaView>
    </ScrollView>
  )
}
