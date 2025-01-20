import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import trpc from '@/constants/trpc'
import { FlashList } from '@shopify/flash-list'
import EventListCard from '@/components/Event/EventListCard'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

export default function OrganizationEvents() {
  const { organizationId } = useLocalSearchParams<{ organizationId: string }>()

  const { data } = trpc.getEventsByOrganization.useQuery({
    organizationId
  })
  const { t } = useTranslation()
  const onEventPress = (eventId: string) =>
    router.push({
      pathname: '/settings/organizationSection/eventRegistrations/[eventId]',
      params: { eventId }
    })

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          title: t('organization.registrationList.organizationEvents')
        }}
      />
      <View className="flex-1 mx-2">
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <EventListCard onEventPress={onEventPress} event={item} />
          )}
          estimatedItemSize={120}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id + index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}
