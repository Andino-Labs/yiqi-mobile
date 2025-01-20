import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import trpc from '@/constants/trpc'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '@/components/formsFields/InputField'
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { UserDataCollected, userDataCollectedShema } from '@/schemas/userSchema'
import { UploadToS3 } from '@/helpers/uploadToS3'
import { DocumentPickerAsset } from 'expo-document-picker'
import ResumePickerComponent from '../ResumePickerComponent'
import { ThemedText } from '../ui/ThemedText'
import showToast from '@/helpers/showToast'
import OnBardingFooter from './OnBardingFooter'

type NetworkingData = Pick<
  UserDataCollected,
  | 'professionalMotivations'
  | 'communicationStyle'
  | 'professionalValues'
  | 'careerAspirations'
  | 'significantChallenge'
  | 'resumeUrl'
  | 'resumeText'
  | 'resumeLastUpdated'
>

export default function StepThree({
  handleStepChange,
  user
}: {
  handleStepChange: () => void
  user: NetworkingData
}) {
  const form = useForm<NetworkingData>({
    resolver: zodResolver(
      userDataCollectedShema.pick({
        professionalMotivations: true,
        communicationStyle: true,
        professionalValues: true,
        careerAspirations: true,
        significantChallenge: true,
        resumeUrl: true,
        resumeText: true,
        resumeLastUpdated: true
      })
    ),
    defaultValues: {
      professionalMotivations: user.professionalMotivations ?? '',
      communicationStyle: user.communicationStyle ?? '',
      professionalValues: user.professionalValues ?? '',
      careerAspirations: user.careerAspirations ?? '',
      significantChallenge: user.significantChallenge ?? '',
      resumeUrl: user.resumeUrl ?? '',
      resumeText: user.resumeText ?? '',
      resumeLastUpdated: user.resumeLastUpdated ?? ''
    }
  })
  const { formState, handleSubmit } = form
  const { isDirty } = formState
  const utils = trpc.useUtils()

  const saveNetworkingProfile = trpc.saveNetworkingProfile.useMutation({
    onSuccess: () => utils.getUserProfile.invalidate()
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [file, setFile] = useState<DocumentPickerAsset | undefined>()

  const onSubmit: SubmitHandler<NetworkingData> = async (
    data: NetworkingData
  ) => {
    setIsLoading(true)

    try {
      let documentUrl: string | null = null
      if (file?.uri) {
        if (file.size && file.size > 5 * 1024 * 1024) {
          showToast(t('networkingSettings.maxFileSize'))

          return
        }

        try {
          documentUrl = await UploadToS3(file)
        } catch {
          showToast(t('networkingSettings.resumeUploadError'))
          setIsLoading(false)
          return
        }
      }

      const result = await saveNetworkingProfile.mutateAsync({
        ...data,
        resumeUrl: documentUrl
      })
      if (!result.success) {
        showToast(t('networkingSettings.networkingProfileError'))
      }
    } catch {
      showToast(t('networkingSettings.networkingProfileError'))
    } finally {
      setIsLoading(false)
      handleStepChange()
    }
  }

  const { t } = useTranslation()
  return (
    <FormProvider {...form}>
      <ScrollView>
        <ThemedText className="text-sm">
          {t('networkingSettings.networkingProfileDescription')}
        </ThemedText>
        <ThemedText className="text-sm mb-3">
          {t('networkingSettings.networkingBenefits')}
        </ThemedText>
        <View className="h-px bg-neutral-500 mb-5" />
        <ThemedText className="text-sm mb-3">
          {t('networkingSettings.resumeUploadLabel')}
        </ThemedText>
        <ResumePickerComponent setFile={setFile} />
        <View className="h-px bg-neutral-500 my-5" />
        <InputField
          label={t('networkingSettings.professionalMotivationsLabel')}
          name="professionalMotivations"
          textarea
          placeholder={t(
            'networkingSettings.professionalMotivationsPlaceholder'
          )}
        />
        <InputField
          name="communicationStyle"
          label={t('networkingSettings.communicationStyleLabel')}
          textarea
          placeholder={t('networkingSettings.communicationStylePlaceholder')}
        />
        <InputField
          label={t('networkingSettings.professionalValuesLabel')}
          name="professionalValues"
          textarea
          placeholder={t('networkingSettings.professionalValuesPlaceholder')}
        />
        <InputField
          label={t('networkingSettings.careerAspirationsLabel')}
          name="careerAspirations"
          textarea
          placeholder={t('networkingSettings.careerAspirationsPlaceholder')}
        />
        <InputField
          label={t('networkingSettings.significantChallengeLabel')}
          name="significantChallenge"
          textarea
          placeholder={t('networkingSettings.significantChallengePlaceholder')}
        />
      </ScrollView>
      <OnBardingFooter
        handleStepChange={isDirty ? handleSubmit(onSubmit) : handleStepChange}
        isLoading={isLoading}
      />
    </FormProvider>
  )
}
