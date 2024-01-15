import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { DrawerParamList } from '../../navigation/DrawerNavigator'
import { RouteProp } from '@react-navigation/native';

type AllNotesScreenRouteProp = RouteProp<DrawerParamList, 'AllNotes'>;

interface AllNotesScreenProps {
  navigation: any; // Change this to the correct type
}

export default function AllNotesScreen({navigation}: AllNotesScreenProps) {
  return (
    <View>
      <Text>AllNotesScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})