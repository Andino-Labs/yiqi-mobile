import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import trpc from '@/constants/trpc'
import { SearchFilterType } from '@/app/(tabs)/events'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'

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

  // Fetch events with filters, pagination
  const { data, refetch, isFetching, isLoading } =
    trpc.getPublicEvents.useQuery({ ...searchFilters, page, limit: 8 })
  // Prefetch event details
  const queryClient = useQueryClient()
  const fetchEvent = trpc.getEvent.useQuery(
    { includeTickets: true, eventId: '' },
    { enabled: false }
  )
  // Handle event press with prefetching event details
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
        console.log(error)
      }
    },
    [queryClient, router]
  )

  // Open and close modal handlers
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

  // Refetch when filters or page change
  useEffect(() => {
    refetch()
  }, [searchFilters, page, refetch])

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
    applyFilters,
    closeModal,
    openModal,
    modalVisible
  }
}
