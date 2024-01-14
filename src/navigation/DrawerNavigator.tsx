import { StyleSheet, Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
  } from "@react-navigation/drawer";
import AllNotesScreen from '../screens/AllNotesScreen/AllNotesScreen';
import TrashNoteScreen from '../screens/TrashNoteScreen/TrashNoteScreen';

import { screens } from '../constants/Constants';

import { useTheme } from '../theme/ThemeProvider';

const Drawer = createDrawerNavigator();

interface CustomDrawerItemProps {
    icon: ImageSourcePropType;
    label: string;
    isFocused: boolean;
    onPress: () => void;
  }

const CustomDrawerItem = ({ icon, label, isFocused, onPress }: CustomDrawerItemProps) => {
    // console.warn("label", label)
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 40,
          marginBottom: 20,
          alignItems: "center",
          paddingLeft: 10,
          borderRadius: 10,
        //   backgroundColor: isFocused ?  : null,
        }}
        onPress={onPress}
      >
        <Image
          source={icon}
          style={{
            width: 25,
            height: 25,
            // tintColor: isFocused ? COLORS.Blue : COLORS.White,
          }}
        />
        <Text
          style={{
            marginLeft: 10,
            // color: isFocused ? COLORS.Blue : COLORS.White,
            // tintColor: COLORS.White,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

export default function DrawerNavigator() {
    const { colors } = useTheme();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="AllNotes" component={AllNotesScreen} />
      <Drawer.Screen name="Trash" component={TrashNoteScreen} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({})