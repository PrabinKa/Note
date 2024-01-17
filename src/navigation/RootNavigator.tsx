import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignupScreen from '../screens/SignupSccreen/SignupScreen';

import DrawerNavigator from './DrawerNavigator';
import CreateNoteScreen from '../screens/CreateNoteScreen/CreateNoteScreen';

export type RootStackParamList = {
    Drawer: undefined;
    Login: undefined; 
    SignUp: undefined; 
    CreateNote: undefined;
  };

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Drawer'
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "push",
        animation: "slide_from_right",
        presentation: "fullScreenModal",
      }}
      >
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
