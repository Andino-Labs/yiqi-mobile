import { errorHandler } from '@/helpers/errorHandler'
import { useState, useEffect } from 'react'
import { useStripe } from '@stripe/stripe-react-native'
import trpc from '@/constants/trpc'
import showToast from '@/helpers/showToast'
import { StripeCheckoutProps } from '@/components/Checkout/StripeCheckout'

const useStripeCheckout = ({
  onComplete,
  registrationId
}: StripeCheckoutProps) => {
  const [loading, setLoading] = useState(false)

  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const createCheckoutSession = trpc.createCheckoutSession.useMutation()

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        setLoading(true)

        // Fetch client secret and stripeAccount from the backend
        const { clientSecret } = await createCheckoutSession.mutateAsync({
          registrationId
        })

        if (!clientSecret) {
          throw new Error('Missing required Stripe configuration.')
        }

        // Initialize Stripe Payment Sheet for the connected account
        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: 'Yiqi',
          style: 'alwaysDark'
        })

        if (error) {
          throw new Error(
            error.message || 'Failed to initialize payment sheet.'
          )
        }
      } catch (error) {
        errorHandler(error)
      } finally {
        setLoading(false)
      }
    }

    initializeStripe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationId, initPaymentSheet])

  const handlePayment = async () => {
    try {
      setLoading(true)

      // Present the payment sheet
      const { error } = await presentPaymentSheet()

      if (error) {
        showToast('Payment failed!', { type: 'error' })
      } else {
        showToast('Payment Successful')
        onComplete()
      }
    } catch (error) {
      errorHandler(error)
    } finally {
      setLoading(false)
    }
  }
  return { loading, handlePayment }
}

export default useStripeCheckout
