import React, { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import trpc from '@/constants/trpc'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '@/components/formsFields/InputField'
import ImagePickerComponent from '@/components/formsFields/ImagePickerComponent'
import {
  Pressable,
  ScrollView,
  View,
  ActivityIndicator,
  Text
} from 'react-native'
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  FileText,
  X,
  Linkedin,
  Instagram,
  Globe
} from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import {
  ProfileFormSchema,
  ProfileWithPrivacy,
  profileWithPrivacySchema
} from '@/schemas/userSchema'
import { z } from 'zod'
import { UploadToS3 } from '@/helpers/uploadToS3'
import { ImagePickerAsset } from 'expo-image-picker'
import ConfirmationModal from '../ConfirmationModal'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Colors } from '@/constants/Colors'
import { useAuthContext } from '@/context/AuthContext'
import { router } from 'expo-router'
import showToast from '@/helpers/showToast'
import PrivacySwitch from './PrivacySwitchComponent'

const IconProps = { color: '#fff', size: 20 }

export default function UpdateProfileForm({
  user
}: {
  user: ProfileWithPrivacy
}) {
  const form = useForm<z.infer<typeof profileWithPrivacySchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: { ...user }
  })

  const utils = trpc.useUtils()
  const updateUserProfile = trpc.updateUserProfile.useMutation({
    onSuccess: () => utils.getUserProfile.invalidate()
  })
  const deleteUserAccount = trpc.deleteUserAccount.useMutation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [file, setFile] = useState<ImagePickerAsset | undefined>()
  const { t } = useTranslation()
  const deleteModalRef = useRef<BottomSheetModal>(null)
  const { updateUserSession, signOut } = useAuthContext()
  const onSubmit: SubmitHandler<ProfileWithPrivacy> = async data => {
    setIsLoading(true)
    try {
      const imageUrl = file ? await UploadToS3(file) : data.picture
      const profileData: ProfileWithPrivacy = {
        ...data,
        picture: imageUrl,
        id: user.id
      }

      const result = await updateUserProfile.mutateAsync(profileData)
      if (result.success) {
        updateUserSession({ ...data, picture: imageUrl || null })
        showToast(t('profileSettings.profileUpdated'))
        router.back()
      } else {
        showToast(t('profileSettings.failedToUpdate'))
      }
    } catch {
      showToast(t('profileSettings.error'))
    } finally {
      setIsLoading(false)
    }
  }
  const onConfirmDeleteAccount = async () => {
    try {
      await deleteUserAccount.mutateAsync()
      deleteModalRef.current?.close()
      signOut()
      router.back()
    } catch {
      showToast(t('profileSettings.error'))
    }
  }

  return (
    <FormProvider {...form}>
      <ScrollView>
        <ImagePickerComponent
          name="picture"
          setFile={setFile}
          username={user.name}
        />
        <View className="m-4">
          <InputField
            leftIcon={<User {...IconProps} />}
            label={t('profileSettings.name')}
            name="name"
            placeholder={t('profileSettings.enterYourName')}
          />
          <PrivacySwitch field="email" label="Email" />
          <InputField
            leftIcon={<Mail {...IconProps} />}
            name="email"
            disabled
            placeholder={t('profileSettings.enterYourEmail')}
          />
          <PrivacySwitch
            field="phoneNumber"
            label={t('profileSettings.phoneNumber')}
          />
          <InputField
            leftIcon={<Phone {...IconProps} />}
            placeholder="+1234567890"
            name="phoneNumber"
          />
          <View className="h-px bg-neutral-500 my-5" />
          <InputField
            leftIcon={<Building2 {...IconProps} />}
            label={t('profileSettings.company')}
            name="company"
            placeholder={t('profileSettings.enterYourCompany')}
          />
          <InputField
            leftIcon={<Briefcase {...IconProps} />}
            label={t('profileSettings.position')}
            name="position"
            placeholder={t('profileSettings.enterYourPosition')}
          />
          <InputField
            leftIcon={<FileText {...IconProps} />}
            label={t('profileSettings.bio')}
            textarea
            placeholder={t('profileSettings.tellUsAboutYourself')}
            name="shortDescription"
          />
          <View className="h-px bg-neutral-500 my-5" />
          <PrivacySwitch field="x" label="X" />
          <InputField
            placeholder={t('profileSettings.enterYourX')}
            leftIcon={<X {...IconProps} />}
            name="x"
          />
          <PrivacySwitch field="linkedin" label="Linkedin" />
          <InputField
            placeholder={t('profileSettings.enterLinkedinURL')}
            leftIcon={<Linkedin {...IconProps} />}
            name="linkedin"
          />
          <InputField
            leftIcon={<Instagram {...IconProps} />}
            placeholder={t('profileSettings.enterInstagramURL')}
            label="Instagram"
            name="instagram"
          />
          <PrivacySwitch field="website" label={t('profileSettings.website')} />
          <InputField
            leftIcon={<Globe {...IconProps} />}
            placeholder={t('profileSettings.enterWebsiteURL')}
            name="website"
          />
          <Pressable
            onPress={() => deleteModalRef.current?.present()}
            className={`bg-red-700 py-3 rounded-lg items-center mt-2`}
          >
            <Text className="font-bold  text-white">
              {t('profileSettings.deleteModal.title')}
            </Text>
          </Pressable>
          <Pressable
            onPress={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            className={`border-neutral-200 border-[1px] py-3 rounded-lg items-center mt-6`}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.dark.tint} />
            ) : (
              <Text className="font-bold text-white">
                {t('profileSettings.saveChanges')}
              </Text>
            )}
          </Pressable>
        </View>
        <ConfirmationModal
          bottomSheetRef={deleteModalRef}
          title={t('profileSettings.deleteModal.title')}
          description={t('profileSettings.deleteModal.description')}
          cancelText={t('general.cancel')}
          confirmText={t('general.delete')}
          onConfirm={onConfirmDeleteAccount}
        />
      </ScrollView>
    </FormProvider>
  )
}
