import React, { useCallback } from 'react'
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { ChevronLeft, Filter } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import FilterEventListModal from '@/components/Event/FilterEventListModal'
import EventListCard from '@/components/Event/EventListCard'
import { useEventList } from '@/hooks/useEventList'
import { PublicEventType } from '@/types/eventTypes'
import { Colors } from '@/constants/Colors'
import { useTranslation } from 'react-i18next'

export type SearchFilterType = {
  title?: string
  startDate?: string
  type?: string
}

export default function Events() {
  const {
    isLoading,
    loadMoreData,
    events,
    handleResetFilters,
    setSearchFilters,
    searchFilters,
    onEventPress,
    closeModal,
    openModal,
    modalVisible,
    applyFilters
  } = useEventList()
  const router = useRouter()
  const { t } = useTranslation()

  const renderFooter = useCallback(() => {
    if (isLoading) {
      return (
        <ActivityIndicator
          className=" py-2"
          size="small"
          color={Colors.dark.tint}
        />
      )
    }

    return null
  }, [isLoading])

  const keyExtractor = useCallback(
    (item: PublicEventType, index: number) =>
      item.id.toString() + '-' + index.toString(),
    []
  )

  const renderItem: ListRenderItem<PublicEventType> = useCallback(
    ({ item }) => <EventListCard onEventPress={onEventPress} event={item} />,
    []
  )

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-2">
        <Pressable onPress={() => router.back()}>
          <ChevronLeft color="white" size={24} />
        </Pressable>

        <Text className="text-white text-lg font-bold">
          {t('general.events')}
        </Text>
        <Pressable onPress={openModal}>
          <Filter color="white" size={24} />
        </Pressable>
      </View>

      <View className="flex-1 m-2">
        <FlashList
          data={events}
          renderItem={renderItem}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.8}
          ListFooterComponent={renderFooter}
          keyExtractor={keyExtractor}
          estimatedItemSize={50}
        />
      </View>

      <FilterEventListModal
        isOpen={modalVisible}
        onSubmit={applyFilters}
        closeModal={closeModal}
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        handleResetFilters={handleResetFilters}
      />
    </SafeAreaView>
  )
}
