import React, { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { secureStorageKeys } from '@/constants/SecureStore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { UserType } from '@/schemas/userSchema'

type Session = {
  user?: UserType
  authenticated: boolean
}

type AuthContextProps = {
  session: Session
  updateUserSession: (user: UserType) => void
  signIn: (user: UserType, token: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session>({
    authenticated: false
  })
  const configGoogleSignIn = () => {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      iosClientId:
        'com.googleusercontent.apps.837954574689-a4bl8tp4i2jjgcvsmq0lunqsg30tgh9n'
    })
  }

  useEffect(() => {
    configGoogleSignIn()
  }, [])
  useEffect(() => {
    // Check for token on component mount
    const fetchSession = async () => {
      const [token, user] = await Promise.all([
        SecureStore.getItemAsync(secureStorageKeys.TOKEN),
        SecureStore.getItemAsync(secureStorageKeys.USER_INFO)
      ])
      if (token && user) {
        setSession({ authenticated: true, user: JSON.parse(user) })
      }
    }

    fetchSession()
  }, [])

  const signIn = async (user: UserType, token: string) => {
    try {
      await Promise.all([
        SecureStore.setItemAsync(secureStorageKeys.TOKEN, token),
        SecureStore.setItemAsync(
          secureStorageKeys.USER_INFO,
          JSON.stringify(user)
        )
      ])
      setSession({ authenticated: true, user })
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = async () => {
    try {
      setSession({ user: undefined, authenticated: false })

      await Promise.all([
        SecureStore.deleteItemAsync(secureStorageKeys.TOKEN),
        SecureStore.deleteItemAsync(secureStorageKeys.USER_INFO),
        GoogleSignin.signOut()
      ])
    } catch (error) {
      console.log(error)
    }
  }
  const updateUserSession = async (user: UserType) => {
    await SecureStore.setItemAsync(
      secureStorageKeys.USER_INFO,
      JSON.stringify(user)
    )
    if (session.user) {
      const newUserData = {
        ...session,
        user: {
          ...session.user,
          id: session.user.id,
          name: user.name || session.user?.name,
          picture: user.picture || session.user?.email
        }
      }
      setSession(newUserData)
    }
  }
  return (
    <AuthContext.Provider
      value={{ session, updateUserSession, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
