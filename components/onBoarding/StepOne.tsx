import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import trpc from '@/constants/trpc'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '@/components/formsFields/InputField'
import ImagePickerComponent from '@/components/formsFields/ImagePickerComponent'
import {
  Pressable,
  ScrollView,
  Switch,
  View,
  ActivityIndicator,
  Text
} from 'react-native'
import { User, Mail, Phone, FileText } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import {
  ProfileWithPrivacy,
  profileWithPrivacySchema
} from '@/schemas/userSchema'
import { z } from 'zod'
import { UploadToS3 } from '@/helpers/uploadToS3'
import { ImagePickerAsset } from 'expo-image-picker'
import { Colors } from '@/constants/Colors'
import { useAuthContext } from '@/context/AuthContext'
import { router } from 'expo-router'
import showToast from '@/helpers/showToast'
import { ThemedText } from '@/components/ui/ThemedText'

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

export default function StepOne({ user }: { user: ProfileWithPrivacy }) {
  const form = useForm<z.infer<typeof profileWithPrivacySchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: { ...user }
  })
  const updateUserProfile = trpc.updateUserProfile.useMutation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [file, setFile] = useState<ImagePickerAsset | undefined>()
  const { t } = useTranslation()
  const { updateUserSession } = useAuthContext()
  const onSubmit: SubmitHandler<ProfileWithPrivacy> = async data => {
    setIsLoading(true)
    try {
      const imageUrl = file ? await UploadToS3(file) : user.picture || null
      const profileData: ProfileWithPrivacy = {
        ...data,
        picture: imageUrl,
        id: user.id
      }

      const result = await updateUserProfile.mutateAsync(profileData)
      if (result.success) {
        updateUserSession({ ...data, picture: imageUrl })
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

  const PrivacySwitch = ({
    field,
    label
  }: {
    field: keyof ProfileWithPrivacy['privacySettings']
    label: string
  }) => (
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
            <PrivacySwitch field="email" label="email" />
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
            <InputField
              leftIcon={<FileText {...IconProps} />}
              label={t('profileSettings.bio')}
              textarea
              placeholder={t('profileSettings.tellUsAboutYourself')}
              name="bio"
            />

            <Pressable
              onPress={form.handleSubmit(onSubmit)}
              disabled={isLoading}
              className={`border-neutral-200 border-[1px] py-3 rounded-lg items-center `}
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
        </ScrollView>
      </FormProvider>
    </>
  )
}
