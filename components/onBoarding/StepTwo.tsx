import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import trpc from '@/constants/trpc'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '@/components/formsFields/InputField'
import { ScrollView } from 'react-native'
import {
  Briefcase,
  Building2,
  Globe,
  Instagram,
  Linkedin,
  X
} from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import {
  ProfileWithPrivacy,
  profileWithPrivacySchema
} from '@/schemas/userSchema'
import { z } from 'zod'
import showToast from '@/helpers/showToast'
import OnBardingFooter from './OnBardingFooter'
import PrivacySwitch from '../Profile/PrivacySwitchComponent'

const IconProps = { color: '#fff', size: 20 }

export default function StepTwo({
  user,
  handleStepChange
}: {
  user: ProfileWithPrivacy
  handleStepChange: () => void
}) {
  const form = useForm<z.infer<typeof profileWithPrivacySchema>>({
    resolver: zodResolver(profileWithPrivacySchema),
    defaultValues: { ...user }
  })
  const { formState, handleSubmit } = form
  const { isDirty } = formState
  const utils = trpc.useUtils()
  const updateUserProfile = trpc.updateUserProfile.useMutation({
    onSuccess: () => utils.getUserProfile.invalidate()
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation()
  const onSubmit: SubmitHandler<ProfileWithPrivacy> = async data => {
    setIsLoading(true)

    try {
      const profileData = {
        ...data,
        id: user.id
      }

      const result = await updateUserProfile.mutateAsync(profileData)
      if (!result.success) {
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
      </ScrollView>
      <OnBardingFooter
        handleStepChange={isDirty ? handleSubmit(onSubmit) : handleStepChange}
        isLoading={isLoading}
      />
    </FormProvider>
  )
}
