import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { DrawerParamList } from '../../navigation/DrawerNavigator'
import { RouteProp } from '@react-navigation/native';

type TrashNoteScreenRouteProp = RouteProp<DrawerParamList, 'AllNotes'>;

interface TrashNoteScreenProps {
  navigation: any; // Change this to the correct type
}

export default function TrashNoteScreen({navigation}: TrashNoteScreenProps) {
  return (
    <View>
      <Text>TrashNoteScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})