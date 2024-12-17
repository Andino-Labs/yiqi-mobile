import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import trpc from '@/constants/trpc'
import CommunityCard from '@/components/home/CommunityCard'
import { CommunitiesType } from '@/types/communitiesType'
import { Colors } from '@/constants/Colors'
import { useTranslation } from 'react-i18next'
import { FlashList } from '@shopify/flash-list'

const FETCH_LIMIT = 8

export default function Communities() {
  const router = useRouter()
  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { data, refetch, isFetching } = trpc.getCommunities.useQuery(
    { page, limit: FETCH_LIMIT },
    { enabled: false }
  )

  useEffect(() => {
    refetch()
  }, [page])
  const [communities, setCommunities] = useState<CommunitiesType[]>([])
  useEffect(() => {
    if (page === 1) {
      // On first page, replace the communities list
      if (data?.communities) {
        setCommunities(data.communities)
      }
    } else if (data?.communities) {
      // Append new communities for subsequent pages
      setCommunities(prev => [...prev, ...data.communities])
    }
    setIsLoading(false)
  }, [data])

  const loadMoreData = () => {
    if (!isLoading && data?.pagination.hasMore) {
      setIsLoading(true)
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    refetch()
  }, [page])
  const renderFooter = () => {
    if (isFetching) {
      return (
        <ActivityIndicator
          className=" py-2"
          size="small"
          color={Colors.dark.tint}
        />
      )
    }

    return null
  }

  const navigateToCommunity = (communityId: string) =>
    router.push({
      pathname: '/communityDetails/[communityId]',
      params: { communityId }
    })
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-2">
        {/* Back Arrow */}
        <Pressable onPress={() => router.back()}>
          <ChevronLeft color="white" size={24} />
        </Pressable>

        <Text className="text-white text-lg font-bold">
          {t('general.communities')}
        </Text>
        <View />
      </View>
      <View className="flex-1 m-2">
        <FlashList
          data={communities}
          renderItem={({ item }) => (
            <CommunityCard
              navigateToCommunity={navigateToCommunity}
              community={item}
            />
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.8}
          estimatedItemSize={250}
          ListFooterComponent={renderFooter}
          numColumns={2}
          keyExtractor={(item, index) => item.id + index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}
