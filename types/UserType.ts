export type UserType = {
  id: string
  email: string
  name: string
  picture?: string | null
  role?: 'USER' | 'ADMIN' | 'ANDINO_ADMIN' | 'NEW_USER'
  emailVerified?: Date | null | undefined
  phoneNumber?: string | null | undefined
}
