import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import EventCard from '@/components/Event/EventCard'
import { PublicEventType } from '@/types/eventTypes'
import { Link, useRouter } from 'expo-router'
import { ThemedText } from '../ThemedText'
import { useTranslation } from 'react-i18next'

interface FeaturedEventListProps {
  events?: PublicEventType[]
}
export default function FeaturedEventList({ events }: FeaturedEventListProps) {
  const router = useRouter()
  const { t } = useTranslation()

  const onEventPress = (eventId: string) =>
    router.push({
      pathname: '/eventDetails/[eventId]',
      params: { eventId }
    })

  const keyExtractor = useCallback(
    (item: PublicEventType, index: number) => item.id + index,
    []
  )
  return (
    <>
      <View className="flex-row justify-between px-4 mt-4">
        <ThemedText className="text-white text-lg font-semibold ">
          {t('Home.eventsNear')}
        </ThemedText>
        <Link href={'/(tabs)/events'}>
          <ThemedText className="text-slate-400 text-sm">
            {t('general.showMore')}
          </ThemedText>
        </Link>
      </View>
      <FlatList
        data={events || []}
        horizontal
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        className="pl-2"
        alwaysBounceHorizontal
        renderItem={({ item }) => (
          <EventCard
            onEventPress={onEventPress}
            event={item}
            styles={styles.eventCard}
          />
        )}
      />
    </>
  )
}
const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10
  },
  eventCard: { marginRight: 10 }
})
