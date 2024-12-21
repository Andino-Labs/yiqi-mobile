import React, { type FC, useCallback, useRef } from 'react'
import { Alert, Linking, View, Text, Image, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Controller, useFormContext } from 'react-hook-form'
import EditProfilePictureBottomSheet from './EditProfilePictureBottomSheet'
import { useTranslation } from 'react-i18next'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Settings, User } from 'lucide-react-native'

const IMAGE_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  base64: true
}

type FormData = {
  picture: string | null
}

type Props = {
  username: string | undefined
  setFile: (image?: ImagePicker.ImagePickerAsset) => void
}

const imagePicker: FC<Props> = ({ username, setFile }) => {
  const editProfilePictureBottomSheetRef = useRef<BottomSheetModal>(null)
  const { control, setValue } = useFormContext<FormData>()

  const onOpenEditBottomSheet = () =>
    editProfilePictureBottomSheetRef.current?.present()
  const { t } = useTranslation()
  const openAlert = useCallback((title: string, body: string): void => {
    Alert.alert(title, body, [
      {
        style: 'default',
        text: t('settings.imagePicker.alert.buttons.cancel')
      },
      {
        style: 'default',
        text: t('settings.imagePicker.alert.buttons.openSettings'),
        onPress: Linking.openSettings
      }
    ])
  }, [])

  const onOpenMediaLibrary = useCallback(async (): Promise<void> => {
    editProfilePictureBottomSheetRef.current?.close()

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      openAlert(
        t('settings.imagePicker.alert.photoPermissions.title'),
        t('settings.imagePicker.alert.photoPermissions.body')
      )

      return
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync(IMAGE_OPTIONS)
      if (result.canceled || !result.assets[0].base64) {
        return
      }

      setValue('picture', result.assets[0].uri, {
        shouldDirty: true
      })
      setFile(result.assets[0])
    } catch {
      Alert.alert(t('settings.imagePicker.errors.openPhotosFailure'))
    }
  }, [openAlert, setValue])

  const onOpenCamera = useCallback(async (): Promise<void> => {
    editProfilePictureBottomSheetRef.current?.close()

    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      openAlert(
        t('settings.imagePicker.alert.photoPermissions.title'),
        t('settings.imagePicker.alert.photoPermissions.body')
      )

      return
    }

    try {
      const result = await ImagePicker.launchCameraAsync(IMAGE_OPTIONS)
      if (result.canceled || !result.assets[0].base64) {
        return
      }

      setValue('picture', result.assets[0].uri, {
        shouldDirty: true
      })
      setFile(result.assets[0])
    } catch {
      Alert.alert(t('settings.imagePicker.errors.openCameraFailure'))
    }
  }, [openAlert, setValue])

  const onDeleteImage = useCallback((): void => {
    editProfilePictureBottomSheetRef.current?.close()
    setValue('picture', null, { shouldDirty: true })
    setFile(undefined)
  }, [setValue])

  return (
    <>
      <Controller
        control={control}
        name="picture"
        render={({ field: { value } }) => (
          <View className="items-center">
            <Pressable onPress={onOpenEditBottomSheet}>
              {value ? (
                <Image
                  source={{ uri: value }}
                  className="w-32 h-32 rounded-full bg-gray-700"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
                  <User size={48} color="white" />
                </View>
              )}
              <Text className="text-lg self-center font-semibold text-white mt-2">
                {username}
              </Text>
              <View className="absolute top-0 right-0 bg-gray-800 rounded-full p-2 shadow-md">
                <Settings size={20} color="white" />
              </View>
            </Pressable>
          </View>
        )}
      />

      <EditProfilePictureBottomSheet
        ref={editProfilePictureBottomSheetRef}
        onOpenPhotoLibrary={onOpenMediaLibrary}
        onOpenCamera={onOpenCamera}
        onDeleteProfilePicture={onDeleteImage}
      />
    </>
  )
}

export default imagePicker
