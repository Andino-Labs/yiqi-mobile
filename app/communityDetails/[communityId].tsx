import { StyleSheet, View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { Stack, useLocalSearchParams } from 'expo-router'
import trpc from '@/constants/trpc'
import { Image } from 'expo-image'
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import Memberslist from '@/components/CommunityDetails/MembersList'
import { Building2, Users } from 'lucide-react-native'
import { Colors } from '@/constants/Colors'
import SocialIcons from '@/components/CommunityDetails/SocialIcons'
import { useTranslation } from 'react-i18next'
import CommunityEvents from '@/components/CommunityDetails/CommunityEvents'
const HEADER_HEIGHT = 250

export default function CommunityDetails() {
  const { communityId } = useLocalSearchParams<{ communityId: string }>()
  const { data } = trpc.getCommunityDetails.useQuery({
    communityId
  })
  const { t } = useTranslation()
  if (!data)
    return (
      <>
        <Stack.Screen options={{ title: '' }} />
      </>
    )
  const { organization } = data

  const Header = () => {
    return (
      <View style={styles.header}>
        {organization.logo && (
          <Image
            style={styles.header}
            contentFit="cover"
            source={{ uri: organization.logo }}
          />
        )}
      </View>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: organization.name || '' }} />
      <Tabs.Container
        renderHeader={Header}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            indicatorStyle={{ backgroundColor: Colors.dark.tint }}
            style={{
              elevation: 0,
              backgroundColor: '#000'
            }}
            activeColor="white"
            inactiveColor="gray"
            labelStyle={{ color: 'white' }}
          />
        )}
        headerHeight={HEADER_HEIGHT} // optional
      >
        <Tabs.Tab label="About" name="About">
          <Tabs.ScrollView className="flex-1 m-2">
            <ThemedText className=" text-2xl font-bold mb-2">
              {organization?.name}
            </ThemedText>
            <ThemedText>
              <Users color={'white'} size={15} /> {data.members.length}{' '}
              {t('community.members')}
            </ThemedText>
            <ThemedText>
              <Building2 color={'white'} size={15} />{' '}
              {t('community.membersOrganizedBy')}{' '}
              <ThemedText className="font-bold text-lg">
                {data.organizers[0]?.name}
              </ThemedText>
            </ThemedText>
            <SocialIcons organization={data.organization} />
            <View className="h-[1px] w-full bg-gray-700 my-4" />
            <ThemedText className="text-lg font-bold">
              {t('community.about')}
            </ThemedText>
            <ThemedText className="text-sm">
              {organization.description}
            </ThemedText>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab label={'Events'} name="events">
          <CommunityEvents events={data.events} />
        </Tabs.Tab>
        <Tabs.Tab label={'Members'} name="Members">
          <Tabs.ScrollView className="m-2">
            <ThemedText className="mt-2 font-bold">
              {t('community.memberOrganizers')}
            </ThemedText>
            <Memberslist users={data.organizers} />
            <ThemedText className="mt-2 font-bold">
              {t('community.members')}
            </ThemedText>
            <Memberslist users={data.members} />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </>
  )
}
const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%'
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#000'
  }
})
