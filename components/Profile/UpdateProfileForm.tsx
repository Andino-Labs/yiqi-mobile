import React, { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import trpc from '@/constants/trpc'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '@/components/forms/InputField'
import ImagePicker from '@/components/forms/ImagePicker'
import {
  Pressable,
  ScrollView,
  Switch,
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
  ProfileWithPrivacy,
  profileWithPrivacySchema
} from '@/schemas/userSchema'
import { z } from 'zod'
import { ThemedText } from '../ThemedText'
import { UploadToS3 } from '@/helpers/uploadToS3'
import { ImagePickerAsset } from 'expo-image-picker'
import ConfirmationModal from '../ConfirmationModal'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Colors } from '@/constants/Colors'
import { useAuthContext } from '@/context/AuthContext'
import { router } from 'expo-router'

const IconProps = { color: '#fff', size: 20 }
const ProfileFormSchema = profileWithPrivacySchema.extend({
  picture: z
    .any()
    .refine(
      file => (file?.size ? file.size <= 10000000 : true),
      'Max image size is 10MB.'
    )
    .nullable()
    .optional()
})

export default function UpdateProfileForm({
  user,
  onSuccess
}: {
  user: ProfileWithPrivacy
  onSuccess: () => void
}) {
  const form = useForm<z.infer<typeof profileWithPrivacySchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: { ...user }
  })
  const updateUserProfile = trpc.updateUserProfile.useMutation()
  const deleteUserAccount = trpc.deleteUserAccount.useMutation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [file, setFile] = useState<ImagePickerAsset | undefined>()
  const { t } = useTranslation()
  const deleteModalRef = useRef<BottomSheetModal>(null)

  const onSubmit: SubmitHandler<ProfileWithPrivacy> = async data => {
    setIsLoading(true)
    try {
      const imageUrl = file?.base64 ? await UploadToS3(file) : user.picture
      const profileData: ProfileWithPrivacy = {
        ...data,
        picture: imageUrl,
        id: user.id
      }

      const result = await updateUserProfile.mutateAsync(profileData)
      if (result.success) {
        onSuccess()
        console.log(`${t('profileUpdated')}`)
      } else {
        console.error(`${t('updateFailed')}`)
      }
    } catch (error) {
      console.error(`${t('somethingWentWrong')}`, error)
    } finally {
      setIsLoading(false)
    }
  }
  const { signOut } = useAuthContext()
  const onConfirmDeleteAccount = async () => {
    try {
      await deleteUserAccount.mutateAsync()
      deleteModalRef.current?.close()
      signOut()
      router.back()
    } catch (error) {
      console.error(`${t('somethingWentWrong')}`, error)
    }
  }

  const renderPrivacySwitch = (
    field: keyof ProfileWithPrivacy['privacySettings'],
    label: string
  ) => (
    <View className="flex-row items-center justify-between">
      <ThemedText className="mb-1 text-sm font-medium">{label}</ThemedText>
      <Switch
        value={form.watch(`privacySettings.${field}`)}
        onValueChange={checked =>
          form.setValue(`privacySettings.${field}`, checked, {
            shouldDirty: true
          })
        }
      />
    </View>
  )

  return (
    <>
      <FormProvider {...form}>
        <ScrollView>
          <ImagePicker setFile={setFile} username={user.name} />
          <View className="m-4">
            <InputField
              leftIcon={<User {...IconProps} />}
              label={t('profileSettings.name')}
              name="name"
              placeholder={t('profileSettings.enterYourName')}
            />
            {renderPrivacySwitch('email', 'Email')}
            <InputField
              leftIcon={<Mail {...IconProps} />}
              name="email"
              disabled
              placeholder={t('profileSettings.enterYourEmail')}
            />
            {renderPrivacySwitch(
              'phoneNumber',
              t('profileSettings.phoneNumber')
            )}
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
              placeholder={t('profileSettings.tellUsAboutYourself')}
              name="bio"
            />
            <View className="h-px bg-neutral-500 my-5" />
            {renderPrivacySwitch('x', 'X')}
            <InputField
              placeholder={t('profileSettings.enterYourX')}
              leftIcon={<X {...IconProps} />}
              name="x"
            />
            {renderPrivacySwitch('linkedin', 'Linkedin')}
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
            {renderPrivacySwitch('website', t('profileSettings.website'))}
            <InputField
              leftIcon={<Globe {...IconProps} />}
              placeholder={t('profileSettings.enterWebsiteURL')}
              name="website"
            />
            <Pressable
              onPress={() => deleteModalRef.current?.present()}
              className={`bg-red-700 py-3 rounded-lg items-center mt-2`}
            >
              <Text className="font-bold  text-white">Delete Account</Text>
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
    </>
  )
}
