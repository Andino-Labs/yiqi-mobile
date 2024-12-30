import React from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native'
import useStripeCheckout from '@/hooks/useStripeCheckout'
import { Colors } from '@/constants/Colors'
import { useTranslation } from 'react-i18next'
const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''

export type StripeCheckoutProps = {
  registrationId: string
  onComplete: () => void
}

export default function StripeCheckout(props: StripeCheckoutProps) {
  const { loading, handlePayment } = useStripeCheckout(props)
  const { t } = useTranslation()
  return (
    <StripeProvider publishableKey={publishableKey}>
      {loading ? (
        <ActivityIndicator
          className=" py-2"
          size="large"
          color={Colors.dark.tint}
        />
      ) : (
        <TouchableOpacity
          className="bg-blue-600 p-3 rounded-lg"
          onPress={handlePayment}
        >
          <Text className="text-white text-center font-bold">
            {t('Registration.ticketPayment')}
          </Text>
        </TouchableOpacity>
      )}
    </StripeProvider>
  )
}
