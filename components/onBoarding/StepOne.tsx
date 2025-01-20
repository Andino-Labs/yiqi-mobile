import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import trpc from '@/constants/trpc'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '@/components/formsFields/InputField'
import ImagePickerComponent from '@/components/formsFields/ImagePickerComponent'
import { ScrollView } from 'react-native'
import { User, Mail, Phone, FileText } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import {
  ProfileFormSchema,
  ProfileWithPrivacy,
  profileWithPrivacySchema
} from '@/schemas/userSchema'
import { z } from 'zod'
import { UploadToS3 } from '@/helpers/uploadToS3'
import { ImagePickerAsset } from 'expo-image-picker'
import { useAuthContext } from '@/context/AuthContext'
import showToast from '@/helpers/showToast'
import OnBardingFooter from './OnBardingFooter'
import PrivacySwitch from '../Profile/PrivacySwitchComponent'

const IconProps = { color: '#fff', size: 20 }

export default function StepOne({
  user,
  handleStepChange
}: {
  user: ProfileWithPrivacy
  handleStepChange: () => void
}) {
  const form = useForm<z.infer<typeof profileWithPrivacySchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: { ...user }
  })
  const { formState, handleSubmit } = form
  const { isDirty } = formState
  const utils = trpc.useUtils()
  const updateUserProfile = trpc.updateUserProfile.useMutation({
    onSuccess: () => utils.getUserProfile.invalidate()
  })
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
      } else {
        showToast(t('profileSettings.failedToUpdate'))
      }
    } catch {
      showToast(t('profileSettings.error'))
    } finally {
      setIsLoading(false)
      handleStepChange()
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
          name="shortDescription"
        />
      </ScrollView>
      <OnBardingFooter
        handleStepChange={isDirty ? handleSubmit(onSubmit) : handleStepChange}
        isLoading={isLoading}
      />
    </FormProvider>
  )
}
