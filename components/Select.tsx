import { Colors } from '@/constants/Colors'
import { ChevronDown, ChevronUp } from 'lucide-react-native'
import { useMemo } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

// Generic type for the Select component
export type SelectorOption<T> = {
  label: string
  value: T
}

export type SelectProps<T> = {
  error?: string
  placeholder: string
  items: SelectorOption<T>[]
  value?: string
  onSelect: (selectedItem: SelectorOption<T>) => void
  onBlur?: () => void
  dropdownButtonStyle?: StyleProp<ViewStyle>
}

export const Select = <T extends unknown>({
  error,
  placeholder,
  items,
  value,
  onSelect,
  onBlur,
  dropdownButtonStyle
}: SelectProps<T>) => {
  const selectedItem = useMemo(
    () => items.find(item => item.value === value),
    [value, items]
  )

  return (
    <TouchableWithoutFeedback onPress={onBlur}>
      <>
        <SelectDropdown
          data={items}
          statusBarTranslucent
          onSelect={selectedItem => onSelect(selectedItem)}
          defaultValue={selectedItem}
          renderButton={(selectedItem, isOpened) => {
            const ChevronIcon = isOpened ? ChevronUp : ChevronDown

            return (
              <View style={[styles.dropdownButtonStyle, dropdownButtonStyle]}>
                <Text style={styles.dropdownButtonTextStyle}>
                  {selectedItem?.label ?? placeholder}
                </Text>

                <ChevronIcon size={24} color={Colors.dark.tint} />
              </View>
            )
          }}
          renderItem={(item, index, isSelected) => (
            <View
              key={index}
              style={[
                styles.dropdownItemStyle,
                isSelected && {
                  backgroundColor: '#9BA1A6'
                }
              ]}
            >
              <Text style={styles.dropdownItemTextStyle}>{item.label}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: 45,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#404040'
  },
  dropdownButtonTextStyle: {
    flex: 1,
    fontWeight: '500',
    color: '#9BA1A6'
  },
  dropdownButtonArrowStyle: {
    fontSize: 28
  },
  dropdownMenuStyle: {
    backgroundColor: '#151718',
    borderRadius: 10
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdownItemTextStyle: {
    flex: 1,
    color: 'white'
  },
  errorMessage: {
    color: Colors.dark.error,
    fontSize: 14,
    marginLeft: 14
  }
})
