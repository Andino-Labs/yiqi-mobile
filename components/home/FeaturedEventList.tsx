import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import EventCard from '@/components/Event/EventCard'
import { PublicEventType } from '@/types/eventTypes'
import { Link, useRouter } from 'expo-router'
import { ThemedText } from '@/components/ui/ThemedText'
import { useTranslation } from 'react-i18next'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { ThemedView } from '@/components/ui/ThemedView'
import trpc from '@/constants/trpc'
import { getQueryKey } from '@trpc/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { errorHandler } from '@/helpers/errorHandler'

interface FeaturedEventListProps {
  events?: PublicEventType[]
}
export default function FeaturedEventList({ events }: FeaturedEventListProps) {
  const router = useRouter()
  const { t } = useTranslation()

  // Prefetch event details
  const queryClient = useQueryClient()
  const fetchEvent = trpc.getEvent.useQuery(
    { includeTickets: true, eventId: '' },
    { enabled: false }
  )

  const onEventPress = useCallback(
    async (eventId: string) => {
      try {
        const queryKey = getQueryKey(trpc.getEvent, {
          eventId,
          includeTickets: true
        })

        await queryClient.prefetchQuery(queryKey, () => fetchEvent.refetch)

        // Navigate to event details
        router.push({
          pathname: '/eventDetails/[eventId]',
          params: { eventId }
        })
      } catch (error) {
        errorHandler(error)
      }
    },
    [fetchEvent.refetch, queryClient, router]
  )
  const keyExtractor = useCallback(
    (item: PublicEventType, index: number) => item.id + index.toString(),
    []
  )
  const renderItem: ListRenderItem<PublicEventType> = useCallback(
    ({ item }) => (
      <EventCard
        onEventPress={onEventPress}
        event={item}
        styles={styles.eventCard}
      />
    ),
    [onEventPress]
  )
  return (
    <>
      <ThemedView className="flex-row justify-between px-4 mt-4">
        <ThemedText className="text-white text-lg font-semibold ">
          {t('Home.eventsNear')}
        </ThemedText>
        <Link href={'/(tabs)/events'}>
          <ThemedText className="text-slate-400 text-sm">
            {t('general.showMore')}
          </ThemedText>
        </Link>
      </ThemedView>

      {/* Make sure the FlashList has a valid size */}
      <FlashList
        data={events}
        horizontal
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        alwaysBounceHorizontal
        estimatedItemSize={300}
        estimatedListSize={{
          height: 300,
          width: 220
        }}
        renderItem={renderItem}
      />
    </>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15
  },
  eventCard: {
    marginRight: 12,
    width: 220 // Adjust card width to your design
  }
})
