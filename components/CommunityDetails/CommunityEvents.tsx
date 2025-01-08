import { View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { PublicEventType } from '@/types/eventTypes'
import { Tabs } from 'react-native-collapsible-tab-view'
import { t } from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import type { ListRenderItem } from '@react-native/virtualized-lists'
import CommunityEventCard from './CommunityEventCard'
import { useRouter } from 'expo-router'
import EmptyEventComponent from './EmptyEventComponent'
async function getValidEvents(events: PublicEventType[]) {
  const now = new Date()
  return events.filter(event => new Date(event.startDate) >= now)
}

async function getPastEvents(events: PublicEventType[]) {
  const now = new Date()
  return events.filter(event => new Date(event.startDate) < now)
}

export default function CommunityEvents({
  events
}: {
  events: PublicEventType[]
}) {
  const [validEvents, setValidEvents] = useState<PublicEventType[]>([])
  const [pastEvents, setPastEvents] = useState<PublicEventType[]>([])
  const router = useRouter()
  useEffect(() => {
    const fetchEvents = async () => {
      const valid = await getValidEvents(events)
      const past = await getPastEvents(events)
      setValidEvents(valid)
      setPastEvents(past)
    }

    fetchEvents()
  }, [events])
  const onEventPress = useCallback(
    (eventId: string) =>
      router.push({
        pathname: '/eventDetails/[eventId]',
        params: { eventId }
      }),
    [router]
  )
  const renderItem: ListRenderItem<PublicEventType> = useCallback(
    ({ item }) => (
      <CommunityEventCard onEventPress={onEventPress} event={item} />
    ),
    [onEventPress]
  )
  const renderContent = () => (
    <View className="flex-1 m-2">
      <Tabs.FlatList
        data={validEvents}
        key="eventsUpcomingEvents"
        ListHeaderComponent={() => (
          <ThemedText className="mt-2 font-bold">
            {t('community.eventsUpcomingEvents')}
          </ThemedText>
        )}
        ListEmptyComponent={<EmptyEventComponent />}
        renderItem={renderItem}
      />
      <Tabs.FlatList
        data={pastEvents}
        key="eventsPastEvents"
        ListHeaderComponent={() => (
          <ThemedText className="mt-2 font-bold">
            {t('community.eventsPastEvents')}
          </ThemedText>
        )}
        ListEmptyComponent={<EmptyEventComponent />}
        renderItem={renderItem}
      />
    </View>
  )
  return (
    <Tabs.FlatList
      data={[{ key: 'content' }]}
      renderItem={renderContent}
      keyExtractor={item => item.key}
      contentContainerStyle={{
        flexGrow: 1
      }}
    />
  )
}
