import React from 'react'
import { View, Text, StyleProp, ViewStyle, Pressable } from 'react-native'
import { Building2, ImageOff, Ticket } from 'lucide-react-native'
import { PublicEventType } from '@/types/eventTypes'
import { Image } from 'expo-image'
import { useTranslation } from 'react-i18next'
import TicketStatusBadge from './TicketBadge'
import { TicketDetails } from '@/app/(tabs)/tickets'
import { EventTicket } from '@/types/ticketTypes'

const TicketCard: React.FC<{
  event: PublicEventType
  tickets: EventTicket[]
  onTicketPress: (ticket: TicketDetails) => void
  styles?: StyleProp<ViewStyle>
}> = ({
  onTicketPress,
  event: { id, title, startDate, openGraphImage, organization, endDate },
  tickets,
  styles
}) => {
  const { t } = useTranslation()

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })

  return (
    <View
      className="bg-neutral-900 rounded-2xl shadow-lg overflow-hidden mb-4"
      style={styles}
    >
      {/* Top Header */}
      <Pressable className="p-4">
        <Text className="text-gray-300 text-sm">
          {formatDate(startDate)} - {formatDate(endDate)}
        </Text>
        <Text className="text-white text-2xl font-bold">{title}</Text>
        <View className="flex-row items-center mt-2">
          {organization?.logo ? (
            <Image
              source={{ uri: organization.logo }}
              className="h-6 w-6 rounded-full"
              contentFit="cover"
            />
          ) : (
            <Building2 size={20} color="white" />
          )}
          <Text className="text-gray-400 text-sm ml-2">
            {organization?.name || ''}
          </Text>
        </View>
      </Pressable>

      {/* Image */}
      <View className="items-center mb-2">
        {openGraphImage ? (
          <Image
            source={{ uri: openGraphImage }}
            className="h-36 w-[90%] rounded-lg overflow-hidden"
            contentFit="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center h-40 bg-neutral-800">
            <ImageOff size={50} color="gray" />
          </View>
        )}
      </View>

      {/* Ticket Info */}
      {tickets.map((ticket, index) => (
        <View key={ticket.id} className="border-t-neutral-800 border-t-2">
          <View className="px-4 py-2  flex-row justify-between items-center">
            <View className="bg-gray-700 px-2 py-1 rounded">
              <Text className="text-white font-semibold text-xs">
                {t('tickets.ticketNumber')}
                {index + 1} {ticket.category}
              </Text>
            </View>
            <TicketStatusBadge status={ticket.status} />
          </View>

          {/* Button */}
          <View className="px-4 pb-2">
            <Pressable
              disabled={['PENDING', 'REJECTED'].includes(ticket.status)}
              onPress={() =>
                onTicketPress({
                  eventId: id,
                  eventTitle: title,
                  name: ticket.registration.customFields.name,
                  email: ticket.registration.customFields.email,
                  ticketId: ticket.id,
                  ticketNumber: (index + 1).toString(),
                  organizationId: organization?.id || '',
                  checkedInDate: ticket.checkedInDate
                    ? ticket.checkedInDate.toString()
                    : ''
                })
              }
              className={`flex-row items-center justify-center py-2 rounded-md border ${
                ['PENDING', 'REJECTED'].includes(ticket.status)
                  ? 'border-gray-600 bg-neutral-800 opacity-50'
                  : 'border-white bg-neutral-900'
              }`}
            >
              <Ticket color="white" className="w-4 h-4 mr-2" />
              <Text
                className={`text-white font-bold ${
                  ['PENDING', 'REJECTED'].includes(ticket.status)
                    ? 'text-gray-400'
                    : 'text-white'
                }`}
              >
                {t('tickets.ticketLabelView')}
              </Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  )
}

export default TicketCard
