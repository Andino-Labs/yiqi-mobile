import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, Pressable } from 'react-native'
import { Modal } from '@/components/Modal'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { SearchFilterType } from '@/app/(tabs)/events'
import { EventTypeEnum } from '@/types/eventTypes'
import { Select } from '../Select'
import { useTranslation } from 'react-i18next'

interface FilterEventsProps {
  searchFilters: SearchFilterType
  setSearchFilters: (value: React.SetStateAction<SearchFilterType>) => void
  isOpen: boolean
  closeModal: () => void
  onSubmit: () => void
  handleResetFilters: () => void
}

export default function FilterEventListModal({
  searchFilters,
  setSearchFilters,
  closeModal,
  isOpen,
  onSubmit,
  handleResetFilters
}: FilterEventsProps) {
  const [localFilters, setLocalFilters] =
    useState<SearchFilterType>(searchFilters)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (
      searchFilters.title !== localFilters.title ||
      searchFilters.startDate !== localFilters.startDate ||
      searchFilters.type !== localFilters.type
    ) {
      setLocalFilters(searchFilters)
    }
  }, [searchFilters])

  const onDateChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return
    setShowDatePicker(false)

    // format as YYYY-MM-DD
    const formattedDate = selectedDate.toISOString().split('T')[0]

    setLocalFilters({
      ...localFilters,
      startDate: formattedDate
    })
  }

  const eventTypeItems = Object.values(EventTypeEnum).map(value => ({
    label: value,
    value
  }))

  const handleApplyFilters = () => {
    setSearchFilters(localFilters)
    onSubmit()
    closeModal()
  }

  return (
    <>
      <Modal withInput isOpen={isOpen} onDismiss={closeModal}>
        <View
          className="bg-neutral-900 m-4 p-4 rounded-lg"
          style={{ minWidth: '80%' }}
        >
          <View className="flex-row justify-between items-start">
            <Text className="text-lg font-bold text-white mb-4">
              {t('general.search')}
            </Text>
            <Pressable onPress={closeModal} className="ml-auto">
              <Ionicons name="close" color="white" size={20} />
            </Pressable>
          </View>

          <Text className="text-sm text-white mb-1">
            {t('general.eventTitle')}
          </Text>
          <TextInput
            className="border border-neutral-700 rounded-md p-2 mb-3 text-white"
            placeholder={t('general.searchByTitle')}
            placeholderTextColor="gray"
            value={localFilters.title}
            onChangeText={title => setLocalFilters({ ...localFilters, title })}
          />

          <Text className="text-sm text-white mb-1">
            {t('general.startDate')}
          </Text>
          <Pressable onPress={() => setShowDatePicker(true)}>
            <TextInput
              editable={false}
              value={localFilters.startDate}
              className="border border-neutral-700 rounded-md p-2 mb-3 text-white"
              placeholder="YYYY-MM-DD"
              placeholderTextColor="gray"
            />
          </Pressable>

          <Text className="text-sm text-white mb-1">
            {t('general.eventType')}
          </Text>
          <Select
            items={eventTypeItems}
            onSelect={selectedItem => {
              setLocalFilters({
                ...localFilters,
                type: selectedItem.value
              })
            }}
            value={localFilters.type}
            placeholder=""
          />

          <View className="flex-row justify-between mt-4">
            <Pressable
              className="border border-neutral-700 rounded-md p-2"
              onPress={handleResetFilters}
            >
              <Text className="text-neutral-400 font-bold">
                {t('general.reset')}
              </Text>
            </Pressable>
            <Pressable
              className="border border-neutral-700 rounded-md p-2"
              onPress={handleApplyFilters}
            >
              <Text className="text-white font-bold">{t('general.apply')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={new Date(localFilters.startDate || new Date())}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </>
  )
}
