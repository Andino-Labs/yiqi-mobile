import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import trpc from '@/constants/trpc'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '@/components/formsFields/InputField'
import { ActivityIndicator, Pressable, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { UserDataCollected, userDataCollectedShema } from '@/schemas/userSchema'
import { UploadToS3 } from '@/helpers/uploadToS3'
import { DocumentPickerAsset } from 'expo-document-picker'
import ResumePickerComponent from '../ResumePickerComponent'
import { ThemedText } from '../ui/ThemedText'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import showToast from '@/helpers/showToast'

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

export default function UpdateNetworkingForm({
  initialData
}: {
  initialData: NetworkingData
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
      professionalMotivations: initialData.professionalMotivations ?? '',
      communicationStyle: initialData.communicationStyle ?? '',
      professionalValues: initialData.professionalValues ?? '',
      careerAspirations: initialData.careerAspirations ?? '',
      significantChallenge: initialData.significantChallenge ?? '',
      resumeUrl: initialData.resumeUrl ?? '',
      resumeText: initialData.resumeText ?? '',
      resumeLastUpdated: initialData.resumeLastUpdated ?? ''
    }
  })

  const saveNetworkingProfile = trpc.saveNetworkingProfile.useMutation()
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
      if (result.success) {
        showToast(t('networkingSettings.networkingProfileSaved'))
      } else {
        showToast(t('networkingSettings.networkingProfileError'))
      }
    } catch {
      showToast(t('networkingSettings.networkingProfileError'))
    } finally {
      setIsLoading(false)
    }
  }

  const { t } = useTranslation()
  return (
    <FormProvider {...form}>
      <View className="mx-2">
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
        <Pressable
          onPress={form.handleSubmit(onSubmit)}
          disabled={isLoading}
          className={`border-neutral-200 border-[1px] py-3 rounded-lg items-center mb-6`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.dark.tint} />
          ) : (
            <ThemedText className="font-bold text-white">
              {t('networkingSettings.saveNetworkingProfile')}
            </ThemedText>
          )}
        </Pressable>
      </View>
    </FormProvider>
  )
}
