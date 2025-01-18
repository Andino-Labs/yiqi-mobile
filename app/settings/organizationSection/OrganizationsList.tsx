import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useRouter } from 'expo-router'
import { ScrollView } from 'react-native'
import trpc from '@/constants/trpc'
import CommunityCard from '@/components/home/CommunityCard'
import { FlashList } from '@shopify/flash-list'
import { useTranslation } from 'react-i18next'

export default function OrganizationsList() {
  const { data } = trpc.getOrganizationsByCurrentUser.useQuery()
  const router = useRouter()
  const navigateToCommunity = (organizationId: string) =>
    router.push({
      pathname:
        '/settings/organizationSection/organizationEvents/[organizationId]',
      params: { organizationId }
    })
  const { t } = useTranslation()

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView className="flex-1">
        <Stack.Screen
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            title: t('profile.organizations')
          }}
        />

        {data && (
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <CommunityCard
                navigateToCommunity={navigateToCommunity}
                community={item}
              />
            )}
            estimatedItemSize={250}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id + index.toString()}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  )
}
