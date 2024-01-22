import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {Header, ErrorMessage} from '../../components';
import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';
import SelectDropdown from 'react-native-select-dropdown';
import {editNotesInDatabase} from '../../services/Database';

const categories: string[] = ['Work', 'Personal', 'Love', 'Interested'];

type EditNoteScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditNote'
>;

type EditNoteScreenRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

interface EditNoteScreenProps {
  navigation: EditNoteScreenNavigationProp;
  route: EditNoteScreenRouteProp;
}

export default function EditNoteScreen(
  this: any,
  {navigation, route}: EditNoteScreenProps,
) {
  const {colors} = useTheme();
  const opacityValue = useRef(new Animated.Value(1)).current;
  const [value] = useState(route.params.item);
  const [initialNotes, setInitialNotes] = useState(value);
  const [showErrorMessage, setShowErroressage] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [dataChanged, setDataChanged] = useState(false);

  const [inputs, setInputs] = useState({
    id: value.id,
    noteTitle: value.noteTitle,
    noteCategory: value.noteCategory,
    createdDate: value.createdDate,
    note: value.note,
  });


  useEffect(() => {
    const hasDataChanged =
      initialNotes.noteTitle !== inputs.noteTitle ||
      initialNotes.noteCategory !== inputs.noteCategory ||
      initialNotes.note !== inputs.note;
    setDataChanged(hasDataChanged);
  }, [initialNotes, inputs]);

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

  const updateButtonHandler = () => {
    const {id, noteTitle, noteCategory, createdDate, note} = inputs;
    if (
      noteTitle.trim() == '' ||
      noteCategory.trim() == '' ||
      note.trim() == ''
    ) {
      setShowErroressage(true);
      setErrorText('You may forgot to fill all fields!');
    } else {
      editNotesInDatabase(inputs, navigation);
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
      <Header onPress={() => navigation.goBack()} title="Your Note" />
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
          <Text style={[styles.date, {color: colors.text}]}>
            {(inputs.createdDate).slice(0, 10)}
          </Text>
          <SelectDropdown
            data={categories}
            defaultButtonText={inputs.noteCategory}
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
            placeholder="Write your note..."
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
      {dataChanged && (
        <Animated.View style={{opacity: opacityValue}}>
          <TouchableOpacity
            onPress={() => {
              updateButtonHandler();
            }}
            style={[styles.button, {backgroundColor: colors.button}]}>
            <Text style={{color: colors.background, fontWeight: 'bold'}}>
              Update
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <ErrorMessage
        isVisible={showErrorMessage}
        message={errorText}
        onClose={closeErrorMessage}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
});
