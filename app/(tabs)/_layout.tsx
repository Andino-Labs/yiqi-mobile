/* eslint-disable react/no-unstable-nested-components */
import { Colors } from '@/constants/Colors'
import { Tabs } from 'expo-router'
import React from 'react'
import { Calendar, Users, User2, HomeIcon } from 'lucide-react-native'

export default function TabLayout() {
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
