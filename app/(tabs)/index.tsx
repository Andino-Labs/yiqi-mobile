import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import HeroSection from '@/components/home/HeroSection'
import trpc from '@/constants/trpc'
import FeaturedEventList from '@/components/home/FeaturedEventList'
import CommunitiesList from '@/components/home/CommunitiesList'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useRouter } from 'expo-router'

export default function Home() {
  const [eventsQuery, communitiesQuery] = trpc.useQueries(t => [
    t.getPublicEvents({ limit: 8 }),
    t.getCommunities({ limit: 4, page: 1 })
  ])
  const { authenticated } = useCurrentUser()
  const router = useRouter()

  const onCallToActionPress = () => {
    if (authenticated) {
      return router.navigate('/events')
    }
    router.navigate('/login')
  }
  const renderContent = () => (
    <>
      <HeroSection onCallToActionPress={onCallToActionPress} />
      <FeaturedEventList events={eventsQuery?.data?.events} />
      <CommunitiesList communities={communitiesQuery?.data?.communities} />
    </>
  )

  return (
    <FlatList
      // Using FlatList instead of ScrollView ensures better performance for potentially large datasets.
      // This avoids rendering all the items at once (as ScrollView would) by lazily rendering them.
      // It also resolves potential nested scrolling issues and improves memory usage.
      data={[{ key: 'content' }]}
      renderItem={renderContent}
      keyExtractor={item => item.key}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flexGrow: 1,
    paddingBottom: 16
  }
})
