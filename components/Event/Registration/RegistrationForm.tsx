import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import StripeCheckout from '@/components/Checkout/StripeCheckout'
import { useTranslation } from 'react-i18next'
import { UserType } from '@/schemas/userSchema'

interface RegistrationFormProps {
  user?: UserType
  onSubmit: (email: string, name: string) => Promise<void>
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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  // If there's a user, pre-fill the fields and make them read-only
  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
    }
  }, [user, setValue])

  return showStripeCheckout && registrationId ? (
    <StripeCheckout
      registrationId={registrationId}
      onComplete={handleCheckoutComplete}
    />
  ) : (
    <>
      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <TextInput
            className="bg-gray-700 p-3 text-white rounded-lg mb-4"
            placeholder={t('Registration.eventFormName')}
            placeholderTextColor="#999"
            value={value}
            onChangeText={onChange}
            editable={!user} // Disable input if the user is logged in
          />
        )}
      />
      {errors.name && <Text>{t('Registration.eventFormNameError')}</Text>}

      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <TextInput
            className="bg-gray-700 p-3 text-white rounded-lg mb-4"
            placeholder={t('Registration.eventFormEmail')}
            placeholderTextColor="#999"
            value={value}
            onChangeText={onChange}
            editable={!user} // Disable input if the user is logged in
          />
        )}
      />
      {errors.email && <Text>{t('Registration.eventFormEmailError')}</Text>}

      <TouchableOpacity
        className="bg-blue-600 p-3 rounded-lg"
        onPress={handleSubmit(async data => {
          await onSubmit(data.name, data.email)
        })}
      >
        <Text className="text-white text-center font-bold">
          {t('Registration.eventConfirmRegistration')}
        </Text>
      </TouchableOpacity>
    </>
  )
}

export default RegistrationForm
