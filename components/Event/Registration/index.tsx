import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Pressable
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRegistration } from '@/hooks/useRegistration'
import { PublicEventType } from '@/types/eventTypes'
import { UserType } from '@/types/UserType'
import RegistrationSummary from './RegistrationSummary'
import { useTranslation } from 'react-i18next'
import RegistrationConfirmation from './RegistrationConfirmation'
import RegistrationForm from './RegistrationForm'
import { Modal } from '@/components/Modal'

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
    handleQuantityChange
  } = useRegistration(event, user)

  const { t } = useTranslation()

  if (isLoadingRegistration) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
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
      <View className="flex-1 bg-gray-800 p-4 rounded-lg">
        <Text className="text-white text-lg font-bold mb-2">
          {t('Registration.eventRegistration')}
        </Text>
        <Text className="text-gray-400 text-sm mb-4">
          {isFreeEvent
            ? t('Registration.eventFreeRegistrationDescription')
            : t('Registration.eventNoTicketsSelected')}
        </Text>
        <View className="h-px bg-gray-700 my-3" />

        {event.tickets?.map(ticket => (
          <View
            key={ticket.id}
            className="flex-row justify-between items-center mb-4"
          >
            <View className="flex-1">
              <Text className="text-white font-bold flex-wrap">
                {ticket.name}
              </Text>
              <Text className="text-gray-400 text-sm flex-wrap">
                {ticket.description}
              </Text>
            </View>

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
              <Text className="text-white mx-2">
                {ticketSelections[ticket.id] || 0}
              </Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange(ticket.id, 1)}
              >
                <Ionicons name="add-circle-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-white font-bold ml-2">${ticket.price}</Text>
          </View>
        ))}

        <TouchableOpacity
          className="p-3 rounded-lg mt-4"
          onPress={() => setModalVisible(true)}
          disabled={isPurchaseDisabled}
          style={{
            backgroundColor: isPurchaseDisabled ? '#4B5563' : '#0a7ea4',
            opacity: isPurchaseDisabled ? 0.6 : 1
          }}
        >
          <Text className="text-white text-center">
            {isFreeEvent
              ? t('Registration.eventRegister')
              : t('Registration.eventPurchase')}
          </Text>
        </TouchableOpacity>
      </View>

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
            isFreeEvent={isFreeEvent}
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
