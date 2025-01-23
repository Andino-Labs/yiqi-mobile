import { useState, useEffect, useMemo, useCallback } from 'react'
import showToast from '@/helpers/showToast'
import trpc from '@/constants/trpc'
import { PublicEventType } from '@/types/eventTypes'
import { errorHandler } from '@/helpers/errorHandler'
import { RegistrationType } from '@/types/RegistrationType'
import { UserType } from '@/schemas/userSchema'

export const useRegistration = (event: PublicEventType, user?: UserType) => {
  const [state, setState] = useState({
    ticketSelections: {} as Record<string, number>,
    isModalVisible: false,
    isLoadingRegistration: true,
    existingRegistration: null as RegistrationType | null,
    currentRegistrationId: undefined as string | undefined,
    ticketAvailability: {} as Record<string, number>
  })

  const createRegistration = trpc.createRegistration.useMutation()
  const checkExistingRegistration = trpc.checkExistingRegistration.useMutation({
    cacheTime: 0
  })
  const checkTicketsAvailability = trpc.checkTicketsAvailability.useMutation({
    cacheTime: 0
  })
  const markRegistrationPaid = trpc.markRegistrationPaid.useMutation()

  const isFreeEvent = useMemo(
    () => event.tickets?.every(ticket => ticket.price === 0),
    [event.tickets]
  )

  const fetchAvailability = useCallback(async () => {
    if (event.tickets?.length) {
      try {
        const ticketOfferingsIds = event.tickets.map(ticket => ticket.id)
        const availability = await checkTicketsAvailability.mutateAsync({
          ticketOfferingsIds
        })
        setState(prev => ({ ...prev, ticketAvailability: availability }))
      } catch (error) {
        errorHandler(error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.tickets])

  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  const checkRegistration = useCallback(async () => {
    if (user?.email) {
      try {
        const registration = await checkExistingRegistration.mutateAsync({
          eventId: event.id
        })
        console.log({ registration })

        setState(prev => ({
          ...prev,
          existingRegistration: registration,
          isLoadingRegistration: false
        }))
      } catch (error) {
        errorHandler(error)
        setState(prev => ({ ...prev, isLoadingRegistration: false }))
      }
    } else {
      setState(prev => ({ ...prev, isLoadingRegistration: false }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, event.id])

  useEffect(() => {
    checkRegistration()
  }, [checkRegistration])

  const handleQuantityChange = useCallback(
    (ticketId: string, change: number) => {
      setState(prev => {
        const currentQty = prev.ticketSelections[ticketId] || 0
        const ticketAvailabilityQty = prev.ticketAvailability[ticketId] || 0

        // Determine the new quantity after change
        const newQty = Math.max(
          0,
          Math.min(ticketAvailabilityQty, currentQty + change)
        )

        return {
          ...prev,
          ticketSelections: { ...prev.ticketSelections, [ticketId]: newQty }
        }
      })
    },
    []
  )

  const calculateTotal = useMemo(() => {
    return (
      event.tickets?.reduce((total, ticket) => {
        const quantity = state.ticketSelections[ticket.id] || 0
        return total + ticket.price * quantity
      }, 0) || 0
    )
  }, [event.tickets, state.ticketSelections])

  const onSubmit = useCallback(
    async (name: string, email: string) => {
      if (Object.keys(state.ticketSelections).length === 0) {
        showToast('Please select at least one ticket and log in to continue.')
        return
      }

      try {
        const result = await createRegistration.mutateAsync({
          eventId: event.id,
          registrationData: {
            email,
            name,
            tickets: state.ticketSelections
          }
        })

        if (result.success && result.registration) {
          if (isFreeEvent) {
            checkRegistration()
            showToast(result.message)
            setState(prev => ({ ...prev, isModalVisible: false }))
          } else {
            setState(prev => ({
              ...prev,
              currentRegistrationId: result.registration.id
            }))
          }
        }
      } catch (error) {
        errorHandler(error)
      }
    },
    [
      state.ticketSelections,
      isFreeEvent,
      checkRegistration,
      createRegistration,
      event.id
    ]
  )

  const handlePaymentComplete = useCallback(
    async (registrationId: string) => {
      try {
        const result = await markRegistrationPaid.mutateAsync({
          registrationId
        })
        showToast(
          result.success ? 'Event registration successful' : 'Payment failed',
          { type: result.error ? 'error' : 'success' }
        )
        setState(prev => ({ ...prev, isModalVisible: false }))
      } catch (error) {
        errorHandler(error)
      } finally {
        checkRegistration()
      }
    },
    [checkRegistration, markRegistrationPaid]
  )

  const isPurchaseDisabled = useMemo(
    () => Object.values(state.ticketSelections).every(qty => qty === 0),
    [state.ticketSelections]
  )

  return {
    ...state,
    isFreeEvent,
    calculateTotal,
    onSubmit,
    handlePaymentComplete,
    isPurchaseDisabled,
    handleQuantityChange,
    setModalVisible: (visible: boolean) =>
      setState(prev => ({ ...prev, isModalVisible: visible }))
  }
}
