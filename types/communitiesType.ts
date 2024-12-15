export type CommunitiesType = {
  name: string
  id: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  colour: string | null
  logo: string | null
  stripeAccountId: string | null
  linkedin?: string | null | undefined
  instagram?: string | null | undefined
  website?: string | null | undefined
  userId?: string | null | undefined
  facebook?: string | null | undefined
  tiktok?: string | null | undefined
}
