import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import trpc from '@/constants/trpc'
import { SearchFilterType } from '@/app/(tabs)/events'

export const useEventList = () => {
  const router = useRouter()

  const [modalVisible, setModalVisible] = useState(false)
  const [searchFilters, setSearchFilters] = useState<SearchFilterType>({
    title: '',
    startDate: '',
    type: ''
  })
  const [page, setPage] = useState(1)
  const [events, setEvents] = useState<any[]>([])

  const { data, refetch, isFetching, isLoading } =
    trpc.getPublicEvents.useQuery(
      { ...searchFilters, page, limit: 8 },
      { enabled: false }
    )

  const onEventPress = useCallback(
    (eventId: string) => {
      router.push({
        pathname: '/eventDetails/[eventId]',
        params: { eventId }
      })
    },
    [router]
  )

  const openModal = useCallback(() => setModalVisible(true), [])
  const closeModal = useCallback(() => setModalVisible(false), [])

  const applyFilters = useCallback(() => {
    setPage(1)
    refetch()
    closeModal()
  }, [closeModal, refetch])

  const handleResetFilters = useCallback(() => {
    setSearchFilters({
      title: '',
      startDate: '',
      type: ''
    })
    applyFilters()
  }, [applyFilters])

  useEffect(() => {
    refetch()
  }, [searchFilters, page, refetch])

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setEvents(data.events)
      } else {
        setEvents(prevEvents => [...prevEvents, ...data.events])
      }
    }
  }, [data, page])

  const loadMoreData = useCallback(() => {
    if (events.length >= data?.totalCount! || isLoading || isFetching) return
    setPage(prevPage => prevPage + 1)
  }, [events, data?.totalCount, isLoading])

  return {
    loadMoreData,
    events,
    handleResetFilters,
    setSearchFilters,
    searchFilters,
    onEventPress,
    isLoading,
    applyFilters,
    closeModal,
    openModal,
    modalVisible
  }
}
