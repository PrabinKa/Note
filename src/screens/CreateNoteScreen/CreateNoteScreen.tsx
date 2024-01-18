import React, {useRef, useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Animated,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';

import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';

//Navigation props
type CreateNoteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateNote'>;
interface CreateNoteScreenProps {
  navigation: CreateNoteScreenNavigationProp;
}

//Color props
interface ColorProps {
  colors: Record<string, string>;
}

//Header component props
interface HeaderProps {
  colors: ColorProps['colors'];
  onPress: () => void;
}
const Header = ({colors, onPress}: HeaderProps) => {
  return (
    <View style={styles.headerWrapper}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <Ionicons
          name="chevron-back-sharp"
          size={responsiveSize(40)}
          color={colors.text}
        />
      </Pressable>
      <Pressable style={({pressed}) => pressed && styles.pressed}>
        <Ionicons
          name="ellipsis-vertical-outline"
          size={responsiveSize(30)}
          color={colors.text}
        />
      </Pressable>
    </View>
  );
};

export default function CreateNoteScreen({navigation}: CreateNoteScreenProps) {
  const {colors} = useTheme();
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }).start();
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 50,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [opacityValue]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: colors.background}}>
      <Header colors={colors} onPress={() => navigation.goBack()} />
      <View style={[styles.titleContainer, {borderBottomColor: colors.accent}]}>
        <TextInput
          placeholder="Note Title"
          placeholderTextColor={'#D4D4D4'}
          selectionColor={'#888'}
          style={{
            fontSize: responsiveSize(24),
            color: colors.text,
          }}
        />
        <Text style={[styles.date, {color: colors.text}]}>1/17/2024</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{paddingHorizontal: responsiveSize(15), marginVertical: 20}}>
          <TextInput
            placeholder="Create your note..."
            placeholderTextColor={'#D4D4D4'}
            selectionColor={'#888'}
            multiline
            style={{
              fontSize: responsiveSize(18),
              color: colors.text,
            }}
          />
        </View>
      </ScrollView>
      <Animated.View style={{opacity: opacityValue}}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.button}]}>
          <Text style={{color: colors.background, fontWeight: 'bold'}}>
            Save
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(15),
    paddingVertical: responsiveSize(5),
  },
  titleContainer: {
    paddingHorizontal: responsiveSize(15),
    paddingVertical: responsiveSize(30),
    borderBottomWidth: 3,
  },
  date: {
    fontSize: responsiveSize(12),
    fontWeight: '500',
    marginLeft: 3,
  },
  button: {
    height: 40,
    width: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.2,
  },
});
