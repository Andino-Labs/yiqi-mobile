import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import HeroSection from '@/components/home/HeroSection'
import trpc from '@/constants/trpc'
import FeaturedEventList from '@/components/home/FeaturedEventList'
import CommunitiesList from '@/components/home/CommunitiesList'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useRouter } from 'expo-router'

export default function Home() {
  const { data } = trpc.getPublicEvents.useQuery({
    limit: 8
  })
  const { data: communities } = trpc.getCommunities.useQuery({ limit: 4 })
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
      <FeaturedEventList events={data?.events} />
      <CommunitiesList communities={communities?.communities} />
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
