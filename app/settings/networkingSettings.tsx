import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'
import { profileWithPrivacySchema } from '@/schemas/userSchema'
import trpc from '@/constants/trpc'
import UpdateNetworkingForm from '@/components/Profile/UpdateNetworkingForm'
import { t } from 'i18next'

export default function NetWorkingSettings() {
  const { data } = trpc.getUserProfile.useQuery()

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView className="flex-1">
        <Stack.Screen
          options={{
            headerShown: true,
            title: t('networkingSettings.networkingProfileTitle')
          }}
        />

        {data && (
          <UpdateNetworkingForm
            initialData={profileWithPrivacySchema.parse(data)}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  )
}
