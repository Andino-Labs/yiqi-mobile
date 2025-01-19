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

  // Fetch events with filters and pagination
  const { data, refetch, isFetching, isLoading, isInitialLoading } =
    trpc.getPublicEvents.useQuery({ ...searchFilters, page, limit: 8 })

  const utils = trpc.useUtils()

  // Prefetch event details for visible events
  useEffect(() => {
    const newEventIds = data?.events
      ?.filter(
        event =>
          !utils.getEvent.getData({ eventId: event.id, includeTickets: true })
      )
      .map(event => event.id)

    newEventIds?.forEach(eventId =>
      utils.getEvent.prefetch({ eventId, includeTickets: true })
    )
  }, [data?.events, utils])

  // Handle event press with cache check
  const onEventPress = useCallback(
    async (eventId: string) => {
      const cachedEvent = utils.getEvent.getData({
        eventId,
        includeTickets: true
      })
      if (!cachedEvent) {
        try {
          await utils.getEvent.prefetch({ eventId, includeTickets: true })
        } catch (err) {
          console.error('Prefetch failed:', err)
        }
      }
      router.push({
        pathname: '/eventDetails/[eventId]',
        params: { eventId }
      })
    },
    [router, utils]
  )

  // Modal visibility handlers
  const openModal = useCallback(() => setModalVisible(true), [])
  const closeModal = useCallback(() => setModalVisible(false), [])

  // Apply filters and reset pagination
  const applyFilters = useCallback(() => {
    setPage(1) // Reset pagination
    refetch() // Refetch with updated filters
    closeModal()
  }, [refetch, closeModal])

  // Reset filters and apply changes
  const handleResetFilters = useCallback(() => {
    setSearchFilters({
      title: '',
      startDate: '',
      type: ''
    })
    applyFilters()
  }, [applyFilters])

  // Update events when data changes
  useEffect(() => {
    if (data?.events) {
      setEvents(prevEvents =>
        page === 1 ? data.events : [...prevEvents, ...data.events]
      )
    }
  }, [data?.events, page])

  // Load more data for infinite scroll
  const loadMoreData = useCallback(() => {
    if (events.length >= (data?.totalCount ?? 0) || isLoading || isFetching)
      return
    setPage(prevPage => prevPage + 1)
  }, [events.length, data?.totalCount, isLoading, isFetching])

  return {
    loadMoreData,
    events,
    handleResetFilters,
    setSearchFilters,
    searchFilters,
    onEventPress,
    isLoading,
    isInitialLoading,
    applyFilters,
    closeModal,
    openModal,
    modalVisible
  }
}
