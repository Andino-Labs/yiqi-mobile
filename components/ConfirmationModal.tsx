import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import AppBottomSheet from './ui/AppBottomSheet'

type ConfirmationModalProps = {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  bottomSheetRef: React.RefObject<BottomSheetModal>
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  bottomSheetRef
}) => {
  const onCancel = () => {
    bottomSheetRef.current?.close()
  }

  return (
    <AppBottomSheet name="ConfirmationModal" ref={bottomSheetRef}>
      <BottomSheetView style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
        <Text className="text-lg font-bold text-white mb-2">{title}</Text>
        {description && (
          <Text className="text-sm text-gray-400 mb-4">{description}</Text>
        )}
        <View className="flex-row justify-between">
          <Pressable
            className="flex-1 mr-2 p-2 bg-neutral-700 rounded-md"
            onPress={onCancel}
          >
            <Text className="text-center text-white text-base">
              {cancelText}
            </Text>
          </Pressable>
          <Pressable
            className="flex-1 ml-2 p-2 border-neutral-600 border-[1px] rounded-md"
            onPress={onConfirm}
          >
            <Text className="text-center text-white text-base font-semibold">
              {confirmText}
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </AppBottomSheet>
  )
}

export default ConfirmationModal
