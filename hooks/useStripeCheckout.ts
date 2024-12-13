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
  const [paymentConfig, setPaymentConfig] = useState<{
    clientSecret: string
    stripeAccount: string
  } | null>(null)
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const createCheckoutSession = trpc.createCheckoutSession.useMutation()

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        setLoading(true)

        // Fetch client secret and stripeAccount from the backend
        const { clientSecret, connectAccountId } =
          await createCheckoutSession.mutateAsync({
            registrationId
          })

        if (!clientSecret || !connectAccountId) {
          throw new Error('Missing required Stripe configuration.')
        }

        setPaymentConfig({ clientSecret, stripeAccount: connectAccountId })

        // Initialize Stripe Payment Sheet for the connected account
        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: 'Yiqi',
          style: 'alwaysDark'
        })
        console.log(error)

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
  }, [registrationId])

  const handlePayment = async () => {
    if (!paymentConfig) {
      showToast('Payment is not ready. Please try again', {
        type: 'error'
      })
      return
    }

    try {
      setLoading(true)

      // Present the payment sheet
      const { error } = await presentPaymentSheet()

      if (error) {
        console.log(error)

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
  return { loading, handlePayment, paymentConfig }
}

export default useStripeCheckout
