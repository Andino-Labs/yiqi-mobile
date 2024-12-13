import { TRPCClientError } from '@trpc/client'
import showToast from './showToast'

export const errorHandler = (error: unknown): void => {
  if (__DEV__) {
    console.error(error)
  }

  // Check if error is a TRPCClientError using more robust type checking
  if (
    error instanceof TRPCClientError ||
    (typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'data' in error)
  ) {
    const message =
      (error as TRPCClientError<any>).message || 'An unexpected error.'
    showToast(message, { type: 'error' })
  } else if (error instanceof Error) {
    // Handle generic JavaScript errors
    showToast(error.message, { type: 'error' })
  } else {
    // Handle unknown error types
    showToast('An unknown error occurred.', { type: 'error' })
  }
}
