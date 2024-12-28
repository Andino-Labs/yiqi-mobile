/* eslint-disable react/no-unstable-nested-components */
import { Colors } from '@/constants/Colors'
import { Tabs } from 'expo-router'
import React from 'react'
import { Calendar, Users, User2, HomeIcon, Ticket } from 'lucide-react-native'
import trpc from '@/constants/trpc'

export default function TabLayout() {
  // Prefetch queries on startup to make app feel more snappy
  const [getCommunities, getEvents] = trpc.useQueries(t => [
    t.getCommunities({ limit: 8, page: 1 }),
    t.getPublicEvents({ limit: 8, page: 1, title: '', startDate: '', type: '' })
  ])
  const isPrefetched = getCommunities.isFetched && getEvents.isFetched

  if (!isPrefetched) {
    return null
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tabIconSelected,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopColor: Colors.dark.tabIconSelected
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon size={20} color={color} />
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          headerShown: false,
          tabBarIcon: ({ color }) => <Calendar size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          headerShown: false,
          tabBarIcon: ({ color }) => <Users size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Tickets',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ticket size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <User2 size={20} color={color} />
        }}
      />
    </Tabs>
  )
}
