import React, { forwardRef } from 'react'

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import { ThemedText } from '../ThemedText'
import { Colors } from '@/constants/Colors'
import { CameraIcon, ImageIcon, TrashIcon } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import {
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native-gesture-handler'
import { TextProps } from 'react-native'
import AppBottomSheet from '../AppBottomSheet'

const ICON_SIZE = 25

type Props = {
  onOpenPhotoLibrary: () => void
  onOpenCamera: () => void
  onDeleteProfilePicture: () => void
}
const MenuEntry: React.FC<TouchableOpacityProps> = ({ children, ...props }) => (
  <TouchableOpacity
    {...props}
    className="flex-row justify-start items-center px-4 py-3"
  >
    {children}
  </TouchableOpacity>
)

const Label: React.FC<TextProps> = ({ children, ...props }) => (
  <ThemedText {...props} className="text-base ml-4">
    {children}
  </ThemedText>
)

const EditProfilePictureBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onOpenPhotoLibrary, onOpenCamera, onDeleteProfilePicture }, ref) => {
    const { t } = useTranslation()

    return (
      <AppBottomSheet ref={ref}>
        <BottomSheetView>
          <MenuEntry onPress={onOpenPhotoLibrary}>
            <ImageIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              color={Colors.dark.tint}
            />
            <Label>{t('settings.imagePicker.photo')}</Label>
          </MenuEntry>
          <MenuEntry onPress={onOpenCamera}>
            <CameraIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              color={Colors.dark.tint}
            />
            <Label>{t('settings.imagePicker.camera')}</Label>
          </MenuEntry>
          <MenuEntry onPress={onDeleteProfilePicture}>
            <TrashIcon width={ICON_SIZE} height={ICON_SIZE} color={'red'} />
            <Label className="text-red-500">
              {t('settings.imagePicker.delete')}
            </Label>
          </MenuEntry>
        </BottomSheetView>
      </AppBottomSheet>
    )
  }
)

export default EditProfilePictureBottomSheet
