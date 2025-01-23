import React from 'react'
import { Pressable, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { ThemedText } from '@/components/ui/ThemedText'
import { RegistrationType } from '@/types/RegistrationType'
import { CheckCircle } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import TicketDashedLine from '../TicketDashedLine'

interface TicketInfo {
  label: string
  value?: string
}
const LabelValue = ({ label, value }: TicketInfo) => (
  <View className="flex-row flex-wrap justify-between mb-1">
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
              ticket.checkedInDate ? 'bg-green-900' : 'bg-neutral-800'
            } mb-3`}
          >
            <View className="p-2">
              <LabelValue
                label={t('Registration.eventFormName')}
                value={registration.user.name}
              />
              <LabelValue label={'Email'} value={registration.user.email} />
            </View>
            <TicketDashedLine />
            <View className="p-2">
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
            </View>
            <TicketDashedLine />

            {ticket.checkedInDate ? (
              <View className="m-2">
                <LabelValue
                  label={t('organization.registrationList.checkedIn')}
                  value={ticket.checkedInDate.toLocaleString()}
                />
              </View>
            ) : (
              <Pressable
                onPress={() => onCheckInPress(ticket.id)}
                className="flex-row items-center justify-center py-2 m-3 rounded-md border border-neutral-800 bg-neutral-900"
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
