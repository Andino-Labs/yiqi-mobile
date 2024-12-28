import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import trpc from '@/constants/trpc'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '@/components/formsFields/InputField'
import {
  Pressable,
  ScrollView,
  Switch,
  View,
  ActivityIndicator,
  Text
} from 'react-native'
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
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import showToast from '@/helpers/showToast'
import { ThemedText } from '@/components/ui/ThemedText'

const IconProps = { color: '#fff', size: 20 }

export default function StepTwo({ user }: { user: ProfileWithPrivacy }) {
  const form = useForm<z.infer<typeof profileWithPrivacySchema>>({
    resolver: zodResolver(profileWithPrivacySchema),
    defaultValues: { ...user }
  })
  const updateUserProfile = trpc.updateUserProfile.useMutation()
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
      if (result.success) {
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
          <View className="m-4">
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
        </ScrollView>
      </FormProvider>
    </>
  )
}
