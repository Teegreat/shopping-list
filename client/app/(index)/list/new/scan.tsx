import { View, Text } from 'react-native'
import React from 'react'
import { BodyScrollView } from '@/components/ui/BodyScrollView'

const ScanScreen = () => {
  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <Text>Scan</Text>
    </BodyScrollView>
  )
}

export default ScanScreen;