import React, {useRef, useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';

import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';
import SelectDropdown from 'react-native-select-dropdown';
import {ErrorMessage} from '../../components';
import {openDatabase} from 'react-native-sqlite-storage';
import {Header} from '../../components';

let db = openDatabase({name: 'NoteTakingAppDatabase.db'});

//Navigation props
type CreateNoteScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateNote'
>;
interface CreateNoteScreenProps {
  navigation: CreateNoteScreenNavigationProp;
}

//category of notes
const categories: string[] = ['Work', 'Personal', 'Love', 'Interested'];

export default function CreateNoteScreen(
  this: any,
  {navigation}: CreateNoteScreenProps,
) {
  const {colors} = useTheme();
  const opacityValue = useRef(new Animated.Value(1)).current;
  const [showErrorMessage, setShowErroressage] = useState(false);
  const [errorText, setErrorText] = useState('');

  const date = new Date();

  const [inputs, setInputs] = useState({
    id: Math.random().toString(16).slice(2),
    noteTitle: '',
    noteCategory: '',
    createdDate: date.toISOString(),
    note: '',
  });

  //notes entered data handler which assign data to inputs state
  const inputChangeHandler = (
    inputIdentifier: string,
    enteredValue: string,
  ) => {
    setInputs(currentValue => {
      return {
        ...currentValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  //function that request to close error message modal
  const closeErrorMessage = () => {
    setShowErroressage(false);
  };

  //checks wethere data is empty or not and save data to the data base
  const uploadNotesData = async () => {
    const {id, noteTitle, noteCategory, createdDate, note} = inputs;
    if (
      noteTitle.trim() == '' ||
      noteCategory.trim() == '' ||
      note.trim() == ''
    ) {
      setShowErroressage(true);
      setErrorText('You may have forgot to fill all fields!');
    } else {
      (await db).transaction(tx => {
        tx.executeSql(
          'INSERT INTO table_note (id, noteTitle, noteCategory, createdDate, note) VALUES (?,?,?,?,?)',
          [id, noteTitle, noteCategory, createdDate, note],
          (tx: any, results: {rowsAffected: number}) => {

            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success!',
                'Your Note has been saved successfully !',
              );
              navigation.goBack();
            } else {
              Alert.alert('Failed!', 'Please try again!');
              navigation.goBack();
            }
          },
        );
      });
    }
  };

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
      <Header onPress={() => navigation.goBack()} title='Create Note' />
      <View style={[styles.titleContainer, {borderBottomColor: colors.accent}]}>
        <TextInput
          placeholder="Note Title"
          placeholderTextColor={'#D4D4D4'}
          selectionColor={'#888'}
          style={{
            fontSize: responsiveSize(24),
            color: colors.text,
          }}
          onChangeText={inputChangeHandler.bind(this, 'noteTitle')}
          value={inputs.noteTitle}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.date, {color: colors.text}]}>{(date.toISOString()).slice(0, 10)}</Text>
          <SelectDropdown
            data={categories}
            defaultButtonText="Select Category"
            buttonStyle={{
              height: 40,
              width: responsiveSize(150),
              borderRadius: 5,
              backgroundColor: colors.text,
            }}
            buttonTextStyle={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.background,
            }}
            dropdownStyle={{borderRadius: 5, backgroundColor: colors.text}}
            onSelect={(selectedItem, index) => {
              setInputs({...inputs, noteCategory: selectedItem});
            }}
          />
        </View>
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
            onChangeText={inputChangeHandler.bind(this, 'note')}
            value={inputs.note}
          />
        </View>
      </ScrollView>
      <Animated.View style={{opacity: opacityValue}}>
        <TouchableOpacity
          onPress={uploadNotesData}
          style={[styles.button, {backgroundColor: colors.button}]}>
          <Text style={{color: colors.background, fontWeight: 'bold'}}>
            Save
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <ErrorMessage
        isVisible={showErrorMessage}
        message={errorText}
        onClose={closeErrorMessage}
      />
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
    paddingBottom: responsiveSize(10),
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
