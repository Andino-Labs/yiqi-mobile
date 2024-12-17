import { useAuthContext } from '@/context/AuthContext'

export function useCurrentUser() {
  const { session } = useAuthContext()

  return {
    user: session.user,
    authenticated: session.authenticated
  }
}
