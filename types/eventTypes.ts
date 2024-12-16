export enum EventTypeEnum {
  ONLINE = 'ONLINE',
  IN_PERSON = 'IN_PERSON'
}

export type CustomFieldType = {
  name: string
  type: 'text' | 'number' | 'select' | 'date'
  required?: boolean
  options?: string
}

export type TicketType = {
  id: string
  name: string
  category: 'GENERAL' | 'VIP' | 'BACKSTAGE'
  description?: string
  price: number
  limit: number
  ticketsPerPurchase: number
}

export type OrganizationType = {
  logo: string | null
  name: string
  stripeAccountId?: string | null
}

export type FeaturedItemType = {
  name: string
  url: string
}

export type HostType = {
  [key: string]: any // Adjust this based on the structure of `profileWithPrivacySchema`
}

export type PublicEventType = {
  id: string
  title: string
  startDate: Date
  endDate: Date
  subtitle?: string | null | undefined
  description?: string | undefined
  location?: string | null | undefined
  city?: string | null | undefined
  state?: string | null | undefined
  country?: string | null | undefined
  virtualLink?: string | null | undefined
  maxAttendees?: number | null | undefined
  openGraphImage?: string | null | undefined
  type: EventTypeEnum
  organizationId: string
  createdAt: Date
  updatedAt: Date
  customFields?: CustomFieldType[]
  tickets?: TicketType[]
  registrations?: number
  organization?: OrganizationType
  heroImage?: string | null
  backgroundColor?: string | null
  featuredIn?: FeaturedItemType[] | null
  hosts?: HostType[] | null
}
