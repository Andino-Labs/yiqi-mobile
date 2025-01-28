import { TicketType } from '@/types/eventTypes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'

interface RegistrationSummaryProps {
  tickets?: TicketType[]
  ticketSelections: Record<string, number>
  calculateTotal: number
}

export default function RegistrationSummary({
  tickets,
  ticketSelections,
  calculateTotal
}: RegistrationSummaryProps) {
  const { t } = useTranslation()

  return (
    <View className="p-4 bg-gray-800 rounded-lg shadow-md">
      <Text className="text-lg font-semibold text-white mb-4">
        {t('Registration.eventRegistrationSummary')}
      </Text>
      <View className="space-y-3">
        {tickets?.map(ticket => {
          const quantity = ticketSelections[ticket.id] || 0
          if (quantity === 0) return null

          return (
            <View key={ticket.id} className="flex-row justify-between">
              <Text className="text-base text-white">{`${quantity}x ${ticket.name}`}</Text>
              <Text className="text-base text-white">
                {ticket.price === 0
                  ? t('Registration.eventFree')
                  : `S/${(ticket.price * quantity).toFixed(2)}`}
              </Text>
            </View>
          )
        })}
        <View className="border-t border-gray-700 pt-3 flex-row justify-between mt-4">
          <Text className="text-base font-bold text-white">
            {t('Registration.eventTotal')}
          </Text>
          <Text className="text-base font-bold text-white">
            S/{calculateTotal.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  )
}
