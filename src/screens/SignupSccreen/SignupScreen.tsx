import {StyleSheet, Text, View, ScrollView, Pressable, ToastAndroid} from 'react-native';
import React, {useState} from 'react';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../theme/ThemeProvider';
import {
  Button,
  InputField,
  InputFieldWithIcon,
  ErrorMessage,
} from '../../components';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';

import firestore from '@react-native-firebase/firestore';

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

interface SignupScreenProps {
  navigation: SignupScreenNavigationProp;
}

export default function SignupScreen(
  this: any,
  {navigation}: SignupScreenProps,
) {
  const {colors} = useTheme();
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = (): void => {
    setShowRepeatPassword(!showRepeatPassword);
  };

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

  const toggleErrorModal = () => setIsVisible(!isVisible);

  const submitHandler = () => {
    const {fullname, email, password, confirmPassword} = inputs;

    if (
      fullname == '' ||
      email == '' ||
      password == '' ||
      confirmPassword == ''
    ) {
      setIsVisible(!isVisible);
      setError('Every field is required to fill!');
    } else {
      if (!fullname.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
        setIsVisible(!isVisible);
        setError('Please input valid Full Name!');
      } else if (
        !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ) {
        setIsVisible(!isVisible);
        setError('Please input valid Email!');
      } else if (password.length <= 5) {
        setIsVisible(!isVisible);
        setError('Password must have atleast 6 char!');
      } else if (password !== confirmPassword) {
        setIsVisible(!isVisible);
        setError('Password does not match!');
      } else {
        firestore()
          .collection('Signup Users')
          .add({
            fullname: fullname,
            email: email,
            password: password
          })
          .then(() => {
            ToastAndroid.show('Signed Up Successfully !', ToastAndroid.SHORT);
            navigation.navigate('Login')
          });
      }
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: colors.primary}]}>NOTE</Text>
        <Text style={[styles.subTitle, {color: colors.text}]}>TAKING APP</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <InputField
          placeholder={'Full Name'}
          colors={colors}
          onChangeText={inputChangeHandler.bind(this, 'fullname')}
        />
        <InputField
          placeholder={'Email'}
          colors={colors}
          onChangeText={inputChangeHandler.bind(this, 'email')}
        />
        <InputFieldWithIcon
          placeholder={'Passsword'}
          colors={colors}
          secureTextEntry={showPassword}
          onPress={togglePasswordVisibility}
          onChangeText={inputChangeHandler.bind(this, 'password')}
        />
        <InputFieldWithIcon
          placeholder={'Re-Write Password'}
          colors={colors}
          secureTextEntry={showRepeatPassword}
          onPress={toggleRepeatPasswordVisibility}
          onChangeText={inputChangeHandler.bind(this, 'confirmPassword')}
        />

        <Button
          colors={colors}
          buttonStyles={{
            height: 50,
            width: '70%',
            backgroundColor: colors.button,
          }}
          onPress={submitHandler}>
          SIGN UP
        </Button>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: responsiveHeight(3),
        }}>
        <Text style={{fontSize: 16, color: colors.text}}>
          Already have an account?{' '}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={({pressed}) => pressed && styles.pressedItem}>
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
      <ErrorMessage
        isVisible={isVisible}
        message={error}
        onClose={toggleErrorModal}
      />
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
    opacity: 0.5,
  },
});
