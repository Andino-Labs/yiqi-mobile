import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RegistrationType } from '@/types/RegistrationType'
import StripeCheckout from '@/components/Checkout/StripeCheckout'
import showToast from '@/helpers/showToast'
import { Modal } from '@/components/Modal'
import { useTranslation } from 'react-i18next'

interface RegistrationConfirmationProps {
  registration: RegistrationType
  handlePaymentComplete: (registrationId: string) => Promise<void>

  requiresPayment?: boolean
}

function RegistrationConfirmation({
  registration,
  requiresPayment = false,
  handlePaymentComplete
}: RegistrationConfirmationProps) {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const { t } = useTranslation()

  const onComplete = () =>
    handlePaymentComplete(registration.id).then(() =>
      setIsPaymentDialogOpen(false)
    )

  if (requiresPayment && !registration.paid) {
    return (
      <View className="bg-gray-900 flex-1 p-4">
        <View className="bg-gray-800 p-4 rounded-lg">
          <View className="items-center justify-center mb-4">
            <View className="bg-yellow-400 p-3 rounded-full">
              <Ionicons name="warning" size={24} color="#FFF" />
            </View>
          </View>
          <Text className="text-white text-lg font-bold text-center mb-2">
            {t('Registration.registrationPaymentPending')}
          </Text>
          <Text className="text-gray-500 text-sm text-center mb-4">
            {t('Registration.registrationPaymentPendingDescription')}
          </Text>
          <TouchableOpacity
            className="bg-gray-600 p-3 rounded-lg"
            onPress={() => setIsPaymentDialogOpen(true)}
          >
            <Text className="text-white text-center font-bold">
              {t('Registration.registrationContinuePayment')}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isOpen={isPaymentDialogOpen}
          onDismiss={() => setIsPaymentDialogOpen(false)}
        >
          <View className="bg-gray-800 p-4 rounded-lg">
            <View className="flex-row justify-between items-start">
              <Pressable
                onPress={() => setIsPaymentDialogOpen(false)}
                className="ml-auto"
              >
                <Ionicons name="close" color={'white'} size={20} />
              </Pressable>
            </View>
            <View className="p-6 rounded-lg w-4/5">
              <Text className=" text-white text-lg font-bold mb-4">
                {t('Registration.ticketPayment')}
              </Text>
              <View>
                <StripeCheckout
                  registrationId={registration.id}
                  onComplete={onComplete}
                />
              </View>
              <TouchableOpacity
                className="bg-red-600 p-3 rounded-lg mt-2"
                onPress={() => setIsPaymentDialogOpen(false)}
              >
                <Text className="text-white text-center font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  return (
    <View className="bg-gray-900 flex-1 p-4">
      <View className="bg-gray-800 p-4 rounded-lg">
        <View className="items-center justify-center mb-4">
          <View className="bg-green-400 p-3 rounded-full">
            <Ionicons name="checkmark-circle" size={24} color="#FFF" />
          </View>
        </View>
        <Text className="text-white text-lg font-bold text-center mb-2">
          {registration.status === 'PENDING'
            ? t('Registration.registrationPending')
            : t('Registration.registrationConfirmed')}
        </Text>
        <Text className="text-gray-500 text-sm text-center mb-4">
          {registration.status === 'PENDING'
            ? t('Registration.registrationPendingDescription')
            : t('Registration.registrationConfirmedDescription')}
        </Text>
        <TouchableOpacity
          className="bg-gray-600 p-3 rounded-lg"
          onPress={() => showToast('Not implemented!', { type: 'warning' })}
        >
          <Text className="text-white text-center font-bold">
            {t('Registration.viewMyTickets')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegistrationConfirmation
