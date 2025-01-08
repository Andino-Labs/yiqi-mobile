import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet } from 'react-native'

type TicketStatusBadgeProps = {
  status: 'APPROVED' | 'PENDING' | 'REJECTED'
}

const TicketStatusBadge: React.FC<TicketStatusBadgeProps> = ({ status }) => {
  let badgeStyle, textStyle, badgeText
  const { t } = useTranslation()
  switch (status) {
    case 'APPROVED':
      badgeStyle = styles.approvedBadge
      textStyle = styles.approvedText
      badgeText = t('tickets.ticketStatusApproved')
      break
    case 'PENDING':
      badgeStyle = styles.pendingBadge
      textStyle = styles.pendingText
      badgeText = t('tickets.ticketStatusPending')
      break
    default:
      badgeStyle = styles.rejectedBadge
      textStyle = styles.rejectedText
      badgeText = t('tickets.ticketStatusRejected')
      break
  }

  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.text, textStyle]}>{badgeText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start'
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  approvedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)' // bg-emerald-500/10
  },
  approvedText: {
    color: '#6EE7B7' // text-emerald-200
  },
  pendingBadge: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)' // bg-rose-500/10
  },
  pendingText: {
    color: '#FCA5A5' // text-rose-200
  },
  rejectedBadge: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)' // bg-rose-500/10
  },
  rejectedText: {
    color: '#FCA5A5' // text-rose-200
  }
})

export default TicketStatusBadge
