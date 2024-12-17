import React, { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { UserType } from '@/types/UserType'
import { secureStorageKeys } from '@/constants/SecureStore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

type Session = {
  user?: UserType
  authenticated: boolean
}

type AuthContextProps = {
  session: Session
  signIn: (user: UserType, token: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session>({
    authenticated: false
  })

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

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
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
