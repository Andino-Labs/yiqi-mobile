import React, { useCallback } from 'react'
import CommunityCard from './CommunityCard'
import { CommunitiesType } from '@/types/communitiesType'
import { Link, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import { FlashList, ListRenderItem } from '@shopify/flash-list'

interface CommunitiesListProps {
  communities?: CommunitiesType[]
}

export default function CommunitiesList({ communities }: CommunitiesListProps) {
  const router = useRouter()
  const { t } = useTranslation()

  const navigateToCommunity = (communityId: string) =>
    router.push({
      pathname: '/communityDetails/[communityId]',
      params: { communityId }
    })
  const keyExtractor = useCallback(
    (item: CommunitiesType, index: number) => item.id + index.toString(),
    []
  )
  const renderItem: ListRenderItem<CommunitiesType> = useCallback(
    ({ item }) => (
      <CommunityCard
        navigateToCommunity={navigateToCommunity}
        community={item}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <>
      <ThemedView className="flex-row justify-between px-4 mt-4">
        <ThemedText className="text-white text-lg font-semibold ">
          {t('Home.communityTitle')}
        </ThemedText>
        <Link href={'/(tabs)/communities'}>
          <ThemedText className="text-slate-400 text-sm">
            {t('general.showMore')}
          </ThemedText>
        </Link>
      </ThemedView>
      <FlashList
        data={communities}
        renderItem={renderItem}
        estimatedItemSize={250}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 8 }}
        keyExtractor={keyExtractor}
      />
    </>
  )
}
