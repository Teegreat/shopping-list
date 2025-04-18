import { View, Text } from 'react-native'
import React from 'react'
import { BodyScrollView } from '@/components/ui/BodyScrollView'
import { ThemedText } from '@/components/ThemedText'

const ProfileScreen = () => {
  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <ThemedText>Profile</ThemedText>
    </BodyScrollView>
  )
}

export default ProfileScreen;