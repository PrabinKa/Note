import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignupScreen from '../screens/SignupSccreen/SignupScreen';

import DrawerNavigator from './DrawerNavigator';
import CreateNoteScreen from '../screens/CreateNoteScreen/CreateNoteScreen';
import EditNoteScreen from '../screens/EditNoteScreen/EditNoteScreen';
import {GlobalAthentication} from '../global-context/GlobalAuthentication';

interface Note {
  createdDate: string;
  id: string;
  note: string;
  noteCategory: string;
  noteTitle: string;
}

export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Drawer: undefined;
  Login: undefined;
  SignUp: undefined;
  CreateNote: undefined;
  EditNote: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
        presentation: 'fullScreenModal',
      }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
        presentation: 'fullScreenModal',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const {userToken} = useContext(GlobalAthentication);

  // console.log('token', userToken);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        {userToken ? (
          <Stack.Screen name="Home" component={HomeStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
