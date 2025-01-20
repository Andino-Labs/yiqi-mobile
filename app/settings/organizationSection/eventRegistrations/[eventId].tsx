import React, { useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Pressable, TextInput, View } from 'react-native'
import trpc from '@/constants/trpc'
import { useDebounce } from '@/hooks/useDebounce'
import { ThemedText } from '@/components/ui/ThemedText'
import { QrCodeIcon, SearchIcon } from 'lucide-react-native'
import { BarcodeScanningResult } from 'expo-camera'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import ConfirmationModal from '@/components/ConfirmationModal'
import { useTranslation } from 'react-i18next'
import showToast from '@/helpers/showToast'
import { extractTicketIdFromQr } from '@/helpers/extractTicketIdFromQr'
import QrCameraModal from '@/components/organization/QrCameraModal'
import RegistrationList from '@/components/organization/RegistrationList'

export default function EventRegistrations() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>()
  const { data, refetch } = trpc.getEventRegistrations.useQuery({ eventId })
  const checkInMutation = trpc.checkInTicket.useMutation()

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 1500)
  const [checkInData, setCheckInData] = useState<string | null>(null)
  const cameraModalRef = useRef<BottomSheetModal>(null)
  const confirmModalRef = useRef<BottomSheetModal>(null)
  const { t } = useTranslation()

  const filteredRegistrations = useMemo(
    () =>
      debouncedSearchQuery.length
        ? data?.filter(registration =>
            registration.user?.name
              ?.toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())
          )
        : data,
    [data, debouncedSearchQuery]
  )

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    const ticketId = extractTicketIdFromQr(scanningResult.data)

    if (ticketId) {
      setCheckInData(ticketId)
      cameraModalRef.current?.dismiss()
      confirmModalRef.current?.present()
    } else {
      showToast(t('organization.registrationList.scanErrorToast'), {
        type: 'error'
      })
    }
  }

  const onCheckInPress = (ticketId: string) => {
    setCheckInData(ticketId)
    confirmModalRef.current?.present()
  }

  const onConfirmCheckIn = async () => {
    if (!checkInData) return

    try {
      await checkInMutation.mutateAsync({ ticketId: checkInData, eventId })
      showToast(t('organization.registrationList.checkinSuccessToast'))
      confirmModalRef.current?.close()
      setCheckInData(null)
      refetch()
    } catch {
      showToast(t('organization.registrationList.checkinErrorToast'), {
        type: 'error'
      })
    }
  }
  return (
    <SafeAreaView className="flex-1 px-4">
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          title: t('organization.registrationList.screenTitle')
        }}
      />
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center border border-neutral-700 rounded-lg p-2 flex-1 mr-2">
          <SearchIcon color="white" />
          <TextInput
            className="ml-2 flex-1 text-white placeholder-neutral-400"
            placeholder={t('organization.registrationList.searchByName')}
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable
          onPress={() => cameraModalRef.current?.present()}
          className="flex-row items-center bg-neutral-800 p-3 rounded-lg"
        >
          <QrCodeIcon color="white" />
          <ThemedText className="ml-2 text-white">
            {t('organization.registrationList.scanButtonLabel')}
          </ThemedText>
        </Pressable>
      </View>
      <RegistrationList
        registrations={filteredRegistrations || []}
        onCheckInPress={onCheckInPress}
      />
      <QrCameraModal
        bottomSheetRef={cameraModalRef}
        handleBarCodeScanned={handleBarCodeScanned}
      />
      <ConfirmationModal
        bottomSheetRef={confirmModalRef}
        title={t('organization.registrationList.confirmModalTitle')}
        description={t('organization.registrationList.confirmModalDescription')}
        cancelText={t('general.cancel')}
        confirmText={t('general.confirm')}
        onConfirm={onConfirmCheckIn}
      />
    </SafeAreaView>
  )
}
