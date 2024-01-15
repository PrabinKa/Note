import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerParamList } from '../../navigation/DrawerNavigator';

interface SettingsScreenProps {
    navigation: any
}

export default function SettingScreen({navigation}: SettingsScreenProps) {
  return (
    <View>
      <Text>SettingScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})