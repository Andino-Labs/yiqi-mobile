import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, TextInput } from 'react-native'
import StripeCheckout from '@/components/Checkout/StripeCheckout'
import { UserType } from '@/types/UserType'
import { useTranslation } from 'react-i18next'

interface RegistrationFormProps {
  user: UserType
  onSubmit: () => Promise<void>
  isFreeEvent: boolean
  registrationId?: string
  handlePaymentComplete: (registrationId: string) => Promise<void>
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  user,
  onSubmit,
  isFreeEvent,
  registrationId,
  handlePaymentComplete
}) => {
  const [showStripeCheckout, setShowStripeCheckout] = useState(
    !!registrationId && !isFreeEvent
  )
  const { t } = useTranslation()

  useEffect(() => {
    setShowStripeCheckout(!!registrationId && !isFreeEvent)
  }, [registrationId, isFreeEvent])

  const handleCheckoutComplete = () => {
    if (registrationId) {
      setShowStripeCheckout(false)
      handlePaymentComplete(registrationId)
    }
  }

  return showStripeCheckout && registrationId ? (
    <StripeCheckout
      registrationId={registrationId}
      onComplete={handleCheckoutComplete}
    />
  ) : (
    <>
      <TextInput
        className="bg-gray-700 p-3 text-white rounded-lg mb-4"
        placeholder="Name"
        placeholderTextColor="#999"
        value={user.name}
        editable={false} // Name field is read-only
      />
      <TextInput
        className="bg-gray-700 p-3 text-white rounded-lg mb-4"
        placeholder="Email"
        placeholderTextColor="#999"
        value={user.email}
        editable={false} // Email field is read-only
      />
      <TouchableOpacity
        className="bg-blue-600 p-3 rounded-lg"
        onPress={onSubmit}
      >
        <Text className="text-white text-center font-bold">
          {t('Registration.eventConfirmRegistration')}
        </Text>
      </TouchableOpacity>
    </>
  )
}

export default RegistrationForm
