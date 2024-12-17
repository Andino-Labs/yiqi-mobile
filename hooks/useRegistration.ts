import showToast from '@/helpers/showToast'
import { useState, useEffect, useMemo, useCallback } from 'react'
import trpc from '@/constants/trpc'
import { PublicEventType } from '@/types/eventTypes'
import { UserType } from '@/types/UserType'
import { errorHandler } from '@/helpers/errorHandler'
import { RegistrationType } from '@/types/RegistrationType'

export const useRegistration = (event: PublicEventType, user?: UserType) => {
  const [ticketSelections, setTicketSelections] = useState<
    Record<string, number>
  >({})
  const [isModalVisible, setModalVisible] = useState(false)
  const [isLoadingRegistration, setIsLoadingRegistration] = useState(true)
  const [existingRegistration, setExistingRegistration] =
    useState<RegistrationType | null>(null)
  const [currentRegistrationId, setCurrentRegistrationId] = useState<
    string | undefined
  >()
  const createRegistration = trpc.createRegistration.useMutation()
  const checkExistingRegistration = trpc.checkExistingRegistration.useMutation()
  const markRegistrationPaid = trpc.markRegistrationPaid.useMutation()

  const isFreeEvent = useMemo(
    () => event.tickets?.every(ticket => ticket.price === 0),
    [event.tickets]
  )
  const checkRegistration = useCallback(async () => {
    if (user?.email) {
      try {
        const registration = await checkExistingRegistration.mutateAsync({
          eventId: event.id
        })
        setExistingRegistration(registration)
      } catch (error) {
        errorHandler(error)
      }
    }
    setIsLoadingRegistration(false)
  }, [user, event.id])
  useEffect(() => {
    checkRegistration()
  }, [event.id, user?.email])

  const handleQuantityChange = (ticketId: string, change: number) => {
    setTicketSelections(prev => {
      const newQty = Math.max(0, Math.min(5, (prev[ticketId] || 0) + change))
      return { ...prev, [ticketId]: newQty }
    })
  }

  const calculateTotal = () => {
    return (
      event.tickets?.reduce((total, ticket) => {
        const quantity = ticketSelections[ticket.id] || 0
        return total + ticket.price * quantity
      }, 0) || 0
    )
  }

  const onSubmit = async (name: string, email: string) => {
    if (Object.keys(ticketSelections).length === 0) {
      showToast('Please select at least one ticket and log in to continue.')
      return
    }

    try {
      const result = await createRegistration.mutateAsync({
        eventId: event.id,
        registrationData: {
          email,
          name,
          tickets: ticketSelections
        }
      })

      if (result.success && result.registration) {
        if (isFreeEvent) {
          checkRegistration()
          showToast(result.message)
          setModalVisible(false)
        } else {
          setCurrentRegistrationId(result.registration.id)
        }
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  const handlePaymentComplete = async (registrationId: string) => {
    try {
      if (registrationId) {
        const result = await markRegistrationPaid.mutateAsync({
          registrationId
        })
        showToast(
          result.success ? 'Event registration successful' : 'Payment failed',
          { type: result.error ? 'error' : 'success' }
        )
        setModalVisible(false)
      }
    } catch (error) {
      errorHandler(error)
    } finally {
      await checkRegistration()
    }
  }

  const isPurchaseDisabled = Object.values(ticketSelections).every(
    qty => qty === 0
  )

  return {
    ticketSelections,
    isModalVisible,
    setModalVisible,
    isLoadingRegistration,
    existingRegistration,
    currentRegistrationId,
    isFreeEvent,
    calculateTotal,
    onSubmit,
    handlePaymentComplete,
    isPurchaseDisabled,
    handleQuantityChange
  }
}
