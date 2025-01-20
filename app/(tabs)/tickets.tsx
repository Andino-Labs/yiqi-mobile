import React, { useCallback, useState } from 'react'
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import { Colors } from '@/constants/Colors'
import { useTranslation } from 'react-i18next'
import trpc from '@/constants/trpc'
import TicketCard from '@/components/Tickets/TicketCard'
import ViewTicketModal from '@/components/Tickets/ViewTicketModal'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import LoggedOutTicketList from '@/components/Tickets/LoggedOutTicketList'

export type TicketDetails = {
  eventTitle: string
  name: string
  email: string
  ticketNumber: string
  eventId: string
  organizationId: string
  ticketId: string
  checkedInDate: string
}

export default function Events() {
  const router = useRouter()

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<
    TicketDetails | undefined
  >()
  const { authenticated } = useCurrentUser()
  const { data, isLoading } = trpc.getTicketsWithEvents.useQuery(undefined, {
    enabled: authenticated
  })

  const onTicketPress = (ticket: TicketDetails) => {
    setSelectedTicket(ticket)
    openModal()
  }

  const openModal = useCallback(() => setModalVisible(true), [])
  const closeModal = useCallback(() => setModalVisible(false), [])
  const { t } = useTranslation()

  const renderFooter = useCallback(() => {
    if (isLoading) {
      return (
        <ActivityIndicator
          className=" py-2"
          size="small"
          color={Colors.dark.tint}
        />
      )
    }

    return null
  }, [isLoading])

  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <View className="flex-row items-center justify-between p-2">
        <Pressable onPress={() => router.back()}>
          <ChevronLeft color="white" size={24} />
        </Pressable>
        <Text className="text-white text-lg font-bold">
          {t('tickets.ticketTitlePage')}
        </Text>
        <View />
      </View>
      {authenticated ? (
        <View className="flex-1 mx-2">
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <TicketCard onTicketPress={onTicketPress} ticketDetails={item} />
            )}
            onEndReachedThreshold={0.8}
            ListFooterComponent={renderFooter}
            estimatedItemSize={50}
          />
          <ViewTicketModal
            closeModal={closeModal}
            isOpen={modalVisible}
            ticketDetails={selectedTicket}
          />
        </View>
      ) : (
        <LoggedOutTicketList />
      )}
    </SafeAreaView>
  )
}
