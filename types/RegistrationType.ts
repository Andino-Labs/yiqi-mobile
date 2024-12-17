export type RegistrationType = {
  id: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  customFields: Record<string, any>
  createdAt: Date
  updatedAt: Date
  tickets: {
    id: string
    category: 'GENERAL' | 'VIP' | 'BACKSTAGE'
    checkedInDate: Date | null
    user?:
      | {
          name: string
          id: string
          email: string
          picture: string | null
          emailVerified?: Date | null | undefined
          phoneNumber?: string | null | undefined
        }
      | null
      | undefined
    ticketType?:
      | {
          name: string
          id: string
          category: 'GENERAL' | 'VIP' | 'BACKSTAGE'
          price: number
          limit: number
          ticketsPerPurchase: number
          description?: string | undefined
        }
      | null
      | undefined
  }[]
  userId: string
  user: {
    name: string
    id: string
    email: string
    picture: string | null
    emailVerified?: Date | null | undefined
    phoneNumber?: string | null | undefined
  }
  paid: boolean
  paymentId: string | null
}
