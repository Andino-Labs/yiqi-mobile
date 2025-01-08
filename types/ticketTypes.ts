export type EventTicket = {
  id: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  description: string | null
  userId: string
  category: 'GENERAL' | 'VIP' | 'BACKSTAGE'
  checkedInDate: Date | null
  registration: {
    customFields: {
      name: string
      email: string
      tickets: Record<string, number>
    }
    paid: boolean
    paymentId: string | null
  }
  registrationId: string
  checkedInByUserId: string | null
  ticketTypeId: string
}
