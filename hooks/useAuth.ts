import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin'
import trpc from '@/constants/trpc'
import showToast from '@/helpers/showToast'
import { errorHandler } from '@/helpers/errorHandler'
import { useAuthContext } from '@/context/AuthContext'

export function useAuth() {
  const router = useRouter()
  const { signIn } = useAuthContext()

  const configGoogleSignIn = () => {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID
    })
  }

  useEffect(() => {
    configGoogleSignIn()
  }, [])
  const loginGoogle = trpc.loginGoogle.useMutation()
  const loginLinkedIn = trpc.loginLinkedin.useMutation()

  // Handle Google Login
  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      if (userInfo?.data && userInfo.data.idToken) {
        const idToken = userInfo.data.idToken

        const { sessionId, user } = await loginGoogle.mutateAsync({ idToken })
        if (user && sessionId !== '') {
          await signIn(user, sessionId)
        }
        showToast('Login Success')
        router.back()
      } else {
        throw new Error('Google ID Token not received')
      }
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          showToast('User canceled the login process.', { type: 'error' })
          break
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showToast('Google Play Services are not available.', {
            type: 'error'
          })
      }
    }
  }

  // Handle LinkedIn Login
  const onLinkedInLogin = async (code: string) => {
    try {
      if (code) {
        const response = await loginLinkedIn.mutateAsync({ code })
        if (
          typeof response.sessionId === 'string' &&
          response.sessionId !== ''
        ) {
          await signIn(response.user, response.sessionId)
        }
        showToast('Login Success')
        router.back()
      }
    } catch (error) {
      errorHandler(error)
    }
  }
  return { onLinkedInLogin, onGoogleLogin }
}
