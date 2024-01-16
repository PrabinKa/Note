import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React, {useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import AllNotesScreen from '../screens/AllNotesScreen/AllNotesScreen';
import TrashNoteScreen from '../screens/TrashNoteScreen/TrashNoteScreen';
import ArchiveNoteScreen from '../screens/ArchiveNoteScreen/ArchiveNoteScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';

import {screens, icons} from '../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../theme/ThemeProvider';

export type DrawerParamList = {
  AllNotes: undefined;
  Trash: undefined;
  Archive: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

interface CustomDrawerItemProps {
  icon: ImageSourcePropType;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  colors: Record<string, string>;
}

const CustomDrawerItem = ({
  icon,
  label,
  isFocused,
  onPress,
  colors,
}: CustomDrawerItemProps) => {
  // console.warn("label", label)
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 50,
        marginBottom: 20,
        alignItems: 'center',
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: isFocused ? colors.primary : colors.background,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: 25,
          height: 25,
          tintColor: isFocused ? colors.background : colors.text,
        }}
      />
      <Text
        style={{
          marginLeft: 10,
          color: isFocused ? colors.background : colors.text,
          // tintColor: colors.accent,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface DrawerContentProps {
  navigation: any;
  colors: Record<string, string>;
}

const DrawerContent = ({navigation, colors}: DrawerContentProps) => {
  const [selectedTab, setSelectedTab] = useState('notes');

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, padding: 10}}>
        <View>
          <Image
            source={require('../assets/user.png')}
            resizeMode="contain"
            style={{
              width: 70,
              height: 70,
              borderRadius: 20,
            }}
          />
          <View style={{marginLeft: 5, justifyContent: 'center'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 5,
                color: colors.text,
              }}>
              Prabin Karki
            </Text>
            <Text
              numberOfLines={1}
              style={{color: colors.text, fontWeight: 'bold', fontSize: 12}}>
              PrabinKarki4296@gmail.com
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text style={{fontSize: 14, color: colors.text}}>
            Things you keep Record
          </Text>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => navigation.closeDrawer()}>
            <Ionicons name="chevron-back" size={35} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 2,
            width: '100%',
            backgroundColor: colors.accent,
          }}
        />
        <View style={{flex: 1, marginTop: 40}}>
          <CustomDrawerItem
            label={screens.notes}
            icon={icons.notes}
            colors={colors}
            isFocused={selectedTab == screens.notes}
            onPress={() => {
              setSelectedTab(screens.notes);
              navigation.navigate('AllNotes');
            }}
          />
          <CustomDrawerItem
            label={screens.trash}
            icon={icons.trash}
            colors={colors}
            isFocused={selectedTab == screens.trash}
            onPress={() => {
              setSelectedTab(screens.trash);
              navigation.navigate('Trash');
            }}
          />
          <CustomDrawerItem
            label={screens.archive}
            icon={icons.archive}
            colors={colors}
            isFocused={selectedTab == screens.archive}
            onPress={() => {
              setSelectedTab(screens.archive);
              navigation.navigate('Archive');
            }}
          />
        </View>
        <View
          style={{
            height: 2,
            width: '100%',
            backgroundColor: colors.accent,
            marginTop: 40,
          }}
        />
        <View style={{flex: 1, marginTop: 40}}>
          <CustomDrawerItem
            label={screens.settings}
            icon={icons.settings}
            colors={colors}
            isFocused={selectedTab == screens.settings}
            onPress={() => {
              setSelectedTab(screens.settings);
              navigation.navigate('Settings');
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default function DrawerNavigator() {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'front',
          drawerStyle: {
            flex: 1,
            width: 250,
            paddingRight: 10,
            backgroundColor: colors.background,
          },
          headerShown: false,
        }}
        drawerContent={props => {
          return (
            <DrawerContent colors={colors} navigation={props.navigation} />
          );
        }}
        initialRouteName="AllNotes">
        <Drawer.Screen name="AllNotes">
          {props => <AllNotesScreen {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Trash">
          {props => <TrashNoteScreen {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Archive">
          {props => <ArchiveNoteScreen {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="Settings">
          {props => <SettingScreen {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({});
