import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import CommunityCard from './CommunityCard'
import { CommunitiesType } from '@/types/communitiesType'
import { Link, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'

interface CommunitiesListProps {
  communities?: CommunitiesType[]
}

export default function CommunitiesList({ communities }: CommunitiesListProps) {
  const keyExtractor = useCallback(
    (item: CommunitiesType, index: number) => item.id + index,
    []
  )
  const router = useRouter()
  const { t } = useTranslation()

  const navigateToCommunity = (communityId: string) =>
    router.push({
      pathname: '/communityDetails/[communityId]',
      params: { communityId }
    })
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
      <FlatList
        data={communities || []}
        numColumns={2} // Two-column layout
        keyExtractor={keyExtractor}
        nestedScrollEnabled
        className="pl-2 mt-2"
        columnWrapperStyle={{
          justifyContent: 'space-between'
        }}
        renderItem={({ item }) => (
          <CommunityCard
            navigateToCommunity={navigateToCommunity}
            community={item}
          />
        )}
      />
    </>
  )
}
