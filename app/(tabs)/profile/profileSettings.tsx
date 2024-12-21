import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'

import { ScrollView } from 'react-native'
import { profileWithPrivacySchema } from '@/schemas/userSchema'
import UpdateProfileForm from '@/components/Profile/UpdateProfileForm'
import trpc from '@/constants/trpc'

export default function ProfileSettings() {
  const { data, refetch } = trpc.getUserProfile.useQuery()

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView className="flex-1">
        <Stack.Screen
          options={{ headerShown: true, title: 'Profile Settings' }}
        />

        {data && (
          <UpdateProfileForm
            user={profileWithPrivacySchema.parse(data)}
            onSuccess={refetch}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  )
}
