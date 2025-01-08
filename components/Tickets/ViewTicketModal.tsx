import React from 'react'
import { View, Text } from 'react-native'
import Modal from '@/components/ui/Modal'
import { useTranslation } from 'react-i18next'
import { TicketDetails } from '@/app/(tabs)/tickets'
import QRCode from 'react-native-qrcode-svg'

interface ViewTicketModalProps {
  isOpen: boolean
  closeModal: () => void
  ticketDetails?: TicketDetails
}

interface TicketInfo {
  label: string
  value: string
}
const LabelValue = ({ label, value }: TicketInfo) => (
  <View className="flex-row justify-between mb-1">
    <Text className="text-neutral-500">{label}</Text>
    <Text className="text-white">{value}</Text>
  </View>
)
export default function ViewTicketModal({
  closeModal,
  isOpen,
  ticketDetails
}: ViewTicketModalProps) {
  const { t } = useTranslation()
  if (!ticketDetails) return null
  const {
    ticketId,
    eventId,
    checkedInDate,
    email,
    eventTitle,
    name,
    organizationId,
    ticketNumber
  } = ticketDetails
  const qrData = `${process.env.EXPO_PUBLIC_DEPLOYMENT_API}/admin/orgnanizations/${organizationId}/events/${eventId}/checkin/${ticketId}`
  const ticketInfo: TicketInfo[] = [
    { label: t('tickets.qrModalTicketLabel'), value: ticketNumber },
    { label: t('tickets.qrModalTicketName'), value: name },
    { label: t('tickets.qrModalTicketEmail'), value: email },
    {
      label: t('tickets.qrModalTicketStatus'),
      value: checkedInDate
        ? t('tickets.qrModalTicketChecked')
        : t('tickets.qrModalTicketNotChecked')
    }
  ]
  return (
    <Modal onPressOverlay={closeModal} isOpen={isOpen} onDismiss={closeModal}>
      <View
        className="bg-neutral-950 m-4 p-4 rounded-lg"
        style={{ minWidth: '80%' }}
      >
        <Text className="text-lg font-bold text-white mb-4 text-center">
          {eventTitle}
        </Text>
        <View className="items-center my-5">
          <QRCode size={250} value={qrData} />
        </View>
        {ticketInfo.map((ticket, index) => (
          <LabelValue key={index} label={ticket.label} value={ticket.value} />
        ))}
      </View>
    </Modal>
  )
}
