import { Button, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelectedLanguage } from '@/i18n/utils'
import { ThemedText } from '@/components/ThemedText'

export default function Profile() {
  const { language, setLanguage } = useSelectedLanguage()

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 m-2">
        <View className="flex-row">
          <ThemedText type="defaultSemiBold">
            Selected Language : {language}
          </ThemedText>
          <Button title="EN" onPress={() => setLanguage('en')} />
          <Button title="ES" onPress={() => setLanguage('es')} />
        </View>
      </View>
    </SafeAreaView>
  )
}
