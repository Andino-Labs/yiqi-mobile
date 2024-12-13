import React from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native'
import useStripeCheckout from '@/hooks/useStripeCheckout'
const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''

export type StripeCheckoutProps = {
  registrationId: string
  onComplete: () => void
}

export default function StripeCheckout(props: StripeCheckoutProps) {
  const { loading, handlePayment, paymentConfig } = useStripeCheckout(props)

  return (
    <StripeProvider
      publishableKey={publishableKey}
      stripeAccountId={paymentConfig?.stripeAccount}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          className="bg-blue-600 p-3 rounded-lg"
          onPress={handlePayment}
        >
          <Text className="text-white text-center font-bold">
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      )}
    </StripeProvider>
  )
}
