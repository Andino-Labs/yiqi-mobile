import React, { type FC, useCallback } from 'react'
import { View, Text, Pressable } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Calendar, FileText } from 'lucide-react-native'
import showToast from '@/helpers/showToast'

type Props = {
  setFile: (document?: DocumentPicker.DocumentPickerAsset) => void
}

const ResumePickerComponent: FC<Props> = ({ setFile }) => {
  const { watch, setValue } = useFormContext()
  const { t } = useTranslation()

  const onOpenDocumentPicker = useCallback(async (): Promise<void> => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        type: ['application/pdf', 'application/msword', 'text/plain']
      })

      if (result.canceled) {
        return
      }

      setValue('resumeUrl', result.assets[0].name, { shouldDirty: true })
      setValue('resumeLastUpdated', new Date().toISOString(), {
        shouldDirty: true
      })
      setFile(result.assets[0])
    } catch {
      showToast(t('networkingSettings.resumeUploadError'), { type: 'error' })
    }
  }, [setFile, setValue, t])

  const resumeLastUpdated = new Date(watch('resumeLastUpdated')).toLocaleString(
    'en-US',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  )
  const fileName = watch('resumeUrl')
  return (
    <View className="border rounded-md border-cyan-300 justify-center items-center h-28">
      <Pressable onPress={onOpenDocumentPicker}>
        {fileName ? (
          <View className="m-5">
            <View className="flex-row items-center ">
              <FileText size={20} color="white" />
              <Text
                className="ml-1 text-sm text-white"
                numberOfLines={2}
                style={{ flexShrink: 1 }}
              >
                {fileName.split('/').pop()}
              </Text>
            </View>
            <View className="flex-row items-center  mt-2">
              <Calendar size={20} color="white" />
              <Text
                className="ml-1 text-sm text-white"
                numberOfLines={2}
                style={{ flexShrink: 1 }}
              >
                {resumeLastUpdated}
              </Text>
            </View>
          </View>
        ) : (
          <View className="flex-row items-center justify-center">
            <FileText size={24} color="white" />
            <Text className="text-white ml-2">
              {t('networkingSettings.selectResumeTypes')}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  )
}

export default ResumePickerComponent
