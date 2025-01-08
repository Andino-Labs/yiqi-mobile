import {
  ModalProps,
  KeyboardAvoidingView,
  View,
  Platform,
  Modal as RNModal,
  TouchableWithoutFeedback
} from 'react-native'
import { BlurView } from 'expo-blur'

type PROPS = ModalProps & {
  isOpen: boolean
  withInput?: boolean
  onPressOverlay?: () => void
}

const Modal = ({
  isOpen,
  withInput,
  children,
  onPressOverlay,
  ...rest
}: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      className="items-center justify-center"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View>{children}</View>
  )

  return (
    <RNModal visible={isOpen} transparent={true} animationType="fade" {...rest}>
      <TouchableWithoutFeedback onPress={onPressOverlay}>
        <BlurView
          intensity={Platform.OS === 'ios' ? 20 : 10}
          className="flex-1"
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
        >
          <View className="flex-1 justify-center items-center p-4 bg-zinc-950/40 ">
            {content}
          </View>
        </BlurView>
      </TouchableWithoutFeedback>
    </RNModal>
  )
}

export default Modal
