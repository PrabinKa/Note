import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../theme/ThemeProvider';
import {Button, InputField, InputFieldWithIcon} from '../../components';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignupScreenProps {
  navigation: SignupScreenNavigationProp;
}

export default function SignupScreen({navigation}: SignupScreenProps) {
  const {colors} = useTheme();
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: colors.primary}]}>NOTE</Text>
        <Text style={[styles.subTitle, {color: colors.text}]}>TAKING APP</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <InputField placeholder={'Full Name'} colors={colors} />
        <InputField placeholder={'Email'} colors={colors} />
        <InputFieldWithIcon
          placeholder={'Passsword'}
          colors={colors}
          secureTextEntry={showPassword}
          onPress={togglePasswordVisibility}
        />
        <InputFieldWithIcon
          placeholder={'Re-Write Password'}
          colors={colors}
          secureTextEntry={showRepeatPassword}
          onPress={toggleRepeatPasswordVisibility}
        />

        <Button
          colors={colors}
          buttonStyles={{
            height: 50,
            width: '70%',
            backgroundColor: colors.button,
          }}>
          SIGN UP
        </Button>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: responsiveHeight(3)}}>
          <Text style={{fontSize: 16, color: colors.text}}>Already have an account? </Text>
          <Pressable onPress={() => {navigation.navigate('Login')}} style={({pressed}) => pressed && styles.pressedItem}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              LogIn
            </Text>
          </Pressable>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(6),
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subTitle: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500',
  },
  pressedItem: {
    opacity: 0.5
  }
});
