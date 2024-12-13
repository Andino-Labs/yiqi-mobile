import { Button, FlatList, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import trpc from '@/constants/trpc'
import { Link, useRouter } from 'expo-router'
import { useSelectedLanguage } from '@/i18n/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import EventCard from '@/components/Event/EventCard'
import { PublicEventType } from '@/types/eventTypes'

export default function HomeScreen() {
  const { data, error, failureReason } = trpc.getPublicEvents.useQuery()

  const { language, setLanguage } = useSelectedLanguage()
  const router = useRouter()
  const onEventPress = (eventId: string) =>
    router.push({
      pathname: '/(public)/eventDetails/[eventId]',
      params: { eventId }
    })
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 m-2">
        <Button onPress={() => router.push('/login')} title="login"></Button>
        <FlatList
          data={data?.events}
          renderItem={({ item }) => (
            <EventCard
              onEventPress={onEventPress}
              event={item as PublicEventType}
            />
          )}
        />
      </View>
      <ThemedView className="flex-row">
        <ThemedText type="defaultSemiBold">
          Selected Language : {language}
        </ThemedText>
        <Button title="EN" onPress={() => setLanguage('en')} />
        <Button title="ES" onPress={() => setLanguage('es')} />
      </ThemedView>
    </SafeAreaView>
  )
}
