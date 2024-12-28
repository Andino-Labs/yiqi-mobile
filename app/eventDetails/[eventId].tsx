import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable
} from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import trpc from '@/constants/trpc'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import Registration from '@/components/Event/Registration'
import EventDescription from '@/components/Event/EventDetails/EventDescription'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import LocationMap from '@/components/LocationMap'
import { useTranslation } from 'react-i18next'

import { ChevronLeft } from 'lucide-react-native'
import { Colors } from '@/constants/Colors'
import { PublicEventType } from '@/types/eventTypes'
import { useAuthContext } from '@/context/AuthContext'
import * as Linking from 'expo-linking'
import { errorHandler } from '@/helpers/errorHandler'

export default function EventDetails() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>()
  const { data, error, isLoading } = trpc.getEvent.useQuery({
    eventId,
    includeTickets: true
  })
  const { t } = useTranslation()
  const {
    session: { user }
  } = useAuthContext()

  const openMaps = () => {
    if (data?.location)
      return Linking.openURL(
        `http://maps.google.com/?q=${data.location}`
      ).catch(errorHandler)
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator
          className=" py-2"
          size="large"
          color={Colors.dark.tint}
        />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Text className="text-red-500">Failed to load event details.</Text>
      </SafeAreaView>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen
        options={{
          title: data?.title || '',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <ChevronLeft color="white" size={24} />
            </Pressable>
          )
        }}
      />
      <SafeAreaView className="flex-1 bg-black px-5 py-2">
        {/* Event Image */}
        {data?.openGraphImage && (
          <View className="mb-5">
            <Image
              className="w-full h-48 rounded-lg"
              contentFit="cover"
              source={{ uri: data.openGraphImage }}
            />
          </View>
        )}

        {/* Event Title */}
        <ThemedText className="text-white text-2xl font-bold mb-2">
          {data?.title}
        </ThemedText>

        {/* Event Date and Location */}
        <View className="mb-5">
          <View className="flex-row items-center mb-1">
            <Ionicons
              name="calendar"
              size={18}
              color="white"
              className="mr-2"
            />
            <Text className="text-white text-sm">
              {data.startDate.toLocaleDateString()},{' '}
              {data.startDate.toLocaleTimeString()} -{' '}
              {data.endDate.toLocaleTimeString()}
            </Text>
          </View>
          <View className="flex-row">
            {data.location && data.city && (
              <>
                <MaterialIcons
                  name="location-on"
                  size={18}
                  color="white"
                  className="mr-2"
                />
                <Text numberOfLines={1} className="text-white text-sm">
                  {data.location}, {data.city}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-700 my-5" />
        <ThemedText className="text-white text-2xl font-bold mb-2">
          {t('Event.eventAbout')}
        </ThemedText>
        <EventDescription description={data.description} />

        {/* Divider */}
        <View className="h-px bg-gray-700 my-5" />
        {/* Registration Section */}
        {data && <Registration event={data as PublicEventType} user={user} />}
        {/* Divider */}
        <View className="h-px bg-gray-700 my-5" />
        <ThemedText className="text-white text-2xl font-bold mb-2">
          {t('Event.location')}
        </ThemedText>
        <TouchableOpacity onPress={openMaps}>
          <ThemedText className="text-white text-sm font-bold mb-2">
            {data.location}
          </ThemedText>
        </TouchableOpacity>
        <LocationMap coordinates={data.latLon} />
      </SafeAreaView>
    </ScrollView>
  )
}
