import React, {useContext, useState} from 'react';
import {View, SafeAreaView, Text, Pressable, StyleSheet} from 'react-native';
import {
  Button,
  ButtonWithIcon,
  InputField,
  InputFieldWithIcon,
  ErrorMessage,
} from '../../components';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {useTheme} from '../../theme/ThemeProvider';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {GlobalAthentication} from '../../global-context/GlobalAuthentication';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

type User = {
  email: string;
  fullname: string;
  password: string;
  token: string;
};

function LoginScreen(this: any, {navigation}: LoginScreenProps) {
  const {colors} = useTheme();
  const {Login, loginError, visible, onClose} = useContext(GlobalAthentication);
  const [showPassword, setShowPassword] = useState(true);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  console.log('auth', loginError, visible);
  type inputIdentifier = string;
  type inputValue = string;

  const inputChangeHandler = (
    identifier: inputIdentifier,
    value: inputValue,
  ) => {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [identifier]: value,
      };
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: colors.primary}]}>NOTE</Text>
        <Text style={[styles.subTitle, {color: colors.text}]}>TAKING APP</Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <InputField
          onChangeText={inputChangeHandler.bind(this, 'email')}
          placeholder={'Email'}
          colors={colors}
        />
        <InputFieldWithIcon
          onChangeText={inputChangeHandler.bind(this, 'password')}
          placeholder={'Passsword'}
          colors={colors}
          secureTextEntry={showPassword}
          onPress={togglePasswordVisibility}
        />
        <View style={styles.forgotPasswordWrapper}>
          <Pressable style={({pressed}) => pressed && styles.pressedItem}>
            <Text
              style={[styles.forgotPasswordText, {color: colors.secondary}]}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <Button
          colors={colors}
          onPress={() => {
            Login(inputs.email, inputs.password);
          }}
          buttonStyles={{
            height: 50,
            width: '70%',
            backgroundColor: colors.button,
          }}>
          LOG IN
        </Button>
      </View>

      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={styles.orWrapper}>
          <View style={styles.line} />
          <Text style={{fontSize: 14, color: colors.text}}>Or,</Text>
          <View style={styles.line} />
        </View>
        <ButtonWithIcon
          colors={colors}
          onPress={() => {}}
          buttonStyles={{
            height: 50,
            width: '70%',
            backgroundColor: colors.primary,
          }}
          icon={require('../../assets/google.png')}>
          Continue with Google
        </ButtonWithIcon>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: 16, color: colors.text}}>New user? </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={({pressed}) => pressed && styles.pressedItem}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              SignUp
            </Text>
          </Pressable>
        </View>
      </View>
      <ErrorMessage
        isVisible={visible}
        message={loginError}
        onClose={onClose}
      />
    </SafeAreaView>
  );
}

export default LoginScreen;

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
  forgotPasswordWrapper: {
    width: responsiveWidth(80),
    alignSelf: 'center',
    marginVertical: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  pressedItem: {
    opacity: 0.5,
  },
  orWrapper: {
    width: responsiveWidth(80),
    marginVertical: responsiveHeight(8),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: responsiveWidth(25),
    backgroundColor: '#313131',
  },
});
