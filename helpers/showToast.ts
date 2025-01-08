import { Colors } from '@/constants/Colors'
import Toast, { ToastOptions } from 'react-native-root-toast'

type ToastProps = ToastOptions & {
  type?: 'success' | 'error' | 'warning'
}

const showToast = (toastMessage: string, options?: ToastProps) => {
  const { type = 'success', ...toastOptions } = options || {}

  return Toast.show(toastMessage, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true,
    containerStyle: type === 'success' && {
      borderColor: Colors.dark.tint,
      borderWidth: 1
    },
    textColor: type === 'success' ? Colors.dark.text : Colors.light.text,
    backgroundColor: getBackgroundColor(type),
    ...toastOptions
  })
}

function getBackgroundColor(type: ToastProps['type']): string {
  switch (type) {
    case 'success':
      return '#404040'
    case 'error':
      return Colors.dark.error
    case 'warning':
      return Colors.dark.warning
    default:
      return Colors.dark.background // Fallback to background
  }
}

export default showToast
