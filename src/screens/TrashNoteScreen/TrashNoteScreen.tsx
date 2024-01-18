import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { DrawerParamList } from '../../navigation/DrawerNavigator'
import { DrawerNavigationProp } from '@react-navigation/drawer';

type TrashNoteScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Trash'>;

interface TrashNoteScreenProps {
  navigation: TrashNoteScreenNavigationProp;
}

export default function TrashNoteScreen({navigation}: TrashNoteScreenProps) {
  return (
    <View>
      <Text>TrashNoteScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})