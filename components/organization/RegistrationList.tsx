import React from 'react'
import { Pressable, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { ThemedText } from '@/components/ui/ThemedText'
import { RegistrationType } from '@/types/RegistrationType'
import { CheckCircle } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
interface TicketInfo {
  label: string
  value?: string
}
const LabelValue = ({ label, value }: TicketInfo) => (
  <View className="flex-row justify-between mb-1">
    <ThemedText className="text-neutral-400">{label}</ThemedText>
    <ThemedText className="text-neutral-200">{value}</ThemedText>
  </View>
)
export default function RegistrationList({
  registrations,
  onCheckInPress
}: {
  registrations: RegistrationType[]
  onCheckInPress: (ticketId: string) => void
}) {
  const { t } = useTranslation()
  return (
    <Animated.ScrollView>
      {registrations.map((registration, index) =>
        registration.tickets.map(ticket => (
          <Animated.View
            key={ticket.id}
            entering={FadeIn.delay(index * 50)}
            exiting={FadeOut}
            className={`rounded-md ${
              ticket.checkedInDate ? 'border-green-500' : 'border-neutral-600'
            } border border-dashed bg-neutral-800 p-4 mb-3`}
          >
            <ThemedText className="text-white text-lg mb-2 flex-row justify-center items-center">
              {registration.user.name}
            </ThemedText>
            <LabelValue
              label={t('organization.registrationList.name')}
              value={ticket.ticketType?.name}
            />
            <LabelValue
              label={t('organization.registrationList.category')}
              value={ticket.ticketType?.category}
            />
            <LabelValue
              label={t('organization.registrationList.price')}
              value={String(ticket.ticketType?.price || 0)}
            />
            <View />
            {ticket.checkedInDate ? (
              <LabelValue
                label={t('organization.registrationList.checkedIn')}
                value={ticket.checkedInDate.toLocaleString()}
              />
            ) : (
              <Pressable
                onPress={() => onCheckInPress(ticket.id)}
                className="flex-row items-center justify-center py-2 mt-3 rounded-md border border-neutral-800 bg-neutral-900"
              >
                <CheckCircle color="white" className="mr-1" />
                <ThemedText className="text-center text-white">
                  {t('organization.registrationList.checkIn')}
                </ThemedText>
              </Pressable>
            )}
          </Animated.View>
        ))
      )}
    </Animated.ScrollView>
  )
}
