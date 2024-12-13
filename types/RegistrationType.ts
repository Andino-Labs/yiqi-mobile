import { UserType } from './UserType'
import { TicketType } from './eventTypes'

export type RegistrationType = {
  id: string
  userId: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  customFields: Record<string, any>
  createdAt: Date
  updatedAt: Date
  paid: boolean
  paymentId: string | null
  user: UserType
  tickets: TicketType[]
}
