import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import 'react-native-reanimated'
import trpc from '@/constants/trpc'
import SuperJSON from 'superjson'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import * as SecureStore from 'expo-secure-store'
import { secureStorageKeys } from '@/constants/SecureStore'
import { API } from '@/constants/apis'
import '@/i18n'
import { RootSiblingParent } from 'react-native-root-siblings'
import { LogBox } from 'react-native'
import { AuthProvider } from '@/context/AuthContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
// until they merge the fix next update https://github.com/meliorence/react-native-render-html/issues/661
if (__DEV__) {
  const ignoreErrors = ['Support for defaultProps will be removed']

  const error = console.error
  console.error = (...arg) => {
    for (const error of ignoreErrors) if (arg[0].includes(error)) return
    error(...arg)
  }

  LogBox.ignoreLogs(ignoreErrors)
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient())

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: API + '/api/trpc',
          headers: async () => {
            const token =
              (await SecureStore.getItemAsync(secureStorageKeys.TOKEN)) ?? ''

            if (token)
              return {
                authorization: `Bearer ${token}`
              }
            return {}
          }
        })
      ]
    })
  )
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <RootSiblingParent>
                <BottomSheetModalProvider>
                  <Stack initialRouteName="onBoarding">
                    <Stack.Screen
                      name="onBoarding"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="login"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </BottomSheetModalProvider>
              </RootSiblingParent>
            </AuthProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
