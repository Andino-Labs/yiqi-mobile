import React from 'react'
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Pressable
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRegistration } from '@/hooks/useRegistration'
import { PublicEventType } from '@/types/eventTypes'
import RegistrationSummary from './RegistrationSummary'
import { useTranslation } from 'react-i18next'
import RegistrationConfirmation from './RegistrationConfirmation'
import RegistrationForm from './RegistrationForm'
import Modal from '@/components/ui/Modal'
import { UserType } from '@/schemas/userSchema'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ui/ThemedText'
import Animated, { FadeIn } from 'react-native-reanimated'
import { ThemedButton } from '@/components/ui/ThemedButton'

type RegistrationProps = {
  event: PublicEventType
  user?: UserType
}

const Registration: React.FC<RegistrationProps> = ({ event, user }) => {
  const {
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
    handleQuantityChange,
    ticketAvailability
  } = useRegistration(event, user)

  const { t } = useTranslation()

  if (isLoadingRegistration || Object.keys(ticketAvailability).length === 0) {
    return (
      <Animated.View
        entering={FadeIn}
        className="flex-1 h-[230px] justify-center items-center bg-gray-900"
      >
        <ActivityIndicator size="large" color={Colors.dark.tint} />
      </Animated.View>
    )
  }

  if (existingRegistration) {
    const requiresPayment = !event.tickets?.every(ticket => ticket.price === 0)
    return (
      <RegistrationConfirmation
        registration={existingRegistration}
        requiresPayment={requiresPayment}
        handlePaymentComplete={handlePaymentComplete}
      />
    )
  }

  return (
    <>
      <Animated.View
        entering={FadeIn}
        className="flex-1 bg-gray-800 p-4 rounded-lg"
      >
        <ThemedText className="text-lg font-bold mb-2">
          {t('Registration.eventRegistration')}
        </ThemedText>
        <ThemedText className="text-gray-400 text-sm mb-4">
          {isFreeEvent
            ? t('Registration.eventFreeRegistrationDescription')
            : t('Registration.eventNoTicketsSelected')}
        </ThemedText>
        <View className="h-px bg-gray-700 my-3" />

        {event.tickets?.map(ticket => (
          <View
            key={ticket.id}
            className="flex-row items-center justify-between mb-4"
          >
            <View className="flex-1">
              <ThemedText className="font-bold flex-wrap">
                {ticket.name}
              </ThemedText>
              {ticket.description && (
                <ThemedText className="text-gray-400 text-sm flex-wrap">
                  {ticket.description}
                </ThemedText>
              )}
            </View>

            {ticketAvailability[ticket.id] >= 1 ? (
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => handleQuantityChange(ticket.id, -1)}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <ThemedText className="mx-2">
                  {ticketSelections[ticket.id] || 0}
                </ThemedText>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(ticket.id, 1)}
                >
                  <Ionicons name="add-circle-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <ThemedText className="rounded-2xl text-sm p-1 mr-2 bg-red-600">
                {t('Registration.eventSoldOut')}
              </ThemedText>
            )}
            <ThemedText className="font-bold ml-2">S/{ticket.price}</ThemedText>
          </View>
        ))}

        <ThemedButton
          buttonClassName="p-3 mt-4 border-0"
          onPress={() => setModalVisible(true)}
          disabled={isPurchaseDisabled}
          textClassName="text-black"
          style={{
            backgroundColor: isPurchaseDisabled ? '#0a7ea4' : '#04F1FF',
            opacity: isPurchaseDisabled ? 0.6 : 1
          }}
          text={
            isFreeEvent
              ? t('Registration.eventRegister')
              : t('Registration.eventPurchase')
          }
        />
      </Animated.View>

      <Modal isOpen={isModalVisible} onDismiss={() => setModalVisible(false)}>
        <View className="bg-gray-800 p-4 rounded-lg">
          <View className="flex-row justify-between items-start">
            <Pressable
              onPress={() => setModalVisible(false)}
              className="ml-auto"
            >
              <Ionicons name="close" color={'white'} size={20} />
            </Pressable>
          </View>

          <RegistrationSummary
            calculateTotal={calculateTotal}
            tickets={event?.tickets}
            ticketSelections={ticketSelections}
          />
          <RegistrationForm
            isFreeEvent={isFreeEvent!}
            onSubmit={onSubmit}
            user={user}
            registrationId={currentRegistrationId}
            handlePaymentComplete={handlePaymentComplete}
          />
        </View>
      </Modal>
    </>
  )
}

export default Registration
